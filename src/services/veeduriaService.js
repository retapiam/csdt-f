import api from './api';

/**
 * Servicio para gestión de veedurías
 * Conecta con el backend Laravel
 */
class VeeduriaService {
  constructor() {
    this.baseUrl = '/veedurias';
    this.cache = new Map();
    this.cacheTimeout = 3 * 60 * 1000; // 3 minutos
  }

  /**
   * Obtener todas las veedurías
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de veedurías
   */
  async obtenerVeedurias(filters = {}) {
    const cacheKey = `veedurias_${JSON.stringify(filters)}`;
    
    if (this.cache.has(cacheKey) && !this.isCacheExpired(cacheKey)) {
      return this.cache.get(cacheKey).data;
    }

    try {
      const response = await api.get(this.baseUrl, { params: filters });
      const data = response.data;
      
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error obteniendo veedurías:', error);
      throw error;
    }
  }

  /**
   * Obtener una veeduría por ID
   * @param {number} id - ID de la veeduría
   * @returns {Promise<Object>} Datos de la veeduría
   */
  async obtenerVeeduria(id) {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo veeduría:', error);
      throw error;
    }
  }

  /**
   * Crear nueva veeduría
   * @param {Object} datos - Datos de la veeduría
   * @returns {Promise<Object>} Veeduría creada
   */
  async crearVeeduria(datos) {
    try {
      const response = await api.post(this.baseUrl, datos);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error creando veeduría:', error);
      throw error;
    }
  }

  /**
   * Actualizar una veeduría
   * @param {number} id - ID de la veeduría
   * @param {Object} datos - Datos a actualizar
   * @returns {Promise<Object>} Veeduría actualizada
   */
  async actualizarVeeduria(id, datos) {
    try {
      const response = await api.put(`${this.baseUrl}/${id}`, datos);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error actualizando veeduría:', error);
      throw error;
    }
  }

  /**
   * Eliminar una veeduría
   * @param {number} id - ID de la veeduría
   * @returns {Promise<Object>} Confirmación de eliminación
   */
  async eliminarVeeduria(id) {
    try {
      const response = await api.delete(`${this.baseUrl}/${id}`);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error eliminando veeduría:', error);
      throw error;
    }
  }

  /**
   * Obtener seguimientos de una veeduría
   * @param {number} id - ID de la veeduría
   * @returns {Promise<Object>} Lista de seguimientos
   */
  async obtenerSeguimientos(id) {
    try {
      const response = await api.get(`${this.baseUrl}/${id}/seguimientos`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo seguimientos:', error);
      throw error;
    }
  }

  /**
   * Crear seguimiento para una veeduría
   * @param {number} id - ID de la veeduría
   * @param {Object} datos - Datos del seguimiento
   * @returns {Promise<Object>} Seguimiento creado
   */
  async crearSeguimiento(id, datos) {
    try {
      const response = await api.post(`${this.baseUrl}/${id}/seguimientos`, datos);
      this.clearCache();
      return response.data;
    } catch (error) {
      console.error('Error creando seguimiento:', error);
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

const veeduriaService = new VeeduriaService();
export default veeduriaService;
