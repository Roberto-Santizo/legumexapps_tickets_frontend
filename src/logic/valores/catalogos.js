// Valores para la plantilla — listas de categorías y usuarios.
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.
import * as api from '../../services/api.js';

export const valoresCatalogos = {
  valoresCatalogos(v, ctx) {
    const { s, me } = ctx;
    // categorías
    const pgC = this.pager('cats', s.cats.length);
    v.pgCats = pgC;
    v.catRows = s.cats.slice(pgC.offset, pgC.offset + pgC.limit).map(c => ({
      nombre: c.nombre, descripcion: c.descripcion,
      tickets: String(s.tickets.filter(t => t.cat === c.id).length),
      track: c.activo ? 'var(--n-950)' : 'var(--n-0)',
      trackBorder: c.activo ? 'var(--n-950)' : 'var(--n-300)',
      toggleLabel: (c.activo ? 'Desactivar' : 'Activar') + ' ' + c.nombre,
      knob: c.activo ? '18px' : '0px',
      toggle: () => {
        if (c.activo) {
          this.openModal({
            type: 'confirm', kind: 'cat', id: c.id, danger: true, title: 'Desactivar "' + c.nombre + '"?',
            sub: 'Deja de ofrecerse al crear tickets. Los ' + s.tickets.filter(t => t.cat === c.id).length + ' tickets que ya la usan no cambian y siguen visibles.',
            ok: 'Desactivar categoría'
          });
          return;
        }
        this.confirmOr('activate', { title: '¿Activar "' + c.nombre + '"?', sub: 'Vuelve a ofrecerse al crear un ticket.', ok: 'Activar' }, () => {
          this.setState(st => ({ cats: st.cats.map(x => x.id === c.id ? Object.assign({}, x, { activo: true }) : x) }));
          this.say('"' + c.nombre + '" vuelve a estar disponible.');
        });
      },
      edit: () => this.openEntity({ type: 'cat', id: c.id, name: c.nombre, desc: c.descripcion })
    }));
    v.onNewCat = () => this.openEntity({ type: 'cat', name: '', desc: '' });

    // usuarios
    const pgU = this.pager('users', s.users.length);
    v.pgUsers = pgU;
    const maxCarga = this.maxLoad();
    v.userRows = s.users.slice(pgU.offset, pgU.offset + pgU.limit).map(u => {
      const ld = this.loadOf(u.id);
      return {
      nombre: u.nombre, email: u.email, ini: this.ini(u.nombre), ring: this.ring(u.id),
      rol: u.rol === 'admin' ? 'Admin' : 'Usuario',
      rolDot: u.rol === 'admin' ? 'var(--violeta)' : 'var(--n-500)',
      rolNote: u.rol === 'admin' ? 'Ve todos y asigna; responde, edita y cierra los suyos' : 'Ve, edita y responde lo propio',
      inactive: u.activo === false, nameInk: u.activo === false ? 'var(--n-500)' : 'var(--n-900)',
      track: u.activo !== false ? 'var(--n-950)' : 'var(--n-0)', trackBorder: u.activo !== false ? 'var(--n-950)' : 'var(--n-300)', knob: u.activo !== false ? '18px' : '0px',
      toggleOff: u.id === me.id || api.USE_API, toggleOp: u.id === me.id || api.USE_API ? '0.4' : '1', toggleCur: u.id === me.id || api.USE_API ? 'default' : 'pointer',
      toggleLabel: api.USE_API ? 'La API todavía no permite activar o desactivar usuarios' : u.id === me.id ? 'No podés desactivarte a vos' : (u.activo !== false ? 'Desactivar a ' : 'Activar a ') + u.nombre,
      toggle: () => this.toggleUser(u),
      carga: String(ld.n),
      cargaNote: ld.n === 0 ? 'Sin tickets activos' : ld.late > 0 ? ld.late + ' sin mover' : 'Al día',
      cargaNoteInk: ld.late > 0 ? 'var(--n-900)' : 'var(--n-500)',
      cargaWidth: Math.round((ld.n / maxCarga) * 100) + '%',
      cargaBar: ld.late > 0 ? 'var(--naranja)' : 'var(--n-900)',
      hasLate: ld.late > 0,
      edit: () => this.openEntity({ type: 'user', id: u.id, name: u.nombre, email: u.email, rol: u.rol })
      };
    });
    v.onNewUser = () => this.openEntity({ type: 'user', name: '', email: '', rol: 'usuario' });
  }
};
