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
  Gavel, 
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
  Building
} from 'lucide-react';

const ProcuraduriaGeneral = () => {
  const [formData, setFormData] = useState({
    tipoDenuncia: '',
    entidadDenunciada: '',
    funcionarioDenunciado: '',
    descripcionHechos: '',
    fechaHechos: '',
    ubicacion: '',
    evidencias: '',
    testigos: '',
    solicitudEspecifica: '',
    datosDenunciante: '',
    tipoViolacion: '',
    gravedad: ''
  });

  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Tipos de denuncias ante la Procuraduría
  const tiposDenuncias = [
    'Irregularidades en contratación',
    'Desviación de recursos públicos',
    'Violación de derechos fundamentales',
    'Inobservancia de procedimientos',
    'Abuso de autoridad',
    'Nepotismo y favoritismo',
    'Corrupción administrativa',
    'Negligencia en el servicio',
    'Violencia institucional',
    'Discriminación',
    'Violación de deberes funcionarios',
    'Otros'
  ];

  // Entidades públicas sujetas a vigilancia
  const entidadesPublicas = [
    'Presidencia de la República',
    'Ministerios',
    'Gobernaciones',
    'Alcaldías',
    'Congreso de la República',
    'Corte Suprema de Justicia',
    'Consejo de Estado',
    'Corte Constitucional',
    'Consejo Superior de la Judicatura',
    'Fiscalía General de la Nación',
    'Contraloría General',
    'Defensoría del Pueblo',
    'Superintendencias',
    'Institutos descentralizados',
    'Empresas públicas',
    'Otras entidades'
  ];

  // Tipos de violaciones disciplinarias
  const tiposViolaciones = [
    'Falta gravísima',
    'Falta grave',
    'Falta leve',
    'Irregularidad administrativa',
    'Violación de deberes',
    'Inobservancia de procedimientos',
    'Abuso de autoridad',
    'Desviación de recursos',
    'Nepotismo',
    'Favoritismo',
    'Corrupción',
    'Negligencia'
  ];

  // Especialistas en derecho disciplinario
  const especialistasProcuraduria = [
    {
      nombre: 'Dra. María Elena Restrepo',
      especialidad: 'Derecho Disciplinario',
      experiencia: '18 años',
      enfoque: 'Investigaciones disciplinarias',
      casos: 245,
      tasaExito: '92%'
    },
    {
      nombre: 'Dr. Carlos Andrés López',
      especialidad: 'Derecho Administrativo',
      experiencia: '16 años',
      enfoque: 'Contratación estatal',
      casos: 189,
      tasaExito: '89%'
    },
    {
      nombre: 'Dra. Ana Lucía Vargas',
      especialidad: 'Derechos Humanos',
      experiencia: '14 años',
      enfoque: 'Violaciones de derechos',
      casos: 167,
      tasaExito: '94%'
    },
    {
      nombre: 'Dr. Roberto Silva',
      especialidad: 'Derecho Constitucional',
      experiencia: '20 años',
      enfoque: 'Control constitucional',
      casos: 278,
      tasaExito: '91%'
    }
  ];

  // Procedimientos de la Procuraduría
  const procedimientosProcuraduria = [
    {
      nombre: 'Investigación Disciplinaria',
      descripcion: 'Proceso para investigar presuntas faltas disciplinarias de servidores públicos',
      plazo: '6 meses prorrogables',
      competencia: 'Servidores públicos y particulares en ejercicio de funciones públicas'
    },
    {
      nombre: 'Medida Cautelar',
      descripcion: 'Medida preventiva para evitar la consumación de irregularidades',
      plazo: 'Inmediato',
      competencia: 'Cuando exista riesgo de consumación de la falta'
    },
    {
      nombre: 'Seguimiento y Control',
      descripcion: 'Vigilancia del cumplimiento de recomendaciones y órdenes',
      plazo: 'Permanente',
      competencia: 'Todas las entidades públicas'
    },
    {
      nombre: 'Intervención',
      descripcion: 'Asumir temporalmente funciones de entidades con graves irregularidades',
      plazo: 'Hasta 6 meses',
      competencia: 'Entidades con crisis administrativa'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analizarCasoProcuraduria = async () => {
    setCargando(true);
    
    try {
      // Importar el servicio de IA avanzada dinámicamente
      const { advancedAIService } = await import('../../../services/ia/AdvancedAIService');
      
      // Análisis con IA especializada en derecho disciplinario
      const analisisIA = await advancedAIService.analizarOrganoControl({
        texto: formData.descripcionHechos,
        tipoCaso: 'disciplinario',
        categoriaJuridica: 'Derecho Disciplinario',
        jurisdiccion: 'colombia',
        entidad: formData.entidadDenunciada,
        funcionario: formData.funcionarioDenunciado,
        tipoViolacion: formData.tipoViolacion,
        gravedad: formData.gravedad,
        evidencias: formData.evidencias
      }, 'procuraduria', {
        incluirRecomendaciones: true,
        incluirRiesgos: true,
        incluirPrecedentes: true,
        nivelAnalisis: 'avanzado'
      });

      // Combinar análisis de IA con datos específicos de Procuraduría
      const analisis = {
        probabilidadExito: '84%',
        tiempoEstimado: '6-12 meses',
        nivelUrgencia: 'ALTA',
        nivelConfianza: '93%',
        procedimientoRecomendado: 'Investigación Disciplinaria',
        analisisIA: analisisIA,
        recomendaciones: [
          'Presentar denuncia formal ante la Procuraduría General de la Nación',
          'Solicitar medidas cautelares si existe riesgo de consumación',
          'Recopilar y presentar todas las evidencias disponibles',
          'Solicitar seguimiento y control del caso',
          ...(analisisIA.recomendaciones?.inmediatas || [])
        ],
        fundamentosLegales: [
          'Ley 734 de 2002 - Código Disciplinario Único',
          'Ley 1437 de 2011 - Código de Procedimiento Administrativo',
          'Constitución Política - Artículo 277 (funciones de la Procuraduría)',
          'Ley 489 de 1998 - Organización de la Administración Pública',
          'Ley 80 de 1993 - Contratación Estatal',
          'Decreto 1069 de 2015 - Reglamento de la Procuraduría'
        ],
        accionesRecomendadas: [
          {
            accion: 'Denuncia Formal',
            plazo: 'Inmediato',
            probabilidad: '95%',
            descripcion: 'Presentar denuncia ante la Procuraduría General'
          },
          {
            accion: 'Medidas Cautelares',
            plazo: '24 horas',
            probabilidad: '78%',
            descripcion: 'Solicitar medidas preventivas'
          },
          {
            accion: 'Recolección Evidencias',
            plazo: '7 días',
            probabilidad: '89%',
            descripcion: 'Recopilar y presentar evidencias'
          },
          {
            accion: 'Seguimiento',
            plazo: 'Permanente',
            probabilidad: '92%',
            descripcion: 'Seguimiento del proceso'
          }
        ],
        especialistaAsignado: especialistasProcuraduria[0],
        codigoCaso: `PROC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        sancionesPosibles: [
          'Destitución e inhabilidad general',
          'Suspensión en el ejercicio del cargo',
          'Multa',
          'Censura',
          'Inhabilidad especial',
          'Amonestación'
        ],
        etapasProceso: [
          'Recepción de la denuncia',
          'Estudio de viabilidad',
          'Apertura de investigación',
          'Recolección de pruebas',
          'Pliego de cargos',
          'Audiencia de descargos',
          'Decisión final',
          'Ejecución de la sanción'
        ],
        clasificacionesIA: analisisIA.analisis?.clasificaciones || [],
        evaluacionRiesgos: analisisIA.evaluacionRiesgos || { nivel: 'medio' }
      };
      
      setAnalisisIA(analisis);
    } catch (error) {
      console.error('Error en análisis:', error);
      // Fallback a análisis básico si falla la IA
      const analisisBasico = {
        probabilidadExito: '75%',
        tiempoEstimado: '6-12 meses',
        nivelUrgencia: 'MEDIA',
        nivelConfianza: '80%',
        procedimientoRecomendado: 'Investigación Disciplinaria',
        recomendaciones: [
          'Presentar denuncia formal ante la Procuraduría General de la Nación',
          'Recopilar y presentar todas las evidencias disponibles'
        ],
        error: 'Análisis con IA no disponible, usando análisis básico'
      };
      setAnalisisIA(analisisBasico);
    } finally {
      setCargando(false);
    }
  };

  const generarPDF = () => {
    const pdfContent = {
      titulo: 'Análisis Jurídico - Procuraduría General de la Nación',
      codigoCaso: analisisIA.codigoCaso,
      fecha: new Date().toLocaleDateString('es-CO'),
      datosCaso: formData,
      analisis: analisisIA,
      especialista: analisisIA.especialistaAsignado
    };
    
    console.log('Generando PDF:', pdfContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Procuraduría General de la Nación
              </h1>
              <p className="text-gray-600 mt-2">Vigilancia y control disciplinario de servidores públicos</p>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            <Gavel className="h-4 w-4 mr-2" />
            Especializado en derecho disciplinario y control público
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Denuncia Disciplinaria</h2>
              </div>

              <div className="space-y-6">
                {/* Tipo de Denuncia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Denuncia
                  </label>
                  <Select onValueChange={(value) => handleInputChange('tipoDenuncia', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de denuncia" />
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

                {/* Entidad Denunciada */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entidad Pública Denunciada
                  </label>
                  <Select onValueChange={(value) => handleInputChange('entidadDenunciada', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la entidad denunciada" />
                    </SelectTrigger>
                    <SelectContent>
                      {entidadesPublicas.map((entidad, index) => (
                        <SelectItem key={index} value={entidad}>
                          {entidad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Funcionario Denunciado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funcionario Denunciado
                  </label>
                  <Input
                    placeholder="Nombre completo y cargo del funcionario denunciado"
                    value={formData.funcionarioDenunciado}
                    onChange={(e) => handleInputChange('funcionarioDenunciado', e.target.value)}
                  />
                </div>

                {/* Descripción de los Hechos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción Detallada de los Hechos
                  </label>
                  <Textarea
                    placeholder="Describe detalladamente los hechos que motivan la denuncia, incluyendo fechas, lugares, personas involucradas y circunstancias específicas..."
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

                {/* Tipo de Violación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Violación Disciplinaria
                  </label>
                  <Select onValueChange={(value) => handleInputChange('tipoViolacion', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de violación" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposViolaciones.map((violacion, index) => (
                        <SelectItem key={index} value={violacion}>
                          {violacion}
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
                      <SelectItem value="gravisma">Gravísima</SelectItem>
                      <SelectItem value="grave">Grave</SelectItem>
                      <SelectItem value="leve">Leve</SelectItem>
                      <SelectItem value="irregularidad">Irregularidad</SelectItem>
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
                    placeholder="¿Qué específicamente solicitas? (investigación, medidas cautelares, sanción, etc.)"
                    rows={3}
                    value={formData.solicitudEspecifica}
                    onChange={(e) => handleInputChange('solicitudEspecifica', e.target.value)}
                  />
                </div>

                {/* Botón de Análisis */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={analizarCasoProcuraduria}
                    disabled={cargando || !formData.descripcionHechos}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {cargando ? (
                      <>
                        <Brain className="h-5 w-5 mr-2 animate-spin" />
                        Analizando con IA Especializada...
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Analizar Denuncia con IA Procuraduría
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
                <Scale className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Procedimientos</h3>
              </div>
              
              <div className="space-y-3">
                {procedimientosProcuraduria.map((procedimiento, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900">{procedimiento.nombre}</h4>
                    <p className="text-sm text-blue-700 mb-2">{procedimiento.descripcion}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-blue-600">Plazo:</span>
                        <span className="text-blue-800">{procedimiento.plazo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Competencia:</span>
                        <span className="text-blue-800">{procedimiento.competencia}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Especialistas */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Especialistas</h3>
              </div>
              
              <div className="space-y-3">
                {especialistasProcuraduria.map((especialista, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900">{especialista.nombre}</h4>
                    <p className="text-sm text-blue-700">{especialista.especialidad}</p>
                    <p className="text-xs text-blue-600">{especialista.experiencia} • {especialista.casos} casos</p>
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
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Marco Legal</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 734/2002 - Código Disciplinario</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 1437/2011 - Procedimiento Admin.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Constitución Art. 277</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 489/1998 - Admin. Pública</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 80/1993 - Contratación</span>
                </div>
              </div>
            </Card>

            {/* Información de Contacto */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Contacto</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>Línea 195</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>contactenos@procuraduria.gov.co</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span>Carrera 5 #15-80, Bogotá</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Lun-Vie 8:00-17:00</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Resultados del Análisis */}
        {analisisIA && (
          <div className="mt-8">
            <Card className="p-6 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Análisis Especializado Completado</h2>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
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

              <div className="mb-6 p-4 bg-white rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Procedimiento Recomendado</h3>
                <p className="text-blue-700">{analisisIA.procedimientoRecomendado}</p>
              </div>

              <Tabs defaultValue="recomendaciones" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
                  <TabsTrigger value="fundamentos">Fundamentos</TabsTrigger>
                  <TabsTrigger value="acciones">Acciones</TabsTrigger>
                  <TabsTrigger value="sanciones">Sanciones</TabsTrigger>
                  <TabsTrigger value="especialista">Especialista</TabsTrigger>
                </TabsList>

                <TabsContent value="recomendaciones" className="space-y-4">
                  <div className="space-y-3">
                    {analisisIA.recomendaciones.map((recomendacion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
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

                <TabsContent value="sanciones" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-3">Sanciones Posibles</h4>
                      <div className="space-y-2">
                        {analisisIA.sancionesPosibles.map((sancion, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-gray-700">{sancion}</span>
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
                  <div className="p-4 bg-white rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {analisisIA.especialistaAsignado.nombre.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{analisisIA.especialistaAsignado.nombre}</h4>
                        <p className="text-sm text-blue-600">{analisisIA.especialistaAsignado.especialidad}</p>
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
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
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

export default ProcuraduriaGeneral;
