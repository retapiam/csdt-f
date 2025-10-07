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
  Eye, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Brain, 
  Clock,
  Target,
  Search,
  TrendingUp,
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
  ArrowLeft
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';
import VeeduriaConsejoIALinks from '../../../components/VeeduriaConsejoIALinks';

const VeeduriaGestionPublica = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    // Paso 1: Datos del Veedor
    datosVeedor: {
      nombre: '',
      documento: '',
      email: '',
      telefono: '',
      organizacion: '',
      cargo: '',
      experiencia: ''
    },
    // Paso 2: Objeto de Vigilancia
    objetoVigilancia: {
      entidad: '',
      proyecto: '',
      presupuesto: '',
      cronograma: '',
      responsable: '',
      ubicacion: '',
      descripcion: '',
      objetivos: '',
      beneficiarios: ''
    },
    // Paso 3: Evidencias
    evidencias: [],
    archivos: [],
    fotos: [],
    documentos: [],
    // Paso 4: Análisis IA
    analisisIA: {
      especialistaGestion: '',
      especialistaPresupuesto: '',
      especialistaCronograma: '',
      especialistaTransparencia: '',
      analisisUnificado: ''
    }
  });

  const [cargandoIA, setCargandoIA] = useState({
    gestion: false,
    presupuesto: false,
    cronograma: false,
    transparencia: false,
    analisisUnificado: false
  });

  const [pasosCompletados, setPasosCompletados] = useState({
    datosVeedor: false,
    objetoVigilancia: false,
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
      objetoVigilancia: !!(formulario.objetoVigilancia.entidad && formulario.objetoVigilancia.proyecto),
      evidencias: formulario.evidencias.length > 0,
      analisisIA: !!formulario.analisisIA.analisisUnificado
    }));
  }, [formulario]);

  const entidadesPublicas = [
    { id: 'alcaldia', nombre: 'Alcaldía Municipal' },
    { id: 'gobernacion', nombre: 'Gobernación Departamental' },
    { id: 'ministerio', nombre: 'Ministerio' },
    { id: 'instituto', nombre: 'Instituto Nacional' },
    { id: 'superintendencia', nombre: 'Superintendencia' },
    { id: 'unidad', nombre: 'Unidad Administrativa' },
    { id: 'corporacion', nombre: 'Corporación Autónoma' },
    { id: 'otro', nombre: 'Otra Entidad' }
  ];

  const tiposProyecto = [
    { id: 'infraestructura', nombre: 'Infraestructura' },
    { id: 'social', nombre: 'Social' },
    { id: 'educacion', nombre: 'Educación' },
    { id: 'salud', nombre: 'Salud' },
    { id: 'vivienda', nombre: 'Vivienda' },
    { id: 'agua', nombre: 'Agua y Saneamiento' },
    { id: 'transporte', nombre: 'Transporte' },
    { id: 'medioambiente', nombre: 'Medio Ambiente' },
    { id: 'desarrollo', nombre: 'Desarrollo Económico' },
    { id: 'seguridad', nombre: 'Seguridad Ciudadana' }
  ];

  const especialistasIA = [
    {
      id: 'especialistaGestion',
      nombre: 'Dr. María González - Especialista en Gestión Pública',
      icono: '🏛️',
      descripcion: 'Experta en administración pública, políticas públicas y gestión de proyectos gubernamentales con 15 años de experiencia.',
      especialidades: ['Gestión Pública', 'Políticas Públicas', 'Administración Gubernamental', 'Evaluación de Proyectos']
    },
    {
      id: 'especialistaPresupuesto',
      nombre: 'Dr. Carlos Rodríguez - Especialista en Presupuestos Públicos',
      icono: '💰',
      descripcion: 'Experto en presupuestos públicos, contabilidad gubernamental y control fiscal con amplia experiencia en entidades públicas.',
      especialidades: ['Presupuestos Públicos', 'Contabilidad Gubernamental', 'Control Fiscal', 'Análisis Financiero']
    },
    {
      id: 'especialistaCronograma',
      nombre: 'Ing. Ana Martínez - Especialista en Gestión de Proyectos',
      icono: '📅',
      descripcion: 'Ingeniera especializada en gestión de proyectos, cronogramas y seguimiento de obras públicas con certificación PMP.',
      especialidades: ['Gestión de Proyectos', 'Cronogramas', 'Seguimiento de Obras', 'Metodologías Ágiles']
    },
    {
      id: 'especialistaTransparencia',
      nombre: 'Dr. Luis Herrera - Especialista en Transparencia y Control',
      icono: '🔍',
      descripcion: 'Especialista en transparencia, acceso a información pública y control social con experiencia en entes de control.',
      especialidades: ['Transparencia', 'Acceso a Información', 'Control Social', 'Rendición de Cuentas']
    }
  ];

  const baseConocimiento = {
    normativas: [
      {
        titulo: 'Ley 1757 de 2015 - Participación Ciudadana',
        descripcion: 'Estatuto de participación ciudadana que regula los mecanismos de participación',
        articulos: ['Artículo 1', 'Artículo 2', 'Artículo 3'],
        aplicacion: 'Marco legal para veedurías ciudadanas'
      },
      {
        titulo: 'Ley 850 de 2003 - Veedurías Ciudadanas',
        descripcion: 'Ley que regula las veedurías ciudadanas como mecanismo de control social',
        articulos: ['Artículo 1', 'Artículo 2', 'Artículo 3'],
        aplicacion: 'Regulación específica de veedurías'
      },
      {
        titulo: 'Ley 1474 de 2011 - Estatuto Anticorrupción',
        descripcion: 'Estatuto que establece medidas para prevenir y combatir la corrupción',
        articulos: ['Artículo 1', 'Artículo 2', 'Artículo 3'],
        aplicacion: 'Marco para lucha contra corrupción'
      }
    ],
    precedentes: [
      {
        caso: 'Veeduría Ciudadana - Proyecto de Vivienda Social',
        entidad: 'Alcaldía de Bogotá',
        resultado: 'Identificación de irregularidades en asignación de viviendas',
        impacto: 'Mejora en transparencia del proceso'
      },
      {
        caso: 'Seguimiento a Obras de Infraestructura',
        entidad: 'Gobernación de Antioquia',
        resultado: 'Detención de obras por incumplimiento de cronogramas',
        impacto: 'Cumplimiento de cronogramas establecidos'
      }
    ],
    herramientas: [
      {
        nombre: 'Manual de Veedurías Ciudadanas',
        descripcion: 'Guía práctica para constituir y operar veedurías',
        tipo: 'Documento Guía'
      },
      {
        nombre: 'Protocolo de Seguimiento a Proyectos',
        descripcion: 'Metodología para seguimiento efectivo de proyectos',
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
      // Simulación de análisis IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analisis = {
        especialistaGestion: tipoEspecialista === 'especialistaGestion' ? 
          `Análisis de Gestión Pública:\n\nLa entidad ${formulario.objetoVigilancia.entidad} presenta un proyecto de ${formulario.objetoVigilancia.proyecto} con un presupuesto de ${formulario.objetoVigilancia.presupuesto}. Se recomienda:\n\n1. Verificar la capacidad técnica de la entidad\n2. Revisar la experiencia en proyectos similares\n3. Validar la estructura organizacional\n4. Evaluar los mecanismos de control interno` : '',
        
        especialistaPresupuesto: tipoEspecialista === 'especialistaPresupuesto' ?
          `Análisis Presupuestario:\n\nEl presupuesto asignado de ${formulario.objetoVigilancia.presupuesto} para el proyecto ${formulario.objetoVigilancia.proyecto} requiere:\n\n1. Verificación de fuentes de financiación\n2. Análisis de desglose presupuestario\n3. Validación de costos unitarios\n4. Seguimiento a ejecución presupuestal\n5. Control de modificaciones presupuestales` : '',
        
        especialistaCronograma: tipoEspecialista === 'especialistaCronograma' ?
          `Análisis de Cronograma:\n\nEl cronograma del proyecto ${formulario.objetoVigilancia.proyecto} debe incluir:\n\n1. Hitos principales del proyecto\n2. Dependencias entre actividades\n3. Recursos necesarios por fase\n4. Indicadores de avance\n5. Plan de contingencia para retrasos` : '',
        
        especialistaTransparencia: tipoEspecialista === 'especialistaTransparencia' ?
          `Análisis de Transparencia:\n\nPara garantizar transparencia en el proyecto ${formulario.objetoVigilancia.proyecto}:\n\n1. Publicación de información en portal de transparencia\n2. Rendición de cuentas periódicas\n3. Acceso a información para veedores\n4. Mecanismos de participación ciudadana\n5. Canales de comunicación con la comunidad` : ''
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
      
      const analisisUnificado = `ANÁLISIS UNIFICADO DE VIGILANCIA A GESTIÓN PÚBLICA

PROYECTO: ${formulario.objetoVigilancia.proyecto}
ENTIDAD: ${formulario.objetoVigilancia.entidad}
PRESUPUESTO: ${formulario.objetoVigilancia.presupuesto}

RESUMEN EJECUTIVO:
La veeduría ciudadana al proyecto ${formulario.objetoVigilancia.proyecto} de la entidad ${formulario.objetoVigilancia.entidad} presenta una oportunidad única para garantizar la transparencia y eficiencia en la gestión pública.

HALLAZGOS PRINCIPALES:
1. El proyecto cuenta con un presupuesto de ${formulario.objetoVigilancia.presupuesto}
2. La entidad ${formulario.objetoVigilancia.entidad} debe demostrar capacidad técnica
3. Se requiere seguimiento estricto al cronograma establecido
4. Es fundamental garantizar transparencia en todas las etapas

RECOMENDACIONES:
1. Establecer mecanismos de seguimiento permanente
2. Solicitar informes periódicos de avance
3. Verificar cumplimiento de cronogramas
4. Promover participación ciudadana activa
5. Exigir rendición de cuentas transparente

RIESGOS IDENTIFICADOS:
- Retrasos en la ejecución del proyecto
- Desviación de recursos presupuestales
- Falta de transparencia en la información
- Incumplimiento de objetivos planteados

PLAN DE ACCIÓN:
1. Constituir comité de veeduría
2. Establecer cronograma de seguimiento
3. Definir indicadores de control
4. Implementar mecanismos de comunicación
5. Programar audiencias públicas

CONCLUSIONES:
La veeduría ciudadana es fundamental para garantizar la transparencia y eficiencia en la ejecución del proyecto ${formulario.objetoVigilancia.proyecto}. Se recomienda mantener un seguimiento permanente y promover la participación ciudadana activa.`;

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
    
    // Título
    doc.setFontSize(20);
    doc.text('VEEDURÍA CIUDADANA - GESTIÓN PÚBLICA', 20, 30);
    
    // Información del veedor
    doc.setFontSize(14);
    doc.text('DATOS DEL VEEDOR', 20, 50);
    doc.setFontSize(10);
    doc.text(`Nombre: ${formulario.datosVeedor.nombre}`, 20, 60);
    doc.text(`Documento: ${formulario.datosVeedor.documento}`, 20, 70);
    doc.text(`Email: ${formulario.datosVeedor.email}`, 20, 80);
    doc.text(`Organización: ${formulario.datosVeedor.organizacion}`, 20, 90);
    
    // Información del proyecto
    doc.setFontSize(14);
    doc.text('OBJETO DE VIGILANCIA', 20, 110);
    doc.setFontSize(10);
    doc.text(`Entidad: ${formulario.objetoVigilancia.entidad}`, 20, 120);
    doc.text(`Proyecto: ${formulario.objetoVigilancia.proyecto}`, 20, 130);
    doc.text(`Presupuesto: ${formulario.objetoVigilancia.presupuesto}`, 20, 140);
    doc.text(`Ubicación: ${formulario.objetoVigilancia.ubicacion}`, 20, 150);
    
    // Análisis IA
    if (formulario.analisisIA.analisisUnificado) {
      doc.setFontSize(14);
      doc.text('ANÁLISIS CON INTELIGENCIA ARTIFICIAL', 20, 170);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(formulario.analisisIA.analisisUnificado, 170);
      doc.text(lines, 20, 180);
    }
    
    // Guardar PDF
    doc.save('veeduria-gestion-publica.pdf');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Eye className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Veeduría Ciudadana</h1>
          </div>
          <h2 className="text-2xl text-gray-600 mb-2">Vigilancia de la Gestión Pública</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Sistema especializado para supervisar la correcta ejecución de proyectos, planes y programas públicos, 
            verificar el cumplimiento de normas, cronogramas y presupuestos.
          </p>
        </div>

        {/* Barra de Progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso de la Veeduría</span>
            <span className="text-sm font-medium text-blue-600">{progreso}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={pasosCompletados.datosVeedor ? 'text-green-600 font-semibold' : ''}>
              ✓ Datos del Veedor
            </span>
            <span className={pasosCompletados.objetoVigilancia ? 'text-green-600 font-semibold' : ''}>
              ✓ Objeto de Vigilancia
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
                    <Users className="h-8 w-8 text-blue-600 mr-3" />
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
                    
                    <div>
                      <Label htmlFor="cargo">Cargo</Label>
                      <Input
                        id="cargo"
                        value={formulario.datosVeedor.cargo}
                        onChange={(e) => handleInputChange('datosVeedor', 'cargo', e.target.value)}
                        placeholder="Cargo en la organización"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label htmlFor="experiencia">Experiencia en Veedurías</Label>
                    <Textarea
                      id="experiencia"
                      value={formulario.datosVeedor.experiencia}
                      onChange={(e) => handleInputChange('datosVeedor', 'experiencia', e.target.value)}
                      placeholder="Describa su experiencia previa en veedurías ciudadanas o control social"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Paso 2: Objeto de Vigilancia */}
              {pasoActual === 2 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Target className="h-8 w-8 text-green-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Objeto de Vigilancia</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="entidad">Entidad Pública *</Label>
                      <Select
                        value={formulario.objetoVigilancia.entidad}
                        onValueChange={(value) => handleInputChange('objetoVigilancia', 'entidad', value)}
                      >
                        <option value="">Seleccione la entidad</option>
                        {entidadesPublicas.map(entidad => (
                          <option key={entidad.id} value={entidad.nombre}>
                            {entidad.nombre}
                          </option>
                        ))}
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="proyecto">Nombre del Proyecto *</Label>
                      <Input
                        id="proyecto"
                        value={formulario.objetoVigilancia.proyecto}
                        onChange={(e) => handleInputChange('objetoVigilancia', 'proyecto', e.target.value)}
                        placeholder="Nombre del proyecto a vigilar"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="presupuesto">Presupuesto</Label>
                      <Input
                        id="presupuesto"
                        value={formulario.objetoVigilancia.presupuesto}
                        onChange={(e) => handleInputChange('objetoVigilancia', 'presupuesto', e.target.value)}
                        placeholder="Valor del presupuesto"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cronograma">Cronograma</Label>
                      <Input
                        id="cronograma"
                        value={formulario.objetoVigilancia.cronograma}
                        onChange={(e) => handleInputChange('objetoVigilancia', 'cronograma', e.target.value)}
                        placeholder="Fechas de inicio y fin"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="responsable">Responsable del Proyecto</Label>
                      <Input
                        id="responsable"
                        value={formulario.objetoVigilancia.responsable}
                        onChange={(e) => handleInputChange('objetoVigilancia', 'responsable', e.target.value)}
                        placeholder="Nombre del responsable"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ubicacion">Ubicación</Label>
                      <Input
                        id="ubicacion"
                        value={formulario.objetoVigilancia.ubicacion}
                        onChange={(e) => handleInputChange('objetoVigilancia', 'ubicacion', e.target.value)}
                        placeholder="Ubicación del proyecto"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 gap-6">
                    <div>
                      <Label htmlFor="descripcion">Descripción del Proyecto</Label>
                      <Textarea
                        id="descripcion"
                        value={formulario.objetoVigilancia.descripcion}
                        onChange={(e) => handleInputChange('objetoVigilancia', 'descripcion', e.target.value)}
                        placeholder="Describa detalladamente el proyecto a vigilar"
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="objetivos">Objetivos del Proyecto</Label>
                      <Textarea
                        id="objetivos"
                        value={formulario.objetoVigilancia.objetivos}
                        onChange={(e) => handleInputChange('objetoVigilancia', 'objetivos', e.target.value)}
                        placeholder="Objetivos específicos del proyecto"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="beneficiarios">Beneficiarios</Label>
                      <Textarea
                        id="beneficiarios"
                        value={formulario.objetoVigilancia.beneficiarios}
                        onChange={(e) => handleInputChange('objetoVigilancia', 'beneficiarios', e.target.value)}
                        placeholder="Población beneficiaria del proyecto"
                        rows={3}
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
                    <h3 className="text-2xl font-bold text-gray-800">Evidencias y Documentos</h3>
                  </div>
                  
                  <Alert className="mb-6">
                    <Info className="h-4 w-4" />
                    <Alert.Description>
                      Adjunte documentos, fotografías y evidencias que respalden la veeduría. 
                      Esto incluye contratos, cronogramas, informes de avance, fotografías de obra, etc.
                    </Alert.Description>
                  </Alert>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="archivos">Documentos</Label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="archivos" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Subir archivos</span>
                              <input id="archivos" type="file" className="sr-only" multiple />
                            </label>
                            <p className="pl-1">o arrastrar y soltar</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, XLS hasta 10MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="fotos">Fotografías</Label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="fotos" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Subir fotos</span>
                              <input id="fotos" type="file" accept="image/*" className="sr-only" multiple />
                            </label>
                            <p className="pl-1">o arrastrar y soltar</p>
                          </div>
                          <p className="text-xs text-gray-500">JPG, PNG hasta 5MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="evidencias">Descripción de Evidencias</Label>
                      <Textarea
                        id="evidencias"
                        value={formulario.evidencias}
                        onChange={(e) => setFormulario(prev => ({ ...prev, evidencias: e.target.value }))}
                        placeholder="Describa las evidencias recopiladas y su relevancia para la veeduría"
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
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
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
                    tipoVeeduria={formulario.objetoVigilancia?.tipoObjeto || 'proyecto'}
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
                  className="bg-gradient-to-r from-blue-600 to-green-600"
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
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Base de Conocimiento
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Normativas</h4>
                  <div className="space-y-2">
                    {baseConocimiento.normativas.map((norma, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-sm text-blue-800">{norma.titulo}</h5>
                        <p className="text-xs text-blue-600 mt-1">{norma.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Precedentes</h4>
                  <div className="space-y-2">
                    {baseConocimiento.precedentes.map((precedente, index) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg">
                        <h5 className="font-medium text-sm text-green-800">{precedente.caso}</h5>
                        <p className="text-xs text-green-600 mt-1">{precedente.resultado}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Herramientas</h4>
                  <div className="space-y-2">
                    {baseConocimiento.herramientas.map((herramienta, index) => (
                      <div key={index} className="p-3 bg-purple-50 rounded-lg">
                        <h5 className="font-medium text-sm text-purple-800">{herramienta.nombre}</h5>
                        <p className="text-xs text-purple-600 mt-1">{herramienta.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Información del Proyecto */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-green-600" />
                Información del Proyecto
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Building className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Entidad:</strong> {formulario.objetoVigilancia.entidad || 'No especificado'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Proyecto:</strong> {formulario.objetoVigilancia.proyecto || 'No especificado'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Presupuesto:</strong> {formulario.objetoVigilancia.presupuesto || 'No especificado'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Ubicación:</strong> {formulario.objetoVigilancia.ubicacion || 'No especificado'}
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
                  <span className="text-sm font-medium text-blue-600">{progreso}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Evidencias</span>
                  <span className="text-sm font-medium text-green-600">{formulario.evidencias.length}</span>
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

export default VeeduriaGestionPublica;
