// Asignación del ticket (solo admin).
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function DetalleAsignacion({ V }) {
  return (
    <>
      {" "}
      <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "16px", "display": "flex", "flexDirection": "column", "gap": "8px", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
        {" "}
        <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "letterSpacing": "0.04em" }}>
          {"ASIGNACIÓN · ADMIN"}
        </div>
        {" "}
        <div style={{ "position": "relative" }}>
          {" "}
          <button onClick={V["onToggleAsig"]} aria-label="Cambiar asignación" style={{ "width": "100%", "display": "flex", "alignItems": "center", "gap": "10px", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 10px", "cursor": "pointer", "textAlign": "left", "transition": "background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scpi scpt">
            {" "}
            {V["asigHasPerson"] ? (<>
              {" "}
              <span style={{ "width": "28px", "height": "28px", "flexShrink": "0", "borderRadius": "9999px", "background": "var(--n-50)", "border": "1px solid " + S(V["asigBtnRing"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "11px", "fontWeight": "600", "color": "var(--n-900)" }}>
                {T(V["asigBtnIni"])}
              </span>
              {" "}
            </>) : null}
            {" "}
            {V["asigNone"] ? (<>
              {" "}
              <span style={{ "width": "28px", "height": "28px", "flexShrink": "0", "borderRadius": "9999px", "background": "var(--n-0)", "border": "1px dashed var(--n-300)", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                <svg style={{ "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-500))" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--n-500)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M19 8v6"></path>
                  <path d="M22 11h-6"></path>
                </svg>
              </span>
              {" "}
            </>) : null}
            {" "}
            <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "minWidth": "0", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
              {T(V["asigBtnLabel"])}
            </span>
            {" "}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "marginLeft": "auto", "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="m6 9 6 6 6-6"></path>
            </svg>
            {" "}
          </button>
          {" "}
          {V["asigOpen"] ? (<>
            {" "}
            <div role="dialog" aria-label="Elegir responsable" style={{ "position": "absolute", "top": "calc(100% + 6px)", "left": "0", "right": "0", "zIndex": "30", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "8px", "display": "flex", "flexDirection": "column", "gap": "2px", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
              {" "}
              {L(V["assignables"]).map((_u_31, $index) => (
                <React.Fragment key={$index}>
                  {" "}
                  <button onClick={_u_31?.["pick"]} title={_u_31?.["full"]} style={{ "display": "flex", "alignItems": "center", "gap": "10px", "width": "100%", "textAlign": "left", "background": "transparent", "border": "none", "borderRadius": "8px", "padding": "7px 8px", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scps scpt">
                    {" "}
                    <span style={{ "width": "28px", "height": "28px", "flexShrink": "0", "borderRadius": "9999px", "background": "var(--n-50)", "border": "1px solid " + S(_u_31?.["ring"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "11px", "fontWeight": "600", "color": "var(--n-900)" }}>
                      {T(_u_31?.["ini"])}
                    </span>
                    {" "}
                    <span style={{ "minWidth": "0", "flex": "1" }}>
                      {" "}
                      <span style={{ "display": "flex", "alignItems": "center", "gap": "6px", "minWidth": "0" }}>
                        <span style={{ "fontSize": "14px", "fontWeight": S(_u_31?.["weight"]), "color": "var(--n-900)", "minWidth": "0", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                          {T(_u_31?.["nombre"])}
                        </span>
                        {_u_31?.["hasTag"] ? (<>
                          <span style={{ "flexShrink": "0", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "10px", "letterSpacing": "0.04em", "color": "var(--n-900)", "background": S(_u_31?.["tagBg"]), "borderRadius": "9999px", "padding": "2px 7px" }}>
                            {T(_u_31?.["tag"])}
                          </span>
                        </>) : null}
                      </span>
                      {" "}
                      <span style={{ "display": "flex", "alignItems": "center", "gap": "6px", "fontSize": "11px", "color": S(_u_31?.["loadInk"]), "marginTop": "1px" }}>
                        {" "}
                        {_u_31?.["hasLate"] ? (<>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--naranja))" }}>
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                            <path d="M12 9v4"></path>
                            <path d="M12 17h.01"></path>
                          </svg>
                          {T(_u_31?.["lateLabel"])}
                        </>) : null}
                        {" "}
                        {_u_31?.["hasLate"] ? (<>
                          <span style={{ "color": "var(--n-300)" }}>
                            {"·"}
                          </span>
                        </>) : null}
                        {T(_u_31?.["load"])}{" "}
                      </span>
                      {" "}
                    </span>
                    {" "}
                    {_u_31?.["on"] ? (<>
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
              {V["asigHasPerson"] && V["canUnassign"] ? (<>
                {" "}
                <button onClick={V["asigClear"]} style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": "transparent", "border": "none", "borderTop": "1px solid var(--n-200)", "borderRadius": "0 0 8px 8px", "marginTop": "6px", "padding": "10px 8px 6px", "fontSize": "14px", "color": "var(--n-600)", "cursor": "pointer", "transition": "color var(--duration-fast) var(--ease-standard)" }} className="scp1r scpt">
                  {" "}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                  {"Quitar asignación "}
                </button>
                {" "}
              </>) : null}
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
        </div>
        {" "}
        <span style={{ "fontSize": "12px", "color": "var(--n-500)" }}>
          {"Quien recibe el ticket también puede cerrarlo."}
        </span>
        {" "}
      </div>
      {" "}
    </>
  );
}
