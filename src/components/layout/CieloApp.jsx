// Cielo dentro del sistema (decorativo). Sigue la hora (data-fase, ver FASES_CIELO):
// - Noche: luna creciente, estrellas y una estrella fugaz cada 5 min.
// - Día, amanecer y atardecer: sol con halo, nubes en dos capas (lejos y cerca), motas de
//   luz que flotan, una bandada de vez en cuando y ráfagas de aire.
// Qué se ve en cada fase y tema lo decide index.css ("Sistema vivo" y "Día con vida").
export default function CieloApp() {
  const nube = "M10 18a7 7 0 0 1 7-7a9 9 0 0 1 17-2a6 6 0 0 1 8 6a5 5 0 0 1-1 10H13a5 5 0 0 1-3-7z";
  const rayos = [];
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6, c = Math.cos(a), s = Math.sin(a);
    rayos.push(<line key={i} x1={(50 + 29 * c).toFixed(1)} y1={(50 + 29 * s).toFixed(1)} x2={(50 + 36 * c).toFixed(1)} y2={(50 + 36 * s).toFixed(1)}></line>);
  }
  return (
    <>
    <div aria-hidden="true" data-cielo-app="" data-no-print="">
      <div>
        <div data-estrellas="sistema"></div>
        <div data-fugaz=""></div>
        <div data-motas="app"></div>
        {/* astro arriba a la derecha: el sol (día) o la luna (noche), como en el login */}
        <div data-astro-app="">
          <svg data-sol="" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="app-sol-luz"><stop offset="0" style={{ "stopColor": "var(--sol-2)", "stopOpacity": "0.2" }}></stop><stop offset="1" style={{ "stopColor": "var(--sol-2)", "stopOpacity": "0" }}></stop></radialGradient>
              <radialGradient id="app-sol-halo"><stop offset="0.3" style={{ "stopColor": "var(--sol-2)", "stopOpacity": "0.4" }}></stop><stop offset="1" style={{ "stopColor": "var(--sol-2)", "stopOpacity": "0" }}></stop></radialGradient>
              <radialGradient id="app-sol-disco" cx="0.4" cy="0.38"><stop offset="0" style={{ "stopColor": "var(--sol-1)" }}></stop><stop offset="1" style={{ "stopColor": "var(--sol-2)" }}></stop></radialGradient>
            </defs>
            <circle cx="50" cy="50" r="130" fill="url(#app-sol-luz)"></circle>
            <circle cx="50" cy="50" r="50" fill="url(#app-sol-halo)"></circle>
            <g data-sol-rayos="" style={{ "stroke": "var(--sol-rayo)", "strokeWidth": "1.8", "strokeLinecap": "round", "opacity": "0.7" }}>{rayos}</g>
            <circle cx="50" cy="50" r="22" fill="url(#app-sol-disco)"></circle>
          </svg>
          <svg data-luna="" viewBox="0 0 100 100" style={{ "display": "none" }}>
            <defs>
              <mask id="app-luna-creciente"><rect width="100" height="100" fill="white"></rect><circle cx="63" cy="39" r="25" fill="black"></circle></mask>
              <radialGradient id="app-luna-halo"><stop offset="0.3" style={{ "stopColor": "var(--luna)", "stopOpacity": "0.22" }}></stop><stop offset="1" style={{ "stopColor": "var(--luna)", "stopOpacity": "0" }}></stop></radialGradient>
            </defs>
            <circle cx="50" cy="50" r="50" fill="url(#app-luna-halo)"></circle>
            <circle cx="50" cy="50" r="27" style={{ "fill": "var(--luna)" }} mask="url(#app-luna-creciente)"></circle>
          </svg>
        </div>
        <div data-nubes="">
          {/* capa lejana: chicas, tenues y lentas */}
          <svg data-nube-lejos="" viewBox="0 0 52 26" style={{ "top": "5vh", "width": "34px", "animationDuration": "300s", "animationDelay": "-230s" }}><path d={nube}></path></svg>
          <svg data-nube-lejos="" viewBox="0 0 52 26" style={{ "top": "19vh", "width": "28px", "animationDuration": "340s", "animationDelay": "-90s" }}><path d={nube}></path></svg>
          <svg data-nube-lejos="" viewBox="0 0 52 26" style={{ "top": "11vh", "width": "40px", "animationDuration": "260s", "animationDelay": "-170s" }}><path d={nube}></path></svg>
          {/* capa cercana: más grandes y un poco más rápidas (da profundidad) */}
          <svg viewBox="0 0 52 26" style={{ "top": "8vh", "width": "74px", "animationDuration": "180s", "animationDelay": "-60s" }}><path d={nube}></path></svg>
          <svg viewBox="0 0 52 26" style={{ "top": "24vh", "width": "58px", "animationDuration": "210s", "animationDelay": "-140s" }}><path d={nube}></path></svg>
          <svg viewBox="0 0 52 26" style={{ "top": "15vh", "width": "92px", "animationDuration": "240s", "animationDelay": "-10s" }}><path d={nube}></path></svg>
        </div>
        {/* bandada que cruza de vez en cuando (solo de día) */}
        <svg data-aves="" viewBox="0 0 120 44">
          <path d="M8 22q6-7 12 0q6-7 12 0"></path>
          <path d="M40 10q5-6 10 0q5-6 10 0"></path>
          <path d="M44 34q4-5 8 0q4-5 8 0"></path>
          <path d="M72 18q5-6 10 0q5-6 10 0"></path>
        </svg>
      </div>
    </div>
    {/* las ráfagas pasan por delante del contenido (duran un instante y no toman clics) */}
    <div aria-hidden="true" data-cielo-app="frente" data-no-print="">
      <div>
        <svg data-rafaga="" viewBox="0 0 280 60">
          <path d="M4 22C60 20 96 8 140 14S214 34 244 22c14-6 16-18 6-19c-9-1-11 9-3 11"></path>
          <path d="M30 38C84 36 128 28 176 34S236 46 268 38"></path>
          <path d="M60 50C100 48 140 44 186 48"></path>
        </svg>
        <svg data-rafaga="2" viewBox="0 0 280 60">
          <path d="M4 30C56 28 92 18 136 22S206 38 236 30c12-5 14-15 5-16c-8-1-10 8-3 9"></path>
          <path d="M34 44C86 42 126 36 170 40S230 50 262 44"></path>
        </svg>
      </div>
    </div>
    </>
  );
}
