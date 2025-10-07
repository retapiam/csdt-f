import { useState } from 'react';
import { Layers, Map, Mountain, Shield, Users, Scale, Leaf, FileText, TrendingUp, Target, Download, Brain, Eye, Filter, BarChart3 } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import toast from 'react-hot-toast';

const TipologiaCasosEtnicos = () => {
  const [tabActivo, setTabActivo] = useState('dashboard');
  const [tipologiaSeleccionada, setTipologiaSeleccionada] = useState('todas');

  const [estadisticas, setEstadisticas] = useState({
    totalCasos: 1248,
    casosActivos: 342,
    tiposCasos: 10,
    comunidadesAfectadas: 156,
    tasaResolucion: 78.5
  });

  const tipologias = [
    {
      id: 'territorial',
      nombre: 'Vulneración Derechos Territoriales',
      des: 'Casos de afectación a territorios ancestrales y colectivos',
      icono: Map,
      color: 'blue',
      casos: 234,
      prioridad: 'Alta',
      ejemplos: [
        'Invasión de territorios',
        'Despojos de tierras',
        'Incumplimiento de títulos',
        'Conflictos de límites'
      ]
    },
    {
      id: 'extractivos',
      nombre: 'Proyectos Extractivos',
      des: 'Afectación por minería, petróleo y mega proyectos',
      icono: Mountain,
      color: 'orange',
      casos: 189,
      prioridad: 'Crítica',
      ejemplos: [
        'Minería ilegal',
        'Explotación petrolera',
        'Hidroeléctricas',
        'Infraestructura vial'
      ]
    },
    {
      id: 'consulta-previa',
      nombre: 'Consulta Previa',
      des: 'Violación del derecho a la consulta previa',
      icono: Users,
      color: 'purple',
      casos: 156,
      prioridad: 'Alta',
      ejemplos: [
        'Ausencia de consulta',
        'Consulta inadecuada',
        'Incumplimiento de acuerdos',
        'Falta de consentimiento'
      ]
    },
    {
      id: 'violencia',
      nombre: 'Violencia y Desplazamiento',
      des: 'Casos de violencia armada y desplazamiento forzado',
      icono: Shield,
      color: 'red',
      casos: 198,
      prioridad: 'Crítica',
      ejemplos: [
        'Desplazamiento forzado',
        'Amenazas a líderes',
        'Masacres',
        'Confinamiento'
      ]
    },
    {
      id: 'discriminacion',
      nombre: 'Discriminación Étnica',
      des: 'Discriminación racial y exclusión social',
      icono: Scale,
      color: 'pink',
      casos: 145,
      prioridad: 'Media',
      ejemplos: [
        'Discriminación laboral',
        'Exclusión educativa',
        'Racismo institucional',
        'Estigmatización'
      ]
    },
    {
      id: 'conflictos',
      nombre: 'Conflictos Territoriales',
      des: 'Conflictos interétnicos y de tierras',
      icono: Target,
      color: 'yellow',
      casos: 87,
      prioridad: 'Media',
      ejemplos: [
        'Conflictos inter-étnicos',
        'Superposiciones',
        'Límites territoriales',
        'Recursos compartidos'
      ]
    },
    {
      id: 'culturales',
      nombre: 'Derechos Culturales',
      des: 'Afectación al patrimonio cultural',
      icono: FileText,
      color: 'indigo',
      casos: 92,
      prioridad: 'Media',
      ejemplos: [
        'Sitios sagrados',
        'Patrimonio inmaterial',
        'Lenguas en riesgo',
        'Prácticas tradicionales'
      ]
    },
    {
      id: 'justicia',
      nombre: 'Acceso a Justicia',
      des: 'Barreras en el acceso a la justicia',
      icono: Scale,
      color: 'cyan',
      casos: 73,
      prioridad: 'Alta',
      ejemplos: [
        'Jurisdicción especial',
        'Debido proceso',
        'Acceso a defensa',
        'Discriminación judicial'
      ]
    },
    {
      id: 'ambientales',
      nombre: 'Derechos Ambientales',
      des: 'Daños ambientales en territorios étnicos',
      icono: Leaf,
      color: 'green',
      casos: 118,
      prioridad: 'Alta',
      ejemplos: [
        'Contaminación hídrica',
        'Deforestación',
        'Pérdida biodiversidad',
        'Cambio climático'
      ]
    },
    {
      id: 'participacion',
      nombre: 'Participación Política',
      des: 'Restricción de participación política',
      icono: Users,
      color: 'violet',
      casos: 56,
      prioridad: 'Media',
      ejemplos: [
        'Circunscripciones especiales',
        'Representación política',
        'Autonomía territorial',
        'Decisiones públicas'
      ]
    }
  ];

  const casosRecientes = [
    {
      id: 1,
      titulo: 'Invasión Territorio Emberá - Risaralda',
      tipologia: 'Vulneración Derechos Territoriales',
      comunidad: 'Resguardo Emberá Chamí',
      fecha: '2024-01-20',
      estado: 'En Trámite',
      prioridad: 'Alta',
      afectados: 450
    },
    {
      id: 2,
      titulo: 'Minería Ilegal - Chocó',
      tipologia: 'Proyectos Extractivos',
      comunidad: 'Consejo Comunitario Alto Atrato',
      fecha: '2024-01-18',
      estado: 'Urgente',
      prioridad: 'Crítica',
      afectados: 1200
    },
    {
      id: 3,
      titulo: 'Consulta Previa Hidroeléctrica - Cauca',
      tipologia: 'Consulta Previa',
      comunidad: 'Pueblo Nasa',
      fecha: '2024-01-15',
      estado: 'En Proceso',
      prioridad: 'Alta',
      afectados: 3500
    },
    {
      id: 4,
      titulo: 'Desplazamiento Forzado - Arauca',
      tipologia: 'Violencia y Desplazamiento',
      comunidad: 'Pueblo U\'wa',
      fecha: '2024-01-12',
      estado: 'Urgente',
      prioridad: 'Crítica',
      afectados: 280
    }
  ];

  const casosFiltrados = tipologiaSeleccionada === 'todas' 
    ? casosRecientes 
    : casosRecientes.filter(c => {
        const tipologia = tipologias.find(t => t.nombre === c.tipologia);
        return tipologia?.id === tipologiaSeleccionada;
      });

  const accionesRapidas = [
    {
      tit: 'Clasificar Caso',
      des: 'IA automática',
      icono: Brain,
      accion: () => {
        toast.success('Iniciando clasificación automática...');
      },
      color: 'purple'
    },
    {
      tit: 'Análisis de Patrones',
      des: 'Tendencias y estadísticas',
      icono: BarChart3,
      accion: () => {
        setTabActivo('estadisticas');
        toast.success('Cargando análisis...');
      },
      color: 'blue'
    },
    {
      tit: 'Filtrar Casos',
      des: 'Búsqueda avanzada',
      icono: Filter,
      accion: () => {
        toast.success('Activando filtros...');
      },
      color: 'green'
    },
    {
      tit: 'Reporte General',
      des: 'Generar reporte',
      icono: Download,
      accion: () => {
        toast.success('Generando reporte...');
      },
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Tipología de Casos Étnicos
                </h1>
                <p className="text-gray-600 mt-1">
                  Clasificación y Gestión de Casos según Tipología
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Sistema de clasificación automática con IA y análisis de patrones
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-200 rounded-full">
                <Layers className="w-5 h-5 text-indigo-700 mr-2" />
                <span className="text-sm font-semibold text-indigo-700">TIPOLOGÍA IA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{estadisticas.totalCasos}</div>
            <div className="text-sm text-gray-600">Total Casos</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{estadisticas.casosActivos}</div>
            <div className="text-sm text-gray-600">Casos Activos</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">{estadisticas.tiposCasos}</div>
            <div className="text-sm text-gray-600">Tipos de Casos</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">{estadisticas.comunidadesAfectadas}</div>
            <div className="text-sm text-gray-600">Comunidades</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{estadisticas.tasaResolucion}%</div>
            <div className="text-sm text-gray-600">Tasa Resolución</div>
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tipologias">Tipologías</TabsTrigger>
            <TabsTrigger value="casos">Casos</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab: Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tipologias.slice(0, 6).map((tip) => (
                <Card key={tip.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${tip.color}-100 rounded-xl flex items-center justify-center`}>
                      <tip.icono className={`w-6 h-6 text-${tip.color}-600`} />
                    </div>
                    <Badge className={`${
                      tip.prioridad === 'Crítica' ? 'bg-red-100 text-red-800' :
                      tip.prioridad === 'Alta' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tip.prioridad}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-4">{tip.des}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-2xl font-bold text-gray-900">{tip.casos}</span>
                    <span className="text-sm text-gray-500">casos registrados</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Tipologías */}
          <TabsContent value="tipologias">
            <div className="space-y-6">
              {tipologias.map((tip) => (
                <Card key={tip.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-${tip.color}-100 rounded-2xl flex items-center justify-center`}>
                        <tip.icono className={`w-7 h-7 text-${tip.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{tip.nombre}</h3>
                        <p className="text-gray-600">{tip.des}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">{tip.casos}</div>
                      <Badge className={`${
                        tip.prioridad === 'Crítica' ? 'bg-red-100 text-red-800' :
                        tip.prioridad === 'Alta' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tip.prioridad}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Ejemplos de casos:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {tip.ejemplos.map((ejemplo, idx) => (
                        <div key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                          {ejemplo}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Casos */}
          <TabsContent value="casos">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filtrar por Tipología</label>
              <select
                value={tipologiaSeleccionada}
                onChange={(e) => setTipologiaSeleccionada(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
              >
                <option value="todas">Todas las Tipologías</option>
                {tipologias.map((tip) => (
                  <option key={tip.id} value={tip.id}>{tip.nombre}</option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              {casosFiltrados.map((caso) => (
                <Card key={caso.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{caso.titulo}</h3>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-indigo-100 text-indigo-800">{caso.tipologia}</Badge>
                        <Badge className={`${
                          caso.estado === 'Urgente' ? 'bg-red-100 text-red-800' :
                          caso.estado === 'En Trámite' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {caso.estado}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{caso.fecha}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Comunidad:</p>
                      <p className="font-semibold text-gray-900">{caso.comunidad}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Personas Afectadas:</p>
                      <p className="font-semibold text-gray-900">{caso.afectados}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Prioridad:</p>
                      <Badge className={`${
                        caso.prioridad === 'Crítica' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {caso.prioridad}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Ficha
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Estadísticas */}
          <TabsContent value="estadisticas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Distribución por Tipología</h3>
                <div className="space-y-3">
                  {tipologias.map((tip) => (
                    <div key={tip.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{tip.nombre}</span>
                        <span className="font-semibold text-gray-900">{tip.casos}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-${tip.color}-500 h-2 rounded-full`} 
                          style={{ width: `${(tip.casos / estadisticas.totalCasos) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Niveles de Prioridad</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-red-900">Crítica</p>
                      <p className="text-sm text-red-700">Casos urgentes</p>
                    </div>
                    <span className="text-2xl font-bold text-red-600">
                      {tipologias.filter(t => t.prioridad === 'Crítica').reduce((acc, t) => acc + t.casos, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-orange-900">Alta</p>
                      <p className="text-sm text-orange-700">Requiere atención</p>
                    </div>
                    <span className="text-2xl font-bold text-orange-600">
                      {tipologias.filter(t => t.prioridad === 'Alta').reduce((acc, t) => acc + t.casos, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-yellow-900">Media</p>
                      <p className="text-sm text-yellow-700">Seguimiento normal</p>
                    </div>
                    <span className="text-2xl font-bold text-yellow-600">
                      {tipologias.filter(t => t.prioridad === 'Media').reduce((acc, t) => acc + t.casos, 0)}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Sistema de Clasificación Inteligente
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nuestra IA clasifica y deriva automáticamente los casos según su tipología para una gestión más eficiente.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                <Layers className="mr-2 h-5 w-5" />
                Clasificar Caso
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-indigo-600">
                <TrendingUp className="mr-2 h-5 w-5" />
                Ver Análisis
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TipologiaCasosEtnicos;

