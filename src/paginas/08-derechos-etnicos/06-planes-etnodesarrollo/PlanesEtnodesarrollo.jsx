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
  Globe, 
  Users, 
  FileText, 
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
  Calendar
} from 'lucide-react';

const PlanesEtnodesarrollo = () => {
  const [formulario, setFormulario] = useState({
    // Datos del solicitante
    nombre: '',
    identificacion: '',
    telefono: '',
    email: '',
    comunidad: '',
    
    // Datos del proyecto
    tituloProyecto: '',
    tipoComunidad: '',
    areaDesarrollo: '',
    descripcion: '',
    objetivos: '',
    presupuesto: '',
    duracion: '',
    
    // Información adicional
    ubicacion: '',
    beneficiarios: '',
    justificacion: ''
  });

  const [mostrarInfo, setMostrarInfo] = useState(false);

  const tiposComunidad = [
    {
      tipo: 'Indígena',
      descripcion: 'Comunidades indígenas reconocidas por el Estado',
      marcoLegal: 'Convenio 169 OIT, Constitución Política, Ley 21 de 1991',
      caracteristicas: [
        'Tradición cultural ancestral',
        'Territorio colectivo',
        'Gobierno propio',
        'Idioma propio'
      ]
    },
    {
      tipo: 'Afrodescendiente',
      descripcion: 'Comunidades negras, afrocolombianas, raizales y palenqueras',
      marcoLegal: 'Ley 70 de 1993, Decreto 1745 de 1995',
      caracteristicas: [
        'Historia de resistencia y libertad',
        'Territorio colectivo',
        'Cultura afrocolombiana',
        'Tradiciones ancestrales'
      ]
    },
    {
      tipo: 'Rom',
      descripcion: 'Pueblo gitano o rom',
      marcoLegal: 'Ley 1381 de 2010, Decreto 2957 de 2010',
      caracteristicas: [
        'Nómada tradicional',
        'Cultura gitana',
        'Idioma romaní',
        'Tradiciones propias'
      ]
    }
  ];

  const areasDesarrollo = [
    'Desarrollo Económico',
    'Desarrollo Social',
    'Desarrollo Cultural',
    'Desarrollo Ambiental',
    'Desarrollo Territorial',
    'Desarrollo Educativo',
    'Desarrollo de Salud',
    'Desarrollo Tecnológico'
  ];

  const handleInputChange = (campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formulario.nombre || !formulario.tituloProyecto || !formulario.tipoComunidad || !formulario.descripcion) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    // Simular envío del formulario
    alert('Plan de Etnodesarrollo enviado exitosamente. Recibirá una respuesta en 15 días hábiles.');
  };

  const generarPDFEtnodesarrollo = () => {
    const pdfContent = {
      tipo: 'Plan de Etnodesarrollo',
      datosSolicitante: {
        nombre: formulario.nombre,
        identificacion: formulario.identificacion,
        telefono: formulario.telefono,
        email: formulario.email,
        comunidad: formulario.comunidad
      },
      datosProyecto: {
        titulo: formulario.tituloProyecto,
        tipoComunidad: formulario.tipoComunidad,
        areaDesarrollo: formulario.areaDesarrollo,
        descripcion: formulario.descripcion,
        objetivos: formulario.objetivos,
        presupuesto: formulario.presupuesto,
        duracion: formulario.duracion,
        ubicacion: formulario.ubicacion,
        beneficiarios: formulario.beneficiarios,
        justificacion: formulario.justificacion
      },
      fecha: new Date().toISOString()
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `plan-etnodesarrollo-${formulario.tituloProyecto.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const comunidadSeleccionada = tiposComunidad.find(c => c.tipo === formulario.tipoComunidad);

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
              <Globe style={{ marginRight: '1rem', display: 'inline' }} />
              Planes de Etnodesarrollo
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Formulación y gestión de planes de desarrollo para comunidades étnicas
            </p>
          </div>

          {/* Información sobre Planes de Etnodesarrollo */}
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
                ¿Qué son los Planes de Etnodesarrollo?
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
                  Los Planes de Etnodesarrollo son instrumentos de planificación que permiten a las comunidades 
                  étnicas definir sus propias estrategias de desarrollo, respetando sus tradiciones culturales, 
                  territoriales y organizativas.
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
                      <li>Participación directa de la comunidad</li>
                      <li>Respeto a la autonomía territorial</li>
                      <li>Preservación de la identidad cultural</li>
                      <li>Desarrollo sostenible</li>
                      <li>Consulta previa obligatoria</li>
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
                      <li>Decreto 1745 de 1995</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Formulario */}
          <Card style={{ padding: '2rem', background: 'white' }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              color: '#1f2937'
            }}>
              Formulario de Plan de Etnodesarrollo
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Datos del Solicitante */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1rem',
                  color: '#374151'
                }}>
                  Datos del Solicitante
                </h3>
                
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
                      Nombre Completo *
                    </Label>
                    <Input
                      value={formulario.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      placeholder="Nombre completo del solicitante"
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
                      Identificación
                    </Label>
                    <Input
                      value={formulario.identificacion}
                      onChange={(e) => handleInputChange('identificacion', e.target.value)}
                      placeholder="Número de identificación"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Teléfono
                    </Label>
                    <Input
                      value={formulario.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      placeholder="Número de teléfono"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={formulario.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Correo electrónico"
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Comunidad
                    </Label>
                    <Input
                      value={formulario.comunidad}
                      onChange={(e) => handleInputChange('comunidad', e.target.value)}
                      placeholder="Nombre de la comunidad"
                    />
                  </div>
                </div>
              </div>

              {/* Datos del Proyecto */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1rem',
                  color: '#374151'
                }}>
                  Datos del Proyecto
                </h3>
                
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
                      Tipo de Comunidad *
                    </Label>
                    <Select
                      value={formulario.tipoComunidad}
                      onValueChange={(value) => handleInputChange('tipoComunidad', value)}
                    >
                      <option value="">Seleccionar tipo</option>
                      {tiposComunidad.map((tipo) => (
                        <option key={tipo.tipo} value={tipo.tipo}>
                          {tipo.tipo}
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
                      Área de Desarrollo
                    </Label>
                    <Select
                      value={formulario.areaDesarrollo}
                      onValueChange={(value) => handleInputChange('areaDesarrollo', value)}
                    >
                      <option value="">Seleccionar área</option>
                      {areasDesarrollo.map((area) => (
                        <option key={area} value={area}>
                          {area}
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
                      Presupuesto Estimado
                    </Label>
                    <Input
                      value={formulario.presupuesto}
                      onChange={(e) => handleInputChange('presupuesto', e.target.value)}
                      placeholder="Presupuesto en pesos colombianos"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Duración del Proyecto
                    </Label>
                    <Input
                      value={formulario.duracion}
                      onChange={(e) => handleInputChange('duracion', e.target.value)}
                      placeholder="Ej: 12 meses, 2 años"
                    />
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
                      Número de Beneficiarios
                    </Label>
                    <Input
                      value={formulario.beneficiarios}
                      onChange={(e) => handleInputChange('beneficiarios', e.target.value)}
                      placeholder="Número estimado de beneficiarios"
                    />
                  </div>
                </div>
              </div>

              {/* Descripción del Proyecto */}
              <div style={{ marginBottom: '2rem' }}>
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
                  placeholder="Describa detalladamente el proyecto de etnodesarrollo..."
                  style={{ 
                    minHeight: '150px',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}
                  required
                />
              </div>

              {/* Objetivos */}
              <div style={{ marginBottom: '2rem' }}>
                <Label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#374151'
                }}>
                  Objetivos del Proyecto
                </Label>
                <Textarea
                  value={formulario.objetivos}
                  onChange={(e) => handleInputChange('objetivos', e.target.value)}
                  placeholder="Liste los objetivos específicos del proyecto..."
                  style={{ 
                    minHeight: '120px',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}
                />
              </div>

              {/* Justificación */}
              <div style={{ marginBottom: '2rem' }}>
                <Label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#374151'
                }}>
                  Justificación
                </Label>
                <Textarea
                  value={formulario.justificacion}
                  onChange={(e) => handleInputChange('justificacion', e.target.value)}
                  placeholder="Explique por qué es importante este proyecto para la comunidad..."
                  style={{ 
                    minHeight: '120px',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}
                />
              </div>

              {/* Información de la Comunidad Seleccionada */}
              {comunidadSeleccionada && (
                <div style={{ 
                  marginBottom: '2rem', 
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
                    Información sobre {comunidadSeleccionada.tipo}
                  </h3>
                  
                  <p style={{ 
                    color: '#374151', 
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {comunidadSeleccionada.descripcion}
                  </p>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '1rem' 
                  }}>
                    <div>
                      <h4 style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 'bold', 
                        marginBottom: '0.5rem',
                        color: '#0c4a6e'
                      }}>
                        Marco Legal:
                      </h4>
                      <p style={{ 
                        color: '#374151', 
                        fontSize: '0.9rem',
                        lineHeight: '1.5'
                      }}>
                        {comunidadSeleccionada.marcoLegal}
                      </p>
                    </div>
                    
                    <div>
                      <h4 style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 'bold', 
                        marginBottom: '0.5rem',
                        color: '#0c4a6e'
                      }}>
                        Características:
                      </h4>
                      <ul style={{ 
                        color: '#374151', 
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        paddingLeft: '1rem'
                      }}>
                        {comunidadSeleccionada.caracteristicas.map((caracteristica, index) => (
                          <li key={index}>{caracteristica}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de Acción */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Button
                  type="button"
                  onClick={generarPDFEtnodesarrollo}
                  style={{ 
                    background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                    border: 'none',
                    padding: '1rem 2rem',
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
                  type="submit"
                  style={{ 
                    background: 'linear-gradient(45deg, #10b981, #059669)',
                    border: 'none',
                    padding: '1rem 2rem',
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
                  Enviar Plan
                </Button>
              </div>
            </form>
          </Card>

          {/* Enlace al Consejo IA */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '2rem' 
          }}>
            <p style={{ 
              color: 'white', 
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              ¿Necesita asesoría especializada para su plan de etnodesarrollo?
            </p>
            <Button
              onClick={() => window.location.href = '/consejo-ia'}
              style={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '0.5rem',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                margin: '0 auto'
              }}
            >
              <Lightbulb style={{ marginRight: '0.5rem' }} />
              Consultar Consejo IA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanesEtnodesarrollo;
