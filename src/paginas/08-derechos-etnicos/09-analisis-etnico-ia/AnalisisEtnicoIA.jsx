import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { 
  Brain, 
  Users, 
  MapPin, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Target,
  Zap,
  Globe,
  Shield,
  Lightbulb,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const AnalisisEtnicoIA = () => {
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    identificacion: '',
    telefono: '',
    email: '',
    comunidad: ''
  });

  const [datosCaso, setDatosCaso] = useState({
    tipo: '',
    grupoEtnico: '',
    ubicacion: '',
    narracion: '',
    archivos: []
  });

  const [consejoIA, setConsejoIA] = useState({
    cargando: false,
    resultado: null,
    error: null
  });

  const [pueblosIndigenas, setPueblosIndigenas] = useState([]);
  const [comunidadesAfro, setComunidadesAfro] = useState([]);

  const tiposCaso = [
    'Consulta Previa',
    'Derechos Territoriales',
    'Protección Cultural',
    'Desarrollo Comunitario',
    'Conflictos Interétnicos',
    'Protección Ambiental',
    'Derechos Humanos',
    'Otro'
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
      // Datos de ejemplo
      setPueblosIndigenas([
        { id: 1, nombre: 'Wayuu', territorio: 'La Guajira', idioma: 'Wayuunaiki' },
        { id: 2, nombre: 'Nasa', territorio: 'Cauca', idioma: 'Nasa Yuwe' },
        { id: 3, nombre: 'Embera', territorio: 'Chocó', idioma: 'Embera' }
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
      // Datos de ejemplo
      setComunidadesAfro([
        { id: 1, nombre: 'Comunidad de San Basilio de Palenque', territorio: 'Bolívar' },
        { id: 2, nombre: 'Comunidad de La Boquilla', territorio: 'Cartagena' },
        { id: 3, nombre: 'Comunidad de Tumaco', territorio: 'Nariño' }
      ]);
    }
  };

  const analizarCasoIA = async () => {
    if (!datosCaso.narracion.trim()) {
      setConsejoIA(prev => ({ 
        ...prev, 
        error: 'Por favor, ingrese una narración del caso' 
      }));
      return;
    }

    setConsejoIA(prev => ({ ...prev, cargando: true, error: null }));

    try {
      // Simulación de análisis mientras se configura el servicio de IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const resultado = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        caso: datosCaso,
        analisis: `Análisis del caso étnico:\n\nTipo: ${datosCaso.tipo}\nGrupo Étnico: ${datosCaso.grupoEtnico}\nUbicación: ${datosCaso.ubicacion}\n\nEl caso requiere atención especializada en derechos étnicos y territoriales.`,
        recomendaciones: [
          'Realizar consulta previa a la comunidad',
          'Verificar derechos territoriales vigentes',
          'Contactar autoridades tradicionales',
          'Documentar impacto cultural y ambiental'
        ],
        metadatos: {
          tiempoProcesamiento: 2000,
          version: '3.0.0'
        }
      };

      setConsejoIA(prev => ({ 
        ...prev, 
        cargando: false, 
        resultado 
      }));
    } catch (error) {
      console.error('Error en análisis étnico IA:', error);
      setConsejoIA(prev => ({ 
        ...prev, 
        cargando: false, 
        error: 'Error al analizar el caso con IA: ' + error.message
      }));
    }
  };

  const limpiarNarracion = async () => {
    if (!datosCaso.narracion.trim()) return;

    setConsejoIA(prev => ({ ...prev, cargando: true }));

    try {
      const response = await fetch('/api/ia/etnica/limpiar-narracion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ narracion: datosCaso.narracion })
      });

      const resultado = await response.json();
      setDatosCaso(prev => ({
        ...prev,
        narracion: resultado.narracionLimpia
      }));
      setConsejoIA(prev => ({ ...prev, cargando: false }));
    } catch (error) {
      setConsejoIA(prev => ({ 
        ...prev, 
        cargando: false, 
        error: 'Error al limpiar la narración' 
      }));
    }
  };

  const generarPDF = async () => {
    if (!consejoIA.resultado) return;

    try {
      const response = await fetch('/api/ia/etnica/generar-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          datosCliente,
          datosCaso,
          analisis: consejoIA.resultado
        })
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analisis-etnico-${datosCliente.nombre.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  };

  const iniciarDependencia = async () => {
    if (!consejoIA.resultado) return;

    try {
      const response = await fetch('/api/ia/etnica/iniciar-dependencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          datosCliente,
          datosCaso,
          analisis: consejoIA.resultado
        })
      });

      const resultado = await response.json();
      alert(`Dependencia iniciada exitosamente con ID: ${resultado.id}`);
    } catch (error) {
      console.error('Error iniciando dependencia:', error);
    }
  };

  const manejarArchivos = (event) => {
    const archivos = Array.from(event.target.files);
    setDatosCaso(prev => ({
      ...prev,
      archivos: [...prev.archivos, ...archivos]
    }));
  };

  const eliminarArchivo = (index) => {
    setDatosCaso(prev => ({
      ...prev,
      archivos: prev.archivos.filter((_, i) => i !== index)
    }));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              <Brain style={{ marginRight: '1rem', display: 'inline' }} />
              Análisis Étnico con IA
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Análisis especializado para casos relacionados con comunidades étnicas
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
            gap: '2rem' 
          }}>
            {/* Formulario de Datos */}
            <Card style={{ padding: '2rem', background: 'white' }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                color: '#1f2937'
              }}>
                Datos del Caso
              </h2>

              {/* Datos del Cliente */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1rem',
                  color: '#374151'
                }}>
                  Información del Cliente
                </h3>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Nombre Completo
                    </Label>
                    <Input
                      value={datosCliente.nombre}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, nombre: e.target.value }))}
                      placeholder="Nombre completo"
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
                      value={datosCliente.identificacion}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, identificacion: e.target.value }))}
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
                      value={datosCliente.telefono}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, telefono: e.target.value }))}
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
                      value={datosCliente.email}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, email: e.target.value }))}
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
                      value={datosCliente.comunidad}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, comunidad: e.target.value }))}
                      placeholder="Nombre de la comunidad"
                    />
                  </div>
                </div>
              </div>

              {/* Datos del Caso */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1rem',
                  color: '#374151'
                }}>
                  Información del Caso
                </h3>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Tipo de Caso
                    </Label>
                    <Select
                      value={datosCaso.tipo}
                      onValueChange={(value) => setDatosCaso(prev => ({ ...prev, tipo: value }))}
                    >
                      <option value="">Seleccionar tipo</option>
                      {tiposCaso.map((tipo) => (
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
                      Grupo Étnico
                    </Label>
                    <Select
                      value={datosCaso.grupoEtnico}
                      onValueChange={(value) => setDatosCaso(prev => ({ ...prev, grupoEtnico: value }))}
                    >
                      <option value="">Seleccionar grupo</option>
                      {pueblosIndigenas.map((pueblo) => (
                        <option key={pueblo.id} value={pueblo.nombre}>
                          {pueblo.nombre} - {pueblo.territorio}
                        </option>
                      ))}
                      {comunidadesAfro.map((comunidad) => (
                        <option key={comunidad.id} value={comunidad.nombre}>
                          {comunidad.nombre} - {comunidad.territorio}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Ubicación
                    </Label>
                    <Input
                      value={datosCaso.ubicacion}
                      onChange={(e) => setDatosCaso(prev => ({ ...prev, ubicacion: e.target.value }))}
                      placeholder="Ubicación del caso"
                    />
                  </div>
                </div>
              </div>

              {/* Narración del Caso */}
              <div style={{ marginBottom: '2rem' }}>
                <Label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#374151'
                }}>
                  Narración del Caso
                </Label>
                <Textarea
                  value={datosCaso.narracion}
                  onChange={(e) => setDatosCaso(prev => ({ ...prev, narracion: e.target.value }))}
                  placeholder="Describa detalladamente el caso..."
                  style={{ 
                    minHeight: '150px',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}
                />
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  marginTop: '1rem' 
                }}>
                  <Button
                    onClick={limpiarNarracion}
                    disabled={!datosCaso.narracion.trim() || consejoIA.cargando}
                    style={{ 
                      background: consejoIA.cargando ? '#9ca3af' : 'linear-gradient(45deg, #10b981, #059669)',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      borderRadius: '0.25rem',
                      color: 'white',
                      cursor: consejoIA.cargando ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Limpiar Narración
                  </Button>
                </div>
              </div>

              {/* Archivos */}
              <div style={{ marginBottom: '2rem' }}>
                <Label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#374151'
                }}>
                  Archivos Adjuntos
                </Label>
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
                
                {datosCaso.archivos.length > 0 && (
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '1rem', 
                    background: '#f0f9ff', 
                    borderRadius: '0.25rem',
                    border: '1px solid #0ea5e9'
                  }}>
                    <h4 style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.5rem',
                      color: '#0c4a6e'
                    }}>
                      Archivos Cargados ({datosCaso.archivos.length})
                    </h4>
                    {datosCaso.archivos.map((archivo, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '0.5rem',
                        background: 'white',
                        borderRadius: '0.25rem',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ fontSize: '0.9rem' }}>{archivo.name}</span>
                        <Button
                          onClick={() => eliminarArchivo(index)}
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

              {/* Botón de Análisis */}
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={analizarCasoIA}
                  disabled={!datosCaso.narracion.trim() || consejoIA.cargando}
                  style={{ 
                    background: consejoIA.cargando ? '#9ca3af' : 'linear-gradient(45deg, #667eea, #764ba2)',
                    border: 'none',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: consejoIA.cargando ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 auto'
                  }}
                >
                  {consejoIA.cargando ? (
                    <>
                      <Clock style={{ marginRight: '0.5rem' }} />
                      Analizando...
                    </>
                  ) : (
                    <>
                      <Brain style={{ marginRight: '0.5rem' }} />
                      Analizar con IA
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Resultados del Análisis */}
            <Card style={{ padding: '2rem', background: 'white' }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                color: '#1f2937'
              }}>
                Resultados del Análisis
              </h2>

              {consejoIA.cargando && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '3rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ 
                    display: 'inline-block',
                    animation: 'spin 1s linear infinite',
                    fontSize: '2rem',
                    color: '#667eea'
                  }}>
                    <Brain />
                  </div>
                  <p style={{ 
                    marginTop: '1rem', 
                    fontSize: '1.1rem',
                    color: '#374151'
                  }}>
                    Analizando caso étnico con IA...
                  </p>
                </div>
              )}

              {consejoIA.error && (
                <Alert style={{ 
                  background: '#fef2f2', 
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <AlertCircle style={{ marginRight: '0.5rem' }} />
                  {consejoIA.error}
                </Alert>
              )}

              {consejoIA.resultado && (
                <div>
                  <div style={{ 
                    padding: '1.5rem', 
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
                    borderRadius: '0.5rem',
                    border: '1px solid #0ea5e9',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#0c4a6e'
                    }}>
                      Análisis Especializado
                    </h3>
                    <p style={{ 
                      color: '#374151', 
                      lineHeight: '1.6',
                      marginBottom: '1rem'
                    }}>
                      {consejoIA.resultado.analisis}
                    </p>
                    
                    {consejoIA.resultado.recomendaciones && (
                      <div>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          fontWeight: 'bold', 
                          marginBottom: '0.5rem',
                          color: '#0c4a6e'
                        }}>
                          Recomendaciones:
                        </h4>
                        <ul style={{ 
                          color: '#374151', 
                          lineHeight: '1.6',
                          paddingLeft: '1.5rem'
                        }}>
                          {consejoIA.resultado.recomendaciones.map((rec, index) => (
                            <li key={index} style={{ marginBottom: '0.25rem' }}>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <Button
                      onClick={generarPDF}
                      style={{ 
                        background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem',
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
                      onClick={iniciarDependencia}
                      style={{ 
                        background: 'linear-gradient(45deg, #10b981, #059669)',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Target style={{ marginRight: '0.5rem' }} />
                      Iniciar Dependencia
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AnalisisEtnicoIA;
