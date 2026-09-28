// Momento de reapertura de un ticket.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function MomentoReapertura({ V }) {
  return (
    <>
      <div style={{ "position": "fixed", "inset": "0", "background": "rgba(10,10,10,0.4)", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "24px", "zIndex": "64", "animation": "overlayIn var(--duration-base) var(--ease-standard) both" }}>
        {" "}
        <div style={{ "width": "100%", "maxWidth": "440px", "background": "var(--n-0)", "borderRadius": "16px", "padding": "32px", "textAlign": "center", "animation": "celebIn 420ms cubic-bezier(0.34,1.56,0.64,1) both", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px" }}>
          {" "}
          <div style={{ "position": "relative", "width": "96px", "height": "96px", "margin": "0 auto 20px" }}>
            {" "}
            <span aria-hidden="true" style={{ "position": "absolute", "inset": "0", "borderRadius": "9999px", "border": "1px solid var(--naranja)", "animation": "ringOut 900ms var(--ease-standard) 120ms both" }}></span>
            {" "}
            <span aria-hidden="true" style={{ "position": "absolute", "inset": "0", "borderRadius": "9999px", "border": "1px solid var(--naranja)", "animation": "ringOut 900ms var(--ease-standard) 320ms both" }}></span>
            {" "}
            <div style={{ "position": "absolute", "inset": "16px", "borderRadius": "9999px", "background": "var(--ambar-tinte)", "display": "flex", "alignItems": "center", "justifyContent": "center", "animation": "badgePop 480ms cubic-bezier(0.34,1.56,0.64,1) both" }}>
              {" "}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "animation": "iconSpinTap 760ms var(--ease-standard) 200ms both" }}>
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
              {" "}
            </div>
            {" "}
            {L(V["sparks"]).map((_sp_57, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <span aria-hidden="true" style={{ "position": "absolute", "left": "50%", "top": "50%", "width": "0", "height": "0", "transform": "rotate(" + S(_sp_57?.["deg"]) + ")" }}>
                  {" "}
                  <span style={{ "display": "block", "position": "absolute", "left": "-3px", "top": "-3px", "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_sp_57?.["color"]), "animation": "sparkOut 820ms var(--ease-standard) " + S(_sp_57?.["delay"]) + " both" }}></span>
                  {" "}
                </span>
                {" "}
              </React.Fragment>
            ))}
            {" "}
          </div>
          {" "}
          <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
            {T(V["momentCode"])}{" REABIERTO"}
          </div>
          {" "}
          <div style={{ "fontSize": "20px", "lineHeight": "1.4", "fontWeight": "600", "color": "var(--n-900)", "marginTop": "8px", "textWrap": "pretty" }}>
            {T(V["momentTitulo"])}
          </div>
          {" "}
          <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "6px", "textWrap": "pretty" }}>
            {T(V["momentSub"])}
          </div>
          {" "}
          <div style={{ "height": "3px", "borderRadius": "9999px", "background": "var(--n-50)", "marginTop": "20px", "overflow": "hidden" }}>
            <span style={{ "display": "block", "height": "100%", "background": "var(--naranja)", "animation": "progressBar 2800ms linear both" }}></span>
          </div>
          {" "}
          <button onClick={V["onMomentGo"]} style={{ "marginTop": "16px", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpg scpd">
            {T(V["momentBtn"])}
          </button>
          {" "}
        </div>
      </div>
    </>
  );
}
