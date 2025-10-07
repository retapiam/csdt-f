import { unifiedAIService } from './UnifiedAIService';
import { AI_CONFIG } from '../../config/ai-config';

/**
 * Servicio Avanzado de IA - Wrapper sobre UnifiedAIService
 * Proporciona métodos optimizados para análisis étnico, jurídico y especializado
 */
class AdvancedAIService {
  constructor() {
    this.config = AI_CONFIG;
    this.cache = new Map();
    this.estadisticas = {
      totalAnalisis: 0,
      exitosos: 0,
      fallidos: 0,
      tiempoPromedio: 0
    };
  }

  /**
   * Analizar caso étnico con IA avanzada
   */
  async analizarCasoEtnico(datosCaso, opciones = {}) {
    const tiempoInicio = Date.now();
    try {
      const request = {
        text: datosCaso.narracion || '',
        legal_area: 'Derechos Étnicos',
        jurisdiction: 'colombia',
        metadata: {
          grupoEtnico: datosCaso.grupoEtnico,
          ubicacion: datosCaso.ubicacion,
          tipoCaso: datosCaso.tipoCaso,
          archivos: datosCaso.archivos || []
        }
      };

      const resultado = await unifiedAIService.quickAnalyze(request);

      this.estadisticas.totalAnalisis++;
      this.estadisticas.exitosos++;
      this.estadisticas.tiempoPromedio = 
        (this.estadisticas.tiempoPromedio + (Date.now() - tiempoInicio)) / 2;

      return {
        analisis: {
          resumen: resultado.summary || 'Análisis étnico completado exitosamente',
          clasificaciones: resultado.classifications || [],
          detalle: this.generarDetalleEtnico(resultado, datosCaso)
        },
        recomendaciones: resultado.recommendations || this.generarRecomendacionesEtnicas(datosCaso),
        evaluacionRiesgos: resultado.risk_assessment || this.evaluarRiesgosEtnicos(datosCaso),
        precedentes: this.buscarPrecedentesEtnicos(datosCaso),
        normativaAplicable: this.obtenerNormativaEtnica(datosCaso),
        metadatos: {
          tiempoProcesamiento: Date.now() - tiempoInicio,
          proveedoresUtilizados: [resultado.ai_provider],
          confianzaPromedio: resultado.confidence_score || 0.85,
          version: '3.0.0',
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error en análisis étnico:', error);
      this.estadisticas.totalAnalisis++;
      this.estadisticas.fallidos++;
      
      return {
        analisis: { 
          resumen: 'Análisis con datos limitados. Se recomienda revisión manual.', 
          clasificaciones: [],
          detalle: 'El sistema de IA está temporalmente no disponible.'
        },
        recomendaciones: this.generarRecomendacionesEtnicas(datosCaso),
        evaluacionRiesgos: { level: 'medium', score: 0.5, factors: [] },
        precedentes: [],
        normativaAplicable: this.obtenerNormativaEtnica(datosCaso),
        metadatos: { 
          tiempoProcesamiento: Date.now() - tiempoInicio, 
          proveedoresUtilizados: [], 
          confianzaPromedio: 0.5, 
          version: '3.0.0',
          error: true
        }
      };
    }
  }

  /**
   * Generar respuesta inteligente
   */
  async generarRespuestaInteligente(texto, contexto = {}) {
    try {
      const request = {
        text: texto,
        legal_area: contexto.tipoConsulta === 'etnico' ? 'Derechos Étnicos' : 'General',
        jurisdiction: 'colombia',
        metadata: contexto
      };

      const resultado = await unifiedAIService.quickAnalyze(request);

      return {
        respuesta: resultado.summary || 'Análisis completado exitosamente',
        clasificaciones: resultado.classifications || [],
        recomendaciones: resultado.recommendations || [],
        confianza: resultado.confidence_score || 0.85,
        metadatos: {
          proveedor: resultado.ai_provider,
          tiempo: resultado.processing_time
        }
      };
    } catch (error) {
      console.error('Error generando respuesta:', error);
      return {
        respuesta: 'Error al generar respuesta. Intente nuevamente.',
        clasificaciones: [],
        recomendaciones: [],
        confianza: 0,
        metadatos: {}
      };
    }
  }

  /**
   * Generar detalle étnico específico
   */
  generarDetalleEtnico(resultado, datosCaso) {
    const detalles = [];
    
    if (datosCaso.grupoEtnico) {
      detalles.push(`Grupo étnico: ${datosCaso.grupoEtnico}`);
    }
    
    if (datosCaso.ubicacion) {
      detalles.push(`Ubicación: ${datosCaso.ubicacion}`);
    }
    
    if (datosCaso.tipoCaso) {
      detalles.push(`Tipo de caso: ${datosCaso.tipoCaso}`);
    }

    return detalles.join(' | ');
  }

  /**
   * Generar recomendaciones étnicas
   */
  generarRecomendacionesEtnicas(datosCaso) {
    const recomendaciones = [];

    if (datosCaso.tipoCaso?.toLowerCase().includes('consulta previa')) {
      recomendaciones.push('Verificar el cumplimiento del Convenio 169 de la OIT');
      recomendaciones.push('Contactar a las autoridades tradicionales de la comunidad');
      recomendaciones.push('Documentar el proceso de consulta de manera exhaustiva');
    }

    if (datosCaso.tipoCaso?.toLowerCase().includes('territorial')) {
      recomendaciones.push('Obtener certificación de la existencia del territorio ancestral');
      recomendaciones.push('Revisar títulos de propiedad colectiva');
      recomendaciones.push('Verificar límites con catastro y ANT');
    }

    if (recomendaciones.length === 0) {
      recomendaciones.push('Realizar consulta jurídica especializada en derechos étnicos');
      recomendaciones.push('Documentar todos los hechos y evidencias del caso');
      recomendaciones.push('Contactar con organizaciones de apoyo a comunidades étnicas');
    }

    return recomendaciones;
  }

  /**
   * Evaluar riesgos étnicos
   */
  evaluarRiesgosEtnicos(datosCaso) {
    let score = 0.3; // Riesgo base bajo
    const factors = [];

    if (!datosCaso.grupoEtnico) {
      score += 0.2;
      factors.push('No se especificó grupo étnico');
    }

    if (!datosCaso.ubicacion) {
      score += 0.1;
      factors.push('Falta información de ubicación');
    }

    if (!datosCaso.narracion || datosCaso.narracion.length < 50) {
      score += 0.2;
      factors.push('Descripción del caso insuficiente');
    }

    const level = score < 0.4 ? 'low' : score < 0.7 ? 'medium' : 'high';

    return {
      level,
      score,
      factors,
      recomendaciones: [
        'Completar toda la información requerida',
        'Adjuntar documentación de soporte',
        'Consultar con especialista en derechos étnicos'
      ]
    };
  }

  /**
   * Buscar precedentes étnicos
   */
  buscarPrecedentesEtnicos(datosCaso) {
    const precedentes = [];

    if (datosCaso.tipoCaso?.toLowerCase().includes('consulta previa')) {
      precedentes.push({
        titulo: 'Sentencia T-769 de 2009',
        corte: 'Corte Constitucional',
        resumen: 'Derecho fundamental a la consulta previa de comunidades indígenas',
        relevancia: 'alta'
      });
      precedentes.push({
        titulo: 'Sentencia SU-123 de 2018',
        corte: 'Corte Constitucional',
        resumen: 'Consulta previa en proyectos mineros',
        relevancia: 'alta'
      });
    }

    if (datosCaso.grupoEtnico?.toLowerCase().includes('afro')) {
      precedentes.push({
        titulo: 'Sentencia T-025 de 2004',
        corte: 'Corte Constitucional',
        resumen: 'Protección de comunidades afrodescendientes desplazadas',
        relevancia: 'media'
      });
    }

    return precedentes;
  }

  /**
   * Obtener normativa étnica aplicable
   */
  obtenerNormativaEtnica(datosCaso) {
    const normativa = [
      'Convenio 169 de la OIT sobre pueblos indígenas y tribales',
      'Constitución Política de Colombia - Artículos 7, 8, 63, 70, 329, 330',
      'Ley 70 de 1993 - Comunidades Negras',
      'Decreto 1320 de 1998 - Consulta Previa',
      'Sentencia SU-039 de 1997 - Autonomía territorial'
    ];

    if (datosCaso.tipoCaso?.toLowerCase().includes('minería')) {
      normativa.push('Ley 685 de 2001 - Código de Minas');
      normativa.push('Decreto 2893 de 2011 - Consulta previa en actividades mineras');
    }

    return normativa;
  }

  /**
   * Análisis de caso general
   */
  async analizarCaso(texto, opciones = {}) {
    try {
      const request = {
        text: texto,
        legal_area: opciones.areaLegal || 'General',
        jurisdiction: opciones.jurisdiccion || 'colombia'
      };

      const resultado = await unifiedAIService.quickAnalyze(request);

      return {
        analisis: resultado.summary,
        clasificaciones: resultado.classifications,
        recomendaciones: resultado.recommendations,
        confianza: resultado.confidence_score,
        riesgos: resultado.risk_assessment
      };
    } catch (error) {
      console.error('Error en análisis de caso:', error);
      return {
        analisis: 'Error en análisis',
        clasificaciones: [],
        recomendaciones: [],
        confianza: 0,
        riesgos: {}
      };
    }
  }

  /**
   * Analizar caso jurídico (tutela, cumplimiento, etc.)
   */
  async analizarCasoJuridico(datosCaso, tipoAccion = 'tutela') {
    const tiempoInicio = Date.now();
    try {
      const request = {
        text: datosCaso.hechos || datosCaso.narracion || '',
        legal_area: this.obtenerAreaLegal(tipoAccion),
        jurisdiction: 'colombia',
        metadata: {
          tipoAccion,
          derechos: datosCaso.derechos || [],
          demandante: datosCaso.demandante,
          demandado: datosCaso.demandado
        }
      };

      const resultado = await unifiedAIService.quickAnalyze(request);

      return {
        analisis: {
          resumen: resultado.summary,
          clasificaciones: resultado.classifications,
          viabilidad: this.evaluarViabilidad(resultado, tipoAccion),
          fundamentosLegales: this.obtenerFundamentosLegales(tipoAccion, resultado)
        },
        recomendaciones: resultado.recommendations || this.generarRecomendacionesJuridicas(tipoAccion),
        documentosNecesarios: this.obtenerDocumentosNecesarios(tipoAccion),
        plazo: this.obtenerPlazo(tipoAccion),
        procedimiento: this.obtenerProcedimiento(tipoAccion),
        metadatos: {
          tiempoProcesamiento: Date.now() - tiempoInicio,
          confianza: resultado.confidence_score || 0.85,
          version: '3.0.0'
        }
      };
    } catch (error) {
      console.error('Error en análisis jurídico:', error);
      return {
        analisis: {
          resumen: 'Análisis con datos limitados',
          clasificaciones: [],
          viabilidad: 'media',
          fundamentosLegales: this.obtenerFundamentosLegales(tipoAccion)
        },
        recomendaciones: this.generarRecomendacionesJuridicas(tipoAccion),
        documentosNecesarios: this.obtenerDocumentosNecesarios(tipoAccion),
        plazo: this.obtenerPlazo(tipoAccion),
        procedimiento: this.obtenerProcedimiento(tipoAccion),
        metadatos: {
          tiempoProcesamiento: Date.now() - tiempoInicio,
          confianza: 0.5,
          version: '3.0.0',
          error: true
        }
      };
    }
  }

  /**
   * Generar PDF con análisis de IA
   */
  async generarPDFConAnalisis(datos, analisis) {
    try {
      // Importar dinámicamente el servicio de PDF
      const { pdfAvanzadoService } = await import('../pdf/PDFAvanzadoService');
      
      const contenido = {
        titulo: datos.titulo || 'Análisis con Inteligencia Artificial',
        fecha: new Date().toLocaleDateString('es-CO'),
        datos: datos,
        analisis: analisis,
        recomendaciones: analisis.recomendaciones || [],
        metadatos: {
          generadoPor: 'Sistema CSDT IA',
          version: '3.0.0',
          confianza: analisis.metadatos?.confianza || 0.85
        }
      };

      return await pdfAvanzadoService.generarPDFCompleto('analisis_juridico', contenido);
    } catch (error) {
      console.error('Error generando PDF:', error);
      throw new Error('No se pudo generar el PDF. Intente nuevamente.');
    }
  }

  /**
   * Obtener estadísticas del servicio
   */
  obtenerEstadisticas() {
    return {
      ...this.estadisticas,
      tasaExito: this.estadisticas.totalAnalisis > 0 
        ? (this.estadisticas.exitosos / this.estadisticas.totalAnalisis * 100).toFixed(2) + '%'
        : '0%',
      cacheSize: this.cache.size
    };
  }

  /**
   * Métodos auxiliares
   */
  obtenerAreaLegal(tipoAccion) {
    const areas = {
      tutela: 'Derecho Constitucional',
      cumplimiento: 'Derecho Administrativo',
      popular: 'Derechos Colectivos',
      habeas_corpus: 'Derecho Penal',
      habeas_data: 'Derecho a la Intimidad'
    };
    return areas[tipoAccion] || 'Derecho General';
  }

  evaluarViabilidad(resultado, tipoAccion) {
    const confianza = resultado.confidence_score || 0.5;
    if (confianza >= 0.8) return 'alta';
    if (confianza >= 0.6) return 'media';
    return 'baja';
  }

  obtenerFundamentosLegales(tipoAccion, resultado = null) {
    const fundamentos = {
      tutela: [
        'Artículo 86 de la Constitución Política de Colombia',
        'Decreto 2591 de 1991',
        'Jurisprudencia de la Corte Constitucional'
      ],
      cumplimiento: [
        'Artículo 87 de la Constitución Política de Colombia',
        'Ley 393 de 1997',
        'Código de Procedimiento Administrativo'
      ],
      popular: [
        'Artículo 88 de la Constitución Política de Colombia',
        'Ley 472 de 1998'
      ]
    };
    return fundamentos[tipoAccion] || ['Normativa general aplicable'];
  }

  generarRecomendacionesJuridicas(tipoAccion) {
    const recomendaciones = {
      tutela: [
        'Verificar la procedencia de la acción de tutela',
        'Identificar claramente los derechos fundamentales vulnerados',
        'Demostrar la urgencia e inmediatez del caso',
        'Agotar requisitos de subsidiariedad si aplica'
      ],
      cumplimiento: [
        'Verificar que exista una ley o acto administrativo incumplido',
        'Demostrar que el cumplimiento es claro y expreso',
        'Acreditar que no existen medios de defensa judicial',
        'Documentar las solicitudes previas de cumplimiento'
      ]
    };
    return recomendaciones[tipoAccion] || [
      'Consultar con abogado especializado',
      'Reunir toda la documentación necesaria',
      'Verificar plazos y procedimientos aplicables'
    ];
  }

  obtenerDocumentosNecesarios(tipoAccion) {
    return [
      'Copia de la cédula del solicitante',
      'Documentos que acrediten los hechos',
      'Pruebas documentales y testimoniales',
      'Poder si actúa mediante apoderado',
      'Dirección de notificaciones'
    ];
  }

  obtenerPlazo(tipoAccion) {
    const plazos = {
      tutela: '10 días hábiles',
      cumplimiento: '30 días hábiles',
      popular: '4 meses',
      habeas_corpus: 'Inmediato',
      habeas_data: '15 días hábiles'
    };
    return plazos[tipoAccion] || 'Consultar normativa específica';
  }

  obtenerProcedimiento(tipoAccion) {
    return [
      'Presentación de la solicitud ante juez competente',
      'Admisión y notificación a la parte accionada',
      'Respuesta de la entidad o persona accionada',
      'Práctica de pruebas si es necesario',
      'Audiencia o fallo según corresponda',
      'Notificación de la decisión',
      'Cumplimiento del fallo'
    ];
  }

  /**
   * Obtener recomendación de proveedor
   */
  async obtenerRecomendacion(texto, contexto = {}) {
    try {
      const request = {
        text: texto,
        legal_area: contexto.areaLegal || 'General',
        jurisdiction: contexto.jurisdiccion || 'colombia'
      };

      return unifiedAIService.recommendProvider(request);
    } catch (error) {
      console.error('Error obteniendo recomendación:', error);
      return {
        recommendedProvider: null,
        reasoning: 'Error al obtener recomendación',
        confidence: 0
      };
    }
  }
}

// Instancia singleton
export const advancedAIService = new AdvancedAIService();
export default advancedAIService;

