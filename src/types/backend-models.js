/**
 * Modelos alineados con el Backend Laravel
 * Estos tipos coinciden exactamente con la estructura de la base de datos
 */

// ==================== USUARIOS ====================

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} [email_verified_at]
 * @property {'administrador'|'operador'|'cliente'|'superadmin'} rol
 * @property {'activo'|'inactivo'|'suspendido'} estado
 * @property {string} [avatar]
 * @property {string} [telefono]
 * @property {string} [documento]
 * @property {'CC'|'CE'|'NIT'|'Pasaporte'} [tipo_documento]
 * @property {string} created_at
 * @property {string} updated_at
 */

// ==================== PROYECTOS ====================

/**
 * @typedef {Object} Proyecto
 * @property {number} id
 * @property {string} nombre
 * @property {string} descripcion
 * @property {string} tipo_caso
 * @property {'pendiente'|'en_progreso'|'completado'|'cancelado'|'pausado'} estado
 * @property {'baja'|'media'|'alta'|'urgente'} prioridad
 * @property {number} administrador_id
 * @property {number} [operador_id]
 * @property {number} cliente_id
 * @property {string} [fecha_inicio]
 * @property {string} fecha_limite
 * @property {string} [fecha_completado]
 * @property {number} presupuesto_estimado
 * @property {number} presupuesto_ejecutado
 * @property {number} progreso
 * @property {number} tareas_completadas
 * @property {number} tareas_totales
 * @property {number} [analisis_ia_id]
 * @property {Object} [configuracion]
 * @property {Object} [metadata]
 * @property {string} created_at
 * @property {string} updated_at
 */

// ==================== TAREAS ====================

/**
 * @typedef {Object} Tarea
 * @property {number} id
 * @property {number} proyecto_id
 * @property {string} nombre
 * @property {string} descripcion
 * @property {string} tipo
 * @property {'pendiente'|'en_progreso'|'completada'|'bloqueada'|'cancelada'} estado
 * @property {'baja'|'media'|'alta'|'urgente'} prioridad
 * @property {number} [asignado_a]
 * @property {number} creado_por
 * @property {number} tiempo_estimado
 * @property {number} tiempo_invertido
 * @property {number} costo_estimado
 * @property {number} costo_real
 * @property {string} [fecha_asignacion]
 * @property {string} fecha_limite
 * @property {string} [fecha_completada]
 * @property {number} progreso
 * @property {string} [motivo_bloqueo]
 * @property {Array} [documentos_requeridos]
 * @property {Array} [documentos_entregados]
 * @property {string} created_at
 * @property {string} updated_at
 */

// ==================== DONACIONES ====================

/**
 * @typedef {Object} Donacion
 * @property {number} id
 * @property {string} donante_nombre
 * @property {string} donante_email
 * @property {string} [donante_telefono]
 * @property {string} [donante_documento]
 * @property {number} monto
 * @property {string} moneda
 * @property {'nequi'|'tarjeta'|'transferencia'|'efectivo'|'pse'} metodo_pago
 * @property {'pendiente'|'completada'|'fallida'|'reembolsada'} estado
 * @property {string} [referencia_pago]
 * @property {string} [comprobante]
 * @property {string} [mensaje]
 * @property {boolean} es_recurrente
 * @property {'mensual'|'trimestral'|'anual'} [frecuencia_recurrente]
 * @property {string} [destino]
 * @property {string} created_at
 * @property {string} updated_at
 */

// ==================== ANÁLISIS IA ====================

/**
 * @typedef {Object} AIConsulta
 * @property {number} id
 * @property {number} user_id
 * @property {string} tipo_consulta
 * @property {string} texto_consulta
 * @property {'openai'|'anthropic'|'huggingface'|'lexisnexis'|'territorial_ai'|'constitutional_ai'|'veeduria_ai'|'legal_ai_library'} proveedor_ia
 * @property {string} modelo_utilizado
 * @property {string} respuesta
 * @property {number} confianza
 * @property {number} tiempo_procesamiento
 * @property {number} tokens_utilizados
 * @property {number} costo_tokens
 * @property {Object} [metadata]
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} AIAnalisisJuridico
 * @property {number} id
 * @property {number} [consulta_id]
 * @property {number} user_id
 * @property {string} tipo_caso
 * @property {string} categoria_juridica
 * @property {string} texto_analizado
 * @property {Array} clasificaciones
 * @property {string} resumen
 * @property {Array} fundamentos_legales
 * @property {Array} jurisprudencia
 * @property {Array} normativa_aplicable
 * @property {Array} recomendaciones
 * @property {Array} evaluacion_riesgos
 * @property {number} confianza_promedio
 * @property {Array} proveedores_utilizados
 * @property {'basico'|'intermedio'|'avanzado'|'completo'} nivel_analisis
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} AIAnalisisEtnico
 * @property {number} id
 * @property {number} user_id
 * @property {'indigenas'|'negritudes'|'raizales'|'rom'} grupo_etnico
 * @property {string} comunidad
 * @property {string} ubicacion
 * @property {string} narracion
 * @property {string} tipo_etnico_detectado
 * @property {number} confianza_tipo
 * @property {Array} derechos_afectados
 * @property {boolean} requiere_consulta_previa
 * @property {'bajo'|'medio'|'alto'|'critico'} nivel_urgencia
 * @property {Object} impacto_territorial
 * @property {Object} impacto_cultural
 * @property {Object} impacto_autonomia
 * @property {Array} recomendaciones
 * @property {Array} procedimientos_sugeridos
 * @property {Array} normativas_aplicables
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} AIAnalisisVeeduria
 * @property {number} id
 * @property {number} user_id
 * @property {string} entidad
 * @property {string} proyecto
 * @property {string} tipo_veeduria
 * @property {string} narracion
 * @property {Object} analisis_transparencia
 * @property {Object} analisis_contratacion
 * @property {Object} analisis_participacion
 * @property {'bajo'|'medio'|'alto'} nivel_transparencia
 * @property {'bajo'|'medio'|'alto'|'critico'} nivel_riesgo
 * @property {Array} hallazgos
 * @property {Array} recomendaciones
 * @property {Array} alertas
 * @property {string} created_at
 * @property {string} updated_at
 */

// ==================== DERECHOS ÉTNICOS ====================

/**
 * @typedef {Object} PuebloIndigena
 * @property {number} id
 * @property {string} nombre
 * @property {string} pueblo
 * @property {string} departamento
 * @property {string} municipio
 * @property {string} [resguardo]
 * @property {string} [territorio_ancestral]
 * @property {number} [extension_hectareas]
 * @property {number} [poblacion]
 * @property {string} [idioma]
 * @property {Array} [autoridades_tradicionales]
 * @property {string} [representante_legal]
 * @property {string} [contacto]
 * @property {'activo'|'en_proceso_reconocimiento'|'inactivo'} estado
 * @property {Object} [metadata]
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} ComunidadAfro
 * @property {number} id
 * @property {string} nombre
 * @property {'consejo_comunitario'|'comunidad_negra'|'palenque'|'raizal'} tipo
 * @property {string} departamento
 * @property {string} municipio
 * @property {string} [territorio_colectivo]
 * @property {string} [titulo_colectivo]
 * @property {number} [extension_hectareas]
 * @property {number} [poblacion]
 * @property {string} [representante_legal]
 * @property {string} [contacto]
 * @property {'activo'|'en_proceso_titulacion'|'inactivo'} estado
 * @property {Object} [metadata]
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} ConsultaPrevia
 * @property {number} id
 * @property {string} proyecto_nombre
 * @property {string} entidad_solicitante
 * @property {string} tipo_proyecto
 * @property {number} [comunidad_id]
 * @property {'indigena'|'afro'|'raizal'|'rom'} tipo_comunidad
 * @property {string} ubicacion
 * @property {string} descripcion_proyecto
 * @property {Array} impactos_identificados
 * @property {'pre_consulta'|'apertura'|'talleres'|'protocolo'|'acuerdos'|'seguimiento'|'finalizada'} estado
 * @property {string} fecha_inicio
 * @property {string} [fecha_finalizacion]
 * @property {'aprobado'|'aprobado_con_condiciones'|'no_aprobado'|'en_proceso'} resultado
 * @property {Array} [acuerdos]
 * @property {Array} [seguimiento]
 * @property {string} responsable
 * @property {number} [analisis_ia_id]
 * @property {string} created_at
 * @property {string} updated_at
 */

// ==================== VEEDURÍAS ====================

/**
 * @typedef {Object} Veeduria
 * @property {number} id
 * @property {string} nombre
 * @property {'gestion_publica'|'contratacion'|'derechos_ambientales'|'rendicion_cuentas'|'participacion_ciudadana'} tipo
 * @property {string} entidad_vigilada
 * @property {string} [proyecto_vigilado]
 * @property {string} descripcion
 * @property {Array} objetivos
 * @property {Array} integrantes
 * @property {string} representante_legal
 * @property {string} contacto
 * @property {string} departamento
 * @property {string} municipio
 * @property {string} fecha_constitucion
 * @property {'activa'|'inactiva'|'suspendida'} estado
 * @property {Array} [hallazgos]
 * @property {Array} [recomendaciones]
 * @property {number} [analisis_ia_id]
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} SeguimientoVeeduria
 * @property {number} id
 * @property {number} veeduria_id
 * @property {string} fecha_seguimiento
 * @property {string} tipo_actividad
 * @property {string} descripcion
 * @property {Array} hallazgos
 * @property {Array} evidencias
 * @property {'bajo'|'medio'|'alto'|'critico'} nivel_riesgo
 * @property {Array} acciones_recomendadas
 * @property {string} responsable
 * @property {'pendiente'|'en_revision'|'completado'} estado
 * @property {string} created_at
 * @property {string} updated_at
 */

// ==================== CASOS LEGALES ====================

/**
 * @typedef {Object} CasoLegal
 * @property {number} id
 * @property {number} user_id
 * @property {'tutela'|'cumplimiento'|'popular'|'grupo'|'habeas_corpus'|'habeas_data'|'penal'|'civil'|'laboral'|'administrativo'} tipo_caso
 * @property {string} [numero_radicado]
 * @property {string} demandante
 * @property {string} demandado
 * @property {string} hechos
 * @property {string} pretensiones
 * @property {string} fundamentos_legales
 * @property {'draft'|'presentado'|'admitido'|'en_tramite'|'fallo_primera_instancia'|'apelacion'|'finalizado'} estado_caso
 * @property {string} [fecha_presentacion]
 * @property {string} [fecha_admision]
 * @property {string} [fecha_fallo]
 * @property {string} [juzgado]
 * @property {string} [juez]
 * @property {string} [resultado]
 * @property {Array} [archivos_adjuntos]
 * @property {number} [analisis_ia_id]
 * @property {string} created_at
 * @property {string} updated_at
 */

// ==================== RESPUESTAS API ====================

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} message
 * @property {*} data
 * @property {Object} [errors]
 */

/**
 * @typedef {Object} AuthResponse
 * @property {boolean} success
 * @property {string} message
 * @property {Object} data
 * @property {User} data.user
 * @property {string} data.token
 */

export {
  // Tipos exportados como JSDoc typedefs
  // Se pueden usar en otros archivos con @typedef {import('./backend-models').User} User
};

