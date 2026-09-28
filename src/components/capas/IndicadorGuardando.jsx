// Indicador "Guardando".
// V: valores de la lógica (src/logic/valores).

export default function IndicadorGuardando({ V }) {
  return (
    <>
      <div key="savepill" role="status" aria-live="polite" style={{ "position": "fixed", "right": "24px", "top": "24px", "zIndex": "70", "display": "inline-flex", "alignItems": "center", "gap": "8px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "9999px", "padding": "8px 16px", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "whiteSpace": "nowrap", "boxShadow": "rgba(0,0,0,0.08) 0px 4px 12px -2px" }}>
        {" "}
        <span style={{ "position": "relative", "height": "16px", "width": "48px", "flexShrink": "0", "display": "block" }}>
          {" "}
          <img src="/marca/legumex-isotipo.png" alt="" style={{ "position": "absolute", "inset": "0", "height": "16px", "width": "48px", "objectFit": "contain", "filter": "grayscale(1)", "opacity": "0.3" }} />
          {" "}
          <img src="/marca/legumex-isotipo.png" ref={V["saveLogoRef"]} alt="" style={{ "position": "absolute", "inset": "0", "height": "16px", "width": "48px", "objectFit": "contain" }} />
          {" "}
        </span>
        {"GUARDANDO "}
      </div>
    </>
  );
}
