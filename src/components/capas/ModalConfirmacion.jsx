// Modal de confirmación y edición rápida.
// V: valores de la lógica (src/logic/valores).
import { T, S } from '../../utils/runtime.js';

export default function ModalConfirmacion({ V }) {
  return (
    <>
      {/* z-index 70: por encima del chat flotante (60), que en el teléfono ocupa toda la
          pantalla y tapaba la confirmación; por debajo de avisos (72) y carga (80). */}
      <div data-m="velo-modal" style={{ "position": "fixed", "inset": "0", "background": "rgba(10,10,10,0.4)", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "24px", "zIndex": "70", "animation": S(V["overlayAnim"]) + " both" }}>
        {" "}
        <div ref={V["modalRef"]} role="dialog" aria-modal="true" aria-labelledby="modal-titulo" aria-describedby="modal-detalle" data-riesgosa={V["modalRiesgosa"]} style={{ "width": "100%", "maxWidth": "460px", "background": "var(--n-0)", "borderRadius": "16px", "padding": "24px", "animation": S(V["modalAnim"]) + " both", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px" }}>
          {" "}
          <h3 id="modal-titulo" style={{ "fontSize": "20px", "lineHeight": "1.4", "fontWeight": "600", "margin": "0", "color": "var(--n-900)" }}>
            {T(V["modalTitle"])}
          </h3>
          {" "}
          <p id="modal-detalle" style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "margin": "6px 0 20px" }}>
            {T(V["modalSub"])}
          </p>
          {" "}
          {V["modalHasName"] ? (<>
            {" "}
            <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "marginBottom": "16px" }}>
              {" "}
              <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                {T(V["modalNameLabel"])}
              </label>
              {" "}
              <input value={(V["modalName"] ?? "")} onChange={V["onModalName"]} style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-1000)", "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "outline": "none" }} />
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["modalHasDesc"] ? (<>
            {" "}
            <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "marginBottom": "16px" }}>
              {" "}
              <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                {T(V["modalDescLabel"])}
              </label>
              {" "}
              <textarea value={(V["modalDesc"] ?? "")} onChange={V["onModalDesc"]} rows="3" style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-1000)", "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "lineHeight": "1.5", "outline": "none", "resize": "vertical" }}></textarea>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["modalHasEmail"] ? (<>
            {" "}
            <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "marginBottom": "16px" }}>
              {" "}
              <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                {"Correo institucional"}
              </label>
              {" "}
              <input inputMode="email" autoCapitalize="none" autoCorrect="off" spellCheck="false" autoComplete="off" value={(V["modalEmail"] ?? "")} onChange={V["onModalEmail"]} placeholder="nombre@legumex.net" style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-1000)", "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "outline": "none" }} />
              {" "}
            </div>
            {V["modalPwdOn"] ? (<>
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "marginBottom": "16px" }}>
                <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>{T(V["modalPwdLabel"])}</label>
                <input type="password" autoComplete="new-password" value={(V["modalPwd"] ?? "")} onChange={V["onModalPwd"]} placeholder="Mínimo 8 caracteres" style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid " + S(V["modalPwdBorder"]), "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "outline": "none", "boxSizing": "border-box" }} />
                <span style={{ "fontSize": "12px", "color": "var(--n-500)", "textWrap": "pretty" }}>{T(V["modalPwdHelp"])}</span>
              </div>
            </>) : null}
            {" "}
          </>) : null}
          {" "}
          {V["modalHasRol"] ? (<>
            {" "}
            <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "marginBottom": "16px" }}>
              {" "}
              <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                {"Rol"}
              </label>
              {" "}
              <div style={{ "position": "relative" }}>
                {" "}
                <select value={(V["modalRol"] ?? "")} onChange={V["onModalRol"]} style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-1000)", "borderRadius": "6px", "padding": "10px 34px 10px 12px", "fontSize": "14px", "outline": "none", "appearance": "none", "WebkitAppearance": "none" }}>
                  {" "}
                  <option value="usuario">
                    {"Usuario"}
                  </option>
                  {" "}
                  <option value="admin">
                    {"Administrador"}
                  </option>
                  {" "}
                </select>
                {" "}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "position": "absolute", "right": "11px", "top": "50%", "transform": "translateY(-50%)", "pointerEvents": "none" }}>
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["modalErr"] ? (<>
            {" "}
            <div style={{ "display": "flex", "gap": "8px", "alignItems": "flex-start", "background": "var(--ambar-tinte)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "12px", "marginBottom": "16px" }}>
              {" "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "marginTop": "1px" }}>
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              {" "}
              <span style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-900)" }}>
                {T(V["modalErr"])}
              </span>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["modalCanSkip"] ? (<>
            {" "}
            <label style={{ "display": "flex", "alignItems": "center", "gap": "10px", "margin": "0 0 16px", "minHeight": "44px", "cursor": "pointer", "fontSize": "14px", "color": "var(--n-800)" }}>
              {" "}
              <input type="checkbox" checked={(V["modalSkip"] ?? false)} onChange={V["onModalSkip"]} style={{ "width": "18px", "height": "18px", "margin": "0", "accentColor": "var(--n-900)", "cursor": "pointer", "flexShrink": "0" }} />
              {" No volver a preguntar en esta sesión "}
            </label>
            {" "}
          </>) : null}
          {" "}
          <div style={{ "display": "flex", "gap": "8px", "justifyContent": "flex-end", "borderTop": "1px solid var(--n-200)", "paddingTop": "20px" }}>
            {" "}
            <button onClick={V["onModalCancel"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scpg scp4">
              {"Cancelar"}
            </button>
            {" "}
            {V["modalIsDanger"] ? (<>
              {" "}
              <button onClick={V["onModalOk"]} style={{ "position": "relative", "background": "var(--ambar-tinte)", "color": "var(--n-900)", "border": "1px solid var(--naranja)", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp1m scp4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--naranja))", "animation": S(V["tapModalOk"]) }}>
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <span style={{ "opacity": S(V["busyModalOp"]), "transition": "opacity var(--duration-fast) var(--ease-standard)" }}>
                  {T(V["modalOkLabel"])}
                </span>
                {V["busyModal"] ? (<>
                  <span style={{ "position": "absolute", "inset": "0", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                    <span style={{ "width": "16px", "height": "16px", "borderRadius": "9999px", "border": "2px solid var(--n-900)", "borderTopColor": "transparent", "animation": "spin 600ms linear infinite" }}></span>
                  </span>
                </>) : null}
              </button>
              {" "}
            </>) : null}
            {" "}
            {V["modalIsSafe"] ? (<>
              {" "}
              <button onClick={V["onModalOk"]} style={{ "position": "relative", "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scpv">
                <span style={{ "opacity": S(V["busyModalOp"]), "transition": "opacity var(--duration-fast) var(--ease-standard)" }}>
                  {T(V["modalOkLabel"])}
                </span>
                {V["busyModal"] ? (<>
                  <span style={{ "position": "absolute", "inset": "0", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                    <span style={{ "width": "16px", "height": "16px", "borderRadius": "9999px", "border": "2px solid var(--n-0)", "borderTopColor": "transparent", "animation": "spin 600ms linear infinite" }}></span>
                  </span>
                </>) : null}
              </button>
              {" "}
            </>) : null}
            {" "}
          </div>
          {" "}
        </div>
      </div>
    </>
  );
}
