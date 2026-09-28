// Lista de tickets: controles, filtros activos y la vista elegida.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';
import BarraControles from '../../components/tickets/BarraControles.jsx';
import VistaTarjetas from '../../components/tickets/VistaTarjetas.jsx';
import VistaTabla from '../../components/tickets/VistaTabla.jsx';
import VistaKanban from '../../components/tickets/VistaKanban.jsx';

export default function TicketsLista({ V }) {
  return (
    <>
      {" "}
      <div>
        {" "}
        <BarraControles V={V} />
        {" "}
        <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "12px", "flexWrap": "wrap", "marginBottom": "12px" }}>
          {" "}
          <div style={{ "minWidth": "0", "display": "flex", "alignItems": "baseline", "gap": "8px", "flexWrap": "wrap" }}>
            {V["showGreet"] ? (<>
              <span style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "animation": S(V["greetAnim"]) }}>
                <svg data-saludo-escena="" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  {V["saludoDia"] ? (<>
                    <g data-rayos="" style={{ "stroke": "var(--sol-rayo)", "strokeWidth": "1.6", "strokeLinecap": "round" }}>
                      <path d="M12 2v2.5"></path><path d="M12 19.5V22"></path><path d="M2 12h2.5"></path><path d="M19.5 12H22"></path>
                      <path d="m4.9 4.9 1.8 1.8"></path><path d="m17.3 17.3 1.8 1.8"></path><path d="m4.9 19.1 1.8-1.8"></path><path d="m17.3 6.7 1.8-1.8"></path>
                    </g>
                    <circle cx="12" cy="12" r="4.6" style={{ "fill": "var(--sol-2)" }}></circle>
                  </>) : null}
                  {V["saludoNoche"] ? (<>
                    <path d="M15.5 4.5a8 8 0 1 0 4 12.5a6.5 6.5 0 1 1-4-12.5z" style={{ "fill": "var(--ambar)" }}></path>
                    <path data-estrella="" d="M19 3.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" style={{ "fill": "var(--ambar)" }}></path>
                  </>) : null}
                </svg>
                {T(V["saludo"])}{"."}
              </span>
            </>) : null}
            <span style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-600)", "textWrap": "pretty" }}>
              {T(V["pageSub"])}
            </span>
          </div>
          {" "}
          <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "flexShrink": "0" }}>
            {" "}
            {V["canSwitchRole"] ? (<>
              <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
                {"VER COMO"}
              </span>
              {" "}
              <div style={{ "display": "flex", "gap": "4px", "background": "var(--n-50)", "borderRadius": "8px", "padding": "4px" }}>
                {" "}
                <button onClick={V["onRoleAdmin"]} style={{ "border": S(V["adminBorder"]), "background": S(V["adminBg"]), "color": "var(--n-900)", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "borderRadius": "6px", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp4">
                  {"Admin"}
                </button>
                {" "}
                <button onClick={V["onRoleUser"]} style={{ "border": S(V["userBorder"]), "background": S(V["userBg"]), "color": "var(--n-900)", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "borderRadius": "6px", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp4">
                  {"Usuario"}
                </button>
                {" "}
              </div>
            </>) : null}
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        {V["hasChips"] ? (<>
          {" "}
          <div style={{ "display": "flex", "alignItems": "center", "gap": "6px", "flexWrap": "wrap", "margin": "0 0 12px" }}>
            {" "}
            <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "marginRight": "2px" }}>
              {"FILTRANDO POR"}
            </span>
            {" "}
            {L(V["chips"]).map((_c_12, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "9999px", "padding": "4px 6px 4px 10px", "fontSize": "12px", "fontWeight": "500", "color": "var(--n-700)", "whiteSpace": "nowrap" }}>
                  {" "}
                  {_c_12?.["hasDot"] ? (<>
                    <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_c_12?.["dot"]), "flexShrink": "0" }}></span>
                  </>) : null}
                  {T(_c_12?.["label"])}{" "}
                  <button onClick={_c_12?.["clear"]} aria-label={"Quitar filtro " + S(_c_12?.["label"])} title="Quitar filtro" style={{ "background": "transparent", "border": "none", "borderRadius": "9999px", "padding": "2px", "cursor": "pointer", "display": "flex", "alignItems": "center", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scpx scpt">
                    <svg style={{ "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                  {" "}
                </span>
                {" "}
              </React.Fragment>
            ))}
            {" "}
            <button onClick={V["onClearFilters"]} style={{ "background": "transparent", "border": "none", "padding": "4px 6px", "fontSize": "12px", "fontWeight": "500", "color": "var(--n-600)", "cursor": "pointer", "borderRadius": "6px", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scp0 scpt">
              {"Limpiar todo"}
            </button>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        {V["vistaAdmin"] ? (<>
          {" "}
          <div style={{ "display": "flex", "alignItems": "baseline", "gap": "20px", "flexWrap": "wrap", "marginBottom": "16px", "padding": "12px 16px", "background": "rgba(var(--fondo-rgb),0.9)", "backdropFilter": "blur(12px)", "WebkitBackdropFilter": "blur(12px)", "borderRadius": "12px" }}>
            {" "}
            <div style={{ "display": "flex", "alignItems": "baseline", "gap": "8px" }}>
              {" "}
              <span style={{ "fontSize": "40px", "lineHeight": "1.11", "fontWeight": "500", "letterSpacing": "-0.02em", "color": "var(--n-900)" }}>
                {T(V["statTotal"])}
              </span>
              {" "}
              <span style={{ "fontSize": "14px", "color": "var(--n-600)" }}>
                {T(V["statTotalLabel"])}
              </span>
              {" "}
            </div>
            {" "}
            <div style={{ "display": "flex", "alignItems": "center", "gap": "16px", "flexWrap": "wrap" }}>
              {" "}
              {L(V["statBreakdown"]).map((_b_13, $index) => (
                <React.Fragment key={$index}>
                  {" "}
                  <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "fontSize": "14px", "color": "var(--n-600)", "whiteSpace": "nowrap" }}>
                    {" "}
                    <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_b_13?.["dot"]), "flexShrink": "0" }}></span>
                    {T(_b_13?.["count"])}{" "}{T(_b_13?.["label"])}{" "}
                  </span>
                  {" "}
                </React.Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        {V["isCards"] ? (<VistaTarjetas V={V} />) : null}
        {" "}
        {V["isTable"] ? (<VistaTabla V={V} />) : null}
        {" "}
        {V["isKanban"] ? (<VistaKanban V={V} />) : null}
        {" "}
      </div>
      {" "}
    </>
  );
}
