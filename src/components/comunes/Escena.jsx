// Ilustración de los estados vacíos: la sierra con el sol (o la luna y estrellas de
// noche, según el tema) y un ícono que dice qué falta. Solo pinta: "icono" es fijo en
// cada lugar donde se usa (lupa, campana, chat o listo).
const ICONOS = {
  lupa: (<><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></>),
  campana: (<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></>),
  chat: (<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path></>),
  listo: (<path d="M20 6 9 17l-5-5"></path>)
};

export default function Escena({ icono, ancho }) {
  const rayos = [];
  for (let k = 0; k < 8; k++) {
    const a = k * Math.PI / 4;
    rayos.push(<line key={k} x1={118 + 11 * Math.cos(a)} y1={26 + 11 * Math.sin(a)} x2={118 + 15 * Math.cos(a)} y2={26 + 15 * Math.sin(a)}></line>);
  }
  return (
    <svg data-escena="" viewBox="0 0 160 96" aria-hidden="true" style={{ "width": ancho || "160px", "height": "auto", "display": "block", "margin": "0 auto 14px", "overflow": "visible" }}>
      <ellipse cx="80" cy="60" rx="76" ry="36" style={{ "fill": "var(--fondo-2)" }}></ellipse>
      <g data-escena-astro="">
        <g data-escena-sol="">
          <circle cx="118" cy="26" r="13" style={{ "fill": "var(--sol-2)", "opacity": "0.25" }}></circle>
          <g data-escena-rayos="" style={{ "stroke": "var(--sol-rayo)", "strokeWidth": "1.4", "strokeLinecap": "round" }}>{rayos}</g>
          <circle cx="118" cy="26" r="7.5" style={{ "fill": "var(--sol-2)" }}></circle>
        </g>
        <g data-escena-luna="">
          <path d="M122 16a10 10 0 1 0 6 17a8 8 0 1 1-6-17z" style={{ "fill": "var(--n-800)" }}></path>
          <circle data-escena-estrella="" cx="96" cy="14" r="1.3" style={{ "fill": "var(--n-700)" }}></circle>
          <circle data-escena-estrella="" cx="140" cy="44" r="1" style={{ "fill": "var(--n-700)", "animationDelay": "-0.7s" }}></circle>
          <circle data-escena-estrella="" cx="30" cy="30" r="1.1" style={{ "fill": "var(--n-700)", "animationDelay": "-1.1s" }}></circle>
        </g>
      </g>
      <g data-escena-sierra="">
        <polygon points="6,82 34,52 52,64 78,38 104,62 122,50 154,82" style={{ "fill": "var(--sierra)", "opacity": "0.16" }}></polygon>
        <polygon points="0,90 26,70 46,80 70,62 96,82 118,70 160,90" style={{ "fill": "var(--sierra)", "opacity": "0.34" }}></polygon>
      </g>
      <g data-escena-icono="">
        <circle cx="80" cy="74" r="15" style={{ "fill": "var(--n-0)", "stroke": "var(--n-200)" }}></circle>
        <g transform="translate(71 65) scale(0.75)" style={{ "fill": "none", "stroke": "var(--n-600)", "strokeWidth": "1.75", "strokeLinecap": "round", "strokeLinejoin": "round" }}>{ICONOS[icono] || ICONOS.lupa}</g>
      </g>
    </svg>
  );
}
