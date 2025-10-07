import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthServiceUnificado from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const verificarSesion = async () => {
      try {
        if (AuthServiceUnificado.isAuthenticated()) {
          const storedUser = AuthServiceUnificado.getStoredUser();
          if (storedUser) {
            setUser(storedUser);
            // Verificar si la sesión sigue siendo válida con datos reales
            try {
              const currentUser = await AuthServiceUnificado.getCurrentUser();
              // Actualizar datos del usuario con información real de la BD
              if (currentUser && currentUser.data) {
                setUser(currentUser.data);
              }
            } catch (error) {
              console.error('Error verificando sesión con BD:', error);
              // Si hay error, limpiar sesión
              await AuthServiceUnificado.logout();
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error verificando sesión:', error);
        setUser(null);
      }
    };

    verificarSesion();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      const result = await AuthServiceUnificado.login(email, password);
      setUser(result.user);
      return result;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    
    try {
      const result = await AuthServiceUnificado.register(userData);
      // El usuario puede estar en result.user o result.data.user
      const usuario = result.user || result.data?.user;
      setUser(usuario);
      return result;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const recuperarPassword = async (email, documento) => {
    setLoading(true);
    
    try {
      const result = await AuthServiceUnificado.recuperarPassword(email, documento);
      return result;
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthServiceUnificado.logout();
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    } finally {
      setUser(null);
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    
    // Administrador y Administrador General tienen todos los permisos
    if (user.rol === 'adm' || user.rol === 'adm_gen') {
      return true;
    }
    
    // Verificar permisos específicos según el rol
    const permisosPorRol = {
      'adm_gen': ['publicas', 'cliente', 'operador', 'administrador', 'admin_general'],
      'adm': ['publicas', 'cliente', 'operador', 'administrador'],
      'ope': ['publicas', 'cliente', 'operador'],
      'cli': ['publicas', 'cliente']
    };

    const permisos = permisosPorRol[user.rol] || [];
    return permisos.includes(permission);
  };

  const isAdmin = () => {
    return user && user.rol === 'adm';
  };

  const isAdminGeneral = () => {
    return user && user.rol === 'adm_gen';
  };

  const isOperador = () => {
    return user && (user.rol === 'ope' || user.rol === 'adm' || user.rol === 'adm_gen');
  };

  const isCliente = () => {
    return user && (user.rol === 'cli' || user.rol === 'ope' || user.rol === 'adm' || user.rol === 'adm_gen');
  };

  const canManageActivities = () => {
    return user && (user.rol === 'adm' || user.rol === 'adm_gen');
  };

  const canManageResources = () => {
    return user && (user.rol === 'adm' || user.rol === 'adm_gen');
  };

  const canViewReports = () => {
    return user && (user.rol === 'adm' || user.rol === 'adm_gen' || user.rol === 'ope');
  };

  const canCreateTasks = () => {
    return user && (user.rol === 'adm' || user.rol === 'adm_gen' || user.rol === 'ope');
  };

  const canExecuteTasks = () => {
    return user && (user.rol === 'ope' || user.rol === 'cli' || user.rol === 'adm' || user.rol === 'adm_gen');
  };

  const canManageRegistros = () => {
    return user && (user.rol === 'adm' || user.rol === 'adm_gen');
  };

  // Funciones específicas para gestión de roles y permisos
  const canManageRoles = () => {
    return user && (user.rol === 'adm_gen');
  };

  const canManagePermissions = () => {
    return user && (user.rol === 'adm_gen' || user.rol === 'adm');
  };

  const canManageUsers = () => {
    return user && (user.rol === 'adm_gen' || user.rol === 'adm');
  };

  const canAccessPanelVista = () => {
    return user && (user.rol === 'adm_gen' || user.rol === 'adm');
  };

  const canControlTotal = () => {
    return user && user.rol === 'adm_gen';
  };

  const isAuthenticated = () => {
    return user !== null && AuthServiceUnificado.isAuthenticated();
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    recuperarPassword,
    hasPermission,
    isAdmin,
    isAdminGeneral,
    isOperador,
    isCliente,
    canManageActivities,
    canManageResources,
    canViewReports,
    canCreateTasks,
    canExecuteTasks,
    canManageRegistros,
    canManageRoles,
    canManagePermissions,
    canManageUsers,
    canAccessPanelVista,
    canControlTotal,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
