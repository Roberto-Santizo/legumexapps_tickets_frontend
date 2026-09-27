// Momento de cierre de un ticket.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function MomentoCierre({ V }) {
  return (
    <>
      <div style={{ "position": "fixed", "inset": "0", "background": "rgba(10,10,10,0.4)", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "24px", "zIndex": "64", "animation": "overlayIn var(--duration-base) var(--ease-standard) both" }}>
        {" "}
        <div style={{ "width": "100%", "maxWidth": "440px", "background": "var(--n-0)", "borderRadius": "16px", "padding": "32px", "textAlign": "center", "animation": "celebIn 420ms cubic-bezier(0.34,1.56,0.64,1) both", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px" }}>
          {" "}
          <div style={{ "position": "relative", "width": "96px", "height": "96px", "margin": "0 auto 20px" }}>
            {" "}
            <span aria-hidden="true" style={{ "position": "absolute", "inset": "0", "borderRadius": "9999px", "border": "1px solid var(--verde)", "animation": "ringOut 900ms var(--ease-standard) 120ms both" }}></span>
            {" "}
            <span aria-hidden="true" style={{ "position": "absolute", "inset": "0", "borderRadius": "9999px", "border": "1px solid var(--verde)", "animation": "ringOut 900ms var(--ease-standard) 320ms both" }}></span>
            {" "}
            <div style={{ "position": "absolute", "inset": "16px", "borderRadius": "9999px", "background": "var(--verde-tinte)", "display": "flex", "alignItems": "center", "justifyContent": "center", "animation": "badgePop 480ms cubic-bezier(0.34,1.56,0.64,1) both" }}>
              {" "}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--verde)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="m4.5 12.5 5 5 10-10" strokeDasharray="26" style={{ "animation": "checkDraw 520ms var(--ease-standard) 240ms both" }}></path>
              </svg>
              {" "}
            </div>
            {" "}
            {L(V["sparks"]).map((_sp_56, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <span aria-hidden="true" style={{ "position": "absolute", "left": "50%", "top": "50%", "width": "0", "height": "0", "transform": "rotate(" + S(_sp_56?.["deg"]) + ")" }}>
                  {" "}
                  <span style={{ "display": "block", "position": "absolute", "left": "-3px", "top": "-3px", "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_sp_56?.["color"]), "animation": "sparkOut 820ms var(--ease-standard) " + S(_sp_56?.["delay"]) + " both" }}></span>
                  {" "}
                </span>
                {" "}
              </React.Fragment>
            ))}
            {" "}
          </div>
          {" "}
          <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
            {T(V["momentCode"])}{" CERRADO"}
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
            <span style={{ "display": "block", "height": "100%", "background": "var(--n-950)", "animation": "progressBar 3200ms linear both" }}></span>
          </div>
          {" "}
          <div style={{ "display": "flex", "gap": "8px", "justifyContent": "center", "flexWrap": "wrap", "marginTop": "16px" }}>
            {" "}
            {V["momentHasUndo"] ? (<>
              {" "}
              <button onClick={V["onMomentUndo"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp2k scpd">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                  <path d="M9 14 4 9l5-5"></path>
                  <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11"></path>
                </svg>
                {"Deshacer el cierre"}
              </button>
              {" "}
            </>) : null}
            {" "}
            <button onClick={V["onMomentGo"]} style={{ "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1c scp2">
              {T(V["momentBtn"])}
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
            {" "}
          </div>
          {" "}
        </div>
      </div>
    </>
  );
}
