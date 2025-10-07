/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DASHBOARD UNIFICADO - Vista General del Sistema
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 📍 Ubicación: /12-gestion-proyectos/DashboardUnificado.jsx
 * 🔒 Protección: REQUIERE AUTENTICACIÓN OBLIGATORIA
 * 🎯 Propósito: Dashboard con métricas y estadísticas en tiempo real
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * CONTROL DE ACCESO
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ✅ Roles Permitidos: adm_gen, adm, ope, cli
 * 
 * 📊 Modo de Visualización:
 *    - Administradores (adm, adm_gen): Todas las métricas + Acciones
 *    - Operadores (ope): Solo lectura por defecto + Métricas de sus proyectos
 *    - Clientes (cli): Solo lectura por defecto + Métricas de sus proyectos
 * 
 * 🔓 Permisos Adicionales:
 *    - Operadores y Clientes pueden obtener permisos de edición desde Panel de Vista
 *    - Los administradores gestionan estos permisos
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ATRIBUTOS DEL BACKEND (ESPAÑOL)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ✅ Mapeo directo con Modelo Backend (Proyecto.php):
 * 
 * Campos Principales:
 * - nombre: string                      // Título del proyecto
 * - descripcion: string                 // Descripción detallada
 * - estado: enum                        // pendiente, en_progreso, completado, cancelado
 * - prioridad: enum                     // baja, media, alta, urgente
 * 
 * Fechas:
 * - fecha_inicio: date                  // Fecha de inicio del proyecto
 * - fecha_limite: date                  // Fecha límite de entrega
 * - fecha_completado: datetime          // Fecha de finalización real
 * 
 * Presupuesto:
 * - presupuesto_estimado: decimal       // Presupuesto planificado (COP)
 * - presupuesto_ejecutado: decimal      // Gasto real ejecutado (COP)
 * 
 * Relaciones:
 * - administrador_id: integer           // Usuario administrador del proyecto
 * - operador_id: integer (nullable)     // Usuario operador asignado
 * - cliente_id: integer                 // Usuario cliente del proyecto
 * 
 * Progreso:
 * - progreso: integer (0-100)           // Porcentaje de avance
 * - tareas_completadas: integer         // Tareas finalizadas
 * - tareas_totales: integer             // Total de tareas del proyecto
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * FUNCIONALIDADES PRINCIPALES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 📈 Métricas en Tiempo Real:
 *    - Proyectos Activos
 *    - Tareas Pendientes
 *    - Presupuesto Total y Ejecutado
 *    - Operadores y Clientes Activos
 *    - Alertas Críticas
 * 
 * 📊 Gráficos y Visualizaciones:
 *    - Eficiencia Presupuestaria
 *    - Eficiencia Temporal
 *    - Distribución de Tareas
 *    - Proyectos por Estado
 * 
 * 🔄 Sincronización Automática:
 *    - Actualización en tiempo real con useProyectos()
 *    - Estadísticas sincronizadas con useEstadisticasProyectos()
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * IMPORTANTE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ⚠️ NO mostrar sin autenticación
 * ⚠️ Respetar modo solo lectura para roles básicos
 * ⚠️ Usar atributos en español (coinciden con backend)
 * ⚠️ Validar permisos antes de mostrar acciones
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Clock, 
  DollarSign, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Target,
  Calendar,
  FileText,
  MessageSquare,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Settings,
  Lock,
  Edit
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePermisosVista } from '../../contexts/PermisosVistaContext';
import { useProyectos, useEstadisticasProyectos } from '../../hooks/useProyectos';
import ProteccionRol from '../../components/compartidas/ProteccionRol';

const DashboardUnificado = ({ modoSoloLectura = false, permisos = {} }) => {
  const { user, isAuthenticated } = useAuth();
  const { puedeEditar } = usePermisosVista();
  
  // Hooks de datos sincronizados
  const { 
    proyectos, 
    loading: cargandoProyectos, 
    error: errorProyectos,
    refresh: refreshProyectos
  } = useProyectos({}, { autoSync: true });

  const { 
    estadisticas, 
    loading: cargandoEstadisticas, 
    error: errorEstadisticas,
    refresh: refreshEstadisticas
  } = useEstadisticasProyectos({ autoSync: true });

  const [alertas, setAlertas] = useState([]);
  const [metricasTiempo, setMetricasTiempo] = useState([]);
  const cargando = cargandoProyectos || cargandoEstadisticas;

  // Determinar si el usuario está en modo solo lectura
  const esSoloLectura = modoSoloLectura || (
    user && ['ope', 'cli'].includes(user.rol) && 
    !puedeEditar('Dashboard Unificado')
  );

  // Determinar si puede editar
  const puedeRealizarEdicion = !esSoloLectura && (
    permisos.editar || 
    (user && ['adm_gen', 'adm'].includes(user.rol))
  );

  useEffect(() => {
    // Los datos se cargan automáticamente con los hooks
    // No necesitamos cargar datos manualmente
  }, []);

  // Función para actualizar todos los datos
  const actualizarDatos = async () => {
    try {
      await Promise.all([
        refreshProyectos(),
        refreshEstadisticas()
      ]);
    } catch (error) {
      console.error('Error actualizando datos:', error);
    }
  };

  // Usar estadísticas de los hooks o valores por defecto
  const estadisticasGlobales = estadisticas || {
    proyectosActivos: 0,
    proyectosCompletados: 0,
    tareasPendientes: 0,
    tareasEnProgreso: 0,
    tareasCompletadas: 0,
    presupuestoTotal: 0,
    presupuestoEjecutado: 0,
    operadoresActivos: 0,
    clientesActivos: 0,
    alertasCriticas: 0
  };

  // Usar tareas de los hooks o array vacío
  const tareas = proyectos?.flatMap(proyecto => proyecto.tareas || []) || [];

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
      iniciado: 'bg-blue-100 text-blue-800',
      en_progreso: 'bg-blue-100 text-blue-800',
      completado: 'bg-green-100 text-green-800',
      bloqueado: 'bg-red-100 text-red-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  const getPrioridadColor = (prioridad) => {
    const colores = {
      baja: 'bg-green-100 text-green-800',
      media: 'bg-yellow-100 text-yellow-800',
      alta: 'bg-orange-100 text-orange-800',
      critica: 'bg-red-100 text-red-800'
    };
    return colores[prioridad] || 'bg-gray-100 text-gray-800';
  };

  const getRiesgoColor = (riesgo) => {
    const colores = {
      bajo: 'bg-green-100 text-green-800',
      medio: 'bg-yellow-100 text-yellow-800',
      alto: 'bg-red-100 text-red-800'
    };
    return colores[riesgo] || 'bg-gray-100 text-gray-800';
  };

  const calcularEficienciaPresupuestaria = () => {
    if (estadisticasGlobales.presupuestoTotal === 0) return 0;
    return ((estadisticasGlobales.presupuestoEjecutado / estadisticasGlobales.presupuestoTotal) * 100);
  };

  const calcularEficienciaTemporal = () => {
    const totalTareas = estadisticasGlobales.tareasCompletadas + estadisticasGlobales.tareasEnProgreso + estadisticasGlobales.tareasPendientes;
    if (totalTareas === 0) return 0;
    return ((estadisticasGlobales.tareasCompletadas / totalTareas) * 100);
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProteccionRol
      requiereAutenticacion={true}
      rolesPermitidos={['adm_gen', 'adm', 'ope', 'cli']}
      ubicacion="/12-gestion-proyectos/DashboardUnificado"
    >
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Dashboard Unificado - Gestión de Proyectos
                </h1>
                <p className="text-gray-600 mb-2">
                  Vista general del sistema de gestión de proyectos con métricas en tiempo real
                </p>
                
                {/* Indicador de Modo Solo Lectura */}
                {esSoloLectura && (
                  <Alert className="mt-3">
                    <Lock className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Modo Solo Lectura:</strong> Solo puedes visualizar información. 
                      Para realizar cambios, contacta al administrador.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <Button variant="outline" onClick={actualizarDatos}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar
                </Button>
                {puedeRealizarEdicion && (
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                )}
              </div>
            </div>
          </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proyectos Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticasGlobales.proyectosActivos}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{estadisticasGlobales.tareasPendientes}</p>
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
                    {formatearMoneda(estadisticasGlobales.presupuestoTotal)}
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
                  <p className="text-2xl font-bold text-gray-900">{estadisticasGlobales.operadoresActivos}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Alertas Críticas</p>
                  <p className="text-2xl font-bold text-red-600">{estadisticasGlobales.alertasCriticas}</p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Métricas de Eficiencia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Eficiencia Presupuestaria</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ejecutado</span>
                    <span>{calcularEficienciaPresupuestaria().toFixed(1)}%</span>
                  </div>
                  <Progress value={calcularEficienciaPresupuestaria()} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total</p>
                    <p className="font-medium">{formatearMoneda(estadisticasGlobales.presupuestoTotal)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Ejecutado</p>
                    <p className="font-medium">{formatearMoneda(estadisticasGlobales.presupuestoEjecutado)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span>Eficiencia Temporal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completadas</span>
                    <span>{calcularEficienciaTemporal().toFixed(1)}%</span>
                  </div>
                  <Progress value={calcularEficienciaTemporal()} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Completadas</p>
                    <p className="font-medium">{estadisticasGlobales.tareasCompletadas}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">En Progreso</p>
                    <p className="font-medium">{estadisticasGlobales.tareasEnProgreso}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pendientes</p>
                    <p className="font-medium">{estadisticasGlobales.tareasPendientes}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas Críticas */}
        {alertas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertas Críticas</h2>
            <div className="space-y-3">
              {alertas.map((alerta) => (
                <Alert key={alerta.id} className={alerta.tipo === 'critica' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{alerta.mensaje}</span>
                        <p className="text-sm text-gray-600 mt-1">Proyecto: {alerta.proyecto}</p>
                      </div>
                      <span className="text-sm text-gray-500">{alerta.fecha}</span>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Tabs para diferentes vistas */}
        <Tabs defaultValue="proyectos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="tareas">Tareas</TabsTrigger>
            <TabsTrigger value="metricas">Métricas</TabsTrigger>
            <TabsTrigger value="reportes">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="proyectos" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Proyectos Activos</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proyectos.map((proyecto) => (
                    <div key={proyecto.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{proyecto.nombre}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Cliente: {proyecto.cliente} | Operador: {proyecto.operador}
                          </p>
                          <div className="flex space-x-2 mb-2">
                            <Badge className={getEstadoColor(proyecto.estado)}>
                              {proyecto.estado.replace('_', ' ')}
                            </Badge>
                            <Badge className={getPrioridadColor(proyecto.prioridad)}>
                              {proyecto.prioridad}
                            </Badge>
                            <Badge className={getRiesgoColor(proyecto.riesgo)}>
                              Riesgo {proyecto.riesgo}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Fecha Límite</p>
                          <p className="font-medium">{proyecto.fechaLimite}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Presupuesto</p>
                          <p className="font-medium">{formatearMoneda(proyecto.presupuesto)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Tareas</p>
                          <p className="font-medium">{proyecto.tareasCompletadas}/{proyecto.tareasTotales}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progreso</span>
                          <span>{proyecto.progreso}%</span>
                        </div>
                        <Progress value={proyecto.progreso} className="h-2" />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalles
                        </Button>
                        {puedeRealizarEdicion ? (
                          <>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Contactar
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            <Lock className="h-4 w-4 mr-1" />
                            Solo Lectura
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tareas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Tareas por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tareas.map((tarea) => (
                    <div key={tarea.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{tarea.nombre}</h3>
                          <p className="text-sm text-gray-600 mb-2">{tarea.proyecto}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getEstadoColor(tarea.estado)}>
                              {tarea.estado.replace('_', ' ')}
                            </Badge>
                            <Badge className={getPrioridadColor(tarea.prioridad)}>
                              {tarea.prioridad}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Asignado a</p>
                          <p className="font-medium">{tarea.asignadoA}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Fecha Límite</p>
                          <p className="font-medium">{tarea.fechaLimite}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Tiempo</p>
                          <p className="font-medium">{tarea.tiempoInvertido}h / {tarea.tiempoEstimado}h</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Costo</p>
                          <p className="font-medium">{formatearMoneda(tarea.costoEstimado)}</p>
                        </div>
                      </div>

                      {tarea.progreso > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progreso</span>
                            <span>{tarea.progreso}%</span>
                          </div>
                          <Progress value={tarea.progreso} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metricas" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proyectos Completados por Mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metricasTiempo.map((metrica, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{metrica.mes}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">{metrica.proyectosCompletados} proyectos</span>
                          <span className="text-sm text-gray-600">{metrica.tiempoPromedio} días promedio</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Tareas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completadas</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(estadisticasGlobales.tareasCompletadas / (estadisticasGlobales.tareasCompletadas + estadisticasGlobales.tareasEnProgreso + estadisticasGlobales.tareasPendientes)) * 100}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{estadisticasGlobales.tareasCompletadas}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">En Progreso</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(estadisticasGlobales.tareasEnProgreso / (estadisticasGlobales.tareasCompletadas + estadisticasGlobales.tareasEnProgreso + estadisticasGlobales.tareasPendientes)) * 100}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{estadisticasGlobales.tareasEnProgreso}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pendientes</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${(estadisticasGlobales.tareasPendientes / (estadisticasGlobales.tareasCompletadas + estadisticasGlobales.tareasEnProgreso + estadisticasGlobales.tareasPendientes)) * 100}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{estadisticasGlobales.tareasPendientes}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reportes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reportes Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>Reporte de Proyectos</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <BarChart3 className="h-6 w-6" />
                    <span>Análisis de Costos</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Clock className="h-6 w-6" />
                    <span>Análisis de Tiempos</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Users className="h-6 w-6" />
                    <span>Rendimiento de Equipos</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </ProteccionRol>
  );
};

export default DashboardUnificado;
