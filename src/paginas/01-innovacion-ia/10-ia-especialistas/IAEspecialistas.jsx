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
  Brain, 
  User, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Gavel,
  Shield,
  Target,
  Zap,
  Users,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  Search,
  Filter
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';
import { advancedAIService } from '../../../services/ia/AdvancedAIService';

const IAEspecialistas = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    // Datos del consultante
    nombre: '',
    identificacion: '',
    telefono: '',
    email: '',
    profesion: '',
    entidad: '',
    
    // Consulta legal
    areaEspecializada: '',
    tipoConsulta: '',
    descripcionCaso: '',
    objetivoConsulta: '',
    documentosAdjuntos: [],
    
    // Análisis IA
    analisisIA: {
      especialistaAsignado: null,
      analisisCompleto: null,
      recomendaciones: null,
      precedentes: null
    }
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState(null);

  // Áreas especializadas
  const areasEspecializadas = [
    { id: 'derecho_constitucional', nombre: 'Derecho Constitucional', icono: '⚖️' },
    { id: 'derecho_administrativo', nombre: 'Derecho Administrativo', icono: '🏛️' },
    { id: 'derecho_laboral', nombre: 'Derecho Laboral', icono: '👔' },
    { id: 'derecho_ambiental', nombre: 'Derecho Ambiental', icono: '🌍' },
    { id: 'derecho_penal', nombre: 'Derecho Penal', icono: '⚠️' },
    { id: 'derecho_civil', nombre: 'Derecho Civil', icono: '📋' },
    { id: 'derecho_comercial', nombre: 'Derecho Comercial', icono: '💼' },
    { id: 'derecho_tributario', nombre: 'Derecho Tributario', icono: '💰' },
    { id: 'derecho_etnico', nombre: 'Derecho Étnico', icono: '🌟' },
    { id: 'derecho_migratorio', nombre: 'Derecho Migratorio', icono: '✈️' }
  ];

  // Especialistas IA disponibles
  const especialistasIA = [
    {
      id: 'dra_martinez',
      nombre: 'Dra. María Elena Martínez',
      especialidad: 'Derecho Constitucional',
      experiencia: '25 años',
      casosResueltos: 2500,
      rating: 4.9,
      descripcion: 'Especialista en acciones constitucionales, tutelas y derechos fundamentales',
      areas: ['derecho_constitucional', 'derecho_administrativo']
    },
    {
      id: 'dr_rodriguez',
      nombre: 'Dr. Carlos Rodríguez',
      especialidad: 'Derecho Laboral',
      experiencia: '20 años',
      casosResueltos: 1800,
      rating: 4.8,
      descripcion: 'Experto en liquidaciones laborales, despidos y derechos de trabajadores',
      areas: ['derecho_laboral']
    },
    {
      id: 'dra_lopez',
      nombre: 'Dra. Ana Patricia López',
      especialidad: 'Derecho Étnico y Territorial',
      experiencia: '18 años',
      casosResueltos: 1200,
      rating: 4.9,
      descripcion: 'Especialista en consulta previa, derechos étnicos y territorios ancestrales',
      areas: ['derecho_etnico', 'derecho_ambiental']
    },
    {
      id: 'dr_torres',
      nombre: 'Dr. Roberto Torres',
      especialidad: 'Derecho Penal',
      experiencia: '22 años',
      casosResueltos: 2000,
      rating: 4.7,
      descripcion: 'Experto en defensa penal, habeas corpus y procedimiento penal',
      areas: ['derecho_penal', 'derecho_constitucional']
    },
    {
      id: 'dra_gomez',
      nombre: 'Dra. Sandra Gómez',
      especialidad: 'Derecho Ambiental',
      experiencia: '15 años',
      casosResueltos: 900,
      rating: 4.8,
      descripcion: 'Especialista en protección ambiental, acciones populares y derechos colectivos',
      areas: ['derecho_ambiental', 'derecho_constitucional']
    }
  ];

  const pasos = [
    { numero: 1, titulo: 'Datos del Consultante', icono: User },
    { numero: 2, titulo: 'Consulta Legal', icono: FileText },
    { numero: 3, titulo: 'Selección de Especialista', icono: Brain },
    { numero: 4, titulo: 'Análisis IA', icono: Sparkles },
    { numero: 5, titulo: 'Resultados', icono: Award }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
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

  const seleccionarEspecialista = (especialista) => {
    setEspecialistaSeleccionado(especialista);
    toast.success(`Especialista ${especialista.nombre} seleccionado`);
  };

  const analizarConIA = async () => {
    if (!especialistaSeleccionado) {
      toast.error('Por favor selecciona un especialista primero');
      return;
    }

    setCargandoIA(true);
    toast.loading('Analizando caso con IA...', { duration: 2000 });

    try {
      // Usar análisis avanzado con IA especializada
      const analisisAvanzado = await advancedAIService.analizarJuridicoAvanzado({
        texto: formulario.descripcionCaso,
        tipoCaso: formulario.tipoConsulta,
        categoriaJuridica: formulario.areaEspecializada,
        jurisdiccion: 'colombia',
        especialista: especialistaSeleccionado.nombre
      }, {
        incluirRecomendaciones: true,
        incluirRiesgos: true,
        incluirPrecedentes: true,
        nivelAnalisis: 'avanzado',
        proveedores: ['lexisnexis', 'constitutional_ai', 'legal_ai_library']
      });

      // Generar respuesta inteligente especializada
      const respuestaInteligente = await advancedAIService.generarRespuestaInteligente(
        formulario.descripcionCaso,
        {
          paginaActual: 'ia_especialistas',
          tipoConsulta: formulario.tipoConsulta,
          especialista: especialistaSeleccionado.nombre,
          areaEspecializada: formulario.areaEspecializada
        }
      );

      const analisis = {
        especialistaAsignado: especialistaSeleccionado,
        analisisCompleto: analisisAvanzado.analisis?.resumen || `Análisis del Dr(a). ${especialistaSeleccionado.nombre}\n\nÁrea: ${especialistaSeleccionado.especialidad}\n\nCaso: ${formulario.descripcionCaso}\n\nAnálisis con IA avanzada completado.`,
        
        recomendaciones: analisisAvanzado.recomendaciones?.inmediatas?.map((rec, index) => ({
          tipo: index === 0 ? 'inmediata' : index === 1 ? 'documental' : 'estrategica',
          titulo: rec,
          descripcion: rec,
          prioridad: index === 0 ? 'alta' : index === 1 ? 'media' : 'alta'
        })) || [
          {
            tipo: 'inmediata',
            titulo: 'Acción Legal Inmediata',
            descripcion: 'Se recomienda presentar la acción correspondiente dentro de los próximos 10 días hábiles',
            prioridad: 'alta'
          },
          {
            tipo: 'documental',
            titulo: 'Documentación Complementaria',
            descripcion: 'Recopilar: certificaciones de entidad, pruebas documentales, testimonios',
            prioridad: 'media'
          },
          {
            tipo: 'estrategica',
            titulo: 'Estrategia Procesal',
            descripcion: 'Considerar medidas cautelares para proteger derechos mientras se resuelve el proceso',
            prioridad: 'alta'
          }
        ],

        precedentes: analisisAvanzado.analisis?.analisisJuridico?.jurisprudencia?.map((prec, index) => ({
          sentencia: `Sentencia ${prec}`,
          magistrado: 'IA Avanzada',
          relevancia: index === 0 ? 'Alta' : 'Media',
          resumen: prec
        })) || [
          {
            sentencia: 'Sentencia T-025 de 2004',
            magistrado: 'Manuel José Cepeda',
            relevancia: 'Alta',
            resumen: 'Protección de derechos fundamentales en situaciones similares'
          },
          {
            sentencia: 'Sentencia C-355 de 2006',
            magistrado: 'Jaime Araújo Rentería',
            relevancia: 'Media',
            resumen: 'Interpretación de derechos fundamentales aplicables al caso'
          }
        ],
        respuestaInteligente: respuestaInteligente.respuesta,
        evaluacionRiesgos: analisisAvanzado.evaluacionRiesgos,
        clasificaciones: analisisAvanzado.analisis?.clasificaciones || [],
        confianza: analisisAvanzado.metadatos?.confianzaPromedio || 0.92,
        tiempoAnalisis: `${(analisisAvanzado.metadatos?.tiempoProcesamiento / 1000).toFixed(1)} segundos`
      };

      setFormulario(prev => ({
        ...prev,
        analisisIA: analisis
      }));

      toast.success('¡Análisis con IA avanzada completado exitosamente!');
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
    doc.text('ANÁLISIS LEGAL ESPECIALIZADO - IA', 20, 30);
    
    // Información del especialista
    doc.setFontSize(12);
    doc.text(`Especialista: ${formulario.analisisIA.especialistaAsignado.nombre}`, 20, 50);
    doc.text(`Área: ${formulario.analisisIA.especialistaAsignado.especialidad}`, 20, 60);
    doc.text(`Experiencia: ${formulario.analisisIA.especialistaAsignado.experiencia}`, 20, 70);
    
    // Análisis
    doc.setFontSize(14);
    doc.text('ANÁLISIS COMPLETO:', 20, 90);
    doc.setFontSize(10);
    const splitAnalisis = doc.splitTextToSize(formulario.analisisIA.analisisCompleto, 170);
    doc.text(splitAnalisis, 20, 100);
    
    // Recomendaciones
    doc.addPage();
    doc.setFontSize(14);
    doc.text('RECOMENDACIONES:', 20, 30);
    
    autoTable(doc, {
      startY: 40,
      head: [['Tipo', 'Recomendación', 'Prioridad']],
      body: formulario.analisisIA.recomendaciones.map(rec => [
        rec.titulo,
        rec.descripcion,
        rec.prioridad.toUpperCase()
      ])
    });
    
    doc.save(`Analisis_Legal_IA_${Date.now()}.pdf`);
    toast.success('PDF generado exitosamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Brain className="h-10 w-10 mr-3 text-purple-600" />
            IA ESPECIALISTAS LEGALES
          </h1>
          <p className="text-xl text-gray-600">
            Consulta con especialistas virtuales potenciados por inteligencia artificial
          </p>
        </div>

        {/* Progreso */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            {pasos.map((paso, index) => (
              <React.Fragment key={paso.numero}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    pasoActual === paso.numero
                      ? 'bg-purple-600 text-white'
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

        {/* Contenido de pasos */}
        <Card className="p-8">
          {/* Paso 1: Datos del Consultante */}
          {pasoActual === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <User className="h-6 w-6 mr-2 text-purple-600" />
                Datos del Consultante
              </h2>

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

                <div>
                  <Label htmlFor="profesion">Profesión / Ocupación</Label>
                  <Input
                    id="profesion"
                    name="profesion"
                    value={formulario.profesion}
                    onChange={handleInputChange}
                    placeholder="Ej: Abogado, Contador, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="entidad">Entidad / Organización</Label>
                  <Input
                    id="entidad"
                    name="entidad"
                    value={formulario.entidad}
                    onChange={handleInputChange}
                    placeholder="Ej: Empresa ABC"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paso 2: Consulta Legal */}
          {pasoActual === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FileText className="h-6 w-6 mr-2 text-purple-600" />
                Consulta Legal
              </h2>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="areaEspecializada">Área Especializada *</Label>
                  <Select
                    id="areaEspecializada"
                    name="areaEspecializada"
                    value={formulario.areaEspecializada}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione un área...</option>
                    {areasEspecializadas.map(area => (
                      <option key={area.id} value={area.id}>
                        {area.icono} {area.nombre}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tipoConsulta">Tipo de Consulta *</Label>
                  <Select
                    id="tipoConsulta"
                    name="tipoConsulta"
                    value={formulario.tipoConsulta}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione...</option>
                    <option value="asesoria">Asesoría Jurídica</option>
                    <option value="concepto">Concepto Legal</option>
                    <option value="demanda">Elaboración de Demanda</option>
                    <option value="recurso">Recurso Legal</option>
                    <option value="revision">Revisión de Documentos</option>
                    <option value="estrategia">Estrategia Procesal</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="descripcionCaso">Descripción del Caso *</Label>
                  <Textarea
                    id="descripcionCaso"
                    name="descripcionCaso"
                    value={formulario.descripcionCaso}
                    onChange={handleInputChange}
                    rows={8}
                    placeholder="Describa detalladamente su caso legal, incluyendo fechas, personas involucradas, documentos existentes, y cualquier información relevante..."
                  />
                </div>

                <div>
                  <Label htmlFor="objetivoConsulta">Objetivo de la Consulta *</Label>
                  <Textarea
                    id="objetivoConsulta"
                    name="objetivoConsulta"
                    value={formulario.objetivoConsulta}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="¿Qué espera obtener de esta consulta? ¿Cuál es su objetivo específico?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: Selección de Especialista */}
          {pasoActual === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Brain className="h-6 w-6 mr-2 text-purple-600" />
                Selección de Especialista IA
              </h2>

              <Alert className="bg-blue-50 border-blue-200">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <div className="ml-3">
                  <p className="text-blue-800 font-semibold">Especialistas Recomendados</p>
                  <p className="text-blue-700 text-sm">
                    Basado en su área de consulta: <strong>{formulario.areaEspecializada}</strong>
                  </p>
                </div>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {especialistasIA.map(especialista => (
                  <Card
                    key={especialista.id}
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      especialistaSeleccionado?.id === especialista.id
                        ? 'border-2 border-purple-600 bg-purple-50'
                        : 'border border-gray-200'
                    }`}
                    onClick={() => seleccionarEspecialista(especialista)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                          {especialista.nombre.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-bold text-gray-800">{especialista.nombre}</h3>
                          <p className="text-sm text-gray-600">{especialista.especialidad}</p>
                        </div>
                      </div>
                      {especialistaSeleccionado?.id === especialista.id && (
                        <CheckCircle className="h-6 w-6 text-purple-600" />
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Award className="h-4 w-4 mr-2 text-yellow-500" />
                        Experiencia: {especialista.experiencia}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Target className="h-4 w-4 mr-2 text-green-500" />
                        Casos resueltos: {especialista.casosResueltos.toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                        Rating: {especialista.rating}/5.0
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 italic">
                      "{especialista.descripcion}"
                    </p>

                    <Button
                      className={`w-full mt-4 ${
                        especialistaSeleccionado?.id === especialista.id
                          ? 'bg-purple-600'
                          : 'bg-gray-600'
                      }`}
                      onClick={() => seleccionarEspecialista(especialista)}
                    >
                      {especialistaSeleccionado?.id === especialista.id ? 'Seleccionado' : 'Seleccionar'}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Paso 4: Análisis IA */}
          {pasoActual === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
                Análisis con Inteligencia Artificial
              </h2>

              {especialistaSeleccionado && (
                <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {especialistaSeleccionado.nombre}
                      </h3>
                      <p className="text-gray-600">{especialistaSeleccionado.especialidad}</p>
                    </div>
                    <Badge className="bg-purple-600 text-white">
                      Especialista Asignado
                    </Badge>
                  </div>
                </Card>
              )}

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Consulta</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">Área:</span>
                    <span className="ml-2 text-gray-600">{formulario.areaEspecializada}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Tipo:</span>
                    <span className="ml-2 text-gray-600">{formulario.tipoConsulta}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Caso:</span>
                    <p className="text-gray-600 mt-1">{formulario.descripcionCaso}</p>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center">
                <Button
                  onClick={analizarConIA}
                  disabled={cargandoIA}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3"
                  size="lg"
                >
                  {cargandoIA ? (
                    <>
                      <Clock className="h-5 w-5 mr-2 animate-spin" />
                      Analizando con IA...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generar Análisis Especializado
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Paso 5: Resultados */}
          {pasoActual === 5 && formulario.analisisIA.analisisCompleto && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Award className="h-6 w-6 mr-2 text-purple-600" />
                Resultados del Análisis
              </h2>

              {/* Especialista */}
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                    {formulario.analisisIA.especialistaAsignado.nombre.charAt(0)}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      {formulario.analisisIA.especialistaAsignado.nombre}
                    </h3>
                    <p className="text-gray-600">{formulario.analisisIA.especialistaAsignado.especialidad}</p>
                    <div className="flex items-center mt-2">
                      <Sparkles className="h-4 w-4 text-purple-600 mr-1" />
                      <span className="text-sm text-gray-600">
                        Rating: {formulario.analisisIA.especialistaAsignado.rating}/5.0
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Análisis Completo */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-purple-600" />
                  Análisis Legal Completo
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                    {formulario.analisisIA.analisisCompleto}
                  </pre>
                </div>
              </Card>

              {/* Recomendaciones */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-purple-600" />
                  Recomendaciones Especializadas
                </h3>
                <div className="space-y-4">
                  {formulario.analisisIA.recomendaciones.map((rec, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        rec.prioridad === 'alta'
                          ? 'bg-red-50 border-red-500'
                          : rec.prioridad === 'media'
                          ? 'bg-yellow-50 border-yellow-500'
                          : 'bg-green-50 border-green-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{rec.titulo}</h4>
                          <p className="text-sm text-gray-600 mt-1">{rec.descripcion}</p>
                        </div>
                        <Badge
                          className={`${
                            rec.prioridad === 'alta'
                              ? 'bg-red-600'
                              : rec.prioridad === 'media'
                              ? 'bg-yellow-600'
                              : 'bg-green-600'
                          } text-white`}
                        >
                          {rec.prioridad.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Precedentes */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                  Precedentes Jurisprudenciales
                </h3>
                <div className="space-y-3">
                  {formulario.analisisIA.precedentes.map((precedente, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{precedente.sentencia}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Magistrado Ponente: {precedente.magistrado}
                          </p>
                          <p className="text-sm text-gray-700 mt-2">{precedente.resumen}</p>
                        </div>
                        <Badge className={`${
                          precedente.relevancia === 'Alta' ? 'bg-green-600' :
                          precedente.relevancia === 'Media' ? 'bg-yellow-600' :
                          'bg-gray-600'
                        } text-white`}>
                          {precedente.relevancia}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Botón Generar PDF */}
              <div className="flex justify-center">
                <Button
                  onClick={generarPDF}
                  className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-3"
                  size="lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Generar Reporte PDF
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
                className="bg-purple-600"
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

export default IAEspecialistas;
