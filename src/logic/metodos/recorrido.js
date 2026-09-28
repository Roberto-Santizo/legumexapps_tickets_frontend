// Recorrido guiado ("¿Cómo funciona?"): pasos por rol, qué elemento se ilumina y dónde.
// Se mezclan en Logica.prototype: "this" es la instancia de Logica.
import { RECORRIDO_ADMIN, RECORRIDO_USUARIO } from '../../config/textos.js';

// Fijo o pegajoso (barras, botón flotante): no se desplaza la página para mostrarlo
const fijo = el => { for (let e = el; e && e !== document.body; e = e.parentElement) { const p = getComputedStyle(e).position; if (p === 'fixed' || p === 'sticky') return true; } return false; };

export const metodosRecorrido = {
  pasosRecorrido() { return this.state.role === 'admin' ? RECORRIDO_ADMIN : RECORRIDO_USUARIO; },

  // Arranca siempre desde la lista (ahí están los elementos que se explican) y con todo cerrado
  iniciarRecorrido() {
    this.setState({ recorrido: { i: 0 }, recRect: null, menuMovil: false, chatOpen: false, notifOpen: false, viewOpen: false, periodOpen: false, filterOpen: false,
      screen: 'tickets', detailId: null, editId: null, entity: null, dir: 'none' });
    if (!this._onRecMedir) {
      this._onRecMedir = () => { cancelAnimationFrame(this._recRaf); this._recRaf = requestAnimationFrame(() => this.medirRecorrido()); };
      window.addEventListener('resize', this._onRecMedir);
      window.addEventListener('scroll', this._onRecMedir, true);
    }
    // Lo explicado puede moverse sin que haya desplazamiento (la lista termina de cargar, entra un
    // aviso arriba, animaciones): mientras dura el recorrido se mide seguido; solo repinta si cambió
    clearInterval(this._recT); this._recT = setInterval(() => this.medirRecorrido(), 250);
    this.medirRecorrido();
  },

  pasoRecorrido(d) {
    const r = this.state.recorrido; if (!r) return;
    const n = this.pasosRecorrido().length, i = r.i + d;
    if (i < 0) return;
    if (i >= n) { this.salirRecorrido(); return; }
    // En el teléfono y la tablet, lo que vive en el menú (navegación, bandeja, tema) está
    // escondido: el menú se abre solo en esos pasos y se cierra en los demás
    const paso = this.pasosRecorrido()[i] || {};
    this.setState({ recorrido: { i }, menuMovil: !!(this.state.movil && paso.enMenu) });
    requestAnimationFrame(() => this.medirRecorrido(true));
  },

  salirRecorrido() {
    clearInterval(this._recT); this._recT = null; cancelAnimationFrame(this._recRaf);
    if (this._onRecMedir) {
      window.removeEventListener('resize', this._onRecMedir);
      window.removeEventListener('scroll', this._onRecMedir, true);
      this._onRecMedir = null;
    }
    this.setState({ recorrido: null, recRect: null, menuMovil: false });
  },

  // Busca el primer elemento visible del paso y guarda su rectángulo (null = tarjeta centrada)
  medirRecorrido(llevar) {
    const r = this.state.recorrido; if (!r) return;
    const paso = this.pasosRecorrido()[r.i] || {};
    const W = window.innerWidth, H = window.innerHeight;
    const visible = el => {
      const b = el.getBoundingClientRect(), cs = getComputedStyle(el);
      return b.width > 0 && b.height > 0 && cs.visibility !== 'hidden' && b.right > 0 && b.left < W;
    };
    let el = null;
    for (const sel of paso.donde || []) { el = Array.prototype.find.call(document.querySelectorAll(sel), visible) || null; if (el) break; }
    if (el && llevar && !fijo(el)) {
      const b = el.getBoundingClientRect();
      if (this.state.movil) {
        // teléfono y tablet: la hoja del paso va abajo, así que lo explicado sube a la parte de arriba
        if (b.top < 64 || b.bottom > H * 0.55) { el.style.scrollMarginTop = '72px'; el.scrollIntoView({ block: 'start' }); el.style.scrollMarginTop = ''; }
      } else if (b.top < 0 || b.bottom > H) { el.scrollIntoView({ block: 'center' }); }
    }
    const b = el ? el.getBoundingClientRect() : null;
    // r: el recuadro iluminado copia la curva del elemento (un botón redondo se ilumina redondo)
    const rect = b ? { x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height),
      r: Math.min(Math.round(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0), Math.round(Math.min(b.width, b.height) / 2)) } : null;
    const prev = this.state.recRect;
    if (JSON.stringify(prev) !== JSON.stringify(rect)) this.setState({ recRect: rect });
  }
};
