/**
 * Hook personalizado para sincronización de datos con la base de datos real
 * Reemplaza el uso de datos mock por datos reales de la API
 */

import { useState, useEffect, useCallback } from 'react';
import syncService from '@services/syncService';
import { toast } from 'react-hot-toast';

export const useSyncData = (dataType, filters = {}, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  const {
    autoSync = false,
    syncInterval = 30 * 60 * 1000, // 30 minutos por defecto
    cacheEnabled = true
  } = options;

  // Función para sincronizar datos
  const syncData = useCallback(async () => {
    if (!dataType) return;

    setLoading(true);
    setError(null);

    try {
      let result;
      
      switch (dataType) {
        case 'usuarios':
          result = await syncService.syncUsuarios(filters);
          break;
        case 'veedurias':
          result = await syncService.syncVeedurias(filters);
          break;
        case 'tareas':
          result = await syncService.syncTareas(filters);
          break;
        case 'donaciones':
          result = await syncService.syncDonaciones(filters);
          break;
        case 'estadisticas':
          result = await syncService.syncEstadisticas();
          break;
        case 'analisisIA':
          result = await syncService.syncAnalisisIA(filters);
          break;
        case 'comunidadesEtnicas':
          result = await syncService.syncComunidadesEtnicas(filters);
          break;
        case 'archivos':
          result = await syncService.syncArchivos(filters);
          break;
        default:
          throw new Error(`Tipo de datos no soportado: ${dataType}`);
      }

      setData(result.data || result);
      setLastSync(new Date());
      
      if (options.showSuccessMessage) {
        toast.success(`${dataType} sincronizados correctamente`);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err.message || `Error sincronizando ${dataType}`;
      setError(errorMessage);
      
      if (options.showErrorMessage !== false) {
        toast.error(errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dataType, filters, options]);

  // Sincronización automática (desactivada por defecto)
  useEffect(() => {
    if (autoSync && dataType) {
      syncData();
    }
  }, [dataType, autoSync, syncData]);

  // Sincronización periódica (cada 30 minutos por defecto)
  useEffect(() => {
    if (!autoSync || !syncInterval) return;

    const interval = setInterval(() => {
      syncData();
    }, syncInterval);

    return () => clearInterval(interval);
  }, [autoSync, syncInterval, syncData]);

  // Función para refrescar datos manualmente
  const refresh = useCallback(() => {
    return syncData();
  }, [syncData]);

  // Función para limpiar cache
  const clearCache = useCallback(() => {
    syncService.invalidateCache(dataType);
  }, [dataType]);

  // Función para obtener estado de sincronización
  const getSyncStatus = useCallback(() => {
    return {
      loading,
      error,
      lastSync,
      cacheSize: syncService.cache.size,
      dataCount: Array.isArray(data) ? data.length : 0
    };
  }, [loading, error, lastSync, data]);

  return {
    data,
    loading,
    error,
    lastSync,
    refresh,
    clearCache,
    getSyncStatus,
    syncData
  };
};

// Hook específico para estadísticas
export const useSyncEstadisticas = (options = {}) => {
  return useSyncData('estadisticas', {}, options);
};

// Hook específico para usuarios
export const useSyncUsuarios = (filters = {}, options = {}) => {
  return useSyncData('usuarios', filters, options);
};

// Hook específico para veedurías
export const useSyncVeedurias = (filters = {}, options = {}) => {
  return useSyncData('veedurias', filters, options);
};

// Hook específico para tareas
export const useSyncTareas = (filters = {}, options = {}) => {
  return useSyncData('tareas', filters, options);
};

// Hook específico para donaciones
export const useSyncDonaciones = (filters = {}, options = {}) => {
  return useSyncData('donaciones', filters, options);
};

// Hook específico para análisis IA
export const useSyncAnalisisIA = (filters = {}, options = {}) => {
  return useSyncData('analisisIA', filters, options);
};

// Hook específico para comunidades étnicas
export const useSyncComunidadesEtnicas = (filters = {}, options = {}) => {
  return useSyncData('comunidadesEtnicas', filters, options);
};

// Hook específico para archivos
export const useSyncArchivos = (filters = {}, options = {}) => {
  return useSyncData('archivos', filters, options);
};

// Hook para sincronización completa del sistema
export const useSyncCompleto = (options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  const syncCompleto = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await syncService.syncCompleto();
      setLastSync(new Date());
      
      if (options.showSuccessMessage !== false) {
        console.log('Sincronización completa exitosa');
      }
      
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Error en sincronización completa';
      setError(errorMessage);
      
      if (options.showErrorMessage !== false) {
        console.warn('Error en sincronización completa:', errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [options]);

  return {
    loading,
    error,
    lastSync,
    syncCompleto
  };
};

export default useSyncData;
