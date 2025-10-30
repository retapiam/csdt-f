/**
 * DASHBOARD OPERADOR
 * Ubicación: /12-gestion-proyectos/02-operador/DashboardOperador.jsx
 * 
 * Dashboard especializado para operadores
 * 
 * CONTROL DE ACCESO:
 * - Requiere autenticación
 * - Solo operadores (ope) y administradores pueden acceder
 * - Modo solo lectura por defecto para operadores
 * - Los permisos de edición se otorgan desde Panel de Vista
 * 
 * ATRIBUTOS DEL BACKEND (español):
 * - nombre, descripcion, estado, prioridad, tipo
 * - asignado_a, creado_por, fecha_asignacion, fecha_limite
 * - tiempo_estimado, tiempo_invertido, costo_estimado, costo_real
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Progress } from '../../../components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Play, 
  Pause, 
  FileText,
  Users,
  Calendar,
  DollarSign,
  Target,
  Plus,
  Eye,
  Edit,
  MessageSquare,
  Upload
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePermisosVista } from '../../../contexts/PermisosVistaContext';
import { useTareas, useEstadisticasProyectos } from '../../../hooks/useProyectos';
import ProteccionRol from '../../../components/compartidas/ProteccionRol';
import unifiedAIService from '../../../services/ia/UnifiedAIService';
import pdfAvanzadoService from '../../../services/pdf/PDFAvanzadoService';
import toast from 'react-hot-toast';

const DashboardOperador = ({ modoSoloLectura = false, permisos = {} }) => {
  const { user, isAuthenticated } = useAuth();
  const { puedeEditar } = usePermisosVista();
  
  // Hooks de datos sincronizados
  const { 
    tareas, 
    loading: cargandoTareas, 
    error: errorTareas,
    refresh: refreshTareas
  } = useTareas({}, { autoSync: false });

  const { 
    estadisticas, 
    loading: cargandoEstadisticas, 
    error: errorEstadisticas,
    refresh: refreshEstadisticas
  } = useEstadisticasProyectos({ autoSync: false });

  const [alertas, setAlertas] = useState([]);

  // Determinar si el usuario está en modo solo lectura
  const esSoloLectura = modoSoloLectura || (
    user && user.rol === 'ope' && 
    !puedeEditar('Dashboard Operador')
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
        refreshTareas(),
        refreshEstadisticas()
      ]);
    } catch (error) {
      console.error('Error actualizando datos:', error);
    }
  };

  // Usar datos de los hooks o valores por defecto
  const estadisticasData = estadisticas || {
    tareasAsignadas: 0,
    tareasCompletadas: 0,
    tareasEnProgreso: 0,
    tiempoPromedio: 0,
    clientesAsignados: 0,
    proyectosActivos: 0
  };

  const tareasAsignadas = tareas || [];
  const tareasCompletadas = tareas?.filter(t => t.estado === 'completada') || [];
  const cargando = cargandoTareas || cargandoEstadisticas;

  const getPrioridadColor = (prioridad) => {
    const colores = {
      baja: 'bg-green-100 text-green-800',
      media: 'bg-yellow-100 text-yellow-800',
      alta: 'bg-orange-100 text-orange-800',
      critica: 'bg-red-100 text-red-800'
    };
    return colores[prioridad] || 'bg-gray-100 text-gray-800';
  };

  const getEstadoColor = (estado) => {
    const colores = {
      pendiente: 'bg-gray-100 text-gray-800',
      en_progreso: 'bg-blue-100 text-blue-800',
      completada: 'bg-green-100 text-green-800',
      bloqueada: 'bg-red-100 text-red-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  const formatearTiempo = (horas) => {
    if (horas < 1) {
      return `${Math.round(horas * 60)} min`;
    }
    return `${horas}h`;
  };

  const calcularDiasRestantes = (fechaLimite) => {
    const hoy = new Date();
    const limite = new Date(fechaLimite);
    const diffTime = limite - hoy;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleIniciarTarea = (tareaId) => {
    // Lógica para iniciar tarea
    console.log('Iniciando tarea:', tareaId);
  };

  const handlePausarTarea = (tareaId) => {
    // Lógica para pausar tarea
    console.log('Pausando tarea:', tareaId);
  };

  const handleCompletarTarea = (tareaId) => {
    // Lógica para completar tarea
    console.log('Completando tarea:', tareaId);
  };
  const handleConsultarIA = async (tarea) => {
    try {
      const texto = `${tarea.nombre} - ${tarea.descripcion || ''}`;
      const result = await unifiedAIService.quickAnalyze({ text: texto, legal_area: 'Derecho General', jurisdiction: 'colombia' });
      toast.success('IA analizó la cola');
      console.log('IA tarea', result);
    } catch (e) {
      toast.error('Error consultando IA');
    }
  };

  const handleGenerarPDF = async (tarea) => {
    try {
      const datos = { titulo: `Resumen Cola - ${tarea.nombre}`, resumen: tarea.descripcion || 'Resumen', puntos_clave: ['Estado', 'Riesgos', 'Recomendaciones'], recomendaciones: ['Siguiente paso'] };
      const pdf = await pdfAvanzadoService.generarPDFAvanzado(datos, { plantilla: 'resumen_ejecutivo', estilo: 'oficial' });
      pdf.archivo.documento.save(pdf.archivo.nombre);
      toast.success('PDF generado');
    } catch (e) {
      toast.error('Error generando PDF');
    }
  };

  const handleCrearSubtarea = (tareaId) => {
    // Lógica para crear subtarea para cliente
    console.log('Creando subtarea para cliente:', tareaId);
  };

  return (
    <ProteccionRol
      requiereAutenticacion={true}
      rolesPermitidos={['ope', 'adm', 'adm_gen']}
      ubicacion="/12-gestion-proyectos/02-operador/DashboardOperador"
    >
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Dashboard Operador
                </h1>
                <p className="text-gray-600 mb-2">
                  Bienvenido, {user?.name || 'Operador'}. Gestiona tus tareas asignadas y el progreso de los proyectos.
                </p>
                
                {/* Indicador de Modo Solo Lectura */}
                {esSoloLectura && (
                  <Alert className="mt-3 max-w-2xl">
                    <Eye className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Modo Solo Lectura:</strong> Solo puedes visualizar tus tareas asignadas. 
                      Para realizar cambios, solicita permisos al administrador.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tareas Asignadas</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticasData.tareasAsignadas}</p>
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
                  <p className="text-sm font-medium text-gray-600">En Progreso</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticasData.tareasEnProgreso}</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completadas</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticasData.tareasCompletadas}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticasData.tiempoPromedio}h</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas */}
        {alertas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertas Importantes</h2>
            <div className="space-y-3">
              {alertas.map((alerta) => (
                <Alert key={alerta.id} className={alerta.tipo === 'critica' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex justify-between items-center">
                      <span>{alerta.mensaje}</span>
                      <span className="text-sm text-gray-500">{alerta.fecha}</span>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tareas Asignadas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Colas Asignadas</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cola
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tareasAsignadas.map((tarea) => {
                  const diasRestantes = calcularDiasRestantes(tarea.fechaLimite);
                  return (
                    <div key={tarea.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{tarea.nombre}</h3>
                          <p className="text-sm text-gray-600 mb-2">{tarea.proyecto}</p>
                          <div className="flex space-x-2 mb-2">
                            <Badge className={getPrioridadColor(tarea.prioridad)}>
                              {tarea.prioridad}
                            </Badge>
                            <Badge className={getEstadoColor(tarea.estado)}>
                              {tarea.estado.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex justify-between">
                          <span>Cliente:</span>
                          <span>{tarea.cliente}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fecha Límite:</span>
                          <span className={diasRestantes <= 1 ? 'text-red-600 font-medium' : ''}>
                            {tarea.fechaLimite} ({diasRestantes}d)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tiempo:</span>
                          <span>{formatearTiempo(tarea.tiempoInvertido)} / {formatearTiempo(tarea.tiempoEstimado)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Costo:</span>
                          <span className="font-medium">{formatearMoneda(tarea.costoEstimado)}</span>
                        </div>
                      </div>

                      {tarea.progreso > 0 && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progreso</span>
                            <span>{tarea.progreso}%</span>
                          </div>
                          <Progress value={tarea.progreso} className="h-2" />
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          {puedeRealizarEdicion ? (
                            <>
                              {tarea.estado === 'pendiente' && (
                                <Button size="sm" onClick={() => handleIniciarTarea(tarea.id)}>
                                  <Play className="h-4 w-4 mr-1" />
                                  Iniciar
                                </Button>
                              )}
                              {tarea.estado === 'en_progreso' && (
                                <>
                                  <Button size="sm" variant="outline" onClick={() => handlePausarTarea(tarea.id)}>
                                    <Pause className="h-4 w-4 mr-1" />
                                    Pausar
                                  </Button>
                                  <Button size="sm" onClick={() => handleCompletarTarea(tarea.id)}>
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Completar
                                  </Button>
                                </>
                              )}
                            </>
                          ) : (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Lock className="h-4 w-4" />
                              <span>Solo visualización</span>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm" title="Ver detalles">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="Consultar IA" onClick={() => handleConsultarIA(tarea)}>
                            🤖
                          </Button>
                          <Button variant="outline" size="sm" title="Generar PDF" onClick={() => handleGenerarPDF(tarea)}>
                            <FileText className="h-4 w-4" />
                          </Button>
                          {puedeRealizarEdicion && (
                            <>
                              <Button variant="outline" size="sm" title="Editar">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" title="Comentar">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      {tarea.documentos.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {tarea.documentos.length} documento(s)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Tareas Completadas y Acciones Rápidas */}
          <div className="space-y-8">
            {/* Tareas Completadas Recientes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Tareas Completadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tareasCompletadas.map((tarea) => (
                    <div key={tarea.id} className="border rounded-lg p-3 bg-green-50">
                      <h4 className="font-medium text-gray-900 mb-1">{tarea.nombre}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Proyecto:</span>
                          <span>{tarea.proyecto}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completada:</span>
                          <span>{tarea.fechaCompletada}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tiempo Total:</span>
                          <span>{formatearTiempo(tarea.tiempoTotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Costo Final:</span>
                          <span className="font-medium">{formatearMoneda(tarea.costoFinal)}</span>
                        </div>
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
                {esSoloLectura ? (
                  <Alert>
                    <Lock className="h-4 w-4" />
                    <AlertDescription>
                      Las acciones rápidas están deshabilitadas en modo solo lectura. 
                      Contacta al administrador para obtener permisos de edición.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-16 flex flex-col items-center justify-center space-y-1">
                      <Plus className="h-5 w-5" />
                      <span className="text-xs">Nueva Tarea</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                      <Users className="h-5 w-5" />
                      <span className="text-xs">Tarea Cliente</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                      <Upload className="h-5 w-5" />
                      <span className="text-xs">Subir Archivos</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                      <MessageSquare className="h-5 w-5" />
                      <span className="text-xs">Mensajes</span>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </ProteccionRol>
  );
};

export default DashboardOperador;
