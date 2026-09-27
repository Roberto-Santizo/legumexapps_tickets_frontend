// Barra lateral: inicio, campana, navegación, bandeja, métricas propias y sesión.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function BarraLateral({ V }) {
  return (
    <aside data-m="menu" data-abierto={V["menuMovilAbierto"] ? "" : undefined} onClickCapture={V["onMenuTap"]} style={{ "position": "relative", "width": "240px", "flexShrink": "0", "background": "transparent", "position": "sticky", "top": "0", "alignSelf": "flex-start", "height": "100vh", "overflowY": "auto", "borderRight": "none", "padding": "24px 12px 20px", "display": "flex", "flexDirection": "column", "gap": "28px" }}>
      {" "}
      <button onClick={V["onHome"]} aria-label="Ir al inicio" title="Ir al inicio" style={{ "alignSelf": "flex-start", "background": "transparent", "border": "none", "padding": "4px 8px", "margin": "0", "cursor": "pointer", "display": "flex", "alignItems": "center", "borderRadius": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp5 scp6">
        {" "}
        <img src="/marca/legumex-isotipo.png" alt="Agroindustria Legumex" style={{ "height": "34px", "width": "auto", "display": "block" }} />
        {" "}
      </button>
      {" "}
      <button data-m="campana-lateral" data-recorrido="campana" onClick={V["onBell"]} aria-label={V["bellAria"]} aria-expanded={V["notifOpen"]} title="Notificaciones" style={{ "position": "absolute", "top": "24px", "right": "12px", "width": "44px", "height": "44px", "borderRadius": "10px", "border": "none", "background": S(V["bellBg"]), "boxShadow": S(V["bellShadow"]), "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp7 scp8">
        {" "}
        {V["bellPolling"] ? (<>
          <span aria-hidden="true" style={{ "position": "relative", "display": "inline-block", "height": "10px", "flexShrink": "0" }}>
            <img src="/marca/legumex-isotipo.png" alt="" style={{ "height": "10px", "width": "auto", "display": "block", "opacity": "0.28" }} />
            <img src="/marca/legumex-isotipo.png" alt="" style={{ "position": "absolute", "left": "0", "top": "0", "height": "10px", "width": "auto", "display": "block", "animation": "logoLoop 1100ms cubic-bezier(0.65,0,0.35,1) infinite" }} />
          </span>
        </>) : null}
        <svg display={V["bellSvgDisplay"]} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--n-900)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transformOrigin": "50% 10%", "transform": "rotate(var(--ir,0deg)) scale(var(--ic,1))", "transition": "transform 240ms cubic-bezier(0.34,1.56,0.64,1)", "animation": S(V["bellAnim"]) }}>
          <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
        </svg>
        {" "}
        {V["hasUnread"] ? (<>
          <span style={{ "position": "absolute", "top": "5px", "right": "5px", "minWidth": "18px", "height": "18px", "padding": "0 5px", "borderRadius": "9999px", "background": "var(--rojo)", "color": "var(--n-0)", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "fontWeight": "600", "lineHeight": "18px", "textAlign": "center", "boxShadow": "0 0 0 2px var(--fondo)", "animation": "badgePop 360ms cubic-bezier(0.34,1.56,0.64,1) both" }}>
            {T(V["unreadLabel"])}
          </span>
        </>) : null}
        {" "}
      </button>
      {" "}
      <nav data-recorrido="menu-nav" style={{ "position": "relative", "display": "flex", "flexDirection": "column", "gap": "4px" }}>
        {" "}
        {V["navPillOn"] ? (<>
          {" "}
          <span aria-hidden="true" style={{ "position": "absolute", "left": "0", "right": "0", "top": "0", "height": "44px", "borderRadius": "10px", "background": "var(--n-0)", "boxShadow": "0 1px 2px rgba(0,0,0,0.06),0 0 0 1px var(--n-200)", "transform": "translateY(" + S(V["navPillY"]) + ")", "transition": "transform var(--duration-fast) var(--ease-standard)", "pointerEvents": "none" }}></span>
          {" "}
        </>) : null}
        {" "}
        {L(V["navItems"]).map((_n_2, $index) => (
          <React.Fragment key={$index}>
            {" "}
            <button data-recorrido={_n_2?.["recorrido"]} onClick={_n_2?.["go"]} onMouseEnter={_n_2?.["onEnter"]} onMouseLeave={_n_2?.["onLeave"]} style={{ "--nav-hover": S(_n_2?.["hoverBg"]), "--nav-press": S(_n_2?.["pressBg"]), "position": "relative", "zIndex": "1", "height": "44px", "textAlign": "left", "border": "none", "background": "transparent", "color": S(_n_2?.["ink"]), "fontSize": "14px", "fontWeight": S(_n_2?.["weight"]), "padding": "0 8px", "borderRadius": "8px", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--nb,460ms) var(--ease-standard) var(--nbd,120ms),opacity var(--duration-fast) var(--ease-standard)" }} className="scp9 scpa">
              {" "}
              <span style={{ "display": "flex", "alignItems": "center", "gap": "8px", "minWidth": "0" }}>
                {" "}
                {_n_2?.["isTickets"] ? (<>
                  {" "}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={_n_2?.["iconColor"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "strokeDasharray": "130", "animation": S(_n_2?.["anim"]), "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--nt,620ms) var(--ne,cubic-bezier(0.22,1,0.36,1)) var(--nd,180ms)" }}>
                    <path d="M22 12h-6l-2 3h-4l-2-3H2"></path>
                    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  </svg>
                  {" "}
                </>) : null}
                {" "}
                {_n_2?.["isCats"] ? (<>
                  {" "}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={_n_2?.["iconColor"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "strokeDasharray": "130", "animation": S(_n_2?.["anim"]), "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--nt,620ms) var(--ne,cubic-bezier(0.22,1,0.36,1)) var(--nd,180ms)" }}>
                    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                    <path d="M7.5 7.5h.01"></path>
                  </svg>
                  {" "}
                </>) : null}
                {" "}
                {_n_2?.["isUsers"] ? (<>
                  {" "}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={_n_2?.["iconColor"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "strokeDasharray": "130", "animation": S(_n_2?.["anim"]), "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--nt,620ms) var(--ne,cubic-bezier(0.22,1,0.36,1)) var(--nd,180ms)" }}>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  {" "}
                </>) : null}
                {" "}
                {_n_2?.["isChat"] ? (<>
                  {" "}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={_n_2?.["iconColor"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "strokeDasharray": "130", "animation": S(_n_2?.["anim"]), "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--nt,620ms) var(--ne,cubic-bezier(0.22,1,0.36,1)) var(--nd,180ms)" }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <path d="M8 9h8"></path>
                    <path d="M8 13h5"></path>
                  </svg>
                  {" "}
                </>) : null}
                {" "}
                {_n_2?.["isPulso"] ? (<>
                  {" "}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={_n_2?.["pulseColor"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "strokeDasharray": "130", "animation": S(_n_2?.["anim"]), "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--nt,620ms) var(--ne,cubic-bezier(0.22,1,0.36,1)) var(--nd,180ms)" }}>
                    <path d="M2 12h3.5l2-6 3.5 12 2.5-8 1.8 4H22"></path>
                  </svg>
                  {" "}
                </>) : null}
                {" "}
                <span>
                  {T(_n_2?.["label"])}
                </span>
                {" "}
              </span>
              {" "}
              <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": S(_n_2?.["countColor"]) }}>
                {T(_n_2?.["count"])}
              </span>
              {" "}
            </button>
            {" "}
          </React.Fragment>
        ))}
        {" "}
      </nav>
      {" "}
      <div data-recorrido="bandeja" style={{ "background": "var(--n-0)", "borderRadius": "16px", "boxShadow": "0 1px 2px rgba(0,0,0,0.06),0 0 0 1px var(--n-200)", "padding": "16px", "display": "flex", "flexDirection": "column", "gap": "12px" }}>
        {" "}
        <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.12em", "display": "flex", "alignItems": "center", "gap": "12px" }}>
          <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
          {"EN TU BANDEJA"}
        </div>
        {" "}
        {V["vistaAdmin"] ? (<>
          {" "}
          <div role="group" aria-label="Qué tickets contar" style={{ "display": "flex", "gap": "2px", "padding": "3px", "background": "rgba(10,10,10,0.05)", "borderRadius": "8px" }}>
            {" "}
            {L(V["scopeOpts"]).map((_o_3, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <button onClick={_o_3?.["go"]} aria-pressed={_o_3?.["pressed"]} style={{ "flex": "1", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "6px", "height": "30px", "padding": "0 8px", "border": "none", "borderRadius": "6px", "background": S(_o_3?.["bg"]), "boxShadow": S(_o_3?.["shadow"]), "fontSize": "12px", "fontWeight": S(_o_3?.["weight"]), "color": "var(--n-900)", "cursor": "pointer", "whiteSpace": "nowrap", "transition": "background-color var(--duration-fast) var(--ease-standard),transform var(--duration-fast) var(--ease-standard)" }} className="scpb">
                  {T(_o_3?.["label"])}
                  <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
                    {T(_o_3?.["count"])}
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
        <div style={{ "display": "flex", "alignItems": "baseline", "gap": "6px" }}>
          {" "}
          <span style={{ "fontSize": "40px", "lineHeight": "1", "fontWeight": "800", "letterSpacing": "-0.04em", "color": "var(--n-900)" }}>
            {T(V["inboxTotal"])}
          </span>
          {" "}
          <span style={{ "fontSize": "12px", "color": "var(--n-600)" }}>
            {"tickets"}
          </span>
          {" "}
        </div>
        {" "}
        <div style={{ "display": "flex", "flexDirection": "column", "gap": "2px" }}>
          {" "}
          {L(V["inboxBreakdown"]).map((_b_4, $index) => (
            <React.Fragment key={$index}>
              {" "}
              <button onClick={_b_4?.["go"]} aria-label={_b_4?.["aria"]} title={_b_4?.["aria"]} style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": S(_b_4?.["bg"]), "border": S(_b_4?.["border"]), "borderRadius": "8px", "padding": "6px 8px", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scpc scpd">
                {" "}
                <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_b_4?.["dot"]), "flexShrink": "0" }}></span>
                {" "}
                <span style={{ "fontSize": "12px", "fontWeight": S(_b_4?.["weight"]), "color": "var(--n-600)", "minWidth": "0" }}>
                  {T(_b_4?.["label"])}
                </span>
                {" "}
                <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "12px", "color": S(_b_4?.["countColor"]) }}>
                  {T(_b_4?.["count"])}
                </span>
                {" "}
              </button>
              {" "}
            </React.Fragment>
          ))}
          {" "}
          {V["hasLate"] ? (<>
            {" "}
            <button onClick={V["onlyLate"]} title="Ver primero los tickets sin movimiento" style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": "var(--n-0)", "border": "1px solid var(--naranja)", "borderRadius": "8px", "padding": "6px 8px", "marginTop": "4px", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpe scpd">
              {" "}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--naranja))" }}>
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              {" "}
              <span style={{ "fontSize": "12px", "fontWeight": "500", "color": "var(--n-900)", "minWidth": "0" }}>
                {"Sin mover"}
              </span>
              {" "}
              <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "12px", "color": "var(--n-900)" }}>
                {T(V["lateCount"])}
              </span>
              {" "}
            </button>
            {" "}
          </>) : null}
          {" "}
          {V["hasNudged"] ? (<>
            {" "}
            <button onClick={V["onlyNudged"]} title="Los que el solicitante marcó como bloqueantes" style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": "var(--n-0)", "border": "1px solid var(--naranja)", "borderRadius": "8px", "padding": "6px 8px", "marginTop": "4px", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpe scpd">
              {" "}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--naranja))" }}>
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                <path d="M4 22v-7"></path>
              </svg>
              {" "}
              <span style={{ "fontSize": "12px", "fontWeight": "500", "color": "var(--n-900)", "minWidth": "0" }}>
                {"Marcados como bloqueantes"}
              </span>
              {" "}
              <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "12px", "color": "var(--n-900)" }}>
                {T(V["nudgedCount"])}
              </span>
              {" "}
            </button>
            {" "}
          </>) : null}
          {" "}
          <span style={{ "fontSize": "11px", "color": "var(--n-600)", "padding": "2px 8px 0" }}>
            {T(V["inboxHint"])}
          </span>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
      {V["showMisMetricas"] ? (<>
        {" "}
        <div style={{ "background": "var(--n-0)", "borderRadius": "16px", "boxShadow": "0 1px 2px rgba(0,0,0,0.06),0 0 0 1px var(--n-200)", "padding": "16px", "display": "flex", "flexDirection": "column", "gap": "10px" }}>
          {" "}
          <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.12em", "display": "flex", "alignItems": "center", "gap": "12px" }}>
            <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "flexShrink": "0" }}></span>
            {"CÓMO TE FUE"}
          </div>
          {" "}
          {L(V["misMetricas"]).map((_m_5, $index) => (
            <React.Fragment key={$index}>
              {" "}
              <div style={{ "display": "flex", "alignItems": "baseline", "gap": "8px" }}>
                {" "}
                <span style={{ "fontSize": "12px", "color": "var(--n-600)", "minWidth": "0" }}>
                  {T(_m_5?.["label"])}
                </span>
                {" "}
                <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "14px", "color": "var(--n-900)", "flexShrink": "0" }}>
                  {T(_m_5?.["valor"])}
                </span>
                {" "}
                <span style={{ "fontSize": "11px", "color": "var(--n-600)", "flexShrink": "0" }}>
                  {"promedio"}
                </span>
                {" "}
              </div>
              {" "}
            </React.Fragment>
          ))}
          {" "}
          {V["mmOverdue"] ? (<>
            {" "}
            <div style={{ "fontSize": "12px", "lineHeight": "1.43", "color": "var(--n-600)", "textWrap": "pretty" }}>
              {"Tu ticket abierto lleva más que tu promedio."}
            </div>
            {" "}
          </>) : null}
          {" "}
        </div>
        {" "}
      </>) : null}
      {" "}
      <div style={{ "marginTop": "auto", "background": "var(--n-0)", "borderRadius": "16px", "boxShadow": "0 1px 2px rgba(0,0,0,0.06),0 0 0 1px var(--n-200)", "padding": "12px", "display": "flex", "flexDirection": "column", "gap": "12px" }}>
        {" "}
        <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "padding": "0 4px" }}>
          {" "}
          <div style={{ "width": "32px", "height": "32px", "borderRadius": "9999px", "background": "var(--n-0)", "border": "1px solid " + S(V["meRing"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
            {T(V["meIni"])}
          </div>
          {" "}
          <div style={{ "minWidth": "0" }}>
            {" "}
            <div style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
              {T(V["meNombre"])}
            </div>
            {" "}
            <div style={{ "fontSize": "11px", "color": "var(--n-500)" }}>
              {T(V["meRol"])}
            </div>
            {" "}
          </div>
          {" "}
          <button data-recorrido="ayuda" onClick={V["onAyuda"]} aria-label="¿Cómo funciona? Recorrido guiado del sistema" title="¿Cómo funciona?" style={{ "marginLeft": "auto", "flexShrink": "0", "width": "32px", "height": "32px", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "background": "transparent", "border": "1px solid var(--n-200)", "borderRadius": "8px", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard),transform var(--duration-fast) var(--ease-standard)" }} className="scp4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </button>
          <button data-recorrido="tema" onClick={V["onTema"]} aria-label={V["temaLabel"]} title={V["temaLabel"]} style={{ "flexShrink": "0", "width": "32px", "height": "32px", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "background": "transparent", "border": "1px solid var(--n-200)", "borderRadius": "8px", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard),transform var(--duration-fast) var(--ease-standard)" }} className="scp4">
            {V["temaClaro"] ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            ) : null}
            {V["temaOscuro"] ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            ) : null}
            {V["temaAuto"] ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                <path d="M8 21h8"></path><path d="M12 17v4"></path>
              </svg>
            ) : null}
          </button>
          {" "}
        </div>
        {" "}
        <button onClick={V["onLogout"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scpf scp4">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <path d="m16 17 5-5-5-5"></path>
            <path d="M21 12H9"></path>
          </svg>
          {"Cerrar sesión"}
        </button>
        {" "}
      </div>
      {" "}
    </aside>
  );
}
