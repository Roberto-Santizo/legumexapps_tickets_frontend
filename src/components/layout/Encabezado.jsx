// Encabezado de la pantalla: ruta, título y acciones.
// V: valores de la lógica (src/logic/valores).
import { T, S } from '../../utils/runtime.js';

export default function Encabezado({ V }) {
  return (
    <>
      {" "}
      <header data-m="encabezado" data-no-print="" style={{ "display": "flex", "flexWrap": "wrap", "alignItems": "center", "justifyContent": "space-between", "gap": "16px", "padding": "24px 28px 20px", "margin": "0 0 4px", "background": "rgba(var(--fondo-rgb),0.9)", "backdropFilter": "blur(12px)", "WebkitBackdropFilter": "blur(12px)", "borderRadius": "12px", "borderRadius": "16px" }}>
        {" "}
        {V["notList"] ? (<>
          {" "}
          <div style={{ "flex": "1 1 320px", "minWidth": "min(280px,100%)", "display": "flex", "alignItems": "center" }}>
            {" "}
            <div style={{ "minWidth": "0" }}>
              {" "}
              <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.12em", "textTransform": "uppercase", "color": "var(--n-600)", "display": "flex", "alignItems": "center", "gap": "12px" }}>
                <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
                {T(V["crumb"])}
              </div>
              {" "}
              <h1 style={{ "fontSize": "32px", "lineHeight": "1.05", "fontWeight": "800", "letterSpacing": "-0.04em", "margin": "10px 0 0", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                {T(V["pageTitle"])}
              </h1>
              {" "}
              {V["nudgedOnlyOn"] ? (<>
                {" "}
                <button onClick={V["onClearNudged"]} aria-label="Quitar filtro de bloqueantes" title="Quitar filtro" style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "height": "32px", "padding": "0 8px 0 10px", "background": "var(--ambar-tinte)", "border": "1px solid var(--naranja)", "borderRadius": "9999px", "fontSize": "12px", "fontWeight": "500", "color": "var(--n-900)", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard)" }} className="scpb">
                  {"Solo bloqueantes"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
                {" "}
              </>) : null}
              {" "}
              <div style={{ "fontSize": "14px", "lineHeight": "1.5", "color": "var(--n-600)", "marginTop": "6px", "textWrap": "pretty" }}>
                {T(V["pageSub"])}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "flexShrink": "0", "flexWrap": "wrap", "justifyContent": "flex-end" }}>
          {" "}
          {V["showCsv"] ? (<>
            {" "}
            <button onClick={V["onExportCsv"]} title="Descarga lo que se ve en esta pantalla, separado por comas" style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scpi scp4">
              {" "}
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              {"Exportar CSV "}
            </button>
            {" "}
          </>) : null}
          {" "}
          {V["hasSessionMsg"] ? (<>
            {" "}
            <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "background": "var(--n-50)", "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "color": "var(--n-600)", "whiteSpace": "nowrap", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
              {" "}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
              {T(V["sessionMsg"])}{" "}
            </span>
            {" "}
          </>) : null}
          {" "}
          {V["canSwitchRole"] ? (<>
            <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
              {"VER COMO"}
            </span>
            {" "}
            <div style={{ "display": "flex", "gap": "4px", "background": "var(--n-50)", "borderRadius": "8px", "padding": "4px" }}>
              {" "}
              <button onClick={V["onRoleAdmin"]} style={{ "border": S(V["adminBorder"]), "background": S(V["adminBg"]), "color": "var(--n-900)", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "borderRadius": "6px", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp4">
                {"Admin"}
              </button>
              {" "}
              <button onClick={V["onRoleUser"]} style={{ "border": S(V["userBorder"]), "background": S(V["userBg"]), "color": "var(--n-900)", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "borderRadius": "6px", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp4">
                {"Usuario"}
              </button>
              {" "}
            </div>
          </>) : null}
          {" "}
        </div>
        {" "}
      </header>
      {" "}
    </>
  );
}
