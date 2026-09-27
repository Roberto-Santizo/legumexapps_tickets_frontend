// Constantes del sistema: estados, prioridades, SLA, colores y límites.
// Solo lectura. La lógica las importa directo (antes eran campos de la clase).

export const ST = {
  open: { label: 'Abierto', bg: 'var(--ambar-tinte)', dot: 'var(--naranja)' },
  in_progress: { label: 'En progreso', bg: 'var(--azul-tinte)', dot: 'var(--azul)' },
  closed: { label: 'Cerrado', bg: 'var(--verde-tinte)', dot: 'var(--verde)' }
};

export const PR = {
  low: { label: 'Baja', dot: 'var(--verde)' },
  medium: { label: 'Media', dot: 'var(--violeta)' },
  high: { label: 'Alta', dot: 'var(--naranja)' }
};

export const RING = ['var(--azul)', 'var(--violeta)', 'var(--verde)', 'var(--naranja)'];

// Umbral de atención inventado para el prototipo (la API no lo expone): se mide sobre el
// tiempo SIN MOVIMIENTO, no sobre la edad del ticket.
export const SLA = { high: 8, medium: 48, low: 120 };

export const EV = {
  create: { label: 'Creado', color: 'var(--n-500)' },
  assign: { label: 'Asignación', color: 'var(--azul)' },
  status: { label: 'Estado', color: 'var(--violeta)' },
  close: { label: 'Cierre', color: 'var(--verde)' },
  reopen: { label: 'Reapertura', color: 'var(--naranja)' },
  nudge: { label: 'Marcado como bloqueante', color: 'var(--naranja)' },
  call: { label: 'Llamada', color: 'var(--violeta)' },
  edit: { label: 'Edición', color: 'var(--n-500)' }
};

// ── 1. Borradores: nada de lo tipeado se pierde por un 401 o un recargado
export const DK = 'mesatic.draft.';

// ── 3. La vista vive en la dirección: filtros compartibles por enlace
export const URLKEYS = ['estado', 'prioridad', 'orden', 'vista', 'q', 'ticket'];

// ── 4. Adjuntos: se valida antes de subir, no después de la respuesta
export const MIME = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const MAXMB = 5;

export const STOP = ['para', 'desde', 'como', 'esta', 'este', 'tiene', 'todo', 'pero', 'cuando', 'solicitud', 'problema'];

// Andamio de descripción por categoría — editar acá, no en los componentes.
// Clave: nombre de la categoría tal como está en ticket_categories.
// blobatar.dev — cara determinista por persona. El hue se fija a uno de los cuatro acentos
// del sistema para no abrir la paleta; la forma sigue saliendo del nombre.
// Solo en el chat y en Actividad: en tablas y asignación las iniciales se leen mejor.
export const BLOB_HUE = [260, 150, 300, 45];

export const NAV_INK = { tickets: 'var(--azul)', pulso: 'var(--verde)', cats: 'var(--violeta)', users: 'var(--naranja)', chat: 'var(--cian)' };

export const MOSTRAR_SIN_ABRIR = true;

export const PAGE_SIZE = 20;

export const PCODE = { high: 'P1', medium: 'P2', low: 'P3' };

// Diseño responsivo: teléfonos (hasta 767 px de ancho, o pantalla táctil de poca altura =
// teléfono en horizontal) usan el diseño móvil: barra superior, menú deslizable y una sola
// vista en tarjetas. Las tablets (táctil sin cursor, hasta 1366 px) también; index.css les
// agranda tamaños y columnas. Debe coincidir con la media query de index.css.
export const MQ_MOVIL = '(max-width: 767px), (max-height: 500px) and (pointer: coarse), (pointer: coarse) and (hover: none) and (max-width: 1366px)';

// Único dominio de correo que se acepta al crear o editar usuarios
export const DOMINIO_CORREO = '@legumex.net';
