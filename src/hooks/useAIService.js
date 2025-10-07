import { useState, useCallback, useRef } from 'react';
import { unifiedAIService } from '../services/ia/UnifiedAIService';
import { enhancedAIService } from '../services/ia/EnhancedAIService';

/**
 * Hook personalizado para manejo de servicios de IA
 */
export const useAIService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [lastAnalysis, setLastAnalysis] = useState(null);
  const cacheRef = useRef(new Map());

  /**
   * Analizar texto con un proveedor específico
   */
  const analyzeWithProvider = useCallback(async (providerId, text, options = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const request = {
        text,
        legal_area: options.legal_area || 'Derecho General',
        jurisdiction: options.jurisdiction || 'colombia',
        context: options.context || '',
        priority: options.priority || 'normal'
      };

      // Verificar cache
      const cacheKey = `${providerId}_${text.substring(0, 100)}_${options.legal_area}`;
      if (cacheRef.current.has(cacheKey)) {
        const cachedResult = cacheRef.current.get(cacheKey);
        setResults([cachedResult]);
        setLastAnalysis(cachedResult);
        setIsLoading(false);
        return cachedResult;
      }

      const result = await unifiedAIService.analyzeWithProvider(providerId, request);
      
      // Guardar en cache
      cacheRef.current.set(cacheKey, result);
      setResults([result]);
      setLastAnalysis(result);
      
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Error en el análisis de IA';
      setError(errorMessage);
      console.error('Error en useAIService.analyzeWithProvider:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Analizar texto con múltiples proveedores
   */
  const analyzeWithMultipleProviders = useCallback(async (providerIds, text, options = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const request = {
        text,
        legal_area: options.legal_area || 'Derecho General',
        jurisdiction: options.jurisdiction || 'colombia',
        context: options.context || '',
        priority: options.priority || 'normal'
      };

      const results = await unifiedAIService.analyzeWithMultipleProviders(providerIds, request);
      
      setResults(results);
      
      // Comparar resultados si hay múltiples proveedores exitosos
      if (results.filter(r => r.status === 'success').length > 1) {
        const comparison = unifiedAIService.compareResults(results);
        setLastAnalysis({
          ...results[0],
          comparison
        });
      } else {
        setLastAnalysis(results[0]);
      }
      
      return results;
    } catch (err) {
      const errorMessage = err.message || 'Error en el análisis múltiple de IA';
      setError(errorMessage);
      console.error('Error en useAIService.analyzeWithMultipleProviders:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Análisis rápido con proveedor recomendado
   */
  const quickAnalyze = useCallback(async (text, options = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const request = {
        text,
        legal_area: options.legal_area || 'Derecho General',
        jurisdiction: options.jurisdiction || 'colombia',
        context: options.context || '',
        priority: options.priority || 'normal'
      };

      // Verificar cache
      const cacheKey = `quick_${text.substring(0, 100)}_${options.legal_area}`;
      if (cacheRef.current.has(cacheKey)) {
        const cachedResult = cacheRef.current.get(cacheKey);
        setResults([cachedResult]);
        setLastAnalysis(cachedResult);
        setIsLoading(false);
        return cachedResult;
      }

      const result = await unifiedAIService.quickAnalyze(request);
      
      // Guardar en cache
      cacheRef.current.set(cacheKey, result);
      setResults([result]);
      setLastAnalysis(result);
      
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Error en el análisis rápido de IA';
      setError(errorMessage);
      console.error('Error en useAIService.quickAnalyze:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Obtener proveedores recomendados
   */
  const getRecommendedProviders = useCallback((text, legalArea) => {
    const request = {
      text,
      legal_area: legalArea || 'Derecho General',
      jurisdiction: 'colombia'
    };
    
    return unifiedAIService.recommendProvider(request);
  }, []);

  /**
   * Limpiar resultados y estado
   */
  const clearResults = useCallback(() => {
    setResults([]);
    setLastAnalysis(null);
    setError(null);
  }, []);

  /**
   * Limpiar cache
   */
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  /**
   * Análisis jurídico mejorado
   */
  const analizarJuridicoMejorado = useCallback(async (texto, opciones = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const resultado = await enhancedAIService.analizarJuridicoMejorado(texto, opciones);
      setResults([resultado]);
      setLastAnalysis(resultado);
      return resultado;
    } catch (err) {
      const errorMessage = err.message || 'Error en el análisis jurídico mejorado';
      setError(errorMessage);
      console.error('Error en analizarJuridicoMejorado:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Análisis de caso étnico
   */
  const analizarCasoEtnico = useCallback(async (datosCaso, opciones = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const resultado = await enhancedAIService.analizarCasoEtnico(datosCaso, opciones);
      setResults([resultado]);
      setLastAnalysis(resultado);
      return resultado;
    } catch (err) {
      const errorMessage = err.message || 'Error en el análisis de caso étnico';
      setError(errorMessage);
      console.error('Error en analizarCasoEtnico:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Análisis de veeduría ciudadana
   */
  const analizarVeeduriaCiudadana = useCallback(async (datosVeeduria, opciones = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const resultado = await enhancedAIService.analizarVeeduriaCiudadana(datosVeeduria, opciones);
      setResults([resultado]);
      setLastAnalysis(resultado);
      return resultado;
    } catch (err) {
      const errorMessage = err.message || 'Error en el análisis de veeduría ciudadana';
      setError(errorMessage);
      console.error('Error en analizarVeeduriaCiudadana:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Obtener estadísticas del servicio
   */
  const getAnalytics = useCallback(() => {
    return enhancedAIService.obtenerEstadisticas();
  }, []);

  /**
   * Obtener proveedores disponibles
   */
  const getAvailableProviders = useCallback(() => {
    return unifiedAIService.getAvailableProviders();
  }, []);

  return {
    // Estados
    isLoading,
    results,
    error,
    lastAnalysis,
    
    // Métodos básicos
    analyzeWithProvider,
    analyzeWithMultipleProviders,
    quickAnalyze,
    getRecommendedProviders,
    clearResults,
    clearCache,
    getAnalytics,
    getAvailableProviders,
    
    // Métodos mejorados
    analizarJuridicoMejorado,
    analizarCasoEtnico,
    analizarVeeduriaCiudadana,
    
    // Utilidades
    hasResults: results.length > 0,
    hasError: !!error,
    isSuccess: results.some(r => r.status === 'success'),
    successCount: results.filter(r => r.status === 'success').length
  };
};

export default useAIService;
