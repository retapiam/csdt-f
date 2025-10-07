import api from './api';

/**
 * Servicio para gestión de proyectos
 * Conecta con el backend Laravel
 */
export const ProyectoService = {
  /**
   * Obtener todos los proyectos
   * @param {Object} filters - Filtros opcionales (estado, tipo_caso, prioridad)
   * @returns {Promise<Object>} Lista paginada de proyectos
   */
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/proyectos', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      throw error;
    }
  },

  /**
   * Obtener un proyecto por ID
   * @param {number} id - ID del proyecto
   * @returns {Promise<Object>} Datos del proyecto
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/proyectos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener proyecto ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear un nuevo proyecto
   * @param {Object} data - Datos del proyecto
   * @returns {Promise<Object>} Proyecto creado
   */
  create: async (data) => {
    try {
      const response = await api.post('/proyectos', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      throw error;
    }
  },

  /**
   * Actualizar un proyecto existente
   * @param {number} id - ID del proyecto
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Proyecto actualizado
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`/proyectos/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar proyecto ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar un proyecto
   * @param {number} id - ID del proyecto
   * @returns {Promise<Object>} Confirmación de eliminación
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/proyectos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar proyecto ${id}:`, error);
      throw error;
    }
  },

  /**
   * Actualizar el progreso de un proyecto
   * @param {number} id - ID del proyecto
   * @param {number} progreso - Porcentaje de progreso (0-100)
   * @returns {Promise<Object>} Proyecto actualizado
   */
  updateProgreso: async (id, progreso) => {
    try {
      const response = await api.put(`/proyectos/${id}`, { progreso });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar progreso del proyecto ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cambiar estado de un proyecto
   * @param {number} id - ID del proyecto
   * @param {string} estado - Nuevo estado
   * @returns {Promise<Object>} Proyecto actualizado
   */
  updateEstado: async (id, estado) => {
    try {
      const response = await api.put(`/proyectos/${id}`, { estado });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar estado del proyecto ${id}:`, error);
      throw error;
    }
  },

  /**
   * Asignar operador a un proyecto
   * @param {number} id - ID del proyecto
   * @param {number} operadorId - ID del operador
   * @returns {Promise<Object>} Proyecto actualizado
   */
  asignarOperador: async (id, operadorId) => {
    try {
      const response = await api.put(`/proyectos/${id}`, { operador_id: operadorId });
      return response.data;
    } catch (error) {
      console.error(`Error al asignar operador al proyecto ${id}:`, error);
      throw error;
    }
  }
};

export default ProyectoService;

