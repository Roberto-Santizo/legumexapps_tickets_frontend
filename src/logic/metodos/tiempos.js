// Tiempos, SLA y actividad de un ticket (cálculos, sin efectos).
// Se mezclan en Logica.prototype: "this" es la instancia de Logica.
import { PR, SLA, EV } from '../../config/constantes.js';

export const metodosTiempos = {
  // ── tiempo: todo se deriva de `h` (horas desde ahora), que representa created_at/updated_at de la API
  ago(h) {
    if (typeof h !== 'number') return '—';
    if (h < 1) return 'hace unos minutos';
    if (h < 24) return 'hace ' + Math.round(h) + ' h';
    if (h < 48) return 'ayer';
    if (h < 168) return 'hace ' + Math.round(h / 24) + ' d';
    return 'hace ' + Math.round(h / 168) + ' sem';
  },

  dur(h) {
    if (typeof h !== 'number') return '—';
    if (h < 1) return 'menos de 1 h';
    if (h < 48) return Math.round(h) + ' h';
    return Math.round(h / 24) + ' d';
  },

  events(t) {
    return [t.h].concat(
      (t.comentarios || []).map(c => c.h),
      (t.historial || []).map(x => x.h),
      (t.adjuntos || []).map(a => a.h)
    ).filter(x => typeof x === 'number');
  },

  idle(t) { return Math.min.apply(null, this.events(t)); },

  // El área ya respondió y el turno es del solicitante: el tiempo que pasa no es deuda del equipo.
  // (El comentario no manda correo, así que este es el caso más frecuente del sistema.)
  waitingOnRequester(t) {
    if (!t || t.status === 'closed') return false;
    const c = t.comentarios || [];
    if (!c.length) return false;
    return c[c.length - 1].autor !== t.autor;
  },

  targets() {
    const h = Number(this.props.metaAltaHoras) || SLA.high;
    return { high: h, medium: h * 6, low: h * 15 };
  },

  sla(t) {
    const target = this.targets()[t.prio], idle = this.idle(t);
    if (t.status === 'closed') {
      const closed = (t.historial || []).find(x => x.kind === 'close');
      const resolved = closed ? t.h - closed.h : null;
      return { level: 'done', late: false, watch: false, ok: false, done: true, target, idle, resolved, label: resolved != null ? 'Resuelto en ' + this.dur(resolved) : 'Resuelto' };
    }
    if (this.waitingOnRequester(t)) {
      return {
        level: 'waiting', target, idle, ratio: 0, resolved: null,
        waiting: true, late: false, watch: false, ok: false, done: false,
        label: 'Esperando al solicitante',
        full: 'El área respondió hace ' + this.dur(idle) + ' · el turno es del solicitante, así que no cuenta como tiempo sin mover'
      };
    }
    const r = idle / target;
    const level = r >= 1 ? 'late' : r >= 0.6 ? 'watch' : 'ok';
    return {
      level, target, idle, ratio: r, resolved: null,
      waiting: false, late: level === 'late', watch: level === 'watch', ok: level === 'ok', done: false,
      label: level === 'late' ? this.dur(idle) + ' sin mover' : level === 'watch' ? 'Vence pronto' : 'En tiempo',
      full: level === 'late'
        ? 'Sin movimiento hace ' + this.dur(idle) + ' · la meta para prioridad ' + PR[t.prio].label.toLowerCase() + ' es ' + this.dur(target)
        : level === 'watch'
        ? 'Sin movimiento hace ' + this.dur(idle) + ' de un margen de ' + this.dur(target)
        : 'Movido hace ' + this.dur(idle) + ' · dentro del margen de ' + this.dur(target)
    };
  },

  // Carga por persona: una sola definición para las tres pantallas que la usan
  // (Usuarios, Pulso y el menú de asignación). Antes cada una la recalculaba con su propio nombre local.
  loadOf(userId, pool) {
    const act = (pool || this.visible()).filter(t => t.status !== 'closed' && t.asig === userId);
    return { n: act.length, late: act.filter(t => this.sla(t).late).length };
  },

  maxLoad(pool) {
    return Math.max(1, ...this.state.users.map(u => this.loadOf(u.id, pool).n));
  },

  // POST /api/ticket_histories con action 'nudge' — el reclamo del solicitante como dato, no como comentario
  nudges(t) { return ((t || {}).historial || []).filter(x => x.kind === 'nudge'); },

  nudgedRecently(t, userName) {
    return this.nudges(t).some(x => x.autor === userName && (t.h - x.h) < 24);
  },

  firstResponse(t) {
    const c = (t.comentarios || []).filter(x => x.autor !== t.autor);
    if (!c.length) return null;
    return t.h - Math.max.apply(null, c.map(x => x.h));
  },

  resolution(t) {
    const closed = (t.historial || []).find(x => x.kind === 'close');
    return closed ? t.h - closed.h : null;
  },

  activity(t) {
    const out = [];
    (t.comentarios || []).forEach((c, i) => {
      const u = this.user(c.autor) || {};
      out.push({ key: 'c' + i + '-' + c.h, isComment: true, isEvent: false, isFile: false, autor: u.nombre || '—', ini: this.ini(u.nombre), ring: this.ring(c.autor), blobRef: el => { if (el) el.src = this.blobUrl(c.autor, 64); }, hasBlob: true, noBlob: false, texto: c.texto, meta: '', when: this.ago(c.h), h: c.h, at: c.at || 0, node: 'var(--n-200)' });
    });
    (t.historial || []).forEach((x, i) => {
      const ev = EV[x.kind] || EV.edit;
      out.push({ key: 'h' + i + '-' + x.h, isComment: false, isEvent: true, isFile: false, autor: x.autor, ini: '', ring: ev.color, texto: x.texto, meta: ev.label, when: this.ago(x.h), h: x.h, at: x.at || 0, node: ev.color });
    });
    (t.adjuntos || []).forEach((a, i) => {
      const u = this.user(a.autor) || {};
      out.push({ key: 'f' + i + '-' + a.h, isComment: false, isEvent: false, isFile: true, autor: u.nombre || '—', ini: '', ring: 'var(--n-400)', texto: a.nombre, meta: a.tipo + ' · ' + a.peso, when: this.ago(a.h), h: a.h, at: a.at || 0, node: 'var(--n-400)' });
    });
    out.sort((a, b) => (b.h - a.h) || (a.at - b.at));
    return out.map((x, i) => Object.assign(x, { showLine: i < out.length - 1 }));
  },

  lastAt(t) {
    const ev = this.events(t).filter(h => typeof h === 'number');
    return ev.length ? Math.min.apply(null, ev) : (t.h || 0);
  }
};
