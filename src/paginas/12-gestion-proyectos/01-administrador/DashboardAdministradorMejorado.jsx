import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { 
  Users, 
  FileText, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Eye,
  Settings,
  BarChart3,
  Calendar,
  Target,
  FolderOpen,
  List
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import VistaEstiloMSProject from '../../../components/gestion-proyectos/VistaEstiloMSProject';
import toast from 'react-hot-toast';

/**
 * Dashboard Administrador Mejorado
 * Vista de Actividades estilo Microsoft Project
 */
const DashboardAdministradorMejorado = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [vistaActual, setVistaActual] = useState('proyectos'); // 'proyectos' o 'actividades'
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    proyectosActivos: 0,
    actividadesTotal: 0,
    tareasTotal: 0,
    presupuestoTotal: 0
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Aquí irían las llamadas a los servicios
    // const proyectosData = await ProyectoService.getAll({ administrador_id: user.id });
    // setProyectos(proyectosData.data);
    
    // Datos de ejemplo
    setProyectos([
      {
        id: 1,
        nombre: 'Acción de Tutela - Derecho a la Salud',
        cliente: 'Juan Pérez',
        estado: 'en_progreso',
        progreso: 65,
        actividades_count: 3,
        tareas_count: 12,
        presupuesto: 5000000
      },
      {
        id: 2,
        nombre: 'Consulta Previa - Comunidad Wayuu',
        cliente: 'Comunidad Wayuu',
        estado: 'en_progreso',
        progreso: 40,
        actividades_count: 7,
        tareas_count: 25,
        presupuesto: 15000000
      }
    ]);

    setEstadisticas({
      proyectosActivos: 2,
      actividadesTotal: 10,
      tareasTotal: 37,
      presupuestoTotal: 20000000
    });
  };

  const handleCrearProyecto = () => {
    navigate('/proyectos/crear');
  };

  const handleVerProyecto = (proyectoId) => {
    setProyectoSeleccionado(proyectoId);
    setVistaActual('actividades');
  };

  const handleCrearActividad = () => {
    toast.success('Abriendo formulario de nueva actividad...');
    // Lógica para abrir modal/formulario de actividad
  };

  const handleCrearTarea = (actividadId) => {
    toast.success(`Creando tarea para actividad ${actividadId}...`);
    // Lógica para crear tarea
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  const getEstadoColor = (estado) => {
    const colores = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      en_progreso: 'bg-blue-100 text-blue-800',
      completado: 'bg-green-100 text-green-800',
      pausado: 'bg-gray-100 text-gray-800',
      cancelado: 'bg-red-100 text-red-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard Administrador
              </h1>
              <p className="text-gray-600">
                Bienvenido, {user?.name || 'Administrador'}. Gestiona actividades y tareas tipo MS Project.
              </p>
            </div>
            
            {/* Selector de vista */}
            <div className="flex items-center space-x-2">
              <Button
                variant={vistaActual === 'proyectos' ? 'default' : 'outline'}
                onClick={() => setVistaActual('proyectos')}
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Proyectos
              </Button>
              <Button
                variant={vistaActual === 'actividades' ? 'default' : 'outline'}
                onClick={() => setVistaActual('actividades')}
                disabled={!proyectoSeleccionado}
              >
                <List className="h-4 w-4 mr-2" />
                Actividades
              </Button>
            </div>
          </div>
        </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proyectos Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.proyectosActivos}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Actividades Total</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.actividadesTotal}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <List className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tareas Total</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.tareasTotal}</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatearMoneda(estadisticas.presupuestoTotal)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vista de Proyectos */}
        {vistaActual === 'proyectos' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Mis Proyectos</CardTitle>
              <Button onClick={handleCrearProyecto}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Proyecto
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proyectos.map((proyecto) => (
                  <div 
                    key={proyecto.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleVerProyecto(proyecto.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{proyecto.nombre}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getEstadoColor(proyecto.estado)}>
                            {proyecto.estado.replace('_', ' ')}
                          </Badge>
                          <span className="text-sm text-gray-600">Cliente: {proyecto.cliente}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mt-2">
                          <div>{proyecto.actividades_count} Actividades</div>
                          <div>{proyecto.tareas_count} Tareas</div>
                          <div>{formatearMoneda(proyecto.presupuesto)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{proyecto.progreso}%</div>
                      </div>
                    </div>
                    
                    {/* Barra de progreso */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${proyecto.progreso}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vista de Actividades (Estilo MS Project) */}
        {vistaActual === 'actividades' && proyectoSeleccionado && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setVistaActual('proyectos')}
              >
                ← Volver a Proyectos
              </Button>
              <h2 className="text-xl font-semibold text-gray-900">
                Proyecto: {proyectos.find(p => p.id === proyectoSeleccionado)?.nombre}
              </h2>
            </div>

            <VistaEstiloMSProject
              proyectoId={proyectoSeleccionado}
              rol="admin"
              onCrearActividad={handleCrearActividad}
              onCrearTarea={handleCrearTarea}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdministradorMejorado;

