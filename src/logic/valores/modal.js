// Valores para la plantilla — modal de confirmación / edición rápida.
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.
import * as api from '../../services/api.js';
import * as sync from '../../services/sync.js';
import { ST, DOMINIO_CORREO } from '../../config/constantes.js';

export const valoresModal = {
  valoresModal(v, ctx) {
    const { s } = ctx;
    // modal
    const m = s.modal;
    v.modalOpen = !!m;
    if (m) {
      v.modalTitle = m.title; v.modalSub = m.sub; v.modalOkLabel = m.ok; v.modalErr = m.err || '';
      v.modalIsDanger = !!m.danger; v.modalIsSafe = !m.danger;
      v.modalRef = this.refDialogo(); v.modalRiesgosa = m.danger ? 'si' : 'no';
      v.modalHasName = m.type !== 'confirm';
      v.modalNameLabel = m.type === 'user' ? 'Nombre y apellido' : 'Nombre';
      v.modalName = m.name || '';
      v.modalHasDesc = m.type === 'cat';
      v.modalDescLabel = 'Descripción corta';
      v.modalDesc = m.desc || '';
      v.modalHasEmail = m.type === 'user'; v.modalEmail = m.email || '';
      v.modalHasRol = m.type === 'user'; v.modalRol = m.rol || 'usuario';
      const up = k => e => this.setState(st => ({ modal: Object.assign({}, st.modal, { [k]: e.target.value, err: '' }) }));
      v.onModalName = up('name'); v.onModalDesc = up('desc'); v.onModalEmail = up('email');
      v.onModalRol = up('rol');
      v.modalPwdOn = api.USE_API && m.type === 'user'; v.modalPwd = m.pwd || ''; v.onModalPwd = up('pwd');
      v.modalPwdLabel = m.id ? 'Contraseña nueva' : 'Contraseña';
      v.modalPwdHelp = m.id ? 'La API la pide también para guardar cambios: la que escribas pasa a ser su contraseña.' : 'Con esta inicia sesión. Pásasela por un canal seguro.';
      v.modalPwdBorder = m.err && m.err.indexOf('contraseña') >= 0 ? 'var(--naranja)' : 'var(--n-1000)';
      v.onModalCancel = () => m.back ? this.openModal(m.back) : this.closeModal();
      v.modalCanSkip = !!m.skipKey; v.modalSkip = !!m.skip;
      v.onModalSkip = e => { const c = e.target.checked; this.setState(st => ({ modal: Object.assign({}, st.modal, { skip: c }) })); };
      const doModalOk = () => {
        const mm = this.state.modal;
        if (mm.skip && mm.skipKey) { try { sessionStorage.setItem('mt-skip-' + mm.skipKey, '1'); } catch (e) {} }
        if (mm.kind === 'fn') { this.setState({ modal: null }); mm.run(); return; }
        if (mm.type === 'confirm') {
          if (mm.kind === 'cat') {
            const nombre = (this.state.cats.find(c => c.id === mm.id) || {}).nombre;
            this.setState(st => ({ cats: st.cats.map(c => c.id === mm.id ? Object.assign({}, c, { activo: false }) : c), modal: null }));
            this.say('"' + nombre + '" ya no se ofrece en tickets nuevos.');
            return;
          }
          if (mm.kind === 'user') {
            const nombre = (this.state.users.find(u => u.id === mm.id) || {}).nombre;
            this.setState(st => ({ users: st.users.map(u => u.id === mm.id ? Object.assign({}, u, { activo: false }) : u), modal: null }));
            this.say(nombre + ' ya no puede iniciar sesión.');
            return;
          }
          const id = s.detailId, prevT = this.ticket(id) || {}, prevStatus = prevT.status, prevHist = prevT.historial;
          if (prevT.status === 'closed' || prevT.asig !== this.me().id) { this.setState({ modal: null }); this.say('Solo quien tiene asignado TIC-' + id + ' puede cerrarlo.'); return; }
          this.patch(id, { status: 'closed' }, 'Ticket cerrado', 'close');
          this.setState({ modal: null });
          this.cierre(id, () => {
            clearTimeout(this._moment);
            this.setState(st => ({
              tickets: st.tickets.map(t => t.id === id ? Object.assign({}, t, { status: prevStatus, historial: prevHist }) : t),
              moment: null
            }));
            this.say('Cierre deshecho. El ticket volvió a ' + ST[prevStatus].label + '.');
          });
          return;
        }
        if (!String(mm.name || '').trim()) { this.setState({ modal: Object.assign({}, mm, { err: 'El nombre no puede quedar vacío.' }) }); return; }
        if (mm.type === 'user' && !this.correoValido(mm.email)) {
          this.setState({ modal: Object.assign({}, mm, { err: 'El correo tiene que ser ' + DOMINIO_CORREO + ', por ejemplo nombre' + DOMINIO_CORREO + '.' }) }); return;
        }
        if (api.USE_API && mm.type === 'user' && String(mm.pwd || '').length < 8) {
          this.setState({ modal: Object.assign({}, mm, { err: 'Escribe una contraseña de al menos 8 caracteres.' }) }); return;
        }
        if (api.USE_API && mm.type === 'user') sync.rememberPassword(String(mm.email || '').trim(), mm.pwd);
        if (mm.type === 'cat') {
          if (mm.id) {
            const apply = () => { this.setState(st => ({ cats: st.cats.map(c => c.id === mm.id ? Object.assign({}, c, { nombre: mm.name.trim(), descripcion: mm.desc }) : c), modal: null })); this.say('Categoría actualizada.'); };
            const pc = this.state.cats.find(c => c.id === mm.id) || {};
            if (pc.nombre === mm.name.trim() && (pc.descripcion || '') === (mm.desc || '')) { this.setState({ modal: null }); return; }
            this.confirmOr('edit-cat', { title: '¿Guardar los cambios en "' + pc.nombre + '"?', sub: 'El nombre nuevo se ve en todos los tickets de esta categoría, también en los viejos.', ok: 'Guardar cambios', back: mm }, apply);
          } else {
            const id = Math.max.apply(null, s.cats.map(c => c.id)) + 1;
            this.setState(st => ({ cats: st.cats.concat([{ id, nombre: mm.name.trim(), descripcion: mm.desc, activo: true }]), modal: null }));
            this.say('Categoría creada y disponible.');
          }
          return;
        }
        if (mm.type === 'user') {
          if (mm.id) {
            const pu = this.state.users.find(u => u.id === mm.id) || {};
            const dm = pu.rol === 'admin' && mm.rol === 'usuario' ? this.demoteMove(pu) : null;
            const apply = () => { if (dm) this.demoteApply(pu, dm); this.setState(st => ({ users: st.users.map(u => u.id === mm.id ? Object.assign({}, u, { nombre: mm.name.trim(), email: mm.email.trim(), rol: mm.rol }) : u), modal: null })); this.say('Usuario actualizado.' + (dm && dm.act.length ? (dm.alt ? ' Sus tickets pasaron a ' + dm.alt.nombre + '.' : (api.USE_API ? ' Sus tickets siguen a su nombre: reasígnalos.' : ' Sus tickets quedaron sin asignar.')) : '')); };
            if (pu.nombre === mm.name.trim() && pu.email === mm.email.trim() && pu.rol === mm.rol && !(api.USE_API && mm.pwd)) { this.setState({ modal: null }); return; }
            const rolCambia = pu.rol !== mm.rol;
            this.confirmOr('edit-user', { title: '¿Guardar los cambios de ' + pu.nombre + '?', sub: rolCambia ? 'Cambia su rol a ' + (mm.rol === 'admin' ? 'Administrador' : 'Usuario') + ': ' + (mm.rol === 'admin' ? 'va a ver y gestionar todos los tickets.' : 'deja de ver los tickets de los demás.' + (dm ? dm.note : '')) : 'Los datos nuevos se usan desde su próximo inicio de sesión.', ok: 'Guardar cambios', danger: rolCambia, back: mm }, apply);
          } else {
            const id = Math.max.apply(null, s.users.map(u => u.id)) + 1;
            this.setState(st => ({ users: st.users.concat([{ id, nombre: mm.name.trim(), email: mm.email.trim(), rol: mm.rol, activo: true }]), modal: null }));
            this.say('Usuario creado.');
          }
          return;
        }
      };
      const mBusy = m.type === 'confirm'
        ? (m.kind === 'cat' ? 'Desactivando la categoría' : m.kind === 'user' ? 'Dando de baja al usuario' : 'Cerrando el ticket')
        : m.id ? 'Guardando los cambios' : m.type === 'cat' ? 'Creando la categoría' : 'Creando el usuario';
      v.tapModalOk = this.tapped('modalok');
      v.onModalOk = m.kind === 'fn' ? () => this.tap('modalok', doModalOk) : () => this.tap('modalok', () => this.heavy(mBusy, 900, doModalOk));
    }

    v.loading = s.loading; v.loaded = !s.loading;
    v.screenKey = 'screen-' + s.screen + '-' + (s.detailId || s.editId || (s.entity ? s.entity.type + (s.entity.id || 'new') : 0));
    v.pageAnim = s.dir === 'fwd' ? 'pageInFwd' : s.dir === 'back' ? 'pageInBack'
      : s.dir === 'up' ? 'pageInUp' : s.dir === 'down' ? 'pageInDown' : s.dir === 'vt' ? 'none' : 'pageIn';
    v.ghostRows = ['62%', '78%', '54%', '70%', '66%'].map((w, i) => ({ w, id: i }));
    v.ghostCards = ['72%', '58%'].map((w, i) => ({ w, id: i }));
    v.ghostCards6 = ['72%', '58%', '66%', '80%', '62%', '74%'].map((w, i) => ({ w, id: i }));
  }
};
