import api from './api';

/**
 * Servicio para gestión de consultas previas
 */
export const ConsultaPreviaService = {
  /**
   * Obtener todas las consultas previas
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de consultas previas
   */
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/etnicos/consultas-previas', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error al obtener consultas previas:', error);
      throw error;
    }
  },

  /**
   * Obtener una consulta previa por ID
   * @param {number} id - ID de la consulta previa
   * @returns {Promise<Object>} Datos de la consulta
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/etnicos/consultas-previas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener consulta previa ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear nueva consulta previa
   * @param {Object} data - Datos de la consulta
   * @returns {Promise<Object>} Consulta creada
   */
  create: async (data) => {
    try {
      const response = await api.post('/etnicos/consultas-previas', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear consulta previa:', error);
      throw error;
    }
  },

  /**
   * Actualizar consulta previa
   * @param {number} id - ID de la consulta
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Consulta actualizada
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`/etnicos/consultas-previas/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar consulta previa ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar consulta previa
   * @param {number} id - ID de la consulta
   * @returns {Promise<Object>} Confirmación
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/etnicos/consultas-previas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar consulta previa ${id}:`, error);
      throw error;
    }
  }
};

export default ConsultaPreviaService;

