// Ayudantes de interfaz: avisos, modales, carga, paginación y formato de texto.
// Se mezclan en Logica.prototype: "this" es la instancia de Logica.
import * as api from '../../services/api.js';
import { RING, BLOB_HUE, PAGE_SIZE, MQ_MOVIL, FASES_CIELO } from '../../config/constantes.js';

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

  // Avatar propio (SVG con iniciales y un tono fijo por persona): no depende de un servicio externo
  blobUrl(userId) {
    const u = this.user(userId);
    const hue = BLOB_HUE[Math.abs(Number(userId) || 0) % BLOB_HUE.length];
    const ini = this.ini(u ? u.nombre : '') || '·';
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="hsl(' + hue + ',70%,93%)"/>' +
      '<text x="32" y="33" text-anchor="middle" dominant-baseline="middle" font-family="Inter,Helvetica,Arial,sans-serif" font-size="24" font-weight="600" fill="hsl(' + hue + ',45%,32%)">' + ini + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
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
    this.setState(st => ({ toast: msg, toastOut: false, toastAviso: !!aviso, undo: api.USE_API ? null : (undo || null), toastN: (st.toastN || 0) + 1, toastMs: aviso ? 4500 : 2800 }));
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
  // Al cambiar de pantalla (ticket, Métricas, formularios…) se empieza arriba; al volver de
  // un ticket a la lista, se regresa a donde iba. Corre dentro de la transición, antes de que
  // el navegador tome la foto de la pantalla nueva.
  acomodarScroll(antes) {
    const s = this.state;
    if (!antes || !s.authed) return;
    const hoja = document.querySelector('[data-sheet]');
    const poner = y => { if (hoja) hoja.scrollTop = y; if (window.scrollY) window.scrollTo(0, y); };
    // el formulario de categoría/usuario se renueva con cada tecla: se compara QUÉ se edita
    // (tipo e id), no el objeto; si no, escribir mandaba la página arriba
    const cual = e => e ? (e.type || e.kind || '') + ':' + (e.id != null ? e.id : 'nuevo') : '';
    const cambio = antes.screen !== s.screen || antes.detailId !== s.detailId || antes.editId !== s.editId || cual(antes.entity) !== cual(s.entity);
    if (cambio) {
      const volverALista = s.screen === 'tickets' && (antes.screen === 'detail' || antes.screen === 'edit');
      this._restaurar = volverALista ? (this._scrollLista || 0) : 0;
      poner(this._restaurar);
      if (!s.loading) this._restaurar = null;
      return;
    }
    // la lista pudo volver con su carga: al terminar de pintar se reubica
    if (this._restaurar != null && antes.loading && !s.loading) { poner(this._restaurar); this._restaurar = null; }
  },

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

  // Ventanas (diálogos) accesibles: al abrir, el foco entra (a "Cancelar" si la acción es
  // riesgosa, si no al botón principal); Tab no se escapa detrás; al cerrar vuelve a donde estaba.
  refDialogo() {
    if (this._refDlg) return this._refDlg;
    this._refDlg = el => {
      if (el) {
        this._focoPrevio = document.activeElement;
        const botones = () => Array.prototype.filter.call(el.querySelectorAll('button, input, textarea, select, a[href], [tabindex="0"]'), x => !x.disabled && x.offsetParent !== null);
        this._trampa = e => {
          if (e.key !== 'Tab') return;
          const b = botones(); if (!b.length) return;
          const i = b.indexOf(document.activeElement);
          if (e.shiftKey && i <= 0) { e.preventDefault(); b[b.length - 1].focus(); }
          else if (!e.shiftKey && i === b.length - 1) { e.preventDefault(); b[0].focus(); }
        };
        el.addEventListener('keydown', this._trampa);
        setTimeout(() => {
          const campo = el.querySelector('input:not([type=checkbox]):not([type=radio]), textarea, select');
          const b = botones(), riesgosa = el.getAttribute('data-riesgosa') === 'si';
          // data-foco-inicial manda (p. ej. la ficha: foco en Cerrar para no bajar el panel)
          const destino = el.querySelector('[data-foco-inicial]') || campo || (riesgosa ? b.find(x => /Cancelar/.test(x.textContent)) : b[b.length - 1]) || b[0];
          if (destino) destino.focus();
        }, 30);
      } else {
        const prev = this._focoPrevio; this._focoPrevio = null;
        if (prev && prev.focus && document.contains(prev)) setTimeout(() => prev.focus(), 0);
      }
    };
    return this._refDlg;
  },

  // Tema: claro, oscuro o el del sistema (preferencia de cada persona en este navegador).
  // El atributo data-tema en <html> elige los tokens de index.css; index.html lo aplica antes de pintar.
  aplicarTema(tema) {
    const t = tema === 'claro' || tema === 'oscuro' ? tema : 'sistema';
    try { localStorage.setItem('mt-tema', t); } catch (e) {}
    const el = document.documentElement;
    if (t === 'sistema') el.removeAttribute('data-tema'); else el.setAttribute('data-tema', t);
    if (this.state.tema !== t) this.setState({ tema: t });
  },

  ciclarTema() {
    const orden = ['claro', 'oscuro', 'sistema'];
    this.aplicarTema(orden[(orden.indexOf(this.state.tema) + 1) % orden.length]);
  },

  // (4) Luz que sigue al cursor: un solo oyente para todas las tarjetas marcadas con
  // data-luz; solo mueve dos variables CSS (--lx/--ly), sin volver a pintar React
  // Teléfono y tablet: al escribir, el campo enfocado se centra cuando el teclado terminó de
  // abrir (el navegador a veces lo deja pegado al borde del teclado o tapado)
  escucharTeclado() {
    if (this._onFoco) return;
    this._onFoco = e => {
      const el = e.target;
      if (!this.state.movil || !el || !/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || /^(checkbox|radio|file)$/.test(el.type)) return;
      clearTimeout(this._focoT);
      this._focoT = setTimeout(() => { if (document.activeElement === el) el.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 350);
    };
    document.addEventListener('focusin', this._onFoco);
  },

  escucharLuz() {
    if (this._onLuz || !window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    this._onLuz = e => {
      const el = e.target && e.target.closest && e.target.closest('[data-luz]');
      if (!el) return;
      const b = el.getBoundingClientRect();
      el.style.setProperty('--lx', (e.clientX - b.left) + 'px');
      el.style.setProperty('--ly', (e.clientY - b.top) + 'px');
    };
    document.addEventListener('pointermove', this._onLuz, { passive: true });
  },

  // Hora de Guatemala (UTC-6), la misma que usa el login, sin depender del reloj del equipo
  horaGT() { return new Date(Date.now() + (new Date().getTimezoneOffset() - 360) * 60000); },

  // Fase del cielo según la hora: amanecer, día, atardecer o noche (cortes en constantes.js)
  faseCielo() {
    const d = this.horaGT(), min = d.getHours() * 60 + d.getMinutes();
    return (FASES_CIELO.find(f => min < f.hasta) || FASES_CIELO[0]).fase;
  },

  // La fase se marca en <html data-fase>: el CSS decide sol o luna, estrellas, nubes y colores.
  // Se revisa cada minuto para que el cielo cambie solo mientras la persona trabaja.
  aplicarFase() {
    const f = this.faseCielo();
    if (document.documentElement.getAttribute('data-fase') !== f) document.documentElement.setAttribute('data-fase', f);
  },

  // Saludo que coincide con el cielo: de noche siempre "Buenas noches"
  saludoHora() {
    const h = this.horaGT().getHours();
    return this.faseCielo() === 'noche' ? 'Buenas noches' : h < 12 ? 'Buenos días' : 'Buenas tardes';
  },

  saludo() {
    const n = (this.me().nombre || '').split(' ')[0];
    return this.saludoHora() + ', ' + n;
  },

  // opción elegida de un selector: con tokens de selección (en oscuro se despega de la tarjeta)
  seg(active) { return active ? { bg: 'var(--sel-bg)', border: '1px solid var(--sel-borde)' } : { bg: 'transparent', border: '1px solid transparent' }; },

  openModal(m) { clearTimeout(this._modal); this.setState({ modal: m, modalClosing: false }); },

  closeModal(after) {
    this.setState({ modalClosing: true });
    clearTimeout(this._modal);
    this._modal = setTimeout(() => { this.setState({ modal: null, modalClosing: false }); if (after) after(); }, 150);
  }
};
