import { useState } from 'react';
import { advancedAIService } from '../services/ia/AdvancedAIService';

/**
 * Hook para usar la IA en cualquier componente
 * Proporciona funcionalidades completas de análisis con IA
 */
export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultado, setResultado] = useState(null);

  /**
   * Analizar caso étnico
   */
  const analizarCasoEtnico = async (datosCaso, opciones = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await advancedAIService.analizarCasoEtnico(datosCaso, opciones);
      setResultado(result);
      return result;
    } catch (err) {
      setError(err.message || 'Error al analizar caso étnico');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Analizar caso jurídico (tutela, cumplimiento, etc.)
   */
  const analizarCasoJuridico = async (datosCaso, tipoAccion = 'tutela') => {
    setLoading(true);
    setError(null);
    try {
      const result = await advancedAIService.analizarCasoJuridico(datosCaso, tipoAccion);
      setResultado(result);
      return result;
    } catch (err) {
      setError(err.message || 'Error al analizar caso jurídico');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generar respuesta inteligente
   */
  const generarRespuesta = async (texto, contexto = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await advancedAIService.generarRespuestaInteligente(texto, contexto);
      setResultado(result);
      return result;
    } catch (err) {
      setError(err.message || 'Error al generar respuesta');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Análisis general
   */
  const analizarCaso = async (texto, opciones = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await advancedAIService.analizarCaso(texto, opciones);
      setResultado(result);
      return result;
    } catch (err) {
      setError(err.message || 'Error al analizar caso');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generar PDF con análisis
   */
  const generarPDF = async (datos, analisis) => {
    setLoading(true);
    setError(null);
    try {
      const pdf = await advancedAIService.generarPDFConAnalisis(datos, analisis);
      return pdf;
    } catch (err) {
      setError(err.message || 'Error al generar PDF');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpiar resultados
   */
  const limpiar = () => {
    setResultado(null);
    setError(null);
    setLoading(false);
  };

  /**
   * Obtener estadísticas del servicio
   */
  const obtenerEstadisticas = () => {
    return advancedAIService.obtenerEstadisticas();
  };

  return {
    // Estados
    loading,
    error,
    resultado,

    // Métodos
    analizarCasoEtnico,
    analizarCasoJuridico,
    generarRespuesta,
    analizarCaso,
    generarPDF,
    limpiar,
    obtenerEstadisticas
  };
};

export default useAI;

