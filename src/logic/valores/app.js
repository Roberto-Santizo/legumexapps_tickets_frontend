// Valores para la plantilla — marco de la aplicación: hoja, notificaciones, navegación, rol, 403/404 y encabezado.
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.
import * as api from '../../services/api.js';
import { NAV_INK } from '../../config/constantes.js';

export const valoresApp = {
  valoresApp(v, ctx) {
    const { s, me, isAdmin } = ctx;
    const bare = true;
    const shortVh = typeof window !== 'undefined' && window.innerHeight < 652;
    const noPageScroll = (s.screen === 'chat' && !shortVh) || s.screen === 'users';
    v.sheetOverflow = noPageScroll ? 'hidden' : 'auto';
    v.onSheetScroll = this._onSheetScroll || (this._onSheetScroll = e => this.sheetEdges(e.currentTarget));
    if (typeof requestAnimationFrame !== 'undefined') requestAnimationFrame(() => { const el = document.querySelector('[data-sheet]'); if (el) this.sheetEdges(el); });
    v.padBottom = noPageScroll ? '16px' : '96px';
    v.sheetMask = s.screen === 'tickets' ? 'linear-gradient(to bottom, var(--n-1000) 0, var(--n-1000) calc(100% - 72px), rgba(0,0,0,var(--fb,0.12)) 100%)' : 'none';
    v.sheetBg = bare ? 'transparent' : 'rgba(var(--sf-rgb),0.86)';
    v.sheetBlur = bare ? 'none' : 'blur(10px) saturate(1.1)';
    v.sheetShadow = bare ? 'none' : '0 1px 2px rgba(0,0,0,0.06),0 0 0 1px var(--n-200),0 24px 48px -24px rgba(11,42,30,0.18)';

    const nf = this.notifList(me, isAdmin);
    const nUnread = nf.filter(n => !n.read).length;
    v.notifOpen = !!s.notifOpen; v.hasUnread = nUnread > 0; v.unreadLabel = nUnread > 9 ? '9+' : String(nUnread);
    v.unreadNote = nUnread ? nUnread + ' SIN LEER' : 'AL DÍA';
    v.bellAria = nUnread ? 'Notificaciones, ' + nUnread + ' sin leer' : 'Notificaciones';
    v.bellBg = s.notifOpen ? 'var(--n-0)' : 'transparent';
    v.bellShadow = s.notifOpen ? '0 1px 2px rgba(0,0,0,0.06),0 0 0 1px var(--n-200)' : 'none';
    v.bellPolling = !!s.notifPolling; v.bellSvgDisplay = s.notifPolling ? 'none' : 'block';
    v.bellAnim = s.notifPing ? 'iconBurst 640ms cubic-bezier(0.34,1.56,0.64,1) both' : 'none';
    v.onBell = () => this.setState(st => ({ notifOpen: !st.notifOpen }));
    v.onBellClose = () => this.setState({ notifOpen: false });
    v.onReadAll = () => this.markRead(me, nf.map(n => n.key));
    v.notifs = nf.map(n => ({ kind: n.kind, kindColor: n.kindColor, code: 'TIC-' + n.tid, when: this.ago(n.h), title: n.title, sub: n.sub,
      dot: n.read ? 'transparent' : 'var(--azul)', weight: n.read ? '400' : '600', bg: n.read ? 'var(--n-0)' : 'var(--aviso-no-leido)',
      go: () => { this.markRead(me, [n.key]); this.setState({ notifOpen: false }); if (n.chat) this.openChat(n.tid); else this.openTicket(n.tid); } }));
    v.noNotifs = nf.length === 0;
    this._nUnread = nUnread;
    v.onLogout = () => { api.logout(); clearInterval(this._pollIv); this.setState({ session: null, authed: false, notifOpen: false, email: '', password: '', loginPhase: '', showPwd: false, screen: 'tickets', detailId: null }); };

    v.meNombre = me.nombre; v.meIni = this.ini(me.nombre); v.meRing = this.ring(me.id); v.meRol = isAdmin ? 'Administrador' : 'Usuario';
    // Tema: el ícono muestra el actual; tocar pasa al siguiente (Claro → Oscuro → Auto)
    const tema = s.tema || 'sistema';
    v.temaClaro = tema === 'claro'; v.temaOscuro = tema === 'oscuro'; v.temaAuto = tema === 'sistema';
    v.temaLabel = 'Tema: ' + (tema === 'claro' ? 'claro' : tema === 'oscuro' ? 'oscuro' : 'automático (según el equipo)') + '. Tocá para cambiarlo.';
    v.onTema = () => this.ciclarTema();
    v.onAyuda = () => this.iniciarRecorrido();
    const ra = this.seg(isAdmin), ru = this.seg(!isAdmin);
    v.adminBg = ra.bg; v.adminBorder = ra.border; v.userBg = ru.bg; v.userBorder = ru.border;
    const roleReset = { detailId: null, screen: 'tickets', chatId: null, chatOpen: false, chatMsg: '', chatErr: '', scope: 'all', chatScope: 'all', chatStatus: 'all', nudgedOnly: false, notifOpen: false, statusFilter: 'all', prioFilter: 'all', qa: null, asigOpen: false };
    v.onRoleAdmin = () => {};
    v.onRoleUser = () => {};

    const mine = this.visible();
    const navDefs = [{ key: 'tickets', label: 'Tickets', count: String(mine.length) }];
    if (isAdmin) {
      navDefs.push({ key: 'pulso', label: 'Métricas', count: String(mine.filter(t => t.status !== 'closed' && this.sla(t).late).length) });
      navDefs.push({ key: 'cats', label: 'Categorías', count: String(s.cats.length) });
      navDefs.push({ key: 'users', label: 'Usuarios', count: String(s.users.length) });
    }
    const waitsNav = t => { if (t.status === 'closed' || !(t.comentarios || []).length) return false; const l = t.comentarios[t.comentarios.length - 1]; return isAdmin ? (l.autor === t.autor && t.asig === me.id) : l.autor !== me.id; };
    navDefs.push({ key: 'chat', label: 'Chat', count: String(mine.filter(waitsNav).length) });
    const activeKey = (s.screen === 'detail' || s.screen === 'create' || s.screen === 'edit') ? 'tickets' : s.screen;
    const activeIdx = navDefs.findIndex(n => n.key === activeKey);
    v.navPillOn = activeIdx >= 0;
    v.navPillY = (activeIdx < 0 ? 0 : activeIdx * 48) + 'px';
    v.booting = s.booting;
    // si se entró con la transición del login, la sierra ya está en su lugar: no vuelve a subir
    v.fondoSinSubida = !!s.entradaSuave;
    v.bootAnim = s.bootFading ? 'bootOut var(--duration-page) var(--ease-standard) both' : 'none';
    // Móvil: la barra lateral es un menú deslizable. Cualquier botón o enlace de adentro
    // navega o filtra, así que al tocarlo el menú se cierra (como en Gmail).
    v.esMovil = !!s.movil;
    v.menuMovilAbierto = !!(s.movil && s.menuMovil);
    v.onAbrirMenu = () => this.setState({ menuMovil: true, notifOpen: false });
    v.onCerrarMenu = () => this.setState({ menuMovil: false });
    v.onMenuTap = this._onMenuTap || (this._onMenuTap = e => {
      if (this.state.menuMovil && e.target.closest && e.target.closest('button, a')) this.setState({ menuMovil: false });
    });
    v.onHome = () => { this.setState({ screen: 'tickets', detailId: null, dir: 'down', chatOpen: false }); this.load(500); };
    v.navItems = navDefs.map(n => ({
      label: n.label, count: n.count, recorrido: 'nav-' + n.key,
      weight: n.key === activeKey ? '500' : '400',
      hoverBg: n.key === activeKey ? 'transparent' : 'rgba(var(--sf-rgb),0.7)',
      pressBg: n.key === activeKey ? 'rgba(10,10,10,0.06)' : 'var(--fondo-2)',
      // Un acento por sección: aparece solo cuando está activa o señalada, nunca en reposo.
      ink: 'var(--n-900)',
      iconColor: n.key === activeKey ? 'var(--n-900)' : s.navHover === n.key ? NAV_INK[n.key] : 'var(--n-600)',
      countColor: n.key === activeKey ? 'var(--n-600)' : 'var(--n-500)',
      isTickets: n.key === 'tickets', isCats: n.key === 'cats', isUsers: n.key === 'users', isPulso: n.key === 'pulso', isChat: n.key === 'chat',
      // El trazo se redibuja cada vez que el puntero entra: navTick reinicia la animación.
      // Al salir vuelve a 'none', así que al re-entrar la animación arranca de cero sola.
      anim: s.navHover === n.key
        ? (n.key === 'pulso' ? 'navEcg 1000ms' : 'navDraw 620ms') + ' var(--ease-standard) both'
        : 'none',
      pulseColor: n.key === activeKey ? 'var(--n-900)' : s.navHover === 'pulso' ? NAV_INK.pulso : 'var(--n-600)',
      onEnter: () => this.setState({ navHover: n.key }),
      onLeave: () => this.setState({ navHover: '' }),
      go: () => {
        if (this.state.nudgedOnly) this.setState({ nudgedOnly: false });
        if (n.key === 'chat') { this.setState({ chatOpen: false, chatQ: '' }); }
        const from = navDefs.findIndex(x => x.key === activeKey), to = navDefs.findIndex(x => x.key === n.key);
        this.setState({ screen: n.key, detailId: null, dir: to === from ? 'none' : to > from ? 'up' : 'down' });
        this.load(500);
      }
    }));

    const forced = s.forced;
    const natural403 = (s.screen === 'cats' || s.screen === 'users' || s.screen === 'pulso' || s.screen === 'entity') && !isAdmin;
    v.showForbidden = forced === '401' || natural403;
    v.forbiddenCode = forced === '401' ? 'HTTP 401' : 'HTTP 403';
    v.forbiddenMsg = forced === '401'
      ? 'Tu sesión caducó o el token ya no es válido. Iniciá sesión otra vez para seguir.'
      : 'Esta sección es solo para administradores. Si necesitás acceso, pedíselo a un admin del área.';
    const canSee = id => this.visible().some(t => t.id === id);
    v.showNotFound = forced === '404' || (s.screen === 'detail' && !canSee(s.detailId)) || (s.screen === 'edit' && !canSee(s.editId));
    v.notFoundMsg = 'El ticket que buscás no existe o fue eliminado. Puede que el enlace esté viejo o que el código tenga un dígito de más.';
    v.show500 = s.err500;
    v.err500Line = s.err500Line || 'HTTP 500 · GET /api/tickets';
    v.saving = !!s.saving;
    v.hasSessionMsg = !!s.sessionMsg; v.sessionMsg = s.sessionMsg;
    v.tapRetry = this.tapped('retry', 'iconSpinTap', 620);
    v.onRetry = () => this.tap('retry', () => { this.setState({ err500: false }); this.say('Datos actualizados.'); });
    v.onDismiss500 = () => this.setState({ err500: false });
    v.onBackToTickets = () => this.setState({ screen: 'tickets', detailId: null, forced: 'ninguno', dir: 'back' });

    const blocked = v.showForbidden || v.showNotFound;
    v.showList = s.screen === 'tickets' && !blocked;
    v.showForm = (s.screen === 'create' || (s.screen === 'edit' && !!this.ticket(s.editId))) && !blocked;
    v.showDetail = s.screen === 'detail' && canSee(s.detailId) && !blocked;
    v.showEntity = s.screen === 'entity' && !!s.entity && isAdmin && !blocked;
    v.showCats = s.screen === 'cats' && isAdmin && !blocked;
    v.showUsers = s.screen === 'users' && isAdmin && !blocked;
    v.showChatPage = s.screen === 'chat' && !blocked;
    v.showPulso = s.screen === 'pulso' && isAdmin && !blocked;
    v.onHeaderBack = () => {
      if (this.state.screen === 'entity') { this.closeEntity(); return; }
      this.setState({ screen: 'tickets', detailId: null, dir: 'back' });
      this.load(420);
    };

    const det = this.ticket(s.detailId);
    v.crumb = s.screen === 'entity' && s.entity ? (s.entity.type === 'cat' ? 'CATEGORÍAS / ' : 'USUARIOS / ') + (s.entity.id ? 'EDITAR' : 'NUEVO')
      : s.screen === 'detail' && det ? 'TICKETS / TIC-' + det.id : s.screen === 'create' ? 'TICKETS / NUEVO'
      : s.screen === 'edit' && s.editId ? 'TICKETS / TIC-' + s.editId + ' / EDITAR' : 'LEGUMEX';
    v.pageTitle = s.screen === 'entity' && s.entity ? (s.entity.type === 'cat' ? (s.entity.id ? 'Editar categoría' : 'Nueva categoría') : (s.entity.id ? 'Editar usuario' : 'Nuevo usuario'))
      : s.screen === 'create' ? 'Crear ticket' : s.screen === 'edit' ? 'Editar ticket' : s.screen === 'cats' ? 'Categorías' : s.screen === 'users' ? 'Usuarios' : s.screen === 'pulso' ? 'Métricas del área'
      : s.screen === 'detail' ? 'Detalle del ticket' : isAdmin ? 'Todos los tickets' : 'Mis tickets';
    ctx.mine = mine;
    ctx.det = det;
  }
};
