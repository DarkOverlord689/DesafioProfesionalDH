const API_BASE_URL = 'http://localhost:8080/api';

const getToken = () => {
  const savedUser = localStorage.getItem('user');
  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser)?.token || null;
  } catch {
    return null;
  }
};

const buildHeaders = (options = {}) => {
  const headers = { ...(options.headers || {}) };
  const token = getToken();

  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const error = new Error(body?.message || body || 'Error del servidor');
    error.status = response.status;
    error.errors = body?.errors || null;
    throw error;
  }

  return body;
};

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options)
  });

  return parseResponse(response);
};

export const apiGet = (path) => apiRequest(path);
export const apiPost = (path, data) => apiRequest(path, { method: 'POST', body: JSON.stringify(data) });
export const apiPut = (path, data) => apiRequest(path, { method: 'PUT', body: JSON.stringify(data) });
export const apiDelete = (path) => apiRequest(path, { method: 'DELETE' });
