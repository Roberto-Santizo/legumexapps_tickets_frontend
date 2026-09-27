// Controles de la lista: alcance, periodo, búsqueda, filtros, orden y vista.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function BarraControles({ V }) {
  return (
    <div data-m="controles" style={{ "display": "flex", "flexDirection": "column", "alignItems": "stretch", "gap": "12px", "padding": "14px 0", "borderBottom": "1px solid var(--n-200)", "marginBottom": "12px", "position": "sticky", "top": "0", "zIndex": "24", "background": "rgba(var(--fondo-rgb),0.95)", "boxShadow": "0 10px 24px -14px rgba(11,42,30,calc(0.35 * var(--fadeOn,0)))", "transition": "box-shadow 240ms ease", "backdropFilter": "blur(12px)", "WebkitBackdropFilter": "blur(12px)", "borderRadius": "12px", "paddingLeft": "12px", "paddingRight": "12px" }} className="scpn">
      {" "}
      <div style={{ "display": "flex", "alignItems": "center", "flexWrap": "wrap", "columnGap": "12px", "rowGap": "12px", "minHeight": "40px", "minWidth": "0" }}>
        {" "}
        <h1 title={V["pageTitle"]} style={{ "flex": "1", "minWidth": "0", "overflow": "hidden", "textOverflow": "ellipsis", "fontSize": "28px", "lineHeight": "40px", "fontWeight": "800", "letterSpacing": "-0.04em", "margin": "0", "color": "var(--n-900)", "whiteSpace": "nowrap" }}>
          {T(V["pageTitle"])}
        </h1>
        {/* Aviso de sesión junto al título: así los filtros y las acciones (con "Crear ticket")
            caben en una sola línea en laptops. */}
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
        {V["ctlRow"] ? (<>
          <span aria-hidden="true" style={{ "flexBasis": "100%", "height": "0" }}></span>
        </>) : null}
        {" "}
        {V["ctlRow"] ? (<>
          {" "}
          <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "flexWrap": "wrap", "minWidth": "0" }}>
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
            {V["vistaAdmin"] ? (<>
              {" "}
              <div role="group" aria-label="Qué tickets ver" style={{ "display": "flex", "gap": "2px", "height": "40px", "boxSizing": "border-box", "padding": "3px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px" }}>
                {" "}
                {L(V["scopeOpts"]).map((_o_7, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <button onClick={_o_7?.["go"]} aria-pressed={_o_7?.["pressed"]} style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "padding": "0 12px", "border": "none", "borderRadius": "5px", "background": S(_o_7?.["barBg"]), "fontSize": "14px", "fontWeight": S(_o_7?.["weight"]), "color": "var(--n-900)", "cursor": "pointer", "whiteSpace": "nowrap", "transition": "background-color var(--duration-fast) var(--ease-standard),transform var(--duration-fast) var(--ease-standard)" }} className="scpb">
                      {T(_o_7?.["label"])}
                      <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
                        {T(_o_7?.["count"])}
                      </span>
                    </button>
                    {" "}
                  </React.Fragment>
                ))}
                {" "}
              </div>
              {" "}
            </>) : null}
            {" "}
            {V["vistaAdmin"] ? (<>
              {" "}
              <div style={{ "position": "relative" }}>
                {" "}
                <button onClick={V["onTogglePeriod"]} aria-label="Cambiar período" title="Muestra los tickets creados en este período" style={{ "display": "inline-flex", "alignItems": "center", "gap": "8px", "height": "40px", "background": "var(--n-0)", "color": "var(--n-600)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "0 10px 0 12px", "fontSize": "14px", "cursor": "pointer", "whiteSpace": "nowrap", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpo scpp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                  <span data-m="rotulo-periodo">{"Creados en"}</span>
                  <span style={{ "fontWeight": "600", "color": "var(--n-900)" }}>
                    {T(V["periodLabel"])}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-500)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                {" "}
                {V["periodOpen"] ? (<>
                  {" "}
                  <div data-m="velo-hoja" onClick={V["onDismissPop"]} style={{ "position": "fixed", "inset": "0", "zIndex": "25" }}></div>
                  {" "}
                  <div data-m="hoja" role="dialog" aria-label="Período" style={{ "position": "absolute", "top": "calc(100% + 6px)", "zIndex": "30", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px", "animation": "dropIn var(--duration-base) var(--ease-standard) both", "left": "0", "width": "220px", "padding": "6px", "display": "flex", "flexDirection": "column", "gap": "2px" }}>
                    {" "}
                    {L(V["periodOpts"]).map((_p_8, $index) => (
                      <React.Fragment key={$index}>
                        {" "}
                        <button onClick={_p_8?.["go"]} style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": S(_p_8?.["bg"]), "border": "none", "borderRadius": "8px", "padding": "8px 10px", "fontSize": "14px", "color": "var(--n-900)", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scpq scpr">
                          {T(_p_8?.["label"])}
                          {_p_8?.["on"] ? (<>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-900)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "marginLeft": "auto", "flexShrink": "0", "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                              <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                          </>) : null}
                        </button>
                        {" "}
                      </React.Fragment>
                    ))}
                    {" "}
                  </div>
                  {" "}
                </>) : null}
                {" "}
              </div>
              {" "}
              <div style={{ "position": "relative" }}>
                {" "}
                <button onClick={V["onToggleFilter"]} aria-label="Abrir filtros" title="Filtrar por estado y prioridad" style={{ "height": "40px", "boxSizing": "border-box", "background": S(V["filterBg"]), "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scpi scp4">
                  {" "}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                    <path d="M3 6h18"></path>
                    <path d="M7 12h10"></path>
                    <path d="M10 18h4"></path>
                  </svg>
                  {"Filtro "}
                  {V["hasFilterCount"] ? (<>
                    {" "}
                    <span style={{ "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "minWidth": "18px", "height": "18px", "padding": "0 5px", "borderRadius": "9999px", "background": "var(--azul-tinte)", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-900)" }}>
                      {T(V["filterCount"])}
                    </span>
                    {" "}
                  </>) : null}
                  {" "}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                  {" "}
                </button>
                {" "}
                {V["filterOpen"] ? (<>
                  {" "}
                  <div data-m="velo-hoja" onClick={V["onDismissFilter"]} style={{ "position": "fixed", "inset": "0", "zIndex": "25" }}></div>
                  {" "}
                  <div data-m="hoja" role="dialog" aria-label="Filtros" style={{ "position": "absolute", "top": "calc(100% + 6px)", "left": "0", "zIndex": "30", "width": "288px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "16px", "display": "flex", "flexDirection": "column", "gap": "16px", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
                    {" "}
                    <div style={{ "display": "flex", "flexDirection": "column", "gap": "2px" }}>
                      {" "}
                      <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "marginBottom": "6px" }}>
                        {"ESTADO"}
                      </div>
                      {" "}
                      {L(V["statusFilters"]).map((_f_9, $index) => (
                        <React.Fragment key={$index}>
                          {" "}
                          <button onClick={_f_9?.["go"]} style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": S(_f_9?.["bg"]), "border": "1px solid transparent", "borderRadius": "8px", "padding": "7px 8px", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scps scpt">
                            {" "}
                            {_f_9?.["hasDot"] ? (<>
                              <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_f_9?.["dot"]), "flexShrink": "0" }}></span>
                            </>) : null}
                            {" "}
                            <span style={{ "fontSize": "14px", "color": "var(--n-900)", "minWidth": "0" }}>
                              {T(_f_9?.["label"])}
                            </span>
                            {" "}
                            <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "flexShrink": "0" }}>
                              {T(_f_9?.["count"])}
                            </span>
                            {" "}
                            {_f_9?.["on"] ? (<>
                              {" "}
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-900)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-900))" }}>
                                <path d="M20 6 9 17l-5-5"></path>
                              </svg>
                              {" "}
                            </>) : null}
                            {" "}
                          </button>
                          {" "}
                        </React.Fragment>
                      ))}
                      {" "}
                    </div>
                    {" "}
                    <div style={{ "display": "flex", "flexDirection": "column", "gap": "2px", "borderTop": "1px solid var(--n-200)", "paddingTop": "14px" }}>
                      {" "}
                      <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "marginBottom": "6px" }}>
                        {"PRIORIDAD"}
                      </div>
                      {" "}
                      {L(V["prioFilters"]).map((_p_10, $index) => (
                        <React.Fragment key={$index}>
                          {" "}
                          <button onClick={_p_10?.["go"]} style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": S(_p_10?.["bg"]), "border": "1px solid transparent", "borderRadius": "8px", "padding": "7px 8px", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scps scpt">
                            {" "}
                            {_p_10?.["hasDot"] ? (<>
                              <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_p_10?.["dot"]), "flexShrink": "0" }}></span>
                            </>) : null}
                            {" "}
                            <span style={{ "fontSize": "14px", "color": "var(--n-900)", "minWidth": "0" }}>
                              {T(_p_10?.["label"])}
                            </span>
                            {" "}
                            <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "flexShrink": "0" }}>
                              {T(_p_10?.["count"])}
                            </span>
                            {" "}
                            {_p_10?.["on"] ? (<>
                              {" "}
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-900)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-900))" }}>
                                <path d="M20 6 9 17l-5-5"></path>
                              </svg>
                              {" "}
                            </>) : null}
                            {" "}
                          </button>
                          {" "}
                        </React.Fragment>
                      ))}
                      {" "}
                    </div>
                    {" "}
                    <div style={{ "display": "flex", "gap": "8px", "borderTop": "1px solid var(--n-200)", "paddingTop": "14px" }}>
                      {" "}
                      <button onClick={V["onClearDraft"]} style={{ "flex": "1", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "6px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpu scp4">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                          <path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"></path>
                          <path d="m22 3-5 5"></path>
                          <path d="m17 3 5 5"></path>
                        </svg>
                        {"Limpiar"}
                      </button>
                      {" "}
                      <button onClick={V["onCloseFilter"]} style={{ "flex": "1", "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpv">
                        {T(V["applyLabel"])}
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
            </>) : null}
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        <div style={{ "marginLeft": "auto", "flexShrink": "0", "display": "flex", "alignItems": "center", "gap": "4px", "minWidth": "0" }}>
          {" "}
          {" "}
          {V["searchClosed"] ? (<>
            {" "}
            <button onClick={V["onOpenSearch"]} aria-label="Buscar tickets" title="Buscar por título o código" style={{ "background": "transparent", "color": "var(--n-900)", "border": "1px solid transparent", "borderRadius": "8px", "width": "40px", "height": "40px", "padding": "0", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scpw scp4">
              {" "}
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              {" "}
            </button>
            {" "}
          </>) : null}
          {" "}
          {V["searchOpen"] ? (<>
            {" "}
            <div data-m="caja-busqueda" style={{ "position": "relative", "width": "min(280px,34vw)", "minWidth": "160px", "animation": "searchGrow var(--duration-base) var(--ease-standard) both" }}>
              {" "}
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "position": "absolute", "left": "11px", "top": "50%", "transform": "translateY(-50%)", "pointerEvents": "none" }}>
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              {" "}
              <input id="tic-search" value={(V["q"] ?? "")} onChange={V["onQuery"]} onBlur={V["onBlurSearch"]} placeholder="Buscar por título o código" style={{ "width": "100%", "height": "40px", "boxSizing": "border-box", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-1000)", "borderRadius": "8px", "padding": "0 36px 0 36px", "fontSize": "14px", "outline": "none" }} />
              {" "}
              {V["hasQuery"] ? (<>
                {" "}
                <button onClick={V["onClearQuery"]} aria-label="Limpiar búsqueda" title="Limpiar búsqueda" style={{ "position": "absolute", "right": "6px", "top": "50%", "transform": "translateY(-50%)", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "6px", "padding": "3px", "cursor": "pointer", "display": "flex", "alignItems": "center", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scpx scpy">
                  <svg style={{ "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
                {" "}
              </>) : null}
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["vistaAdmin"] ? (<>
            {" "}
            <div style={{ "position": "relative" }}>
              {" "}
              <button onClick={V["onToggleView"]} aria-label="Vista y orden" title="Vista y orden" style={{ "background": S(V["viewBtnBg"]), "color": "var(--n-900)", "border": "1px solid transparent", "borderRadius": "8px", "width": "40px", "height": "40px", "padding": "0", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpz scp10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                  <path d="M21 4h-7"></path>
                  <path d="M10 4H3"></path>
                  <path d="M21 12h-9"></path>
                  <path d="M8 12H3"></path>
                  <path d="M21 20h-5"></path>
                  <path d="M12 20H3"></path>
                  <path d="M14 2v4"></path>
                  <path d="M8 10v4"></path>
                  <path d="M16 18v4"></path>
                </svg>
              </button>
              {" "}
              {V["viewOpen"] ? (<>
                {" "}
                <div data-m="velo-hoja" onClick={V["onDismissPop"]} style={{ "position": "fixed", "inset": "0", "zIndex": "25" }}></div>
                {" "}
                <div data-m="hoja" role="dialog" aria-label="Vista y orden" style={{ "position": "absolute", "top": "calc(100% + 6px)", "zIndex": "30", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px", "animation": "dropIn var(--duration-base) var(--ease-standard) both", "right": "0", "width": "260px", "padding": "14px", "display": "flex", "flexDirection": "column", "gap": "14px" }}>
                  {" "}
                  <div data-m="solo-escritorio">
                    {" "}
                    <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "marginBottom": "8px" }}>
                      {"VISTA"}
                    </div>
                    {" "}
                    <div style={{ "display": "flex", "gap": "4px", "background": "var(--n-50)", "borderRadius": "8px", "padding": "4px" }}>
                      {" "}
                      <button onClick={V["onCards"]} title="Vista de tarjetas" aria-label="Vista de tarjetas" style={{ "border": S(V["cardsBorder"]), "background": S(V["cardsBg"]), "color": S(V["cardsIcon"]), "flex": "1", "justifyContent": "center", "padding": "7px 10px", "borderRadius": "6px", "cursor": "pointer", "boxShadow": S(V["cardsShadow"]), "display": "flex", "alignItems": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)" }} className="scp11 scp4">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "animation": S(V["tapCards"]), "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                          <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                          <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                          <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                          <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                        </svg>
                      </button>
                      {" "}
                      <button onClick={V["onTable"]} title="Vista de tabla" aria-label="Vista de tabla" style={{ "border": S(V["tableBorder"]), "background": S(V["tableBg"]), "color": S(V["tableIcon"]), "flex": "1", "justifyContent": "center", "padding": "7px 10px", "borderRadius": "6px", "cursor": "pointer", "boxShadow": S(V["tableShadow"]), "display": "flex", "alignItems": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)" }} className="scp11 scp4">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "animation": S(V["tapTable"]), "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                          <path d="M3 12h.01"></path>
                          <path d="M3 18h.01"></path>
                          <path d="M3 6h.01"></path>
                          <path d="M8 12h13"></path>
                          <path d="M8 18h13"></path>
                          <path d="M8 6h13"></path>
                        </svg>
                      </button>
                      {" "}
                      <button onClick={V["onKanban"]} title="Vista kanban" aria-label="Vista kanban" style={{ "border": S(V["kanbanBorder"]), "background": S(V["kanbanBg"]), "color": S(V["kanbanIcon"]), "flex": "1", "justifyContent": "center", "padding": "7px 10px", "borderRadius": "6px", "cursor": "pointer", "boxShadow": S(V["kanbanShadow"]), "display": "flex", "alignItems": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp11 scp4">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "animation": S(V["tapKanban"]), "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                          <path d="M9 3v18"></path>
                          <path d="M15 3v18"></path>
                        </svg>
                      </button>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div data-m="orden" style={{ "borderTop": "1px solid var(--n-200)", "paddingTop": "14px" }}>
                    {" "}
                    <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "marginBottom": "8px" }}>
                      {"ORDENAR POR"}
                    </div>
                    {" "}
                    <div title={V["sortNote"]} style={{ "display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "4px", "background": "var(--n-50)", "borderRadius": "8px", "padding": "4px" }}>
                      {" "}
                      {L(V["sortFilters"]).map((_o_11, $index) => (
                        <React.Fragment key={$index}>
                          {" "}
                          <button onClick={_o_11?.["go"]} style={{ "border": S(_o_11?.["border"]), "background": S(_o_11?.["bg"]), "color": "var(--n-900)", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "borderRadius": "6px", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp4">
                            {T(_o_11?.["label"])}
                          </button>
                          {" "}
                        </React.Fragment>
                      ))}
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </>) : null}
              {" "}
            </div>
            {" "}
            <button onClick={V["onExportList"]} aria-label="Exportar lo que se ve a CSV" title="Exportar lo que se ve a CSV" style={{ "background": "transparent", "color": "var(--n-900)", "border": "1px solid transparent", "borderRadius": "8px", "width": "40px", "height": "40px", "padding": "0", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp12 scp10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <path d="m17 8-5-5-5 5"></path>
                <path d="M12 3v12"></path>
              </svg>
            </button>
            {" "}
          </>) : null}
          {" "}
          <span style={{ "width": "6px" }}></span>
          {" "}
          <button onClick={V["onNewTicket"]} style={{ "height": "40px", "boxSizing": "border-box", "whiteSpace": "nowrap", "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "0 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp13 scpv">
            {" "}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "transform": "rotate(var(--ir,0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            {"Crear ticket "}
          </button>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}
