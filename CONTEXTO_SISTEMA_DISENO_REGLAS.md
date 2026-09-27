# LEGUMEX Tickets TIC — Qué es el sistema, cómo está diseñado, y reglas de trabajo

> Punto de partida para cualquier persona o agente de IA que retome este proyecto. Describe
> cómo está el sistema HOY y las reglas de trabajo pedidas. No es una lista de tareas.
> Es el único `.md` de contexto del proyecto (el `README.md` del prototipo se unificó aquí).

## Qué es

Mesa de ayuda del Departamento de TIC de Agroindustria Legumex, S.A. Las personas de cada
área abren tickets (hardware, software, redes, accesos...), el equipo de TIC los toma,
conversa con el solicitante, adjunta imágenes y los cierra. Incluye chat por ticket,
notificaciones, métricas del área (pantalla "Métricas"; en el código se llama `pulso`), y catálogos de categorías y usuarios.

Roles: **admin** (equipo de TIC: ve todo, asigna, cambia estado y prioridad, gestiona
catálogos y Métricas) y **usuario** (solicitante: ve solo sus tickets, los crea, comenta y
avisa si ya se resolvió o si lo está frenando). Cada persona ve el sistema con su propio
rol; no hay "Ver como".

El sistema vive en un **servidor local** de la empresa. El despliegue (servidor, build de
producción, proxy, etc.) lo hace y lo mantiene el creador del repositorio; este proyecto
no incluye ni documenta nada de eso.

## Stack técnico

- **Frontend** (este repo): React 18 + Vite 5. Solo JSX, sin TypeScript. Sin librerías de
  UI, router ni CSS framework: los estilos van en línea en cada elemento (así vino el
  prototipo aprobado) y lo global (variables, animaciones, resets) está en `src/index.css`.
  Fuentes: Inter y JetBrains Mono (Google Fonts, en `index.html`).
- **Backend**: API Laravel "Sistema de Tickets", con JWT (`Authorization: Bearer`) y
  respuesta en el sobre `{ statusCode, message, data }` (validación 422:
  `{ message, errors: { campo: [...] } }`). Lo administra otra persona: este frontend solo
  lo consume. No se inventan endpoints ni comportamientos; si algo no está confirmado, se
  pregunta.

## Cómo está armado (arquitectura)

El prototipo llegó como dos archivos gigantes (`logic.js`, 2700 líneas, y `template.jsx`,
7130 líneas). Se reestructuró **sin cambiar el comportamiento ni el diseño**: el código se
movió con scripts que verificaban dependencias, y el DOM resultante se comparó contra el
original en recorridos automáticos (modo demo, simulado y API real, rol admin y usuario)
hasta ser idéntico.

El patrón es **lógica + valores + interfaz**:

1. `src/logic/Logica.js` guarda **todo el estado** en un solo objeto (`this.state`) y
   tiene las reglas. Su `setState` es síncrono (ver `LogicaBase.js`) y le pide a
   `App.jsx` que vuelva a pintar.
2. En cada pintado, `Logica.renderVals()` arma un objeto plano **V** con todo lo que la
   interfaz necesita: textos, colores, banderas (`showList`, `canEdit`...) y handlers
   (`onLogin`, `onChatSend`...). Lo arma por secciones, una por pantalla
   (`src/logic/valores/*.js`), **en un orden fijo** porque algunas leen claves que dejó una
   anterior (por ejemplo, `titulos` pisa el título que puso `lista`).
3. La interfaz (`src/layouts/Interfaz.jsx` y sus componentes) **solo pinta V**: no tiene
   estado ni lógica propia. Cada componente recibe `{ V }`.
4. `src/services/sync.js` compara el estado antes y después de cada acción y manda al
   servidor **solo lo que cambió**, en orden por ticket. Si el servidor rechaza algo,
   avisa y recarga los datos reales. Cada 45 s vuelve a pedir todo (sondeo).

Consecuencia práctica: para cambiar **qué se muestra o cómo se comporta**, se toca la
lógica (`metodos/` o `valores/`); para cambiar **cómo se ve**, se toca el componente.
Una clave nueva de V se agrega en la sección de `valores/` de esa pantalla.

### Estructura de carpetas

```
src/
  main.jsx                 arranque (+ activa los modos de prueba si existen)
  App.jsx                  une lógica, interfaz y sincronización
  index.css                variables, animaciones y resets globales
  logic/
    LogicaBase.js          setState síncrono + aviso al anfitrión
    Logica.js              estado inicial, ciclo de vida y renderVals()
    metodos/               reglas por dominio (se mezclan en Logica.prototype)
      tiempos.js           antigüedad, SLA, actividad
      interfaz.js          avisos, modales, carga, paginación, formato de texto
      sesion.js            quién es "yo", entrar con la API
      tickets.js           permisos y acciones (tomar, mover, cerrar, reabrir, comentar)
      formulario.js        crear / editar ticket (borrador, validación, duplicados)
      url.js               filtros y ticket abierto en la URL
      adjuntos.js          imágenes y visor
      chat.js              conversaciones
      pulso.js             métricas y CSV
      catalogos.js         categorías y usuarios
      notificaciones.js    notificaciones y sondeo
    valores/               renderVals por pantalla (login, app, lista, detalle, chat...)
  config/
    constantes.js          estados, prioridades, SLA, colores, límites
    textos.js              guías del formulario por categoría y respuestas rápidas
  services/
    api.js                 ÚNICO cliente de la API
    sync.js                puente estado ↔ API
  layouts/
    Interfaz.jsx           raíz: login o app + capas globales
    AppLayout.jsx          marco con sesión: fondo, barra lateral, encabezado, pantallas
  pages/                   una pantalla por archivo (Login, Pulso, Chat, Categorias,
    tickets/               Usuarios, EntidadFormulario, 403, 404, lista/detalle/formulario)
  components/
    layout/                barra lateral, notificaciones, encabezado, fondo, aviso 500
    tickets/               controles de la lista y vistas tarjetas / tabla / kanban
    detalle/               partes del detalle de un ticket
    chat/                  lista, conversación, panel flotante y botón
    capas/                 modal, visor, toast, celebración, momentos, cargas
  utils/runtime.js         ayudantes de la interfaz: T (texto), S (string), L (lista)
  mocks/                   SOLO PRUEBAS (ver abajo)
```

## Datos de prueba (`src/mocks/`) — se eliminan en producción

Todo lo que es de prueba vive en `src/mocks/`:

| Archivo | Para qué | Cómo se usa |
|---|---|---|
| `datosDemo.js` | Usuarios, categorías y tickets de ejemplo en memoria, sin API | `.env` con `VITE_DEMO=true` → `npm run dev` |
| `apiSimulada.js` | Responde como la API real desde el navegador (sin backend) | `npm run dev:simulado` (usa `.env.simulado`) |
| `cargar-datos-prueba.mjs` | Carga datos de prueba en la **base real** usando la API | `npm run datos-prueba` (ver abajo) |

- **Modo demostración** (`VITE_DEMO=true`): la app no llama a la API. Entrar con cualquier
  correo de `datosDemo.js` (ej. `m.sandoval@legumex.net`, admin, o `l.ovando@legumex.net`,
  usuario) y cualquier contraseña; el botón "Usar datos de prueba" la llena. En este modo
  se ven funciones que la API no permite (ver "Funciones desactivadas").
- **Modo simulado** (`npm run dev:simulado`): la app usa el camino real de la API
  (`api.js` + `sync.js`), pero `fetch` a `/api` lo contesta `apiSimulada.js`. Entrar con
  `admin@legumex.net` (admin) o `usuario@legumex.net` (usuario) y cualquier contraseña de
  8+ caracteres. Todo se reinicia al recargar.
- **Datos en la base real**, con un admin que ya exista:
  ```bash
  # Linux / macOS
  ADMIN_EMAIL=admin@legumex.net ADMIN_PASSWORD=tu_clave npm run datos-prueba
  # Windows PowerShell
  $env:ADMIN_EMAIL="admin@legumex.net"; $env:ADMIN_PASSWORD="tu_clave"; npm run datos-prueba
  ```
  Crea 4 categorías, 2 admins y 3 usuarios (`prueba.*@legumex.net`, clave `Prueba1234`),
  8 tickets con asignaciones y comentarios, y cierra 2. Se puede repetir sin duplicar
  usuarios ni categorías (los tickets sí se vuelven a agregar). `API_URL` opcional.

**Cómo se eliminan al pasar a producción:**
1. Borrar la carpeta `src/mocks/`. No hace falta tocar código: `main.jsx` los busca con
   `import.meta.glob`, y si no existen la app compila y arranca normal contra la API.
2. Limpieza opcional: borrar `.env.simulado` y los scripts `dev:simulado` y
   `datos-prueba` de `package.json`, y la variable `VITE_DEMO` de `.env`.

Ningún archivo fuera de `src/mocks/` importa datos de prueba: la lógica arranca con listas
vacías y los datos de demostración le llegan por la prop `datosDemo` desde `main.jsx`.

## Configuración (`.env`)

Copiar `.env.example` a `.env` (el `.env` no se sube al repo):

- `VITE_API_URL`: base de la API que usa el navegador. En desarrollo: `/api`.
- `VITE_FILES_URL`: base de los adjuntos (disco público de Laravel,
  `php artisan storage:link`). En desarrollo: `/storage`.
- `VITE_API_TARGET`: backend al que el servidor de desarrollo de Vite reenvía `/api` y
  `/storage` (evita CORS en local). Ej. `http://192.168.10.209:8001`.
- `VITE_DEMO`: `true` = modo demostración sin backend (solo pruebas).

## Qué usa de la API

- Sesión: `POST /api/login` (correo y contraseña), `GET /api/check-status` al recargar.
  Token vencido → vuelve al login. El token se guarda en `localStorage`
  (`tickets-tic.token`).
- Al entrar y cada 45 s: `GET /api/users`, `/api/ticket_categories`, `/api/tickets`,
  `/api/ticket_comments`, `/api/ticket_histories`, `/api/ticket_attachments`.
  Si mientras llega esa respuesta la persona hizo un cambio (o hay guardados viajando),
  la respuesta se descarta porque ya es vieja y taparía el cambio en pantalla, y se vuelve
  a pedir a los 2 s (hasta 5 veces seguidas; después queda para el sondeo normal). Así lo
  recién hecho nunca desaparece y lo de los demás llega enseguida
  (`services/sync.js → refresh`). La recarga forzada (al entrar, o cuando falla un
  guardado) se aplica siempre.
- Crear ticket: `POST /api/tickets` con `ticket_number`, `title`, `description`,
  `category_id` y `priority` (la elige quien crea: Baja / Media / Alta; confirmado que la
  API la acepta). El estado entra como Abierto. Si responde 500 (falló el correo), se vuelve a pedir
  la lista y se busca el número antes de dar error.
- Editar: `PUT /api/tickets/{id}` (admin manda `status` y `priority`; el usuario no).
- Asignar / tomar / reasignar: `PATCH /api/tickets/{id}/assign`.
- Cerrar: `PATCH /api/tickets/{id}/closed`.
- Comentarios y chat: `POST /api/ticket_comments`.
- Historial (asignaciones, "bloqueante", ediciones): `POST /api/ticket_histories`.
- Adjuntos: `POST /api/ticket_attachments` (JPG, PNG o WEBP, máx. 5 MB).
  - Con el botón "Subir imagen" (o el clip del chat) la imagen queda en vista previa y
    viaja al confirmar. **Arrastrar y soltar** (detalle, pantalla de Chat y chat flotante)
    la sube al instante al ticket que está a la vista (`logic/metodos/adjuntos.js →
    escucharArrastre / soltarArchivos`, capa `components/capas/ZonaSoltar.jsx`). Lo que
    no es imagen o pesa más de 5 MB no se sube y queda marcado con el motivo. En un
    ticket ajeno o cerrado la capa lo avisa y no sube nada (misma regla que el botón:
    `puedeAdjuntar`). Soltar un archivo fuera de un ticket ya no abre el archivo en el
    navegador.
- Categorías: `POST` y `PUT /api/ticket_categories`.
- Usuarios: `POST` y `PUT /api/users`. Ambos piden contraseña (mín. 8): al editar, la que
  se escriba pasa a ser la de esa persona. No se guarda en el navegador.

### Funciones desactivadas con la API (la API no las permite)

- Quitar la asignación de un ticket (`/assign` exige un usuario).
- Activar / desactivar usuarios (no tienen campo `active`).
- Deshacer un cierre (un usuario no puede reabrir y los comentarios no se borran).
- Recordatorio por correo y cierre automático del panel de seguimiento.
- Al pasar un admin a usuario sin otro admin disponible, sus tickets siguen a su nombre y
  se avisa que hay que reasignarlos.

En modo demostración siguen visibles, como en el prototipo.

### Estados, prioridades, número y fechas

- La API tiene más valores que la interfaz. Estado: `open` → Abierto · `in_progress` y
  `pending` → En progreso · `resolved`, `closed` y `cancelled` → Cerrado. Prioridad:
  `low`, `medium`, `high` · `critical` se muestra como Alta. Si nadie toca el campo, se
  devuelve el valor original (un `pending` no pasa a `in_progress`).
- `ticket_number` lo manda el frontend y debe ser único. Un usuario no ve tickets ajenos:
  si el número ya existe se prueba el siguiente y se avisa con qué número quedó.
- Los listados de comentarios, historial y adjuntos no traen `created_at`: la primera
  carga los ordena por id y lo que llega después toma la hora en que apareció. Si el
  backend agrega `created_at`, se usa automáticamente.
- El SLA (`config/constantes.js`: Alta 8 h, Media 48 h, Baja 120 h sin movimiento) es un
  umbral del prototipo: la API no lo expone.
- **Dominio de correo**: al crear o editar usuarios solo se acepta `@legumex.net`
  (`DOMINIO_CORREO` en `config/constantes.js`; `correoValido` en
  `logic/metodos/catalogos.js`). El ingreso no filtra por dominio (decide el servidor),
  solo el ejemplo del campo dice `nombre@legumex.net`.
- **Llamar por Teams** (detalle, chat y chat flotante; `llamarTeams` en
  `logic/metodos/tickets.js`): confirmación → "Abriendo Teams" → pestaña nueva con
  `https://teams.microsoft.com/l/call/0/0?users=<correo>`; el navegador ofrece abrir la
  aplicación y Teams llama a esa persona. El correo es el del usuario en el sistema: tiene
  que ser su cuenta corporativa de Microsoft. "Llamó por Teams a…" se registra en el
  historial solo al confirmar; si el navegador bloquea la pestaña, se avisa y no se
  registra.

## Diseño visual

- Viene del prototipo aprobado y **no se cambia sin pedido explícito**. Estilos en línea
  por elemento; lo global en `src/index.css` (variables `--duration-*` y
  `--ease-standard`, todas las animaciones `@keyframes`, foco visible).
- **Colores como tokens** (sistema de diseño): toda la paleta vive en el bloque `:root`
  del principio de `src/index.css` y el código usa `var(--…)`, nunca un color suelto.
  - Neutros `--n-0` (blanco / superficie) a `--n-1000` (negro); texto principal
    `--n-900`, secundario `--n-600`, terciario `--n-500` (cumple contraste AA).
  - Fondo `--fondo` (`#f4f5f1`), marca `--marca` (`#0b2a1e`) y `--marca-2`, sierra
    `--sierra`, y los de estado: `--azul`, `--naranja`, `--verde`, `--rojo`, `--violeta`,
    `--ambar` con sus `-tinte`.
  - Transparencias sobre superficie o fondo: `rgba(var(--sf-rgb),x)` y
    `rgba(var(--fondo-rgb),x)`.
  - Colores de estado y prioridad en `config/constantes.js` (`ST`, `PR`), ya como tokens.
- **Modo oscuro "de noche"**: los mismos tokens con valores oscuros (bloque siguiente en
  `index.css`).
  - Se aplica con `data-tema="oscuro"` en `<html>` o, en "Auto", cuando el equipo está en
    oscuro.
  - En el inicio de sesión, el sol pasa a ser una luna creciente (`data-luna`) y hay
    estrellas (`data-estrellas`); en el sistema, estrellas tenues detrás de la sierra.
  - El logo se aclara con un filtro.
- **Selector de tema**: botón junto al nombre en la tarjeta del usuario; cambia entre
  Claro, Oscuro y Auto (`aplicarTema` / `ciclarTema` en `logic/metodos/interfaz.js`).
  - Se guarda en `localStorage` (`mt-tema`).
  - `index.html` lo aplica antes de pintar, para que no parpadee.
- **Escala tipográfica**: 11 · 12 · 14 · 16 px para texto y 20 · 24 · 28 · 32 · 40 para
  títulos y cifras. No agregar tamaños intermedios.
- **Avatares propios**: SVG con iniciales y un tono fijo por persona (`blobUrl` en
  `logic/metodos/interfaz.js`), sin servicio externo.
- **Tarjetas de ticket**: solo el estado lleva chip con fondo. La prioridad y "esperando al
  solicitante" van como texto con punto o ícono; "pasó su margen" conserva el borde
  naranja porque es una alerta.
- **Ventanas de confirmación accesibles** (`refDialogo`): `role="dialog"`, foco adentro al
  abrir ("Cancelar" si la acción es riesgosa), Tab no se escapa y al cerrar el foco
  vuelve al botón que la abrió.
- Sierra animada en el fondo y logo de Legumex (`public/marca/`).
- Tickets en tres vistas en escritorio: tarjetas, tabla y kanban (arrastrar entre
  columnas). En el teléfono, una sola: tarjetas (ver abajo).

## Diseño responsivo (teléfonos y tablets)

Un solo código para PC y teléfono: **no hay una versión móvil aparte**. En escritorio nada
cambia (se verificó comparando el DOM contra la versión anterior en recorridos
automáticos); en el teléfono la misma interfaz se reacomoda.

- **Cuándo aplica**: hasta 767 px de ancho, pantalla táctil de hasta 500 px de alto
  (teléfono en horizontal), o **tablet**: pantalla táctil sin cursor (`pointer: coarse`
  y `hover: none`) de hasta 1366 px, en cualquier orientación. Una laptop con pantalla
  táctil sigue en escritorio porque su puntero principal es el mouse o el trackpad. Una
  sola definición en dos lugares que deben coincidir:
  `MQ_MOVIL` en `config/constantes.js` (lógica) y la media query del final de
  `src/index.css` (estilos).
- **Cómo está hecho**: los estilos del prototipo van en línea, así que el CSS móvil usa
  `!important` sobre elementos marcados con `data-m="..."` (por ejemplo `data-m="menu"`,
  `data-m="hoja"`). Lo que es comportamiento (menú abierto, vista única) lo decide la
  lógica con `s.movil`, que sigue al ancho de la ventana (`metodos/interfaz.js →
  escucharMovil`). Lo que solo existe en el teléfono se pinta con `V.esMovil`
  (`components/layout/BarraMovil.jsx`, los fondos que cierran las hojas), así el HTML de
  escritorio no cambia.
- **Patrones**:
  - Barra superior fija (menú, logo, campana) y la barra lateral de escritorio como menú
    deslizable desde la izquierda; se cierra al elegir algo, al tocar afuera o con Escape.
  - Una sola vista de tickets: tarjetas a una columna (dos con el teléfono en
    horizontal). "Vista y orden" solo ofrece el orden.
  - Menús emergentes (Filtro, Período, Orden, Asignar) → hojas que suben desde abajo, con
    fondo oscuro que las cierra.
  - Notificaciones y chat flotante a pantalla completa (o casi); el botón del chat se
    esconde mientras hay una hoja o panel abierto.
  - Tablas de Categorías y Usuarios → cada fila es una tarjeta.
  - Métricas con los indicadores de a dos.
- **Cuidado con `position: fixed`**: un `transform`, `filter` o `backdrop-filter` en un
  ancestro lo encierra (deja de cubrir la pantalla). Por eso en el teléfono la animación
  de entrada de cada pantalla no queda aplicada al terminar y la barra de controles de la
  lista no tiene blur. Cualquier capa nueva que deba cubrir la pantalla, revisar esto.
- **Laptops y monitores** (revisado de 1093 a 2560 px de ancho): en la barra de la lista
  el título va arriba con el aviso "Sesión verificada al volver"; abajo, en una sola
  línea, los filtros (Todos/Míos, período, Filtro) y las acciones (buscar, vista,
  exportar, "Crear ticket"). Para que quepan en laptops, `index.css` esconde el rótulo
  "Creados en" hasta 1365 px y acorta el buscador a 200 px hasta 1535 px. Las tarjetas
  piden 380px como mínimo (`VistaTarjetas.jsx`) para que el nombre y la categoría no se
  corten: 2 columnas en laptop, 3 en 1920.
- **Tablets** (bloque "Tablets" de `index.css`, solo en pantalla): el mismo diseño que
  el teléfono (barra superior, menú deslizable, una sola vista en tarjetas, hojas desde
  abajo) con tamaños de tablet. Revisado en 768×1024, 820×1180 y 1024×1366 en vertical y
  1024×768, 1180×820 y 1366×1024 en horizontal:
  - Márgenes de 32 px y contenido centrado hasta 1200 px; títulos de 32 px.
  - Tarjetas en columnas de 340 px como mínimo: 2 en vertical, 3 en horizontal ancho.
    El chip de asignación muestra solo las iniciales, como en el teléfono, para que el
    nombre del autor entre completo.
  - Hojas (Filtro, Período, Orden, Asignar) centradas, de 560 px como máximo.
  - Menú de 340 px; notificaciones de 420 px a la derecha, bajo la campana; chat
    flotante como panel de 520 px a la derecha, a toda la altura.
  - Categorías y Usuarios vuelven a ser tabla con cabecera (entran desde 704 px).
  - Métricas: indicadores de a dos en vertical y de a cuatro desde 1000 px; desde 1000 px
    el detalle del ticket va a dos columnas (actividad + panel).
  - Pendiente para más adelante: la firma en tablet, junto con el trabajo de las actas.

## Observaciones del prototipo (no se tocaron; decidir antes de cambiar)

- Hay estilos en línea con claves repetidas (`transition` dos veces en el mismo objeto;
  gana la última) y un `multiple="true"` como texto en el input de adjuntos (React avisa
  en consola). Vite los muestra como advertencias al compilar; no rompen nada.
- Variables sin uso heredadas (`roleReset`, `tieneResp`, `act` en `logic/valores`).
- En escritorio, el menú "Vista y orden" no se cierra tocando la lista, solo tocando el
  encabezado (su fondo queda encerrado por el blur de la barra). En el teléfono no pasa.

## Reglas de código del proyecto

- **Un solo archivo de API**: todo lo que llama al backend va en `src/services/api.js`.
- **La interfaz no tiene lógica**: los componentes solo pintan `V`. Una regla nueva va en
  `logic/metodos/`, un valor nuevo para la pantalla en su archivo de `logic/valores/`.
- Respetar el orden de secciones de `renderVals()` (ver comentario en `Logica.js`).
- Constantes y textos editables en `src/config/`, no sueltos en el código.
- **Colores solo con tokens** (`var(--…)` de `index.css`): así funcionan el modo oscuro y
  cualquier ajuste de paleta en un solo lugar. Un color nuevo se agrega como token en
  los dos bloques (claro y oscuro).
- **Nada de datos de prueba fuera de `src/mocks/`.**
- No inventar endpoints ni comportamiento del backend; preguntar si no está confirmado.
- No crear componentes compartidos nuevos ni cambiar el estilo (por ejemplo, pasar a
  Tailwind) sin autorización explícita.
- Todo el código y los comentarios en español.

## Reglas de trabajo

**Presentar el plan y esperar confirmación antes de implementar**, salvo que la
instrucción concreta ya esté dada. Tocar solo los archivos estrictamente necesarios, sin
quitar ni agregar cosas al diseño que no se pidieron. Antes de dar un cambio por
terminado: `npm run build` sin errores y probarlo en `npm run dev` (o en modo
demostración / simulado si no hay backend a mano).

---

*Mantener este archivo actualizado cuando cambie algo estructural.*
