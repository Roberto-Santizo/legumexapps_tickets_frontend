// Valores para la plantilla — página crear / editar de categoría o usuario.
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.
import * as api from '../../services/api.js';

export const valoresEntidad = {
  valoresEntidad(v, ctx) {
    const { s, me } = ctx;
    // --- página crear/editar (categorías y usuarios) ---
    const ent = s.entity;
    if (ent) {
      const isCat = ent.type === 'cat', editingEnt = !!ent.id;
      v.entIsCat = isCat; v.entIsUser = !isCat;
      v.entName = ent.name || ''; v.entDesc = ent.desc || ''; v.entEmail = ent.email || '';
      v.entErr = ent.err || '';
      v.entNameLabel = isCat ? 'Nombre de la categoría' : 'Nombre y apellido';
      v.entNamePh = isCat ? 'Ej.: Redes y conectividad' : 'Ej.: Renata Ibáñez';
      v.entNameHelp = isCat ? 'Es lo que ve quien reporta al elegir categoría.' : 'Aparece como autor y responsable en los tickets.';
      v.entNameBorder = ent.err && !String(ent.name || '').trim() ? 'var(--naranja)' : 'var(--n-200)';
      v.entEmailBorder = ent.err && ent.err.indexOf('correo') >= 0 ? 'var(--naranja)' : 'var(--n-200)';
      v.entOkLabel = editingEnt ? 'Guardar cambios' : (isCat ? 'Crear categoría' : 'Crear usuario');
      v.entMeta = editingEnt;
      v.entCode = isCat ? 'CAT-' + ent.id : 'USR-' + ent.id;
      if (editingEnt) {
        if (isCat) {
          const n = s.tickets.filter(t => t.cat === ent.id).length;
          v.entMetaNote = n === 0 ? 'Ningún ticket la usa todavía' : n + (n === 1 ? ' ticket la usa' : ' tickets la usan') + ' — renombrarla no los cambia de categoría';
        } else {
          const n = s.tickets.filter(t => t.asig === ent.id && t.status !== 'closed').length;
          v.entMetaNote = n === 0 ? 'Sin tickets activos asignados' : n + (n === 1 ? ' ticket activo asignado' : ' tickets activos asignados');
        }
      } else v.entMetaNote = '';
      v.entRoles = [
        { k: 'usuario', label: 'Usuario', note: 'Ve, edita y responde solo sus propios tickets' },
        { k: 'admin', label: 'Administrador', note: 'Ve todos los tickets y asigna; responde, edita y cierra los suyos' }
      ].map(r => ({
        label: r.label, note: r.note, on: (ent.rol || 'usuario') === r.k,
        border: (ent.rol || 'usuario') === r.k ? 'var(--n-950)' : 'var(--n-200)',
        dotBorder: (ent.rol || 'usuario') === r.k ? 'var(--n-950)' : 'var(--n-300)',
        dotBg: (ent.rol || 'usuario') === r.k ? 'var(--n-950)' : 'var(--n-0)',
        go: () => { if (ent.id === me.id && r.k !== (ent.rol || 'usuario')) { this.setState(st => ({ entity: Object.assign({}, st.entity, { err: 'No puedes cambiar tu propio rol: perderías el acceso de admin. Pídeselo a otro admin.' }) })); return; } this.setState(st => ({ entity: Object.assign({}, st.entity, { rol: r.k, err: '' }) })); }
      }));
      const upe = k => e2 => this.setState(st => ({ entity: Object.assign({}, st.entity, { [k]: e2.target.value, err: '' }) }));
      v.onEntName = upe('name'); v.onEntDesc = upe('desc'); v.onEntEmail = upe('email');
      v.entPwdOn = api.USE_API && !isCat; v.entPwd = ent.pwd || ''; v.onEntPwd = upe('pwd');
      v.entPwdLabel = ent.id ? 'Contraseña nueva' : 'Contraseña';
      v.entPwdHelp = ent.id ? 'La API la pide también para guardar cambios: la que escribas pasa a ser su contraseña.' : 'Con esta inicia sesión. Pásasela por un canal seguro.';
      v.entPwdBorder = ent.err && ent.err.indexOf('contraseña') >= 0 ? 'var(--naranja)' : 'var(--n-200)';
      // Correo de otro dominio: el aviso sale al instante, sin la espera de "Creando el registro"
      v.onEntSave = () => ent.id || (ent.type === 'user' && !this.correoValido(ent.email)) ? this.saveEntity() : this.heavy('Creando el registro', 900, () => this.saveEntity());
      v.onEntCancel = () => this.closeEntity();
    }
  }
};
