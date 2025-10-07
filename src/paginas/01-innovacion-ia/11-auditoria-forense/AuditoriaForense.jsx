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
  Shield, 
  FileText, 
  Upload, 
  Download, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  Target,
  Lightbulb
} from 'lucide-react';

const AuditoriaForense = () => {
  const [casosAbiertos, setCasosAbiertos] = useState([
    {
      id: 1,
      titulo: 'Auditoría Catastral - Proyecto Urbanístico',
      fecha: '2024-01-15',
      estado: 'En Progreso',
      tipo: 'Catastral',
      urgencia: 'Alta',
      descripcion: 'Análisis forense de documentos catastrales para proyecto de vivienda',
      evidencias: 15,
      avance: 65
    },
    {
      id: 2,
      titulo: 'Auditoría Minera - Licencias Ambientales',
      fecha: '2024-01-10',
      estado: 'Completado',
      tipo: 'Minera',
      urgencia: 'Media',
      descripcion: 'Verificación de cumplimiento de licencias ambientales en proyecto minero',
      evidencias: 8,
      avance: 100
    },
    {
      id: 3,
      titulo: 'Auditoría Administrativa - Contratos Públicos',
      fecha: '2024-01-20',
      estado: 'Pendiente',
      tipo: 'Administrativa',
      urgencia: 'Baja',
      descripcion: 'Análisis de contratos públicos y procesos de selección',
      evidencias: 0,
      avance: 0
    }
  ]);

  const [nuevoCaso, setNuevoCaso] = useState({
    titulo: '',
    tipo: '',
    urgencia: '',
    descripcion: '',
    archivos: []
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);

  const tiposAuditoria = [
    'Catastral',
    'Minera',
    'Administrativa',
    'Ambiental',
    'Fiscal',
    'Tecnológica',
    'Financiera',
    'Otro'
  ];

  const nivelesUrgencia = [
    'Baja',
    'Media',
    'Alta',
    'Crítica'
  ];

  const getEstadoColor = (estado) => {
    const colors = {
      'Pendiente': '#6b7280',
      'En Progreso': '#3b82f6',
      'Completado': '#10b981',
      'Cancelado': '#ef4444'
    };
    return colors[estado] || '#6b7280';
  };

  const getUrgenciaColor = (urgencia) => {
    const colors = {
      'Baja': '#10b981',
      'Media': '#f59e0b',
      'Alta': '#ef4444',
      'Crítica': '#dc2626'
    };
    return colors[urgencia] || '#6b7280';
  };

  const manejarCambio = (campo, valor) => {
    setNuevoCaso(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const manejarArchivos = (event) => {
    const archivos = Array.from(event.target.files);
    setNuevoCaso(prev => ({
      ...prev,
      archivos: [...prev.archivos, ...archivos]
    }));
  };

  const enviarCaso = () => {
    if (!nuevoCaso.titulo || !nuevoCaso.tipo || !nuevoCaso.urgencia || !nuevoCaso.descripcion) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    const caso = {
      id: Date.now(),
      titulo: nuevoCaso.titulo,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      tipo: nuevoCaso.tipo,
      urgencia: nuevoCaso.urgencia,
      descripcion: nuevoCaso.descripcion,
      evidencias: nuevoCaso.archivos.length,
      avance: 0
    };

    setCasosAbiertos(prev => [caso, ...prev]);
    setNuevoCaso({
      titulo: '',
      tipo: '',
      urgencia: '',
      descripcion: '',
      archivos: []
    });
    setMostrarFormulario(false);
  };

  const eliminarCaso = (id) => {
    setCasosAbiertos(prev => prev.filter(caso => caso.id !== id));
    setCasoSeleccionado(null);
  };

  const iniciarAnalisis = (id) => {
    setCasosAbiertos(prev => prev.map(caso => 
      caso.id === id 
        ? { ...caso, estado: 'En Progreso', avance: 25 }
        : caso
    ));
    setCasoSeleccionado(null);
  };

  const generarReporte = (id) => {
    const caso = casosAbiertos.find(c => c.id === id);
    if (caso) {
      const reporte = {
        id: caso.id,
        titulo: caso.titulo,
        fecha: caso.fecha,
        tipo: caso.tipo,
        urgencia: caso.urgencia,
        descripcion: caso.descripcion,
        evidencias: caso.evidencias,
        avance: caso.avance,
        estado: caso.estado,
        fechaReporte: new Date().toISOString()
      };

      const element = document.createElement('a');
      const file = new Blob([JSON.stringify(reporte, null, 2)], { type: 'application/json' });
      element.href = URL.createObjectURL(file);
      element.download = `auditoria-forense-${caso.titulo.replace(/\s+/g, '-').toLowerCase()}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const estadisticas = {
    totalCasos: casosAbiertos.length,
    enProgreso: casosAbiertos.filter(c => c.estado === 'En Progreso').length,
    completados: casosAbiertos.filter(c => c.estado === 'Completado').length,
    totalEvidencias: casosAbiertos.reduce((sum, c) => sum + c.evidencias, 0)
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
              <Shield style={{ marginRight: '1rem', display: 'inline' }} />
              Auditoría Forense Digital
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: '0.9',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Análisis forense digital avanzado para casos legales y administrativos
            </p>
          </div>

          {/* Estadísticas */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem', 
            marginBottom: '2rem' 
          }}>
            <Card style={{ 
              padding: '1.5rem', 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <FileText size={32} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{estadisticas.totalCasos}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total Casos</div>
            </Card>
            
            <Card style={{ 
              padding: '1.5rem', 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <Clock size={32} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{estadisticas.enProgreso}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>En Progreso</div>
            </Card>
            
            <Card style={{ 
              padding: '1.5rem', 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <CheckCircle size={32} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{estadisticas.completados}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Completados</div>
            </Card>
            
            <Card style={{ 
              padding: '1.5rem', 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <Search size={32} style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{estadisticas.totalEvidencias}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Evidencias Analizadas</div>
            </Card>
          </div>

          {/* Botón Nuevo Caso */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
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
                alignItems: 'center',
                margin: '0 auto'
              }}
            >
              <Plus style={{ marginRight: '0.5rem' }} />
              Nuevo Caso de Auditoría
            </Button>
          </div>

          {/* Formulario Nuevo Caso */}
          {mostrarFormulario && (
            <Card style={{ 
              padding: '2rem', 
              marginBottom: '2rem',
              background: 'white'
            }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                color: '#1f2937'
              }}>
                Crear Nuevo Caso de Auditoría
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Título del Caso *
                  </Label>
                  <Input
                    value={nuevoCaso.titulo}
                    onChange={(e) => manejarCambio('titulo', e.target.value)}
                    placeholder="Título descriptivo del caso"
                  />
                </div>

                <div>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Tipo de Auditoría *
                  </Label>
                  <Select
                    value={nuevoCaso.tipo}
                    onValueChange={(value) => manejarCambio('tipo', value)}
                  >
                    <option value="">Seleccionar tipo</option>
                    {tiposAuditoria.map((tipo) => (
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
                    Nivel de Urgencia *
                  </Label>
                  <Select
                    value={nuevoCaso.urgencia}
                    onValueChange={(value) => manejarCambio('urgencia', value)}
                  >
                    <option value="">Seleccionar urgencia</option>
                    {nivelesUrgencia.map((urgencia) => (
                      <option key={urgencia} value={urgencia}>
                        {urgencia}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <Label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#374151'
                }}>
                  Descripción del Caso *
                </Label>
                <Textarea
                  value={nuevoCaso.descripcion}
                  onChange={(e) => manejarCambio('descripcion', e.target.value)}
                  placeholder="Describa detalladamente el caso de auditoría..."
                  style={{ 
                    minHeight: '120px',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <Label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#374151'
                }}>
                  Archivos de Evidencia
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
                
                {nuevoCaso.archivos.length > 0 && (
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
                      Archivos Seleccionados ({nuevoCaso.archivos.length})
                    </h4>
                    {nuevoCaso.archivos.map((archivo, index) => (
                      <div key={index} style={{ 
                        fontSize: '0.9rem',
                        color: '#374151',
                        marginBottom: '0.25rem'
                      }}>
                        • {archivo.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center' 
              }}>
                <Button
                  onClick={enviarCaso}
                  style={{ 
                    background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <Plus style={{ marginRight: '0.5rem' }} />
                  Crear Caso
                </Button>
                
                <Button
                  onClick={() => setMostrarFormulario(false)}
                  style={{ 
                    background: 'linear-gradient(45deg, #6b7280, #4b5563)',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          )}

          {/* Lista de Casos */}
          <Card style={{ padding: '2rem', background: 'white' }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              color: '#1f2937'
            }}>
              Casos de Auditoría Abiertos
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {casosAbiertos.map((caso) => (
                <Card key={caso.id} style={{ 
                  padding: '1.5rem', 
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setCasoSeleccionado(caso)}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold',
                      color: '#1f2937'
                    }}>
                      {caso.titulo}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Badge style={{ 
                        background: getEstadoColor(caso.estado),
                        color: 'white',
                        fontSize: '0.8rem'
                      }}>
                        {caso.estado}
                      </Badge>
                      <Badge style={{ 
                        background: getUrgenciaColor(caso.urgencia),
                        color: 'white',
                        fontSize: '0.8rem'
                      }}>
                        {caso.urgencia}
                      </Badge>
                    </div>
                  </div>
                  
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    lineHeight: '1.5'
                  }}>
                    {caso.descripcion}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: '#6b7280' 
                    }}>
                      {caso.tipo} • {caso.fecha}
                    </span>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: '#6b7280' 
                    }}>
                      {caso.evidencias} evidencias
                    </span>
                  </div>
                  
                  <div style={{ 
                    background: '#f3f4f6', 
                    borderRadius: '0.25rem', 
                    height: '8px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ 
                      background: getEstadoColor(caso.estado),
                      height: '100%',
                      width: `${caso.avance}%`,
                      borderRadius: '0.25rem',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: '#6b7280'
                  }}>
                    <span>{caso.avance}% completado</span>
                    <span>ID: {caso.id}</span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Modal de Detalles del Caso */}
          {casoSeleccionado && (
            <div style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <Card style={{ 
                padding: '2rem', 
                background: 'white',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    color: '#1f2937'
                  }}>
                    Detalles del Caso
                  </h2>
                  <Button
                    onClick={() => setCasoSeleccionado(null)}
                    style={{ 
                      background: '#ef4444',
                      border: 'none',
                      padding: '0.5rem',
                      borderRadius: '0.25rem',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <XCircle size={20} />
                  </Button>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.5rem',
                      color: '#374151'
                    }}>
                      Información General
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Título:</strong> {casoSeleccionado.titulo}
                    </p>
                    <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Tipo:</strong> {casoSeleccionado.tipo}
                    </p>
                    <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Estado:</strong> {casoSeleccionado.estado}
                    </p>
                    <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Urgencia:</strong> {casoSeleccionado.urgencia}
                    </p>
                  </div>
                  
                  <div>
                    <h3 style={{ 
                      fontSize: '1rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.5rem',
                      color: '#374151'
                    }}>
                      Progreso y Evidencias
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Progreso:</strong> {casoSeleccionado.avance}%
                    </p>
                    <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Evidencias:</strong> {casoSeleccionado.evidencias}
                    </p>
                    <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>Fecha:</strong> {casoSeleccionado.fecha}
                    </p>
                    <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                      <strong>ID:</strong> {casoSeleccionado.id}
                    </p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    Descripción
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    lineHeight: '1.6',
                    background: '#f8fafc',
                    padding: '1rem',
                    borderRadius: '0.25rem'
                  }}>
                    {casoSeleccionado.descripcion}
                  </p>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <Button
                    onClick={() => iniciarAnalisis(casoSeleccionado.id)}
                    disabled={casoSeleccionado.estado === 'En Progreso'}
                    style={{ 
                      background: casoSeleccionado.estado === 'En Progreso' ? '#9ca3af' : 'linear-gradient(45deg, #3b82f6, #2563eb)',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      borderRadius: '0.5rem',
                      color: 'white',
                      cursor: casoSeleccionado.estado === 'En Progreso' ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Zap style={{ marginRight: '0.5rem' }} />
                    Iniciar Análisis
                  </Button>
                  
                  <Button
                    onClick={() => generarReporte(casoSeleccionado.id)}
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
                    <Download style={{ marginRight: '0.5rem' }} />
                    Generar Reporte
                  </Button>
                  
                  <Button
                    onClick={() => eliminarCaso(casoSeleccionado.id)}
                    style={{ 
                      background: 'linear-gradient(45deg, #ef4444, #dc2626)',
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
                    <Trash2 style={{ marginRight: '0.5rem' }} />
                    Eliminar
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditoriaForense;
