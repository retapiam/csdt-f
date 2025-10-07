/**
 * CONFIGURACIÓN DE IA - CSDT
 * Configuración centralizada para todos los servicios de IA
 */

export const AI_CONFIG = {
  // Configuración de modelos
  modelos: {
    gpt4: {
      nombre: 'GPT-4',
      proveedor: 'openai',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      modelo: 'gpt-4',
      max_tokens: 1000,
      temperatura: 0.3,
      timeout: 30000,
      costo_por_token: 0.00003,
      activo: true,
      rate_limit: 1000
    },
    gpt4_turbo: {
      nombre: 'GPT-4 Turbo',
      proveedor: 'openai',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      modelo: 'gpt-4-turbo',
      max_tokens: 1000,
      temperatura: 0.3,
      timeout: 25000,
      costo_por_token: 0.00002,
      activo: true,
      rate_limit: 1000
    },
    gpt35_turbo: {
      nombre: 'GPT-3.5 Turbo',
      proveedor: 'openai',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      modelo: 'gpt-3.5-turbo',
      max_tokens: 1000,
      temperatura: 0.3,
      timeout: 20000,
      costo_por_token: 0.000001,
      activo: true,
      rate_limit: 1000
    },
    claude3_opus: {
      nombre: 'Claude 3 Opus',
      proveedor: 'anthropic',
      endpoint: 'https://api.anthropic.com/v1/messages',
      modelo: 'claude-3-opus-20240229',
      max_tokens: 1000,
      temperatura: 0.3,
      timeout: 30000,
      costo_por_token: 0.000015,
      activo: true,
      rate_limit: 500
    },
    claude3_sonnet: {
      nombre: 'Claude 3 Sonnet',
      proveedor: 'anthropic',
      endpoint: 'https://api.anthropic.com/v1/messages',
      modelo: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      temperatura: 0.3,
      timeout: 28000,
      costo_por_token: 0.000008,
      activo: true,
      rate_limit: 500
    },
    claude3_haiku: {
      nombre: 'Claude 3 Haiku',
      proveedor: 'anthropic',
      endpoint: 'https://api.anthropic.com/v1/messages',
      modelo: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      temperatura: 0.3,
      timeout: 25000,
      costo_por_token: 0.000003,
      activo: true,
      rate_limit: 500
    },
    gemini_pro: {
      nombre: 'Gemini Pro',
      proveedor: 'google_gemini',
      endpoint: 'https://generativelanguage.googleapis.com/v1beta',
      modelo: 'gemini-pro',
      max_tokens: 1000,
      temperatura: 0.3,
      timeout: 30000,
      costo_por_token: 0.000001,
      activo: true,
      rate_limit: 1000
    },
    gemini_pro_vision: {
      nombre: 'Gemini Pro Vision',
      proveedor: 'google_gemini',
      endpoint: 'https://generativelanguage.googleapis.com/v1beta',
      modelo: 'gemini-pro-vision',
      max_tokens: 1000,
      temperatura: 0.3,
      timeout: 35000,
      costo_por_token: 0.000002,
      activo: true,
      rate_limit: 1000,
      multimodal: true
    },
    elevenlabs_multilingual: {
      nombre: 'ElevenLabs Multilingual',
      proveedor: 'elevenlabs',
      endpoint: 'https://api.elevenlabs.io/v1',
      modelo: 'eleven_multilingual_v1',
      tipo: 'text-to-speech',
      timeout: 30000,
      activo: true,
      rate_limit: 100
    },
    llama2: {
      nombre: 'Llama 2 70B',
      proveedor: 'huggingface',
      endpoint: 'https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf',
      modelo: 'meta-llama/Llama-2-70b-chat-hf',
      max_tokens: 2048,
      temperatura: 0.2,
      timeout: 45000,
      costo_por_token: 0.000001,
      activo: false
    },
    legal_bert: {
      nombre: 'Legal BERT',
      proveedor: 'huggingface',
      endpoint: 'https://api-inference.huggingface.co/models/nlpaueb/legal-bert-base-uncased',
      modelo: 'nlpaueb/legal-bert-base-uncased',
      max_tokens: 512,
      temperatura: 0.1,
      timeout: 10000,
      costo_por_token: 0.0000005,
      activo: false
    }
  },

  // Configuración de proveedores
  proveedores: {
    openai: {
      nombre: 'OpenAI',
      base_url: 'https://api.openai.com/v1',
      modelos: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      rate_limit: 1000,
      activo: true,
      fallback: 'google_gemini'
    },
    anthropic: {
      nombre: 'Anthropic',
      base_url: 'https://api.anthropic.com',
      modelos: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
      rate_limit: 500,
      activo: true,
      fallback: 'openai'
    },
    google_gemini: {
      nombre: 'Google Gemini',
      base_url: 'https://generativelanguage.googleapis.com/v1beta',
      modelos: ['gemini-pro', 'gemini-pro-vision'],
      rate_limit: 1000,
      activo: true,
      fallback: 'openai'
    },
    elevenlabs: {
      nombre: 'ElevenLabs',
      base_url: 'https://api.elevenlabs.io/v1',
      modelos: ['eleven_multilingual_v1', 'eleven_monolingual_v1'],
      rate_limit: 100,
      tipo: 'text-to-speech',
      activo: true
    },
    lexisnexis: {
      nombre: 'LexisNexis',
      base_url: 'https://api.lexisnexis.com/v1',
      rate_limit: 100,
      tipo: 'legal_database',
      activo: true,
      jurisdicciones: ['colombia', 'estados_unidos', 'espana', 'mexico', 'internacional']
    },
    huggingface: {
      nombre: 'Hugging Face',
      base_url: 'https://api-inference.huggingface.co/models',
      modelos: ['meta-llama/Llama-2-70b-chat-hf', 'nlpaueb/legal-bert-base-uncased'],
      rate_limit: 200,
      activo: false
    }
  },

  // Configuración de análisis
  analisis: {
    tipos: {
      basico: {
        modelo: 'legal_bert',
        max_tokens: 512,
        temperatura: 0.3,
        timeout: 10000
      },
      intermedio: {
        modelo: 'llama2',
        max_tokens: 2048,
        temperatura: 0.2,
        timeout: 30000
      },
      avanzado: {
        modelo: 'claude3',
        max_tokens: 4096,
        temperatura: 0.1,
        timeout: 45000
      },
      completo: {
        modelo: 'gpt4',
        max_tokens: 4096,
        temperatura: 0.1,
        timeout: 60000
      }
    },
    
    algoritmos: {
      clasificacion: 'basado_contenido',
      recomendaciones: 'hibrido',
      extraccion_entidades: 'ner_avanzado',
      analisis_sentimiento: 'vader_espanol'
    }
  },

  // Configuración de prompts
  prompts: {
    analisis_juridico: `
      Eres un experto abogado constitucionalista especializado en acciones de tutela en Colombia.
      
      Analiza el siguiente caso y proporciona:
      1. Clasificación del tipo de derecho vulnerado
      2. Análisis de la viabilidad de la tutela
      3. Fundamentos legales aplicables
      4. Recomendaciones específicas
      5. Plazos y procedimientos
      
      Caso: {hechos}
      Derechos vulnerados: {derechos}
      Pretensiones: {pretensiones}
      
      Responde en formato JSON estructurado.
    `,
    
    generacion_documento: `
      Eres un experto en redacción de documentos legales.
      
      Genera un documento de acción de tutela profesional con:
      1. Encabezado formal
      2. Datos del demandante y demandado
      3. Hechos claros y concisos
      4. Fundamentos legales sólidos
      5. Peticiones específicas
      6. Formato oficial
      
      Datos: {datos}
      Análisis previo: {analisis}
    `,
    
    recomendaciones: `
      Eres un consultor legal especializado en procedimientos constitucionales.
      
      Proporciona recomendaciones específicas para:
      1. Fortalecer el caso
      2. Documentos adicionales necesarios
      3. Estrategias de presentación
      4. Plazos críticos
      5. Recursos disponibles
      
      Caso: {caso}
      Análisis: {analisis}
    `
  },

  // Configuración de límites
  limites: {
    max_requests_por_minuto: 60,
    max_tokens_por_dia: 100000,
    max_archivos_por_analisis: 10,
    max_tamano_archivo: 10485760, // 10MB
    timeout_default: 30000,
    reintentos_maximos: 3
  },

  // Configuración de cache
  cache: {
    habilitado: true,
    duracion_minutos: 60,
    max_entradas: 1000,
    estrategia: 'lru'
  },

  // Configuración de logging
  logging: {
    nivel: 'info',
    incluir_requests: true,
    incluir_responses: false,
    incluir_errores: true,
    archivo_log: 'ai-service.log'
  },

  // Configuración de seguridad
  seguridad: {
    encriptar_datos: true,
    validar_inputs: true,
    sanitizar_respuestas: true,
    rate_limiting: true,
    autenticacion_requerida: true
  }
};

// Configuración específica para análisis de tutela
export const TUTELA_CONFIG = {
  derechos_fundamentales: [
    'Derecho a la vida',
    'Derecho a la integridad personal',
    'Derecho a la libertad',
    'Derecho a la igualdad',
    'Derecho al trabajo',
    'Derecho a la salud',
    'Derecho a la educación',
    'Derecho a la vivienda digna',
    'Derecho a la seguridad social',
    'Derecho a la libertad de expresión',
    'Derecho a la libertad de cultos',
    'Derecho a la intimidad',
    'Derecho al buen nombre',
    'Derecho al debido proceso',
    'Derecho a la libertad de conciencia',
    'Derecho a la libertad de asociación',
    'Derecho a la libertad de reunión'
  ],

  normativa_aplicable: [
    'Constitución Política de Colombia',
    'Ley 1755 de 2015',
    'Decreto 2591 de 1991',
    'Código de Procedimiento Civil',
    'Ley 1437 de 2011'
  ],

  plazos: {
    tutela: 10, // días hábiles
    cumplimiento: 30,
    popular: 60,
    administrativo: 15
  },

  entidades_comunes: [
    'Alcaldía Municipal',
    'Gobernación Departamental',
    'Ministerio de Salud y Protección Social',
    'Ministerio de Educación Nacional',
    'EPS (Entidad Promotora de Salud)',
    'ARS (Administradora de Riesgos de Salud)',
    'ICBF (Instituto Colombiano de Bienestar Familiar)',
    'SENA (Servicio Nacional de Aprendizaje)',
    'Colpensiones',
    'Superintendencia de Servicios Públicos'
  ]
};

// Configuración de PDF
export const PDF_CONFIG = {
  plantillas: {
    accion_tutela: {
      nombre: 'Acción de Tutela',
      campos_requeridos: ['demandante', 'demandado', 'hechos', 'fundamentos', 'pretensiones'],
      estilo: 'oficial',
      formato: 'A4',
      margenes: { superior: 3, inferior: 3, izquierdo: 3, derecho: 3 }
    },
    analisis_juridico: {
      nombre: 'Análisis Jurídico',
      campos_requeridos: ['titulo', 'hechos', 'analisis', 'conclusiones', 'recomendaciones'],
      estilo: 'profesional',
      formato: 'A4',
      margenes: { superior: 2.5, inferior: 2.5, izquierdo: 2.5, derecho: 2.5 }
    }
  },

  estilos: {
    oficial: {
      fuente: 'Times New Roman',
      tamaño_fuente: 12,
      interlineado: 1.5,
      colores: {
        titulo: '#1a365d',
        subtitulo: '#2d3748',
        texto: '#2d3748',
        destacado: '#3182ce'
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
        destacado: '#4299e1'
      }
    }
  },

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
  }
};

export default AI_CONFIG;
