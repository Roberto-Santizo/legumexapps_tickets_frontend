// Valores para la plantilla — pulso (métricas del área).
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.

import { ST } from '../../config/constantes.js';

export const valoresPulso = {
  valoresPulso(v, ctx) {
    const { s } = ctx;
    // (5) Las cifras cuentan desde 0 al entrar a Métricas o al cambiar el período
    if (!v.showPulso) this._cuentaClave = null;
    if (v.showPulso) {
      const clave = 'pulso|' + (s.period || '30');
      if (this._cuentaClave !== clave) { this._cuentaClave = clave; this.contarCifras(); }
      const p = this.pulse();
      const maxLoad = this.maxLoad();
      v.pFirstResp = p.firstResp != null ? this.durCuenta(p.firstResp) : '—';
      v.pFirstRespNote = p.frCount + (p.frCount === 1 ? ' ticket con respuesta del área' : ' tickets con respuesta del área');
      v.pResolution = p.resolution != null ? this.durCuenta(p.resolution) : '—';
      v.pResolutionNote = p.rsCount + (p.rsCount === 1 ? ' ticket cerrado medido' : ' tickets cerrados medidos');
      v.pLate = String(this.cifra(p.late.length));
      // Gráficos: series reales derivadas de los tickets (sin librería; SVG + grid)
      const dias = 14, W = 640, H = 200, top = 16, bot = 12;
      const ins = new Array(dias).fill(0), outs = new Array(dias).fill(0);
      p.list.forEach(t => {
        const d = Math.floor(t.h / 24); if (d < dias) ins[dias - 1 - d]++;
        (t.historial || []).forEach(x => { if (x.kind === 'close') { const dc = Math.floor(x.h / 24); if (dc < dias) outs[dias - 1 - dc]++; } });
      });
      const yMax = Math.max(2, Math.max.apply(null, ins.concat(outs)));
      const X = i => (i + 0.5) * (W / dias), Y = v => H - bot - (v / yMax) * (H - top - bot);
      // Curva monótona (Fritsch–Carlson): suaviza sin pasar por encima ni por debajo de los datos reales
      const line = arr => {
        const px = arr.map((v, i) => X(i)), py = arr.map(v => Y(v)), n = arr.length;
        const d = px.slice(0, -1).map((x, i) => (py[i + 1] - py[i]) / (px[i + 1] - x));
        const m = py.map((_, i) => i === 0 ? d[0] : i === n - 1 ? d[n - 2] : (d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2));
        for (let i = 0; i < n - 1; i++) {
          if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
          const a = m[i] / d[i], b = m[i + 1] / d[i], h = a * a + b * b;
          if (h > 9) { const t = 3 / Math.sqrt(h); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
        }
        let s = 'M' + px[0].toFixed(1) + ' ' + py[0].toFixed(1);
        for (let i = 0; i < n - 1; i++) {
          const dx = (px[i + 1] - px[i]) / 3;
          s += ' C' + (px[i] + dx).toFixed(1) + ' ' + (py[i] + m[i] * dx).toFixed(1) + ' ' + (px[i + 1] - dx).toFixed(1) + ' ' + (py[i + 1] - m[i + 1] * dx).toFixed(1) + ' ' + px[i + 1].toFixed(1) + ' ' + py[i + 1].toFixed(1);
        }
        return s;
      };
      v.pInPath = line(ins); v.pOutPath = line(outs);
      v.pOutArea = line(outs) + ' L' + X(dias - 1).toFixed(1) + ' ' + (H - bot) + ' L' + X(0).toFixed(1) + ' ' + (H - bot) + ' Z';
      v.pGrid = [0, 0.5, 1].map(r => ({ y: (H - bot - r * (H - top - bot)).toFixed(1) }));
      // Escala del eje: cantidad de tickets en cada línea de la grilla
      v.pEje = [1, 0.5, 0].map(r => ({ n: String(Math.round(r * yMax * 10) / 10).replace('.', ','), top: ((H - bot - r * (H - top - bot)) / H * 100).toFixed(1) + '%' }));
      v.pDays = ins.map((n, i) => {
        const ago = dias - 1 - i;
        return { yIn: (Y(n) / H * 100).toFixed(1) + '%', yOut: (Y(outs[i]) / H * 100).toFixed(1) + '%',
          tip: (ago === 0 ? 'Hoy' : ago === 1 ? 'Ayer' : 'Hace ' + ago + ' días') + ' · ' + n + ' entraron · ' + outs[i] + ' cerraron' };
      });
      const tin = ins.reduce((a, b) => a + b, 0), tout = outs.reduce((a, b) => a + b, 0), net = tout - tin;
      v.pInTotal = String(this.cifra(tin)); v.pOutTotal = String(this.cifra(tout));
      v.pNet = (net > 0 ? '−' : net < 0 ? '+' : '±') + Math.abs(net) + ' en cola';
      v.pNetInk = net >= 0 ? 'var(--verde)' : 'var(--naranja)';
      const grp = { late: 0, watch: 0, ok: 0, waiting: 0 };
      p.act.forEach(t => { const sl = this.sla(t); grp[sl.waiting ? 'waiting' : sl.late ? 'late' : sl.watch ? 'watch' : 'ok']++; });
      const tot = p.act.length || 1;
      let acc = 0;
      v.pDonut = [['late', 'Pasaron su margen', 'var(--naranja)'], ['watch', 'Cerca del margen', 'var(--ambar-oscuro)'], ['ok', 'Dentro del margen', 'var(--verde)'], ['waiting', 'Esperan al solicitante', 'var(--azul)']].map(g => {
        const len = grp[g[0]] / tot * 100, seg = { label: g[1], color: g[2], n: String(grp[g[0]]), pct: Math.round(len) + '%',
          dash: Math.max(0, len - (len > 0 ? 0.8 : 0)).toFixed(2) + ' ' + (100 - Math.max(0, len - (len > 0 ? 0.8 : 0))).toFixed(2),
          off: (25 - acc).toFixed(2), title: g[1] + ': ' + grp[g[0]] };
        acc += len; return seg;
      });
      v.pActTotal = String(this.cifra(p.act.length));
      v.pLateNote = p.late.length === 0 ? 'Todo dentro del margen' : 'Pasaron su margen de atención';
      // A1 · lo que espera al solicitante no es deuda del área, pero sí hay que mirarlo
      const esperando = this.visible().filter(t => this.waitingOnRequester(t));
      const semana = esperando.filter(t => this.idle(t) >= 168);
      v.pWaitNote = esperando.length === 0
        ? 'Nadie está esperando respuesta del solicitante'
        : esperando.length + (esperando.length === 1 ? ' espera respuesta del solicitante' : ' esperan respuesta del solicitante');
      v.pWaitWeek = semana.length > 0;
      v.pWaitWeekNote = semana.length + (semana.length === 1 ? ' hace más de una semana' : ' hace más de una semana');
      v.pLateBg = 'var(--n-0)';
      v.pLateBorder = p.late.length > 0 ? '1px solid var(--naranja)' : '1px solid var(--n-200)';
      v.pUnassigned = String(this.cifra(p.sinAsignar));
      v.pUnassignedNote = p.sinAsignar === 0 ? 'Nadie esperando triage' : 'Activos sin dueño';
      // solo el área (administradores activos): son quienes reciben tickets y tienen ficha
      v.pLoad = s.users.filter(u => u.rol === 'admin' && u.activo !== false).map(u => {
        const ld = this.loadOf(u.id), n = ld.n, lateN = ld.late;
        return {
          uid: String(u.id), abrir: () => this.abrirFicha(u.id), aria: 'Ver la ficha de ' + u.nombre,
          nombre: u.nombre, ini: this.ini(u.nombre), ring: this.ring(u.id), count: String(n),
          width: Math.round((n / maxLoad) * 100) + '%', bar: lateN > 0 ? 'var(--naranja)' : 'var(--n-900)',
          note: lateN > 0 ? lateN + ' atrasado' + (lateN === 1 ? '' : 's') : n === 0 ? 'Libre' : 'Al día',
          noteInk: lateN > 0 ? 'var(--n-900)' : 'var(--n-500)'
        };
      }).sort((a, b) => Number(b.count) - Number(a.count));
      const maxCat = Math.max(1, ...s.cats.map(c => p.list.filter(t => t.cat === c.id).length));
      v.pCats = s.cats.map(c => {
        const total = p.list.filter(t => t.cat === c.id).length;
        const abiertos = p.act.filter(t => t.cat === c.id).length;
        return {
          nombre: c.nombre, count: String(total), abiertos: String(abiertos),
          width: Math.round((total / maxCat) * 100) + '%',
          bar: c.activo ? 'var(--n-900)' : 'var(--n-400)',
          note: abiertos > 0 ? abiertos + ' sin cerrar' : 'Sin pendientes'
        };
      }).sort((a, b) => Number(b.count) - Number(a.count));
      v.pLateRows = p.late.slice(0, 4).map(t => this.rowFor(t));
      v.pHasLate = p.late.length > 0;
      v.pNote = (p.late.length === 0 && p.rsCount === 0 && this.visible().length === 0)
        ? 'Sin datos todavía — los números aparecen cuando se cierre el primer ticket.'
        : 'Todo en esta pantalla se calcula en el navegador con los tickets, usuarios y categorías ya cargados — la API no expone métricas.';
      // ── Ficha de la persona elegida en "Carga por persona"
      v.fichaOn = !!s.fichaId && !!this.user(s.fichaId);
      if (v.fichaOn) {
        const f = this.statsPersona(s.fichaId), eq = this.statsEquipo();
        const pila = (f.nombre || '').split(' ')[0], nC = f.cierres.length;
        const mas = (a, b, menorEsMejor) => { if (a == null || b == null || !b) return ''; const r = a / b; const mejor = menorEsMejor ? r < 0.85 : r > 1.15, peor = menorEsMejor ? r > 1.15 : r < 0.85; return mejor ? 'mejor' : peor ? 'peor' : 'igual'; };
        v.fichaNombre = f.nombre; v.fichaPila = pila; v.fichaIni = this.ini(f.nombre); v.fichaRing = this.ring(s.fichaId);
        v.fichaRol = (f.u.rol === 'admin' ? 'Administrador' : 'Usuario') + (f.u.email ? ' · ' + f.u.email : '');
        v.fichaEstado = f.activos.length === 0 ? 'Sin tickets activos' : f.activos.length + (f.activos.length === 1 ? ' activo' : ' activos') + (f.atrasados.length ? ' · ' + f.atrasados.length + ' fuera de margen' : ' · todos a tiempo');
        v.fichaEstadoInk = f.atrasados.length ? 'var(--naranja)' : 'var(--verde)';
        // En pocas palabras: frases cortas que comparan con el equipo sin exagerar con pocos datos
        const frases = [];
        const eqC = eq.cierres != null ? Math.round(eq.cierres * 10) / 10 : null;
        if (nC === 0) frases.push(pila + ' no cerró tickets en los últimos 30 días.');
        else {
          const cmp = mas(nC, eq.cierres);
          frases.push(pila + ' cerró ' + nC + (nC === 1 ? ' ticket' : ' tickets') + ' en los últimos 30 días' + (eq.n > 1 && eqC != null ? (cmp === 'mejor' ? ', más que el promedio del equipo (' + String(eqC).replace('.', ',') + ').' : cmp === 'peor' ? ', menos que el promedio del equipo (' + String(eqC).replace('.', ',') + ').' : ', en línea con el equipo.') : '.'));
        }
        if (f.respuesta != null) {
          const cmp = mas(f.respuesta, eq.respuesta, true);
          frases.push('Suele dar la primera respuesta en ' + this.dur(f.respuesta) + (eq.respuesta != null && eq.n > 1 ? (cmp === 'mejor' ? ', más rápido que el promedio (' + this.dur(eq.respuesta) + ').' : cmp === 'peor' ? '; el promedio del equipo es ' + this.dur(eq.respuesta) + '.' : ', como el resto del equipo.') : '.'));
        }
        if (nC === 1) frases.push(f.enMargen ? 'Su único cierre quedó dentro del margen de atención.' : 'Su único cierre quedó fuera del margen de atención.');
        else if (nC) frases.push(f.enMargen === nC ? 'Todos sus cierres quedaron dentro del margen de atención.' : f.enMargen + ' de ' + nC + ' cierres quedaron dentro del margen de atención.');
        if (f.reabiertos) frases.push(f.reabiertos === 1 ? 'Uno de sus tickets se reabrió después de cerrarlo.' : f.reabiertos + ' de sus tickets se reabrieron después de cerrarlos.');
        frases.push(f.activos.length === 0 ? 'Hoy no tiene tickets activos: puede recibir más.' : f.atrasados.length ? 'Ahora tiene ' + f.activos.length + ' activos y ' + f.atrasados.length + ' fuera de margen: conviene revisarlos primero.' : 'Ahora tiene ' + f.activos.length + (f.activos.length === 1 ? ' activo' : ' activos') + ' y van a tiempo.');
        v.fichaFrases = frases.map((t, i) => ({ key: 'f' + i, texto: t, retraso: (120 + i * 70) + 'ms' }));
        v.fichaPocosDatos = nC > 0 && nC < 3;
        // Cifras: persona contra equipo (la barra muestra la proporción, no un puntaje)
        const barra = (a, b, menorEsMejor) => { if (a == null || b == null) return { yo: '0%', eq: '0%' }; const m = Math.max(a, b) || 1; return { yo: Math.round(a / m * 100) + '%', eq: Math.round(b / m * 100) + '%' }; };
        const mg = nC ? f.enMargen / nC : null;
        v.fichaCifras = [
          { key: 'c', label: 'CERRÓ', valor: String(this.cifra(nC)), nota: 'últimos 30 días', eqNota: eqC != null ? 'equipo: ' + String(eqC).replace('.', ',') : '', b: barra(nC, eq.cierres) },
          { key: 'r', label: 'PRIMERA RESPUESTA', valor: f.respuesta != null ? this.durCuenta(f.respuesta) : '—', nota: f.nResp + (f.nResp === 1 ? ' ticket respondido' : ' tickets respondidos'), eqNota: eq.respuesta != null ? 'equipo: ' + this.dur(eq.respuesta) : '', b: barra(f.respuesta, eq.respuesta) },
          { key: 's', label: 'HASTA EL CIERRE', valor: f.resolucion != null ? this.durCuenta(f.resolucion) : '—', nota: 'promedio de sus cierres', eqNota: eq.resolucion != null ? 'equipo: ' + this.dur(eq.resolucion) : '', b: barra(f.resolucion, eq.resolucion) },
          { key: 'm', label: 'DENTRO DEL MARGEN', valor: mg != null ? this.cifra(Math.round(mg * 100)) + '%' : '—', nota: nC ? f.enMargen + ' de ' + nC + ' cierres' : 'sin cierres todavía', eqNota: eq.margen != null ? 'equipo: ' + Math.round(eq.margen * 100) + '%' : '', b: barra(mg, eq.margen) }
        ].map((c, i) => Object.assign(c, { retraso: (60 + i * 60) + 'ms', tam: String(c.valor).length > 6 ? '20px' : '26px' }));
        const maxD = Math.max(1, ...f.dias);
        v.fichaDias = f.dias.map((n, i) => ({ key: 'd' + i, alto: Math.max(n ? 12 : 4, Math.round(n / maxD * 100)) + '%', fondo: n ? 'var(--login-hoja)' : 'var(--n-200)', titulo: (i === 13 ? 'Hoy' : i === 12 ? 'Ayer' : 'Hace ' + (13 - i) + ' días') + ': ' + n + (n === 1 ? ' cierre' : ' cierres'), retraso: (i * 30) + 'ms' }));
        v.fichaDiasTotal = f.dias.reduce((a, b) => a + b, 0) + ' en 14 días';
        const cats = Object.keys(f.porCat).map(id => ({ c: s.cats.find(c => String(c.id) === String(id)), n: f.porCat[id] })).filter(x => x.c).sort((a, b) => b.n - a.n).slice(0, 4);
        v.fichaHayCats = cats.length > 0;
        v.fichaCats = cats.map(x => ({ key: 'k' + x.c.id, nombre: x.c.nombre, n: String(x.n) }));
        v.fichaHayActivos = f.activos.length > 0;
        v.fichaActivos = f.activos.slice().sort((a, b) => (this.sla(b).late ? 1 : 0) - (this.sla(a).late ? 1 : 0)).slice(0, 5).map(t => {
          const sl = this.sla(t), st = ST[t.status];
          return { key: 't' + t.id, code: 'TIC-' + t.id, titulo: t.titulo, estado: st.label, estadoBg: st.bg, tarde: sl.late, margen: sl.late ? 'Fuera de margen' : sl.label || '',
            abrir: () => { this.setState({ fichaId: null }); this.openTicket(t.id); } };
        });
        v.fichaMasActivos = f.activos.length > 5 ? '+ ' + (f.activos.length - 5) + ' más' : '';
        v.fichaComentarios = f.comentarios + (f.comentarios === 1 ? ' comentario' : ' comentarios') + ' en 30 días';
        v.fichaRef = this.refDialogo();
        v.onFichaCerrar = () => this.cerrarFicha();
      }
    }
  }
};
