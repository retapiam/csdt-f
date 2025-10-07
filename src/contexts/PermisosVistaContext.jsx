import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PermisosVistaContext = createContext();

export const usePermisosVista = () => {
  const context = useContext(PermisosVistaContext);
  if (!context) {
    throw new Error('usePermisosVista debe ser usado dentro de PermisosVistaProvider');
  }
  return context;
};

export const PermisosVistaProvider = ({ children }) => {
  const { user } = useAuth();
  const [permisosVista, setPermisosVista] = useState([]);

  useEffect(() => {
    cargarPermisos();
  }, [user]);

  const cargarPermisos = () => {
    try {
      const permisosData = JSON.parse(localStorage.getItem('permisosVista') || '[]');
      setPermisosVista(permisosData);
    } catch (error) {
      console.error('Error cargando permisos de vista:', error);
      setPermisosVista([]);
    }
  };

  const tienePermiso = (pagina, tipoAcceso = 'ver') => {
    if (!user) return false;

    // Administrador General tiene control total absoluto
    if (user.rol === 'adm_gen') {
      return true; // Acceso total sin restricciones
    }

    // Administrador tiene acceso total (excepto funciones de Administrador General)
    if (user.rol === 'adm') {
      // Verificar permisos específicos si existen
      if (user.permisos && user.permisos.control_total) return true;
      if (user.permisos && user.permisos[pagina.toLowerCase().replace(/\s+/g, '_')]) return true;
      return true; // Acceso total por defecto
    }

    // Administrador General y Administrador tienen acceso a páginas de administrador
    if (user.rol === 'adm_gen' || user.rol === 'adm') {
      const paginasAdmin = [
        'Dashboard Admin', 'Panel de Actividades', 'Gestión de Actividades',
        'Hoja de Recursos', 'Análisis de Precios Unitarios', 'Presupuesto de Actividades',
        'Convocatorias de Tareas', 'Gestión de Recursos Humanos', 'Gestión de Donaciones',
        'Gestión de Registros', 'Control de Permisos de Vista',
        'Validar Funcionarios y Entidades', 'Gestionar Roles y Niveles', 'Mantenimiento del Sistema',
        // Gestión de Proyectos - Ubicación: /12-gestion-proyectos
        'Gestión de Proyectos', 'Dashboard Unificado', 'Dashboard Administrador',
        'Crear Proyecto', 'Gestión APUs y Cotizaciones', 'Panel de Vista',
        'Dashboard Administrador Mejorado', 'GestionProyectos'
      ];
      if (paginasAdmin.includes(pagina)) return true;
    }

    // Operador tiene acceso a páginas de operador
    if (user.rol === 'ope') {
      const paginasOperador = [
        'Dashboard Operador', 'Tareas Asignadas', 'Centro de Gestión Legal', 'Panel de Tareas',
        // Gestión de Proyectos - Ubicación: /12-gestion-proyectos
        'Gestión de Proyectos', 'Dashboard Unificado', 'Dashboard Operador',
        'Dashboard Operador Mejorado', 'GestionProyectos'
      ];
      if (paginasOperador.includes(pagina)) return true;
    }

    // Cliente tiene acceso a páginas de cliente
    if (user.rol === 'cli') {
      const paginasCliente = [
        'Dashboard Cliente', 'Panel de Seguimiento de Casos', 'Tareas a Realizar',
        // Gestión de Proyectos - Ubicación: /12-gestion-proyectos
        'Gestión de Proyectos', 'Dashboard Unificado', 'Dashboard Cliente',
        'Dashboard Cliente Mejorado', 'GestionProyectos'
      ];
      if (paginasCliente.includes(pagina)) return true;
    }

    // Verificar permisos temporales otorgados
    const permisoTemporal = permisosVista.find(permiso => 
      permiso.usuarioId === user.id && 
      permiso.pagina === pagina &&
      permiso.tipoAcceso === tipoAcceso
    );

    if (permisoTemporal) {
      const ahora = new Date();
      const fechaInicio = new Date(permisoTemporal.fechaInicio);
      const fechaFin = permisoTemporal.fechaFin ? new Date(permisoTemporal.fechaFin) : null;

      // Verificar si el permiso está activo
      if (fechaInicio <= ahora && (!fechaFin || fechaFin >= ahora)) {
        return true;
      }
    }

    return false;
  };

  const puedeVer = (pagina) => {
    return tienePermiso(pagina, 'ver');
  };

  const puedeEditar = (pagina) => {
    return tienePermiso(pagina, 'editar') || tienePermiso(pagina, 'modificar');
  };

  const puedeModificar = (pagina) => {
    return tienePermiso(pagina, 'modificar');
  };

  const obtenerPermisosUsuario = (usuarioId) => {
    return permisosVista.filter(permiso => permiso.usuarioId === usuarioId);
  };

  const agregarPermiso = (permiso) => {
    const nuevosPermisos = [...permisosVista, permiso];
    setPermisosVista(nuevosPermisos);
    localStorage.setItem('permisosVista', JSON.stringify(nuevosPermisos));
  };

  const revocarPermiso = (permisoId) => {
    const permisosActualizados = permisosVista.filter(p => p.id !== permisoId);
    setPermisosVista(permisosActualizados);
    localStorage.setItem('permisosVista', JSON.stringify(permisosActualizados));
  };

  const limpiarPermisosVencidos = () => {
    const ahora = new Date();
    const permisosActivos = permisosVista.filter(permiso => {
      const fechaFin = permiso.fechaFin ? new Date(permiso.fechaFin) : null;
      return !fechaFin || fechaFin >= ahora;
    });
    
    if (permisosActivos.length !== permisosVista.length) {
      setPermisosVista(permisosActivos);
      localStorage.setItem('permisosVista', JSON.stringify(permisosActivos));
    }
  };

  const value = {
    permisosVista,
    tienePermiso,
    puedeVer,
    puedeEditar,
    puedeModificar,
    obtenerPermisosUsuario,
    agregarPermiso,
    revocarPermiso,
    limpiarPermisosVencidos,
    cargarPermisos
  };

  return (
    <PermisosVistaContext.Provider value={value}>
      {children}
    </PermisosVistaContext.Provider>
  );
};
