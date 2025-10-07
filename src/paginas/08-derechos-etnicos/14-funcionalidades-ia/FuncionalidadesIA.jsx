import { useState } from 'react';
import { Brain, Zap, Target, TrendingUp, AlertTriangle, CheckCircle, BarChart3, FileSearch, Activity, Settings, Play, Pause } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import toast from 'react-hot-toast';

const FuncionalidadesIA = () => {
  const [tabActivo, setTabActivo] = useState('dashboard');

  const [estadisticas, setEstadisticas] = useState({
    modelosActivos: 8,
    precision: 95.8,
    procesosAutomatizados: 1245,
    tiempoRespuesta: 1.2,
    tasaExito: 94.3
  });

  const funcionalidadesIA = [
    {
      id: 'predictivo',
      nombre: 'Análisis Predictivo',
      des: 'Predicción de resultados y tendencias en casos étnicos',
      icono: TrendingUp,
      color: 'blue',
      estado: 'activo',
      precision: 96.5,
      usosMes: 234,
      capacidades: [
        'Predicción de resolución de casos',
        'Tendencias de violaciones de derechos',
        'Análisis de riesgos territoriales',
        'Proyecciones de impacto'
      ],
      metricas: {
        precision: 96.5,
        velocidad: '1.2s',
        confiabilidad: 98.2
      }
    },
    {
      id: 'clasificacion',
      nombre: 'Clasificación Automática',
      des: 'Clasificación inteligente de casos y documentos',
      icono: Target,
      color: 'purple',
      estado: 'activo',
      precision: 98.1,
      usosMes: 456,
      capacidades: [
        'Clasificación por tipología',
        'Priorización automática',
        'Derivación inteligente',
        'Categorización de evidencias'
      ],
      metricas: {
        precision: 98.1,
        velocidad: '0.8s',
        confiabilidad: 99.1
      }
    },
    {
      id: 'patrones',
      nombre: 'Reconocimiento de Patrones',
      des: 'Identificación de patrones y anomalías en datos',
      icono: BarChart3,
      color: 'green',
      estado: 'activo',
      precision: 94.3,
      usosMes: 189,
      capacidades: [
        'Detección de patrones de violación',
        'Análisis de tendencias geográficas',
        'Identificación de actores recurrentes',
        'Correlación de casos'
      ],
      metricas: {
        precision: 94.3,
        velocidad: '2.1s',
        confiabilidad: 96.7
      }
    },
    {
      id: 'recomendaciones',
      nombre: 'Generación de Recomendaciones',
      des: 'Recomendaciones inteligentes basadas en casos similares',
      icono: CheckCircle,
      color: 'indigo',
      estado: 'activo',
      precision: 93.7,
      usosMes: 312,
      capacidades: [
        'Recomendaciones jurídicas',
        'Estrategias procesales',
        'Acciones preventivas',
        'Mejores prácticas'
      ],
      metricas: {
        precision: 93.7,
        velocidad: '1.5s',
        confiabilidad: 95.4
      }
    },
    {
      id: 'sentimientos',
      nombre: 'Análisis de Sentimientos',
      des: 'Evaluación del tono y urgencia en comunicaciones',
      icono: Brain,
      color: 'orange',
      estado: 'activo',
      precision: 89.5,
      usosMes: 178,
      capacidades: [
        'Detección de urgencia',
        'Análisis de gravedad',
        'Evaluación de riesgo psicosocial',
        'Priorización emocional'
      ],
      metricas: {
        precision: 89.5,
        velocidad: '0.9s',
        confiabilidad: 92.1
      }
    },
    {
      id: 'extraccion',
      nombre: 'Extracción de Información',
      des: 'Extracción automática de datos relevantes de documentos',
      icono: FileSearch,
      color: 'cyan',
      estado: 'activo',
      precision: 97.2,
      usosMes: 523,
      capacidades: [
        'Extracción de entidades',
        'Identificación de fechas clave',
        'Reconocimiento de actores',
        'Datos estructurados'
      ],
      metricas: {
        precision: 97.2,
        velocidad: '1.1s',
        confiabilidad: 98.5
      }
    },
    {
      id: 'validacion',
      nombre: 'Validación Automática',
      des: 'Validación de datos y coherencia de información',
      icono: CheckCircle,
      color: 'emerald',
      estado: 'activo',
      precision: 99.1,
      usosMes: 398,
      capacidades: [
        'Validación de formularios',
        'Coherencia de datos',
        'Verificación de requisitos',
        'Control de calidad'
      ],
      metricas: {
        precision: 99.1,
        velocidad: '0.6s',
        confiabilidad: 99.8
      }
    },
    {
      id: 'alertas',
      nombre: 'Alertas Inteligentes',
      des: 'Sistema de alertas tempranas basado en IA',
      icono: AlertTriangle,
      color: 'red',
      estado: 'activo',
      precision: 92.8,
      usosMes: 267,
      capacidades: [
        'Detección temprana de riesgos',
        'Alertas de vencimientos',
        'Notificaciones críticas',
        'Escalamiento automático'
      ],
      metricas: {
        precision: 92.8,
        velocidad: '0.5s',
        confiabilidad: 94.9
      }
    }
  ];

  const actividadesRecientes = [
    {
      id: 1,
      funcionalidad: 'Clasificación Automática',
      accion: 'Clasificó 45 casos nuevos',
      resultado: '45/45 correctos',
      fecha: '2024-01-20 15:30',
      precision: 100
    },
    {
      id: 2,
      funcionalidad: 'Análisis Predictivo',
      accion: 'Predijo resolución de 12 casos',
      resultado: '11/12 acertados',
      fecha: '2024-01-20 14:15',
      precision: 91.7
    },
    {
      id: 3,
      funcionalidad: 'Extracción de Información',
      accion: 'Procesó 230 documentos',
      resultado: '228/230 exitosos',
      fecha: '2024-01-20 13:00',
      precision: 99.1
    },
    {
      id: 4,
      funcionalidad: 'Alertas Inteligentes',
      accion: 'Generó 8 alertas críticas',
      resultado: '8/8 pertinentes',
      fecha: '2024-01-20 12:45',
      precision: 100
    }
  ];

  const accionesRapidas = [
    {
      tit: 'Entrenar Modelo',
      des: 'Mejorar precisión',
      icono: Brain,
      accion: () => {
        toast.success('Iniciando entrenamiento de modelos...');
      },
      color: 'purple'
    },
    {
      tit: 'Ver Métricas',
      des: 'Rendimiento actual',
      icono: BarChart3,
      accion: () => {
        setTabActivo('metricas');
        toast.success('Cargando métricas...');
      },
      color: 'blue'
    },
    {
      tit: 'Configurar IA',
      des: 'Ajustar parámetros',
      icono: Settings,
      accion: () => {
        setTabActivo('configuracion');
        toast.success('Abriendo configuración...');
      },
      color: 'green'
    },
    {
      tit: 'Historial',
      des: 'Ver actividad',
      icono: Activity,
      accion: () => {
        setTabActivo('historial');
        toast.success('Cargando historial...');
      },
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Funcionalidades IA
                </h1>
                <p className="text-gray-600 mt-1">
                  Panel de Control y Configuración de Inteligencia Artificial
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Gestión completa de modelos y funcionalidades de IA del sistema étnico
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-200 rounded-full">
                <Zap className="w-5 h-5 text-purple-700 mr-2" />
                <span className="text-sm font-semibold text-purple-700">IA ACTIVA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">{estadisticas.modelosActivos}</div>
            <div className="text-sm text-gray-600">Modelos Activos</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{estadisticas.precision}%</div>
            <div className="text-sm text-gray-600">Precisión Promedio</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{estadisticas.procesosAutomatizados}</div>
            <div className="text-sm text-gray-600">Procesos Automatizados</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">{estadisticas.tiempoRespuesta}s</div>
            <div className="text-sm text-gray-600">Tiempo Respuesta</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{estadisticas.tasaExito}%</div>
            <div className="text-sm text-gray-600">Tasa de Éxito</div>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Acciones Rápidas</h2>
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
                <h3 className="font-semibold text-gray-900 mb-2">{accion.tit}</h3>
                <p className="text-sm text-gray-600">{accion.des}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={tabActivo} onValueChange={setTabActivo} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="funcionalidades">Funcionalidades</TabsTrigger>
            <TabsTrigger value="metricas">Métricas</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
            <TabsTrigger value="configuracion">Configuración</TabsTrigger>
          </TabsList>

          {/* Tab: Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {funcionalidadesIA.map((func) => (
                <Card key={func.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-${func.color}-100 rounded-xl flex items-center justify-center`}>
                        <func.icono className={`w-6 h-6 text-${func.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{func.nombre}</h3>
                        <p className="text-sm text-gray-600">{func.des}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{func.estado}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Precisión</p>
                      <p className="text-sm font-bold text-purple-600">{func.precision}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Usos/Mes</p>
                      <p className="text-sm font-bold text-blue-600">{func.usosMes}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Estado</p>
                      <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1"></div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-semibold text-gray-700">Capacidades:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {func.capacidades.slice(0, 3).map((cap, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className={`bg-${func.color}-500 hover:bg-${func.color}-600`}>
                      <Play className="w-4 h-4 mr-2" />
                      Ejecutar
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

          {/* Tab: Funcionalidades */}
          <TabsContent value="funcionalidades">
            <div className="space-y-6">
              {funcionalidadesIA.map((func) => (
                <Card key={func.id} className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-${func.color}-100 rounded-2xl flex items-center justify-center`}>
                        <func.icono className={`w-7 h-7 text-${func.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{func.nombre}</h3>
                        <p className="text-gray-600">{func.des}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{func.estado}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Precisión</p>
                      <p className="text-2xl font-bold text-purple-600">{func.metricas.precision}%</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Velocidad</p>
                      <p className="text-2xl font-bold text-blue-600">{func.metricas.velocidad}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Confiabilidad</p>
                      <p className="text-2xl font-bold text-green-600">{func.metricas.confiabilidad}%</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Capacidades Completas:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {func.capacidades.map((cap, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-sm text-gray-700">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className={`bg-${func.color}-500 hover:bg-${func.color}-600`}>
                      <Play className="w-4 h-4 mr-2" />
                      Ejecutar Ahora
                    </Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar Parámetros
                    </Button>
                    <Button variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Ver Métricas
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Métricas */}
          <TabsContent value="metricas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Rendimiento por Funcionalidad</h3>
                <div className="space-y-3">
                  {funcionalidadesIA.map((func) => (
                    <div key={func.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{func.nombre}</span>
                        <span className="font-semibold text-gray-900">{func.precision}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-${func.color}-500 h-2 rounded-full`} 
                          style={{ width: `${func.precision}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Uso Mensual</h3>
                <div className="space-y-4">
                  {funcionalidadesIA
                    .sort((a, b) => b.usosMes - a.usosMes)
                    .slice(0, 5)
                    .map((func) => (
                      <div key={func.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <func.icono className={`w-5 h-5 text-${func.color}-600`} />
                          <span className="text-sm text-gray-700">{func.nombre}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{func.usosMes}</span>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Historial */}
          <TabsContent value="historial">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-purple-500" />
                Actividades Recientes
              </h3>
              <div className="space-y-4">
                {actividadesRecientes.map((actividad) => (
                  <div key={actividad.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">{actividad.funcionalidad}</p>
                      <p className="text-sm text-gray-600">{actividad.accion}</p>
                      <p className="text-xs text-gray-500 mt-1">{actividad.fecha}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{actividad.resultado}</p>
                      <Badge className={`mt-1 ${
                        actividad.precision === 100 ? 'bg-green-100 text-green-800' :
                        actividad.precision >= 95 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {actividad.precision}% precisión
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Configuración */}
          <TabsContent value="configuracion">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-7 h-7 mr-3 text-purple-500" />
                Configuración de IA
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nivel de Precisión Requerido
                  </label>
                  <input
                    type="range"
                    min="80"
                    max="100"
                    defaultValue="95"
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>80%</span>
                    <span>95%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Frecuencia de Entrenamiento
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none">
                    <option>Diario</option>
                    <option>Semanal</option>
                    <option>Mensual</option>
                    <option>Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Modo de Operación
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none">
                    <option>Automático Completo</option>
                    <option>Semi-automático</option>
                    <option>Manual con Sugerencias</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button className="flex-1 bg-purple-500 hover:bg-purple-600">
                    Guardar Configuración
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Restaurar Valores
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Inteligencia Artificial al Servicio de los Derechos Étnicos
            </h2>
            <p className="text-lg mb-6 opacity-90">
              8 modelos de IA trabajando continuamente para mejorar la gestión de casos étnicos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Brain className="mr-2 h-5 w-5" />
                Entrenar Modelos
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                <BarChart3 className="mr-2 h-5 w-5" />
                Ver Métricas Completas
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FuncionalidadesIA;

