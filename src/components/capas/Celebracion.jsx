// Celebración al crear un ticket.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function Celebracion({ V }) {
  return (
    <>
      <div style={{ "position": "fixed", "inset": "0", "background": "rgba(10,10,10,0.4)", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "24px", "zIndex": "60", "animation": "overlayIn var(--duration-base) var(--ease-standard) both" }}>
        {" "}
        <div style={{ "width": "100%", "maxWidth": "420px", "background": "var(--n-0)", "borderRadius": "16px", "padding": "32px", "textAlign": "center", "animation": "celebIn 420ms cubic-bezier(0.34,1.56,0.64,1) both", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px" }}>
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
            {L(V["sparks"]).map((_sp_55, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <span aria-hidden="true" style={{ "position": "absolute", "left": "50%", "top": "50%", "width": "0", "height": "0", "transform": "rotate(" + S(_sp_55?.["deg"]) + ")" }}>
                  {" "}
                  <span style={{ "display": "block", "position": "absolute", "left": "-3px", "top": "-3px", "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_sp_55?.["color"]), "animation": "sparkOut 820ms var(--ease-standard) " + S(_sp_55?.["delay"]) + " both" }}></span>
                  {" "}
                </span>
                {" "}
              </React.Fragment>
            ))}
            {" "}
          </div>
          {" "}
          <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
            {T(V["celebCode"])}{" CREADO"}
          </div>
          {" "}
          <div style={{ "fontSize": "20px", "lineHeight": "1.4", "fontWeight": "600", "color": "var(--n-900)", "marginTop": "8px", "textWrap": "pretty" }}>
            {T(V["celebTitulo"])}
          </div>
          {" "}
          <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "6px", "textWrap": "pretty" }}>
            {T(V["celebSub"])}
          </div>
          {" "}
          {V["celebWarn"] ? (<>
            {" "}
            <div style={{ "display": "flex", "gap": "8px", "alignItems": "flex-start", "background": "var(--ambar-tinte)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "12px", "marginTop": "16px", "textAlign": "left" }}>
              {" "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "marginTop": "1px" }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2"></path>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              {" "}
              <span style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-900)", "textWrap": "pretty" }}>
                {"El ticket se creó. Puede que el aviso por correo no haya salido — avísale al área si es urgente."}
              </span>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          <div style={{ "height": "3px", "borderRadius": "9999px", "background": "var(--n-50)", "marginTop": "20px", "overflow": "hidden" }}>
            <span style={{ "display": "block", "height": "100%", "background": "var(--n-950)", "animation": "progressBar 1900ms linear both" }}></span>
          </div>
          {" "}
          <button onClick={V["onCelebNow"]} style={{ "marginTop": "16px", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp28 scpd">
            {"Ver el ticket ahora"}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
          {" "}
        </div>
      </div>
    </>
  );
}
