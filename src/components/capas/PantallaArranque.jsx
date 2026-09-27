// Logo de arranque al abrir la app.
// V: valores de la lógica (src/logic/valores).
import { S } from '../../utils/runtime.js';

export default function PantallaArranque({ V }) {
  return (
    <>
      <div aria-hidden="true" style={{ "position": "fixed", "inset": "0", "zIndex": "90", "background": "var(--n-0)", "display": "flex", "alignItems": "center", "justifyContent": "center", "animation": S(V["bootAnim"]) }}>
        {" "}
        <div style={{ "position": "relative", "width": "200px", "animation": "popIn var(--duration-page) var(--ease-standard) both" }}>
          {" "}
          <img src="/marca/legumex-logo.png" alt="" style={{ "width": "100%", "display": "block", "filter": "grayscale(1)", "opacity": "0.22" }} />
          {" "}
          <img src="/marca/legumex-logo.png" alt="" style={{ "position": "absolute", "inset": "0", "width": "100%", "display": "block", "animation": "logoFill 1100ms var(--ease-standard) both" }} />
          {" "}
        </div>
      </div>
    </>
  );
}
