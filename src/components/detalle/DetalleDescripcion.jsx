// Título y descripción del ticket.
// V: valores de la lógica (src/logic/valores).
import { T } from '../../utils/runtime.js';

export default function DetalleDescripcion({ V }) {
  return (
    <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "24px" }}>
      {" "}
      <h2 style={{ "fontSize": "30px", "lineHeight": "1.38", "fontWeight": "500", "letterSpacing": "-0.01em", "margin": "0", "color": "var(--n-900)", "textWrap": "pretty" }}>
        {T(V["dTitulo"])}
      </h2>
      {" "}
      <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "lineHeight": "1.5", "color": "var(--n-500)", "marginTop": "6px", "letterSpacing": "0.02em" }}>
        {T(V["dCode"])}{" · ABIERTO POR "}{T(V["dAutor"])}{" · "}{T(V["dCreado"])}
      </div>
      {" "}
      <p style={{ "fontSize": "16px", "lineHeight": "1.5", "color": "var(--n-800)", "margin": "16px 0 0", "textWrap": "pretty" }}>
        {T(V["dDesc"])}
      </p>
      {" "}
    </div>
  );
}
