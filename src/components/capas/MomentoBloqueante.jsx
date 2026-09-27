// Momento de "marcar como bloqueante".
// V: valores de la lógica (src/logic/valores).
import { T } from '../../utils/runtime.js';

export default function MomentoBloqueante({ V }) {
  return (
    <>
      <div style={{ "position": "fixed", "inset": "0", "background": "rgba(10,10,10,0.4)", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "24px", "zIndex": "64", "animation": "overlayIn var(--duration-base) var(--ease-standard) both" }}>
        {" "}
        <div style={{ "width": "100%", "maxWidth": "400px", "background": "var(--n-0)", "borderRadius": "16px", "padding": "28px", "textAlign": "center", "animation": "celebIn 420ms cubic-bezier(0.34,1.56,0.64,1) both", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px" }}>
          {" "}
          <div style={{ "position": "relative", "width": "84px", "height": "84px", "margin": "0 auto 18px" }}>
            {" "}
            <span aria-hidden="true" style={{ "position": "absolute", "inset": "0", "borderRadius": "9999px", "border": "1px solid var(--naranja)", "animation": "ringOut 900ms var(--ease-standard) 140ms both" }}></span>
            {" "}
            <div style={{ "position": "absolute", "inset": "14px", "borderRadius": "9999px", "background": "var(--ambar-tinte)", "display": "flex", "alignItems": "center", "justifyContent": "center", "animation": "badgePop 480ms cubic-bezier(0.34,1.56,0.64,1) both" }}>
              {" "}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
              </svg>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
            {T(V["momentCode"])}{" MARCADO"}
          </div>
          {" "}
          <div style={{ "fontSize": "18px", "lineHeight": "1.4", "fontWeight": "600", "color": "var(--n-900)", "marginTop": "8px", "textWrap": "pretty" }}>
            {T(V["momentTitulo"])}
          </div>
          {" "}
          <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "6px", "textWrap": "pretty" }}>
            {T(V["momentSub"])}
          </div>
          {" "}
          <div style={{ "height": "3px", "borderRadius": "9999px", "background": "var(--n-50)", "marginTop": "20px", "overflow": "hidden" }}>
            <span style={{ "display": "block", "height": "100%", "background": "var(--naranja)", "animation": "progressBar 2800ms linear both" }}></span>
          </div>
          {" "}
          <button onClick={V["onMomentGo"]} style={{ "marginTop": "16px", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpg scpd">
            {T(V["momentBtn"])}
          </button>
          {" "}
        </div>
      </div>
    </>
  );
}
