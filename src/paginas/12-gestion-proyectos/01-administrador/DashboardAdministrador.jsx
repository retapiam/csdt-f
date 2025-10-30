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
import VistaEstiloMSProject from '../../../components/gestion-proyectos/VistaEstiloMSProject';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import unifiedAIService from '../../../services/ia/UnifiedAIService';
import pdfAvanzadoService from '../../../services/pdf/PDFAvanzadoService';
import { useDependencia } from '../../../hooks/useDependencia';
import TareaService from '../../../services/tareaService';
import api from '../../../services/api';

const DashboardAdministrador = ({ onCrearProyecto }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { generarDependenciaRapida } = useDependencia();
  
  // Hooks de datos sincronizados
  const { 
    proyectos, 
    loading: cargandoProyectos, 
    error: errorProyectos 
  } = useProyectos({}, { autoSync: false });

  const { 
    estadisticasData, 
    loading: cargandoEstadisticas, 
    error: errorEstadisticas 
  } = useEstadisticasProyectos({ autoSync: false });

  const [alertas, setAlertas] = useState([]);
  const [vistaActual, setVistaActual] = useState('proyectos');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  useEffect(() => {
    // Los datos se cargan automáticamente con los hooks
    // No necesitamos cargar datos manualmente
  }, []);

  // Usar datos de los hooks o valores por defecto
  const estadisticas = estadisticasData || {
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

  // Acciones
  const handleVerProyecto = (proyectoId) => {
    setProyectoSeleccionado(proyectoId);
    setVistaActual('dependencias');
  };

  const handleIniciarDependencia = async () => {
    try {
      const titulo = window.prompt('Título de la dependencia:');
      if (!titulo) return;
      const res = await generarDependenciaRapida('gestion-proyectos', titulo, { descripcion: titulo });
      toast.success('Dependencia creada correctamente');
      if (res?.data?.actividad?.proyecto_id) {
        setProyectoSeleccionado(res.data.actividad.proyecto_id);
        setVistaActual('dependencias');
      }
    } catch (e) {
      toast.error('No se pudo crear la dependencia');
    }
  };

  const handleConsultarIA = async () => {
    try {
      const texto = window.prompt('Texto a analizar con IA:');
      if (!texto) return;
      const result = await unifiedAIService.quickAnalyze({ text: texto, legal_area: 'Derecho General', jurisdiction: 'colombia' });
      toast.success(result?.summary ? 'IA: análisis generado' : 'IA consultada');
      console.log('Resultado IA', result);
    } catch (e) {
      toast.error('Error consultando IA');
    }
  };

  const handleGenerarPDF = async () => {
    try {
      const titulo = window.prompt('Título para el PDF (Resumen Ejecutivo):', 'Resumen Ejecutivo');
      const datos = { titulo: titulo || 'Resumen Ejecutivo', resumen: 'Resumen ejecutivo del proyecto/gestión', puntos_clave: ['Estado general', 'Riesgos', 'Recomendaciones'], recomendaciones: ['Acción 1', 'Acción 2'] };
      const pdf = await pdfAvanzadoService.generarPDFAvanzado(datos, { plantilla: 'resumen_ejecutivo', estilo: 'oficial' });
      pdf.archivo.documento.save(pdf.archivo.nombre);
      toast.success('PDF generado');
    } catch (e) {
      toast.error('Error generando PDF');
    }
  };

  const handleGenerarPDFActa = async () => {
    try {
      if (!proyectoSeleccionado) {
        toast.error('Selecciona un proyecto primero');
        return;
      }
      const response = await api.get(`/pdf/acta-cae/${proyectoSeleccionado}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `acta_cae_${proyectoSeleccionado}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Acta generada');
    } catch (e) {
      toast.error('Error generando Acta');
    }
  };

  const handleGenerarPDFDenuncia = async () => {
    try {
      // Paso guiado IA (opcional)
      const deseaIA = window.confirm('¿Deseas que la IA analice y clasifique la denuncia antes del PDF?');
      if (deseaIA) {
        const narrativa = window.prompt('Describe brevemente los hechos de la denuncia/corrección:');
        if (narrativa && narrativa.trim().length > 0) {
          try {
            const ia = await unifiedAIService.quickAnalyze({ text: narrativa, legal_area: 'Veeduría/PAE', jurisdiction: 'colombia' });
            toast.success('IA: clasificación y recomendaciones generadas');
            console.log('IA Denuncia', ia);
            try {
              await api.post('/ia/analizar-juridico', {
                tipo_caso: 'veeduria_pae',
                texto: narrativa,
                categoria_juridica: 'control_social',
                nivel_analisis: 'intermedio'
              });
            } catch (_) {}
          } catch (_) {
            toast.error('No fue posible obtener el análisis de IA');
          }
        }
      }

      if (!proyectoSeleccionado) {
        toast.error('Selecciona un proyecto primero');
        return;
      }
      const response = await api.get(`/pdf/denuncia/${proyectoSeleccionado}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `denuncia_${proyectoSeleccionado}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Denuncia generada');
    } catch (e) {
      toast.error('Error generando Denuncia');
    }
  };

  const handleGenerarPDFHallazgo = async () => {
    try {
      // Paso guiado IA (opcional)
      const deseaIA = window.confirm('¿Deseas que la IA analice hallazgos antes del PDF?');
      if (deseaIA) {
        const narrativa = window.prompt('Describe brevemente los hallazgos/observaciones:');
        if (narrativa && narrativa.trim().length > 0) {
          try {
            const ia = await unifiedAIService.quickAnalyze({ text: narrativa, legal_area: 'Veeduría/PAE', jurisdiction: 'colombia' });
            toast.success('IA: análisis de hallazgos generado');
            console.log('IA Hallazgos', ia);
            try {
              await api.post('/ia/analizar-juridico', {
                tipo_caso: 'hallazgos_pae',
                texto: narrativa,
                categoria_juridica: 'control_social',
                nivel_analisis: 'intermedio'
              });
            } catch (_) {}
          } catch (_) {
            toast.error('No fue posible obtener el análisis de IA');
          }
        }
      }

      if (!proyectoSeleccionado) {
        toast.error('Selecciona un proyecto primero');
        return;
      }
      const response = await api.get(`/pdf/hallazgos/${proyectoSeleccionado}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hallazgos_${proyectoSeleccionado}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Hallazgos generados');
    } catch (e) {
      toast.error('Error generando Hallazgos');
    }
  };

  const handleIrAPUs = () => {
    if (!proyectoSeleccionado) {
      toast.error('Selecciona un proyecto primero');
      return;
    }
    navigate(`/gestion-apus-cotizaciones?proyectoId=${proyectoSeleccionado}`);
  };

  const handleIrPAE = () => {
    navigate('/pae');
  };
  const handleIrCAE = () => {
    navigate('/cae');
  };

  const handleDescargarPDFServidor = async () => {
    try {
      if (!proyectoSeleccionado) {
        toast.error('Selecciona un proyecto primero');
        return;
      }
      const response = await api.get(`/pdf/proyecto/${proyectoSeleccionado}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `proyecto_${proyectoSeleccionado}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('PDF descargado');
    } catch (e) {
      toast.error('Error descargando PDF del servidor');
    }
  };

  const handleCrearCola = async () => {
    try {
      if (!proyectoSeleccionado) {
        toast.error('Selecciona un proyecto primero');
        return;
      }
      const nombre = window.prompt('Nombre de la cola:');
      if (!nombre) return;
      await TareaService.create({
        nombre,
        proyecto_id: proyectoSeleccionado,
        estado: 'pendiente'
      });
      toast.success('Cola creada');
    } catch (e) {
      toast.error('Error creando cola');
    }
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
          <div className="mt-4 flex items-center space-x-2">
            <Button
              variant={vistaActual === 'proyectos' ? 'default' : 'outline'}
              onClick={() => setVistaActual('proyectos')}
            >
              Proyectos
            </Button>
            <Button
              variant={vistaActual === 'dependencias' ? 'default' : 'outline'}
              onClick={() => setVistaActual('dependencias')}
              disabled={!proyectoSeleccionado && vistaActual !== 'dependencias'}
            >
              Dependencias
            </Button>
              <div className="ml-auto flex items-center space-x-2">
              <Button variant="outline" onClick={handleIniciarDependencia}>
                <Plus className="h-4 w-4 mr-2" />
                Iniciar Dependencia
              </Button>
              <Button variant="outline" onClick={handleIrPAE}>🍽️ PAE</Button>
              <Button variant="outline" onClick={handleIrCAE}>🏫 CAE</Button>
              <Button variant="outline" onClick={handleConsultarIA}>🤖 Consultar IA</Button>
              <Button variant="outline" onClick={handleGenerarPDF}>📄 Generar PDF</Button>
              <Button variant="outline" onClick={handleDescargarPDFServidor}>⬇️ PDF Servidor</Button>
              <Button variant="outline" onClick={handleGenerarPDFActa}>📄 Acta CAE</Button>
              <Button variant="outline" onClick={handleGenerarPDFDenuncia}>📄 Denuncia</Button>
              <Button variant="outline" onClick={handleGenerarPDFHallazgo}>📄 Hallazgos</Button>
              <Button variant="outline" onClick={handleIrAPUs}>💰 Calcular con APUs</Button>
                <Button variant="outline" onClick={handleCrearCola}>+ Crear Cola</Button>
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
                  <p className="text-sm font-medium text-gray-600">Colas Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.tareasPendientes}</p>
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Operadores Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.operadoresDisponibles}</p>
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
                      <Button variant="outline" size="sm" onClick={() => handleVerProyecto(proyecto.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Dependencias
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
