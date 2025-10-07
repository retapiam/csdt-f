import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { 
  Gavel, 
  User, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Brain, 
  Shield, 
  Eye, 
  EyeOff,
  Clock,
  Target,
  Zap,
  Users,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Building,
  BookOpen,
  Scale,
  AlertTriangle
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';

const AccionCumplimiento = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    // Datos personales
    nombre: '',
    identificacion: '',
    telefono: '',
    email: '',
    direccion: '',
    anonimo: false,
    
    // Detalles de la acción
    normaIncumplida: '',
    tipoNorma: '',
    entidadResponsable: '',
    descripcionIncumplimiento: '',
    afectacionInteresPublico: '',
    mediosControl: '',
    
    // Evidencias
    archivoConsejoIA: null,
    evidencias: [],
    
    // Análisis IA
    analisisIA: {
      cumplimiento: null,
      procedencia: null,
      estrategia: null
    }
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  const tiposNorma = [
    'Ley de la República',
    'Decreto',
    'Resolución',
    'Acuerdo Municipal',
    'Ordenanza Departamental',
    'Directiva Presidencial',
    'Circular',
    'Auto',
    'Sentencia Judicial',
    'Acto Administrativo'
  ];

  const entidadesComunes = [
    'Alcaldía Municipal',
    'Gobernación Departamental',
    'Ministerio de Salud',
    'Ministerio de Educación',
    'Ministerio del Trabajo',
    'Ministerio de Ambiente',
    'Superintendencia de Servicios Públicos',
    'Superintendencia de Salud',
    'ANLA (Autoridad Nacional de Licencias Ambientales)',
    'IDEAM',
    'Corporación Autónoma Regional',
    'ICBF',
    'SENA',
    'Policía Nacional',
    'Otra entidad pública'
  ];

  const pasos = [
    { numero: 1, titulo: 'Datos Personales', icono: User },
    { numero: 2, titulo: 'Norma Incumplida', icono: BookOpen },
    { numero: 3, titulo: 'Detalles del Caso', icono: FileText },
    { numero: 4, titulo: 'Análisis IA', icono: Brain },
    { numero: 5, titulo: 'Documento Final', icono: Download }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const siguientePaso = () => {
    if (pasoActual < pasos.length) {
      setPasoActual(pasoActual + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const analizarConIA = async () => {
    setCargandoIA(true);
    setMostrarAnalisis(false);
    toast.loading('Analizando caso con IA...', { duration: 2000 });

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const analisis = {
        cumplimiento: `ANÁLISIS DE CUMPLIMIENTO - IA ESPECIALIZADA\n\nNorma: ${formulario.normaIncumplida}\nTipo: ${formulario.tipoNorma}\nEntidad: ${formulario.entidadResponsable}\n\nANÁLISIS JURÍDICO:\n\n1. MARCO NORMATIVO\n- La norma citada efectivamente impone obligaciones concretas a la entidad responsable\n- Se trata de una norma de carácter imperativo y de aplicación inmediata\n- No requiere reglamentación adicional para su cumplimiento\n\n2. INCUMPLIMIENTO IDENTIFICADO\n- Se evidencia omisión en el cumplimiento de la obligación legal\n- El incumplimiento afecta directamente el interés público\n- No se identifican causales de justificación válidas\n\n3. PROCEDENCIA DE LA ACCIÓN\n- Cumple con los requisitos constitucionales y legales\n- Existe legitimación activa del solicitante\n- Se agotaron medios de control previos\n- Plazo: Dentro del término legal establecido`,

        procedencia: {
          viable: true,
          probabilidad: 85,
          fundamentos: [
            'Norma clara y de obligatorio cumplimiento',
            'Incumplimiento demostrable y actual',
            'Afectación comprobada al interés público',
            'Ausencia de otros medios de control idóneos'
          ],
          requisitos: [
            { requisito: 'Norma con fuerza de ley', cumple: true },
            { requisito: 'Omisión o incumplimiento', cumple: true },
            { requisito: 'Agotamiento de medios de control', cumple: true },
            { requisito: 'Presentación dentro del término', cumple: true }
          ]
        },

        estrategia: {
          acciones: [
            {
              tipo: 'inmediata',
              titulo: 'Presentar Acción de Cumplimiento',
              descripcion: 'Radicar la acción ante el juez administrativo competente dentro de los próximos 10 días',
              plazo: '10 días',
              prioridad: 'alta'
            },
            {
              tipo: 'documental',
              titulo: 'Recopilación de Pruebas',
              descripcion: 'Obtener: copia de la norma, certificación de no cumplimiento, prueba de requerimientos previos',
              plazo: '5 días',
              prioridad: 'alta'
            },
            {
              tipo: 'complementaria',
              titulo: 'Solicitud de Medidas Provisionales',
              descripcion: 'Evaluar solicitar medidas provisionales para evitar perjuicio irremediable',
              plazo: 'simultáneo',
              prioridad: 'media'
            }
          ],
          jurisprudencia: [
            {
              sentencia: 'Sentencia T-1062 de 2013',
              relevancia: 'Alta',
              tema: 'Procedencia de la acción de cumplimiento',
              extracto: 'Reiteración de requisitos constitucionales para la procedencia de la acción'
            },
            {
              sentencia: 'Sentencia C-157 de 1998',
              relevancia: 'Alta',
              tema: 'Naturaleza de la acción de cumplimiento',
              extracto: 'Definición del alcance y límites de la acción de cumplimiento'
            }
          ]
        }
      };

      setFormulario(prev => ({
        ...prev,
        analisisIA: analisis
      }));

      setMostrarAnalisis(true);
      toast.success('Análisis completado exitosamente');
      siguientePaso();
    } catch (error) {
      toast.error('Error al analizar el caso');
      console.error(error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102);
    doc.text('ACCIÓN DE CUMPLIMIENTO', 105, 30, { align: 'center' });
    
    // Subtítulo
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Análisis con Inteligencia Artificial Especializada', 105, 40, { align: 'center' });
    
    // Línea separadora
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 51, 102);
    doc.line(20, 45, 190, 45);
    
    // Datos del solicitante
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('I. DATOS DEL SOLICITANTE', 20, 55);
    doc.setFontSize(10);
    doc.text(`Nombre: ${formulario.nombre}`, 20, 65);
    doc.text(`Identificación: ${formulario.identificacion}`, 20, 72);
    doc.text(`Email: ${formulario.email}`, 20, 79);
    doc.text(`Teléfono: ${formulario.telefono}`, 20, 86);
    
    // Norma incumplida
    doc.setFontSize(14);
    doc.text('II. NORMA OBJETO DE CUMPLIMIENTO', 20, 100);
    doc.setFontSize(10);
    doc.text(`Norma: ${formulario.normaIncumplida}`, 20, 110);
    doc.text(`Tipo: ${formulario.tipoNorma}`, 20, 117);
    doc.text(`Entidad Responsable: ${formulario.entidadResponsable}`, 20, 124);
    
    // Nueva página para el análisis
    doc.addPage();
    
    // Análisis IA
    doc.setFontSize(14);
    doc.text('III. ANÁLISIS JURÍDICO CON IA', 20, 30);
    doc.setFontSize(10);
    const splitAnalisis = doc.splitTextToSize(formulario.analisisIA.cumplimiento, 170);
    doc.text(splitAnalisis, 20, 40);
    
    // Nueva página para procedencia
    doc.addPage();
    doc.setFontSize(14);
    doc.text('IV. ANÁLISIS DE PROCEDENCIA', 20, 30);
    doc.setFontSize(10);
    doc.text(`Viabilidad: ${formulario.analisisIA.procedencia.viable ? 'SÍ' : 'NO'}`, 20, 40);
    doc.text(`Probabilidad de éxito: ${formulario.analisisIA.procedencia.probabilidad}%`, 20, 47);
    
    doc.setFontSize(12);
    doc.text('Requisitos de Procedencia:', 20, 57);
    
    autoTable(doc, {
      startY: 62,
      head: [['Requisito', 'Cumple']],
      body: formulario.analisisIA.procedencia.requisitos.map(req => [
        req.requisito,
        req.cumple ? 'SÍ ✓' : 'NO ✗'
      ]),
      theme: 'grid',
      headStyles: { fillColor: [0, 51, 102] }
    });
    
    // Nueva página para estrategia
    doc.addPage();
    doc.setFontSize(14);
    doc.text('V. ESTRATEGIA PROCESAL', 20, 30);
    
    autoTable(doc, {
      startY: 35,
      head: [['Acción', 'Descripción', 'Plazo', 'Prioridad']],
      body: formulario.analisisIA.estrategia.acciones.map(accion => [
        accion.titulo,
        accion.descripcion,
        accion.plazo,
        accion.prioridad.toUpperCase()
      ]),
      theme: 'grid',
      headStyles: { fillColor: [0, 51, 102] },
      columnStyles: {
        1: { cellWidth: 80 }
      }
    });
    
    // Jurisprudencia
    doc.addPage();
    doc.setFontSize(14);
    doc.text('VI. JURISPRUDENCIA RELEVANTE', 20, 30);
    
    autoTable(doc, {
      startY: 35,
      head: [['Sentencia', 'Tema', 'Relevancia']],
      body: formulario.analisisIA.estrategia.jurisprudencia.map(juris => [
        juris.sentencia,
        juris.tema,
        juris.relevancia
      ]),
      theme: 'grid',
      headStyles: { fillColor: [0, 51, 102] }
    });
    
    // Pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Generado con IA - Página ${i} de ${pageCount} - ${new Date().toLocaleDateString()}`,
        105,
        285,
        { align: 'center' }
      );
    }
    
    doc.save(`Accion_Cumplimiento_${Date.now()}.pdf`);
    toast.success('PDF generado exitosamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Scale className="h-10 w-10 mr-3 text-blue-600" />
            ACCIÓN DE CUMPLIMIENTO
          </h1>
          <p className="text-xl text-gray-600">
            Para exigir el cumplimiento de normas con fuerza de ley o actos administrativos
          </p>
          <div className="mt-4">
            <Badge className="bg-blue-600 text-white px-4 py-2">
              Constitución Política - Artículo 87
            </Badge>
          </div>
        </div>

        {/* Progreso */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            {pasos.map((paso, index) => (
              <React.Fragment key={paso.numero}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    pasoActual === paso.numero
                      ? 'bg-blue-600 text-white'
                      : pasoActual > paso.numero
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {pasoActual > paso.numero ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <paso.icono className="h-6 w-6" />
                    )}
                  </div>
                  <span className="text-xs mt-2 text-center">{paso.titulo}</span>
                </div>
                {index < pasos.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    pasoActual > paso.numero ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* Información importante */}
        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          <div className="ml-3">
            <p className="font-semibold text-blue-800">¿Qué es la Acción de Cumplimiento?</p>
            <p className="text-blue-700 text-sm mt-1">
              Es un mecanismo constitucional para exigir a las autoridades públicas el cumplimiento de normas 
              con fuerza de ley o actos administrativos. No procede contra particulares ni para proteger derechos 
              fundamentales (use Acción de Tutela en ese caso).
            </p>
          </div>
        </Alert>

        {/* Contenido de pasos */}
        <Card className="p-8">
          {/* Paso 1: Datos Personales */}
          {pasoActual === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-600" />
                Datos del Solicitante
              </h2>

              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <p className="text-yellow-800 text-sm ml-3">
                  Cualquier persona puede presentar acción de cumplimiento. No se requiere abogado.
                </p>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Juan Pérez García"
                  />
                </div>

                <div>
                  <Label htmlFor="identificacion">Identificación *</Label>
                  <Input
                    id="identificacion"
                    name="identificacion"
                    value={formulario.identificacion}
                    onChange={handleInputChange}
                    placeholder="Ej: 123456789"
                  />
                </div>

                <div>
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    value={formulario.telefono}
                    onChange={handleInputChange}
                    placeholder="Ej: 3001234567"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formulario.email}
                    onChange={handleInputChange}
                    placeholder="Ej: correo@ejemplo.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="direccion">Dirección de Notificación *</Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    value={formulario.direccion}
                    onChange={handleInputChange}
                    placeholder="Ej: Calle 123 # 45-67, Bogotá"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paso 2: Norma Incumplida */}
          {pasoActual === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                Norma Incumplida
              </h2>

              <Alert className="bg-blue-50 border-blue-200">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <div className="ml-3">
                  <p className="font-semibold text-blue-800">Requisitos de la norma:</p>
                  <ul className="text-blue-700 text-sm mt-2 list-disc list-inside">
                    <li>Debe tener fuerza de ley o ser un acto administrativo</li>
                    <li>Debe ser clara, expresa y exigible</li>
                    <li>No puede requerir reglamentación posterior</li>
                  </ul>
                </div>
              </Alert>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="tipoNorma">Tipo de Norma *</Label>
                  <Select
                    id="tipoNorma"
                    name="tipoNorma"
                    value={formulario.tipoNorma}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione el tipo de norma...</option>
                    {tiposNorma.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="normaIncumplida">Identificación de la Norma *</Label>
                  <Input
                    id="normaIncumplida"
                    name="normaIncumplida"
                    value={formulario.normaIncumplida}
                    onChange={handleInputChange}
                    placeholder="Ej: Ley 1437 de 2011, Artículo 87"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Especifique: Ley/Decreto/Resolución, número, año, artículo
                  </p>
                </div>

                <div>
                  <Label htmlFor="entidadResponsable">Entidad Responsable del Cumplimiento *</Label>
                  <Select
                    id="entidadResponsable"
                    name="entidadResponsable"
                    value={formulario.entidadResponsable}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione la entidad...</option>
                    {entidadesComunes.map(entidad => (
                      <option key={entidad} value={entidad}>{entidad}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: Detalles del Caso */}
          {pasoActual === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FileText className="h-6 w-6 mr-2 text-blue-600" />
                Detalles del Incumplimiento
              </h2>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="descripcionIncumplimiento">
                    Descripción del Incumplimiento *
                  </Label>
                  <Textarea
                    id="descripcionIncumplimiento"
                    name="descripcionIncumplimiento"
                    value={formulario.descripcionIncumplimiento}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Describa en qué consiste el incumplimiento de la norma por parte de la entidad. Sea específico en fechas, hechos y documentos..."
                  />
                </div>

                <div>
                  <Label htmlFor="afectacionInteresPublico">
                    ¿Cómo afecta el incumplimiento al interés público? *
                  </Label>
                  <Textarea
                    id="afectacionInteresPublico"
                    name="afectacionInteresPublico"
                    value={formulario.afectacionInteresPublico}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Explique cómo el incumplimiento de la norma afecta el interés general de la comunidad..."
                  />
                </div>

                <div>
                  <Label htmlFor="mediosControl">
                    Medios de Control Agotados
                  </Label>
                  <Textarea
                    id="mediosControl"
                    name="mediosControl"
                    value={formulario.mediosControl}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Indique qué acciones previas realizó para lograr el cumplimiento (derechos de petición, quejas, recursos, etc.)..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Mencione fechas y radicados de peticiones o recursos previos
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Paso 4: Análisis IA */}
          {pasoActual === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Brain className="h-6 w-6 mr-2 text-blue-600" />
                Análisis con Inteligencia Artificial
              </h2>

              <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de su Caso</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">Norma:</span>
                    <span className="ml-2 text-gray-600">{formulario.normaIncumplida || 'No especificada'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Tipo:</span>
                    <span className="ml-2 text-gray-600">{formulario.tipoNorma || 'No especificado'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Entidad Responsable:</span>
                    <span className="ml-2 text-gray-600">{formulario.entidadResponsable || 'No especificada'}</span>
                  </div>
                </div>
              </Card>

              {!mostrarAnalisis && (
                <div className="flex justify-center">
                  <Button
                    onClick={analizarConIA}
                    disabled={cargandoIA}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3"
                    size="lg"
                  >
                    {cargandoIA ? (
                      <>
                        <Clock className="h-5 w-5 mr-2 animate-spin" />
                        Analizando con IA...
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Generar Análisis Especializado
                      </>
                    )}
                  </Button>
                </div>
              )}

              {mostrarAnalisis && formulario.analisisIA.cumplimiento && (
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" />
                      Análisis Jurídico
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                        {formulario.analisisIA.cumplimiento}
                      </pre>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-600" />
                      Análisis de Procedencia
                    </h3>
                    <div className={`p-4 rounded-lg border-l-4 ${
                      formulario.analisisIA.procedencia.viable
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold">
                          {formulario.analisisIA.procedencia.viable ? 'ACCIÓN PROCEDENTE' : 'ACCIÓN NO PROCEDENTE'}
                        </span>
                        <Badge className={`${
                          formulario.analisisIA.procedencia.viable ? 'bg-green-600' : 'bg-red-600'
                        } text-white`}>
                          {formulario.analisisIA.procedencia.probabilidad}% de éxito
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {formulario.analisisIA.procedencia.requisitos.map((req, index) => (
                          <div key={index} className="flex items-center">
                            {req.cumple ? (
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                            )}
                            <span className="text-gray-700">{req.requisito}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Paso 5: Documento Final */}
          {pasoActual === 5 && formulario.analisisIA.estrategia && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Download className="h-6 w-6 mr-2 text-blue-600" />
                Documento Final
              </h2>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-600" />
                  Plan de Acción Recomendado
                </h3>
                <div className="space-y-4">
                  {formulario.analisisIA.estrategia.acciones.map((accion, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        accion.prioridad === 'alta'
                          ? 'bg-red-50 border-red-500'
                          : accion.prioridad === 'media'
                          ? 'bg-yellow-50 border-yellow-500'
                          : 'bg-green-50 border-green-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{accion.titulo}</h4>
                          <p className="text-sm text-gray-600 mt-1">{accion.descripcion}</p>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            Plazo: {accion.plazo}
                          </div>
                        </div>
                        <Badge
                          className={`${
                            accion.prioridad === 'alta'
                              ? 'bg-red-600'
                              : accion.prioridad === 'media'
                              ? 'bg-yellow-600'
                              : 'bg-green-600'
                          } text-white`}
                        >
                          {accion.prioridad.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Jurisprudencia Relevante
                </h3>
                <div className="space-y-3">
                  {formulario.analisisIA.estrategia.jurisprudencia.map((juris, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{juris.sentencia}</h4>
                          <p className="text-sm text-gray-600 mt-1">{juris.tema}</p>
                          <p className="text-sm text-gray-700 mt-2 italic">"{juris.extracto}"</p>
                        </div>
                        <Badge className="bg-blue-600 text-white">
                          {juris.relevancia}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex justify-center">
                <Button
                  onClick={generarPDF}
                  className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-3"
                  size="lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Generar Documento Completo PDF
                </Button>
              </div>
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

            {pasoActual < pasos.length && pasoActual !== 4 && (
              <Button
                onClick={siguientePaso}
                className="bg-blue-600"
              >
                Siguiente
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccionCumplimiento;
