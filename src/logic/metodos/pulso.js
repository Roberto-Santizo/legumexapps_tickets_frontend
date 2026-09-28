// Pulso (métricas) y exportación CSV.
// Se mezclan en Logica.prototype: "this" es la instancia de Logica.
import { flushSync } from 'react-dom';
import { ST, PR } from '../../config/constantes.js';

export const metodosPulso = {
  pulse() {
    const list = this.visible();
    const act = list.filter(t => t.status !== 'closed');
    const avg = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
    const fr = list.map(t => this.firstResponse(t)).filter(x => x != null);
    const rs = list.map(t => this.resolution(t)).filter(x => x != null);
    const late = act.filter(t => this.sla(t).late);
    return { list, act, late, firstResp: avg(fr), frCount: fr.length, resolution: avg(rs), rsCount: rs.length, sinAsignar: act.filter(t => !t.asig).length };
  },

  // ── Ficha de una persona del área (Métricas → tocar a alguien en "Carga por persona").
  // Todo sale de los tickets cargados: quién cerró (historial), sus comentarios y lo que
  // tiene asignado. No hay horas trabajadas: el sistema no registra jornadas.
  VENTANA_FICHA: 30 * 24,
  statsPersona(uid) {
    const u = this.user(uid) || {}, nombre = u.nombre || '', V = this.VENTANA_FICHA;
    const tickets = this.state.tickets, metas = this.targets();
    const cierres = [];
    tickets.forEach(t => (t.historial || []).forEach(h => {
      if (h.kind === 'close' && h.autor === nombre && h.h <= V) cierres.push({ t, h: h.h, res: t.h - h.h });
    }));
    const reabiertos = cierres.filter(c => (c.t.historial || []).some(h => h.kind === 'reopen' && h.h < c.h)).length;
    const respuestas = [];
    tickets.forEach(t => {
      if (t.autor === uid || t.h > V) return;
      const mias = (t.comentarios || []).filter(c => c.autor === uid).map(c => c.h);
      if (mias.length) respuestas.push(t.h - Math.max.apply(null, mias));
    });
    const activos = tickets.filter(t => t.status !== 'closed' && t.asig === uid);
    const atrasados = activos.filter(t => this.sla(t).late);
    const enMargen = cierres.filter(c => c.res <= (metas[c.t.prio] || Infinity)).length;
    const comentarios = tickets.reduce((n, t) => n + (t.comentarios || []).filter(c => c.autor === uid && c.h <= V).length, 0);
    const dias = new Array(14).fill(0);
    cierres.forEach(c => { const d = Math.floor(c.h / 24); if (d < 14) dias[13 - d]++; });
    const porCat = {};
    cierres.map(c => c.t).concat(activos).forEach(t => { porCat[t.cat] = (porCat[t.cat] || 0) + 1; });
    const prom = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : null;
    return { u, nombre, cierres, reabiertos, respuesta: prom(respuestas), nResp: respuestas.length, resolucion: prom(cierres.map(c => c.res)),
      activos, atrasados, enMargen, comentarios, dias, porCat };
  },

  // Promedios del equipo (administradores activos) para comparar sin nombrar a nadie
  statsEquipo() {
    const admins = this.state.users.filter(u => u.rol === 'admin' && u.activo !== false);
    const st = admins.map(a => this.statsPersona(a.id));
    const prom = a => { const b = a.filter(x => x != null); return b.length ? b.reduce((x, y) => x + y, 0) / b.length : null; };
    return { n: admins.length, cierres: prom(st.map(x => x.cierres.length)), respuesta: prom(st.map(x => x.respuesta)), resolucion: prom(st.map(x => x.resolucion)),
      margen: prom(st.filter(x => x.cierres.length).map(x => x.enMargen / x.cierres.length)), activos: prom(st.map(x => x.activos.length)) };
  },

  // Abrir la ficha: el avatar de la fila viaja hasta la cabecera del panel
  abrirFicha(uid) {
    const cambio = () => { this.setState({ fichaId: uid }); this.contarCifras(); };
    const reducido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desde = document.querySelector('[data-ficha-avatar="' + uid + '"]');
    if (!document.startViewTransition || reducido || !desde) { cambio(); return; }
    desde.style.viewTransitionName = 'ficha-avatar';
    let hacia = null;
    const vt = document.startViewTransition(() => {
      desde.style.viewTransitionName = '';
      flushSync(cambio);
      hacia = document.querySelector('[data-ficha-cabecera]');
      if (hacia) hacia.style.viewTransitionName = 'ficha-avatar';
    });
    vt.finished.finally(() => { if (hacia) hacia.style.viewTransitionName = ''; });
  },
  cerrarFicha() { this.setState({ fichaId: null }); },

  subSolicitante(list) {
    const act = list.filter(t => t.status !== 'closed');
    if (!act.length) return 'Nada pendiente por ahora';
    const esperan = act.filter(t => this.waitingOnRequester(t));
    if (esperan.length) return esperan.length === 1 ? 'Uno de tus tickets espera algo de ti' : esperan.length + ' de tus tickets esperan algo de ti';
    const viendo = act.filter(t => t.asig);
    if (viendo.length) return viendo.length === 1 ? 'Uno está en manos del área' : viendo.length + ' están en manos del área';
    return act.length === 1 ? 'Aún no lo abren en el área' : 'Aún no los abren en el área';
  },

  // B3 · el servidor solo le entrega sus propios tickets, así que toda métrica que vea
  // se calcula sobre su historia personal. Nada del área: no tiene esos datos.
  metricasPropias() {
    const me = this.me();
    const mios = this.state.tickets.filter(t => t.autor === me.id);
    const resp = [], res = [];
    mios.forEach(t => {
      const eq = (t.comentarios || []).filter(x => x.autor !== t.autor).map(x => x.h);
      if (eq.length) resp.push(t.h - Math.max.apply(null, eq));
      const cierre = (t.historial || []).filter(h => h.kind === 'close')[0];
      if (t.status === 'closed' && cierre) res.push(t.h - cierre.h);
    });
    const prom = a => a.reduce((x, y) => x + y, 0) / a.length;
    // Muestra mínima: con un solo ticket, "promedio" es una palabra vacía.
    const out = [];
    if (resp.length >= 2) out.push({ label: 'Te respondieron en', valor: this.dur(prom(resp)) });
    if (res.length >= 2) out.push({ label: 'Se resolvieron en', valor: this.dur(prom(res)) });
    const media = resp.length >= 2 ? prom(resp) : null;
    const overdue = media != null && mios.some(t => t.status !== 'closed' && !(t.comentarios || []).some(x => x.autor !== t.autor) && t.h > media);
    return { lineas: out, overdue };
  },

  // F2 · CSV a mano: 20 líneas de texto separado por comas abren en Excel.
  descargarCsv(nombre, filas) {
    const esc = v => {
      const t = String(v == null ? '' : v);
      return /[",\n]/.test(t) ? '"' + t.split('"').join('""') + '"' : t;
    };
    const txt = filas.map(f => f.map(esc).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\ufeff' + txt], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = nombre;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  csvDe(pantalla) {
    const st = this.state;
    if (pantalla === 'users') {
      return ['usuarios-legumex.csv', [['Usuario', 'Correo', 'Rol', 'Carga activa']].concat(
        st.users.map(u => [u.nombre, u.email, u.rol, this.loadOf(u.id)])
      )];
    }
    if (pantalla === 'cats') {
      return ['categorias-legumex.csv', [['Categoría', 'Descripción', 'Tickets', 'Activa']].concat(
        st.cats.map(c => [c.nombre, c.descripcion || '', st.tickets.filter(t => t.cat === c.id).length, c.activo ? 'sí' : 'no'])
      )];
    }
    const base = pantalla === 'tickets' ? (this._shown || this.visible()) : this.visible();
    return [pantalla === 'tickets' ? 'tickets-legumex.csv' : 'metricas-legumex.csv', [['Código', 'Título', 'Categoría', 'Estado', 'Prioridad', 'Asignado', 'Sin mover (h)', 'Espera al solicitante']].concat(
      base.map(t => [
        'TIC-' + t.id, t.titulo, this.cat(t.cat), ST[t.status].label, PR[t.prio].label,
        (this.user(t.asig) || {}).nombre || 'sin asignar', Math.round(this.idle(t)),
        this.waitingOnRequester(t) ? 'sí' : 'no'
      ])
    )];
  }
};
