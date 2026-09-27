// Valores para la plantilla — detalle de un ticket.
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.
import * as api from '../../services/api.js';
import { ST, PR } from '../../config/constantes.js';
import { MACROS, MACROS_USER } from '../../config/textos.js';

export const valoresDetalle = {
  valoresDetalle(v, ctx) {
    const { s, me, isAdmin, det } = ctx;
    // detalle
    if (det) {
      const st = ST[det.status], pr = PR[det.prio], asig = this.user(det.asig);
      v.dTitulo = det.titulo; v.dCode = 'TIC-' + det.id; v.dDesc = det.desc;
      v.dStatusLabel = st.label; v.dStatusBg = st.bg; v.dStatusDot = st.dot;
      v.dStatusOpen = det.status === 'open'; v.dStatusProg = det.status === 'in_progress'; v.dStatusClosed = det.status === 'closed';
      v.dPrioLabel = pr.label; v.dPrioDot = pr.dot;
      v.dCat = this.cat(det.cat); v.dAutor = (this.user(det.autor) || {}).nombre || '—';
      v.dAsig = asig ? asig.nombre : 'Sin asignar'; v.dAsigId = det.asig ? String(det.asig) : '';
      v.dCreado = det.creado; v.dUpdated = this.ago(this.idle(det));
      const dsla = this.sla(det);
      v.dSlaLabel = dsla.label; v.dSlaFull = dsla.full || dsla.label;
      v.dSlaLate = dsla.late; v.dSlaWatch = dsla.watch; v.dSlaOk = dsla.ok && !dsla.waiting; v.dSlaDone = dsla.done; v.dSlaWaiting = !!dsla.waiting;
      v.dSlaBg = 'var(--n-0)';
      v.dSlaBorder = dsla.late ? '1px solid var(--naranja)' : dsla.done ? '1px solid var(--verde)' : dsla.waiting ? '1px solid var(--n-300)' : '1px solid var(--n-200)';
      // "En tiempo" sin decir en tiempo para qué no significa nada, y la meta es jerga interna
      // que nadie se compromete a cumplir: el solicitante ve la línea de situación en su lugar.
      v.dShowMeta = isAdmin;
      v.dSlaBlock = isAdmin || !!dsla.waiting;
      v.dFirstLabel = isAdmin ? 'Primera respuesta' : 'Te respondieron';
      const autorU = this.user(det.autor), asigU = this.user(det.asig);
      v.dAutorCall = !!(autorU && autorU.email && autorU.id !== me.id) && !this.othersTicket(det);
      v.dAutorTeams = autorU ? 'https://teams.microsoft.com/l/call/0/0?users=' + autorU.email : '';
      v.onCallAutor = e => this.llamarTeams(e, det, autorU);
      v.dAsigCall = !!(asigU && asigU.email && asigU.id !== me.id);
      v.dAsigTeams = asigU ? 'https://teams.microsoft.com/l/call/0/0?users=' + asigU.email : '';
      v.onCallAsig = e => this.llamarTeams(e, det, asigU);
      v.dSlaTarget = 'Meta para prioridad ' + PR[det.prio].label.toLowerCase() + ': ' + this.dur(dsla.target);
      v.dActivity = this.activity(det);
      v.dActivityCount = String(det.comentarios.length + det.historial.length + det.adjuntos.length);
      v.dNoComments = det.comentarios.length === 0;
      v.dCommentCount = String(det.comentarios.length);
      const puedeCerrar = det.status !== 'closed' && det.asig === me.id;
      // D1 · un cierre enlatado hace sentir procesado: la macro deja un hueco obligatorio.
      const HUECO = 'Se resolvió: ______. Si vuelve a pasar, respondé este correo y lo reabrimos.';
      const macroList = (isAdmin ? MACROS : MACROS_USER).map(m => ({ label: m.label, text: m.text }));
      const rl = this.replyLock(det);
      v.dCanReply = !rl; v.dReplyLocked = !!rl; v.dReplyLockMsg = rl ? rl.msg : ''; v.dReplyLockTake = !!(rl && rl.take);
      v.dReplyLockTake = !!(rl && (rl.take || rl.reopen || rl.follow));
      v.dReplyTakeLabel = rl && rl.follow ? 'Sigue pasando' : rl && rl.reopen ? 'Reabrir ticket' : rl && rl.steal ? 'Tomar yo' : 'Tomar para responder';
      v.dReplyOnTake = () => rl && rl.follow ? this.followUp(det) : rl && rl.reopen ? v.onReopen() : rl && rl.steal ? this.quickAssign(det, me.id) : this.take(det);
      v.commentPh = isAdmin ? 'Escribí una actualización para el solicitante' : 'Escribile al área: qué probaste, qué cambió, cuándo estás';
      const tieneResp = (det.comentarios || []).some(c => c.autor !== det.autor);
      v.dResolvedShow = !isAdmin && det.autor === me.id && det.status !== 'closed';
      const yaAviso = this.resolvedSent(det);
      v.dResolvedDis = yaAviso; v.dResolvedOp = yaAviso ? '0.5' : '1'; v.dResolvedCur = yaAviso ? 'default' : 'pointer';
      v.dResolvedLabel = yaAviso ? 'Avisaste que se resolvió' : 'Ya se resolvió';
      v.onResolved = () => this.markResolved(det);
      v.dFollowShow = !isAdmin && det.autor === me.id && det.status === 'closed';
      v.onFollowUp = () => this.followUp(det);
      if (puedeCerrar) macroList.push({ label: 'Cerrar con resumen', text: HUECO });
      v.macros = macroList.map(m => ({
        label: m.label,
        use: () => {
          this.setState({ comment: m.text, commentErr: '' });
          if (m.text !== HUECO) return;
          const i = m.text.indexOf('______');
          setTimeout(() => {
            const el = document.getElementById('tic-comment');
            if (el) { el.focus(); el.setSelectionRange(i, i + 6); }
          }, 30);
        }
      }));
      // D3 · el comentario no manda correo: solo la creación y el cierre lo hacen.
      const otro = det.autor === me.id ? (this.user(det.asig) || null) : (this.user(det.autor) || null);
      v.dMailNote = 'Esto no envía correo — ' + (otro ? otro.nombre.split(' ')[0] : 'la otra parte') + ' lo verá al entrar al sistema.';
      // B4 · el reclamo del solicitante, como evento de historial y no como comentario
      const esAutor = det.autor === me.id;
      const esperandoloEl = this.waitingOnRequester(det);
      v.dNudgeAsk = esAutor && esperandoloEl;
      v.dNudgeShow = esAutor && det.status !== 'closed' && !esperandoloEl;
      const yaMarco = this.nudgedRecently(det, me.nombre);
      const ultimoNudge = this.nudges(det).filter(x => x.autor === me.nombre)[0];
      v.dNudgeOp = yaMarco ? '0.45' : '1';
      v.dNudgeCursor = yaMarco ? 'default' : 'pointer';
      v.dNudgeTitle = yaMarco ? 'Ya lo marcaste ' + this.ago(ultimoNudge ? ultimoNudge.h : 0) : 'Sube el ticket en la cola del área';
      v.dNudgeNote = yaMarco
        ? 'Ya quedó marcado. El área lo ve en su bandeja.'
        : 'Esto lo sube en la cola de TI. Usalo si de verdad te está frenando.';
      v.onNudge = () => { if (yaMarco) return; this.confirmOr('nudge', { title: '¿Marcar TIC-' + det.id + ' como bloqueante?', sub: 'Sube en la cola del área y lo ven marcado. Se puede usar una vez por día.', ok: 'Sí, me está frenando', danger: true }, () => { this.nudge(det); this.bloqueante(det.id); }); };
      v.onFocusComment = () => { const el = document.getElementById('tic-comment'); if (el) el.focus(); };
      v.dFirstResp = this.firstResponse(det) != null ? (isAdmin ? this.dur(this.firstResponse(det)) : 'a las ' + this.dur(this.firstResponse(det))) : 'Sin respuesta aún';
      const lbList = det.adjuntos.map(f => ({ url: f.url || '', nombre: f.nombre, tipo: (f.tipo || 'IMG').split(' ')[0], meta: [f.tipo, f.peso, 'SUBIDA POR ' + ((this.user(f.autor) || {}).nombre || '—').toUpperCase()].filter(Boolean).join(' · ') }));
      v.dFiles = det.adjuntos.map((f, i) => ({ nombre: f.nombre, tipo: f.tipo, peso: f.peso, url: f.url || '', hasUrl: !!f.url, noUrl: !f.url,
        open: () => this.openLb(lbList, i),
        key: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.openLb(lbList, i); } } }));
      v.dNoFiles = det.adjuntos.length === 0;
      v.canTakeDetail = isAdmin && !det.asig && det.status !== 'closed';
      v.tapTakeDetail = this.tapped('taked');
      v.onTakeDetail = () => this.tap('taked', () => this.take(det));
      v.canReopen = det.status === 'closed' && isAdmin && !this.othersTicket(det);
      v.tapReopen = this.tapped('reopen', 'iconSpinTap', 620);
      v.onReopen = () => this.tap('reopen', () => this.confirmOr('reopen', { title: '¿Reabrir TIC-' + det.id + '?', sub: 'Vuelve a Abierto y reaparece en la bandeja. El solicitante recibe el aviso.', ok: 'Reabrir' }, () => this.heavy('Reabriendo el ticket', 900, () => { this.reopen(det); this.reapertura(det.id); })));
      v.canAssign = isAdmin && det.status !== 'closed';
      v.canUpload = this.puedeAdjuntar(det);
      v.tapUpload = this.tapped('upload', 'iconDrop', 520);
      v.onUpload = () => {
        this.tap('upload');
        const el = document.getElementById('tic-file');
        if (el) el.click();
      };
      v.onFileChange = e => { this.pickFiles(e.target.files); e.target.value = ''; };
      const upsDet = s.uploads.filter(u => !u.tid || u.tid === det.id);
      v.uploads = upsDet.map(u => ({
        id: u.id, nombre: u.nombre, peso: u.peso, failed: u.failed, ok: !u.failed, msg: u.msg,
        pct: Math.round(u.pct) + '%', pctLabel: Math.round(u.pct) + '%', rest: (100 - Math.round(u.pct)) + '%',
        dismiss: () => this.setState(st => ({ uploads: st.uploads.filter(x => x.id !== u.id) }))
      }));
      v.hasUploads = upsDet.length > 0;
    const stg = s.staged.filter(x => x.tid === s.detailId);
    const stgLb = stg.map(y => ({ url: y.url, nombre: y.nombre, tipo: 'IMG', meta: 'SIN ENVIAR · ' + y.peso }));
    v.staged = stg.map((x, i) => ({ nombre: x.nombre, peso: x.peso, url: x.url,
      open: () => this.openLb(stgLb, i),
      remove: () => this.setState(st => ({ staged: st.staged.filter(y => y.id !== x.id) })) }));
    v.hasStaged = stg.length > 0;
    v.stagedCount = String(stg.length);
    v.stagedLabel = stg.length === 1 ? 'Enviar 1 imagen' : 'Enviar ' + stg.length + ' imágenes';
    v.tapStage = this.tapped('stage');
    v.onSendStaged = () => this.tap('stage', () => this.sendStaged());
    v.onDropStaged = () => this.setState(st => ({ staged: st.staged.filter(y => y.tid !== s.detailId) }));
      // en computadora también se puede arrastrar la imagen desde la carpeta: se sube al soltarla
      v.uploadRule = s.movil ? 'JPG, PNG o WEBP, hasta 5 MB — se revisa antes de subir' : 'JPG, PNG o WEBP, hasta 5 MB — o arrastrala acá y se sube sola';
      v.canClose = det.status !== 'closed' && det.asig === me.id;
      v.canEdit = (isAdmin && !this.othersTicket(det)) || (!isAdmin && det.autor === me.id && det.status !== 'closed');
      const act = this.visible().filter(t => t.status !== 'closed');
      const setAsig = (id, sure) => {
        if (id && det.asig === id) { this.setState({ asigOpen: false }); return; } // elegir a quien ya lo tiene no escribe historial
        if (!sure && id && !det.asig) {
          this.setState({ asigOpen: false });
          this.confirmOr('assign', { title: '¿Asignar TIC-' + det.id + ' a ' + (id === me.id ? 'vos' : this.user(id).nombre) + '?', sub: det.status === 'open' ? 'Pasa a En progreso y aparece en su bandeja.' : 'Aparece en su bandeja.', ok: 'Asignar' }, () => setAsig(id, true));
          return;
        }
        if (!sure && id && det.asig && det.asig !== id) {
          this.setState({ asigOpen: false });
          const prevN = (this.user(det.asig) || {}).nombre || 'otra persona';
          this.confirmOr('reassign', id === me.id
            ? { title: '¿Tomar TIC-' + det.id + '?', sub: 'Hoy lo tiene ' + prevN + '. Pasa a vos y a ' + prevN.split(' ')[0] + ' le deja de aparecer en su bandeja.', ok: 'Tomar ticket' }
            : { title: '¿Reasignar TIC-' + det.id + ' a ' + this.user(id).nombre + '?', sub: 'Hoy lo tiene ' + prevN + '. Le deja de aparecer en su bandeja.', ok: 'Reasignar' }, () => setAsig(id, true));
          return;
        }
        const nombre = id ? this.user(id).nombre : 'nadie';
        const snap = this.snapshot(det.id);
        this.setState({ asigOpen: false });
        this.optimistic('assign-' + det.id,
          () => this.patch(det.id, { asig: id, status: id && det.status === 'open' ? 'in_progress' : det.status }, id ? 'Asignado a ' + nombre + (id === this.me().id ? ' (se lo tomó)' : '') : 'Asignación quitada', 'assign'),
          () => this.restore(det.id, snap),
          id ? (id === me.id ? 'Tomaste el ticket.' : 'Ticket asignado a ' + nombre + '.') : 'Ticket sin asignar.',
          'HTTP 500 · PATCH /api/tickets/' + det.id + '/assign');
      };
      // Persona "olgazán" (solicitante): el sistema insiste por el técnico y cierra solo si nadie contesta
      const W_REM = 48, W_CLOSE = 168;
      const dsl = this.sla(det);
      v.fuOn = !!dsl.waiting && !api.USE_API; // sin recordatorio ni cierre automático en el backend
      if (v.fuOn) {
        const idle = dsl.idle, manual = det.recordado != null;
        const remSent = manual || idle >= W_REM;
        const remAgo = manual ? det.recordado : idle - W_REM;
        const sol = (this.user(det.autor) || {}).nombre || 'el solicitante';
        const dot = done => ({ dotBg: done ? 'var(--azul)' : 'var(--n-0)', dotBorder: done ? 'var(--azul)' : 'var(--n-300)' });
        v.fuSteps = [
          Object.assign({ label: 'El área respondió', sub: 'hace ' + this.dur(idle), done: true }, dot(true)),
          Object.assign({ label: 'Recordatorio a ' + sol, sub: remSent ? (manual ? 'Enviado a mano ' : 'Salió solo ') + (remAgo < 1 ? 'recién' : 'hace ' + this.dur(remAgo)) + ' por correo' : 'Sale solo en ' + this.dur(W_REM - idle) + ' por correo', done: remSent }, dot(remSent)),
          Object.assign({ label: 'Cierre automático', sub: (isAdmin ? 'Si no contesta, se cierra solo' : 'Si no respondés, lo cerramos') + ' · se puede reabrir', done: false }, dot(false))
        ];
        v.fuLeft = 'CIERRA EN ' + this.dur(Math.max(0, W_CLOSE - idle)).toUpperCase();
        v.fuPct = Math.min(100, Math.round(idle / W_CLOSE * 100)) + '%';
        v.fuCanRemind = isAdmin && !this.othersTicket(det) && !(manual && det.recordado < 24);
        v.tapRemind = this.tapped('remind');
        v.onRemindNow = () => this.tap('remind', () => this.confirmOr('remind', { title: '¿Recordarle a ' + sol + '?', sub: 'Le llega un correo ahora. El cierre automático sigue su curso.', ok: 'Enviar recordatorio' }, () => this.heavy('Enviando el recordatorio', 800, () => {
          this.patch(det.id, { recordado: 0 });
          this.pill();
          this.say('Le recordamos a ' + sol + ' por correo. El cierre automático sigue su curso.');
        })));
      }
      // Persona "olgazán" (técnico): tomado, pasado de margen y sin movimiento → sugerir a quien tiene menos carga
      const alt = isAdmin && det.asig && det.status !== 'closed' && dsl.late
        ? this.state.users.filter(u => u.rol === 'admin' && u.activo && u.id !== det.asig).sort((a, b) => this.loadOf(a.id).n - this.loadOf(b.id).n)[0] : null;
      v.stuckOn = !!alt;
      if (alt) {
        const quien = (this.user(det.asig) || {}).nombre || 'Quien lo tomó';
        v.stuckTitle = quien.split(' ')[0] + ' lo tiene hace ' + this.dur(dsl.idle) + ' sin movimiento';
        v.stuckSub = 'Pasó su margen de ' + this.dur(dsl.target) + '. ' + alt.nombre.split(' ')[0] + ' tiene la carga más baja del área (' + this.loadOf(alt.id).n + ' activos).';
        v.stuckBtn = 'Pasárselo a ' + alt.nombre.split(' ')[0];
        v.onStuckReassign = () => this.confirmOr('reassign', { title: '¿Pasar TIC-' + det.id + ' a ' + alt.nombre + '?', sub: 'Hoy lo tiene ' + quien + '. Le deja de aparecer en su bandeja.', ok: 'Reasignar' }, () => this.heavy('Reasignando', 800, () => { setAsig(alt.id, true); this.pill(); }));
      }
      v.asigOpen = !!s.asigOpen;
      v.onToggleAsig = () => this.setState(st => ({ asigOpen: !st.asigOpen }));
      v.asigBtnLabel = det.asig ? ((this.user(det.asig) || {}).nombre || '') + (det.asig === me.id ? ' (yo)' : '') : 'Sin asignar';
      v.asigBtnIni = det.asig ? this.ini((this.user(det.asig) || {}).nombre) : '';
      v.asigBtnRing = this.ring(det.asig);
      v.asigHasPerson = !!det.asig;
      v.asigNone = !det.asig;
      v.asigClear = () => { const prev = (this.user(det.asig) || {}).nombre || 'otra persona'; this.confirmOr('unassign', { title: '¿Quitar la asignación de TIC-' + det.id + '?', sub: prev + ' deja de tenerlo y vuelve a la cola sin asignar.', ok: 'Quitar asignación', danger: true }, () => setAsig(null, true)); };
      v.assignables = s.users.filter(u => u.rol === 'admin' && u.activo !== false).map(u => {
        const ld = this.loadOf(u.id), n = ld.n, lateN = ld.late;
        return Object.assign(this.asigOptLabel(u, det.asig), {
          id: u.id, ini: this.ini(u.nombre), ring: this.ring(u.id),
          isAdmin: u.rol === 'admin', on: det.asig === u.id, isMe: u.id === me.id,
          load: n === 0 ? 'Libre' : n + (n === 1 ? ' activo' : ' activos'),
          loadInk: lateN > 0 ? 'var(--n-900)' : 'var(--n-500)',
          hasLate: lateN > 0, lateLabel: lateN + ' sin mover',
          pick: () => setAsig(u.id)
        });
      }).sort((a, b) => (b.on - a.on) || (b.isMe - a.isMe) || (a.hasLate === b.hasLate ? 0 : a.hasLate ? 1 : -1));

      v.tapClose = this.tapped('close');
      v.onAskClose = () => this.tap('close', () => this.openModal({ type: 'confirm', kind: 'ticket', danger: true, title: 'Cerrar TIC-' + det.id + '?', sub: 'El solicitante recibe un aviso y el ticket deja de aparecer entre los activos. Podés reabrirlo desde el historial.', ok: 'Cerrar ticket' }));
      v.onEditTicket = () => this.openEdit(det);
    }
    v.onBack = () => { this.setState({ screen: 'tickets', detailId: null, dir: 'back' }); this.load(450); };
    v.comment = s.comment; v.commentErr = s.commentErr;
    v.onComment = e => {
      const txt = e.target.value;
      if (s.detailId) this.saveDraft('t' + s.detailId, txt);
      this.setState({ comment: txt, commentErr: '' });
    };
    v.hasDraft = !!(s.screen === 'detail' && s.comment.trim());
    v.draftLine = 'Borrador guardado en este equipo — si se cae la sesión, sigue acá';
    v.tapComment = this.tapped('comment', 'iconSend', 620);
    v.onAddComment = () => {
      if (!s.comment.trim()) { this.setState({ commentErr: 'Escribí un comentario antes de publicar.' }); return; }
      this.tap('comment');
      this.run('comment', 500, () => this.addComment(false));
    };
    v.tapCommentClose = this.tapped('commentclose');
    v.onCommentAndClose = () => {
      if (!s.comment.trim()) { this.setState({ commentErr: 'Escribí la respuesta con la que querés cerrar el ticket.' }); return; }
      this.tap('commentclose');
      this.confirmOr('close', { title: '¿Publicar y cerrar TIC-' + det.id + '?', sub: 'La respuesta se publica y el ticket pasa a Cerrado.', ok: 'Publicar y cerrar', danger: true }, () => this.heavy('Publicando y cerrando', 900, () => this.addComment(true)));
    };
    v.busyCommentClose = s.busy === 'commentclose'; v.busyCommentCloseOp = s.busy === 'commentclose' ? '0' : '1';
  }
};
