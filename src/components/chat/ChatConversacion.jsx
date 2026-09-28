// Conversación abierta en la página de chat.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

import Escena from '../comunes/Escena.jsx';
export default function ChatConversacion({ V }) {
  return (
    <>
      {" "}
      <div style={{ "display": "flex", "flexDirection": "column", "minHeight": "0", "minWidth": "0" }}>
        {" "}
        {V["chatPageConv"] ? (<>
          {" "}
          <div style={{ "display": "flex", "alignItems": "center", "gap": "10px", "padding": "12px 16px", "borderBottom": "1px solid var(--n-200)", "flexShrink": "0" }}>
            {" "}
            <button onClick={V["onChatBack"]} aria-label="Cerrar la conversación" title="Cerrar la conversación" style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px", "cursor": "pointer", "display": "flex", "alignItems": "center", "flexShrink": "0", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scpm scpt">
              <svg style={{ "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
            </button>
            {" "}
            <div style={{ "minWidth": "0", "flex": "1" }}>
              {" "}
              <div style={{ "display": "flex", "alignItems": "center", "gap": "6px" }}>
                {" "}
                <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
                  {T(V["chatCode"])}
                </span>
                {" "}
                <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(V["chatStatusDot"]), "flexShrink": "0" }}></span>
                {" "}
                <span style={{ "fontSize": "11px", "color": "var(--n-500)" }}>
                  {T(V["chatStatusLabel"])}
                </span>
                {" "}
              </div>
              {" "}
              <div style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                {T(V["chatTitulo"])}
              </div>
              {" "}
            </div>
            {" "}
            {V["chatCallOn"] ? (<>
              {" "}
              <a href={V["chatCallUrl"]} onClick={V["onChatCall"]} target="_blank" rel="noreferrer" aria-label={V["chatCallLabel"]} title={V["chatCallLabel"]} style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px", "cursor": "pointer", "display": "flex", "alignItems": "center", "flexShrink": "0", "transition": "background-color var(--duration-fast) var(--ease-standard),transform var(--duration-fast) var(--ease-standard)" }} className="scp24 scp25">
                <svg style={{ "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                </svg>
              </a>
              {" "}
            </>) : null}
            {" "}
            {V["chatCanEdit"] ? (<>
              {" "}
              <button onClick={V["onChatEdit"]} aria-label="Editar este ticket" title="Editar título, categoría o prioridad" style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px", "cursor": "pointer", "display": "flex", "alignItems": "center", "flexShrink": "0", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scp1i scpt">
                <svg style={{ "transform": "var(--im,rotate(0deg) scale(1)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                </svg>
              </button>
              {" "}
            </>) : null}
            {" "}
            {V["chatNudgeShow"] ? (<>
              {" "}
              <button onClick={V["onChatNudge"]} disabled={V["chatNudgeDis"]} aria-label={V["chatNudgeLabel"]} title={V["chatNudgeLabel"]} style={{ "opacity": S(V["chatNudgeOp"]), "cursor": S(V["chatNudgeCur"]), "background": "var(--ambar-tinte)", "border": "1px solid var(--naranja)", "borderRadius": "8px", "padding": "6px", "display": "flex", "alignItems": "center", "justifyContent": "center", "flexShrink": "0", "transition": "transform var(--duration-fast) var(--ease-standard)" }} className="scp8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </button>
              {" "}
            </>) : null}
            {" "}
            {V["chatResolvedShow"] ? (<>
              {" "}
              <button onClick={V["onChatResolved"]} disabled={V["chatResolvedDis"]} aria-label={V["chatResolvedLabel"]} title={V["chatResolvedLabel"]} style={{ "opacity": S(V["chatResolvedOp"]), "cursor": S(V["chatResolvedCur"]), "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px 10px", "display": "inline-flex", "alignItems": "center", "gap": "6px", "flexShrink": "0", "fontSize": "12px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpg scp6">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--verde-oscuro)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                {T(V["chatResolvedShort"])}
              </button>
              {" "}
            </>) : null}
            {" "}
            {V["chatCanReopen"] ? (<>
              {" "}
              <button onClick={V["onChatReopen"]} aria-label="Reabrir este ticket" title="Vuelve a estado Abierto para poder responder" style={{ "background": "var(--ambar-tinte)", "border": "1px solid var(--naranja)", "borderRadius": "8px", "padding": "6px", "cursor": "pointer", "display": "flex", "alignItems": "center", "flexShrink": "0", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scp26 scp27">
                <svg style={{ "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)", "stroke": "var(--is,var(--naranja))" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </button>
              {" "}
            </>) : null}
            {" "}
            <button onClick={V["onChatOpenTicket"]} aria-label="Abrir el ticket completo" title="Abrir el ticket completo" style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px", "cursor": "pointer", "display": "flex", "alignItems": "center", "flexShrink": "0", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scp28 scpt">
              <svg style={{ "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </button>
            {" "}
          </div>
          {" "}
          <div ref={V["chatRef"]} style={{ "flex": "1", "minHeight": "0", "overflowY": "auto", "padding": "14px", "display": "flex", "flexDirection": "column", "gap": "12px", "background": "var(--n-25)" }}>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "10px 12px" }}>
              {" "}
              <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "letterSpacing": "0.04em", "marginBottom": "4px" }}>
                {"REPORTÓ "}{T(V["chatAutor"])}
              </div>
              {" "}
              <div style={{ "fontSize": "14px", "lineHeight": "1.5", "color": "var(--n-800)", "textWrap": "pretty" }}>
                {T(V["chatDesc"])}
              </div>
              {" "}
            </div>
            {" "}
            {L(V["chatMsgs"]).map((_m_45, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <div style={{ "display": "flex", "gap": "8px", "justifyContent": S(_m_45?.["just"]), "animation": "bubbleIn var(--duration-base) var(--ease-standard) both" }}>
                  {" "}
                  {_m_45?.["theirs"] ? (<>
                    {" "}
                    {_m_45?.["hasBlob"] ? (<>
                      {" "}
                      <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" ref={_m_45?.["blobRef"]} alt="" style={{ "width": "26px", "height": "26px", "borderRadius": "9999px", "background": "var(--n-50)", "border": "1px solid " + S(_m_45?.["ring"]), "flexShrink": "0", "marginTop": "auto", "display": "block" }} />
                      {" "}
                    </>) : null}
                    {" "}
                    {_m_45?.["noBlob"] ? (<>
                      {" "}
                      <span style={{ "width": "26px", "height": "26px", "borderRadius": "9999px", "background": "var(--n-50)", "border": "1px solid " + S(_m_45?.["ring"]), "color": "var(--n-900)", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "11px", "fontWeight": "600", "flexShrink": "0", "marginTop": "auto" }}>
                        {T(_m_45?.["ini"])}
                      </span>
                      {" "}
                    </>) : null}
                    {" "}
                  </>) : null}
                  {" "}
                  <span style={{ "maxWidth": "78%", "display": "flex", "flexDirection": "column", "gap": "3px", "alignItems": S(_m_45?.["align"]) }}>
                    {" "}
                    <span style={{ "fontSize": "11px", "color": "var(--n-500)" }}>
                      {T(_m_45?.["head"])}
                    </span>
                    {" "}
                    {_m_45?.["isText"] ? (<>
                      <span style={{ "background": S(_m_45?.["bg"]), "color": S(_m_45?.["ink"]), "border": S(_m_45?.["border"]), "borderRadius": "14px", "padding": "9px 12px", "fontSize": "14px", "lineHeight": "1.5", "textWrap": "pretty" }}>
                        {T(_m_45?.["texto"])}
                      </span>
                    </>) : null}
                    {" "}
                    {_m_45?.["isFile"] ? (<>
                      {" "}
                      <button onClick={_m_45?.["open"]} aria-label="Ver imagen en grande" title="Ver en grande" style={{ "padding": "0", "border": "1px solid var(--n-200)", "borderRadius": "14px", "overflow": "hidden", "background": "var(--n-0)", "cursor": "zoom-in", "display": "flex", "flexDirection": "column", "width": "240px", "maxWidth": "100%", "textAlign": "left", "fontFamily": "inherit", "transition": "transform var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp29 scph">
                        {" "}
                        {_m_45?.["fileHasUrl"] ? (<>
                          <img src={_m_45?.["fileUrl"]} alt={_m_45?.["fileName"]} style={{ "display": "block", "width": "100%", "height": "160px", "objectFit": "cover", "background": "var(--n-50)" }} />
                        </>) : null}
                        {" "}
                        {_m_45?.["fileNoUrl"] ? (<>
                          <span style={{ "height": "120px", "display": "flex", "alignItems": "center", "justifyContent": "center", "background": "repeating-linear-gradient(135deg,var(--n-50) 0 8px,var(--n-75) 8px 16px)" }}>
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                              <circle cx="9" cy="9" r="2"></circle>
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                            </svg>
                          </span>
                        </>) : null}
                        {" "}
                        <span style={{ "padding": "8px 10px", "display": "flex", "alignItems": "center", "gap": "8px", "minWidth": "0" }}>
                          {" "}
                          <span style={{ "minWidth": "0", "flex": "1", "display": "flex", "flexDirection": "column", "gap": "2px" }}>
                            {" "}
                            <span style={{ "fontSize": "12px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                              {T(_m_45?.["fileName"])}
                            </span>
                            {" "}
                            <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                              {T(_m_45?.["fileMeta"])}
                            </span>
                            {" "}
                          </span>
                          {" "}
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                            <path d="M15 3h6v6"></path>
                            <path d="M9 21H3v-6"></path>
                            <path d="M21 3l-7 7"></path>
                            <path d="M3 21l7-7"></path>
                          </svg>
                          {" "}
                        </span>
                        {" "}
                      </button>
                      {" "}
                    </>) : null}
                    {" "}
                  </span>
                  {" "}
                </div>
                {" "}
              </React.Fragment>
            ))}
            {" "}
            {V["chatNoMsgs"] ? (<>
              {" "}
              <div style={{ "textAlign": "center", "padding": "16px 8px", "fontSize": "12px", "color": "var(--n-500)" }}>
                {"Todavía nadie respondió. Lo que escribas acá se publica como comentario del ticket."}
              </div>
              {" "}
            </>) : null}
            {" "}
          </div>
          {" "}
          <div style={{ "borderTop": "1px solid var(--n-200)", "padding": "10px 12px", "display": "flex", "flexDirection": "column", "gap": "8px", "flexShrink": "0" }}>
            {" "}
            {V["chatReplyLocked"] ? (<>
              {" "}
              <div role="note" style={{ "display": "flex", "gap": "10px", "alignItems": "center", "background": "var(--n-50)", "borderRadius": "10px", "padding": "10px 12px" }}>
                {" "}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                {" "}
                <span style={{ "minWidth": "0", "flex": "1", "fontSize": "14px", "lineHeight": "1.45", "color": "var(--n-800)", "textWrap": "pretty" }}>
                  {T(V["chatReplyLockMsg"])}
                </span>
                {" "}
                {V["chatReplyLockTake"] ? (<>
                  {" "}
                  <button onClick={V["chatReplyOnTake"]} style={{ "flexShrink": "0", "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1n scp6">
                    {T(V["chatReplyTakeLabel"])}
                  </button>
                  {" "}
                </>) : null}
                {" "}
              </div>
              {" "}
            </>) : null}
            {" "}
            {V["chatCanReply"] ? (<>
              {" "}
              {V["chatHasStaged"] ? (<>
                {" "}
                <div style={{ "display": "flex", "flexDirection": "column", "gap": "6px", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
                  {" "}
                  <div style={{ "display": "flex", "gap": "8px", "flexWrap": "wrap" }}>
                    {" "}
                    {L(V["chatStaged"]).map((_p_46, $index) => (
                      <React.Fragment key={$index}>
                        {" "}
                        <span style={{ "position": "relative", "width": "64px", "height": "64px", "flexShrink": "0", "animation": "badgePop 320ms cubic-bezier(0.34,1.56,0.64,1) both" }}>
                          {" "}
                          <button onClick={_p_46?.["open"]} aria-label="Ver antes de enviar" title={_p_46?.["nombre"]} style={{ "width": "100%", "height": "100%", "padding": "0", "border": "1px solid var(--n-200)", "borderRadius": "10px", "overflow": "hidden", "background": "var(--n-50)", "cursor": "zoom-in", "display": "block" }}>
                            <img src={_p_46?.["url"]} alt={_p_46?.["nombre"]} style={{ "width": "100%", "height": "100%", "objectFit": "cover", "display": "block" }} />
                          </button>
                          {" "}
                          <button onClick={_p_46?.["remove"]} aria-label="Quitar imagen" title="Quitar" style={{ "position": "absolute", "top": "-6px", "right": "-6px", "width": "22px", "height": "22px", "borderRadius": "9999px", "border": "2px solid var(--n-0)", "background": "var(--n-900)", "color": "var(--n-0)", "display": "flex", "alignItems": "center", "justifyContent": "center", "cursor": "pointer", "padding": "0", "transition": "transform var(--duration-fast) var(--ease-standard)" }} className="scp2a scp2b">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                          </button>
                          {" "}
                        </span>
                        {" "}
                      </React.Fragment>
                    ))}
                    {" "}
                  </div>
                  {" "}
                  <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
                    {T(V["chatStagedNote"])}
                  </div>
                  {" "}
                </div>
                {" "}
              </>) : null}
              {" "}
              {V["chatUploading"] ? (<>
                {" "}
                <div role="status" aria-live="polite" aria-label={V["chatUpNote"]} style={{ "display": "flex", "gap": "8px", "flexWrap": "wrap" }}>
                  {" "}
                  {L(V["chatUpTiles"]).map((_u_47, $index) => (
                    <React.Fragment key={$index}>
                      {" "}
                      <span title={_u_47?.["nombre"]} style={{ "position": "relative", "width": "64px", "height": "64px", "flexShrink": "0", "borderRadius": "10px", "background": "var(--n-950)", "overflow": "hidden", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "gap": "6px", "animation": "badgePop 320ms cubic-bezier(0.34,1.56,0.64,1) both" }}>
                        {" "}
                        <span aria-hidden="true" style={{ "position": "relative", "display": "inline-block", "height": "12px", "flexShrink": "0" }}>
                          <img src="/marca/legumex-isotipo.png" alt="" style={{ "height": "12px", "width": "auto", "display": "block", "opacity": "0.28", "filter": "brightness(0) invert(1)" }} />
                          <img src="/marca/legumex-isotipo.png" alt="" style={{ "position": "absolute", "left": "0", "top": "0", "height": "12px", "width": "auto", "display": "block", "clipPath": "inset(0 " + S(_u_47?.["rest"]) + " 0 0)", "transition": "clip-path 240ms linear", "filter": "brightness(0) invert(1)" }} />
                        </span>
                        {" "}
                        <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-0)", "letterSpacing": "0.04em" }}>
                          {T(_u_47?.["pctLabel"])}
                        </span>
                        {" "}
                      </span>
                      {" "}
                    </React.Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
              </>) : null}
              {" "}
              {V["chatUpFail"] ? (<>
                {" "}
                <div role="alert" style={{ "display": "flex", "alignItems": "center", "gap": "8px", "background": "var(--ambar-tinte)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px 8px", "fontSize": "12px", "color": "var(--n-800)" }}>
                  <span style={{ "minWidth": "0", "flex": "1" }}>
                    {T(V["chatUpFailMsg"])}
                  </span>
                  <button onClick={V["onChatUpFailX"]} aria-label="Descartar aviso" style={{ "background": "none", "border": "none", "cursor": "pointer", "padding": "2px", "display": "flex" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
                {" "}
              </>) : null}
              {" "}
              <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "6px" }}>
                {" "}
                {L(V["chatMacros"]).map((_m_48, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <button onClick={_m_48?.["use"]} title={_m_48?.["text"]} style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "12px", "color": "var(--n-700)", "cursor": "pointer", "whiteSpace": "nowrap", "flexShrink": "0", "transition": "background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp2c scpt">
                      {T(_m_48?.["label"])}
                    </button>
                    {" "}
                  </React.Fragment>
                ))}
                {" "}
              </div>
              {" "}
              <div style={{ "display": "flex", "gap": "8px", "alignItems": "flex-end" }}>
                {" "}
                <label aria-label="Adjuntar imagen" title="Adjuntar imagen · JPG, PNG o WEBP hasta 5 MB" style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "10px", "padding": "10px", "cursor": "pointer", "display": "flex", "alignItems": "center", "flexShrink": "0", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp2d scp8">
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple="" onChange={V["onChatPick"]} style={{ "position": "absolute", "width": "1px", "height": "1px", "opacity": "0", "pointerEvents": "none" }} />
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </label>
                {" "}
                <textarea value={(V["chatMsg"] ?? "")} onChange={V["onChatMsg"]} onKeyDown={V["onChatKey"]} rows="2" placeholder="Escribí tu respuesta — Enter envía, Shift+Enter salta línea" style={{ "flex": "1", "minWidth": "0", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "10px", "padding": "9px 11px", "fontSize": "14px", "lineHeight": "1.5", "fontFamily": "inherit", "resize": "none", "outline": "none" }}></textarea>
                {" "}
                <button onClick={V["onChatSend"]} aria-label="Enviar respuesta" title="Enviar respuesta" style={{ "background": "var(--n-950)", "color": "var(--n-0)", "border": "none", "borderRadius": "10px", "padding": "10px", "cursor": "pointer", "display": "flex", "alignItems": "center", "flexShrink": "0", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1c scp8">
                  {V["chatIdle"] ? (<>
                    <svg style={{ "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)" }} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4Z"></path>
                      <path d="M22 2 11 13"></path>
                    </svg>
                  </>) : null}
                  {V["chatSending"] ? (<>
                    <span style={{ "width": "16px", "height": "16px", "display": "flex", "alignItems": "center", "justifyContent": "center", "overflow": "visible" }}>
                      <span aria-hidden="true" style={{ "position": "relative", "display": "inline-block", "height": "6px", "flexShrink": "0" }}>
                        <img src="/marca/legumex-isotipo.png" alt="" style={{ "height": "6px", "width": "auto", "display": "block", "opacity": "0.28", "filter": "brightness(0) invert(1)" }} />
                        <img src="/marca/legumex-isotipo.png" alt="" style={{ "position": "absolute", "left": "0", "top": "0", "height": "6px", "width": "auto", "display": "block", "animation": "logoLoop 1100ms cubic-bezier(0.65,0,0.35,1) infinite", "filter": "brightness(0) invert(1)" }} />
                      </span>
                    </span>
                  </>) : null}
                </button>
                {" "}
              </div>
              {" "}
              {V["chatHasErr"] ? (<>
                {" "}
                <div role="alert" style={{ "display": "flex", "alignItems": "center", "gap": "6px", "fontSize": "12px", "lineHeight": "1.4", "color": "var(--n-900)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                  {T(V["chatErr"])}
                </div>
                {" "}
              </>) : null}
              {" "}
              {V["chatCanClose"] ? (<>
                {" "}
                <button onClick={V["onChatSendClose"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "7px 10px", "fontSize": "12px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "6px", "transition": "background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scpi scpt">
                  {" "}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                    <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                    <path d="m9 11 3 3L22 4"></path>
                  </svg>
                  {"Responder y cerrar el ticket "}
                </button>
                {" "}
              </>) : null}
              {" "}
            </>) : null}
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        {V["chatPageEmpty"] ? (<>
          {" "}
          <div style={{ "flex": "1", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "gap": "10px", "padding": "32px", "textAlign": "center", "background": "var(--n-25)" }}>
            {" "}
            <Escena icono="chat" ancho="170px" />
            {" "}
            <div style={{ "fontSize": "16px", "fontWeight": "600", "color": "var(--n-900)" }}>
              {T(V["chatEmptyTitle"])}
            </div>
            {" "}
            <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "maxWidth": "360px", "textWrap": "pretty" }}>
              {T(V["chatPageHint"])}
            </div>
            {" "}
            {V["chatHasWait"] ? (<>
              {" "}
              <div style={{ "width": "100%", "maxWidth": "440px", "display": "flex", "flexDirection": "column", "gap": "8px", "marginTop": "10px", "textAlign": "left" }}>
                {" "}
                {L(V["chatWaitList"]).map((_w_49, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <button onClick={_w_49?.["go"]} style={{ "display": "flex", "alignItems": "center", "gap": "12px", "width": "100%", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "12px 14px", "cursor": "pointer", "textAlign": "left", "transition": "transform var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)", "animation": "dropIn var(--duration-base) var(--ease-standard) " + S(_w_49?.["delay"]) + " both" }} className="scp2e scp2f">
                      {" "}
                      <span style={{ "width": "8px", "height": "8px", "borderRadius": "9999px", "background": "var(--cian)", "flexShrink": "0" }}></span>
                      {" "}
                      <span style={{ "minWidth": "0", "flex": "1", "display": "flex", "flexDirection": "column", "gap": "2px" }}>
                        {" "}
                        <span style={{ "display": "flex", "gap": "8px", "alignItems": "baseline", "minWidth": "0" }}>
                          {" "}
                          <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "flexShrink": "0" }}>
                            {T(_w_49?.["code"])}
                          </span>
                          {" "}
                          <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis", "minWidth": "0" }}>
                            {T(_w_49?.["titulo"])}
                          </span>
                          {" "}
                          {_w_49?.["ownOn"] ? (<>
                            <span style={{ "flexShrink": "0", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.06em", "color": S(_w_49?.["ownInk"]), "border": "1px solid " + S(_w_49?.["ownBorder"]), "borderRadius": "9999px", "padding": "1px 7px" }}>
                              {T(_w_49?.["own"])}
                            </span>
                          </>) : null}
                          {" "}
                          <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "flexShrink": "0" }}>
                            {T(_w_49?.["when"])}
                          </span>
                          {" "}
                        </span>
                        {" "}
                        <span style={{ "fontSize": "14px", "color": "var(--n-600)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                          {T(_w_49?.["last"])}
                        </span>
                        {" "}
                      </span>
                      {" "}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                      {" "}
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
        </>) : null}
        {" "}
      </div>
      {" "}
    </>
  );
}
