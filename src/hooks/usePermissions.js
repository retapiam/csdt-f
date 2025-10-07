// HOOK DE PERMISOS - CSDT
// Hook personalizado para manejar permisos y autorización en componentes

import { useState, useEffect } from 'react';
import PermisosService from '@services/permisosService';

const usePermissions = () => {
  const [usuario, setUsuario] = useState(null);
  const [permisos, setPermisos] = useState([]);
  const [vistasPermitidas, setVistasPermitidas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarPermisosUsuario();
  }, []);

  const cargarPermisosUsuario = () => {
    try {
      const usuarioData = JSON.parse(localStorage.getItem('usuario') || 'null');
      
      if (usuarioData) {
        setUsuario(usuarioData);
        
        // Obtener permisos del usuario
        const permisosUsuario = PermisosService.obtenerPermisos(usuarioData.rol);
        setPermisos(permisosUsuario);
        
        // Obtener vistas permitidas
        const vistasUsuario = PermisosService.obtenerVistasPermitidas(usuarioData.rol);
        setVistasPermitidas(vistasUsuario);
      }
    } catch (error) {
      console.error('Error cargando permisos del usuario:', error);
    } finally {
      setCargando(false);
    }
  };

  // Verificar si el usuario tiene un permiso específico
  const tienePermiso = (permiso) => {
    if (!usuario) return false;
    return PermisosService.tienePermiso(usuario, permiso);
  };

  // Verificar si el usuario puede acceder a una vista específica
  const puedeAccederVista = (vista) => {
    if (!usuario) return false;
    return PermisosService.puedeAccederVista(usuario, vista);
  };

  // Verificar si el usuario tiene todos los permisos especificados
  const tieneTodosPermisos = (permisosArray) => {
    if (!usuario) return false;
    return PermisosService.tieneTodosPermisos(usuario, permisosArray);
  };

  // Verificar si el usuario tiene al menos uno de los permisos especificados
  const tieneAlgunPermiso = (permisosArray) => {
    if (!usuario) return false;
    return PermisosService.tieneAlgunPermiso(usuario, permisosArray);
  };

  // Verificar si el usuario es administrador general
  const esAdministradorGeneral = () => {
    if (!usuario) return false;
    return PermisosService.esAdministradorGeneral(usuario);
  };

  // Verificar si el usuario es administrador (incluye general)
  const esAdministrador = () => {
    if (!usuario) return false;
    return PermisosService.esAdministrador(usuario);
  };

  // Verificar si el usuario es operador o superior
  const esOperadorOSuperior = () => {
    if (!usuario) return false;
    return PermisosService.esOperadorOSuperior(usuario);
  };

  // Obtener nivel de acceso del usuario
  const obtenerNivelAcceso = () => {
    if (!usuario) return 0;
    return PermisosService.obtenerNivelAcceso(usuario);
  };

  // Verificar si el usuario puede gestionar otro usuario
  const puedeGestionarUsuario = (usuarioObjetivo) => {
    if (!usuario) return false;
    return PermisosService.puedeGestionarUsuario(usuario, usuarioObjetivo);
  };

  // Obtener información del rol del usuario
  const obtenerInfoRol = () => {
    if (!usuario) return null;
    return PermisosService.obtenerInfoRol(usuario.rol);
  };

  // Obtener todas las vistas permitidas para el usuario
  const obtenerVistasPermitidas = () => {
    return vistasPermitidas;
  };

  // Obtener todos los permisos del usuario
  const obtenerPermisos = () => {
    return permisos;
  };

  // Verificar si el usuario está autenticado
  const estaAutenticado = () => {
    return usuario !== null;
  };

  // Obtener ruta de redirección según el rol
  const obtenerRutaRedireccion = () => {
    if (!usuario) return '/unauthorized';
    
    switch (usuario.rol) {
      case 'cliente':
        return '/dashboard-cliente';
      case 'operador':
        return '/dashboard-operador';
      case 'administrador':
        return '/dashboard-admin';
      case 'administrador_general':
        return '/dashboard-admin-general';
      default:
        return '/unauthorized';
    }
  };

  // Generar token de autorización para una vista
  const generarTokenAutorizacion = (vista) => {
    if (!usuario) return null;
    return PermisosService.generarTokenAutorizacion(usuario, vista);
  };

  // Validar token de autorización
  const validarTokenAutorizacion = (token) => {
    return PermisosService.validarTokenAutorizacion(token);
  };

  // Obtener estadísticas de permisos
  const obtenerEstadisticasPermisos = () => {
    return PermisosService.obtenerEstadisticasPermisos();
  };

  // Verificar si una ruta es pública
  const esRutaPublica = (ruta) => {
    const rutasPublicas = [
      '/',
      '/institucional',
      '/contacto',
      '/noticias',
      '/documentos',
      '/ayuda',
      '/terminos',
      '/consejo-ia',
      '/pqrsfd',
      '/donaciones',
      '/unauthorized'
    ];
    return rutasPublicas.includes(ruta);
  };

  // Filtrar elementos por permisos
  const filtrarPorPermisos = (elementos, permisoRequerido) => {
    if (!permisoRequerido) return elementos;
    return elementos.filter(elemento => tienePermiso(elemento[permisoRequerido]));
  };

  // Obtener elementos permitidos para el usuario
  const obtenerElementosPermitidos = (elementos, campoPermiso = 'permiso') => {
    return elementos.filter(elemento => {
      const permiso = elemento[campoPermiso];
      return !permiso || tienePermiso(permiso);
    });
  };

  // Verificar si el usuario puede realizar una acción específica
  const puedeRealizarAccion = (accion, contexto = {}) => {
    if (!usuario) return false;
    
    // Lógica específica para diferentes acciones
    switch (accion) {
      case 'crear_usuario':
        return esAdministrador();
      case 'editar_usuario':
        return esAdministrador() || (contexto.usuarioId && puedeGestionarUsuario({ id: contexto.usuarioId }));
      case 'eliminar_usuario':
        return esAdministradorGeneral();
      case 'ver_auditoria':
        return esAdministrador();
      case 'configurar_sistema':
        return esAdministrador();
      case 'gestionar_roles':
        return esAdministradorGeneral();
      default:
        return false;
    }
  };

  return {
    // Estado
    usuario,
    permisos,
    vistasPermitidas,
    cargando,
    
    // Funciones de verificación
    tienePermiso,
    puedeAccederVista,
    tieneTodosPermisos,
    tieneAlgunPermiso,
    esAdministradorGeneral,
    esAdministrador,
    esOperadorOSuperior,
    estaAutenticado,
    
    // Funciones de información
    obtenerNivelAcceso,
    obtenerInfoRol,
    obtenerVistasPermitidas,
    obtenerPermisos,
    obtenerRutaRedireccion,
    
    // Funciones de gestión
    puedeGestionarUsuario,
    puedeRealizarAccion,
    
    // Funciones de token
    generarTokenAutorizacion,
    validarTokenAutorizacion,
    
    // Funciones de utilidad
    esRutaPublica,
    filtrarPorPermisos,
    obtenerElementosPermitidos,
    obtenerEstadisticasPermisos,
    
    // Función de recarga
    recargarPermisos: cargarPermisosUsuario
  };
};

export default usePermissions;
