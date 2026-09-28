// Cielo dentro del sistema (decorativo). De noche: estrellas y una estrella fugaz cada
// 5 min; de día: mini nubes lejanas y una ráfaga de aire de vez en cuando.
// Qué se ve en cada tema lo decide index.css ("Sistema vivo").
export default function CieloApp() {
  const nube = "M10 18a7 7 0 0 1 7-7a9 9 0 0 1 17-2a6 6 0 0 1 8 6a5 5 0 0 1-1 10H13a5 5 0 0 1-3-7z";
  return (
    <>
    <div aria-hidden="true" data-cielo-app="" data-no-print="">
      <div>
        <div data-estrellas="sistema"></div>
        <div data-fugaz=""></div>
        <div data-nubes="">
          <svg viewBox="0 0 52 26" style={{ "top": "7vh", "width": "58px", "animationDuration": "210s", "animationDelay": "-60s" }}><path d={nube}></path></svg>
          <svg viewBox="0 0 52 26" style={{ "top": "15vh", "width": "40px", "animationDuration": "260s", "animationDelay": "-170s" }}><path d={nube}></path></svg>
          <svg viewBox="0 0 52 26" style={{ "top": "4vh", "width": "34px", "animationDuration": "300s", "animationDelay": "-230s" }}><path d={nube}></path></svg>
        </div>
      </div>
    </div>
    {/* la ráfaga pasa por delante del contenido (dura un instante y no toma clics) */}
    <div aria-hidden="true" data-cielo-app="frente" data-no-print="">
      <div>
        <svg data-rafaga="" viewBox="0 0 280 60">
          <path d="M4 22C60 20 96 8 140 14S214 34 244 22c14-6 16-18 6-19c-9-1-11 9-3 11"></path>
          <path d="M30 38C84 36 128 28 176 34S236 46 268 38"></path>
          <path d="M60 50C100 48 140 44 186 48"></path>
        </svg>
      </div>
    </div>
    </>
  );
}
