import { useState, useEffect } from 'react';
import { Folder, AlertTriangle, Clock, CheckCircle, Users, MapPin, Filter, Search, Download, Eye } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import toast from 'react-hot-toast';
import estadisticasService from '../../../services/EstadisticasService';

const DashboardCasosActivos = () => {
  const [tabActivo, setTabActivo] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [casosActivos, setCasosActivos] = useState([]);

  const [estadisticas, setEstadisticas] = useState({
    totalActivos: 0,
    urgentes: 0,
    enTramite: 0,
    proxVencimiento: 0,
    completados: 0
  });

  // Cargar datos reales del backend
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const response = await estadisticasService.obtenerEstadisticasCasosActivos();
        
        if (response.success && response.data) {
          setEstadisticas(response.data.estadisticas);
          setCasosActivos(response.data.casos || []);
        }
      } catch (error) {
        console.error('Error cargando casos activos:', error);
        toast.error('Error al cargar casos activos');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(cargarDatos, 30000);
    return () => clearInterval(interval);
  }, []);

  const casosFiltrados = casosActivos.filter(caso => {
    const coincideBusqueda = busqueda === '' || 
      caso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      caso.comunidad.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideEstado = filtroEstado === 'todos' || caso.estado === filtroEstado;
    
    return coincideBusqueda && coincideEstado;
  });

  const accionesRapidas = [
    {
      tit: 'Crear Caso',
      des: 'Nuevo caso étnico',
      icono: Folder,
      accion: () => {
        toast.success('Abriendo formulario de creación...');
      },
      color: 'blue'
    },
    {
      tit: 'Casos Urgentes',
      des: 'Ver casos críticos',
      icono: AlertTriangle,
      accion: () => {
        setFiltroEstado('urgente');
        toast.success('Mostrando casos urgentes...');
      },
      color: 'red'
    },
    {
      tit: 'Por Vencer',
      des: 'Próximos vencimientos',
      icono: Clock,
      accion: () => {
        toast.success('Filtrando por vencimiento...');
      },
      color: 'orange'
    },
    {
      tit: 'Exportar Reporte',
      des: 'Descargar Excel',
      icono: Download,
      accion: () => {
        toast.success('Generando reporte de casos activos...');
      },
      color: 'green'
    }
  ];

  const getEstadoBadge = (estado) => {
    const configs = {
      'urgente': { bg: 'bg-red-100', text: 'text-red-800', label: 'Urgente' },
      'en-tramite': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'En Trámite' },
      'seguimiento': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Seguimiento' },
      'completado': { bg: 'bg-green-100', text: 'text-green-800', label: 'Completado' }
    };
    return configs[estado] || configs['en-tramite'];
  };

  const getPrioridadBadge = (prioridad) => {
    const configs = {
      'Crítica': { bg: 'bg-red-100', text: 'text-red-800' },
      'Alta': { bg: 'bg-orange-100', text: 'text-orange-800' },
      'Media': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      'Baja': { bg: 'bg-green-100', text: 'text-green-800' }
    };
    return configs[prioridad] || configs['Media'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl">
                <Folder className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Dashboard de Casos Activos
                </h1>
                <p className="text-gray-600 mt-1">
                  Panel de Control de Casos Étnicos en Tiempo Real
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Gestión integral de casos activos con alertas y seguimiento
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-200 rounded-full">
                <CheckCircle className="w-5 h-5 text-blue-700 mr-2" />
                <span className="text-sm font-semibold text-blue-700">{estadisticas.totalActivos} ACTIVOS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{estadisticas.totalActivos}</div>
            <div className="text-sm text-gray-600">Total Activos</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">{estadisticas.urgentes}</div>
            <div className="text-sm text-gray-600">Urgentes</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-cyan-600 mb-2">{estadisticas.enTramite}</div>
            <div className="text-sm text-gray-600">En Trámite</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">{estadisticas.proxVencimiento}</div>
            <div className="text-sm text-gray-600">Por Vencer</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{estadisticas.completados}</div>
            <div className="text-sm text-gray-600">Completados</div>
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

        {/* Filtros y Búsqueda */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Search className="inline w-4 h-4 mr-2" />
                Buscar Casos
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Título, comunidad..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Filter className="inline w-4 h-4 mr-2" />
                Estado
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="todos">Todos los Estados</option>
                <option value="urgente">Urgentes</option>
                <option value="en-tramite">En Trámite</option>
                <option value="seguimiento">Seguimiento</option>
                <option value="completado">Completados</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </Card>

        {/* Lista de Casos */}
        <div className="space-y-6">
          {casosFiltrados.map((caso) => {
            const estadoBadge = getEstadoBadge(caso.estado);
            const prioridadBadge = getPrioridadBadge(caso.prioridad);
            
            return (
              <Card key={caso.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{caso.titulo}</h3>
                      <Badge className={`${estadoBadge.bg} ${estadoBadge.text}`}>
                        {estadoBadge.label}
                      </Badge>
                      <Badge className={`${prioridadBadge.bg} ${prioridadBadge.text}`}>
                        {caso.prioridad}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {caso.comunidad}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{caso.id}</p>
                    <p className="text-xs text-gray-500">{caso.fechaIngreso}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600">Tipología</p>
                    <p className="text-sm font-semibold text-gray-900">{caso.tipologia}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Responsable</p>
                    <p className="text-sm font-semibold text-gray-900">{caso.responsable}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Afectados</p>
                    <p className="text-sm font-semibold text-gray-900">{caso.afectados} personas</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Ubicación</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {caso.ubicacion.split(',')[0]}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Vencimiento</p>
                    <p className="text-sm font-semibold text-gray-900">{caso.fechaVencimiento}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Avance del Caso</span>
                    <span className="font-semibold text-gray-900">{caso.avance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        caso.avance >= 75 ? 'bg-green-500' :
                        caso.avance >= 50 ? 'bg-blue-500' :
                        caso.avance >= 25 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${caso.avance}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Expediente
                  </Button>
                  <Button size="sm">
                    Gestionar Caso
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <Card className="mt-8 p-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Panel de Control en Tiempo Real
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Gestiona todos los casos étnicos activos desde un solo lugar con alertas y seguimiento automatizado.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Folder className="mr-2 h-5 w-5" />
                Crear Nuevo Caso
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Download className="mr-2 h-5 w-5" />
                Exportar Reporte
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCasosActivos;

