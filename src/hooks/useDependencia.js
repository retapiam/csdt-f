import { useState, useCallback } from 'react';
import DependenciaService from '../services/DependenciaService';
import toast from 'react-hot-toast';

/**
 * Hook personalizado para generar dependencias con actividades y PDFs
 * Simplifica el proceso de crear dependencias desde cualquier componente
 */
export const useDependencia = () => {
  const [generando, setGenerando] = useState(false);
  const [actividadCreada, setActividadCreada] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Generar dependencia completa
   * @param {Object} datos - Datos de la dependencia
   * @returns {Promise<Object>} Resultado
   */
  const generarDependencia = useCallback(async (datos) => {
    setGenerando(true);
    setError(null);

    try {
      const resultado = await DependenciaService.generarDependenciaCompleta(datos);

      setActividadCreada(resultado.data.actividad);

      toast.success(
        `Dependencia creada exitosamente\nCódigo: ${resultado.data.codigo_caso}`,
        {
          duration: 5000,
          icon: '✅',
          style: {
            background: '#10b981',
            color: 'white',
          }
        }
      );

      return resultado;

    } catch (err) {
      const errorMessage = err.message || 'Error al generar la dependencia';
      setError(errorMessage);

      toast.error(
        `Error: ${errorMessage}`,
        {
          duration: 5000,
          icon: '❌',
          style: {
            background: '#ef4444',
            color: 'white',
          }
        }
      );

      throw err;

    } finally {
      setGenerando(false);
    }
  }, []);

  /**
   * Generar dependencia rápida (versión simplificada)
   * @param {string} modulo - Módulo de origen
   * @param {string} titulo - Título
   * @param {Object} datos - Datos adicionales
   * @returns {Promise<Object>} Resultado
   */
  const generarDependenciaRapida = useCallback(async (modulo, titulo, datos = {}) => {
    setGenerando(true);
    setError(null);

    try {
      const resultado = await DependenciaService.generarDependenciaRapida(
        modulo,
        titulo,
        datos
      );

      setActividadCreada(resultado.data.actividad);

      toast.success(
        `Dependencia creada: ${titulo}`,
        {
          duration: 4000,
          icon: '✅',
        }
      );

      return resultado;

    } catch (err) {
      const errorMessage = err.message || 'Error al generar la dependencia';
      setError(errorMessage);

      toast.error(`Error: ${errorMessage}`, { duration: 5000 });

      throw err;

    } finally {
      setGenerando(false);
    }
  }, []);

  /**
   * Agregar PDF a actividad existente
   * @param {number} actividadId - ID de la actividad
   * @param {string} rutaPDF - Ruta del PDF
   * @param {string} tipo - Tipo de PDF
   * @returns {Promise<Object>} Resultado
   */
  const agregarPDF = useCallback(async (actividadId, rutaPDF, tipo = 'adicional') => {
    try {
      const resultado = await DependenciaService.agregarPDFAActividad(
        actividadId,
        rutaPDF,
        tipo
      );

      toast.success('PDF agregado a la actividad', {
        duration: 3000,
        icon: '📄',
      });

      return resultado;

    } catch (err) {
      toast.error('Error al agregar PDF', { duration: 4000 });
      throw err;
    }
  }, []);

  /**
   * Actualizar estado de dependencia
   * @param {number} actividadId - ID de la actividad
   * @param {string} nuevoEstado - Nuevo estado
   * @param {number} progreso - Progreso (0-100)
   * @returns {Promise<Object>} Resultado
   */
  const actualizarEstado = useCallback(async (actividadId, nuevoEstado, progreso = null) => {
    try {
      const resultado = await DependenciaService.actualizarEstado(
        actividadId,
        nuevoEstado,
        progreso
      );

      toast.success('Estado actualizado', {
        duration: 3000,
        icon: '🔄',
      });

      return resultado;

    } catch (err) {
      toast.error('Error al actualizar estado', { duration: 4000 });
      throw err;
    }
  }, []);

  /**
   * Buscar actividades por código de caso
   * @param {string} codigoCaso - Código del caso
   * @returns {Promise<Object>} Actividades encontradas
   */
  const buscarPorCodigo = useCallback(async (codigoCaso) => {
    try {
      const resultado = await DependenciaService.obtenerPorCodigoCaso(codigoCaso);
      return resultado;
    } catch (err) {
      toast.error('Error al buscar actividades', { duration: 4000 });
      throw err;
    }
  }, []);

  /**
   * Reiniciar estado
   */
  const reiniciar = useCallback(() => {
    setGenerando(false);
    setActividadCreada(null);
    setError(null);
  }, []);

  return {
    // Estados
    generando,
    actividadCreada,
    error,

    // Métodos
    generarDependencia,
    generarDependenciaRapida,
    agregarPDF,
    actualizarEstado,
    buscarPorCodigo,
    reiniciar
  };
};

export default useDependencia;

