import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { usePermisosVista } from '@contexts/PermisosVistaContext';
import Unauthorized from './Unauthorized';

const ProtectedRouteWithPermisos = ({ 
  children, 
  requiredRole = null, 
  requiredPage = null, 
  requiredAccess = 'ver' 
}) => {
  const { user, isAuthenticated } = useAuth();
  const { puedeVer, puedeEditar, puedeModificar } = usePermisosVista();

  // Acceso total para Administrador General (rol 4)
  if (user && user.rol === 'adm_gen') {
    return children;
  }

  // Verificar autenticación básica
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  // Verificar que el usuario existe antes de acceder a sus propiedades
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Verificar rol requerido
  if (requiredRole) {
    // Verificar si el rol del usuario coincide exactamente
    if (user.rol === requiredRole) {
      // Coincidencia exacta
    } else {
      // Verificar si el usuario tiene un rol superior según la jerarquía
      const rolesHierarchy = {
        'cli': 1,        // Cliente - Nivel 1
        'ope': 2,        // Operador - Nivel 2
        'adm': 3,        // Administrador - Nivel 3
        'adm_gen': 4     // Administrador General - Nivel 4
      };

      const userLevel = rolesHierarchy[user.rol] || 0;
      const requiredLevel = rolesHierarchy[requiredRole] || 0;

      if (userLevel < requiredLevel) {
        return <Unauthorized />;
      }
    }
  }

  // Verificar permisos de vista específicos
  if (requiredPage) {
    let tieneAcceso = false;

    switch (requiredAccess) {
      case 'ver':
        tieneAcceso = puedeVer(requiredPage);
        break;
      case 'editar':
        tieneAcceso = puedeEditar(requiredPage);
        break;
      case 'modificar':
        tieneAcceso = puedeModificar(requiredPage);
        break;
      default:
        tieneAcceso = puedeVer(requiredPage);
    }

    if (!tieneAcceso) {
      return <Unauthorized />;
    }
  }

  return children;
};

export default ProtectedRouteWithPermisos;
