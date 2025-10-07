/**
 * HOOK PERSONALIZADO PARA ANÁLISIS DE IA
 * Facilita el uso de servicios de IA en componentes React
 */

import { useState, useCallback } from 'react';
import { advancedAIService } from '../services/ia/AdvancedAIService';
import toast from 'react-hot-toast';

export const useAnalisisIA = () => {
  const [analisis, setAnalisis] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Ejecutar análisis de IA
   */
  const ejecutarAnalisis = useCallback(async (datos, tipoCaso = 'automatico') => {
    setCargando(true);
    setError(null);
    
    try {
      const resultado = await advancedAIService.analyzeCase(datos, { caseType: tipoCaso });
      setAnalisis(resultado);
      
      // Mostrar notificación de éxito
      toast.success('Análisis con IA completado exitosamente');
      
      return resultado;
    } catch (err) {
      const mensajeError = err.message || 'Error en el análisis con IA';
      setError(mensajeError);
      toast.error(mensajeError);
      throw err;
    } finally {
      setCargando(false);
    }
  }, []);

  /**
   * Ejecutar análisis comparativo
   */
  const ejecutarAnalisisComparativo = useCallback(async (datos) => {
    setCargando(true);
    setError(null);
    
    try {
      const resultado = await advancedAIService.compareAnalysis(datos);
      setAnalisis(resultado);
      
      toast.success('Análisis comparativo completado');
      return resultado;
    } catch (err) {
      const mensajeError = err.message || 'Error en el análisis comparativo';
      setError(mensajeError);
      toast.error(mensajeError);
      throw err;
    } finally {
      setCargando(false);
    }
  }, []);

  /**
   * Obtener recomendaciones para una página
   */
  const obtenerRecomendaciones = useCallback(async (paginaActual, datosUsuario = {}) => {
    try {
      const recomendaciones = await advancedAIService.getPageRecommendations(
        paginaActual, 
        datosUsuario
      );
      return recomendaciones;
    } catch (err) {
      console.error('Error obteniendo recomendaciones:', err);
      return null;
    }
  }, []);

  /**
   * Limpiar análisis actual
   */
  const limpiarAnalisis = useCallback(() => {
    setAnalisis(null);
    setError(null);
    toast.success('Análisis limpiado');
  }, []);

  /**
   * Obtener estadísticas del sistema
   */
  const obtenerEstadisticas = useCallback(() => {
    return advancedAIService.getStatistics();
  }, []);

  return {
    // Estado
    analisis,
    cargando,
    error,
    
    // Acciones
    ejecutarAnalisis,
    ejecutarAnalisisComparativo,
    obtenerRecomendaciones,
    limpiarAnalisis,
    obtenerEstadisticas,
    
    // Utilidades
    tieneAnalisis: !!analisis,
    esEtnico: analisis?.tipo_caso === 'etnico',
    esAdministrativo: analisis?.tipo_caso === 'administrativo',
    esJudicial: analisis?.tipo_caso === 'judicial',
    esComparativo: analisis?.tipo_analisis === 'comparativo'
  };
};

export default useAnalisisIA;
