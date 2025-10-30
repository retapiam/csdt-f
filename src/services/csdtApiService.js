/**
 * Servicio API CSDT simplificado
 * Proporciona acceso a las funciones del backend
 * Compatible con el backend Laravel
 */
import api from './api';
import { API_ENDPOINTS } from '../config/config';

class CsdtApiService {
  // Autenticación
  auth = {
    login: async (credentials) => {
      try {
        return await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      } catch (error) {
        throw error;
      }
    },
    
    register: async (userData) => {
      try {
        return await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      } catch (error) {
        throw error;
      }
    },
    
    logout: async () => {
      try {
        return await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      } catch (error) {
        throw error;
      }
    },
    
    me: async () => {
      try {
        return await api.get(API_ENDPOINTS.AUTH.ME);
      } catch (error) {
        throw error;
      }
    },
    
    getCurrentUser: async () => {
      try {
        return await api.get(API_ENDPOINTS.AUTH.ME);
      } catch (error) {
        throw error;
      }
    },
    
    updateProfile: async (userData) => {
      try {
        return await api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, userData);
      } catch (error) {
        throw error;
      }
    },
    
    changePassword: async (passwordData) => {
      try {
        return await api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData);
      } catch (error) {
        throw error;
      }
    },
    
    cambiarContrasena: async (passwordData) => {
      try {
        return await api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData);
      } catch (error) {
        throw error;
      }
    },
    
    update: async (userData) => {
      try {
        return await api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, userData);
      } catch (error) {
        throw error;
      }
    },
    
    resetPassword: async (email) => {
      try {
        return await api.post('/auth/reset-password', { email });
      } catch (error) {
        throw error;
      }
    },
    
    recuperarContrasena: async (email, documento) => {
      try {
        return await api.post('/auth/recuperar-contrasena', { email, documento });
      } catch (error) {
        throw error;
      }
    }
  };

  // Usuarios
  users = {
    getAll: async () => {
      try {
        return await api.get(API_ENDPOINTS.USERS.BASE);
      } catch (error) {
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        return await api.get(API_ENDPOINTS.USERS.BY_ID(id));
      } catch (error) {
        throw error;
      }
    },
    
    create: async (userData) => {
      try {
        return await api.post(API_ENDPOINTS.USERS.BASE, userData);
      } catch (error) {
        throw error;
      }
    },
    
    update: async (id, userData) => {
      try {
        return await api.put(API_ENDPOINTS.USERS.BY_ID(id), userData);
      } catch (error) {
        throw error;
      }
    },
    
    delete: async (id) => {
      try {
        return await api.delete(API_ENDPOINTS.USERS.BY_ID(id));
      } catch (error) {
        throw error;
      }
    }
  };

  // Permisos (alineado a backend /permisos/*)
  permisos = {
    listarPorUsuario: async (userId) => api.get(`/permisos/usuario/${userId}`),
    verificar: async (userId, tipoPermiso) => api.get(`/permisos/verificar/${userId}/${tipoPermiso}`),
    permisosPorRol: async (rol) => api.get(`/permisos/rol/${rol}`),
    otorgar: async (payload) => api.post('/permisos/otorgar', payload),
    actualizar: async (permisoId, payload) => api.put(`/permisos/${permisoId}`, payload),
    vetar: async (permisoId) => api.post(`/permisos/${permisoId}/vetar`),
    activar: async (permisoId) => api.post(`/permisos/${permisoId}/activar`),
    eliminar: async (permisoId) => api.delete(`/permisos/${permisoId}`),
    historial: async (permisoId) => api.get(`/permisos/${permisoId}/historial`)
  };

  // Proyectos (apiResource 'proyectos')
  proyectos = {
    getAll: async () => {
      try {
        return await api.get(API_ENDPOINTS.PROJECTS.BASE);
      } catch (error) {
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        return await api.get(API_ENDPOINTS.PROJECTS.BY_ID(id));
      } catch (error) {
        throw error;
      }
    },
    
    create: async (projectData) => {
      try {
        return await api.post(API_ENDPOINTS.PROJECTS.BASE, projectData);
      } catch (error) {
        throw error;
      }
    },
    
    update: async (id, projectData) => {
      try {
        return await api.put(API_ENDPOINTS.PROJECTS.BY_ID(id), projectData);
      } catch (error) {
        throw error;
      }
    },
    
    delete: async (id) => {
      try {
        return await api.delete(API_ENDPOINTS.PROJECTS.BY_ID(id));
      } catch (error) {
        throw error;
      }
    }
  };

  // Casos Legales (apiResource 'casos-legales')
  casosLegales = {
    getAll: async () => {
      try {
        return await api.get(API_ENDPOINTS.LEGAL_CASES.BASE);
      } catch (error) {
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        return await api.get(API_ENDPOINTS.LEGAL_CASES.BY_ID(id));
      } catch (error) {
        throw error;
      }
    },
    
    create: async (caseData) => {
      try {
        return await api.post(API_ENDPOINTS.LEGAL_CASES.BASE, caseData);
      } catch (error) {
        throw error;
      }
    },
    
    update: async (id, caseData) => {
      try {
        return await api.put(API_ENDPOINTS.LEGAL_CASES.BY_ID(id), caseData);
      } catch (error) {
        throw error;
      }
    }
  };

  // Derechos Étnicos (prefix 'etnicos')
  etnicos = {
    pueblosIndigenas: {
      listar: async () => api.get('/etnicos/pueblos-indigenas'),
      obtener: async (id) => api.get(`/etnicos/pueblos-indigenas/${id}`),
      crear: async (data) => api.post('/etnicos/pueblos-indigenas', data),
      actualizar: async (id, data) => api.put(`/etnicos/pueblos-indigenas/${id}`, data),
      eliminar: async (id) => api.delete(`/etnicos/pueblos-indigenas/${id}`)
    },
    comunidadesAfro: {
      listar: async () => api.get('/etnicos/comunidades-afro'),
      obtener: async (id) => api.get(`/etnicos/comunidades-afro/${id}`),
      crear: async (data) => api.post('/etnicos/comunidades-afro', data),
      actualizar: async (id, data) => api.put(`/etnicos/comunidades-afro/${id}`, data),
      eliminar: async (id) => api.delete(`/etnicos/comunidades-afro/${id}`)
    },
    consultasPrevias: {
      listar: async () => api.get('/etnicos/consultas-previas'),
      obtener: async (id) => api.get(`/etnicos/consultas-previas/${id}`),
      crear: async (data) => api.post('/etnicos/consultas-previas', data),
      actualizar: async (id, data) => api.put(`/etnicos/consultas-previas/${id}`, data),
      eliminar: async (id) => api.delete(`/etnicos/consultas-previas/${id}`)
    }
  };

  // IA (prefix 'ia')
  ia = {
    analizarJuridico: async (text, options = {}) => api.post('/ia/analizar-juridico', { text, ...options }),
    analizarEtnico: async (text, options = {}) => api.post('/ia/analizar-etnico', { text, ...options }),
    analizarVeeduria: async (text, options = {}) => api.post('/ia/analizar-veeduria', { text, ...options }),
    consultasListar: async () => api.get('/ia/consultas'),
    consultaPorId: async (id) => api.get(`/ia/consultas/${id}`),
    estadisticasCentro: async () => api.get('/ia/estadisticas-centro'),
    estadisticasMonitor: async () => api.get('/ia/estadisticas-monitor'),
    metricasRendimiento: async () => api.get('/ia/metricas-rendimiento'),
    serviciosEstado: async () => api.get('/ia/servicios-estado'),
    // Compat: algunos scripts esperan ia.especialistas.listar()
    especialistas: {
      listar: async () => api.get('/ia/consultas')
    }
  };

  // Dashboard sencillo protegido (backend /dashboard)
  dashboard = {
    get: async () => api.get('/dashboard')
  };

  // Método auxiliar para hacer POST genérico
  async post(endpoint, data, config = {}) {
    try {
      return await api.post(endpoint, data, config);
    } catch (error) {
      throw error;
    }
  }
  
  // Método auxiliar para hacer GET genérico
  async get(endpoint, config = {}) {
    try {
      return await api.get(endpoint, config);
    } catch (error) {
      throw error;
    }
  }
  
  // Método auxiliar para hacer PUT genérico
  async put(endpoint, data, config = {}) {
    try {
      return await api.put(endpoint, data, config);
    } catch (error) {
      throw error;
    }
  }
  
  // Método auxiliar para hacer DELETE genérico
  async delete(endpoint, config = {}) {
    try {
      return await api.delete(endpoint, config);
    } catch (error) {
      throw error;
    }
  }
}

// Instancia singleton
const csdtApiService = new CsdtApiService();
export default csdtApiService;

