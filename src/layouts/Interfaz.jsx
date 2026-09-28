// Interfaz completa. V = valores que entrega Logica.renderVals() (src/logic).
// Cada pantalla y capa vive en su propio componente; aquí solo se decide cuál se muestra.
import Login from '../pages/Login.jsx';
import AppLayout from './AppLayout.jsx';
import ModalConfirmacion from '../components/capas/ModalConfirmacion.jsx';
import Celebracion from '../components/capas/Celebracion.jsx';
import VisorImagen from '../components/capas/VisorImagen.jsx';
import MomentoCierre from '../components/capas/MomentoCierre.jsx';
import MomentoReapertura from '../components/capas/MomentoReapertura.jsx';
import MomentoBloqueante from '../components/capas/MomentoBloqueante.jsx';
import CargaPesada from '../components/capas/CargaPesada.jsx';
import IndicadorGuardando from '../components/capas/IndicadorGuardando.jsx';
import Toast from '../components/capas/Toast.jsx';
import ZonaSoltar from '../components/capas/ZonaSoltar.jsx';
import Recorrido from '../components/capas/Recorrido.jsx';
import FichaPersona from '../components/metricas/FichaPersona.jsx';
import PantallaArranque from '../components/capas/PantallaArranque.jsx';
import BotonChat from '../components/chat/BotonChat.jsx';
import ChatFlotante from '../components/chat/ChatFlotante.jsx';

export function renderInterfaz(V) {
  return (
    <>
      {V["showLogin"] ? (<Login V={V} />) : null}
      {V["showApp"] ? (<AppLayout V={V} />) : null}
      {V["modalOpen"] ? (<ModalConfirmacion V={V} />) : null}
      {V["celebrating"] ? (<Celebracion V={V} />) : null}
      {V["lbOn"] ? (<VisorImagen V={V} />) : null}
      {V["momentClose"] ? (<MomentoCierre V={V} />) : null}
      {V["momentReopen"] ? (<MomentoReapertura V={V} />) : null}
      {V["momentNudge"] ? (<MomentoBloqueante V={V} />) : null}
      {V["heavyOn"] ? (<CargaPesada V={V} />) : null}
      {V["saving"] ? (<IndicadorGuardando V={V} />) : null}
      {V["hasToast"] ? (<Toast V={V} />) : null}
      {V["arrastreOn"] ? (<ZonaSoltar V={V} />) : null}
      {V["booting"] ? (<PantallaArranque V={V} />) : null}
      {V["chatFabOn"] ? (<BotonChat V={V} />) : null}
      {V["chatOpen"] ? (<ChatFlotante V={V} />) : null}
      {V["fichaOn"] ? (<FichaPersona V={V} />) : null}
      {V["recOn"] ? (<Recorrido V={V} />) : null}
    </>
  );
}
