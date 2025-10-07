import api from './api';

/**
 * Servicio para gestión de usuarios
 */
export const UserService = {
  /**
   * Obtener todos los usuarios
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de usuarios
   */
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/users', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },

  /**
   * Obtener un usuario por ID
   * @param {number} id - ID del usuario
   * @returns {Promise<Object>} Datos del usuario
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener usuario ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear nuevo usuario
   * @param {Object} data - Datos del usuario
   * @returns {Promise<Object>} Usuario creado
   */
  create: async (data) => {
    try {
      const response = await api.post('/users', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },

  /**
   * Actualizar usuario
   * @param {number} id - ID del usuario
   * @param {Object} data - Datos a actualizar
   * @returns {Promise<Object>} Usuario actualizado
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar usuario ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar usuario
   * @param {number} id - ID del usuario
   * @returns {Promise<Object>} Confirmación
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar usuario ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener usuarios por rol
   * @param {string} rol - Rol a filtrar
   * @returns {Promise<Object>} Lista de usuarios
   */
  getPorRol: async (rol) => {
    try {
      const response = await api.get('/users', { params: { rol } });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener usuarios con rol ${rol}:`, error);
      throw error;
    }
  },

  /**
   * Cambiar estado de usuario
   * @param {number} id - ID del usuario
   * @param {string} estado - Nuevo estado
   * @returns {Promise<Object>} Usuario actualizado
   */
  cambiarEstado: async (id, estado) => {
    try {
      const response = await api.put(`/users/${id}`, { estado });
      return response.data;
    } catch (error) {
      console.error(`Error al cambiar estado del usuario ${id}:`, error);
      throw error;
    }
  }
};

export default UserService;

