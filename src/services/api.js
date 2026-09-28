// Cliente de la API "Sistema de Tickets" (Legumex). JWT en la cabecera Authorization.
// Envoltura: { statusCode, message, data }. Validación 422: { message, errors: { campo: [..] } }.
const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
export const FILES = (import.meta.env.VITE_FILES_URL || '/storage').replace(/\/$/, '');
export const USE_API = import.meta.env.VITE_DEMO !== 'true';
const KEY = 'tickets-tic.token';
let unauthorized = () => {};

export const getToken = () => { try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; } };
const setToken = t => { try { t ? localStorage.setItem(KEY, t) : localStorage.removeItem(KEY); } catch (e) {} };
export const onUnauthorized = fn => { unauthorized = fn || (() => {}); };
export const logout = () => setToken('');

async function request(method, path, body) {
  const headers = { Accept: 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = 'Bearer ' + token;
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
  if (body !== undefined && !isForm) headers['Content-Type'] = 'application/json';
  let res;
  try {
    res = await fetch(BASE + path, { method, headers, body: body === undefined ? undefined : (isForm ? body : JSON.stringify(body)) });
  } catch (e) {
    throw new Error('No se pudo conectar con el servidor. Revisa la red o la dirección de la API.');
  }
  let json = null;
  try { json = await res.json(); } catch (e) {}
  // 401 de sesión (sin token / vencido). Un 401 "No autorizado" sobre un ticket ajeno no cierra la sesión.
  if (res.status === 401 && path !== '/login' && !(json && json.statusCode === 401)) { setToken(''); unauthorized(); }
  if (!res.ok) {
    const first = json && json.errors ? Object.values(json.errors)[0] : null;
    const err = new Error((first && first[0]) || (json && json.message) || ('Error ' + res.status));
    err.status = res.status; err.body = json;
    throw err;
  }
  return json ? json.data : null;
}

// Sesión
export async function login(email, password) {
  try {
    const data = await request('POST', '/login', { email, password });
    setToken(data.token);
    return data; // { name, email, role, token }
  } catch (e) {
    if (e.status === 400) e.message = 'Correo o contraseña incorrectos.';
    throw e;
  }
}
export async function checkStatus() {
  const data = await request('GET', '/check-status');
  if (data && data.token) setToken(data.token);
  return data;
}

// Usuarios
export const listUsers = () => request('GET', '/users');
export const createUser = u => request('POST', '/users', u);            // { name, email, password, role }
export const updateUser = (id, u) => request('PUT', '/users/' + id, u); // todos obligatorios, incluida la contraseña

// Tickets
export const listTickets = () => request('GET', '/tickets');
export const getTicket = id => request('GET', '/tickets/' + id);
export const createTicket = t => request('POST', '/tickets', t);             // { ticket_number, title, description, category_id, priority }
export const updateTicket = (id, t) => request('PUT', '/tickets/' + id, t);  // user: sin status/priority · admin: con ambos
export const assignTicket = (id, userId) => request('PATCH', '/tickets/' + id + '/assign', { assigned_to: userId });
export const closeTicket = id => request('PATCH', '/tickets/' + id + '/closed');

// Categorías
export const listCategories = () => request('GET', '/ticket_categories');
export const createCategory = c => request('POST', '/ticket_categories', c);            // { name, description, active }
export const updateCategory = (id, c) => request('PUT', '/ticket_categories/' + id, c);

// Comentarios, historial y adjuntos
export const listComments = () => request('GET', '/ticket_comments');
export const createComment = (ticketId, text) => request('POST', '/ticket_comments', { ticket_id: ticketId, description: text });
export const listHistories = () => request('GET', '/ticket_histories');
export const createHistory = h => request('POST', '/ticket_histories', h);   // { ticket_id, action, old_value, new_value }
export const listAttachments = () => request('GET', '/ticket_attachments');
export function uploadAttachment(ticketId, file) {
  const fd = new FormData();
  fd.append('ticket_id', String(ticketId));
  fd.append('file', file);
  return request('POST', '/ticket_attachments', fd);
}
export const fileUrl = path => (!path ? '' : /^(https?:|blob:|data:)/.test(path) ? path : FILES + '/' + String(path).replace(/^\/+/, ''));
