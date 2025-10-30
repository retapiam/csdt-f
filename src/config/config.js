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
    CHANGE_PASSWORD: '/auth/change-password',
    TWO_FA: {
      ENABLE: '/auth/2fa/enable',
      VERIFY: '/auth/2fa/verify',
      DISABLE: '/auth/2fa/disable',
      STATUS: '/auth/2fa/status'
    }
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

  // Territorial (configurable por entorno)
  TERRITORIAL: {
    // Endpoint configurable para solicitudes de ampliación territorial
    AMPLIACION: import.meta.env.VITE_TERRITORIAL_AMPLIACION_ENDPOINT || '/etnicos/consultas-previas'
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

// ==================== CONFIGURACIÓN DE MAPAS ====================

export const MAP_CONFIG = {
  // Token de Mapbox tomado de variables de entorno
  MAPBOX_TOKEN: import.meta.env.VITE_MAPBOX_TOKEN || '',
  // Estilo por defecto (puede sobrescribirse por env)
  MAPBOX_STYLE: import.meta.env.VITE_MAPBOX_STYLE || 'streets-v12',
  // URL de tiles de Mapbox Styles API para uso con Leaflet
  // Nota: Leaflet trabaja mejor con tiles de 512px y zoomOffset -1 para Mapbox Styles
  TILE_URL: (token, style) => `https://api.mapbox.com/styles/v1/mapbox/${style}/tiles/{z}/{x}/{y}?access_token=${token}`,
  TILE_SIZE: 512,
  ZOOM_OFFSET: -1,
  ATTRIBUTION: '© Mapbox © OpenStreetMap contributors',

  // Fallback OSM
  OSM_TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  OSM_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

// Proveedores adicionales de mapas (satélite y alternativos)
export const MAP_PROVIDERS = {
  // Mapbox Satellite
  MAPBOX_SATELLITE: (token) => ({
    url: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=${token}`,
    attribution: '© Mapbox © OpenStreetMap contributors',
    tileSize: 512,
    zoomOffset: -1
  }),

  // Esri World Imagery (satélite)
  ESRI_WORLD_IMAGERY: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
  },

  // Yandex (requiere URL propia por TOS)
  YANDEX: {
    url: import.meta.env.VITE_YANDEX_TILE_URL || '',
    attribution: import.meta.env.VITE_YANDEX_ATTRIBUTION || '© Yandex'
  },

  // Maxar (normalmente vía WMTS/XYZ privado: proveer URL en .env)
  MAXAR: {
    url: import.meta.env.VITE_MAXAR_TILE_URL || '',
    attribution: import.meta.env.VITE_MAXAR_ATTRIBUTION || '© Maxar'
  },

  // Custom genérico XYZ (para proveedores no listados)
  CUSTOM_XYZ: {
    url: import.meta.env.VITE_CUSTOM_SAT_TILE_URL || '',
    attribution: import.meta.env.VITE_CUSTOM_SAT_ATTRIBUTION || ''
  },

  // Libres/abiertos
  CARTO_POSITRON: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  },
  CARTO_DARK_MATTER: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  },
  OPENTOPOMAP: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
  },
  WIKIMEDIA: {
    url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; Wikimedia'
  }
};

// Configuración genérica para WMS/WMTS (para capas satelitales corporativas)
export const MAP_WMS = {
  URL: import.meta.env.VITE_WMS_URL || '',
  LAYERS: import.meta.env.VITE_WMS_LAYERS || '',
  FORMAT: import.meta.env.VITE_WMS_FORMAT || 'image/png',
  VERSION: import.meta.env.VITE_WMS_VERSION || '1.3.0',
  TRANSPARENT: (import.meta.env.VITE_WMS_TRANSPARENT || 'true') === 'true',
  ATTRIBUTION: import.meta.env.VITE_WMS_ATTRIBUTION || '© WMS Provider'
};

// ==================== CONFIGURACIÓN DE CRS/PROJ4 ====================

export const CRS_CONFIG = {
  // Habilitar CRS personalizado si se define EPSG y definición PROJ4
  ENABLED: Boolean(import.meta.env.VITE_CRS_EPSG && import.meta.env.VITE_CRS_PROJ4_DEF),
  EPSG: import.meta.env.VITE_CRS_EPSG || 'EPSG:3857',
  PROJ4_DEF: import.meta.env.VITE_CRS_PROJ4_DEF || '',
  // Opciones avanzadas para L.Proj.CRS (JSON en .env si aplica)
  ORIGIN: import.meta.env.VITE_CRS_ORIGIN ? JSON.parse(import.meta.env.VITE_CRS_ORIGIN) : undefined,
  RESOLUTIONS: import.meta.env.VITE_CRS_RESOLUTIONS ? JSON.parse(import.meta.env.VITE_CRS_RESOLUTIONS) : undefined,
  BOUNDS: import.meta.env.VITE_CRS_BOUNDS ? JSON.parse(import.meta.env.VITE_CRS_BOUNDS) : undefined
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
  MAP: MAP_CONFIG,
  MAP_PROVIDERS,
  MAP_WMS,
  CRS: CRS_CONFIG,
  // Utilidades
  buildApiUrl,
  getApiHeaders,
  getStoredUser,
  getStoredToken,
  isAuthenticated,
  clearAuthData
};

