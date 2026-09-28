// Notificaciones y sondeo de novedades.
// Se mezclan en Logica.prototype: "this" es la instancia de Logica.
import * as api from '../../services/api.js';
import * as sync from '../../services/sync.js';

export const metodosNotificaciones = {
  // Notificaciones derivadas en cliente: GET /api/tickets cada 45 s + comparación. Sin endpoint propio.
  notifList(me, isAdmin) {
    const K = { create: ['NUEVO', 'var(--verde-oscuro)'], assign: ['ASIGNACIÓN', 'var(--n-600)'], status: ['ESTADO', 'var(--n-600)'], close: ['CERRADO', 'var(--n-600)'], reopen: ['REABIERTO', 'var(--naranja-oscuro)'], prio: ['PRIORIDAD', 'var(--naranja-oscuro)'], comment: ['RESPUESTA', 'var(--azul)'] };
    const read = this.readSet(me), out = [];
    this.state.tickets.forEach(t => {
      if (!isAdmin && t.autor !== me.id && t.asig !== me.id) return;
      // Admin: lo nuevo, lo sin dueño y lo suyo. De los tickets de otro admin, solo si lo nombran (le asignaron o le sacaron uno).
      const adminMine = !isAdmin || !t.asig || t.asig === me.id;
      (t.historial || []).forEach(e => {
        if (!K[e.kind] || e.autor === me.nombre || e.h > 72) return;
        if (e.kind === 'create' && !isAdmin) return;
        if (!adminMine && e.kind !== 'create' && !(e.kind === 'assign' && (e.texto || '').indexOf(me.nombre) >= 0)) return;
        const toMe = e.kind === 'assign' && (e.texto || '').indexOf(me.nombre) >= 0;
        out.push({ tid: t.id, h: e.h, key: t.id + '|' + e.kind + '|' + e.h + '|' + (e.texto || '').slice(0, 24),
          kind: toMe ? 'TE ASIGNARON' : K[e.kind][0], kindColor: toMe ? 'var(--azul)' : K[e.kind][1],
          title: e.kind === 'create' ? t.titulo : e.texto, sub: e.kind === 'create' ? 'Abierto por ' + e.autor : e.autor + ' · ' + t.titulo });
      });
      (t.comentarios || []).forEach(c => {
        if (c.autor === me.id || c.h > 72) return;
        if (isAdmin && (!adminMine || c.autor !== t.autor)) return; // admin: solo respuestas del solicitante en lo suyo o sin dueño
        const u = this.user(c.autor) || {};
        out.push({ tid: t.id, h: c.h, chat: true, key: t.id + '|comment|' + c.h + '|' + (c.texto || '').slice(0, 24),
          kind: K.comment[0], kindColor: K.comment[1], title: (u.nombre || 'Alguien') + ' respondió', sub: '“' + (c.texto || 'Adjuntó una imagen') + '”' });
      });
    });
    out.forEach(n => { n.read = !!read[n.key]; });
    return out.sort((a, b) => a.h - b.h).slice(0, 30);
  },

  readSet(me) {
    if (!this._read || this._readFor !== me.id) {
      this._readFor = me.id;
      try { this._read = JSON.parse(localStorage.getItem('mt-notif-read-' + me.id) || '{}'); } catch (e) { this._read = {}; }
    }
    return this._read;
  },

  markRead(me, keys) {
    const r = this.readSet(me); keys.forEach(k => { r[k] = 1; });
    try { localStorage.setItem('mt-notif-read-' + me.id, JSON.stringify(r)); } catch (e) {}
    this.forceUpdate();
  },

  // Solo prototipo: simula que el próximo sondeo trae una respuesta nueva
  // Sondeo: GET /api/tickets cada 45 s. Mientras viaja, el isotipo reemplaza a la campana.
  poll(then) {
    if (!this.state.authed) return;
    this.setState({ notifPolling: true });
    if (api.USE_API) { sync.refresh(this).catch(() => {}).finally(() => this.setState({ notifPolling: false })); return; }
    clearTimeout(this._pl); this._pl = setTimeout(() => { this.setState({ notifPolling: false }); if (then) then(); }, 900);
  },

  liveEvent(sure) {
    if (!this.state.authed) return;
    if (api.USE_API) { this.poll(); return; } // con API, lo nuevo llega del servidor
    if (!sure) { this.poll(() => this.liveEvent(true)); return; }
    const me = this.me(), isAdmin = this.state.role === 'admin';
    const t = this.state.tickets.find(x => x.status !== 'closed' && (isAdmin || x.autor === me.id || x.asig === me.id) && ((x.autor && x.autor !== me.id) || (x.asig && x.asig !== me.id)));
    if (!t) return;
    const who = t.autor !== me.id ? t.autor : t.asig;
    this.setState(st => ({ notifPing: true, tickets: st.tickets.map(x => x.id === t.id ? Object.assign({}, x, { comentarios: (x.comentarios || []).concat([{ autor: who, texto: 'Te paso más detalles: volvió a pasar recién, a las ' + new Date().toTimeString().slice(0, 5) + '.', h: 0, at: Date.now() }]) }) : x) }));
    clearTimeout(this._ping); this._ping = setTimeout(() => this.setState({ notifPing: false }), 700);
  }
};
