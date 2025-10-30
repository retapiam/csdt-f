import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Badge } from '../../../components/ui/badge';
import { 
  Calculator, 
  DollarSign, 
  FileText, 
  Plus, 
  Edit, 
  Trash2,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Save,
  RefreshCw,
  Eye
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import gestionProyectosService from '@services/GestionProyectosService';
import apuService from '@services/APUService';

const GestionAPUsCotizaciones = () => {
  const { user } = useAuth();
  const [apus, setApus] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [proyectosSeleccionados, setProyectosSeleccionados] = useState([]);
  const [formularioAPU, setFormularioAPU] = useState({
    codigo: '',
    descripcion: '',
    unidad: '',
    costoUnitario: '',
    categoria: '',
    tipoProyecto: ''
  });
  const [formularioCotizacion, setFormularioCotizacion] = useState({
    proyecto: '',
    nombre: '',
    descripcion: '',
    fechaValidez: '',
    condiciones: []
  });
  const [calculadoraPresupuesto, setCalculadoraPresupuesto] = useState({
    proyecto: '',
    tareas: [],
    total: 0,
    desglose: []
  });
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      setCargando(true);
      
      // Cargar APUs existentes
      const apusIniciales = [
        {
          id: 1,
          codigo: 'APU-001',
          descripcion: 'Análisis de Títulos Mineros',
          unidad: 'hora',
          costoUnitario: 250000,
          categoria: 'Análisis Legal',
          tipoProyecto: 'minero',
          fechaCreacion: '2025-01-15',
          activo: true
        },
        {
          id: 2,
          codigo: 'APU-002',
          descripcion: 'Revisión de Documentos Catastrales',
          unidad: 'hora',
          costoUnitario: 180000,
          categoria: 'Análisis Técnico',
          tipoProyecto: 'catastral',
          fechaCreacion: '2025-01-20',
          activo: true
        },
        {
          id: 3,
          codigo: 'APU-003',
          descripcion: 'Consulta Comunitaria',
          unidad: 'sesión',
          costoUnitario: 500000,
          categoria: 'Participación',
          tipoProyecto: 'etnico',
          fechaCreacion: '2025-02-01',
          activo: true
        }
      ];
      setApus(apusIniciales);
      apuService.setAll(apusIniciales);

      // Cargar cotizaciones
      setCotizaciones([
        {
          id: 1,
          proyecto: 'Consulta Previa - Proyecto Minero Wayuu',
          nombre: 'Cotización Análisis Minero Wayuu',
          fechaGeneracion: '2025-03-15',
          fechaValidez: '2025-04-15',
          total: 15000000,
          estado: 'aprobada',
          desglose: [
            { concepto: 'Análisis de Títulos', cantidad: 40, costo: 10000000 },
            { concepto: 'Consulta Comunitaria', cantidad: 6, costo: 3000000 },
            { concepto: 'Elaboración de Informe', cantidad: 20, costo: 2000000 }
          ]
        }
      ]);

      // Cargar proyectos disponibles
      setProyectosSeleccionados([
        { id: 1, nombre: 'Consulta Previa - Proyecto Minero Wayuu', tipo: 'minero' },
        { id: 2, nombre: 'Análisis Catastral - Zona Rural', tipo: 'catastral' },
        { id: 3, nombre: 'Estudio de Impacto Ambiental', tipo: 'ambiental' }
      ]);

    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
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

  const getEstadoColor = (estado) => {
    const colores = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      aprobada: 'bg-green-100 text-green-800',
      rechazada: 'bg-red-100 text-red-800',
      vencida: 'bg-gray-100 text-gray-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  const handleCrearAPU = async (e) => {
    e.preventDefault();
    
    if (!validarFormularioAPU()) {
      return;
    }

    setCargando(true);
    try {
      const nuevoAPU = {
        id: Date.now(),
        ...formularioAPU,
        costoUnitario: parseFloat(formularioAPU.costoUnitario),
        fechaCreacion: new Date().toISOString(),
        activo: true
      };

      setApus(prev => [...prev, nuevoAPU]);
      setFormularioAPU({
        codigo: '',
        descripcion: '',
        unidad: '',
        costoUnitario: '',
        categoria: '',
        tipoProyecto: ''
      });

      alert('APU creado exitosamente');
    } catch (error) {
      console.error('Error creando APU:', error);
      alert('Error al crear APU');
    } finally {
      setCargando(false);
    }
  };

  const handleGenerarCotizacion = async (proyectoId) => {
    setCargando(true);
    try {
      const proyecto = proyectosSeleccionados.find(p => p.id === proyectoId);
      if (!proyecto) return;

      // Simular generación de cotización con APUs
      const apusProyecto = apus.filter(apu => apu.tipoProyecto === proyecto.tipo && apu.activo);
      
      const desglose = apusProyecto.map(apu => ({
        concepto: apu.descripcion,
        cantidad: Math.floor(Math.random() * 50) + 10, // Cantidad simulada
        costo: apu.costoUnitario * (Math.floor(Math.random() * 50) + 10)
      }));

      const total = desglose.reduce((sum, item) => sum + item.costo, 0);

      const nuevaCotizacion = {
        id: Date.now(),
        proyecto: proyecto.nombre,
        nombre: `Cotización ${proyecto.nombre}`,
        fechaGeneracion: new Date().toISOString(),
        fechaValidez: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        total,
        estado: 'pendiente',
        desglose
      };

      setCotizaciones(prev => [...prev, nuevaCotizacion]);
      alert('Cotización generada exitosamente');
    } catch (error) {
      console.error('Error generando cotización:', error);
      alert('Error al generar cotización');
    } finally {
      setCargando(false);
    }
  };

  const handleCalcularPresupuesto = async (proyectoId) => {
    try {
      const proyecto = proyectosSeleccionados.find(p => p.id === proyectoId);
      if (!proyecto) return;

      // Simular cálculo con APUs
      const apusProyecto = apus.filter(apu => apu.tipoProyecto === proyecto.tipo && apu.activo);
      
      const tareas = apusProyecto.map(apu => ({
        id: apu.id,
        nombre: apu.descripcion,
        cantidad: Math.floor(Math.random() * 30) + 5,
        costoUnitario: apu.costoUnitario,
        costoTotal: apu.costoUnitario * (Math.floor(Math.random() * 30) + 5)
      }));

      const total = tareas.reduce((sum, tarea) => sum + tarea.costoTotal, 0);

      setCalculadoraPresupuesto({
        proyecto: proyecto.nombre,
        tareas,
        total,
        desglose: tareas
      });
    } catch (error) {
      console.error('Error calculando presupuesto:', error);
    }
  };

  const validarFormularioAPU = () => {
    const nuevosErrores = {};

    if (!formularioAPU.codigo.trim()) {
      nuevosErrores.codigo = 'El código es requerido';
    }

    if (!formularioAPU.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es requerida';
    }

    if (!formularioAPU.costoUnitario || formularioAPU.costoUnitario <= 0) {
      nuevosErrores.costoUnitario = 'El costo unitario debe ser mayor a 0';
    }

    if (!formularioAPU.categoria) {
      nuevosErrores.categoria = 'La categoría es requerida';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de APUs y Cotizaciones
          </h1>
          <p className="text-gray-600">
            Administra los Análisis de Precios Unitarios (APUs) y genera cotizaciones automáticas.
          </p>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">APUs Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{apus.filter(apu => apu.activo).length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cotizaciones</p>
                  <p className="text-2xl font-bold text-gray-900">{cotizaciones.length}</p>
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
                  <p className="text-sm font-medium text-gray-600">Valor Total Cotizaciones</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatearMoneda(cotizaciones.reduce((sum, cot) => sum + cot.total, 0))}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Proyectos</p>
                  <p className="text-2xl font-bold text-gray-900">{proyectosSeleccionados.length}</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gestión de APUs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Gestión de APUs</span>
                <Button size="sm" onClick={() => document.getElementById('formulario-apu').scrollIntoView()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo APU
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apus.map((apu) => (
                  <div key={apu.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{apu.codigo}</h3>
                        <p className="text-sm text-gray-600">{apu.descripcion}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={apu.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {apu.activo ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Unidad:</span> {apu.unidad}
                      </div>
                      <div>
                        <span className="font-medium">Costo:</span> {formatearMoneda(apu.costoUnitario)}
                      </div>
                      <div>
                        <span className="font-medium">Categoría:</span> {apu.categoria}
                      </div>
                      <div>
                        <span className="font-medium">Tipo:</span> {apu.tipoProyecto}
                      </div>
                    </div>
                    <div className="flex justify-end mt-3 space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formulario para crear APU */}
              <div id="formulario-apu" className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Crear Nuevo APU</h3>
                <form onSubmit={handleCrearAPU} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="codigo">Código *</Label>
                      <Input
                        id="codigo"
                        value={formularioAPU.codigo}
                        onChange={(e) => setFormularioAPU(prev => ({ ...prev, codigo: e.target.value }))}
                        placeholder="APU-001"
                        className={errores.codigo ? 'border-red-500' : ''}
                      />
                      {errores.codigo && (
                        <p className="text-red-500 text-sm mt-1">{errores.codigo}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="categoria">Categoría *</Label>
                      <Select value={formularioAPU.categoria} onValueChange={(value) => setFormularioAPU(prev => ({ ...prev, categoria: value }))}>
                        <SelectTrigger className={errores.categoria ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analisis-legal">Análisis Legal</SelectItem>
                          <SelectItem value="analisis-tecnico">Análisis Técnico</SelectItem>
                          <SelectItem value="participacion">Participación</SelectItem>
                          <SelectItem value="documentacion">Documentación</SelectItem>
                          <SelectItem value="consultoria">Consultoría</SelectItem>
                        </SelectContent>
                      </Select>
                      {errores.categoria && (
                        <p className="text-red-500 text-sm mt-1">{errores.categoria}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="descripcion">Descripción *</Label>
                    <Input
                      id="descripcion"
                      value={formularioAPU.descripcion}
                      onChange={(e) => setFormularioAPU(prev => ({ ...prev, descripcion: e.target.value }))}
                      placeholder="Descripción del APU"
                      className={errores.descripcion ? 'border-red-500' : ''}
                    />
                    {errores.descripcion && (
                      <p className="text-red-500 text-sm mt-1">{errores.descripcion}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="unidad">Unidad</Label>
                      <Select value={formularioAPU.unidad} onValueChange={(value) => setFormularioAPU(prev => ({ ...prev, unidad: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hora">Hora</SelectItem>
                          <SelectItem value="dia">Día</SelectItem>
                          <SelectItem value="sesion">Sesión</SelectItem>
                          <SelectItem value="unidad">Unidad</SelectItem>
                          <SelectItem value="proyecto">Proyecto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="costoUnitario">Costo Unitario *</Label>
                      <Input
                        id="costoUnitario"
                        type="number"
                        value={formularioAPU.costoUnitario}
                        onChange={(e) => setFormularioAPU(prev => ({ ...prev, costoUnitario: e.target.value }))}
                        placeholder="250000"
                        className={errores.costoUnitario ? 'border-red-500' : ''}
                      />
                      {errores.costoUnitario && (
                        <p className="text-red-500 text-sm mt-1">{errores.costoUnitario}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="tipoProyecto">Tipo de Proyecto</Label>
                      <Select value={formularioAPU.tipoProyecto} onValueChange={(value) => setFormularioAPU(prev => ({ ...prev, tipoProyecto: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minero">Minero</SelectItem>
                          <SelectItem value="catastral">Catastral</SelectItem>
                          <SelectItem value="etnico">Étnico</SelectItem>
                          <SelectItem value="ambiental">Ambiental</SelectItem>
                          <SelectItem value="administrativo">Administrativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Crear APU
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Gestión de Cotizaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cotizaciones</span>
                <Button size="sm" onClick={() => document.getElementById('generar-cotizacion').scrollIntoView()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Generar Cotización
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cotizaciones.map((cotizacion) => (
                  <div key={cotizacion.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{cotizacion.nombre}</h3>
                        <p className="text-sm text-gray-600">{cotizacion.proyecto}</p>
                      </div>
                      <Badge className={getEstadoColor(cotizacion.estado)}>
                        {cotizacion.estado}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                      <div className="flex justify-between">
                        <span>Fecha Generación:</span>
                        <span>{cotizacion.fechaGeneracion.split('T')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Válida hasta:</span>
                        <span>{cotizacion.fechaValidez}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="font-medium">{formatearMoneda(cotizacion.total)}</span>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Generador de Cotizaciones */}
              <div id="generar-cotizacion" className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Generar Nueva Cotización</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Seleccionar Proyecto</Label>
                    <Select onValueChange={(value) => handleGenerarCotizacion(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar proyecto para generar cotización" />
                      </SelectTrigger>
                      <SelectContent>
                        {proyectosSeleccionados.map((proyecto) => (
                          <SelectItem key={proyecto.id} value={proyecto.id.toString()}>
                            {proyecto.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      La cotización se generará automáticamente usando los APUs correspondientes al tipo de proyecto.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculadora de Presupuestos */}
        {calculadoraPresupuesto.proyecto && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Calculadora de Presupuestos - {calculadoraPresupuesto.proyecto}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calculadoraPresupuesto.tareas.map((tarea) => (
                  <div key={tarea.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="font-medium">{tarea.nombre}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cantidad</p>
                        <p className="font-medium">{tarea.cantidad}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Costo Unitario</p>
                        <p className="font-medium">{formatearMoneda(tarea.costoUnitario)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-medium text-green-600">{formatearMoneda(tarea.costoTotal)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total del Presupuesto:</span>
                    <span className="text-green-600">{formatearMoneda(calculadoraPresupuesto.total)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GestionAPUsCotizaciones;
