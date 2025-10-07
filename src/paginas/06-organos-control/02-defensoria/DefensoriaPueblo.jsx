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
  Heart, 
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
  Search,
  Filter,
  Clock,
  MapPin,
  Phone,
  Mail,
  Building,
  Handshake,
  Globe
} from 'lucide-react';

const DefensoriaPueblo = () => {
  const [formData, setFormData] = useState({
    tipoPeticion: '',
    entidadResponsable: '',
    descripcionHechos: '',
    fechaHechos: '',
    ubicacion: '',
    derechosVulnerados: '',
    afectados: '',
    evidencias: '',
    testigos: '',
    datosPeticionario: '',
    solicitudEspecifica: '',
    urgencia: ''
  });

  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Tipos de peticiones ante la Defensoría
  const tiposPeticiones = [
    'Violación de derechos fundamentales',
    'Negación de servicios públicos',
    'Discriminación',
    'Violencia institucional',
    'Desplazamiento forzado',
    'Violencia sexual',
    'Violencia contra la mujer',
    'Violencia contra menores',
    'Violencia contra adultos mayores',
    'Violencia contra personas con discapacidad',
    'Violencia contra población LGBTI',
    'Violencia contra comunidades étnicas',
    'Violencia contra defensores de derechos humanos',
    'Violencia contra periodistas',
    'Otros'
  ];

  // Derechos fundamentales
  const derechosFundamentales = [
    'Derecho a la vida',
    'Derecho a la integridad personal',
    'Derecho a la libertad',
    'Derecho a la igualdad',
    'Derecho a la dignidad humana',
    'Derecho a la libertad de expresión',
    'Derecho a la libertad de conciencia',
    'Derecho a la libertad de cultos',
    'Derecho a la intimidad',
    'Derecho al buen nombre',
    'Derecho al trabajo',
    'Derecho a la educación',
    'Derecho a la salud',
    'Derecho a la vivienda',
    'Derecho a la alimentación',
    'Derecho al agua',
    'Derecho a un ambiente sano',
    'Derecho a la participación',
    'Derecho de petición',
    'Derecho de reunión y manifestación'
  ];

  // Especialistas en derechos humanos
  const especialistasDefensoria = [
    {
      nombre: 'Dra. María Elena Restrepo',
      especialidad: 'Derechos Humanos',
      experiencia: '20 años',
      enfoque: 'Protección integral de derechos',
      casos: 324,
      tasaExito: '94%'
    },
    {
      nombre: 'Dr. Carlos Andrés López',
      especialidad: 'Derecho Constitucional',
      experiencia: '18 años',
      enfoque: 'Acciones constitucionales',
      casos: 267,
      tasaExito: '91%'
    },
    {
      nombre: 'Dra. Ana Lucía Vargas',
      especialidad: 'Derechos de Víctimas',
      experiencia: '16 años',
      enfoque: 'Atención a víctimas',
      casos: 189,
      tasaExito: '96%'
    },
    {
      nombre: 'Dr. Roberto Silva',
      especialidad: 'Derecho Internacional',
      experiencia: '14 años',
      enfoque: 'Sistemas internacionales',
      casos: 156,
      tasaExito: '89%'
    }
  ];

  // Mecanismos de protección
  const mecanismosProteccion = [
    {
      nombre: 'Acción de Tutela',
      descripcion: 'Mecanismo judicial para proteger derechos fundamentales',
      plazo: '10 días',
      competencia: 'Derechos fundamentales vulnerados'
    },
    {
      nombre: 'Acción Popular',
      descripcion: 'Protección de derechos e intereses colectivos',
      plazo: '20 días',
      competencia: 'Derechos colectivos y del ambiente'
    },
    {
      nombre: 'Acción de Grupo',
      descripcion: 'Protección de derechos de un grupo de personas',
      plazo: '30 días',
      competencia: 'Derechos individuales homogéneos'
    },
    {
      nombre: 'Medidas Cautelares',
      descripcion: 'Protección inmediata ante riesgo inminente',
      plazo: 'Inmediato',
      competencia: 'Riesgo de daño irreparable'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analizarCasoDefensoria = async () => {
    setCargando(true);
    
    try {
      // Simulación de análisis con IA especializada en derechos humanos
      await new Promise(resolve => setTimeout(resolve, 3800));
      
      const analisis = {
        probabilidadExito: '89%',
        tiempoEstimado: '15-30 días',
        nivelUrgencia: 'ALTA',
        nivelConfianza: '95%',
        mecanismoRecomendado: 'Acción de Tutela',
        recomendaciones: [
          'Solicitar protección inmediata de derechos fundamentales',
          'Presentar acción de tutela ante el juez competente',
          'Solicitar medidas cautelares si existe riesgo inminente',
          'Contactar a organizaciones de derechos humanos'
        ],
        fundamentosLegales: [
          'Constitución Política - Artículo 86 (acción de tutela)',
          'Decreto 2591 de 1991 - Reglamentación tutela',
          'Ley 1755 de 2015 - Defensoría del Pueblo',
          'Convención Americana de Derechos Humanos',
          'Pacto Internacional de Derechos Civiles y Políticos',
          'Declaración Universal de Derechos Humanos'
        ],
        accionesRecomendadas: [
          {
            accion: 'Acción de Tutela',
            plazo: 'Inmediato',
            probabilidad: '92%',
            descripcion: 'Protección inmediata de derechos fundamentales'
          },
          {
            accion: 'Medidas Cautelares',
            plazo: '24 horas',
            probabilidad: '85%',
            descripcion: 'Protección ante riesgo inminente'
          },
          {
            accion: 'Intervención Defensorial',
            plazo: '48 horas',
            probabilidad: '88%',
            descripcion: 'Intervención directa de la Defensoría'
          },
          {
            accion: 'Seguimiento',
            plazo: 'Permanente',
            probabilidad: '94%',
            descripcion: 'Seguimiento del caso'
          }
        ],
        especialistaAsignado: especialistasDefensoria[0],
        codigoCaso: `DEF-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        derechosVulnerados: [
          'Derecho a la vida',
          'Derecho a la integridad personal',
          'Derecho a la libertad',
          'Derecho a la igualdad'
        ],
        medidasProteccion: [
          'Protección física inmediata',
          'Medidas de no repetición',
          'Garantías de no represalia',
          'Acceso a servicios de salud',
          'Protección de familiares'
        ]
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
      titulo: 'Análisis Jurídico - Defensoría del Pueblo',
      codigoCaso: analisisIA.codigoCaso,
      fecha: new Date().toLocaleDateString('es-CO'),
      datosCaso: formData,
      analisis: analisisIA,
      especialista: analisisIA.especialistaAsignado
    };
    
    console.log('Generando PDF:', pdfContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full text-white">
              <Heart className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Defensoría del Pueblo
              </h1>
              <p className="text-gray-600 mt-2">Protección y promoción de los derechos humanos en Colombia</p>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            <Shield className="h-4 w-4 mr-2" />
            Especializado en protección de derechos humanos
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Petición de Protección</h2>
              </div>

              <div className="space-y-6">
                {/* Tipo de Petición */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Petición
                  </label>
                  <Select onValueChange={(value) => handleInputChange('tipoPeticion', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de petición" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposPeticiones.map((tipo, index) => (
                        <SelectItem key={index} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Entidad Responsable */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entidad o Persona Responsable
                  </label>
                  <Input
                    placeholder="Nombre de la entidad pública o persona responsable de la vulneración"
                    value={formData.entidadResponsable}
                    onChange={(e) => handleInputChange('entidadResponsable', e.target.value)}
                  />
                </div>

                {/* Descripción de los Hechos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción Detallada de los Hechos
                  </label>
                  <Textarea
                    placeholder="Describe detalladamente los hechos que motivan la petición, incluyendo fechas, lugares, personas involucradas y circunstancias específicas..."
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

                {/* Derechos Vulnerados */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Derechos Fundamentales Vulnerados
                  </label>
                  <Select onValueChange={(value) => handleInputChange('derechosVulnerados', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona los derechos vulnerados" />
                    </SelectTrigger>
                    <SelectContent>
                      {derechosFundamentales.map((derecho, index) => (
                        <SelectItem key={index} value={derecho}>
                          {derecho}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Personas Afectadas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personas Afectadas
                  </label>
                  <Textarea
                    placeholder="Describe las personas afectadas: nombres, edades, parentesco, consecuencias sufridas..."
                    rows={3}
                    value={formData.afectados}
                    onChange={(e) => handleInputChange('afectados', e.target.value)}
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
                      <SelectItem value="critica">Crítica - Riesgo inminente</SelectItem>
                      <SelectItem value="alta">Alta - Necesita atención urgente</SelectItem>
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
                    placeholder="Describe las evidencias disponibles: documentos, fotografías, videos, testigos, etc..."
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
                    placeholder="Información de testigos: nombres, datos de contacto, relación con los hechos..."
                    rows={3}
                    value={formData.testigos}
                    onChange={(e) => handleInputChange('testigos', e.target.value)}
                  />
                </div>

                {/* Datos del Peticionario */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Datos del Peticionario
                  </label>
                  <Textarea
                    placeholder="Nombre completo, documento de identidad, dirección, teléfono, email..."
                    rows={3}
                    value={formData.datosPeticionario}
                    onChange={(e) => handleInputChange('datosPeticionario', e.target.value)}
                  />
                </div>

                {/* Solicitud Específica */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solicitud Específica
                  </label>
                  <Textarea
                    placeholder="¿Qué específicamente solicitas? (protección, investigación, medidas, etc.)"
                    rows={3}
                    value={formData.solicitudEspecifica}
                    onChange={(e) => handleInputChange('solicitudEspecifica', e.target.value)}
                  />
                </div>

                {/* Botón de Análisis */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={analizarCasoDefensoria}
                    disabled={cargando || !formData.descripcionHechos}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {cargando ? (
                      <>
                        <Brain className="h-5 w-5 mr-2 animate-spin" />
                        Analizando con IA Especializada...
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Analizar Petición con IA Defensoría
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Mecanismos de Protección */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Mecanismos de Protección</h3>
              </div>
              
              <div className="space-y-3">
                {mecanismosProteccion.map((mecanismo, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900">{mecanismo.nombre}</h4>
                    <p className="text-sm text-green-700 mb-2">{mecanismo.descripcion}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-green-600">Plazo:</span>
                        <span className="text-green-800">{mecanismo.plazo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Competencia:</span>
                        <span className="text-green-800">{mecanismo.competencia}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Especialistas */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Especialistas</h3>
              </div>
              
              <div className="space-y-3">
                {especialistasDefensoria.map((especialista, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900">{especialista.nombre}</h4>
                    <p className="text-sm text-green-700">{especialista.especialidad}</p>
                    <p className="text-xs text-green-600">{especialista.experiencia} • {especialista.casos} casos</p>
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
                <BookOpen className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Marco Legal</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Constitución Art. 86 - Tutela</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Decreto 2591/1991 - Tutela</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 1755/2015 - Defensoría</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Convención Americana DDHH</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Pacto Internacional DCP</span>
                </div>
              </div>
            </Card>

            {/* Información de Contacto */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Contacto</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>Línea 195</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span>contactenos@defensoria.gov.co</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-green-600" />
                  <span>Calle 55 #10-32, Bogotá</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>24/7 - Línea de emergencia</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Resultados del Análisis */}
        {analisisIA && (
          <div className="mt-8">
            <Card className="p-6 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Análisis Especializado Completado</h2>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
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

              <div className="mb-6 p-4 bg-white rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Mecanismo Recomendado</h3>
                <p className="text-green-700">{analisisIA.mecanismoRecomendado}</p>
              </div>

              <Tabs defaultValue="recomendaciones" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
                  <TabsTrigger value="fundamentos">Fundamentos</TabsTrigger>
                  <TabsTrigger value="acciones">Acciones</TabsTrigger>
                  <TabsTrigger value="derechos">Derechos</TabsTrigger>
                  <TabsTrigger value="especialista">Especialista</TabsTrigger>
                </TabsList>

                <TabsContent value="recomendaciones" className="space-y-4">
                  <div className="space-y-3">
                    {analisisIA.recomendaciones.map((recomendacion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{recomendacion}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="fundamentos" className="space-y-4">
                  <div className="space-y-3">
                    {analisisIA.fundamentosLegales.map((fundamento, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                        <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
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

                <TabsContent value="derechos" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-3">Derechos Vulnerados</h4>
                      <div className="space-y-2">
                        {analisisIA.derechosVulnerados.map((derecho, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-gray-700">{derecho}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
                  </div>
                </TabsContent>

                <TabsContent value="especialista" className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {analisisIA.especialistaAsignado.nombre.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{analisisIA.especialistaAsignado.nombre}</h4>
                        <p className="text-sm text-green-600">{analisisIA.especialistaAsignado.especialidad}</p>
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
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
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

export default DefensoriaPueblo;
