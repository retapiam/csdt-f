/**
 * Servicio API CSDT simplificado
 * Proporciona acceso a las funciones del backend
 * Compatible con el backend Laravel
 */
import api from './api';

class CsdtApiService {
  // Autenticación
  auth = {
    login: async (credentials) => {
      try {
        return await api.post('/auth/login', credentials);
      } catch (error) {
        throw error;
      }
    },
    
    register: async (userData) => {
      try {
        return await api.post('/auth/register', userData);
      } catch (error) {
        throw error;
      }
    },
    
    logout: async () => {
      try {
        return await api.post('/auth/logout');
      } catch (error) {
        throw error;
      }
    },
    
    me: async () => {
      try {
        return await api.get('/auth/me');
      } catch (error) {
        throw error;
      }
    },
    
    getCurrentUser: async () => {
      try {
        return await api.get('/auth/me');
      } catch (error) {
        throw error;
      }
    },
    
    updateProfile: async (userData) => {
      try {
        return await api.put('/auth/profile', userData);
      } catch (error) {
        throw error;
      }
    },
    
    changePassword: async (passwordData) => {
      try {
        return await api.post('/auth/change-password', passwordData);
      } catch (error) {
        throw error;
      }
    },
    
    cambiarContrasena: async (passwordData) => {
      try {
        return await api.post('/auth/change-password', passwordData);
      } catch (error) {
        throw error;
      }
    },
    
    update: async (userData) => {
      try {
        return await api.put('/auth/profile', userData);
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
        return await api.get('/users');
      } catch (error) {
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        return await api.get(`/users/${id}`);
      } catch (error) {
        throw error;
      }
    },
    
    create: async (userData) => {
      try {
        return await api.post('/users', userData);
      } catch (error) {
        throw error;
      }
    },
    
    update: async (id, userData) => {
      try {
        return await api.put(`/users/${id}`, userData);
      } catch (error) {
        throw error;
      }
    },
    
    delete: async (id) => {
      try {
        return await api.delete(`/users/${id}`);
      } catch (error) {
        throw error;
      }
    }
  };

  // Permisos
  permissions = {
    getAll: async () => {
      try {
        return await api.get('/permissions');
      } catch (error) {
        throw error;
      }
    },
    
    getUserPermissions: async (userId) => {
      try {
        return await api.get(`/permissions/user/${userId}`);
      } catch (error) {
        throw error;
      }
    },
    
    updateUserPermissions: async (userId, permissions) => {
      try {
        return await api.post(`/permissions/user/${userId}`, { permissions });
      } catch (error) {
        throw error;
      }
    }
  };

  // Proyectos
  projects = {
    getAll: async () => {
      try {
        return await api.get('/projects');
      } catch (error) {
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        return await api.get(`/projects/${id}`);
      } catch (error) {
        throw error;
      }
    },
    
    create: async (projectData) => {
      try {
        return await api.post('/projects', projectData);
      } catch (error) {
        throw error;
      }
    },
    
    update: async (id, projectData) => {
      try {
        return await api.put(`/projects/${id}`, projectData);
      } catch (error) {
        throw error;
      }
    },
    
    delete: async (id) => {
      try {
        return await api.delete(`/projects/${id}`);
      } catch (error) {
        throw error;
      }
    }
  };

  // Casos
  cases = {
    getAll: async () => {
      try {
        return await api.get('/cases');
      } catch (error) {
        throw error;
      }
    },
    
    getById: async (id) => {
      try {
        return await api.get(`/cases/${id}`);
      } catch (error) {
        throw error;
      }
    },
    
    create: async (caseData) => {
      try {
        return await api.post('/cases', caseData);
      } catch (error) {
        throw error;
      }
    },
    
    update: async (id, caseData) => {
      try {
        return await api.put(`/cases/${id}`, caseData);
      } catch (error) {
        throw error;
      }
    }
  };

  // IA
  ia = {
    analyze: async (text, options = {}) => {
      try {
        return await api.post('/ia/analyze', { text, ...options });
      } catch (error) {
        throw error;
      }
    },
    
    generateResponse: async (text, context = {}) => {
      try {
        return await api.post('/ia/generate-response', { text, context });
      } catch (error) {
        throw error;
      }
    }
  };
}

  // Método auxiliar para hacer POST genérico
  post = async (endpoint, data, config = {}) => {
    try {
      return await api.post(endpoint, data, config);
    } catch (error) {
      throw error;
    }
  };
  
  // Método auxiliar para hacer GET genérico
  get = async (endpoint, config = {}) => {
    try {
      return await api.get(endpoint, config);
    } catch (error) {
      throw error;
    }
  };
  
  // Método auxiliar para hacer PUT genérico
  put = async (endpoint, data, config = {}) => {
    try {
      return await api.put(endpoint, data, config);
    } catch (error) {
      throw error;
    }
  };
  
  // Método auxiliar para hacer DELETE genérico
  delete = async (endpoint, config = {}) => {
    try {
      return await api.delete(endpoint, config);
    } catch (error) {
      throw error;
    }
  };
}

// Instancia singleton
const csdtApiService = new CsdtApiService();
export default csdtApiService;

