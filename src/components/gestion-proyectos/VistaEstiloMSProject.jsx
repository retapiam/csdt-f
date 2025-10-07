import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Progress } from '@components/ui/progress';
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  FileText, 
  Paperclip,
  Calendar,
  User,
  Clock,
  DollarSign,
  Edit,
  Trash,
  Upload
} from 'lucide-react';

/**
 * Componente de vista jerárquica estilo Microsoft Project
 * Muestra: Actividades → Tareas Admin → Tareas Operador → Tareas Cliente
 */
const VistaEstiloMSProject = ({ proyectoId, rol, onCrearActividad, onCrearTarea }) => {
  const [actividades, setActividades] = useState([]);
  const [actividadesExpanded, setActividadesExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  // Colores por nivel de tarea
  const COLORES_NIVEL = {
    admin: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      badge: 'bg-purple-100 text-purple-800',
      hex: '#8B5CF6'
    },
    operador: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      badge: 'bg-green-100 text-green-800',
      hex: '#10B981'
    },
    cliente: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-800',
      badge: 'bg-orange-100 text-orange-800',
      hex: '#F59E0B'
    }
  };

  useEffect(() => {
    cargarActividades();
  }, [proyectoId]);

  const cargarActividades = async () => {
    try {
      setLoading(true);
      // Aquí irá la llamada al servicio
      // const response = await ActividadService.getPorProyecto(proyectoId);
      // setActividades(response.data);
      
      // Datos de ejemplo
      setActividades([
        {
          id: 1,
          nombre: 'Acción de Tutela - Derecho a la Salud',
          codigo: 'ACT-TUT001',
          tipo_actividad: 'tutela',
          categoria: 'juridica',
          estado: 'en_progreso',
          progreso: 65,
          color: '#3B82F6',
          tareas: [
            {
              id: 1,
              nombre: 'Análisis jurídico del caso',
              nivel_tarea: 'admin',
              estado: 'completada',
              progreso: 100,
              asignado_a: 'María González (Operador)',
              sub_tareas: []
            },
            {
              id: 2,
              nombre: 'Recolección de documentos médicos',
              nivel_tarea: 'admin',
              estado: 'en_progreso',
              progreso: 75,
              asignado_a: 'María González (Operador)',
              sub_tareas: [
                {
                  id: 21,
                  nombre: 'Entregar historia clínica',
                  nivel_tarea: 'operador',
                  estado: 'completada',
                  progreso: 100,
                  asignado_a: 'Juan Pérez (Cliente)',
                },
                {
                  id: 22,
                  nombre: 'Firmar autorización acceso datos',
                  nivel_tarea: 'cliente',
                  estado: 'pendiente',
                  progreso: 0,
                  asignado_a: 'Juan Pérez (Cliente)',
                }
              ]
            }
          ]
        }
      ]);
    } catch (error) {
      console.error('Error cargando actividades:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActividad = (actividadId) => {
    setActividadesExpanded(prev => ({
      ...prev,
      [actividadId]: !prev[actividadId]
    }));
  };

  const renderTarea = (tarea, nivel = 0, esSubTarea = false) => {
    const colores = COLORES_NIVEL[tarea.nivel_tarea] || COLORES_NIVEL.admin;
    const marginLeft = nivel * 20;

    return (
      <div key={tarea.id} className="mb-2">
        <div 
          className={`border ${colores.border} ${colores.bg} rounded-lg p-4 transition-all hover:shadow-md`}
          style={{ marginLeft: `${marginLeft}px` }}
        >
          <div className="flex items-start justify-between">
            {/* Información de la tarea */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={colores.badge}>
                  {tarea.nivel_tarea.toUpperCase()}
                </Badge>
                <h4 className="font-medium text-gray-900">{tarea.nombre}</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {tarea.asignado_a}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {tarea.tiempo_estimado || '4h'}
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="flex items-center space-x-2 mb-2">
                <Progress value={tarea.progreso} className="flex-1 h-2" />
                <span className="text-sm font-medium text-gray-700">{tarea.progreso}%</span>
              </div>

              {/* PDFs y soportes */}
              {(tarea.pdfs_adjuntos?.length > 0 || tarea.soportes?.length > 0) && (
                <div className="flex items-center space-x-3 mt-2">
                  {tarea.pdfs_adjuntos?.length > 0 && (
                    <div className="flex items-center text-sm text-blue-600">
                      <FileText className="h-4 w-4 mr-1" />
                      {tarea.pdfs_adjuntos.length} PDF(s)
                    </div>
                  )}
                  {tarea.soportes?.length > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Paperclip className="h-4 w-4 mr-1" />
                      {tarea.soportes.length} Soporte(s)
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="flex space-x-1">
              {(rol === 'admin' || rol === 'operador') && (
                <>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Renderizar sub-tareas recursivamente */}
        {tarea.sub_tareas && tarea.sub_tareas.length > 0 && (
          <div className="mt-2">
            {tarea.sub_tareas.map(subTarea => renderTarea(subTarea, nivel + 1, true))}
          </div>
        )}
      </div>
    );
  };

  const renderActividad = (actividad) => {
    const isExpanded = actividadesExpanded[actividad.id];

    return (
      <Card key={actividad.id} className="mb-4">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleActividad(actividad.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
              
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: actividad.color || '#3B82F6' }}
              />
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-lg">{actividad.nombre}</CardTitle>
                  <Badge variant="outline">{actividad.codigo}</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{actividad.tipo_actividad}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{actividad.progreso}%</div>
                <div className="text-xs text-gray-500">{actividad.estado}</div>
              </div>
              
              {rol === 'admin' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCrearTarea(actividad.id);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tarea
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-4">
            {/* Información de la actividad */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Fecha límite</div>
                  <div className="text-sm font-medium">{actividad.fecha_fin_planeada}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Horas estimadas</div>
                  <div className="text-sm font-medium">{actividad.horas_estimadas}h</div>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Costo estimado</div>
                  <div className="text-sm font-medium">
                    ${(actividad.costo_estimado || 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* PDFs de la actividad */}
            {actividad.pdfs_generados && actividad.pdfs_generados.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  PDFs Generados ({actividad.pdfs_generados.length})
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {actividad.pdfs_generados.map((pdf, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white rounded">
                      <span className="text-sm">{pdf.tipo}</span>
                      <Button variant="link" size="sm">Descargar</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tareas de la actividad */}
            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-gray-700 mb-3">
                Tareas ({actividad.tareas?.length || 0})
              </h5>
              {actividad.tareas && actividad.tareas.length > 0 ? (
                actividad.tareas.map(tarea => renderTarea(tarea))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No hay tareas en esta actividad</p>
                  {rol === 'admin' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => onCrearTarea(actividad.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Primera Tarea
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando vista de proyecto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Leyenda de colores */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Leyenda de Niveles de Tareas:</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORES_NIVEL.admin.hex }}></div>
              <span className="text-sm text-gray-700">Tareas Administrador (Principal)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORES_NIVEL.operador.hex }}></div>
              <span className="text-sm text-gray-700">Tareas Operador (Delegadas)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORES_NIVEL.cliente.hex }}></div>
              <span className="text-sm text-gray-700">Tareas Cliente (Autoasignadas)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón crear actividad (solo admin) */}
      {rol === 'admin' && (
        <div className="flex justify-end">
          <Button onClick={onCrearActividad}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Actividad
          </Button>
        </div>
      )}

      {/* Lista de actividades */}
      {actividades.length > 0 ? (
        <div>
          {actividades.map(actividad => renderActividad(actividad))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No hay actividades en este proyecto
            </h3>
            <p className="text-gray-500 mb-4">
              Crea la primera actividad del proyecto para empezar
            </p>
            {rol === 'admin' && (
              <Button onClick={onCrearActividad}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Actividad
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VistaEstiloMSProject;

