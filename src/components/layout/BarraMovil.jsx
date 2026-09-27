// Barra superior del diseño móvil: abre el menú (la barra lateral deslizable), vuelve al
// inicio con el logo y abre las notificaciones. Solo se pinta cuando V.esMovil.
// V: valores de la lógica (src/logic/valores).
import { T } from '../../utils/runtime.js';

const boton = { "width": "44px", "height": "44px", "borderRadius": "10px", "border": "none", "background": "transparent", "color": "var(--n-900)", "display": "flex", "alignItems": "center", "justifyContent": "center", "cursor": "pointer", "position": "relative", "flexShrink": "0", "transition": "background-color var(--duration-fast) var(--ease-standard)" };

export default function BarraMovil({ V }) {
  return (
    <header data-m="barra" data-no-print="" style={{ "position": "sticky", "top": "0", "zIndex": "40", "display": "flex", "alignItems": "center", "gap": "4px", "height": "56px", "padding": "0 8px", "background": "rgba(var(--fondo-rgb),0.92)", "backdropFilter": "blur(12px) saturate(1.1)", "WebkitBackdropFilter": "blur(12px) saturate(1.1)", "borderBottom": "1px solid var(--n-200)", "flexShrink": "0" }}>
      <button onClick={V["onAbrirMenu"]} aria-label="Abrir menú" aria-expanded={V["menuMovilAbierto"]} style={boton}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16"></path>
          <path d="M4 12h16"></path>
          <path d="M4 18h10"></path>
        </svg>
      </button>
      <button onClick={V["onHome"]} aria-label="Inicio" style={{ ...boton, "width": "auto", "padding": "0 6px" }}>
        <img src="/marca/legumex-isotipo.png" alt="Agroindustria Legumex" style={{ "height": "26px", "width": "auto", "display": "block" }} />
      </button>
      <div style={{ "flex": "1", "minWidth": "0" }}></div>
      <button onClick={V["onBell"]} aria-label={V["bellAria"]} aria-expanded={V["notifOpen"]} style={{ ...boton, "background": V["notifOpen"] ? "var(--n-0)" : "transparent", "boxShadow": V["notifOpen"] ? "0 1px 2px rgba(0,0,0,0.06),0 0 0 1px var(--n-200)" : "none" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--n-900)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
        </svg>
        {V["hasUnread"] ? (
          <span style={{ "position": "absolute", "top": "5px", "right": "5px", "minWidth": "18px", "height": "18px", "padding": "0 5px", "borderRadius": "9999px", "background": "var(--rojo)", "color": "var(--n-0)", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "fontWeight": "500", "display": "flex", "alignItems": "center", "justifyContent": "center", "boxShadow": "0 0 0 2px var(--fondo)" }}>
            {T(V["unreadLabel"])}
          </span>
        ) : null}
      </button>
    </header>
  );
}
