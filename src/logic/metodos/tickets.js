// Tickets: búsqueda, permisos y acciones (tomar, mover, cerrar, reabrir, comentar).
// Se mezclan en Logica.prototype: "this" es la instancia de Logica.
import * as api from '../../services/api.js';
import { ST, PR, MOSTRAR_SIN_ABRIR, PCODE } from '../../config/constantes.js';

export const metodosTickets = {
  openTicket(id, dir) {
    this.setState({ screen: 'detail', detailId: id, comment: this.readDraft('t' + id), commentErr: '', dir: dir || 'fwd', formErr: null });
    this.load(500);
  },

  // El cierre es el final del trabajo: merece el mismo peso que la creación
  cierre(id, undoFn, btn, go) {
    if (api.USE_API) undoFn = null; // sin endpoint para deshacer: no se ofrece
    this.pill();
    const t = this.ticket(id) || {};
    const sol = (this.state.users.find(u => u.id === t.autor) || {}).nombre || 'el solicitante';
    const yo = this.me().nombre;
    const hoy = this.state.tickets.filter(x => x.id !== id && (x.historial || []).some(h => h.kind === 'close' && h.h < 24 && h.autor === yo)).length + 1;
    // Persona "enfocada": despacha en serie; el siguiente sin asignar más viejo queda a un click
    this.showMoment({
      kind: 'close', code: 'TIC-' + id, titulo: t.titulo || '',
      sub: 'Resuelto en ' + this.dur(t.h) + ' · le avisamos a ' + sol + ' por correo. ' + (hoy === 1 ? 'Es tu primer cierre de hoy.' : 'Es tu ' + hoy + '.º cierre de hoy.'),
      undo: undoFn || null,
      after: () => this.say('TIC-' + id + ' cerrado. Le avisamos a ' + sol + ' por correo.', undoFn || undefined),
      btn: 'Cerrar',
      go: go || null
    }, 3200);
  },

  reapertura(id) {
    const t = this.ticket(id) || {};
    this.showMoment({
      kind: 'reopen', code: 'TIC-' + id, titulo: t.titulo || '',
      sub: 'Volvió a la bandeja del área y quedó registrado en la actividad.',
      btn: 'Entendido', undo: null, go: null
    }, 2800);
  },

  bloqueante(id) {
    this.showMoment({
      kind: 'nudge', code: 'TIC-' + id, titulo: 'Quedó marcado como bloqueante',
      sub: 'TI lo ve arriba en su bandeja. Si mañana te sigue frenando, podés volver a marcarlo.',
      btn: 'Entendido', undo: null, go: null
    }, 2800);
  },

  snapshot(id) {
    const t = this.ticket(id) || {};
    return { status: t.status, asig: t.asig, historial: t.historial, comentarios: t.comentarios, adjuntos: t.adjuntos };
  },

  restore(id, snap) {
    this.setState(st => ({ tickets: st.tickets.map(t => t.id === id ? Object.assign({}, t, snap) : t) }));
  },

  user(id) { return this.state.users.find(u => u.id === id) || null; },

  cat(id) { const c = this.state.cats.find(c => c.id === id); return c ? c.nombre : '—'; },

  ticket(id) { return this.state.tickets.find(t => t.id === id) || null; },

  visible() {
    const me = this.me();
    const all = this.state.tickets;
    return this.state.role === 'admin' ? all : all.filter(t => t.autor === me.id || t.asig === me.id);
  },

  patch(id, changes, hist, kind) {
    this.setState(s => ({
      tickets: s.tickets.map(t => {
        if (t.id !== id) return t;
        const n = Object.assign({}, t, changes);
        if (hist) n.historial = [{ autor: this.me().nombre, texto: hist, h: 0, at: Date.now(), kind: kind || 'edit' }].concat(t.historial);
        return n;
      })
    }));
  },

  take(t, sure) {
    if (!sure) { this.confirmOr('take', { title: '¿Tomar TIC-' + t.id + '?', sub: 'Queda asignado a vos' + (t.status === 'open' ? ' y pasa a En progreso.' : '.'), ok: 'Tomar ticket' }, () => this.take(t, true)); return; }
    const me = this.me(), snap = this.snapshot(t.id);
    this.optimistic('take-' + t.id,
      () => this.patch(t.id, { asig: me.id, status: t.status === 'open' ? 'in_progress' : t.status }, 'Asignado a ' + me.nombre + ' (se lo tomó)', 'assign'),
      () => this.restore(t.id, snap),
      'Tomaste TIC-' + t.id + '. Ya podés cerrarlo cuando termines.',
      'HTTP 500 · PATCH /api/tickets/' + t.id + '/assign');
  },

  reopen(t) {
    const snap = this.snapshot(t.id);
    this.optimistic('reopen-' + t.id,
      () => this.patch(t.id, { status: 'open' }, 'Ticket reabierto', 'reopen'),
      () => this.restore(t.id, snap),
      'TIC-' + t.id + ' vuelve a estar abierto.',
      'HTTP 500 · PUT /api/tickets/' + t.id);
  },

  // ── Arrastre del kanban: el gesto que el layout ya prometía
  canMove(t, to) {
    if (t.status === to) return false;
    const me = this.me(), isAdmin = this.state.role === 'admin';
    if (this.othersTicket(t)) return false;                    // lo tiene otro admin: solo lectura
    if (to === 'closed') return t.asig === me.id;              // PATCH /{ticket}/closed: el dueño
    return isAdmin;                                            // PUT con status: solo admin
  },

  moveTo(t, to, sure) {
    if (!this.canMove(t, to)) return;
    if (!sure) {
      this.confirmOr('move', { title: '¿Pasar TIC-' + t.id + ' a ' + ST[to].label + '?', sub: 'Hoy está en ' + ST[t.status].label + '. El cambio queda en la actividad y el solicitante lo ve.', ok: 'Cambiar estado', danger: to === 'closed' }, () => this.moveTo(t, to, true));
      return;
    }
    const snap = this.snapshot(t.id), was = ST[t.status].label, now = ST[to].label;
    const reopening = t.status === 'closed';
    const kind = to === 'closed' ? 'close' : reopening ? 'reopen' : 'status';
    const nota = to === 'closed' ? 'Ticket cerrado' : reopening ? 'Ticket reabierto' : 'Estado: ' + was + ' → ' + now;
    const call = to === 'closed'
      ? 'HTTP 500 · PATCH /api/tickets/' + t.id + '/closed'
      : 'HTTP 500 · PUT /api/tickets/' + t.id;
    this.setState({ landed: t.id });
    clearTimeout(this._land);
    this._land = setTimeout(() => this.setState({ landed: null }), 420);
    this.optimistic('move-' + t.id,
      () => this.patch(t.id, { status: to }, nota, kind),
      () => this.restore(t.id, snap),
      'TIC-' + t.id + ' → ' + now + '.', call);
  },

  // B2 · una línea, y solo una, que contesta lo que el solicitante realmente pregunta.
  situacion(t) {
    const c = (t.comentarios || []).slice();
    const ultimo = c[c.length - 1];
    const equipo = c.filter(x => x.autor !== t.autor);
    if (t.status === 'closed') {
      const cierre = (t.historial || []).filter(h => h.kind === 'close')[0];
      return { texto: 'Resuelto · se cerró ' + this.ago(cierre ? cierre.h : this.idle(t)), dot: 'var(--verde)' };
    }
    if (ultimo && ultimo.autor !== t.autor) {
      return { texto: 'Te están esperando a vos · te preguntaron algo ' + this.ago(ultimo.h), dot: 'var(--azul)' };
    }
    if (t.asig || equipo.length) {
      const who = this.user(t.asig);
      const resp = equipo[equipo.length - 1];
      return {
        texto: (who ? who.nombre + ' lo está viendo' : 'El área lo está viendo') + (resp ? ' · te respondió ' + this.ago(resp.h) : ''),
        dot: 'var(--verde)'
      };
    }
    if (!MOSTRAR_SIN_ABRIR) return null;
    const n = this.state.users.filter(u => u.rol === 'admin').length;
    return { texto: 'Aún no lo abren · lo recibieron ' + n + ' personas del área', dot: 'var(--naranja)' };
  },

  // Llamar por Teams: confirma, muestra "Abriendo Teams…" y abre el enlace de llamada al
  // correo de la persona. Se registra en el historial solo si se confirmó. La pestaña se
  // abre dentro del segundo del clic en "Llamar" para que el navegador no la bloquee.
  llamarTeams(e, t, u) {
    if (e && e.preventDefault) e.preventDefault();
    if (!t || !u || !u.email) return;
    const url = 'https://teams.microsoft.com/l/call/0/0?users=' + u.email;
    this.confirmOr('call', { title: '¿Llamar por Teams a ' + u.nombre + '?', sub: 'Se abre Microsoft Teams con la llamada a ' + u.email + '. Si el navegador pregunta, elegí abrir la aplicación.', ok: 'Llamar' }, () => this.heavy('Abriendo Teams', 900, () => {
      let w = null;
      try { w = window.open(url, '_blank'); if (w) w.opener = null; } catch (err) {}
      if (!w) { this.say('El navegador bloqueó la ventana de Teams. Permití ventanas emergentes para este sitio y volvé a intentar.'); return; }
      this.registrarLlamada(t, u.nombre);
    }));
  },

  // F1 · la llamada queda como evento propio del historial (POST /api/ticket_histories)
  registrarLlamada(t, nombre) {
    const me = this.me();
    this.setState(st => ({
      tickets: st.tickets.map(x => x.id === t.id ? Object.assign({}, x, {
        historial: [{ autor: me.nombre, texto: 'Llamó por Teams a ' + nombre, h: 0, at: Date.now(), kind: 'call' }].concat(x.historial || [])
      }) : x)
    }));
  },

  nudge(t) {
    if (!t || this.nudgedRecently(t, this.me().nombre)) return;
    const me = this.me();
    this.setState(st => ({
      tickets: st.tickets.map(x => x.id === t.id ? Object.assign({}, x, {
        historial: [{ autor: me.nombre, texto: 'El solicitante marcó que esto lo está frenando', h: 0, at: Date.now(), kind: 'nudge' }].concat(x.historial || [])
      }) : x)
    }));
  
  },

  rowFor(t) {
    const st = ST[t.status], pr = PR[t.prio], a = this.user(t.asig), au = this.user(t.autor);
    const sla = this.sla(t), idleTxt = this.ago(this.idle(t));
    const sit = this.state.role === 'admin' ? null : this.situacion(t);
    return {
      sitShow: !!sit, sitText: sit ? sit.texto : '', sitDot: sit ? sit.dot : 'var(--n-400)',
      excerpt: this.excerpt(t.desc),
      tituloParts: this.hl(t.titulo, this.state.q.trim()),
      excerptParts: this.hl(this.excerpt(t.desc), this.state.q.trim()),
      dragging: this.state.dragId === t.id,
      dragOp: this.state.dragId === t.id ? '0.45' : '1',
      dragTilt: this.state.dragId === t.id ? 'rotate(1.4deg) scale(0.99)' : 'none',
      landAnim: this.state.landed === t.id ? 'landIn 400ms var(--ease-standard) both' : 'none',
      canDrag: (this.state.role === 'admin' && !this.othersTicket(t)) || t.asig === (this.me() || {}).id,
      grab: ((this.state.role === 'admin' && !this.othersTicket(t)) || t.asig === (this.me() || {}).id) ? 'grab' : 'pointer',
      onDragStart: e => {
        if (e && e.dataTransfer) { e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', String(t.id)); } catch (err) {} }
        this.setState({ dragId: t.id });
      },
      onDragEnd: () => this.setState({ dragId: null, dragOver: null }),
      autorIni: au ? this.ini(au.nombre) : '—', autorRing: this.ring(t.autor),
      prioCode: PCODE[t.prio],
      lastNote: (t.comentarios && t.comentarios.length) ? 'Última respuesta ' + this.ago(t.comentarios[t.comentarios.length - 1].h) : 'Sin respuestas todavía',
      id: t.id, code: 'TIC-' + t.id, titulo: t.titulo, cat: this.cat(t.cat),
      statusLabel: st.label, statusBg: st.bg, statusDot: st.dot,
      prioLabel: pr.label, prioDot: pr.dot,
      glyph: this.cat(t.cat).slice(0, 1).toUpperCase(),
      hasAsig: !!a, ini: a ? this.ini(a.nombre) : '', ring: this.ring(t.asig), asig: a ? a.nombre : 'Sin asignar',
      autor: (this.user(t.autor) || {}).nombre || '—', updated: idleTxt,
      slaShow: this.state.role === 'admin' ? (sla.late || sla.watch || sla.waiting) : !!sla.waiting, slaLate: sla.late, slaWatch: sla.watch, slaWaiting: !!sla.waiting,
      slaLabel: sla.label, slaTitle: sla.full || sla.label,
      slaBg: sla.late ? 'var(--n-0)' : 'transparent', slaBorder: sla.late ? '1px solid var(--naranja)' : '1px solid transparent',
      slaInk: sla.late ? 'var(--n-900)' : sla.waiting ? 'var(--n-700)' : 'var(--n-600)',
      canTake: this.state.role === 'admin' && !t.asig && t.status !== 'closed',
      takeLabel: 'Tomar TIC-' + t.id,
      take: e => { if (e && e.stopPropagation) { e.stopPropagation(); e.preventDefault(); } this.tap('take-' + t.id, () => this.take(t)); },
      tapTake: this.tapped('take-' + t.id),
      createdTitle: 'Creado ' + t.creado + ' · última actividad ' + idleTxt,
      statusOpen: t.status === 'open', statusProg: t.status === 'in_progress', statusClosed: t.status === 'closed',
      hasFiles: t.adjuntos.length > 0, fileCount: String(t.adjuntos.length),
      hasComments: t.comentarios.length > 0, commentCount: String(t.comentarios.length),
      open: () => this.openTicket(t.id),
      key: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.openTicket(t.id); } },
      canEdit: (this.state.role === 'admin' && !this.othersTicket(t)) || (this.state.role !== 'admin' && t.autor === this.me().id && t.status !== 'closed'),
      editLabel: 'Editar TIC-' + t.id,
      canAssign: this.state.role === 'admin' && t.status !== 'closed',
      chatLabel: 'Abrir la conversación de TIC-' + t.id,
      chatGo: e => {
        if (e && e.stopPropagation) { e.stopPropagation(); e.preventDefault(); }
        this.setState({ chatOpen: true, chatId: t.id, chatMsg: '', chatErr: '', chatQ: '' });
      },
      asigHas: !!t.asig, asigNone: !t.asig,
      asigIni: t.asig ? this.ini((this.user(t.asig) || {}).nombre || '') : '',
      asigFirst: t.asig ? ((this.user(t.asig) || {}).nombre || '').split(' ')[0] : '',
      asigTitle: t.asig ? 'Asignado a ' + ((this.user(t.asig) || {}).nombre || '') + ' · cambiar' : 'Asignar sin abrir el ticket',
      asigBorder: t.asig ? 'solid var(--n-200)' : 'dashed var(--n-400)',
      qaOpen: this.state.qa === t.id,
      qaBg: this.state.qa === t.id ? 'var(--n-50)' : 'var(--n-0)',
      stop: e => { if (e && e.stopPropagation) e.stopPropagation(); },
      qaToggle: e => { if (e && e.stopPropagation) e.stopPropagation(); this.setState(st => ({ qa: st.qa === t.id ? null : t.id })); },
      qaClear: e => { if (e && e.stopPropagation) e.stopPropagation(); this.quickAssign(t, null); },
      qaClosed: this.state.qa !== t.id,
      asigTip: t.asig ? ((this.user(t.asig) || {}).nombre || 'Otra persona') + (t.asig === this.me().id ? ' (yo)' : '') : 'Sin asignar',
      asigTipSub: !t.asig ? 'Click para asignar o tomarlo' : t.asig === this.me().id ? 'Lo tenés vos · click para reasignar' : 'Lo tiene · click para reasignar o tomarlo',
      // Orden: quien lo tiene hoy, después yo ("Tomarlo yo"), después el resto por carga
      qaOpts: this.state.users.filter(u => u.rol === 'admin' && u.activo).sort((a, b) => (b.id === t.asig) - (a.id === t.asig) || (b.id === this.me().id) - (a.id === this.me().id) || this.loadOf(a.id).n - this.loadOf(b.id).n).map(u => Object.assign(this.asigOptLabel(u, t.asig), {
        ini: this.ini(u.nombre), carga: this.loadOf(u.id).n + (this.loadOf(u.id).n === 1 ? ' activo' : ' activos'),
        bg: t.asig === u.id ? 'var(--n-50)' : 'transparent',
        go: e => { if (e && e.stopPropagation) e.stopPropagation(); this.quickAssign(t, u.id); }
      })),
      edit: e => { if (e && e.stopPropagation) { e.stopPropagation(); e.preventDefault(); } this.openEdit(t); }
    };
  },

  // Admin: su ticket (asignado a él) o, para editar/cambiar estado, uno sin dueño. Si lo tiene otro admin, solo lectura.
  othersTicket(t) { return this.state.role === 'admin' && !!t && !!t.asig && t.asig !== this.me().id; },

  // Responder: el solicitante siempre; un admin solo si el ticket es suyo (asignado o tomado). Ver, siempre.
  replyLock(t) {
    if (!t) return null;
    const me = this.me(), isAdmin = this.state.role === 'admin';
    if (t.status === 'closed') {
      if (!isAdmin) return t.autor === me.id ? { msg: 'Este ticket está cerrado. Si el problema volvió, abrí uno nuevo que lo menciona.', take: false, follow: true } : { msg: 'Este ticket está cerrado.', take: false };
      if (this.othersTicket(t)) return { msg: 'Ticket cerrado de ' + ((this.user(t.asig) || {}).nombre || 'otra persona') + '. Solo lectura.', take: false };
      return { msg: 'Ticket cerrado. Para seguir la conversación o subir imágenes, reabrilo.', take: false, reopen: true };
    }
    if (!isAdmin) return null;
    if (t.asig === me.id) return null;
    if (!t.asig) return { msg: 'Nadie lo tiene todavía. Tomalo para responder; así el solicitante sabe quién lo atiende.', take: true };
    return { msg: 'Lo tiene ' + ((this.user(t.asig) || {}).nombre || 'otra persona') + '. Podés leerlo; para escribir, editar o cerrarlo tiene que pasar a vos.', take: true, steal: true };
  },

  followUp(t) {
    this.newForm();
    this.setState({ chatOpen: false, form: { titulo: 'Sigue pasando: ' + t.titulo, desc: 'Vuelve a pasar lo de TIC-' + t.id + '.\n\nQué pasa ahora: ', cat: t.cat, status: 'open', prio: t.prio }, draftFound: false });
  },

  resolvedSent(t) { return ((t || {}).historial || []).some(x => x.texto === 'El solicitante confirmó que se resolvió'); },

  markResolved(t) {
    if (!t || this.resolvedSent(t)) return;
    const me = this.me();
    this.confirmOr('resolved', { title: '¿Avisar que TIC-' + t.id + ' ya se resolvió?', sub: 'Se publica "Ya funciona, pueden cerrarlo" y el área lo cierra. Si vuelve a pasar, podés abrir uno nuevo desde el ticket.', ok: 'Avisar al área' }, () => {
      if (this.resolvedSent(this.ticket(t.id))) return;
      this.setState(st => ({ tickets: st.tickets.map(x => x.id === t.id ? Object.assign({}, x, {
        comentarios: (x.comentarios || []).concat([{ autor: me.id, texto: 'Ya funciona, gracias. Pueden cerrarlo.', h: 0, at: Date.now() }]),
        historial: [{ autor: me.nombre, texto: 'El solicitante confirmó que se resolvió', h: 0, at: Date.now(), kind: 'status' }].concat(x.historial || [])
      }) : x) }));
      this.pill();
      this.say('Listo. El área ve que ya funciona y lo cierra.');
    });
  },

  // Etiqueta de cada persona en los selectores de asignación (menú rápido y detalle)
  asigOptLabel(u, cur) {
    const mine = u.id === this.me().id, isCur = cur === u.id, take = mine && !isCur;
    return { nombre: take ? 'Tomarlo yo' : u.nombre, full: mine ? u.nombre + ' (yo)' : u.nombre, weight: take ? '600' : '400',
      hasTag: isCur || mine, tag: isCur ? (mine ? 'YO · ACTUAL' : 'ACTUAL') : 'YO', tagBg: isCur ? 'var(--verde-tinte)' : 'var(--n-50)' };
  },

  // Asignar desde afuera: mismo PATCH que el detalle, sin abrir el ticket
  quickAssign(t, id, sure) {
    if (!sure && !t.asig && id) {
      this.setState({ qa: null });
      const to = (this.user(id) || {}).nombre;
      this.confirmOr('assign', { title: '¿Asignar TIC-' + t.id + ' a ' + (id === this.me().id ? 'vos' : to) + '?', sub: t.status === 'open' ? 'Pasa a En progreso y aparece en su bandeja.' : 'Aparece en su bandeja.', ok: 'Asignar' }, () => this.quickAssign(t, id, true));
      return;
    }
    if (!sure && t.asig && t.asig !== id) {
      this.setState({ qa: null });
      const prev = (this.user(t.asig) || {}).nombre || 'otra persona';
      const to = id ? (this.user(id) || {}).nombre : null;
      this.confirmOr(id ? 'reassign' : 'unassign', id
        ? (id === this.me().id
          ? { title: '¿Tomar TIC-' + t.id + '?', sub: 'Hoy lo tiene ' + prev + '. Pasa a vos y a ' + prev.split(' ')[0] + ' le deja de aparecer en su bandeja.', ok: 'Tomar ticket' }
          : { title: '¿Reasignar TIC-' + t.id + ' a ' + to + '?', sub: 'Hoy lo tiene ' + prev + '. Le deja de aparecer en su bandeja.', ok: 'Reasignar' })
        : { title: '¿Quitar la asignación de TIC-' + t.id + '?', sub: prev + ' deja de tenerlo y vuelve a la cola sin asignar.', ok: 'Quitar asignación', danger: true },
        () => this.quickAssign(t, id, true));
      return;
    }
    this.setState({ qa: null });
    if (t.asig === id) return;
    const nombre = id ? this.user(id).nombre : 'nadie';
    const snap = this.snapshot(t.id);
    this.optimistic('assign-' + t.id,
      () => this.patch(t.id, { asig: id, status: id && t.status === 'open' ? 'in_progress' : t.status }, id ? 'Asignado a ' + nombre + (id === this.me().id ? ' (se lo tomó)' : '') : 'Asignación quitada', 'assign'),
      () => this.restore(t.id, snap),
      id ? (id === this.me().id ? 'Tomaste TIC-' + t.id + '.' : 'TIC-' + t.id + ' asignado a ' + nombre.split(' ')[0] + '.') : 'TIC-' + t.id + ' quedó sin asignar.',
      'HTTP 500 · PATCH /api/tickets/' + t.id + '/assign');
    this.pill(900);
  },

  // Editar: admin en lo suyo o sin dueño; usuario en lo suyo sin cerrar. Misma regla que los botones.
  canEditT(t) {
    if (!t) return false;
    return this.state.role === 'admin' ? !this.othersTicket(t) : (t.autor === this.me().id && t.status !== 'closed');
  },

  addComment(alsoClose) {
    if (this.replyLock(this.ticket(this.state.detailId))) return;
    if (alsoClose && (this.ticket(this.state.detailId) || {}).asig !== this.me().id) { this.setState({ commentErr: 'Solo quien tiene asignado el ticket puede cerrarlo.' }); return; }
    const txt = this.state.comment.trim();
    if (!txt) { this.setState({ commentErr: 'Escribí un comentario antes de publicar.' }); return; }
    const me = this.me(), id = this.state.detailId;
    this.saveDraft('t' + id, '');
    const prev = this.ticket(id) || {}, prevStatus = prev.status, prevHist = prev.historial, prevComments = prev.comentarios;
    this.setState(s => ({
      comment: '', commentErr: '',
      tickets: s.tickets.map(t => t.id === id ? Object.assign({}, t, { comentarios: t.comentarios.concat([{ autor: me.id, texto: txt, h: 0, at: Date.now() }]) }) : t)
    }));
    if (!alsoClose) { this.say('Comentario publicado.'); return; }
    this.patch(id, { status: 'closed' }, 'Ticket cerrado con una última respuesta', 'close');
    this.cierre(id, () => {
      clearTimeout(this._moment);
      this.setState(st => ({
        tickets: st.tickets.map(t => t.id === id ? Object.assign({}, t, { status: prevStatus, historial: prevHist, comentarios: prevComments }) : t),
        moment: null, comment: txt
      }));
      this.say('Deshecho. El ticket volvió a ' + ST[prevStatus].label + ' y recuperamos tu texto.');
    });
  }
};
