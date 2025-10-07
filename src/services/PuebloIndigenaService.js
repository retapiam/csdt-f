import api from './api';

/**
 * Servicio para gestión de pueblos indígenas
 */
export const PuebloIndigenaService = {
  /**
   * Obtener todos los pueblos indígenas
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de pueblos indígenas
   */
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/etnicos/pueblos-indigenas', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error al obtener pueblos indígenas:', error);
      throw error;
    }
  },

  /**
   * Obtener un pueblo indígena por ID
   * @param {number} id - ID del pueblo
   * @returns {Promise<Object>} Datos del pueblo
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/etnicos/pueblos-indigenas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener pueblo indígena ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear nuevo pueblo indígena
   * @param {Object} data - Datos del pueblo
   * @returns {Promise<Object>} Pueblo creado
   */
  create: async (data) => {
    try {
      const response = await api.post('/etnicos/pueblos-indigenas', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear pueblo indígena:', error);
      throw error;
    }
  },

  /**
   * Actualizar pueblo indígena
   * @param {number} id - ID del pueblo
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Pueblo actualizado
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`/etnicos/pueblos-indigenas/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar pueblo indígena ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar pueblo indígena
   * @param {number} id - ID del pueblo
   * @returns {Promise<Object>} Confirmación
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/etnicos/pueblos-indigenas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar pueblo indígena ${id}:`, error);
      throw error;
    }
  }
};

export default PuebloIndigenaService;

