# CLAUDE.md

Guía para Claude Code al trabajar en este repositorio (frontend de **Legumex Tickets TIC**).

**Leer primero `CONTEXTO_SISTEMA_DISENO_REGLAS.md`**: es el documento de contexto permanente
(qué es el sistema, arquitectura, datos de prueba, API, diseño y reglas). Este CLAUDE.md
no lo duplica; solo resume lo operativo.

## Comandos

```bash
npm install            # dependencias (usa package-lock.json)
npm run dev            # Vite en http://localhost:5173 (reenvía /api y /storage a VITE_API_TARGET)
npm run dev:simulado   # sin backend: API simulada en el navegador (src/mocks)
npm run build          # genera dist/
npm run preview        # sirve dist/ localmente
npm run datos-prueba   # carga datos de prueba en la base real (ver CONTEXTO)
```

No hay tests, linter ni TypeScript. Para verificar un cambio: `npm run build` y probarlo
en `npm run dev` (o `VITE_DEMO=true` / `npm run dev:simulado` sin backend).

## Stack

React 18 + Vite 5, solo JSX. Sin router, sin librería de UI, sin Tailwind: estilos en
línea por elemento (del prototipo aprobado) y lo global en `src/index.css`. Todo el código
y los comentarios en español; mantener ese idioma.

## Arquitectura (src/)

- `main.jsx` → `App.jsx`, que une `logic/Logica.js` (estado + reglas),
  `layouts/Interfaz.jsx` (pinta) y `services/sync.js` (manda al servidor lo que cambió).
- `Logica.renderVals()` arma el objeto **V** llamando a `logic/valores/*.js` en orden
  fijo; los componentes (`layouts/`, `pages/`, `components/`) solo reciben `{ V }` y
  pintan. Reglas por dominio en `logic/metodos/*.js` (mixins sobre `Logica.prototype`,
  `this` es la instancia).
- `services/api.js`: **único archivo de API**. Desenvuelve `{ statusCode, message, data }`
  y lanza `Error` con `.status` y `.body`.
- `config/constantes.js` (estados, prioridades, SLA, colores, límites) y
  `config/textos.js` (guías del formulario y respuestas rápidas).
- Responsivo: un solo código. Teléfono y tablet = `MQ_MOVIL` (config) + media query al
  final de `index.css` sobre elementos `data-m`; comportamiento con `s.movil` /
  `V.esMovil`. Tablet = táctil sin cursor hasta 1366 px, con su propio bloque de tamaños.
  Detalle en CONTEXTO → "Diseño responsivo".
- `src/mocks/`: **solo pruebas** (modo demo, API simulada, script de datos). Se borra en
  producción sin tocar código (`main.jsx` los busca con `import.meta.glob`).

## Reglas (resumen; detalle en CONTEXTO_SISTEMA_DISENO_REGLAS.md)

- Presentar plan y esperar confirmación antes de implementar, salvo instrucción concreta.
- Tocar solo los archivos estrictamente necesarios; no cambiar el diseño sin pedido.
- Colores solo con tokens `var(--…)` de `index.css` (hay modo oscuro): nunca un hex suelto.
- Textos de la interfaz en "tú", cordial y formal ("Reporta", "Puedes"); nada de voseo.
- Lógica en `logic/`, nunca en los componentes; valores nuevos de V en la sección de
  `logic/valores/` de esa pantalla, respetando el orden de `renderVals()`.
- No inventar endpoints ni comportamiento del backend; preguntar si no está confirmado.
- Nada de datos de prueba fuera de `src/mocks/`.
- Despliegue y servidor (el sistema corre en un servidor local) los maneja el creador del
  repo: no agregar Docker, CI ni guías de despliegue.
- Mantener `CONTEXTO_SISTEMA_DISENO_REGLAS.md` actualizado cuando cambie algo estructural.
