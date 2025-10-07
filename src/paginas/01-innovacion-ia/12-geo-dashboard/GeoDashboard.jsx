import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { useEstadisticasGeograficas } from '../../../hooks/useEstadisticas';
import veeduriaService from '../../../services/veeduriaService';
import { 
  MapPin, 
  Search, 
  Filter, 
  Download, 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText,
  Eye,
  EyeOff,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Info,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

const GeoDashboard = () => {
  // Hook para estadísticas geográficas
  const { 
    datos: estadisticasGeograficas, 
    cargando: cargandoEstadisticas, 
    error: errorEstadisticas 
  } = useEstadisticasGeograficas(true);

  const [puntosVeeduria, setPuntosVeeduria] = useState([]);
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showStats, setShowStats] = useState(true);
  const [stats, setStats] = useState({
    totalPuntos: 0,
    totalCasos: 0,
    casosEnProgreso: 0,
    casosCompletados: 0,
    categorias: {}
  });
  const [selectedCaso, setSelectedCaso] = useState(null);

  useEffect(() => {
    loadGeospatialData();
  }, []);

  const loadGeospatialData = async () => {
    setLoading(true);
    
    try {
      const response = await veeduriaService.obtenerVeedurias();
      const data = response.success && response.data ? 
        (Array.isArray(response.data) ? response.data : response.data.data || []) : 
        [];
      
      if (data.length > 0) {
        setPuntosVeeduria(data);
        
        // Calcular estadísticas desde datos reales
        const estadisticas = {
          totalPuntos: data.length,
          totalCasos: data.length,
          casosEnProgreso: data.filter(v => v.estado === 'en_progreso' || v.estado === 'En Progreso').length,
          casosCompletados: data.filter(v => v.estado === 'completado' || v.estado === 'Completado').length,
          categorias: data.reduce((acc, punto) => {
            const cat = punto.categoria || punto.tipo || 'Sin categoría';
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
          }, {})
        };
        
        setStats(estadisticas);
        setCasos(data);
      } else {
        // Si no hay datos, usar datos de ejemplo
        cargarDatosEjemplo();
      }
    } catch (error) {
      console.error('Error cargando datos geográficos:', error);
      // Si hay error, usar datos de ejemplo
      cargarDatosEjemplo();
    } finally {
      setLoading(false);
    }
  };

  const cargarDatosEjemplo = () => {
    const mockPuntos = [
        {
          id: 1,
          nombre: 'Punto Veeduría Centro',
          descripcion: 'Punto principal de veeduría en el centro de la ciudad',
          categoria: 'Urbano',
          estado: 'Activo',
          coordenadas: { lat: 4.6097, lng: -74.0817 },
          contacto: 'veeduria@csdt.gov.co',
          servicios: ['Consulta Previa', 'Derechos Territoriales', 'PQRSFD']
        },
        {
          id: 2,
          nombre: 'Punto Veeduría Rural',
          descripcion: 'Punto de veeduría para comunidades rurales',
          categoria: 'Rural',
          estado: 'Activo',
          coordenadas: { lat: 4.8143, lng: -75.6944 },
          contacto: 'rural@csdt.gov.co',
          servicios: ['Desarrollo Comunitario', 'Protección Ambiental']
        },
        {
          id: 3,
          nombre: 'Punto Veeduría Étnico',
          descripcion: 'Punto especializado en comunidades étnicas',
          categoria: 'Étnico',
          estado: 'Mantenimiento',
          coordenadas: { lat: 2.4605, lng: -76.6139 },
          contacto: 'etnico@csdt.gov.co',
          servicios: ['Consulta Previa', 'Derechos Culturales']
        }
      ];

      const mockCasos = [
        {
          id: 1,
          titulo: 'Caso de Consulta Previa - Proyecto Minero',
          descripcion: 'Proceso de consulta previa para proyecto minero en territorio indígena',
          tipo: 'Consulta Previa',
          estado: 'En Progreso',
          progreso: 65,
          presupuesto: 50000000,
          ubicacion: 'Cauca',
          fechaInicio: '2024-01-15',
          fechaVencimiento: '2024-06-15'
        },
        {
          id: 2,
          titulo: 'Protección de Derechos Territoriales',
          descripcion: 'Caso de protección de derechos territoriales de comunidad afro',
          tipo: 'Derechos Territoriales',
          estado: 'Completado',
          progreso: 100,
          presupuesto: 30000000,
          ubicacion: 'Chocó',
          fechaInicio: '2023-10-01',
          fechaVencimiento: '2024-01-01'
        },
        {
          id: 3,
          titulo: 'Desarrollo Comunitario Sostenible',
          descripcion: 'Proyecto de desarrollo comunitario en zona rural',
          tipo: 'Desarrollo Comunitario',
          estado: 'Pendiente',
          progreso: 0,
          presupuesto: 75000000,
          ubicacion: 'Antioquia',
          fechaInicio: '2024-03-01',
          fechaVencimiento: '2024-12-31'
        }
      ];

    setPuntosVeeduria(mockPuntos);
    setCasos(mockCasos);
    
    // Calcular estadísticas
    const estadisticas = {
      totalPuntos: mockPuntos.length,
      totalCasos: mockCasos.length,
      casosEnProgreso: mockCasos.filter(c => c.estado === 'En Progreso').length,
      casosCompletados: mockCasos.filter(c => c.estado === 'Completado').length,
      categorias: mockPuntos.reduce((acc, punto) => {
        acc[punto.categoria] = (acc[punto.categoria] || 0) + 1;
        return acc;
      }, {})
    };
    
    setStats(estadisticas);
  };

  const getCategoryColor = (categoria) => {
    const colors = {
      'Urbano': '#3b82f6',
      'Rural': '#10b981',
      'Étnico': '#f59e0b',
      'Especializado': '#8b5cf6'
    };
    return colors[categoria] || '#6b7280';
  };

  const getCategoryLabel = (categoria) => {
    const labels = {
      'Urbano': 'Urbano',
      'Rural': 'Rural',
      'Étnico': 'Étnico',
      'Especializado': 'Especializado'
    };
    return labels[categoria] || categoria;
  };

  const getEstadoColor = (estado) => {
    const colors = {
      'Activo': '#10b981',
      'Mantenimiento': '#f59e0b',
      'Inactivo': '#ef4444',
      'En Progreso': '#3b82f6',
      'Completado': '#10b981',
      'Pendiente': '#6b7280'
    };
    return colors[estado] || '#6b7280';
  };

  const filteredPoints = puntosVeeduria.filter(punto => {
    const matchesSearch = punto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         punto.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || punto.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredCasos = casos.filter(caso => {
    const matchesSearch = caso.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caso.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || caso.tipo === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFeatureClick = (punto) => {
    setSelectedPoint(punto);
  };

  const handleMapClick = (coords) => {
    console.log('Coordenadas seleccionadas:', coords);
  };

  const exportarDatos = () => {
    const datos = {
      puntosVeeduria: puntosVeeduria,
      casos: casos,
      estadisticas: stats,
      fechaExportacion: new Date().toISOString()
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `geo-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ 
            display: 'inline-block',
            animation: 'spin 1s linear infinite',
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            <RefreshCw />
          </div>
          <p style={{ fontSize: '1.2rem' }}>Cargando datos geográficos...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
              <MapPin style={{ marginRight: '1rem', display: 'inline' }} />
              Dashboard Geográfico CSDT
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Visualización de puntos de veeduría y casos territoriales
            </p>
          </div>

          {/* Controles */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Input
                placeholder="Buscar puntos o casos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  minWidth: '300px',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem'
                }}
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ 
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  background: 'white'
                }}
              >
                <option value="">Todas las categorías</option>
                <option value="Urbano">Urbano</option>
                <option value="Rural">Rural</option>
                <option value="Étnico">Étnico</option>
                <option value="Especializado">Especializado</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button
                onClick={() => setShowStats(!showStats)}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showStats ? <EyeOff style={{ marginRight: '0.5rem' }} /> : <Eye style={{ marginRight: '0.5rem' }} />}
                {showStats ? 'Ocultar' : 'Mostrar'} Estadísticas
              </Button>
              
              <Button
                onClick={exportarDatos}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Download style={{ marginRight: '0.5rem' }} />
                Exportar Datos
              </Button>
            </div>
          </div>

          {/* Estadísticas */}
          {showStats && (
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
                <BarChart3 size={32} style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalPuntos}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Puntos de Veeduría</div>
              </Card>
              
              <Card style={{ 
                padding: '1.5rem', 
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white'
              }}>
                <FileText size={32} style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalCasos}</div>
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
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.casosEnProgreso}</div>
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
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.casosCompletados}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Completados</div>
              </Card>
            </div>
          )}

          {/* Mapa Interactivo */}
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
              Mapa Interactivo CSDT
            </h2>
            
            <div style={{ 
              height: '400px', 
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ textAlign: 'center', color: '#6b7280' }}>
                <MapPin size={48} style={{ marginBottom: '1rem' }} />
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Mapa Interactivo</p>
                <p style={{ fontSize: '0.9rem' }}>
                  {filteredPoints.length} puntos de veeduría encontrados
                </p>
                <p style={{ fontSize: '0.9rem' }}>
                  {filteredCasos.length} casos activos
                </p>
              </div>
            </div>
          </Card>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
            gap: '2rem' 
          }}>
            {/* Puntos de Veeduría */}
            <Card style={{ padding: '2rem', background: 'white' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                color: '#1f2937'
              }}>
                Puntos de Veeduría ({filteredPoints.length})
              </h2>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                maxHeight: '500px',
                overflowY: 'auto'
              }}>
                {filteredPoints.map((punto) => (
                  <div
                    key={punto.id}
                    onClick={() => handleFeatureClick(punto)}
                    style={{ 
                      padding: '1rem', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: selectedPoint?.id === punto.id ? '#f0f9ff' : 'white'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 'bold',
                        color: '#1f2937'
                      }}>
                        {punto.nombre}
                      </h3>
                      <Badge style={{ 
                        background: getCategoryColor(punto.categoria),
                        color: 'white',
                        fontSize: '0.8rem'
                      }}>
                        {getCategoryLabel(punto.categoria)}
                      </Badge>
                    </div>
                    
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem'
                    }}>
                      {punto.descripcion}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem',
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>
                      <span style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: getEstadoColor(punto.estado)
                      }}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%',
                          background: getEstadoColor(punto.estado),
                          marginRight: '0.25rem'
                        }} />
                        {punto.estado}
                      </span>
                      <span>{punto.contacto}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Casos */}
            <Card style={{ padding: '2rem', background: 'white' }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                color: '#1f2937'
              }}>
                Casos Activos ({filteredCasos.length})
              </h2>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                maxHeight: '500px',
                overflowY: 'auto'
              }}>
                {filteredCasos.map((caso) => (
                  <div
                    key={caso.id}
                    onClick={() => setSelectedCaso(caso)}
                    style={{ 
                      padding: '1rem', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: selectedCaso?.id === caso.id ? '#f0f9ff' : 'white'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 'bold',
                        color: '#1f2937'
                      }}>
                        {caso.titulo}
                      </h3>
                      <Badge style={{ 
                        background: getEstadoColor(caso.estado),
                        color: 'white',
                        fontSize: '0.8rem'
                      }}>
                        {caso.estado}
                      </Badge>
                    </div>
                    
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem'
                    }}>
                      {caso.descripcion}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ 
                        fontSize: '0.8rem', 
                        color: '#6b7280' 
                      }}>
                        {caso.tipo} • {caso.ubicacion}
                      </span>
                      <span style={{ 
                        fontSize: '0.8rem', 
                        color: '#6b7280' 
                      }}>
                        ${caso.presupuesto.toLocaleString()}
                      </span>
                    </div>
                    
                    <div style={{ 
                      background: '#f3f4f6', 
                      borderRadius: '0.25rem', 
                      height: '8px',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ 
                        background: getEstadoColor(caso.estado),
                        height: '100%',
                        width: `${caso.progreso}%`,
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
                      <span>{caso.progreso}% completado</span>
                      <span>Vence: {caso.fechaVencimiento}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Panel de Detalles */}
          {selectedPoint && (
            <Card style={{ 
              padding: '2rem', 
              marginTop: '2rem',
              background: 'white'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                color: '#1f2937'
              }}>
                Detalles del Punto de Veeduría
              </h2>
              
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
                    color: '#374151'
                  }}>
                    Información General
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Nombre:</strong> {selectedPoint.nombre}
                  </p>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Categoría:</strong> {selectedPoint.categoria}
                  </p>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Estado:</strong> {selectedPoint.estado}
                  </p>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Contacto:</strong> {selectedPoint.contacto}
                  </p>
                </div>
                
                <div>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    Servicios Ofrecidos
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.5rem' 
                  }}>
                    {selectedPoint.servicios.map((servicio, index) => (
                      <Badge key={index} style={{ 
                        background: '#e0f2fe',
                        color: '#0c4a6e',
                        fontSize: '0.8rem'
                      }}>
                        {servicio}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {selectedCaso && (
            <Card style={{ 
              padding: '2rem', 
              marginTop: '2rem',
              background: 'white'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                color: '#1f2937'
              }}>
                Detalles del Caso
              </h2>
              
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
                    color: '#374151'
                  }}>
                    Información del Caso
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Título:</strong> {selectedCaso.titulo}
                  </p>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Tipo:</strong> {selectedCaso.tipo}
                  </p>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Estado:</strong> {selectedCaso.estado}
                  </p>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Ubicación:</strong> {selectedCaso.ubicacion}
                  </p>
                </div>
                
                <div>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    Progreso y Presupuesto
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Progreso:</strong> {selectedCaso.progreso}%
                  </p>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Presupuesto:</strong> ${selectedCaso.presupuesto.toLocaleString()}
                  </p>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Inicio:</strong> {selectedCaso.fechaInicio}
                  </p>
                  <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Vencimiento:</strong> {selectedCaso.fechaVencimiento}
                  </p>
                </div>
              </div>
            </Card>
          )}
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

export default GeoDashboard;
