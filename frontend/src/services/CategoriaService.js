import { apiDelete, apiGet, apiPost } from './api';

export const listarCategorias = () => apiGet('/categorias');
export const crearCategoria = (categoria) => apiPost('/categorias', categoria);
export const eliminarCategoria = (id) => apiDelete(`/categorias/${id}`);
