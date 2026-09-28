// Lista de conversaciones de la página de chat.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

import Escena from '../comunes/Escena.jsx';
export default function ChatLista({ V }) {
  return (
    <>
      {" "}
      <div style={{ "display": "flex", "flexDirection": "column", "minHeight": "0", "minWidth": "0", "borderRight": S(V["chatListBorder"]) }}>
        {" "}
        <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "padding": "14px 14px 4px" }}>
          {" "}
          <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
            {"CONVERSACIONES"}
          </span>
          {" "}
          <span style={{ "marginLeft": "auto", "fontSize": "12px", "color": "var(--n-500)" }}>
            {T(V["chatSub"])}
          </span>
          {" "}
        </div>
        {" "}
        <div style={{ "padding": "10px 14px", "borderBottom": "1px solid var(--n-200)", "display": "flex", "flexDirection": "column", "gap": "8px", "flexShrink": "0" }}>
          {" "}
          <div style={{ "position": "relative" }}>
            {" "}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "position": "absolute", "left": "10px", "top": "50%", "transform": "translateY(-50%)", "pointerEvents": "none" }}>
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            {" "}
            <input value={(V["chatQ"] ?? "")} onChange={V["onChatQ"]} placeholder="Buscar por título o código" style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "7px 10px 7px 32px", "fontSize": "14px", "outline": "none" }} />
            {" "}
          </div>
          {" "}
          {V["vistaAdmin"] ? (<>
            {" "}
            <div role="group" aria-label="Qué tickets contar" style={{ "display": "flex", "gap": "2px", "padding": "3px", "background": "rgba(10,10,10,0.05)", "borderRadius": "8px" }}>
              {" "}
              {L(V["chatScopeOpts"]).map((_o_42, $index) => (
                <React.Fragment key={$index}>
                  {" "}
                  <button onClick={_o_42?.["go"]} aria-pressed={_o_42?.["pressed"]} style={{ "flex": "1", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "6px", "height": "30px", "padding": "0 8px", "border": "none", "borderRadius": "6px", "background": S(_o_42?.["bg"]), "boxShadow": S(_o_42?.["shadow"]), "fontSize": "12px", "fontWeight": S(_o_42?.["weight"]), "color": "var(--n-900)", "cursor": "pointer", "whiteSpace": "nowrap", "transition": "background-color var(--duration-fast) var(--ease-standard),transform var(--duration-fast) var(--ease-standard)" }} className="scpb">
                    {T(_o_42?.["label"])}
                    <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
                      {T(_o_42?.["count"])}
                    </span>
                  </button>
                  {" "}
                </React.Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "4px", "background": "var(--n-50)", "borderRadius": "8px", "padding": "3px" }}>
            {" "}
            {L(V["chatFilters"]).map((_f_43, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <button onClick={_f_43?.["go"]} style={{ "flex": "1 1 auto", "border": "none", "background": S(_f_43?.["bg"]), "color": "var(--n-900)", "fontSize": "12px", "fontWeight": "500", "padding": "5px 6px", "borderRadius": "6px", "cursor": "pointer", "whiteSpace": "nowrap", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scp23">
                  {T(_f_43?.["label"])}
                </button>
                {" "}
              </React.Fragment>
            ))}
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ "flex": "1", "minHeight": "0", "overflowY": "auto", "padding": "6px" }}>
          {" "}
          {L(V["chatList"]).map((_c_44, $index) => (
            <React.Fragment key={$index}>
              {" "}
              <button onClick={_c_44?.["go"]} style={{ "display": "flex", "gap": "10px", "width": "100%", "textAlign": "left", "background": S(_c_44?.["bg"]), "border": "none", "borderRadius": "10px", "padding": "10px", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scpg scpt">
                {" "}
                {_c_44?.["hasBlob"] ? (<>
                  {" "}
                  <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" ref={_c_44?.["blobRef"]} alt="" style={{ "width": "30px", "height": "30px", "borderRadius": "9999px", "background": "var(--n-50)", "border": "1px solid " + S(_c_44?.["ring"]), "flexShrink": "0", "display": "block" }} />
                  {" "}
                </>) : null}
                {" "}
                {_c_44?.["noBlob"] ? (<>
                  {" "}
                  <span style={{ "width": "30px", "height": "30px", "borderRadius": "9999px", "background": "var(--n-50)", "border": "1px solid " + S(_c_44?.["ring"]), "color": "var(--n-900)", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "11px", "fontWeight": "600", "flexShrink": "0" }}>
                    {T(_c_44?.["ini"])}
                  </span>
                  {" "}
                </>) : null}
                {" "}
                <span style={{ "minWidth": "0", "flex": "1", "display": "flex", "flexDirection": "column", "gap": "2px" }}>
                  {" "}
                  <span style={{ "display": "flex", "alignItems": "center", "gap": "6px" }}>
                    {" "}
                    <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
                      {T(_c_44?.["code"])}
                    </span>
                    {" "}
                    <span style={{ "width": "5px", "height": "5px", "borderRadius": "9999px", "background": S(_c_44?.["dot"]), "flexShrink": "0" }}></span>
                    {" "}
                    <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "flexShrink": "0" }}>
                      {T(_c_44?.["when"])}
                    </span>
                    {" "}
                  </span>
                  {" "}
                  <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                    {T(_c_44?.["titulo"])}
                  </span>
                  {" "}
                  <span style={{ "fontSize": "12px", "color": S(_c_44?.["lastInk"]), "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                    {T(_c_44?.["last"])}
                  </span>
                  {" "}
                  {_c_44?.["waiting"] ? (<>
                    {" "}
                    <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "5px", "fontSize": "11px", "fontWeight": "500", "color": "var(--n-900)", "background": S(_c_44?.["waitBg"]), "borderRadius": "9999px", "padding": "2px 8px", "alignSelf": "flex-start", "marginTop": "2px" }}>
                      {" "}
                      <span style={{ "width": "5px", "height": "5px", "borderRadius": "9999px", "background": S(_c_44?.["waitDot"]), "flexShrink": "0" }}></span>
                      {T(_c_44?.["waitLabel"])}{" "}
                    </span>
                    {" "}
                  </>) : null}
                  {" "}
                </span>
                {" "}
              </button>
              {" "}
            </React.Fragment>
          ))}
          {" "}
          {V["chatEmpty"] ? (<>
            {" "}
            <div style={{ "padding": "40px 20px", "textAlign": "center" }}>
              {" "}
              <Escena icono="lupa" ancho="120px" />
              {" "}
              <div style={{ "fontSize": "14px", "color": "var(--n-600)" }}>
                {"Ningún ticket coincide con lo que buscas."}
              </div>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </>
  );
}
