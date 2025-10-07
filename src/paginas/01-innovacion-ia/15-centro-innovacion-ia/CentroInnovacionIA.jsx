import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Brain, 
  Users, 
  Eye, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Shield,
  Globe,
  Gavel,
  Target,
  TrendingUp,
  Star,
  Award,
  Lightbulb,
  BookOpen,
  FileText,
  BarChart3,
  Activity,
  Clock,
  Search,
  Filter,
  Download,
  Upload,
  Mic,
  MicOff,
  Play,
  Pause,
  Square
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import estadisticasService from '../../../services/EstadisticasService';

const CentroInnovacionIA = () => {
  const [moduloActivo, setModuloActivo] = useState('consejo-ia');
  const [estadisticas, setEstadisticas] = useState({
    casosAtendidos: 0,
    efectividadIA: 95.8,
    comunidadesAtendidas: 0,
    proyectosVigilados: 0
  });
  const [cargandoEstadisticas, setCargandoEstadisticas] = useState(true);

  const modulos = [
    {
      id: 'consejo-ia',
      titulo: 'Consejo IA',
      subtitulo: 'Asesoría Legal General',
      icono: '🤖',
      descripcion: 'Sistema de inteligencia artificial especializado en análisis jurídico general, con múltiples expertos legales que brindan asesoría integral sobre casos legales diversos.',
      caracteristicas: [
        'Análisis jurídico con 5 especialistas IA',
        'Consultas en tiempo real',
        'Generación automática de documentos',
        'Base de conocimiento legal actualizada',
        'Análisis de precedentes jurisprudenciales'
      ],
      colores: 'from-blue-500 to-purple-600',
      ruta: '/consejo-ia',
      estadisticas: {
        casos: 847,
        efectividad: 96.2,
        especialistas: 5
      }
    },
    {
      id: 'consejo-etnoia',
      titulo: 'Consejo EtnoIA',
      subtitulo: 'Asesoría Étnica Especializada',
      icono: '🌍',
      descripcion: 'Sistema especializado en derechos de pueblos indígenas, comunidades afrodescendientes y pueblo Rom, basado en Convenio 169 OIT y jurisprudencia constitucional.',
      caracteristicas: [
        'Especialización en derechos étnicos',
        'Análisis cultural y territorial',
        'Base de datos de 102 pueblos indígenas',
        'Jurisprudencia constitucional especializada',
        'Protocolos de consulta previa'
      ],
      colores: 'from-green-500 to-teal-600',
      ruta: '/consejo-etnoia',
      estadisticas: {
        casos: 234,
        efectividad: 94.8,
        pueblos: 102
      }
    },
    {
      id: 'veeduria-ciudadana',
      titulo: 'Veeduría Ciudadana',
      subtitulo: 'Control Social Inteligente',
      icono: '👁️',
      descripcion: 'Plataforma integral para la vigilancia de la gestión pública, con herramientas especializadas para supervisar proyectos, contratación y rendición de cuentas.',
      caracteristicas: [
        'Vigilancia de gestión pública',
        'Control de contratación',
        'Seguimiento de proyectos',
        'Rendición de cuentas',
        'Participación ciudadana activa'
      ],
      colores: 'from-orange-500 to-red-600',
      ruta: '/veeduria-gestion-publica',
      estadisticas: {
        casos: 166,
        efectividad: 92.1,
        proyectos: 89
      }
    }
  ];

  const herramientasComplementarias = [
    {
      titulo: 'Auditoría Forense',
      descripcion: 'Análisis forense de documentos y procesos con IA',
      icono: '🔬',
      ruta: '/auditoria-forense',
      color: 'purple'
    },
    {
      titulo: 'Geo Dashboard',
      descripcion: 'Visualización geográfica de casos y proyectos',
      icono: '🗺️',
      ruta: '/geo-dashboard',
      color: 'blue'
    },
    {
      titulo: 'Monitor IA',
      descripcion: 'Monitoreo en tiempo real de sistemas de IA',
      icono: '📊',
      ruta: '/monitor-ia',
      color: 'green'
    },
    {
      titulo: 'IA Especialistas',
      descripcion: 'Panel de especialistas IA por área de conocimiento',
      icono: '🧠',
      ruta: '/ia-especialistas',
      color: 'indigo'
    }
  ];

  const casosDestacados = [
    {
      titulo: 'Caso de Consulta Previa - Pueblo Wayuu',
      modulo: 'Consejo EtnoIA',
      resultado: 'Análisis exitoso que resultó en suspensión de actividades mineras',
      impacto: 'Protección de 50,000 hectáreas de territorio ancestral',
      fecha: '2024-01-15',
      estado: 'Exitoso'
    },
    {
      titulo: 'Veeduría a Proyecto de Vivienda Social',
      modulo: 'Veeduría Ciudadana',
      resultado: 'Identificación de irregularidades en asignación de viviendas',
      impacto: 'Mejora en transparencia del proceso para 2,000 familias',
      fecha: '2024-01-10',
      estado: 'En Seguimiento'
    },
    {
      titulo: 'Análisis de Contrato Público',
      modulo: 'Consejo IA',
      resultado: 'Detención de proceso por irregularidades contractuales',
      impacto: 'Ahorro de $500 millones en recursos públicos',
      fecha: '2024-01-08',
      estado: 'Exitoso'
    }
  ];

  const ultimasActividades = [
    {
      accion: 'Nuevo análisis completado',
      modulo: 'Consejo IA',
      detalles: 'Caso de derecho laboral',
      tiempo: 'Hace 5 minutos',
      icono: Brain
    },
    {
      accion: 'Veeduría iniciada',
      modulo: 'Veeduría Ciudadana',
      detalles: 'Proyecto de infraestructura vial',
      tiempo: 'Hace 15 minutos',
      icono: Eye
    },
    {
      accion: 'Consulta étnica procesada',
      modulo: 'Consejo EtnoIA',
      detalles: 'Comunidad Nasa - Derechos territoriales',
      tiempo: 'Hace 1 hora',
      icono: Globe
    },
    {
      accion: 'Reporte generado',
      modulo: 'Auditoría Forense',
      detalles: 'Análisis de documentos contractuales',
      tiempo: 'Hace 2 horas',
      icono: FileText
    }
  ];

  const modulosRecomendados = [
    {
      titulo: 'Declaraciones Territoriales',
      descripcion: 'Genera declaraciones extra juicio para ampliación de resguardos',
      icono: '🗺️',
      ruta: '/declaraciones-ampliacion-territorial',
      urgencia: 'alta',
      casosRelacionados: 23
    },
    {
      titulo: 'Planes de Vida',
      descripcion: 'Formulación integral de planes de vida comunitarios',
      icono: '🎯',
      ruta: '/planes-vida-comunitarios',
      urgencia: 'media',
      casosRelacionados: 15
    },
    {
      titulo: 'Consentimiento Previo',
      descripcion: 'Proceso CPLI para megaproyectos',
      icono: '⚠️',
      ruta: '/consentimiento-previo-libre-informado',
      urgencia: 'alta',
      casosRelacionados: 31
    }
  ];

  const quickActions = [
    {
      titulo: 'Consulta Rápida',
      descripcion: 'Análisis inmediato con IA',
      icono: Zap,
      accion: () => {
        toast.success('Iniciando consulta rápida...');
        // Lógica para consulta rápida
      },
      color: 'blue'
    },
    {
      titulo: 'Subir Documento',
      descripcion: 'Análisis automático de documentos',
      icono: Upload,
      accion: () => {
        toast.success('Preparando análisis de documento...');
        // Lógica para subir documento
      },
      color: 'green'
    },
    {
      titulo: 'Grabar Audio',
      descripcion: 'Transcripción y análisis de audio',
      icono: Mic,
      accion: () => {
        toast.success('Iniciando grabación...');
        // Lógica para grabar audio
      },
      color: 'purple'
    },
    {
      titulo: 'Generar Reporte',
      descripcion: 'Crear reporte automático',
      icono: Download,
      accion: () => {
        toast.success('Generando reporte...');
        // Lógica para generar reporte
      },
      color: 'orange'
    }
  ];

  // Cargar estadísticas reales del backend
  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        setCargandoEstadisticas(true);
        const response = await estadisticasService.obtenerEstadisticasCentroIA();
        
        if (response.success && response.data) {
          setEstadisticas({
            casosAtendidos: response.data.casosAtendidos || 0,
            efectividadIA: response.data.efectividadIA || 95.8,
            comunidadesAtendidas: response.data.comunidadesAtendidas || 0,
            proyectosVigilados: response.data.proyectosVigilados || 0
          });
        }
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
        toast.error('Error al cargar estadísticas del sistema');
      } finally {
        setCargandoEstadisticas(false);
      }
    };

    cargarEstadisticas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Principal */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Brain className="h-16 w-16 text-blue-600" />
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Centro de Innovación IA
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Plataforma integral de inteligencia artificial especializada en asesoría legal, 
            derechos étnicos y control social para fortalecer la democracia y la justicia en Colombia.
          </p>

          {/* Estadísticas Generales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {cargandoEstadisticas ? (
                  <div className="inline-block animate-pulse">...</div>
                ) : (
                  estadisticas.casosAtendidos.toLocaleString()
                )}
              </div>
              <div className="text-sm text-gray-600">Casos Atendidos</div>
            </Card>
            
            <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {cargandoEstadisticas ? (
                  <div className="inline-block animate-pulse">...</div>
                ) : (
                  `${estadisticas.efectividadIA}%`
                )}
              </div>
              <div className="text-sm text-gray-600">Efectividad IA</div>
            </Card>
            
            <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {cargandoEstadisticas ? (
                  <div className="inline-block animate-pulse">...</div>
                ) : (
                  estadisticas.comunidadesAtendidas.toLocaleString()
                )}
              </div>
              <div className="text-sm text-gray-600">Comunidades</div>
            </Card>
            
            <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {cargandoEstadisticas ? (
                  <div className="inline-block animate-pulse">...</div>
                ) : (
                  estadisticas.proyectosVigilados.toLocaleString()
                )}
              </div>
              <div className="text-sm text-gray-600">Proyectos Vigilados</div>
            </Card>
          </div>
        </div>

        {/* Módulos Principales */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Módulos Especializados
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {modulos.map((modulo) => (
              <Card 
                key={modulo.id} 
                className={`p-8 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group ${
                  moduloActivo === modulo.id ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => setModuloActivo(modulo.id)}
              >
                {/* Fondo degradado */}
                <div className={`absolute inset-0 bg-gradient-to-br ${modulo.colores} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Header del módulo */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{modulo.icono}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {modulo.titulo}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {modulo.subtitulo}
                        </p>
                      </div>
                    </div>
                    
                    <Badge className={`bg-gradient-to-r ${modulo.colores} text-white border-0`}>
                      {modulo.estadisticas.casos} casos
                    </Badge>
                  </div>

                  {/* Descripción */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {modulo.descripcion}
                  </p>

                  {/* Características */}
                  <div className="space-y-3 mb-8">
                    {modulo.caracteristicas.map((caracteristica, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{caracteristica}</span>
                      </div>
                    ))}
                  </div>

                  {/* Estadísticas del módulo */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        {modulo.estadisticas.efectividad}%
                      </div>
                      <div className="text-xs text-gray-600">Efectividad</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        {modulo.estadisticas.especialistas || modulo.estadisticas.pueblos || modulo.estadisticas.proyectos}
                      </div>
                      <div className="text-xs text-gray-600">
                        {modulo.id === 'consejo-etnoia' ? 'Pueblos' : 
                         modulo.id === 'veeduria-ciudadana' ? 'Proyectos' : 'Especialistas'}
                      </div>
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <Link to={modulo.ruta}>
                    <Button 
                      className={`w-full bg-gradient-to-r ${modulo.colores} text-white border-0 hover:shadow-lg transition-all duration-300`}
                      size="lg"
                    >
                      <span>Acceder al Módulo</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Acciones Rápidas
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickActions.map((accion, index) => (
              <Card 
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={accion.accion}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${accion.color}-100 text-${accion.color}-600 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <accion.icono className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {accion.titulo}
                </h3>
                <p className="text-sm text-gray-600">
                  {accion.descripcion}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contenido Principal con Tabs */}
        <Tabs defaultValue="casos-destacados" className="mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="casos-destacados">Casos Destacados</TabsTrigger>
            <TabsTrigger value="actividades">Actividades Recientes</TabsTrigger>
            <TabsTrigger value="herramientas">Herramientas</TabsTrigger>
            <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
          </TabsList>

          {/* Tab: Casos Destacados */}
          <TabsContent value="casos-destacados">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {casosDestacados.map((caso, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${
                      caso.estado === 'Exitoso' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {caso.estado}
                    </Badge>
                    <span className="text-xs text-gray-500">{caso.fecha}</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {caso.titulo}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {caso.resultado}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <TrendingUp className="h-4 w-4" />
                    <span>{caso.impacto}</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs font-medium text-blue-600">
                      {caso.modulo}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Actividades Recientes */}
          <TabsContent value="actividades">
            <div className="space-y-4">
              {ultimasActividades.map((actividad, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <actividad.icono className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {actividad.accion}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {actividad.detalles}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="font-medium">{actividad.modulo}</span>
                        <span>•</span>
                        <span>{actividad.tiempo}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Herramientas Complementarias */}
          <TabsContent value="herramientas">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {herramientasComplementarias.map((herramienta, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl mb-4">{herramienta.icono}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {herramienta.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {herramienta.descripcion}
                  </p>
                  <Link to={herramienta.ruta}>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      size="sm"
                    >
                      Acceder
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Recomendaciones */}
          <TabsContent value="recomendaciones">
            <div className="space-y-6">
              <Alert style={{ 
                background: '#dbeafe', 
                border: '1px solid #3b82f6',
                color: '#1e40af',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Lightbulb className="h-4 w-4 mr-2" />
                <span>
                  Basado en las tendencias actuales y casos similares, te recomendamos estas herramientas especializadas.
                </span>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {modulosRecomendados.map((modulo, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{modulo.icono}</div>
                      <Badge className={`${
                        modulo.urgencia === 'alta' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {modulo.urgencia === 'alta' ? 'Alta Prioridad' : 'Media Prioridad'}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {modulo.titulo}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {modulo.descripcion}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {modulo.casosRelacionados} casos relacionados
                      </span>
                      <Link to={modulo.ruta}>
                        <Button size="sm">
                          Usar Herramienta
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Informativo */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              ¿Necesitas Ayuda Especializada?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nuestro sistema de IA está disponible 24/7 para brindarte la mejor asesoría legal y social.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Brain className="mr-2 h-5 w-5" />
                Chat con IA
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Ver Tutoriales
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CentroInnovacionIA;
