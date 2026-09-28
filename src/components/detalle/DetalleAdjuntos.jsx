// Adjuntos del ticket: imágenes, pendientes de envío y subidas.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function DetalleAdjuntos({ V }) {
  return (
    <div style={{ "background": "var(--fondo-2)", "borderRadius": "16px", "padding": "16px" }}>
      {" "}
      <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "marginBottom": "12px" }}>
        {"ADJUNTOS"}
      </div>
      {" "}
      <div style={{ "display": "flex", "flexDirection": "column", "gap": "12px" }}>
        {" "}
        {L(V["dFiles"]).map((_f_32, $index) => (
          <React.Fragment key={$index}>
            {" "}
            <div onClick={_f_32?.["open"]} onKeyDown={_f_32?.["key"]} role="button" tabIndex="0" aria-label={"Ver " + S(_f_32?.["nombre"]) + " en grande"} title="Ver en grande" style={{ "cursor": "zoom-in", "borderRadius": "8px", "outline": "none", "transition": "transform var(--duration-fast) var(--ease-standard)" }} className="scp1s scph">
              {" "}
              {_f_32?.["noUrl"] ? (<>
                {" "}
                <div style={{ "height": "120px", "border": "1px solid var(--n-200)", "borderRadius": "8px", "backgroundImage": "repeating-linear-gradient(45deg,var(--n-50) 0 8px,var(--n-0) 8px 16px)", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                  {" "}
                  <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "6px", "padding": "4px 8px" }}>
                    {T(_f_32?.["tipo"])}
                  </span>
                  {" "}
                </div>
                {" "}
              </>) : null}
              {" "}
              {_f_32?.["hasUrl"] ? (<>
                {" "}
                <div title={_f_32?.["nombre"]} style={{ "height": "120px", "border": "1px solid var(--n-200)", "borderRadius": "8px", "backgroundColor": "var(--n-50)", "backgroundImage": "url(" + S(_f_32?.["url"]) + ")", "backgroundSize": "cover", "backgroundPosition": "center" }}></div>
                {" "}
              </>) : null}
              {" "}
              <div style={{ "display": "flex", "justifyContent": "space-between", "gap": "8px", "marginTop": "8px" }}>
                {" "}
                <span style={{ "fontSize": "12px", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                  {T(_f_32?.["nombre"])}
                </span>
                {" "}
                <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "flexShrink": "0" }}>
                  {T(_f_32?.["peso"])}
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </React.Fragment>
        ))}
        {" "}
        {V["canUpload"] ? (<>
          {" "}
          <button onClick={V["onUpload"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp1t scp4">
            {" "}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapUpload"]), "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,translateY(0) scale(1)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="M16 5h6"></path>
              <path d="M19 2v6"></path>
              <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"></path>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            </svg>
            {"Subir imagen "}
          </button>
          {" "}
          <input id="tic-file" type="file" accept="image/jpeg,image/png,image/webp" multiple="true" onChange={V["onFileChange"]} style={{ "display": "none" }} />
          {" "}
          <span style={{ "fontSize": "12px", "color": "var(--n-600)", "textAlign": "center" }}>
            {T(V["uploadRule"])}
          </span>
          {" "}
          {V["hasStaged"] ? (<>
            {" "}
            <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "12px", "display": "flex", "flexDirection": "column", "gap": "10px", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
              {" "}
              <div style={{ "display": "flex", "alignItems": "center", "gap": "8px" }}>
                {" "}
                <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
                  {"SIN ENVIAR · "}{T(V["stagedCount"])}
                </span>
                {" "}
                <span style={{ "marginLeft": "auto", "fontSize": "12px", "color": "var(--n-500)" }}>
                  {"Toca una para verla grande"}
                </span>
                {" "}
              </div>
              {" "}
              <div style={{ "display": "grid", "gridTemplateColumns": "repeat(2,minmax(0,1fr))", "gap": "8px" }}>
                {" "}
                {L(V["staged"]).map((_sg_33, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <div style={{ "position": "relative", "animation": "badgePop 320ms cubic-bezier(0.34,1.56,0.64,1) both" }}>
                      {" "}
                      <div onClick={_sg_33?.["open"]} role="button" tabIndex="0" aria-label={"Ver " + S(_sg_33?.["nombre"]) + " en grande"} title={_sg_33?.["nombre"]} style={{ "aspectRatio": "4/3", "border": "1px solid var(--n-200)", "borderRadius": "8px", "backgroundColor": "var(--n-50)", "backgroundImage": "url(" + S(_sg_33?.["url"]) + ")", "backgroundSize": "cover", "backgroundPosition": "center", "cursor": "zoom-in", "transition": "transform var(--duration-fast) var(--ease-standard)" }} className="scp1s scp1u"></div>
                      {" "}
                      <button onClick={_sg_33?.["remove"]} aria-label={"Quitar " + S(_sg_33?.["nombre"])} title="Quitar" style={{ "position": "absolute", "top": "6px", "right": "6px", "width": "26px", "height": "26px", "borderRadius": "9999px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1v scp1w">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                      {" "}
                      <div style={{ "display": "flex", "justifyContent": "space-between", "gap": "6px", "marginTop": "4px" }}>
                        {" "}
                        <span style={{ "fontSize": "11px", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis", "minWidth": "0" }}>
                          {T(_sg_33?.["nombre"])}
                        </span>
                        {" "}
                        <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "flexShrink": "0" }}>
                          {T(_sg_33?.["peso"])}
                        </span>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </React.Fragment>
                ))}
                {" "}
              </div>
              {" "}
              <div style={{ "display": "flex", "gap": "8px" }}>
                {" "}
                <button onClick={V["onSendStaged"]} style={{ "flex": "1", "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "9px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1x scp2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapStage"]), "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                    <path d="m17 8-5-5-5 5"></path>
                    <path d="M12 3v12"></path>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  </svg>
                  {T(V["stagedLabel"])}
                </button>
                {" "}
                <button onClick={V["onDropStaged"]} aria-label="Quitar todas" title="Quitar todas" style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "0 10px", "cursor": "pointer", "display": "flex", "alignItems": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1y scp1z">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["hasUploads"] ? (<>
            {" "}
            <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
              {" "}
              {L(V["uploads"]).map((_u_34, $index) => (
                <React.Fragment key={$index}>
                  {" "}
                  <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "10px", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
                    {" "}
                    <div style={{ "display": "flex", "alignItems": "center", "gap": "8px" }}>
                      {" "}
                      {_u_34?.["failed"] ? (<>
                        {" "}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                          <path d="M12 9v4"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                        {" "}
                      </>) : null}
                      {" "}
                      <span style={{ "fontSize": "12px", "color": "var(--n-900)", "minWidth": "0", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                        {T(_u_34?.["nombre"])}
                      </span>
                      {" "}
                      {_u_34?.["ok"] ? (<>
                        {" "}
                        <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "flexShrink": "0" }}>
                          {T(_u_34?.["pctLabel"])}
                        </span>
                        {" "}
                      </>) : null}
                      {" "}
                      {_u_34?.["failed"] ? (<>
                        {" "}
                        <button onClick={_u_34?.["dismiss"]} aria-label="Descartar archivo" title="Descartar archivo" style={{ "marginLeft": "auto", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "6px", "padding": "3px", "cursor": "pointer", "display": "flex", "alignItems": "center", "flexShrink": "0", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scpu scp20">
                          <svg style={{ "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                          </svg>
                        </button>
                        {" "}
                      </>) : null}
                      {" "}
                    </div>
                    {" "}
                    {_u_34?.["ok"] ? (<>
                      {" "}
                      <div style={{ "marginTop": "8px", "display": "flex", "alignItems": "center", "justifyContent": "center", "gap": "10px", "height": "40px", "background": "var(--n-950)", "borderRadius": "8px" }}>
                        <span aria-hidden="true" style={{ "position": "relative", "display": "inline-block", "height": "12px", "flexShrink": "0" }}>
                          <img src="/marca/legumex-isotipo.png" alt="" style={{ "height": "12px", "width": "auto", "display": "block", "opacity": "0.28", "filter": "brightness(0) invert(1)" }} />
                          <img src="/marca/legumex-isotipo.png" alt="" style={{ "position": "absolute", "left": "0", "top": "0", "height": "12px", "width": "auto", "display": "block", "clipPath": "inset(0 " + S(_u_34?.["rest"]) + " 0 0)", "transition": "clip-path 240ms linear", "filter": "brightness(0) invert(1)" }} />
                        </span>
                        <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-0)", "letterSpacing": "0.04em" }}>
                          {"SUBIENDO · "}{T(_u_34?.["pctLabel"])}
                        </span>
                      </div>
                      {" "}
                    </>) : null}
                    {" "}
                    {_u_34?.["failed"] ? (<>
                      {" "}
                      <div style={{ "fontSize": "12px", "lineHeight": "1.43", "color": "var(--n-800)", "marginTop": "4px" }}>
                        {T(_u_34?.["msg"])}
                      </div>
                      {" "}
                      <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "marginTop": "2px", "letterSpacing": "0.02em" }}>
                        {"NO SE ENVIÓ · HTTP 400 EVITADO"}
                      </div>
                      {" "}
                    </>) : null}
                    {" "}
                  </div>
                  {" "}
                </React.Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
        </>) : null}
        {" "}
        {V["dNoFiles"] ? (<>
          {" "}
          <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "16px", "textAlign": "center" }}>
            {" "}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--n-400)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "margin": "0 auto 8px", "display": "block" }}>
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <circle cx="9" cy="9" r="2"></circle>
              <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"></path>
            </svg>
            <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)" }}>
              {"Sin adjuntos"}
            </div>
            {" "}
            <div style={{ "fontSize": "12px", "color": "var(--n-500)", "marginTop": "2px" }}>
              {"Una captura del error acelera el diagnóstico."}
            </div>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
      </div>
      {" "}
    </div>
  );
}
