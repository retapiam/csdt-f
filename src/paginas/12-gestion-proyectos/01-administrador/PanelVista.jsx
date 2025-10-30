/**
 * Panel de Vista para Administradores (Niveles 3 y 4)
 * Control de permisos y visualización de proyectos según roles
 * Ubicación: /12-gestion-proyectos/01-administrador/PanelVista.jsx
 * Ruta: /panel-vista
 * 
 * Nivel 3: Administrador (adm) - Gestión de proyectos y permisos limitados
 * Nivel 4: Administrador General (adm_gen) - Control total del sistema
 * 
 * Última actualización: Permisos y roles actualizados para nueva ubicación
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Users, 
  Shield, 
  Eye, 
  EyeOff, 
  Settings, 
  BarChart3, 
  Filter,
  Search,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Target,
  FileText,
  MessageSquare,
  Lock
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePermisosVista } from '../../../contexts/PermisosVistaContext';
import { useProyectos, useTareas, useEstadisticasProyectos } from '../../../hooks/useProyectos';
import { MapProvidersRegistry } from '../../../services/MapProvidersRegistry';
import apuService from '../../../services/APUService';
import api from '../../../services/api';
import pdfAvanzadoService from '../../../services/pdf/PDFAvanzadoService';

const PanelVista = ({ onVolver }) => {
  const { user, canControlTotal, canManageRoles, canManagePermissions, canManageUsers, canAccessPanelVista } = useAuth();
  const { permisosVista, puedeVer, agregarPermiso, revocarPermiso } = usePermisosVista();
  const [filtros, setFiltros] = useState({
    estado: '',
    prioridad: '',
    tipo: '',
    fechaInicio: '',
    fechaFin: '',
    busqueda: ''
  });
  const [vistaActiva, setVistaActiva] = useState('proyectos');
	const [mapProvidersCount, setMapProvidersCount] = useState(0);
	const [apusCount, setApusCount] = useState(0);
  const [alertas, setAlertas] = useState([]);
  const [cargandoAlertas, setCargandoAlertas] = useState(false);
  const [errorAlertas, setErrorAlertas] = useState('');
  const [filtrosAlertas, setFiltrosAlertas] = useState({ estado: '', severidad: '' });
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);

  // Hooks de datos sincronizados
  const { 
    proyectos, 
    loading: cargandoProyectos, 
    error: errorProyectos,
    tienePermisos 
  } = useProyectos(filtros, { autoSync: false });

  const { 
    tareas, 
    loading: cargandoTareas, 
    error: errorTareas 
  } = useTareas(filtros, { autoSync: false });

  const { 
    estadisticas, 
    loading: cargandoEstadisticas, 
    error: errorEstadisticas 
  } = useEstadisticasProyectos({ autoSync: false });

	useEffect(() => {
		try {
			setMapProvidersCount((MapProvidersRegistry.getAll() || []).length);
		} catch (e) {
			setMapProvidersCount(0);
		}

		try {
			setApusCount(apuService.count());
		} catch (e) {
			setApusCount(0);
		}
	}, []);

  useEffect(() => {
    const cargarAlertas = async () => {
      try {
        setCargandoAlertas(true);
        setErrorAlertas('');
        const resp = await api.get('/alertas', { params: {
          estado: filtrosAlertas.estado || undefined,
          severidad: filtrosAlertas.severidad || undefined
        }});
        // Soportar paginator de Laravel o arreglo directo
        const data = resp.data?.data;
        const lista = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
        setAlertas(lista);
      } catch (e) {
        setErrorAlertas('Error al cargar alertas');
      } finally {
        setCargandoAlertas(false);
      }
    };
    cargarAlertas();
  }, [filtrosAlertas]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        setCargandoUsuarios(true);
        const resp = await api.get('/users');
        const lista = Array.isArray(resp.data) ? resp.data : (Array.isArray(resp.data?.data) ? resp.data.data : []);
        setUsuarios(lista);
      } catch (_) {
        setUsuarios([]);
      } finally {
        setCargandoUsuarios(false);
      }
    };
    cargarUsuarios();
  }, []);

  // Verificar autenticación y permisos de acceso
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Acceso Restringido
            </h2>
            <p className="text-gray-600 mb-4">
              Debes iniciar sesión para acceder al Panel de Vista.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Ir al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verificar que el usuario sea administrador (Nivel 3 o 4)
  const esAdministrador = user && ['adm_gen', 'adm'].includes(user.rol);
  const esNivel4 = user && user.rol === 'adm_gen'; // Administrador General
  const esNivel3 = user && user.rol === 'adm'; // Administrador

  // Verificar permisos usando el contexto
  if (!esAdministrador || !canAccessPanelVista() || (!puedeVer('Panel de Vista') && !canControlTotal())) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Acceso Denegado
            </h2>
            <p className="text-gray-600 mb-4">
              Solo los Administradores (Nivel 3) y Administradores Generales (Nivel 4) pueden acceder al Panel de Vista.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Tu nivel actual: {user.rol || 'No definido'}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Ubicación: /12-gestion-proyectos/01-administrador/PanelVista
            </p>
            <Button onClick={onVolver}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
      month: 'short',
      day: 'numeric'
    });
  };

  const getEstadoColor = (estado) => {
    const colores = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      en_progreso: 'bg-blue-100 text-blue-800',
      completado: 'bg-green-100 text-green-800',
      bloqueado: 'bg-red-100 text-red-800',
      cancelado: 'bg-gray-100 text-gray-800'
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

  const renderEstadisticas = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Proyectos Activos</p>
              <p className="text-2xl font-bold text-gray-900">
                {estadisticas?.proyectosActivos || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tareas Completadas</p>
              <p className="text-2xl font-bold text-gray-900">
                {estadisticas?.tareasCompletadas || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    
	<Card>
		<CardContent className="p-6">
			<div className="flex items-center">
				<div className="p-2 bg-indigo-100 rounded-lg">
					<Settings className="h-6 w-6 text-indigo-600" />
				</div>
				<div className="ml-4">
					<p className="text-sm font-medium text-gray-600">Servicios de Mapas</p>
					<p className="text-2xl font-bold text-gray-900">{mapProvidersCount}</p>
				</div>
			</div>
		</CardContent>
	</Card>

	<Card>
		<CardContent className="p-6">
			<div className="flex items-center">
				<div className="p-2 bg-green-100 rounded-lg">
					<CheckCircle className="h-6 w-6 text-green-600" />
				</div>
				<div className="ml-4">
					<p className="text-sm font-medium text-gray-600">APUs Registrados</p>
					<p className="text-2xl font-bold text-gray-900">{apusCount}</p>
				</div>
			</div>
		</CardContent>
	</Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
              <p className="text-2xl font-bold text-gray-900">
                {estadisticas?.usuariosActivos || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Presupuesto Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatearMoneda(estadisticas?.presupuestoTotal || 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFiltros = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filtros de Búsqueda
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filtros.estado}
              onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En Progreso</option>
              <option value="completado">Completado</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridad
            </label>
            <select
              value={filtros.prioridad}
              onChange={(e) => setFiltros({ ...filtros, prioridad: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las prioridades</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Proyecto
            </label>
            <select
              value={filtros.tipo}
              onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los tipos</option>
              <option value="minero">Minero</option>
              <option value="catastral">Catastral</option>
              <option value="etnico">Étnico</option>
              <option value="ambiental">Ambiental</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Búsqueda
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={filtros.busqueda}
                onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={() => setFiltros({
              estado: '',
              prioridad: '',
              tipo: '',
              fechaInicio: '',
              fechaFin: '',
              busqueda: ''
            })}
          >
            Limpiar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderProyectos = () => (
    <div className="space-y-4">
      {cargandoProyectos ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando proyectos...</p>
        </div>
      ) : errorProyectos ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Error al cargar proyectos: {errorProyectos}
          </AlertDescription>
        </Alert>
      ) : proyectos.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No se encontraron proyectos con los filtros aplicados</p>
        </div>
      ) : (
        proyectos.map((proyecto) => (
          <Card key={proyecto.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {proyecto.nombre || proyecto.titulo}
                    </h3>
                    <Badge className={getEstadoColor(proyecto.estado)}>
                      {proyecto.estado?.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getPrioridadColor(proyecto.prioridad)}>
                      {proyecto.prioridad?.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {proyecto.descripcion || proyecto.des}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Cliente</p>
                      <p className="font-medium">{proyecto.cliente_nombre || 'Sin asignar'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Operador</p>
                      <p className="font-medium">{proyecto.operador_nombre || 'Sin asignar'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fecha Límite</p>
                      <p className="font-medium">
                        {proyecto.fecha_limite ? formatearFecha(proyecto.fecha_limite) : 'Sin fecha'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Presupuesto</p>
                      <p className="font-medium">
                        {proyecto.presupuesto ? formatearMoneda(proyecto.presupuesto) : 'Sin presupuesto'}
                      </p>
                    </div>
                  </div>
                  
                  {proyecto.progreso !== undefined && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
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
                  )}
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  {tienePermisos('editar') && (
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  const renderTareas = () => (
    <div className="space-y-4">
      {cargandoTareas ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando tareas...</p>
        </div>
      ) : errorTareas ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Error al cargar tareas: {errorTareas}
          </AlertDescription>
        </Alert>
      ) : tareas.length === 0 ? (
        <div className="text-center py-8">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No se encontraron tareas con los filtros aplicados</p>
        </div>
      ) : (
        tareas.map((tarea) => (
          <Card key={tarea.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {tarea.nombre || tarea.tit}
                    </h4>
                    <Badge className={getEstadoColor(tarea.estado)}>
                      {tarea.estado?.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getPrioridadColor(tarea.prioridad)}>
                      {tarea.prioridad?.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">
                    {tarea.descripcion || tarea.des}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Asignado a</p>
                      <p className="font-medium">{tarea.asignado_nombre || 'Sin asignar'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fecha Límite</p>
                      <p className="font-medium">
                        {tarea.fecha_limite ? formatearFecha(tarea.fecha_limite) : 'Sin fecha'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tiempo Estimado</p>
                      <p className="font-medium">
                        {tarea.tiempo_estimado ? `${tarea.tiempo_estimado}h` : 'Sin estimación'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  {tienePermisos('editar') && (
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  const renderAlertasFiltros = () => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filtros de Alertas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              value={filtrosAlertas.estado}
              onChange={(e) => setFiltrosAlertas({ ...filtrosAlertas, estado: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              <option value="abierta">Abierta</option>
              <option value="cerrada">Cerrada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severidad</label>
            <select
              value={filtrosAlertas.severidad}
              onChange={(e) => setFiltrosAlertas({ ...filtrosAlertas, severidad: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" onClick={() => setFiltrosAlertas({ estado: '', severidad: '' })}>Limpiar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAlertas = () => (
    <div className="space-y-4">
      {renderAlertasFiltros()}
      {(() => {
        const abiertas = alertas.filter(a => (a.estado || 'abierta') === 'abierta');
        const countBy = (sev) => abiertas.filter(a => (a.severidad || 'media') === sev).length;
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Alertas Abiertas</p><p className="text-2xl font-bold">{abiertas.length}</p></div><AlertTriangle className="h-6 w-6 text-red-500"/></div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Críticas</p><p className="text-2xl font-bold">{countBy('critica')}</p></div><AlertTriangle className="h-6 w-6 text-red-600"/></div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Alta</p><p className="text-2xl font-bold">{countBy('alta')}</p></div><AlertTriangle className="h-6 w-6 text-orange-500"/></div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Media/Baja</p><p className="text-2xl font-bold">{countBy('media') + countBy('baja')}</p></div><AlertTriangle className="h-6 w-6 text-yellow-500"/></div></CardContent></Card>
          </div>
        );
      })()}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={async () => {
          try {
            const rows = alertas.map(a => ({
              id: a.id,
              tipo: a.tipo,
              severidad: a.severidad,
              estado: a.estado,
              mensaje: (a.mensaje || '').replace(/\n/g,' '),
              created_at: a.created_at,
              sla_at: a.sla_at || ''
            }));
            const header = Object.keys(rows[0] || { id: '', tipo: '', severidad: '', estado: '', mensaje: '', created_at: '', sla_at: '' });
            const csv = [header.join(','), ...rows.map(r => header.map(h => `"${(r[h] ?? '').toString().replace(/"/g,'""')}"`).join(','))].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'alertas.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
          } catch (_) {}
        }}>Exportar CSV</Button>
        <Button variant="outline" onClick={async () => {
          try {
            const datos = { titulo: 'Reporte de Alertas', resumen: 'Listado de alertas del sistema', puntos_clave: [], recomendaciones: [] };
            const pdf = await pdfAvanzadoService.generarPDFAvanzado(datos, { plantilla: 'resumen_ejecutivo', estilo: 'oficial' });
            // Añadir tabla simple usando autoTable vía método ya usado por el servicio en secciones IA
            // Como alternativa, agregamos líneas básicas
            pdf.archivo.documento.text('Listado:', 20, 80);
            let y = 90; const doc = pdf.archivo.documento;
            alertas.slice(0, 50).forEach(a => {
              const line = `#${a.id} ${a.tipo || ''} | ${a.severidad || ''} | ${a.estado || ''} | ${a.mensaje || ''}`;
              doc.text(line.substring(0, 110), 20, y); y += 6; if (y > 270) { doc.addPage(); y = 30; }
            });
            pdf.archivo.documento.save('alertas.pdf');
          } catch (_) {}
        }}>Exportar PDF</Button>
      </div>
      {cargandoAlertas ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando alertas...</p>
        </div>
      ) : errorAlertas ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {errorAlertas}
          </AlertDescription>
        </Alert>
      ) : alertas.length === 0 ? (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No se encontraron alertas</p>
        </div>
      ) : (
        alertas.map((alerta) => (
          <Card key={alerta.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {alerta.tipo?.replace('_',' ') || 'Alerta'}
                    </h4>
                    <Badge className={getPrioridadColor(alerta.severidad || 'media')}>
                      {String(alerta.severidad || 'media').toUpperCase()}
                    </Badge>
                    <Badge className={getEstadoColor(alerta.estado || 'abierta')}>
                      {String(alerta.estado || 'abierta').toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{alerta.mensaje}</p>
                  <div className="text-xs text-gray-500">
                    Creada: {formatearFecha(alerta.created_at)} {alerta.sla_at ? `· SLA: ${formatearFecha(alerta.sla_at)}` : ''}
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm" variant="outline" onClick={async () => {
                    try {
                      await api.put(`/alertas/${alerta.id}`, { estado: 'cerrada' });
                      setAlertas(prev => prev.map(a => a.id === alerta.id ? { ...a, estado: 'cerrada' } : a));
                    } catch (_) {}
                  }}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Cerrar
                  </Button>
                  <Button size="sm" variant="outline" onClick={async () => {
                    const sla = window.prompt('Nueva fecha SLA (YYYY-MM-DD)');
                    if (!sla) return;
                    try {
                      await api.put(`/alertas/${alerta.id}`, { sla_at: sla });
                      setAlertas(prev => prev.map(a => a.id === alerta.id ? { ...a, sla_at: sla } : a));
                    } catch (_) {}
                  }}>
                    <Clock className="h-4 w-4 mr-1" />
                    SLA
                  </Button>
                  <Button size="sm" variant="outline" onClick={async () => {
                    if (cargandoUsuarios || usuarios.length === 0) {
                      alert('Lista de usuarios no disponible');
                      return;
                    }
                    const lista = usuarios.slice(0, 10).map(u => `${u.id}:${u.name || u.nombre}`).join(', ');
                    const input = window.prompt(`Asignar responsable (ID). Ej: ${lista}`);
                    const idNum = parseInt(input, 10);
                    if (!idNum) return;
                    try {
                      await api.put(`/alertas/${alerta.id}`, { asignado_a: idNum });
                      setAlertas(prev => prev.map(a => a.id === alerta.id ? { ...a, asignado_a: idNum } : a));
                    } catch (_) {}
                  }}>
                    <Users className="h-4 w-4 mr-1" />
                    Asignar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  // Función para renderizar la gestión de permisos y roles
  const renderGestionPermisos = () => {
    const rolesSistema = {
      'adm_gen': {
        nombre: 'Administrador General',
        nivel: 4,
        descripcion: 'Control total absoluto del sistema',
        color: 'purple',
        permisos: ['control_total', 'gestion_usuarios', 'gestion_roles', 'gestion_permisos', 'configuracion_sistema']
      },
      'adm': {
        nombre: 'Administrador',
        nivel: 3,
        descripcion: 'Gestión completa de proyectos y usuarios',
        color: 'blue',
        permisos: ['gestion_proyectos', 'gestion_usuarios', 'gestion_permisos', 'reportes']
      },
      'ope': {
        nombre: 'Operador',
        nivel: 2,
        descripcion: 'Ejecución de tareas y gestión operativa',
        color: 'green',
        permisos: ['ejecutar_tareas', 'gestion_clientes', 'reportes_operativos']
      },
      'cli': {
        nombre: 'Cliente',
        nivel: 1,
        descripcion: 'Seguimiento de proyectos asignados',
        color: 'orange',
        permisos: ['ver_proyectos', 'gestion_documentos', 'comunicacion']
      }
    };

    return (
      <div className="space-y-6">
        {/* Información del usuario actual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Información del Usuario Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Rol:</p>
                <Badge className={`bg-${rolesSistema[user.rol]?.color || 'gray'}-100 text-${rolesSistema[user.rol]?.color || 'gray'}-800`}>
                  {rolesSistema[user.rol]?.nombre || user.rol}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nivel de Acceso:</p>
                <p className="font-medium text-xl">
                  Nivel {rolesSistema[user.rol]?.nivel || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Capacidad:</p>
                <p className="font-medium">
                  {esNivel4 ? 'Control Total' : esNivel3 ? 'Gestión de Permisos' : 'Acceso Limitado'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jerarquía de Roles y Niveles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Jerarquía de Roles y Niveles del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(rolesSistema)
                .sort((a, b) => b[1].nivel - a[1].nivel) // Ordenar por nivel descendente
                .map(([rol, info]) => (
                <div 
                  key={rol} 
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    user.rol === rol ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-${info.color}-100`}>
                      <span className={`text-xl font-bold text-${info.color}-700`}>
                        {info.nivel}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`bg-${info.color}-100 text-${info.color}-800`}>
                          {info.nombre}
                        </Badge>
                        {user.rol === rol && (
                          <Badge variant="outline" className="text-xs">
                            Tu Nivel
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{info.descripcion}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Permisos:</p>
                    <p className="text-xs text-gray-500">{info.permisos.length} funciones</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gestión de Permisos (Solo Nivel 4 - Administrador General) */}
        {esNivel4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Gestión de Permisos (Nivel 4 - Control Total)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Como Administrador General (Nivel 4), tienes control total para gestionar roles, niveles y permisos del sistema.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Gestionar Usuarios</span>
                  </Button>
                  <Button className="h-20 flex flex-col items-center justify-center">
                    <Shield className="h-6 w-6 mb-2" />
                    <span>Configurar Roles</span>
                  </Button>
                  <Button className="h-20 flex flex-col items-center justify-center">
                    <Eye className="h-6 w-6 mb-2" />
                    <span>Asignar Permisos</span>
                  </Button>
                  <Button className="h-20 flex flex-col items-center justify-center">
                    <Settings className="h-6 w-6 mb-2" />
                    <span>Configurar Sistema</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Gestión de Permisos (Nivel 3 - Administradores) */}
        {esNivel3 && !esNivel4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Gestión de Permisos de Vista (Nivel 3)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Como Administrador (Nivel 3), puedes gestionar permisos de vista para usuarios y proyectos.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center">
                    <Eye className="h-6 w-6 mb-2" />
                    <span>Permisos de Vista</span>
                  </Button>
                  <Button className="h-20 flex flex-col items-center justify-center">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Usuarios Asignados</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Panel de Vista - {esNivel4 ? 'Nivel 4 (Control Total)' : 'Nivel 3 (Administrador)'}
            </h1>
            <p className="text-gray-600 mt-2">
              Gestión y supervisión de proyectos y tareas del sistema
            </p>
          </div>
          <Button onClick={onVolver} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>

        {/* Estadísticas */}
        {renderEstadisticas()}

        {/* Filtros */}
        {renderFiltros()}

        {/* Contenido Principal */}
        <Tabs value={vistaActiva} onValueChange={setVistaActiva} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="proyectos" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Proyectos ({proyectos.length})
            </TabsTrigger>
            <TabsTrigger value="tareas" className="flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Colas ({tareas.length})
            </TabsTrigger>
            <TabsTrigger value="permisos" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Permisos & Roles
            </TabsTrigger>
            <TabsTrigger value="alertas" className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Alertas ({alertas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="proyectos" className="mt-6">
            {renderProyectos()}
          </TabsContent>

          <TabsContent value="tareas" className="mt-6">
            {renderTareas()}
          </TabsContent>

          <TabsContent value="permisos" className="mt-6">
            {renderGestionPermisos()}
          </TabsContent>
          <TabsContent value="alertas" className="mt-6">
            {renderAlertas()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PanelVista;

