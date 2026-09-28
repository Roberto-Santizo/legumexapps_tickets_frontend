// Botón flotante del chat.
// V: valores de la lógica (src/logic/valores).
import { T, S } from '../../utils/runtime.js';

export default function BotonChat({ V }) {
  return (
    <>
      <button data-m="fab" data-no-print="" onClick={V["onOpenChat"]} aria-label="Abrir conversaciones" title="Conversaciones de tickets" style={{ "position": "fixed", "right": "24px", "bottom": "24px", "zIndex": "55", "width": S(V["fabSize"]), "height": S(V["fabSize"]), "transition": "width var(--duration-base) var(--ease-standard),height var(--duration-base) var(--ease-standard)", "background": "var(--n-950)", "color": "var(--n-0)", "border": "none", "borderRadius": "9999px", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "boxShadow": "rgba(0,0,0,0.18) 0px 10px 24px -6px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1c scp8">
        {" "}
        <svg width={V["fabIcon"]} height={V["fabIcon"]} viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)" }}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        {" "}
        {V["hasChatWaiting"] ? (<>
          {" "}
          <span style={{ "position": "absolute", "top": "-2px", "right": "-2px", "display": "flex", "alignItems": "center", "justifyContent": "center", "minWidth": "20px", "height": "20px", "padding": "0 5px", "borderRadius": "9999px", "background": "var(--n-0)", "color": "var(--n-950)", "border": "2px solid var(--n-950)", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px" }}>
            {T(V["chatWaiting"])}
          </span>
          {" "}
        </>) : null}
      </button>
    </>
  );
}
