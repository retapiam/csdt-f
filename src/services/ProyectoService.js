import api from './api';
import TareaService from './tareaService';

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

// Compatibilidad con hooks existentes: alias usados por useProyectos/useTareas
// Estos métodos delegan a las nuevas funciones o a servicios específicos
ProyectoService.obtenerProyectos = async (filters = {}, user) => {
  return ProyectoService.getAll(filters);
};

ProyectoService.obtenerProyecto = async (id, user) => {
  return ProyectoService.getById(id);
};

ProyectoService.crearProyecto = async (data, user) => {
  return ProyectoService.create(data);
};

ProyectoService.actualizarProyecto = async (id, data, user) => {
  return ProyectoService.update(id, data);
};

ProyectoService.eliminarProyecto = async (id, user) => {
  return ProyectoService.delete(id);
};

ProyectoService.obtenerTareas = async (filters = {}, user) => {
  return TareaService.getAll(filters);
};

ProyectoService.crearTarea = async (data, user) => {
  return TareaService.create(data);
};

ProyectoService.actualizarTarea = async (id, data, user) => {
  return TareaService.update(id, data);
};

ProyectoService.clearCache = () => {};

ProyectoService.puedeCrearProyecto = (user) => {
  const rol = (user?.rol || '').toLowerCase();
  return rol === 'adm' || rol === 'adm_gen';
};

ProyectoService.puedeEliminarProyecto = (user) => {
  const rol = (user?.rol || '').toLowerCase();
  return rol === 'adm' || rol === 'adm_gen';
};

ProyectoService.obtenerEstadisticas = async (user) => {
  // Devuelve estructura esperada por los dashboards cuando backend no responde aún
  return {
    proyectosActivos: 0,
    tareasPendientes: 0,
    presupuestoTotal: 0,
    operadoresDisponibles: 0,
    clientesActivos: 0,
  };
};

export default ProyectoService;

