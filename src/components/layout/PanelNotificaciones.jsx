// Panel de notificaciones (se abre desde la campana).
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function PanelNotificaciones({ V }) {
  return (
    <>
      {" "}
      <div data-m="velo-hoja" data-no-print="" onClick={V["onBellClose"]} style={{ "position": "fixed", "inset": "0", "zIndex": "69" }}></div>
      {" "}
      <div data-m="notificaciones" data-no-print="" role="dialog" aria-label="Notificaciones" style={{ "position": "fixed", "left": "252px", "top": "20px", "zIndex": "70", "width": "380px", "maxWidth": "calc(100vw - 268px)", "maxHeight": "min(640px,calc(100vh - 40px))", "background": "var(--n-0)", "borderRadius": "16px", "boxShadow": "0 1px 2px rgba(0,0,0,0.06),0 0 0 1px var(--n-200),0 24px 48px -24px rgba(11,42,30,0.3)", "display": "flex", "flexDirection": "column", "overflow": "hidden", "animation": "dockIn 220ms cubic-bezier(0.22,1,0.36,1) both" }}>
        {" "}
        <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "padding": "14px 16px", "borderBottom": "1px solid var(--n-200)" }}>
          {" "}
          <div style={{ "fontSize": "16px", "fontWeight": "700", "letterSpacing": "-0.02em", "color": "var(--n-900)" }}>
            {"Notificaciones"}
          </div>
          {" "}
          <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
            {T(V["unreadNote"])}
          </span>
          {" "}
          {V["hasUnread"] ? (<>
            <button onClick={V["onReadAll"]} style={{ "marginLeft": "auto", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px 10px", "fontSize": "12px", "fontWeight": "500", "color": "var(--n-900)", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard),transform var(--duration-fast) var(--ease-standard)" }} className="scpg scpb">
              {"Marcar todo como leído"}
            </button>
          </>) : null}
          {" "}
        </div>
        {" "}
        <div style={{ "flex": "1", "minHeight": "0", "overflowY": "auto", "padding": "6px" }}>
          {" "}
          {L(V["notifs"]).map((_n_6, $index) => (
            <React.Fragment key={$index}>
              {" "}
              <button onClick={_n_6?.["go"]} style={{ "width": "100%", "textAlign": "left", "display": "flex", "gap": "10px", "alignItems": "flex-start", "background": S(_n_6?.["bg"]), "border": "none", "borderRadius": "10px", "padding": "10px", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard),transform var(--duration-fast) var(--ease-standard)" }} className="scpc scph">
                {" "}
                <span style={{ "width": "8px", "height": "8px", "borderRadius": "9999px", "background": S(_n_6?.["dot"]), "flexShrink": "0", "marginTop": "6px" }}></span>
                {" "}
                <span style={{ "display": "flex", "flexDirection": "column", "gap": "3px", "minWidth": "0", "flex": "1" }}>
                  {" "}
                  <span style={{ "display": "flex", "gap": "8px", "alignItems": "baseline" }}>
                    {" "}
                    <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.06em", "color": S(_n_6?.["kindColor"]) }}>
                      {T(_n_6?.["kind"])}
                    </span>
                    {" "}
                    <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
                      {T(_n_6?.["code"])}
                    </span>
                    {" "}
                    <span style={{ "marginLeft": "auto", "fontSize": "11px", "color": "var(--n-600)", "flexShrink": "0" }}>
                      {T(_n_6?.["when"])}
                    </span>
                    {" "}
                  </span>
                  {" "}
                  <span style={{ "fontSize": "14px", "lineHeight": "1.4", "fontWeight": S(_n_6?.["weight"]), "color": "var(--n-900)", "textWrap": "pretty" }}>
                    {T(_n_6?.["title"])}
                  </span>
                  {" "}
                  <span style={{ "fontSize": "12px", "lineHeight": "1.45", "color": "var(--n-600)", "overflow": "hidden", "textOverflow": "ellipsis", "whiteSpace": "nowrap" }}>
                    {T(_n_6?.["sub"])}
                  </span>
                  {" "}
                </span>
                {" "}
              </button>
              {" "}
            </React.Fragment>
          ))}
          {" "}
          {V["noNotifs"] ? (<>
            <div style={{ "padding": "32px 16px", "textAlign": "center", "fontSize": "14px", "color": "var(--n-600)" }}>
              {"Nada nuevo en tus tickets."}
            </div>
          </>) : null}
          {" "}
        </div>
        {" "}
        <div style={{ "padding": "10px 16px", "borderTop": "1px solid var(--n-200)", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
          {"ÚLTIMAS 72 H · SE ACTUALIZA CADA 45 S"}
        </div>
        {" "}
      </div>
      {" "}
    </>
  );
}
