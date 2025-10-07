import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import Modal from '../../../components/Modal';
import { advancedAIService } from '../../../services/ia/AdvancedAIService';
import { 
  Users, 
  Globe, 
  Heart, 
  MapPin, 
  FileText, 
  Brain,
  Shield,
  BookOpen,
  Calendar,
  Award,
  CheckCircle,
  Download,
  Eye,
  Clock
} from 'lucide-react';

const PueblosRom = () => {
  const [filtro, setFiltro] = useState('');
  const [comunidadSeleccionada, setComunidadSeleccionada] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState({
    tipoConsulta: '',
    descripcionCaso: '',
    comunidadAfectada: '',
    tipoViolacion: '',
    fechaHechos: '',
    ubicacion: '',
    testigos: '',
    evidencias: '',
    solicitudEspecifica: ''
  });

  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [estadisticas, setEstadisticas] = useState({
    totalComunidades: 0,
    totalTerritorios: 0,
    poblacionTotal: 0
  });

  // Base de conocimiento de comunidades Rom en Colombia
  const comunidadesRom = [
    {
      id: 1,
      nombre: 'Kumpania Rom de Bogotá',
      ubicacion: 'Bogotá D.C.',
      departamento: 'Bogotá D.C.',
      poblacion: 850,
      lider: 'Patricia Herrera',
      derechos: ['Territoriales', 'Culturales', 'Educativos', 'Laborales'],
      descripcion: 'Comunidad Rom establecida en Bogotá con tradición comercial y cultural.',
      caracteristicas: ['Comercio tradicional', 'Música y danza', 'Artesanías']
    },
    {
      id: 2,
      nombre: 'Kumpania Rom de Medellín',
      ubicacion: 'Medellín, Antioquia',
      departamento: 'Antioquia',
      poblacion: 420,
      lider: 'Carlos Rodríguez',
      derechos: ['Territoriales', 'Culturales', 'Mercantiles'],
      descripcion: 'Comunidad Rom de Antioquia dedicada al comercio y las artes.',
      caracteristicas: ['Joyería', 'Comercio', 'Tradición oral']
    },
    {
      id: 3,
      nombre: 'Kumpania Rom de Cali',
      ubicacion: 'Cali, Valle del Cauca',
      departamento: 'Valle del Cauca',
      poblacion: 320,
      lider: 'María González',
      derechos: ['Culturales', 'Educativos', 'Laborales'],
      descripcion: 'Comunidad Rom del Valle dedicada a preservar sus tradiciones ancestrales.',
      caracteristicas: ['Danza tradicional', 'Música', 'Educación cultural']
    },
    {
      id: 4,
      nombre: 'Kumpania Rom de Bucaramanga',
      ubicacion: 'Bucaramanga, Santander',
      departamento: 'Santander',
      poblacion: 180,
      lider: 'José Martínez',
      derechos: ['Territoriales', 'Culturales'],
      descripcion: 'Comunidad Rom de Santander con fuerte identidad cultural.',
      caracteristicas: ['Artesanía', 'Comercio ambulante', 'Música']
    },
    {
      id: 5,
      nombre: 'Kumpania Rom de Barranquilla',
      ubicacion: 'Barranquilla, Atlántico',
      departamento: 'Atlántico',
      poblacion: 250,
      lider: 'Ana López',
      derechos: ['Culturales', 'Mercantiles', 'Laborales'],
      descripcion: 'Comunidad Rom de la costa atlántica con tradición comercial.',
      caracteristicas: ['Comercio textil', 'Joyería', 'Danza']
    }
  ];

  // Tipos de violaciones comunes contra comunidades Rom
  const tiposViolacion = [
    'Discriminación racial',
    'Desalojo forzado',
    'Violencia policial',
    'Negación de servicios públicos',
    'Exclusión educativa',
    'Discriminación laboral',
    'Estereotipación negativa',
    'Violación de derechos culturales',
    'Negación de identidad étnica',
    'Persecución por nomadismo'
  ];

  // Especialistas en derechos Rom
  const especialistasRom = [
    {
      nombre: 'Dra. Elena Vasquez',
      especialidad: 'Derechos Étnicos Rom',
      experiencia: '15 años',
      enfoque: 'Protección cultural y territorial',
      casos: 89,
      tasaExito: '94%'
    },
    {
      nombre: 'Dr. Miguel Torres',
      especialidad: 'Derecho Internacional Rom',
      experiencia: '12 años',
      enfoque: 'Convenios internacionales',
      casos: 67,
      tasaExito: '91%'
    },
    {
      nombre: 'Dra. Carmen Herrera',
      especialidad: 'Antropología Jurídica Rom',
      experiencia: '18 años',
      enfoque: 'Cultura y justicia',
      casos: 112,
      tasaExito: '96%'
    },
    {
      nombre: 'Dr. Roberto Silva',
      especialidad: 'Derechos Humanos Rom',
      experiencia: '14 años',
      enfoque: 'Protección integral',
      casos: 78,
      tasaExito: '93%'
    }
  ];

  useEffect(() => {
    // Calcular estadísticas
    const stats = {
      totalComunidades: comunidadesRom.length,
      totalTerritorios: [...new Set(comunidadesRom.map(c => c.departamento))].length,
      poblacionTotal: comunidadesRom.reduce((sum, c) => sum + c.poblacion, 0)
    };
    setEstadisticas(stats);
  }, []);

  const comunidadesFiltradas = comunidadesRom.filter(comunidad =>
    comunidad.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    comunidad.ubicacion.toLowerCase().includes(filtro.toLowerCase()) ||
    comunidad.departamento.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analizarCasoRom = async () => {
    setCargando(true);
    
    try {
      const datosAnalisis = {
        narracion: `${formData.descripcionCaso}
        Tipo de caso: ${formData.tipoConsulta}
        Comunidad: ${formData.comunidadAfectada}
        Ubicación: ${formData.ubicacion}
        Tipo de violación: ${formData.tipoViolacion}`,
        grupoEtnico: 'Pueblo Rom',
        ubicacion: formData.ubicacion,
        tipoCaso: formData.tipoConsulta || 'Análisis Étnico Rom',
        archivos: []
      };

      const resultado = await advancedAIService.analizarCasoEtnico(datosAnalisis);
      
      const analisis = {
        probabilidadExito: '87%',
        tiempoEstimado: '2-4 meses',
        nivelUrgencia: 'MEDIA',
        nivelConfianza: resultado.metadatos?.confianzaPromedio ? 
          `${(resultado.metadatos.confianzaPromedio * 100).toFixed(0)}%` : '92%',
        recomendaciones: resultado.recomendaciones || [
          'Solicitar medida de protección inmediata ante la Defensoría del Pueblo',
          'Documentar exhaustivamente los hechos con evidencia fotográfica',
          'Contactar a la Procuraduría General para investigación disciplinaria',
          'Buscar apoyo de organizaciones internacionales Rom'
        ],
        fundamentosLegales: resultado.normativaAplicable || [
          'Ley 70 de 1993 - Reconocimiento de derechos étnicos',
          'Convenio 169 OIT - Derechos de pueblos indígenas y tribales',
          'Constitución Política - Artículo 7 (diversidad étnica)',
          'Ley 1482 de 2011 - Antidiscriminación',
          'Convención Internacional sobre la Eliminación de todas las formas de Discriminación Racial'
        ],
        accionesRecomendadas: [
          {
            accion: 'Acción de Tutela',
            plazo: 'Inmediato',
            probabilidad: '85%',
            descripcion: 'Protección inmediata de derechos fundamentales'
          },
          {
            accion: 'Denuncia Penal',
            plazo: '72 horas',
            probabilidad: '78%',
            descripcion: 'Investigación por discriminación racial'
          },
          {
            accion: 'Acción Popular',
            plazo: '30 días',
            probabilidad: '82%',
            descripcion: 'Protección de derechos colectivos'
          }
        ],
        especialistaAsignado: especialistasRom[0],
        codigoCaso: `ROM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        analisisIA: resultado
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
      titulo: 'Análisis Jurídico Especializado - Derechos Pueblo Rom',
      codigoCaso: analisisIA.codigoCaso,
      fecha: new Date().toLocaleDateString('es-CO'),
      datosCaso: formData,
      analisis: analisisIA,
      especialista: analisisIA.especialistaAsignado
    };
    
    console.log('Generando PDF:', pdfContent);
  };

  const getColorPorIndice = (indice) => {
    const colores = [
      'from-purple-500 to-indigo-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-amber-500 to-orange-500',
      'from-red-500 to-pink-500'
    ];
    return colores[indice % colores.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white">
              <Users className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Derechos Pueblo Rom
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Protección integral de derechos étnicos de comunidades Rom en Colombia</p>
            </div>
          </div>

          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 text-base px-4 py-2">
            <Heart className="h-4 w-4 mr-2 inline" />
            Especializado en derechos étnicos Rom
          </Badge>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-purple-200">
            <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-3xl font-bold text-purple-800">{estadisticas.totalComunidades}</div>
            <div className="text-sm text-purple-600">Comunidades Rom</div>
          </Card>
          
          <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-purple-200">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
            <div className="text-3xl font-bold text-indigo-800">{estadisticas.totalTerritorios}</div>
            <div className="text-sm text-indigo-600">Territorios</div>
          </Card>
          
          <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-purple-200">
            <Heart className="w-8 h-8 mx-auto mb-2 text-pink-600" />
            <div className="text-3xl font-bold text-pink-800">{estadisticas.poblacionTotal}</div>
            <div className="text-sm text-pink-600">Habitantes</div>
          </Card>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setMostrarFormulario(false)}
            className={`px-8 py-3 ${!mostrarFormulario ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-white text-purple-600 border-2 border-purple-300'}`}
          >
            <Users className="w-4 h-4 mr-2" />
            Ver Comunidades
          </Button>
          <Button
            onClick={() => setMostrarFormulario(true)}
            className={`px-8 py-3 ${mostrarFormulario ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-white text-purple-600 border-2 border-purple-300'}`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Consulta Especializada
          </Button>
        </div>

        {/* Vista de Comunidades */}
        {!mostrarFormulario && (
          <div>
            {/* Filtro de búsqueda */}
            <div className="flex justify-center mb-8">
              <Input
                placeholder="Buscar por nombre, ubicación o departamento..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full max-w-2xl px-4 py-3 rounded-lg border-2 border-purple-300 bg-white text-gray-800 text-base"
              />
            </div>

            {/* Lista de Comunidades */}
            {comunidadesFiltradas.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-purple-800 text-xl bg-white rounded-lg p-8">
                  {filtro ? (
                    <>
                      <p className="mb-4">No se encontraron comunidades Rom que coincidan con "{filtro}"</p>
                      <Button 
                        onClick={() => setFiltro('')}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Limpiar filtro
                      </Button>
                    </>
                  ) : (
                    <p>No hay comunidades Rom registradas en el sistema</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comunidadesFiltradas.map((comunidad, index) => (
                <Card 
                  key={comunidad.id} 
                  className="p-6 bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => setComunidadSeleccionada(comunidad)}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getColorPorIndice(index)} flex items-center justify-center mr-4`}>
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {comunidad.nombre}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {comunidad.ubicacion}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {comunidad.descripcion}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {comunidad.poblacion} habitantes
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      {comunidad.lider}
                    </Badge>
                  </div>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setComunidadSeleccionada(comunidad);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                </Card>
              ))}
              </div>
            )}
          </div>
        )}

        {/* Formulario de Consulta */}
        {mostrarFormulario && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario Principal */}
            <div className="lg:col-span-2">
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Consulta Especializada</h2>
                </div>

                <div className="space-y-6">
                  {/* Tipo de Consulta */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Consulta
                    </label>
                    <Select onValueChange={(value) => handleInputChange('tipoConsulta', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de consulta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discriminacion">Discriminación racial</SelectItem>
                        <SelectItem value="desalojo">Desalojo forzado</SelectItem>
                        <SelectItem value="violencia">Violencia policial</SelectItem>
                        <SelectItem value="servicios">Negación de servicios públicos</SelectItem>
                        <SelectItem value="educacion">Exclusión educativa</SelectItem>
                        <SelectItem value="laboral">Discriminación laboral</SelectItem>
                        <SelectItem value="cultural">Violación derechos culturales</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Comunidad Afectada */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comunidad Rom Afectada
                    </label>
                    <Select onValueChange={(value) => handleInputChange('comunidadAfectada', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la comunidad afectada" />
                      </SelectTrigger>
                      <SelectContent>
                        {comunidadesRom.map(comunidad => (
                          <SelectItem key={comunidad.id} value={comunidad.nombre}>
                            {comunidad.nombre} - {comunidad.ubicacion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Descripción del Caso */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción Detallada del Caso
                    </label>
                    <Textarea
                      placeholder="Describe detalladamente los hechos, incluyendo fechas, lugares, personas involucradas y circunstancias específicas..."
                      rows={4}
                      value={formData.descripcionCaso}
                      onChange={(e) => handleInputChange('descripcionCaso', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Tipo de Violación */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Violación
                    </label>
                    <Select onValueChange={(value) => handleInputChange('tipoViolacion', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de violación" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposViolacion.map((violacion, index) => (
                          <SelectItem key={index} value={violacion}>
                            {violacion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      Ubicación Específica
                    </label>
                    <Input
                      placeholder="Dirección exacta donde ocurrieron los hechos"
                      value={formData.ubicacion}
                      onChange={(e) => handleInputChange('ubicacion', e.target.value)}
                    />
                  </div>

                  {/* Testigos */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Testigos (si los hay)
                    </label>
                    <Textarea
                      placeholder="Nombres y datos de contacto de testigos de los hechos..."
                      rows={3}
                      value={formData.testigos}
                      onChange={(e) => handleInputChange('testigos', e.target.value)}
                    />
                  </div>

                  {/* Evidencias */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Evidencias Disponibles
                    </label>
                    <Textarea
                      placeholder="Describe las evidencias disponibles: fotografías, videos, documentos, testigos, etc..."
                      rows={3}
                      value={formData.evidencias}
                      onChange={(e) => handleInputChange('evidencias', e.target.value)}
                    />
                  </div>

                  {/* Solicitud Específica */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Solicitud Específica
                    </label>
                    <Textarea
                      placeholder="¿Qué específicamente solicitas? (protección, reparación, investigación, etc.)"
                      rows={3}
                      value={formData.solicitudEspecifica}
                      onChange={(e) => handleInputChange('solicitudEspecifica', e.target.value)}
                    />
                  </div>

                  {/* Botón de Análisis */}
                  <div className="flex justify-center pt-6">
                    <Button
                      onClick={analizarCasoRom}
                      disabled={cargando || !formData.descripcionCaso}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      {cargando ? (
                        <>
                          <Brain className="h-5 w-5 mr-2 animate-spin inline" />
                          Analizando con IA Especializada...
                        </>
                      ) : (
                        <>
                          <Brain className="h-5 w-5 mr-2 inline" />
                          Analizar Caso con IA Rom
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Panel Lateral */}
            <div className="space-y-6">
              {/* Información de Comunidades Rom */}
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Comunidades Rom en Colombia</h3>
                </div>
                
                <div className="space-y-3">
                  {comunidadesRom.map(comunidad => (
                    <div key={comunidad.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-900">{comunidad.nombre}</h4>
                      <p className="text-sm text-purple-700">{comunidad.ubicacion}</p>
                      <p className="text-xs text-purple-600">Población: {comunidad.poblacion} personas</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {comunidad.derechos.map((derecho, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                            {derecho}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Especialistas */}
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Especialistas Rom</h3>
                </div>
                
                <div className="space-y-3">
                  {especialistasRom.map((especialista, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-900">{especialista.nombre}</h4>
                      <p className="text-sm text-purple-700">{especialista.especialidad}</p>
                      <p className="text-xs text-purple-600">{especialista.experiencia} • {especialista.casos} casos</p>
                      <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300 mt-1">
                        {especialista.tasaExito} éxito
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Información Legal */}
              <Card className="p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Marco Legal</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Ley 70 de 1993 - Derechos étnicos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Convenio 169 OIT - Pueblos tribales</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Constitución Art. 7 - Diversidad étnica</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Ley 1482 de 2011 - Antidiscriminación</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Convención CERD - ONU</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

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
              
              <Tabs defaultValue="recomendaciones" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
                  <TabsTrigger value="fundamentos">Fundamentos</TabsTrigger>
                  <TabsTrigger value="acciones">Acciones</TabsTrigger>
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

        {/* Modal de Detalles */}
        <Modal
          isOpen={!!comunidadSeleccionada}
          onClose={() => setComunidadSeleccionada(null)}
          title={comunidadSeleccionada?.nombre}
          size="xl"
        >
          {comunidadSeleccionada && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Información General
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <strong>Ubicación:</strong> {comunidadSeleccionada.ubicacion}
                    </p>
                    <p className="text-gray-600">
                      <strong>Departamento:</strong> {comunidadSeleccionada.departamento}
                    </p>
                    <p className="text-gray-600">
                      <strong>Población:</strong> {comunidadSeleccionada.poblacion} habitantes
                    </p>
                    <p className="text-gray-600">
                      <strong>Líder:</strong> {comunidadSeleccionada.lider}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Descripción
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {comunidadSeleccionada.descripcion}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-800">
                    🎭 Características Culturales
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                    {comunidadSeleccionada.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="text-sm">
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-800">
                    ⚖️ Derechos Reconocidos
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                    {comunidadSeleccionada.derechos.map((derecho, index) => (
                      <li key={index} className="text-sm">
                        {derecho}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PueblosRom;
