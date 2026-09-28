// Catálogos: categorías y usuarios (activar, cambiar rol, crear / editar).
// Se mezclan en Logica.prototype: "this" es la instancia de Logica.
import * as api from '../../services/api.js';
import * as sync from '../../services/sync.js';
import { DOMINIO_CORREO } from '../../config/constantes.js';

export const metodosCatalogos = {
  // Correo de usuario: formato nombre@dominio y solo del dominio de la empresa (config)
  correoValido(email) {
    const e = String(email || '').trim().toLowerCase();
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e) && e.endsWith(DOMINIO_CORREO);
  },

  // D2/D4 · desactivar o reactivar usuarios. Un admin con tickets activos los pasa al de menor carga.
  toggleUser(u) {
    const me = this.me();
    if (u.id === me.id) return;
    if (u.activo === false) {
      this.confirmOr('activate', { title: '¿Activar a ' + u.nombre + '?', sub: 'Vuelve a poder iniciar sesión' + (u.rol === 'admin' ? ' y a aparecer para asignar.' : '.'), ok: 'Activar' }, () => {
        this.setState(st => ({ users: st.users.map(x => x.id === u.id ? Object.assign({}, x, { activo: true }) : x) }));
        this.say(u.nombre + ' puede volver a iniciar sesión.');
      });
      return;
    }
    const act = this.state.tickets.filter(t => t.asig === u.id && t.status !== 'closed');
    const alt = u.rol === 'admin' && act.length ? this.state.users.filter(x => x.rol === 'admin' && x.activo !== false && x.id !== u.id).sort((a, b) => this.loadOf(a.id).n - this.loadOf(b.id).n)[0] : null;
    this.openModal({ type: 'confirm', kind: 'fn', danger: true, title: '¿Desactivar a ' + u.nombre + '?',
      sub: 'Ya no va a poder iniciar sesión. Sus tickets y comentarios quedan como están.' + (act.length ? ' Tiene ' + act.length + (act.length === 1 ? ' ticket activo' : ' tickets activos') + (alt ? ': pasan a ' + alt.nombre + ', que tiene la menor carga.' : ': quedan sin asignar.') : ''),
      ok: 'Desactivar usuario',
      run: () => {
        const ids = act.map(t => t.id);
        this.setState(st => ({
          users: st.users.map(x => x.id === u.id ? Object.assign({}, x, { activo: false }) : x),
          tickets: st.tickets.map(t => ids.indexOf(t.id) >= 0 ? Object.assign({}, t, { asig: alt ? alt.id : null,
            historial: [{ autor: me.nombre, texto: alt ? 'Asignado a ' + alt.nombre + ' (' + u.nombre + ' quedó inactivo)' : 'Sin asignar (' + u.nombre + ' quedó inactivo)', h: 0, at: Date.now(), kind: 'assign' }].concat(t.historial || []) }) : t)
        }));
        this.say(u.nombre + ' ya no puede iniciar sesión.' + (act.length ? (alt ? ' Sus tickets pasaron a ' + alt.nombre + '.' : (api.USE_API ? ' Sus tickets siguen a su nombre: reasígnalos.' : ' Sus tickets quedaron sin asignar.')) : ''));
      } });
  },

  // Admin que pasa a usuario: sus tickets activos no pueden quedar a nombre de alguien que ya no atiende
  demoteMove(u) {
    const act = this.state.tickets.filter(t => t.asig === u.id && t.status !== 'closed');
    const alt = act.length ? this.state.users.filter(x => x.rol === 'admin' && x.activo !== false && x.id !== u.id).sort((a, b) => this.loadOf(a.id).n - this.loadOf(b.id).n)[0] : null;
    return { act, alt, note: act.length ? ' Tiene ' + act.length + (act.length === 1 ? ' ticket activo' : ' tickets activos') + (alt ? ': pasan a ' + alt.nombre + ', que tiene la menor carga.' : ': quedan sin asignar.') : '' };
  },

  demoteApply(u, dm) {
    if (!dm.act.length) return;
    if (api.USE_API && !dm.alt) return; // la API no deja tickets sin asignar: siguen a su nombre
    const ids = dm.act.map(t => t.id), me = this.me();
    this.setState(st => ({ tickets: st.tickets.map(t => ids.indexOf(t.id) >= 0 ? Object.assign({}, t, { asig: dm.alt ? dm.alt.id : null,
      historial: [{ autor: me.nombre, texto: dm.alt ? 'Asignado a ' + dm.alt.nombre + ' (' + u.nombre + ' pasó a usuario)' : 'Sin asignar (' + u.nombre + ' pasó a usuario)', h: 0, at: Date.now(), kind: 'assign' }].concat(t.historial || []) }) : t) }));
  },

  openEntity(cfg) { this.setState({ entity: Object.assign({ err: '' }, cfg), screen: 'entity', dir: 'fwd' }); },

  closeEntity() { this.setState(st => ({ screen: st.entity && st.entity.type === 'user' ? 'users' : 'cats', entity: null, dir: 'back' })); },

  saveEntity(sure) {
    const e = this.state.entity;
    if (!e) return;
    const name = String(e.name || '').trim();
    if (!name) { this.setState({ entity: Object.assign({}, e, { err: 'El nombre no puede quedar vacío.' }) }); return; }
    if (e.type === 'user' && !this.correoValido(e.email)) {
      this.setState({ entity: Object.assign({}, e, { err: 'El correo tiene que ser ' + DOMINIO_CORREO + ', por ejemplo nombre' + DOMINIO_CORREO + '.' }) }); return;
    }
    // La API pide contraseña para crear y también para guardar cambios de un usuario
    if (api.USE_API && e.type === 'user' && String(e.pwd || '').length < 8) {
      this.setState({ entity: Object.assign({}, e, { err: 'Escribe una contraseña de al menos 8 caracteres.' }) }); return;
    }
    if (api.USE_API && e.type === 'user') sync.rememberPassword(String(e.email || '').trim(), e.pwd);
    if (e.id && !sure) {
      const run = () => this.heavy('Guardando los cambios', 900, () => this.saveEntity(true));
      if (e.type === 'cat') {
        const pc = this.state.cats.find(c => c.id === e.id) || {};
        if (pc.nombre === name && (pc.descripcion || '') === (e.desc || '')) { this.closeEntity(); return; }
        this.confirmOr('edit-cat', { title: '¿Guardar los cambios en "' + pc.nombre + '"?', sub: 'El nombre nuevo se ve en todos los tickets de esta categoría, también en los viejos.', ok: 'Guardar cambios' }, run);
      } else {
        const pu = this.state.users.find(u => u.id === e.id) || {};
        const rol = e.rol || pu.rol;
        if (pu.nombre === name && pu.email === String(e.email).trim() && pu.rol === rol && !(api.USE_API && e.pwd)) { this.closeEntity(); return; }
        const rolCambia = pu.rol !== rol;
        const dmN = rolCambia && rol === 'usuario' ? this.demoteMove(pu).note : '';
        this.confirmOr('edit-user', { title: '¿Guardar los cambios de ' + pu.nombre + '?', sub: rolCambia ? 'Cambia su rol a ' + (rol === 'admin' ? 'Administrador' : 'Usuario') + ': ' + (rol === 'admin' ? 'va a ver y gestionar todos los tickets.' : 'deja de ver los tickets de los demás.' + dmN) : 'Los datos nuevos se usan desde su próximo inicio de sesión.', ok: 'Guardar cambios', danger: rolCambia }, run);
      }
      return;
    }
    if (e.type === 'cat') {
      if (e.id) {
        this.setState(st => ({ cats: st.cats.map(c => c.id === e.id ? Object.assign({}, c, { nombre: name, descripcion: e.desc }) : c) }));
        this.say('Categoría actualizada.');
      } else {
        const id = Math.max.apply(null, this.state.cats.map(c => c.id)) + 1;
        this.setState(st => ({ cats: st.cats.concat([{ id, nombre: name, descripcion: e.desc || '', activo: true }]) }));
        this.say('Categoría creada y disponible.');
      }
    } else {
      if (e.id) {
        const pu0 = this.state.users.find(u => u.id === e.id) || {};
        const dm = pu0.rol === 'admin' && e.rol === 'usuario' ? this.demoteMove(pu0) : null;
        if (dm) this.demoteApply(pu0, dm);
        this.setState(st => ({ users: st.users.map(u => u.id === e.id ? Object.assign({}, u, { nombre: name, email: String(e.email).trim(), rol: e.rol }) : u) }));
        this.say('Usuario actualizado.' + (dm && dm.act.length ? (dm.alt ? ' Sus tickets pasaron a ' + dm.alt.nombre + '.' : (api.USE_API ? ' Sus tickets siguen a su nombre: reasígnalos.' : ' Sus tickets quedaron sin asignar.')) : ''));
      } else {
        const id = Math.max.apply(null, this.state.users.map(u => u.id)) + 1;
        this.setState(st => ({ users: st.users.concat([{ id, nombre: name, email: String(e.email).trim(), rol: e.rol || 'usuario', activo: true }]) }));
        this.say('Usuario creado.');
      }
    }
    this.closeEntity();
  }
};
