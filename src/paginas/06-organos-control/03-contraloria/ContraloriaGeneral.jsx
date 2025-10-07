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
  Calculator, 
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
  DollarSign,
  TrendingDown,
  AlertCircle
} from 'lucide-react';

const ContraloriaGeneral = () => {
  const [formData, setFormData] = useState({
    tipoDenuncia: '',
    entidadAuditada: '',
    funcionarioResponsable: '',
    descripcionIrregularidad: '',
    fechaHechos: '',
    ubicacion: '',
    montoInvolucrado: '',
    tipoIrregularidad: '',
    evidencias: '',
    testigos: '',
    datosDenunciante: '',
    solicitudEspecifica: '',
    gravedad: ''
  });

  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Tipos de denuncias ante la Contraloría
  const tiposDenuncias = [
    'Desviación de recursos públicos',
    'Sobrecostos en contratación',
    'Irregularidades en contratación',
    'Mala inversión de recursos',
    'Falta de control interno',
    'Negligencia en la gestión',
    'Corrupción administrativa',
    'Pérdida de bienes públicos',
    'Uso indebido de recursos',
    'Falta de rendición de cuentas',
    'Irregularidades en ejecución presupuestal',
    'Otros'
  ];

  // Entidades sujetas a fiscalización
  const entidadesFiscalizadas = [
    'Presidencia de la República',
    'Ministerios',
    'Gobernaciones',
    'Alcaldías',
    'Congreso de la República',
    'Corte Suprema de Justicia',
    'Consejo de Estado',
    'Corte Constitucional',
    'Fiscalía General de la Nación',
    'Procuraduría General',
    'Defensoría del Pueblo',
    'Superintendencias',
    'Institutos descentralizados',
    'Empresas públicas',
    'Entidades territoriales',
    'Otras entidades'
  ];

  // Tipos de irregularidades
  const tiposIrregularidades = [
    'Irregularidad gravísima',
    'Irregularidad grave',
    'Irregularidad leve',
    'Falta de control interno',
    'Negligencia',
    'Mala gestión',
    'Desviación de recursos',
    'Sobrecostos',
    'Pérdida de bienes',
    'Uso indebido'
  ];

  // Especialistas en fiscalización
  const especialistasContraloria = [
    {
      nombre: 'Dra. María Elena Restrepo',
      especialidad: 'Auditoría Gubernamental',
      experiencia: '22 años',
      enfoque: 'Fiscalización de entidades públicas',
      casos: 312,
      tasaExito: '94%'
    },
    {
      nombre: 'Dr. Carlos Andrés López',
      especialidad: 'Contratación Estatal',
      experiencia: '19 años',
      enfoque: 'Auditoría de contratos',
      casos: 267,
      tasaExito: '91%'
    },
    {
      nombre: 'Dra. Ana Lucía Vargas',
      especialidad: 'Presupuesto Público',
      experiencia: '17 años',
      enfoque: 'Fiscalización presupuestal',
      casos: 198,
      tasaExito: '93%'
    },
    {
      nombre: 'Dr. Roberto Silva',
      especialidad: 'Control Fiscal',
      experiencia: '20 años',
      enfoque: 'Control y vigilancia',
      casos: 245,
      tasaExito: '92%'
    }
  ];

  // Procedimientos de fiscalización
  const procedimientosContraloria = [
    {
      nombre: 'Auditoría Gubernamental',
      descripcion: 'Examen sistemático de la gestión de recursos públicos',
      plazo: '6 meses',
      competencia: 'Todas las entidades públicas'
    },
    {
      nombre: 'Auditoría Especial',
      descripcion: 'Auditoría específica por denuncia o riesgo',
      plazo: '4 meses',
      competencia: 'Casos de alto riesgo o denuncias'
    },
    {
      nombre: 'Auditoría de Cumplimiento',
      descripcion: 'Verificación del cumplimiento de normas',
      plazo: '3 meses',
      competencia: 'Cumplimiento normativo'
    },
    {
      nombre: 'Auditoría de Gestión',
      descripcion: 'Evaluación de eficiencia y eficacia',
      plazo: '5 meses',
      competencia: 'Gestión y resultados'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analizarCasoContraloria = async () => {
    setCargando(true);
    
    try {
      // Simulación de análisis con IA especializada en fiscalización
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const analisis = {
        probabilidadExito: '87%',
        tiempoEstimado: '4-8 meses',
        nivelUrgencia: 'ALTA',
        nivelConfianza: '94%',
        procedimientoRecomendado: 'Auditoría Especial',
        recomendaciones: [
          'Presentar denuncia formal ante la Contraloría General',
          'Solicitar auditoría especial por irregularidades',
          'Proporcionar todas las evidencias disponibles',
          'Solicitar seguimiento y control del caso'
        ],
        fundamentosLegales: [
          'Ley 42 de 1993 - Contraloría General de la República',
          'Ley 87 de 1993 - Control Interno',
          'Ley 80 de 1993 - Contratación Estatal',
          'Ley 1150 de 2007 - Reforma Contratación',
          'Constitución Política - Artículo 267 (función de control)',
          'Decreto 1599 de 2005 - Reglamento Contraloría'
        ],
        accionesRecomendadas: [
          {
            accion: 'Denuncia Formal',
            plazo: 'Inmediato',
            probabilidad: '95%',
            descripcion: 'Presentar denuncia ante la Contraloría'
          },
          {
            accion: 'Auditoría Especial',
            plazo: '30 días',
            probabilidad: '82%',
            descripcion: 'Solicitar auditoría especial'
          },
          {
            accion: 'Recolección Evidencias',
            plazo: '15 días',
            probabilidad: '89%',
            descripcion: 'Recopilar y presentar evidencias'
          },
          {
            accion: 'Seguimiento',
            plazo: 'Permanente',
            probabilidad: '93%',
            descripcion: 'Seguimiento del proceso'
          }
        ],
        especialistaAsignado: especialistasContraloria[0],
        codigoCaso: `CONT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        sancionesPosibles: [
          'Responsabilidad fiscal',
          'Multa hasta 200 SMMLV',
          'Inhabilitación para contratar',
          'Pérdida de investidura',
          'Declaratoria de insubsistencia',
          'Devolución de recursos'
        ],
        etapasProceso: [
          'Recepción de la denuncia',
          'Análisis de viabilidad',
          'Apertura de auditoría',
          'Recolección de pruebas',
          'Informe de auditoría',
          'Audiencia de descargos',
          'Resolución final',
          'Ejecución de la sanción'
        ],
        impactoEconomico: {
          montoEstimado: '$2,500,000,000 COP',
          recursosRecuperables: '$1,800,000,000 COP',
          porcentajeRecuperacion: '72%'
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
      titulo: 'Análisis Jurídico - Contraloría General de la República',
      codigoCaso: analisisIA.codigoCaso,
      fecha: new Date().toLocaleDateString('es-CO'),
      datosCaso: formData,
      analisis: analisisIA,
      especialista: analisisIA.especialistaAsignado
    };
    
    console.log('Generando PDF:', pdfContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-white">
              <Calculator className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Contraloría General de la República
              </h1>
              <p className="text-gray-600 mt-2">Fiscalización y control de la gestión fiscal de las entidades públicas</p>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
            <Shield className="h-4 w-4 mr-2" />
            Especializado en fiscalización y control fiscal
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Denuncia Fiscal</h2>
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

                {/* Entidad Auditada */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entidad Pública Auditada
                  </label>
                  <Select onValueChange={(value) => handleInputChange('entidadAuditada', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la entidad auditada" />
                    </SelectTrigger>
                    <SelectContent>
                      {entidadesFiscalizadas.map((entidad, index) => (
                        <SelectItem key={index} value={entidad}>
                          {entidad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Funcionario Responsable */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funcionario Responsable
                  </label>
                  <Input
                    placeholder="Nombre completo y cargo del funcionario responsable"
                    value={formData.funcionarioResponsable}
                    onChange={(e) => handleInputChange('funcionarioResponsable', e.target.value)}
                  />
                </div>

                {/* Descripción de la Irregularidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción Detallada de la Irregularidad
                  </label>
                  <Textarea
                    placeholder="Describe detalladamente la irregularidad fiscal, incluyendo fechas, montos, procedimientos, personas involucradas y circunstancias específicas..."
                    rows={5}
                    value={formData.descripcionIrregularidad}
                    onChange={(e) => handleInputChange('descripcionIrregularidad', e.target.value)}
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

                {/* Monto Involucrado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monto Involucrado (COP)
                  </label>
                  <Input
                    type="number"
                    placeholder="Monto en pesos colombianos"
                    value={formData.montoInvolucrado}
                    onChange={(e) => handleInputChange('montoInvolucrado', e.target.value)}
                  />
                </div>

                {/* Tipo de Irregularidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Irregularidad
                  </label>
                  <Select onValueChange={(value) => handleInputChange('tipoIrregularidad', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de irregularidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposIrregularidades.map((irregularidad, index) => (
                        <SelectItem key={index} value={irregularidad}>
                          {irregularidad}
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
                    placeholder="Describe las evidencias disponibles: documentos, facturas, contratos, testigos, etc..."
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
                    placeholder="¿Qué específicamente solicitas? (auditoría, investigación, sanción, etc.)"
                    rows={3}
                    value={formData.solicitudEspecifica}
                    onChange={(e) => handleInputChange('solicitudEspecifica', e.target.value)}
                  />
                </div>

                {/* Botón de Análisis */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={analizarCasoContraloria}
                    disabled={cargando || !formData.descripcionIrregularidad}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {cargando ? (
                      <>
                        <Brain className="h-5 w-5 mr-2 animate-spin" />
                        Analizando con IA Especializada...
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Analizar Denuncia con IA Contraloría
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
                <Scale className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-800">Procedimientos</h3>
              </div>
              
              <div className="space-y-3">
                {procedimientosContraloria.map((procedimiento, index) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-900">{procedimiento.nombre}</h4>
                    <p className="text-sm text-orange-700 mb-2">{procedimiento.descripcion}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-orange-600">Plazo:</span>
                        <span className="text-orange-800">{procedimiento.plazo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-600">Competencia:</span>
                        <span className="text-orange-800">{procedimiento.competencia}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Especialistas */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-800">Especialistas</h3>
              </div>
              
              <div className="space-y-3">
                {especialistasContraloria.map((especialista, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-900">{especialista.nombre}</h4>
                    <p className="text-sm text-orange-700">{especialista.especialidad}</p>
                    <p className="text-xs text-orange-600">{especialista.experiencia} • {especialista.casos} casos</p>
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
                <BookOpen className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-800">Marco Legal</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 42/1993 - Contraloría</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 87/1993 - Control Interno</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 80/1993 - Contratación</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ley 1150/2007 - Reforma</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Constitución Art. 267</span>
                </div>
              </div>
            </Card>

            {/* Información de Contacto */}
            <Card className="p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-800">Contacto</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-orange-600" />
                  <span>Línea 195</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange-600" />
                  <span>contactenos@contraloria.gov.co</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-orange-600" />
                  <span>Carrera 8 #6-64, Bogotá</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span>Lun-Vie 8:00-17:00</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Resultados del Análisis */}
        {analisisIA && (
          <div className="mt-8">
            <Card className="p-6 shadow-lg bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Análisis Especializado Completado</h2>
                <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
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

              <div className="mb-6 p-4 bg-white rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Procedimiento Recomendado</h3>
                <p className="text-orange-700">{analisisIA.procedimientoRecomendado}</p>
              </div>

              {/* Impacto Económico */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Impacto Económico Estimado</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-xl font-bold text-red-600">{analisisIA.impactoEconomico.montoEstimado}</div>
                    <div className="text-sm text-gray-600">Monto Involucrado</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-xl font-bold text-green-600">{analisisIA.impactoEconomico.recursosRecuperables}</div>
                    <div className="text-sm text-gray-600">Recursos Recuperables</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{analisisIA.impactoEconomico.porcentajeRecuperacion}</div>
                    <div className="text-sm text-gray-600">% Recuperación</div>
                  </div>
                </div>
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
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-orange-200">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{recomendacion}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="fundamentos" className="space-y-4">
                  <div className="space-y-3">
                    {analisisIA.fundamentosLegales.map((fundamento, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-orange-200">
                        <BookOpen className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
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
                  <div className="p-4 bg-white rounded-lg border border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        {analisisIA.especialistaAsignado.nombre.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{analisisIA.especialistaAsignado.nombre}</h4>
                        <p className="text-sm text-orange-600">{analisisIA.especialistaAsignado.especialidad}</p>
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
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
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

export default ContraloriaGeneral;
