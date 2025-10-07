/**
 * DASHBOARD CLIENTE
 * Ubicación: /12-gestion-proyectos/03-cliente/DashboardCliente.jsx
 * 
 * Dashboard especializado para clientes
 * 
 * CONTROL DE ACCESO:
 * - Requiere autenticación
 * - Solo clientes (cli) y superiores pueden acceder
 * - Modo solo lectura por defecto para clientes
 * - Los permisos de edición se otorgan desde Panel de Vista
 * 
 * ATRIBUTOS DEL BACKEND (español):
 * - nombre, descripcion, estado, prioridad
 * - fecha_inicio, fecha_limite, progreso
 * - documentos_requeridos, documentos_entregados
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Progress } from '../../../components/ui/progress';
import { 
  Upload, 
  Download, 
  Eye, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  FileText,
  Image,
  Map,
  Users,
  Calendar,
  DollarSign,
  Target,
  Plus,
  Send,
  Bell,
  Lock,
  Edit
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePermisosVista } from '../../../contexts/PermisosVistaContext';
import { useProyectos, useTareas, useEstadisticasProyectos } from '../../../hooks/useProyectos';
import ProteccionRol from '../../../components/compartidas/ProteccionRol';

const DashboardCliente = ({ modoSoloLectura = false, permisos = {} }) => {
  const { user, isAuthenticated } = useAuth();
  const { puedeEditar } = usePermisosVista();
  
  // Hooks de datos sincronizados
  const { 
    proyectos: proyectosCliente, 
    loading: cargandoProyectos, 
    error: errorProyectos,
    refresh: refreshProyectos
  } = useProyectos({}, { autoSync: true });

  const { 
    tareas: tareasCliente, 
    loading: cargandoTareas, 
    error: errorTareas,
    refresh: refreshTareas
  } = useTareas({}, { autoSync: true });

  const { 
    estadisticas, 
    loading: cargandoEstadisticas, 
    error: errorEstadisticas,
    refresh: refreshEstadisticas
  } = useEstadisticasProyectos({ autoSync: true });

  const [documentosRequeridos, setDocumentosRequeridos] = useState([]);
  const [mensajesRecibidos, setMensajesRecibidos] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  // Determinar si el usuario está en modo solo lectura
  const esSoloLectura = modoSoloLectura || (
    user && user.rol === 'cli' && 
    !puedeEditar('Dashboard Cliente')
  );

  // Determinar si puede editar
  const puedeRealizarEdicion = !esSoloLectura && (
    permisos.editar || 
    (user && ['adm_gen', 'adm', 'ope'].includes(user.rol))
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
        refreshTareas(),
        refreshEstadisticas()
      ]);
    } catch (error) {
      console.error('Error actualizando datos:', error);
    }
  };

  // Usar datos de los hooks o valores por defecto
  const estadisticasData = estadisticas || {
    proyectosActivos: 0,
    tareasPendientes: 0,
    documentosEntregados: 0,
    mensajesRecibidos: 0,
    reunionesProgramadas: 0,
    progresoGeneral: 0
  };

  const cargando = cargandoProyectos || cargandoTareas || cargandoEstadisticas;

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

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard del cliente...</p>
        </div>
      </div>
    );
  }

  if (errorProyectos || errorTareas || errorEstadisticas) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Error cargando los datos del cliente. Por favor, intenta de nuevo.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <ProteccionRol
      requiereAutenticacion={true}
      rolesPermitidos={['cli', 'ope', 'adm', 'adm_gen']}
      ubicacion="/12-gestion-proyectos/03-cliente/DashboardCliente"
    >
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-start py-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  Dashboard Cliente
                </h1>
                <p className="text-gray-600 mb-2">
                  Bienvenido, {user?.nombre || 'Cliente'}
                </p>
                
                {/* Indicador de Modo Solo Lectura */}
                {esSoloLectura && (
                  <Alert className="mt-3 max-w-2xl">
                    <Eye className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Modo Solo Lectura:</strong> Solo puedes visualizar el estado de tus proyectos. 
                      Para realizar cambios o subir documentos, solicita permisos al administrador.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <Button variant="outline" onClick={actualizarDatos}>
                  <Clock className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <p className="text-sm font-medium text-gray-600">Documentos Entregados</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticasData.documentosEntregados}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Mensajes Recibidos</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticasData.mensajesRecibidos}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progreso General */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Progreso General de Proyectos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Progreso General</span>
                <span className="text-sm font-medium text-gray-900">{estadisticasData.progresoGeneral}%</span>
              </div>
              <Progress value={estadisticasData.progresoGeneral} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Proyectos del Cliente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Mis Proyectos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proyectosCliente?.map((proyecto) => (
                  <div key={proyecto.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{proyecto.nombre}</h3>
                        <p className="text-sm text-gray-600 mb-2">{proyecto.descripcion}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getEstadoColor(proyecto.estado)}>
                            {proyecto.estado}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {proyecto.operador}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="text-gray-900">{proyecto.progreso}%</span>
                      </div>
                      <Progress value={proyecto.progreso} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Presupuesto: {formatearMoneda(proyecto.presupuesto)}</span>
                        <span>Vence: {formatearFecha(proyecto.fechaLimite)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mis Tareas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tareasCliente?.map((tarea) => (
                  <div key={tarea.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{tarea.nombre}</h3>
                        <p className="text-sm text-gray-600 mb-2">{tarea.proyecto}</p>
                        <p className="text-sm text-gray-700 mb-2">{tarea.descripcion}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getEstadoColor(tarea.estado)}>
                            {tarea.estado}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="text-gray-900">{tarea.progreso}%</span>
                      </div>
                      <Progress value={tarea.progreso} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Asignada: {formatearFecha(tarea.fechaAsignacion)}</span>
                        <span>Vence: {formatearFecha(tarea.fechaLimite)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentos Requeridos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Documentos Requeridos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentosRequeridos.map((documento) => (
                <div key={documento.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900">{documento.nombre}</h4>
                      <p className="text-sm text-gray-600">{documento.descripcion}</p>
                      <p className="text-xs text-gray-500">Vence: {formatearFecha(documento.fechaLimite)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {documento.requerido && (
                      <Badge variant="destructive">Requerido</Badge>
                    )}
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Subir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mensajes y Notificaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Mensajes Recibidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mensajesRecibidos.map((mensaje) => (
                  <div key={mensaje.id} className={`p-4 border rounded-lg ${!mensaje.leido ? 'bg-blue-50 border-blue-200' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{mensaje.asunto}</h4>
                      <div className="flex items-center space-x-2">
                        {mensaje.urgente && (
                          <Badge variant="destructive">Urgente</Badge>
                        )}
                        {!mensaje.leido && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{mensaje.mensaje}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{mensaje.remitente}</span>
                      <span className="text-xs text-gray-500">{formatearFecha(mensaje.fecha)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificaciones.map((notificacion) => (
                  <div key={notificacion.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Bell className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notificacion.mensaje}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatearFecha(notificacion.fecha)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </ProteccionRol>
  );
};

export default DashboardCliente;