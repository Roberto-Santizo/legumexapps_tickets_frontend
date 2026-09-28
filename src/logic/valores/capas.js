// Valores para la plantilla — capas globales: celebración, momentos, visor, carga, subida, avisos.
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.
import { RING } from '../../config/constantes.js';

export const valoresCapas = {
  valoresCapas(v, ctx) {
    const { s } = ctx;
    const cel = s.celebrate;
    v.celebrating = !!cel;
    v.celebCode = cel ? 'TIC-' + cel.id : '';
    v.celebTitulo = cel ? cel.titulo : '';
    v.celebWarn = !!(cel && cel.correoFallo);
    v.celebSub = cel ? cel.cat + ' · ya está en la bandeja del área. Te llevamos al ticket…' : '';
    const mo = s.moment;
    v.momentClose = !!mo && mo.kind === 'close';
    v.momentNudge = !!mo && mo.kind === 'nudge';
    v.momentReopen = !!mo && mo.kind === 'reopen';
    const lb = s.lightbox, lbc = lb ? lb.list[lb.i] : null;
    v.lbOn = !!lbc; v.lbNombre = lbc ? lbc.nombre : ''; v.lbMeta = lbc ? lbc.meta : ''; v.lbUrl = lbc ? lbc.url : '';
    v.lbHasUrl = !!(lbc && lbc.url); v.lbNoUrl = !!lbc && !lbc.url; v.lbTipo = lbc ? lbc.tipo : '';
    v.lbPos = lb ? (lb.i + 1) + ' / ' + lb.list.length : ''; v.lbMulti = !!lb && lb.list.length > 1; v.lbKey = lb ? 'lb' + lb.i : 'lb';
    const lz = s.lbZ || { z: 1, x: 0, y: 0 };
    v.lbTransform = 'translate(' + lz.x + 'px,' + lz.y + 'px) scale(' + lz.z + ')';
    v.lbTrans = s.lbDrag ? 'none' : 'transform 220ms cubic-bezier(0.22,1,0.36,1)';
    v.lbCursor = s.lbDrag ? 'grabbing' : lz.z > 1 ? 'grab' : 'zoom-in';
    v.lbZoomLabel = Math.round(lz.z * 100) + '%';
    // Instrucciones según el dispositivo: gestos en pantallas táctiles, mouse y teclado en computadora
    v.lbHint = s.movil
      ? (lz.z > 1 ? 'ARRASTRA PARA MOVERTE · TOCA DOS VECES PARA AJUSTAR' : v.lbMulti ? 'PELLIZCA PARA ACERCAR · DESLIZA PARA CAMBIAR' : 'PELLIZCA O TOCA DOS VECES PARA ACERCAR')
      : (lz.z > 1 ? 'ARRASTRA PARA MOVERTE · DOBLE CLIC O 0 PARA AJUSTAR' : 'CLIC O RUEDA PARA ACERCAR · + / −');
    const rel = (e, el) => { const r = el.getBoundingClientRect(); return [e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)]; };
    v.onLbWheel = e => { const fr = e.currentTarget; this._lbFrame = fr; const p = rel(e, fr); this.lbZoomAt(lz.z * (e.deltaY < 0 ? 1.25 : 0.8), p[0], p[1]); };
    v.onLbIn = () => this.lbZoomAt(lz.z * 1.5, 0, 0);
    v.onLbOut = () => this.lbZoomAt(lz.z / 1.5, 0, 0);
    v.onLbFit = () => this.setState({ lbZ: { z: 1, x: 0, y: 0 } });
    // doble clic del mouse (en pantallas táctiles el doble toque lo maneja onLbUp)
    v.onLbDbl = () => { if (this._lbTipo !== 'touch') this.setState({ lbZ: { z: 1, x: 0, y: 0 } }); };
    // Gestos: un dedo arrastra (o desliza para cambiar/cerrar); dos dedos pellizcan para el zoom
    const pts = this._lbPts || (this._lbPts = new Map());
    const par = () => { const [a, b] = Array.from(pts.values()); return { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 }; };
    v.onLbDown = e => {
      const fr = e.currentTarget.parentElement; this._lbFrame = fr; this._lbTipo = e.pointerType;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (x) {}
      const cur = this.state.lbZ || { z: 1, x: 0, y: 0 };
      if (pts.size === 1) this._lbP = { sx: e.clientX, sy: e.clientY, x: cur.x, y: cur.y, moved: false, p: rel(e, fr) };
      if (pts.size === 2) {
        const q = par(), r = fr.getBoundingClientRect();
        const c = [q.cx - (r.left + r.width / 2), q.cy - (r.top + r.height / 2)];
        this._lbPinch = { d0: q.d, z0: cur.z, qx: (c[0] - cur.x) / cur.z, qy: (c[1] - cur.y) / cur.z };
        if (this._lbP) this._lbP.moved = true;
      }
    };
    v.onLbMove = e => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const pi = this._lbPinch;
      if (pi && pts.size >= 2) {
        const q = par(), fr = this._lbFrame, r = fr.getBoundingClientRect();
        const cx = q.cx - (r.left + r.width / 2), cy = q.cy - (r.top + r.height / 2);
        const z = Math.min(6, Math.max(1, pi.z0 * q.d / pi.d0));
        this.setState({ lbDrag: true, lbZ: z === 1 ? { z: 1, x: 0, y: 0 } : this.lbClamp({ z, x: cx - z * pi.qx, y: cy - z * pi.qy }) });
        return;
      }
      const d = this._lbP; if (!d) return;
      const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
      if (!d.moved && Math.abs(dx) + Math.abs(dy) < 5) return;
      d.moved = true;
      if ((this.state.lbZ || {}).z > 1) this.setState({ lbDrag: true, lbZ: this.lbClamp({ z: this.state.lbZ.z, x: d.x + dx, y: d.y + dy }) });
    };
    v.onLbUp = e => {
      pts.delete(e.pointerId);
      if (this._lbPinch) {
        if (pts.size < 2) {
          this._lbPinch = null;
          // si queda un dedo apoyado, sigue arrastrando desde donde está (sin saltos)
          const resto = Array.from(pts.values())[0], cur = this.state.lbZ || { z: 1, x: 0, y: 0 };
          this._lbP = resto ? { sx: resto.x, sy: resto.y, x: cur.x, y: cur.y, moved: true } : null;
          if (this.state.lbDrag) this.setState({ lbDrag: false });
        }
        return;
      }
      const d = this._lbP; this._lbP = null;
      if (this.state.lbDrag) this.setState({ lbDrag: false });
      if (!d) return;
      const z = (this.state.lbZ || {}).z || 1, tactil = e.pointerType === 'touch';
      if (!d.moved) {
        if (!tactil) { if (z === 1) this.lbZoomAt(2.5, d.p[0], d.p[1]); return; }
        // doble toque: acerca donde tocaste o vuelve a ajustar
        const ahora = Date.now();
        if (ahora - (this._lbToque || 0) < 320) { this._lbToque = 0; if (z > 1) this.setState({ lbZ: { z: 1, x: 0, y: 0 } }); else this.lbZoomAt(2.5, d.p[0], d.p[1]); }
        else this._lbToque = ahora;
        return;
      }
      // sin zoom: deslizar de lado cambia de imagen y hacia abajo cierra
      if (tactil && z === 1) {
        const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) && lb && lb.list.length > 1) this.lbStep(dx < 0 ? 1 : -1);
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) this.setState({ lightbox: null });
      }
    };
    v.onLbClose = () => this.setState({ lightbox: null }); v.onLbPrev = () => this.lbStep(-1); v.onLbNext = () => this.lbStep(1);
    v.momentCode = mo ? mo.code : '';
    v.momentTitulo = mo ? mo.titulo : '';
    v.momentSub = mo ? mo.sub : '';
    v.momentBtn = mo ? mo.btn : '';
    v.momentHasUndo = !!(mo && mo.undo);
    v.onMomentUndo = () => { const fn = mo && mo.undo; if (fn) fn(); };
    v.onMomentGo = () => {
      const go = mo && mo.go;
      this.endMoment(true);
      if (go) go();
    };
    v.heavyOn = !!s.heavyMsg; v.heavyMsg = s.heavyMsg;
    const chatVisible = s.chatId && (s.chatOpen || s.screen === 'chat');
    const upAct = (s.uploads || []).filter(y => !y.failed && !(chatVisible && y.tid === s.chatId));
    const upP = upAct.length ? upAct.reduce((a, y) => a + (y.pct || 0), 0) / upAct.length : 0;
    v.upOn = upAct.length > 0 && !s.heavyMsg;
    v.upPct = Math.max(4, Math.round(upP)) + '%'; v.upPctLabel = Math.round(upP) + '%';
    v.upLabel = upAct.length === 1 ? 'SUBIENDO ' + String(upAct[0].nombre || '').toUpperCase() : 'SUBIENDO ' + upAct.length + ' IMÁGENES';
    v.heavyLogoRef = el => {
      if (this._hFillEl === el) return;
      this._hFillEl = el;
      cancelAnimationFrame(this._hFillRaf);
      if (!el) return;
      const t0 = performance.now();
      const step = now => {
        if (this._hFillEl !== el || !el.isConnected) return;
        const p = ((now - t0) % 900) / 900;
        const top = p < 0.55 ? (1 - p / 0.55) * 100 : 0;
        const bottom = p > 0.85 ? ((p - 0.85) / 0.15) * 100 : 0;
        el.style.clipPath = 'inset(' + top.toFixed(1) + '% 0 ' + bottom.toFixed(1) + '% 0)';
        this._hFillRaf = requestAnimationFrame(step);
      };
      this._hFillRaf = requestAnimationFrame(step);
    };
    v.sparks = [0, 45, 90, 135, 180, 225, 270, 315].map((d, i) => ({
      deg: d + 'deg', color: RING[i % RING.length], delay: (120 + i * 45) + 'ms', id: i
    }));
    v.onCelebNow = () => this.goToNew();
    v.swapKey = 'swap-' + s.swap + '-' + s.statusFilter + '-' + s.view;

    v.busyForm = s.busy === 'form'; v.busyFormOp = s.busy === 'form' ? '0' : '1';
    v.busyComment = s.busy === 'comment'; v.busyCommentOp = s.busy === 'comment' ? '0' : '1';
    v.busyModal = s.busy === 'modal'; v.busyModalOp = s.busy === 'modal' ? '0' : '1';

    v.modalAnim = s.modalClosing
      ? 'modalOut var(--duration-fast) var(--ease-standard)'
      : 'modalIn var(--duration-base) var(--ease-standard)';
    v.overlayAnim = s.modalClosing
      ? 'overlayOut var(--duration-fast) var(--ease-standard)'
      : 'overlayIn var(--duration-base) var(--ease-standard)';
    v.toastAnim = s.toastOut
      ? 'toastOut var(--duration-fast) var(--ease-standard) both'
      : 'none';

    // El ciclo de llenado se arranca con la Web Animations API al montar el nodo:
    // declararlo como 'animation:' en el template lo reiniciaba en cada re-render.
    // Ni CSS ni WAAPI: en este nodo el reloj de la animación nunca arranca
    // (currentTime clavado en 0). El llenado se pinta a mano por cuadro.
    v.saveLogoRef = el => {
      if (this._fillEl === el) return;
      this._fillEl = el;
      cancelAnimationFrame(this._fillRaf);
      if (!el) return;
      const t0 = performance.now();
      const step = now => {
        if (this._fillEl !== el || !el.isConnected) return;
        const p = ((now - t0) % 900) / 900;
        const top = p < 0.55 ? (1 - p / 0.55) * 100 : 0;
        const bottom = p > 0.85 ? ((p - 0.85) / 0.15) * 100 : 0;
        el.style.clipPath = 'inset(' + top.toFixed(1) + '% 0 ' + bottom.toFixed(1) + '% 0)';
        this._fillRaf = requestAnimationFrame(step);
      };
      this._fillRaf = requestAnimationFrame(step);
    };
    v.hasToast = !!s.toast; v.toast = s.toast; v.toastAviso = !!s.toastAviso; v.toastOk = !s.toastAviso;
    // barra que se vacía en el tiempo que el aviso queda a la vista (y se puede deshacer)
    v.toastBarraKey = 'tb' + (s.toastN || 0); v.toastBarraStyle = { animationDuration: (s.toastMs || 2800) + 'ms' };
    v.hasUndo = !!s.undo;
    v.onUndo = () => { const fn = s.undo; if (fn) fn(); };
    // Recorrido guiado: paso actual, recuadro iluminado y dónde va la tarjeta (sin tapar lo que se explica)
    const rec = s.recorrido;
    v.recOn = !!(rec && s.authed);
    if (v.recOn) {
      const pasos = this.pasosRecorrido(), i = Math.min(rec.i, pasos.length - 1), paso = pasos[i];
      const R = s.recRect, W = window.innerWidth, H = window.innerHeight, pad = 8, gap = 16, CW = Math.min(360, W - 32);
      v.recTitulo = paso.titulo; v.recTexto = paso.texto; v.recKey = 'rec' + i;
      v.recPaso = 'PASO ' + (i + 1) + ' DE ' + pasos.length;
      v.recHayAnterior = i > 0;
      v.recSiguiente = i === pasos.length - 1 ? 'Terminar' : i === 0 ? 'Empezar' : 'Siguiente';
      v.recPuntos = pasos.map((_, k) => ({ key: 'p' + k, bg: k === i ? 'var(--n-900)' : 'var(--n-300)', w: k === i ? '14px' : '5px' }));
      v.recFoco = !!R; v.recSinFoco = !R;
      // el recuadro no se sale de la pantalla (p. ej. la campana pegada al borde de arriba)
      const fx = Math.max(2, R ? R.x - pad : 0), fy = Math.max(2, R ? R.y - pad : 0);
      const fr = R ? Math.min(W - 2, R.x + R.w + pad) : 0, fb = R ? Math.min(H - 2, R.y + R.h + pad) : 0;
      v.recFocoStyle = R ? { left: fx + 'px', top: fy + 'px', width: (fr - fx) + 'px', height: (fb - fy) + 'px', borderRadius: (R.r + pad) + 'px' } : {};
      const px = n => Math.round(n) + 'px', entre = (n, a, b) => Math.max(a, Math.min(b, n));
      let pos;
      if (s.movil) {
        // teléfono y tablet: hoja abajo; si lo iluminado está en la mitad de abajo, la hoja va arriba
        const arriba = R && R.y + R.h / 2 > H / 2;
        pos = arriba ? { left: '12px', right: '12px', top: '12px', margin: '0 auto', maxWidth: '560px', borderRadius: '16px' }
          : { left: '12px', right: '12px', bottom: '12px', margin: '0 auto', maxWidth: '560px', borderRadius: '16px' };
      } else if (!R) {
        pos = { left: px((W - CW) / 2), top: px(H * 0.3), width: px(CW) };
      } else if (R.x + R.w + pad + gap + CW <= W - 16) {
        pos = { left: px(R.x + R.w + pad + gap), top: px(entre(R.y - pad, 16, H - 300)), width: px(CW) };
      } else if (R.y + R.h + pad + gap + 240 <= H) {
        pos = { left: px(entre(R.x, 16, W - CW - 16)), top: px(R.y + R.h + pad + gap), width: px(CW) };
      } else if (R.y - pad - gap - 200 >= 0) {
        pos = { left: px(entre(R.x, 16, W - CW - 16)), bottom: px(H - (R.y - pad - gap)), width: px(CW) };
      } else {
        pos = { left: px(entre(R.x - pad - gap - CW, 16, W - CW - 16)), top: px(entre(R.y, 16, H - 300)), width: px(CW) };
      }
      v.recTarjetaStyle = pos;
      v.recRef = this.refDialogo();
      v.onRecSiguiente = () => this.pasoRecorrido(1);
      v.onRecAnterior = () => this.pasoRecorrido(-1);
      v.onRecSalir = () => this.salirRecorrido();
    }
    // Arrastrar y soltar: qué dice la capa según dónde caería el archivo
    v.arrastreOn = !!(s.arrastre && s.authed);
    if (v.arrastreOn) {
      const at = this.ticket(this.destinoArrastre());
      const puede = this.puedeAdjuntar(at), lk = at && !puede ? this.replyLock(at) : null;
      v.arrastreOk = puede; v.arrastreNo = !puede;
      v.arrastreTitulo = puede ? 'Suelta para adjuntar a TIC-' + at.id
        : !at ? (s.chatOpen || s.screen === 'chat' ? 'Abre una conversación para adjuntar' : 'Abre un ticket para adjuntar')
        : 'En este ticket no puedes adjuntar';
      v.arrastreSub = puede ? 'JPG, PNG o WEBP · hasta 5 MB · se sube al soltar'
        : !at ? 'Las imágenes se adjuntan al ticket o a la conversación que tengas abierta.'
        : (lk ? lk.msg : 'Está cerrado.');
      v.arrastreTituloTicket = puede ? at.titulo : '';
    }
  }
};
