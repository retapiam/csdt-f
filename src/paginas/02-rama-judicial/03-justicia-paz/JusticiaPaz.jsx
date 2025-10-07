import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Scale, 
  Shield, 
  Users, 
  FileText, 
  Brain,
  Clock,
  MapPin,
  Award,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Calendar,
  Download,
  Eye,
  Target,
  Gavel,
  Handshake,
  Lightbulb
} from 'lucide-react';

const JusticiaPaz = () => {
  const [formData, setFormData] = useState({
    tipoCaso: '',
    descripcionHechos: '',
    fechaHechos: '',
    ubicacion: '',
    victimas: '',
    victimarios: '',
    tipoViolencia: '',
    gravedad: '',
    estadoProceso: '',
    solicitudEspecifica: '',
    evidencias: '',
    testigos: ''
  });

  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Tipos de casos de justicia transicional
  const tiposCasos = [
    'Crímenes de lesa humanidad',
    'Crímenes de guerra',
    'Desaparición forzada',
    'Ejecuciones extrajudiciales',
    'Tortura',
    'Violencia sexual',
    'Reclutamiento de menores',
    'Desplazamiento forzado',
    'Masacres',
    'Secuestro',
    'Extorsión',
    'Otros crímenes del conflicto'
  ];

  // Tipos de violencia en el conflicto
  const tiposViolencia = [
    'Violencia física directa',
    'Violencia psicológica',
    'Violencia sexual',
    'Violencia económica',
    'Violencia política',
    'Violencia cultural',
    'Violencia estructural',
    'Violencia simbólica'
  ];

  // Niveles de gravedad
  const nivelesGravedad = [
    'Crítica',
    'Alta',
    'Media',
    'Baja'
  ];

  // Estados del proceso
  const estadosProceso = [
    'Inicial',
    'Investigación',
    'Imputación',
    'Acusación',
    'Juicio',
    'Sentencia',
    'Ejecución',
    'Finalizado'
  ];

  // Especialistas en justicia transicional
  const especialistasPaz = [
    {
      nombre: 'Dra. María Elena Restrepo',
      especialidad: 'Justicia Transicional',
      experiencia: '20 años',
      enfoque: 'Crímenes de lesa humanidad',
      casos: 156,
      tasaExito: '89%'
    },
    {
      nombre: 'Dr. Carlos Andrés López',
      especialidad: 'Derecho Penal Internacional',
      experiencia: '18 años',
      enfoque: 'Corte Penal Internacional',
      casos: 134,
      tasaExito: '92%'
    },
    {
      nombre: 'Dra. Ana Lucía Vargas',
      especialidad: 'Derechos de Víctimas',
      experiencia: '16 años',
      enfoque: 'Reparación integral',
      casos: 198,
      tasaExito: '87%'
    },
    {
      nombre: 'Dr. Roberto Silva',
      especialidad: 'Jurisdicción Especial para la Paz',
      experiencia: '12 años',
      enfoque: 'JEP y mecanismos alternativos',
      casos: 89,
      tasaExito: '94%'
    }
  ];

  // Mecanismos de justicia transicional
  const mecanismosJusticia = [
    {
      nombre: 'Jurisdicción Especial para la Paz (JEP)',
      descripcion: 'Mecanismo judicial para investigar y juzgar crímenes del conflicto armado',
      competencia: 'Crímenes de guerra, lesa humanidad, desaparición forzada',
      plazo: '15 años'
    },
    {
      nombre: 'Comisión de la Verdad',
      descripcion: 'Mecanismo extrajudicial para esclarecer la verdad sobre el conflicto',
      competencia: 'Reconstrucción de la verdad histórica',
      plazo: '3 años'
    },
    {
      nombre: 'Unidad de Búsqueda de Personas Desaparecidas',
      descripcion: 'Buscar personas desaparecidas en el marco del conflicto armado',
      competencia: 'Búsqueda, localización e identificación',
      plazo: '20 años'
    },
    {
      nombre: 'Mecanismo de Monitoreo y Verificación',
      descripcion: 'Verificar el cumplimiento de los acuerdos de paz',
      competencia: 'Monitoreo del proceso de paz',
      plazo: '10 años'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analizarCasoJusticiaPaz = async () => {
    setCargando(true);
    
    try {
      // Simulación de análisis con IA especializada en justicia transicional
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const analisis = {
        probabilidadExito: '78%',
        tiempoEstimado: '2-6 años',
        nivelUrgencia: 'ALTA',
        nivelConfianza: '91%',
        mecanismoRecomendado: 'Jurisdicción Especial para la Paz (JEP)',
        recomendaciones: [
          'Solicitar admisión a la JEP para obtener beneficios penales alternativos',
          'Presentar versión libre sobre los hechos en el marco del conflicto',
          'Solicitar medidas de reparación integral para las víctimas',
          'Participar en procesos de esclarecimiento de la verdad'
        ],
        fundamentosLegales: [
          'Acto Legislativo 01 de 2017 - Marco jurídico para la paz',
          'Ley 1820 de 2016 - Jurisdicción Especial para la Paz',
          'Decreto Ley 588 de 2017 - Procedimiento JEP',
          'Estatuto de Roma - Corte Penal Internacional',
          'Convenios de Ginebra - Derecho Internacional Humanitario',
          'Constitución Política - Artículo 22 (paz como derecho y deber)'
        ],
        accionesRecomendadas: [
          {
            accion: 'Admisión JEP',
            plazo: '30 días',
            probabilidad: '85%',
            descripcion: 'Solicitar admisión a la Jurisdicción Especial para la Paz'
          },
          {
            accion: 'Versión Libre',
            plazo: '60 días',
            probabilidad: '78%',
            descripcion: 'Presentar versión libre sobre los hechos'
          },
          {
            accion: 'Medidas Reparación',
            plazo: '90 días',
            probabilidad: '72%',
            descripcion: 'Solicitar medidas de reparación integral'
          },
          {
            accion: 'Participación Verdad',
            plazo: 'Inmediato',
            probabilidad: '88%',
            descripcion: 'Participar en procesos de esclarecimiento'
          }
        ],
        especialistaAsignado: especialistasPaz[0],
        codigoCaso: `JEP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        beneficiosPosibles: [
          'Suspensión condicional de la pena',
          'Pena alternativa',
          'Libertad condicional',
          'Reducción de pena',
          'Medidas de reparación'
        ],
        requisitos: [
          'Reconocimiento de responsabilidad',
          'Colaboración con la justicia',
          'Reparación a las víctimas',
          'No reincidencia',
          'Contribución a la verdad'
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
      titulo: 'Análisis Jurídico - Justicia Transicional',
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
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Justicia Transicional
              </h1>
              <p className="text-gray-600 mt-2">Especializado en Jurisdicción Especial para la Paz (JEP) y mecanismos de justicia transicional</p>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            <Shield className="h-4 w-4 mr-2" />
            Especializado en procesos de paz y reconciliación
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Consulta Especializada</h2>
              </div>

              <div className="space-y-6">
                {/* Tipo de Caso */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Caso
                  </label>
                  <Select onValueChange={(value) => handleInputChange('tipoCaso', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de caso" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCasos.map((tipo, index) => (
                        <SelectItem key={index} value={tipo}>
                          {tipo}
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
                    placeholder="Describe detalladamente los hechos ocurridos en el marco del conflicto armado, incluyendo fechas, lugares, personas involucradas y circunstancias específicas..."
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
                    placeholder="Municipio, departamento y lugar específico donde ocurrieron los hechos"
                    value={formData.ubicacion}
                    onChange={(e) => handleInputChange('ubicacion', e.target.value)}
                  />
                </div>

                {/* Víctimas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Información de las Víctimas
                  </label>
                  <Textarea
                    placeholder="Describe las víctimas afectadas: nombres, edades, parentesco, consecuencias sufridas..."
                    rows={3}
                    value={formData.victimas}
                    onChange={(e) => handleInputChange('victimas', e.target.value)}
                  />
                </div>

                {/* Victimarios */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Información de los Victimarios
                  </label>
                  <Textarea
                    placeholder="Describe los victimarios: grupo armado, rango, nombres conocidos, circunstancias..."
                    rows={3}
                    value={formData.victimarios}
                    onChange={(e) => handleInputChange('victimarios', e.target.value)}
                  />
                </div>

                {/* Tipo de Violencia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Violencia
                  </label>
                  <Select onValueChange={(value) => handleInputChange('tipoViolencia', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de violencia" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposViolencia.map((violencia, index) => (
                        <SelectItem key={index} value={violencia}>
                          {violencia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Gravedad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nivel de Gravedad
                  </label>
                  <Select onValueChange={(value) => handleInputChange('gravedad', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el nivel de gravedad" />
                    </SelectTrigger>
                    <SelectContent>
                      {nivelesGravedad.map((nivel, index) => (
                        <SelectItem key={index} value={nivel}>
                          {nivel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Estado del Proceso */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado Actual del Proceso
                  </label>
                  <Select onValueChange={(value) => handleInputChange('estadoProceso', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado del proceso" />
                    </SelectTrigger>
                    <SelectContent>
                      {estadosProceso.map((estado, index) => (
                        <SelectItem key={index} value={estado}>
                          {estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Evidencias */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Evidencias Disponibles
                  </label>
                  <Textarea
                    placeholder="Describe las evidencias disponibles: documentos, testimonios, pruebas físicas, etc..."
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

                {/* Solicitud Específica */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solicitud Específica
                  </label>
                  <Textarea
                    placeholder="¿Qué específicamente solicitas? (admisión JEP, medidas de reparación, esclarecimiento de verdad, etc.)"
                    rows={3}
                    value={formData.solicitudEspecifica}
                    onChange={(e) => handleInputChange('solicitudEspecifica', e.target.value)}
                  />
                </div>

                {/* Botón de Análisis */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={analizarCasoJusticiaPaz}
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
                        Analizar Caso con IA Justicia Transicional
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Mecanismos de Justicia */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Mecanismos de Justicia</h3>
              </div>
              
              <div className="space-y-3">
                {mecanismosJusticia.map((mecanismo, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900">{mecanismo.nombre}</h4>
                    <p className="text-sm text-green-700 mb-2">{mecanismo.descripcion}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-green-600">Competencia:</span>
                        <span className="text-green-800">{mecanismo.competencia}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Plazo:</span>
                        <span className="text-green-800">{mecanismo.plazo}</span>
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
                {especialistasPaz.map((especialista, index) => (
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
                  <span className="text-gray-700">Acto Legislativo 01/2017</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 1820/2016 - JEP</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Estatuto de Roma</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Convenios de Ginebra</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Constitución Art. 22</span>
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
                  <TabsTrigger value="beneficios">Beneficios</TabsTrigger>
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

                <TabsContent value="beneficios" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3">Beneficios Posibles</h4>
                      <div className="space-y-2">
                        {analisisIA.beneficiosPosibles.map((beneficio, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-700">{beneficio}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-3">Requisitos</h4>
                      <div className="space-y-2">
                        {analisisIA.requisitos.map((requisito, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-orange-600" />
                            <span className="text-sm text-gray-700">{requisito}</span>
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

export default JusticiaPaz;
