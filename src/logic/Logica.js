// Lógica del sistema: estado único y reglas (roles, permisos, asignación, chat, filtros).
// Los métodos viven en ./metodos y los valores para la plantilla en ./valores; aquí queda
// el estado inicial, el ciclo de vida y renderVals(), que arma "V" para la interfaz.
import { LogicaBase } from './LogicaBase.js';
import { MQ_MOVIL } from '../config/constantes.js';
import * as api from '../services/api.js';
import * as sync from '../services/sync.js';
import { metodosTiempos } from './metodos/tiempos.js';
import { metodosInterfaz } from './metodos/interfaz.js';
import { metodosSesion } from './metodos/sesion.js';
import { metodosTickets } from './metodos/tickets.js';
import { metodosFormulario } from './metodos/formulario.js';
import { metodosUrl } from './metodos/url.js';
import { metodosAdjuntos } from './metodos/adjuntos.js';
import { metodosChat } from './metodos/chat.js';
import { metodosPulso } from './metodos/pulso.js';
import { metodosCatalogos } from './metodos/catalogos.js';
import { metodosNotificaciones } from './metodos/notificaciones.js';
import { metodosRecorrido } from './metodos/recorrido.js';
import { valoresLogin } from './valores/login.js';
import { valoresApp } from './valores/app.js';
import { valoresPulso } from './valores/pulso.js';
import { valoresLista } from './valores/lista.js';
import { valoresFormulario } from './valores/formulario.js';
import { valoresDetalle } from './valores/detalle.js';
import { valoresCatalogos } from './valores/catalogos.js';
import { valoresModal } from './valores/modal.js';
import { valoresCapas } from './valores/capas.js';
import { valoresTitulos } from './valores/titulos.js';
import { valoresEntidad } from './valores/entidad.js';
import { valoresChat } from './valores/chat.js';

export class Logica extends LogicaBase {
  state = {
    authed: false, email: '', password: '', loginErr: '',
    role: this.props.rolInicial || 'admin',
    screen: 'tickets',
    view: (this.props.vistaInicial === 'tabla' || this.props.vistaInicial === 'table') ? 'table' : this.props.vistaInicial === 'kanban' ? 'kanban' : 'cards',
    tap: '', undo: null,
    q: '', searchOpen: false, statusFilter: 'all', prioFilter: 'all', dStatus: 'all', dPrio: 'all',
    chatOpen: false, chatId: null, chatQ: '', chatStatus: 'all', chatMsg: '', chatErr: '', fabSmall: false,
    booting: true, bootFading: false, navHover: '', detailId: null, cursor: -1,
    form: { titulo: '', desc: '', cat: '', status: 'open', prio: 'medium' },
    editId: null, dir: 'none', celebrate: null,
    formErr: null, comment: '', commentErr: '',
    entity: null, modal: null, toast: '', seq: 1042, sort: this.props.ordenInicial === 'recientes' ? 'recientes' : 'urgencia',
    err500: this.props.estadoError === '500',
    forced: this.props.estadoError || 'ninguno',
    page: { tickets: 0, cats: 0, users: 0 },
    loading: true, swap: 0, busy: '', modalClosing: false, toastOut: false,
    heavyMsg: '', moment: null, qa: null, staged: [], lightbox: null, viewOpen: false, periodOpen: false, period: '30', fichaId: null,
    uploads: [], saving: '', err500Line: 'HTTP 500 · GET /api/tickets', draftFound: false, sessionOk: true, sessionMsg: '',
    dragId: null, dragOver: null, landed: null, asigOpen: false, arrastre: false, recorrido: null, recRect: null,
    // Diseño móvil: se calcula al arrancar para no pintar primero el de escritorio
    movil: typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(MQ_MOVIL).matches,
    menuMovil: false,
    tema: (() => { try { return localStorage.getItem('mt-tema') || 'sistema'; } catch (e) { return 'sistema'; } })(),
    // Sin datos de arranque: llegan de la API. En modo demostración los manda main.jsx
    // desde src/mocks/datosDemo.js (prop datosDemo).
    users: (this.props.datosDemo || {}).users || [],
    cats: (this.props.datosDemo || {}).cats || [],
    tickets: (this.props.datosDemo || {}).tickets || []
  };

  componentDidMount() {
    if (api.USE_API) sync.silent(() => this.setState({ tickets: [], cats: [] }));
    api.onUnauthorized(() => { if (this.state.authed) { clearInterval(this._pollIv); this.setState({ session: null, authed: false, screen: 'tickets', detailId: null, loginPhase: '', loginErr: 'Tu sesión expiró. Vuelve a entrar.' }); } });
    if (api.USE_API && api.getToken()) api.checkStatus().then(d => this.applySession(d)).catch(() => {});
    this._boot = setTimeout(() => {
      this.setState({ bootFading: true });
      this._bootOut = setTimeout(() => this.setState({ booting: false }), 280);
    }, 1250);

    this._onScroll = () => {
      if (!this.state.fabSmall) this.setState({ fabSmall: true });
      clearTimeout(this._fabT);
      this._fabT = setTimeout(() => this.setState({ fabSmall: false }), 400);
    };
    window.addEventListener('scroll', this._onScroll, true);
    this.escucharMovil();
    this.escucharArrastre();
    this.escucharLuz();
    this.escucharTeclado();
    this.aplicarFase(); this._faseIv = setInterval(() => this.aplicarFase(), 60000);
    this.aplicarTema(this.state.tema);
    this.load(650);
    this._vis = () => {
      if (document.visibilityState !== 'visible' || !this.state.authed) return;
      this.setState({ sessionMsg: 'Verificando sesión…' });
      clearTimeout(this._sess);
      this._sess = setTimeout(() => {
        if (this.props.estadoError === '401') {
          this.setState({ sessionOk: false, sessionMsg: 'Sesión caducada', forced: '401' });
          return;
        }
        this.setState({ sessionOk: true, sessionMsg: 'Sesión verificada al volver' });
      }, 600);
    };
    document.addEventListener('visibilitychange', this._vis);
    this._hash = () => { if (this.state.authed) this.applyUrl(); };
    window.addEventListener('hashchange', this._hash);
    this._keys = e => {
      const s = this.state;
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ''));
      // Recorrido guiado abierto: Escape sale y las flechas pasan de paso (solo mientras está abierto)
      if (s.fichaId && e.key === 'Escape') { this.cerrarFicha(); return; }
      if (s.recorrido) {
        if (e.key === 'Escape') this.salirRecorrido();
        else if (e.key === 'ArrowRight') this.pasoRecorrido(1);
        else if (e.key === 'ArrowLeft') this.pasoRecorrido(-1);
        return;
      }
      if (s.lightbox) {
        if (e.key === 'Escape') this.setState({ lightbox: null });
        else if (e.key === '+' || e.key === '=') this.lbZoomAt(((s.lbZ || {}).z || 1) * 1.5, 0, 0);
        else if (e.key === '-') this.lbZoomAt(((s.lbZ || {}).z || 1) / 1.5, 0, 0);
        else if (e.key === '0') this.setState({ lbZ: { z: 1, x: 0, y: 0 } });
        else if (e.key === 'ArrowRight') this.lbStep(1);
        else if (e.key === 'ArrowLeft') this.lbStep(-1);
        return;
      }
      if (e.key === 'Escape' && s.menuMovil) { this.setState({ menuMovil: false }); return; }
      if (e.key === 'Escape' && s.qa) { this.setState({ qa: null }); return; }
      if (e.key === 'Escape' && s.notifOpen) { this.setState({ notifOpen: false }); return; }
      if (e.key === 'Escape' && (s.viewOpen || s.periodOpen)) { this.setState({ viewOpen: false, periodOpen: false }); return; }
      if (e.key === 'Escape') {
        if (s.asigOpen) { this.setState({ asigOpen: false }); return; }
        if (s.filterOpen) { this.setState({ filterOpen: false }); return; }
        if (typing && (s.searchOpen || s.q) && (e.target.id === 'tic-search')) { e.target.blur(); this.setState(st => ({ q: '', searchOpen: false, swap: st.swap + 1, page: Object.assign({}, st.page, { tickets: 0 }) })); return; }
        if (s.moment) { this.endMoment(true); return; }
        if (s.modal) { this.closeModal(); return; }
        if (s.celebrate) { this.goToNew(); return; }
        if (s.screen === 'entity') { this.closeEntity(); return; }
        if (s.screen === 'detail' || s.screen === 'create' || s.screen === 'edit') { this.setState({ screen: 'tickets', detailId: null, editId: null, dir: 'back' }); return; }
        return;
      }
      // Sin atajos de una tecla (C, V, /, J, K, flechas, Enter): chocaban con Ctrl+C / Ctrl+V
      // y con el desplazamiento normal. Solo quedan Escape y las teclas del visor de imágenes.
    };
    document.addEventListener('keydown', this._keys);
    this.applyUrl();
  }

  componentWillUnmount() {
    clearInterval(this._clk);
    clearTimeout(this._load); clearTimeout(this._busy); clearTimeout(this._t); clearTimeout(this._toast);
    clearTimeout(this._modal); clearTimeout(this._celeb); clearTimeout(this._heavy); clearTimeout(this._moment); clearTimeout(this._tap); clearTimeout(this._save); clearTimeout(this._sess); clearTimeout(this._land);
    if (this._keys) document.removeEventListener('keydown', this._keys);
    if (this._vis) document.removeEventListener('visibilitychange', this._vis);
    if (this._hash) window.removeEventListener('hashchange', this._hash);
    if (this._onScroll) window.removeEventListener('scroll', this._onScroll, true);
    if (this._mqMovil) this._mqMovil.removeEventListener('change', this._onMq);
    this.dejarDeEscucharArrastre();
    if (this._onLuz) document.removeEventListener('pointermove', this._onLuz);
    if (this._onFoco) document.removeEventListener('focusin', this._onFoco);
    clearTimeout(this._focoT);
    clearInterval(this._faseIv);
    if (this._onRecMedir) { window.removeEventListener('resize', this._onRecMedir); window.removeEventListener('scroll', this._onRecMedir, true); }
    clearInterval(this._recT); cancelAnimationFrame(this._recRaf); cancelAnimationFrame(this._cuentaRaf);
    clearTimeout(this._boot); clearTimeout(this._bootOut);
    cancelAnimationFrame(this._fillRaf);
    clearTimeout(this._fabT);
  }

  componentDidUpdate(prev) {
    // App.jsx no pasa el estado anterior de la lógica: se guarda acá el último que se pintó
    this.acomodarScroll(this._estadoPintado);
    this._estadoPintado = this.state;
    if (prev.estadoError !== this.props.estadoError) {
      const v = this.props.estadoError || 'ninguno';
      this.setState({ forced: v, err500: v === '500', err500Line: 'HTTP 500 · GET /api/tickets' });
    }
    this.writeUrl();
  }

  // Arma el objeto V que consume la interfaz (layouts/Interfaz.jsx). Cada sección escribe
  // sus claves en "v"; el orden importa porque algunas leen lo que dejó una anterior.
  renderVals() {
    const s = this.state, me = this.me(), isAdmin = s.role === 'admin';
    const v = {};
    const ctx = { s, me, isAdmin };
    this.valoresLogin(v, ctx);
    this.valoresApp(v, ctx);
    this.valoresPulso(v, ctx);
    this.valoresLista(v, ctx);
    this.valoresFormulario(v, ctx);
    this.valoresDetalle(v, ctx);
    this.valoresCatalogos(v, ctx);
    this.valoresModal(v, ctx);
    this.valoresCapas(v, ctx);
    this.valoresTitulos(v, ctx);
    this.valoresEntidad(v, ctx);
    this.valoresChat(v, ctx);
    return v;
  }
}

Object.assign(Logica.prototype,
  metodosTiempos,
  metodosInterfaz,
  metodosSesion,
  metodosTickets,
  metodosFormulario,
  metodosUrl,
  metodosAdjuntos,
  metodosChat,
  metodosPulso,
  metodosCatalogos,
  metodosNotificaciones,
  metodosRecorrido,
  valoresLogin,
  valoresApp,
  valoresPulso,
  valoresLista,
  valoresFormulario,
  valoresDetalle,
  valoresCatalogos,
  valoresModal,
  valoresCapas,
  valoresTitulos,
  valoresEntidad,
  valoresChat
);
