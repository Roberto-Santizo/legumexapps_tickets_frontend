// Ficha de una persona del área: se abre al tocar a alguien en "Carga por persona".
// Panel a la derecha (hoja desde abajo en el teléfono). V: valores de src/logic/valores/pulso.js.
import { T, S, L } from '../../utils/runtime.js';

const mono = { "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.1em", "color": "var(--n-600)" };

export default function FichaPersona({ V }) {
  return (
    <>
      <div data-m="ficha-velo" aria-hidden="true" onClick={V["onFichaCerrar"]} style={{ "position": "fixed", "inset": "0", "zIndex": "64", "background": "rgba(10,10,10,0.32)", "animation": "overlayIn var(--duration-base) var(--ease-standard) both" }}></div>
      <aside ref={V["fichaRef"]} data-m="ficha" role="dialog" aria-modal="true" aria-labelledby="ficha-nombre" style={{ "position": "fixed", "top": "12px", "right": "12px", "bottom": "12px", "width": "min(460px, calc(100vw - 24px))", "zIndex": "65", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "18px", "boxShadow": "-24px 0 64px -24px rgba(11,42,30,0.35)", "display": "flex", "flexDirection": "column", "overflow": "hidden", "animation": "fichaEntra 420ms cubic-bezier(0.22,1,0.36,1) both" }}>
        {/* cabecera: el avatar llega desde la fila (View Transitions) */}
        <div style={{ "display": "flex", "alignItems": "center", "gap": "14px", "padding": "20px 20px 16px", "borderBottom": "1px solid var(--n-200)" }}>
          <div data-ficha-cabecera="" style={{ "width": "52px", "height": "52px", "flexShrink": "0", "borderRadius": "9999px", "background": "var(--n-50)", "border": "2px solid " + S(V["fichaRing"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "17px", "fontWeight": "600", "color": "var(--n-900)" }}>
            {T(V["fichaIni"])}
          </div>
          <div style={{ "minWidth": "0", "flex": "1" }}>
            <h2 id="ficha-nombre" style={{ "margin": "0", "fontSize": "20px", "lineHeight": "1.25", "fontWeight": "600", "color": "var(--n-900)" }}>{T(V["fichaNombre"])}</h2>
            <div style={{ "fontSize": "12px", "color": "var(--n-500)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>{T(V["fichaRol"])}</div>
            <div style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "marginTop": "6px", "fontSize": "12px", "fontWeight": "500", "color": "var(--n-800)" }}>
              <span style={{ "width": "7px", "height": "7px", "borderRadius": "9999px", "background": S(V["fichaEstadoInk"]) }}></span>
              {T(V["fichaEstado"])}
            </div>
          </div>
          <button data-foco-inicial="" onClick={V["onFichaCerrar"]} aria-label="Cerrar la ficha" style={{ "alignSelf": "flex-start", "width": "36px", "height": "36px", "border": "1px solid var(--n-200)", "borderRadius": "10px", "background": "var(--n-0)", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center" }} className="scp4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
        <div style={{ "flex": "1", "overflowY": "auto", "padding": "18px 20px 24px", "display": "flex", "flexDirection": "column", "gap": "22px" }}>
          {/* En pocas palabras: la ficha "explica" a la persona */}
          <section>
            <div style={mono}>EN POCAS PALABRAS</div>
            <div style={{ "marginTop": "10px", "padding": "14px 16px", "borderRadius": "12px", "background": "var(--fondo-2)", "display": "flex", "flexDirection": "column", "gap": "8px" }}>
              {L(V["fichaFrases"]).map(f => (
                <p key={f.key} style={{ "margin": "0", "fontSize": "14px", "lineHeight": "1.5", "color": "var(--n-800)", "textWrap": "pretty", "animation": "dropIn 420ms var(--ease-standard) both", "animationDelay": f.retraso }}>{f.texto}</p>
              ))}
              {V["fichaPocosDatos"] ? (<p style={{ "margin": "0", "fontSize": "12px", "color": "var(--n-500)" }}>{"Con pocos cierres todavía, los promedios pueden cambiar bastante."}</p>) : null}
            </div>
          </section>
          {/* cuatro cifras con su barra contra el promedio del equipo */}
          <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "12px", "flexWrap": "wrap", "marginBottom": "-12px" }}>
            <div style={mono}>SUS CIFRAS</div>
            <div aria-hidden="true" style={{ "display": "flex", "gap": "12px", "fontSize": "11px", "color": "var(--n-500)" }}>
              <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "5px" }}><i style={{ "width": "14px", "height": "5px", "borderRadius": "9999px", "background": "var(--login-hoja)" }}></i>{T(V["fichaPila"])}</span>
              <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "5px" }}><i style={{ "width": "14px", "height": "5px", "borderRadius": "9999px", "background": "var(--n-300)" }}></i>{"Promedio del equipo"}</span>
            </div>
          </div>
          <section style={{ "display": "grid", "gridTemplateColumns": "repeat(2,minmax(0,1fr))", "gap": "10px" }}>
            {L(V["fichaCifras"]).map(c => (
              <div key={c.key} style={{ "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "12px 14px", "animation": "cardReveal 480ms cubic-bezier(0.22,1,0.36,1) both", "animationDelay": c.retraso }}>
                <div style={Object.assign({}, mono, { "fontSize": "10px" })}>{c.label}</div>
                <div style={{ "fontSize": c.tam, "minHeight": "30px", "display": "flex", "alignItems": "flex-end", "lineHeight": "1.15", "fontWeight": "700", "letterSpacing": "-0.02em", "color": "var(--n-900)", "marginTop": "6px" }}>{c.valor}</div>
                <div style={{ "fontSize": "12px", "color": "var(--n-500)" }}>{c.nota}</div>
                <div aria-hidden="true" style={{ "marginTop": "10px", "display": "flex", "flexDirection": "column", "gap": "4px" }}>
                  <div style={{ "height": "5px", "borderRadius": "9999px", "background": "var(--n-50)", "overflow": "hidden" }}><div style={{ "height": "100%", "width": c.b.yo, "borderRadius": "9999px", "background": "var(--login-hoja)", "transformOrigin": "left", "animation": "lineGrow 700ms var(--ease-standard) both", "animationDelay": c.retraso }}></div></div>
                  <div style={{ "height": "5px", "borderRadius": "9999px", "background": "var(--n-50)", "overflow": "hidden" }}><div style={{ "height": "100%", "width": c.b.eq, "borderRadius": "9999px", "background": "var(--n-300)", "transformOrigin": "left", "animation": "lineGrow 700ms var(--ease-standard) both", "animationDelay": c.retraso }}></div></div>
                </div>
                <div style={{ "fontSize": "11px", "color": "var(--n-500)", "marginTop": "4px" }}>{c.eqNota}</div>
              </div>
            ))}
          </section>
          {/* cierres por día */}
          <section>
            <div style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "baseline" }}>
              <div style={mono}>CIERRES POR DÍA</div>
              <div style={{ "fontSize": "12px", "color": "var(--n-500)" }}>{T(V["fichaDiasTotal"])}</div>
            </div>
            <div style={{ "display": "flex", "alignItems": "flex-end", "gap": "4px", "height": "64px", "marginTop": "10px" }}>
              {L(V["fichaDias"]).map(d => (
                <div key={d.key} title={d.titulo} style={{ "flex": "1", "height": d.alto, "borderRadius": "4px 4px 2px 2px", "background": d.fondo, "transformOrigin": "bottom", "animation": "barraSube 520ms cubic-bezier(0.22,1,0.36,1) both", "animationDelay": d.retraso }}></div>
              ))}
            </div>
            <div style={{ "display": "flex", "justifyContent": "space-between", "fontSize": "11px", "color": "var(--n-500)", "marginTop": "4px" }}><span>{"hace 13 d"}</span><span>{"hoy"}</span></div>
          </section>
          {V["fichaHayCats"] ? (
            <section>
              <div style={mono}>DONDE MÁS TRABAJA</div>
              <div style={{ "display": "flex", "flexWrap": "wrap", "gap": "6px", "marginTop": "10px" }}>
                {L(V["fichaCats"]).map(c => (
                  <span key={c.key} style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "padding": "5px 10px", "borderRadius": "9999px", "border": "1px solid var(--n-200)", "fontSize": "12px", "color": "var(--n-800)" }}>{c.nombre}<b style={{ "fontFamily": "'JetBrains Mono',monospace", "fontWeight": "500", "color": "var(--n-500)" }}>{c.n}</b></span>
                ))}
              </div>
            </section>
          ) : null}
          <section>
            <div style={mono}>AHORA TIENE</div>
            {V["fichaHayActivos"] ? (
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "6px", "marginTop": "10px" }}>
                {L(V["fichaActivos"]).map(t => (
                  <button key={t.key} onClick={t.abrir} style={{ "display": "flex", "alignItems": "center", "gap": "10px", "width": "100%", "textAlign": "left", "padding": "10px 12px", "borderRadius": "10px", "border": "1px solid " + (t.tarde ? "var(--naranja)" : "var(--n-200)"), "background": "var(--n-0)", "cursor": "pointer" }} className="scp4">
                    <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "flexShrink": "0" }}>{t.code}</span>
                    <span style={{ "flex": "1", "minWidth": "0", "fontSize": "13px", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>{t.titulo}</span>
                    <span style={{ "flexShrink": "0", "fontSize": "11px", "padding": "3px 8px", "borderRadius": "9999px", "background": t.estadoBg, "color": "var(--n-900)" }}>{t.estado}</span>
                  </button>
                ))}
                {V["fichaMasActivos"] ? (<div style={{ "fontSize": "12px", "color": "var(--n-500)" }}>{T(V["fichaMasActivos"])}</div>) : null}
              </div>
            ) : (<div style={{ "fontSize": "14px", "color": "var(--n-600)", "marginTop": "8px" }}>{"Sin tickets activos."}</div>)}
          </section>
          <p style={{ "margin": "0", "fontSize": "12px", "lineHeight": "1.5", "color": "var(--n-500)", "borderTop": "1px solid var(--n-200)", "paddingTop": "12px" }}>
            {T(V["fichaComentarios"])}{"."}
          </p>
        </div>
      </aside>
    </>
  );
}
