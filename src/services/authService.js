/**
 * Servicio de Autenticación Unificado
 * Conecta con el backend Laravel usando csdtApiService
 */
import csdtApiService from './csdtApiService';
import { STORAGE_CONFIG } from '../config/config';
import { mapBackendUserToFrontend } from '../utils/userMapper';

class AuthService {
  /**
   * Login de usuario con validación mejorada
   */
  async login(email, password) {
    try {
      // Validación básica
      if (!email || !password) {
        return { success: false, message: 'Email y contraseña son obligatorios' };
      }

      const response = await csdtApiService.auth.login({ 
        email: email.toLowerCase().trim(), 
        password 
      });
      
      if (response.data.success) {
        // Mapear usuario del backend al formato del frontend
        const usuarioMapeado = mapBackendUserToFrontend(response.data.data.user);
        
        // Guardar token y usuario en localStorage
        localStorage.setItem(STORAGE_CONFIG.KEYS.TOKEN, response.data.data.token);
        localStorage.setItem(STORAGE_CONFIG.KEYS.USER, JSON.stringify(usuarioMapeado));
        
        // Retornar con usuario mapeado
        return {
          ...response.data,
          data: {
            ...response.data.data,
            user: usuarioMapeado
          }
        };
      }
      
      return response.data;
    } catch (error) {
      
      // Manejar errores específicos del backend
      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || 'Error al iniciar sesión',
          errors: error.response.data.errors || {}
        };
      }
      
      // Manejar errores de red
      if (error.message.includes('Network') || error.code === 'NETWORK_ERROR') {
        return {
          success: false,
          message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
        };
      }
      
      throw error;
    }
  }

  /**
   * Verificar disponibilidad de email y documento antes de registrar
   */
  async verificarDisponibilidad(email, documento) {
    try {
      const response = await csdtApiService.post('/auth/verificar-disponibilidad', {
        email,
        documento
      });
      return response.data;
    } catch (error) {
      console.error('Error verificando disponibilidad:', error);
      throw error;
    }
  }

  /**
   * Validar datos de registro en el frontend
   */
  validarDatosRegistro(userData) {
    const errores = {};

    // Validar nombre
    if (!userData.name && (!userData.nombres || !userData.apellidos)) {
      errores.name = 'El nombre completo es obligatorio';
    } else {
      const nombreCompleto = userData.name || `${userData.nombres} ${userData.apellidos}`;
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreCompleto)) {
        errores.name = 'El nombre solo puede contener letras y espacios';
      }
    }

    // Validar email
    if (!userData.email) {
      errores.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errores.email = 'El correo electrónico no es válido';
    }

    // Validar documento
    if (!userData.documento) {
      errores.documento = 'El número de documento es obligatorio';
    }

    // Validar contraseña
    if (!userData.password) {
      errores.password = 'La contraseña es obligatoria';
    } else if (userData.password.length < 8) {
      errores.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(userData.password)) {
      errores.password = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
    }

    // Validar confirmación de contraseña
    if (userData.password_confirmation && userData.password !== userData.password_confirmation) {
      errores.password_confirmation = 'Las contraseñas no coinciden';
    }

    // Validar teléfono (opcional)
    if (userData.telefono && !/^[0-9+\-\s()]+$/.test(userData.telefono)) {
      errores.telefono = 'El teléfono solo puede contener números y caracteres válidos';
    }

    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  }

  /**
   * Registro de nuevo usuario con validación previa
   */
  async register(userData) {
    try {
      // Validar datos en el frontend primero
      const validacion = this.validarDatosRegistro(userData);
      if (!validacion.esValido) {
        return {
          success: false,
          message: 'Error de validación',
          errors: validacion.errores
        };
      }

      // Verificar disponibilidad de email y documento
      const disponibilidad = await this.verificarDisponibilidad(
        userData.email,
        userData.documento
      );

      if (!disponibilidad.data.email_disponible || !disponibilidad.data.documento_disponible) {
        const errores = {};
        if (!disponibilidad.data.email_disponible) {
          errores.email = ['El correo electrónico ya está registrado'];
        }
        if (!disponibilidad.data.documento_disponible) {
          errores.documento = ['El número de documento ya está registrado'];
        }

        return {
          success: false,
          message: disponibilidad.data.mensajes.join('. '),
          errors: errores
        };
      }

      // Si todo está bien, proceder con el registro
      const response = await csdtApiService.auth.register(userData);
      
      if (response.data.success) {
        // Mapear usuario del backend al formato del frontend
        const usuarioMapeado = mapBackendUserToFrontend(response.data.data.user);
        
        // Guardar token y usuario en localStorage
        localStorage.setItem(STORAGE_CONFIG.KEYS.TOKEN, response.data.data.token);
        localStorage.setItem(STORAGE_CONFIG.KEYS.USER, JSON.stringify(usuarioMapeado));
        
        // Retornar con usuario mapeado
        return {
          ...response.data,
          data: {
            ...response.data.data,
            user: usuarioMapeado
          }
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error);
      
      // Manejar errores del backend
      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || 'Error al registrar usuario',
          errors: error.response.data.errors || {}
        };
      }
      
      throw error;
    }
  }

  /**
   * Logout de usuario
   */
  async logout() {
    try {
      // Intentar logout en el backend
      await csdtApiService.auth.logout();
    } catch (error) {
      console.error('Error en logout del backend:', error);
    } finally {
      // Siempre limpiar localStorage
      localStorage.removeItem(STORAGE_CONFIG.KEYS.TOKEN);
      localStorage.removeItem(STORAGE_CONFIG.KEYS.USER);
    }
  }

  /**
   * Obtener usuario actual del backend
   */
  async getCurrentUser() {
    try {
      const response = await csdtApiService.auth.me();
      
      // Actualizar usuario en localStorage si viene del backend
      if (response.data && response.data.data) {
        // Mapear usuario del backend al formato del frontend
        const usuarioMapeado = mapBackendUserToFrontend(response.data.data);
        localStorage.setItem(STORAGE_CONFIG.KEYS.USER, JSON.stringify(usuarioMapeado));
        
        return {
          ...response.data,
          data: usuarioMapeado
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      throw error;
    }
  }

  /**
   * Actualizar perfil del usuario
   */
  async updateProfile(data) {
    try {
      const response = await csdtApiService.auth.update(data);
      
      if (response.data.success) {
        // Mapear usuario del backend al formato del frontend
        const usuarioMapeado = mapBackendUserToFrontend(response.data.data);
        localStorage.setItem(STORAGE_CONFIG.KEYS.USER, JSON.stringify(usuarioMapeado));
        
        return {
          ...response.data,
          data: usuarioMapeado
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  }

  /**
   * Cambiar contraseña
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await csdtApiService.auth.cambiarContrasena({
        current_password: currentPassword,
        new_password: newPassword
      });
      
      return response.data;
    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      throw error;
    }
  }

  /**
   * Recuperar contraseña usando email y documento
   */
  async recuperarPassword(email, documento) {
    try {
      const response = await csdtApiService.auth.recuperarContrasena(email, documento);
      return response.data;
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      
      // Manejar errores del backend
      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || 'Error al recuperar contraseña',
          errors: error.response.data.errors || {}
        };
      }
      
      throw error;
    }
  }

  /**
   * Obtener usuario almacenado en localStorage
   */
  getStoredUser() {
    try {
      const userData = localStorage.getItem(STORAGE_CONFIG.KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error obteniendo usuario almacenado:', error);
      return null;
    }
  }

  /**
   * Obtener token almacenado en localStorage
   */
  getStoredToken() {
    return localStorage.getItem(STORAGE_CONFIG.KEYS.TOKEN);
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated() {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    return !!(token && user);
  }

  /**
   * Limpiar datos de autenticación
   */
  clearAuthData() {
    localStorage.removeItem(STORAGE_CONFIG.KEYS.TOKEN);
    localStorage.removeItem(STORAGE_CONFIG.KEYS.USER);
  }
}

// Exportar instancia única del servicio
const authService = new AuthService();
export default authService;
