import React, { useState, useEffect } from 'react';
import { MapPin, Mountain, Leaf, Target, Download, Zap, Play, BookOpen, FileText, Map, Settings, Compass, TreePine, Globe, Sun, Activity, TrendingUp, Shield } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import toast from 'react-hot-toast';
import estadisticasService from '../../../services/EstadisticasService';

const TerritorialIA = () => {
  const [tabActivo, setTabActivo] = useState('dashboard');
  const [cargandoEstadisticas, setCargandoEstadisticas] = useState(true);
  
  const [estadisticas, setEstadisticas] = useState({
    proyectosTerritoriales: 0,
    hectareasAnalizadas: 0,
    comunidadesAfectadas: 0,
    inversionMovilizada: 0,
    efectividad: 0
  });

  // Cargar estadísticas reales del backend
  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        setCargandoEstadisticas(true);
        const [proyectos, etnicas, ia] = await Promise.all([
          estadisticasService.obtenerEstadisticasProyectos(),
          estadisticasService.obtenerEstadisticasEtnicas(),
          estadisticasService.obtenerEstadisticasIA()
        ]);
        
        if (proyectos.success && etnicas.success && ia.success) {
          const totalComunidades = (etnicas.data.pueblosIndigenas || 0) + (etnicas.data.comunidadesAfro || 0);
          setEstadisticas({
            proyectosTerritoriales: proyectos.data.total_proyectos || 0,
            hectareasAnalizadas: totalComunidades * 10000 || 0, // Estimación basada en comunidades
            comunidadesAfectadas: totalComunidades,
            inversionMovilizada: proyectos.data.total_proyectos * 50000000 || 0, // Estimación
            efectividad: ia.data.efectividad_porcentaje || 0
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

  const [proyectosRecientes, setProyectosRecientes] = useState([
    {
      id: 1,
      tit: 'Plan de Desarrollo Territorial - La Guajira',
      tip: 'Ordenamiento Territorial',
      est: 'En Ejecución',
      fecha: '2024-01-15',
      ubicacion: 'La Guajira, Colombia',
      hectareas: 150000,
      inversion: 5000000000,
      comunidades: 25
    },
    {
      id: 2,
      tit: 'Proyecto Minero Sostenible - Chocó',
      tip: 'Minería Responsable',
      est: 'Planificación',
      fecha: '2024-01-12',
      ubicacion: 'Chocó, Colombia',
      hectareas: 50000,
      inversion: 3000000000,
      comunidades: 15
    },
    {
      id: 3,
      tit: 'Ampliación Territorial Nasa',
      tip: 'Derechos Territoriales',
      est: 'Completado',
      fecha: '2024-01-08',
      ubicacion: 'Cauca, Colombia',
      hectareas: 75000,
      inversion: 0,
      comunidades: 8
    }
  ]);

  const modulosTerritoriales = [
    {
      id: 'desarrollo-territorial',
      tit: 'Desarrollo Territorial',
      des: 'Planes integrales de desarrollo territorial y ordenamiento',
      icono: Map,
      color: 'blue',
      proyectos: 45,
      efectividad: 97.1
    },
    {
      id: 'derechos-mineros',
      tit: 'Derechos Mineros',
      des: 'Gestión sostenible de derechos mineros y ambientales',
      icono: Mountain,
      color: 'orange',
      proyectos: 32,
      efectividad: 94.8
    },
    {
      id: 'derechos-catastrales',
      tit: 'Derechos Catastrales',
      des: 'Administración y gestión de derechos catastrales',
      icono: Compass,
      color: 'green',
      proyectos: 28,
      efectividad: 96.5
    },
    {
      id: 'impacto-ambiental',
      tit: 'Impacto Ambiental',
      des: 'Evaluación y gestión de impactos ambientales territoriales',
      icono: Leaf,
      color: 'emerald',
      proyectos: 38,
      efectividad: 95.2
    },
    {
      id: 'territorios-ancestrales',
      tit: 'Territorios Ancestrales',
      des: 'Protección y gestión de territorios ancestrales',
      icono: TreePine,
      color: 'purple',
      proyectos: 23,
      efectividad: 98.1
    }
  ];

  const herramientasIA = [
    {
      tit: 'Análisis Geoespacial',
      des: 'IA especializada en análisis territorial y geoespacial',
      icono: MapPin,
      est: 'activo'
    },
    {
      tit: 'Evaluación de Impacto',
      des: 'Análisis automático de impactos territoriales y ambientales',
      icono: Target,
      est: 'activo'
    },
    {
      tit: 'Optimización Territorial',
      des: 'Optimización de uso del suelo y recursos territoriales',
      icono: TrendingUp,
      est: 'activo'
    },
    {
      tit: 'Predicción de Conflictos',
      des: 'Identificación temprana de conflictos territoriales',
      icono: Shield,
      est: 'activo'
    }
  ];

  const accionesRapidas = [
    {
      tit: 'Nuevo Proyecto',
      des: 'Crear proyecto territorial',
      icono: MapPin,
      accion: () => {
        toast.success('Iniciando nuevo proyecto territorial...');
        setTabActivo('nuevo-proyecto');
      },
      color: 'blue'
    },
    {
      tit: 'Análisis Geoespacial',
      des: 'Análisis territorial con IA',
      icono: Map,
      accion: () => {
        toast.success('Iniciando análisis geoespacial...');
      },
      color: 'green'
    },
    {
      tit: 'Plan Minero',
      des: 'Generar plan minero ambiental',
      icono: Mountain,
      accion: () => {
        toast.success('Generando plan minero...');
      },
      color: 'orange'
    },
    {
      tit: 'Reporte Territorial',
      des: 'Generar reporte completo',
      icono: Download,
      accion: () => {
        toast.success('Generando reporte territorial...');
      },
      color: 'purple'
    }
  ];

  const tiposMineria = [
    { id: 'oro', nombre: 'Oro', icono: '🥇', color: 'yellow' },
    { id: 'carbon', nombre: 'Carbón', icono: '⚫', color: 'gray' },
    { id: 'esmeraldas', nombre: 'Esmeraldas', icono: '💎', color: 'green' },
    { id: 'petroleo', nombre: 'Petróleo', icono: '🛢️', color: 'black' },
    { id: 'gas', nombre: 'Gas', icono: '⛽', color: 'blue' },
    { id: 'cobre', nombre: 'Cobre', icono: '🔶', color: 'orange' }
  ];

  const ecosistemas = [
    { id: 'bosque', nombre: 'Bosque', icono: '🌲', color: 'green' },
    { id: 'paramo', nombre: 'Páramo', icono: '🏔️', color: 'blue' },
    { id: 'humedal', nombre: 'Humedal', icono: '🌊', color: 'cyan' },
    { id: 'manglar', nombre: 'Manglar', icono: '🌿', color: 'emerald' },
    { id: 'marino', nombre: 'Marino-Costero', icono: '🌊', color: 'blue' },
    { id: 'amazonico', nombre: 'Amazónico', icono: '🌴', color: 'green' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Territorial IA
                </h1>
                <p className="text-gray-600 mt-1">
                  Desarrollo Territorial y Minero Inteligente
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Especializada en derechos mineros, ambientales, catastrales y ordenamiento territorial
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-full">
                <Map className="w-5 h-5 text-indigo-700 mr-2" />
                <span className="text-sm font-semibold text-indigo-700">IA TERRITORIAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {estadisticas.proyectosTerritoriales}
            </div>
            <div className="text-sm text-gray-600">Proyectos Territoriales</div>
          </Card>
          
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {(estadisticas.hectareasAnalizadas / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Hectáreas Analizadas</div>
          </Card>
          
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {estadisticas.comunidadesAfectadas}
            </div>
            <div className="text-sm text-gray-600">Comunidades</div>
          </Card>
          
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              ${(estadisticas.inversionMovilizada / 1000000000).toFixed(1)}B
            </div>
            <div className="text-sm text-gray-600">Inversión Movilizada</div>
          </Card>

          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {estadisticas.efectividad}%
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
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="modulos">Módulos</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="mineria">Minería</TabsTrigger>
            <TabsTrigger value="herramientas">Herramientas IA</TabsTrigger>
            <TabsTrigger value="reportes">Reportes</TabsTrigger>
          </TabsList>

          {/* Tab: Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Módulos Territoriales */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-indigo-500" />
                  Módulos Territoriales
                </h3>
                <div className="space-y-4">
                  {modulosTerritoriales.map((modulo) => (
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
                        <div className="text-lg font-bold text-gray-900">{modulo.proyectos}</div>
                        <div className="text-xs text-gray-500">proyectos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Herramientas IA */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-indigo-500" />
                  Herramientas de IA
                </h3>
                <div className="space-y-4">
                  {herramientasIA.map((herramienta, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <herramienta.icono className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{herramienta.tit}</h4>
                          <p className="text-sm text-gray-600">{herramienta.des}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {herramienta.est}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Módulos */}
          <TabsContent value="modulos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modulosTerritoriales.map((modulo) => (
                <Card key={modulo.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-${modulo.color}-100 rounded-xl flex items-center justify-center`}>
                      <modulo.icono className={`w-6 h-6 text-${modulo.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{modulo.tit}</h3>
                      <p className="text-sm text-gray-600">{modulo.proyectos} proyectos</p>
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

          {/* Tab: Proyectos */}
          <TabsContent value="proyectos">
            <div className="space-y-6">
              {proyectosRecientes.map((proyecto) => (
                <Card key={proyecto.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${
                        proyecto.est === 'Completado' ? 'bg-green-100 text-green-800' :
                        proyecto.est === 'En Ejecución' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {proyecto.est}
                      </Badge>
                      <Badge variant="outline">{proyecto.tip}</Badge>
                    </div>
                    <span className="text-xs text-gray-500">{proyecto.fecha}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {proyecto.tit}
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Ubicación</p>
                      <p className="font-semibold text-gray-900">{proyecto.ubicacion}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hectáreas</p>
                      <p className="font-semibold text-gray-900">{(proyecto.hectareas / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Comunidades</p>
                      <p className="font-semibold text-gray-900">{proyecto.comunidades}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Inversión</p>
                      <p className="font-semibold text-green-600">
                        ${proyecto.inversion > 0 ? (proyecto.inversion / 1000000000).toFixed(1) + 'B' : 'N/A'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MapPin className="w-4 h-4 mr-2" />
                      Ver Mapa
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Plan
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Minería */}
          <TabsContent value="mineria">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tipos de Minería */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Mountain className="w-6 h-6 mr-2 text-indigo-500" />
                  Tipos de Minería
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {tiposMineria.map((tipo) => (
                    <div key={tipo.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{tipo.icono}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{tipo.nombre}</h4>
                          <p className="text-sm text-gray-600">Proyectos activos</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Ecosistemas */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Leaf className="w-6 h-6 mr-2 text-indigo-500" />
                  Ecosistemas
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {ecosistemas.map((ecosistema) => (
                    <div key={ecosistema.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{ecosistema.icono}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">{ecosistema.nombre}</h4>
                          <p className="text-sm text-gray-600">Áreas protegidas</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Herramientas IA */}
          <TabsContent value="herramientas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {herramientasIA.map((herramienta, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <herramienta.icono className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{herramienta.tit}</h3>
                      <Badge className="bg-green-100 text-green-800 mt-1">
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

          {/* Tab: Reportes */}
          <TabsContent value="reportes">
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Módulo de reportes territoriales en desarrollo</p>
              <Button className="mt-4">
                <Download className="w-4 h-4 mr-2" />
                Generar Reporte Territorial
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Informativo */}
        <Card className="p-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              ¿Necesitas Análisis Territorial Especializado?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nuestra IA Territorial está disponible 24/7 para brindarte análisis geoespacial y desarrollo territorial.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Análisis Territorial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-indigo-600"
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

export default TerritorialIA;

