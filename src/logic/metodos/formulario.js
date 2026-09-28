// Formulario de ticket (crear / editar): borrador, validación, duplicados y envío.
// Se mezclan en Logica.prototype: "this" es la instancia de Logica.
import { ST, PR, DK, STOP } from '../../config/constantes.js';
import { ANDAMIOS } from '../../config/textos.js';

export const metodosFormulario = {
  readDraft(k) { try { return localStorage.getItem(DK + k) || ''; } catch (e) { return ''; } },

  saveDraft(k, txt) {
    try { txt ? localStorage.setItem(DK + k, txt) : localStorage.removeItem(DK + k); } catch (e) {}
  },

  newForm() {
    let d = null;
    try { d = JSON.parse(this.readDraft('nuevo') || 'null'); } catch (e) { d = null; }
    const form = d && (d.titulo || d.desc || d.cat) ? d : { titulo: '', desc: '', cat: '', status: 'open', prio: 'medium' };
    this.setState({ screen: 'create', formErr: null, dir: 'fwd', form, draftFound: !!(d && (d.titulo || d.desc)) });
  },

  formChanged(patch) {
    this.setState(st => {
      const form = Object.assign({}, st.form, patch);
      if (st.screen === 'create') this.saveDraft('nuevo', JSON.stringify({ titulo: form.titulo, desc: form.desc, cat: form.cat }));
      return { form };
    });
  },

  toks(str) {
    return String(str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .split(/[^a-z0-9]+/).filter(x => x.length > 3 && STOP.indexOf(x) < 0);
  },

  dupes(titulo) {
    const a = this.toks(titulo);
    if (a.length < 2) return [];
    return this.visible().map(t => {
      const b = this.toks(t.titulo);
      const shared = a.filter(x => b.indexOf(x) >= 0).length;
      return { t, shared, score: shared / Math.max(2, Math.min(a.length, b.length)) };
    }).filter(x => x.shared >= 2 || x.score >= 0.6).sort((x, y) => y.score - x.score).slice(0, 3).map(x => x.t);
  },

  andamio(catId) {
    const c = this.state.cats.find(x => x.id === Number(catId));
    const campos = (c && ANDAMIOS[c.nombre]) || ANDAMIOS._;
    return campos.map(l => l + ': ').join('\n');
  },

  // Al enviar, las líneas del andamio que quedaron sin contestar no viajan:
  // un "Qué dice el error:" vacío parece contestado y es peor que no haber preguntado.
  limpiarAndamio(txt) {
    const lineas = String(txt || '').split('\n').filter(l => {
      const i = l.indexOf(':');
      if (i < 0) return l.trim().length > 0;
      return l.slice(i + 1).trim().length > 0;
    });
    return lineas.join('\n').trim();
  },

  openEdit(t) {
    if (!this.canEditT(t)) { this.say(this.othersTicket(t) ? 'Lo tiene ' + ((this.user(t.asig) || {}).nombre || 'otra persona') + '. Para editarlo tiene que pasar a ti.' : 'Este ticket ya no se puede editar.'); return; }
    this.setState({
      screen: 'edit', editId: t.id, dir: 'fwd', formErr: null,
      form: { titulo: t.titulo, desc: t.desc, cat: String(t.cat), status: t.status, prio: t.prio }
    });
  },

  saveEdit() {
    const s = this.state, f = s.form, id = s.editId, prev = this.ticket(id) || {};
    if (!this.canEditT(prev)) {
      this.setState({ screen: s.detailId === id ? 'detail' : 'tickets', editId: null, dir: 'back', formErr: null });
      this.say(this.othersTicket(prev) ? 'Mientras editabas, TIC-' + id + ' pasó a ' + ((this.user(prev.asig) || {}).nombre || 'otra persona') + '. No se guardó nada.' : 'TIC-' + id + ' ya no se puede editar. No se guardó nada.');
      return;
    }
    const changes = { titulo: f.titulo.trim(), desc: f.desc.trim(), cat: Number(f.cat) };
    const notes = [];
    if (s.role === 'admin') {
      if (f.status !== prev.status && f.status !== 'closed' && prev.status !== 'closed') { changes.status = f.status; notes.push('Estado cambiado a ' + ST[f.status].label); }
      if (f.prio !== prev.prio) { changes.prio = f.prio; notes.push('Prioridad cambiada a ' + PR[f.prio].label); }
    }
    if (changes.titulo !== prev.titulo || changes.desc !== prev.desc || changes.cat !== prev.cat) notes.push('Ticket editado');
    this.patch(id, changes, notes.length ? notes.join(' · ') : null, changes.status ? 'status' : 'edit');
    this.setState({
      screen: s.detailId === id ? 'detail' : 'tickets', editId: null, dir: 'back', formErr: null,
      form: { titulo: '', desc: '', cat: '', status: 'open', prio: 'medium' }
    });
    this.say(notes.length ? 'TIC-' + id + ' actualizado.' : 'Sin cambios para guardar.');
  },

  validateTicket() {
    const f = this.state.form;
    const err = {
      titulo: f.titulo.trim().length < 6 ? 'Contanos qué pasa — con una frase alcanza.' : '',
      desc: f.desc.trim().length < 15 ? 'Agrega algo más de detalle: qué pasa y desde cuándo.' : '',
      cat: !f.cat ? true : false
    };
    return (err.titulo || err.desc || err.cat) ? err : null;
  },

  // A3 · el número lo arma el cliente, así que se deriva del máximo de la lista cargada
  // y se salta cualquiera que ya exista (la colisión real la contesta el 422 del servidor).
  nextNumber() {
    const ids = this.state.tickets.map(t => t.id);
    let n = (ids.length ? Math.max.apply(null, ids) : 1041) + 1;
    while (ids.indexOf(n) >= 0) n++;
    return n;
  },

  submitTicket() {
    if (this.state.form && this.state.form.status === 'closed') this.setState(st => ({ form: Object.assign({}, st.form, { status: 'open' }) }));
    const f = Object.assign({}, this.state.form, { status: this.state.form.status === 'closed' ? 'open' : this.state.form.status });
    const err = this.validateTicket();
    if (err) { this.setState({ formErr: err }); return; }
    const id = this.nextNumber();
    const me = this.me();
    const desc = this.limpiarAndamio(f.desc);
    // Prioridad elegida en el formulario (Baja / Media / Alta); Media si no llega una válida
    const prio = PR[f.prio] ? f.prio : 'medium';
    const nuevo = {
      id, titulo: f.titulo.trim(), desc, cat: Number(f.cat), status: 'open', prio,
      autor: me.id, asig: null, creado: 'hoy', h: 0, comentarios: [],
      historial: [{ autor: me.nombre, texto: 'Ticket creado · prioridad ' + PR[prio].label, h: 0, at: Date.now(), kind: 'create' }], adjuntos: []
    };
    // A2 · POST /api/tickets manda el correo dentro de la misma operación: si el correo falla
    // devuelve 500 con el ticket ya creado. Antes de dar error, se re-pide GET /api/tickets
    // y se busca el número enviado. Reintentar a ciegas deja dos tickets que nadie puede borrar.
    const correoFallo = this.state.forced === '500 al crear';
    const lista = [nuevo].concat(this.state.tickets);
    const confirmado = lista.some(t => t.id === id);
    if (correoFallo && !confirmado) { this.setState({ formErr: { banner: 'servidor' } }); return; }
    this.saveDraft('nuevo', '');
    this.setState(st => ({
      tickets: lista, seq: id, formErr: null, draftFound: false,
      form: { titulo: '', desc: '', cat: '', status: 'open', prio: 'medium' },
      celebrate: { id, titulo: nuevo.titulo, cat: this.cat(nuevo.cat), correoFallo }
    }));
    this.pill();
    clearTimeout(this._celeb);
    this._celeb = setTimeout(() => this.goToNew(), correoFallo ? 4200 : 2000);
  },

  goToNew() {
    const c = this.state.celebrate;
    if (!c) return;
    clearTimeout(this._celeb);
    this.setState({ celebrate: null, screen: 'detail', detailId: c.id, dir: 'fwd', comment: '', commentErr: '' });
    this.say(c.correoFallo
      ? 'TIC-' + c.id + ' creado. El aviso por correo puede no haber salido.'
      : 'TIC-' + c.id + ' creado. Te avisamos cuando lo asignen.');
  }
};
