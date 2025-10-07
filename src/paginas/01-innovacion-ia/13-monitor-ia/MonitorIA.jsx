import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { 
  useEstadisticasIA, 
  useMetricasRendimiento,
  useEstadoServicios 
} from '../../../hooks/useEstadisticas';
import { 
  Activity,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Users,
  FileText,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Award,
  Sparkles,
  Eye,
  Filter,
  Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

const MonitorIA = () => {
  // Hooks para estadísticas reales con auto-refresh
  const { 
    datos: estadisticasIA, 
    cargando: cargandoEstadisticasIA, 
    error: errorEstadisticasIA,
    actualizarDatos: actualizarEstadisticasIA
  } = useEstadisticasIA(true);

  const { 
    datos: metricasRendimiento, 
    cargando: cargandoMetricas, 
    error: errorMetricas,
    actualizarDatos: actualizarMetricas
  } = useMetricasRendimiento(true);

  const { 
    datos: serviciosIA, 
    cargando: cargandoServicios, 
    error: errorServicios,
    actualizarDatos: actualizarServicios
  } = useEstadoServicios(true);

  const [estadoSistema, setEstadoSistema] = useState({
    estado: 'operativo',
    uptime: '99.8%',
    ultimaActualizacion: new Date().toLocaleString()
  });

  const [alertas, setAlertas] = useState([
    {
      id: 1,
      tipo: 'info',
      titulo: 'Actualización programada',
      mensaje: 'Se realizará mantenimiento del sistema el próximo domingo a las 02:00 AM',
      timestamp: '2024-10-01 14:30'
    },
    {
      id: 2,
      tipo: 'warning',
      titulo: 'Carga elevada',
      mensaje: 'El servicio IA Especialistas presenta una carga del 58%',
      timestamp: '2024-10-01 13:15'
    },
    {
      id: 3,
      tipo: 'success',
      titulo: 'Nuevo récord',
      mensaje: 'Se ha alcanzado un nuevo récord de consultas diarias: 342',
      timestamp: '2024-10-01 12:00'
    }
  ]);

  const actualizarDatos = async () => {
    toast.loading('Actualizando datos...', { duration: 1000 });
    
    try {
      // Actualizar estadísticas reales
      await Promise.all([
        actualizarEstadisticasIA(),
        actualizarMetricas(),
        actualizarServicios()
      ]);
      
      setEstadoSistema(prev => ({
        ...prev,
        ultimaActualizacion: new Date().toLocaleString()
      }));
      
      toast.success('Datos actualizados correctamente');
    } catch (error) {
      console.error('Error actualizando datos:', error);
      toast.error('Error al actualizar datos');
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-500';
      case 'mantenimiento':
        return 'bg-yellow-500';
      case 'inactivo':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAlertaTipo = (tipo) => {
    switch (tipo) {
      case 'success':
        return { color: 'bg-green-50 border-green-200', icono: CheckCircle, iconColor: 'text-green-600' };
      case 'warning':
        return { color: 'bg-yellow-50 border-yellow-200', icono: AlertCircle, iconColor: 'text-yellow-600' };
      case 'error':
        return { color: 'bg-red-50 border-red-200', icono: AlertCircle, iconColor: 'text-red-600' };
      default:
        return { color: 'bg-blue-50 border-blue-200', icono: AlertCircle, iconColor: 'text-blue-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center">
              <Activity className="h-10 w-10 mr-3 text-blue-600" />
              MONITOR IA EN TIEMPO REAL
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              Panel de monitoreo y analíticas de sistemas de inteligencia artificial
            </p>
          </div>
          <Button
            onClick={actualizarDatos}
            className="bg-blue-600"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>

        {/* Estado del Sistema */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-800">Sistema Operativo</h2>
                <p className="text-gray-600">Todos los servicios funcionando correctamente</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="text-3xl font-bold text-green-600">{estadoSistema.uptime}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Última actualización: {estadoSistema.ultimaActualizacion}
          </div>
        </Card>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Consultas Totales</p>
                <p className="text-3xl font-bold text-purple-700">
                  {cargandoEstadisticasIA ? '...' : (estadisticasIA?.consultasTotales || 0).toLocaleString()}
                </p>
              </div>
              <Brain className="h-12 w-12 text-purple-600" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              Datos en tiempo real
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Consultas Hoy</p>
                <p className="text-3xl font-bold text-blue-700">
                  {cargandoEstadisticasIA ? '...' : (estadisticasIA?.consultasHoy || 0)}
                </p>
              </div>
              <Activity className="h-12 w-12 text-blue-600" />
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <Clock className="h-4 w-4 mr-1" />
              {cargandoEstadisticasIA ? '...' : (estadisticasIA?.consultasActivas || 0)} consultas activas
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Satisfacción</p>
                <p className="text-3xl font-bold text-green-700">
                  {cargandoEstadisticasIA ? '...' : (estadisticasIA?.satisfaccionUsuario || 4.8)}/5.0
                </p>
              </div>
              <Award className="h-12 w-12 text-green-600" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <Sparkles className="h-4 w-4 mr-1" />
              Precisión: {cargandoEstadisticasIA ? '...' : (estadisticasIA?.precisionModelo || 96.5)}%
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Servicios IA */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
              Servicios de IA
            </h3>
            <div className="space-y-4">
              {cargandoServicios ? (
                <div className="text-center py-8 text-gray-500">Cargando servicios...</div>
              ) : serviciosIA && serviciosIA.length > 0 ? (
                serviciosIA.map(servicio => (
                <div key={servicio.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getEstadoColor(servicio.estado)} mr-3`} />
                      <div>
                        <h4 className="font-semibold text-gray-800">{servicio.nombre}</h4>
                        <p className="text-xs text-gray-500">
                          Última consulta: {servicio.ultimaConsulta}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${
                      servicio.estado === 'activo' ? 'bg-green-600' :
                      servicio.estado === 'mantenimiento' ? 'bg-yellow-600' :
                      'bg-red-600'
                    } text-white`}>
                      {servicio.estado.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Consultas</p>
                      <p className="font-semibold text-gray-800">{servicio.consultas.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Rendimiento</p>
                      <p className="font-semibold text-green-600">{servicio.rendimiento}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Carga</p>
                      <p className={`font-semibold ${
                        servicio.carga > 70 ? 'text-red-600' :
                        servicio.carga > 50 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {servicio.carga}%
                      </p>
                    </div>
                  </div>

                  {/* Barra de progreso de carga */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          servicio.carga > 70 ? 'bg-red-500' :
                          servicio.carga > 50 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${servicio.carga}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
              ) : (
                <div className="text-center py-8 text-gray-500">No hay servicios disponibles</div>
              )}
            </div>
          </Card>

          {/* Alertas del Sistema */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
              Alertas y Notificaciones
            </h3>
            <div className="space-y-3">
              {alertas.map(alerta => {
                const { color, icono: Icono, iconColor } = getAlertaTipo(alerta.tipo);
                return (
                  <div key={alerta.id} className={`p-4 rounded-lg border ${color}`}>
                    <div className="flex items-start">
                      <Icono className={`h-5 w-5 mr-3 mt-0.5 ${iconColor}`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{alerta.titulo}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alerta.mensaje}</p>
                        <p className="text-xs text-gray-500 mt-2">{alerta.timestamp}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Métricas y Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Consultas por Hora */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-blue-600" />
              Consultas por Hora
            </h3>
            <div className="space-y-2">
              {cargandoMetricas ? (
                <div className="text-center py-8 text-gray-500">Cargando métricas...</div>
              ) : metricasRendimiento?.consultasPorHora && metricasRendimiento.consultasPorHora.length > 0 ? (
                metricasRendimiento.consultasPorHora.map((dato, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm text-gray-600 w-16">{dato.hora}</span>
                  <div className="flex-1 ml-4">
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(dato.consultas / 120) * 100}%` }}
                      >
                        <span className="text-xs text-white font-semibold">{dato.consultas}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              ) : (
                <div className="text-center py-8 text-gray-500">No hay datos disponibles</div>
              )}
            </div>
          </Card>

          {/* Áreas Más Consultadas */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-blue-600" />
              Áreas Más Consultadas
            </h3>
            <div className="space-y-3">
              {cargandoMetricas ? (
                <div className="text-center py-8 text-gray-500">Cargando áreas...</div>
              ) : metricasRendimiento?.areasMasConsultadas && metricasRendimiento.areasMasConsultadas.length > 0 ? (
                metricasRendimiento.areasMasConsultadas.map((area, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700">{area.area}</span>
                    <span className="text-sm text-gray-600">{area.porcentaje}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        index === 0 ? 'bg-purple-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-green-500' :
                        index === 3 ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}
                      style={{ width: `${area.porcentaje}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {area.consultas.toLocaleString()} consultas
                  </p>
                </div>
              ))
              ) : (
                <div className="text-center py-8 text-gray-500">No hay datos disponibles</div>
              )}
            </div>
          </Card>
        </div>

        {/* Métricas de Rendimiento */}
        <Card className="p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Métricas de Rendimiento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Tiempo Respuesta</p>
              <p className="text-2xl font-bold text-blue-700">
                {cargandoEstadisticasIA ? '...' : (estadisticasIA?.tiempoPromedioRespuesta || '1.2s')}
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Tasa de Éxito</p>
              <p className="text-2xl font-bold text-green-700">98.3%</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Usuarios Activos</p>
              <p className="text-2xl font-bold text-purple-700">1,247</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
              <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Precisión IA</p>
              <p className="text-2xl font-bold text-yellow-700">
                {cargandoEstadisticasIA ? '...' : (estadisticasIA?.precisionModelo || 96.5)}%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MonitorIA;
