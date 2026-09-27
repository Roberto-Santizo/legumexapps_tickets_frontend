// Fondo decorativo de la sierra (tres capas animadas).
// V: valores de la lógica (src/logic/valores).

export default function FondoSierra({ V }) {
  return (
    <div aria-hidden="true" data-no-print="" data-sierra="" style={{ "position": "fixed", "left": "0", "right": "0", "bottom": "0", "height": "clamp(240px,42vh,420px)", "pointerEvents": "none", "zIndex": "0" }}>
      {" "}
      <div style={{ "position": "absolute", "inset": "0", "overflow": "hidden", "animation": "sierraRise 1200ms cubic-bezier(0.22,1,0.36,1) 0ms both" }}>
        {" "}
        <svg viewBox="0 0 2560 240" preserveAspectRatio="none" style={{ "position": "absolute", "top": "0", "left": "0", "width": "200%", "height": "100%", "display": "block", "animation": "sierraDrift 120s linear infinite" }}>
          <polygon points="0,240 0,60 170,10 340,50 520,0 700,45 870,4 1050,40 1190,12 1280,60 1280,60 1450,10 1620,50 1800,0 1980,45 2150,4 2330,40 2470,12 2560,60 2560,240" fill="var(--marca)" fillOpacity="0.08"></polygon>
        </svg>
        {" "}
      </div>
      {" "}
      <div style={{ "position": "absolute", "inset": "0", "overflow": "hidden", "animation": "sierraRise 1200ms cubic-bezier(0.22,1,0.36,1) 120ms both" }}>
        {" "}
        <svg viewBox="0 0 2560 240" preserveAspectRatio="none" style={{ "position": "absolute", "top": "0", "left": "0", "width": "200%", "height": "100%", "display": "block", "animation": "sierraDrift 80s linear infinite reverse" }}>
          <polygon points="0,240 0,120 210,75 400,110 610,60 830,115 1020,80 1280,120 1280,120 1490,75 1680,110 1890,60 2110,115 2300,80 2560,120 2560,240" fill="var(--marca)" fillOpacity="0.22"></polygon>
        </svg>
        {" "}
      </div>
      {" "}
      <div style={{ "position": "absolute", "inset": "0", "overflow": "hidden", "animation": "sierraRise 1200ms cubic-bezier(0.22,1,0.36,1) 240ms both" }}>
        {" "}
        <svg viewBox="0 0 2560 240" preserveAspectRatio="none" style={{ "position": "absolute", "top": "0", "left": "0", "width": "200%", "height": "100%", "display": "block", "animation": "sierraDrift 52s linear infinite" }}>
          <polygon points="0,240 0,180 250,140 460,175 680,130 900,172 1100,145 1280,180 1280,180 1530,140 1740,175 1960,130 2180,172 2380,145 2560,180 2560,240" fill="var(--marca)" fillOpacity="0.42"></polygon>
        </svg>
        {" "}
      </div>
    </div>
  );
}
