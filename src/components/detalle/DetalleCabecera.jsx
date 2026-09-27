// Cabecera del detalle: volver, código, estado y acciones.
// V: valores de la lógica (src/logic/valores).
import { T, S } from '../../utils/runtime.js';

export default function DetalleCabecera({ V }) {
  return (
    <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "flexWrap": "wrap", "marginBottom": "16px" }}>
      {" "}
      <button onClick={V["onBack"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scpm scp4">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        {"Volver al listado"}
      </button>
      {" "}
      <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "background": S(V["dStatusBg"]), "borderRadius": "9999px", "padding": "6px 12px", "fontSize": "12px", "fontWeight": "500", "color": "var(--n-900)" }}>
        {V["dStatusOpen"] ? (<>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={V["dStatusDot"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="1" fill={V["dStatusDot"]}></circle>
          </svg>
        </>) : null}
        {V["dStatusProg"] ? (<>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={V["dStatusDot"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
        </>) : null}
        {V["dStatusClosed"] ? (<>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={V["dStatusDot"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
            <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
            <path d="m9 11 3 3L22 4"></path>
          </svg>
        </>) : null}
        {T(V["dStatusLabel"])}
      </span>
      {" "}
      <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "color": "var(--n-700)" }}>
        {" "}
        <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(V["dPrioDot"]) }}></span>
        {"Prioridad "}{T(V["dPrioLabel"])}{" "}
      </span>
      {" "}
      <div style={{ "marginLeft": "auto", "display": "flex", "gap": "8px" }}>
        {" "}
        {V["canEdit"] ? (<>
          {" "}
          <button onClick={V["onEditTicket"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp1i scp4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,rotate(0deg) scale(1)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
            </svg>
            {"Editar"}
          </button>
          {" "}
        </>) : null}
        {" "}
        {V["canClose"] ? (<>
          {" "}
          <button onClick={V["onAskClose"]} style={{ "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "8px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp1j scp2">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapClose"]), "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)" }}>
              <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
              <path d="m9 11 3 3L22 4"></path>
            </svg>
            {"Cerrar ticket"}
          </button>
          {" "}
        </>) : null}
        {" "}
        {V["canTakeDetail"] ? (<>
          {" "}
          <button onClick={V["onTakeDetail"]} style={{ "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "8px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1k scp2">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapTakeDetail"]), "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)" }}>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M19 8v6"></path>
              <path d="M22 11h-6"></path>
            </svg>
            {"Tomar este ticket"}
          </button>
          {" "}
        </>) : null}
        {" "}
        {V["dResolvedShow"] ? (<>
          {" "}
          <button onClick={V["onResolved"]} disabled={V["dResolvedDis"]} aria-disabled={V["dResolvedDis"]} title="Le avisa al área que ya funciona para que lo cierre" style={{ "opacity": S(V["dResolvedOp"]), "cursor": S(V["dResolvedCur"]), "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpq scp4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--verde-oscuro)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            {T(V["dResolvedLabel"])}
          </button>
          {" "}
        </>) : null}
        {" "}
        {V["dFollowShow"] ? (<>
          {" "}
          <button onClick={V["onFollowUp"]} title="Abre un ticket nuevo que menciona a este" style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpq scp4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            {"Sigue pasando"}
          </button>
          {" "}
        </>) : null}
        {" "}
        {V["canReopen"] ? (<>
          {" "}
          <button onClick={V["onReopen"]} title="Vuelve a estado Abierto y queda registrado en la actividad" style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp1l scp4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(V["tapReopen"]), "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            {"Reabrir ticket"}
          </button>
          {" "}
        </>) : null}
        {" "}
      </div>
      {" "}
    </div>
  );
}
