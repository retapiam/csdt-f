import api from './api';
import ActividadService from './ActividadService';
import ProyectoService from './ProyectoService';

/**
 * Servicio centralizado para gestión de dependencias
 * Genera actividades automáticamente y guarda PDFs asociados
 */
export const DependenciaService = {
  /**
   * Generar dependencia completa con actividad y PDFs
   * @param {Object} datos - Datos de la dependencia
   * @param {string} datos.modulo - Nombre del módulo de origen
   * @param {string} datos.titulo - Título de la actividad
   * @param {string} datos.descripcion - Descripción de la actividad
   * @param {string} datos.tipo - Tipo de análisis (legal, veeduria, etnico, etc.)
   * @param {Object} datos.datosCliente - Información del cliente
   * @param {Object} datos.datosUbicacion - Información de ubicación
   * @param {Object} datos.resultado - Resultado del análisis IA
   * @param {string} datos.codigoCaso - Código único del caso
   * @param {Array} datos.pdfsAdicionales - PDFs adicionales a adjuntar
   * @returns {Promise<Object>} Actividad creada con PDFs
   */
  generarDependenciaCompleta: async (datos) => {
    try {
      const {
        modulo,
        titulo,
        descripcion,
        tipo,
        datosCliente,
        datosUbicacion,
        resultado,
        codigoCaso,
        pdfsAdicionales = []
      } = datos;

      // Paso 1: Buscar o crear proyecto "Dependencias del Sistema"
      let proyecto = await DependenciaService.obtenerProyectoDependencias();
      
      if (!proyecto) {
        // Crear proyecto si no existe
        const nuevoProyecto = await ProyectoService.create({
          nombre: 'Dependencias del Sistema CSDT',
          descripcion: 'Proyecto automático para gestionar todas las dependencias generadas por el sistema',
          estado: 'activo',
          fecha_inicio: new Date().toISOString().split('T')[0],
          cliente_id: datosCliente?.id || null
        });
        proyecto = nuevoProyecto.data || nuevoProyecto;
      }

      // Paso 2: Crear actividad
      const nombreActividad = titulo || `${modulo} - ${codigoCaso}`;
      const descripcionActividad = descripcion || `
        Análisis de tipo: ${tipo}
        Cliente: ${datosCliente?.nombre || 'No especificado'}
        Ubicación: ${datosUbicacion?.municipio || 'No especificado'}, ${datosUbicacion?.departamento || 'No especificado'}
        Código: ${codigoCaso}
      `.trim();

      const actividadData = {
        proyecto_id: proyecto.id,
        nombre: nombreActividad,
        descripcion: descripcionActividad,
        modulo_origen: modulo,
        tipo_analisis: tipo,
        codigo_caso: codigoCaso,
        estado: 'pendiente',
        progreso: 0,
        fecha_inicio: new Date().toISOString().split('T')[0],
        metadatos: JSON.stringify({
          cliente: datosCliente,
          ubicacion: datosUbicacion,
          tipo_analisis: tipo,
          fecha_generacion: new Date().toISOString(),
          resultado_resumido: resultado ? {
            timestamp: resultado.timestamp,
            version: resultado.version,
            tipo: resultado.tipoAnalisis
          } : null
        })
      };

      const actividadResponse = await ActividadService.create(actividadData);
      const actividad = actividadResponse.data || actividadResponse;

      // Paso 3: Generar PDF general
      const pdfGeneralData = {
        tipo: 'analisis_completo',
        modulo,
        titulo: nombreActividad,
        codigo_caso: codigoCaso,
        datos_cliente: datosCliente,
        datos_ubicacion: datosUbicacion,
        resultado_analisis: resultado,
        fecha_generacion: new Date().toISOString(),
        actividad_id: actividad.id
      };

      const pdfGeneralResponse = await api.post('/generar-pdf-analisis', pdfGeneralData);
      const pdfGeneral = pdfGeneralResponse.data;

      // Paso 4: Guardar PDF general en la actividad
      if (pdfGeneral && pdfGeneral.ruta_pdf) {
        await ActividadService.agregarPDF(
          actividad.id,
          pdfGeneral.ruta_pdf,
          'general'
        );
      }

      // Paso 5: Guardar PDFs adicionales si existen
      if (pdfsAdicionales && pdfsAdicionales.length > 0) {
        for (const pdfInfo of pdfsAdicionales) {
          if (pdfInfo.ruta) {
            await ActividadService.agregarPDF(
              actividad.id,
              pdfInfo.ruta,
              pdfInfo.tipo || 'adicional'
            );
          }
        }
      }

      // Paso 6: Retornar actividad completa con PDFs
      const actividadCompleta = await ActividadService.getById(actividad.id);

      return {
        success: true,
        message: 'Dependencia generada exitosamente',
        data: {
          actividad: actividadCompleta.data || actividadCompleta,
          proyecto: proyecto,
          pdf_general: pdfGeneral,
          pdfs_adicionales: pdfsAdicionales,
          codigo_caso: codigoCaso
        }
      };

    } catch (error) {
      console.error('Error al generar dependencia completa:', error);
      throw {
        success: false,
        message: 'Error al generar la dependencia',
        error: error.message || error
      };
    }
  },

  /**
   * Obtener proyecto de dependencias del sistema
   * @returns {Promise<Object|null>} Proyecto de dependencias o null
   */
  obtenerProyectoDependencias: async () => {
    try {
      const response = await ProyectoService.getAll({
        nombre: 'Dependencias del Sistema CSDT'
      });
      
      const proyectos = response.data || response;
      
      if (proyectos && proyectos.length > 0) {
        return proyectos[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error al buscar proyecto de dependencias:', error);
      return null;
    }
  },

  /**
   * Agregar PDF a actividad existente
   * @param {number} actividadId - ID de la actividad
   * @param {string} rutaPDF - Ruta del PDF
   * @param {string} tipo - Tipo de PDF
   * @returns {Promise<Object>} Resultado
   */
  agregarPDFAActividad: async (actividadId, rutaPDF, tipo = 'adicional') => {
    try {
      const response = await ActividadService.agregarPDF(actividadId, rutaPDF, tipo);
      return {
        success: true,
        message: 'PDF agregado exitosamente a la actividad',
        data: response.data || response
      };
    } catch (error) {
      console.error('Error al agregar PDF a actividad:', error);
      throw {
        success: false,
        message: 'Error al agregar PDF',
        error: error.message || error
      };
    }
  },

  /**
   * Obtener actividades por código de caso
   * @param {string} codigoCaso - Código único del caso
   * @returns {Promise<Object>} Actividades encontradas
   */
  obtenerPorCodigoCaso: async (codigoCaso) => {
    try {
      const response = await api.get('/actividades', {
        params: { codigo_caso: codigoCaso }
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error al obtener actividades por código:', error);
      throw {
        success: false,
        message: 'Error al buscar actividades',
        error: error.message || error
      };
    }
  },

  /**
   * Actualizar estado de dependencia
   * @param {number} actividadId - ID de la actividad
   * @param {string} nuevoEstado - Nuevo estado (pendiente, en_proceso, completado)
   * @param {number} progreso - Porcentaje de progreso (0-100)
   * @returns {Promise<Object>} Actividad actualizada
   */
  actualizarEstado: async (actividadId, nuevoEstado, progreso = null) => {
    try {
      const updateData = { estado: nuevoEstado };
      if (progreso !== null) {
        updateData.progreso = progreso;
      }

      const response = await ActividadService.update(actividadId, updateData);
      return {
        success: true,
        message: 'Estado actualizado exitosamente',
        data: response.data || response
      };
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      throw {
        success: false,
        message: 'Error al actualizar estado',
        error: error.message || error
      };
    }
  },

  /**
   * Generar dependencia rápida (versión simplificada)
   * Solo requiere datos mínimos
   * @param {string} modulo - Módulo de origen
   * @param {string} titulo - Título
   * @param {Object} datos - Datos del caso
   * @returns {Promise<Object>} Actividad creada
   */
  generarDependenciaRapida: async (modulo, titulo, datos = {}) => {
    const codigoCaso = datos.codigoCaso || `${modulo.substring(0, 3).toUpperCase()}-${Date.now()}`;
    
    return await DependenciaService.generarDependenciaCompleta({
      modulo,
      titulo,
      descripcion: datos.descripcion || titulo,
      tipo: datos.tipo || 'general',
      datosCliente: datos.cliente || {},
      datosUbicacion: datos.ubicacion || {},
      resultado: datos.resultado || null,
      codigoCaso,
      pdfsAdicionales: datos.pdfs || []
    });
  }
};

export default DependenciaService;

