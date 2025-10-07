/**
 * HOOK PERSONALIZADO PARA IA AVANZADA - CSDT
 * Hook optimizado para el uso de servicios de IA con cache, retry y métricas
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { advancedAIService } from '../services/ia/AdvancedAIService';

export const useAdvancedAI = (configuracion = {}) => {
  const [estado, setEstado] = useState({
    cargando: false,
    error: null,
    resultado: null,
    metadatos: null
  });

  const [metricas, setMetricas] = useState({
    totalAnalisis: 0,
    analisisExitosos: 0,
    tiempoPromedio: 0,
    ultimoAnalisis: null
  });

  const cacheRef = useRef(new Map());
  const retryCountRef = useRef(0);
  const maxRetries = configuracion.maxRetries || 3;
  const cacheTimeout = configuracion.cacheTimeout || 300000; // 5 minutos

  // Limpiar cache expirado
  useEffect(() => {
    const interval = setInterval(() => {
      const ahora = Date.now();
      for (const [key, value] of cacheRef.current.entries()) {
        if (ahora - value.timestamp > cacheTimeout) {
          cacheRef.current.delete(key);
        }
      }
    }, 60000); // Verificar cada minuto

    return () => clearInterval(interval);
  }, [cacheTimeout]);

  // Generar clave de cache
  const generarClaveCache = useCallback((datos, opciones) => {
    const datosString = JSON.stringify(datos);
    const opcionesString = JSON.stringify(opciones);
    return `${datosString}_${opcionesString}`;
  }, []);

  // Verificar cache
  const obtenerDelCache = useCallback((clave) => {
    const item = cacheRef.current.get(clave);
    if (item && Date.now() - item.timestamp < cacheTimeout) {
      return item.data;
    }
    return null;
  }, [cacheTimeout]);

  // Guardar en cache
  const guardarEnCache = useCallback((clave, datos) => {
    cacheRef.current.set(clave, {
      data: datos,
      timestamp: Date.now()
    });
  }, []);

  // Actualizar métricas
  const actualizarMetricas = useCallback((exito, tiempoProcesamiento) => {
    setMetricas(prev => {
      const totalAnalisis = prev.totalAnalisis + 1;
      const analisisExitosos = exito ? prev.analisisExitosos + 1 : prev.analisisExitosos;
      const tiempoPromedio = exito ? 
        (prev.tiempoPromedio + tiempoProcesamiento) / 2 : 
        prev.tiempoPromedio;

      return {
        totalAnalisis,
        analisisExitosos,
        tiempoPromedio,
        ultimoAnalisis: new Date().toISOString()
      };
    });
  }, []);

  // Función principal de análisis
  const analizar = useCallback(async (datos, opciones = {}) => {
    const inicioTiempo = Date.now();
    const claveCache = generarClaveCache(datos, opciones);

    // Verificar cache primero
    if (configuracion.usarCache !== false) {
      const resultadoCache = obtenerDelCache(claveCache);
      if (resultadoCache) {
        setEstado({
          cargando: false,
          error: null,
          resultado: resultadoCache,
          metadatos: { ...resultadoCache.metadatos, desdeCache: true }
        });
        return resultadoCache;
      }
    }

    setEstado(prev => ({ ...prev, cargando: true, error: null }));

    try {
      let resultado;

      // Determinar tipo de análisis según datos
      if (opciones.tipoAnalisis === 'etnico' || datos.grupoEtnico) {
        resultado = await advancedAIService.analizarCasoEtnico(datos, opciones);
      } else if (opciones.tipoAnalisis === 'veeduria' || datos.entidad) {
        resultado = await advancedAIService.analizarVeeduriaCiudadana(datos, opciones);
      } else if (opciones.tipoAnalisis === 'constitucional' || datos.tipoCaso === 'constitucional') {
        resultado = await advancedAIService.analizarAccionConstitucional(datos, opciones);
      } else {
        resultado = await advancedAIService.analizarJuridicoAvanzado(datos, opciones);
      }

      const tiempoProcesamiento = Date.now() - inicioTiempo;
      
      // Guardar en cache
      if (configuracion.usarCache !== false) {
        guardarEnCache(claveCache, resultado);
      }

      // Actualizar métricas
      actualizarMetricas(true, tiempoProcesamiento);

      setEstado({
        cargando: false,
        error: null,
        resultado,
        metadatos: {
          ...resultado.metadatos,
          tiempoProcesamiento,
          desdeCache: false
        }
      });

      return resultado;

    } catch (error) {
      const tiempoProcesamiento = Date.now() - inicioTiempo;
      
      // Actualizar métricas de error
      actualizarMetricas(false, tiempoProcesamiento);

      // Retry automático
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        console.warn(`Reintentando análisis (${retryCountRef.current}/${maxRetries}):`, error.message);
        
        // Esperar antes del retry
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCountRef.current));
        
        return analizar(datos, opciones);
      }

      setEstado({
        cargando: false,
        error: error.message,
        resultado: null,
        metadatos: { tiempoProcesamiento, error: true }
      });

      throw error;
    }
  }, [configuracion, generarClaveCache, obtenerDelCache, guardarEnCache, actualizarMetricas, maxRetries]);

  // Análisis de PDF
  const analizarPDF = useCallback(async (archivoPDF, opciones = {}) => {
    const inicioTiempo = Date.now();
    const claveCache = `pdf_${archivoPDF.name}_${archivoPDF.size}`;

    // Verificar cache
    if (configuracion.usarCache !== false) {
      const resultadoCache = obtenerDelCache(claveCache);
      if (resultadoCache) {
        setEstado({
          cargando: false,
          error: null,
          resultado: resultadoCache,
          metadatos: { ...resultadoCache.metadatos, desdeCache: true }
        });
        return resultadoCache;
      }
    }

    setEstado(prev => ({ ...prev, cargando: true, error: null }));

    try {
      const resultado = await advancedAIService.analizarPDFConIA(archivoPDF, opciones);
      const tiempoProcesamiento = Date.now() - inicioTiempo;

      // Guardar en cache
      if (configuracion.usarCache !== false) {
        guardarEnCache(claveCache, resultado);
      }

      actualizarMetricas(true, tiempoProcesamiento);

      setEstado({
        cargando: false,
        error: null,
        resultado,
        metadatos: {
          ...resultado.metadatos,
          tiempoProcesamiento,
          desdeCache: false
        }
      });

      return resultado;

    } catch (error) {
      const tiempoProcesamiento = Date.now() - inicioTiempo;
      actualizarMetricas(false, tiempoProcesamiento);

      setEstado({
        cargando: false,
        error: error.message,
        resultado: null,
        metadatos: { tiempoProcesamiento, error: true }
      });

      throw error;
    }
  }, [configuracion, obtenerDelCache, guardarEnCache, actualizarMetricas]);

  // Generar respuesta inteligente
  const generarRespuesta = useCallback(async (consulta, contexto = {}) => {
    const inicioTiempo = Date.now();
    const claveCache = `respuesta_${JSON.stringify(consulta)}_${JSON.stringify(contexto)}`;

    // Verificar cache
    if (configuracion.usarCache !== false) {
      const resultadoCache = obtenerDelCache(claveCache);
      if (resultadoCache) {
        return resultadoCache;
      }
    }

    try {
      const resultado = await advancedAIService.generarRespuestaInteligente(consulta, contexto);
      const tiempoProcesamiento = Date.now() - inicioTiempo;

      // Guardar en cache
      if (configuracion.usarCache !== false) {
        guardarEnCache(claveCache, resultado);
      }

      actualizarMetricas(true, tiempoProcesamiento);
      return resultado;

    } catch (error) {
      const tiempoProcesamiento = Date.now() - inicioTiempo;
      actualizarMetricas(false, tiempoProcesamiento);
      throw error;
    }
  }, [configuracion, obtenerDelCache, guardarEnCache, actualizarMetricas]);

  // Análisis por página específica
  const analizarPorPagina = useCallback(async (datos, tipoPagina, opciones = {}) => {
    return analizar(datos, { ...opciones, tipoPagina });
  }, [analizar]);

  // Limpiar cache
  const limpiarCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  // Resetear estado
  const resetear = useCallback(() => {
    setEstado({
      cargando: false,
      error: null,
      resultado: null,
      metadatos: null
    });
    retryCountRef.current = 0;
  }, []);

  // Obtener estadísticas
  const obtenerEstadisticas = useCallback(() => {
    return {
      ...metricas,
      tasaExito: metricas.totalAnalisis > 0 ? 
        (metricas.analisisExitosos / metricas.totalAnalisis) * 100 : 0,
      cacheSize: cacheRef.current.size
    };
  }, [metricas]);

  return {
    // Estado
    ...estado,
    
    // Métricas
    metricas,
    
    // Funciones principales
    analizar,
    analizarPDF,
    generarRespuesta,
    analizarPorPagina,
    
    // Utilidades
    limpiarCache,
    resetear,
    obtenerEstadisticas,
    
    // Estado de carga
    estaCargando: estado.cargando,
    tieneError: !!estado.error,
    tieneResultado: !!estado.resultado
  };
};

export default useAdvancedAI;
