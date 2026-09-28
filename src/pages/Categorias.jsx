// Lista de categorías.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../utils/runtime.js';

export default function Categorias({ V }) {
  return (
    <>
      {" "}
      <div>
        {" "}
        <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "marginBottom": "16px" }}>
          {" "}
          <button onClick={V["onHeaderBack"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "flexShrink": "0", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpm scp4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            {"Volver al listado"}
          </button>
          {" "}
          <button onClick={V["onNewCat"]} style={{ "marginLeft": "auto", "flexShrink": "0", "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp1h scpv">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)" }}>
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            {"Nueva categoría"}
          </button>
          {" "}
        </div>
        {" "}
        <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "overflow": "hidden" }}>
          {" "}
          <div data-m="tabla-cabecera" style={{ "display": "grid", "gridTemplateColumns": "minmax(0,2fr) 110px 120px 96px", "gap": "16px", "alignItems": "center", "padding": "10px 16px", "background": "var(--n-50)", "borderBottom": "1px solid var(--n-200)", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
            {" "}
            <span>
              {"CATEGORÍA"}
            </span>
            <span>
              {"TICKETS"}
            </span>
            <span>
              {"ACTIVA"}
            </span>
            <span></span>
            {" "}
          </div>
          {" "}
          {V["loading"] ? (<>
            {" "}
            {L(V["ghostRows"]).map((_g_51, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <div data-m="fila-cat" style={{ "display": "grid", "gridTemplateColumns": "minmax(0,2fr) 110px 120px 96px", "gap": "16px", "alignItems": "center", "padding": "12px 16px", "borderBottom": "1px solid var(--n-200)" }}>
                  {" "}
                  <div style={{ "display": "flex", "flexDirection": "column", "gap": "6px", "minWidth": "0" }}>
                    {" "}
                    <span style={{ "display": "block", "width": S(_g_51?.["w"]), "height": "14px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                    {" "}
                    <span style={{ "display": "block", "width": "64%", "height": "12px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                    {" "}
                  </div>
                  {" "}
                  <span style={{ "display": "block", "width": "24px", "height": "14px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                  {" "}
                  <span style={{ "display": "block", "width": "40px", "height": "22px", "borderRadius": "9999px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                  {" "}
                  <span style={{ "display": "block", "width": "72px", "height": "30px", "borderRadius": "8px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                  {" "}
                </div>
                {" "}
              </React.Fragment>
            ))}
            {" "}
          </>) : null}
          {" "}
          {L(V["catRows"]).map((_c_52, $index) => (
            <React.Fragment key={$index}>
              {" "}
              <div data-m="fila-cat" style={{ "display": "grid", "gridTemplateColumns": "minmax(0,2fr) 110px 120px 96px", "gap": "16px", "alignItems": "center", "padding": "12px 16px", "borderBottom": "1px solid var(--n-200)" }}>
                {" "}
                <div style={{ "minWidth": "0" }}>
                  {" "}
                  <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)" }}>
                    {T(_c_52?.["nombre"])}
                  </div>
                  {" "}
                  <div style={{ "fontSize": "12px", "color": "var(--n-500)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                    {T(_c_52?.["descripcion"])}
                  </div>
                  {" "}
                </div>
                {" "}
                <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "14px", "color": "var(--n-600)" }}>
                  {T(_c_52?.["tickets"])}
                </span>
                {" "}
                <button onClick={_c_52?.["toggle"]} aria-label={_c_52?.["toggleLabel"]} title={_c_52?.["toggleLabel"]} style={{ "justifySelf": "start", "width": "40px", "height": "22px", "borderRadius": "9999px", "border": "1px solid " + S(_c_52?.["trackBorder"]), "background": S(_c_52?.["track"]), "padding": "2px", "cursor": "pointer", "display": "flex", "justifyContent": "flex-start", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp6">
                  {" "}
                  <span style={{ "width": "16px", "height": "16px", "borderRadius": "9999px", "background": "var(--n-0)", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transform": "translateX(" + S(_c_52?.["knob"]) + ")", "transition": "transform var(--duration-fast) var(--ease-standard)" }}></span>
                  {" "}
                </button>
                {" "}
                <button onClick={_c_52?.["edit"]} style={{ "justifySelf": "start", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp1i scp4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,rotate(0deg) scale(1)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                  </svg>
                  {"Editar"}
                </button>
                {" "}
              </div>
              {" "}
            </React.Fragment>
          ))}
          {" "}
          {V["pgCats"]?.["show"] ? (<>
            {" "}
            <div data-m="paginador" style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "16px", "padding": "10px 16px", "background": "var(--n-50)", "borderTop": "1px solid var(--n-200)" }}>
              {" "}
              <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
                {T(V["pgCats"]?.["range"])}
              </span>
              {" "}
              <div style={{ "display": "flex", "gap": "8px" }}>
                {" "}
                <button onClick={V["pgCats"]?.["prev"]} disabled={V["pgCats"]?.["atStart"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "cursor": S(V["pgCats"]?.["prevCursor"]), "opacity": S(V["pgCats"]?.["prevOpacity"]) }} className="scpl scp10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  {"Anterior"}
                </button>
                {" "}
                <button onClick={V["pgCats"]?.["next"]} disabled={V["pgCats"]?.["atEnd"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "cursor": S(V["pgCats"]?.["nextCursor"]), "opacity": S(V["pgCats"]?.["nextOpacity"]) }} className="scp1d scp10">
                  {"Siguiente"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </>
  );
}
