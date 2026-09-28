// Valores para la plantilla — chat (página, panel flotante y botón).
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.
import { ST } from '../../config/constantes.js';
import { MACROS, MACROS_USER } from '../../config/textos.js';

export const valoresChat = {
  valoresChat(v, ctx) {
    const { s, me, isAdmin, mine, det } = ctx;
    // en pantallas táctiles no hay Shift+Enter: el cuadro solo invita a escribir
    v.chatPh = s.movil ? 'Escribe tu respuesta' : 'Escribe tu respuesta — Enter envía, Shift+Enter salta línea';
    // --- conversaciones (dock, solo admin) ---
    // Admin: espera si el último comentario es del solicitante. Usuario: si el último es de alguien del área.
    const waits = t => {
      if (t.status === 'closed' || !(t.comentarios || []).length) return false;
      const last = t.comentarios[t.comentarios.length - 1];
      return isAdmin ? last.autor === t.autor : last.autor !== me.id;
    };
    const nWait = mine.filter(waits).length;
    const formScreen = s.screen === 'create' || s.screen === 'edit' || s.screen === 'entity';
    v.chatFab = s.authed && !s.chatOpen && !formScreen && s.screen !== 'chat';
    v.fabSize = s.fabSmall ? '40px' : '52px';
    v.gridGutter = s.authed ? '92px' : '24px';
    v.fabIcon = s.fabSmall ? '17' : '21';
    // E6 · el sistema vive en una pestaña fija todo el día
    const nTab = this._nUnread > 0 ? this._nUnread : 0;
    const tituloPestana = nTab > 0 ? '(' + nTab + ') Legumex' : 'Legumex';
    if (typeof document !== 'undefined' && document.title !== tituloPestana) document.title = tituloPestana;
    v.chatWaiting = String(nWait); v.hasChatWaiting = nWait > 0;
    v.chatOpen = !!s.chatOpen;
    v.onOpenChat = () => this.setState({ chatOpen: true, chatId: null, chatMsg: '', chatErr: '', chatQ: '' });
    v.onCloseChat = () => this.setState({ chatOpen: false });
    // en el teléfono el panel ya ocupa toda la pantalla: no hay a dónde "expandir"
    v.chatExpandOn = !s.movil;
    v.chatVolverOn = !!s.movil;
    v.onChatExpand = () => { const already = s.screen === 'chat'; this.setState({ chatOpen: false, screen: 'chat', detailId: null, dir: already ? 'none' : 'up' }); if (!already) this.load(420); };
    v.onChatBack = () => this.setState({ chatId: null, chatMsg: '', chatErr: '' });
    v.canChatDetail = !!det;
    v.onChatFromDetail = () => this.openChat(det.id);
    const ct = s.chatId && this.visible().some(t => t.id === s.chatId) ? this.ticket(s.chatId) : null;
    v.chatConvPane = !!ct; v.chatListPane = !ct;
    v.chatPageConv = !!ct; v.chatPageEmpty = !ct;
    // Llamar desde el chat: a la otra parte del ticket (mismo registro que en el detalle)
    const otro = ct ? this.user(ct.autor === me.id ? ct.asig : ct.autor) : null;
    v.chatCallOn = !!(otro && otro.email && otro.id !== me.id) && !this.othersTicket(ct);
    v.chatCallUrl = otro ? 'https://teams.microsoft.com/l/call/0/0?users=' + otro.email : '';
    v.chatCallLabel = otro ? 'Llamar por Teams a ' + otro.nombre : '';
    v.onChatCall = e => this.llamarTeams(e, ct, otro);
    // Dos paneles solo si entran; si no, lista o conversación (la flecha vuelve a la lista)
    const wide = s.chatWide !== false;
    v.chatCols = wide ? 'minmax(260px,340px) minmax(0,1fr)' : 'minmax(0,1fr)';
    v.chatShowList = wide || !ct; v.chatShowRight = wide || !!ct;
    v.chatListBorder = wide ? '1px solid var(--n-200)' : 'none';
    // Ref estable: si cambiara en cada render, React desconectaría el observer antes de su primer aviso
    this._chatPageRef = this._chatPageRef || (el => {
      if (this._chatEl === el) return;
      if (this._chatRO) { this._chatRO.disconnect(); this._chatRO = null; }
      this._chatEl = el;
      if (!el) return;
      const check = w => { const wide = w >= 760; if (wide !== (this.state.chatWide !== false)) this.setState({ chatWide: wide }); };
      check(el.getBoundingClientRect().width);
      if (typeof ResizeObserver === 'undefined') return;
      this._chatRO = new ResizeObserver(en => check(en[0].contentRect.width));
      this._chatRO.observe(el);
    });
    v.chatPageRef = this._chatPageRef;
    v.chatPageHint = nWait > 0 ? 'Arriba de la lista están las ' + nWait + ' que esperan tu respuesta.' + (s.movil ? '' : ' Enter envía, Shift+Enter salta línea.') : 'Nadie espera respuesta ahora. Lo que escribas acá se publica como comentario del ticket.';
    v.chatSub = !isAdmin
      ? (nWait > 0 ? 'El área te escribió en ' + nWait + (nWait === 1 ? ' ticket' : ' tickets') : 'Tus conversaciones con el área')
      : (nWait > 0 ? (() => { const nm = mine.filter(t => waits(t) && t.asig === me.id).length; return 'Esperan respuesta: ' + nm + (nm === 1 ? ' tuyo' : ' tuyos') + ' · ' + (nWait - nm) + ' del equipo'; })() : 'Nadie espera respuesta');
    v.chatQ = s.chatQ;
    v.onChatQ = e => this.setState({ chatQ: e.target.value });
    const chatF = [['all', 'Cualquiera'], ['open', 'Abiertos'], ['in_progress', 'En progreso'], ['closed', 'Cerrados']];
    const chatSt = (!s.chatStatus || s.chatStatus === 'mine') ? 'all' : s.chatStatus;
    const cMine = mine.filter(t => t.asig === me.id).length, cScope = s.chatScope || 'all';
    v.chatScopeOpts = [['all', 'Todos', String(mine.length)], ['mine', 'Míos', String(cMine)]].map(o => ({
      label: o[1], count: o[2], bg: cScope === o[0] ? 'var(--n-0)' : 'transparent', weight: cScope === o[0] ? '600' : '500',
      shadow: cScope === o[0] ? 'rgba(0,0,0,0.06) 0px 1px 2px 0px' : 'none', pressed: cScope === o[0] ? 'true' : 'false',
      go: () => this.setState({ chatScope: o[0] })
    }));
    v.chatFilters = chatF.map(f => ({
      label: f[1], bg: chatSt === f[0] ? 'var(--n-0)' : 'transparent',
      go: () => this.setState({ chatStatus: f[0] })
    }));
    const cq = (s.chatQ || '').trim().toLowerCase();
    const clist = mine
      .filter(t => !(isAdmin && s.chatScope === 'mine') || t.asig === me.id)
      .filter(t => chatSt === 'all' || t.status === chatSt)
      .filter(t => !cq || t.titulo.toLowerCase().indexOf(cq) >= 0 || ('tic-' + t.id).indexOf(cq) >= 0)
      .slice()
      .sort((a, b) => (waits(b) ? 1 : 0) - (waits(a) ? 1 : 0) || this.lastAt(a) - this.lastAt(b));
    v.chatList = clist.map(t => {
      const last = (t.comentarios || [])[t.comentarios.length - 1];
      const otherId = isAdmin || t.autor !== me.id ? t.autor : t.asig;
      const au = this.user(otherId) || { nombre: 'Tickets TIC' };
      return {
        code: 'TIC-' + t.id, titulo: t.titulo, ini: this.ini(au.nombre), ring: this.ring(otherId),
        dot: ST[t.status].dot, bg: s.chatId === t.id ? 'var(--n-50)' : 'transparent',
        blobRef: el => { if (el) el.src = this.blobUrl(otherId, 60); }, hasBlob: !!otherId, noBlob: !otherId,
        last: last ? ((last.autor === me.id ? 'Tú: ' : '') + last.texto) : 'Sin respuestas todavía',
        lastInk: last ? 'var(--n-600)' : 'var(--n-500)',
        when: this.ago(this.lastAt(t)).replace('hace ', ''),
        waiting: waits(t), asigId: t.asig || null,
        waitLabel: !isAdmin || t.asig === me.id ? 'Espera tu respuesta' : t.asig ? 'Espera a ' + ((this.user(t.asig) || {}).nombre || 'el equipo').split(' ')[0] : 'Espera que alguien lo tome',
        waitDot: !isAdmin || t.asig === me.id ? 'var(--azul)' : 'var(--n-500)',
        waitBg: !isAdmin || t.asig === me.id ? 'var(--azul-tinte)' : 'var(--n-50)',
        go: () => this.setState({ chatId: t.id, chatMsg: '', chatErr: '' })
      };
    });
    v.chatEmpty = clist.length === 0;
    const wl0 = v.chatList.filter(x => x.waiting);
    const wMine = wl0.filter(x => x.asigId === me.id), wTeam = wl0.filter(x => x.asigId !== me.id);
    const wl = isAdmin ? wMine.concat(wTeam) : wl0;
    v.chatWaitList = wl.slice(0, 4).map((x, i) => {
      const mineW = x.asigId === me.id, ow = this.user(x.asigId);
      return Object.assign({}, x, { delay: (i * 60) + 'ms', ownOn: isAdmin,
        own: mineW ? 'TUYO' : ow ? 'EQUIPO · ' + ow.nombre.split(' ')[0].toUpperCase() : 'SIN ASIGNAR',
        ownInk: mineW ? 'var(--azul)' : 'var(--n-600)', ownBorder: mineW ? 'var(--azul)' : 'var(--n-300)' });
    });
    v.chatHasWait = wl.length > 0;
    const pl = (n, a, b) => n + ' ' + (n === 1 ? a : b);
    v.chatEmptyTitle = isAdmin && wl.length
      ? (wMine.length && wTeam.length ? pl(wMine.length, 'tuyo', 'tuyos') + ' y ' + wTeam.length + ' del equipo esperan respuesta'
        : wMine.length ? pl(wMine.length, 'ticket tuyo espera', 'tickets tuyos esperan') + ' respuesta'
        : pl(wTeam.length, 'ticket del equipo espera', 'tickets del equipo esperan') + ' respuesta')
      : !isAdmin
      ? (wl.length ? 'El área te escribió en ' + (wl.length === 1 ? '1 ticket' : wl.length + ' tickets') : 'Estás al día con el área')
      : (wl.length ? (wl.length === 1 ? '1 persona espera tu respuesta' : wl.length + ' personas esperan tu respuesta') : 'Nadie espera respuesta');
    v.chatPageHint = wl.length ? 'Empieza por la más vieja.' + (s.movil ? '' : ' Enter envía, Shift+Enter salta línea.') : 'Elige cualquier conversación de la lista; lo que escribas se publica como comentario del ticket.';
    v.chatFabOn = !!v.chatFab && s.screen !== 'chat';
    this._chatEls = this._chatEls || new Set();
    v.chatRef = this._chatRefFn || (this._chatRefFn = el => { if (el) { this._chatEls.add(el); el.scrollTop = el.scrollHeight; } });
    const chatKey = ct ? ct.id + '|' + (ct.comentarios || []).length + '|' + (ct.adjuntos || []).length : '';
    if (chatKey !== this._chatKey) {
      this._chatKey = chatKey;
      requestAnimationFrame(() => this._chatEls.forEach(el => { if (!el.isConnected) { this._chatEls.delete(el); return; } el.scrollTop = el.scrollHeight; }));
    }
    if (ct) {
      const cau = this.user(ct.autor) || {};
      const cst = ST[ct.status];
      v.chatCode = 'TIC-' + ct.id; v.chatTitulo = ct.titulo; v.chatDesc = ct.desc;
      v.chatAutor = cau.nombre || '—';
      v.chatStatusLabel = cst.label; v.chatStatusDot = cst.dot;
      const cImgs = (ct.adjuntos || []);
      const cLb = cImgs.map(a => ({ url: a.url || '', nombre: a.nombre, tipo: (a.tipo || 'IMG').split(' ')[0], meta: [a.tipo, a.peso, 'SUBIDA POR ' + ((this.user(a.autor) || {}).nombre || '—').toUpperCase()].filter(Boolean).join(' · ') }));
      const tl = (ct.comentarios || []).map((c, i) => ({ c, i, h: c.h || 0, file: false }))
        .concat(cImgs.map((a, i) => ({ c: a, i, h: a.h || 0, file: true })))
        .map((x, k) => Object.assign(x, { k, at: x.c.at || 0 })).sort((a, b) => (b.h - a.h) || (a.at - b.at) || (a.k - b.k));
      v.chatMsgs = tl.map(x => {
        const c = x.c, i = x.i;
        const u = this.user(c.autor) || {}, isMine = c.autor === me.id;
        return {
          isText: !x.file, isFile: x.file,
          fileName: x.file ? c.nombre : '', fileMeta: x.file ? [c.tipo, c.peso].filter(Boolean).join(' · ') : '',
          fileUrl: x.file ? (c.url || '') : '', fileHasUrl: x.file && !!c.url, fileNoUrl: x.file && !c.url,
          open: x.file ? () => this.openLb(cLb, i) : null,
          key: (x.file ? 'f' : 'm') + i + '-' + c.h, texto: x.file ? '' : c.texto,
          theirs: !isMine, just: isMine ? 'flex-end' : 'flex-start', align: isMine ? 'flex-end' : 'flex-start',
          bg: isMine ? 'var(--n-950)' : 'var(--n-0)', ink: isMine ? 'var(--n-0)' : 'var(--n-900)',
          border: isMine ? 'none' : '1px solid var(--n-200)',
          ini: this.ini(u.nombre), ring: this.ring(c.autor), blobRef: el => { if (el) el.src = this.blobUrl(c.autor, 52); }, hasBlob: true, noBlob: false,
          head: (isMine ? 'Tú' : (u.nombre || '—')) + ' · ' + this.ago(c.h)
        };
      });
      v.chatNoMsgs = tl.length === 0;
      const cst2 = s.staged.filter(y => y.tid === ct.id);
      const cstLb = cst2.map(y => ({ url: y.url, nombre: y.nombre, tipo: 'IMG', meta: 'SIN ENVIAR · ' + y.peso }));
      v.chatStaged = cst2.map((y, i) => ({ key: y.id, nombre: y.nombre, url: y.url, open: () => this.openLb(cstLb, i), remove: () => this.setState(st => ({ staged: st.staged.filter(z => z.id !== y.id) })) }));
      v.chatHasStaged = cst2.length > 0;
      v.chatStagedNote = cst2.length === 1 ? '1 imagen lista · se envía con tu respuesta' : cst2.length + ' imágenes listas · se envían con tu respuesta';
      const cup = s.uploads.filter(y => y.tid === ct.id && !y.failed);
      v.chatUploading = cup.length > 0;
      v.chatUpTiles = cup.map(y => ({ key: y.id, nombre: y.nombre, rest: (100 - Math.round(y.pct || 0)) + '%', pctLabel: Math.round(y.pct || 0) + '%' }));
      v.chatUpNote = cup.length === 1 ? 'Subiendo ' + cup[0].nombre + ' · ' + Math.round(cup[0].pct) + '%' : 'Subiendo ' + cup.length + ' imágenes';
      const cfail = s.uploads.filter(y => y.tid === ct.id && y.failed);
      v.chatUpFail = cfail.length > 0; v.chatUpFailMsg = cfail.length ? cfail[cfail.length - 1].nombre + ' · ' + cfail[cfail.length - 1].msg : '';
      v.onChatUpFailX = () => this.setState(st => ({ uploads: st.uploads.filter(y => !(y.tid === ct.id && y.failed)) }));
      v.onChatPick = e => { this.pickFiles(e.target.files, ct.id); e.target.value = ''; };
      v.chatMsg = s.chatMsg;
      v.onChatMsg = e => this.setState({ chatMsg: e.target.value, chatErr: '' });
      v.chatHasErr = !!s.chatErr; v.chatErr = s.chatErr || '';
      v.chatSending = !!s.chatSending; v.chatIdle = !s.chatSending;
      v.onChatSend = () => {
        if (s.chatSending) return;
        if (!(s.chatMsg || '').trim() && !s.staged.some(x => x.tid === ct.id)) { this.setState({ chatErr: 'Escribe una respuesta o adjunta una imagen antes de enviar.' }); return; }
        this.setState({ chatSending: true });
        clearTimeout(this._cs); this._cs = setTimeout(() => { this.chatSend(false); this.setState({ chatSending: false }); }, 450);
      };
      v.onChatSendClose = () => (s.chatMsg || '').indexOf('______') >= 0 ? this.setState({ chatErr: 'Completa el resumen donde dice ______ antes de cerrar.' }) : !(s.chatMsg || '').trim() ? this.setState({ chatErr: 'Escribe la respuesta con la que quieres cerrar el ticket.' }) : this.confirmOr('close', { title: '¿Enviar y cerrar TIC-' + ct.id + '?', sub: 'La respuesta se envía y el ticket pasa a Cerrado.', ok: 'Enviar y cerrar', danger: true }, () => this.heavy('Publicando y cerrando', 900, () => this.chatSend(true)));
      v.onChatKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); v.onChatSend(); } };
      v.chatCanClose = ct.status !== 'closed' && ct.asig === me.id;
      const cHueco = 'Se resolvió: ______. Si vuelve a pasar, responde este correo y lo reabrimos.';
      const cMacros = (isAdmin ? MACROS : MACROS_USER).concat(v.chatCanClose ? [{ label: 'Cerrar con resumen', text: cHueco }] : []);
      v.chatMacros = cMacros.map(m => ({ label: m.label, text: m.text, use: () => this.setState({ chatMsg: m.text, chatErr: '' }) }));
      v.onChatOpenTicket = () => { this.setState({ chatOpen: false }); this.openTicket(ct.id); };
      v.chatCanEdit = (isAdmin && !this.othersTicket(ct)) || (!isAdmin && ct.autor === me.id && ct.status !== 'closed');
      v.onChatEdit = () => { this.setState({ chatOpen: false }); this.openEdit(ct); };
      v.chatCanReopen = ct.status === 'closed' && isAdmin && !this.othersTicket(ct);
      const crl = this.replyLock(ct);
      v.chatCanReply = !crl; v.chatReplyLocked = !!crl; v.chatReplyLockMsg = crl ? crl.msg : ''; v.chatReplyLockTake = !!(crl && crl.take);
      v.chatReplyLockTake = !!(crl && (crl.take || crl.reopen || crl.follow));
      v.chatReplyTakeLabel = crl && crl.follow ? 'Sigue pasando' : crl && crl.reopen ? 'Reabrir ticket' : crl && crl.steal ? 'Tomar yo' : 'Tomar para responder';
      v.chatReplyOnTake = () => crl && crl.follow ? this.followUp(ct) : crl && crl.reopen ? v.onChatReopen() : crl && crl.steal ? this.quickAssign(ct, me.id) : this.take(ct);
      const cSent = this.resolvedSent(ct);
      v.chatResolvedShow = !isAdmin && ct.autor === me.id && ct.status !== 'closed';
      v.chatResolvedDis = cSent; v.chatResolvedOp = cSent ? '0.5' : '1'; v.chatResolvedCur = cSent ? 'default' : 'pointer';
      v.chatResolvedShort = cSent ? 'Avisado' : 'Ya se resolvió';
      v.chatResolvedLabel = cSent ? 'Ya avisaste que se resolvió' : 'Avisar al área que ya se resolvió';
      v.onChatResolved = () => this.markResolved(ct);
      const cYa = this.nudgedRecently(ct, me.nombre);
      v.chatNudgeShow = !isAdmin && ct.autor === me.id && ct.status !== 'closed' && !this.waitingOnRequester(ct);
      v.chatNudgeDis = cYa; v.chatNudgeOp = cYa ? '0.45' : '1'; v.chatNudgeCur = cYa ? 'default' : 'pointer';
      v.chatNudgeLabel = cYa ? 'Ya lo marcaste como bloqueante hoy' : 'Esto me está frenando: subirlo en la cola';
      v.onChatNudge = () => { if (cYa) return; this.confirmOr('nudge', { title: '¿Marcar TIC-' + ct.id + ' como bloqueante?', sub: 'Sube en la cola del área y lo ven marcado. Se puede usar una vez por día.', ok: 'Sí, me está frenando', danger: true }, () => { this.nudge(ct); this.bloqueante(ct.id); }); };
      v.onChatReopen = () => this.confirmOr('reopen', { title: '¿Reabrir TIC-' + ct.id + '?', sub: 'Vuelve a Abierto y reaparece en la bandeja. El solicitante recibe el aviso.', ok: 'Reabrir' }, () => this.heavy('Reabriendo el ticket', 900, () => { this.reopen(ct); this.reapertura(ct.id); }));
    }
  }
};
