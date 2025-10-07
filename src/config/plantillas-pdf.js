/**
 * CONFIGURACIÓN DE PLANTILLAS PDF
 * Define plantillas específicas para diferentes tipos de casos
 */

export const PLANTILLAS_PDF = {
  // Plantillas para casos étnicos
  territorio_ancestral: {
    nombre: 'Análisis de Territorio Ancestral',
    campos_requeridos: ['nombre', 'comunidad', 'tipo_etnico', 'ubicacion', 'extension'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_territorio',
      'tipo_etnico_identificado',
      'derechos_afectados',
      'consulta_previa',
      'recomendaciones',
      'analisis_narrativo'
    ]
  },
  
  derechos_etnicos: {
    nombre: 'Análisis de Derechos Étnicos',
    campos_requeridos: ['comunidad', 'derechos_afectados', 'tipo_etnico'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_comunidad',
      'derechos_fundamentales',
      'marco_legal',
      'recomendaciones',
      'procesos_aplicables'
    ]
  },
  
  consulta_previa_etnica: {
    nombre: 'Evaluación de Consulta Previa Etnica',
    campos_requeridos: ['comunidad', 'proyecto', 'impacto_territorial'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_proyecto',
      'evaluacion_consulta',
      'fases_aplicables',
      'plazos_estimados',
      'instancias_competentes',
      'recomendaciones'
    ]
  },
  
  patrimonio_cultural: {
    nombre: 'Inventario de Patrimonio Cultural',
    campos_requeridos: ['nombre', 'comunidad', 'categoria', 'tipo'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_patrimonio',
      'caracteristicas_culturales',
      'estado_proteccion',
      'amenazas_identificadas',
      'recomendaciones_proteccion'
    ]
  },
  
  planes_etnodesarrollo: {
    nombre: 'Análisis de Planes de Etnodesarrollo',
    campos_requeridos: ['comunidad', 'plan_desarrollo', 'objetivos'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_plan',
      'objetivos_desarrollo',
      'recursos_requeridos',
      'cronograma_implementacion',
      'evaluacion_viabilidad'
    ]
  },
  
  mediacion_intercultural: {
    nombre: 'Proceso de Mediación Intercultural',
    campos_requeridos: ['conflicto', 'partes', 'mediador'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_conflicto',
      'partes_involucradas',
      'metodologia_mediacion',
      'acuerdos_alcanzados',
      'seguimiento'
    ]
  },
  
  narraciones_etnicas: {
    nombre: 'Narraciones Étnicas y Análisis Cultural',
    campos_requeridos: ['comunidad', 'narracion', 'contexto_cultural'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_narracion',
      'contexto_cultural',
      'elementos_simbolicos',
      'significado_territorial',
      'transmision_generacional'
    ]
  },

  // Plantillas para casos administrativos
  pqrsfd: {
    nombre: 'Análisis de PQRSFD',
    campos_requeridos: ['tipo_solicitud', 'descripcion', 'entidad'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_solicitud',
      'clasificacion_automatica',
      'via_administrativa_recomendada',
      'plazos_procesales',
      'documentos_requeridos'
    ]
  },
  
  vias_administrativas: {
    nombre: 'Análisis de Vías Administrativas',
    campos_requeridos: ['caso', 'entidad', 'tipo_proceso'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_caso',
      'vias_disponibles',
      'competencia_administrativa',
      'plazos_aplicables',
      'recursos_procedimentales'
    ]
  },
  
  control_institucional: {
    nombre: 'Control Institucional y Transparencia',
    campos_requeridos: ['entidad', 'acto_administrativo', 'irregularidad'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_entidad',
      'acto_administrativo',
      'irregularidades_detectadas',
      'mecanismos_control',
      'recomendaciones_mejora'
    ]
  },

  // Plantillas para casos judiciales
  accion_tutela: {
    nombre: 'Análisis de Acción de Tutela',
    campos_requeridos: ['derecho_violado', 'hechos', 'urgencia'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_derecho',
      'hechos_violatorios',
      'urgencia_justificada',
      'viabilidad_accion',
      'competencia_judicial'
    ]
  },
  
  accion_popular: {
    nombre: 'Análisis de Acción Popular',
    campos_requeridos: ['interes_colectivo', 'daño_ambiental', 'causa_directa'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_interes',
      'daño_colectivo',
      'causa_directa',
      'competencia_judicial',
      'viabilidad_procesal'
    ]
  },
  
  accion_cumplimiento: {
    nombre: 'Análisis de Acción de Cumplimiento',
    campos_requeridos: ['obligacion_legal', 'incumplimiento', 'interes_legitimo'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_obligacion',
      'hechos_incumplimiento',
      'interes_legitimo',
      'competencia_judicial',
      'viabilidad_accion'
    ]
  },
  
  demanda_juridica: {
    nombre: 'Análisis de Demanda Jurídica',
    campos_requeridos: ['pretensiones', 'fundamentos', 'pruebas'],
    estilo: 'oficial',
    formato: 'A4',
    margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 },
    secciones: [
      'identificacion_pretensiones',
      'fundamentos_legales',
      'pruebas_disponibles',
      'competencia_judicial',
      'viabilidad_demanda'
    ]
  }
};

export const ESTILOS_PDF = {
  oficial: {
    fuente: 'Times New Roman',
    tamaño_fuente: 12,
    interlineado: 1.5,
    colores: {
      titulo: '#1a365d',
      subtitulo: '#2d3748',
      texto: '#2d3748',
      destacado: '#3182ce',
      fondo: '#ffffff'
    },
    encabezado: {
      mostrar: true,
      texto: 'CONSEJO SOCIAL DE DESARROLLO TERRITORIAL - CSDT',
      alineacion: 'center'
    },
    pie_pagina: {
      mostrar: true,
      texto: 'Generado por Sistema de IA - CSDT',
      alineacion: 'center'
    }
  },
  
  profesional: {
    fuente: 'Arial',
    tamaño_fuente: 11,
    interlineado: 1.4,
    colores: {
      titulo: '#2d3748',
      subtitulo: '#4a5568',
      texto: '#2d3748',
      destacado: '#4299e1',
      fondo: '#ffffff'
    },
    encabezado: {
      mostrar: true,
      texto: 'ANÁLISIS JURÍDICO ESPECIALIZADO',
      alineacion: 'center'
    },
    pie_pagina: {
      mostrar: true,
      texto: 'Sistema de Inteligencia Artificial - CSDT',
      alineacion: 'center'
    }
  }
};

export const CONFIGURACIONES_PDF = {
  calidad: {
    alta: {
      resolucion: 300,
      compresion: 'alta',
      tamanio_archivo: 'grande'
    },
    media: {
      resolucion: 200,
      compresion: 'media',
      tamanio_archivo: 'medio'
    },
    baja: {
      resolucion: 150,
      compresion: 'baja',
      tamanio_archivo: 'pequeño'
    }
  },
  
  metadatos: {
    autor: 'Sistema de IA - CSDT',
    creador: 'Consejo Social de Desarrollo Territorial',
    asunto: 'Análisis Jurídico Especializado',
    palabras_clave: ['IA', 'Análisis', 'Jurídico', 'CSDT', 'Colombia']
  }
};

export default {
  PLANTILLAS_PDF,
  ESTILOS_PDF,
  CONFIGURACIONES_PDF
};
