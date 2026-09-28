// Vista de tickets en tabla.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

import Escena from '../comunes/Escena.jsx';
export default function VistaTabla({ V }) {
  return (
    <>
      {" "}
      <div key={V["swapKey"]} style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "overflowX": "auto", "animation": "fadeSwap var(--duration-base) var(--ease-standard) both" }}>
        {" "}
        <div style={{ "minWidth": "924px", "display": "grid", "gridTemplateColumns": "minmax(0,1fr) 132px 116px 136px 168px 44px", "gap": "16px", "alignItems": "center", "padding": "10px 16px", "background": "var(--n-50)", "borderBottom": "1px solid var(--n-200)", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
          {" "}
          <span>
            {"TICKET"}
          </span>
          <span>
            {"ESTADO"}
          </span>
          <span>
            {"PRIORIDAD"}
          </span>
          <span>
            {"ASIGNADO"}
          </span>
          <span>
            {"ACTIVIDAD"}
          </span>
          <span></span>
          {" "}
        </div>
        {" "}
        {V["loading"] ? (<>
          {" "}
          {L(V["ghostRows"]).map((_g_19, $index) => (
            <React.Fragment key={$index}>
              {" "}
              <div style={{ "minWidth": "924px", "display": "grid", "gridTemplateColumns": "minmax(0,1fr) 132px 116px 136px 168px 44px", "gap": "16px", "alignItems": "center", "padding": "12px 16px", "borderBottom": "1px solid var(--n-200)" }}>
                {" "}
                <div style={{ "display": "flex", "alignItems": "center", "gap": "12px", "minWidth": "0" }}>
                  {" "}
                  <span style={{ "display": "block", "width": "36px", "height": "36px", "borderRadius": "8px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                  {" "}
                  <div style={{ "display": "flex", "flexDirection": "column", "gap": "6px", "minWidth": "0", "flex": "1" }}>
                    {" "}
                    <span style={{ "display": "block", "width": S(_g_19?.["w"]), "height": "14px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                    {" "}
                    <span style={{ "display": "block", "width": "40%", "height": "11px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <span style={{ "display": "block", "width": "96px", "height": "26px", "borderRadius": "9999px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                {" "}
                <span style={{ "display": "block", "width": "82px", "height": "22px", "borderRadius": "9999px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                {" "}
                <span style={{ "display": "block", "width": "72%", "height": "14px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                {" "}
                <span style={{ "display": "block", "width": "88px", "height": "14px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                {" "}
                <span style={{ "display": "block", "width": "30px", "height": "30px", "borderRadius": "8px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                {" "}
              </div>
              {" "}
            </React.Fragment>
          ))}
          {" "}
        </>) : null}
        {" "}
        {V["loaded"] ? (<>
          {" "}
          {L(V["rows"]).map((_t_20, $index) => (
            <React.Fragment key={$index}>
              {" "}
              <div data-reveal="" data-vt={_t_20?.["vtId"]} onClick={_t_20?.["open"]} onKeyDown={_t_20?.["key"]} tabIndex="0" role="button" style={{ "minWidth": "924px", "display": "grid", "gridTemplateColumns": "minmax(0,1fr) 132px 116px 136px 168px 44px", "gap": "16px", "alignItems": "center", "padding": "12px 16px", "borderBottom": "1px solid var(--n-200)", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)" }} className="scpg scpt">
                {" "}
                <div style={{ "display": "flex", "alignItems": "center", "gap": "12px", "minWidth": "0" }}>
                  {" "}
                  <div style={{ "position": "relative", "flexShrink": "0" }}>
                    {" "}
                    <div style={{ "width": "36px", "height": "36px", "borderRadius": "8px", "background": "var(--n-50)", "border": "1px solid var(--n-200)", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "14px", "color": "var(--n-700)" }}>
                      {T(_t_20?.["glyph"])}
                    </div>
                    {" "}
                    {_t_20?.["hasAsig"] ? (<>
                      {" "}
                      <div style={{ "position": "absolute", "right": "-5px", "bottom": "-5px", "width": "20px", "height": "20px", "borderRadius": "6px", "background": "var(--n-0)", "border": "1px solid " + S(_t_20?.["ring"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "11px", "fontWeight": "600", "color": "var(--n-900)" }}>
                        {T(_t_20?.["ini"])}
                      </div>
                      {" "}
                    </>) : null}
                    {" "}
                  </div>
                  {" "}
                  <div style={{ "minWidth": "0" }}>
                    {" "}
                    <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                      {T(_t_20?.["titulo"])}
                    </div>
                    {" "}
                    <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                      {T(_t_20?.["code"])}{" · "}{T(_t_20?.["cat"])}{" · "}{T(_t_20?.["autor"])}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "background": S(_t_20?.["statusBg"]), "borderRadius": "9999px", "padding": "6px 12px", "fontSize": "12px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "justifySelf": "start" }}>
                  {_t_20?.["statusOpen"] ? (<>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={_t_20?.["statusDot"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="1" fill={_t_20?.["statusDot"]}></circle>
                    </svg>
                  </>) : null}
                  {_t_20?.["statusProg"] ? (<>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={_t_20?.["statusDot"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </>) : null}
                  {_t_20?.["statusClosed"] ? (<>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={_t_20?.["statusDot"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                      <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                  </>) : null}
                  {T(_t_20?.["statusLabel"])}
                </span>
                {" "}
                <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "color": "var(--n-700)", "whiteSpace": "nowrap", "justifySelf": "start" }}>
                  {" "}
                  <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_t_20?.["prioDot"]) }}></span>
                  {T(_t_20?.["prioLabel"])}{" "}
                </span>
                {" "}
                <span style={{ "fontSize": "14px", "color": "var(--n-600)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                  {T(_t_20?.["asig"])}
                </span>
                {" "}
                <div style={{ "display": "flex", "alignItems": "center", "gap": "10px", "minWidth": "0" }}>
                  {" "}
                  {_t_20?.["slaShow"] ? (<>
                    {" "}
                    <span title={_t_20?.["slaTitle"]} style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "flexShrink": "0", "background": "var(--n-0)", "border": S(_t_20?.["slaBorder"]), "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "color": S(_t_20?.["slaInk"]), "whiteSpace": "nowrap" }}>
                      {" "}
                      {_t_20?.["slaLate"] ? (<>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                          <path d="M12 9v4"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                      </>) : null}
                      {" "}
                      {_t_20?.["slaWatch"] ? (<>
                        <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": "var(--naranja)", "flexShrink": "0" }}></span>
                      </>) : null}
                      {" "}
                      {_t_20?.["slaWaiting"] ? (<>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--azul)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </>) : null}
                      {T(_t_20?.["slaLabel"])}{" "}
                    </span>
                    {" "}
                  </>) : null}
                  {" "}
                  <span title={_t_20?.["createdTitle"]} style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "12px", "color": "var(--n-500)", "whiteSpace": "nowrap" }}>
                    {" "}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                    {T(_t_20?.["updated"])}{" "}
                  </span>
                  {" "}
                  {_t_20?.["hasFiles"] ? (<>
                    {" "}
                    <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "4px", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "12px", "color": "var(--n-600)" }}>
                      {" "}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"></path>
                      </svg>
                      {T(_t_20?.["fileCount"])}{" "}
                    </span>
                    {" "}
                  </>) : null}
                  {" "}
                  {_t_20?.["hasComments"] ? (<>
                    {" "}
                    <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "4px", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "12px", "color": "var(--n-600)" }}>
                      {" "}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      {T(_t_20?.["commentCount"])}{" "}
                    </span>
                    {" "}
                  </>) : null}
                  {" "}
                </div>
                {" "}
                {_t_20?.["canEdit"] ? (<>
                  {" "}
                  <button onClick={_t_20?.["edit"]} aria-label={_t_20?.["editLabel"]} title={_t_20?.["editLabel"]} style={{ "justifySelf": "start", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "display": "inline-flex", "alignItems": "center", "gap": "6px", "display": "flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp1a scp19">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,rotate(0deg) scale(1)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                    </svg>
                  </button>
                  {" "}
                </>) : null}
                {" "}
              </div>
              {" "}
            </React.Fragment>
          ))}
          {" "}
        </>) : null}
        {" "}
        {V["isEmpty"] ? (<>
          {" "}
          <div style={{ "padding": "64px 24px", "textAlign": "center" }}>
            {" "}
            <Escena icono={V["emptyDayOne"] ? "listo" : "lupa"} />
            <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "letterSpacing": "0.04em" }}>
              {"SIN RESULTADOS"}
            </div>
            {" "}
            <div style={{ "fontSize": "16px", "lineHeight": "1.5", "fontWeight": "500", "color": "var(--n-900)", "marginTop": "8px" }}>
              {T(V["emptyTitle"])}
            </div>
            {" "}
            <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "4px", "textWrap": "pretty" }}>
              {T(V["emptyHelp"])}
            </div>
            {" "}
            {V["emptyDayOne"] ? (<>
              {" "}
              <button onClick={V["onNewTicket"]} style={{ "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "marginTop": "16px", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1c scp2">
                {" "}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                {"Crear el primer ticket "}
              </button>
              {" "}
            </>) : null}
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        {V["pgTickets"]?.["show"] ? (<>
          {" "}
          <div data-m="paginador" style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "16px", "padding": "10px 16px", "background": "var(--n-50)", "borderTop": "1px solid var(--n-200)" }}>
            {" "}
            <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
              {T(V["pgTickets"]?.["range"])}
            </span>
            {" "}
            <div style={{ "display": "flex", "gap": "8px" }}>
              {" "}
              <button onClick={V["pgTickets"]?.["prev"]} disabled={V["pgTickets"]?.["atStart"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "cursor": S(V["pgTickets"]?.["prevCursor"]), "opacity": S(V["pgTickets"]?.["prevOpacity"]) }} className="scpl scp10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                {"Anterior"}
              </button>
              {" "}
              <button onClick={V["pgTickets"]?.["next"]} disabled={V["pgTickets"]?.["atEnd"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "cursor": S(V["pgTickets"]?.["nextCursor"]), "opacity": S(V["pgTickets"]?.["nextOpacity"]) }} className="scp1d scp10">
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
    </>
  );
}
