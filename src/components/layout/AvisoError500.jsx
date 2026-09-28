// Aviso de error del servidor (500).
// V: valores de la lógica (src/logic/valores).
import { T, S } from '../../utils/runtime.js';

export default function AvisoError500({ V }) {
  return (
    <>
      {" "}
      <div style={{ "display": "flex", "gap": "12px", "alignItems": "flex-start", "background": "var(--ambar-tinte)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "16px", "marginBottom": "20px" }}>
        {" "}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
        {" "}
        <div style={{ "minWidth": "0" }}>
          {" "}
          <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)" }}>
            {"No pudimos cargar los datos"}
          </div>
          {" "}
          <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-800)" }}>
            {"El servidor no respondió. Nada de lo que hiciste se perdió — vuelve a intentar en unos segundos."}
          </div>
          {" "}
          <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "marginTop": "6px", "letterSpacing": "0.02em" }}>
            {T(V["err500Line"])}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ "marginLeft": "auto", "display": "flex", "gap": "8px", "flexShrink": "0" }}>
          {" "}
          <button onClick={V["onRetry"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "padding": "8px 12px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scpj scp4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapRetry"]), "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
            </svg>
            {"Reintentar"}
          </button>
          {" "}
          <button onClick={V["onDismiss500"]} aria-label="Descartar aviso" title="Descartar aviso" style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "padding": "8px 10px", "display": "flex", "alignItems": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scpk scp4">
            <svg style={{ "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </>
  );
}
