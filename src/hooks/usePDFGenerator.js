import { useState, useCallback, useRef } from 'react';
import pdfAvanzadoService from '@services/pdf/PDFAvanzadoService';

/**
 * Hook personalizado para generación de PDFs
 */
export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedPDF, setLastGeneratedPDF] = useState(null);
  const [error, setError] = useState(null);
  const [generationHistory, setGenerationHistory] = useState([]);
  const cacheRef = useRef(new Map());

  /**
   * Generar PDF con configuración personalizada
   */
  const generatePDF = useCallback(async (datos, configuracion = {}) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Verificar cache si está habilitado
      const useCache = configuracion.useCache !== false;
      if (useCache) {
        const cacheKey = this.generateCacheKey(datos, configuracion);
        if (cacheRef.current.has(cacheKey)) {
          const cachedPDF = cacheRef.current.get(cacheKey);
          setLastGeneratedPDF(cachedPDF);
          setGenerationHistory(prev => [cachedPDF, ...prev.slice(0, 9)]);
          setIsGenerating(false);
          return cachedPDF;
        }
      }

      const resultado = await pdfAvanzadoService.generarPDFAvanzado(datos, configuracion);
      
      // Guardar en cache si está habilitado
      if (useCache) {
        const cacheKey = this.generateCacheKey(datos, configuracion);
        cacheRef.current.set(cacheKey, resultado);
      }
      
      setLastGeneratedPDF(resultado);
      setGenerationHistory(prev => [resultado, ...prev.slice(0, 9)]);
      
      return resultado;
    } catch (err) {
      const errorMessage = err.message || 'Error generando PDF';
      setError(errorMessage);
      console.error('Error en usePDFGenerator.generatePDF:', err);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  /**
   * Generar PDF de análisis jurídico
   */
  const generateAnalisisJuridico = useCallback(async (datos) => {
    const configuracion = {
      plantilla: 'analisis_juridico',
      estilo: 'oficial',
      incluir_logo: true,
      incluir_pie_pagina: true
    };

    return await generatePDF(datos, configuracion);
  }, [generatePDF]);

  /**
   * Generar PDF del Consejo IA
   */
  const generateConsejoIA = useCallback(async (datos) => {
    const configuracion = {
      plantilla: 'consejo_ia',
      estilo: 'moderno',
      incluir_logo: true,
      incluir_pie_pagina: true
    };

    return await generatePDF(datos, configuracion);
  }, [generatePDF]);

  /**
   * Generar PDF de acción de tutela
   */
  const generateAccionTutela = useCallback(async (datos) => {
    const configuracion = {
      plantilla: 'accion_tutela',
      estilo: 'oficial',
      incluir_logo: true,
      incluir_pie_pagina: true
    };

    return await generatePDF(datos, configuracion);
  }, [generatePDF]);

  /**
   * Generar PDF de informe de veeduría
   */
  const generateInformeVeeduria = useCallback(async (datos) => {
    const configuracion = {
      plantilla: 'informe_veeduria',
      estilo: 'oficial',
      incluir_logo: true,
      incluir_pie_pagina: true
    };

    return await generatePDF(datos, configuracion);
  }, [generatePDF]);

  /**
   * Generar PDF con resultados de IA
   */
  const generatePDFConIA = useCallback(async (datos, resultadosIA) => {
    const datosConIA = {
      ...datos,
      analisis_ia: resultadosIA,
      resultados_ia: resultadosIA
    };

    const configuracion = {
      plantilla: datos.plantilla || 'consejo_ia',
      estilo: datos.estilo || 'moderno',
      incluir_logo: true,
      incluir_pie_pagina: true
    };

    return await generatePDF(datosConIA, configuracion);
  }, [generatePDF]);

  /**
   * Descargar PDF generado
   */
  const downloadPDF = useCallback((pdfResult, nombreArchivo = null) => {
    try {
      if (!pdfResult || !pdfResult.archivo || !pdfResult.archivo.documento) {
        throw new Error('No hay PDF disponible para descargar');
      }

      const filename = nombreArchivo || pdfResult.archivo.nombre || 'documento.pdf';
      pdfResult.archivo.documento.save(filename);
      
      return { success: true, filename };
    } catch (err) {
      const errorMessage = err.message || 'Error descargando PDF';
      setError(errorMessage);
      console.error('Error en usePDFGenerator.downloadPDF:', err);
      throw err;
    }
  }, []);

  /**
   * Obtener vista previa del PDF
   */
  const getPDFPreview = useCallback((pdfResult) => {
    try {
      if (!pdfResult || !pdfResult.archivo || !pdfResult.archivo.documento) {
        throw new Error('No hay PDF disponible para vista previa');
      }

      const pdfDataUrl = pdfResult.archivo.documento.output('dataurlstring');
      return pdfDataUrl;
    } catch (err) {
      const errorMessage = err.message || 'Error obteniendo vista previa del PDF';
      setError(errorMessage);
      console.error('Error en usePDFGenerator.getPDFPreview:', err);
      throw err;
    }
  }, []);

  /**
   * Obtener plantillas disponibles
   */
  const getPlantillas = useCallback(() => {
    return pdfAvanzadoService.obtenerEstadisticas().plantillas_disponibles;
  }, []);

  /**
   * Obtener estilos disponibles
   */
  const getEstilos = useCallback(() => {
    return pdfAvanzadoService.obtenerEstadisticas().estilos_disponibles;
  }, []);

  /**
   * Obtener historial de generación
   */
  const getHistorial = useCallback((filtros = {}) => {
    return pdfAvanzadoService.obtenerHistorial(filtros);
  }, []);

  /**
   * Limpiar historial
   */
  const clearHistory = useCallback(() => {
    pdfAvanzadoService.limpiarHistorial();
    setGenerationHistory([]);
  }, []);

  /**
   * Limpiar cache
   */
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  /**
   * Limpiar estado
   */
  const clearState = useCallback(() => {
    setLastGeneratedPDF(null);
    setError(null);
    setGenerationHistory([]);
  }, []);

  /**
   * Generar clave de cache
   */
  const generateCacheKey = useCallback((datos, configuracion) => {
    const key = `${configuracion.plantilla}_${configuracion.estilo}_${JSON.stringify(datos).substring(0, 100)}`;
    return btoa(key).replace(/[^a-zA-Z0-9]/g, '');
  }, []);

  /**
   * Validar datos para PDF
   */
  const validatePDFData = useCallback((datos, plantilla) => {
    const plantillas = pdfAvanzadoService.plantillas;
    const plantillaInfo = plantillas[plantilla];
    
    if (!plantillaInfo) {
      return { valid: false, error: `Plantilla '${plantilla}' no encontrada` };
    }

    const camposRequeridos = plantillaInfo.campos_requeridos;
    const camposFaltantes = camposRequeridos.filter(campo => !datos[campo]);
    
    if (camposFaltantes.length > 0) {
      return { 
        valid: false, 
        error: `Campos requeridos faltantes: ${camposFaltantes.join(', ')}` 
      };
    }

    return { valid: true };
  }, []);

  /**
   * Obtener estadísticas de generación
   */
  const getStats = useCallback(() => {
    const stats = pdfAvanzadoService.obtenerEstadisticas();
    return {
      ...stats,
      localHistoryCount: generationHistory.length,
      hasLastPDF: !!lastGeneratedPDF,
      hasError: !!error,
      isGenerating
    };
  }, [generationHistory.length, lastGeneratedPDF, error, isGenerating]);

  return {
    // Estados
    isGenerating,
    lastGeneratedPDF,
    error,
    generationHistory,
    
    // Métodos de generación
    generatePDF,
    generateAnalisisJuridico,
    generateConsejoIA,
    generateAccionTutela,
    generateInformeVeeduria,
    generatePDFConIA,
    
    // Métodos de manejo
    downloadPDF,
    getPDFPreview,
    
    // Utilidades
    getPlantillas,
    getEstilos,
    getHistorial,
    clearHistory,
    clearCache,
    clearState,
    validatePDFData,
    getStats,
    
    // Estados computados
    hasLastPDF: !!lastGeneratedPDF,
    hasError: !!error,
    hasHistory: generationHistory.length > 0,
    canDownload: !!lastGeneratedPDF && !isGenerating
  };
};

export default usePDFGenerator;
