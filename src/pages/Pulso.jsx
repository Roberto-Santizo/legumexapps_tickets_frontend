// Pulso: métricas del área.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../utils/runtime.js';

export default function Pulso({ V }) {
  return (
    <>
      {" "}
      <div>
        {" "}
        <div style={{ "display": "flex", "marginBottom": "16px" }}>
          <button onClick={V["onHeaderBack"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "flexShrink": "0", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpm scp4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            {"Volver al listado"}
          </button>
        </div>
        {" "}
        {V["vistaAdmin"] ? (<>
          {" "}
          <div data-m="kpis" style={{ "position": "relative", "display": "grid", "gridTemplateColumns": "repeat(auto-fit,minmax(170px,1fr))", "columnGap": "0", "rowGap": "28px", "margin": "8px 0 20px", "padding": "24px 20px 20px", "background": "rgba(var(--fondo-rgb),0.9)", "backdropFilter": "blur(12px)", "WebkitBackdropFilter": "blur(12px)", "borderRadius": "12px", "borderRadius": "16px" }}>
            {" "}
            <div style={{ "position": "relative", "padding": "22px 24px 0 0", "borderTop": "1px solid #d4d6cf", "minWidth": "0", "animation": "dropIn var(--duration-page) var(--ease-standard) 0ms both" }}>
              {" "}
              <span aria-hidden="true" style={{ "position": "absolute", "top": "-4px", "left": "0", "width": "9px", "height": "9px", "borderRadius": "9999px", "background": "var(--naranja)", "boxShadow": "0 0 0 4px var(--fondo)" }}></span>
              {" "}
              <div style={{ "fontSize": "40px", "lineHeight": "1", "fontWeight": "700", "letterSpacing": "-0.035em", "color": "var(--n-900)" }}>
                {T(V["pLate"])}
              </div>
              {" "}
              <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.1em", "color": "var(--n-600)", "marginTop": "10px" }}>
                {"SIN MOVER"}
              </div>
              {" "}
              <div style={{ "fontSize": "13px", "lineHeight": "1.45", "color": "var(--n-600)", "marginTop": "6px", "textWrap": "pretty" }}>
                {"Pasaron su margen y nadie los tocó"}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ "position": "relative", "padding": "22px 24px 0 0", "borderTop": "1px solid #d4d6cf", "minWidth": "0", "animation": "dropIn var(--duration-page) var(--ease-standard) 60ms both" }}>
              {" "}
              <span aria-hidden="true" style={{ "position": "absolute", "top": "-4px", "left": "0", "width": "9px", "height": "9px", "borderRadius": "9999px", "background": "var(--naranja)", "boxShadow": "0 0 0 4px var(--fondo)" }}></span>
              {" "}
              <div style={{ "fontSize": "40px", "lineHeight": "1", "fontWeight": "700", "letterSpacing": "-0.035em", "color": "var(--n-900)" }}>
                {T(V["pUnassigned"])}
              </div>
              {" "}
              <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.1em", "color": "var(--n-600)", "marginTop": "10px" }}>
                {"SIN DUEÑO"}
              </div>
              {" "}
              <div style={{ "fontSize": "13px", "lineHeight": "1.45", "color": "var(--n-600)", "marginTop": "6px", "textWrap": "pretty" }}>
                {"Activos que todavía no tienen técnico"}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ "position": "relative", "padding": "22px 24px 0 0", "borderTop": "1px solid #d4d6cf", "minWidth": "0", "animation": "dropIn var(--duration-page) var(--ease-standard) 120ms both" }}>
              {" "}
              <span aria-hidden="true" style={{ "position": "absolute", "top": "-4px", "left": "0", "width": "9px", "height": "9px", "borderRadius": "9999px", "background": "var(--azul)", "boxShadow": "0 0 0 4px var(--fondo)" }}></span>
              {" "}
              <div style={{ "fontSize": "40px", "lineHeight": "1", "fontWeight": "700", "letterSpacing": "-0.035em", "color": "var(--n-900)" }}>
                {T(V["pFirstResp"])}
              </div>
              {" "}
              <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.1em", "color": "var(--n-600)", "marginTop": "10px" }}>
                {"PRIMERA RESPUESTA"}
              </div>
              {" "}
              <div style={{ "fontSize": "13px", "lineHeight": "1.45", "color": "var(--n-600)", "marginTop": "6px", "textWrap": "pretty" }}>
                {"Promedio hasta que alguien contesta"}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ "position": "relative", "padding": "22px 24px 0 0", "borderTop": "1px solid #d4d6cf", "minWidth": "0", "animation": "dropIn var(--duration-page) var(--ease-standard) 180ms both" }}>
              {" "}
              <span aria-hidden="true" style={{ "position": "absolute", "top": "-4px", "left": "0", "width": "9px", "height": "9px", "borderRadius": "9999px", "background": "var(--verde)", "boxShadow": "0 0 0 4px var(--fondo)" }}></span>
              {" "}
              <div style={{ "fontSize": "40px", "lineHeight": "1", "fontWeight": "700", "letterSpacing": "-0.035em", "color": "var(--n-900)" }}>
                {T(V["pResolution"])}
              </div>
              {" "}
              <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.1em", "color": "var(--n-600)", "marginTop": "10px" }}>
                {"HASTA EL CIERRE"}
              </div>
              {" "}
              <div style={{ "fontSize": "13px", "lineHeight": "1.45", "color": "var(--n-600)", "marginTop": "6px", "textWrap": "pretty" }}>
                {"Promedio de principio a fin"}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit,minmax(260px,1fr))", "gap": "12px", "marginBottom": "16px" }}>
            {" "}
            <div style={{ "background": S(V["pLateBg"]), "border": S(V["pLateBorder"]), "borderRadius": "12px", "padding": "16px" }}>
              {" "}
              <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.12em", "display": "flex", "alignItems": "center", "gap": "12px" }}>
                <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
                {"PASARON SU MARGEN"}
              </div>
              {" "}
              <div style={{ "display": "flex", "alignItems": "baseline", "gap": "8px", "marginTop": "8px" }}>
                {" "}
                <span style={{ "fontSize": "24px", "lineHeight": "1.33", "fontWeight": "600", "color": "var(--n-900)" }}>
                  {T(V["pLate"])}
                </span>
                {" "}
                <span style={{ "fontSize": "12px", "color": "var(--n-600)" }}>
                  {T(V["pLateNote"])}
                </span>
                {" "}
              </div>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "2px", "marginTop": "10px", "borderTop": "1px solid var(--n-200)", "paddingTop": "10px" }}>
                {" "}
                <span style={{ "fontSize": "12px", "color": "var(--n-600)", "textWrap": "pretty" }}>
                  {T(V["pWaitNote"])}
                </span>
                {" "}
                {V["pWaitWeek"] ? (<>
                  {" "}
                  <span style={{ "fontSize": "12px", "color": "var(--n-600)", "textWrap": "pretty" }}>
                    {T(V["pWaitWeekNote"])}
                  </span>
                  {" "}
                </>) : null}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "16px" }}>
              {" "}
              <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.12em", "display": "flex", "alignItems": "center", "gap": "12px" }}>
                <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
                {"SIN ASIGNAR"}
              </div>
              {" "}
              <div style={{ "display": "flex", "alignItems": "baseline", "gap": "8px", "marginTop": "8px" }}>
                {" "}
                <span style={{ "fontSize": "24px", "lineHeight": "1.33", "fontWeight": "600", "color": "var(--n-900)" }}>
                  {T(V["pUnassigned"])}
                </span>
                {" "}
                <span style={{ "fontSize": "12px", "color": "var(--n-500)" }}>
                  {T(V["pUnassignedNote"])}
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "16px" }}>
              {" "}
              <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.12em", "display": "flex", "alignItems": "center", "gap": "12px" }}>
                <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
                {"PRIMERA RESPUESTA"}
              </div>
              {" "}
              <div style={{ "display": "flex", "alignItems": "baseline", "gap": "8px", "marginTop": "8px" }}>
                {" "}
                <span style={{ "fontSize": "24px", "lineHeight": "1.33", "fontWeight": "600", "color": "var(--n-900)" }}>
                  {T(V["pFirstResp"])}
                </span>
                {" "}
                <span style={{ "fontSize": "12px", "color": "var(--n-500)" }}>
                  {T(V["pFirstRespNote"])}
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "16px" }}>
              {" "}
              <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.12em", "display": "flex", "alignItems": "center", "gap": "12px" }}>
                <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
                {"TIEMPO HASTA EL CIERRE"}
              </div>
              {" "}
              <div style={{ "display": "flex", "alignItems": "baseline", "gap": "8px", "marginTop": "8px" }}>
                {" "}
                <span style={{ "fontSize": "24px", "lineHeight": "1.33", "fontWeight": "600", "color": "var(--n-900)" }}>
                  {T(V["pResolution"])}
                </span>
                {" "}
                <span style={{ "fontSize": "12px", "color": "var(--n-500)" }}>
                  {T(V["pResolutionNote"])}
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "16px", "marginBottom": "16px", "alignItems": "stretch" }}>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "24px", "flex": "2 1 460px", "minWidth": "0" }}>
              {" "}
              <div style={{ "display": "flex", "alignItems": "flex-start", "gap": "16px", "flexWrap": "wrap" }}>
                {" "}
                <div style={{ "minWidth": "0" }}>
                  {" "}
                  <h3 style={{ "fontSize": "16px", "fontWeight": "600", "margin": "0", "color": "var(--n-900)" }}>
                    {"Entradas y cierres"}
                  </h3>
                  {" "}
                  <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "2px" }}>
                    {"Últimos 14 días · si la línea verde va por arriba, la cola baja"}
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ "marginLeft": "auto", "display": "flex", "gap": "20px", "flexWrap": "wrap" }}>
                  {" "}
                  <div>
                    <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.12em", "display": "flex", "alignItems": "center", "gap": "12px" }}>
                      <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
                      {"ENTRARON"}
                    </div>
                    <div style={{ "display": "flex", "alignItems": "center", "gap": "6px", "marginTop": "4px" }}>
                      <span style={{ "width": "10px", "height": "2px", "background": "var(--n-900)", "borderRadius": "2px" }}></span>
                      <span style={{ "fontSize": "20px", "fontWeight": "600", "color": "var(--n-900)" }}>
                        {T(V["pInTotal"])}
                      </span>
                    </div>
                  </div>
                  {" "}
                  <div>
                    <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.12em", "display": "flex", "alignItems": "center", "gap": "12px" }}>
                      <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
                      {"CERRARON"}
                    </div>
                    <div style={{ "display": "flex", "alignItems": "center", "gap": "6px", "marginTop": "4px" }}>
                      <span style={{ "width": "10px", "height": "2px", "background": "var(--verde)", "borderRadius": "2px" }}></span>
                      <span style={{ "fontSize": "20px", "fontWeight": "600", "color": "var(--n-900)" }}>
                        {T(V["pOutTotal"])}
                      </span>
                    </div>
                  </div>
                  {" "}
                  <div>
                    <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.12em", "display": "flex", "alignItems": "center", "gap": "12px" }}>
                      <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
                      {"BALANCE"}
                    </div>
                    <div style={{ "fontSize": "20px", "fontWeight": "600", "color": S(V["pNetInk"]), "marginTop": "4px" }}>
                      {T(V["pNet"])}
                    </div>
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div style={{ "position": "relative", "height": "200px", "marginTop": "20px" }}>
                {" "}
                <svg viewBox="0 0 640 200" preserveAspectRatio="none" style={{ "position": "absolute", "inset": "0", "width": "100%", "height": "100%", "overflow": "visible" }}>
                  {" "}
                  {L(V["pGrid"]).map((_gl_35, $index) => (
                    <React.Fragment key={$index}>
                      {" "}
                      <line x1="0" x2="640" y1={_gl_35?.["y"]} y2={_gl_35?.["y"]} stroke="var(--n-75)" strokeWidth="1" vectorEffect="non-scaling-stroke"></line>
                      {" "}
                    </React.Fragment>
                  ))}
                  {" "}
                  <defs>
                    <linearGradient id="pvArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--verde)" stopOpacity="0.22"></stop>
                      <stop offset="1" stopColor="var(--verde)" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  {" "}
                  <path d={V["pOutArea"]} fill="url(#pvArea)" style={{ "animation": "chartFade 900ms var(--ease-standard) 400ms both" }}></path>
                  {" "}
                  <path d={V["pInPath"]} fill="none" stroke="var(--n-900)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" pathLength="1" strokeDasharray="1" style={{ "animation": "chartDraw 1100ms var(--ease-standard) both" }}></path>
                  {" "}
                  <path d={V["pOutPath"]} fill="none" stroke="var(--verde)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" pathLength="1" strokeDasharray="1" style={{ "animation": "chartDraw 1100ms var(--ease-standard) 180ms both" }}></path>
                  {" "}
                </svg>
                {" "}
                <div style={{ "position": "absolute", "inset": "0", "display": "grid", "gridTemplateColumns": "repeat(14,minmax(0,1fr))" }}>
                  {" "}
                  {L(V["pDays"]).map((_d_36, $index) => (
                    <React.Fragment key={$index}>
                      {" "}
                      <div style={{ "position": "relative", "cursor": "default" }} className="scp21">
                        {" "}
                        <span style={{ "position": "absolute", "left": "50%", "top": "0", "bottom": "0", "width": "1px", "background": "var(--tl,transparent)" }}></span>
                        {" "}
                        <span style={{ "position": "absolute", "left": "50%", "top": S(_d_36?.["yIn"]), "width": "8px", "height": "8px", "margin": "-4px 0 0 -4px", "borderRadius": "9999px", "background": "var(--n-0)", "border": "2px solid var(--n-900)", "opacity": "var(--tp,0)", "transition": "opacity var(--duration-fast) var(--ease-standard)" }}></span>
                        {" "}
                        <span style={{ "position": "absolute", "left": "50%", "top": S(_d_36?.["yOut"]), "width": "8px", "height": "8px", "margin": "-4px 0 0 -4px", "borderRadius": "9999px", "background": "var(--n-0)", "border": "2px solid var(--verde)", "opacity": "var(--tp,0)", "transition": "opacity var(--duration-fast) var(--ease-standard)" }}></span>
                        {" "}
                        <span style={{ "position": "absolute", "bottom": "calc(100% + 6px)", "left": "50%", "transform": "translateX(-50%)", "background": "var(--n-950)", "color": "var(--n-0)", "borderRadius": "8px", "padding": "6px 10px", "fontSize": "12px", "whiteSpace": "nowrap", "pointerEvents": "none", "opacity": "var(--tp,0)", "transition": "opacity var(--duration-fast) var(--ease-standard)", "zIndex": "2" }}>
                          {T(_d_36?.["tip"])}
                        </span>
                        {" "}
                      </div>
                      {" "}
                    </React.Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div style={{ "display": "flex", "justifyContent": "space-between", "marginTop": "8px", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
                <span>
                  {"HACE 13 D"}
                </span>
                <span>
                  {"HACE 7 D"}
                </span>
                <span>
                  {"HOY"}
                </span>
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "24px", "flex": "1 1 300px", "minWidth": "0" }}>
              {" "}
              <h3 style={{ "fontSize": "16px", "fontWeight": "600", "margin": "0", "color": "var(--n-900)" }}>
                {"Estado de lo activo"}
              </h3>
              {" "}
              <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "2px" }}>
                {"Contra el margen de atención de cada prioridad"}
              </div>
              {" "}
              <div style={{ "display": "flex", "alignItems": "center", "gap": "20px", "flexWrap": "wrap", "marginTop": "20px" }}>
                {" "}
                <div style={{ "position": "relative", "width": "148px", "height": "148px", "flexShrink": "0" }}>
                  {" "}
                  <svg viewBox="0 0 42 42" style={{ "width": "100%", "height": "100%", "animation": "donutIn 900ms cubic-bezier(0.34,1.4,0.64,1) both" }}>
                    {" "}
                    <circle cx="21" cy="21" r="15.915" fill="none" stroke="var(--n-50)" strokeWidth="5"></circle>
                    {" "}
                    {L(V["pDonut"]).map((_sg_37, $index) => (
                      <React.Fragment key={$index}>
                        {" "}
                        <circle cx="21" cy="21" r="15.915" fill="none" stroke={_sg_37?.["color"]} strokeWidth="5" strokeDasharray={_sg_37?.["dash"]} strokeDashoffset={_sg_37?.["off"]} style={{ "transition": "stroke-width var(--duration-fast) var(--ease-standard)" }} className="scp22">
                          <title>
                            {T(_sg_37?.["title"])}
                          </title>
                        </circle>
                        {" "}
                      </React.Fragment>
                    ))}
                    {" "}
                  </svg>
                  {" "}
                  <div style={{ "position": "absolute", "inset": "0", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "pointerEvents": "none" }}>
                    {" "}
                    <span style={{ "fontSize": "30px", "lineHeight": "1", "fontWeight": "600", "color": "var(--n-900)" }}>
                      {T(V["pActTotal"])}
                    </span>
                    {" "}
                    <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "marginTop": "4px" }}>
                      {"ACTIVOS"}
                    </span>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ "display": "flex", "flexDirection": "column", "gap": "10px", "minWidth": "0", "flex": "1" }}>
                  {" "}
                  {L(V["pDonut"]).map((_sg_38, $index) => (
                    <React.Fragment key={$index}>
                      {" "}
                      <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "minWidth": "0" }}>
                        {" "}
                        <span style={{ "width": "10px", "height": "10px", "borderRadius": "3px", "background": S(_sg_38?.["color"]), "flexShrink": "0" }}></span>
                        {" "}
                        <span style={{ "fontSize": "14px", "color": "var(--n-900)", "minWidth": "0", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                          {T(_sg_38?.["label"])}
                        </span>
                        {" "}
                        <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "12px", "color": "var(--n-900)", "flexShrink": "0" }}>
                          {T(_sg_38?.["n"])}
                        </span>
                        {" "}
                        <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "width": "36px", "textAlign": "right", "flexShrink": "0" }}>
                          {T(_sg_38?.["pct"])}
                        </span>
                        {" "}
                      </div>
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
          </div>
          {" "}
          <div style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit,minmax(320px,1fr))", "gap": "16px", "alignItems": "start" }}>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "24px" }}>
              {" "}
              <h3 style={{ "fontSize": "16px", "fontWeight": "600", "margin": "0", "color": "var(--n-900)" }}>
                {"Carga por persona"}
              </h3>
              {" "}
              <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "2px", "marginBottom": "16px" }}>
                {"Tickets activos asignados a cada uno, antes de repartir más"}
              </div>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "14px" }}>
                {" "}
                {L(V["pLoad"]).map((_p_39, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <div style={{ "display": "flex", "alignItems": "center", "gap": "12px" }}>
                      {" "}
                      <div style={{ "width": "32px", "height": "32px", "flexShrink": "0", "borderRadius": "9999px", "background": "var(--n-50)", "border": "1px solid " + S(_p_39?.["ring"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                        {T(_p_39?.["ini"])}
                      </div>
                      {" "}
                      <div style={{ "minWidth": "0", "flex": "1" }}>
                        {" "}
                        <div style={{ "display": "flex", "alignItems": "baseline", "gap": "8px" }}>
                          {" "}
                          <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "minWidth": "0", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                            {T(_p_39?.["nombre"])}
                          </span>
                          {" "}
                          <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "12px", "color": "var(--n-900)", "flexShrink": "0" }}>
                            {T(_p_39?.["count"])}
                          </span>
                          {" "}
                        </div>
                        {" "}
                        <div style={{ "height": "6px", "borderRadius": "9999px", "background": "var(--n-50)", "marginTop": "6px", "overflow": "hidden" }}>
                          {" "}
                          <div style={{ "height": "6px", "borderRadius": "9999px", "background": S(_p_39?.["bar"]), "width": S(_p_39?.["width"]), "transition": "width var(--duration-base) var(--ease-standard)" }}></div>
                          {" "}
                        </div>
                        {" "}
                        <div style={{ "fontSize": "11px", "color": S(_p_39?.["noteInk"]), "marginTop": "4px" }}>
                          {T(_p_39?.["note"])}
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </React.Fragment>
                ))}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "24px" }}>
              {" "}
              <h3 style={{ "fontSize": "16px", "fontWeight": "600", "margin": "0", "color": "var(--n-900)" }}>
                {"De dónde vienen"}
              </h3>
              {" "}
              <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "2px", "marginBottom": "16px" }}>
                {"Tickets por categoría — dice dónde conviene atacar la causa"}
              </div>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "14px" }}>
                {" "}
                {L(V["pCats"]).map((_c_40, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <div>
                      {" "}
                      <div style={{ "display": "flex", "alignItems": "baseline", "gap": "8px" }}>
                        {" "}
                        <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "minWidth": "0", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                          {T(_c_40?.["nombre"])}
                        </span>
                        {" "}
                        <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "12px", "color": "var(--n-900)", "flexShrink": "0" }}>
                          {T(_c_40?.["count"])}
                        </span>
                        {" "}
                      </div>
                      {" "}
                      <div style={{ "height": "6px", "borderRadius": "9999px", "background": "var(--n-50)", "marginTop": "6px", "overflow": "hidden" }}>
                        {" "}
                        <div style={{ "height": "6px", "borderRadius": "9999px", "background": S(_c_40?.["bar"]), "width": S(_c_40?.["width"]), "transition": "width var(--duration-base) var(--ease-standard)" }}></div>
                        {" "}
                      </div>
                      {" "}
                      <div style={{ "fontSize": "11px", "color": "var(--n-500)", "marginTop": "4px" }}>
                        {T(_c_40?.["note"])}
                      </div>
                      {" "}
                    </div>
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
          {V["pHasLate"] ? (<>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "24px", "marginTop": "16px" }}>
              {" "}
              <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "marginBottom": "4px" }}>
                {" "}
                <h3 style={{ "fontSize": "16px", "fontWeight": "600", "margin": "0", "color": "var(--n-900)" }}>
                  {"Lo que hay que mover hoy"}
                </h3>
                {" "}
                <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
                  {T(V["pLate"])}
                </span>
                {" "}
              </div>
              {" "}
              <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginBottom": "16px" }}>
                {"Ordenados por tiempo sin actividad"}
              </div>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                {" "}
                {L(V["pLateRows"]).map((_t_41, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <div onClick={_t_41?.["open"]} onKeyDown={_t_41?.["key"]} tabIndex="0" role="button" style={{ "display": "flex", "alignItems": "center", "gap": "12px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "12px", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)" }} className="scp14 scp1g">
                      {" "}
                      <div style={{ "minWidth": "0", "flex": "1" }}>
                        {" "}
                        <div style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                          {T(_t_41?.["titulo"])}
                        </div>
                        {" "}
                        <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "marginTop": "2px" }}>
                          {T(_t_41?.["code"])}{" · "}{T(_t_41?.["asig"])}
                        </div>
                        {" "}
                      </div>
                      {" "}
                      <span title={_t_41?.["slaTitle"]} style={{ "flexShrink": "0", "display": "inline-flex", "alignItems": "center", "gap": "6px", "background": "var(--n-0)", "border": "1px solid var(--naranja)", "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap" }}>
                        {" "}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                          <path d="M12 9v4"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                        {T(_t_41?.["slaLabel"])}{" "}
                      </span>
                      {" "}
                      {_t_41?.["canTake"] ? (<>
                        {" "}
                        <button onClick={_t_41?.["take"]} aria-label={_t_41?.["takeLabel"]} title={_t_41?.["takeLabel"]} style={{ "flexShrink": "0", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "5px 10px", "fontSize": "12px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp12 scp4">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(_t_41?.["tapTake"]), "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M19 8v6"></path>
                            <path d="M22 11h-6"></path>
                          </svg>
                          {"Tomar"}
                        </button>
                        {" "}
                      </>) : null}
                      {" "}
                    </div>
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
          <div style={{ "display": "flex", "gap": "10px", "alignItems": "flex-start", "background": "var(--fondo-2)", "borderRadius": "16px", "padding": "16px", "marginTop": "16px" }}>
            {" "}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "marginTop": "2px" }}>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            {" "}
            <span style={{ "fontSize": "12px", "lineHeight": "1.5", "color": "var(--n-600)", "textWrap": "pretty" }}>
              {T(V["pNote"])}
            </span>
            {" "}
          </div>
          {" "}
        </>) : null}
      </div>
      {" "}
    </>
  );
}
