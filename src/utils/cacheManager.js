/**
 * Gestor de caché optimizado para mejorar el rendimiento
 * Implementa estrategias de caché para consultas de IA, datos de formularios y navegación
 */

class CacheManager {
  constructor() {
    this.cache = new Map();
    this.maxSize = 100; // Máximo número de elementos en caché
    this.ttl = 5 * 60 * 1000; // TTL por defecto: 5 minutos
  }

  /**
   * Genera una clave única para el caché
   */
  generateKey(prefix, ...params) {
    return `${prefix}:${JSON.stringify(params)}`;
  }

  /**
   * Almacena un valor en caché con TTL
   */
  set(key, value, ttl = this.ttl) {
    // Limpiar caché si está lleno
    if (this.cache.size >= this.maxSize) {
      this.cleanup();
    }

    const expirationTime = Date.now() + ttl;
    this.cache.set(key, {
      value,
      expirationTime,
      createdAt: Date.now()
    });
  }

  /**
   * Obtiene un valor del caché
   */
  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Verificar si ha expirado
    if (Date.now() > item.expirationTime) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Verifica si una clave existe en caché y no ha expirado
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Elimina un elemento del caché
   */
  delete(key) {
    return this.cache.delete(key);
  }

  /**
   * Limpia elementos expirados del caché
   */
  cleanup() {
    const now = Date.now();
    let deletedCount = 0;

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expirationTime) {
        this.cache.delete(key);
        deletedCount++;
      }
    }

    // Si aún hay demasiados elementos, eliminar los más antiguos
    if (this.cache.size >= this.maxSize) {
      const sortedEntries = Array.from(this.cache.entries())
        .sort((a, b) => a[1].createdAt - b[1].createdAt);
      
      const toDelete = sortedEntries.slice(0, Math.floor(this.maxSize * 0.2));
      toDelete.forEach(([key]) => this.cache.delete(key));
    }

    return deletedCount;
  }

  /**
   * Limpia todo el caché
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Obtiene estadísticas del caché
   */
  getStats() {
    const now = Date.now();
    const entries = Array.from(this.cache.values());
    
    return {
      totalItems: this.cache.size,
      expiredItems: entries.filter(item => now > item.expirationTime).length,
      hitRate: this.hitCount / (this.hitCount + this.missCount) || 0,
      oldestItem: entries.length > 0 ? Math.min(...entries.map(item => item.createdAt)) : null,
      newestItem: entries.length > 0 ? Math.max(...entries.map(item => item.createdAt)) : null
    };
  }
}

// Instancia global del caché
const cacheManager = new CacheManager();

/**
 * Hook para usar caché en componentes React
 */
export const useCache = () => {
  const setCachedValue = (key, value, ttl) => {
    cacheManager.set(key, value, ttl);
  };

  const getCachedValue = (key) => {
    return cacheManager.get(key);
  };

  const hasCachedValue = (key) => {
    return cacheManager.has(key);
  };

  const deleteCachedValue = (key) => {
    return cacheManager.delete(key);
  };

  return {
    set: setCachedValue,
    get: getCachedValue,
    has: hasCachedValue,
    delete: deleteCachedValue,
    stats: cacheManager.getStats()
  };
};

/**
 * Función para caché de consultas de IA
 */
export const cacheAIQuery = async (query, especialidad, queryFunction) => {
  const cacheKey = cacheManager.generateKey('ai_query', query, especialidad);
  
  // Verificar si ya existe en caché
  const cachedResult = cacheManager.get(cacheKey);
  if (cachedResult) {
    console.log('🎯 Consulta IA obtenida del caché');
    return cachedResult;
  }

  // Ejecutar consulta y guardar en caché
  try {
    const result = await queryFunction(query, especialidad);
    cacheManager.set(cacheKey, result, 10 * 60 * 1000); // 10 minutos para consultas de IA
    console.log('💾 Consulta IA guardada en caché');
    return result;
  } catch (error) {
    console.error('Error en consulta IA:', error);
    throw error;
  }
};

/**
 * Función para caché de datos de formularios
 */
const cacheFormData = (formName, data) => {
  const cacheKey = cacheManager.generateKey('form_data', formName);
  cacheManager.set(cacheKey, data, 30 * 60 * 1000); // 30 minutos para datos de formularios
};

const getCachedFormData = (formName) => {
  const cacheKey = cacheManager.generateKey('form_data', formName);
  return cacheManager.get(cacheKey);
};

/**
 * Función para caché de navegación
 */
const cacheNavigationState = (route, state) => {
  const cacheKey = cacheManager.generateKey('nav_state', route);
  cacheManager.set(cacheKey, state, 60 * 60 * 1000); // 1 hora para estados de navegación
};

const getCachedNavigationState = (route) => {
  const cacheKey = cacheManager.generateKey('nav_state', route);
  return cacheManager.get(cacheKey);
};

/**
 * Función para caché de listas de datos
 */
const cacheDataList = (listName, data) => {
  const cacheKey = cacheManager.generateKey('data_list', listName);
  cacheManager.set(cacheKey, data, 15 * 60 * 1000); // 15 minutos para listas de datos
};

const getCachedDataList = (listName) => {
  const cacheKey = cacheManager.generateKey('data_list', listName);
  return cacheManager.get(cacheKey);
};

/**
 * Función para precargar datos importantes
 */
export const preloadCriticalData = async () => {
  const criticalData = [
    'grupos_vulnerables',
    'tipos_documento',
    'municipios',
    'departamentos',
    'categorias_patrimonio',
    'tipos_territorio'
  ];

  // Aquí se pueden cargar datos críticos que se usan frecuentemente
  console.log('🚀 Precargando datos críticos...');
  
  // Simular carga de datos críticos
  criticalData.forEach(dataType => {
    const mockData = generateMockData(dataType);
    cacheDataList(dataType, mockData);
  });
};

/**
 * Genera datos mock para precarga
 */
const generateMockData = (dataType) => {
  const mockDataMap = {
    grupos_vulnerables: [
      'Mujeres',
      'Niños y niñas',
      'Adultos mayores',
      'Personas con discapacidad',
      'Minorías étnicas',
      'LGBTI',
      'Víctimas del conflicto',
      'Población migrante'
    ],
    tipos_documento: [
      'Cédula de Ciudadanía',
      'Cédula de Extranjería',
      'Pasaporte',
      'Tarjeta de Identidad',
      'Registro Civil'
    ],
    categorias_patrimonio: [
      'Patrimonio Material',
      'Patrimonio Inmaterial',
      'Patrimonio Natural',
      'Patrimonio Arqueológico',
      'Patrimonio Arquitectónico'
    ],
    tipos_territorio: [
      'Resguardo Indígena',
      'Territorio Colectivo Afro',
      'Territorio Ancestral',
      'Área Protegida',
      'Territorio Sagrado'
    ]
  };

  return mockDataMap[dataType] || [];
};

// Exportar instancia del caché y funciones
export default cacheManager;
export {
  cacheManager,
  cacheFormData,
  getCachedFormData,
  cacheNavigationState,
  getCachedNavigationState,
  cacheDataList,
  getCachedDataList
};
