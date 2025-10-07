import api from './api';

/**
 * Servicio para gestión de datos étnicos
 * Conecta con el backend Laravel
 */
class EtnicoService {
  constructor() {
    this.baseUrl = '/etnicos';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
  }

  // ==================== PUEBLOS INDÍGENAS ====================

  /**
   * Obtener todos los pueblos indígenas
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de pueblos indígenas
   */
  async obtenerPueblosIndigenas(filters = {}) {
    const cacheKey = `pueblos_indigenas_${JSON.stringify(filters)}`;
    
    if (this.cache.has(cacheKey) && !this.isCacheExpired(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      const response = await api.get(`${this.baseUrl}/pueblos-indigenas`, { params: filters });
      const data = response.data;
      
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error obteniendo pueblos indígenas:', error);
      throw error;
    }
  }

  /**
   * Obtener un pueblo indígena por ID
   * @param {number} id - ID del pueblo indígena
   * @returns {Promise<Object>} Datos del pueblo indígena
   */
  async obtenerPuebloIndigena(id) {
    try {
      const response = await api.get(`${this.baseUrl}/pueblos-indigenas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo pueblo indígena:', error);
      throw error;
    }
  }

  /**
   * Crear nuevo pueblo indígena
   * @param {Object} datos - Datos del pueblo indígena
   * @returns {Promise<Object>} Pueblo indígena creado
   */
  async crearPuebloIndigena(datos) {
    try {
      const response = await api.post(`${this.baseUrl}/pueblos-indigenas`, datos);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error creando pueblo indígena:', error);
      throw error;
    }
  }

  /**
   * Actualizar un pueblo indígena
   * @param {number} id - ID del pueblo indígena
   * @param {Object} datos - Datos a actualizar
   * @returns {Promise<Object>} Pueblo indígena actualizado
   */
  async actualizarPuebloIndigena(id, datos) {
    try {
      const response = await api.put(`${this.baseUrl}/pueblos-indigenas/${id}`, datos);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error actualizando pueblo indígena:', error);
      throw error;
    }
  }

  /**
   * Eliminar un pueblo indígena
   * @param {number} id - ID del pueblo indígena
   * @returns {Promise<Object>} Confirmación de eliminación
   */
  async eliminarPuebloIndigena(id) {
    try {
      const response = await api.delete(`${this.baseUrl}/pueblos-indigenas/${id}`);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error eliminando pueblo indígena:', error);
      throw error;
    }
  }

  // ==================== COMUNIDADES AFRO ====================

  /**
   * Obtener todas las comunidades afro
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de comunidades afro
   */
  async obtenerComunidadesAfro(filters = {}) {
    const cacheKey = `comunidades_afro_${JSON.stringify(filters)}`;
    
    if (this.cache.has(cacheKey) && !this.isCacheExpired(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      const response = await api.get(`${this.baseUrl}/comunidades-afro`, { params: filters });
      const data = response.data;
      
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error obteniendo comunidades afro:', error);
      throw error;
    }
  }

  /**
   * Obtener una comunidad afro por ID
   * @param {number} id - ID de la comunidad afro
   * @returns {Promise<Object>} Datos de la comunidad afro
   */
  async obtenerComunidadAfro(id) {
    try {
      const response = await api.get(`${this.baseUrl}/comunidades-afro/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo comunidad afro:', error);
      throw error;
    }
  }

  /**
   * Crear nueva comunidad afro
   * @param {Object} datos - Datos de la comunidad afro
   * @returns {Promise<Object>} Comunidad afro creada
   */
  async crearComunidadAfro(datos) {
    try {
      const response = await api.post(`${this.baseUrl}/comunidades-afro`, datos);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error creando comunidad afro:', error);
      throw error;
    }
  }

  /**
   * Actualizar una comunidad afro
   * @param {number} id - ID de la comunidad afro
   * @param {Object} datos - Datos a actualizar
   * @returns {Promise<Object>} Comunidad afro actualizada
   */
  async actualizarComunidadAfro(id, datos) {
    try {
      const response = await api.put(`${this.baseUrl}/comunidades-afro/${id}`, datos);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error actualizando comunidad afro:', error);
      throw error;
    }
  }

  /**
   * Eliminar una comunidad afro
   * @param {number} id - ID de la comunidad afro
   * @returns {Promise<Object>} Confirmación de eliminación
   */
  async eliminarComunidadAfro(id) {
    try {
      const response = await api.delete(`${this.baseUrl}/comunidades-afro/${id}`);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error eliminando comunidad afro:', error);
      throw error;
    }
  }

  // ==================== CONSULTAS PREVIAS ====================

  /**
   * Obtener todas las consultas previas
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de consultas previas
   */
  async obtenerConsultasPrevias(filters = {}) {
    const cacheKey = `consultas_previas_${JSON.stringify(filters)}`;
    
    if (this.cache.has(cacheKey) && !this.isCacheExpired(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      const response = await api.get(`${this.baseUrl}/consultas-previas`, { params: filters });
      const data = response.data;
      
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error obteniendo consultas previas:', error);
      throw error;
    }
  }

  /**
   * Obtener una consulta previa por ID
   * @param {number} id - ID de la consulta previa
   * @returns {Promise<Object>} Datos de la consulta previa
   */
  async obtenerConsultaPrevia(id) {
    try {
      const response = await api.get(`${this.baseUrl}/consultas-previas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo consulta previa:', error);
      throw error;
    }
  }

  /**
   * Crear nueva consulta previa
   * @param {Object} datos - Datos de la consulta previa
   * @returns {Promise<Object>} Consulta previa creada
   */
  async crearConsultaPrevia(datos) {
    try {
      const response = await api.post(`${this.baseUrl}/consultas-previas`, datos);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error creando consulta previa:', error);
      throw error;
    }
  }

  // ==================== CACHE ====================

  isCacheExpired(key) {
    const cached = this.cache.get(key);
    if (!cached) return true;
    return Date.now() - cached.timestamp > this.cacheTimeout;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache() {
    this.cache.clear();
  }
}

const etnicoService = new EtnicoService();
export default etnicoService;

