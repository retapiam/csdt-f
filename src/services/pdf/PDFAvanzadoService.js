/**
 * SERVICIO DE PDF AVANZADO - CSDT
 * Generación de PDFs con jsPDF y autoTable, integración con IA
 */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

class PDFAvanzadoService {
  constructor() {
    this.version = '3.0.0';
    this.plantillas = this.inicializarPlantillas();
    this.estilos = this.inicializarEstilos();
    this.historialGeneracion = [];
    this.metricasGeneracion = new Map();
  }

  /**
   * Inicializar plantillas de documentos
   */
  inicializarPlantillas() {
    return {
      'analisis_juridico': {
        nombre: 'Análisis Jurídico con IA',
        descripcion: 'Plantilla para análisis jurídicos completos con resultados de IA',
        campos_requeridos: ['titulo', 'hechos', 'analisis_ia', 'conclusiones', 'recomendaciones'],
        estructura: 'completa',
        incluir_ia: true
      },
      'consejo_ia': {
        nombre: 'Consejo de Inteligencia Artificial',
        descripcion: 'Plantilla para documentos generados por el Consejo IA',
        campos_requeridos: ['titulo', 'narracion', 'resultados_ia', 'recomendaciones'],
        estructura: 'consejo_ia',
        incluir_ia: true
      },
      'accion_tutela': {
        nombre: 'Acción de Tutela',
        descripcion: 'Plantilla para acciones de tutela',
        campos_requeridos: ['demandante', 'demandado', 'hechos', 'fundamentos', 'pretensiones'],
        estructura: 'tutela',
        incluir_ia: false
      },
      'accion_cumplimiento': {
        nombre: 'Acción de Cumplimiento',
        descripcion: 'Plantilla para acciones de cumplimiento',
        campos_requeridos: ['demandante', 'demandado', 'norma_violada', 'hechos', 'pretensiones'],
        estructura: 'cumplimiento',
        incluir_ia: false
      },
      'informe_veeduria': {
        nombre: 'Informe de Veeduría',
        descripcion: 'Plantilla para informes de veeduría ciudadana',
        campos_requeridos: ['veeduria', 'objeto', 'hallazgos', 'recomendaciones', 'seguimiento'],
        estructura: 'veeduria',
        incluir_ia: true
      },
      'resumen_ejecutivo': {
        nombre: 'Resumen Ejecutivo',
        descripcion: 'Plantilla para resúmenes ejecutivos',
        campos_requeridos: ['titulo', 'resumen', 'puntos_clave', 'recomendaciones'],
        estructura: 'resumen',
        incluir_ia: false
      }
    };
  }

  /**
   * Inicializar estilos de documentos
   */
  inicializarEstilos() {
    return {
      'oficial': {
        nombre: 'Estilo Oficial',
        fuente: 'helvetica',
        tamaño_fuente: 12,
        interlineado: 1.5,
        margenes: { superior: 20, inferior: 20, izquierdo: 20, derecho: 20 },
        colores: {
          titulo: '#1a365d',
          subtitulo: '#2d3748',
          texto: '#2d3748',
          destacado: '#3182ce'
        }
      },
      'moderno': {
        nombre: 'Estilo Moderno',
        fuente: 'helvetica',
        tamaño_fuente: 11,
        interlineado: 1.4,
        margenes: { superior: 15, inferior: 15, izquierdo: 15, derecho: 15 },
        colores: {
          titulo: '#2d3748',
          subtitulo: '#4a5568',
          texto: '#2d3748',
          destacado: '#4299e1'
        }
      },
      'minimalista': {
        nombre: 'Estilo Minimalista',
        fuente: 'helvetica',
        tamaño_fuente: 10,
        interlineado: 1.3,
        margenes: { superior: 15, inferior: 15, izquierdo: 15, derecho: 15 },
        colores: {
          titulo: '#1a202c',
          subtitulo: '#2d3748',
          texto: '#2d3748',
          destacado: '#667eea'
        }
      }
    };
  }

  /**
   * Generar PDF avanzado con jsPDF y autoTable
   */
  async generarPDFAvanzado(datos, configuracion = {}) {
    const idGeneracion = this.generarIdGeneracion();
    const inicioGeneracion = Date.now();
    
    try {
      // 1. Validar datos
      this.validarDatos(datos);
      
      // 2. Configurar generación
      const config = this.configurarGeneracion(configuracion);
      
      // 3. Crear documento PDF
      const doc = this.crearDocumento(config);
      
      // 4. Agregar encabezado
      this.agregarEncabezado(doc, datos, config);
      
      // 5. Agregar contenido según plantilla
      await this.agregarContenido(doc, datos, config);
      
      // 6. Agregar pie de página
      this.agregarPiePagina(doc, config);
      
      // 7. Generar metadatos
      const metadatos = this.generarMetadatos(datos, config, Date.now() - inicioGeneracion);
      
      // 8. Crear respuesta
      const respuesta = {
        id: idGeneracion,
        timestamp: new Date().toISOString(),
        version: this.version,
        estado: 'completado',
        archivo: {
          nombre: this.generarNombreArchivo(datos, config),
          documento: doc,
          tamanio: this.estimarTamano(doc),
          metadatos
        },
        configuracion: config,
        tiempo_generacion: Date.now() - inicioGeneracion
      };
      
      // 9. Guardar en historial
      this.guardarEnHistorial(respuesta);
      
      return respuesta;
      
    } catch (error) {
      console.error('Error generando PDF:', error);
      return this.generarRespuestaError(idGeneracion, error);
    }
  }

  /**
   * Crear documento PDF con configuración
   */
  crearDocumento(config) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const estilo = this.estilos[config.estilo];
    
    // Configurar fuente y márgenes
    doc.setFont(estilo.fuente);
    doc.setFontSize(estilo.tamaño_fuente);
    
    // Configurar colores
    doc.setTextColor(estilo.colores.texto);
    
    return doc;
  }

  /**
   * Agregar encabezado al documento
   */
  agregarEncabezado(doc, datos, config) {
    const estilo = this.estilos[config.estilo];
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Logo/Emoji del CSDT
    if (config.incluir_logo) {
      doc.setFontSize(16);
      doc.setTextColor(estilo.colores.titulo);
      doc.text('🏛️ CSDT', 20, 30);
    }
    
    // Título principal
    doc.setFontSize(18);
    doc.setTextColor(estilo.colores.titulo);
    const titulo = datos.titulo || 'Documento CSDT';
    const tituloWidth = doc.getTextWidth(titulo);
    doc.text(titulo, (pageWidth - tituloWidth) / 2, 40);
    
    // Subtítulo
    const plantilla = this.plantillas[config.plantilla];
    doc.setFontSize(14);
    doc.setTextColor(estilo.colores.subtitulo);
    const subtituloWidth = doc.getTextWidth(plantilla.nombre);
    doc.text(plantilla.nombre, (pageWidth - subtituloWidth) / 2, 50);
    
    // Línea decorativa
    doc.setDrawColor(estilo.colores.destacado);
    doc.setLineWidth(1);
    doc.line(20, 60, pageWidth - 20, 60);
    
    // Información del documento
    doc.setFontSize(10);
    doc.setTextColor(estilo.colores.texto);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, pageWidth - 50, 30);
    doc.text(`Versión: ${this.version}`, pageWidth - 50, 35);
    
    return 70; // Y position para continuar
  }

  /**
   * Agregar contenido según plantilla
   */
  async agregarContenido(doc, datos, config) {
    const plantilla = this.plantillas[config.plantilla];
    let yPosition = 70;
    
    switch (plantilla.estructura) {
      case 'completa':
        yPosition = await this.agregarContenidoCompleto(doc, datos, config, yPosition);
        break;
      case 'consejo_ia':
        yPosition = await this.agregarContenidoConsejoIA(doc, datos, config, yPosition);
        break;
      case 'tutela':
        yPosition = this.agregarContenidoTutela(doc, datos, config, yPosition);
        break;
      case 'cumplimiento':
        yPosition = this.agregarContenidoCumplimiento(doc, datos, config, yPosition);
        break;
      case 'veeduria':
        yPosition = await this.agregarContenidoVeeduria(doc, datos, config, yPosition);
        break;
      case 'resumen':
        yPosition = this.agregarContenidoResumen(doc, datos, config, yPosition);
        break;
      default:
        yPosition = this.agregarContenidoGenerico(doc, datos, config, yPosition);
    }
    
    return yPosition;
  }

  /**
   * Agregar contenido completo (análisis jurídico)
   */
  async agregarContenidoCompleto(doc, datos, config, yPosition) {
    const estilo = this.estilos[config.estilo];
    
    // 1. HECHOS
    yPosition = this.agregarSeccion(doc, '1. HECHOS', datos.hechos || 'No se proporcionaron hechos específicos.', yPosition);
    
    // 2. ANÁLISIS DE IA (si está disponible)
    if (datos.analisis_ia && datos.analisis_ia.length > 0) {
      yPosition = await this.agregarSeccionIA(doc, '2. ANÁLISIS DE INTELIGENCIA ARTIFICIAL', datos.analisis_ia, yPosition);
    }
    
    // 3. ANÁLISIS JURÍDICO
    yPosition = this.agregarSeccion(doc, '3. ANÁLISIS JURÍDICO', datos.analisis || 'Análisis jurídico no disponible.', yPosition);
    
    // 4. NORMATIVA APLICABLE
    if (datos.normativa && datos.normativa.length > 0) {
      yPosition = this.agregarLista(doc, '4. NORMATIVA APLICABLE', datos.normativa, yPosition);
    }
    
    // 5. JURISPRUDENCIA
    if (datos.jurisprudencia && datos.jurisprudencia.length > 0) {
      yPosition = this.agregarLista(doc, '5. JURISPRUDENCIA', datos.jurisprudencia, yPosition);
    }
    
    // 6. CONCLUSIONES
    yPosition = this.agregarSeccion(doc, '6. CONCLUSIONES', datos.conclusiones || 'Conclusiones no disponibles.', yPosition);
    
    // 7. RECOMENDACIONES
    if (datos.recomendaciones && datos.recomendaciones.length > 0) {
      yPosition = this.agregarLista(doc, '7. RECOMENDACIONES', datos.recomendaciones, yPosition);
    }
    
    return yPosition;
  }

  /**
   * Agregar contenido del Consejo IA
   */
  async agregarContenidoConsejoIA(doc, datos, config, yPosition) {
    const estilo = this.estilos[config.estilo];
    
    // 1. DATOS DEL SOLICITANTE
    if (datos.solicitante) {
      yPosition = this.agregarSeccionDatosPersona(doc, '1. DATOS DEL SOLICITANTE', datos.solicitante, yPosition);
    }
    
    // 2. UBICACIÓN
    if (datos.ubicacion) {
      yPosition = this.agregarSeccionUbicacion(doc, '2. UBICACIÓN DEL HECHO', datos.ubicacion, yPosition);
    }
    
    // 3. NARRACIÓN DE HECHOS
    yPosition = this.agregarSeccion(doc, '3. NARRACIÓN DE HECHOS', datos.narracion || 'No se proporcionó narración.', yPosition);
    
    // 4. RESULTADOS DE IA
    if (datos.resultados_ia && datos.resultados_ia.length > 0) {
      yPosition = await this.agregarSeccionIA(doc, '4. CONSEJO DE INTELIGENCIA ARTIFICIAL', datos.resultados_ia, yPosition);
    }
    
    // 5. RECOMENDACIONES
    if (datos.recomendaciones && datos.recomendaciones.length > 0) {
      yPosition = this.agregarLista(doc, '5. RECOMENDACIONES', datos.recomendaciones, yPosition);
    }
    
    return yPosition;
  }

  /**
   * Agregar sección de IA con tabla mejorada
   */
  async agregarSeccionIA(doc, titulo, resultadosIA, yPosition) {
    const estilo = this.estilos['oficial']; // Usar estilo oficial para IA
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 100) {
      doc.addPage();
      yPosition = 30;
    }
    
    // Título de la sección con icono
    doc.setFontSize(14);
    doc.setTextColor(estilo.colores.titulo);
    doc.setFont(estilo.fuente, 'bold');
    doc.text('🤖 ' + titulo, 20, yPosition);
    yPosition += 15;
    
    // Crear tabla mejorada con resultados de IA
    const tableData = resultadosIA.map(resultado => [
      resultado.ai_provider || resultado.provider_name || 'IA',
      resultado.confidence_score ? `${(resultado.confidence_score * 100).toFixed(1)}%` : 'N/A',
      resultado.classifications?.[0]?.category || 'Análisis General',
      resultado.summary ? resultado.summary.substring(0, 80) + '...' : 'Sin resumen',
      resultado.timestamp ? new Date(resultado.timestamp).toLocaleDateString('es-CO') : 'N/A'
    ]);
    
    autoTable(doc, {
      head: [['Proveedor IA', 'Confianza', 'Categoría', 'Resumen', 'Fecha']],
      body: tableData,
      startY: yPosition,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        halign: 'left'
      },
      headStyles: {
        fillColor: [59, 130, 246], // Blue
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251] // Gray-50
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Proveedor
        1: { cellWidth: 15, halign: 'center' }, // Confianza
        2: { cellWidth: 30 }, // Categoría
        3: { cellWidth: 60 }, // Resumen
        4: { cellWidth: 20, halign: 'center' } // Fecha
      },
      margin: { left: 20, right: 20 }
    });
    
    yPosition = doc.lastAutoTable.finalY + 15;
    
    // Agregar detalles mejorados de cada IA
    resultadosIA.forEach((resultado, index) => {
      if (yPosition > pageHeight - 100) {
        doc.addPage();
        yPosition = 30;
      }
      
      // Título del proveedor con icono
      doc.setFontSize(12);
      doc.setTextColor(estilo.colores.subtitulo);
      doc.setFont(estilo.fuente, 'bold');
      const icono = this.obtenerIconoProveedor(resultado.ai_provider);
      doc.text(`${icono} ${index + 1}. ${resultado.provider_name || resultado.ai_provider}`, 20, yPosition);
      yPosition += 12;
      
      // Clasificaciones mejoradas
      if (resultado.classifications && resultado.classifications.length > 0) {
        doc.setFontSize(10);
        doc.setTextColor(estilo.colores.destacado);
        doc.setFont(estilo.fuente, 'bold');
        doc.text('📋 Clasificaciones:', 25, yPosition);
        yPosition += 8;
        
        resultado.classifications.forEach((clasificacion, idx) => {
          if (yPosition > pageHeight - 50) {
            doc.addPage();
            yPosition = 30;
          }
          
          doc.setFontSize(9);
          doc.setTextColor(estilo.colores.texto);
          doc.setFont(estilo.fuente, 'normal');
          
          // Barra de confianza visual
          const confianza = clasificacion.confidence || 0;
          const barraAncho = 40;
          const barraLlena = (confianza * barraAncho) / 100;
          
          doc.text(`• ${clasificacion.category}`, 30, yPosition);
          doc.text(`${(confianza * 100).toFixed(1)}%`, 120, yPosition);
          
          // Dibujar barra de confianza
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.5);
          doc.rect(140, yPosition - 3, barraAncho, 6);
          
          doc.setDrawColor(59, 130, 246);
          doc.setFillColor(59, 130, 246);
          doc.rect(140, yPosition - 3, barraLlena, 6, 'F');
          
          yPosition += 10;
          
          // Fundamentos legales
          if (clasificacion.legal_basis) {
            doc.setFontSize(8);
            doc.setTextColor(estilo.colores.texto);
            doc.setFont(estilo.fuente, 'italic');
            doc.text(`   📖 ${clasificacion.legal_basis}`, 35, yPosition);
            yPosition += 6;
          }
        });
        
        yPosition += 5;
      }
      
      // Recomendaciones mejoradas
      if (resultado.recommendations && resultado.recommendations.length > 0) {
        doc.setFontSize(10);
        doc.setTextColor(estilo.colores.destacado);
        doc.setFont(estilo.fuente, 'bold');
        doc.text('💡 Recomendaciones:', 25, yPosition);
        yPosition += 8;
        
        resultado.recommendations.slice(0, 4).forEach((rec, idx) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 30;
          }
          
          doc.setFontSize(9);
          doc.setTextColor(estilo.colores.texto);
          doc.setFont(estilo.fuente, 'normal');
          doc.text(`  ${idx + 1}. ${rec.action || rec}`, 30, yPosition);
          yPosition += 6;
        });
        
        yPosition += 5;
      }
      
      // Análisis de riesgo si está disponible
      if (resultado.risk_assessment) {
        doc.setFontSize(10);
        doc.setTextColor(estilo.colores.destacado);
        doc.setFont(estilo.fuente, 'bold');
        doc.text('⚠️ Evaluación de Riesgo:', 25, yPosition);
        yPosition += 8;
        
        const nivelRiesgo = resultado.risk_assessment.level;
        const colorRiesgo = nivelRiesgo === 'alto' ? [220, 38, 38] : 
                           nivelRiesgo === 'medio' ? [245, 158, 11] : [34, 197, 94];
        
        doc.setFontSize(9);
        doc.setTextColor(colorRiesgo);
        doc.setFont(estilo.fuente, 'bold');
        doc.text(`Nivel: ${nivelRiesgo.toUpperCase()}`, 30, yPosition);
        yPosition += 6;
        
        if (resultado.risk_assessment.factors) {
          doc.setTextColor(estilo.colores.texto);
          doc.setFont(estilo.fuente, 'normal');
          resultado.risk_assessment.factors.slice(0, 2).forEach(factor => {
            doc.text(`• ${factor}`, 35, yPosition);
            yPosition += 5;
          });
        }
        
        yPosition += 5;
      }
      
      yPosition += 10;
    });
    
    return yPosition;
  }

  /**
   * Obtener icono del proveedor de IA
   */
  obtenerIconoProveedor(providerId) {
    const iconos = {
      'lexisnexis': '⚖️',
      'legal_ai_library': '📚',
      'territorial_ai': '🗺️',
      'veeduria_ai': '👁️',
      'constitutional_ai': '👑'
    };
    return iconos[providerId] || '🤖';
  }

  /**
   * Agregar sección genérica
   */
  agregarSeccion(doc, titulo, contenido, yPosition) {
    const estilo = this.estilos['oficial'];
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 30;
    }
    
    // Título de la sección
    doc.setFontSize(14);
    doc.setTextColor(estilo.colores.titulo);
    doc.setFont(estilo.fuente, 'bold');
    doc.text(titulo, 20, yPosition);
    yPosition += 10;
    
    // Contenido
    doc.setFontSize(estilo.tamaño_fuente);
    doc.setTextColor(estilo.colores.texto);
    doc.setFont(estilo.fuente, 'normal');
    
    const lines = doc.splitTextToSize(contenido, doc.internal.pageSize.getWidth() - 40);
    doc.text(lines, 20, yPosition);
    yPosition += lines.length * (estilo.interlineado * 4) + 15;
    
    return yPosition;
  }

  /**
   * Agregar lista
   */
  agregarLista(doc, titulo, items, yPosition) {
    const estilo = this.estilos['oficial'];
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 30;
    }
    
    // Título de la sección
    doc.setFontSize(14);
    doc.setTextColor(estilo.colores.titulo);
    doc.setFont(estilo.fuente, 'bold');
    doc.text(titulo, 20, yPosition);
    yPosition += 15;
    
    // Items de la lista
    doc.setFontSize(estilo.tamaño_fuente);
    doc.setTextColor(estilo.colores.texto);
    doc.setFont(estilo.fuente, 'normal');
    
    items.forEach((item, index) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 30;
      }
      
      doc.text(`${index + 1}. ${item}`, 25, yPosition);
      yPosition += 8;
    });
    
    yPosition += 10;
    
    return yPosition;
  }

  /**
   * Agregar datos de persona
   */
  agregarSeccionDatosPersona(doc, titulo, persona, yPosition) {
    const estilo = this.estilos['oficial'];
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 30;
    }
    
    // Título de la sección
    doc.setFontSize(14);
    doc.setTextColor(estilo.colores.titulo);
    doc.setFont(estilo.fuente, 'bold');
    doc.text(titulo, 20, yPosition);
    yPosition += 15;
    
    // Datos de la persona
    doc.setFontSize(estilo.tamaño_fuente);
    doc.setTextColor(estilo.colores.texto);
    doc.setFont(estilo.fuente, 'normal');
    
    const datosPersona = [
      `Nombre: ${persona.nombre || 'No especificado'}`,
      `Documento: ${persona.documento || 'No especificado'}`,
      `Dirección: ${persona.direccion || 'No especificada'}`,
      `Teléfono: ${persona.telefono || 'No especificado'}`,
      `Email: ${persona.email || 'No especificado'}`
    ];
    
    datosPersona.forEach(dato => {
      doc.text(dato, 25, yPosition);
      yPosition += 8;
    });
    
    yPosition += 10;
    
    return yPosition;
  }

  /**
   * Agregar ubicación
   */
  agregarSeccionUbicacion(doc, titulo, ubicacion, yPosition) {
    const estilo = this.estilos['oficial'];
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Verificar si necesitamos nueva página
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 30;
    }
    
    // Título de la sección
    doc.setFontSize(14);
    doc.setTextColor(estilo.colores.titulo);
    doc.setFont(estilo.fuente, 'bold');
    doc.text(titulo, 20, yPosition);
    yPosition += 15;
    
    // Datos de ubicación
    doc.setFontSize(estilo.tamaño_fuente);
    doc.setTextColor(estilo.colores.texto);
    doc.setFont(estilo.fuente, 'normal');
    
    const datosUbicacion = [
      `Municipio: ${ubicacion.municipio || 'No especificado'}`,
      `Departamento: ${ubicacion.departamento || 'No especificado'}`,
      `País: ${ubicacion.pais || 'No especificado'}`,
      `Fecha: ${ubicacion.fecha || 'No especificada'}`,
      `Código: ${ubicacion.codigo || 'No generado'}`
    ];
    
    datosUbicacion.forEach(dato => {
      doc.text(dato, 25, yPosition);
      yPosition += 8;
    });
    
    yPosition += 10;
    
    return yPosition;
  }

  /**
   * Agregar pie de página
   */
  agregarPiePagina(doc, config) {
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const estilo = this.estilos[config.estilo];
    
    // Línea separadora
    doc.setDrawColor(estilo.colores.destacado);
    doc.setLineWidth(0.5);
    doc.line(20, pageHeight - 30, pageWidth - 20, pageHeight - 30);
    
    // Texto del pie de página
    doc.setFontSize(9);
    doc.setTextColor(estilo.colores.texto);
    doc.setFont(estilo.fuente, 'normal');
    
    const pieTexto = 'Documento generado por el Sistema CSDT - Consejo Social de Veeduría y Desarrollo Territorial';
    const pieWidth = doc.getTextWidth(pieTexto);
    doc.text(pieTexto, (pageWidth - pieWidth) / 2, pageHeight - 20);
    
    // Fecha y hora
    const fechaHora = `${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO')}`;
    const fechaWidth = doc.getTextWidth(fechaHora);
    doc.text(fechaHora, (pageWidth - fechaWidth) / 2, pageHeight - 15);
    
    // Número de página
    const pageNumber = `Página ${doc.internal.getNumberOfPages()}`;
    doc.text(pageNumber, pageWidth - 50, pageHeight - 15);
  }

  /**
   * Métodos auxiliares
   */
  configurarGeneracion(configuracion) {
    return {
      plantilla: configuracion.plantilla || 'analisis_juridico',
      estilo: configuracion.estilo || 'oficial',
      incluir_logo: configuracion.incluir_logo !== false,
      incluir_pie_pagina: configuracion.incluir_pie_pagina !== false,
      incluir_numero_pagina: configuracion.incluir_numero_pagina !== false,
      incluir_fecha: configuracion.incluir_fecha !== false,
      idioma: configuracion.idioma || 'es'
    };
  }

  validarDatos(datos) {
    if (!datos) {
      throw new Error('Los datos del documento son requeridos');
    }
    
    if (!datos.titulo && !datos.hechos && !datos.narracion) {
      throw new Error('Se requiere al menos un título, hechos o narración para generar el documento');
    }
  }

  generarNombreArchivo(datos, config) {
    const fecha = new Date().toISOString().split('T')[0];
    const titulo = (datos.titulo || 'documento').replace(/[^a-zA-Z0-9]/g, '_');
    return `${titulo}_${config.plantilla}_${fecha}.pdf`;
  }

  estimarTamano(doc) {
    // Estimación básica del tamaño del PDF
    return doc.output('arraybuffer').byteLength;
  }

  generarMetadatos(datos, config, tiempoGeneracion) {
    return {
      version: this.version,
      plantilla: config.plantilla,
      estilo: config.estilo,
      tiempo_generacion: tiempoGeneracion,
      tamanio_estimado: this.estimarTamano(datos),
      campos_incluidos: Object.keys(datos),
      configuracion: config,
      timestamp: new Date().toISOString()
    };
  }

  generarIdGeneracion() {
    return `pdf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  guardarEnHistorial(respuesta) {
    this.historialGeneracion.push(respuesta);
    if (this.historialGeneracion.length > 100) {
      this.historialGeneracion.shift();
    }
  }

  generarRespuestaError(id, error) {
    return {
      id,
      timestamp: new Date().toISOString(),
      version: this.version,
      estado: 'error',
      error: {
        mensaje: error.message,
        codigo: error.code || 'PDF_ERROR',
        detalles: error.stack
      },
      archivo: null,
      configuracion: null
    };
  }

  /**
   * Métodos públicos para acceso externo
   */
  obtenerEstadisticas() {
    return {
      version: this.version,
      total_generaciones: this.historialGeneracion.length,
      plantillas_disponibles: Object.keys(this.plantillas),
      estilos_disponibles: Object.keys(this.estilos)
    };
  }

  obtenerHistorial(filtros = {}) {
    let historial = [...this.historialGeneracion];
    
    if (filtros.fecha_desde) {
      historial = historial.filter(h => new Date(h.timestamp) >= new Date(filtros.fecha_desde));
    }
    
    if (filtros.fecha_hasta) {
      historial = historial.filter(h => new Date(h.timestamp) <= new Date(filtros.fecha_hasta));
    }
    
    if (filtros.estado) {
      historial = historial.filter(h => h.estado === filtros.estado);
    }
    
    if (filtros.plantilla) {
      historial = historial.filter(h => h.configuracion?.plantilla === filtros.plantilla);
    }
    
    return historial.slice(-filtros.limite || 50);
  }

  limpiarHistorial() {
    this.historialGeneracion = [];
  }
}

// Crear instancia singleton
const pdfAvanzadoService = new PDFAvanzadoService();

export default pdfAvanzadoService;
