// Valores para la plantilla — pantalla de ingreso.
// Parte de Logica.renderVals(); "v" se comparte entre secciones y "ctx" lleva lo común.
import * as api from '../../services/api.js';
import { DOMINIO_CORREO } from '../../config/constantes.js';

export const valoresLogin = {
  valoresLogin(v, ctx) {
    const { s } = ctx;
    v.showLogin = !s.authed;
    v.onLoginMove = this._onLoginMove || (this._onLoginMove = e => {
      const el = e.currentTarget, r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) - 0.5).toFixed(3));
      el.style.setProperty('--my', (((e.clientY - r.top) / r.height) - 0.5).toFixed(3));
    });
    v.onLoginLeave = this._onLoginLeave || (this._onLoginLeave = e => { e.currentTarget.style.setProperty('--mx', '0'); e.currentTarget.style.setProperty('--my', '0'); });
    if (!s.authed) {
      const gt = new Date(Date.now() + (new Date().getTimezoneOffset() - 360) * 60000);
      const hh = gt.getHours(), mm = gt.getMinutes(), wd = gt.getDay();
      v.gtClock = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
      const open = wd >= 1 && wd <= 5 && hh >= 7 && hh < 17;
      v.deskState = open ? 'Atendiendo' : 'Cerrada';
      v.deskDot = open ? 'var(--verde)' : 'var(--n-400)';
      v.deskPulse = open ? 'deskPing 2.4s ease-out infinite' : 'none';
      v.loginHello = this.saludoHora();
      const tk = s.tickets || [];
      const wk = Date.now() - 7 * 864e5;
      v.loginClosedWeek = String(tk.filter(t => t.status === 'closed' && new Date(t.closedAt || t.updatedAt || 0).getTime() >= wk).length || tk.filter(t => t.status === 'closed').length);
      try { const p = this.pulse(); v.loginFirstResp = p && p.firstResp != null ? this.dur(p.firstResp) : '—'; } catch (e) { v.loginFirstResp = '—'; }
    }

    v.showApp = s.authed;
    v.email = s.email; v.password = s.password;
    v.hasLoginError = !!s.loginErr; v.loginError = s.loginErr;
    v.onEmail = e => this.setState({ email: e.target.value, loginErr: '' });
    v.onPassword = e => this.setState({ password: e.target.value, loginErr: '' });
    const lp = s.loginPhase || '';
    v.loginIdle = lp === '' || lp === 'err'; v.loginChecking = lp === 'checking'; v.loginOk = lp === 'ok'; v.loginTitleIdle = lp !== 'ok'; v.loginBusy = lp === 'checking' ? 'true' : 'false';
    v.loginBtnBg = lp === 'ok' ? 'var(--verde-oscuro)' : 'var(--n-1000)';
    v.loginBtnPe = lp === 'checking' || lp === 'ok' ? 'none' : 'auto';
    v.loginBtnAnim = lp === 'ok' ? 'okPop 420ms cubic-bezier(0.22,1,0.36,1) both' : 'none';
    v.loginShake = lp === 'err' ? 'loginShake 420ms cubic-bezier(0.36,0.07,0.19,0.97) both' : 'none';
    v.fieldBorder = lp === 'ok' ? 'var(--verde-oscuro)' : 'var(--n-1000)';
    v.fieldRing = lp === 'ok' ? '0 0 0 3px rgba(21,128,61,0.15)' : 'none';
    const hop = (str, d0, green) => Array.from(str).map((ch, i) => ({ ch: ch === ' ' ? '\u00a0' : ch,
      anim: 'letterHop 560ms cubic-bezier(0.34,1.56,0.64,1) ' + (d0 + i * 28) + 'ms both' + (green ? ', letterGreen 560ms ease ' + (d0 + i * 28) + 'ms both' : '') }));
    const okFound = s.users.find(u => u.email.toLowerCase() === (s.email || '').trim().toLowerCase());
    const okName = okFound ? okFound.nombre.split(' ')[0] : '';
    v.okTitle = hop(okName ? '¡Hola, ' + okName + '!' : '¡Bienvenido!', 120, true);
    v.okBtn = hop('Credenciales correctas', 60, false);
    v.pwdShown = !!s.showPwd; v.pwdHidden = !s.showPwd; v.pwdType = s.showPwd ? 'text' : 'password';
    v.pwdLabel = s.showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña';
    v.onTogglePwd = () => this.setState(st => ({ showPwd: !st.showPwd }));
    v.onPwdKey = e => { if (e.key === 'Enter') { e.preventDefault(); v.onLogin(); } };
    v.demoMode = !api.USE_API;
    v.loginPh = 'nombre' + DOMINIO_CORREO;
    v.canUnassign = !api.USE_API;
    v.canToggleUser = !api.USE_API; // los usuarios no tienen campo "activo" en la API // la API no tiene cómo dejar un ticket sin asignar
    v.canSwitchRole = false; // sin "Ver como": cada persona ve el sistema con su propio rol
    const cred = (this.props.datosDemo || {}).credencial || {}; // src/mocks/datosDemo.js
    v.onFillDemo = () => this.setState({ email: cred.email || '', password: cred.password || '', loginErr: '' });
    v.tapLogin = this.tapped('login');
    v.onLogin = () => {
      if (s.loginPhase === 'checking' || s.loginPhase === 'ok') return;
      this.tap('login');
      const fail = msg => { clearTimeout(this._lgE); this.setState({ loginErr: msg, loginPhase: 'err' }); this._lgE = setTimeout(() => this.setState({ loginPhase: '' }), 450); };
      if (!s.email.trim() || !s.password.trim()) { fail('Completá tu correo y tu contraseña para continuar.'); return; }
      if (!/@/.test(s.email)) { fail('El correo debe tener el formato nombre' + DOMINIO_CORREO + '.'); return; }
      this.setState({ loginPhase: 'checking', loginErr: '' });
      clearTimeout(this._lg); clearTimeout(this._lg2);
      if (api.USE_API) {
        api.login(s.email.trim(), s.password)
          .then(data => { this.setState({ loginPhase: 'ok' }); this._lg2 = setTimeout(() => this.applySession(data), 1250); })
          .catch(err => fail(err.message || 'No pudimos iniciar sesión.'));
        return;
      }
      this._lg = setTimeout(() => {
        this.setState({ loginPhase: 'ok' });
        this._lg2 = setTimeout(() => this.finishLogin(), 1250);
      }, 700);
    };
    this.finishLogin = this.finishLogin || (() => {
      const s = this.state;
      const found = s.users.find(u => u.email.toLowerCase() === s.email.trim().toLowerCase());
      this.entrarAlSistema(suave => this.setState({ authed: true, loginErr: '', loginPhase: '', showPwd: false, screen: 'tickets', role: found ? found.rol : s.role, password: '', greet: true, greetOut: false, entradaSuave: suave }));
      clearTimeout(this._greet); clearTimeout(this._greet2);
      this._greet = setTimeout(() => this.setState({ greetOut: true }), 6500);
      this._greet2 = setTimeout(() => this.setState({ greet: false, greetOut: false }), 6800);
      this.load(650);
      clearTimeout(this._live); this._live = setTimeout(() => this.liveEvent(), 18000);
      clearInterval(this._pollIv); this._pollIv = setInterval(() => this.poll(), 45000);
    });
  }
};
