import api from './api';

/**
 * Servicio para gestión de donaciones
 * Conecta con el backend Laravel
 */
class DonacionService {
  constructor() {
    this.baseUrl = '/donaciones';
    this.cache = new Map();
    this.cacheTimeout = 2 * 60 * 1000; // 2 minutos
  }

  /**
   * Obtener todas las donaciones
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de donaciones
   */
  async obtenerDonaciones(filters = {}) {
    const cacheKey = `donaciones_${JSON.stringify(filters)}`;
    
    if (this.cache.has(cacheKey) && !this.isCacheExpired(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      const response = await api.get(this.baseUrl, { params: filters });
      const data = response.data;
      
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error obteniendo donaciones:', error);
      throw error;
    }
  }

  /**
   * Obtener una donación por ID
   * @param {number} id - ID de la donación
   * @returns {Promise<Object>} Datos de la donación
   */
  async obtenerDonacion(id) {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo donación:', error);
      throw error;
    }
  }

  /**
   * Crear nueva donación
   * @param {Object} datos - Datos de la donación
   * @returns {Promise<Object>} Donación creada
   */
  async crearDonacion(datos) {
    try {
      const response = await api.post(this.baseUrl, datos);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error creando donación:', error);
      throw error;
    }
  }

  /**
   * Actualizar una donación
   * @param {number} id - ID de la donación
   * @param {Object} datos - Datos a actualizar
   * @returns {Promise<Object>} Donación actualizada
   */
  async actualizarDonacion(id, datos) {
    try {
      const response = await api.put(`${this.baseUrl}/${id}`, datos);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error actualizando donación:', error);
      throw error;
    }
  }

  /**
   * Eliminar una donación
   * @param {number} id - ID de la donación
   * @returns {Promise<Object>} Confirmación de eliminación
   */
  async eliminarDonacion(id) {
    try {
      const response = await api.delete(`${this.baseUrl}/${id}`);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error eliminando donación:', error);
      throw error;
    }
  }

  /**
   * Obtener estadísticas de donaciones
   * @returns {Promise<Object>} Estadísticas de donaciones
   */
  async obtenerEstadisticas() {
    const cacheKey = 'estadisticas_donaciones';
    
    if (this.cache.has(cacheKey) && !this.isCacheExpired(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      const response = await api.get(`${this.baseUrl}/estadisticas/resumen`);
      const data = response.data;
      
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error obteniendo estadísticas de donaciones:', error);
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

const donacionService = new DonacionService();
export default donacionService;
