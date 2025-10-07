/**
 * CONFIGURACIÓN CENTRALIZADA - CSDT
 * Toda la configuración de la aplicación en un solo lugar
 */

// ==================== CONFIGURACIÓN DE API ====================

export const API_CONFIG = {
  // URL base del backend Laravel
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  // Timeout aumentado a 60 segundos para consultas complejas
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 60000,
  
  // Headers por defecto
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },

  // Configuración de reintentos optimizada
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
    BACKOFF_FACTOR: 2
  },

  // Timeouts específicos por tipo de operación
  TIMEOUTS: {
    DEFAULT: 60000,      // 60 segundos
    ESTADISTICAS: 30000, // 30 segundos
    UPLOAD: 120000,      // 2 minutos
    AI_ANALYSIS: 180000, // 3 minutos
    REPORTS: 120000      // 2 minutos
  }
};

// ==================== CONFIGURACIÓN DE ALMACENAMIENTO ====================

export const STORAGE_CONFIG = {
  // Claves para localStorage
  KEYS: {
    TOKEN: import.meta.env.VITE_TOKEN_KEY || 'csdt_token',
    USER: import.meta.env.VITE_USER_KEY || 'csdt_user',
    API_CONFIG: 'csdt_api_config',
    THEME: 'csdt_theme',
    LANGUAGE: 'csdt_language'
  }
};

// ==================== CONFIGURACIÓN DE CACHE ====================

export const CACHE_CONFIG = {
  // Duración del cache en milisegundos
  DURATION: (import.meta.env.VITE_CACHE_DURATION || 5) * 60 * 1000,
  
  // Máximo de entradas
  MAX_ENTRIES: parseInt(import.meta.env.VITE_CACHE_MAX_ENTRIES) || 100,
  
  // Estrategia de cache
  STRATEGY: 'lru', // Least Recently Used
  
  // TTL específicos por tipo de dato
  TTL: {
    STATS: 2 * 60 * 1000,      // 2 minutos para estadísticas
    USER_DATA: 10 * 60 * 1000, // 10 minutos para datos de usuario
    GEO_DATA: 30 * 60 * 1000,  // 30 minutos para datos geográficos
    CATALOGS: 60 * 60 * 1000   // 1 hora para catálogos
  }
};

// ==================== ENDPOINTS DE API ====================

export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password'
  },

  // Usuarios
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
  },

  // Proyectos
  PROJECTS: {
    BASE: '/proyectos',
    BY_ID: (id) => `/proyectos/${id}`,
  },

  // Actividades (MS Project)
  ACTIVITIES: {
    BASE: '/actividades',
    BY_ID: (id) => `/actividades/${id}`,
    BY_PROJECT: (proyectoId) => `/proyectos/${proyectoId}/actividades`,
    ADD_PDF: (id) => `/actividades/${id}/agregar-pdf`,
  },

  // Tareas
  TASKS: {
    BASE: '/tareas',
    BY_ID: (id) => `/tareas/${id}`,
    BY_PROJECT: (proyectoId) => `/proyectos/${proyectoId}/tareas`,
    BY_ACTIVITY: (actividadId) => `/actividades/${actividadId}/tareas`,
    ADD_PDF: (id) => `/tareas/${id}/agregar-pdf`,
    ADD_SUPPORT: (id) => `/tareas/${id}/agregar-soporte`,
  },

  // Casos Legales
  LEGAL_CASES: {
    BASE: '/casos-legales',
    BY_ID: (id) => `/casos-legales/${id}`,
  },

  // Inteligencia Artificial
  AI: {
    ANALYZE_LEGAL: '/ia/analizar-juridico',
    ANALYZE_ETHNIC: '/ia/analizar-etnico',
    ANALYZE_OVERSIGHT: '/ia/analizar-veeduria',
    QUERIES: '/ia/consultas',
    QUERY_BY_ID: (id) => `/ia/consultas/${id}`,
  },

  // Derechos Étnicos
  ETHNIC: {
    INDIGENOUS: {
      BASE: '/etnicos/pueblos-indigenas',
      BY_ID: (id) => `/etnicos/pueblos-indigenas/${id}`,
    },
    AFRO: {
      BASE: '/etnicos/comunidades-afro',
      BY_ID: (id) => `/etnicos/comunidades-afro/${id}`,
    },
    PRIOR_CONSULTATION: {
      BASE: '/etnicos/consultas-previas',
      BY_ID: (id) => `/etnicos/consultas-previas/${id}`,
    }
  },

  // Veedurías
  OVERSIGHT: {
    BASE: '/veedurias',
    BY_ID: (id) => `/veedurias/${id}`,
    MONITORING: (id) => `/veedurias/${id}/seguimientos`,
    CREATE_MONITORING: (id) => `/veedurias/${id}/seguimientos`,
  },

  // Donaciones
  DONATIONS: {
    BASE: '/donaciones',
    BY_ID: (id) => `/donaciones/${id}`,
    STATS: '/donaciones/estadisticas/resumen',
  },

  // Estadísticas
  STATS: {
    GENERAL: '/estadisticas/generales',
    AI: '/estadisticas/ia',
    SYSTEM: '/estadisticas/sistema',
  },

  // Dashboard
  DASHBOARD: '/dashboard',
};

// ==================== CONFIGURACIÓN DE RUTAS FRONTEND ====================

export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Rutas protegidas
  DASHBOARD: '/dashboard',
  PROFILE: '/perfil',
  
  // Innovación IA
  IA: {
    CONSEJO_IA: '/innovacion-ia/consejo-ia',
    CONSEJO_ETNOIA: '/innovacion-ia/consejo-etnoia',
    ESPECIALISTAS: '/innovacion-ia/ia-especialistas',
    AUDITORIA: '/innovacion-ia/auditoria-forense',
    GEO_DASHBOARD: '/innovacion-ia/geo-dashboard',
    MONITOR: '/innovacion-ia/monitor-ia',
  },

  // Rama Judicial
  JUDICIAL: {
    ORDINARIA: '/rama-judicial/justicia-ordinaria',
    ESPECIAL: '/rama-judicial/jurisdiccion-especial',
    PAZ: '/rama-judicial/justicia-paz',
  },

  // Derechos Étnicos
  ETHNICS: {
    INDIGENOUS: '/derechos-etnicos/pueblos-indigenas',
    AFRO: '/derechos-etnicos/comunidades-afro',
    ROM: '/derechos-etnicos/pueblos-rom',
    CONSULTATION: '/derechos-etnicos/consulta-previa',
    ETHNO_DEVELOPMENT: '/derechos-etnicos/planes-etnodesarrollo',
  },

  // Gestión
  MANAGEMENT: {
    INSTITUTIONAL: '/gestion-institucional/institucional',
    PROJECTS: '/gestion-institucional/proyectos',
    DONATIONS: '/gestion-institucional/donaciones',
  },
};

// ==================== CONFIGURACIÓN DE APLICACIÓN ====================

export const APP_CONFIG = {
  // Información general
  NAME: import.meta.env.VITE_APP_NAME || 'CSDT',
  VERSION: '1.0.0',
  ENVIRONMENT: import.meta.env.VITE_APP_ENV || 'development',

  // Configuración de logs
  ENABLE_LOGS: import.meta.env.VITE_ENABLE_LOGS === 'true' || import.meta.env.VITE_APP_ENV === 'development',

  // Configuración de paginación
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  },

  // Configuración de archivos
  FILES: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: {
      DOCUMENTS: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
      IMAGES: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      ALL: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif', 'webp']
    }
  },

  // Configuración de idioma
  LANGUAGE: {
    DEFAULT: 'es',
    AVAILABLE: ['es', 'en'],
  },

  // Configuración de tema
  THEME: {
    DEFAULT: 'light',
    AVAILABLE: ['light', 'dark'],
  }
};

// ==================== UTILIDADES ====================

/**
 * Construye una URL completa de API
 */
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

/**
 * Obtiene headers de API con autenticación
 */
export const getApiHeaders = (additionalHeaders = {}) => {
  const token = localStorage.getItem(STORAGE_CONFIG.KEYS.TOKEN);
  return {
    ...API_CONFIG.HEADERS,
    ...(token && { Authorization: `Bearer ${token}` }),
    ...additionalHeaders
  };
};

/**
 * Obtiene el usuario almacenado
 */
export const getStoredUser = () => {
  try {
    const userData = localStorage.getItem(STORAGE_CONFIG.KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error obteniendo usuario almacenado:', error);
    return null;
  }
};

/**
 * Obtiene el token almacenado
 */
export const getStoredToken = () => {
  return localStorage.getItem(STORAGE_CONFIG.KEYS.TOKEN);
};

/**
 * Verifica si el usuario está autenticado
 */
export const isAuthenticated = () => {
  const token = getStoredToken();
  const user = getStoredUser();
  return !!(token && user);
};

/**
 * Limpia datos de autenticación
 */
export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_CONFIG.KEYS.TOKEN);
  localStorage.removeItem(STORAGE_CONFIG.KEYS.USER);
};

// Exportar por defecto la configuración completa
export default {
  API: API_CONFIG,
  STORAGE: STORAGE_CONFIG,
  CACHE: CACHE_CONFIG,
  ENDPOINTS: API_ENDPOINTS,
  ROUTES,
  APP: APP_CONFIG,
  // Utilidades
  buildApiUrl,
  getApiHeaders,
  getStoredUser,
  getStoredToken,
  isAuthenticated,
  clearAuthData
};

