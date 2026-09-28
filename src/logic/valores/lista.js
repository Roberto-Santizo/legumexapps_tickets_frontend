// Valores para la plantilla — lista de tickets (tarjetas, tabla, kanban, filtros y métricas propias).
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.
import { ST, PR } from '../../config/constantes.js';

export const valoresLista = {
  valoresLista(v, ctx) {
    const { s, me, isAdmin, mine, det } = ctx;
    // listado
    v.q = s.q;
    v.hasQuery = !!s.q; v.noQuery = !s.q;
    v.notList = !v.showList;
    v.searchOpen = !!s.searchOpen || !!s.q; v.searchClosed = !v.searchOpen;
    v.onOpenSearch = () => { this.setState({ searchOpen: true }); setTimeout(() => { const el = document.getElementById('tic-search'); if (el) el.focus(); }, 30); };
    v.onBlurSearch = () => { if (!this.state.q) this.setState({ searchOpen: false }); };
    v.onClearQuery = () => this.setState(st => ({ q: '', searchOpen: false, swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) }));
    v.onQuery = e => this.setState(st => ({ q: e.target.value, swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) }));
    v.onClearFilters = () => this.setState(st => ({ q: '', searchOpen: false, statusFilter: 'all', prioFilter: 'all', dStatus: 'all', dPrio: 'all', filterOpen: false, cursor: -1, swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) }));
    const filters = [['all', 'Todos'], ['open', 'Abiertos'], ['in_progress', 'En progreso'], ['closed', 'Cerrados']];
    v.statusFilters = filters.map(f => {
      const sg = this.seg(s.dStatus === f[0]);
      return {
        label: f[1], bg: s.dStatus === f[0] ? 'var(--n-50)' : 'transparent', border: sg.border, on: s.dStatus === f[0], off: s.dStatus !== f[0],
        hasDot: f[0] !== 'all', dot: f[0] === 'all' ? 'var(--n-500)' : ST[f[0]].dot,
        count: String(f[0] === 'all' ? mine.length : mine.filter(t => t.status === f[0]).length),
        go: () => this.setState({ dStatus: f[0] })
      };
    });
    const prios = [['all', 'Toda prioridad', null], ['high', 'Alta', PR.high.dot], ['medium', 'Media', PR.medium.dot], ['low', 'Baja', PR.low.dot]];
    v.prioFilters = prios.map(p => {
      const sg = this.seg(s.dPrio === p[0]);
      return {
        label: p[1], bg: s.dPrio === p[0] ? 'var(--n-50)' : 'transparent', border: sg.border, hasDot: !!p[2], dot: p[2] || 'var(--n-500)',
        on: s.dPrio === p[0], off: s.dPrio !== p[0],
        count: String(p[0] === 'all' ? mine.length : mine.filter(t => t.prio === p[0]).length),
        go: () => this.setState({ dPrio: p[0] })
      };
    });
    const q = s.q.trim().toLowerCase();
    const rank = t => {
      if (t.status === 'closed') return -1;
      const sl = this.sla(t);
      return (sl.waiting ? 0 : sl.ratio) + (t.asig ? 0 : 0.25) + (this.nudges(t).length ? 1.5 : 0);
    };
    const limH = isAdmin ? ({ hoy: 24, '7': 168, '30': 720 }[s.period || '30'] || 0) : 0;
    const filtered0 = mine.filter(t => {
      const okS = s.statusFilter === 'all' || t.status === s.statusFilter;
      const okP = s.prioFilter === 'all' || t.prio === s.prioFilter;
      const okQ = !q || t.titulo.toLowerCase().includes(q) || String(t.id).includes(q) || ('tic-' + t.id).includes(q);
      if (isAdmin && s.scope === 'mine' && t.asig !== me.id) return false; // para el usuario, 'mine' se ignora
      if (s.nudgedOnly) return t.status !== 'closed' && this.nudges(t).length > 0 && okQ;
      return okS && okP && okQ && (!limH || t.h <= limH);
    });
    this._shown = filtered0;
    const byUrgency = isAdmin && s.sort !== 'recientes';
    const filtered = byUrgency ? filtered0.slice().sort((a, b) => rank(b) - rank(a)) : filtered0.slice().sort((a, b) => a.h - b.h);
    v.sortFilters = [['urgencia', 'Urgencia'], ['recientes', 'Recientes']].map(f => {
      const sg = this.seg((s.sort || 'urgencia') === f[0]);
      return { label: f[1], bg: sg.bg, border: sg.border, go: () => this.setState(st => ({ sort: f[0], cursor: -1, swap: st.swap + 1 })) };
    });
    v.sortNote = byUrgency ? 'Lo que lleva más tiempo sin moverse va primero' : 'Los más nuevos van primero';
    const pgT = this.pager('tickets', filtered.length);
    v.pgTickets = pgT;
    const pageRows = filtered.slice(pgT.offset, pgT.offset + pgT.limit);
    this._rowIds = pageRows.map(t => t.id);
    const cur = Math.min(s.cursor, pageRows.length - 1);
    v.rows = pageRows.map((t, i) => {
      const r = this.rowFor(t);
      r.focusBorder = i === cur ? 'var(--n-900)' : 'var(--n-200)';
      r.focusShadow = i === cur ? 'rgba(0,0,0,0.05) 0px 1px 2px 0px' : 'none';
      return r;
    });
    v.isEmpty = filtered.length === 0 && !s.loading;
    // E7 · la lista vacía de verdad es la primera impresión del cliente, no un "sin resultados"
    const diaUno = mine.length === 0 && !s.q && s.statusFilter === 'all' && s.prioFilter === 'all';
    v.emptyDayOne = diaUno;
    v.emptyTitle = diaUno ? 'Todavía no hay tickets' : 'Ningún ticket coincide con tu búsqueda';
    v.emptyHelp = diaUno
      ? 'Cuando alguien reporte algo, va a aparecer acá.'
      : 'Probá con otro texto o quitá los filtros de estado y prioridad.';
    const scoped = isAdmin && s.scope === 'mine' ? mine.filter(t => t.asig === me.id) : mine;
    v.lateCount = String(scoped.filter(t => t.status !== 'closed' && this.sla(t).late).length);
    v.hasLate = scoped.some(t => t.status !== 'closed' && this.sla(t).late);
    v.onlyLate = () => this.setState(st => ({ screen: 'tickets', detailId: null, dir: 'none', statusFilter: 'all', prioFilter: 'all', q: '', sort: 'urgencia', cursor: -1, swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) }));

    const tally = list => ({
      open: list.filter(t => t.status === 'open').length,
      prog: list.filter(t => t.status === 'in_progress').length,
      closed: list.filter(t => t.status === 'closed').length
    });
    const bd = (c, labels) => [
      { dot: ST.open.dot, count: String(c.open), label: labels[0] },
      { dot: ST.in_progress.dot, count: String(c.prog), label: labels[1] },
      { dot: ST.closed.dot, count: String(c.closed), label: labels[2] }
    ];
    const shown = tally(filtered), inbox = tally(scoped);
    v.statTotal = String(filtered.length);
    v.statTotalLabel = filtered.length === 1 ? 'ticket en vista' : 'tickets en vista';
    v.statBreakdown = bd(shown, ['abiertos', 'en progreso', 'cerrados']);
    v.inboxTotal = String(scoped.length);
    const inboxKeys = [['open', 'Abiertos', inbox.open], ['in_progress', 'En progreso', inbox.prog], ['closed', 'Cerrados', inbox.closed]];
    v.inboxBreakdown = inboxKeys.map(k => {
      const on = s.screen === 'tickets' && s.statusFilter === k[0];
      return {
        label: k[1], count: String(k[2]), dot: ST[k[0]].dot,
        bg: on ? 'var(--fondo)' : 'transparent', border: on ? '1px solid var(--borde-suave)' : '1px solid transparent',
        weight: on ? '500' : '400', countColor: on ? 'var(--n-900)' : 'var(--n-600)',
        aria: on ? 'Quitar el filtro ' + k[1] : 'Ver solo ' + k[1].toLowerCase(),
        go: () => this.setState(st => ({
          screen: 'tickets', detailId: null, dir: 'none', swap: st.swap + 1, nudgedOnly: false,
          statusFilter: (st.screen === 'tickets' && st.statusFilter === k[0]) ? 'all' : k[0],
          page: Object.assign({}, st.page, { tickets: 0 })
        }))
      };
    });
    const mm = isAdmin ? { lineas: [], overdue: false } : this.metricasPropias();
    v.misMetricas = mm.lineas;
    v.showMisMetricas = !isAdmin && mm.lineas.length > 0;
    v.mmOverdue = !isAdmin && mm.overdue;
    const marcados = scoped.filter(t => t.status !== 'closed' && this.nudges(t).length);
    v.hasNudged = isAdmin && marcados.length > 0;
    v.nudgedCount = String(marcados.length);
    v.nudgedOnlyOn = !!s.nudgedOnly && s.screen === 'tickets';
    v.ctlRow = isAdmin || v.nudgedOnlyOn;
    v.onClearNudged = () => this.setState({ nudgedOnly: false });
    const nMine = mine.filter(t => t.asig === me.id).length;
    v.scopeOpts = [['all', 'Todos', String(mine.length)], ['mine', 'Míos', String(nMine)]].map(o => ({
      label: o[1], count: o[2], bg: (s.scope || 'all') === o[0] ? 'var(--n-0)' : 'transparent', barBg: (s.scope || 'all') === o[0] ? 'var(--fondo-2)' : 'transparent', weight: (s.scope || 'all') === o[0] ? '600' : '500',
      shadow: (s.scope || 'all') === o[0] ? 'rgba(0,0,0,0.06) 0px 1px 2px 0px' : 'none', pressed: (s.scope || 'all') === o[0] ? 'true' : 'false',
      go: () => this.setState(st => ({ scope: o[0], swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) }))
    }));
    v.onlyNudged = () => this.setState(st => ({ nudgedOnly: true, screen: 'tickets', detailId: null, dir: 'none', statusFilter: 'all', prioFilter: 'all', dStatus: 'all', dPrio: 'all', q: '', sort: 'urgencia', cursor: -1, swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) }));
    const per = s.period || '30';
    v.saludo = this.saludo();
    // mini escena junto al saludo: la luna de noche, el sol el resto (la misma fase que el cielo)
    v.saludoNoche = this.faseCielo() === 'noche'; v.saludoDia = !v.saludoNoche;
    v.showGreet = !!s.greet && s.screen === 'tickets';
    v.greetAnim = s.greetOut ? 'toastOut 300ms var(--ease-standard) both' : 'dropIn 420ms var(--ease-standard) both';
    v.periodLabel = { hoy: 'hoy', '7': '7 días', '30': '30 días', todo: 'todo el historial' }[per];
    v.periodOpts = [['hoy', 'Hoy'], ['7', 'Últimos 7 días'], ['30', 'Últimos 30 días'], ['todo', 'Todo el historial']].map(o => ({
      label: o[1], on: per === o[0], bg: per === o[0] ? 'var(--n-50)' : 'transparent',
      go: () => this.setState(st => ({ period: o[0], periodOpen: false, swap: st.swap + 1 }))
    }));
    v.periodOpen = !!s.periodOpen; v.viewOpen = !!s.viewOpen;
    v.viewBtnBg = s.viewOpen ? 'var(--n-50)' : 'transparent';
    v.onTogglePeriod = () => this.setState(st => ({ periodOpen: !st.periodOpen, viewOpen: false, filterOpen: false }));
    v.onToggleView = () => this.setState(st => ({ viewOpen: !st.viewOpen, periodOpen: false, filterOpen: false }));
    v.onDismissPop = () => this.setState({ viewOpen: false, periodOpen: false });
    v.onExportList = () => { const [n, filas] = this.csvDe('tickets'); this.descargarCsv(n, filas); this.say('Descargando ' + n); };
    v.showCsv = isAdmin && (s.screen === 'pulso' || s.screen === 'cats' || s.screen === 'users');
    v.onExportCsv = () => {
      const [nombre, filas] = this.csvDe(s.screen);
      this.descargarCsv(nombre, filas);
      this.say('Descargando ' + nombre);
    };
    v.inboxHint = s.screen === 'tickets' && s.statusFilter !== 'all' ? 'Tocá de nuevo para ver todos' : 'Tocá un estado para filtrar';

    // filtro colapsado: un botón, un panel, y chips de lo que está puesto
    const chips = [];
    if (s.statusFilter !== 'all') chips.push({
      label: ST[s.statusFilter].label, dot: ST[s.statusFilter].dot, hasDot: true,
      clear: () => this.setState(st => ({ statusFilter: 'all', cursor: -1, swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) }))
    });
    if (s.prioFilter !== 'all') chips.push({
      label: 'Prioridad ' + PR[s.prioFilter].label, dot: PR[s.prioFilter].dot, hasDot: true,
      clear: () => this.setState(st => ({ prioFilter: 'all', cursor: -1, swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) }))
    });
    if (s.q.trim()) chips.push({
      label: '"' + s.q.trim() + '"', dot: 'var(--n-500)', hasDot: false,
      clear: () => this.setState(st => ({ q: '', cursor: -1, swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) }))
    });
    v.chips = chips;
    v.hasChips = chips.length > 0;
    const fcount = (s.statusFilter !== 'all' ? 1 : 0) + (s.prioFilter !== 'all' ? 1 : 0);
    v.filterCount = String(fcount);
    v.hasFilterCount = fcount > 0;
    v.filterOpen = !!s.filterOpen;
    v.filterBg = s.filterOpen || fcount > 0 ? 'var(--n-50)' : 'var(--n-0)';
    v.onToggleFilter = () => this.setState(st => st.filterOpen ? { filterOpen: false } : { filterOpen: true, dStatus: st.statusFilter, dPrio: st.prioFilter });
    v.onDismissFilter = () => this.setState({ filterOpen: false });
    v.onClearDraft = () => this.setState({ dStatus: 'all', dPrio: 'all' });
    v.draftDirty = s.dStatus !== s.statusFilter || s.dPrio !== s.prioFilter;
    v.applyLabel = v.draftDirty ? 'Aplicar' : 'Listo';
    v.onCloseFilter = () => this.setState(st => ({ statusFilter: st.dStatus, prioFilter: st.dPrio, filterOpen: false, cursor: -1, swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) }));

    const sinAsignar = mine.filter(t => t.status === 'open' && !t.asig).length;
    const activos = inbox.open + inbox.prog;
    v.pageSub = s.screen === 'entity' && s.entity ? (s.entity.type === 'cat' ? (s.entity.id ? 'Renombrarla no cambia los tickets que ya la usan.' : 'Aparecerá en el formulario de creación de tickets.') : (s.entity.id ? 'El correo es con el que inicia sesión.' : 'Podrá iniciar sesión en cuanto se cree.'))
      : s.screen === 'edit' ? 'Los campos vienen cargados — cambiá solo lo que haga falta.'
      : s.screen === 'create' ? 'Cuanto más contexto, menos ida y vuelta después.'
      : s.screen === 'cats' ? s.cats.filter(c => c.activo).length + ' de ' + s.cats.length + ' activas se ofrecen al crear un ticket'
      : s.screen === 'users' ? s.users.filter(u => u.rol === 'admin').length + ' de ' + s.users.length + ' con rol admin · la carga se calcula sobre los tickets activos'
      : s.screen === 'pulso' ? 'Calculado sobre los ' + mine.length + ' tickets cargados — sin endpoints de métricas'
      : s.screen === 'detail' && det ? (det.status === 'closed' ? 'Cerrado · sin acciones pendientes' : det.asig ? 'En manos de ' + (this.user(det.asig) || {}).nombre : 'Todavía sin asignar')
      : !isAdmin ? this.subSolicitante(mine)
      : inbox.open === 0 && inbox.prog === 0 ? 'Nada pendiente por ahora'
      : sinAsignar > 0 ? sinAsignar + (sinAsignar === 1 ? ' abierto sin asignar requiere atención' : ' abiertos sin asignar requieren atención')
      : activos + (activos === 1 ? ' ticket activo en seguimiento' : ' tickets activos en seguimiento');
    // B1 · el solicitante no recibe la cabina de admin: una sola vista, un solo orden.
    v.vistaAdmin = isAdmin;
    // En móvil hay una sola vista (tarjetas): tabla y kanban no entran en un teléfono.
    // La preferencia de escritorio (s.view) no se toca y vuelve al agrandar la ventana.
    const vistaElegible = isAdmin && !s.movil;
    v.isCards = vistaElegible ? s.view === 'cards' : true;
    v.isTable = vistaElegible && s.view === 'table'; v.isKanban = vistaElegible && s.view === 'kanban';
    const cb = this.seg(v.isCards), tb = this.seg(v.isTable), kb = this.seg(v.isKanban);
    v.cardsBg = cb.bg; v.cardsBorder = cb.border;
    v.tableBg = tb.bg; v.tableBorder = tb.border; v.kanbanBg = kb.bg; v.kanbanBorder = kb.border;
    const subSh = 'rgba(0,0,0,0.05) 0px 1px 2px 0px';
    v.cardsShadow = v.isCards ? subSh : 'none';
    v.tableShadow = v.isTable ? subSh : 'none'; v.kanbanShadow = v.isKanban ? subSh : 'none';
    v.cardsIcon = v.isCards ? 'var(--n-900)' : 'var(--n-600)';
    v.tableIcon = v.isTable ? 'var(--n-900)' : 'var(--n-600)'; v.kanbanIcon = v.isKanban ? 'var(--n-900)' : 'var(--n-600)';
    v.tapCards = this.tapped('vcards'); v.tapTable = this.tapped('vtable'); v.tapKanban = this.tapped('vkanban');
    v.onCards = () => this.tap('vcards', () => this.setState(st => ({ view: 'cards', swap: st.swap + 1 })));
    v.onTable = () => this.tap('vtable', () => this.setState(st => ({ view: 'table', swap: st.swap + 1 })));
    v.onKanban = () => this.tap('vkanban', () => this.setState(st => ({ view: 'kanban', swap: st.swap + 1 })));
    v.onNewTicket = () => this.newForm();
    v.onCopyView = () => this.tap('copy', () => this.copyView());
    v.tapCopy = this.tapped('copy');
    const colKeys = s.statusFilter === 'all' ? ['open', 'in_progress', 'closed'] : [s.statusFilter];
    v.columnCount = String(colKeys.length);
    const dragT = s.dragId ? this.ticket(s.dragId) : null;
    v.dragHint = s.dragId ? 'Soltá en otra columna para cambiar el estado' : (isAdmin ? 'Arrastrá una tarjeta de columna a columna para cambiar el estado' : 'Podés arrastrar a Cerrados los tickets que tengas asignados');
    v.isDragging = !!s.dragId;
    v.columns = colKeys.map(k => {
      const items = filtered.filter(t => t.status === k);
      const target = !!(dragT && this.canMove(dragT, k));
      const over = target && s.dragOver === k;
      const blocked = !!(dragT && dragT.status !== k && !target);
      return {
        isTarget: target, isOver: over, isBlocked: blocked,
        colBg: over ? 'var(--azul-tinte)' : 'var(--n-50)',
        colRing: over ? '1px dashed var(--azul)' : target ? '1px dashed var(--n-300)' : '1px solid transparent',
        colOp: blocked ? '0.55' : '1',
        dropLabel: over ? 'Soltar en ' + ST[k].label : '',
        countKey: k + '-' + items.length,
        onDragOver: e => {
          if (!target) return;
          e.preventDefault();
          if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
          if (s.dragOver !== k) this.setState({ dragOver: k });
        },
        onDragLeave: () => { if (this.state.dragOver === k) this.setState({ dragOver: null }); },
        onDrop: e => {
          e.preventDefault();
          const t = this.ticket(this.state.dragId);
          this.setState({ dragId: null, dragOver: null });
          if (t) this.moveTo(t, k);
        },
        label: ST[k].label, dot: ST[k].dot, count: String(items.length),
        items: items.map(t => this.rowFor(t)), empty: items.length === 0,
        emptyMsg: k === 'open' ? 'Nada esperando triage.' : k === 'in_progress' ? 'Nadie trabajando ahora.' : 'Sin cierres en este filtro.'
      };
    });
  }
};
