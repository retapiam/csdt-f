import axios from 'axios';
import { API_CONFIG, STORAGE_CONFIG, clearAuthData, APP_CONFIG } from '../config/config';

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

// Interceptor para agregar token de autenticación y logs opcionales
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_CONFIG.KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (APP_CONFIG.ENABLE_LOGS) {
      // Log mínimo: método y URL
      console.debug(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas, reintentos y errores 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    
    // Solo manejar errores críticos
    if (response?.status === 401) {
      clearAuthData();
      window.location.href = '/';
      return Promise.reject(error);
    }

    // Notificaciones globales para errores comunes
    const emitNotify = (type, message) => {
      try {
        const event = new CustomEvent('csdt:notify', { detail: { type, message } });
        window.dispatchEvent(event);
      } catch (_) {}
    };

    if (response?.status === 422) {
      const msg = response.data?.message || 'Error de validación';
      emitNotify('warning', msg);
    } else if (response?.status === 403) {
      emitNotify('error', 'Acceso denegado');
    } else if (response?.status === 404) {
      emitNotify('warning', 'Recurso no encontrado');
    }

    // Reintentos exponenciales para errores de red o 5xx
    const isNetworkError = error.code === 'NETWORK_ERROR' || !response;
    const isRetryableStatus = response && response.status >= 500;
    const shouldRetry = isNetworkError || isRetryableStatus;
    
    if (shouldRetry) {
      const config = error.config || {};
      config.__retryCount = config.__retryCount || 0;
      if (config.__retryCount < (API_CONFIG.RETRY?.MAX_ATTEMPTS || 0)) {
        config.__retryCount += 1;
        const factor = API_CONFIG.RETRY?.BACKOFF_FACTOR || 2;
        const baseDelay = API_CONFIG.RETRY?.DELAY || 1000;
        const delay = baseDelay * Math.pow(factor, config.__retryCount - 1);
        if (APP_CONFIG.ENABLE_LOGS) {
          console.warn(`[API] Reintentando (${config.__retryCount}) en ${delay}ms: ${config.url}`);
        }
        await new Promise(r => setTimeout(r, delay));
        return api(config);
      }
    }

    if (isNetworkError) {
      console.error('Error de red: No se pudo conectar al servidor');
      emitNotify('error', 'No se pudo conectar con el servidor');
    }
    
    return Promise.reject(error);
  }
);

// Exportar instancia de axios configurada
export default api;