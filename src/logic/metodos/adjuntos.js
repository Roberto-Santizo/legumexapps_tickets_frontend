// Adjuntos: elegir, validar y subir imágenes, y el visor (lightbox).
// Se mezclan en Logica.prototype: "this" es la instancia de Logica.
import * as sync from '../../services/sync.js';
import { MIME, MAXMB } from '../../config/constantes.js';

export const metodosAdjuntos = {
  kb(bytes) { return bytes >= 1048576 ? (bytes / 1048576).toFixed(1) + ' MB' : Math.round(bytes / 1024) + ' KB'; },

  pickFiles(list, tid) {
    const files = Array.prototype.slice.call(list || []);
    if (!files.length) return;
    const id = tid != null ? tid : this.state.detailId;
    files.forEach(f => {
      const uid = 'u' + Date.now() + Math.round(Math.random() * 999);
      const badType = MIME.indexOf(f.type) < 0;
      const badSize = f.size > MAXMB * 1048576;
      if (badType || badSize) {
        this.setState(st => ({
          uploads: st.uploads.concat([{ id: uid, tid: id, nombre: f.name, peso: this.kb(f.size), pct: 0, failed: true, msg: badType ? 'Formato no soportado — solo JPG, PNG o WEBP' : 'Pesa ' + this.kb(f.size) + ' y el máximo es 5 MB' }])
        }));
        return;
      }
      let url = '';
      try { url = URL.createObjectURL(f); } catch (e) {}
      this.setState(st => ({ staged: st.staged.concat([{ id: uid, tid: id, file: f, nombre: f.name, peso: this.kb(f.size), url }]) }));
    });
  },

  // Vista previa antes de enviar: nada viaja hasta que la persona confirma
  sendStaged(tid) {
    const id = tid != null ? tid : this.state.detailId, list = this.state.staged.filter(x => x.tid === id);
    if (!list.length) return;
    const lk = this.replyLock(this.ticket(id));
    if (lk) { this.say(lk.msg + ' Las imágenes siguen sin enviar.'); return; }
    this.setState(st => ({ staged: st.staged.filter(x => x.tid !== id) }));
    list.forEach(s => this.uploadOne(s.file, s.url, s.id, id));
  },

  // Quién puede adjuntar en un ticket: misma regla que el botón "Subir imagen" del detalle
  puedeAdjuntar(t) {
    if (!t || t.status === 'closed' || this.replyLock(t)) return false;
    const me = this.me();
    return this.state.role === 'admin' || t.autor === me.id || t.asig === me.id;
  },

  // Arrastrar y soltar: el ticket que recibe lo que se suelta es el que está a la vista
  // (chat flotante, pantalla de Chat o detalle). Sin ticket a la vista, no hay destino.
  destinoArrastre() {
    const s = this.state;
    if (s.chatOpen || s.screen === 'chat') return s.chatId || null;
    if (s.screen === 'detail') return s.detailId || null;
    return null;
  },

  // Escucha en toda la ventana: así soltar una imagen nunca abre el archivo en el navegador
  // (se perdía la pantalla). Solo reacciona a archivos; el arrastre del kanban no se toca.
  escucharArrastre() {
    const conArchivos = e => !!(e.dataTransfer && Array.prototype.indexOf.call(e.dataTransfer.types || [], 'Files') >= 0);
    const apagar = () => { this._arr = 0; clearTimeout(this._arrT); if (this.state.arrastre) this.setState({ arrastre: false }); };
    this._arr = 0;
    this._onArrEntra = e => {
      if (!conArchivos(e)) return;
      e.preventDefault(); this._arr++;
      if (this.state.authed && !this.state.arrastre) this.setState({ arrastre: true });
    };
    this._onArrSobre = e => {
      if (!conArchivos(e)) return;
      e.preventDefault();
      const t = this.ticket(this.destinoArrastre());
      e.dataTransfer.dropEffect = this.state.authed && this.puedeAdjuntar(t) ? 'copy' : 'none';
      // respaldo: si el navegador no avisa la salida (Esc, soltar fuera), la capa se apaga sola
      clearTimeout(this._arrT); this._arrT = setTimeout(apagar, 700);
    };
    this._onArrSale = e => { if (!conArchivos(e)) return; this._arr = Math.max(0, this._arr - 1); if (!this._arr) apagar(); };
    this._onArrSuelta = e => {
      if (!conArchivos(e)) return;
      e.preventDefault(); apagar();
      if (this.state.authed) this.soltarArchivos(e.dataTransfer.files);
    };
    window.addEventListener('dragenter', this._onArrEntra);
    window.addEventListener('dragover', this._onArrSobre);
    window.addEventListener('dragleave', this._onArrSale);
    window.addEventListener('drop', this._onArrSuelta);
  },

  dejarDeEscucharArrastre() {
    clearTimeout(this._arrT);
    if (!this._onArrEntra) return;
    window.removeEventListener('dragenter', this._onArrEntra);
    window.removeEventListener('dragover', this._onArrSobre);
    window.removeEventListener('dragleave', this._onArrSale);
    window.removeEventListener('drop', this._onArrSuelta);
  },

  // Lo que se suelta se sube al instante (sin pasar por "Enviar"); lo que no es imagen o
  // pesa de más queda marcado como no subido, con el motivo.
  soltarArchivos(list) {
    const files = Array.prototype.slice.call(list || []);
    if (!files.length) return;
    const tid = this.destinoArrastre(), t = this.ticket(tid);
    if (!t) { this.say('Para adjuntar una imagen, abre el ticket o su conversación y suéltala ahí.', null, true); return; }
    if (!this.puedeAdjuntar(t)) {
      const lk = this.replyLock(t);
      this.say((lk ? lk.msg : 'En este ticket no puedes adjuntar.') + ' La imagen no se subió.', null, true);
      return;
    }
    const malas = [];
    files.forEach(f => {
      const uid = 'u' + Date.now() + Math.round(Math.random() * 99999);
      const badType = MIME.indexOf(f.type) < 0, badSize = f.size > MAXMB * 1048576;
      if (badType || badSize) {
        malas.push(f.name);
        this.setState(st => ({ uploads: st.uploads.concat([{ id: uid, tid, nombre: f.name, peso: this.kb(f.size), pct: 0, failed: true, msg: badType ? 'No es una imagen — solo JPG, PNG o WEBP' : 'Pesa ' + this.kb(f.size) + ' y el máximo es ' + MAXMB + ' MB' }]) }));
        return;
      }
      let url = '';
      try { url = URL.createObjectURL(f); } catch (e) {}
      this.uploadOne(f, url, uid, tid);
    });
    const buenas = files.length - malas.length;
    if (malas.length) this.say(malas.length === files.length
      ? (malas.length === 1 ? '"' + malas[0] + '" no se subió: solo imágenes JPG, PNG o WEBP de hasta ' + MAXMB + ' MB.' : 'No se subió ninguno: solo imágenes JPG, PNG o WEBP de hasta ' + MAXMB + ' MB.')
      : 'Subiendo ' + buenas + (buenas === 1 ? ' imagen' : ' imágenes') + '. ' + malas.length + (malas.length === 1 ? ' archivo no se subió' : ' archivos no se subieron') + ': solo JPG, PNG o WEBP.', null, true);
  },

  openLb(list, i) { this.setState({ lightbox: { list, i: i || 0 }, lbZ: { z: 1, x: 0, y: 0 } }); },

  // Zoom del visor: translate(x,y) scale(z) con origen al centro; p = punto relativo al centro del marco
  lbZoomAt(z2, px, py) {
    const c = this.state.lbZ || { z: 1, x: 0, y: 0 };
    const z = Math.min(6, Math.max(1, z2));
    if (z === 1) { this.setState({ lbZ: { z: 1, x: 0, y: 0 } }); return; }
    const qx = (px - c.x) / c.z, qy = (py - c.y) / c.z;
    this.setState({ lbZ: this.lbClamp({ z, x: px - z * qx, y: py - z * qy }) });
  },

  lbClamp(v) {
    const el = this._lbFrame; if (!el) return v;
    const w = el.clientWidth, hh = el.clientHeight, mx = w * (v.z - 1) / 2, my = hh * (v.z - 1) / 2;
    return { z: v.z, x: Math.max(-mx, Math.min(mx, v.x)), y: Math.max(-my, Math.min(my, v.y)) };
  },

  lbStep(d) {
    this.setState({ lbZ: { z: 1, x: 0, y: 0 } });
    this.setState(st => st.lightbox ? { lightbox: Object.assign({}, st.lightbox, { i: (st.lightbox.i + d + st.lightbox.list.length) % st.lightbox.list.length }) } : null);
  },

  uploadOne(f, url, uid, id) {
      sync.rememberFile(url, f); // el archivo real viaja al servidor cuando el adjunto queda en el ticket
      this.setState(st => ({ uploads: st.uploads.concat([{ id: uid, tid: id, nombre: f.name, peso: this.kb(f.size), pct: 8, failed: false, msg: '' }]) }));
      const step = () => {
        this.setState(st => {
          const u = st.uploads.map(x => x.id === uid ? Object.assign({}, x, { pct: Math.min(100, x.pct + 18 + Math.random() * 14) }) : x);
          return { uploads: u };
        }, () => {
          const me2 = (this.state.uploads.find(x => x.id === uid) || {});
          if (me2.pct >= 100) {
            setTimeout(() => {
              this.setState(st => ({
                uploads: st.uploads.filter(x => x.id !== uid),
                tickets: st.tickets.map(t => t.id === id ? Object.assign({}, t, {
                  adjuntos: t.adjuntos.concat([{ nombre: f.name, tipo: (f.type.split('/')[1] || 'img').toUpperCase(), peso: this.kb(f.size), url, autor: this.me().id, h: 0, at: Date.now() }])
                }) : t)
              }));
              this.say('"' + f.name + '" adjuntada al ticket.');
            }, 260);
          } else setTimeout(step, 180);
        });
      };
      setTimeout(step, 200);
  }
};
