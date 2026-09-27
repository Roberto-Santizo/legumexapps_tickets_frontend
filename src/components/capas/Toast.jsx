// Aviso breve (toast) con opción de deshacer.
// V: valores de la lógica (src/logic/valores).
import { T, S } from '../../utils/runtime.js';

export default function Toast({ V }) {
  return (
    <>
      <div key="toast" role="status" aria-live="polite" style={{ "position": "fixed", "right": "24px", "top": "24px", "display": "inline-flex", "alignItems": "center", "gap": "8px", "background": "var(--n-950)", "color": "var(--n-0)", "borderRadius": "9999px", "padding": "10px 20px", "fontSize": "14px", "fontWeight": "500", "zIndex": "72", "animation": S(V["toastAnim"]) + " both", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px" }}>
        {V["toastOk"] ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": "iconPop 420ms var(--ease-standard) both" }}>
          <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
          <path d="m9 11 3 3L22 4"></path>
        </svg>
        ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--naranja-claro)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": "iconPop 420ms var(--ease-standard) both" }}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
        )}
        {T(V["toast"])}
        {V["hasUndo"] ? (<>
          <button onClick={V["onUndo"]} style={{ "marginLeft": "4px", "background": "transparent", "color": "var(--n-0)", "border": "1px solid rgba(255,255,255,0.35)", "borderRadius": "9999px", "padding": "3px 10px", "fontSize": "12px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "5px", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scp2l scp2m">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-0))" }}>
              <path d="M9 14 4 9l5-5"></path>
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11"></path>
            </svg>
            {"Deshacer"}
          </button>
        </>) : null}
      </div>
    </>
  );
}
