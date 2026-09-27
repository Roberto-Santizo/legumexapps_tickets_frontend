// Pantalla de espera para operaciones largas.
// V: valores de la lógica (src/logic/valores).
import { T } from '../../utils/runtime.js';

export default function CargaPesada({ V }) {
  return (
    <>
      <div key="heavywait" role="status" aria-live="polite" style={{ "position": "fixed", "inset": "0", "zIndex": "80", "background": "rgba(255,255,255,0.86)", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "gap": "18px", "animation": "overlayIn var(--duration-base) var(--ease-standard) both" }}>
        {" "}
        <span style={{ "position": "relative", "height": "34px", "width": "104px", "display": "block" }}>
          {" "}
          <img src="/marca/legumex-isotipo.png" alt="" style={{ "position": "absolute", "inset": "0", "height": "34px", "width": "104px", "objectFit": "contain", "filter": "grayscale(1)", "opacity": "0.25" }} />
          {" "}
          <img src="/marca/legumex-isotipo.png" ref={V["heavyLogoRef"]} alt="" style={{ "position": "absolute", "inset": "0", "height": "34px", "width": "104px", "objectFit": "contain" }} />
          {" "}
        </span>
        {" "}
        <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.08em", "textTransform": "uppercase" }}>
          {T(V["heavyMsg"])}
        </div>
        {" "}
        <div style={{ "width": "132px", "height": "2px", "borderRadius": "9999px", "background": "var(--n-200)", "overflow": "hidden" }}>
          <span style={{ "display": "block", "height": "100%", "background": "var(--marca-2)", "animation": "progressBar 900ms linear both" }}></span>
        </div>
      </div>
    </>
  );
}
