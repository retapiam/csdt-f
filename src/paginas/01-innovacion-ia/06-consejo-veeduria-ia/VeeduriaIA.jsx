import React, { useState, useEffect } from 'react';
import { Eye, Shield, FileText, Download, Zap, Target, Play, BookOpen, Settings, Users, DollarSign, Leaf, Building, TrendingUp, Upload } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import toast from 'react-hot-toast';
import estadisticasService from '../../../services/EstadisticasService';

const VeeduriaIA = () => {
  const [tabActivo, setTabActivo] = useState('dashboard');
  const [cargandoEstadisticas, setCargandoEstadisticas] = useState(true);
  
  const [estadisticas, setEstadisticas] = useState({
    proyectosVigilados: 0,
    irregularidadesDetectadas: 0,
    ahorroGenerado: 0,
    comunidadesAtendidas: 0,
    efectividad: 0
  });

  // Cargar estadísticas reales del backend
  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        setCargandoEstadisticas(true);
        const [veedurias, proyectos, etnicas] = await Promise.all([
          estadisticasService.obtenerEstadisticasVeedurias(),
          estadisticasService.obtenerEstadisticasProyectos(),
          estadisticasService.obtenerEstadisticasEtnicas()
        ]);
        
        if (veedurias.success && proyectos.success && etnicas.success) {
          setEstadisticas({
            proyectosVigilados: veedurias.data.total_veedurias || 0,
            irregularidadesDetectadas: veedurias.data.con_alertas || 0,
            ahorroGenerado: proyectos.data.proyectos_completados * 1000000 || 0, // Estimación
            comunidadesAtendidas: (etnicas.data.pueblosIndigenas || 0) + (etnicas.data.comunidadesAfro || 0),
            efectividad: 94.8 // Mantener valor por defecto hasta tener cálculo real
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

  const [casosRecientes, setCasosRecientes] = useState([
    {
      id: 1,
      tit: 'Veeduría Proyecto Vivienda Social',
      tip: 'Contratación',
      est: 'En Seguimiento',
      fecha: '2024-01-15',
      impacto: 'Mejora para 2,000 familias',
      pri: 'alt',
      ahorro: 500000000
    },
    {
      id: 2,
      tit: 'Control Gestión Ambiental',
      tip: 'Ambiental',
      est: 'Completado',
      fecha: '2024-01-10',
      impacto: 'Protección 50,000 hectáreas',
      pri: 'med',
      ahorro: 0
    },
    {
      id: 3,
      tit: 'Vigilancia Contrato Infraestructura',
      tip: 'Infraestructura',
      est: 'Investigación',
      fecha: '2024-01-08',
      impacto: 'Ahorro $300 millones',
      pri: 'alt',
      ahorro: 300000000
    }
  ]);

  const modulosVeeduria = [
    {
      id: 'gestion-publica',
      tit: 'Gestión Pública',
      des: 'Vigilancia integral de la gestión pública y rendición de cuentas',
      icono: Building,
      color: 'blue',
      casos: 34,
      efectividad: 96.2
    },
    {
      id: 'contratacion',
      tit: 'Contratación Pública',
      des: 'Control y transparencia en procesos de contratación estatal',
      icono: DollarSign,
      color: 'green',
      casos: 28,
      efectividad: 94.8
    },
    {
      id: 'ambiental',
      tit: 'Derechos Ambientales',
      des: 'Vigilancia de proyectos con impacto ambiental y territorial',
      icono: Leaf,
      color: 'emerald',
      casos: 19,
      efectividad: 93.5
    },
    {
      id: 'participacion',
      tit: 'Participación Ciudadana',
      des: 'Fortalecimiento de mecanismos de participación y control social',
      icono: Users,
      color: 'purple',
      casos: 23,
      efectividad: 95.1
    },
    {
      id: 'rendicion-cuentas',
      tit: 'Rendición de Cuentas',
      des: 'Seguimiento a la rendición de cuentas y transparencia',
      icono: FileText,
      color: 'orange',
      casos: 31,
      efectividad: 92.7
    }
  ];

  const herramientasIA = [
    {
      tit: 'Análisis Predictivo',
      des: 'Identifica patrones de irregularidades antes de que ocurran',
      icono: TrendingUp,
      est: 'act'
    },
    {
      tit: 'Detección Automática',
      des: 'IA especializada en detectar inconsistencias en documentos',
      icono: Target,
      est: 'act'
    },
    {
      tit: 'Clasificación Inteligente',
      des: 'Categoriza automáticamente denuncias y casos',
      icono: Zap,
      est: 'act'
    },
    {
      tit: 'Generación de Reportes',
      des: 'Crea reportes automáticos con análisis y recomendaciones',
      icono: FileText,
      est: 'act'
    }
  ];

  const accionesRapidas = [
    {
      tit: 'Nueva Veeduría',
      des: 'Iniciar proceso de vigilancia',
      icono: Eye,
      accion: () => {
        toast.success('Iniciando nueva veeduría...');
        setTabActivo('nueva-veeduria');
      },
      color: 'blue'
    },
    {
      tit: 'Subir Documento',
      des: 'Análisis automático de documentos',
      icono: Upload,
      accion: () => {
        toast.success('Preparando análisis de documento...');
      },
      color: 'green'
    },
    {
      tit: 'Consulta Rápida',
      des: 'Análisis inmediato con IA',
      icono: Zap,
      accion: () => {
        toast.success('Iniciando consulta rápida...');
      },
      color: 'purple'
    },
    {
      tit: 'Generar Reporte',
      des: 'Crear reporte automático',
      icono: Download,
      accion: () => {
        toast.success('Generando reporte...');
      },
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Veeduría IA
                </h1>
                <p className="text-gray-600 mt-1">
                  Control Social Inteligente y Transparencia Ciudadana
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Especializada en vigilancia de gestión pública, contratación y derechos ambientales
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full">
                <Shield className="w-5 h-5 text-orange-700 mr-2" />
                <span className="text-sm font-semibold text-orange-700">IA ACTIVA</span>
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
            <TabsTrigger value="modulos">Módulos</TabsTrigger>
            <TabsTrigger value="casos">Casos Recientes</TabsTrigger>
            <TabsTrigger value="herramientas">Herramientas IA</TabsTrigger>
            <TabsTrigger value="reportes">Reportes</TabsTrigger>
          </TabsList>

          {/* Tab: Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Módulos de Veeduría */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-orange-500" />
                  Módulos de Veeduría
                </h3>
                <div className="space-y-4">
                  {modulosVeeduria.map((modulo) => (
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
                  <Zap className="w-6 h-6 mr-2 text-orange-500" />
                  Herramientas de IA
                </h3>
                <div className="space-y-4">
                  {herramientasIA.map((herramienta, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <herramienta.icono className="w-5 h-5 text-orange-600" />
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
              {modulosVeeduria.map((modulo) => (
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

          {/* Tab: Casos Recientes */}
          <TabsContent value="casos">
            <div className="space-y-6">
              {casosRecientes.map((caso) => (
                <Card key={caso.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${
                        caso.pri === 'alt' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {caso.pri === 'alt' ? 'Alta Prioridad' : 'Media Prioridad'}
                      </Badge>
                      <Badge className={`${
                        caso.est === 'Completado' ? 'bg-green-100 text-green-800' :
                        caso.est === 'En Seguimiento' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {caso.est}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{caso.fecha}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {caso.tit}
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Tipo</p>
                      <p className="font-semibold text-gray-900">{caso.tip}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Impacto</p>
                      <p className="font-semibold text-gray-900">{caso.impacto}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ahorro</p>
                      <p className="font-semibold text-green-600">
                        ${caso.ahorro > 0 ? (caso.ahorro / 1000000).toFixed(0) + 'M' : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fecha</p>
                      <p className="font-semibold text-gray-900">{caso.fecha}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Reporte
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
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <herramienta.icono className="w-6 h-6 text-orange-600" />
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
              <p className="text-gray-500 text-lg">Módulo de reportes en desarrollo</p>
              <Button className="mt-4">
                <Download className="w-4 h-4 mr-2" />
                Generar Reporte General
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Informativo */}
        <Card className="p-8 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              ¿Necesitas Vigilancia Especializada?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nuestra IA de Veeduría está disponible 24/7 para brindarte control social inteligente.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                <Eye className="mr-2 h-5 w-5" />
                Iniciar Veeduría
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-orange-600"
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

export default VeeduriaIA;

