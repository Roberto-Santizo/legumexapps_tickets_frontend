// Valores para la plantilla — formulario de ticket (crear / editar).
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.
import { ST, PR } from '../../config/constantes.js';

export const valoresFormulario = {
  valoresFormulario(v, ctx) {
    const { s, isAdmin } = ctx;
    // formulario: crear + editar comparten campos
    const editing = s.screen === 'edit';
    const et = editing ? this.ticket(s.editId) : null;
    v.formIsEdit = editing && !!et;
    v.formIsCreate = s.screen === 'create';
    v.formCode = et ? 'TIC-' + et.id : '';
    v.formAutor = et ? ((this.user(et.autor) || {}).nombre || '—') : '';
    v.formCreado = et ? et.creado : '';
    v.formCanManage = editing && isAdmin;
    v.formRoleNote = editing && !isAdmin;
    v.formOkLabel = editing ? 'Guardar cambios' : 'Crear ticket';
    const feBanner = (s.formErr || {}).banner;
    const vacio = !s.form.titulo.trim() && !s.form.desc.trim();
    v.formBannerTitle = feBanner === 'servidor' ? 'No pudimos crear el ticket'
      : vacio ? 'Faltan los datos del ticket'
      : editing ? 'No pudimos guardar los cambios' : 'No pudimos crear el ticket';
    v.formBannerNote = feBanner === 'servidor'
      ? 'El servidor falló y el ticket no quedó registrado. Tu texto sigue acá: prueba de nuevo.'
      : vacio ? 'Completa título y descripción para poder enviarlo.'
      : 'Revisa los campos marcados abajo. Nada se perdió: tu texto sigue acá.';
    v.fTitulo = s.form.titulo; v.fDesc = s.form.desc; v.fCat = s.form.cat;
    v.fStatus = s.form.status; v.fPrio = s.form.prio;
    // B1 · el formulario nunca cierra: cerrar sale solo de Cerrar / Comentar y cerrar / kanban (PATCH /closed + correo)
    const editPrev = editing ? (this.ticket(s.editId) || {}) : {};
    v.fStatusLocked = editing && editPrev.status === 'closed';
    v.fClosedOptOff = !v.fStatusLocked;
    v.fStatusOp = v.fStatusLocked ? '0.6' : '1';
    v.fStatusTitle = v.fStatusLocked ? 'Está cerrado. Para cambiarlo, reábrelo desde el ticket.' : 'Para cerrar, usa "Cerrar ticket" en el detalle: así le llega el aviso al solicitante.';
    v.onFTitulo = e => this.formChanged({ titulo: e.target.value });
    v.onFDesc = e => this.formChanged({ desc: e.target.value });
    v.hasDesc = !!s.form.desc.trim() && !editing;
    v.onBlankDesc = () => this.formChanged({ desc: '' });
    v.onFCat = e => {
      const cat = e.target.value;
      // El borrador guardado gana: si la persona ya venía escribiendo, no se le toca el texto.
      if (!cat || s.form.desc.trim() || s.draftFound || editing) { this.formChanged({ cat }); return; }
      const txt = this.andamio(cat);
      this.formChanged({ cat, desc: txt });
      const nl = txt.indexOf('\n');
      const pos = nl >= 0 ? nl : txt.length;
      setTimeout(() => {
        const el = document.getElementById('tic-desc');
        if (el) { el.focus(); el.setSelectionRange(pos, pos); }
      }, 30);
    };
    v.draftFound = s.screen === 'create' && s.draftFound;
    v.onDropDraft = () => { this.saveDraft('nuevo', ''); this.setState({ draftFound: false, form: { titulo: '', desc: '', cat: '', status: 'open', prio: 'medium' } }); };
    v.onFStatus = e => this.setState(st => ({ form: Object.assign({}, st.form, { status: e.target.value }) }));
    v.onFPrio = e => this.setState(st => ({ form: Object.assign({}, st.form, { prio: e.target.value }) }));
    // Prioridad al crear: la elige quien reporta; la ayuda dice qué significa cada una
    const PRIO_AYUDA = { high: 'Frena tu trabajo o el de varias personas.', medium: 'Molesta, pero puedes seguir trabajando.', low: 'Puede esperar unos días.' };
    v.prioOpts = ['low', 'medium', 'high'].map(k => ({ value: k, label: PR[k].label }));
    v.fPrioDot = (PR[s.form.prio] || PR.medium).dot;
    v.fPrioHint = PRIO_AYUDA[s.form.prio] || PRIO_AYUDA.medium;
    v.activeCats = s.cats.filter(c => c.activo || (editing && String(c.id) === String(editPrev.cat))).map(c => ({ value: String(c.id), nombre: c.activo ? c.nombre : c.nombre + ' (inactiva)' }));
    const dups = v.formIsCreate ? this.dupes(s.form.titulo) : [];
    v.hasDupes = dups.length > 0;
    v.dupesTitle = dups.length === 1 ? 'Hay un ticket parecido ya cargado' : 'Hay ' + dups.length + ' tickets parecidos ya cargados';
    v.dupes = dups.map(t => {
      const st2 = ST[t.status];
      return {
        code: 'TIC-' + t.id, titulo: t.titulo, statusLabel: st2.label, statusBg: st2.bg,
        when: this.ago(this.idle(t)), asig: t.asig ? (this.user(t.asig) || {}).nombre : 'Sin asignar',
        open: () => { this.setState({ screen: 'detail', detailId: t.id, comment: '', commentErr: '', dir: 'fwd', formErr: null }); this.load(500); }
      };
    });
    const fe = s.formErr || {};
    v.errTituloBorder = fe.titulo ? 'var(--naranja)' : 'var(--n-1000)';
    v.errDescBorder = fe.desc ? 'var(--naranja)' : 'var(--n-1000)';
    v.errCatBorder = fe.cat ? 'var(--naranja)' : 'var(--n-1000)';
    v.hasFormBanner = !!s.formErr;
    v.errTitulo = !!fe.titulo; v.errTituloMsg = fe.titulo || '';
    v.errDesc = !!fe.desc; v.errDescMsg = fe.desc || '';
    v.errCat = !!fe.cat;
    v.tapForm = this.tapped('form');
    v.rippleForm = s.tap === 'form';
    v.onSubmitForm = () => {
      const fe2 = this.validateTicket();
      if (fe2) { this.setState({ formErr: fe2 }); return; }
      this.tap('form');
      const go = () => this.heavy(editing ? 'Guardando los cambios' : 'Creando el ticket', 900, () => editing ? this.saveEdit() : this.submitTicket());
      if (editing) this.confirmOr('edit', { title: '¿Guardar los cambios en TIC-' + s.editId + '?', sub: 'Reemplaza lo que había y queda registrado en la actividad del ticket.', ok: 'Guardar cambios' }, go);
      else go();
    };
    v.onCancelForm = () => this.setState({ screen: (editing && s.detailId) ? 'detail' : 'tickets', formErr: null, editId: null, dir: 'back' });
  }
};
