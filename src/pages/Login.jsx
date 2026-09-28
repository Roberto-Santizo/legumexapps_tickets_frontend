// Pantalla de ingreso (animación de telón, sierra y formulario).
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../utils/runtime.js';

export default function Login({ V }) {
  return (
    <>
      <div data-login="" onMouseMove={V["onLoginMove"]} onMouseLeave={V["onLoginLeave"]} style={{ "position": "relative", "minHeight": "100vh", "display": "flex", "flexWrap": "wrap", "alignItems": "center", "background": "var(--fondo)", "overflow": "hidden", "paddingBottom": "clamp(110px,26vh,260px)" }}>
        {" "}
        <div aria-hidden="true" data-curtain="" style={{ "position": "fixed", "inset": "0", "zIndex": "6", "pointerEvents": "none", "animation": "curtainDown 1500ms cubic-bezier(0.76,0,0.24,1) 1000ms both" }}>
          {" "}
          <div style={{ "position": "absolute", "inset": "0", "background": "var(--marca-fondo)" }}></div>
          {" "}
          <svg viewBox="0 0 1280 120" preserveAspectRatio="none" style={{ "position": "absolute", "left": "0", "right": "0", "top": "calc(100% - 1px)", "width": "100%", "height": "clamp(80px,14vh,140px)", "display": "block" }}>
            <polygon points="0,0 1280,0 1280,60 1100,25 900,58 680,10 460,55 250,20 0,60" fill="var(--marca-fondo)"></polygon>
          </svg>
          {" "}
          <div style={{ "position": "absolute", "inset": "0", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "gap": "22px" }}>
            {" "}
            <img src="/marca/legumex-logo.png" alt="" style={{ "height": "clamp(72px,10vw,120px)", "width": "auto", "filter": "brightness(0) invert(1)", "animation": "curtainLogo 1000ms cubic-bezier(0.22,1,0.36,1) both" }} />
            {" "}
            <div style={{ "width": "120px", "height": "1px", "background": "rgba(var(--sf-rgb),0.25)", "overflow": "hidden" }}>
              <div style={{ "width": "100%", "height": "100%", "background": "var(--login-sol)", "transformOrigin": "left", "animation": "lineGrow 900ms cubic-bezier(0.65,0,0.35,1) 150ms both" }}></div>
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div aria-hidden="true" data-sierra="" style={{ "position": "fixed", "inset": "0", "pointerEvents": "none", "overflow": "hidden" }}>
          {" "}
          {/* Cielo: de día un celeste suave con motas de luz; de noche estrellas que titilan */}
          <div data-cielo=""></div>
          <div data-estrellas="login"></div>
          <div data-motas=""></div>
          {/* Cada 5 minutos: de día cruza una bandada, de noche una estrella fugaz */}
          <svg data-aves="" viewBox="0 0 120 44" aria-hidden="true">
            <path d="M8 22q6-7 12 0q6-7 12 0"></path>
            <path d="M40 10q5-6 10 0q5-6 10 0"></path>
            <path d="M44 34q4-5 8 0q4-5 8 0"></path>
            <path d="M72 18q5-6 10 0q5-6 10 0"></path>
          </svg>
          <div data-fugaz=""></div>
          {" "}
          {/* Astro arriba, en el mismo lugar de día y de noche (posición en index.css): el sol
              con rayos que giran lento; en modo oscuro se oculta y aparece la luna */}
          <div data-astro="" style={{ "translate": "calc(var(--mx,0) * -6px) calc(var(--my,0) * -6px)", "transition": "translate 1200ms cubic-bezier(0.22,1,0.36,1)", "animation": "sunRise 2400ms cubic-bezier(0.22,1,0.36,1) 1700ms both,sunBreath 9s ease-in-out 4200ms infinite" }}>
            <svg data-sol="" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <radialGradient id="sol-halo"><stop offset="0.3" style={{ "stopColor": "var(--sol-2)", "stopOpacity": "0.42" }}></stop><stop offset="1" style={{ "stopColor": "var(--sol-2)", "stopOpacity": "0" }}></stop></radialGradient>
                <radialGradient id="sol-disco" cx="0.4" cy="0.38"><stop offset="0" style={{ "stopColor": "var(--sol-1)" }}></stop><stop offset="1" style={{ "stopColor": "var(--sol-2)" }}></stop></radialGradient>
              </defs>
              <radialGradient id="sol-luz"><stop offset="0" style={{ "stopColor": "var(--sol-2)", "stopOpacity": "0.22" }}></stop><stop offset="1" style={{ "stopColor": "var(--sol-2)", "stopOpacity": "0" }}></stop></radialGradient>
              {/* luz cálida amplia alrededor del sol (como el halo de la luna, pero de día) */}
              <circle cx="50" cy="50" r="190" fill="url(#sol-luz)"></circle>
              <circle cx="50" cy="50" r="50" fill="url(#sol-halo)"></circle>
              <g data-sol-rayos="" style={{ "stroke": "var(--sol-rayo)", "strokeWidth": "1.6", "strokeLinecap": "round", "opacity": "0.7" }}>
                <line x1="79.0" y1="50.0" x2="86.0" y2="50.0"></line><line x1="76.8" y1="61.1" x2="83.3" y2="63.8"></line><line x1="70.5" y1="70.5" x2="75.5" y2="75.5"></line><line x1="61.1" y1="76.8" x2="63.8" y2="83.3"></line><line x1="50.0" y1="79.0" x2="50.0" y2="86.0"></line><line x1="38.9" y1="76.8" x2="36.2" y2="83.3"></line><line x1="29.5" y1="70.5" x2="24.5" y2="75.5"></line><line x1="23.2" y1="61.1" x2="16.7" y2="63.8"></line><line x1="21.0" y1="50.0" x2="14.0" y2="50.0"></line><line x1="23.2" y1="38.9" x2="16.7" y2="36.2"></line><line x1="29.5" y1="29.5" x2="24.5" y2="24.5"></line><line x1="38.9" y1="23.2" x2="36.2" y2="16.7"></line><line x1="50.0" y1="21.0" x2="50.0" y2="14.0"></line><line x1="61.1" y1="23.2" x2="63.8" y2="16.7"></line><line x1="70.5" y1="29.5" x2="75.5" y2="24.5"></line><line x1="76.8" y1="38.9" x2="83.3" y2="36.2"></line>
              </g>
              <circle cx="50" cy="50" r="22" fill="url(#sol-disco)"></circle>
            </svg>
            {/* Luna creciente (solo en modo oscuro): halo detrás y el creciente recortado encima */}
            <svg data-luna="" viewBox="0 0 100 100" aria-hidden="true" style={{ "position": "absolute", "inset": "0", "width": "100%", "height": "100%", "display": "none", "overflow": "visible" }}>
              <defs>
                <mask id="luna-creciente"><rect width="100" height="100" fill="#fff"></rect><circle cx="63" cy="39" r="25" fill="#000"></circle></mask>
                <radialGradient id="luna-halo"><stop offset="0.3" stopColor="#f1edd8" stopOpacity="0.2"></stop><stop offset="1" stopColor="#f1edd8" stopOpacity="0"></stop></radialGradient>
              </defs>
              <circle cx="50" cy="50" r="50" fill="url(#luna-halo)"></circle>
              <circle cx="50" cy="50" r="29" fill="#f1edd8" mask="url(#luna-creciente)"></circle>
            </svg>
          </div>
          {" "}
          <div style={{ "position": "absolute", "left": "0", "bottom": "calc(clamp(170px,38vh,360px) - 40px)", "width": "200%", "height": "90px", "background": "radial-gradient(ellipse 18% 50% at 20% 50%,rgba(var(--sf-rgb),0.75),rgba(var(--sf-rgb),0) 70%),radial-gradient(ellipse 22% 45% at 65% 55%,rgba(var(--sf-rgb),0.6),rgba(var(--sf-rgb),0) 70%)", "animation": "sierraDrift 70s linear infinite", "zIndex": "1" }}></div>
          {" "}
          <div style={{ "position": "absolute", "left": "0", "top": "8%", "width": "200%", "height": "38%", "translate": "calc(var(--mx,0) * -10px) 0", "transition": "translate 1200ms cubic-bezier(0.22,1,0.36,1)", "background": "radial-gradient(ellipse 9% 22% at 12% 40%,rgba(var(--sf-rgb),0.9),rgba(var(--sf-rgb),0) 70%),radial-gradient(ellipse 13% 18% at 38% 62%,rgba(var(--sf-rgb),0.7),rgba(var(--sf-rgb),0) 70%),radial-gradient(ellipse 8% 20% at 71% 30%,rgba(var(--sf-rgb),0.85),rgba(var(--sf-rgb),0) 70%),radial-gradient(ellipse 11% 16% at 90% 58%,rgba(var(--sf-rgb),0.65),rgba(var(--sf-rgb),0) 70%)", "animation": "chartFade 1600ms var(--ease-standard) 1700ms both,sierraDrift 140s linear 1700ms infinite" }}></div>
          {" "}
        </div>
        {" "}
        <div aria-hidden="true" data-sierra="" data-login-sierra="" style={{ "position": "fixed", "left": "0", "right": "0", "bottom": "0", "height": "clamp(170px,38vh,360px)", "pointerEvents": "none" }}>
          {" "}
          <div style={{ "position": "absolute", "inset": "-34% -48px -12px -48px", "overflow": "hidden", "translate": "calc(var(--mx,0) * -4px) calc(var(--my,0) * -1px)", "transition": "translate 900ms cubic-bezier(0.22,1,0.36,1)", "animation": "sierraRise 1400ms cubic-bezier(0.22,1,0.36,1) 1500ms both" }}>
            {" "}
            <svg viewBox="0 0 2560 240" preserveAspectRatio="none" style={{ "position": "absolute", "top": "0", "left": "0", "width": "200%", "height": "100%", "display": "block", "animation": "sierraDrift 200s linear infinite reverse" }}>
              <polygon points="0,240 0,90 140,55 300,85 430,30 600,70 760,20 920,65 1080,35 1280,90 1420,55 1580,85 1710,30 1880,70 2040,20 2200,65 2360,35 2560,90 2560,240" fill="var(--sierra)" fillOpacity="0.05"></polygon>
              <linearGradient id="prof-1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style={{ "stopColor": "rgb(var(--niebla-rgb))", "stopOpacity": "0.5" }}></stop><stop offset="0.55" style={{ "stopColor": "rgb(var(--niebla-rgb))", "stopOpacity": "0" }}></stop></linearGradient><polygon points="0,240 0,90 140,55 300,85 430,30 600,70 760,20 920,65 1080,35 1280,90 1420,55 1580,85 1710,30 1880,70 2040,20 2200,65 2360,35 2560,90 2560,240" fill="url(#prof-1)"></polygon>
            </svg>
            {" "}
          </div>
          {" "}
          <div style={{ "position": "absolute", "inset": "0 -48px -12px -48px", "overflow": "hidden", "translate": "calc(var(--mx,0) * -8px) calc(var(--my,0) * -2px)", "transition": "translate 900ms cubic-bezier(0.22,1,0.36,1)", "animation": "sierraRise 1200ms cubic-bezier(0.22,1,0.36,1) 1500ms both" }}>
            {" "}
            <svg viewBox="0 0 2560 240" preserveAspectRatio="none" style={{ "position": "absolute", "top": "0", "left": "0", "width": "200%", "height": "100%", "display": "block", "animation": "sierraDrift 120s linear infinite" }}>
              <polygon points="0,240 0,60 170,10 340,50 520,0 700,45 870,4 1050,40 1190,12 1280,60 1280,60 1450,10 1620,50 1800,0 1980,45 2150,4 2330,40 2470,12 2560,60 2560,240" fill="var(--sierra)" fillOpacity="0.10"></polygon>
              <linearGradient id="prof-2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style={{ "stopColor": "rgb(var(--niebla-rgb))", "stopOpacity": "0.5" }}></stop><stop offset="0.55" style={{ "stopColor": "rgb(var(--niebla-rgb))", "stopOpacity": "0" }}></stop></linearGradient><polygon points="0,240 0,60 170,10 340,50 520,0 700,45 870,4 1050,40 1190,12 1280,60 1280,60 1450,10 1620,50 1800,0 1980,45 2150,4 2330,40 2470,12 2560,60 2560,240" fill="url(#prof-2)"></polygon>
              <clipPath id="crestas-2"><polygon points="0,240 0,60 170,10 340,50 520,0 700,45 870,4 1050,40 1190,12 1280,60 1280,60 1450,10 1620,50 1800,0 1980,45 2150,4 2330,40 2470,12 2560,60 2560,240"></polygon></clipPath>
              <linearGradient id="luz-crestas-2"><stop offset="0" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0" }}></stop><stop offset="0.4" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0.35" }}></stop><stop offset="0.5" style={{ "stopColor": "var(--brillo-sierra)" }}></stop><stop offset="0.6" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0.35" }}></stop><stop offset="1" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0" }}></stop></linearGradient><g clipPath="url(#crestas-2)"><rect data-brillo-sierra="" x="0" y="0" width="220" height="240" fill="url(#luz-crestas-2)" style={{ "animationDelay": "3.9s" }}></rect></g>
            </svg>
            {" "}
          </div>
          {" "}
          <div aria-hidden="true" data-niebla="1" style={{ "bottom": "46%", "height": "40%" }}></div>
          <div style={{ "position": "absolute", "inset": "0 -48px -12px -48px", "overflow": "hidden", "translate": "calc(var(--mx,0) * -16px) calc(var(--my,0) * -4px)", "transition": "translate 900ms cubic-bezier(0.22,1,0.36,1)", "animation": "sierraRise 1200ms cubic-bezier(0.22,1,0.36,1) 1620ms both" }}>
            {" "}
            <svg viewBox="0 0 2560 240" preserveAspectRatio="none" style={{ "position": "absolute", "top": "0", "left": "0", "width": "200%", "height": "100%", "display": "block", "animation": "sierraDrift 80s linear infinite reverse" }}>
              <polygon points="0,240 0,120 210,75 400,110 610,60 830,115 1020,80 1280,120 1280,120 1490,75 1680,110 1890,60 2110,115 2300,80 2560,120 2560,240" fill="var(--sierra)" fillOpacity="0.35"></polygon>
              <linearGradient id="prof-3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style={{ "stopColor": "rgb(var(--niebla-rgb))", "stopOpacity": "0.5" }}></stop><stop offset="0.55" style={{ "stopColor": "rgb(var(--niebla-rgb))", "stopOpacity": "0" }}></stop></linearGradient><polygon points="0,240 0,120 210,75 400,110 610,60 830,115 1020,80 1280,120 1280,120 1490,75 1680,110 1890,60 2110,115 2300,80 2560,120 2560,240" fill="url(#prof-3)"></polygon>
              <clipPath id="crestas-3"><polygon points="0,240 0,120 210,75 400,110 610,60 830,115 1020,80 1280,120 1280,120 1490,75 1680,110 1890,60 2110,115 2300,80 2560,120 2560,240"></polygon></clipPath>
              <linearGradient id="luz-crestas-3"><stop offset="0" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0" }}></stop><stop offset="0.4" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0.35" }}></stop><stop offset="0.5" style={{ "stopColor": "var(--brillo-sierra)" }}></stop><stop offset="0.6" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0.35" }}></stop><stop offset="1" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0" }}></stop></linearGradient><g clipPath="url(#crestas-3)"><rect data-brillo-sierra="" x="0" y="0" width="220" height="240" fill="url(#luz-crestas-3)" style={{ "animationDelay": "3.75s" }}></rect></g>
            </svg>
            {" "}
          </div>
          {" "}
          <div aria-hidden="true" data-niebla="2" style={{ "bottom": "30%", "height": "34%" }}></div>
          <div style={{ "position": "absolute", "inset": "0 -48px -12px -48px", "overflow": "hidden", "translate": "calc(var(--mx,0) * -28px) calc(var(--my,0) * -7px)", "transition": "translate 900ms cubic-bezier(0.22,1,0.36,1)", "animation": "sierraRise 1200ms cubic-bezier(0.22,1,0.36,1) 1740ms both" }}>
            {" "}
            <svg viewBox="0 0 2560 240" preserveAspectRatio="none" style={{ "position": "absolute", "top": "0", "left": "0", "width": "200%", "height": "100%", "display": "block", "animation": "sierraDrift 52s linear infinite" }}>
              <polygon points="0,240 0,180 250,140 460,175 680,130 900,172 1100,145 1280,180 1280,180 1530,140 1740,175 1960,130 2180,172 2380,145 2560,180 2560,240" fill="var(--marca-fondo)" fillOpacity="1"></polygon>
              <linearGradient id="prof-4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style={{ "stopColor": "rgb(var(--niebla-rgb))", "stopOpacity": "0.5" }}></stop><stop offset="0.55" style={{ "stopColor": "rgb(var(--niebla-rgb))", "stopOpacity": "0" }}></stop></linearGradient><polygon points="0,240 0,180 250,140 460,175 680,130 900,172 1100,145 1280,180 1280,180 1530,140 1740,175 1960,130 2180,172 2380,145 2560,180 2560,240" fill="url(#prof-4)"></polygon>
              <clipPath id="crestas-4"><polygon points="0,240 0,180 250,140 460,175 680,130 900,172 1100,145 1280,180 1280,180 1530,140 1740,175 1960,130 2180,172 2380,145 2560,180 2560,240"></polygon></clipPath>
              <linearGradient id="luz-crestas-4"><stop offset="0" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0" }}></stop><stop offset="0.4" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0.35" }}></stop><stop offset="0.5" style={{ "stopColor": "var(--brillo-sierra)" }}></stop><stop offset="0.6" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0.35" }}></stop><stop offset="1" style={{ "stopColor": "var(--brillo-sierra)", "stopOpacity": "0" }}></stop></linearGradient><g clipPath="url(#crestas-4)"><rect data-brillo-sierra="" x="0" y="0" width="220" height="240" fill="url(#luz-crestas-4)" style={{ "animationDelay": "3.6s" }}></rect></g>
            </svg>
            {" "}
          </div>
        </div>
        {" "}
        <div style={{ "position": "fixed", "zIndex": "1", "left": "clamp(24px,5vw,72px)", "right": "clamp(24px,5vw,72px)", "bottom": "max(16px,2.4vh)", "display": "flex", "justifyContent": "space-between", "gap": "16px", "flexWrap": "wrap", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.1em", "color": "var(--sobre-marca)", "animation": "chartFade 800ms var(--ease-standard) 2400ms both" }}>
          <span>
            {"FROM GUATEMALA TO THE WORLD"}
          </span>
          <span style={{ "color": "var(--login-linea)" }}>
            {"GROWING QUALITY · DELIVERING TRUST"}
          </span>
        </div>
        {" "}
        <div data-login-copy="" style={{ "position": "relative", "zIndex": "2", "flex": "1 1 480px", "padding": "clamp(20px,5vh,48px) clamp(24px,5vw,72px)", "display": "flex", "flexDirection": "column" }}>
          {" "}
          <span style={{ "position": "relative", "alignSelf": "flex-start", "display": "inline-block", "lineHeight": "0", "animation": "chartFade 600ms var(--ease-standard) 1500ms both" }}>
            <img src="/marca/legumex-logo.png" alt="Agroindustria Legumex" style={{ "height": "clamp(44px,8vh,72px)", "width": "auto" }} />
            <span aria-hidden="true" data-brillo-logo="" style={{ "--logo": "url(/marca/legumex-logo.png)" }}></span>
          </span>
          {" "}
          <div style={{ "paddingTop": "clamp(20px,7vh,64px)" }}>
            {" "}
            <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.12em", "color": "var(--n-600)", "display": "flex", "alignItems": "center", "gap": "12px", "animation": "dropIn 500ms var(--ease-standard) 1620ms both" }}>
              <span aria-hidden="true" style={{ "width": "28px", "height": "1px", "background": "var(--n-400)", "transformOrigin": "left", "animation": "lineGrow 700ms var(--ease-standard) 1620ms both" }}></span>
              {"EL TEJAR, CHIMALTENANGO · 14°38′N 90°47′W"}
            </div>
            {" "}
            <h2 style={{ "fontSize": "clamp(36px,min(6vw,9vh),76px)", "lineHeight": "0.98", "fontWeight": "800", "letterSpacing": "-0.045em", "color": "var(--marca)", "margin": "22px 0 0", "display": "flex", "flexDirection": "column" }}>
              {" "}
              <span style={{ "display": "block", "overflow": "hidden", "paddingBottom": "0.06em" }}>
                <span style={{ "display": "block", "animation": "lineUp 900ms cubic-bezier(0.22,1,0.36,1) 1720ms both" }}>
                  <span data-brillo="" style={{ "--c": "var(--marca)" }}>{"Tickets"}</span>
                </span>
              </span>
              {" "}
              <span style={{ "display": "block", "overflow": "hidden", "paddingBottom": "0.06em" }}>
                <span style={{ "display": "block", "color": "var(--login-hoja)", "animation": "lineUp 900ms cubic-bezier(0.22,1,0.36,1) 1840ms both" }}>
                  <span data-brillo="" style={{ "--c": "var(--login-hoja)", "animationDelay": "3.45s" }}>{"TIC"}</span>
                </span>
              </span>
              {" "}
            </h2>
            {" "}
            <p style={{ "fontSize": "16px", "lineHeight": "1.55", "color": "var(--n-700)", "maxWidth": "440px", "margin": "22px 0 0", "textWrap": "pretty", "animation": "dropIn 600ms var(--ease-standard) 1800ms both" }}>
              {"Reporta lo que te frena y síguelo hasta que quede resuelto. Del campo a la planta, el mismo soporte."}
            </p>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ "position": "relative", "zIndex": "2", "flex": "1 1 420px", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "clamp(16px,4vh,48px) 24px" }}>
          {" "}
          <div data-login-tarjeta="" style={{ "width": "100%", "maxWidth": "420px", "background": "var(--n-0)", "borderRadius": "16px", "padding": "clamp(20px,4vh,32px)", "boxShadow": "0 1px 2px rgba(0,0,0,0.06),0 0 0 1px var(--n-200),0 32px 64px -32px rgba(11,42,30,0.28)", "animation": "cardRise 900ms cubic-bezier(0.22,1,0.36,1) 1880ms both" }}>
            {" "}
            {V["loginTitleIdle"] ? (<>
              <h1 style={{ "fontSize": "clamp(28px,5vh,36px)", "lineHeight": "1.05", "fontWeight": "700", "letterSpacing": "-0.03em", "margin": "0 0 8px", "color": "var(--marca)" }}>
                {"Iniciar sesión"}
              </h1>
            </>) : null}
            {" "}
            {V["loginOk"] ? (<>
              <h1 aria-live="polite" style={{ "fontSize": "clamp(28px,5vh,36px)", "lineHeight": "1.05", "fontWeight": "700", "letterSpacing": "-0.03em", "margin": "0 0 8px", "color": "var(--verde-oscuro)", "display": "flex", "flexWrap": "wrap" }}>
                {L(V["okTitle"]).map((_l_0, $index) => (
                  <React.Fragment key={$index}>
                    <span style={{ "display": "inline-block", "whiteSpace": "pre", "animation": S(_l_0?.["anim"]) }}>
                      {T(_l_0?.["ch"])}
                    </span>
                  </React.Fragment>
                ))}
              </h1>
            </>) : null}
            {" "}
            <p style={{ "fontSize": "16px", "lineHeight": "1.5", "color": "var(--n-600)", "margin": "0 0 clamp(16px,3vh,28px)" }}>
              {T(V["loginHello"])}{". Entra con tu correo institucional."}
            </p>
            {" "}
            {V["hasLoginError"] ? (<>
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
                    {"No pudimos validar tus datos"}
                  </div>
                  {" "}
                  <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-800)" }}>
                    {T(V["loginError"])}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </>) : null}
            {" "}
            <div style={{ "display": "flex", "flexDirection": "column", "gap": "20px", "animation": S(V["loginShake"]) }}>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                {" "}
                <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                  {"Correo institucional"}
                </label>
                {" "}
                <input type="email" inputMode="email" autoCapitalize="none" autoCorrect="off" spellCheck="false" autoComplete="username" value={(V["email"] ?? "")} onChange={V["onEmail"]} placeholder={V["loginPh"]} style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "transition": "border-color 300ms ease,box-shadow 300ms ease", "boxShadow": S(V["fieldRing"]), "border": "1px solid " + S(V["fieldBorder"]), "borderRadius": "6px", "padding": "10px 12px", "fontSize": "14px", "outline": "none" }} />
                {" "}
              </div>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                {" "}
                <label style={{ "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                  {"Contraseña"}
                </label>
                {" "}
                <div style={{ "position": "relative" }}>
                  {" "}
                  <input type={V["pwdType"]} value={(V["password"] ?? "")} onChange={V["onPassword"]} onKeyDown={V["onPwdKey"]} enterKeyHint="go" placeholder="••••••••" autoComplete="current-password" style={{ "width": "100%", "background": "var(--n-0)", "color": "var(--n-900)", "transition": "border-color 300ms ease,box-shadow 300ms ease", "boxShadow": S(V["fieldRing"]), "border": "1px solid " + S(V["fieldBorder"]), "borderRadius": "6px", "padding": "10px 46px 10px 12px", "fontSize": "14px", "outline": "none" }} />
                  {" "}
                  <button type="button" onClick={V["onTogglePwd"]} aria-label={V["pwdLabel"]} aria-pressed={V["pwdShown"]} title={V["pwdLabel"]} style={{ "position": "absolute", "right": "4px", "top": "50%", "transform": "translateY(-50%)", "width": "36px", "height": "36px", "border": "none", "background": "transparent", "borderRadius": "6px", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "color": "var(--n-600)", "transition": "background-color 150ms ease,color 150ms ease" }} className="scp0">
                    {" "}
                    {V["pwdHidden"] ? (<>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </>) : null}
                    {" "}
                    {V["pwdShown"] ? (<>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="m2 2 20 20"></path>
                      </svg>
                    </>) : null}
                    {" "}
                  </button>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <button onClick={V["onLogin"]} aria-busy={V["loginBusy"]} style={{ "width": "100%", "minHeight": "44px", "pointerEvents": S(V["loginBtnPe"]), "animation": S(V["loginBtnAnim"]), "background": S(V["loginBtnBg"]), "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "12px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)" }} className="scp1 scp2">
                {V["loginIdle"] ? (<>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapLogin"]), "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)" }}>
                    <path d="m10 17 5-5-5-5"></path>
                    <path d="M15 12H3"></path>
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  </svg>
                  {"Iniciar sesión"}
                </>) : null}
                {" "}
                {V["loginChecking"] ? (<>
                  <span aria-hidden="true" style={{ "position": "relative", "display": "inline-block", "height": "16px", "flexShrink": "0" }}>
                    <img src="/marca/legumex-isotipo.png" alt="" style={{ "height": "16px", "width": "auto", "display": "block", "opacity": "0.28", "filter": "brightness(0) invert(1)" }} />
                    <img src="/marca/legumex-isotipo.png" alt="" style={{ "position": "absolute", "left": "0", "top": "0", "height": "16px", "width": "auto", "display": "block", "animation": "logoLoop 1100ms cubic-bezier(0.65,0,0.35,1) infinite", "filter": "brightness(0) invert(1)" }} />
                  </span>
                  {"Verificando…"}
                </>) : null}
                {" "}
                {V["loginOk"] ? (<>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                    <path d="M20 6 9 17l-5-5" style={{ "strokeDasharray": "26", "animation": "checkDraw 420ms cubic-bezier(0.22,1,0.36,1) both" }}></path>
                  </svg>
                  <span style={{ "display": "inline-flex" }}>
                    {L(V["okBtn"]).map((_l_1, $index) => (
                      <React.Fragment key={$index}>
                        <span style={{ "display": "inline-block", "whiteSpace": "pre", "animation": S(_l_1?.["anim"]) }}>
                          {T(_l_1?.["ch"])}
                        </span>
                      </React.Fragment>
                    ))}
                  </span>
                </>) : null}
              </button>
              {" "}
              {V["demoMode"] ? (<>
                <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "8px 12px", "flexWrap": "wrap", "borderTop": "1px solid var(--n-200)", "paddingTop": "16px" }}>
                  {" "}
                  <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "minWidth": "0", "whiteSpace": "nowrap" }}>
                    {"DEMO · cualquier clave"}
                  </span>
                  {" "}
                  <button onClick={V["onFillDemo"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "flexShrink": "0", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp3 scp4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,rotate(0deg) scale(1)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"></path>
                      <path d="M8.5 2h7"></path>
                      <path d="M7 16h10"></path>
                    </svg>
                    {"Usar datos de prueba"}
                  </button>
                  {" "}
                </div>
              </>) : null}
              {" "}
            </div>
            {" "}
          </div>
        </div>
      </div>
    </>
  );
}
