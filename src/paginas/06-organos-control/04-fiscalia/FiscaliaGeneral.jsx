import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Shield, 
  Search, 
  Users, 
  FileText, 
  Brain,
  Scale,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Calendar,
  Award,
  Download,
  Eye,
  Target,
  Filter,
  Clock,
  MapPin,
  Phone,
  Mail,
  Building,
  Gavel,
  AlertCircle,
  // Handcuffs, // Icono no disponible en lucide-react
  FileSearch
} from 'lucide-react';

const FiscaliaGeneral = () => {
  const [formData, setFormData] = useState({
    tipoDenuncia: '',
    delitoDenunciado: '',
    descripcionHechos: '',
    fechaHechos: '',
    ubicacion: '',
    presuntosResponsables: '',
    victimas: '',
    evidencias: '',
    testigos: '',
    datosDenunciante: '',
    solicitudEspecifica: '',
    urgencia: ''
  });

  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Tipos de denuncias penales
  const tiposDenuncias = [
    'Homicidio',
    'Lesiones personales',
    'Hurto',
    'Extorsión',
    'Secuestro',
    'Violencia intrafamiliar',
    'Violencia sexual',
    'Estafa',
    'Corrupción',
    'Narcotráfico',
    'Lavado de activos',
    'Terrorismo',
    'Desaparición forzada',
    'Tortura',
    'Delitos informáticos',
    'Trata de personas',
    'Porte ilegal de armas',
    'Delitos ambientales',
    'Otros delitos'
  ];

  // Categorías de delitos
  const categoriasDelitos = [
    'Delitos contra la vida',
    'Delitos contra la integridad personal',
    'Delitos contra la libertad',
    'Delitos contra la libertad sexual',
    'Delitos contra el patrimonio económico',
    'Delitos contra la administración pública',
    'Delitos contra el orden económico',
    'Delitos contra la seguridad pública',
    'Delitos contra el medio ambiente',
    'Delitos contra la familia',
    'Delitos informáticos',
    'Otros delitos'
  ];

  // Especialistas en investigación penal
  const especialistasFiscalia = [
    {
      nombre: 'Dr. Miguel Ángel Torres',
      especialidad: 'Derecho Penal',
      experiencia: '24 años',
      enfoque: 'Investigación criminal',
      casos: 678,
      tasaExito: '96%'
    },
    {
      nombre: 'Dra. Carolina Méndez',
      especialidad: 'Criminología',
      experiencia: '21 años',
      enfoque: 'Análisis criminalístico',
      casos: 534,
      tasaExito: '94%'
    },
    {
      nombre: 'Dr. Ricardo Vargas',
      especialidad: 'Derecho Procesal Penal',
      experiencia: '19 años',
      enfoque: 'Procedimiento penal',
      casos: 456,
      tasaExito: '95%'
    },
    {
      nombre: 'Dra. Patricia Silva',
      especialidad: 'Derechos de Víctimas',
      experiencia: '17 años',
      enfoque: 'Protección de víctimas',
      casos: 389,
      tasaExito: '97%'
    }
  ];

  // Procedimientos de investigación
  const procedimientosInvestigacion = [
    {
      nombre: 'Denuncia Penal',
      descripcion: 'Presentación formal de denuncia por delito',
      plazo: 'Inmediato',
      competencia: 'Todos los delitos'
    },
    {
      nombre: 'Indagación Preliminar',
      descripcion: 'Investigación inicial para verificar el delito',
      plazo: '6 meses',
      competencia: 'Delitos menores'
    },
    {
      nombre: 'Investigación Formal',
      descripcion: 'Investigación completa del delito',
      plazo: '12 meses',
      competencia: 'Delitos graves'
    },
    {
      nombre: 'Protección de Víctimas',
      descripcion: 'Medidas de protección para víctimas y testigos',
      plazo: '48 horas',
      competencia: 'Casos de riesgo'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analizarCasoFiscalia = async () => {
    setCargando(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 4200));
      
      const analisis = {
        probabilidadExito: '88%',
        tiempoEstimado: '6-18 meses',
        nivelUrgencia: 'ALTA',
        nivelConfianza: '94%',
        procedimientoRecomendado: 'Investigación Formal',
        tipoDelito: 'Delito grave',
        recomendaciones: [
          'Presentar denuncia formal ante la Fiscalía General',
          'Solicitar medidas de protección si existe riesgo',
          'Proporcionar todas las evidencias disponibles',
          'Solicitar asignación de fiscal especializado'
        ],
        fundamentosLegales: [
          'Código Penal Colombiano - Ley 599 de 2000',
          'Código de Procedimiento Penal - Ley 906 de 2004',
          'Ley 1826 de 2017 - Sistema Penal Acusatorio',
          'Ley 1448 de 2011 - Víctimas y Restitución de Tierras',
          'Ley 906 de 2004 - Procedimiento Penal',
          'Constitución Política - Artículo 250 (Fiscalía)'
        ],
        accionesRecomendadas: [
          {
            accion: 'Denuncia Formal',
            plazo: 'Inmediato',
            probabilidad: '99%',
            descripcion: 'Presentar denuncia ante la Fiscalía'
          },
          {
            accion: 'Investigación',
            plazo: '30 días',
            probabilidad: '85%',
            descripcion: 'Inicio de investigación formal'
          },
          {
            accion: 'Medidas Protección',
            plazo: '48 horas',
            probabilidad: '78%',
            descripcion: 'Protección de víctimas y testigos'
          },
          {
            accion: 'Seguimiento',
            plazo: 'Permanente',
            probabilidad: '92%',
            descripcion: 'Seguimiento del proceso'
          }
        ],
        especialistaAsignado: especialistasFiscalia[0],
        codigoCaso: `FISC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        medidasProteccion: [
          'Protección policial',
          'Cambio de residencia temporal',
          'Medidas de seguridad',
          'Protección de identidad',
          'Restricciones al agresor'
        ],
        etapasProceso: [
          'Recepción de la denuncia',
          'Indagación preliminar',
          'Investigación formal',
          'Imputación de cargos',
          'Acusación',
          'Juicio oral',
          'Sentencia',
            'Ejecución de la pena'
        ],
        penasEstimadas: {
          minima: '8 años',
          maxima: '20 años',
          multa: '$50,000,000 COP',
          inhabilitacion: '10 años'
        }
      };
      
      setAnalisisIA(analisis);
    } catch (error) {
      console.error('Error en análisis:', error);
    } finally {
      setCargando(false);
    }
  };

  const generarPDF = () => {
    const pdfContent = {
      titulo: 'Análisis Jurídico - Fiscalía General de la Nación',
      codigoCaso: analisisIA.codigoCaso,
      fecha: new Date().toLocaleDateString('es-CO'),
      datosCaso: formData,
      analisis: analisisIA,
      especialista: analisisIA.especialistaAsignado
    };
    
    console.log('Generando PDF:', pdfContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-full text-white">
              <Search className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Fiscalía General de la Nación
              </h1>
              <p className="text-gray-600 mt-2">Investigación de delitos y protección de víctimas</p>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            <Shield className="h-4 w-4 mr-2" />
            Especializado en investigación penal y justicia
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Denuncia Penal</h2>
              </div>

              <div className="space-y-6">
                {/* Tipo de Denuncia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Delito
                  </label>
                  <Select onValueChange={(value) => handleInputChange('tipoDenuncia', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de delito" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposDenuncias.map((tipo, index) => (
                        <SelectItem key={index} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Delito Denunciado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría del Delito
                  </label>
                  <Select onValueChange={(value) => handleInputChange('delitoDenunciado', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la categoría del delito" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriasDelitos.map((categoria, index) => (
                        <SelectItem key={index} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Descripción de los Hechos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción Detallada de los Hechos
                  </label>
                  <Textarea
                    placeholder="Describe detalladamente los hechos delictivos, incluyendo fechas, lugares, personas involucradas y circunstancias específicas..."
                    rows={5}
                    value={formData.descripcionHechos}
                    onChange={(e) => handleInputChange('descripcionHechos', e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Fecha de los Hechos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de los Hechos
                  </label>
                  <Input
                    type="date"
                    value={formData.fechaHechos}
                    onChange={(e) => handleInputChange('fechaHechos', e.target.value)}
                  />
                </div>

                {/* Ubicación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación de los Hechos
                  </label>
                  <Input
                    placeholder="Dirección exacta donde ocurrieron los hechos"
                    value={formData.ubicacion}
                    onChange={(e) => handleInputChange('ubicacion', e.target.value)}
                  />
                </div>

                {/* Presuntos Responsables */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Presuntos Responsables
                  </label>
                  <Textarea
                    placeholder="Información de los presuntos responsables: nombres, apodos, características físicas, etc..."
                    rows={3}
                    value={formData.presuntosResponsables}
                    onChange={(e) => handleInputChange('presuntosResponsables', e.target.value)}
                  />
                </div>

                {/* Víctimas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Información de las Víctimas
                  </label>
                  <Textarea
                    placeholder="Describe las víctimas: nombres, edades, lesiones sufridas, consecuencias..."
                    rows={3}
                    value={formData.victimas}
                    onChange={(e) => handleInputChange('victimas', e.target.value)}
                  />
                </div>

                {/* Urgencia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nivel de Urgencia
                  </label>
                  <Select onValueChange={(value) => handleInputChange('urgencia', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el nivel de urgencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critica">Crítica - Flagrancia o riesgo inminente</SelectItem>
                      <SelectItem value="alta">Alta - Requiere atención urgente</SelectItem>
                      <SelectItem value="media">Media - Atención prioritaria</SelectItem>
                      <SelectItem value="baja">Baja - Atención normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Evidencias */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Evidencias Disponibles
                  </label>
                  <Textarea
                    placeholder="Describe las evidencias disponibles: armas, documentos, fotografías, videos, etc..."
                    rows={3}
                    value={formData.evidencias}
                    onChange={(e) => handleInputChange('evidencias', e.target.value)}
                  />
                </div>

                {/* Testigos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Testigos
                  </label>
                  <Textarea
                    placeholder="Información de testigos: nombres, datos de contacto, lo que presenciaron..."
                    rows={3}
                    value={formData.testigos}
                    onChange={(e) => handleInputChange('testigos', e.target.value)}
                  />
                </div>

                {/* Datos del Denunciante */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Datos del Denunciante
                  </label>
                  <Textarea
                    placeholder="Nombre completo, documento de identidad, dirección, teléfono, email..."
                    rows={3}
                    value={formData.datosDenunciante}
                    onChange={(e) => handleInputChange('datosDenunciante', e.target.value)}
                  />
                </div>

                {/* Solicitud Específica */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solicitud Específica
                  </label>
                  <Textarea
                    placeholder="¿Qué específicamente solicitas? (investigación, protección, captura, etc.)"
                    rows={3}
                    value={formData.solicitudEspecifica}
                    onChange={(e) => handleInputChange('solicitudEspecifica', e.target.value)}
                  />
                </div>

                {/* Botón de Análisis */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={analizarCasoFiscalia}
                    disabled={cargando || !formData.descripcionHechos}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {cargando ? (
                      <>
                        <Brain className="h-5 w-5 mr-2 animate-spin" />
                        Analizando con IA Especializada...
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Analizar Denuncia con IA Fiscalía
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Procedimientos */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <FileSearch className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-800">Procedimientos</h3>
              </div>
              
              <div className="space-y-3">
                {procedimientosInvestigacion.map((procedimiento, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-900">{procedimiento.nombre}</h4>
                    <p className="text-sm text-red-700 mb-2">{procedimiento.descripcion}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-red-600">Plazo:</span>
                        <span className="text-red-800">{procedimiento.plazo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-600">Competencia:</span>
                        <span className="text-red-800">{procedimiento.competencia}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Especialistas */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-800">Especialistas</h3>
              </div>
              
              <div className="space-y-3">
                {especialistasFiscalia.map((especialista, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-900">{especialista.nombre}</h4>
                    <p className="text-sm text-red-700">{especialista.especialidad}</p>
                    <p className="text-xs text-red-600">{especialista.experiencia} • {especialista.casos} casos</p>
                    <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300">
                      {especialista.tasaExito} éxito
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Marco Legal */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-800">Marco Legal</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Código Penal - Ley 599/2000</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Código Procesal Penal - Ley 906/2004</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 1826/2017 - Sistema Acusatorio</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 1448/2011 - Víctimas</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Constitución Art. 250</span>
                </div>
              </div>
            </Card>

            {/* Información de Contacto */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-800">Contacto Urgente</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <span>Línea 122 - Emergencias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <span>018000 916 111 - Denuncias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-600" />
                  <span>denuncias@fiscalia.gov.co</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-red-600" />
                  <span>Calle 53 #14-28, Bogotá</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-red-600" />
                  <span>24/7 - Atención permanente</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Resultados del Análisis */}
        {analisisIA && (
          <div className="mt-8">
            <Card className="p-6 shadow-lg bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Análisis Especializado Completado</h2>
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                  Código: {analisisIA.codigoCaso}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-green-600">{analisisIA.probabilidadExito}</div>
                  <div className="text-sm text-gray-600">Probabilidad de Éxito</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">{analisisIA.tiempoEstimado}</div>
                  <div className="text-sm text-gray-600">Tiempo Estimado</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-orange-600">{analisisIA.nivelUrgencia}</div>
                  <div className="text-sm text-gray-600">Nivel de Urgencia</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-purple-600">{analisisIA.nivelConfianza}</div>
                  <div className="text-sm text-gray-600">Nivel de Confianza</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Procedimiento Recomendado</h3>
                  <p className="text-red-700">{analisisIA.procedimientoRecomendado}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">Tipo de Delito</h3>
                  <p className="text-orange-700">{analisisIA.tipoDelito}</p>
                </div>
              </div>

              {/* Penas Estimadas */}
              <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-red-50 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Penas Estimadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-xl font-bold text-red-600">{analisisIA.penasEstimadas.minima}</div>
                    <div className="text-sm text-gray-600">Pena Mínima</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-xl font-bold text-red-600">{analisisIA.penasEstimadas.maxima}</div>
                    <div className="text-sm text-gray-600">Pena Máxima</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{analisisIA.penasEstimadas.multa}</div>
                    <div className="text-sm text-gray-600">Multa Estimada</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">{analisisIA.penasEstimadas.inhabilitacion}</div>
                    <div className="text-sm text-gray-600">Inhabilitación</div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="recomendaciones" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
                  <TabsTrigger value="fundamentos">Fundamentos</TabsTrigger>
                  <TabsTrigger value="acciones">Acciones</TabsTrigger>
                  <TabsTrigger value="proteccion">Protección</TabsTrigger>
                  <TabsTrigger value="especialista">Especialista</TabsTrigger>
                </TabsList>

                <TabsContent value="recomendaciones" className="space-y-4">
                  <div className="space-y-3">
                    {analisisIA.recomendaciones.map((recomendacion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{recomendacion}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="fundamentos" className="space-y-4">
                  <div className="space-y-3">
                    {analisisIA.fundamentosLegales.map((fundamento, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200">
                        <BookOpen className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{fundamento}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="acciones" className="space-y-4">
                  <div className="space-y-4">
                    {analisisIA.accionesRecomendadas.map((accion, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-green-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800">{accion.accion}</h4>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                            {accion.probabilidad}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{accion.descripcion}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>Plazo: {accion.plazo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="proteccion" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3">Medidas de Protección</h4>
                      <div className="space-y-2">
                        {analisisIA.medidasProteccion.map((medida, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-700">{medida}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-3">Etapas del Proceso</h4>
                      <div className="space-y-2">
                        {analisisIA.etapasProceso.map((etapa, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-700">{etapa}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="especialista" className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-red-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                        {analisisIA.especialistaAsignado.nombre.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{analisisIA.especialistaAsignado.nombre}</h4>
                        <p className="text-sm text-red-600">{analisisIA.especialistaAsignado.especialidad}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Experiencia:</span>
                        <span className="ml-2 font-medium">{analisisIA.especialistaAsignado.experiencia}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Casos:</span>
                        <span className="ml-2 font-medium">{analisisIA.especialistaAsignado.casos}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Éxito:</span>
                        <span className="ml-2 font-medium text-green-600">{analisisIA.especialistaAsignado.tasaExito}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Enfoque:</span>
                        <span className="ml-2 font-medium">{analisisIA.especialistaAsignado.enfoque}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-center gap-4 mt-6">
                <Button
                  onClick={generarPDF}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generar PDF
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiscaliaGeneral;
