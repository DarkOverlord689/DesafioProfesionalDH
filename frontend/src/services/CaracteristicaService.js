import { apiDelete, apiGet, apiPost } from './api';

export const listarCaracteristicas = () => apiGet('/caracteristicas');
export const crearCaracteristica = (caracteristica) => apiPost('/caracteristicas', caracteristica);
export const eliminarCaracteristica = (id) => apiDelete(`/caracteristicas/${id}`);
