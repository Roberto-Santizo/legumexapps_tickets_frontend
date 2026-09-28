// Recorrido guiado ("¿Cómo funciona?"): oscurece la pantalla, ilumina el elemento que se
// explica y muestra una tarjeta con el paso. V: valores de la lógica (src/logic/valores/capas.js).
import { T, L } from '../../utils/runtime.js';

const TR = 'left 320ms var(--ease-standard),top 320ms var(--ease-standard),width 320ms var(--ease-standard),height 320ms var(--ease-standard)';

export default function Recorrido({ V }) {
  return (
    // z-index 90: por encima de todo (modal 70, avisos 72, soltar 76, carga 80)
    <div data-m="recorrido" style={{ "position": "fixed", "inset": "0", "zIndex": "90", "animation": "overlayIn 200ms var(--ease-standard) both" }}>
      {/* capa que bloquea los clics mientras dura el recorrido; oscurece si no hay nada iluminado */}
      <div onClick={V["onRecSalir"]} style={{ "position": "absolute", "inset": "0", "background": V["recSinFoco"] ? "rgba(10,10,10,0.55)" : "transparent" }} />
      {V["recFoco"] ? (
        <div aria-hidden="true" style={Object.assign({ "position": "fixed", "borderRadius": "12px", "pointerEvents": "none", "boxShadow": "0 0 0 2px var(--sobre-marca), 0 0 0 9999px rgba(10,10,10,0.55)", "transition": TR }, V["recFocoStyle"])} />
      ) : null}
      <div ref={V["recRef"]} role="dialog" aria-modal="true" aria-labelledby="rec-titulo" aria-describedby="rec-texto" data-m="recorrido-tarjeta"
        style={Object.assign({ "position": "fixed", "background": "var(--n-0)", "color": "var(--n-900)", "borderRadius": "14px", "padding": "18px 20px 16px", "boxShadow": "rgba(0,0,0,0.18) 0px 16px 32px -8px, rgba(0,0,0,0.1) 0px 4px 8px -4px", "border": "1px solid var(--n-200)", "boxSizing": "border-box", "transition": TR }, V["recTarjetaStyle"])}>
        <div key={V["recKey"]} style={{ "animation": "fadeSwap 260ms var(--ease-standard) both" }}>
          <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "12px" }}>
            <span style={{ "fontSize": "11px", "fontWeight": "600", "letterSpacing": "0.06em", "color": "var(--n-500)" }}>{T(V["recPaso"])}</span>
            <button onClick={V["onRecSalir"]} aria-label="Salir del recorrido" style={{ "background": "transparent", "color": "var(--n-500)", "border": "none", "borderRadius": "6px", "padding": "4px 6px", "fontSize": "13px", "fontWeight": "500", "cursor": "pointer" }} className="scpg">Salir</button>
          </div>
          <h3 id="rec-titulo" style={{ "fontSize": "17px", "lineHeight": "1.35", "fontWeight": "600", "margin": "4px 0 6px", "color": "var(--n-900)" }}>{T(V["recTitulo"])}</h3>
          <p id="rec-texto" style={{ "fontSize": "14px", "lineHeight": "1.5", "color": "var(--n-600)", "margin": "0" }}>{T(V["recTexto"])}</p>
        </div>
        <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "12px", "marginTop": "16px" }}>
          <div aria-hidden="true" style={{ "display": "flex", "gap": "3px", "alignItems": "center", "flexWrap": "nowrap", "minWidth": "0", "overflow": "hidden" }}>
            {L(V["recPuntos"]).map(p => (
              <span key={p.key} style={{ "width": p.w, "flexShrink": "0", "height": "5px", "borderRadius": "3px", "background": p.bg, "transition": "width 240ms var(--ease-standard),background-color 240ms var(--ease-standard)" }} />
            ))}
          </div>
          <div style={{ "display": "flex", "gap": "8px", "flexShrink": "0" }}>
            {V["recHayAnterior"] ? (
              <button onClick={V["onRecAnterior"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 14px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer" }} className="scpg scp4">Anterior</button>
            ) : null}
            <button onClick={V["onRecSiguiente"]} style={{ "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "8px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer" }} className="scpv">{T(V["recSiguiente"])}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
