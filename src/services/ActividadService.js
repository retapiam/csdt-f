import api from './api';

/**
 * Servicio para gestión de actividades (Estilo Microsoft Project)
 */
export const ActividadService = {
  /**
   * Obtener todas las actividades
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de actividades
   */
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/actividades', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error al obtener actividades:', error);
      throw error;
    }
  },

  /**
   * Obtener actividades por proyecto con jerarquía
   * @param {number} proyectoId - ID del proyecto
   * @returns {Promise<Object>} Actividades con tareas anidadas
   */
  getPorProyecto: async (proyectoId) => {
    try {
      const response = await api.get(`/proyectos/${proyectoId}/actividades`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener actividades del proyecto ${proyectoId}:`, error);
      throw error;
    }
  },

  /**
   * Obtener una actividad por ID
   * @param {number} id - ID de la actividad
   * @returns {Promise<Object>} Datos de la actividad con tareas
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/actividades/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener actividad ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear nueva actividad
   * @param {Object} data - Datos de la actividad
   * @returns {Promise<Object>} Actividad creada
   */
  create: async (data) => {
    try {
      const response = await api.post('/actividades', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear actividad:', error);
      throw error;
    }
  },

  /**
   * Actualizar actividad
   * @param {number} id - ID de la actividad
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Actividad actualizada
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`/actividades/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar actividad ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar actividad
   * @param {number} id - ID de la actividad
   * @returns {Promise<Object>} Confirmación
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/actividades/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar actividad ${id}:`, error);
      throw error;
    }
  },

  /**
   * Agregar PDF a una actividad
   * @param {number} id - ID de la actividad
   * @param {string} rutaPDF - Ruta del PDF generado
   * @param {string} tipo - Tipo de PDF
   * @returns {Promise<Object>} Actividad actualizada
   */
  agregarPDF: async (id, rutaPDF, tipo = 'general') => {
    try {
      const response = await api.post(`/actividades/${id}/agregar-pdf`, {
        ruta_pdf: rutaPDF,
        tipo: tipo
      });
      return response.data;
    } catch (error) {
      console.error(`Error al agregar PDF a actividad ${id}:`, error);
      throw error;
    }
  },

  /**
   * Actualizar progreso de una actividad
   * @param {number} id - ID de la actividad
   * @param {number} progreso - Porcentaje (0-100)
   * @returns {Promise<Object>} Actividad actualizada
   */
  updateProgreso: async (id, progreso) => {
    try {
      const response = await api.put(`/actividades/${id}`, { progreso });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar progreso de actividad ${id}:`, error);
      throw error;
    }
  },

  /**
   * Cambiar estado de una actividad
   * @param {number} id - ID de la actividad
   * @param {string} estado - Nuevo estado
   * @returns {Promise<Object>} Actividad actualizada
   */
  updateEstado: async (id, estado) => {
    try {
      const response = await api.put(`/actividades/${id}`, { estado });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar estado de actividad ${id}:`, error);
      throw error;
    }
  }
};

export default ActividadService;

