// Pantalla 403: el rol no alcanza para la sección.
// V: valores de la lógica (src/logic/valores).
import { T } from '../utils/runtime.js';

export default function AccesoRestringido({ V }) {
  return (
    <>
      {" "}
      <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "64px 24px", "textAlign": "center" }}>
        {" "}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "margin": "0 auto 16px", "display": "block" }}>
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        {" "}
        <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "letterSpacing": "0.04em" }}>
          {T(V["forbiddenCode"])}
        </div>
        {" "}
        <div style={{ "fontSize": "20px", "lineHeight": "1.4", "fontWeight": "600", "color": "var(--n-900)", "marginTop": "8px" }}>
          {"No tenés permiso para ver esta sección"}
        </div>
        {" "}
        <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "4px", "maxWidth": "420px", "marginLeft": "auto", "marginRight": "auto", "textWrap": "pretty" }}>
          {T(V["forbiddenMsg"])}
        </div>
        {" "}
        <button onClick={V["onBackToTickets"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "padding": "10px 16px", "marginTop": "20px", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scpl scp4">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
          </svg>
          {"Volver a mis tickets"}
        </button>
        {" "}
      </div>
      {" "}
    </>
  );
}
