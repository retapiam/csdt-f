import api from './api';

/**
 * Servicio para gestión de tareas
 */
export const TareaService = {
  /**
   * Obtener todas las tareas
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de tareas
   */
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/tareas', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      throw error;
    }
  },

  /**
   * Obtener tareas por proyecto
   * @param {number} proyectoId - ID del proyecto
   * @returns {Promise<Object>} Lista de tareas del proyecto
   */
  getPorProyecto: async (proyectoId) => {
    try {
      const response = await api.get(`/proyectos/${proyectoId}/tareas`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener tareas del proyecto ${proyectoId}:`, error);
      throw error;
    }
  },

  /**
   * Obtener una tarea por ID
   * @param {number} id - ID de la tarea
   * @returns {Promise<Object>} Datos de la tarea
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/tareas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener tarea ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear nueva tarea
   * @param {Object} data - Datos de la tarea
   * @returns {Promise<Object>} Tarea creada
   */
  create: async (data) => {
    try {
      const response = await api.post('/tareas', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw error;
    }
  },

  /**
   * Actualizar tarea
   * @param {number} id - ID de la tarea
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Tarea actualizada
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`/tareas/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar tarea ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar tarea
   * @param {number} id - ID de la tarea
   * @returns {Promise<Object>} Confirmación
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/tareas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar tarea ${id}:`, error);
      throw error;
    }
  },

  /**
   * Actualizar estado de tarea
   * @param {number} id - ID de la tarea
   * @param {string} estado - Nuevo estado
   * @returns {Promise<Object>} Tarea actualizada
   */
  updateEstado: async (id, estado) => {
    try {
      const response = await api.put(`/tareas/${id}`, { estado });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar estado de tarea ${id}:`, error);
      throw error;
    }
  },

  /**
   * Actualizar progreso de tarea
   * @param {number} id - ID de la tarea
   * @param {number} progreso - Porcentaje (0-100)
   * @returns {Promise<Object>} Tarea actualizada
   */
  updateProgreso: async (id, progreso) => {
    try {
      const response = await api.put(`/tareas/${id}`, { progreso });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar progreso de tarea ${id}:`, error);
      throw error;
    }
  },

  /**
   * Asignar tarea a operador
   * @param {number} id - ID de la tarea
   * @param {number} operadorId - ID del operador
   * @returns {Promise<Object>} Tarea actualizada
   */
  asignar: async (id, operadorId) => {
    try {
      const response = await api.put(`/tareas/${id}`, { asignado_a: operadorId });
      return response.data;
    } catch (error) {
      console.error(`Error al asignar tarea ${id}:`, error);
      throw error;
    }
  },

  /**
   * Agregar PDF a una tarea
   * @param {number} id - ID de la tarea
   * @param {string} rutaPDF - Ruta del PDF
   * @param {string} nombre - Nombre del PDF
   * @returns {Promise<Object>} Tarea actualizada
   */
  agregarPDF: async (id, rutaPDF, nombre = 'Documento') => {
    try {
      const response = await api.post(`/tareas/${id}/agregar-pdf`, {
        ruta_pdf: rutaPDF,
        nombre: nombre
      });
      return response.data;
    } catch (error) {
      console.error(`Error al agregar PDF a tarea ${id}:`, error);
      throw error;
    }
  },

  /**
   * Agregar soporte documental a una tarea
   * @param {number} id - ID de la tarea
   * @param {string} rutaSoporte - Ruta del soporte
   * @param {string} tipo - Tipo de soporte
   * @returns {Promise<Object>} Tarea actualizada
   */
  agregarSoporte: async (id, rutaSoporte, tipo = 'documento') => {
    try {
      const response = await api.post(`/tareas/${id}/agregar-soporte`, {
        ruta_soporte: rutaSoporte,
        tipo: tipo
      });
      return response.data;
    } catch (error) {
      console.error(`Error al agregar soporte a tarea ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener tareas por actividad
   * @param {number} actividadId - ID de la actividad
   * @returns {Promise<Object>} Lista de tareas
   */
  getPorActividad: async (actividadId) => {
    try {
      const response = await api.get(`/actividades/${actividadId}/tareas`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener tareas de actividad ${actividadId}:`, error);
      throw error;
    }
  },

  /**
   * Crear sub-tarea para cliente (desde operador)
   * @param {number} tareaPadreId - ID de la tarea padre
   * @param {Object} data - Datos de la sub-tarea
   * @returns {Promise<Object>} Sub-tarea creada
   */
  crearSubTareaParaCliente: async (tareaPadreId, data) => {
    try {
      const response = await api.post('/tareas', {
        ...data,
        tarea_padre_id: tareaPadreId,
        nivel_tarea: 'operador', // Tarea delegada por operador
        color: '#10B981' // Verde
      });
      return response.data;
    } catch (error) {
      console.error(`Error al crear sub-tarea para cliente:`, error);
      throw error;
    }
  }
};

export default TareaService;
