// Ayudantes de interfaz: avisos, modales, carga, paginación y formato de texto.
// Se mezclan en Logica.prototype: "this" es la instancia de Logica.
import * as api from '../../services/api.js';
import { RING, BLOB_HUE, PAGE_SIZE, MQ_MOVIL } from '../../config/constantes.js';

export const metodosInterfaz = {
  // Diseño móvil: sigue el ancho de la ventana (girar el teléfono, achicar el navegador).
  // Al pasar a escritorio se cierra el menú deslizable para que no quede abierto oculto.
  escucharMovil() {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    this._mqMovil = window.matchMedia(MQ_MOVIL);
    this._onMq = e => this.setState(e.matches ? { movil: true } : { movil: false, menuMovil: false });
    this._mqMovil.addEventListener('change', this._onMq);
  },

  ring(id) { return id ? RING[(id - 1) % RING.length] : 'var(--n-300)'; },

  // ── 2. Guardado optimista: se aplica ya, y si el servidor falla se revierte
  optimistic(key, apply, revert, okMsg, failLine) {
    apply();
    this.setState({ saving: key, err500: false });
    clearTimeout(this._save);
    this._save = setTimeout(() => {
      if (this.props.fallaGuardado) {
        revert();
        this.setState({ saving: '', err500: true, err500Line: failLine });
        this.say('No se guardó. Volvimos el ticket a como estaba.');
      } else {
        this.setState({ saving: '' });
        if (okMsg) this.say(okMsg);
      }
      // 1400ms = un ciclo completo de logoLoop. A 900 el logo se cortaba a media carga
      // y la píldora desaparecía antes de que alguien la registrara.
    }, 1400);
  },

  // ── Espera con marca: acciones que pegan al backend y no tienen skeleton
  // (cerrar, reabrir, dar de baja, crear categoría/usuario). El logo se llena
  // mientras la llamada viaja; sin esto el click no devolvía nada por 900ms.
  heavy(label, ms, done) {
    if (this.state.heavyMsg) return;
    this.setState({ heavyMsg: label });
    clearTimeout(this._heavy);
    this._heavy = setTimeout(() => { this.setState({ heavyMsg: '' }); if (done) done(); }, ms || 900);
  },

  // La píldora GUARDANDO era exclusiva del guardado optimista; crear y cerrar
  // también viajan al servidor, así que ahora la comparten.
  pill(ms) {
    this.setState({ saving: 'sync' });
    clearTimeout(this._save);
    this._save = setTimeout(() => this.setState({ saving: '' }), ms || 1400);
  },

  showMoment(m, ms) {
    this.setState({ moment: m });
    clearTimeout(this._moment);
    this._moment = setTimeout(() => { if (this.state.moment === m) this.endMoment(true); }, ms || 3200);
  },

  // Cierre del momento: si no se deshizo, sigue el aviso negro flotante (último eslabón)
  endMoment(runAfter) {
    const m = this.state.moment;
    clearTimeout(this._moment);
    if (!m) return;
    this.setState({ moment: null });
    if (runAfter && m.after) m.after();
  },

  blobUrl(userId, size) {
    const u = this.user(userId);
    const seed = u ? (u.email || u.nombre) : 'tic-' + userId;
    const hue = BLOB_HUE[Math.abs(Number(userId) || 0) % BLOB_HUE.length];
    return 'https://blobatar.dev/avatar/' + encodeURIComponent(seed.toLowerCase()) +
      '?size=' + (size || 64) + '&background=circle&hue=' + hue + '&gen=2';
  },

  tapped(key, name, ms) {
    return this.state.tap === key ? (name || 'iconBurst') + ' ' + (ms || 460) + 'ms var(--ease-standard) both' : 'none';
  },

  tap(key, fn) {
    clearTimeout(this._tap);
    this.setState({ tap: key });
    this._tap = setTimeout(() => this.setState({ tap: '' }), 520);
    if (fn) fn();
  },

  load(ms) {
    clearTimeout(this._load);
    this.setState({ loading: true });
    this._load = setTimeout(() => this.setState({ loading: false }), ms);
  },

  run(key, ms, done) {
    if (this.state.busy) return;
    this.setState({ busy: key });
    clearTimeout(this._busy);
    this._busy = setTimeout(() => { this.setState({ busy: '' }); done(); }, ms);
  },

  pager(key, total) {
    const size = PAGE_SIZE;
    const pages = Math.max(1, Math.ceil(total / size));
    const p = Math.min(this.state.page[key] || 0, pages - 1);
    const from = total === 0 ? 0 : p * size + 1;
    const to = Math.min(total, (p + 1) * size);
    const go = d => this.setState(s => ({ page: Object.assign({}, s.page, { [key]: Math.min(pages - 1, Math.max(0, p + d)) }) }));
    return {
      show: total > 0, offset: p * size, limit: size,
      range: 'MOSTRANDO ' + from + '–' + to + ' DE ' + total,
      atStart: p === 0, atEnd: p >= pages - 1,
      prevCursor: p === 0 ? 'default' : 'pointer', nextCursor: p >= pages - 1 ? 'default' : 'pointer',
      prevOpacity: p === 0 ? '0.45' : '1', nextOpacity: p >= pages - 1 ? '0.45' : '1',
      prev: () => go(-1), next: () => go(1)
    };
  },

  ini(n) { return (n || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase(); },

  // aviso = true: es una advertencia (ícono de alerta y un poco más de tiempo para leerla)
  say(msg, undo, aviso) {
    clearTimeout(this._t); clearTimeout(this._toast);
    this.setState({ toast: msg, toastOut: false, toastAviso: !!aviso, undo: api.USE_API ? null : (undo || null) });
    this._t = setTimeout(() => {
      this.setState({ toastOut: true });
      this._toast = setTimeout(() => this.setState({ toast: '', toastOut: false, undo: null }), 150);
    }, aviso ? 4500 : 2800);
  },

  // ── Resaltado de coincidencias: la búsqueda muestra por qué algo salió
  hl(txt, q) {
    const s = String(txt || '');
    if (!q) return [{ t: s, on: false, bg: 'transparent', k: '0' }];
    const low = s.toLowerCase(), needle = q.toLowerCase();
    const out = []; let i = 0, n = 0;
    while (true) {
      const at = low.indexOf(needle, i);
      if (at < 0) { if (i < s.length) out.push({ t: s.slice(i), on: false, bg: 'transparent', k: 'p' + (n++) }); break; }
      if (at > i) out.push({ t: s.slice(i, at), on: false, bg: 'transparent', k: 'p' + (n++) });
      out.push({ t: s.slice(at, at + needle.length), on: true, bg: 'var(--azul-tinte)', k: 'm' + (n++) });
      i = at + needle.length;
    }
    return out;
  },

  excerpt(txt, n) {
    const s = String(txt || '').trim();
    return s.length > (n || 116) ? s.slice(0, n || 116).replace(/\s+\S*$/, '') + '…' : s;
  },

  // Bordes del área de scroll: arriba solo si bajaste, abajo solo si queda contenido
  sheetEdges(el) {
    const on = el.scrollTop > 4 ? '1' : '0';
    const fb = el.scrollTop + el.clientHeight >= el.scrollHeight - 4 ? '1' : '0.12';
    if (el.style.getPropertyValue('--fadeOn') !== on) el.style.setProperty('--fadeOn', on);
    if (el.style.getPropertyValue('--fb') !== fb) el.style.setProperty('--fb', fb);
  },

  // Confirmación con "no volver a preguntar en esta sesión" (sessionStorage mt-skip-{key})
  confirmOr(key, opts, run) {
    let skip = false; try { skip = sessionStorage.getItem('mt-skip-' + key) === '1'; } catch (e) {}
    if (skip) { run(); return; }
    this.openModal(Object.assign({ type: 'confirm', kind: 'fn', skipKey: key, run }, opts));
  },

  // Saludo según la hora local
  saludo() {
    const h = new Date().getHours();
    const n = (this.me().nombre || '').split(' ')[0];
    return (h < 6 ? 'Buenas noches' : h < 13 ? 'Buenos días' : h < 20 ? 'Buenas tardes' : 'Buenas noches') + ', ' + n;
  },

  seg(active) { return active ? { bg: 'var(--n-0)', border: '1px solid var(--n-200)' } : { bg: 'transparent', border: '1px solid transparent' }; },

  openModal(m) { clearTimeout(this._modal); this.setState({ modal: m, modalClosing: false }); },

  closeModal(after) {
    this.setState({ modalClosing: true });
    clearTimeout(this._modal);
    this._modal = setTimeout(() => { this.setState({ modal: null, modalClosing: false }); if (after) after(); }, 150);
  }
};
