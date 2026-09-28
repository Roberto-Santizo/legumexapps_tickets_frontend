// Crear / editar una categoría o un usuario.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../utils/runtime.js';

export default function EntidadFormulario({ V }) {
  return (
    <>
      {" "}
      <div style={{ "maxWidth": "720px" }}>
        {" "}
        <div style={{ "display": "flex", "marginBottom": "16px" }}>
          <button onClick={V["onHeaderBack"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "flexShrink": "0", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpm scp4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            {"Volver sin guardar"}
          </button>
        </div>
        {" "}
        <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "24px", "display": "flex", "flexDirection": "column", "gap": "20px" }}>
          {" "}
          {V["entMeta"] ? (<>
            {" "}
            <div style={{ "display": "flex", "alignItems": "center", "gap": "10px", "flexWrap": "wrap", "borderBottom": "1px solid var(--n-200)", "paddingBottom": "16px" }}>
              {" "}
              <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "background": "var(--n-50)", "borderRadius": "6px", "padding": "4px 8px" }}>
                {T(V["entCode"])}
              </span>
              {" "}
              <span style={{ "fontSize": "14px", "color": "var(--n-500)" }}>
                {T(V["entMetaNote"])}
              </span>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
            {" "}
            <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
              {T(V["entNameLabel"])}
            </label>
            {" "}
            <input value={(V["entName"] ?? "")} onChange={V["onEntName"]} placeholder={V["entNamePh"]} style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid " + S(V["entNameBorder"]), "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "outline": "none" }} />
            {" "}
            <span style={{ "fontSize": "12px", "color": "var(--n-500)" }}>
              {T(V["entNameHelp"])}
            </span>
            {" "}
          </div>
          {" "}
          {V["entIsCat"] ? (<>
            {" "}
            <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
              {" "}
              <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                {"Descripción corta"}
              </label>
              {" "}
              <textarea value={(V["entDesc"] ?? "")} onChange={V["onEntDesc"]} rows="3" placeholder="Qué tipo de problemas entran acá" style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "lineHeight": "1.5", "fontFamily": "inherit", "resize": "vertical", "outline": "none" }}></textarea>
              {" "}
              <span style={{ "fontSize": "12px", "color": "var(--n-500)" }}>
                {"Ayuda a quien reporta a elegir bien. Se ve en el formulario de creación."}
              </span>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["entIsUser"] ? (<>
            {" "}
            <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
              {" "}
              <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                {"Correo institucional"}
              </label>
              {" "}
              <input inputMode="email" autoCapitalize="none" autoCorrect="off" spellCheck="false" autoComplete="off" value={(V["entEmail"] ?? "")} onChange={V["onEntEmail"]} placeholder="nombre@legumex.net" style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid " + S(V["entEmailBorder"]), "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "outline": "none" }} />
              {" "}
              <span style={{ "fontSize": "12px", "color": "var(--n-500)" }}>
                {"Es el usuario con el que inicia sesión."}
              </span>
              {" "}
            </div>
            {V["entPwdOn"] ? (<>
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>{T(V["entPwdLabel"])}</label>
                <input type="password" autoComplete="new-password" value={(V["entPwd"] ?? "")} onChange={V["onEntPwd"]} placeholder="Mínimo 8 caracteres" style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid " + S(V["entPwdBorder"]), "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "outline": "none", "boxSizing": "border-box" }} />
                <span style={{ "fontSize": "12px", "color": "var(--n-500)", "textWrap": "pretty" }}>{T(V["entPwdHelp"])}</span>
              </div>
            </>) : null}
            {" "}
            <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
              {" "}
              <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                {"Rol"}
              </label>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                {" "}
                {L(V["entRoles"]).map((_r_50, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <button onClick={_r_50?.["go"]} style={{ "display": "flex", "alignItems": "flex-start", "gap": "10px", "width": "100%", "textAlign": "left", "background": "var(--n-0)", "border": "1px solid " + S(_r_50?.["border"]), "borderRadius": "10px", "padding": "12px", "cursor": "pointer", "transition": "border-color var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpg scpt">
                      {" "}
                      <span style={{ "width": "16px", "height": "16px", "borderRadius": "9999px", "border": "1px solid " + S(_r_50?.["dotBorder"]), "background": S(_r_50?.["dotBg"]), "flexShrink": "0", "marginTop": "2px", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                        {" "}
                        {_r_50?.["on"] ? (<>
                          <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": "var(--n-0)" }}></span>
                        </>) : null}
                        {" "}
                      </span>
                      {" "}
                      <span style={{ "minWidth": "0" }}>
                        {" "}
                        <span style={{ "display": "block", "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)" }}>
                          {T(_r_50?.["label"])}
                        </span>
                        {" "}
                        <span style={{ "display": "block", "fontSize": "12px", "color": "var(--n-500)", "marginTop": "2px", "textWrap": "pretty" }}>
                          {T(_r_50?.["note"])}
                        </span>
                        {" "}
                      </span>
                      {" "}
                    </button>
                    {" "}
                  </React.Fragment>
                ))}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["entErr"] ? (<>
            {" "}
            <div style={{ "display": "flex", "gap": "8px", "alignItems": "flex-start", "background": "var(--ambar-tinte)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "12px" }}>
              {" "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "marginTop": "1px" }}>
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              {" "}
              <span style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-900)" }}>
                {T(V["entErr"])}
              </span>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          <div style={{ "display": "flex", "gap": "8px", "borderTop": "1px solid var(--n-200)", "paddingTop": "20px" }}>
            {" "}
            <button onClick={V["onEntSave"]} style={{ "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "12px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1c scp2">
              {T(V["entOkLabel"])}
            </button>
            {" "}
            <button onClick={V["onEntCancel"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "12px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpg scpd">
              {"Cancelar"}
            </button>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </>
  );
}
