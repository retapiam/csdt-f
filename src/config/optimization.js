/**
 * Configuración de optimización para el proyecto CSDT
 * Centraliza todas las configuraciones de rendimiento y experiencia de usuario
 */

export const OPTIMIZATION_CONFIG = {
  // Configuración de caché
  cache: {
    // TTL (Time To Live) en milisegundos
    aiQueries: 10 * 60 * 1000,      // 10 minutos para consultas de IA
    formData: 30 * 60 * 1000,       // 30 minutos para datos de formularios
    navigationState: 60 * 60 * 1000, // 1 hora para estados de navegación
    dataLists: 15 * 60 * 1000,      // 15 minutos para listas de datos
    
    // Tamaño máximo del caché
    maxSize: 100,
    
    // Limpieza automática cada X milisegundos
    cleanupInterval: 5 * 60 * 1000   // 5 minutos
  },


  // Configuración de debounce
  debounce: {
    searchInput: 300,        // 300ms para búsquedas
    formValidation: 500,     // 500ms para validación de formularios
    resize: 250,             // 250ms para eventos de resize
    scroll: 100              // 100ms para eventos de scroll
  },

  // Configuración de imágenes
  images: {
    // Calidad de compresión (0-100)
    quality: 80,
    
    // Formatos soportados
    supportedFormats: ['webp', 'avif', 'jpg', 'png'],
    
    // Tamaños de imagen para responsive
    breakpoints: {
      mobile: 400,
      tablet: 800,
      desktop: 1200
    },
    
    // Threshold para carga de imágenes
    loadThreshold: 100
  },

  // Configuración de formularios
  forms: {
    // Validación en tiempo real
    realtimeValidation: true,
    
    // Auto-save interval (ms)
    autoSaveInterval: 30 * 1000, // 30 segundos
    
    // Máximo número de campos por formulario
    maxFields: 50,
    
    // Validación de campos requeridos
    validateRequired: true
  },

  // Configuración de IA
  ai: {
    // Timeout para consultas de IA (ms)
    queryTimeout: 30000, // 30 segundos
    
    // Máximo número de reintentos
    maxRetries: 3,
    
    // Delay entre reintentos (ms)
    retryDelay: 1000,
    
    // Especialidades disponibles
    availableSpecialties: [
      'derecho_constitucional',
      'derecho_administrativo',
      'derecho_penal',
      'derecho_civil',
      'derecho_laboral',
      'derecho_comercial',
      'derecho_familia',
      'derecho_internacional'
    ]
  },

  // Configuración de PDF
  pdf: {
    // Formato por defecto
    defaultFormat: 'a4',
    
    // Orientación por defecto
    defaultOrientation: 'portrait',
    
    // Calidad de compresión
    compression: 'medium',
    
    // Fuentes disponibles
    fonts: {
      default: 'helvetica',
      bold: 'helvetica-bold',
      italic: 'helvetica-oblique'
    }
  },

  // Configuración de rendimiento
  performance: {
    // Límite de re-renders por componente
    maxRerenders: 10,
    
    // Tiempo máximo de carga de página (ms)
    maxLoadTime: 3000,
    
    // Tamaño máximo de bundle (KB)
    maxBundleSize: 500,
    
    // Compresión de datos
    enableCompression: true,
    
    // Minificación
    enableMinification: true
  },

  // Configuración de monitoreo
  monitoring: {
    // Habilitar métricas de rendimiento
    enablePerformanceMetrics: true,
    
    // Habilitar logging de errores
    enableErrorLogging: true,
    
    // Habilitar analytics de usuario
    enableUserAnalytics: false,
    
    // Intervalo de reporte (ms)
    reportingInterval: 60000 // 1 minuto
  },

  // Configuración de accesibilidad
  accessibility: {
    // Navegación por teclado
    enableKeyboardNavigation: true,
    
    // Lectores de pantalla
    enableScreenReader: true,
    
    // Alto contraste
    enableHighContrast: true,
    
    // Tamaño de fuente ajustable
    enableFontScaling: true
  },

  // Configuración de PWA
  pwa: {
    // Habilitar service worker
    enableServiceWorker: true,
    
    // Estrategia de caché
    cacheStrategy: 'networkFirst',
    
    // Recursos para caché offline
    offlineResources: [
      '/',
      '/static/css/main.css',
      '/static/js/main.js',
      '/manifest.json'
    ]
  }
};

// Configuración específica por entorno
export const getEnvironmentConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;

  return {
    ...OPTIMIZATION_CONFIG,
    cache: {
      ...OPTIMIZATION_CONFIG.cache,
      // En desarrollo, TTL más corto para debugging
      aiQueries: isDevelopment ? 2 * 60 * 1000 : OPTIMIZATION_CONFIG.cache.aiQueries,
      formData: isDevelopment ? 5 * 60 * 1000 : OPTIMIZATION_CONFIG.cache.formData
    },
    monitoring: {
      ...OPTIMIZATION_CONFIG.monitoring,
      // En desarrollo, más logging
      enableErrorLogging: true,
      enablePerformanceMetrics: true
    },
    performance: {
      ...OPTIMIZATION_CONFIG.performance,
      // En desarrollo, límites más relajados
      maxLoadTime: isDevelopment ? 5000 : OPTIMIZATION_CONFIG.performance.maxLoadTime
    }
  };
};

// Configuración de feature flags
export const FEATURE_FLAGS = {
  // Funcionalidades experimentales
  enableAdvancedAI: true,
  enableRealTimeValidation: true,
  enableOfflineMode: false,
  enableAdvancedAnalytics: false,
  
  // Optimizaciones
  enableImageOptimization: true,
  enableCodeSplitting: true,
  enableServiceWorker: false,
  
  // Debugging
  enableDebugMode: import.meta.env.DEV,
  enablePerformanceProfiling: import.meta.env.DEV
};

// Función para verificar si una feature está habilitada
export const isFeatureEnabled = (featureName) => {
  return FEATURE_FLAGS[featureName] || false;
};

// Función para obtener configuración optimizada
export const getOptimizedConfig = () => {
  const envConfig = getEnvironmentConfig();
  
  return {
    ...envConfig,
    features: FEATURE_FLAGS,
    
    // Configuración derivada
    derived: {
      shouldUseImageOptimization: isFeatureEnabled('enableImageOptimization'),
      shouldEnableDebugMode: isFeatureEnabled('enableDebugMode'),
      shouldEnableAdvancedAI: isFeatureEnabled('enableAdvancedAI')
    }
  };
};

export default OPTIMIZATION_CONFIG;
