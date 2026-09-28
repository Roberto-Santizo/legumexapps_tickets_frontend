// Visor de imágenes (zoom y navegación).
// V: valores de la lógica (src/logic/valores).
import { T, S } from '../../utils/runtime.js';

export default function VisorImagen({ V }) {
  return (
    <>
      <div data-m="visor" role="dialog" aria-modal="true" aria-label="Imagen ampliada" style={{ "position": "fixed", "inset": "0", "zIndex": "70", "background": "rgba(10,10,10,0.9)", "display": "flex", "flexDirection": "column", "animation": "overlayIn var(--duration-base) var(--ease-standard) both" }}>
        {" "}
        <div onClick={V["onLbClose"]} style={{ "position": "absolute", "inset": "0", "cursor": "zoom-out" }}></div>
        {" "}
        <div data-m="visor-barra" style={{ "position": "relative", "display": "flex", "alignItems": "center", "gap": "12px", "padding": "16px 20px" }}>
          {" "}
          <div style={{ "minWidth": "0", "flex": "1" }}>
            {" "}
            <div style={{ "fontSize": "14px", "fontWeight": "500", "color": "var(--n-0)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
              {T(V["lbNombre"])}
            </div>
            {" "}
            <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-300)", "letterSpacing": "0.04em", "marginTop": "2px", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
              {T(V["lbMeta"])}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ "marginLeft": "auto", "display": "flex", "alignItems": "center", "gap": "8px", "flexShrink": "0" }}>
            {" "}
            {V["lbHasUrl"] ? (<>
              {" "}
              <div data-m="visor-zoom" style={{ "display": "flex", "alignItems": "center", "gap": "6px", "marginRight": "8px" }}>
                {" "}
                <button onClick={V["onLbOut"]} aria-label="Alejar (−)" title="Alejar (−)" style={{ "background": "rgba(255,255,255,0.08)", "color": "var(--n-0)", "border": "1px solid rgba(255,255,255,0.28)", "borderRadius": "9999px", "width": "40px", "height": "40px", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp2g scp2h">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    <path d="M8 11h6"></path>
                  </svg>
                </button>
                {" "}
                <button onClick={V["onLbFit"]} aria-label="Ajustar a la pantalla (0)" title="Ajustar a la pantalla (0)" style={{ "minWidth": "56px", "height": "40px", "padding": "0 10px", "background": "rgba(255,255,255,0.08)", "color": "var(--n-0)", "border": "1px solid rgba(255,255,255,0.28)", "borderRadius": "9999px", "cursor": "pointer", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "12px", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scp2g">
                  {T(V["lbZoomLabel"])}
                </button>
                {" "}
                <button onClick={V["onLbIn"]} aria-label="Acercar (+)" title="Acercar (+)" style={{ "background": "rgba(255,255,255,0.08)", "color": "var(--n-0)", "border": "1px solid rgba(255,255,255,0.28)", "borderRadius": "9999px", "width": "40px", "height": "40px", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp2g scp2h">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                    <path d="M11 8v6"></path>
                    <path d="M8 11h6"></path>
                  </svg>
                </button>
                {" "}
              </div>
              {" "}
            </>) : null}
            {" "}
            <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-300)", "marginRight": "4px" }}>
              {T(V["lbPos"])}
            </span>
            {" "}
            {V["lbHasUrl"] ? (<>
              {" "}
              <a href={V["lbUrl"]} download={V["lbNombre"]} aria-label="Descargar" title="Descargar" style={{ "background": "rgba(255,255,255,0.08)", "border": "1px solid rgba(255,255,255,0.28)", "borderRadius": "9999px", "width": "40px", "height": "40px", "display": "flex", "alignItems": "center", "justifyContent": "center", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scp2i">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                  <path d="M12 15V3"></path>
                  <path d="m7 10 5 5 5-5"></path>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                </svg>
              </a>
              {" "}
            </>) : null}
            {" "}
            <button onClick={V["onLbClose"]} aria-label="Cerrar vista" title="Cerrar vista" style={{ "background": "rgba(255,255,255,0.08)", "color": "var(--n-0)", "border": "1px solid rgba(255,255,255,0.28)", "borderRadius": "9999px", "width": "40px", "height": "40px", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp2j scp2h">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div data-m="visor-area" style={{ "position": "relative", "flex": "1", "minHeight": "0", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "0 80px 40px", "pointerEvents": "none" }}>
          {" "}
          {V["lbHasUrl"] ? (<>
            {" "}
            <div style={{ "position": "absolute", "left": "0", "right": "0", "bottom": "12px", "textAlign": "center", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.04em", "color": "var(--n-300)" }}>
              {T(V["lbHint"])}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["lbHasUrl"] ? (<>
            {" "}
            <div key={V["lbKey"]} style={{ "width": "100%", "height": "100%", "overflow": "hidden", "borderRadius": "8px", "pointerEvents": "auto", "touchAction": "none", "animation": "celebIn 320ms cubic-bezier(0.34,1.56,0.64,1) both" }} onWheel={V["onLbWheel"]}>
              {" "}
              <div key={V["lbKey"]} role="img" aria-label={V["lbNombre"]} onPointerDown={V["onLbDown"]} onPointerMove={V["onLbMove"]} onPointerUp={V["onLbUp"]} onPointerCancel={V["onLbUp"]} onDoubleClick={V["onLbDbl"]} style={{ "width": "100%", "height": "100%", "backgroundImage": "url(" + S(V["lbUrl"]) + ")", "backgroundSize": "contain", "backgroundRepeat": "no-repeat", "backgroundPosition": "center", "transform": S(V["lbTransform"]), "transformOrigin": "center", "transition": S(V["lbTrans"]), "cursor": S(V["lbCursor"]), "willChange": "transform" }}></div>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
          {V["lbNoUrl"] ? (<>
            {" "}
            <div key={V["lbKey"]} style={{ "width": "640px", "maxWidth": "100%", "aspectRatio": "16/10", "borderRadius": "12px", "border": "1px solid rgba(255,255,255,0.14)", "backgroundImage": "repeating-linear-gradient(45deg,var(--n-800) 0 10px,var(--n-900) 10px 20px)", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "gap": "8px", "pointerEvents": "auto", "animation": "celebIn 320ms cubic-bezier(0.34,1.56,0.64,1) both" }}>
              {" "}
              <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-0)", "background": "var(--n-950)", "border": "1px solid rgba(255,255,255,0.28)", "borderRadius": "6px", "padding": "4px 8px" }}>
                {T(V["lbTipo"])}
              </span>
              {" "}
              <span style={{ "fontSize": "14px", "color": "var(--n-300)" }}>
                {"Archivo de ejemplo · sin imagen real en el prototipo"}
              </span>
              {" "}
            </div>
            {" "}
          </>) : null}
          {" "}
        </div>
        {" "}
        {V["lbMulti"] ? (<>
          {" "}
          <button data-m="visor-flecha" onClick={V["onLbPrev"]} aria-label="Imagen anterior" title="Imagen anterior" style={{ "position": "absolute", "left": "20px", "top": "50%", "marginTop": "-20px", "background": "rgba(255,255,255,0.08)", "color": "var(--n-0)", "border": "1px solid rgba(255,255,255,0.28)", "borderRadius": "9999px", "width": "40px", "height": "40px", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp2j scp2h">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          {" "}
          <button data-m="visor-flecha" onClick={V["onLbNext"]} aria-label="Imagen siguiente" title="Imagen siguiente" style={{ "position": "absolute", "right": "20px", "top": "50%", "marginTop": "-20px", "background": "rgba(255,255,255,0.08)", "color": "var(--n-0)", "border": "1px solid rgba(255,255,255,0.28)", "borderRadius": "9999px", "width": "40px", "height": "40px", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp2j scp2h">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
          {" "}
        </>) : null}
      </div>
    </>
  );
}
