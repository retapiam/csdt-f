import axios from 'axios';
import { API_CONFIG, STORAGE_CONFIG, clearAuthData } from '../config/config';

// Crear instancia de axios con configuración centralizada optimizada
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: false, // Cambiar a false para evitar problemas de CORS
  // Configuración adicional para mejorar la estabilidad
  maxRedirects: 5,
  validateStatus: function (status) {
    return status >= 200 && status < 300; // Solo considerar exitosos los códigos 2xx
  },
  // Configuración de compresión
  decompress: true,
  // Pool de conexiones
  maxContentLength: 100000000,
  maxBodyLength: 100000000
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_CONFIG.KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor simplificado para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Solo manejar errores críticos
    if (response?.status === 401) {
      clearAuthData();
      window.location.href = '/';
    } else if (error.code === 'NETWORK_ERROR' || !response) {
      console.error('Error de red: No se pudo conectar al servidor');
    }
    
    return Promise.reject(error);
  }
);

// Exportar instancia de axios configurada
export default api;