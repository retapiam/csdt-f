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
  Target
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useProyectos, useEstadisticasProyectos } from '../../../hooks/useProyectos';

const DashboardAdministrador = ({ onCrearProyecto }) => {
  const { user } = useAuth();
  
  // Hooks de datos sincronizados
  const { 
    proyectos, 
    loading: cargandoProyectos, 
    error: errorProyectos 
  } = useProyectos({}, { autoSync: true });

  const { 
    estadisticasData, 
    loading: cargandoEstadisticas, 
    error: errorEstadisticas 
  } = useEstadisticasProyectos({ autoSync: true });

  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    // Los datos se cargan automáticamente con los hooks
    // No necesitamos cargar datos manualmente
  }, []);

  // Usar datos de los hooks o valores por defecto
  const estadisticasDataData = estadisticasData || {
    proyectosActivos: 0,
    tareasPendientes: 0,
    presupuestoTotal: 0,
    operadoresDisponibles: 0,
    clientesActivos: 0,
    alertasCriticas: 0
  };

  const proyectosRecientes = proyectos?.slice(0, 5) || [];
  const cargando = cargandoProyectos || cargandoEstadisticas;

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
      completada: 'bg-green-100 text-green-800',
      bloqueada: 'bg-red-100 text-red-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  const getAlertaIcon = (tipo) => {
    return tipo === 'critica' ? AlertTriangle : TrendingUp;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Administrador
          </h1>
          <p className="text-gray-600">
            Bienvenido, {user?.name || 'Administrador'}. Gestiona proyectos, operadores y clientes.
          </p>
        </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proyectos Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticasData.proyectosActivos}</p>
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
                  <p className="text-sm font-medium text-gray-600">Tareas Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticasData.tareasPendientes}</p>
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
                    {formatearMoneda(estadisticasData.presupuestoTotal)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Operadores Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticasData.operadoresDisponibles}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas Críticas */}
        {alertas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertas del Sistema</h2>
            <div className="space-y-3">
              {alertas.map((alerta) => {
                const IconComponent = getAlertaIcon(alerta.tipo);
                return (
                  <Alert key={alerta.id} className={alerta.tipo === 'critica' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}>
                    <IconComponent className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex justify-between items-center">
                        <span>{alerta.mensaje}</span>
                        <span className="text-sm text-gray-500">{alerta.fecha}</span>
                      </div>
                    </AlertDescription>
                  </Alert>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Proyectos Recientes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Proyectos Recientes</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Proyecto
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proyectosRecientes.map((proyecto) => (
                  <div key={proyecto.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{proyecto.nombre}</h3>
                      <Badge className={getEstadoColor(proyecto.estado)}>
                        {proyecto.estado.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Cliente:</span>
                        <span>{proyecto.cliente}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Operador:</span>
                        <span>{proyecto.operador}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fecha Límite:</span>
                        <span>{proyecto.fechaLimite}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Presupuesto:</span>
                        <span className="font-medium">{formatearMoneda(proyecto.presupuesto)}</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progreso</span>
                          <span>{proyecto.progreso}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${proyecto.progreso}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-3 space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Plus className="h-6 w-6" />
                  <span>Nuevo Proyecto</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Gestionar Operadores</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Reportes</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Cronogramas</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <DollarSign className="h-6 w-6" />
                  <span>Presupuestos</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <FileText className="h-6 w-6" />
                  <span>APUs</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdministrador;
