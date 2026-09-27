// Vista de tickets en tarjetas.
// V: valores de la lógica (src/logic/valores).
import React from 'react';
import { T, S, L } from '../../utils/runtime.js';

export default function VistaTarjetas({ V }) {
  return (
    <>
      {" "}
      <div key={V["swapKey"]} style={{ "animation": "fadeSwap var(--duration-base) var(--ease-standard) both" }}>
        {" "}
        {V["loading"] ? (<>
          {" "}
          <div data-m="grilla-tarjetas" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fill,minmax(380px,1fr))", "gap": "12px" }}>
            {" "}
            {L(V["ghostCards6"]).map((_g_14, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "16px", "display": "flex", "flexDirection": "column", "gap": "14px" }}>
                  {" "}
                  <div style={{ "display": "flex", "alignItems": "flex-start", "gap": "12px" }}>
                    {" "}
                    <span style={{ "display": "block", "width": "36px", "height": "36px", "borderRadius": "8px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                    {" "}
                    <div style={{ "display": "flex", "flexDirection": "column", "gap": "6px", "flex": "1", "minWidth": "0" }}>
                      {" "}
                      <span style={{ "display": "block", "width": S(_g_14?.["w"]), "height": "14px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                      {" "}
                      <span style={{ "display": "block", "width": "52%", "height": "11px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ "display": "flex", "alignItems": "center", "gap": "8px" }}>
                    {" "}
                    <span style={{ "display": "block", "width": "96px", "height": "26px", "borderRadius": "9999px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                    {" "}
                    <span style={{ "display": "block", "width": "82px", "height": "22px", "borderRadius": "9999px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ "display": "flex", "alignItems": "center", "gap": "8px", "borderTop": "1px solid var(--n-200)", "paddingTop": "12px" }}>
                    {" "}
                    <span style={{ "display": "block", "width": "40%", "height": "12px", "borderRadius": "6px", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
                    {" "}
                    <span style={{ "display": "block", "width": "64px", "height": "12px", "borderRadius": "6px", "marginLeft": "auto", "background": "linear-gradient(90deg,var(--n-50) 0%,var(--n-200) 50%,var(--n-50) 100%)", "backgroundSize": "200% 100%", "animation": "shimmer 1.4s var(--ease-standard) infinite" }}></span>
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
        </>) : null}
        {" "}
        {V["loaded"] ? (<>
          {" "}
          <div data-m="grilla-tarjetas" style={{ "display": "grid", "gridTemplateColumns": "repeat(auto-fill,minmax(380px,1fr))", "gap": "12px" }}>
            {" "}
            {L(V["rows"]).map((_t_15, $index) => (
              <React.Fragment key={$index}>
                {" "}
                <div data-reveal="" onClick={_t_15?.["open"]} onKeyDown={_t_15?.["key"]} tabIndex="0" role="button" style={{ "background": "var(--n-0)", "border": "1px solid " + S(_t_15?.["focusBorder"]), "borderRadius": "12px", "padding": "16px", "display": "flex", "flexDirection": "column", "gap": "14px", "cursor": "pointer", "boxShadow": S(_t_15?.["focusShadow"]), "transition": "transform var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)" }} className="scp14 scp15">
                  {" "}
                  <div style={{ "display": "flex", "alignItems": "flex-start", "gap": "12px" }}>
                    {" "}
                    <div style={{ "position": "relative", "flexShrink": "0" }}>
                      {" "}
                      <div style={{ "width": "36px", "height": "36px", "borderRadius": "8px", "background": "var(--n-50)", "border": "1px solid " + S(_t_15?.["autorRing"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "12px", "fontWeight": "600", "color": "var(--n-900)" }}>
                        {T(_t_15?.["autorIni"])}
                      </div>
                      {" "}
                      {_t_15?.["hasAsig"] ? (<>
                        {" "}
                        <div title={"Asignado a " + S(_t_15?.["asig"])} style={{ "position": "absolute", "right": "-5px", "bottom": "-5px", "width": "20px", "height": "20px", "borderRadius": "6px", "background": "var(--n-0)", "border": "1px solid " + S(_t_15?.["ring"]), "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "10px", "fontWeight": "600", "color": "var(--n-900)" }}>
                          {T(_t_15?.["ini"])}
                        </div>
                        {" "}
                      </>) : null}
                      {" "}
                    </div>
                    {" "}
                    <div style={{ "minWidth": "0", "flex": "1" }}>
                      {" "}
                      <div style={{ "display": "flex", "alignItems": "baseline", "gap": "6px", "minWidth": "0" }}>
                        {" "}
                        <span style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                          {T(_t_15?.["autor"])}
                        </span>
                        {" "}
                        <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "flexShrink": "0" }}>
                          {T(_t_15?.["code"])}
                        </span>
                        {" "}
                      </div>
                      {" "}
                      <div style={{ "fontSize": "12px", "color": "var(--n-500)", "marginTop": "2px", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                        {T(_t_15?.["cat"])}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <button onClick={_t_15?.["chatGo"]} aria-label={_t_15?.["chatLabel"]} title={_t_15?.["chatLabel"]} style={{ "flexShrink": "0", "height": "30px", "padding": "0 8px", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "5px", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp16 scp10">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      {_t_15?.["hasComments"] ? (<>
                        {T(_t_15?.["commentCount"])}
                      </>) : null}
                    </button>
                    {" "}
                    {_t_15?.["canAssign"] ? (<>
                      {" "}
                      <div onClick={_t_15?.["stop"]} style={{ "position": "relative", "flexShrink": "0" }} className="scp17">
                        {" "}
                        {_t_15?.["qaClosed"] ? (<>
                          <span role="tooltip" style={{ "position": "absolute", "right": "calc(100% + 8px)", "top": "50%", "zIndex": "41", "background": "var(--n-900)", "color": "var(--n-0)", "borderRadius": "8px", "padding": "6px 10px", "fontSize": "12px", "fontWeight": "500", "lineHeight": "1.35", "whiteSpace": "nowrap", "pointerEvents": "none", "boxShadow": "0 8px 20px -8px rgba(0,0,0,0.35)", "opacity": "var(--tt,0)", "transform": "translate(var(--tx,4px),-50%)", "transition": "opacity 140ms ease,transform 140ms ease" }}>
                            {T(_t_15?.["asigTip"])}
                            <span style={{ "display": "block", "fontSize": "11px", "fontWeight": "400", "color": "var(--n-300)" }}>
                              {T(_t_15?.["asigTipSub"])}
                            </span>
                          </span>
                        </>) : null}
                        <button data-m="chip-asig" onClick={_t_15?.["qaToggle"]} aria-label={_t_15?.["asigTitle"]} style={{ "height": "30px", "padding": "0 10px 0 4px", "borderRadius": "9999px", "border": "1px " + S(_t_15?.["asigBorder"]), "background": S(_t_15?.["qaBg"]), "color": "var(--n-900)", "fontSize": "12px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp18 scp19">
                          {" "}
                          {_t_15?.["asigHas"] ? (<>
                            <span style={{ "width": "22px", "height": "22px", "borderRadius": "9999px", "background": "var(--n-200)", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "10px", "fontWeight": "600", "color": "var(--n-900)", "flexShrink": "0", "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                              {T(_t_15?.["asigIni"])}
                            </span>
                            {T(_t_15?.["asigFirst"])}
                          </>) : null}
                          {" "}
                          {_t_15?.["asigNone"] ? (<>
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
                        {_t_15?.["qaOpen"] ? (<>
                          {" "}
                          {V["esMovil"] ? (<div data-m="velo-hoja" onClick={_t_15?.["qaToggle"]} style={{ "position": "fixed", "inset": "0", "zIndex": "60" }}></div>) : null}
                          <div data-m="hoja" role="menu" aria-label={"Asignar " + S(_t_15?.["code"])} style={{ "position": "absolute", "top": "calc(100% + 6px)", "right": "0", "zIndex": "40", "width": "300px", "maxWidth": "calc(100vw - 32px)", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "6px", "display": "flex", "flexDirection": "column", "gap": "2px", "boxShadow": "rgba(0,0,0,0.1) 0px 10px 15px -3px, rgba(0,0,0,0.1) 0px 4px 6px -4px", "animation": "dropIn var(--duration-base) var(--ease-standard) both", "cursor": "default" }}>
                            {" "}
                            <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em", "padding": "6px 8px 4px" }}>
                              {"ASIGNAR "}{T(_t_15?.["code"])}{" A"}
                            </div>
                            {" "}
                            {L(_t_15?.["qaOpts"]).map((_o_16, $index) => (
                              <React.Fragment key={$index}>
                                {" "}
                                <button onClick={_o_16?.["go"]} role="menuitem" title={_o_16?.["full"]} style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": S(_o_16?.["bg"]), "border": "none", "borderRadius": "8px", "padding": "7px 8px", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scpq scpr">
                                  {" "}
                                  <span style={{ "width": "24px", "height": "24px", "borderRadius": "9999px", "background": "var(--n-200)", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "10px", "fontWeight": "600", "color": "var(--n-900)", "flexShrink": "0", "transform": "scale(var(--ic,1))", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                                    {T(_o_16?.["ini"])}
                                  </span>
                                  {" "}
                                  <span style={{ "fontSize": "14px", "fontWeight": S(_o_16?.["weight"]), "color": "var(--n-900)", "minWidth": "0", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                                    {T(_o_16?.["nombre"])}
                                  </span>
                                  {_o_16?.["hasTag"] ? (<>
                                    <span style={{ "flexShrink": "0", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "10px", "letterSpacing": "0.04em", "color": "var(--n-900)", "background": S(_o_16?.["tagBg"]), "borderRadius": "9999px", "padding": "2px 7px" }}>
                                      {T(_o_16?.["tag"])}
                                    </span>
                                  </>) : null}
                                  {" "}
                                  <span style={{ "marginLeft": "auto", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "flexShrink": "0" }}>
                                    {T(_o_16?.["carga"])}
                                  </span>
                                  {" "}
                                </button>
                                {" "}
                              </React.Fragment>
                            ))}
                            {" "}
                            {_t_15?.["asigHas"] && V["canUnassign"] ? (<>
                              {" "}
                              <button onClick={_t_15?.["qaClear"]} role="menuitem" style={{ "display": "flex", "alignItems": "center", "gap": "8px", "width": "100%", "textAlign": "left", "background": "transparent", "border": "none", "borderTop": "1px solid var(--n-200)", "borderRadius": "0 0 8px 8px", "marginTop": "4px", "padding": "9px 8px 7px", "fontSize": "13px", "color": "var(--n-600)", "cursor": "pointer", "transition": "background-color var(--duration-fast) var(--ease-standard)" }} className="scp0 scpt">
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
                    {_t_15?.["canEdit"] ? (<>
                      {" "}
                      <button onClick={_t_15?.["edit"]} aria-label={_t_15?.["editLabel"]} title={_t_15?.["editLabel"]} style={{ "flexShrink": "0", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "6px", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp1a scp19">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transition": "transform var(--duration-base) var(--ease-standard)", "transform": "var(--im,rotate(0deg) scale(1)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                        </svg>
                      </button>
                      {" "}
                    </>) : null}
                    {" "}
                  </div>
                  {" "}
                  <div style={{ "marginTop": "-6px" }}>
                    {" "}
                    <div style={{ "fontSize": "14px", "lineHeight": "1.43", "fontWeight": "500", "color": "var(--n-900)", "textWrap": "pretty" }}>
                      {" "}
                      {L(_t_15?.["tituloParts"]).map((_p_17, $index) => (
                        <React.Fragment key={$index}>
                          {" "}
                          <span key={_p_17?.["k"]} style={{ "background": S(_p_17?.["bg"]), "borderRadius": "3px", "color": "var(--n-900)" }}>
                            {T(_p_17?.["t"])}
                          </span>
                          {" "}
                        </React.Fragment>
                      ))}
                      {" "}
                    </div>
                    {" "}
                    {_t_15?.["sitShow"] ? (<>
                      {" "}
                      <div style={{ "display": "flex", "alignItems": "center", "gap": "7px", "marginTop": "6px" }}>
                        {" "}
                        <span style={{ "width": "7px", "height": "7px", "borderRadius": "9999px", "background": S(_t_15?.["sitDot"]), "flexShrink": "0" }}></span>
                        {" "}
                        <span style={{ "fontSize": "13px", "lineHeight": "1.46", "color": "var(--n-700)", "minWidth": "0", "textWrap": "pretty" }}>
                          {T(_t_15?.["sitText"])}
                        </span>
                        {" "}
                      </div>
                      {" "}
                    </>) : null}
                    {" "}
                    <div style={{ "fontSize": "13px", "lineHeight": "1.46", "color": "var(--n-600)", "marginTop": "4px", "textWrap": "pretty" }}>
                      {" "}
                      {L(_t_15?.["excerptParts"]).map((_p_18, $index) => (
                        <React.Fragment key={$index}>
                          {" "}
                          <span key={_p_18?.["k"]} style={{ "background": S(_p_18?.["bg"]), "borderRadius": "3px" }}>
                            {T(_p_18?.["t"])}
                          </span>
                          {" "}
                        </React.Fragment>
                      ))}
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ "display": "flex", "alignItems": "center", "flexWrap": "wrap", "gap": "8px" }}>
                    {" "}
                    <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "background": S(_t_15?.["statusBg"]), "borderRadius": "9999px", "padding": "6px 12px", "fontSize": "12px", "fontWeight": "500", "color": "var(--n-900)", "whiteSpace": "nowrap" }}>
                      {_t_15?.["statusOpen"] ? (<>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={_t_15?.["statusDot"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                          <circle cx="12" cy="12" r="10"></circle>
                          <circle cx="12" cy="12" r="1" fill={_t_15?.["statusDot"]}></circle>
                        </svg>
                      </>) : null}
                      {_t_15?.["statusProg"] ? (<>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={_t_15?.["statusDot"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 6v6l4 2"></path>
                        </svg>
                      </>) : null}
                      {_t_15?.["statusClosed"] ? (<>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={_t_15?.["statusDot"]} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                          <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                          <path d="m9 11 3 3L22 4"></path>
                        </svg>
                      </>) : null}
                      {T(_t_15?.["statusLabel"])}
                    </span>
                    {" "}
                    <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "color": "var(--n-700)", "whiteSpace": "nowrap" }}>
                      {" "}
                      <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": S(_t_15?.["prioDot"]) }}></span>
                      {T(_t_15?.["prioLabel"])}{" "}
                    </span>
                    {" "}
                    {_t_15?.["slaShow"] ? (<>
                      {" "}
                      <span title={_t_15?.["slaTitle"]} style={{ "display": "inline-flex", "alignItems": "center", "gap": "6px", "background": S(_t_15?.["slaBg"]), "border": S(_t_15?.["slaBorder"]), "borderRadius": "9999px", "padding": "4px 10px", "fontSize": "11px", "fontWeight": "500", "color": S(_t_15?.["slaInk"]), "whiteSpace": "nowrap" }}>
                        {" "}
                        {_t_15?.["slaLate"] ? (<>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--naranja)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                            <path d="M12 9v4"></path>
                            <path d="M12 17h.01"></path>
                          </svg>
                        </>) : null}
                        {" "}
                        {_t_15?.["slaWatch"] ? (<>
                          <span style={{ "width": "6px", "height": "6px", "borderRadius": "9999px", "background": "var(--naranja)", "flexShrink": "0" }}></span>
                        </>) : null}
                        {" "}
                        {_t_15?.["slaWaiting"] ? (<>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--azul)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0" }}>
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </>) : null}
                        {T(_t_15?.["slaLabel"])}{" "}
                      </span>
                      {" "}
                    </>) : null}
                    {" "}
                    {_t_15?.["canTake"] ? (<>
                      {" "}
                      <button onClick={_t_15?.["take"]} aria-label={_t_15?.["takeLabel"]} title={_t_15?.["takeLabel"]} style={{ "marginLeft": "auto", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "5px 10px", "fontSize": "12px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "whiteSpace": "nowrap", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)" }} className="scp1b scp4">
                        {" "}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "animation": S(_t_15?.["tapTake"]), "transform": "var(--im,translateY(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M19 8v6"></path>
                          <path d="M22 11h-6"></path>
                        </svg>
                        {"Tomar "}
                      </button>
                      {" "}
                    </>) : null}
                    {" "}
                  </div>
                  {" "}
                  <div style={{ "display": "flex", "alignItems": "center", "gap": "10px", "borderTop": "1px solid var(--n-200)", "paddingTop": "12px", "marginTop": "auto" }}>
                    {" "}
                    <span style={{ "fontSize": "12px", "color": "var(--n-500)", "minWidth": "0", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis" }}>
                      {T(_t_15?.["asig"])}
                    </span>
                    {" "}
                    {_t_15?.["hasFiles"] ? (<>
                      {" "}
                      <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "4px", "flexShrink": "0", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
                        {" "}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                          <circle cx="9" cy="9" r="2"></circle>
                          <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"></path>
                        </svg>
                        {T(_t_15?.["fileCount"])}{" "}
                      </span>
                      {" "}
                    </>) : null}
                    {" "}
                    {_t_15?.["hasComments"] ? (<>
                      {" "}
                      <span style={{ "display": "inline-flex", "alignItems": "center", "gap": "4px", "flexShrink": "0", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)" }}>
                        {" "}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        {T(_t_15?.["commentCount"])}{" "}
                      </span>
                      {" "}
                    </>) : null}
                    {" "}
                    <span style={{ "marginLeft": "auto", "display": "inline-flex", "alignItems": "center", "gap": "6px", "flexShrink": "0", "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)" }}>
                      {" "}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 6v6l4 2"></path>
                      </svg>
                      {T(_t_15?.["updated"])}{" "}
                    </span>
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
        </>) : null}
        {" "}
        {V["isEmpty"] ? (<>
          {" "}
          <div style={{ "background": "var(--n-0)", "border": "1px solid var(--n-200)", "borderRadius": "12px", "padding": "64px 24px", "textAlign": "center" }}>
            {" "}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--n-400)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "margin": "0 auto 12px", "display": "block" }}>
              <path d="m13.5 8.5-5 5"></path>
              <path d="m8.5 8.5 5 5"></path>
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <div style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-500)", "letterSpacing": "0.04em" }}>
              {"SIN RESULTADOS"}
            </div>
            {" "}
            <div style={{ "fontSize": "16px", "lineHeight": "1.5", "fontWeight": "500", "color": "var(--n-900)", "marginTop": "8px" }}>
              {T(V["emptyTitle"])}
            </div>
            {" "}
            <div style={{ "fontSize": "14px", "lineHeight": "1.43", "color": "var(--n-500)", "marginTop": "4px", "textWrap": "pretty" }}>
              {T(V["emptyHelp"])}
            </div>
            {" "}
            {V["emptyDayOne"] ? (<>
              {" "}
              <button onClick={V["onNewTicket"]} style={{ "background": "var(--n-1000)", "color": "var(--n-0)", "border": "none", "borderRadius": "8px", "padding": "10px 16px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "marginTop": "16px", "boxShadow": "rgba(0,0,0,0.05) 0px 1px 2px 0px", "display": "inline-flex", "alignItems": "center", "gap": "8px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scp1c scp2">
                {" "}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--n-0)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard)" }}>
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                {"Crear el primer ticket "}
              </button>
              {" "}
            </>) : null}
            {" "}
            <button onClick={V["onClearFilters"]} style={{ "marginTop": "16px", "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "500", "cursor": "pointer", "display": "inline-flex", "alignItems": "center", "gap": "6px", "transition": "transform var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)" }} className="scpx scp4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,rotate(0deg)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                <path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"></path>
                <path d="m22 3-5 5"></path>
                <path d="m17 3 5 5"></path>
              </svg>
              {"Limpiar filtros"}
            </button>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
        {V["pgTickets"]?.["show"] ? (<>
          {" "}
          <div data-m="paginador" style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "16px", "background": "var(--n-50)", "borderRadius": "12px", "padding": "10px 16px", "marginTop": "12px" }}>
            {" "}
            <span style={{ "fontFamily": "'JetBrains Mono',monospace", "fontSize": "11px", "color": "var(--n-600)", "letterSpacing": "0.04em" }}>
              {T(V["pgTickets"]?.["range"])}
            </span>
            {" "}
            <div style={{ "display": "flex", "gap": "8px" }}>
              {" "}
              <button onClick={V["pgTickets"]?.["prev"]} disabled={V["pgTickets"]?.["atStart"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "cursor": S(V["pgTickets"]?.["prevCursor"]), "opacity": S(V["pgTickets"]?.["prevOpacity"]) }} className="scpl scp10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                {"Anterior"}
              </button>
              {" "}
              <button onClick={V["pgTickets"]?.["next"]} disabled={V["pgTickets"]?.["atEnd"]} style={{ "background": "var(--n-0)", "color": "var(--n-900)", "border": "1px solid var(--n-200)", "borderRadius": "8px", "fontSize": "14px", "fontWeight": "500", "padding": "6px 12px", "cursor": S(V["pgTickets"]?.["nextCursor"]), "opacity": S(V["pgTickets"]?.["nextOpacity"]) }} className="scp1d scp10">
                {"Siguiente"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--n-600)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ "flexShrink": "0", "transform": "var(--im,translateX(0)) scale(var(--ic,1))", "transformOrigin": "center", "transition": "transform var(--duration-base) var(--ease-standard),stroke var(--duration-fast) var(--ease-standard)", "stroke": "var(--is,var(--n-600))" }}>
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </>) : null}
        {" "}
      </div>
      {" "}
    </>
  );
}
