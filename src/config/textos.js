// Textos de ayuda editables: guías del formulario por categoría y respuestas rápidas.

export const ANDAMIOS = {
  'Hardware': ['Qué equipo y dónde está', 'Desde cuándo pasa', 'Qué dice el error, si aparece', 'Qué ya probé'],
  'Redes y conectividad': ['Dónde estás', 'Desde cuándo', 'Si es con cable o wifi', 'Qué ya probé'],
  'Software y licencias': ['Qué programa', 'Para quién es', 'Para cuándo lo necesitás'],
  'Accesos y cuentas': ['Qué sistema', 'Con qué usuario entrás', 'Qué mensaje te da'],
  '_': ['Qué pasa', 'Desde cuándo', 'Qué ya probé']
};

// Respuestas rápidas del solicitante: lo que suele contestar alguien de un área a TIC
export const MACROS_USER = [
  { label: 'Sigue igual', text: 'Lo probé de nuevo y sigue igual. ¿Qué más puedo revisar de mi lado?' },
  { label: 'Ya funciona', text: 'Ya funciona, gracias. Pueden cerrarlo.' },
  { label: 'Te paso captura', text: 'Te adjunto una captura de cómo se ve ahora.' },
  { label: 'Estoy en mi puesto', text: 'Estoy en mi puesto hasta las 17 h; pueden pasar cuando les quede bien.' },
  { label: '¿Novedades?', text: '¿Hay novedades? Esto me está frenando el trabajo.' }
];

export const MACROS = [
  { label: 'Pedir más datos', text: 'Para avanzar necesito dos datos: desde cuándo pasa y si le ocurre a alguien más del área.' },
  { label: 'Voy en camino', text: 'Voy en camino a revisarlo en sitio. Si no llego en la próxima hora, escribime por acá.' },
  { label: 'Esperando repuesto', text: 'Ya se pidió el repuesto. Te aviso en cuanto llegue para coordinar el cambio.' },
  { label: 'Quedó resuelto', text: 'Quedó resuelto de nuestro lado. Si vuelve a pasar, comentá acá mismo y lo reabrimos.' }
];

// Recorrido guiado ("¿Cómo funciona?", botón ? de la tarjeta del usuario). Cada paso ilumina
// el primer elemento visible de "donde" (selectores); sin "donde", la tarjeta va centrada.
// En el teléfono el menú está plegado: por eso algunos pasos apuntan también al botón ☰.
export const RECORRIDO_ADMIN = [
  { titulo: 'Bienvenido a Tickets TIC', texto: 'En un minuto te mostramos dónde está cada cosa. Podés salir cuando quieras y volver a verlo con el botón ? de abajo del menú.' },
  { donde: ['[data-recorrido="menu-nav"]', '[data-recorrido="menu-movil"]'], titulo: 'El menú', texto: 'Tickets es la bandeja del área. Métricas, Categorías y Usuarios son para administrar; Chat reúne todas las conversaciones.' },
  { donde: ['[data-recorrido="bandeja"]', '[data-recorrido="menu-movil"]'], titulo: 'Tu bandeja de un vistazo', texto: 'Cuántos tickets hay abiertos, en progreso y cerrados. Tocá un estado para filtrar la lista; "Míos" muestra solo los tuyos.' },
  { donde: ['[data-m="controles"]'], titulo: 'Qué ver y cómo', texto: 'Elegí entre todos los tickets o los tuyos, el período y los filtros de estado o prioridad. La lupa busca por título o código.' },
  { donde: ['[data-recorrido="crear"]'], titulo: 'Crear un ticket', texto: 'También podés cargar uno vos, por ejemplo cuando te avisan por teléfono. Al crearlo se avisa por correo al área.' },
  { donde: ['[data-m="grilla-tarjetas"] > :first-child'], titulo: 'Cada ticket', texto: 'Quién lo pidió y su código; el chip de color es el estado y al lado va la prioridad. Con "Tomar" te lo asignás. Si ya es de otro, lo podés leer pero no responder: así nadie se pisa.' },
  { donde: ['[data-recorrido="campana"]'], titulo: 'Novedades', texto: 'La campana avisa de tickets nuevos, de lo que te asignan y de las respuestas de los solicitantes.' },
  { donde: ['[data-m="fab"]'], titulo: 'Conversaciones', texto: 'Respondé sin salir de la lista. Si arrastrás una imagen a la conversación, se sube sola.' },
  { donde: ['[data-recorrido="nav-pulso"]', '[data-recorrido="menu-movil"]'], titulo: 'Métricas del área', texto: 'Tiempos de respuesta, carga de cada persona y de dónde vienen los problemas.' },
  { donde: ['[data-recorrido="tema"]', '[data-recorrido="menu-movil"]'], titulo: 'Claro u oscuro', texto: 'Cambiá el tema: claro, oscuro (de noche) o automático, según tu equipo.' },
  { titulo: '¡Listo!', texto: 'Eso es todo. Si te olvidás de algo, el botón ? de abajo del menú repite este recorrido.' }
];
export const RECORRIDO_USUARIO = [
  { titulo: 'Bienvenido a Tickets TIC', texto: 'Acá reportás lo que te frena y lo seguís hasta que quede resuelto. En un minuto te mostramos cómo.' },
  { donde: ['[data-recorrido="crear"]'], titulo: 'Reportá un problema', texto: 'Contá qué pasa, elegí la categoría y qué tan urgente es. El área recibe el aviso por correo.' },
  { donde: ['[data-m="grilla-tarjetas"] > :first-child'], titulo: 'Seguí cada ticket', texto: 'El chip de color dice en qué va. Si aparece "Te están esperando", el área necesita un dato tuyo. Adentro del ticket podés marcar "Esto me está frenando".' },
  { donde: ['[data-recorrido="bandeja"]', '[data-recorrido="menu-movil"]'], titulo: 'Tu bandeja', texto: 'Cuántos tickets tenés abiertos, en progreso y cerrados. Tocá un estado para ver solo esos.' },
  { donde: ['[data-recorrido="campana"]'], titulo: 'Novedades', texto: 'La campana te avisa cuando el área te responde o cambia algo de tus tickets.' },
  { donde: ['[data-m="fab"]'], titulo: 'Conversaciones', texto: 'Escribile al área sin salir de la lista. Si arrastrás una captura, se sube sola.' },
  { donde: ['[data-recorrido="tema"]', '[data-recorrido="menu-movil"]'], titulo: 'Claro u oscuro', texto: 'Cambiá el tema: claro, oscuro (de noche) o automático, según tu equipo.' },
  { titulo: '¡Listo!', texto: 'Eso es todo. Si te olvidás de algo, el botón ? de abajo del menú repite este recorrido.' }
];
