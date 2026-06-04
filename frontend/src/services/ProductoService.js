import { apiDelete, apiGet, apiPost } from './api';

export const listarProductos = () => apiGet('/productos');
export const obtenerProducto = (id) => apiGet(`/productos/${id}`);
export const crearProducto = (producto) => apiPost('/productos', producto);
export const eliminarProducto = (id) => apiDelete(`/productos/${id}`);
