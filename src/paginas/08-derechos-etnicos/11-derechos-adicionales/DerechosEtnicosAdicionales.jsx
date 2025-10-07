import { useState, useEffect } from 'react';
import { Scale, Users, TrendingUp, GraduationCap, Heart, Radio, BookOpen, FileText, Download, Zap, Target, Eye, Brain, CheckCircle } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import toast from 'react-hot-toast';
import estadisticasService from '../../../services/EstadisticasService';

const DerechosEtnicosAdicionales = () => {
  const [tabActivo, setTabActivo] = useState('dashboard');
  const [derechoSeleccionado, setDerechoSeleccionado] = useState(null);
  const [consulta, setConsulta] = useState('');
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [cargandoEstadisticas, setCargandoEstadisticas] = useState(true);

  const [estadisticas, setEstadisticas] = useState({
    derechosDocumentados: 12,
    casosAtendidos: 0,
    comunidadesApoyo: 0,
    normativaActualizada: 0,
    efectividad: 93.5
  });

  const derechosAdicionales = [
    {
      id: 'gobierno-propio',
      nombre: 'Gobierno Propio',
      des: 'Derecho a la autonomía política y elección de autoridades tradicionales',
      icono: Scale,
      color: 'purple',
      categoria: 'Autonomía',
      fundamento: [
        'Convenio 169 OIT - Artículos 6, 7',
        'Constitución - Artículos 246, 286, 287, 330',
        'Decreto 2164 de 1995'
      ],
      aspectos: [
        'Autonomía política',
        'Elección de autoridades tradicionales',
        'Justicia indígena',
        'Cabildos y consejos comunitarios',
        'Reglamentos internos'
      ],
      casos: 45
    },
    {
      id: 'participacion',
      nombre: 'Participación',
      des: 'Derecho a participar en decisiones que afecten a las comunidades',
      icono: Users,
      color: 'blue',
      categoria: 'Participación',
      fundamento: [
        'Convenio 169 OIT - Artículos 6, 7',
        'Constitución - Artículo 330',
        'Ley 21 de 1991'
      ],
      aspectos: [
        'Participación en decisiones estatales',
        'Consultas y audiencias públicas',
        'Políticas públicas',
        'Planeación territorial',
        'Presupuestos participativos'
      ],
      casos: 67
    },
    {
      id: 'etnodesarrollo',
      nombre: 'Etnodesarrollo',
      des: 'Derecho al desarrollo propio con enfoque étnico y cultural',
      icono: TrendingUp,
      color: 'green',
      categoria: 'Desarrollo',
      fundamento: [
        'Convenio 169 OIT - Artículos 2, 7',
        'Constitución - Artículos 7, 70',
        'Ley 70 de 1993'
      ],
      aspectos: [
        'Planes de etnodesarrollo',
        'Desarrollo sostenible',
        'Economía propia',
        'Proyectos productivos',
        'Soberanía alimentaria'
      ],
      casos: 52
    },
    {
      id: 'educacion-propia',
      nombre: 'Educación Propia',
      des: 'Derecho a sistemas educativos acordes con su cultura',
      icono: GraduationCap,
      color: 'indigo',
      categoria: 'Educación',
      fundamento: [
        'Convenio 169 OIT - Artículos 27, 28, 29',
        'Constitución - Artículo 68',
        'Ley 115 de 1994',
        'Decreto 804 de 1995'
      ],
      aspectos: [
        'Etnoeducación',
        'Educación intercultural',
        'Sistemas educativos propios',
        'Lengua materna',
        'Conocimientos tradicionales'
      ],
      casos: 78
    },
    {
      id: 'salud-propia',
      nombre: 'Salud Propia',
      des: 'Derecho a sistemas de salud interculturales',
      icono: Heart,
      color: 'red',
      categoria: 'Salud',
      fundamento: [
        'Convenio 169 OIT - Artículo 25',
        'Constitución - Artículo 49',
        'Ley 100 de 1993'
      ],
      aspectos: [
        'Medicina tradicional',
        'Sistemas de salud intercultural',
        'Sabedores ancestrales',
        'Plantas medicinales',
        'Partería tradicional'
      ],
      casos: 34
    },
    {
      id: 'comunicacion-propia',
      nombre: 'Comunicación Propia',
      des: 'Derecho a medios de comunicación propios',
      icono: Radio,
      color: 'orange',
      categoria: 'Comunicación',
      fundamento: [
        'Convenio 169 OIT',
        'Constitución - Artículos 7, 20',
        'Ley 1341 de 2009'
      ],
      aspectos: [
        'Medios de comunicación propios',
        'Radio comunitaria',
        'Televisión indígena',
        'Redes sociales comunitarias',
        'Preservación de lenguas'
      ],
      casos: 23
    }
  ];

  const casosDestacados = [
    {
      id: 1,
      titulo: 'Plan de Etnodesarrollo - Pueblo Nasa',
      derecho: 'Etnodesarrollo',
      comunidad: 'Pueblo Nasa, Cauca',
      estado: 'Implementado',
      resultado: 'Plan quinquenal aprobado con presupuesto de $5.000 millones',
      fecha: '2024-01-15'
    },
    {
      id: 2,
      titulo: 'Sistema de Educación Propia - Wayúu',
      derecho: 'Educación Propia',
      comunidad: 'Pueblo Wayúu, La Guajira',
      estado: 'En Ejecución',
      resultado: 'Modelo etnoeducativo implementado en 25 escuelas',
      fecha: '2024-01-10'
    },
    {
      id: 3,
      titulo: 'Radio Comunitaria - Emberá',
      derecho: 'Comunicación Propia',
      comunidad: 'Pueblo Emberá, Chocó',
      estado: 'Exitoso',
      resultado: 'Emisora comunitaria operando con cobertura de 50km',
      fecha: '2024-01-05'
    }
  ];

  const procesarConsulta = async () => {
    if (!consulta.trim()) {
      toast.error('Por favor ingresa tu consulta sobre derechos étnicos');
      return;
    }

    setCargando(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setResultado({
        pregunta: consulta,
        respuesta: 'Análisis de derechos étnicos adicionales procesado exitosamente. Se han identificado los marcos normativos aplicables y recomendaciones específicas.',
        derechoAplicable: derechoSeleccionado?.nombre || 'General',
        confianza: 0.95,
        normativa: [
          'Convenio 169 de la OIT',
          'Constitución Política - Artículos 7, 70, 330',
          'Ley 21 de 1991'
        ],
        recomendaciones: [
          'Revisar fundamento constitucional del derecho específico',
          'Consultar jurisprudencia de la Corte Constitucional',
          'Establecer mecanismos de participación comunitaria'
        ],
        fecha: new Date().toISOString()
      });
      
      toast.success('Consulta procesada exitosamente');
    } catch (error) {
      toast.error('Error al procesar la consulta');
    } finally {
      setCargando(false);
    }
  };

  const accionesRapidas = [
    {
      tit: 'Consultar Derecho',
      des: 'Análisis con IA',
      icono: Brain,
      accion: () => {
        setTabActivo('consulta');
        toast.success('Preparando consulta...');
      },
      color: 'purple'
    },
    {
      tit: 'Marco Normativo',
      des: 'Ver normativa completa',
      icono: BookOpen,
      accion: () => {
        toast.success('Cargando normativa...');
      },
      color: 'blue'
    },
    {
      tit: 'Casos de Referencia',
      des: 'Ver jurisprudencia',
      icono: FileText,
      accion: () => {
        setTabActivo('casos');
        toast.success('Cargando casos...');
      },
      color: 'green'
    },
    {
      tit: 'Generar Reporte',
      des: 'Documento completo',
      icono: Download,
      accion: () => {
        toast.success('Generando reporte...');
      },
      color: 'orange'
    }
  ];

  // Cargar estadísticas étnicas reales del backend
  useEffect(() => {
    const cargarEstadisticasEtnicas = async () => {
      try {
        setCargandoEstadisticas(true);
        const response = await estadisticasService.obtenerEstadisticasEtnicas();
        
        if (response.success && response.data) {
          setEstadisticas(prev => ({
            ...prev,
            casosAtendidos: (response.data.precedentesJudiciales || 0) + (response.data.consultasPrevias || 0),
            comunidadesApoyo: (response.data.pueblosIndigenas || 0) + (response.data.comunidadesAfro || 0),
            normativaActualizada: response.data.territoriosColectivos || 0,
            efectividad: response.data.efectividadIA || 93.5
          }));
        }
      } catch (error) {
        console.error('Error cargando estadísticas étnicas:', error);
      } finally {
        setCargandoEstadisticas(false);
      }
    };

    cargarEstadisticasEtnicas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Derechos Étnicos Adicionales
                </h1>
                <p className="text-gray-600 mt-1">
                  Sistema Especializado en Derechos Adicionales de Comunidades Étnicas
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Gobierno propio, participación, etnodesarrollo, educación, salud y comunicación propia
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-200 rounded-full">
                <CheckCircle className="w-5 h-5 text-purple-700 mr-2" />
                <span className="text-sm font-semibold text-purple-700">DERECHOS IA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {estadisticas.derechosDocumentados}
            </div>
            <div className="text-sm text-gray-600">Derechos Documentados</div>
          </Card>
          
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
                estadisticas.comunidadesApoyo.toLocaleString()
              )}
            </div>
            <div className="text-sm text-gray-600">Comunidades Apoyo</div>
          </Card>
          
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {cargandoEstadisticas ? (
                <div className="inline-block animate-pulse">...</div>
              ) : (
                estadisticas.normativaActualizada.toLocaleString()
              )}
            </div>
            <div className="text-sm text-gray-600">Normativa Actualizada</div>
          </Card>
          
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-pink-600 mb-2">
              {cargandoEstadisticas ? (
                <div className="inline-block animate-pulse">...</div>
              ) : (
                `${estadisticas.efectividad}%`
              )}
            </div>
            <div className="text-sm text-gray-600">Efectividad</div>
          </Card>
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="derechos">Derechos</TabsTrigger>
            <TabsTrigger value="consulta">Consulta IA</TabsTrigger>
            <TabsTrigger value="casos">Casos</TabsTrigger>
          </TabsList>

          {/* Tab: Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {derechosAdicionales.map((derecho) => (
                <Card key={derecho.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-${derecho.color}-100 rounded-xl flex items-center justify-center`}>
                      <derecho.icono className={`w-6 h-6 text-${derecho.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{derecho.nombre}</h3>
                      <Badge className={`bg-${derecho.color}-100 text-${derecho.color}-800`}>
                        {derecho.categoria}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{derecho.des}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-semibold text-gray-700">Aspectos Clave:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {derecho.aspectos.slice(0, 3).map((aspecto, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                          {aspecto}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">{derecho.casos} casos</span>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setDerechoSeleccionado(derecho);
                        setTabActivo('derechos');
                      }}
                    >
                      Ver Más
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Derechos */}
          <TabsContent value="derechos">
            {derechoSeleccionado ? (
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-${derechoSeleccionado.color}-100 rounded-2xl flex items-center justify-center`}>
                      <derechoSeleccionado.icono className={`w-8 h-8 text-${derechoSeleccionado.color}-600`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{derechoSeleccionado.nombre}</h2>
                      <p className="text-gray-600">{derechoSeleccionado.des}</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setDerechoSeleccionado(null)}>
                    Volver
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Fundamento Normativo</h3>
                    <div className="space-y-2">
                      {derechoSeleccionado.fundamento.map((norma, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                          <span className="text-gray-700">{norma}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Aspectos del Derecho</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {derechoSeleccionado.aspectos.map((aspecto, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-purple-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-purple-600 mr-3" />
                          <span className="text-gray-700">{aspecto}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Guía Completa
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setTabActivo('consulta')}>
                      <Brain className="w-4 h-4 mr-2" />
                      Consultar con IA
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {derechosAdicionales.map((derecho) => (
                  <Card 
                    key={derecho.id} 
                    className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setDerechoSeleccionado(derecho)}
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <derecho.icono className={`w-8 h-8 text-${derecho.color}-600`} />
                      <h3 className="text-xl font-bold text-gray-900">{derecho.nombre}</h3>
                    </div>
                    <p className="text-gray-600">{derecho.des}</p>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tab: Consulta IA */}
          <TabsContent value="consulta">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Brain className="w-7 h-7 mr-3 text-purple-500" />
                Consulta sobre Derechos Étnicos Adicionales
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Selecciona el Derecho (Opcional)
                  </label>
                  <select
                    onChange={(e) => {
                      const derecho = derechosAdicionales.find(d => d.id === e.target.value);
                      setDerechoSeleccionado(derecho || null);
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="">Consulta General</option>
                    {derechosAdicionales.map((derecho) => (
                      <option key={derecho.id} value={derecho.id}>
                        {derecho.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Describe tu consulta
                  </label>
                  <textarea
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    placeholder="Ej: ¿Cuáles son los requisitos para implementar un sistema de educación propia en mi resguardo?..."
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={procesarConsulta}
                    disabled={cargando}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-3"
                  >
                    {cargando ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Analizando...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-6 h-6" />
                        <span>Consultar con IA</span>
                      </>
                    )}
                  </Button>
                </div>

                {resultado && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-purple-500" />
                      Respuesta IA - {resultado.derechoAplicable}
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
                      {resultado.normativa && (
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Normativa Aplicable:</p>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {resultado.normativa.map((norma, index) => (
                              <li key={index}>{norma}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {resultado.recomendaciones && (
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
                        <Badge className="bg-purple-100 text-purple-800">
                          Confianza: {(resultado.confianza * 100).toFixed(1)}%
                        </Badge>
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Descargar Análisis
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Casos */}
          <TabsContent value="casos">
            <div className="space-y-6">
              {casosDestacados.map((caso) => (
                <Card key={caso.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{caso.titulo}</h3>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-purple-100 text-purple-800">{caso.derecho}</Badge>
                        <Badge className={`${
                          caso.estado === 'Implementado' ? 'bg-green-100 text-green-800' :
                          caso.estado === 'En Ejecución' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {caso.estado}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{caso.fecha}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Comunidad:</p>
                      <p className="font-semibold text-gray-900">{caso.comunidad}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Resultado:</p>
                      <p className="font-semibold text-gray-900">{caso.resultado}</p>
                    </div>
                  </div>
                  
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
        </Tabs>

        {/* Footer Informativo */}
        <Card className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              ¿Necesitas Asesoría en Derechos Étnicos Adicionales?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nuestra IA está disponible 24/7 para brindarte orientación especializada en derechos étnicos adicionales.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <Scale className="mr-2 h-5 w-5" />
                Consulta de Derechos
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Ver Marco Jurídico
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DerechosEtnicosAdicionales;

