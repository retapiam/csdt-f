import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Building, 
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
  Building2,
  Globe,
  Shield,
  Gavel,
  TrendingUp,
  Lightbulb,
  Vote
} from 'lucide-react';

const CongresoRepublica = () => {
  const [formData, setFormData] = useState({
    tipoPeticion: '',
    camaraResponsable: '',
    comisionResponsable: '',
    descripcionPeticion: '',
    fechaHechos: '',
    ubicacion: '',
    derechoAfectado: '',
    personasAfectadas: '',
    evidencias: '',
    testigos: '',
    datosPeticionario: '',
    solicitudEspecifica: '',
    urgencia: ''
  });

  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Tipos de peticiones al Congreso
  const tiposPeticiones = [
    'Petición de información',
    'Solicitud de control político',
    'Queja por violación de derechos',
    'Solicitud de proyecto de ley',
    'Denuncia por irregularidades',
    'Solicitud de citación',
    'Petición de intervención',
    'Solicitud de audiencia pública',
    'Queja por corrupción',
    'Solicitud de seguimiento',
    'Petición de rendición de cuentas',
    'Otros'
  ];

  // Cámaras del Congreso
  const camarasCongreso = [
    'Senado de la República',
    'Cámara de Representantes',
    'Congreso de la República (ambas cámaras)',
    'Comisiones Conjuntas'
  ];

  // Comisiones principales
  const comisionesPrincipales = [
    'Comisión Primera - Asuntos Constitucionales',
    'Comisión Segunda - Política Exterior',
    'Comisión Tercera - Hacienda y Crédito Público',
    'Comisión Cuarta - Presupuesto',
    'Comisión Quinta - Agricultura y Medio Ambiente',
    'Comisión Sexta - Comunicaciones',
    'Comisión Séptima - Salud y Seguridad Social',
    'Comisión de Ética y Estatuto del Congresista',
    'Comisión de Seguimiento a las Decisiones',
    'Comisión Accidental de Paz',
    'Comisión Legal para la Equidad de la Mujer',
    'Otras comisiones'
  ];

  // Derechos que pueden ser afectados
  const derechosAfectados = [
    'Derecho a la participación política',
    'Derecho a la información',
    'Derecho a la igualdad',
    'Derecho a la salud',
    'Derecho a la educación',
    'Derecho al trabajo',
    'Derecho a la vivienda',
    'Derecho a un ambiente sano',
    'Derecho a la libertad de expresión',
    'Derecho de petición',
    'Derecho de reunión y manifestación',
    'Derecho a la participación',
    'Derecho a la justicia',
    'Derecho a la seguridad',
    'Otros'
  ];

  // Especialistas en derecho legislativo
  const especialistasCongreso = [
    {
      nombre: 'Dra. María Elena Restrepo',
      especialidad: 'Derecho Legislativo',
      experiencia: '28 años',
      enfoque: 'Procedimientos legislativos',
      casos: 523,
      tasaExito: '97%'
    },
    {
      nombre: 'Dr. Carlos Andrés López',
      especialidad: 'Derecho Constitucional',
      experiencia: '25 años',
      enfoque: 'Control constitucional',
      casos: 445,
      tasaExito: '95%'
    },
    {
      nombre: 'Dra. Ana Lucía Vargas',
      especialidad: 'Derechos Humanos',
      experiencia: '23 años',
      enfoque: 'Protección de derechos',
      casos: 378,
      tasaExito: '94%'
    },
    {
      nombre: 'Dr. Roberto Silva',
      especialidad: 'Derecho Público',
      experiencia: '21 años',
      enfoque: 'Administración pública',
      casos: 356,
      tasaExito: '96%'
    }
  ];

  // Mecanismos de control
  const mecanismosControl = [
    {
      nombre: 'Control Político',
      descripcion: 'Control sobre el gobierno y la administración pública',
      plazo: '30 días',
      competencia: 'Rendición de cuentas'
    },
    {
      nombre: 'Citación',
      descripcion: 'Citación de funcionarios para rendir cuentas',
      plazo: '15 días',
      competencia: 'Funcionarios públicos'
    },
    {
      nombre: 'Audiencia Pública',
      descripcion: 'Audiencia para tratar temas de interés público',
      plazo: '45 días',
      competencia: 'Temas de interés general'
    },
    {
      nombre: 'Seguimiento',
      descripcion: 'Seguimiento a decisiones y compromisos',
      plazo: 'Permanente',
      competencia: 'Cumplimiento de acuerdos'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analizarCasoCongreso = async () => {
    setCargando(true);
    
    try {
      // Simulación de análisis con IA especializada en derecho legislativo
      await new Promise(resolve => setTimeout(resolve, 3800));
      
      const analisis = {
        probabilidadExito: '93%',
        tiempoEstimado: '30-90 días',
        nivelUrgencia: 'ALTA',
        nivelConfianza: '97%',
        mecanismoRecomendado: 'Control Político',
        recomendaciones: [
          'Presentar petición formal ante la Comisión competente',
          'Solicitar control político sobre el tema',
          'Proporcionar todas las evidencias disponibles',
          'Solicitar seguimiento y respuesta oportuna'
        ],
        fundamentosLegales: [
          'Constitución Política - Artículo 114 (control político)',
          'Ley 5 de 1992 - Reglamento del Congreso',
          'Ley 1437 de 2011 - Código de Procedimiento Administrativo',
          'Ley 1755 de 2015 - Procedimiento legislativo',
          'Ley 1712 de 2014 - Transparencia y Acceso a la Información',
          'Decreto 1081 de 2015 - Reglamento del Congreso'
        ],
        accionesRecomendadas: [
          {
            accion: 'Petición Formal',
            plazo: 'Inmediato',
            probabilidad: '99%',
            descripcion: 'Presentar petición ante el Congreso'
          },
          {
            accion: 'Control Político',
            plazo: '30 días',
            probabilidad: '88%',
            descripcion: 'Solicitar control político'
          },
          {
            accion: 'Citación',
            plazo: '15 días',
            probabilidad: '82%',
            descripcion: 'Solicitar citación de funcionarios'
          },
          {
            accion: 'Seguimiento',
            plazo: 'Permanente',
            probabilidad: '95%',
            descripcion: 'Seguimiento del proceso'
          }
        ],
        especialistaAsignado: especialistasCongreso[0],
        codigoCaso: `CONG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        derechosAfectados: [
          'Derecho a la participación política',
          'Derecho de petición',
          'Derecho a la información',
          'Derecho a la participación'
        ],
        medidasProteccion: [
          'Respuesta oportuna a la petición',
          'Control político efectivo',
          'Transparencia en el proceso',
          'Garantías de participación',
          'Protección de derechos fundamentales'
        ],
        canalesAtencion: [
          'Secretaría General del Senado',
          'Secretaría General de la Cámara',
          'Comisiones del Congreso',
          'Ventanilla única',
          'Portal web del Congreso'
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
      titulo: 'Análisis Jurídico - Congreso de la República',
      codigoCaso: analisisIA.codigoCaso,
      fecha: new Date().toLocaleDateString('es-CO'),
      datosCaso: formData,
      analisis: analisisIA,
      especialista: analisisIA.especialistaAsignado
    };
    
    console.log('Generando PDF:', pdfContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white">
              <Building className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Congreso de la República
              </h1>
              <p className="text-gray-600 mt-2">Poder legislativo y control político del Estado</p>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
            <Shield className="h-4 w-4 mr-2" />
            Especializado en derecho legislativo y control político
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Petición al Congreso</h2>
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

                {/* Cámara Responsable */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cámara Responsable
                  </label>
                  <Select onValueChange={(value) => handleInputChange('camaraResponsable', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la cámara responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      {camarasCongreso.map((camara, index) => (
                        <SelectItem key={index} value={camara}>
                          {camara}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Comisión Responsable */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comisión Responsable
                  </label>
                  <Select onValueChange={(value) => handleInputChange('comisionResponsable', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la comisión responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      {comisionesPrincipales.map((comision, index) => (
                        <SelectItem key={index} value={comision}>
                          {comision}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Descripción de la Petición */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción Detallada de la Petición
                  </label>
                  <Textarea
                    placeholder="Describe detalladamente tu petición, incluyendo fechas, lugares, personas involucradas y circunstancias específicas..."
                    rows={5}
                    value={formData.descripcionPeticion}
                    onChange={(e) => handleInputChange('descripcionPeticion', e.target.value)}
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

                {/* Derecho Afectado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Derecho Fundamental Afectado
                  </label>
                  <Select onValueChange={(value) => handleInputChange('derechoAfectado', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el derecho afectado" />
                    </SelectTrigger>
                    <SelectContent>
                      {derechosAfectados.map((derecho, index) => (
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
                    value={formData.personasAfectadas}
                    onChange={(e) => handleInputChange('personasAfectadas', e.target.value)}
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
                      <SelectItem value="critica">Crítica - Requiere atención inmediata</SelectItem>
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
                    placeholder="¿Qué específicamente solicitas? (control político, citación, audiencia, etc.)"
                    rows={3}
                    value={formData.solicitudEspecifica}
                    onChange={(e) => handleInputChange('solicitudEspecifica', e.target.value)}
                  />
                </div>

                {/* Botón de Análisis */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={analizarCasoCongreso}
                    disabled={cargando || !formData.descripcionPeticion}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {cargando ? (
                      <>
                        <Brain className="h-5 w-5 mr-2 animate-spin" />
                        Analizando con IA Especializada...
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Analizar Petición con IA Congreso
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Mecanismos de Control */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Mecanismos de Control</h3>
              </div>
              
              <div className="space-y-3">
                {mecanismosControl.map((mecanismo, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900">{mecanismo.nombre}</h4>
                    <p className="text-sm text-purple-700 mb-2">{mecanismo.descripcion}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-purple-600">Plazo:</span>
                        <span className="text-purple-800">{mecanismo.plazo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-600">Competencia:</span>
                        <span className="text-purple-800">{mecanismo.competencia}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Especialistas */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Especialistas</h3>
              </div>
              
              <div className="space-y-3">
                {especialistasCongreso.map((especialista, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900">{especialista.nombre}</h4>
                    <p className="text-sm text-purple-700">{especialista.especialidad}</p>
                    <p className="text-xs text-purple-600">{especialista.experiencia} • {especialista.casos} casos</p>
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
                <BookOpen className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Marco Legal</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Constitución Art. 114 - Control político</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 5/1992 - Reglamento Congreso</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 1437/2011 - Procedimiento</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 1755/2015 - Legislativo</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 1712/2014 - Transparencia</span>
                </div>
              </div>
            </Card>

            {/* Información de Contacto */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">Contacto</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-purple-600" />
                  <span>Línea 195</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple-600" />
                  <span>contactenos@congreso.gov.co</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-purple-600" />
                  <span>Capitolio Nacional, Bogotá</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span>Lun-Vie 8:00-17:00</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Resultados del Análisis */}
        {analisisIA && (
          <div className="mt-8">
            <Card className="p-6 shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Análisis Especializado Completado</h2>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
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

              <div className="mb-6 p-4 bg-white rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Mecanismo Recomendado</h3>
                <p className="text-purple-700">{analisisIA.mecanismoRecomendado}</p>
              </div>

              <Tabs defaultValue="recomendaciones" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
                  <TabsTrigger value="fundamentos">Fundamentos</TabsTrigger>
                  <TabsTrigger value="acciones">Acciones</TabsTrigger>
                  <TabsTrigger value="canales">Canales</TabsTrigger>
                  <TabsTrigger value="especialista">Especialista</TabsTrigger>
                </TabsList>

                <TabsContent value="recomendaciones" className="space-y-4">
                  <div className="space-y-3">
                    {analisisIA.recomendaciones.map((recomendacion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{recomendacion}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="fundamentos" className="space-y-4">
                  <div className="space-y-3">
                    {analisisIA.fundamentosLegales.map((fundamento, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
                        <BookOpen className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
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

                <TabsContent value="canales" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3">Canales de Atención</h4>
                      <div className="space-y-2">
                        {analisisIA.canalesAtencion.map((canal, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-gray-700">{canal}</span>
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
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {analisisIA.especialistaAsignado.nombre.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{analisisIA.especialistaAsignado.nombre}</h4>
                        <p className="text-sm text-purple-600">{analisisIA.especialistaAsignado.especialidad}</p>
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
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
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

export default CongresoRepublica;
