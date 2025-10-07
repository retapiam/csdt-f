/**
 * Servicio de Gestión de Permisos
 * Conecta con el backend para manejar permisos de usuarios
 */
import csdtApiService from './csdtApiService';

class PermisosService {
  /**
   * Listar permisos de un usuario
   */
  async listarPermisosUsuario(userId) {
    try {
      const response = await csdtApiService.get(`/permisos/usuario/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al listar permisos:', error);
      throw error;
    }
  }

  /**
   * Verificar si un usuario tiene un permiso específico
   */
  async verificarPermiso(userId, tipoPermiso) {
    try {
      const response = await csdtApiService.get(`/permisos/verificar/${userId}/${tipoPermiso}`);
      return response.data;
    } catch (error) {
      console.error('Error al verificar permiso:', error);
      throw error;
    }
  }

  /**
   * Obtener permisos por rol
   */
  async permisosRol(rol) {
    try {
      const response = await csdtApiService.get(`/permisos/rol/${rol}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener permisos del rol:', error);
      throw error;
    }
  }

  /**
   * Otorgar permiso a un usuario
   */
  async otorgarPermiso(datos) {
    try {
      const response = await csdtApiService.post('/permisos/otorgar', datos);
      return response.data;
    } catch (error) {
      console.error('Error al otorgar permiso:', error);
      throw error;
    }
  }

  /**
   * Actualizar permiso
   */
  async actualizarPermiso(permisoId, datos) {
    try {
      const response = await csdtApiService.put(`/permisos/${permisoId}`, datos);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar permiso:', error);
      throw error;
    }
  }

  /**
   * Vetar permiso
   */
  async vetarPermiso(permisoId, motivo) {
    try {
      const response = await csdtApiService.post(`/permisos/${permisoId}/vetar`, { motivo });
      return response.data;
    } catch (error) {
      console.error('Error al vetar permiso:', error);
      throw error;
    }
  }

  /**
   * Activar permiso vetado
   */
  async activarPermiso(permisoId) {
    try {
      const response = await csdtApiService.post(`/permisos/${permisoId}/activar`);
      return response.data;
    } catch (error) {
      console.error('Error al activar permiso:', error);
      throw error;
    }
  }

  /**
   * Eliminar permiso
   */
  async eliminarPermiso(permisoId, motivo = '') {
    try {
      const response = await csdtApiService.delete(`/permisos/${permisoId}`, { data: { motivo } });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar permiso:', error);
      throw error;
    }
  }

  /**
   * Obtener historial de un permiso
   */
  async historialPermiso(permisoId) {
    try {
      const response = await csdtApiService.get(`/permisos/${permisoId}/historial`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener historial:', error);
      throw error;
    }
  }
}

const permisosService = new PermisosService();
export default permisosService;
