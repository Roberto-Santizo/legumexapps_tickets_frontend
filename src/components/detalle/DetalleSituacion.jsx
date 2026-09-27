// Situación del ticket: estado, prioridad, SLA y seguimiento.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function DetalleSituacion({ V }) {
  return (
    <div style={{ "background": "var(--fondo-2)", "borderRadius": "16px", "padding": "16px", "display": "flex", "flexDirection": "column", "gap": "12px" }}>
      {" "}
      <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.12em", "display": "flex", "alignItems": "center", "gap": "12px" }}>
        <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
        {"DETALLE"}
      </div>
      {" "}
      <div style={{ "display": "flex", "justifyContent": "space-between", "gap": "8px" }}>
        <span style={{ "fontSize": "14px", "color": "var(--n-600)" }}>
          {"Categoría"}
        </span>
        <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "textAlign": "right" }}>
          {T(V["dCat"])}
        </span>
      </div>
      {" "}
      <div style={{ "display": "flex", "justifyContent": "space-between", "gap": "8px" }}>
        <span style={{ "fontSize": "14px", "color": "var(--n-600)" }}>
          {"Solicitante"}
        </span>
        <span style={{ "display": "flex", "alignItems": "center", "gap": "6px", "justifyContent": "flex-end", "minWidth": "0" }}>
          <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "textAlign": "right" }}>
            {T(V["dAutor"])}
          </span>
          {V["dAutorCall"] ? (<>
            <a href={V["dAutorTeams"]} onClick={V["onCallAutor"]} target="_blank" rel="noreferrer" title={"Llamar por Teams a " + S(V["dAutor"])} aria-label={"Llamar por Teams a " + S(V["dAutor"])} style={{ "flexShrink": "0", "display": "flex", "alignItems": "center", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "4px", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scpg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
              </svg>
            </a>
          </>) : null}
        </span>
      </div>
      {" "}
      <div style={{ "display": "flex", "justifyContent": "space-between", "gap": "8px" }}>
        <span style={{ "fontSize": "14px", "color": "var(--n-600)" }}>
          {"Asignado"}
        </span>
        <span style={{ "display": "flex", "alignItems": "center", "gap": "6px", "justifyContent": "flex-end", "minWidth": "0" }}>
          <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "textAlign": "right" }}>
            {T(V["dAsig"])}
          </span>
          {V["dAsigCall"] ? (<>
            <a href={V["dAsigTeams"]} onClick={V["onCallAsig"]} target="_blank" rel="noreferrer" title={"Llamar por Teams a " + S(V["dAsig"])} aria-label={"Llamar por Teams a " + S(V["dAsig"])} style={{ "flexShrink": "0", "display": "flex", "alignItems": "center", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "4px", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scpg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
              </svg>
            </a>
          </>) : null}
        </span>
      </div>
      {" "}
      <div style={{ "display": "flex", "justifyContent": "space-between", "gap": "8px" }}>
        <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "fontSize": "14px", "color": "var(--n-600)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
          {"Actualizado"}
        </span>
        <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "textAlign": "right" }}>
          {T(V["dUpdated"])}
        </span>
      </div>
      {" "}
      <div style={{ "display": "flex", "justifyContent": "space-between", "gap": "8px" }}>
        <span style={{ "fontSize": "14px", "color": "var(--n-600)" }}>
          {T(V["dFirstLabel"])}
        </span>
        <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "textAlign": "right" }}>
          {T(V["dFirstResp"])}
        </span>
      </div>
      {" "}
      {V["dSlaBlock"] ? (<>
        {" "}
        <div style={{ "borderTop": "1px solid var(--n-200)", "paddingTop": "12px", "display": "flex", "flexDirection": "column", "gap": "6px" }}>
          {" "}
          <span title={V["dSlaFull"]} style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "alignSelf": "flex-start", "background": S(V["dSlaBg"]), "border": S(V["dSlaBorder"]), "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "color": S(V["dSlaInk"]) }}>
            {" "}
            {V["dSlaLate"] ? (<>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
            </>) : null}
            {" "}
            {V["dSlaWatch"] ? (<>
              <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": "var(--naranja)", "flexShrink": "0" }}></span>
            </>) : null}
            {" "}
            {V["dSlaOk"] ? (<>
              <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": "var(--verde)", "flexShrink": "0" }}></span>
            </>) : null}
            {" "}
            {V["dSlaWaiting"] ? (<>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--azul)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </>) : null}
            {" "}
            {V["dSlaDone"] ? (<>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--verde)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
            </>) : null}
            <span style={{ "color": "var(--n-900)" }}>
              {T(V["dSlaLabel"])}
            </span>
            {" "}
          </span>
          {" "}
          {V["dShowMeta"] ? (<>
            {" "}
            <span style={{ "fontSize": "12px", "color": "var(--n-600)", "textWrap": "pretty" }}>
              {T(V["dSlaTarget"])}
            </span>
            {" "}
          </>) : null}
          {" "}
          {V["fuOn"] ? (<>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "14px", "display": "flex", "flexDirection": "column", "gap": "12px", "marginTop": "4px", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
              {" "}
              <div style={{ "display": "flex", "alignItems": "center", "gap": "8px" }}>
                {" "}
                <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
                  {"SEGUIMIENTO AUTOMÁTICO"}
                </span>
                {" "}
                <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
                  {T(V["fuLeft"])}
                </span>
                {" "}
              </div>
              {" "}
              <div style={{ "height": "3px", "borderRadius": "9999px", "background": "var(--n-50)", "overflow": "hidden" }}>
                <div style={{ "height": "100%", "borderRadius": "9999px", "background": "var(--azul)", "width": S(V["fuPct"]), "transition": "width var(--duration-page) var(--ease-standard)" }}></div>
              </div>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "10px" }}>
                {" "}
                {L(V["fuSteps"]).map((_st_30, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <div style={{ "display": "flex", "gap": "10px", "alignItems": "flex-start" }}>
                      {" "}
                      <span style={{ "width": "16px", "height": "16px", "borderRadius": "9999px", "flexShrink": "0", "marginTop": "2px", "display": "flex", "alignItems": "center", "justifyContent": "center", "background": S(_st_30?.["dotBg"]), "border": "1px solid " + S(_st_30?.["dotBorder"]) }}>
                        {" "}
                        {_st_30?.["done"] ? (<>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                        </>) : null}
                        {" "}
                      </span>
                      {" "}
                      <div style={{ "minWidth": "0" }}>
                        {" "}
                        <div style={{ "fontSize": "14px", "lineHeight": "1.4", "fontWeight": "500", "color": "var(--n-900)" }}>
                          {T(_st_30?.["label"])}
                        </div>
                        {" "}
                        <div style={{ "fontSize": "12px", "lineHeight": "1.4", "color": "var(--n-600)", "textWrap": "pretty" }}>
                          {T(_st_30?.["sub"])}
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
              {V["fuCanRemind"] ? (<>
                {" "}
                <button onClick={V["onRemindNow"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1q scp4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapRemind"]), "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "50% 10%", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                    <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                  </svg>
                  {"Recordar ahora"}
                </button>
                {" "}
              </>) : null}
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["stuckOn"] ? (<>
            {" "}
            <div style={{ "background": "var(--ambar-tinte)", "border": "1px solid var(--naranja)", "borderRadius": "12px", "padding": "14px", "display": "flex", "flexDirection": "column", "gap": "10px", "marginTop": "4px", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
              {" "}
              <div style={{ "display": "flex", "gap": "8px", "alignItems": "flex-start" }}>
                {" "}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "marginTop": "2px" }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
                {" "}
                <div style={{ "minWidth": "0" }}>
                  {" "}
                  <div style={{ "fontSize": "14px", "lineHeight": "1.4", "fontWeight": "500", "color": "var(--n-900)" }}>
                    {T(V["stuckTitle"])}
                  </div>
                  {" "}
                  <div style={{ "fontSize": "12px", "lineHeight": "1.4", "color": "var(--n-800)", "textWrap": "pretty" }}>
                    {T(V["stuckSub"])}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <button onClick={V["onStuckReassign"]} style={{ "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1 scpv">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                  <path d="m16 3 4 4-4 4"></path>
                  <path d="M20 7H4"></path>
                  <path d="m8 21-4-4 4-4"></path>
                  <path d="M4 17h16"></path>
                </svg>
                {T(V["stuckBtn"])}
              </button>
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
  );
}
