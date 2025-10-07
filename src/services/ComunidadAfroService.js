import api from './api';

/**
 * Servicio para gestión de comunidades afro
 */
export const ComunidadAfroService = {
  /**
   * Obtener todas las comunidades afro
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de comunidades
   */
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/etnicos/comunidades-afro', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error al obtener comunidades afro:', error);
      throw error;
    }
  },

  /**
   * Obtener una comunidad afro por ID
   * @param {number} id - ID de la comunidad
   * @returns {Promise<Object>} Datos de la comunidad
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/etnicos/comunidades-afro/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener comunidad afro ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear nueva comunidad afro
   * @param {Object} data - Datos de la comunidad
   * @returns {Promise<Object>} Comunidad creada
   */
  create: async (data) => {
    try {
      const response = await api.post('/etnicos/comunidades-afro', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear comunidad afro:', error);
      throw error;
    }
  },

  /**
   * Actualizar comunidad afro
   * @param {number} id - ID de la comunidad
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Comunidad actualizada
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`/etnicos/comunidades-afro/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar comunidad afro ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar comunidad afro
   * @param {number} id - ID de la comunidad
   * @returns {Promise<Object>} Confirmación
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/etnicos/comunidades-afro/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar comunidad afro ${id}:`, error);
      throw error;
    }
  }
};

export default ComunidadAfroService;

