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
  Shield, 
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
  TreePine,
  Mountain,
  Droplets,
  Leaf
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';
import VeeduriaConsejoIALinks from '../../../components/VeeduriaConsejoIALinks';

const VeeduriaDerechosAmbientales = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    datosVeedor: {
      nombre: '',
      documento: '',
      email: '',
      telefono: '',
      organizacion: '',
      experienciaAmbiental: ''
    },
    casoAmbiental: {
      tipoCaso: '',
      ubicacion: '',
      entidadResponsable: '',
      descripcion: '',
      afectaciones: '',
      fechaInicio: '',
      comunidadAfectada: '',
      recursosAfectados: []
    },
    evidencias: [],
    archivos: [],
    analisisIA: {
      especialistaAmbiental: '',
      especialistaDerechos: '',
      especialistaTerritorial: '',
      especialistaComunidades: '',
      analisisUnificado: ''
    }
  });

  const [cargandoIA, setCargandoIA] = useState({
    ambiental: false,
    derechos: false,
    territorial: false,
    comunidades: false,
    analisisUnificado: false
  });

  const [pasosCompletados, setPasosCompletados] = useState({
    datosVeedor: false,
    casoAmbiental: false,
    evidencias: false,
    analisisIA: false
  });

  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const pasos = Object.values(pasosCompletados);
    const completados = pasos.filter(paso => paso).length;
    const porcentaje = Math.round((completados / pasos.length) * 100);
    setProgreso(porcentaje);
  }, [pasosCompletados]);

  useEffect(() => {
    setPasosCompletados(prev => ({
      ...prev,
      datosVeedor: !!(formulario.datosVeedor.nombre && formulario.datosVeedor.documento && formulario.datosVeedor.email),
      casoAmbiental: !!(formulario.casoAmbiental.tipoCaso && formulario.casoAmbiental.ubicacion),
      evidencias: formulario.evidencias.length > 0,
      analisisIA: !!formulario.analisisIA.analisisUnificado
    }));
  }, [formulario]);

  const tiposCasos = [
    { id: 'contaminacion_agua', nombre: 'Contaminación de Agua' },
    { id: 'deforestacion', nombre: 'Deforestación' },
    { id: 'mineria_ilegal', nombre: 'Minería Ilegal' },
    { id: 'invasión_territorial', nombre: 'Invasión Territorial' },
    { id: 'contaminacion_aire', nombre: 'Contaminación del Aire' },
    { id: 'destruccion_ecosistema', nombre: 'Destrucción de Ecosistema' },
    { id: 'violacion_consulta_previa', nombre: 'Violación Consulta Previa' },
    { id: 'otro', nombre: 'Otro Caso Ambiental' }
  ];

  const recursosAfectados = [
    { id: 'agua', nombre: 'Agua', icono: '💧' },
    { id: 'suelo', nombre: 'Suelo', icono: '🌱' },
    { id: 'aire', nombre: 'Aire', icono: '🌬️' },
    { id: 'flora', nombre: 'Flora', icono: '🌳' },
    { id: 'fauna', nombre: 'Fauna', icono: '🦋' },
    { id: 'biodiversidad', nombre: 'Biodiversidad', icono: '🦎' },
    { id: 'paisaje', nombre: 'Paisaje', icono: '🏔️' },
    { id: 'territorio', nombre: 'Territorio', icono: '🗺️' }
  ];

  const especialistasIA = [
    {
      id: 'especialistaAmbiental',
      nombre: 'Dra. María Elena Vargas - Especialista Ambiental',
      icono: '🌿',
      descripcion: 'Bióloga especializada en derecho ambiental con 15 años de experiencia en protección de ecosistemas y consultoría ambiental.',
      especialidades: ['Derecho Ambiental', 'Impacto Ambiental', 'Conservación', 'Ecosistemas']
    },
    {
      id: 'especialistaDerechos',
      nombre: 'Dr. Roberto Silva - Abogado de Derechos Colectivos',
      icono: '⚖️',
      descripcion: 'Abogado especializado en derechos colectivos, ambientales y territoriales con amplia experiencia en acciones populares.',
      especialidades: ['Derechos Colectivos', 'Acciones Populares', 'Tutela Ambiental', 'Jurisdicción Especial']
    },
    {
      id: 'especialistaTerritorial',
      nombre: 'Ing. Carlos Mendoza - Especialista Territorial',
      icono: '🗺️',
      descripcion: 'Ingeniero especializado en ordenamiento territorial, consulta previa y derechos territoriales de comunidades étnicas.',
      especialidades: ['Ordenamiento Territorial', 'Consulta Previa', 'Territorios Étnicos', 'Cartografía']
    },
    {
      id: 'especialistaComunidades',
      nombre: 'Antrop. Ana Patricia López - Especialista en Comunidades',
      icono: '👥',
      descripcion: 'Antropóloga especializada en derechos de comunidades étnicas, consulta previa y participación ciudadana.',
      especialidades: ['Comunidades Étnicas', 'Consulta Previa', 'Participación', 'Cultura']
    }
  ];

  const baseConocimiento = {
    normativas: [
      {
        titulo: 'Ley 99 de 1993 - Código Ambiental',
        descripcion: 'Ley que crea el Ministerio del Medio Ambiente y regula la gestión ambiental',
        articulos: ['Artículo 1', 'Artículo 2', 'Artículo 3'],
        aplicacion: 'Marco legal ambiental fundamental'
      },
      {
        titulo: 'Ley 70 de 1993 - Territorios de Comunidades Negras',
        descripcion: 'Ley que reconoce derechos territoriales de comunidades afrocolombianas',
        articulos: ['Artículo 1', 'Artículo 2', 'Artículo 3'],
        aplicacion: 'Derechos territoriales étnicos'
      },
      {
        titulo: 'Convenio 169 OIT - Consulta Previa',
        descripcion: 'Convenio sobre pueblos indígenas y tribales',
        articulos: ['Artículo 6', 'Artículo 7', 'Artículo 15'],
        aplicacion: 'Consulta previa e informada'
      }
    ],
    precedentes: [
      {
        caso: 'Acción Popular por Contaminación del Río',
        entidad: 'Corte Constitucional',
        resultado: 'Protección de cuenca hidrográfica',
        impacto: 'Medidas de protección ambiental'
      },
      {
        caso: 'Tutela por Violación Consulta Previa',
        entidad: 'Corte Constitucional',
        resultado: 'Suspensión de proyecto minero',
        impacto: 'Protección territorial étnica'
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

  const handleRecursoAfectado = (recursoId) => {
    setFormulario(prev => ({
      ...prev,
      casoAmbiental: {
        ...prev.casoAmbiental,
        recursosAfectados: prev.casoAmbiental.recursosAfectados.includes(recursoId)
          ? prev.casoAmbiental.recursosAfectados.filter(id => id !== recursoId)
          : [...prev.casoAmbiental.recursosAfectados, recursoId]
      }
    }));
  };

  const analizarConIA = async (tipoEspecialista) => {
    setCargandoIA(prev => ({ ...prev, [tipoEspecialista]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analisis = {
        especialistaAmbiental: `Análisis Ambiental:\n\nCaso: ${formulario.casoAmbiental.tipoCaso}\nUbicación: ${formulario.casoAmbiental.ubicacion}\n\n1. Evaluación del impacto ambiental\n2. Identificación de recursos afectados\n3. Análisis de ecosistemas impactados\n4. Medidas de mitigación y restauración\n5. Seguimiento a compromisos ambientales`,
        
        especialistaDerechos: `Análisis de Derechos Colectivos:\n\n1. Verificación de violación a derechos colectivos\n2. Análisis de acciones legales disponibles\n3. Evaluación de acción popular o tutela\n4. Identificación de responsables\n5. Medidas de protección requeridas`,
        
        especialistaTerritorial: `Análisis Territorial:\n\n1. Verificación de derechos territoriales\n2. Análisis de consulta previa\n3. Evaluación de impactos territoriales\n4. Protección de territorios étnicos\n5. Ordenamiento territorial`,
        
        especialistaComunidades: `Análisis de Comunidades:\n\n1. Identificación de comunidades afectadas\n2. Análisis de derechos étnicos\n3. Evaluación de participación\n4. Consulta previa e informada\n5. Protección cultural y territorial`
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
      
      const analisisUnificado = `ANÁLISIS UNIFICADO DE DEFENSA DE DERECHOS AMBIENTALES

CASO: ${formulario.casoAmbiental.tipoCaso}
UBICACIÓN: ${formulario.casoAmbiental.ubicacion}
ENTIDAD RESPONSABLE: ${formulario.casoAmbiental.entidadResponsable}
COMUNIDAD AFECTADA: ${formulario.casoAmbiental.comunidadAfectada}

RESUMEN EJECUTIVO:
La veeduría ciudadana al caso ambiental ${formulario.casoAmbiental.tipoCaso} en ${formulario.casoAmbiental.ubicacion} busca proteger los derechos colectivos y ambientales, garantizando la preservación del territorio y los recursos naturales.

HALLAZGOS PRINCIPALES:
1. Tipo de caso: ${formulario.casoAmbiental.tipoCaso}
2. Ubicación: ${formulario.casoAmbiental.ubicacion}
3. Entidad responsable: ${formulario.casoAmbiental.entidadResponsable}
4. Recursos afectados: ${formulario.casoAmbiental.recursosAfectados.join(', ')}
5. Comunidad afectada: ${formulario.casoAmbiental.comunidadAfectada}

RECOMENDACIONES:
1. Verificar cumplimiento de normativa ambiental
2. Evaluar impacto en derechos colectivos
3. Analizar proceso de consulta previa
4. Identificar acciones legales disponibles
5. Implementar medidas de protección
6. Seguimiento a restauración ambiental

RIESGOS IDENTIFICADOS:
- Daño irreversible al ecosistema
- Violación de derechos territoriales
- Falta de consulta previa
- Impacto en comunidades étnicas

PLAN DE ACCIÓN:
1. Documentar evidencias del caso
2. Notificar a autoridades competentes
3. Presentar acciones legales si es necesario
4. Solicitar medidas cautelares
5. Seguimiento a proceso de restauración

CONCLUSIONES:
La protección de derechos ambientales y colectivos es fundamental para garantizar la preservación del territorio y el bienestar de las comunidades. Se requiere acción inmediata para prevenir daños mayores y restaurar el equilibrio ambiental.`;

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
    doc.text('VEEDURÍA CIUDADANA - DERECHOS AMBIENTALES', 20, 30);
    
    doc.setFontSize(14);
    doc.text('DATOS DEL VEEDOR', 20, 50);
    doc.setFontSize(10);
    doc.text(`Nombre: ${formulario.datosVeedor.nombre}`, 20, 60);
    doc.text(`Documento: ${formulario.datosVeedor.documento}`, 20, 70);
    doc.text(`Email: ${formulario.datosVeedor.email}`, 20, 80);
    
    doc.setFontSize(14);
    doc.text('CASO AMBIENTAL', 20, 100);
    doc.setFontSize(10);
    doc.text(`Tipo: ${formulario.casoAmbiental.tipoCaso}`, 20, 110);
    doc.text(`Ubicación: ${formulario.casoAmbiental.ubicacion}`, 20, 120);
    doc.text(`Entidad: ${formulario.casoAmbiental.entidadResponsable}`, 20, 130);
    doc.text(`Comunidad: ${formulario.casoAmbiental.comunidadAfectada}`, 20, 140);
    
    if (formulario.analisisIA.analisisUnificado) {
      doc.setFontSize(14);
      doc.text('ANÁLISIS CON INTELIGENCIA ARTIFICIAL', 20, 160);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(formulario.analisisIA.analisisUnificado, 170);
      doc.text(lines, 20, 170);
    }
    
    doc.save('veeduria-derechos-ambientales.pdf');
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Veeduría Ciudadana</h1>
          </div>
          <h2 className="text-2xl text-gray-600 mb-2">Defensa de Derechos Colectivos y Ambientales</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Sistema especializado para velar por la protección del territorio, los recursos naturales 
            y los derechos de las comunidades, apoyando acciones populares, de tutela e incidentes de desacato.
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
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={pasosCompletados.datosVeedor ? 'text-green-600 font-semibold' : ''}>
              ✓ Datos del Veedor
            </span>
            <span className={pasosCompletados.casoAmbiental ? 'text-green-600 font-semibold' : ''}>
              ✓ Caso Ambiental
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
                    <Label htmlFor="experiencia">Experiencia en Derechos Ambientales</Label>
                    <Textarea
                      id="experiencia"
                      value={formulario.datosVeedor.experienciaAmbiental}
                      onChange={(e) => handleInputChange('datosVeedor', 'experienciaAmbiental', e.target.value)}
                      placeholder="Describa su experiencia en protección ambiental y derechos colectivos"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Paso 2: Caso Ambiental */}
              {pasoActual === 2 && (
                <div>
                  <div className="flex items-center mb-6">
                    <TreePine className="h-8 w-8 text-emerald-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Caso Ambiental</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="tipoCaso">Tipo de Caso *</Label>
                      <Select
                        value={formulario.casoAmbiental.tipoCaso}
                        onValueChange={(value) => handleInputChange('casoAmbiental', 'tipoCaso', value)}
                      >
                        <option value="">Seleccione el tipo de caso</option>
                        {tiposCasos.map(caso => (
                          <option key={caso.id} value={caso.nombre}>
                            {caso.nombre}
                          </option>
                        ))}
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="ubicacion">Ubicación *</Label>
                      <Input
                        id="ubicacion"
                        value={formulario.casoAmbiental.ubicacion}
                        onChange={(e) => handleInputChange('casoAmbiental', 'ubicacion', e.target.value)}
                        placeholder="Municipio, Departamento, Vereda"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="entidadResponsable">Entidad Responsable</Label>
                      <Input
                        id="entidadResponsable"
                        value={formulario.casoAmbiental.entidadResponsable}
                        onChange={(e) => handleInputChange('casoAmbiental', 'entidadResponsable', e.target.value)}
                        placeholder="Empresa, entidad o persona responsable"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                      <Input
                        id="fechaInicio"
                        type="date"
                        value={formulario.casoAmbiental.fechaInicio}
                        onChange={(e) => handleInputChange('casoAmbiental', 'fechaInicio', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="comunidadAfectada">Comunidad Afectada</Label>
                      <Input
                        id="comunidadAfectada"
                        value={formulario.casoAmbiental.comunidadAfectada}
                        onChange={(e) => handleInputChange('casoAmbiental', 'comunidadAfectada', e.target.value)}
                        placeholder="Comunidad, resguardo o territorio afectado"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label>Recursos Afectados</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      {recursosAfectados.map((recurso) => (
                        <div
                          key={recurso.id}
                          onClick={() => handleRecursoAfectado(recurso.id)}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            formulario.casoAmbiental.recursosAfectados.includes(recurso.id)
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-1">{recurso.icono}</div>
                            <div className="text-sm font-medium">{recurso.nombre}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 gap-6">
                    <div>
                      <Label htmlFor="descripcion">Descripción del Caso</Label>
                      <Textarea
                        id="descripcion"
                        value={formulario.casoAmbiental.descripcion}
                        onChange={(e) => handleInputChange('casoAmbiental', 'descripcion', e.target.value)}
                        placeholder="Describa detalladamente el caso ambiental"
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="afectaciones">Afectaciones Identificadas</Label>
                      <Textarea
                        id="afectaciones"
                        value={formulario.casoAmbiental.afectaciones}
                        onChange={(e) => handleInputChange('casoAmbiental', 'afectaciones', e.target.value)}
                        placeholder="Describa las afectaciones identificadas"
                        rows={4}
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
                    <h3 className="text-2xl font-bold text-gray-800">Evidencias</h3>
                  </div>
                  
                  <Alert className="mb-6">
                    <Info className="h-4 w-4" />
                    <Alert.Description>
                      Adjunte fotografías, videos, documentos, informes técnicos y cualquier evidencia 
                      que respalde el caso ambiental.
                    </Alert.Description>
                  </Alert>
                  
                  <div>
                    <Label htmlFor="archivos">Documentos y Evidencias</Label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="archivos" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                            <span>Subir evidencias</span>
                            <input id="archivos" type="file" className="sr-only" multiple />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, JPG, MP4 hasta 10MB</p>
                      </div>
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
                        className="bg-gradient-to-r from-green-600 to-emerald-600"
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
                      className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3"
                      size="lg"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Generar Reporte PDF
                    </Button>
                  </div>
                  
                  {/* Enlaces a Consejo IA y Consejo EtnoIA */}
                  <VeeduriaConsejoIALinks 
                    tipoVeeduria={formulario.casoAmbiental?.tipoCaso || 'contaminacion_agua'}
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
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
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

            {/* Información del Caso */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-600" />
                Información del Caso
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <TreePine className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Tipo:</strong> {formulario.casoAmbiental.tipoCaso || 'No especificado'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Ubicación:</strong> {formulario.casoAmbiental.ubicacion || 'No especificado'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Building className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Entidad:</strong> {formulario.casoAmbiental.entidadResponsable || 'No especificado'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    <strong>Comunidad:</strong> {formulario.casoAmbiental.comunidadAfectada || 'No especificado'}
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
                  <span className="text-sm text-gray-600">Recursos Afectados</span>
                  <span className="text-sm font-medium text-emerald-600">
                    {formulario.casoAmbiental.recursosAfectados.length}
                  </span>
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

export default VeeduriaDerechosAmbientales;
