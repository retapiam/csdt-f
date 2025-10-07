import React, { useState, useEffect } from 'react';
import { Pickaxe, Leaf, Users, ShieldCheck, TreePine, Layers, Brain, FileText, Download, Target, MessageSquare, Send, Eye, Settings, Play, Zap, BookOpen, Map, BarChart3, Activity } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import toast from 'react-hot-toast';
import estadisticasService from '../../../services/EstadisticasService';

const ConsejoMineroAmbientalIA = () => {
  const [tabActivo, setTabActivo] = useState('dashboard');
  const [consulta, setConsulta] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('general');
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cargandoEstadisticas, setCargandoEstadisticas] = useState(true);
  
  const [estadisticas, setEstadisticas] = useState({
    proyectosMineros: 0,
    areasAmbientales: 0,
    superposiciones: 0,
    consultasPrevias: 0,
    efectividad: 0
  });

  // Cargar estadísticas reales del backend
  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        setCargandoEstadisticas(true);
        const [etnicas, proyectos] = await Promise.all([
          estadisticasService.obtenerEstadisticasEtnicas(),
          estadisticasService.obtenerEstadisticasProyectos()
        ]);
        
        if (etnicas.success && etnicas.data && proyectos.success && proyectos.data) {
          setEstadisticas({
            proyectosMineros: proyectos.data.total_proyectos || 0,
            areasAmbientales: proyectos.data.proyectos_activos || 0,
            superposiciones: Math.floor((proyectos.data.total_proyectos || 0) * 0.15), // Estimación
            consultasPrevias: etnicas.data.consultasPrevias || 0,
            efectividad: etnicas.data.efectividadIA || 0
          });
        }
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      } finally {
        setCargandoEstadisticas(false);
      }
    };

    cargarEstadisticas();
  }, []);

  const tiposConsulta = [
    {
      id: 'general',
      nombre: 'Consulta General',
      des: 'Asesoría general en minería y ambiente',
      icono: MessageSquare,
      color: 'blue'
    },
    {
      id: 'superposiciones',
      nombre: 'Superposiciones Minero-Territorial',
      des: 'Análisis de conflictos entre minería y territorios',
      icono: Layers,
      color: 'red'
    },
    {
      id: 'impacto-ambiental',
      nombre: 'Impacto Ambiental',
      des: 'Evaluación de impactos ambientales mineros',
      icono: Leaf,
      color: 'green'
    },
    {
      id: 'consulta-previa',
      nombre: 'Consulta Previa Minera',
      des: 'Procesos de consulta previa en minería',
      icono: Users,
      color: 'purple'
    },
    {
      id: 'cumplimiento',
      nombre: 'Cumplimiento Normativo',
      des: 'Evaluación de cumplimiento legal',
      icono: ShieldCheck,
      color: 'orange'
    }
  ];

  const modulosMineroAmbientales = [
    {
      id: 'superposiciones',
      tit: 'Superposiciones Minero-Territorial',
      des: 'Análisis de conflictos entre minería y territorios étnicos',
      icono: Layers,
      color: 'red',
      casos: 23,
      efectividad: 89.5
    },
    {
      id: 'impacto-ambiental',
      tit: 'Impacto Ambiental',
      des: 'Evaluación de impactos ambientales de proyectos mineros',
      icono: Leaf,
      color: 'green',
      casos: 45,
      efectividad: 92.1
    },
    {
      id: 'consulta-previa',
      tit: 'Consulta Previa Minera',
      des: 'Procesos de consulta previa en proyectos mineros',
      icono: Users,
      color: 'purple',
      casos: 67,
      efectividad: 88.7
    },
    {
      id: 'cumplimiento-normativo',
      tit: 'Cumplimiento Normativo',
      des: 'Evaluación de cumplimiento de normativa minero-ambiental',
      icono: ShieldCheck,
      color: 'orange',
      casos: 34,
      efectividad: 94.2
    },
    {
      id: 'restauracion-ecologica',
      tit: 'Restauración Ecológica',
      des: 'Planes de restauración ecológica post-minería',
      icono: TreePine,
      color: 'emerald',
      casos: 28,
      efectividad: 86.9
    }
  ];

  const herramientasIA = [
    {
      tit: 'Análisis Minero-Ambiental',
      des: 'IA especializada en análisis minero-ambiental',
      icono: Pickaxe,
      est: 'activo'
    },
    {
      tit: 'Mapeo de Superposiciones',
      des: 'Cartografía de conflictos minero-territoriales',
      icono: Map,
      est: 'activo'
    },
    {
      tit: 'Evaluación de Impactos',
      des: 'Análisis automatizado de impactos ambientales',
      icono: BarChart3,
      est: 'activo'
    },
    {
      tit: 'Monitoreo Ambiental',
      des: 'Sistemas de monitoreo ambiental inteligente',
      icono: Activity,
      est: 'activo'
    }
  ];

  const accionesRapidas = [
    {
      tit: 'Consulta Minero-Ambiental',
      des: 'Análisis inmediato con IA especializada',
      icono: Zap,
      accion: () => {
        toast.success('Iniciando consulta minero-ambiental...');
        setTabActivo('consulta');
      },
      color: 'blue'
    },
    {
      tit: 'Análisis de Superposiciones',
      des: 'Evaluar conflictos minero-territoriales',
      icono: Layers,
      accion: () => {
        toast.success('Preparando análisis de superposiciones...');
      },
      color: 'red'
    },
    {
      tit: 'Impacto Ambiental',
      des: 'Evaluar impactos ambientales',
      icono: Leaf,
      accion: () => {
        toast.success('Iniciando evaluación de impacto...');
      },
      color: 'green'
    },
    {
      tit: 'Consulta Previa',
      des: 'Procesos de consulta previa minera',
      icono: Users,
      accion: () => {
        toast.success('Iniciando proceso de consulta previa...');
      },
      color: 'purple'
    }
  ];

  const casosDestacados = [
    {
      id: 1,
      tit: 'Superposición Minero-Territorial - Resguardo Indígena',
      proyecto: 'Mina de Oro El Dorado',
      tip: 'Superposición',
      est: 'Resuelto',
      fecha: '2024-01-20',
      resultado: 'Acuerdo de compatibilidad territorial',
      impacto: 'Protección de 5,000 hectáreas de territorio ancestral',
      icono: '⛏️'
    },
    {
      id: 2,
      tit: 'Evaluación de Impacto Ambiental - Proyecto Carbón',
      proyecto: 'Mina de Carbón La Esperanza',
      tip: 'Impacto Ambiental',
      est: 'En Proceso',
      fecha: '2024-01-18',
      resultado: 'Plan de manejo ambiental aprobado',
      impacto: 'Reducción del 40% en impactos ambientales',
      icono: '🌱'
    },
    {
      id: 3,
      tit: 'Consulta Previa - Proyecto Minero',
      proyecto: 'Explotación de Cobre San José',
      tip: 'Consulta Previa',
      est: 'Exitoso',
      fecha: '2024-01-15',
      resultado: 'Consulta previa completada exitosamente',
      impacto: 'Participación efectiva de 3 comunidades étnicas',
      icono: '🤝'
    }
  ];

  const procesarConsulta = async () => {
    if (!consulta.trim()) {
      toast.error('Por favor ingresa tu consulta minero-ambiental');
      return;
    }

    setCargando(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setResultado({
        pregunta: consulta,
        respuesta: 'Análisis minero-ambiental procesado exitosamente. Se han identificado medidas de mitigación y control ambiental necesarias.',
        tip: tipoConsulta,
        confianza: 0.89,
        recomendaciones: [
          'Implementar plan de manejo ambiental específico',
          'Realizar consulta previa con comunidades afectadas',
          'Establecer sistema de monitoreo ambiental continuo'
        ],
        fecha: new Date().toISOString()
      });
      
      toast.success('Consulta minero-ambiental procesada exitosamente');
    } catch (error) {
      toast.error('Error al procesar la consulta');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl">
                <Pickaxe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Consejo MineroAmbiental IA
                </h1>
                <p className="text-gray-600 mt-1">
                  Minería Sostenible y Protección Ambiental con Inteligencia Artificial
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Especializada en análisis minero-ambiental, superposiciones territoriales y consulta previa
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-200 rounded-full">
                <Brain className="w-5 h-5 text-blue-700 mr-2" />
                <span className="text-sm font-semibold text-blue-700">MINERO-AMBIENTAL IA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Acciones Rápidas
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {accionesRapidas.map((accion, index) => (
              <Card 
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={accion.accion}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${accion.color}-100 text-${accion.color}-600 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <accion.icono className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {accion.tit}
                </h3>
                <p className="text-sm text-gray-600">
                  {accion.des}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs Principales */}
        <Tabs value={tabActivo} onValueChange={setTabActivo} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="consulta">Consulta</TabsTrigger>
            <TabsTrigger value="modulos">Módulos</TabsTrigger>
            <TabsTrigger value="casos">Casos</TabsTrigger>
            <TabsTrigger value="herramientas">Herramientas IA</TabsTrigger>
          </TabsList>

          {/* Tab: Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Módulos Minero-Ambientales */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-blue-500" />
                  Módulos Minero-Ambientales
                </h3>
                <div className="space-y-4">
                  {modulosMineroAmbientales.map((modulo) => (
                    <div key={modulo.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-${modulo.color}-100 rounded-lg flex items-center justify-center`}>
                          <modulo.icono className={`w-5 h-5 text-${modulo.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{modulo.tit}</h4>
                          <p className="text-sm text-gray-600">{modulo.des}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{modulo.casos}</div>
                        <div className="text-xs text-gray-500">casos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Herramientas IA */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-blue-500" />
                  Herramientas de IA
                </h3>
                <div className="space-y-4">
                  {herramientasIA.map((herramienta, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <herramienta.icono className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{herramienta.tit}</h4>
                          <p className="text-sm text-gray-600">{herramienta.des}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {herramienta.est}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Consulta */}
          <TabsContent value="consulta">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="w-7 h-7 mr-3 text-blue-500" />
                Consulta Minero-Ambiental con IA
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Consulta
                  </label>
                  <select
                    value={tipoConsulta}
                    onChange={(e) => setTipoConsulta(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    {tiposConsulta.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nombre} - {tipo.des}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Describe tu consulta minero-ambiental
                  </label>
                  <textarea
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    placeholder="Ej: Necesito analizar las superposiciones entre un proyecto minero de oro y un resguardo indígena en el departamento del Cauca..."
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={procesarConsulta}
                    disabled={cargando}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-3"
                  >
                    {cargando ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Procesando consulta...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-6 h-6" />
                        <span>Consultar con MineroAmbiental IA</span>
                      </>
                    )}
                  </Button>
                </div>

                {resultado && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border-l-4 border-blue-500">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-blue-500" />
                      Respuesta de la MineroAmbiental IA
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">Pregunta:</p>
                        <p className="text-gray-700">{resultado.pregunta}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">Respuesta:</p>
                        <p className="text-gray-700 leading-relaxed">{resultado.respuesta}</p>
                      </div>
                      {resultado.recomendaciones && resultado.recomendaciones.length > 0 && (
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Recomendaciones:</p>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {resultado.recomendaciones.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-blue-100 text-blue-800">
                            Confianza: {(resultado.confianza * 100).toFixed(1)}%
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">
                            {resultado.tip}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Guardar
                          </Button>
                          <Button size="sm">
                            <Send className="w-4 h-4 mr-2" />
                            Compartir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Módulos */}
          <TabsContent value="modulos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modulosMineroAmbientales.map((modulo) => (
                <Card key={modulo.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-${modulo.color}-100 rounded-xl flex items-center justify-center`}>
                      <modulo.icono className={`w-6 h-6 text-${modulo.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{modulo.tit}</h3>
                      <p className="text-sm text-gray-600">{modulo.casos} casos</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{modulo.des}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Efectividad: {modulo.efectividad}%
                    </span>
                    <Button size="sm" className={`bg-${modulo.color}-500 hover:bg-${modulo.color}-600`}>
                      Acceder
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Casos */}
          <TabsContent value="casos">
            <div className="space-y-6">
              {casosDestacados.map((caso) => (
                <Card key={caso.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{caso.icono}</div>
                      <div>
                        <Badge className={`${
                          caso.est === 'Exitoso' ? 'bg-green-100 text-green-800' :
                          caso.est === 'Resuelto' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {caso.est}
                        </Badge>
                        <Badge variant="outline" className="ml-2">{caso.tip}</Badge>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{caso.fecha}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {caso.tit}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Proyecto:</p>
                      <p className="font-semibold text-gray-900">{caso.proyecto}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Resultado:</p>
                      <p className="font-semibold text-gray-900">{caso.resultado}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    <strong>Impacto:</strong> {caso.impacto}
                  </p>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Caso
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Herramientas IA */}
          <TabsContent value="herramientas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {herramientasIA.map((herramienta, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <herramienta.icono className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{herramienta.tit}</h3>
                      <Badge className="bg-blue-100 text-blue-800 mt-1">
                        {herramienta.est}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{herramienta.des}</p>
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Activar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Informativo */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              ¿Necesitas Asesoría en Minería y Ambiente?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nuestro sistema MineroAmbiental IA está disponible 24/7 para brindarte asesoría especializada en minería sostenible y protección ambiental.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Pickaxe className="mr-2 h-5 w-5" />
                Consulta Minero-Ambiental
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

export default ConsejoMineroAmbientalIA;
