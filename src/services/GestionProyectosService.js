/**
 * SERVICIO DE GESTIÓN DE PROYECTOS - CSDT
 * Maneja la lógica de negocio para proyectos, tareas, dependencias y roles
 */

import { unifiedAIService as iaService } from './ia/UnifiedAIService';

class GestionProyectosService {
  constructor() {
    this.version = '1.0.0';
    this.baseURL = '/api/gestion-proyectos';
    this.cache = new Map();
    this.listeners = new Set();
  }

  // ===========================================
  // MODELO DE DATOS
  // ===========================================

  /**
   * Estructura de un Proyecto/Actividad
   */
  crearModeloProyecto(data) {
    return {
      id: this.generarId(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      tipoCaso: data.tipoCaso,
      estado: 'pendiente',
      prioridad: data.prioridad || 'media',
      
      // Fechas
      fechaCreacion: new Date().toISOString(),
      fechaInicio: data.fechaInicio,
      fechaLimite: data.fechaLimite,
      
      // Asignaciones
      administrador: data.administrador,
      operador: data.operador,
      cliente: data.cliente,
      
      // Presupuesto
      presupuestoEstimado: data.presupuestoEstimado,
      presupuestoEjecutado: 0,
      
      // Progreso
      progreso: 0,
      tareasCompletadas: 0,
      tareasTotales: 0,
      
      // Análisis IA
      analisisIA: data.analisisIA || null,
      recomendacionesIA: [],
      
      // Configuración
      configuracion: {
        notificaciones: true,
        alertasVencimiento: true,
        integracionAPUs: true,
        seguimientoAutomatico: true
      },
      
      // Metadatos
      version: 1,
      ultimaActualizacion: new Date().toISOString()
    };
  }

  /**
   * Estructura de una Tarea
   */
  crearModeloTarea(data) {
    return {
      id: this.generarId(),
      nombre: data.nombre,
      descripcion: data.descripcion,
      tipo: data.tipo || 'general',
      estado: 'pendiente',
      prioridad: data.prioridad || 'media',
      
      // Asignación
      proyecto: data.proyecto,
      asignadoA: data.asignadoA, // operador o cliente
      creadoPor: data.creadoPor,
      
      // Tiempo y Costo
      tiempoEstimado: data.tiempoEstimado, // en horas
      tiempoInvertido: 0,
      costoEstimado: data.costoEstimado,
      costoReal: 0,
      
      // Fechas
      fechaCreacion: new Date().toISOString(),
      fechaAsignacion: data.fechaAsignacion || new Date().toISOString(),
      fechaLimite: data.fechaLimite,
      fechaCompletada: null,
      
      // Dependencias
      dependencias: data.dependencias || [],
      tareasDependientes: [],
      
      // Documentos
      documentosRequeridos: data.documentosRequeridos || [],
      documentosEntregados: [],
      
      // Progreso
      progreso: 0,
      subtareas: [],
      
      // Comunicación
      mensajes: [],
      comentarios: [],
      
      // Metadatos
      version: 1,
      ultimaActualizacion: new Date().toISOString()
    };
  }

  /**
   * Estructura de una Dependencia
   */
  crearDependencia(data) {
    return {
      id: this.generarId(),
      tareaOrigen: data.tareaOrigen,
      tareaDestino: data.tareaDestino,
      tipo: data.tipo, // 'secuencial', 'paralela', 'condicional'
      condicion: data.condicion || null,
      fechaCreacion: new Date().toISOString()
    };
  }

  // ===========================================
  // OPERACIONES CRUD
  // ===========================================

  /**
   * Crear nuevo proyecto
   */
  async crearProyecto(data) {
    try {
      const proyecto = await this.apiService.crear('/proyectos', data);
      
      // Análisis con IA si se proporciona descripción
      if (data.descripcion && data.tipoCaso) {
        proyecto.analisisIA = await this.analizarProyectoConIA(data);
        proyecto.recomendacionesIA = await this.generarRecomendacionesIA(proyecto);
      }
      
      // Crear tareas iniciales basadas en el análisis IA
      if (proyecto.analisisIA) {
        proyecto.tareasIniciales = await this.generarTareasIniciales(proyecto);
      }
      
      // Guardar en base de datos
      const resultado = await this.guardarProyecto(proyecto);
      
      // Notificar cambios
      this.notificarCambios('proyecto_creado', proyecto);
      
      return resultado;
    } catch (error) {
      console.error('Error creando proyecto:', error);
      throw error;
    }
  }

  /**
   * Crear nueva tarea
   */
  async crearTarea(data) {
    try {
      const tarea = await this.apiService.crear('/tareas', data);
      
      // Validar dependencias
      await this.validarDependencias(tarea);
      
      // Guardar en base de datos
      const resultado = await this.guardarTarea(tarea);
      
      // Actualizar proyecto padre
      await this.actualizarProyecto(tarea.proyecto);
      
      // Notificar cambios
      this.notificarCambios('tarea_creada', tarea);
      
      return resultado;
    } catch (error) {
      console.error('Error creando tarea:', error);
      throw error;
    }
  }

  /**
   * Actualizar estado de tarea
   */
  async actualizarEstadoTarea(tareaId, nuevoEstado, datosAdicionales = {}) {
    try {
      const tarea = await this.obtenerTarea(tareaId);
      if (!tarea) throw new Error('Tarea no encontrada');
      
      const estadoAnterior = tarea.estado;
      tarea.estado = nuevoEstado;
      tarea.ultimaActualizacion = new Date().toISOString();
      
      // Actualizar campos específicos según el estado
      switch (nuevoEstado) {
        case 'en_progreso':
          tarea.fechaInicio = tarea.fechaInicio || new Date().toISOString();
          break;
        case 'completada':
          tarea.fechaCompletada = new Date().toISOString();
          tarea.progreso = 100;
          if (datosAdicionales.tiempoReal) {
            tarea.tiempoReal = datosAdicionales.tiempoReal;
          }
          if (datosAdicionales.costoReal) {
            tarea.costoReal = datosAdicionales.costoReal;
          }
          break;
        case 'bloqueada':
          tarea.motivoBloqueo = datosAdicionales.motivo || 'Sin especificar';
          break;
      }
      
      // Guardar cambios
      await this.guardarTarea(tarea);
      
      // Actualizar proyecto padre
      await this.actualizarProyecto(tarea.proyecto);
      
      // Verificar dependencias
      await this.verificarDependencias(tarea);
      
      // Notificar cambios
      this.notificarCambios('tarea_actualizada', {
        tarea,
        estadoAnterior,
        nuevoEstado
      });
      
      return tarea;
    } catch (error) {
      console.error('Error actualizando tarea:', error);
      throw error;
    }
  }

  // ===========================================
  // ANÁLISIS CON IA
  // ===========================================

  /**
   * Analizar proyecto con IA
   */
  async analizarProyectoConIA(data) {
    try {
      const consulta = `
        Analiza este proyecto de ${data.tipoCaso}:
        
        Nombre: ${data.nombre}
        Descripción: ${data.descripcion}
        Presupuesto: ${data.presupuestoEstimado}
        Fecha límite: ${data.fechaLimite}
        
        Proporciona:
        1. Estimación de tiempo recomendado
        2. Lista de tareas principales
        3. Riesgos potenciales
        4. Recursos necesarios
        5. Recomendaciones de cronograma
        6. Estimación de costos por tarea
      `;

      const analisis = await iaService.analisisEspecializado(
        consulta,
        data.tipoCaso,
        'completo',
        {
          nivel_analisis: 'maximo',
          incluir_recomendaciones_avanzadas: true,
          incluir_analisis_critico: true
        }
      );

      return {
        analisis,
        timestamp: new Date().toISOString(),
        confiabilidad: this.calcularConfiabilidad(analisis),
        recomendaciones: this.extraerRecomendaciones(analisis)
      };
    } catch (error) {
      console.error('Error en análisis IA:', error);
      return null;
    }
  }

  /**
   * Generar recomendaciones basadas en IA
   */
  async generarRecomendacionesIA(proyecto) {
    try {
      const consulta = `
        Basándote en este proyecto, genera recomendaciones específicas:
        
        Proyecto: ${proyecto.nombre}
        Tipo: ${proyecto.tipoCaso}
        Presupuesto: ${proyecto.presupuestoEstimado}
        
        Recomienda:
        1. Mejores prácticas para este tipo de proyecto
        2. Optimizaciones de cronograma
        3. Estrategias de mitigación de riesgos
        4. Sugerencias de comunicación con cliente
      `;

      const recomendaciones = await iaService.analisisIntegral(
        consulta,
        proyecto.tipoCaso,
        'recomendaciones',
        { incluir_mejores_practicas: true }
      );

      return recomendaciones;
    } catch (error) {
      console.error('Error generando recomendaciones:', error);
      return [];
    }
  }

  /**
   * Generar tareas iniciales basadas en análisis IA
   */
  async generarTareasIniciales(proyecto) {
    try {
      if (!proyecto.analisisIA) return [];

      const tareasSugeridas = proyecto.analisisIA.recomendaciones?.tareas || [];
      const tareas = [];

      for (const tareaSugerida of tareasSugeridas) {
        const tarea = this.crearTarea({
          nombre: tareaSugerida.nombre,
          descripcion: tareaSugerida.descripcion,
          proyecto: proyecto.id,
          asignadoA: tareaSugerida.asignadoA || proyecto.operador,
          creadoPor: proyecto.administrador,
          tiempoEstimado: tareaSugerida.tiempoEstimado || 8,
          costoEstimado: tareaSugerida.costoEstimado || 1000000,
          fechaLimite: this.calcularFechaLimiteTarea(tareaSugerida, proyecto),
          prioridad: tareaSugerida.prioridad || 'media',
          tipo: tareaSugerida.tipo || 'general'
        });

        tareas.push(tarea);
      }

      return tareas;
    } catch (error) {
      console.error('Error generando tareas iniciales:', error);
      return [];
    }
  }

  // ===========================================
  // GESTIÓN DE DEPENDENCIAS
  // ===========================================

  /**
   * Validar dependencias de una tarea
   */
  async validarDependencias(tarea) {
    try {
      if (!tarea.dependencias || tarea.dependencias.length === 0) return;

      for (const dependenciaId of tarea.dependencias) {
        const dependencia = await this.obtenerDependencia(dependenciaId);
        if (!dependencia) {
          throw new Error(`Dependencia ${dependenciaId} no encontrada`);
        }

        const tareaOrigen = await this.obtenerTarea(dependencia.tareaOrigen);
        if (!tareaOrigen) {
          throw new Error(`Tarea origen ${dependencia.tareaOrigen} no encontrada`);
        }

        // Verificar que la tarea origen esté completada
        if (tareaOrigen.estado !== 'completada') {
          throw new Error(`La tarea origen "${tareaOrigen.nombre}" debe estar completada`);
        }
      }
    } catch (error) {
      console.error('Error validando dependencias:', error);
      throw error;
    }
  }

  /**
   * Verificar dependencias cuando una tarea cambia de estado
   */
  async verificarDependencias(tarea) {
    try {
      if (tarea.estado === 'completada') {
        // Buscar tareas que dependen de esta
        const tareasDependientes = await this.obtenerTareasDependientes(tarea.id);
        
        for (const tareaDependiente of tareasDependientes) {
          // Verificar si todas las dependencias están completadas
          const todasCompletadas = await this.verificarTodasDependencias(tareaDependiente);
          
          if (todasCompletadas && tareaDependiente.estado === 'bloqueada') {
            // Desbloquear tarea
            await this.actualizarEstadoTarea(tareaDependiente.id, 'pendiente');
          }
        }
      }
    } catch (error) {
      console.error('Error verificando dependencias:', error);
    }
  }

  // ===========================================
  // INTEGRACIÓN CON APUs Y COTIZACIONES
  // ===========================================

  /**
   * Calcular presupuesto basado en APUs
   */
  async calcularPresupuestoConAPUs(tareas, tipoProyecto) {
    try {
      // Simular consulta a APUs
      const apus = await this.obtenerAPUs(tipoProyecto);
      
      let presupuestoTotal = 0;
      const desglose = [];

      for (const tarea of tareas) {
        const apu = apus.find(a => a.tipo === tarea.tipo);
        if (apu) {
          const costo = tarea.tiempoEstimado * apu.costoPorHora;
          presupuestoTotal += costo;
          
          desglose.push({
            tarea: tarea.nombre,
            tiempo: tarea.tiempoEstimado,
            costoPorHora: apu.costoPorHora,
            costoTotal: costo
          });
        }
      }

      return {
        presupuestoTotal,
        desglose,
        apusUtilizados: apus.length,
        fechaCalculo: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error calculando presupuesto:', error);
      throw error;
    }
  }

  /**
   * Generar cotización general
   */
  async generarCotizacion(proyecto) {
    try {
      const tareas = await this.obtenerTareasProyecto(proyecto.id);
      const presupuesto = await this.calcularPresupuestoConAPUs(tareas, proyecto.tipoCaso);
      
      const cotizacion = {
        id: this.generarId(),
        proyecto: proyecto.id,
        fechaGeneracion: new Date().toISOString(),
        validez: 30, // días
        presupuesto,
        desglose: presupuesto.desglose,
        condiciones: this.generarCondicionesCotizacion(proyecto),
        total: presupuesto.presupuestoTotal,
        estado: 'pendiente'
      };

      return cotizacion;
    } catch (error) {
      console.error('Error generando cotización:', error);
      throw error;
    }
  }

  // ===========================================
  // UTILIDADES
  // ===========================================

  generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  calcularFechaLimiteTarea(tareaSugerida, proyecto) {
    const fechaInicio = new Date(proyecto.fechaInicio);
    const diasAdicionales = tareaSugerida.diasDesdeInicio || 0;
    fechaInicio.setDate(fechaInicio.getDate() + diasAdicionales);
    return fechaInicio.toISOString().split('T')[0];
  }

  calcularConfiabilidad(analisis) {
    // Lógica para calcular confiabilidad del análisis IA
    return Math.min(95, Math.max(60, Math.random() * 40 + 60));
  }

  extraerRecomendaciones(analisis) {
    // Extraer recomendaciones específicas del análisis
    return analisis.recomendaciones || [];
  }

  generarCondicionesCotizacion(proyecto) {
    return [
      'Precios válidos por 30 días',
      'Incluye análisis y seguimiento con IA',
      'Pagos según cronograma acordado',
      'Modificaciones requieren aprobación previa'
    ];
  }

  // ===========================================
  // OPERACIONES DE BASE DE DATOS (SIMULADAS)
  // ===========================================

  async guardarProyecto(proyecto) {
    // Simular guardado en base de datos
    this.cache.set(`proyecto_${proyecto.id}`, proyecto);
    return proyecto;
  }

  async guardarTarea(tarea) {
    // Simular guardado en base de datos
    this.cache.set(`tarea_${tarea.id}`, tarea);
    return tarea;
  }

  async obtenerProyecto(id) {
    return this.cache.get(`proyecto_${id}`) || null;
  }

  async obtenerTarea(id) {
    return this.cache.get(`tarea_${id}`) || null;
  }

  async obtenerTareasProyecto(proyectoId) {
    // Simular consulta de tareas por proyecto
    return Array.from(this.cache.values())
      .filter(item => item.proyecto === proyectoId && item.id.startsWith('tarea_'));
  }

  async actualizarProyecto(proyectoId) {
    const proyecto = await this.obtenerProyecto(proyectoId);
    if (proyecto) {
      const tareas = await this.obtenerTareasProyecto(proyectoId);
      proyecto.tareasTotales = tareas.length;
      proyecto.tareasCompletadas = tareas.filter(t => t.estado === 'completada').length;
      proyecto.progreso = proyecto.tareasTotales > 0 ? 
        (proyecto.tareasCompletadas / proyecto.tareasTotales) * 100 : 0;
      
      await this.guardarProyecto(proyecto);
    }
  }

  // ===========================================
  // SISTEMA DE NOTIFICACIONES
  // ===========================================

  suscribirCambios(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notificarCambios(tipo, datos) {
    this.listeners.forEach(callback => {
      try {
        callback(tipo, datos);
      } catch (error) {
        console.error('Error en listener:', error);
      }
    });
  }
}

// Crear instancia única del servicio
const gestionProyectosService = new GestionProyectosService();

export default gestionProyectosService;
