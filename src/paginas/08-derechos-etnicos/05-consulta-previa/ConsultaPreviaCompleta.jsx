import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Users, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Target,
  Zap,
  Shield,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Info,
  BookOpen,
  MapPin,
  Calendar,
  Globe,
  Gavel
} from 'lucide-react';

const ConsultaPreviaCompleta = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    // Información del proyecto
    tituloProyecto: '',
    tipoProyecto: '',
    descripcion: '',
    ubicacion: '',
    presupuesto: '',
    duracion: '',
    
    // Comunidades afectadas
    pueblosIndigenas: [],
    comunidadesAfro: [],
    
    // Planificación del proceso
    metodologia: '',
    cronograma: '',
    responsables: '',
    
    // Documentos
    documentos: [],
    
    // Resultados
    resultados: '',
    acuerdos: '',
    seguimiento: ''
  });

  const [pueblosIndigenas, setPueblosIndigenas] = useState([]);
  const [comunidadesAfro, setComunidadesAfro] = useState([]);
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const tiposProyecto = [
    'Minería',
    'Hidrocarburos',
    'Infraestructura',
    'Energía',
    'Agroindustria',
    'Turismo',
    'Forestal',
    'Otro'
  ];

  const metodologias = [
    'Asamblea General',
    'Cabildo Abierto',
    'Consulta Individual',
    'Talleres Participativos',
    'Reuniones Comunitarias',
    'Otro'
  ];

  const pasos = [
    { numero: 1, titulo: 'Información del Proyecto', icono: FileText },
    { numero: 2, titulo: 'Comunidades Afectadas', icono: Users },
    { numero: 3, titulo: 'Planificación del Proceso', icono: Calendar },
    { numero: 4, titulo: 'Documentos', icono: Upload },
    { numero: 5, titulo: 'Resultados', icono: CheckCircle }
  ];

  useEffect(() => {
    cargarPueblosIndigenas();
    cargarComunidadesAfro();
  }, []);

  const cargarPueblosIndigenas = async () => {
    try {
      const response = await fetch('/api/ia/etnica/pueblos-indigenas');
      const data = await response.json();
      setPueblosIndigenas(data);
    } catch (error) {
      console.error('Error cargando pueblos indígenas:', error);
      setPueblosIndigenas([
        { id: 1, nombre: 'Wayuu', territorio: 'La Guajira' },
        { id: 2, nombre: 'Nasa', territorio: 'Cauca' },
        { id: 3, nombre: 'Embera', territorio: 'Chocó' }
      ]);
    }
  };

  const cargarComunidadesAfro = async () => {
    try {
      const response = await fetch('/api/ia/etnica/comunidades-afro');
      const data = await response.json();
      setComunidadesAfro(data);
    } catch (error) {
      console.error('Error cargando comunidades afro:', error);
      setComunidadesAfro([
        { id: 1, nombre: 'San Basilio de Palenque', territorio: 'Bolívar' },
        { id: 2, nombre: 'La Boquilla', territorio: 'Cartagena' },
        { id: 3, nombre: 'Tumaco', territorio: 'Nariño' }
      ]);
    }
  };

  const siguientePaso = () => {
    if (pasoActual < pasos.length) {
      setPasoActual(pasoActual + 1);
    }
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };

  const handleInputChange = (campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const manejarArchivos = (event) => {
    const archivos = Array.from(event.target.files);
    setFormulario(prev => ({
      ...prev,
      documentos: [...prev.documentos, ...archivos]
    }));
  };

  const eliminarDocumento = (index) => {
    setFormulario(prev => ({
      ...prev,
      documentos: prev.documentos.filter((_, i) => i !== index)
    }));
  };

  const enviarConsulta = () => {
    if (!formulario.tituloProyecto || !formulario.tipoProyecto || !formulario.descripcion) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    alert('Consulta Previa enviada exitosamente. Recibirá una respuesta en 30 días hábiles.');
  };

  const generarPDF = () => {
    const pdfContent = {
      tipo: 'Consulta Previa Étnica',
      datosProyecto: {
        titulo: formulario.tituloProyecto,
        tipo: formulario.tipoProyecto,
        descripcion: formulario.descripcion,
        ubicacion: formulario.ubicacion,
        presupuesto: formulario.presupuesto,
        duracion: formulario.duracion
      },
      comunidadesAfectadas: {
        pueblosIndigenas: formulario.pueblosIndigenas,
        comunidadesAfro: formulario.comunidadesAfro
      },
      planificacion: {
        metodologia: formulario.metodologia,
        cronograma: formulario.cronograma,
        responsables: formulario.responsables
      },
      documentos: formulario.documentos.map(doc => ({
        nombre: doc.name,
        tipo: doc.type,
        tamaño: doc.size
      })),
      resultados: {
        resultados: formulario.resultados,
        acuerdos: formulario.acuerdos,
        seguimiento: formulario.seguimiento
      },
      fecha: new Date().toISOString()
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `consulta-previa-${formulario.tituloProyecto.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: 'white'
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              <Gavel style={{ marginRight: '1rem', display: 'inline' }} />
              Consulta Previa Étnica
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Proceso de consulta previa para proyectos que afecten a comunidades étnicas
            </p>
          </div>

          {/* Información sobre Consulta Previa */}
          <Card style={{ 
            padding: '2rem', 
            marginBottom: '2rem',
            background: 'white'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                ¿Qué es la Consulta Previa?
              </h2>
              <Button
                onClick={() => setMostrarInfo(!mostrarInfo)}
                style={{ 
                  background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  borderRadius: '0.25rem',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Info style={{ marginRight: '0.5rem' }} />
                {mostrarInfo ? 'Ocultar' : 'Mostrar'} Información
              </Button>
            </div>

            {mostrarInfo && (
              <div style={{ 
                padding: '1.5rem', 
                background: '#f8fafc', 
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <p style={{ 
                  color: '#374151', 
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  La Consulta Previa es un derecho fundamental de los pueblos indígenas y comunidades 
                  afrodescendientes, reconocido en el Convenio 169 de la OIT y la Constitución Política 
                  de Colombia. Permite a estas comunidades participar en las decisiones que los afectan.
                </p>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.5rem',
                      color: '#1f2937'
                    }}>
                      Características Principales
                    </h3>
                    <ul style={{ 
                      color: '#374151', 
                      lineHeight: '1.6',
                      paddingLeft: '1.5rem'
                    }}>
                      <li>Obligatoria para proyectos que afecten a comunidades étnicas</li>
                      <li>Debe realizarse antes de la ejecución del proyecto</li>
                      <li>Participación libre e informada</li>
                      <li>Respeto a las tradiciones culturales</li>
                      <li>Resultado vinculante</li>
                    </ul>
                  </div>

                  <div>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.5rem',
                      color: '#1f2937'
                    }}>
                      Marco Legal
                    </h3>
                    <ul style={{ 
                      color: '#374151', 
                      lineHeight: '1.6',
                      paddingLeft: '1.5rem'
                    }}>
                      <li>Convenio 169 OIT</li>
                      <li>Constitución Política de Colombia</li>
                      <li>Ley 21 de 1991</li>
                      <li>Ley 70 de 1993</li>
                      <li>Decreto 1320 de 1998</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Indicador de pasos */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            {pasos.map((paso) => (
              <div key={paso.numero} style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '0.75rem 1rem',
                borderRadius: '2rem',
                background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: paso.numero === pasoActual ? '2px solid white' : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}>
                <paso.icono size={20} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontWeight: 'bold' }}>{paso.titulo}</span>
              </div>
            ))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {/* Paso 1: Información del Proyecto */}
            {pasoActual === 1 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Información del Proyecto
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Título del Proyecto *
                    </Label>
                    <Input
                      value={formulario.tituloProyecto}
                      onChange={(e) => handleInputChange('tituloProyecto', e.target.value)}
                      placeholder="Título descriptivo del proyecto"
                      required
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Tipo de Proyecto *
                    </Label>
                    <Select
                      value={formulario.tipoProyecto}
                      onValueChange={(value) => handleInputChange('tipoProyecto', value)}
                    >
                      <option value="">Seleccionar tipo</option>
                      {tiposProyecto.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Ubicación
                    </Label>
                    <Input
                      value={formulario.ubicacion}
                      onChange={(e) => handleInputChange('ubicacion', e.target.value)}
                      placeholder="Ubicación del proyecto"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Presupuesto
                    </Label>
                    <Input
                      value={formulario.presupuesto}
                      onChange={(e) => handleInputChange('presupuesto', e.target.value)}
                      placeholder="Presupuesto estimado"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Duración
                    </Label>
                    <Input
                      value={formulario.duracion}
                      onChange={(e) => handleInputChange('duracion', e.target.value)}
                      placeholder="Duración del proyecto"
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Descripción del Proyecto *
                  </Label>
                  <Textarea
                    value={formulario.descripcion}
                    onChange={(e) => handleInputChange('descripcion', e.target.value)}
                    placeholder="Describa detalladamente el proyecto..."
                    style={{ 
                      minHeight: '150px',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}
                    required
                  />
                </div>
              </div>
            )}

            {/* Paso 2: Comunidades Afectadas */}
            {pasoActual === 2 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Comunidades Afectadas
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                  gap: '2rem' 
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#374151'
                    }}>
                      Pueblos Indígenas
                    </h3>
                    <div style={{ 
                      maxHeight: '300px', 
                      overflowY: 'auto',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.25rem',
                      padding: '1rem'
                    }}>
                      {pueblosIndigenas.map((pueblo) => (
                        <div key={pueblo.id} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          marginBottom: '0.5rem' 
                        }}>
                          <input
                            type="checkbox"
                            id={`pueblo-${pueblo.id}`}
                            checked={formulario.pueblosIndigenas.includes(pueblo.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormulario(prev => ({
                                  ...prev,
                                  pueblosIndigenas: [...prev.pueblosIndigenas, pueblo.id]
                                }));
                              } else {
                                setFormulario(prev => ({
                                  ...prev,
                                  pueblosIndigenas: prev.pueblosIndigenas.filter(id => id !== pueblo.id)
                                }));
                              }
                            }}
                            style={{ marginRight: '0.5rem' }}
                          />
                          <Label htmlFor={`pueblo-${pueblo.id}`} style={{ 
                            cursor: 'pointer',
                            color: '#374151'
                          }}>
                            {pueblo.nombre} - {pueblo.territorio}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#374151'
                    }}>
                      Comunidades Afrodescendientes
                    </h3>
                    <div style={{ 
                      maxHeight: '300px', 
                      overflowY: 'auto',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.25rem',
                      padding: '1rem'
                    }}>
                      {comunidadesAfro.map((comunidad) => (
                        <div key={comunidad.id} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          marginBottom: '0.5rem' 
                        }}>
                          <input
                            type="checkbox"
                            id={`comunidad-${comunidad.id}`}
                            checked={formulario.comunidadesAfro.includes(comunidad.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormulario(prev => ({
                                  ...prev,
                                  comunidadesAfro: [...prev.comunidadesAfro, comunidad.id]
                                }));
                              } else {
                                setFormulario(prev => ({
                                  ...prev,
                                  comunidadesAfro: prev.comunidadesAfro.filter(id => id !== comunidad.id)
                                }));
                              }
                            }}
                            style={{ marginRight: '0.5rem' }}
                          />
                          <Label htmlFor={`comunidad-${comunidad.id}`} style={{ 
                            cursor: 'pointer',
                            color: '#374151'
                          }}>
                            {comunidad.nombre} - {comunidad.territorio}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 3: Planificación del Proceso */}
            {pasoActual === 3 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Planificación del Proceso
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Metodología
                    </Label>
                    <Select
                      value={formulario.metodologia}
                      onValueChange={(value) => handleInputChange('metodologia', value)}
                    >
                      <option value="">Seleccionar metodología</option>
                      {metodologias.map((metodologia) => (
                        <option key={metodologia} value={metodologia}>
                          {metodologia}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Responsables
                    </Label>
                    <Input
                      value={formulario.responsables}
                      onChange={(e) => handleInputChange('responsables', e.target.value)}
                      placeholder="Responsables del proceso"
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Cronograma
                  </Label>
                  <Textarea
                    value={formulario.cronograma}
                    onChange={(e) => handleInputChange('cronograma', e.target.value)}
                    placeholder="Describa el cronograma del proceso de consulta..."
                    style={{ 
                      minHeight: '150px',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Paso 4: Documentos */}
            {pasoActual === 4 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Documentos del Proceso
                </h2>
                
                <div style={{ 
                  padding: '2rem', 
                  border: '2px dashed #d1d5db', 
                  borderRadius: '0.5rem',
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  <Upload size={48} style={{ marginBottom: '1rem', color: '#6b7280' }} />
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    Subir Documentos
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    marginBottom: '1rem' 
                  }}>
                    Suba los documentos relacionados con el proceso de consulta previa
                  </p>
                  <input
                    type="file"
                    onChange={manejarArchivos}
                    multiple
                    style={{ 
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  />
                </div>

                {formulario.documentos.length > 0 && (
                  <div style={{ 
                    padding: '1.5rem', 
                    background: '#f0f9ff', 
                    borderRadius: '0.5rem',
                    border: '1px solid #0ea5e9'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#0c4a6e'
                    }}>
                      Documentos Cargados ({formulario.documentos.length})
                    </h3>
                    {formulario.documentos.map((doc, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '0.75rem',
                        background: 'white',
                        borderRadius: '0.25rem',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ fontSize: '0.9rem' }}>{doc.name}</span>
                        <Button
                          onClick={() => eliminarDocumento(index)}
                          style={{ 
                            background: '#ef4444',
                            border: 'none',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Paso 5: Resultados */}
            {pasoActual === 5 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Resultados del Proceso
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Resultados Obtenidos
                    </Label>
                    <Textarea
                      value={formulario.resultados}
                      onChange={(e) => handleInputChange('resultados', e.target.value)}
                      placeholder="Describa los resultados obtenidos en el proceso de consulta..."
                      style={{ 
                        minHeight: '120px',
                        fontSize: '1rem',
                        lineHeight: '1.6'
                      }}
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Acuerdos Alcanzados
                    </Label>
                    <Textarea
                      value={formulario.acuerdos}
                      onChange={(e) => handleInputChange('acuerdos', e.target.value)}
                      placeholder="Describa los acuerdos alcanzados con las comunidades..."
                      style={{ 
                        minHeight: '120px',
                        fontSize: '1rem',
                        lineHeight: '1.6'
                      }}
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Plan de Seguimiento
                    </Label>
                    <Textarea
                      value={formulario.seguimiento}
                      onChange={(e) => handleInputChange('seguimiento', e.target.value)}
                      placeholder="Describa el plan de seguimiento a los acuerdos..."
                      style={{ 
                        minHeight: '120px',
                        fontSize: '1rem',
                        lineHeight: '1.6'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navegación */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <Button
                onClick={pasoAnterior}
                disabled={pasoActual === 1}
                style={{ 
                  background: pasoActual === 1 ? '#9ca3af' : 'linear-gradient(45deg, #6b7280, #4b5563)',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: pasoActual === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ArrowLeft style={{ marginRight: '0.5rem' }} />
                Anterior
              </Button>

              {pasoActual < pasos.length ? (
                <Button
                  onClick={siguientePaso}
                  style={{ 
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Siguiente
                  <ArrowRight style={{ marginLeft: '0.5rem' }} />
                </Button>
              ) : (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button
                    onClick={generarPDF}
                    style={{ 
                      background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      borderRadius: '0.5rem',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Download style={{ marginRight: '0.5rem' }} />
                    Generar PDF
                  </Button>
                  
                  <Button
                    onClick={enviarConsulta}
                    style={{ 
                      background: 'linear-gradient(45deg, #10b981, #059669)',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      borderRadius: '0.5rem',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <CheckCircle style={{ marginRight: '0.5rem' }} />
                    Enviar Consulta
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConsultaPreviaCompleta;
