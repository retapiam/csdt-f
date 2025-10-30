/**
 * Proveedor de Sincronización de Datos
 * Garantiza que todos los datos estén sincronizados con la base de datos real
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSyncCompleto } from '@hooks/useSyncData';
import { toast } from 'react-hot-toast';
import healthService from '../services/healthService';

const SyncDataContext = createContext();

export const useSyncDataContext = () => {
  const context = useContext(SyncDataContext);
  if (!context) {
    throw new Error('useSyncDataContext debe ser usado dentro de SyncDataProvider');
  }
  return context;
};

export const SyncDataProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [syncStatus, setSyncStatus] = useState({
    isOnline: navigator.onLine,
    lastSync: null,
    syncInProgress: false,
    error: null
  });

  const { loading, error, lastSync, syncCompleto } = useSyncCompleto({
    showSuccessMessage: false,
    showErrorMessage: false
  });

  // Sincronización inicial
  useEffect(() => {
    const initializeSync = async () => {
      try {
        setSyncStatus(prev => ({ ...prev, syncInProgress: true, error: null }));
        
        // Ir directamente a sincronización sin verificar health
        
        await syncCompleto();
        setSyncStatus(prev => ({ 
          ...prev, 
          syncInProgress: false, 
          lastSync: new Date(),
          error: null 
        }));
        setIsInitialized(true);
      } catch (err) {
        setSyncStatus(prev => ({ 
          ...prev, 
          syncInProgress: false, 
          error: err.message 
        }));
        // Continuar con la aplicación aunque falle la sincronización
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      initializeSync();
    }
  }, [isInitialized, syncCompleto]);

  // Detectar cambios en la conexión
  useEffect(() => {
    const handleOnline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: true }));
      // Sincronizar cuando se recupere la conexión
      if (isInitialized) {
        syncCompleto().catch(console.error);
      }
    };

    const handleOffline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isInitialized, syncCompleto]);

  // Sincronización periódica cada 30 minutos
  useEffect(() => {
    if (!isInitialized || !syncStatus.isOnline) return;

    const interval = setInterval(() => {
      syncCompleto().catch(console.error);
    }, 30 * 60 * 1000); // 30 minutos

    return () => clearInterval(interval);
  }, [isInitialized, syncStatus.isOnline, syncCompleto]);

  // Función para sincronización manual
  const manualSync = async () => {
    try {
      setSyncStatus(prev => ({ ...prev, syncInProgress: true, error: null }));
      await syncCompleto();
      setSyncStatus(prev => ({ 
        ...prev, 
        syncInProgress: false, 
        lastSync: new Date(),
        error: null 
      }));
      console.log('Sincronización manual completada');
    } catch (err) {
      setSyncStatus(prev => ({ 
        ...prev, 
        syncInProgress: false, 
        error: err.message 
      }));
      console.warn('Error en sincronización manual:', err.message);
      throw err;
    }
  };

  // Función para verificar estado de sincronización
  const checkSyncStatus = () => {
    return {
      ...syncStatus,
      isInitialized,
      loading
    };
  };

  const value = {
    isInitialized,
    syncStatus,
    manualSync,
    checkSyncStatus,
    loading,
    error,
    lastSync
  };

  return (
    <SyncDataContext.Provider value={value}>
      {children}
    </SyncDataContext.Provider>
  );
};

export default SyncDataProvider;
