import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { 
  Save, 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Users, 
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { advancedAIService } from '../../../services/ia/AdvancedAIService';

const CrearProyecto = ({ onVolver }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    tipoCaso: '',
    cliente: '',
    operador: '',
    fechaInicio: '',
    fechaLimite: '',
    presupuestoEstimado: '',
    prioridad: 'media',
    documentos: []
  });

  const [operadoresDisponibles, setOperadoresDisponibles] = useState([]);
  const [clientesActivos, setClientesActivos] = useState([]);
  const [tiposCasos, setTiposCasos] = useState([]);
  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      // Cargar operadores disponibles
      setOperadoresDisponibles([
        { id: 1, nombre: 'Carlos Mendoza', especialidad: 'Derecho Minero', disponibilidad: 'alta' },
        { id: 2, nombre: 'María González', especialidad: 'Derecho Catastral', disponibilidad: 'media' },
        { id: 3, nombre: 'Luis Rodríguez', especialidad: 'Derecho Administrativo', disponibilidad: 'alta' },
        { id: 4, nombre: 'Ana Torres', especialidad: 'Derechos Étnicos', disponibilidad: 'baja' }
      ]);

      // Cargar clientes activos
      setClientesActivos([
        { id: 1, nombre: 'Comunidad Indígena Wayuu', tipo: 'Comunidad Indígena' },
        { id: 2, nombre: 'Asociación Campesina del Norte', tipo: 'Organización Social' },
        { id: 3, nombre: 'Corporación Minera del Sur', tipo: 'Empresa Privada' },
        { id: 4, nombre: 'Municipio de Santa Marta', tipo: 'Entidad Pública' }
      ]);

      // Cargar tipos de casos disponibles
      setTiposCasos([
        { id: 'minero', nombre: 'Derecho Minero', descripcion: 'Consultas previas, títulos mineros, impacto ambiental' },
        { id: 'catastral', nombre: 'Derecho Catastral', descripcion: 'Derechos de propiedad, servidumbres, avalúos' },
        { id: 'etnico', nombre: 'Derechos Étnicos', descripcion: 'Territorios ancestrales, consulta previa, planes de vida' },
        { id: 'administrativo', nombre: 'Derecho Administrativo', descripcion: 'Procedimientos administrativos, contratación pública' },
        { id: 'ambiental', nombre: 'Derecho Ambiental', descripcion: 'Licencias ambientales, estudios de impacto' }
      ]);
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo
    if (errores[field]) {
      setErrores(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre del proyecto es requerido';
    }

    if (!formData.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es requerida';
    }

    if (!formData.tipoCaso) {
      nuevosErrores.tipoCaso = 'Debe seleccionar un tipo de caso';
    }

    if (!formData.cliente) {
      nuevosErrores.cliente = 'Debe seleccionar un cliente';
    }

    if (!formData.operador) {
      nuevosErrores.operador = 'Debe seleccionar un operador';
    }

    if (!formData.fechaInicio) {
      nuevosErrores.fechaInicio = 'La fecha de inicio es requerida';
    }

    if (!formData.fechaLimite) {
      nuevosErrores.fechaLimite = 'La fecha límite es requerida';
    }

    if (formData.fechaInicio && formData.fechaLimite && formData.fechaInicio > formData.fechaLimite) {
      nuevosErrores.fechaLimite = 'La fecha límite debe ser posterior a la fecha de inicio';
    }

    if (!formData.presupuestoEstimado || formData.presupuestoEstimado <= 0) {
      nuevosErrores.presupuestoEstimado = 'El presupuesto estimado debe ser mayor a 0';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const analizarProyectoConIA = async () => {
    if (!formData.descripcion || !formData.tipoCaso) return;

    setCargando(true);
    try {
      const tipoCasoSeleccionado = tiposCasos.find(tc => tc.id === formData.tipoCaso);
      
      const consulta = `
        Analiza este proyecto de ${tipoCasoSeleccionado?.nombre}:
        
        Descripción: ${formData.descripcion}
        Tipo de Caso: ${tipoCasoSeleccionado?.nombre}
        
        Proporciona:
        1. Estimación de tiempo recomendado
        2. Tareas principales sugeridas
        3. Riesgos potenciales
        4. Recursos necesarios
        5. Recomendaciones de cronograma
      `;

      const analisis = await advancedAIService.analyzeComplex(
        consulta, 
        {
          caseType: formData.tipoCaso,
          analysisLevel: 'complete',
          options: { nivel_analisis: 'maximo', incluir_recomendaciones_avanzadas: true }
        }
      );

      setAnalisisIA(analisis);
    } catch (error) {
      console.error('Error en análisis IA:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setCargando(true);
    try {
      const proyectoData = {
        ...formData,
        administrador: user?.id,
        fechaCreacion: new Date().toISOString(),
        estado: 'pendiente',
        analisisIA: analisisIA
      };

      // Aquí se enviaría a la API
      console.log('Creando proyecto:', proyectoData);
      
      // Simular creación exitosa
      setTimeout(() => {
        alert('Proyecto creado exitosamente');
        if (onVolver) onVolver();
      }, 1000);

    } catch (error) {
      console.error('Error creando proyecto:', error);
      alert('Error al crear el proyecto');
    } finally {
      setCargando(false);
    }
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" onClick={onVolver}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Proyecto</h1>
          </div>
          <p className="text-gray-600">
            Crea un nuevo proyecto y asigna operadores y clientes para su ejecución.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Información Básica</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nombre">Nombre del Proyecto *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    placeholder="Ej: Consulta Previa - Proyecto Minero Wayuu"
                    className={errores.nombre ? 'border-red-500' : ''}
                  />
                  {errores.nombre && (
                    <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="tipoCaso">Tipo de Caso *</Label>
                  <Select value={formData.tipoCaso} onValueChange={(value) => handleInputChange('tipoCaso', value)}>
                    <SelectTrigger className={errores.tipoCaso ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Seleccionar tipo de caso" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCasos.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          <div>
                            <div className="font-medium">{tipo.nombre}</div>
                            <div className="text-sm text-gray-500">{tipo.descripcion}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errores.tipoCaso && (
                    <p className="text-red-500 text-sm mt-1">{errores.tipoCaso}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="descripcion">Descripción del Proyecto *</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  placeholder="Describe detalladamente el proyecto, objetivos, alcance y consideraciones especiales..."
                  rows={4}
                  className={errores.descripcion ? 'border-red-500' : ''}
                />
                {errores.descripcion && (
                  <p className="text-red-500 text-sm mt-1">{errores.descripcion}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={analizarProyectoConIA}
                  disabled={cargando || !formData.descripcion || !formData.tipoCaso}
                >
                  {cargando ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Analizar con IA
                    </>
                  )}
                </Button>
              </div>

              {analisisIA && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Análisis IA completado:</strong> Se han generado recomendaciones para este proyecto.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Asignaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Asignaciones</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="cliente">Cliente *</Label>
                  <Select value={formData.cliente} onValueChange={(value) => handleInputChange('cliente', value)}>
                    <SelectTrigger className={errores.cliente ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientesActivos.map((cliente) => (
                        <SelectItem key={cliente.id} value={cliente.id.toString()}>
                          <div>
                            <div className="font-medium">{cliente.nombre}</div>
                            <div className="text-sm text-gray-500">{cliente.tipo}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errores.cliente && (
                    <p className="text-red-500 text-sm mt-1">{errores.cliente}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="operador">Operador Asignado *</Label>
                  <Select value={formData.operador} onValueChange={(value) => handleInputChange('operador', value)}>
                    <SelectTrigger className={errores.operador ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Seleccionar operador" />
                    </SelectTrigger>
                    <SelectContent>
                      {operadoresDisponibles.map((operador) => (
                        <SelectItem key={operador.id} value={operador.id.toString()}>
                          <div>
                            <div className="font-medium">{operador.nombre}</div>
                            <div className="text-sm text-gray-500">
                              {operador.especialidad} - {operador.disponibilidad}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errores.operador && (
                    <p className="text-red-500 text-sm mt-1">{errores.operador}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cronograma y Presupuesto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Cronograma y Presupuesto</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="fechaInicio">Fecha de Inicio *</Label>
                  <Input
                    id="fechaInicio"
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => handleInputChange('fechaInicio', e.target.value)}
                    className={errores.fechaInicio ? 'border-red-500' : ''}
                  />
                  {errores.fechaInicio && (
                    <p className="text-red-500 text-sm mt-1">{errores.fechaInicio}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="fechaLimite">Fecha Límite *</Label>
                  <Input
                    id="fechaLimite"
                    type="date"
                    value={formData.fechaLimite}
                    onChange={(e) => handleInputChange('fechaLimite', e.target.value)}
                    className={errores.fechaLimite ? 'border-red-500' : ''}
                  />
                  {errores.fechaLimite && (
                    <p className="text-red-500 text-sm mt-1">{errores.fechaLimite}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="prioridad">Prioridad</Label>
                  <Select value={formData.prioridad} onValueChange={(value) => handleInputChange('prioridad', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="critica">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="presupuestoEstimado">Presupuesto Estimado (COP) *</Label>
                  <Input
                    id="presupuestoEstimado"
                    type="number"
                    value={formData.presupuestoEstimado}
                    onChange={(e) => handleInputChange('presupuestoEstimado', e.target.value)}
                    placeholder="15000000"
                    className={errores.presupuestoEstimado ? 'border-red-500' : ''}
                  />
                  {errores.presupuestoEstimado && (
                    <p className="text-red-500 text-sm mt-1">{errores.presupuestoEstimado}</p>
                  )}
                  {formData.presupuestoEstimado && (
                    <p className="text-sm text-gray-600 mt-1">
                      {formatearMoneda(parseInt(formData.presupuestoEstimado))}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onVolver}>
              Cancelar
            </Button>
            <Button type="submit" disabled={cargando}>
              {cargando ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Crear Proyecto
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearProyecto;
