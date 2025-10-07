import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { 
  Users, 
  Download, 
  Clock,
  Brain,
  Zap,
  BarChart3,
  Info,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Megaphone,
  Target,
  Award
} from 'lucide-react';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

const VeeduriaParticipacionCiudadana = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    datosLider: { nombre: '', documento: '', email: '', telefono: '', comunidad: '' },
    programaCapacitacion: {
      tema: '',
      comunidad: '',
      numeroParticipantes: '',
      fechaCapacitacion: '',
      objetivos: '',
      metodologia: '',
      resultadosEsperados: ''
    },
    analisisIA: {
      especialistaEducacion: '',
      especialistaParticipacion: '',
      especialistaComunidades: '',
      analisisUnificado: ''
    }
  });

  const [cargandoIA, setCargandoIA] = useState({
    educacion: false,
    participacion: false,
    comunidades: false,
    analisisUnificado: false
  });

  const [progreso, setProgreso] = useState(0);

  const temasCapacitacion = [
    { id: 'control_social', nombre: 'Control Social', icono: '👁️' },
    { id: 'normatividad', nombre: 'Normatividad', icono: '📜' },
    { id: 'derechos_ciudadanos', nombre: 'Derechos Ciudadanos', icono: '⚖️' },
    { id: 'participacion', nombre: 'Participación Ciudadana', icono: '🗳️' },
    { id: 'veedurias', nombre: 'Veedurías Ciudadanas', icono: '🔍' },
    { id: 'transparencia', nombre: 'Transparencia', icono: '💡' }
  ];

  const especialistasIA = [
    {
      id: 'especialistaEducacion',
      nombre: 'Dra. María Ruiz - Especialista en Educación',
      icono: '📚',
      descripcion: 'Experta en educación ciudadana y pedagogía comunitaria',
      especialidades: ['Educación Ciudadana', 'Pedagogía', 'Capacitación']
    },
    {
      id: 'especialistaParticipacion',
      nombre: 'Dr. Carlos Silva - Especialista en Participación',
      icono: '🗣️',
      descripcion: 'Experto en mecanismos de participación y control social',
      especialidades: ['Participación', 'Control Social', 'Movilización']
    },
    {
      id: 'especialistaComunidades',
      nombre: 'Antrop. Ana López - Especialista en Comunidades',
      icono: '👥',
      descripcion: 'Antropóloga especializada en trabajo comunitario',
      especialidades: ['Trabajo Comunitario', 'Interculturalidad', 'Organización']
    }
  ];

  useEffect(() => {
    const completados = [
      !!(formulario.datosLider.nombre && formulario.datosLider.email),
      !!(formulario.programaCapacitacion.tema && formulario.programaCapacitacion.comunidad),
      !!formulario.analisisIA.analisisUnificado
    ].filter(Boolean).length;
    setProgreso(Math.round((completados / 3) * 100));
  }, [formulario]);

  const handleInputChange = (paso, campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [paso]: { ...prev[paso], [campo]: valor }
    }));
  };

  const analizarConIA = async (tipoEspecialista) => {
    setCargandoIA(prev => ({ ...prev, [tipoEspecialista]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analisis = {
        especialistaEducacion: `Análisis Educativo:\n\nPrograma: ${formulario.programaCapacitacion.tema}\nComunidad: ${formulario.programaCapacitacion.comunidad}\n\n1. Metodología pedagógica recomendada\n2. Recursos didácticos sugeridos\n3. Evaluación de aprendizaje\n4. Seguimiento post-capacitación\n5. Plan de multiplicadores`,
        
        especialistaParticipacion: `Análisis de Participación:\n\n1. Estrategias de motivación ciudadana\n2. Mecanismos de participación\n3. Fortalecimiento organizativo\n4. Incidencia en políticas públicas\n5. Sostenibilidad de la participación`,
        
        especialistaComunidades: `Análisis Comunitario:\n\n1. Contexto cultural de la comunidad\n2. Liderazgos y organizaciones existentes\n3. Necesidades específicas de capacitación\n4. Estrategias de comunicación\n5. Fortalecimiento del tejido social`
      };

      setFormulario(prev => ({
        ...prev,
        analisisIA: {
          ...prev.analisisIA,
          [tipoEspecialista]: analisis[tipoEspecialista]
        }
      }));

      toast.success('Análisis completado');
    } catch (error) {
      toast.error('Error al realizar análisis');
    } finally {
      setCargandoIA(prev => ({ ...prev, [tipoEspecialista]: false }));
    }
  };

  const generarAnalisisUnificado = async () => {
    setCargandoIA(prev => ({ ...prev, analisisUnificado: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const analisisUnificado = `PROGRAMA DE PROMOCIÓN DE PARTICIPACIÓN CIUDADANA

TEMA: ${formulario.programaCapacitacion.tema}
COMUNIDAD: ${formulario.programaCapacitacion.comunidad}
PARTICIPANTES: ${formulario.programaCapacitacion.numeroParticipantes}

OBJETIVO:
Capacitar a la comunidad en control social y normatividad para motivar a más personas 
a ejercer el derecho a vigilar lo público y fortalecer la democracia participativa.

ESTRATEGIA PEDAGÓGICA:
1. Metodología participativa y horizontal
2. Uso de casos reales y ejemplos locales
3. Talleres prácticos y dinámicas grupales
4. Materiales educativos culturalmente apropiados
5. Evaluación y seguimiento permanente

CONTENIDOS CLAVE:
1. Derechos ciudadanos y control social
2. Normatividad aplicable a veedurías
3. Herramientas de vigilancia ciudadana
4. Mecanismos de participación
5. Transparencia y acceso a información

RESULTADOS ESPERADOS:
- Ciudadanos capacitados en control social
- Fortalecimiento de organizaciones comunitarias
- Mayor participación en asuntos públicos
- Red de veedores ciudadanos activos
- Cultura de transparencia y rendición de cuentas

PLAN DE ACCIÓN:
1. Convocatoria y sensibilización
2. Desarrollo de talleres prácticos
3. Conformación de grupos de trabajo
4. Acompañamiento en primeras veedurías
5. Evaluación y retroalimentación`;

      setFormulario(prev => ({
        ...prev,
        analisisIA: {
          ...prev.analisisIA,
          analisisUnificado
        }
      }));

      toast.success('Análisis unificado completado');
    } catch (error) {
      toast.error('Error al generar análisis');
    } finally {
      setCargandoIA(prev => ({ ...prev, analisisUnificado: false }));
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('PROGRAMA DE PARTICIPACIÓN CIUDADANA', 20, 30);
    doc.setFontSize(10);
    doc.text(`Tema: ${formulario.programaCapacitacion.tema}`, 20, 50);
    doc.text(`Comunidad: ${formulario.programaCapacitacion.comunidad}`, 20, 60);
    
    if (formulario.analisisIA.analisisUnificado) {
      doc.setFontSize(12);
      doc.text('PLAN DE CAPACITACIÓN', 20, 80);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(formulario.analisisIA.analisisUnificado, 170);
      doc.text(lines, 20, 90);
    }
    
    doc.save('programa-participacion-ciudadana.pdf');
    toast.success('PDF generado exitosamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Megaphone className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Veeduría Ciudadana</h1>
          </div>
          <h2 className="text-2xl text-gray-600 mb-2">Promoción de la Participación Ciudadana</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Capacitar a la comunidad en control social y normatividad, motivando a más personas 
            a ejercer el derecho a vigilar lo público.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso</span>
            <span className="text-sm font-medium text-purple-600">{progreso}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              {pasoActual === 1 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Users className="h-8 w-8 text-purple-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Datos del Líder</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Nombre Completo *</Label>
                      <Input
                        value={formulario.datosLider.nombre}
                        onChange={(e) => handleInputChange('datosLider', 'nombre', e.target.value)}
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div>
                      <Label>Documento *</Label>
                      <Input
                        value={formulario.datosLider.documento}
                        onChange={(e) => handleInputChange('datosLider', 'documento', e.target.value)}
                        placeholder="Número de documento"
                      />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={formulario.datosLider.email}
                        onChange={(e) => handleInputChange('datosLider', 'email', e.target.value)}
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div>
                      <Label>Teléfono</Label>
                      <Input
                        value={formulario.datosLider.telefono}
                        onChange={(e) => handleInputChange('datosLider', 'telefono', e.target.value)}
                        placeholder="300 123 4567"
                      />
                    </div>
                    <div>
                      <Label>Comunidad</Label>
                      <Input
                        value={formulario.datosLider.comunidad}
                        onChange={(e) => handleInputChange('datosLider', 'comunidad', e.target.value)}
                        placeholder="Nombre de la comunidad"
                      />
                    </div>
                  </div>
                </div>
              )}

              {pasoActual === 2 && (
                <div>
                  <div className="flex items-center mb-6">
                    <BookOpen className="h-8 w-8 text-pink-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Programa de Capacitación</h3>
                  </div>
                  
                  <div className="mb-6">
                    <Label>Tema de Capacitación *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                      {temasCapacitacion.map((tema) => (
                        <div
                          key={tema.id}
                          onClick={() => handleInputChange('programaCapacitacion', 'tema', tema.nombre)}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            formulario.programaCapacitacion.tema === tema.nombre
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-1">{tema.icono}</div>
                            <div className="text-sm font-medium">{tema.nombre}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label>Comunidad *</Label>
                      <Input
                        value={formulario.programaCapacitacion.comunidad}
                        onChange={(e) => handleInputChange('programaCapacitacion', 'comunidad', e.target.value)}
                        placeholder="Nombre de la comunidad"
                      />
                    </div>
                    <div>
                      <Label>Número de Participantes</Label>
                      <Input
                        type="number"
                        value={formulario.programaCapacitacion.numeroParticipantes}
                        onChange={(e) => handleInputChange('programaCapacitacion', 'numeroParticipantes', e.target.value)}
                        placeholder="Ej: 30"
                      />
                    </div>
                    <div>
                      <Label>Fecha de Capacitación</Label>
                      <Input
                        type="date"
                        value={formulario.programaCapacitacion.fechaCapacitacion}
                        onChange={(e) => handleInputChange('programaCapacitacion', 'fechaCapacitacion', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Objetivos</Label>
                      <Textarea
                        value={formulario.programaCapacitacion.objetivos}
                        onChange={(e) => handleInputChange('programaCapacitacion', 'objetivos', e.target.value)}
                        placeholder="Objetivos de la capacitación"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Metodología</Label>
                      <Textarea
                        value={formulario.programaCapacitacion.metodologia}
                        onChange={(e) => handleInputChange('programaCapacitacion', 'metodologia', e.target.value)}
                        placeholder="Metodología propuesta"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {pasoActual === 3 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Brain className="h-8 w-8 text-indigo-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Análisis IA</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {especialistasIA.map((especialista) => (
                      <Card key={especialista.id} className="p-4">
                        <div className="text-2xl mb-2">{especialista.icono}</div>
                        <h4 className="font-semibold text-sm mb-2">{especialista.nombre}</h4>
                        <p className="text-xs text-gray-600 mb-3">{especialista.descripcion}</p>
                        <Button
                          onClick={() => analizarConIA(especialista.id)}
                          disabled={cargandoIA[especialista.id]}
                          size="sm"
                          className="w-full"
                        >
                          {cargandoIA[especialista.id] ? (
                            <><Clock className="h-3 w-3 mr-1 animate-spin" />Analizando...</>
                          ) : (
                            <><Zap className="h-3 w-3 mr-1" />Analizar</>
                          )}
                        </Button>
                      </Card>
                    ))}
                  </div>
                  
                  <Card className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Programa Completo</h4>
                      <Button
                        onClick={generarAnalisisUnificado}
                        disabled={cargandoIA.analisisUnificado}
                        className="bg-gradient-to-r from-purple-600 to-pink-600"
                      >
                        {cargandoIA.analisisUnificado ? (
                          <><Clock className="h-4 w-4 mr-2 animate-spin" />Generando...</>
                        ) : (
                          <><Brain className="h-4 w-4 mr-2" />Generar Programa</>
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
                  
                  <div className="flex justify-center">
                    <Button
                      onClick={generarPDF}
                      disabled={!formulario.analisisIA.analisisUnificado}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3"
                      size="lg"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Generar PDF
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button
                  onClick={() => setPasoActual(Math.max(1, pasoActual - 1))}
                  disabled={pasoActual === 1}
                  variant="outline"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                
                <Button
                  onClick={() => setPasoActual(Math.min(3, pasoActual + 1))}
                  disabled={pasoActual === 3}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  Siguiente
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-purple-600" />
                Información
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-gray-500 mr-2" />
                  <span><strong>Tema:</strong> {formulario.programaCapacitacion.tema || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-500 mr-2" />
                  <span><strong>Comunidad:</strong> {formulario.programaCapacitacion.comunidad || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-gray-500 mr-2" />
                  <span><strong>Participantes:</strong> {formulario.programaCapacitacion.numeroParticipantes || 'N/A'}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-pink-600" />
                Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progreso</span>
                  <span className="font-medium text-purple-600">{progreso}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Análisis IA</span>
                  <span className="font-medium text-pink-600">
                    {Object.values(formulario.analisisIA).filter(val => val).length}/4
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

export default VeeduriaParticipacionCiudadana;

