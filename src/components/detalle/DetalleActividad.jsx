// Actividad del ticket: comentarios, historial y caja para responder.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function DetalleActividad({ V }) {
  return (
    <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "24px" }}>
      {" "}
      <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "flexWrap": "wrap", "marginBottom": "16px" }}>
        {" "}
        <h3 style={{ "fontSize": "16px", "fontWeight": "600", "margin": "0", "color": "var(--n-900)" }}>
          {"Actividad"}
        </h3>
        {" "}
        <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
          {T(V["dActivityCount"])}
        </span>
        {" "}
        <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "minWidth": "0" }}>
          {"COMENTARIOS · CAMBIOS · ADJUNTOS"}
        </span>
        {" "}
        {V["canChatDetail"] ? (<>
          {" "}
          <button onClick={V["onChatFromDetail"]} title="Abre los comentarios como conversación, sin salir de la pantalla" style={{ "marginLeft": "auto", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px 10px", "fontSize": "12px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "whiteSpace": "nowrap", "flexShrink": "0", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scpi scp4">
            {" "}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {"Abrir como chat "}
          </button>
          {" "}
        </>) : null}
        {" "}
      </div>
      {" "}
      <div style={{ "display": "flex", "flexDirection": "column", "gap": "16px" }}>
        {" "}
        {L(V["dActivity"]).map((_a_28, $index) => (
          <React.Fragment key={$index}>
            {" "}
            <div key={_a_28?.["key"]} style={{ "display": "flex", "gap": "12px", "animation": "commentIn var(--duration-base) var(--ease-standard) both" }}>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "width": "32px", "flexShrink": "0", "alignSelf": "stretch" }}>
                {" "}
                {_a_28?.["isComment"] ? (<>
                  {" "}
                  {_a_28?.["hasBlob"] ? (<>
                    {" "}
                    <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" ref={_a_28?.["blobRef"]} alt="" style={{ "width": "32px", "height": "32px", "flexShrink": "0", "borderRadius": "9999px", "background": "var(--n-50)", "border": "1px solid " + S(_a_28?.["ring"]), "display": "block" }} />
                    {" "}
                  </>) : null}
                  {" "}
                  {_a_28?.["noBlob"] ? (<>
                    {" "}
                    <div style={{ "width": "32px", "height": "32px", "flexShrink": "0", "borderRadius": "9999px", "background": "var(--n-50)", "border": "1px solid " + S(_a_28?.["ring"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                      {T(_a_28?.["ini"])}
                    </div>
                    {" "}
                  </>) : null}
                  {" "}
                </>) : null}
                {" "}
                {_a_28?.["isEvent"] ? (<>
                  {" "}
                  <div style={{ "width": "32px", "height": "32px", "flexShrink": "0", "borderRadius": "9999px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                    <span style={{ "width": "7px", "height": "7px", "borderRadius": "9999px", "background": S(_a_28?.["node"]) }}></span>
                  </div>
                  {" "}
                </>) : null}
                {" "}
                {_a_28?.["isFile"] ? (<>
                  {" "}
                  <div style={{ "width": "32px", "height": "32px", "flexShrink": "0", "borderRadius": "9999px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <circle cx="9" cy="9" r="2"></circle>
                      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"></path>
                    </svg>
                  </div>
                  {" "}
                </>) : null}
                {" "}
                {_a_28?.["showLine"] ? (<>
                  {" "}
                  <span style={{ "flex": "1", "width": "1px", "minHeight": "12px", "background": "var(--n-200)", "marginTop": "6px" }}></span>
                  {" "}
                </>) : null}
                {" "}
              </div>
              {" "}
              <div style={{ "minWidth": "0", "flex": "1", "paddingBottom": "4px" }}>
                {" "}
                <div style={{ "display": "flex", "alignItems": "baseline", "gap": "8px", "flexWrap": "wrap" }}>
                  {" "}
                  <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)" }}>
                    {T(_a_28?.["autor"])}
                  </span>
                  {" "}
                  <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
                    {T(_a_28?.["when"])}
                  </span>
                  {" "}
                  {_a_28?.["isEvent"] ? (<>
                    {" "}
                    <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
                      {T(_a_28?.["meta"])}
                    </span>
                    {" "}
                  </>) : null}
                  {" "}
                </div>
                {" "}
                <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-800)", "marginTop": "2px", "textWrap": "pretty" }}>
                  {T(_a_28?.["texto"])}
                </div>
                {" "}
                {_a_28?.["isFile"] ? (<>
                  {" "}
                  <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "marginTop": "2px" }}>
                    {T(_a_28?.["meta"])}
                  </div>
                  {" "}
                </>) : null}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </React.Fragment>
        ))}
        {" "}
        {V["dNoComments"] ? (<>
          {" "}
          <div style={{ "background": "var(--n-50)", "borderRadius": "12px", "padding": "20px", "textAlign": "center" }}>
            {" "}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--n-400)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "margin": "0 auto 8px", "display": "block" }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)" }}>
              {"Todavía nadie comentó"}
            </div>
            {" "}
            <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "2px" }}>
              {"Suma contexto o pide datos al solicitante para avanzar."}
            </div>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
      </div>
      {" "}
      <div style={{ "borderTop": "1px solid var(--n-200)", "marginTop": "20px", "paddingTop": "16px", "display": "flex", "flexDirection": "column", "gap": "8px" }}>
        {" "}
        {V["dNudgeAsk"] ? (<>
          {" "}
          <div style={{ "display": "flex", "gap": "8px", "alignItems": "flex-start", "background": "var(--azul-tinte)", "borderRadius": "8px", "padding": "12px", "marginBottom": "4px" }}>
            {" "}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--azul)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "marginTop": "1px" }}>
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {" "}
            <span style={{ "minWidth": "0" }}>
              {" "}
              <span style={{ "display": "block", "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)" }}>
                {"Esperan tu respuesta"}
              </span>
              {" "}
              <span style={{ "display": "block", "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-800)", "marginTop": "2px", "textWrap": "pretty" }}>
                {"Responde acá abajo para destrabarlo."}
              </span>
              {" "}
            </span>
            {" "}
            <button onClick={V["onFocusComment"]} style={{ "marginLeft": "auto", "flexShrink": "0", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-300)", "borderRadius": "8px", "padding": "6px 10px", "fontSize": "12px", "fontWeight": "500", "cursor": "pointer", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpg scp4">
              {"Responder"}
            </button>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        {V["dNudgeShow"] ? (<>
          {" "}
          <div style={{ "display": "flex", "flexDirection": "column", "gap": "4px", "marginBottom": "4px" }}>
            {" "}
            <button onClick={V["onNudge"]} title={V["dNudgeTitle"]} style={{ "alignSelf": "flex-start", "background": "var(--ambar-tinte)", "color": "var(--n-900)", "border": "1px solid var(--naranja)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": S(V["dNudgeCursor"]), "opacity": S(V["dNudgeOp"]), "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1m scpd">
              {" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--naranja))" }}>
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              {"Esto me está frenando "}
            </button>
            {" "}
            <span style={{ "fontSize": "12px", "lineHeight": "1.43", "color": "var(--n-600)", "textWrap": "pretty" }}>
              {T(V["dNudgeNote"])}
            </span>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        {V["dReplyLocked"] ? (<>
          {" "}
          <div role="note" style={{ "display": "flex", "gap": "10px", "alignItems": "center", "background": "var(--n-50)", "borderRadius": "10px", "padding": "10px 12px" }}>
            {" "}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            {" "}
            <span style={{ "minWidth": "0", "flex": "1", "fontSize": "14px", "lineHeight": "1.45", "color": "var(--n-800)", "textWrap": "pretty" }}>
              {T(V["dReplyLockMsg"])}
            </span>
            {" "}
            {V["dReplyLockTake"] ? (<>
              {" "}
              <button onClick={V["dReplyOnTake"]} style={{ "flexShrink": "0", "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1n scp6">
                {T(V["dReplyTakeLabel"])}
              </button>
              {" "}
            </>) : null}
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        {V["dCanReply"] ? (<>
          {" "}
          <div style={{ "display": "flex", "alignItems": "center", "gap": "6px", "flexWrap": "wrap" }}>
            {" "}
            <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "marginRight": "2px" }}>
              {"RESPUESTAS GUARDADAS"}
            </span>
            {" "}
            {L(V["macros"]).map((_m_29, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <button onClick={_m_29?.["use"]} style={{ "background": "var(--n-0)", "color": "var(--n-700)", "border": "1px solid var(--n-200)", "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "cursor": "pointer", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp1o scp4">
                  {T(_m_29?.["label"])}
                </button>
                {" "}
              </React.Fragment>
            ))}
            {" "}
          </div>
          {" "}
          <textarea id="tic-comment" value={(V["comment"] ?? "")} onChange={V["onComment"]} rows="3" placeholder={V["commentPh"]} style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-1000)", "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "lineHeight": "1.5", "outline": "none", "resize": "vertical" }}></textarea>
          {" "}
          <div style={{ "display": "flex", "alignItems": "center", "gap": "6px" }}>
            {" "}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2"></path>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            {" "}
            <span style={{ "fontSize": "12px", "color": "var(--n-600)", "textWrap": "pretty" }}>
              {T(V["dMailNote"])}
            </span>
            {" "}
          </div>
          {" "}
          {V["hasDraft"] ? (<>
            {" "}
            <div style={{ "display": "flex", "alignItems": "center", "gap": "6px" }}>
              {" "}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              {" "}
              <span style={{ "fontSize": "12px", "color": "var(--n-600)" }}>
                {T(V["draftLine"])}
              </span>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["commentErr"] ? (<>
            {" "}
            <div style={{ "display": "flex", "alignItems": "center", "gap": "6px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              <span style={{ "fontSize": "12px", "color": "var(--n-800)" }}>
                {T(V["commentErr"])}
              </span>
            </div>
            {" "}
          </>) : null}
          {" "}
          <div style={{ "display": "flex", "gap": "8px", "flexWrap": "wrap" }}>
            {" "}
            <button onClick={V["onAddComment"]} style={{ "position": "relative", "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp1p scpv">
              <span style={{ "opacity": S(V["busyCommentOp"]), "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "opacity var(--duration-fast) var(--ease-standard)" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapComment"]), "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,translate(0,0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)" }}>
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
                {"Publicar comentario"}
              </span>
              {V["busyComment"] ? (<>
                <span style={{ "position": "absolute", "inset": "0", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                  <span style={{ "width": "16px", "height": "16px", "borderRadius": "9999px", "border": "2px solid var(--n-0)", "borderTopColor": "transparent", "animation": "spin 600ms linear infinite" }}></span>
                </span>
              </>) : null}
            </button>
            {" "}
            {V["canClose"] ? (<>
              {" "}
              <button onClick={V["onCommentAndClose"]} title="Publica la respuesta y cierra el ticket en un solo paso" style={{ "position": "relative", "background": "var(--ambar-tinte)", "color": "var(--n-900)", "border": "1px solid var(--naranja)", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1m scp4">
                <span style={{ "opacity": S(V["busyCommentCloseOp"]), "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "opacity var(--duration-fast) var(--ease-standard)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapCommentClose"]), "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--naranja))" }}>
                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                    <path d="m9 11 3 3L22 4"></path>
                  </svg>
                  {"Comentar y cerrar"}
                </span>
                {V["busyCommentClose"] ? (<>
                  <span style={{ "position": "absolute", "inset": "0", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                    <span style={{ "width": "16px", "height": "16px", "borderRadius": "9999px", "border": "2px solid var(--n-900)", "borderTopColor": "transparent", "animation": "spin 600ms linear infinite" }}></span>
                  </span>
                </>) : null}
              </button>
              {" "}
            </>) : null}
            {" "}
          </div>
          {" "}
          {V["canClose"] ? (<>
            {" "}
            <span style={{ "fontSize": "12px", "color": "var(--n-600)", "textWrap": "pretty" }}>
              {"Es el único mensaje que le llega por correo."}
            </span>
            {" "}
          </>) : null}
          {" "}
        </>) : null}
        {" "}
      </div>
      {" "}
    </div>
  );
}
