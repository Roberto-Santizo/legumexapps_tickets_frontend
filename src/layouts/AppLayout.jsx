// Marco de la app con sesión: fondo, barra lateral, notificaciones, encabezado y pantallas.
// V: valores de la lógica (src/logic/valores).
import { S } from '../utils/runtime.js';
import FondoSierra from '../components/layout/FondoSierra.jsx';
import CieloApp from '../components/layout/CieloApp.jsx';
import BarraLateral from '../components/layout/BarraLateral.jsx';
import BarraMovil from '../components/layout/BarraMovil.jsx';
import PanelNotificaciones from '../components/layout/PanelNotificaciones.jsx';
import Encabezado from '../components/layout/Encabezado.jsx';
import AvisoError500 from '../components/layout/AvisoError500.jsx';
import AccesoRestringido from '../pages/AccesoRestringido.jsx';
import NoEncontrado from '../pages/NoEncontrado.jsx';
import TicketsLista from '../pages/tickets/TicketsLista.jsx';
import TicketFormulario from '../pages/tickets/TicketFormulario.jsx';
import TicketDetalle from '../pages/tickets/TicketDetalle.jsx';
import Pulso from '../pages/Pulso.jsx';
import Chat from '../pages/Chat.jsx';
import EntidadFormulario from '../pages/EntidadFormulario.jsx';
import Categorias from '../pages/Categorias.jsx';
import Usuarios from '../pages/Usuarios.jsx';

export default function AppLayout({ V }) {
  return (
    <>
      <FondoSierra V={V} />
      <div data-shell="" style={{ "position": "relative", "zIndex": "1", "display": "flex", "alignItems": "flex-start", "height": "100vh", "overflow": "hidden" }}>
        {V["esMovil"] ? (<BarraMovil V={V} />) : null}
        {V["menuMovilAbierto"] ? (<div data-m="velo" aria-hidden="true" onClick={V["onCerrarMenu"]} style={{ "position": "fixed", "inset": "0", "zIndex": "59", "background": "rgba(10,10,10,0.4)", "animation": "overlayIn var(--duration-base) var(--ease-standard)" }}></div>) : null}
        {" "}
        <BarraLateral V={V} />
        {" "}
        {V["notifOpen"] ? (<PanelNotificaciones V={V} />) : null}
        {" "}
        <main data-sheet="" onScroll={V["onSheetScroll"]} style={{ "flex": "1", "minWidth": "0", "display": "flex", "flexDirection": "column", "background": S(V["sheetBg"]), "backdropFilter": S(V["sheetBlur"]), "WebkitBackdropFilter": S(V["sheetBlur"]), "transition": "background-color var(--duration-page) var(--ease-standard),box-shadow var(--duration-page) var(--ease-standard)", "borderRadius": "16px", "margin": "16px 16px 0 4px", "height": "calc(100vh - 32px)", "overflowY": S(V["sheetOverflow"]), "overscrollBehavior": "contain", "scrollbarGutter": "stable", "WebkitMaskImage": S(V["sheetMask"]), "maskImage": S(V["sheetMask"]), "boxShadow": S(V["sheetShadow"]) }}>
          <CieloApp />
          {" "}
          {V["notList"] ? (<Encabezado V={V} />) : null}
          {" "}
          <div key={V["screenKey"]} data-m="pantalla" style={{ "padding": "20px " + S(V["gridGutter"]) + " " + S(V["padBottom"]) + " 24px", "maxWidth": "1640px", "width": "100%", "animation": S(V["pageAnim"]) + " var(--duration-page) var(--ease-standard) both" }}>
            {" "}
            {V["show500"] ? (<AvisoError500 V={V} />) : null}
            {" "}
            {V["showForbidden"] ? (<AccesoRestringido V={V} />) : null}
            {" "}
            {V["showNotFound"] ? (<NoEncontrado V={V} />) : null}
            {" "}
            {V["showList"] ? (<TicketsLista V={V} />) : null}
            {" "}
            {V["showForm"] ? (<TicketFormulario V={V} />) : null}
            {" "}
            {V["showDetail"] ? (<TicketDetalle V={V} />) : null}
            {" "}
            {V["showPulso"] ? (<Pulso V={V} />) : null}
            {" "}
            {V["showChatPage"] ? (<Chat V={V} />) : null}
            {" "}
            {V["showEntity"] ? (<EntidadFormulario V={V} />) : null}
            {" "}
            {V["showCats"] ? (<Categorias V={V} />) : null}
            {" "}
            {V["showUsers"] ? (<Usuarios V={V} />) : null}
            {" "}
          </div>
          {" "}
        </main>
      </div>
    </>
  );
}
