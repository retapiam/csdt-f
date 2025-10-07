import React from 'react';
import { useAuth } from '@contexts/AuthContext';

/**
 * Componente para restringir acceso basado en roles
 * 
 * Reglas:
 * - Administrador General (adm_gen): acceso a TODO
 * - Administrador (adm): acceso a TODO
 * - Operador (ope): acceso a dashboards de operador y cliente
 * - Cliente (cli): acceso solo a dashboard de cliente
 */
const RestriccionAccesoPorRol = ({ 
  children, 
  rolesPermitidos = [], 
  mostrarMensaje = true,
  mensajePersonalizado = null 
}) => {
  const { user } = useAuth();

  if (!user) {
    if (mostrarMensaje) {
      return (
        <div style={{
          padding: '20px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#dc2626', margin: 0 }}>
            🔒 Debes iniciar sesión para acceder a este contenido
          </p>
        </div>
      );
    }
    return null;
  }

  // Verificar si el usuario tiene el rol permitido
  const tieneAcceso = rolesPermitidos.length === 0 || rolesPermitidos.includes(user.rol);

  if (!tieneAcceso) {
    if (mostrarMensaje) {
      return (
        <div style={{
          padding: '20px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#dc2626', margin: 0, fontWeight: 'bold' }}>
            ⛔ Acceso Restringido
          </p>
          <p style={{ color: '#dc2626', margin: '10px 0 0 0', fontSize: '14px' }}>
            {mensajePersonalizado || `Tu rol (${getRolNombre(user.rol)}) no tiene permisos para ver este contenido`}
          </p>
          <p style={{ color: '#6b7280', margin: '10px 0 0 0', fontSize: '12px' }}>
            Roles permitidos: {rolesPermitidos.map(r => getRolNombre(r)).join(', ')}
          </p>
        </div>
      );
    }
    return null;
  }

  return <>{children}</>;
};

/**
 * Hook para verificar permisos de acceso
 */
export const useAccesoPorRol = (rolesPermitidos = []) => {
  const { user } = useAuth();

  if (!user) {
    return {
      tieneAcceso: false,
      usuario: null,
      rol: null
    };
  }

  const tieneAcceso = rolesPermitidos.length === 0 || rolesPermitidos.includes(user.rol);

  return {
    tieneAcceso,
    usuario: user,
    rol: user.rol,
    esAdminGeneral: user.rol === 'adm_gen',
    esAdministrador: user.rol === 'adm' || user.rol === 'adm_gen',
    esOperador: user.rol === 'ope',
    esCliente: user.rol === 'cli'
  };
};

/**
 * Obtener nombre legible del rol
 */
const getRolNombre = (rol) => {
  const roles = {
    'adm_gen': 'Administrador General',
    'adm': 'Administrador',
    'ope': 'Operador',
    'cli': 'Cliente'
  };
  return roles[rol] || rol;
};

/**
 * Componente para mostrar contenido solo a administradores
 */
export const SoloAdministradores = ({ children, mostrarMensaje = true }) => (
  <RestriccionAccesoPorRol 
    rolesPermitidos={['adm', 'adm_gen']} 
    mostrarMensaje={mostrarMensaje}
  >
    {children}
  </RestriccionAccesoPorRol>
);

/**
 * Componente para mostrar contenido solo a Administrador General
 */
export const SoloAdminGeneral = ({ children, mostrarMensaje = true }) => (
  <RestriccionAccesoPorRol 
    rolesPermitidos={['adm_gen']} 
    mostrarMensaje={mostrarMensaje}
    mensajePersonalizado="Solo el Administrador General tiene acceso a esta funcionalidad"
  >
    {children}
  </RestriccionAccesoPorRol>
);

/**
 * Componente para mostrar contenido a operadores y administradores
 */
export const OperadoresYAdmins = ({ children, mostrarMensaje = true }) => (
  <RestriccionAccesoPorRol 
    rolesPermitidos={['ope', 'adm', 'adm_gen']} 
    mostrarMensaje={mostrarMensaje}
  >
    {children}
  </RestriccionAccesoPorRol>
);

export default RestriccionAccesoPorRol;

