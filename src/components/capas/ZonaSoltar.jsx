// Capa de arrastrar y soltar: aparece mientras se arrastra un archivo sobre la ventana y dice
// si se puede soltar (y en qué ticket) o por qué no. No recibe eventos: los maneja la lógica
// (logic/metodos/adjuntos.js → escucharArrastre).
// V: valores de la lógica (src/logic/valores/capas.js).
import React from 'react';
import { T, S } from '../../utils/runtime.js';

export default function ZonaSoltar({ V }) {
  return (
    <div data-m="zona-soltar" data-no-print="" aria-live="polite" role="status" style={{ "position": "fixed", "inset": "0", "zIndex": "76", "pointerEvents": "none", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "24px", "background": "rgba(var(--fondo-rgb),0.78)", "animation": "overlayIn var(--duration-base) var(--ease-standard) both" }}>
      <div style={{ "position": "absolute", "inset": "16px", "borderRadius": "24px", "border": "2px dashed " + (V["arrastreOk"] ? "var(--marca-2)" : "var(--n-400)"), "background": V["arrastreOk"] ? "rgba(22,163,74,0.05)" : "transparent" }}></div>
      <div style={{ "position": "relative", "display": "flex", "flexDirection": "column", "alignItems": "center", "gap": "10px", "maxWidth": "420px", "textAlign": "center", "background": "var(--n-0)", "borderRadius": "20px", "padding": "28px 32px", "boxShadow": "0 1px 2px rgba(0,0,0,0.06),0 0 0 1px var(--n-200),0 24px 48px -24px rgba(11,42,30,0.25)", "animation": "modalIn var(--duration-base) var(--ease-standard) both" }}>
        <span style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "width": "56px", "height": "56px", "borderRadius": "9999px", "background": V["arrastreOk"] ? "var(--verde-tinte)" : "var(--n-50)" }}>
          {V["arrastreOk"] ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--verde-oscuro)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "animation": "soltarFlota 1.4s var(--ease-standard) infinite" }}>
              <path d="M16 5h6"></path>
              <path d="M19 2v6"></path>
              <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"></path>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              <circle cx="9" cy="9" r="2"></circle>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          )}
        </span>
        <div style={{ "fontSize": "20px", "fontWeight": "600", "color": "var(--n-900)", "letterSpacing": "-0.01em" }}>
          {T(V["arrastreTitulo"])}
        </div>
        {V["arrastreTituloTicket"] ? (
          <div style={{ "fontSize": "14px", "color": "var(--n-900)", "maxWidth": "100%", "overflow": "hidden", "textOverflow": "ellipsis", "whiteSpace": "nowrap" }}>
            {T(V["arrastreTituloTicket"])}
          </div>
        ) : null}
        <div style={{ "fontFamily": V["arrastreOk"] ? "'JetBrains Mono',monospace" : "inherit", "fontSize": V["arrastreOk"] ? "11px" : "13px", "letterSpacing": V["arrastreOk"] ? "0.04em" : "0", "color": "var(--n-600)", "lineHeight": "1.5" }}>
          {T(V["arrastreSub"])}
        </div>
      </div>
    </div>
  );
}
