import { apiGet, apiPost } from './api';

export const listarReservasUsuario = (usuarioId) => apiGet(`/reservas/usuario/${usuarioId}`);
export const crearReserva = (reserva) => apiPost('/reservas', reserva);
