import { apiGet, apiPost, apiPut } from './api';

export const registrarUsuario = (datosUsuario) => apiPost('/usuarios/registrar', datosUsuario);
export const loginUsuario = (credentials) => apiPost('/usuarios/login', credentials);
export const listarUsuarios = () => apiGet('/usuarios');
export const actualizarRolUsuario = (id, nuevoRol) => apiPut(`/usuarios/${id}/rol`, nuevoRol);
