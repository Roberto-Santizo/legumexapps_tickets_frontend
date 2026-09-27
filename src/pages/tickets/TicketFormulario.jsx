// Formulario de ticket (crear / editar).
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function TicketFormulario({ V }) {
  return (
    <>
      {" "}
      <div style={{ "maxWidth": "720px" }}>
        {" "}
        <div style={{ "display": "flex", "marginBottom": "16px" }}>
          <button onClick={V["onCancelForm"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "flexShrink": "0", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpm scp4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            {"Volver al listado"}
          </button>
        </div>
        {" "}
        {V["draftFound"] ? (<>
          {" "}
          <div style={{ "display": "flex", "gap": "12px", "alignItems": "flex-start", "background": "var(--n-50)", "borderRadius": "12px", "padding": "16px", "marginBottom": "16px", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
            {" "}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "marginTop": "1px" }}>
              <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5z"></path>
              <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"></path>
              <path d="M15 2v5h5"></path>
            </svg>
            {" "}
            <div style={{ "minWidth": "0", "flex": "1" }}>
              {" "}
              <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)" }}>
                {"Recuperamos lo que habías escrito"}
              </div>
              {" "}
              <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-800)" }}>
                {"Quedó guardado en este equipo la última vez que empezaste un ticket y no lo enviaste."}
              </div>
              {" "}
            </div>
            {" "}
            <button onClick={V["onDropDraft"]} style={{ "flexShrink": "0", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpu scp4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              {"Empezar de cero"}
            </button>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        {V["hasFormBanner"] ? (<>
          {" "}
          <div style={{ "display": "flex", "gap": "8px", "alignItems": "flex-start", "background": "var(--ambar-tinte)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "12px", "marginBottom": "20px" }}>
            {" "}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "marginTop": "2px" }}>
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
            {" "}
            <div>
              {" "}
              <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)" }}>
                {T(V["formBannerTitle"])}
              </div>
              {" "}
              <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-800)" }}>
                {T(V["formBannerNote"])}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "24px", "display": "flex", "flexDirection": "column", "gap": "20px" }}>
          {" "}
          {V["formIsEdit"] ? (<>
            {" "}
            <div style={{ "display": "flex", "alignItems": "center", "gap": "10px", "flexWrap": "wrap", "borderBottom": "1px solid var(--n-200)", "paddingBottom": "16px" }}>
              {" "}
              <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "background": "var(--n-50)", "borderRadius": "6px", "padding": "4px 8px" }}>
                {T(V["formCode"])}
              </span>
              {" "}
              <span style={{ "fontSize": "14px", "color": "var(--n-500)" }}>
                {"Abierto por "}{T(V["formAutor"])}{" · "}{T(V["formCreado"])}
              </span>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
            {" "}
            <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
              {"Título"}
            </label>
            {" "}
            <input value={(V["fTitulo"] ?? "")} onChange={V["onFTitulo"]} placeholder="Ej.: La notebook de Mesa de Partes no enciende" style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid " + S(V["errTituloBorder"]), "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "outline": "none" }} />
            {" "}
            {V["hasDupes"] ? (<>
              {" "}
              <div style={{ "background": "var(--n-50)", "borderRadius": "12px", "padding": "12px", "display": "flex", "flexDirection": "column", "gap": "8px", "animation": "dropIn var(--duration-base) var(--ease-standard) both" }}>
                {" "}
                <div style={{ "display": "flex", "alignItems": "center", "gap": "8px" }}>
                  {" "}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                    <rect width="14" height="14" x="8" y="8" rx="2"></rect>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                  </svg>
                  {" "}
                  <span style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)" }}>
                    {T(V["dupesTitle"])}
                  </span>
                  {" "}
                </div>
                {" "}
                <span style={{ "fontSize": "12px", "color": "var(--n-600)" }}>
                  {"Si es el mismo problema, sumá un comentario ahí en lugar de abrir otro ticket."}
                </span>
                {" "}
                {L(V["dupes"]).map((_d_26, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <button onClick={_d_26?.["open"]} style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 10px", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1f scp1g">
                      {" "}
                      <span style={{ "minWidth": "0", "flex": "1" }}>
                        {" "}
                        <span style={{ "display": "block", "fontSize": "13px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                          {T(_d_26?.["titulo"])}
                        </span>
                        {" "}
                        <span style={{ "display": "block", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "marginTop": "2px" }}>
                          {T(_d_26?.["code"])}{" · "}{T(_d_26?.["asig"])}{" · "}{T(_d_26?.["when"])}
                        </span>
                        {" "}
                      </span>
                      {" "}
                      <span style={{ "flexShrink": "0", "background": S(_d_26?.["statusBg"]), "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "color": "var(--n-900)" }}>
                        {T(_d_26?.["statusLabel"])}
                      </span>
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
            {V["errTitulo"] ? (<>
              {" "}
              <div style={{ "display": "flex", "alignItems": "center", "gap": "6px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <span style={{ "fontSize": "12px", "color": "var(--n-800)" }}>
                  {T(V["errTituloMsg"])}
                </span>
              </div>
              {" "}
            </>) : null}
            {" "}
          </div>
          {" "}
          <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
            {" "}
            <div style={{ "display": "flex", "alignItems": "center", "gap": "8px" }}>
              {" "}
              <label htmlFor="tic-desc" style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                {"Descripción"}
              </label>
              {" "}
              {V["hasDesc"] ? (<>
                {" "}
                <button onClick={V["onBlankDesc"]} style={{ "marginLeft": "auto", "background": "transparent", "border": "none", "padding": "2px 4px", "fontSize": "12px", "fontWeight": "500", "color": "var(--n-600)", "cursor": "pointer", "borderRadius": "6px", "transition": "background-color var(--duration-fast) var(--ease-standard),color var(--duration-fast) var(--ease-standard)" }} className="scp0 scpt">
                  {"Empezar en blanco"}
                </button>
                {" "}
              </>) : null}
              {" "}
            </div>
            {" "}
            <textarea id="tic-desc" value={(V["fDesc"] ?? "")} onChange={V["onFDesc"]} rows="5" placeholder="Qué pasó, desde cuándo, y qué intentaste hasta ahora." style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid " + S(V["errDescBorder"]), "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "lineHeight": "1.5", "outline": "none", "resize": "vertical" }}></textarea>
            {" "}
            {V["errDesc"] ? (<>
              {" "}
              <div style={{ "display": "flex", "alignItems": "center", "gap": "6px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <span style={{ "fontSize": "12px", "color": "var(--n-800)" }}>
                  {T(V["errDescMsg"])}
                </span>
              </div>
              {" "}
            </>) : null}
            {" "}
          </div>
          {" "}
          <div style={{ "display": "flex", "gap": "16px", "flexWrap": "wrap" }}>
            {" "}
            <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "width": "320px", "maxWidth": "100%" }}>
              {" "}
              <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                {"Categoría"}
              </label>
              {" "}
              <div style={{ "position": "relative" }}>
                {" "}
                <select value={(V["fCat"] ?? "")} onChange={V["onFCat"]} style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid " + S(V["errCatBorder"]), "borderRadius": "6px", "padding": "10px 34px 10px 12px", "fontSize": "14px", "outline": "none", "appearance": "none", "WebkitAppearance": "none" }}>
                  {" "}
                  <option value="">
                    {"Elegí una categoría"}
                  </option>
                  {" "}
                  {L(V["activeCats"]).map((_c_27, $index) => (
                    <React.Fragment key={$index}>
                      {" "}
                      <option value={(_c_27?.["value"] ?? "")}>
                        {T(_c_27?.["nombre"])}
                      </option>
                      {" "}
                    </React.Fragment>
                  ))}
                  {" "}
                </select>
                {" "}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "position": "absolute", "right": "11px", "top": "50%", "transform": "translateY(-50%)", "pointerEvents": "none" }}>
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
                {" "}
              </div>
              {" "}
              {V["errCat"] ? (<>
                {" "}
                <div style={{ "display": "flex", "alignItems": "center", "gap": "6px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  <span style={{ "fontSize": "12px", "color": "var(--n-800)" }}>
                    {"Elegí la categoría que mejor describe el problema."}
                  </span>
                </div>
                {" "}
              </>) : null}
              {" "}
            </div>
            {" "}
            {V["formIsCreate"] ? (<>
              {" "}
              {/* Prioridad que elige quien crea el ticket (se manda en POST /api/tickets) */}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px", "width": "320px", "maxWidth": "100%" }}>
                {" "}
                <label htmlFor="tic-prio" style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                  {"Prioridad"}
                </label>
                {" "}
                <div style={{ "position": "relative" }}>
                  {" "}
                  <select id="tic-prio" value={(V["fPrio"] ?? "")} onChange={V["onFPrio"]} style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-1000)", "borderRadius": "6px", "padding": "10px 34px 10px 28px", "fontSize": "14px", "outline": "none", "appearance": "none", "WebkitAppearance": "none" }}>
                    {" "}
                    {L(V["prioOpts"]).map((_p_1, $index) => (
                      <React.Fragment key={$index}>
                        <option value={(_p_1?.["value"] ?? "")}>
                          {T(_p_1?.["label"])}
                        </option>
                      </React.Fragment>
                    ))}
                    {" "}
                  </select>
                  {" "}
                  <span aria-hidden="true" style={{ "position": "absolute", "left": "12px", "top": "50%", "width": "8px", "height": "8px", "marginTop": "-4px", "borderRadius": "9999px", "background": S(V["fPrioDot"]), "pointerEvents": "none" }}></span>
                  {" "}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "position": "absolute", "right": "11px", "top": "50%", "transform": "translateY(-50%)", "pointerEvents": "none" }}>
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                  {" "}
                </div>
                {" "}
                <span style={{ "fontSize": "12px", "color": "var(--n-600)", "lineHeight": "1.4" }}>
                  {T(V["fPrioHint"])}
                </span>
                {" "}
              </div>
              {" "}
            </>) : null}
            {" "}
          </div>
          {" "}
          {V["formCanManage"] ? (<>
            {" "}
            <div style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fit,minmax(220px,1fr))", "gap": "16px", "borderTop": "1px solid var(--n-200)", "paddingTop": "20px" }}>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                {" "}
                <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                  {"Estado"}
                </label>
                {" "}
                <div style={{ "position": "relative" }}>
                  {" "}
                  <select value={(V["fStatus"] ?? "")} onChange={V["onFStatus"]} disabled={V["fStatusLocked"]} title={V["fStatusTitle"]} style={{ "opacity": S(V["fStatusOp"]), "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-1000)", "borderRadius": "6px", "padding": "10px 34px 10px 12px", "fontSize": "14px", "outline": "none", "appearance": "none", "WebkitAppearance": "none" }}>
                    {" "}
                    <option value="open">
                      {"Abierto"}
                    </option>
                    {" "}
                    <option value="in_progress">
                      {"En progreso"}
                    </option>
                    {" "}
                    <option value="closed" disabled={V["fClosedOptOff"]}>
                      {"Cerrado"}
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
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                {" "}
                <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                  {"Prioridad"}
                </label>
                {" "}
                <div style={{ "position": "relative" }}>
                  {" "}
                  <select value={(V["fPrio"] ?? "")} onChange={V["onFPrio"]} style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-1000)", "borderRadius": "6px", "padding": "10px 34px 10px 12px", "fontSize": "14px", "outline": "none", "appearance": "none", "WebkitAppearance": "none" }}>
                    {" "}
                    <option value="low">
                      {"Baja"}
                    </option>
                    {" "}
                    <option value="medium">
                      {"Media"}
                    </option>
                    {" "}
                    <option value="high">
                      {"Alta"}
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
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["formRoleNote"] ? (<>
            {" "}
            <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.02em" }}>
              {"ESTADO Y PRIORIDAD LOS GESTIONA UN ADMIN"}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["formIsCreate"] ? (<>
            {" "}
            <div style={{ "display": "flex", "gap": "12px", "alignItems": "flex-start", "background": "var(--fondo-2)", "borderRadius": "16px", "padding": "16px" }}>
              {" "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "marginTop": "1px" }}>
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              {" "}
              <div style={{ "minWidth": "0" }}>
                {" "}
                <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)" }}>
                  {"Al enviarlo se notifica por correo a los administradores del área"}
                </div>
                {" "}
                <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-600)", "marginTop": "2px" }}>
                  {"El estado entra como "}
                  <strong style={{ "fontWeight": "500" }}>
                    {"Abierto"}
                  </strong>
                  {" con la prioridad que elegiste — un admin puede cambiarla después."}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["formIsEdit"] ? (<>
            {" "}
            <div style={{ "display": "flex", "gap": "12px", "alignItems": "flex-start", "background": "var(--fondo-2)", "borderRadius": "16px", "padding": "16px" }}>
              {" "}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "marginTop": "1px" }}>
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <path d="M12 7v5l4 2"></path>
              </svg>
              {" "}
              <div style={{ "minWidth": "0" }}>
                {" "}
                <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)" }}>
                  {"Los datos vienen cargados: cambiá solo lo que haga falta"}
                </div>
                {" "}
                <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-600)", "marginTop": "2px" }}>
                  {"Cada cambio queda registrado en el historial del ticket con tu nombre."}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          <div style={{ "display": "flex", "gap": "8px", "borderTop": "1px solid var(--n-200)", "paddingTop": "20px" }}>
            {" "}
            <button onClick={V["onSubmitForm"]} style={{ "position": "relative", "overflow": "hidden", "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "12px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)" }} className="scp1h scp2">
              {V["rippleForm"] ? (<>
                <span aria-hidden="true" style={{ "position": "absolute", "left": "50%", "top": "50%", "width": "120px", "height": "120px", "margin": "-60px 0 0 -60px", "borderRadius": "9999px", "background": "var(--n-0)", "animation": "ripple 560ms var(--ease-standard) both", "pointerEvents": "none" }}></span>
              </>) : null}
              <span style={{ "opacity": S(V["busyFormOp"]), "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "opacity var(--duration-fast) var(--ease-standard)" }}>
                {V["formIsCreate"] ? (<>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapForm"]), "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)" }}>
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </>) : null}
                {V["formIsEdit"] ? (<>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapForm"]), "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </>) : null}
                {T(V["formOkLabel"])}
              </span>
              {V["busyForm"] ? (<>
                <span style={{ "position": "absolute", "inset": "0", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                  <span style={{ "width": "16px", "height": "16px", "borderRadius": "9999px", "border": "2px solid var(--n-0)", "borderTopColor": "transparent", "animation": "spin 600ms linear infinite" }}></span>
                </span>
              </>) : null}
            </button>
            {" "}
            <button onClick={V["onCancelForm"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "12px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpx scpd">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
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
