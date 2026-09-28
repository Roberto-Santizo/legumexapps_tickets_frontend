// Vista de tickets en kanban (columnas por estado, arrastrar y soltar).
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function VistaKanban({ V }) {
  return (
    <>
      {" "}
      <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "marginBottom": "12px" }}>
        {" "}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
          <circle cx="9" cy="5" r="1"></circle>
          <circle cx="9" cy="12" r="1"></circle>
          <circle cx="9" cy="19" r="1"></circle>
          <circle cx="15" cy="5" r="1"></circle>
          <circle cx="15" cy="12" r="1"></circle>
          <circle cx="15" cy="19" r="1"></circle>
        </svg>
        {" "}
        <span style={{ "fontSize": "12px", "color": "var(--n-600)", "textWrap": "pretty" }}>
          {T(V["dragHint"])}
        </span>
        {" "}
      </div>
      {" "}
      <div key={V["swapKey"]} style={{ "display": "grid", "gridTemplateColumns": "repeat(" + S(V["columnCount"]) + ",minmax(248px,1fr))", "gap": "16px", "alignItems": "start", "overflowX": "auto", "paddingBottom": "4px", "animation": "fadeSwap var(--duration-base) var(--ease-standard) both" }}>
        {" "}
        {L(V["columns"]).map((_c_21, $index) => (
          <React.Fragment key={$index}>
            {" "}
            <div onDragOver={_c_21?.["onDragOver"]} onDragLeave={_c_21?.["onDragLeave"]} onDrop={_c_21?.["onDrop"]} style={{ "background": S(_c_21?.["colBg"]), "border": S(_c_21?.["colRing"]), "borderRadius": "12px", "padding": "8px", "opacity": S(_c_21?.["colOp"]), "transition": "background-color var(--duration-base) var(--ease-standard),border-color var(--duration-base) var(--ease-standard),opacity var(--duration-base) var(--ease-standard)" }}>
              {" "}
              <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "padding": "8px 8px 12px" }}>
                {" "}
                <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_c_21?.["dot"]) }}></span>
                {" "}
                <span style={{ "fontSize": "14px", "fontWeight": "600", "color": "var(--n-900)" }}>
                  {T(_c_21?.["label"])}
                </span>
                {" "}
                {_c_21?.["isOver"] ? (<>
                  {" "}
                  <span style={{ "fontSize": "11px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "animation": "hintIn var(--duration-fast) var(--ease-standard) both" }}>
                    {T(_c_21?.["dropLabel"])}
                  </span>
                  {" "}
                </>) : null}
                {" "}
                <span key={_c_21?.["countKey"]} style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "animation": "numBump var(--duration-base) var(--ease-standard) both" }}>
                  {T(_c_21?.["count"])}
                </span>
                {" "}
              </div>
              {" "}
              <div style={{ "display": "flex", "flexDirection": "column", "gap": "8px" }}>
                {" "}
                {V["loading"] ? (<>
                  {" "}
                  {L(V["ghostCards"]).map((_g_22, $index) => (
                    <React.Fragment key={$index}>
                      {" "}
                      <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "12px", "display": "flex", "flexDirection": "column", "gap": "12px" }}>
                        {" "}
                        <div style={{ "display": "flex", "alignItems": "flex-start", "gap": "12px" }}>
                          {" "}
                          <span style={{ "display": "block", "width": "36px", "height": "36px", "borderRadius": "8px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                          {" "}
                          <div style={{ "display": "flex", "flexDirection": "column", "gap": "6px", "flex": "1", "minWidth": "0" }}>
                            {" "}
                            <span style={{ "display": "block", "width": S(_g_22?.["w"]), "height": "14px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                            {" "}
                            <span style={{ "display": "block", "width": "56%", "height": "11px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                            {" "}
                          </div>
                          {" "}
                        </div>
                        {" "}
                        <div style={{ "display": "flex", "alignItems": "center", "gap": "8px" }}>
                          {" "}
                          <span style={{ "display": "block", "width": "82px", "height": "22px", "borderRadius": "9999px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                          {" "}
                          <span style={{ "marginLeft": "auto" }}>
                            <span style={{ "display": "block", "width": "62px", "height": "11px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                          </span>
                          {" "}
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </React.Fragment>
                  ))}
                  {" "}
                </>) : null}
                {" "}
                {L(_c_21?.["items"]).map((_t_23, $index) => (
                  <React.Fragment key={$index}>
                    {" "}
                    <div data-luz="" data-vt={_t_23?.["vtId"]} onClick={_t_23?.["open"]} onKeyDown={_t_23?.["key"]} draggable={_t_23?.["canDrag"]} onDragStart={_t_23?.["onDragStart"]} onDragEnd={_t_23?.["onDragEnd"]} tabIndex="0" role="button" style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "12px", "cursor": S(_t_23?.["grab"]), "display": "flex", "flexDirection": "column", "gap": "12px", "opacity": S(_t_23?.["dragOp"]), "transform": S(_t_23?.["dragTilt"]), "animation": S(_t_23?.["landAnim"]), "transition": "transform var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp14 scp15">
                      {" "}
                      <div style={{ "display": "flex", "alignItems": "flex-start", "gap": "12px" }}>
                        {" "}
                        <div style={{ "position": "relative", "flexShrink": "0" }}>
                          {" "}
                          <div style={{ "width": "36px", "height": "36px", "borderRadius": "8px", "background": "var(--n-50)", "border": "1px solid " + S(_t_23?.["autorRing"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                            {T(_t_23?.["autorIni"])}
                          </div>
                          {" "}
                          {_t_23?.["hasAsig"] ? (<>
                            {" "}
                            <div title={"Asignado a " + S(_t_23?.["asig"])} style={{ "position": "absolute", "right": "-5px", "bottom": "-5px", "width": "20px", "height": "20px", "borderRadius": "6px", "background": "var(--n-0)", "border": "1px solid " + S(_t_23?.["ring"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "11px", "fontWeight": "600", "color": "var(--n-900)" }}>
                              {T(_t_23?.["ini"])}
                            </div>
                            {" "}
                          </>) : null}
                          {" "}
                        </div>
                        {" "}
                        <div style={{ "minWidth": "0", "flex": "1" }}>
                          {" "}
                          <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)", "textWrap": "pretty" }}>
                            {" "}
                            {L(_t_23?.["tituloParts"]).map((_p_24, $index) => (
                              <React.Fragment key={$index}>
                                {" "}
                                <span key={_p_24?.["k"]} style={{ "background": S(_p_24?.["bg"]), "borderRadius": "3px", "color": "var(--n-900)" }}>
                                  {T(_p_24?.["t"])}
                                </span>
                                {" "}
                              </React.Fragment>
                            ))}
                            {" "}
                          </div>
                          {" "}
                          <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "marginTop": "2px" }}>
                            {T(_t_23?.["code"])}{" · "}{T(_t_23?.["cat"])}
                          </div>
                          {" "}
                        </div>
                        {" "}
                        <button onClick={_t_23?.["chatGo"]} aria-label={_t_23?.["chatLabel"]} title={_t_23?.["chatLabel"]} style={{ "flexShrink": "0", "height": "30px", "padding": "0 8px", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "5px", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp16 scp10">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          {_t_23?.["hasComments"] ? (<>
                            {T(_t_23?.["commentCount"])}
                          </>) : null}
                        </button>
                        {" "}
                        {_t_23?.["canAssign"] ? (<>
                          {" "}
                          <div onClick={_t_23?.["stop"]} style={{ "position": "relative", "flexShrink": "0" }} className="scp17">
                            {" "}
                            {_t_23?.["qaClosed"] ? (<>
                              <span role="tooltip" style={{ "position": "absolute", "right": "calc(100% + 8px)", "top": "50%", "zIndex": "41", "background": "var(--n-900)", "color": "var(--n-0)", "borderRadius": "8px", "padding": "6px 10px", "fontSize": "12px", "fontWeight": "500", "lineHeight": "1.35", "whiteSpace": "nowrap", "pointerEvents": "none", "boxShadow": "0 8px 20px -8px rgba(0,0,0,0.35)", "opacity": "var(--tt,0)", "transform": "translate(var(--tx,4px),-50%)", "transition": "opacity 140ms ease,transform 140ms ease" }}>
                                {T(_t_23?.["asigTip"])}
                                <span style={{ "display": "block", "fontSize": "11px", "fontWeight": "400", "color": "var(--n-300)" }}>
                                  {T(_t_23?.["asigTipSub"])}
                                </span>
                              </span>
                            </>) : null}
                            <button onClick={_t_23?.["qaToggle"]} aria-label={_t_23?.["asigTitle"]} style={{ "height": "30px", "padding": "0 10px 0 4px", "borderRadius": "9999px", "border": "1px " + S(_t_23?.["asigBorder"]), "background": S(_t_23?.["qaBg"]), "color": "var(--n-900)", "fontSize": "12px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp18 scp19">
                              {" "}
                              {_t_23?.["asigHas"] ? (<>
                                <span style={{ "width": "22px", "height": "22px", "borderRadius": "9999px", "background": "var(--n-200)", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "11px", "fontWeight": "600", "color": "var(--n-900)", "flexShrink": "0", "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                                  {T(_t_23?.["asigIni"])}
                                </span>
                                {T(_t_23?.["asigFirst"])}
                              </>) : null}
                              {" "}
                              {_t_23?.["asigNone"] ? (<>
                                <span style={{ "width": "22px", "height": "22px", "display": "flex", "alignItems": "center", "justifyContent": "center", "flexShrink": "0" }}>
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M19 8v6"></path>
                                    <path d="M22 11h-6"></path>
                                  </svg>
                                </span>
                                {"Asignar"}
                              </>) : null}
                              {" "}
                            </button>
                            {" "}
                            {_t_23?.["qaOpen"] ? (<>
                              {" "}
                              <div role="menu" aria-label={"Asignar " + S(_t_23?.["code"])} style={{ "position": "absolute", "top": "calc(100% + 6px)", "right": "0", "zIndex": "40", "width": "300px", "maxWidth": "calc(100vw - 32px)", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "6px", "display": "flex", "flexDirection": "column", "gap": "2px", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px", "animation": "dropIn var(--duration-base) var(--ease-standard) both", "cursor": "default" }}>
                                {" "}
                                <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "padding": "6px 8px 4px" }}>
                                  {"ASIGNAR "}{T(_t_23?.["code"])}{" A"}
                                </div>
                                {" "}
                                {L(_t_23?.["qaOpts"]).map((_o_25, $index) => (
                                  <React.Fragment key={$index}>
                                    {" "}
                                    <button onClick={_o_25?.["go"]} role="menuitem" title={_o_25?.["full"]} style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": S(_o_25?.["bg"]), "border": "none", "borderRadius": "8px", "padding": "7px 8px", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scpq scpr">
                                      {" "}
                                      <span style={{ "width": "24px", "height": "24px", "borderRadius": "9999px", "background": "var(--n-200)", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "11px", "fontWeight": "600", "color": "var(--n-900)", "flexShrink": "0", "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                                        {T(_o_25?.["ini"])}
                                      </span>
                                      {" "}
                                      <span style={{ "fontSize": "14px", "fontWeight": S(_o_25?.["weight"]), "color": "var(--n-900)", "minWidth": "0", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                                        {T(_o_25?.["nombre"])}
                                      </span>
                                      {_o_25?.["hasTag"] ? (<>
                                        <span style={{ "flexShrink": "0", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "letterSpacing": "0.04em", "color": "var(--n-900)", "background": S(_o_25?.["tagBg"]), "borderRadius": "9999px", "padding": "2px 7px" }}>
                                          {T(_o_25?.["tag"])}
                                        </span>
                                      </>) : null}
                                      {" "}
                                      <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "flexShrink": "0" }}>
                                        {T(_o_25?.["carga"])}
                                      </span>
                                      {" "}
                                    </button>
                                    {" "}
                                  </React.Fragment>
                                ))}
                                {" "}
                                {_t_23?.["asigHas"] && V["canUnassign"] ? (<>
                                  {" "}
                                  <button onClick={_t_23?.["qaClear"]} role="menuitem" style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": "transparent", "border": "none", "borderTop": "1px solid var(--n-200)", "borderRadius": "0 0 8px 8px", "marginTop": "4px", "padding": "9px 8px 7px", "fontSize": "14px", "color": "var(--n-600)", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scp0 scpt">
                                    {"Quitar asignación"}
                                  </button>
                                  {" "}
                                </>) : null}
                                {" "}
                              </div>
                              {" "}
                            </>) : null}
                            {" "}
                          </div>
                          {" "}
                        </>) : null}
                        {" "}
                        {_t_23?.["canEdit"] ? (<>
                          {" "}
                          <button onClick={_t_23?.["edit"]} aria-label={_t_23?.["editLabel"]} title={_t_23?.["editLabel"]} style={{ "marginLeft": "auto", "flexShrink": "0", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard),opacity var(--duration-fast) var(--ease-standard)" }} className="scp1e scp4">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,rotate(0deg) scale(1)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                            </svg>
                          </button>
                          {" "}
                        </>) : null}
                        {" "}
                      </div>
                      {" "}
                      <div style={{ "display": "flex", "alignItems": "center", "flexWrap": "wrap", "gap": "8px", "rowGap": "8px" }}>
                        {" "}
                        <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "flexShrink": "0", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "color": "var(--n-700)", "whiteSpace": "nowrap" }}>
                          {" "}
                          <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_t_23?.["prioDot"]) }}></span>
                          {T(_t_23?.["prioLabel"])}{" "}
                        </span>
                        {" "}
                        {_t_23?.["slaShow"] ? (<>
                          {" "}
                          <span title={_t_23?.["slaTitle"]} style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "flexShrink": "0", "background": "var(--n-0)", "border": S(_t_23?.["slaBorder"]), "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "color": S(_t_23?.["slaInk"]), "whiteSpace": "nowrap" }}>
                            {" "}
                            {_t_23?.["slaLate"] ? (<>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                                <path d="M12 9v4"></path>
                                <path d="M12 17h.01"></path>
                              </svg>
                            </>) : null}
                            {" "}
                            {_t_23?.["slaWatch"] ? (<>
                              <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": "var(--naranja)", "flexShrink": "0" }}></span>
                            </>) : null}
                            {" "}
                            {_t_23?.["slaWaiting"] ? (<>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--azul)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                            </>) : null}
                            {T(_t_23?.["slaLabel"])}{" "}
                          </span>
                          {" "}
                        </>) : null}
                        {" "}
                        {_t_23?.["hasFiles"] ? (<>
                          {" "}
                          <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "4px", "flexShrink": "0", "whiteSpace": "nowrap", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
                            {" "}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                              <circle cx="9" cy="9" r="2"></circle>
                              <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"></path>
                            </svg>
                            {T(_t_23?.["fileCount"])}{" "}
                          </span>
                          {" "}
                        </>) : null}
                        {" "}
                        {_t_23?.["hasComments"] ? (<>
                          {" "}
                          <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "4px", "flexShrink": "0", "whiteSpace": "nowrap", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
                            {" "}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            {T(_t_23?.["commentCount"])}{" "}
                          </span>
                          {" "}
                        </>) : null}
                        {" "}
                        <span style={{ "marginLeft": "auto", "display": "inline-flex", "alignItems": "center", "gap": "6px", "flexShrink": "0", "whiteSpace": "nowrap", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
                          {" "}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 6v6l4 2"></path>
                          </svg>
                          {T(_t_23?.["updated"])}{" "}
                        </span>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </React.Fragment>
                ))}
                {" "}
                {_c_21?.["empty"] ? (<>
                  {" "}
                  <div style={{ "padding": "24px 12px", "textAlign": "center", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px" }}>
                    {" "}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--n-400)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "margin": "0 auto 8px", "display": "block" }}>
                      <path d="M22 12h-6l-2 3h-4l-2-3H2"></path>
                      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                    </svg>
                    <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
                      {"VACÍO"}
                    </div>
                    {" "}
                    <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-600)", "marginTop": "4px" }}>
                      {T(_c_21?.["emptyMsg"])}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </>) : null}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </React.Fragment>
        ))}
        {" "}
      </div>
      {" "}
    </>
  );
}
