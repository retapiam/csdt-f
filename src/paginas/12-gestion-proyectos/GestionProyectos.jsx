/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GESTIÓN DE PROYECTOS - Módulo Principal
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 📍 Ubicación: /12-gestion-proyectos/GestionProyectos.jsx
 * 🔒 Protección: REQUIERE AUTENTICACIÓN OBLIGATORIA
 * 🎯 Propósito: Sistema de micro-proyectos con control de acceso por roles
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ROLES Y NIVELES DE ACCESO
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 👤 CLI (Cliente - Nivel 1)                                             │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ ✅ Acceso:                                                               │
 * │    - /gestion-proyectos/ (vista general)                                │
 * │    - /dashboard-unificado (solo lectura)                                │
 * │    - /03-cliente/DashboardCliente                                       │
 * │                                                                          │
 * │ 📋 Permisos por defecto: Solo Lectura                                   │
 * │ 🔓 Permisos adicionales: Otorgados desde Panel de Vista                 │
 * │                                                                          │
 * │ ❌ NO puede:                                                             │
 * │    - Crear proyectos                                                    │
 * │    - Editar proyectos (sin permiso adicional)                          │
 * │    - Asignar operadores                                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ ⚙️ OPE (Operador - Nivel 2)                                            │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ ✅ Acceso: Todo de Nivel 1 +                                            │
 * │    - /02-operador/DashboardOperador                                     │
 * │    - Proyectos donde operador_id = user.id                             │
 * │                                                                          │
 * │ 📋 Permisos por defecto: Solo Lectura + Reportar Avances               │
 * │ 🔓 Permisos adicionales: Edición si se otorga en Panel de Vista         │
 * │                                                                          │
 * │ ❌ NO puede:                                                             │
 * │    - Crear proyectos                                                    │
 * │    - Eliminar proyectos                                                 │
 * │    - Acceder a Panel de Vista                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 👑 ADM (Administrador - Nivel 3)                                        │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ ✅ Acceso: Todo de Nivel 2 +                                            │
 * │    - /01-administrador/DashboardAdministrador                           │
 * │    - /01-administrador/CrearProyecto                                    │
 * │    - /01-administrador/PanelVista                                       │
 * │    - /01-administrador/GestionAPUsCotizaciones                          │
 * │                                                                          │
 * │ 📋 Permisos: Crear, Editar, Eliminar, Gestionar Permisos               │
 * │                                                                          │
 * │ ✅ Puede:                                                                │
 * │    - Crear y gestionar proyectos                                        │
 * │    - Asignar operadores y clientes                                      │
 * │    - Otorgar permisos a operadores y clientes                          │
 * │                                                                          │
 * │ ❌ NO puede:                                                             │
 * │    - Control total del sistema                                          │
 * │    - Modificar roles de otros administradores                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🏛️ ADM_GEN (Administrador General - Nivel 4)                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ ✅ Acceso: CONTROL TOTAL DEL SISTEMA                                    │
 * │    - Todo el módulo /12-gestion-proyectos/                             │
 * │    - Todas las funcionalidades sin restricción                          │
 * │                                                                          │
 * │ 📋 Permisos: TODOS (sin restricción)                                    │
 * │                                                                          │
 * │ ✅ Puede:                                                                │
 * │    - Gestionar todos los proyectos                                      │
 * │    - Modificar roles y permisos                                         │
 * │    - Configurar el sistema completo                                     │
 * │    - Supervisar todas las operaciones                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * SEGURIDAD Y PROTECCIÓN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 🔒 AUTENTICACIÓN:
 *    - OBLIGATORIA para acceder a cualquier parte del módulo
 *    - Sin autenticación = Acceso Denegado
 *    - Mensaje claro de "Debe iniciar sesión"
 * 
 * 🛡️ AUTORIZACIÓN:
 *    - Verificación de rol en cada componente
 *    - ProteccionRol wrapper en todos los componentes
 *    - Backend valida permisos en cada API call
 * 
 * 🚫 FILTROS AUTOMÁTICOS (Backend):
 *    - Operadores: Solo ven proyectos donde operador_id = user.id
 *    - Clientes: Solo ven proyectos donde cliente_id = user.id
 *    - Administradores: Ven todos los proyectos
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ATRIBUTOS DEL BACKEND (ESPAÑOL)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ✅ Todos los atributos están en español y mapean directamente con el backend:
 * 
 * - nombre: string                      // Título del proyecto
 * - descripcion: string                 // Descripción detallada
 * - estado: enum                        // pendiente, en_progreso, completado, cancelado
 * - prioridad: enum                     // baja, media, alta, urgente
 * - administrador_id: integer           // ID del administrador
 * - operador_id: integer (nullable)     // ID del operador asignado
 * - cliente_id: integer                 // ID del cliente
 * - fecha_inicio: date                  // Fecha de inicio
 * - fecha_limite: date                  // Fecha límite
 * - presupuesto_estimado: decimal       // Presupuesto planificado
 * - presupuesto_ejecutado: decimal      // Gasto real
 * - progreso: integer (0-100)           // Porcentaje de avance
 * - tareas_completadas: integer         // Número de tareas completadas
 * - tareas_totales: integer             // Número total de tareas
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * IMPORTANTE - LEER ANTES DE MODIFICAR
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ⚠️ NUNCA quitar verificación de autenticación
 * ⚠️ SIEMPRE validar roles antes de renderizar
 * ⚠️ MANTENER mapeo de atributos en español (coincide con backend)
 * ⚠️ PROBAR cambios con todos los roles (cli, ope, adm, adm_gen)
 * 
 * 📖 Documentación completa: 
 *    - Ver MAPEO_BACKEND_FRONTEND.md
 *    - Ver README_CONFIGURACION.md
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  Users, 
  Settings, 
  UserCheck, 
  BarChart3, 
  Calendar, 
  DollarSign,
  Target,
  ArrowRight,
  Shield,
  Clock,
  FileText,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePermisosVista } from '../../contexts/PermisosVistaContext';
import { useProyectos, useEstadisticasProyectos } from '../../hooks/useProyectos';
import ProteccionRol from '../../components/compartidas/ProteccionRol';
import DashboardAdministrador from './01-administrador/DashboardAdministrador';
import CrearProyecto from './01-administrador/CrearProyecto';
import DashboardOperador from './02-operador/DashboardOperador';
import DashboardCliente from './03-cliente/DashboardCliente';
import PanelVista from './01-administrador/PanelVista';

const GestionProyectos = () => {
  const { 
    user, 
    canAccessPanelVista, 
    canControlTotal,
    isAuthenticated,
    canManagePermissions
  } = useAuth();
  const { puedeVer, puedeEditar, puedeModificar } = usePermisosVista();
  const [vistaActual, setVistaActual] = useState('inicio');
  const [rolUsuario, setRolUsuario] = useState(null);
  const [permisos, setPermisos] = useState({
    ver: false,
    crear: false,
    editar: false,
    eliminar: false,
    gestionarPermisos: false,
    controlTotal: false,
    soloLectura: false
  });

  // Hooks de datos sincronizados
  const { 
    proyectos, 
    loading: cargandoProyectos, 
    error: errorProyectos,
    tienePermisos 
  } = useProyectos({}, { autoSync: false });

  const { 
    estadisticas, 
    loading: cargandoEstadisticas, 
    error: errorEstadisticas 
  } = useEstadisticasProyectos({ autoSync: false });

  // Verificar autenticación y configurar permisos según rol
  useEffect(() => {
    if (!isAuthenticated() || !user) {
      return;
    }

    // Configurar rol
    setRolUsuario(user.rol);

    // Configurar permisos según el rol
    const nuevosPermisos = {
      ver: false,
      crear: false,
      editar: false,
      eliminar: false,
      gestionarPermisos: false,
      controlTotal: false,
      soloLectura: false
    };

    switch (user.rol) {
      case 'adm_gen':
        // Administrador General - Control Total (Nivel 4)
        nuevosPermisos.ver = true;
        nuevosPermisos.crear = true;
        nuevosPermisos.editar = true;
        nuevosPermisos.eliminar = true;
        nuevosPermisos.gestionarPermisos = true;
        nuevosPermisos.controlTotal = true;
        break;

      case 'adm':
        // Administrador - Gestión y Permisos (Nivel 3)
        nuevosPermisos.ver = true;
        nuevosPermisos.crear = true;
        nuevosPermisos.editar = true;
        nuevosPermisos.eliminar = true;
        nuevosPermisos.gestionarPermisos = true;
        break;

      case 'ope':
        // Operador - Solo Lectura por defecto (Nivel 2)
        nuevosPermisos.ver = true;
        nuevosPermisos.soloLectura = true;
        // Verificar si tiene permisos adicionales otorgados desde Panel de Vista
        if (puedeEditar('Dashboard Operador') || puedeModificar('Dashboard Operador')) {
          nuevosPermisos.editar = true;
          nuevosPermisos.soloLectura = false;
        }
        break;

      case 'cli':
        // Cliente - Solo Lectura por defecto (Nivel 1)
        nuevosPermisos.ver = true;
        nuevosPermisos.soloLectura = true;
        // Verificar si tiene permisos adicionales otorgados desde Panel de Vista
        if (puedeEditar('Dashboard Cliente') || puedeModificar('Dashboard Cliente')) {
          nuevosPermisos.editar = true;
          nuevosPermisos.soloLectura = false;
        }
        break;

      default:
        // Sin permisos
        break;
    }

    setPermisos(nuevosPermisos);
  }, [user, isAuthenticated, puedeEditar, puedeModificar]);

  const roles = {
    adm_gen: {
      nombre: 'Administrador General',
      descripcion: 'Control total absoluto del sistema, gestión completa de proyectos, usuarios, roles y permisos',
      icono: Shield,
      color: 'purple',
      capacidades: [
        'Control total absoluto del sistema',
        'Gestionar todos los proyectos y usuarios',
        'Administrar roles y permisos',
        'Configurar sistema completo',
        'Acceso al Panel de Vista',
        'Generar reportes globales',
        'Supervisar todas las operaciones',
        'Gestión de niveles y jerarquías'
      ],
      estadisticas: estadisticas || {
        proyectosActivos: 0,
        operadoresDisponibles: 0,
        clientesActivos: 0,
        presupuestoTotal: 0
      }
    },
    adm: {
      nombre: 'Administrador',
      descripcion: 'Gestiona proyectos asignados, asigna operadores y clientes',
      icono: Shield,
      color: 'blue',
      capacidades: [
        'Crear y gestionar proyectos',
        'Asignar operadores y clientes',
        'Definir cronogramas y presupuestos',
        'Integrar con APUs y cotizaciones',
        'Supervisar progreso general',
        'Generar reportes y análisis'
      ],
      estadisticas: estadisticas || {
        proyectosActivos: 0,
        operadoresDisponibles: 0,
        clientesActivos: 0,
        presupuestoTotal: 0
      }
    },
    ope: {
      nombre: 'Operador',
      descripcion: 'Ejecuta tareas técnicas, reporta avances, crea subtareas para clientes',
      icono: Settings,
      color: 'green',
      capacidades: [
        'Ejecutar tareas técnicas asignadas',
        'Reportar avances en tiempo real',
        'Crear subtareas para clientes',
        'Gestionar tiempo y costos',
        'Comunicarse con clientes',
        'Subir documentos y evidencias'
      ],
      estadisticas: estadisticas || {
        tareasAsignadas: 0,
        tareasCompletadas: 0,
        tiempoPromedio: 0,
        clientesAsignados: 0
      }
    },
    cli: {
      nombre: 'Cliente',
      descripcion: 'Proporciona insumos, revisa avances, aprueba entregables',
      icono: UserCheck,
      color: 'purple',
      capacidades: [
        'Proporcionar documentos requeridos',
        'Revisar progreso de proyectos',
        'Aprobar entregables',
        'Comunicarse con operadores',
        'Subir evidencias e insumos',
        'Participar en reuniones'
      ],
      estadisticas: estadisticas || {
        proyectosActivos: 0,
        tareasPendientes: 0,
        documentosEntregados: 0,
        mensajesRecibidos: 0
      }
    }
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  const getColorClasses = (color) => {
    const colores = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-200',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colores[color] || colores.blue;
  };

  const renderVista = () => {
    // Renderizar con protección de roles
    switch (vistaActual) {
      case 'panel-vista':
        // Panel de Vista - Solo administradores (Nivel 3 y 4)
        return (
          <ProteccionRol
            rolesPermitidos={['adm_gen', 'adm']}
            ubicacion="/12-gestion-proyectos/01-administrador/PanelVista"
            requiereAutenticacion={true}
          >
            <PanelVista onVolver={() => setVistaActual('inicio')} />
          </ProteccionRol>
        );

      case 'administrador':
      case 'adm':
        // Dashboard Administrador - Solo administradores (Nivel 3 y 4)
        return (
          <ProteccionRol
            rolesPermitidos={['adm_gen', 'adm']}
            ubicacion="/12-gestion-proyectos/01-administrador/DashboardAdministrador"
            requiereAutenticacion={true}
          >
            <DashboardAdministrador 
              onCrearProyecto={() => setVistaActual('crear-proyecto')}
              permisos={permisos}
            />
          </ProteccionRol>
        );

      case 'crear-proyecto':
        // Crear Proyecto - Solo administradores (Nivel 3 y 4)
        return (
          <ProteccionRol
            rolesPermitidos={['adm_gen', 'adm']}
            ubicacion="/12-gestion-proyectos/01-administrador/CrearProyecto"
            requiereAutenticacion={true}
          >
            <CrearProyecto onVolver={() => setVistaActual('administrador')} />
          </ProteccionRol>
        );

      case 'operador':
      case 'ope':
        // Dashboard Operador - Operadores y administradores
        return (
          <ProteccionRol
            rolesPermitidos={['ope', 'adm', 'adm_gen']}
            ubicacion="/12-gestion-proyectos/02-operador/DashboardOperador"
            requiereAutenticacion={true}
            modoSoloLectura={permisos.soloLectura && user.rol === 'ope'}
          >
            <DashboardOperador 
              modoSoloLectura={permisos.soloLectura && user.rol === 'ope'}
              permisos={permisos}
            />
          </ProteccionRol>
        );

      case 'cliente':
      case 'cli':
        // Dashboard Cliente - Clientes y superiores
        return (
          <ProteccionRol
            rolesPermitidos={['cli', 'ope', 'adm', 'adm_gen']}
            ubicacion="/12-gestion-proyectos/03-cliente/DashboardCliente"
            requiereAutenticacion={true}
            modoSoloLectura={permisos.soloLectura && user.rol === 'cli'}
          >
            <DashboardCliente 
              modoSoloLectura={permisos.soloLectura && user.rol === 'cli'}
              permisos={permisos}
            />
          </ProteccionRol>
        );

      default:
        return renderInicio();
    }
  };

  const renderInicio = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sistema de Gestión de Proyectos
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Plataforma integral para la gestión de micro-proyectos con roles especializados
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="outline" className="text-sm">
                <Target className="h-4 w-4 mr-1" />
                Micro-Proyectos
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Users className="h-4 w-4 mr-1" />
                Roles Especializados
              </Badge>
              <Badge variant="outline" className="text-sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                IA Integrada
              </Badge>
            </div>
          </div>

          {/* Información del Usuario Actual */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              Bienvenido, {user?.nombre || 'Usuario'}
            </h2>
            
            {/* Mostrar rol actual */}
            {rolUsuario && roles[rolUsuario] && (
              <div className="max-w-2xl mx-auto mb-8">
                <Card className="border-2 border-blue-200">
                  <CardHeader className="text-center">
                    <div className={`mx-auto w-16 h-16 ${getColorClasses(roles[rolUsuario].color).bg} rounded-full flex items-center justify-center mb-4`}>
                      {React.createElement(roles[rolUsuario].icono, { 
                        className: `h-8 w-8 ${getColorClasses(roles[rolUsuario].color).text}` 
                      })}
                    </div>
                    <CardTitle className={`text-xl ${getColorClasses(roles[rolUsuario].color).text}`}>
                      {roles[rolUsuario].nombre}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">{roles[rolUsuario].descripcion}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Capacidades:</h4>
                      <ul className="space-y-1">
                        {roles[rolUsuario].capacidades.slice(0, 3).map((capacidad, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <div className={`w-1.5 h-1.5 ${getColorClasses(roles[rolUsuario].color).bg} rounded-full mr-2`}></div>
                            {capacidad}
                          </li>
                        ))}
                        {roles[rolUsuario].capacidades.length > 3 && (
                          <li className="text-sm text-gray-500">
                            +{roles[rolUsuario].capacidades.length - 3} más...
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Mostrar errores de carga */}
            {(errorProyectos || errorEstadisticas) && (
              <Alert className="max-w-2xl mx-auto mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {errorProyectos && `Error cargando proyectos: ${errorProyectos}`}
                  {errorEstadisticas && `Error cargando estadísticas: ${errorEstadisticas}`}
                </AlertDescription>
              </Alert>
            )}

            {/* Mostrar estado de carga */}
            {(cargandoProyectos || cargandoEstadisticas) && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Cargando datos del sistema...</p>
              </div>
            )}
          </div>

          {/* Estadísticas del Rol Seleccionado */}
          {rolUsuario && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Estadísticas - {roles[rolUsuario].nombre}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(roles[rolUsuario].estadisticas).map(([key, valor]) => (
                  <Card key={key}>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        {typeof valor === 'number' && valor > 1000000 ? formatearMoneda(valor) : valor}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Características del Sistema */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Características del Sistema
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Micro-Proyectos</h4>
                  <p className="text-sm text-gray-600">
                    Cada caso es un proyecto independiente con gestión especializada y seguimiento detallado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Roles Especializados</h4>
                  <p className="text-sm text-gray-600">
                    Administrador, Operador y Cliente con responsabilidades y capacidades específicas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">IA Integrada</h4>
                  <p className="text-sm text-gray-600">
                    Análisis automático, recomendaciones inteligentes y optimización de procesos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cronogramas</h4>
                  <p className="text-sm text-gray-600">
                    Gestión de tiempo, dependencias automáticas y alertas de vencimiento
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Presupuestos</h4>
                  <p className="text-sm text-gray-600">
                    Integración con APUs, cotizaciones y seguimiento de costos en tiempo real
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Documentos</h4>
                  <p className="text-sm text-gray-600">
                    Gestión de archivos, versionado automático y análisis de documentos con IA
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Botones de Acceso */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Botón principal según rol */}
              <Button 
                size="lg" 
                className={`${getColorClasses(roles[rolUsuario]?.color || 'blue').button} text-white px-8 py-3`}
                onClick={() => {
                  // Navegación según rol - Actualizado para ubicación /12-gestion-proyectos
                  if (['adm_gen', 'adm'].includes(rolUsuario)) {
                    setVistaActual('panel-vista');
                  } else if (rolUsuario === 'ope') {
                    setVistaActual('operador');
                  } else if (rolUsuario === 'cli') {
                    setVistaActual('cliente');
                  } else {
                    setVistaActual(rolUsuario);
                  }
                }}
                disabled={!rolUsuario}
              >
                {rolUsuario === 'adm_gen' 
                  ? 'Panel de Vista (Control Total)'
                  : rolUsuario === 'adm'
                  ? 'Panel de Vista'
                  : `Acceder como ${roles[rolUsuario]?.nombre || 'Usuario'}`
                }
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              {/* Botón adicional para administradores */}
              {['adm_gen', 'adm'].includes(rolUsuario) && (
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-3"
                  onClick={() => setVistaActual('administrador')}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Gestión de Proyectos
                </Button>
              )}
            </div>

            {/* Información de permisos */}
            {rolUsuario && (
              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Estado de Permisos
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        {permisos.ver ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={permisos.ver ? 'text-green-700' : 'text-gray-500'}>
                          Ver Proyectos
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {permisos.crear ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={permisos.crear ? 'text-green-700' : 'text-gray-500'}>
                          Crear Proyectos
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {permisos.editar ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={permisos.editar ? 'text-green-700' : 'text-gray-500'}>
                          Editar Proyectos
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {permisos.eliminar ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={permisos.eliminar ? 'text-green-700' : 'text-gray-500'}>
                          Eliminar Proyectos
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {permisos.gestionarPermisos ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={permisos.gestionarPermisos ? 'text-green-700' : 'text-gray-500'}>
                          Gestionar Permisos
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {permisos.controlTotal ? (
                          <Shield className="h-4 w-4 text-purple-600" />
                        ) : (
                          <Lock className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={permisos.controlTotal ? 'text-purple-700 font-semibold' : 'text-gray-500'}>
                          Control Total
                        </span>
                      </div>
                    </div>
                    
                    {permisos.soloLectura && (
                      <Alert className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Modo Solo Lectura:</strong> Actualmente solo puedes ver información.
                          Para obtener permisos de edición, contacta al administrador o solicita acceso desde el Panel de Vista.
                        </AlertDescription>
                      </Alert>
                    )}

                    <p className="text-xs text-gray-500 mt-3">
                      Ubicación: /12-gestion-proyectos | Nivel de Acceso: {
                        permisos.controlTotal ? 'Nivel 4 (Control Total)' :
                        permisos.gestionarPermisos ? 'Nivel 3 (Administrador)' :
                        permisos.soloLectura ? (user.rol === 'ope' ? 'Nivel 2 (Operador - Solo Lectura)' : 'Nivel 1 (Cliente - Solo Lectura)') :
                        'Sin Nivel Asignado'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Protección principal del módulo - Requiere autenticación
  return (
    <ProteccionRol
      requiereAutenticacion={true}
      rolesPermitidos={['adm_gen', 'adm', 'ope', 'cli']}
      ubicacion="/12-gestion-proyectos/"
      mostrarMensaje={true}
    >
      {renderVista()}
    </ProteccionRol>
  );
};

export default GestionProyectos;
