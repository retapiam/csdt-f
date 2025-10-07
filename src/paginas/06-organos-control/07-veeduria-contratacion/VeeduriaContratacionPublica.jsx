import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { 
  Search, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Brain, 
  Clock,
  Target,
  Users,
  Building,
  DollarSign,
  Calendar,
  MapPin,
  Shield,
  Zap,
  BarChart3,
  Activity,
  Lightbulb,
  Info,
  ArrowRight,
  ArrowLeft,
  Gavel,
  Eye,
  FileCheck,
  TrendingUp
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';
import VeeduriaConsejoIALinks from '../../../components/VeeduriaConsejoIALinks';

const VeeduriaContratacionPublica = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    // Paso 1: Datos del Veedor
    datosVeedor: {
      nombre: '',
      documento: '',
      email: '',
      telefono: '',
      organizacion: '',
      experienciaContratacion: ''
    },
    // Paso 2: Proceso de Contratación
    procesoContratacion: {
      entidad: '',
      proceso: '',
      numeroProceso: '',
      modalidad: '',
      presupuesto: '',
      fechaApertura: '',
      fechaCierre: '',
      objeto: '',
      responsables: '',
      ubicacion: ''
    },
    // Paso 3: Evidencias
    evidencias: [],
    archivos: [],
    oferentes: [],
    analisisOferentes: '',
    // Paso 4: Análisis IA
    analisisIA: {
      especialistaContratacion: '',
      especialistaLegal: '',
      especialistaLicitaciones: '',
      especialistaTransparencia: '',
      analisisUnificado: ''
    }
  });

  const [cargandoIA, setCargandoIA] = useState({
    contratacion: false,
    legal: false,
    licitaciones: false,
    transparencia: false,
    analisisUnificado: false
  });

  const [pasosCompletados, setPasosCompletados] = useState({
    datosVeedor: false,
    procesoContratacion: false,
    evidencias: false,
    analisisIA: false
  });

  const [progreso, setProgreso] = useState(0);

  // Efecto para calcular el progreso
  useEffect(() => {
    const pasos = Object.values(pasosCompletados);
    const completados = pasos.filter(paso => paso).length;
    const porcentaje = Math.round((completados / pasos.length) * 100);
    setProgreso(porcentaje);
  }, [pasosCompletados]);

  // Efecto para actualizar pasos completados
  useEffect(() => {
    setPasosCompletados(prev => ({
      ...prev,
      datosVeedor: !!(formulario.datosVeedor.nombre && formulario.datosVeedor.documento && formulario.datosVeedor.email),
      procesoContratacion: !!(formulario.procesoContratacion.entidad && formulario.procesoContratacion.proceso),
      evidencias: formulario.evidencias.length > 0,
      analisisIA: !!formulario.analisisIA.analisisUnificado
    }));
  }, [formulario]);

  const modalidadesContratacion = [
    { id: 'licitacion_publica', nombre: 'Licitación Pública' },
    { id: 'seleccion_abreviada', nombre: 'Selección Abreviada' },
    { id: 'contratacion_directa', nombre: 'Contratación Directa' },
    { id: 'minima_cuantia', nombre: 'Mínima Cuantía' },
    { id: 'subasta_inversa', nombre: 'Subasta Inversa' },
    { id: 'concurso', nombre: 'Concurso' },
    { id: 'encargo_fiduciario', nombre: 'Encargo Fiduciario' },
    { id: 'otro', nombre: 'Otra Modalidad' }
  ];

  const especialistasIA = [
    {
      id: 'especialistaContratacion',
      nombre: 'Dr. Ana Patricia López - Especialista en Contratación Pública',
      icono: '📋',
      descripcion: 'Experta en contratación pública con 12 años de experiencia en entidades estatales y conocimiento profundo de la Ley 80 de 1993.',
      especialidades: ['Contratación Pública', 'Ley 80 de 1993', 'Procedimientos Contractuales', 'Evaluación de Proponentes']
    },
    {
      id: 'especialistaLegal',
      nombre: 'Dr. Carlos Mendoza - Abogado Administrativo',
      icono: '⚖️',
      descripcion: 'Abogado especializado en derecho administrativo y contractual con amplia experiencia en procesos licitatorios y recursos administrativos.',
      especialidades: ['Derecho Administrativo', 'Recursos Administrativos', 'Procedimientos Legales', 'Jurisprudencia']
    },
    {
      id: 'especialistaLicitaciones',
      nombre: 'Ing. María Fernanda Ruiz - Especialista en Licitaciones',
      icono: '🏗️',
      descripcion: 'Ingeniera especializada en procesos licitatorios, evaluación de propuestas y seguimiento de contratos con certificación en SECOP.',
      especialidades: ['Procesos Licitatorios', 'Evaluación de Propuestas', 'Seguimiento de Contratos', 'SECOP']
    },
    {
      id: 'especialistaTransparencia',
      nombre: 'Dr. Roberto Silva - Consultor en Transparencia',
      icono: '🔍',
      descripcion: 'Especialista en transparencia, acceso a información pública y control social con experiencia en entes de control y veedurías.',
      especialidades: ['Transparencia', 'Acceso a Información', 'Control Social', 'Prevención de Corrupción']
    }
  ];

  const baseConocimiento = {
    normativas: [
      {
        titulo: 'Ley 80 de 1993 - Estatuto de Contratación',
        descripcion: 'Ley que regula la contratación pública en Colombia',
        articulos: ['Artículo 1', 'Artículo 2', 'Artículo 3'],
        aplicacion: 'Marco legal fundamental para contratación'
      },
      {
        titulo: 'Decreto 1510 de 2013 - Reglamento de Contratación',
        descripcion: 'Decreto que reglamenta la Ley 80 de 1993',
        articulos: ['Artículo 1', 'Artículo 2', 'Artículo 3'],
        aplicacion: 'Reglamentación específica de procedimientos'
      },
      {
        titulo: 'Ley 1474 de 2011 - Estatuto Anticorrupción',
        descripcion: 'Ley que establece medidas para prevenir la corrupción en la contratación',
        articulos: ['Artículo 1', 'Artículo 2', 'Artículo 3'],
        aplicacion: 'Prevención de corrupción en contratación'
      }
    ],
    precedentes: [
      {
        caso: 'Veeduría a Licitación de Obras Públicas',
        entidad: 'Ministerio de Transporte',
        resultado: 'Identificación de irregularidades en evaluación de propuestas',
        impacto: 'Nulidad del proceso y nueva licitación'
      },
      {
        caso: 'Control Social a Contratación Directa',
        entidad: 'Alcaldía de Medellín',
        resultado: 'Verificación de cumplimiento de requisitos legales',
        impacto: 'Validación del proceso y ejecución del contrato'
      }
    ],
    herramientas: [
      {
        nombre: 'Manual de Contratación Pública',
        descripcion: 'Guía completa para procesos de contratación',
        tipo: 'Documento Guía'
      },
      {
        nombre: 'Protocolo de Veeduría a Contratación',
        descripcion: 'Metodología para vigilancia de procesos contractuales',
        tipo: 'Metodología'
      }
    ]
  };

  const handleInputChange = (paso, campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [paso]: {
        ...prev[paso],
        [campo]: valor
      }
    }));
  };

  const analizarConIA = async (tipoEspecialista) => {
    setCargandoIA(prev => ({ ...prev, [tipoEspecialista]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analisis = {
        especialistaContratacion: tipoEspecialista === 'especialistaContratacion' ? 
          `Análisis de Contratación Pública:\n\nEl proceso ${formulario.procesoContratacion.proceso} de la entidad ${formulario.procesoContratacion.entidad} bajo modalidad ${formulario.procesoContratacion.modalidad} requiere:\n\n1. Verificación de cumplimiento de la Ley 80 de 1993\n2. Análisis de la modalidad de contratación seleccionada\n3. Validación de requisitos habilitantes\n4. Evaluación de capacidad técnica y financiera\n5. Seguimiento al proceso de selección` : '',
        
        especialistaLegal: tipoEspecialista === 'especialistaLegal' ?
          `Análisis Legal:\n\nAspectos legales del proceso ${formulario.procesoContratacion.numeroProceso}:\n\n1. Cumplimiento de procedimientos legales\n2. Validación de términos de referencia\n3. Análisis de pliegos de condiciones\n4. Verificación de recursos administrativos\n5. Evaluación de causales de nulidad` : '',
        
        especialistaLicitaciones: tipoEspecialista === 'especialistaLicitaciones' ?
          `Análisis de Licitaciones:\n\nProceso licitatorio ${formulario.procesoContratacion.numeroProceso}:\n\n1. Evaluación de modalidad seleccionada\n2. Análisis de pliegos de condiciones\n3. Verificación de cronograma del proceso\n4. Evaluación de propuestas recibidas\n5. Seguimiento a adjudicación` : '',
        
        especialistaTransparencia: tipoEspecialista === 'especialistaTransparencia' ?
          `Análisis de Transparencia:\n\nTransparencia en el proceso ${formulario.procesoContratacion.proceso}:\n\n1. Publicación en SECOP y portal de transparencia\n2. Acceso a información del proceso\n3. Participación ciudadana en la contratación\n4. Rendición de cuentas del proceso\n5. Mecanismos de control y seguimiento` : ''
      };

      setFormulario(prev => ({
        ...prev,
        analisisIA: {
          ...prev.analisisIA,
          [tipoEspecialista]: analisis[tipoEspecialista]
        }
      }));

      toast.success(`Análisis de ${especialistasIA.find(e => e.id === tipoEspecialista)?.nombre} completado`);
    } catch (error) {
      console.error('Error en análisis IA:', error);
      toast.error('Error al realizar análisis con IA');
    } finally {
      setCargandoIA(prev => ({ ...prev, [tipoEspecialista]: false }));
    }
  };

  const generarAnalisisUnificado = async () => {
    setCargandoIA(prev => ({ ...prev, analisisUnificado: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const analisisUnificado = `ANÁLISIS UNIFICADO DE VIGILANCIA A CONTRATACIÓN PÚBLICA

PROCESO: ${formulario.procesoContratacion.proceso}
ENTIDAD: ${formulario.procesoContratacion.entidad}
NÚMERO: ${formulario.procesoContratacion.numeroProceso}
MODALIDAD: ${formulario.procesoContratacion.modalidad}
PRESUPUESTO: ${formulario.procesoContratacion.presupuesto}

RESUMEN EJECUTIVO:
La veeduría ciudadana al proceso de contratación ${formulario.procesoContratacion.proceso} de la entidad ${formulario.procesoContratacion.entidad} busca garantizar la transparencia, eficiencia y legalidad en la contratación pública.

HALLAZGOS PRINCIPALES:
1. Proceso bajo modalidad ${formulario.procesoContratacion.modalidad}
2. Presupuesto asignado de ${formulario.procesoContratacion.presupuesto}
3. Objeto del contrato: ${formulario.procesoContratacion.objeto}
4. Cronograma: Apertura ${formulario.procesoContratacion.fechaApertura} - Cierre ${formulario.procesoContratacion.fechaCierre}

RECOMENDACIONES:
1. Verificar cumplimiento de la Ley 80 de 1993
2. Validar modalidad de contratación seleccionada
3. Analizar pliegos de condiciones y términos de referencia
4. Evaluar propuestas recibidas y proceso de selección
5. Seguir proceso de adjudicación y suscripción del contrato
6. Monitorear ejecución contractual y cumplimiento de obligaciones

RIESGOS IDENTIFICADOS:
- Irregularidades en el proceso de selección
- Falta de transparencia en la información
- Incumplimiento de plazos establecidos
- Violación de principios de la contratación pública

PLAN DE ACCIÓN:
1. Revisar documentos del proceso en SECOP
2. Verificar publicación y difusión del proceso
3. Analizar propuestas y evaluación
4. Seguir proceso de adjudicación
5. Monitorear ejecución del contrato

CONCLUSIONES:
La veeduría ciudadana es fundamental para garantizar la transparencia y legalidad en el proceso de contratación ${formulario.procesoContratacion.proceso}. Se recomienda mantener un seguimiento permanente y verificar el cumplimiento de todas las etapas del proceso.`;

      setFormulario(prev => ({
        ...prev,
        analisisIA: {
          ...prev.analisisIA,
          analisisUnificado
        }
      }));

      toast.success('Análisis unificado completado');
    } catch (error) {
      console.error('Error en análisis unificado:', error);
      toast.error('Error al generar análisis unificado');
    } finally {
      setCargandoIA(prev => ({ ...prev, analisisUnificado: false }));
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('VEEDURÍA CIUDADANA - CONTRATACIÓN PÚBLICA', 20, 30);
    
    doc.setFontSize(14);
    doc.text('DATOS DEL VEEDOR', 20, 50);
    doc.setFontSize(10);
    doc.text(`Nombre: ${formulario.datosVeedor.nombre}`, 20, 60);
    doc.text(`Documento: ${formulario.datosVeedor.documento}`, 20, 70);
    doc.text(`Email: ${formulario.datosVeedor.email}`, 20, 80);
    
    doc.setFontSize(14);
    doc.text('PROCESO DE CONTRATACIÓN', 20, 100);
    doc.setFontSize(10);
    doc.text(`Entidad: ${formulario.procesoContratacion.entidad}`, 20, 110);
    doc.text(`Proceso: ${formulario.procesoContratacion.proceso}`, 20, 120);
    doc.text(`Número: ${formulario.procesoContratacion.numeroProceso}`, 20, 130);
    doc.text(`Modalidad: ${formulario.procesoContratacion.modalidad}`, 20, 140);
    doc.text(`Presupuesto: ${formulario.procesoContratacion.presupuesto}`, 20, 150);
    
    if (formulario.analisisIA.analisisUnificado) {
      doc.setFontSize(14);
      doc.text('ANÁLISIS CON INTELIGENCIA ARTIFICIAL', 20, 170);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(formulario.analisisIA.analisisUnificado, 170);
      doc.text(lines, 20, 180);
    }
    
    doc.save('veeduria-contratacion-publica.pdf');
    toast.success('PDF generado exitosamente');
  };

  const siguientePaso = () => {
    if (pasoActual < 4) {
      setPasoActual(pasoActual + 1);
    }
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Veeduría Ciudadana</h1>
          </div>
          <h2 className="text-2xl text-gray-600 mb-2">Control Social de Contratación Pública</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Sistema especializado para vigilar licitaciones, concursos y contratos, 
            prevenir corrupción y asegurar transparencia en la contratación pública.
          </p>
        </div>

        {/* Barra de Progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso de la Veeduría</span>
            <span className="text-sm font-medium text-green-600">{progreso}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={pasosCompletados.datosVeedor ? 'text-green-600 font-semibold' : ''}>
              ✓ Datos del Veedor
            </span>
            <span className={pasosCompletados.procesoContratacion ? 'text-green-600 font-semibold' : ''}>
              ✓ Proceso de Contratación
            </span>
            <span className={pasosCompletados.evidencias ? 'text-green-600 font-semibold' : ''}>
              ✓ Evidencias
            </span>
            <span className={pasosCompletados.analisisIA ? 'text-green-600 font-semibold' : ''}>
              ✓ Análisis IA
            </span>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              {/* Paso 1: Datos del Veedor */}
              {pasoActual === 1 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Users className="h-8 w-8 text-green-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Datos del Veedor</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nombre">Nombre Completo *</Label>
                      <Input
                        id="nombre"
                        value={formulario.datosVeedor.nombre}
                        onChange={(e) => handleInputChange('datosVeedor', 'nombre', e.target.value)}
                        placeholder="Ingrese su nombre completo"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="documento">Número de Documento *</Label>
                      <Input
                        id="documento"
                        value={formulario.datosVeedor.documento}
                        onChange={(e) => handleInputChange('datosVeedor', 'documento', e.target.value)}
                        placeholder="CC, CE, TI, etc."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formulario.datosVeedor.email}
                        onChange={(e) => handleInputChange('datosVeedor', 'email', e.target.value)}
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        value={formulario.datosVeedor.telefono}
                        onChange={(e) => handleInputChange('datosVeedor', 'telefono', e.target.value)}
                        placeholder="300 123 4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="organizacion">Organización</Label>
                      <Input
                        id="organizacion"
                        value={formulario.datosVeedor.organizacion}
                        onChange={(e) => handleInputChange('datosVeedor', 'organizacion', e.target.value)}
                        placeholder="Nombre de la organización"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label htmlFor="experiencia">Experiencia en Contratación Pública</Label>
                    <Textarea
                      id="experiencia"
                      value={formulario.datosVeedor.experienciaContratacion}
                      onChange={(e) => handleInputChange('datosVeedor', 'experienciaContratacion', e.target.value)}
                      placeholder="Describa su experiencia en veedurías a procesos de contratación pública"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Paso 2: Proceso de Contratación */}
              {pasoActual === 2 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Gavel className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Proceso de Contratación</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="entidad">Entidad Pública *</Label>
                      <Input
                        id="entidad"
                        value={formulario.procesoContratacion.entidad}
                        onChange={(e) => handleInputChange('procesoContratacion', 'entidad', e.target.value)}
                        placeholder="Nombre de la entidad"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="proceso">Nombre del Proceso *</Label>
                      <Input
                        id="proceso"
                        value={formulario.procesoContratacion.proceso}
                        onChange={(e) => handleInputChange('procesoContratacion', 'proceso', e.target.value)}
                        placeholder="Nombre del proceso de contratación"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="numeroProceso">Número del Proceso</Label>
                      <Input
                        id="numeroProceso"
                        value={formulario.procesoContratacion.numeroProceso}
                        onChange={(e) => handleInputChange('procesoContratacion', 'numeroProceso', e.target.value)}
                        placeholder="Número asignado al proceso"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="modalidad">Modalidad de Contratación</Label>
                      <Select
                        value={formulario.procesoContratacion.modalidad}
                        onValueChange={(value) => handleInputChange('procesoContratacion', 'modalidad', value)}
                      >
                        <option value="">Seleccione la modalidad</option>
                        {modalidadesContratacion.map(modalidad => (
                          <option key={modalidad.id} value={modalidad.nombre}>
                            {modalidad.nombre}
                          </option>
                        ))}
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="presupuesto">Presupuesto</Label>
                      <Input
                        id="presupuesto"
                        value={formulario.procesoContratacion.presupuesto}
                        onChange={(e) => handleInputChange('procesoContratacion', 'presupuesto', e.target.value)}
                        placeholder="Valor del presupuesto"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="fechaApertura">Fecha de Apertura</Label>
                      <Input
                        id="fechaApertura"
                        type="date"
                        value={formulario.procesoContratacion.fechaApertura}
                        onChange={(e) => handleInputChange('procesoContratacion', 'fechaApertura', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="fechaCierre">Fecha de Cierre</Label>
                      <Input
                        id="fechaCierre"
                        type="date"
                        value={formulario.procesoContratacion.fechaCierre}
                        onChange={(e) => handleInputChange('procesoContratacion', 'fechaCierre', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="responsables">Responsables del Proceso</Label>
                      <Input
                        id="responsables"
                        value={formulario.procesoContratacion.responsables}
                        onChange={(e) => handleInputChange('procesoContratacion', 'responsables', e.target.value)}
                        placeholder="Nombres de los responsables"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 gap-6">
                    <div>
                      <Label htmlFor="objeto">Objeto del Contrato</Label>
                      <Textarea
                        id="objeto"
                        value={formulario.procesoContratacion.objeto}
                        onChange={(e) => handleInputChange('procesoContratacion', 'objeto', e.target.value)}
                        placeholder="Describa detalladamente el objeto del contrato"
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ubicacion">Ubicación</Label>
                      <Input
                        id="ubicacion"
                        value={formulario.procesoContratacion.ubicacion}
                        onChange={(e) => handleInputChange('procesoContratacion', 'ubicacion', e.target.value)}
                        placeholder="Ubicación del proyecto o servicio"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 3: Evidencias */}
              {pasoActual === 3 && (
                <div>
                  <div className="flex items-center mb-6">
                    <FileText className="h-8 w-8 text-purple-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Evidencias y Análisis</h3>
                  </div>
                  
                  <Alert className="mb-6">
                    <Info className="h-4 w-4" />
                    <Alert.Description>
                      Adjunte documentos del proceso como pliegos, propuestas, actas, etc. 
                      También puede analizar la pluralidad de oferentes y transparencia del proceso.
                    </Alert.Description>
                  </Alert>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="archivos">Documentos del Proceso</Label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="archivos" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                              <span>Subir documentos</span>
                              <input id="archivos" type="file" className="sr-only" multiple />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, XLS hasta 10MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="analisisOferentes">Análisis de Oferentes</Label>
                      <Textarea
                        id="analisisOferentes"
                        value={formulario.analisisOferentes}
                        onChange={(e) => setFormulario(prev => ({ ...prev, analisisOferentes: e.target.value }))}
                        placeholder="Analice la pluralidad de oferentes, experiencia, capacidad técnica y financiera, etc."
                        rows={6}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 4: Análisis IA */}
              {pasoActual === 4 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Brain className="h-8 w-8 text-indigo-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Análisis con Inteligencia Artificial</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {especialistasIA.map((especialista) => (
                      <Card key={especialista.id} className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{especialista.icono}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              {especialista.nombre}
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">
                              {especialista.descripcion}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {especialista.especialidades.map((especialidad, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {especialidad}
                                </Badge>
                              ))}
                            </div>
                            <Button
                              onClick={() => analizarConIA(especialista.id)}
                              disabled={cargandoIA[especialista.id]}
                              className="w-full"
                              size="sm"
                            >
                              {cargandoIA[especialista.id] ? (
                                <>
                                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                                  Analizando...
                                </>
                              ) : (
                                <>
                                  <Zap className="h-4 w-4 mr-2" />
                                  Analizar
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Análisis Unificado */}
                  <Card className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">
                        Análisis Unificado
                      </h4>
                      <Button
                        onClick={generarAnalisisUnificado}
                        disabled={cargandoIA.analisisUnificado}
                        className="bg-gradient-to-r from-green-600 to-blue-600"
                      >
                        {cargandoIA.analisisUnificado ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Generando...
                          </>
                        ) : (
                          <>
                            <Brain className="h-4 w-4 mr-2" />
                            Generar Análisis Unificado
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {formulario.analisisIA.analisisUnificado && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {formulario.analisisIA.analisisUnificado}
                        </pre>
                      </div>
                    )}
                  </Card>
                  
                  {/* Botón Generar PDF */}
                  <div className="flex justify-center">
                    <Button
                      onClick={generarPDF}
                      disabled={!formulario.analisisIA.analisisUnificado}
                      className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-3"
                      size="lg"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Generar Reporte PDF
                    </Button>
                  </div>
                  
                  {/* Enlaces a Consejo IA y Consejo EtnoIA */}
                  <VeeduriaConsejoIALinks 
                    tipoVeeduria={formulario.procesoContratacion?.modalidad || 'licitacion_publica'}
                    datosCaso={formulario}
                  />
                </div>
              )}

              {/* Navegación */}
              <div className="flex justify-between mt-8">
                <Button
                  onClick={pasoAnterior}
                  disabled={pasoActual === 1}
                  variant="outline"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                
                <Button
                  onClick={siguientePaso}
                  disabled={pasoActual === 4}
                  className="bg-gradient-to-r from-green-600 to-blue-600"
                >
                  Siguiente
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Base de Conocimiento */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileCheck className="h-5 w-5 mr-2 text-green-600" />
                Base de Conocimiento
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Normativas</h4>
                  <div className="space-y-2">
                    {baseConocimiento.normativas.map((norma, index) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg">
                        <h5 className="font-medium text-sm text-green-800">{norma.titulo}</h5>
                        <p className="text-xs text-green-600 mt-1">{norma.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Precedentes</h4>
                  <div className="space-y-2">
                    {baseConocimiento.precedentes.map((precedente, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-sm text-blue-800">{precedente.caso}</h5>
                        <p className="text-xs text-blue-600 mt-1">{precedente.resultado}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Información del Proceso */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-600" />
                Información del Proceso
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Building className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Entidad:</strong> {formulario.procesoContratacion.entidad || 'No especificado'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Gavel className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Proceso:</strong> {formulario.procesoContratacion.proceso || 'No especificado'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Presupuesto:</strong> {formulario.procesoContratacion.presupuesto || 'No especificado'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Modalidad:</strong> {formulario.procesoContratacion.modalidad || 'No especificado'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Estadísticas */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                Estadísticas
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Progreso</span>
                  <span className="text-sm font-medium text-green-600">{progreso}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Evidencias</span>
                  <span className="text-sm font-medium text-blue-600">{formulario.evidencias.length}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Análisis IA</span>
                  <span className="text-sm font-medium text-purple-600">
                    {Object.values(formulario.analisisIA).filter(val => val).length}/5
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeeduriaContratacionPublica;
