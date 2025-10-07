import api from './api';

/**
 * Servicio para gestión de casos legales
 */
export const CasoLegalService = {
  /**
   * Obtener todos los casos legales
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de casos
   */
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/casos-legales', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error al obtener casos legales:', error);
      throw error;
    }
  },

  /**
   * Obtener un caso legal por ID
   * @param {number} id - ID del caso
   * @returns {Promise<Object>} Datos del caso
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/casos-legales/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener caso legal ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear nuevo caso legal
   * @param {Object} data - Datos del caso
   * @returns {Promise<Object>} Caso creado
   */
  create: async (data) => {
    try {
      const response = await api.post('/casos-legales', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear caso legal:', error);
      throw error;
    }
  },

  /**
   * Actualizar caso legal
   * @param {number} id - ID del caso
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Caso actualizado
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`/casos-legales/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar caso legal ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar caso legal
   * @param {number} id - ID del caso
   * @returns {Promise<Object>} Confirmación
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/casos-legales/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar caso legal ${id}:`, error);
      throw error;
    }
  }
};

export default CasoLegalService;

