import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { useEstadisticasGenerales } from '../../../hooks/useEstadisticas';
import { useDependencia } from '../../../hooks/useDependencia';
import { 
  Brain, 
  User, 
  MapPin, 
  FileText, 
  Mic, 
  MicOff, 
  Download, 
  Play,
  Pause,
  Square,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Gavel,
  Shield,
  Lightbulb,
  Target,
  Zap,
  Eye,
  Home
} from 'lucide-react';

const ConsejoIA = () => {
  const navigate = useNavigate();
  const [tipoConsulta, setTipoConsulta] = useState('general'); // 'general' | 'veeduria'
  
  const [datosCliente, setDatosCliente] = useState({
    tipo: '',
    nombre: '',
    telefono: '',
    email: '',
    identificacion: ''
  });

  const [datosUbicacion, setDatosUbicacion] = useState({
    municipio: '',
    departamento: '',
    pais: 'Colombia',
    coordenadas: '',
    codigoGenerado: ''
  });

  const [narracion, setNarracion] = useState({
    texto: '',
    timestamp: null,
    version: 1
  });

  const [consejoIA, setConsejoIA] = useState({
    cargando: false,
    resultado: null,
    error: null
  });

  const [grabando, setGrabando] = useState(false);
  const [archivoAudio, setArchivoAudio] = useState(null);

  // Hook para gestión de dependencias
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const tiposCliente = [
    { value: 'persona-natural', label: 'Persona Natural' },
    { value: 'persona-juridica', label: 'Persona Jurídica' },
    { value: 'comunidad-etnica', label: 'Comunidad Étnica' },
    { value: 'organizacion-social', label: 'Organización Social' }
  ];

  const departamentos = [
    'Antioquia', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas',
    'Caquetá', 'Cauca', 'Cesar', 'Córdoba', 'Cundinamarca', 'Chocó',
    'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander',
    'Quindío', 'Risaralda', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
    'Vaupés', 'Vichada'
  ];

  const generarCodigo = () => {
    const fecha = new Date();
    const codigo = `${datosUbicacion.municipio?.substring(0, 3).toUpperCase() || 'CSD'}-${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setDatosUbicacion(prev => ({ ...prev, codigoGenerado: codigo }));
  };

  const startRecording = () => {
    setGrabando(true);
    // Simular grabación
    setTimeout(() => {
      setGrabando(false);
      setArchivoAudio({
        nombre: `audio_${Date.now()}.wav`,
        duracion: '00:00:15',
        tamaño: '2.3 MB'
      });
    }, 3000);
  };

  const stopRecording = () => {
    setGrabando(false);
  };

  const transcribirAudio = async () => {
    if (!archivoAudio) return;
    
    setConsejoIA(prev => ({ ...prev, cargando: true }));
    
    try {
      // Simular transcripción
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const textoTranscrito = `Transcripción del audio: "Solicito asesoría sobre un caso de violación de derechos territoriales en mi comunidad. Hemos sido afectados por un proyecto minero que no respetó el proceso de consulta previa. Necesitamos orientación sobre las acciones legales que podemos tomar para proteger nuestros derechos ancestrales."`;
      
      setNarracion(prev => ({
        ...prev,
        texto: textoTranscrito,
        timestamp: new Date().toISOString(),
        version: prev.version + 1
      }));
      
      setConsejoIA(prev => ({ ...prev, cargando: false }));
    } catch (error) {
      setConsejoIA(prev => ({ 
        ...prev, 
        cargando: false, 
        error: 'Error en la transcripción del audio' 
      }));
    }
  };

  const consultarIA = async () => {
    if (!narracion.texto.trim()) {
      setConsejoIA(prev => ({ 
        ...prev, 
        error: 'Por favor, ingrese una narración de los hechos' 
      }));
      return;
    }

    setConsejoIA(prev => ({ ...prev, cargando: true, error: null }));

    try {
      let resultado;

      if (tipoConsulta === 'veeduria') {
        // Análisis especializado para Veeduría Ciudadana
        const [analisisTransparencia, analisisContratacion, analisisPresupuesto, analisisCronograma, analisisParticipacion] = await Promise.all([
          // Simular análisis de transparencia
          new Promise(resolve => setTimeout(() => resolve(`
            ANÁLISIS DE TRANSPARENCIA Y ACCESO A INFORMACIÓN
            
            La entidad ${datosUbicacion.municipio || 'la entidad mencionada'} debe garantizar:
            
            1. PUBLICACIÓN DE INFORMACIÓN:
            - Portal de transparencia actualizado
            - Información presupuestal detallada
            - Cronogramas de ejecución públicos
            - Informes de avance periódicos
            
            2. MECANISMOS DE PARTICIPACIÓN:
            - Audiencias públicas programadas
            - Canales de comunicación con la comunidad
            - Sistema de quejas y sugerencias
            - Rendición de cuentas transparente
            
            3. ACCESO A DOCUMENTOS:
            - Contratos y modificaciones
            - Estudios técnicos y de impacto
            - Actas de comités de seguimiento
            - Informes de supervisión
          `), 2000)),
          
          // Simular análisis de contratación
          new Promise(resolve => setTimeout(() => resolve(`
            ANÁLISIS DE CONTRATACIÓN PÚBLICA
            
            Para el proyecto "${narracion.texto.substring(0, 50)}...":
            
            1. PROCESO DE SELECCIÓN:
            - Verificar cumplimiento de Ley 80 de 1993
            - Validar criterios de evaluación objetivos
            - Revisar experiencia del contratista
            - Analizar ofertas y adjudicaciones
            
            2. ASPECTOS FINANCIEROS:
            - Presupuesto base de licitación
            - Desglose de costos unitarios
            - Garantías contractuales
            - Cronograma de pagos
            
            3. CONTROL Y SUPERVISIÓN:
            - Interventoría independiente
            - Seguimiento a cronogramas
            - Control de calidad
            - Modificaciones contractuales
          `), 2000)),
          
          // Simular análisis presupuestal
          new Promise(resolve => setTimeout(() => resolve(`
            ANÁLISIS PRESUPUESTAL Y FINANCIERO
            
            EVALUACIÓN DEL PROYECTO:
            
            1. FUENTES DE FINANCIACIÓN:
            - Recursos propios de la entidad
            - Transferencias del nivel nacional
            - Préstamos y créditos
            - Recursos de cooperación
            
            2. EJECUCIÓN PRESUPUESTAL:
            - Seguimiento a compromisos
            - Control de pagos y giros
            - Análisis de desviaciones
            - Eficiencia en el gasto
            
            3. INDICADORES FINANCIEROS:
            - Porcentaje de ejecución
            - Cumplimiento de metas físicas
            - Relación costo-beneficio
            - Impacto presupuestal
          `), 2000)),
          
          // Simular análisis de cronograma
          new Promise(resolve => setTimeout(() => resolve(`
            ANÁLISIS DE CRONOGRAMA Y GESTIÓN DE PROYECTOS
            
            SEGUIMIENTO TEMPORAL:
            
            1. HITOS PRINCIPALES:
            - Fase de planeación y diseño
            - Proceso de contratación
            - Ejecución de obras/actividades
            - Entrega y recepción
            
            2. INDICADORES DE AVANCE:
            - Porcentaje de cumplimiento físico
            - Tiempo transcurrido vs. programado
            - Recursos utilizados vs. planificados
            - Calidad de las entregas
            
            3. GESTIÓN DE RIESGOS:
            - Identificación de retrasos potenciales
            - Planes de contingencia
            - Mitigación de impactos
            - Comunicación de cambios
          `), 2000)),
          
          // Simular análisis de participación
          new Promise(resolve => setTimeout(() => resolve(`
            ANÁLISIS DE PARTICIPACIÓN CIUDADANA
            
            MECANISMOS DE CONTROL SOCIAL:
            
            1. VEEDURÍAS CIUDADANAS:
            - Constitución y registro
            - Capacitación de veedores
            - Metodología de seguimiento
            - Informes de hallazgos
            
            2. PARTICIPACIÓN COMUNITARIA:
            - Consulta a beneficiarios
            - Asambleas informativas
            - Comités de seguimiento
            - Espacios de diálogo
            
            3. RENDICIÓN DE CUENTAS:
            - Informes periódicos públicos
            - Audiencias de rendición
            - Publicación de resultados
            - Evaluación de impacto social
          `), 2000))
        ]);

        resultado = {
          analisisTransparencia,
          analisisContratacion,
          analisisPresupuesto,
          analisisCronograma,
          analisisParticipacion,
          tipoAnalisis: 'veeduria',
          timestamp: new Date().toISOString(),
          version: narracion.version,
          entidad: datosUbicacion.municipio || 'Entidad no especificada',
          proyecto: narracion.texto.substring(0, 100) + '...'
        };
      } else {
        // Análisis jurídico general
        // Simular análisis con servicios
        const analisisJuridico = `Análisis jurídico especializado para el caso presentado. Se identifican elementos constitucionales y legales aplicables según el marco normativo colombiano. Se recomienda revisar la jurisprudencia de la Corte Constitucional y los precedentes del Consejo de Estado.`;
        
        const iasProfesionales = `Análisis con sistemas de IA profesionales especializados en derecho colombiano. Se han identificado patrones similares en casos precedentes y se sugieren estrategias legales basadas en la experiencia acumulada.`;
        
        const iaMejorada = `Análisis mejorado con algoritmos avanzados de procesamiento de lenguaje natural. Se han detectado aspectos críticos del caso que requieren atención especial y se proponen rutas de acción específicas.`;
        
        const chatGPT = `Análisis complementario con modelo de lenguaje avanzado. Se proporciona contexto adicional sobre la normativa aplicable y se sugieren enfoques innovadores para la resolución del caso.`;
        
        const sistemaIA = `Análisis integral con sistema de IA profesional especializado. Se ha realizado una evaluación completa del caso considerando múltiples variables y se presentan recomendaciones estratégicas.`;

        resultado = {
          analisisJuridico,
          iasProfesionales,
          iaMejorada,
          chatGPT,
          sistemaIA,
          tipoAnalisis: 'general',
          timestamp: new Date().toISOString(),
          version: narracion.version
        };
      }

      setConsejoIA(prev => ({ 
        ...prev, 
        cargando: false, 
        resultado 
      }));
    } catch (error) {
      setConsejoIA(prev => ({ 
        ...prev, 
        cargando: false, 
        error: 'Error al consultar el consejo de IA' 
      }));
    }
  };

  const generarPDF = () => {
    // Simular generación de PDF
    const pdfContent = {
      cliente: datosCliente,
      ubicacion: datosUbicacion,
      narracion: narracion,
      consejoIA: consejoIA.resultado,
      fecha: new Date().toISOString()
    };

    // Crear y descargar PDF
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `consejo-ia-${datosUbicacion.codigoGenerado || 'reporte'}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // Retornar ruta simulada del PDF
    return `pdfs/consejo-ia-${datosUbicacion.codigoGenerado || Date.now()}.pdf`;
  };

  const iniciarDependencia = async () => {
    try {
      // Validar que haya resultado de análisis
      if (!consejoIA.resultado) {
        alert('Por favor, primero realiza un análisis con el Consejo IA.');
        return;
      }

      // Generar PDF primero
      const rutaPDF = generarPDF();

      // Preparar datos para la dependencia
      const datosDependencia = {
        modulo: 'Consejo IA',
        titulo: `Análisis ${tipoConsulta === 'veeduria' ? 'de Veeduría' : 'Legal'} - ${datosCliente.nombre || 'Cliente'}`,
        descripcion: `${narracion.texto.substring(0, 200)}...`,
        tipo: tipoConsulta,
        datosCliente: {
          nombre: datosCliente.nombre,
          email: datosCliente.email,
          telefono: datosCliente.telefono,
          tipo: datosCliente.tipo,
          identificacion: datosCliente.identificacion
        },
        datosUbicacion: {
          municipio: datosUbicacion.municipio,
          departamento: datosUbicacion.departamento,
          pais: datosUbicacion.pais,
          coordenadas: datosUbicacion.coordenadas
        },
        resultado: consejoIA.resultado,
        codigoCaso: datosUbicacion.codigoGenerado || `CIA-${Date.now()}`,
        pdfsAdicionales: [
          {
            ruta: rutaPDF,
            tipo: 'analisis_completo',
            nombre: `Análisis Consejo IA - ${datosUbicacion.codigoGenerado || 'CIA'}.pdf`
          }
        ]
      };

      // Generar dependencia con actividad y PDFs
      const resultado = await generarDependencia(datosDependencia);

      console.log('Dependencia creada:', resultado);

    } catch (error) {
      console.error('Error al iniciar dependencia:', error);
      alert('Error al generar la dependencia. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: 'white'
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              <Brain style={{ marginRight: '1rem', display: 'inline' }} />
              Consejo de Inteligencia Artificial
            </h1>
            
            {/* Selector de Tipo de Consulta Mejorado */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1rem', 
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <Button
                onClick={() => setTipoConsulta('general')}
                style={{
                  backgroundColor: tipoConsulta === 'general' ? '#4f46e5' : '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: tipoConsulta === 'general' ? '0 8px 25px rgba(79, 70, 229, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transform: tipoConsulta === 'general' ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                <Brain style={{ marginRight: '0.5rem' }} />
                🤖 Asesoría Legal General
              </Button>
              <Button
                onClick={() => setTipoConsulta('veeduria')}
                style={{
                  backgroundColor: tipoConsulta === 'veeduria' ? '#059669' : '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: tipoConsulta === 'veeduria' ? '0 8px 25px rgba(5, 150, 105, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transform: tipoConsulta === 'veeduria' ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                <Eye style={{ marginRight: '0.5rem' }} />
                👁️ Control Social & Veeduría
              </Button>
            </div>
            
            {/* Información Contextual */}
            <div style={{
              maxWidth: '800px',
              margin: '0 auto 2rem',
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {tipoConsulta === 'general' ? (
                <div style={{ textAlign: 'center', color: 'white' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    🏛️ Asesoría Legal Integral
                  </h3>
                  <p style={{ fontSize: '1rem', opacity: 0.9, lineHeight: '1.6' }}>
                    Análisis especializado con múltiples sistemas de IA para casos legales diversos. 
                    Incluye análisis jurídico, precedentes, normativa aplicable y recomendaciones estratégicas.
                  </p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'white' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    👁️ Control Social Inteligente
                  </h3>
                  <p style={{ fontSize: '1rem', opacity: 0.9, lineHeight: '1.6' }}>
                    Sistema especializado para vigilancia de gestión pública, contratación y proyectos. 
                    Incluye análisis de transparencia, seguimiento de cronogramas y control presupuestal.
                  </p>
                </div>
              )}
            </div>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Análisis especializado con múltiples sistemas de IA para casos legales y sociales
            </p>
          </div>

          <Tabs defaultValue="narracion" style={{ background: 'white', borderRadius: '1rem', padding: '2rem' }}>
            <TabsList style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              padding: '0.5rem',
              borderRadius: '0.5rem'
            }}>
              <TabsTrigger value="narracion" style={{ 
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                <FileText style={{ marginRight: '0.5rem' }} />
                Narración
              </TabsTrigger>
              <TabsTrigger value="cliente" style={{ 
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                <User style={{ marginRight: '0.5rem' }} />
                Cliente
              </TabsTrigger>
              <TabsTrigger value="ubicacion" style={{ 
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                <MapPin style={{ marginRight: '0.5rem' }} />
                Ubicación
              </TabsTrigger>
              <TabsTrigger value="consejo" style={{ 
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                <Brain style={{ marginRight: '0.5rem' }} />
                Consejo IA
              </TabsTrigger>
              <TabsTrigger value="acciones" style={{ 
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                <Target style={{ marginRight: '0.5rem' }} />
                Acciones
              </TabsTrigger>
            </TabsList>

            {/* Tab Narración */}
            <TabsContent value="narracion">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Narración de los Hechos
                </h2>
                
                <div style={{ marginBottom: '2rem' }}>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Descripción del Caso
                  </Label>
                  <Textarea
                    value={narracion.texto}
                    onChange={(e) => setNarracion(prev => ({ 
                      ...prev, 
                      texto: e.target.value,
                      timestamp: new Date().toISOString()
                    }))}
                    placeholder="Describa detalladamente los hechos del caso..."
                    style={{ 
                      minHeight: '200px',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}
                  />
                </div>

                {/* Grabación de Audio */}
                <div style={{ 
                  border: '2px dashed #d1d5db', 
                  borderRadius: '0.5rem', 
                  padding: '2rem', 
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1rem',
                    color: '#374151'
                  }}>
                    Grabación de Audio
                  </h3>
                  
                  {!grabando ? (
                    <Button
                      onClick={startRecording}
                      style={{ 
                        background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                        border: 'none',
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 auto'
                      }}
                    >
                      <Mic style={{ marginRight: '0.5rem' }} />
                      Iniciar Grabación
                    </Button>
                  ) : (
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <Button
                        onClick={stopRecording}
                        style={{ 
                          background: 'linear-gradient(45deg, #6b7280, #4b5563)',
                          border: 'none',
                          padding: '1rem 2rem',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          borderRadius: '0.5rem',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Square style={{ marginRight: '0.5rem' }} />
                        Detener
                      </Button>
                    </div>
                  )}

                  {archivoAudio && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '1rem', 
                      background: '#f3f4f6', 
                      borderRadius: '0.5rem' 
                    }}>
                      <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Archivo grabado: {archivoAudio.nombre}
                      </p>
                      <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        Duración: {archivoAudio.duracion} | Tamaño: {archivoAudio.tamaño}
                      </p>
                      <Button
                        onClick={transcribirAudio}
                        style={{ 
                          background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          borderRadius: '0.25rem',
                          color: 'white',
                          cursor: 'pointer',
                          marginTop: '0.5rem'
                        }}
                      >
                        Transcribir Audio
                      </Button>
                    </div>
                  )}
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'center' 
                }}>
                  <Button
                    onClick={consultarIA}
                    disabled={!narracion.texto.trim() || consejoIA.cargando}
                    style={{ 
                      background: consejoIA.cargando ? '#9ca3af' : 'linear-gradient(45deg, #667eea, #764ba2)',
                      border: 'none',
                      padding: '1rem 2rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      borderRadius: '0.5rem',
                      color: 'white',
                      cursor: consejoIA.cargando ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {consejoIA.cargando ? (
                      <>
                        <Clock style={{ marginRight: '0.5rem' }} />
                        Analizando...
                      </>
                    ) : (
                      <>
                        <Brain style={{ marginRight: '0.5rem' }} />
                        Consultar Consejo IA
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Tab Cliente */}
            <TabsContent value="cliente">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Datos del Cliente
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Tipo de Cliente
                    </Label>
                    <Select
                      value={datosCliente.tipo}
                      onValueChange={(value) => setDatosCliente(prev => ({ ...prev, tipo: value }))}
                    >
                      <option value="">Seleccionar tipo</option>
                      {tiposCliente.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Nombre Completo
                    </Label>
                    <Input
                      value={datosCliente.nombre}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, nombre: e.target.value }))}
                      placeholder="Ingrese el nombre completo"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Teléfono
                    </Label>
                    <Input
                      value={datosCliente.telefono}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, telefono: e.target.value }))}
                      placeholder="Número de teléfono"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={datosCliente.email}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Correo electrónico"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Identificación
                    </Label>
                    <Input
                      value={datosCliente.identificacion}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, identificacion: e.target.value }))}
                      placeholder="Número de identificación"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab Ubicación */}
            <TabsContent value="ubicacion">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Datos de Ubicación
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Municipio
                    </Label>
                    <Input
                      value={datosUbicacion.municipio}
                      onChange={(e) => setDatosUbicacion(prev => ({ ...prev, municipio: e.target.value }))}
                      placeholder="Nombre del municipio"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Departamento
                    </Label>
                    <Select
                      value={datosUbicacion.departamento}
                      onValueChange={(value) => setDatosUbicacion(prev => ({ ...prev, departamento: value }))}
                    >
                      <option value="">Seleccionar departamento</option>
                      {departamentos.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      País
                    </Label>
                    <Input
                      value={datosUbicacion.pais}
                      onChange={(e) => setDatosUbicacion(prev => ({ ...prev, pais: e.target.value }))}
                      placeholder="País"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Coordenadas (Opcional)
                    </Label>
                    <Input
                      value={datosUbicacion.coordenadas}
                      onChange={(e) => setDatosUbicacion(prev => ({ ...prev, coordenadas: e.target.value }))}
                      placeholder="Lat, Lng (ej: 4.6097, -74.0817)"
                    />
                  </div>
                </div>

                <div style={{ 
                  marginTop: '2rem', 
                  padding: '1.5rem', 
                  background: '#f3f4f6', 
                  borderRadius: '0.5rem' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}>
                    <div>
                      <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 'bold', 
                        marginBottom: '0.5rem',
                        color: '#374151'
                      }}>
                        Código de Caso
                      </h3>
                      <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        {datosUbicacion.codigoGenerado || 'No generado'}
                      </p>
                    </div>
                    <Button
                      onClick={generarCodigo}
                      style={{ 
                        background: 'linear-gradient(45deg, #10b981, #059669)',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      Generar Código
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab Consejo IA */}
            <TabsContent value="consejo">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Resultados del Consejo de IA
                </h2>

                {consejoIA.cargando && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '3rem',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ 
                      display: 'inline-block',
                      animation: 'spin 1s linear infinite',
                      fontSize: '2rem',
                      color: '#667eea'
                    }}>
                      <Brain />
                    </div>
                    <p style={{ 
                      marginTop: '1rem', 
                      fontSize: '1.1rem',
                      color: '#374151'
                    }}>
                      Analizando con múltiples sistemas de IA...
                    </p>
                  </div>
                )}

                {consejoIA.error && (
                  <Alert style={{ 
                    background: '#fef2f2', 
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <AlertCircle style={{ marginRight: '0.5rem' }} />
                    {consejoIA.error}
                  </Alert>
                )}

                {consejoIA.resultado && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                    gap: '2rem' 
                  }}>
                    {consejoIA.resultado.tipoAnalisis === 'veeduria' ? (
                      <>
                        {/* Análisis de Transparencia */}
                        <Card style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '1rem' 
                          }}>
                            <Eye style={{ marginRight: '0.5rem', color: '#1d4ed8' }} />
                            <h3 style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold',
                              color: '#1e40af'
                            }}>
                              Transparencia y Acceso a Información
                            </h3>
                          </div>
                          <pre style={{ 
                            color: '#374151', 
                            lineHeight: '1.6',
                            fontSize: '0.9rem',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit'
                          }}>
                            {consejoIA.resultado.analisisTransparencia}
                          </pre>
                        </Card>

                        {/* Análisis de Contratación */}
                        <Card style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '1rem' 
                          }}>
                            <FileText style={{ marginRight: '0.5rem', color: '#16a34a' }} />
                            <h3 style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold',
                              color: '#15803d'
                            }}>
                              Contratación Pública
                            </h3>
                          </div>
                          <pre style={{ 
                            color: '#374151', 
                            lineHeight: '1.6',
                            fontSize: '0.9rem',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit'
                          }}>
                            {consejoIA.resultado.analisisContratacion}
                          </pre>
                        </Card>

                        {/* Análisis Presupuestal */}
                        <Card style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '1rem' 
                          }}>
                            <Target style={{ marginRight: '0.5rem', color: '#d97706' }} />
                            <h3 style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold',
                              color: '#b45309'
                            }}>
                              Análisis Presupuestal
                            </h3>
                          </div>
                          <pre style={{ 
                            color: '#374151', 
                            lineHeight: '1.6',
                            fontSize: '0.9rem',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit'
                          }}>
                            {consejoIA.resultado.analisisPresupuesto}
                          </pre>
                        </Card>

                        {/* Análisis de Cronograma */}
                        <Card style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '1rem' 
                          }}>
                            <Clock style={{ marginRight: '0.5rem', color: '#7c3aed' }} />
                            <h3 style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold',
                              color: '#6d28d9'
                            }}>
                              Gestión de Cronograma
                            </h3>
                          </div>
                          <pre style={{ 
                            color: '#374151', 
                            lineHeight: '1.6',
                            fontSize: '0.9rem',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit'
                          }}>
                            {consejoIA.resultado.analisisCronograma}
                          </pre>
                        </Card>

                        {/* Análisis de Participación */}
                        <Card style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '1rem' 
                          }}>
                            <Users style={{ marginRight: '0.5rem', color: '#db2777' }} />
                            <h3 style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold',
                              color: '#be185d'
                            }}>
                              Participación Ciudadana
                            </h3>
                          </div>
                          <pre style={{ 
                            color: '#374151', 
                            lineHeight: '1.6',
                            fontSize: '0.9rem',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit'
                          }}>
                            {consejoIA.resultado.analisisParticipacion}
                          </pre>
                        </Card>

                        {/* Resumen de Veeduría */}
                        <Card style={{ 
                          padding: '1.5rem', 
                          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                          gridColumn: '1 / -1'
                        }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '1rem' 
                          }}>
                            <Shield style={{ marginRight: '0.5rem', color: '#475569' }} />
                            <h3 style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold',
                              color: '#334155'
                            }}>
                              Resumen de Veeduría Ciudadana
                            </h3>
                          </div>
                          <p style={{ 
                            color: '#374151', 
                            lineHeight: '1.6',
                            fontSize: '1rem'
                          }}>
                            El análisis de veeduría ciudadana para el proyecto en {consejoIA.resultado.entidad} 
                            ha identificado aspectos críticos en transparencia, contratación, presupuesto, 
                            cronograma y participación ciudadana. Se recomienda implementar los mecanismos 
                            de control social sugeridos y mantener un seguimiento permanente a la ejecución 
                            del proyecto para garantizar la transparencia y eficiencia en la gestión pública.
                          </p>
                        </Card>
                      </>
                    ) : (
                      <>
                        {/* Análisis Jurídico General */}
                        <Card style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '1rem' 
                          }}>
                            <Gavel style={{ marginRight: '0.5rem', color: '#1d4ed8' }} />
                            <h3 style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold',
                              color: '#1e40af'
                            }}>
                              Análisis Jurídico
                            </h3>
                          </div>
                          <p style={{ 
                            color: '#374151', 
                            lineHeight: '1.6',
                            fontSize: '0.9rem'
                          }}>
                            {consejoIA.resultado.analisisJuridico}
                          </p>
                        </Card>

                    {/* IAs Profesionales */}
                    <Card style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '1rem' 
                      }}>
                        <Users style={{ marginRight: '0.5rem', color: '#16a34a' }} />
                        <h3 style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold',
                          color: '#15803d'
                        }}>
                          IAs Profesionales
                        </h3>
                      </div>
                      <p style={{ 
                        color: '#374151', 
                        lineHeight: '1.6',
                        fontSize: '0.9rem'
                      }}>
                        {consejoIA.resultado.iasProfesionales}
                      </p>
                    </Card>

                    {/* IA Mejorada */}
                    <Card style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '1rem' 
                      }}>
                        <Zap style={{ marginRight: '0.5rem', color: '#d97706' }} />
                        <h3 style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold',
                          color: '#b45309'
                        }}>
                          IA Mejorada
                        </h3>
                      </div>
                      <p style={{ 
                        color: '#374151', 
                        lineHeight: '1.6',
                        fontSize: '0.9rem'
                      }}>
                        {consejoIA.resultado.iaMejorada}
                      </p>
                    </Card>

                    {/* ChatGPT Mejorado */}
                    <Card style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '1rem' 
                      }}>
                        <Brain style={{ marginRight: '0.5rem', color: '#7c3aed' }} />
                        <h3 style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold',
                          color: '#6d28d9'
                        }}>
                          ChatGPT Mejorado
                        </h3>
                      </div>
                      <p style={{ 
                        color: '#374151', 
                        lineHeight: '1.6',
                        fontSize: '0.9rem'
                      }}>
                        {consejoIA.resultado.chatGPT}
                      </p>
                    </Card>

                    {/* Sistema IA Profesional */}
                    <Card style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '1rem' 
                      }}>
                        <Shield style={{ marginRight: '0.5rem', color: '#db2777' }} />
                        <h3 style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold',
                          color: '#be185d'
                        }}>
                          Sistema IA Profesional
                        </h3>
                      </div>
                      <p style={{ 
                        color: '#374151', 
                        lineHeight: '1.6',
                        fontSize: '0.9rem'
                      }}>
                        {consejoIA.resultado.sistemaIA}
                      </p>
                    </Card>

                    {/* Resumen Unificado */}
                    <Card style={{ 
                      padding: '1.5rem', 
                      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                      gridColumn: '1 / -1'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '1rem' 
                      }}>
                        <Lightbulb style={{ marginRight: '0.5rem', color: '#475569' }} />
                        <h3 style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold',
                          color: '#334155'
                        }}>
                          Resumen Unificado
                        </h3>
                      </div>
                      <p style={{ 
                        color: '#374151', 
                        lineHeight: '1.6',
                        fontSize: '1rem'
                      }}>
                        Basado en el análisis de múltiples sistemas de IA especializados, se recomienda 
                        proceder con las acciones legales correspondientes según el marco jurídico 
                        colombiano. El caso presenta elementos suficientes para iniciar el proceso 
                        de protección de derechos fundamentales.
                      </p>
                    </Card>
                      </>
                    )}
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Tab Acciones */}
            <TabsContent value="acciones">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Acciones Disponibles
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '2rem' 
                }}>
                  <Card style={{ 
                    padding: '2rem', 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    border: '2px solid #3b82f6'
                  }}>
                    <Download style={{ 
                      fontSize: '3rem', 
                      color: '#1d4ed8', 
                      marginBottom: '1rem' 
                    }} />
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#1e40af'
                    }}>
                      Generar PDF
                    </h3>
                    <p style={{ 
                      color: '#374151', 
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}>
                      Crear un reporte completo del análisis en formato PDF
                    </p>
                    <Button
                      onClick={generarPDF}
                      style={{ 
                        background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      <Download style={{ marginRight: '0.5rem' }} />
                      Descargar PDF
                    </Button>
                  </Card>

                  <Card style={{ 
                    padding: '2rem', 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    border: '2px solid #22c55e'
                  }}>
                    <Target style={{ 
                      fontSize: '3rem', 
                      color: '#16a34a', 
                      marginBottom: '1rem' 
                    }} />
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#15803d'
                    }}>
                      Iniciar Dependencia
                    </h3>
                    <p style={{ 
                      color: '#374151', 
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}>
                      Crear una nueva dependencia con el análisis completo
                    </p>
                    <Button
                      onClick={iniciarDependencia}
                      disabled={generandoDependencia || !consejoIA.resultado}
                      style={{ 
                        background: generandoDependencia ? '#9ca3af' : 'linear-gradient(45deg, #22c55e, #16a34a)',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: generandoDependencia ? 'not-allowed' : 'pointer',
                        width: '100%',
                        opacity: !consejoIA.resultado ? 0.5 : 1
                      }}
                    >
                      {generandoDependencia ? (
                        <>
                          <Clock style={{ marginRight: '0.5rem' }} className="animate-spin" />
                          Generando Dependencia...
                        </>
                      ) : (
                        <>
                          <Target style={{ marginRight: '0.5rem' }} />
                          Iniciar Dependencia
                        </>
                      )}
                    </Button>
                    
                    {/* Mostrar actividad creada */}
                    {actividadCreada && (
                      <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#f0fdf4',
                        borderRadius: '0.5rem',
                        border: '1px solid #86efac'
                      }}>
                        <p style={{ 
                          color: '#15803d',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          marginBottom: '0.5rem'
                        }}>
                          ✅ Dependencia Creada Exitosamente
                        </p>
                        <p style={{ fontSize: '0.85rem', color: '#166534' }}>
                          <strong>Código:</strong> {actividadCreada.codigo_caso || 'N/A'}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: '#166534' }}>
                          <strong>ID Actividad:</strong> {actividadCreada.id}
                        </p>
                      </div>
                    )}
                  </Card>
                </div>

                {consejoIA.resultado && (
                  <>
                    <div style={{ 
                      marginTop: '2rem', 
                      padding: '1.5rem', 
                      background: '#f8fafc', 
                      borderRadius: '0.5rem',
                      border: '1px solid #e2e8f0'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold', 
                        marginBottom: '1rem',
                        color: '#374151'
                      }}>
                        Información del Análisis
                      </h3>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '1rem' 
                      }}>
                        <div>
                          <p style={{ 
                            fontSize: '0.9rem', 
                            color: '#6b7280',
                            marginBottom: '0.25rem'
                          }}>
                            Fecha de Análisis:
                          </p>
                          <p style={{ 
                            fontWeight: 'bold', 
                            color: '#374151' 
                          }}>
                            {new Date(consejoIA.resultado.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p style={{ 
                            fontSize: '0.9rem', 
                            color: '#6b7280',
                            marginBottom: '0.25rem'
                          }}>
                            Versión:
                          </p>
                          <p style={{ 
                            fontWeight: 'bold', 
                            color: '#374151' 
                          }}>
                            {consejoIA.resultado.version}
                          </p>
                        </div>
                        <div>
                          <p style={{ 
                            fontSize: '0.9rem', 
                            color: '#6b7280',
                            marginBottom: '0.25rem'
                          }}>
                            Sistemas Consultados:
                          </p>
                          <p style={{ 
                            fontWeight: 'bold', 
                            color: '#374151' 
                          }}>
                            5 Especialistas
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Botón Finalizar - Volver al Inicio */}
                    <div style={{
                      marginTop: '2rem',
                      padding: '2rem',
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                      borderRadius: '1rem',
                      textAlign: 'center',
                      border: '2px solid #0ea5e9'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        color: '#0c4a6e',
                        marginBottom: '1rem'
                      }}>
                        ¿Desea finalizar y volver al inicio?
                      </h3>
                      <p style={{ 
                        color: '#075985', 
                        marginBottom: '1.5rem',
                        fontSize: '1rem'
                      }}>
                        Su análisis ha sido completado exitosamente. Puede volver a la página principal.
                      </p>
                      <Button
                        onClick={() => navigate('/')}
                        style={{
                          background: 'linear-gradient(45deg, #0ea5e9, #0284c7)',
                          border: 'none',
                          padding: '1rem 2.5rem',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          borderRadius: '0.5rem',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        <Home style={{ marginRight: '0.75rem' }} size={24} />
                        Finalizar y Volver al Inicio
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ConsejoIA;
