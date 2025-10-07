import React, { useState } from 'react';
import { Brain, CheckCircle, BookOpen, Activity, Clock, Settings, ExternalLink, Search, Target, Grid, Users, Scale, Plane, Camera, BarChart3, TrendingUp, AlertTriangle, Info, ShieldCheck } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const HerramientasIA = () => {
  const [tabActivo, setTabActivo] = useState('dashboard');
  const [herramientaActiva, setHerramientaActiva] = useState(null);
  const [estadisticas, setEstadisticas] = useState({
    herramientasActivas: 8,
    uptime: 99.9,
    consultasProcesadas: 15420,
    eficiencia: 97.3,
    errores: 0.2
  });

  const herramientas = [
    {
      id: 'auditoria-forense',
      tit: 'Auditoría Forense',
      des: 'Análisis forense de documentos y procesos con IA especializada en detección de irregularidades',
      icono: '🔬',
      cat: 'Análisis',
      est: 'activo',
      uptime: 99.8,
      consultas: 2340,
      eficiencia: 96.5,
      color: 'purple',
      caracteristicas: [
        'Análisis de documentos legales',
        'Detección de inconsistencias',
        'Generación de reportes forenses',
        'Comparación de firmas',
        'Análisis de metadatos'
      ],
      ruta: '/auditoria-forense'
    },
    {
      id: 'geo-dashboard',
      tit: 'Geo Dashboard',
      des: 'Visualización geográfica avanzada de casos y proyectos con análisis geoespacial',
      icono: '🗺️',
      cat: 'Visualización',
      est: 'activo',
      uptime: 99.9,
      consultas: 1890,
      eficiencia: 98.2,
      color: 'blue',
      caracteristicas: [
        'Mapas interactivos',
        'Análisis geoespacial',
        'Heat maps de casos',
        'Tracking en tiempo real',
        'Exportación de datos'
      ],
      ruta: '/geo-dashboard'
    },
    {
      id: 'monitor-ia',
      tit: 'Monitor IA',
      des: 'Monitoreo en tiempo real de sistemas de IA con métricas de rendimiento y alertas',
      icono: '📊',
      cat: 'Monitoreo',
      est: 'activo',
      uptime: 99.7,
      consultas: 5670,
      eficiencia: 97.8,
      color: 'green',
      caracteristicas: [
        'Monitoreo en tiempo real',
        'Métricas de rendimiento',
        'Alertas automáticas',
        'Dashboard de salud',
        'Reportes de incidencias'
      ],
      ruta: '/monitor-ia'
    },
    {
      id: 'ia-especialistas',
      tit: 'IA Especialistas',
      des: 'Panel de especialistas IA por área de conocimiento con expertise específico',
      icono: '🧠',
      cat: 'Especialización',
      est: 'activo',
      uptime: 99.6,
      consultas: 3450,
      eficiencia: 96.9,
      color: 'indigo',
      caracteristicas: [
        'Especialistas por área',
        'Consultas especializadas',
        'Base de conocimiento experto',
        'Análisis multidisciplinario',
        'Recomendaciones personalizadas'
      ],
      ruta: '/ia-especialistas'
    },
    {
      id: 'etica-ia',
      tit: 'Ética IA',
      des: 'Consejo de ética para sistemas de IA con evaluación de decisiones y transparencia',
      icono: '⚖️',
      cat: 'Ética',
      est: 'activo',
      uptime: 99.5,
      consultas: 890,
      eficiencia: 98.7,
      color: 'amber',
      caracteristicas: [
        'Evaluación ética',
        'Transparencia algorítmica',
        'Bias detection',
        'Fairness assessment',
        'Compliance legal'
      ],
      ruta: '/etica-ia'
    },
    {
      id: 'clasificador-casos',
      tit: 'Clasificador de Casos',
      des: 'Derivación inteligente automática de casos con análisis predictivo',
      icono: '🎯',
      cat: 'Clasificación',
      est: 'activo',
      uptime: 99.9,
      consultas: 2100,
      eficiencia: 97.1,
      color: 'emerald',
      caracteristicas: [
        'Clasificación automática',
        'Derivación inteligente',
        'Análisis predictivo',
        'Confianza de clasificación',
        'Aprendizaje continuo'
      ],
      ruta: '/clasificador-casos'
    }
  ];

  const metricasGenerales = [
    {
      tit: 'Herramientas Activas',
      valor: estadisticas.herramientasActivas,
      icono: Brain,
      color: 'blue',
      tendencia: '+1'
    },
    {
      tit: 'Uptime Promedio',
      valor: `${estadisticas.uptime}%`,
      icono: Activity,
      color: 'green',
      tendencia: '+0.1%'
    },
    {
      tit: 'Consultas Procesadas',
      valor: estadisticas.consultasProcesadas.toLocaleString(),
      icono: BarChart3,
      color: 'purple',
      tendencia: '+1,240'
    },
    {
      tit: 'Eficiencia General',
      valor: `${estadisticas.eficiencia}%`,
      icono: TrendingUp,
      color: 'orange',
      tendencia: '+2.3%'
    },
    {
      tit: 'Tasa de Errores',
      valor: `${estadisticas.errores}%`,
      icono: AlertTriangle,
      color: 'red',
      tendencia: '-0.1%'
    }
  ];

  const actividadesRecientes = [
    {
      herramienta: 'Monitor IA',
      accion: 'Alert de rendimiento',
      detalle: 'CPU usage > 80%',
      tiempo: 'Hace 2 minutos',
      tip: 'warning',
      icono: AlertTriangle
    },
    {
      herramienta: 'Auditoría Forense',
      accion: 'Análisis completado',
      detalle: 'Documento procesado exitosamente',
      tiempo: 'Hace 5 minutos',
      tip: 'success',
      icono: CheckCircle
    },
    {
      herramienta: 'Geo Dashboard',
      accion: 'Actualización de datos',
      detalle: 'Nuevos casos agregados al mapa',
      tiempo: 'Hace 12 minutos',
      tip: 'info',
      icono: Info
    },
    {
      herramienta: 'Clasificador de Casos',
      accion: 'Modelo actualizado',
      detalle: 'Precisión mejorada a 97.1%',
      tiempo: 'Hace 1 hora',
      tip: 'success',
      icono: TrendingUp
    },
    {
      herramienta: 'Ética IA',
      accion: 'Evaluación completada',
      detalle: 'Decision approved by ethics board',
      tiempo: 'Hace 2 horas',
      tip: 'success',
      icono: ShieldCheck
    }
  ];

  const categorias = [
    { id: 'todas', nombre: 'Todas', icono: Grid, color: 'gray' },
    { id: 'analisis', nombre: 'Análisis', icono: Brain, color: 'purple' },
    { id: 'visualizacion', nombre: 'Visualización', icono: BarChart3, color: 'blue' },
    { id: 'monitoreo', nombre: 'Monitoreo', icono: Activity, color: 'green' },
    { id: 'especializacion', nombre: 'Especialización', icono: Users, color: 'indigo' },
    { id: 'etica', nombre: 'Ética', icono: Scale, color: 'amber' },
    { id: 'clasificacion', nombre: 'Clasificación', icono: Target, color: 'emerald' }
  ];

  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');

  const herramientasFiltradas = categoriaFiltro === 'todas' 
    ? herramientas 
    : herramientas.filter(h => h.cat.toLowerCase() === categoriaFiltro);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Herramientas IA
                </h1>
                <p className="text-gray-600 mt-1">
                  Ecosistema de Herramientas Complementarias de Inteligencia Artificial
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Herramientas especializadas que complementan y potencian los módulos principales de IA
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full">
                <Settings className="w-5 h-5 text-purple-700 mr-2" />
                <span className="text-sm font-semibold text-purple-700">HERRAMIENTAS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Métricas Generales */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          {metricasGenerales.map((metrica, index) => (
            <Card key={index} className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${metrica.color}-100 text-${metrica.color}-600 mb-3`}>
                <metrica.icono className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metrica.valor}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {metrica.tit}
              </div>
              <div className={`text-xs text-${metrica.color}-600 font-medium`}>
                {metrica.tendencia}
              </div>
            </Card>
          ))}
        </div>

        {/* Filtros por Categoría */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Categorías de Herramientas
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaFiltro(categoria.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  categoriaFiltro === categoria.id
                    ? `border-${categoria.color}-500 bg-${categoria.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <categoria.icono className={`w-5 h-5 text-${categoria.color}-600`} />
                <span className="font-medium text-gray-900">{categoria.nombre}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs Principales */}
        <Tabs value={tabActivo} onValueChange={setTabActivo} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="herramientas">Herramientas</TabsTrigger>
            <TabsTrigger value="actividades">Actividades</TabsTrigger>
            <TabsTrigger value="metricas">Métricas</TabsTrigger>
          </TabsList>

          {/* Tab: Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Estado de Herramientas */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-purple-500" />
                  Estado de Herramientas
                </h3>
                <div className="space-y-4">
                  {herramientas.slice(0, 4).map((herramienta) => (
                    <div key={herramienta.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{herramienta.icono}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{herramienta.tit}</h4>
                          <p className="text-sm text-gray-600">{herramienta.cat}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${
                          herramienta.est === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {herramienta.est}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {herramienta.uptime}% uptime
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Actividades Recientes */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-purple-500" />
                  Actividades Recientes
                </h3>
                <div className="space-y-4">
                  {actividadesRecientes.slice(0, 5).map((actividad, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        actividad.tip === 'success' ? 'bg-green-100 text-green-600' :
                        actividad.tip === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        actividad.tip === 'error' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <actividad.icono className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{actividad.herramienta}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{actividad.accion}</span>
                        </div>
                        <p className="text-xs text-gray-500">{actividad.detalle}</p>
                        <p className="text-xs text-gray-400">{actividad.tiempo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Herramientas */}
          <TabsContent value="herramientas">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {herramientasFiltradas.map((herramienta) => (
                <Card key={herramienta.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl">{herramienta.icono}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{herramienta.tit}</h3>
                      <Badge className={`bg-${herramienta.color}-100 text-${herramienta.color}-800 mt-1`}>
                        {herramienta.cat}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 text-sm">{herramienta.des}</p>
                  
                  <div className="space-y-2 mb-4">
                    {herramienta.caracteristicas.slice(0, 3).map((caracteristica, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-gray-900">{herramienta.uptime}%</div>
                      <div className="text-gray-500">Uptime</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-bold text-gray-900">{herramienta.eficiencia}%</div>
                      <div className="text-gray-500">Eficiencia</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className={`${
                      herramienta.est === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {herramienta.est}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-1" />
                        Config
                      </Button>
                      <Button size="sm" className={`bg-${herramienta.color}-500 hover:bg-${herramienta.color}-600`}>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Acceder
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Actividades */}
          <TabsContent value="actividades">
            <div className="space-y-4">
              {actividadesRecientes.map((actividad, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      actividad.tip === 'success' ? 'bg-green-100 text-green-600' :
                      actividad.tip === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      actividad.tip === 'error' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <actividad.icono className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{actividad.herramienta}</h3>
                        <Badge className={`${
                          actividad.tip === 'success' ? 'bg-green-100 text-green-800' :
                          actividad.tip === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          actividad.tip === 'error' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {actividad.tip}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {actividad.accion}
                      </p>
                      <p className="text-sm text-gray-500 mb-1">
                        {actividad.detalle}
                      </p>
                      <p className="text-xs text-gray-400">
                        {actividad.tiempo}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Métricas */}
          <TabsContent value="metricas">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metricasGenerales.map((metrica, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${metrica.color}-100 text-${metrica.color}-600 mb-4`}>
                    <metrica.icono className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {metrica.tit}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {metrica.valor}
                  </div>
                  <div className={`text-sm text-${metrica.color}-600 font-medium`}>
                    {metrica.tendencia}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Informativo */}
        <Card className="p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              ¿Necesitas Configurar una Herramienta?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nuestro ecosistema de herramientas IA está diseñado para complementar y potenciar todos los módulos principales.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <Settings className="mr-2 h-5 w-5" />
                Configurar Herramientas
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Ver Documentación
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HerramientasIA;
