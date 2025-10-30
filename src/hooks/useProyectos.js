/**
 * Hook personalizado para gestión de proyectos
 * Sincronizado con la base de datos real y respeta roles de usuario
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@contexts/AuthContext';
import proyectosService from '@services/ProyectoService';
import { toast } from 'react-hot-toast';

export const useProyectos = (filters = {}, options = {}) => {
  const { user } = useAuth();
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  const {
    autoSync = false,
    syncInterval = 30 * 60 * 1000, // 30 minutos
    showSuccessMessage = false,
    showErrorMessage = true
  } = options;

  // Función para cargar proyectos
  const cargarProyectos = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await proyectosService.obtenerProyectos(filters, user);
      setProyectos(data.data || data);
      setLastSync(new Date());
      
      if (showSuccessMessage) {
        toast.success('Proyectos cargados correctamente');
      }
      
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Error cargando proyectos';
      setError(errorMessage);
      
      if (showErrorMessage) {
        toast.error(errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, filters, showSuccessMessage, showErrorMessage]);

  // Sincronización automática
  useEffect(() => {
    if (autoSync && user) {
      cargarProyectos();
    }
  }, [user, autoSync, cargarProyectos]);

  // Sincronización periódica
  useEffect(() => {
    if (!autoSync || !syncInterval || !user) return;

    const interval = setInterval(() => {
      cargarProyectos();
    }, syncInterval);

    return () => clearInterval(interval);
  }, [autoSync, syncInterval, user, cargarProyectos]);

  // Función para refrescar datos manualmente
  const refresh = useCallback(() => {
    return cargarProyectos();
  }, [cargarProyectos]);

  // Función para crear proyecto
  const crearProyecto = useCallback(async (datos) => {
    if (!user) throw new Error('Usuario no autenticado');

    try {
      const proyecto = await proyectosService.crearProyecto(datos, user);
      await cargarProyectos(); // Recargar lista
      return proyecto;
    } catch (err) {
      throw err;
    }
  }, [user, cargarProyectos]);

  // Función para actualizar proyecto
  const actualizarProyecto = useCallback(async (id, datos) => {
    if (!user) throw new Error('Usuario no autenticado');

    try {
      const proyecto = await proyectosService.actualizarProyecto(id, datos, user);
      await cargarProyectos(); // Recargar lista
      return proyecto;
    } catch (err) {
      throw err;
    }
  }, [user, cargarProyectos]);

  // Función para eliminar proyecto
  const eliminarProyecto = useCallback(async (id) => {
    if (!user) throw new Error('Usuario no autenticado');

    try {
      await proyectosService.eliminarProyecto(id, user);
      await cargarProyectos(); // Recargar lista
    } catch (err) {
      throw err;
    }
  }, [user, cargarProyectos]);

  // Función para obtener proyecto específico
  const obtenerProyecto = useCallback(async (id) => {
    if (!user) throw new Error('Usuario no autenticado');

    try {
      return await proyectosService.obtenerProyecto(id, user);
    } catch (err) {
      throw err;
    }
  }, [user]);

  // Función para limpiar cache
  const clearCache = useCallback(() => {
    proyectosService.clearCache();
  }, []);

  // Función para obtener estadísticas
  const obtenerEstadisticas = useCallback(async () => {
    if (!user) throw new Error('Usuario no autenticado');

    try {
      return await proyectosService.obtenerEstadisticas(user);
    } catch (err) {
      throw err;
    }
  }, [user]);

  // Función para verificar permisos
  const tienePermisos = useCallback((accion) => {
    if (!user) return false;

    switch (accion) {
      case 'crear':
        return proyectosService.puedeCrearProyecto(user);
      case 'editar':
        return ['adm_gen', 'adm', 'ope'].includes(user.rol);
      case 'eliminar':
        return proyectosService.puedeEliminarProyecto(user);
      case 'ver_todos':
        return ['adm_gen', 'adm'].includes(user.rol);
      default:
        return false;
    }
  }, [user]);

  return {
    proyectos,
    loading,
    error,
    lastSync,
    cargarProyectos,
    refresh,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto,
    obtenerProyecto,
    clearCache,
    obtenerEstadisticas,
    tienePermisos
  };
};

// Hook específico para tareas
export const useTareas = (filters = {}, options = {}) => {
  const { user } = useAuth();
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  const {
    autoSync = false,
    syncInterval = 30 * 60 * 1000,
    showSuccessMessage = false,
    showErrorMessage = true
  } = options;

  // Función para cargar tareas
  const cargarTareas = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await proyectosService.obtenerTareas(filters, user);
      setTareas(data.data || data);
      setLastSync(new Date());
      
      if (showSuccessMessage) {
        toast.success('Tareas cargadas correctamente');
      }
      
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Error cargando tareas';
      setError(errorMessage);
      
      if (showErrorMessage) {
        toast.error(errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, filters, showSuccessMessage, showErrorMessage]);

  // Sincronización automática
  useEffect(() => {
    if (autoSync && user) {
      cargarTareas();
    }
  }, [user, autoSync, cargarTareas]);

  // Sincronización periódica
  useEffect(() => {
    if (!autoSync || !syncInterval || !user) return;

    const interval = setInterval(() => {
      cargarTareas();
    }, syncInterval);

    return () => clearInterval(interval);
  }, [autoSync, syncInterval, user, cargarTareas]);

  // Función para crear tarea
  const crearTarea = useCallback(async (datos) => {
    if (!user) throw new Error('Usuario no autenticado');

    try {
      const tarea = await proyectosService.crearTarea(datos, user);
      await cargarTareas(); // Recargar lista
      return tarea;
    } catch (err) {
      throw err;
    }
  }, [user, cargarTareas]);

  // Función para actualizar tarea
  const actualizarTarea = useCallback(async (id, datos) => {
    if (!user) throw new Error('Usuario no autenticado');

    try {
      const tarea = await proyectosService.actualizarTarea(id, datos, user);
      await cargarTareas(); // Recargar lista
      return tarea;
    } catch (err) {
      throw err;
    }
  }, [user, cargarTareas]);

  return {
    tareas,
    loading,
    error,
    lastSync,
    cargarTareas,
    refresh: cargarTareas,
    crearTarea,
    actualizarTarea,
    clearCache: () => proyectosService.clearCache()
  };
};

// Hook específico para estadísticas
export const useEstadisticasProyectos = (options = {}) => {
  const { user } = useAuth();
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    autoSync = false,
    syncInterval = 30 * 60 * 1000, // 30 minutos
    showSuccessMessage = false,
    showErrorMessage = true
  } = options;

  // Función para cargar estadísticas
  const cargarEstadisticas = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const data = await proyectosService.obtenerEstadisticas(user);
      setEstadisticas(data);
      
      if (showSuccessMessage) {
        toast.success('Estadísticas cargadas correctamente');
      }
      
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Error cargando estadísticas';
      setError(errorMessage);
      
      if (showErrorMessage) {
        toast.error(errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, showSuccessMessage, showErrorMessage]);

  // Sincronización automática
  useEffect(() => {
    if (autoSync && user) {
      cargarEstadisticas();
    }
  }, [user, autoSync, cargarEstadisticas]);

  // Sincronización periódica
  useEffect(() => {
    if (!autoSync || !syncInterval || !user) return;

    const interval = setInterval(() => {
      cargarEstadisticas();
    }, syncInterval);

    return () => clearInterval(interval);
  }, [autoSync, syncInterval, user, cargarEstadisticas]);

  return {
    estadisticas,
    loading,
    error,
    cargarEstadisticas,
    refresh: cargarEstadisticas
  };
};

export default useProyectos;
