import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  MapPin, 
  Shield, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  Info, 
  BookOpen,
  Lightbulb,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Globe,
  Users,
  Gavel,
  Lock
} from 'lucide-react';

const DerechosTerritoriales = () => {
  const [filtro, setFiltro] = useState('');
  const [territorioSeleccionado, setTerritorioSeleccionado] = useState(null);

  const territoriosEjemplo = [
    {
      id: 1,
      nombre: 'Resguardo Wayuu de La Guajira',
      ubicacion: 'La Guajira, Colombia',
      area: '1,200,000 hectáreas',
      poblacion: '270,000 habitantes',
      reconocimiento: '1991',
      autoridades: ['Mamá Mayor', 'Palabrero', 'Autoridad Tradicional'],
      derechos: ['Derecho al territorio', 'Derecho a la consulta previa', 'Derecho a la autonomía'],
      amenazas: ['Minería', 'Turismo masivo', 'Cambio climático'],
      documentos: ['Título de resguardo', 'Plan de vida', 'Estatuto interno']
    },
    {
      id: 2,
      nombre: 'Resguardo Nasa del Cauca',
      ubicacion: 'Cauca, Colombia',
      area: '800,000 hectáreas',
      poblacion: '150,000 habitantes',
      reconocimiento: '1991',
      autoridades: ['Cabildo Mayor', 'Guardia Indígena', 'Autoridad Tradicional'],
      derechos: ['Derecho al territorio', 'Derecho a la consulta previa', 'Derecho a la autonomía'],
      amenazas: ['Conflicto armado', 'Cultivos ilícitos', 'Megaproyectos'],
      documentos: ['Título de resguardo', 'Plan de vida', 'Estatuto interno']
    },
    {
      id: 3,
      nombre: 'Territorio Colectivo Afro de San Basilio de Palenque',
      ubicacion: 'Bolívar, Colombia',
      area: '15,000 hectáreas',
      poblacion: '3,500 habitantes',
      reconocimiento: '2005',
      autoridades: ['Consejo Comunitario', 'Líderes Comunitarios'],
      derechos: ['Derecho al territorio', 'Derecho a la consulta previa', 'Derecho a la cultura'],
      amenazas: ['Expansión urbana', 'Contaminación', 'Pérdida de identidad'],
      documentos: ['Título colectivo', 'Plan de etnodesarrollo', 'Reglamento interno']
    }
  ];

  const categoriasDerechos = [
    {
      categoria: 'Derechos Fundamentales',
      derechos: [
        {
          nombre: 'Derecho al Territorio',
          descripcion: 'Derecho a la propiedad colectiva y uso tradicional del territorio',
          fundamento: 'Convenio 169 OIT, Art. 14',
          proteccion: 'Constitución Política, Art. 63'
        },
        {
          nombre: 'Derecho a la Consulta Previa',
          descripcion: 'Derecho a ser consultados sobre medidas que los afecten',
          fundamento: 'Convenio 169 OIT, Art. 6',
          proteccion: 'Ley 21 de 1991'
        },
        {
          nombre: 'Derecho a la Autonomía',
          descripcion: 'Derecho a la autonomía territorial y organizativa',
          fundamento: 'Constitución Política, Art. 7',
          proteccion: 'Ley 21 de 1991'
        }
      ]
    },
    {
      categoria: 'Derechos Culturales',
      derechos: [
        {
          nombre: 'Derecho a la Cultura',
          descripcion: 'Derecho a preservar y desarrollar su cultura',
          fundamento: 'Convenio 169 OIT, Art. 5',
          proteccion: 'Constitución Política, Art. 70'
        },
        {
          nombre: 'Derecho al Idioma',
          descripcion: 'Derecho a usar y preservar su idioma propio',
          fundamento: 'Convenio 169 OIT, Art. 28',
          proteccion: 'Ley 1381 de 2010'
        },
        {
          nombre: 'Derecho a la Tradición',
          descripcion: 'Derecho a mantener sus tradiciones ancestrales',
          fundamento: 'Convenio 169 OIT, Art. 8',
          proteccion: 'Constitución Política, Art. 7'
        }
      ]
    },
    {
      categoria: 'Derechos Ambientales',
      derechos: [
        {
          nombre: 'Derecho al Medio Ambiente',
          descripcion: 'Derecho a un medio ambiente sano y equilibrado',
          fundamento: 'Constitución Política, Art. 79',
          proteccion: 'Ley 99 de 1993'
        },
        {
          nombre: 'Derecho a los Recursos Naturales',
          descripcion: 'Derecho al uso y aprovechamiento de recursos naturales',
          fundamento: 'Convenio 169 OIT, Art. 15',
          proteccion: 'Ley 21 de 1991'
        },
        {
          nombre: 'Derecho a la Biodiversidad',
          descripcion: 'Derecho a proteger la biodiversidad de su territorio',
          fundamento: 'Convenio 169 OIT, Art. 7',
          proteccion: 'Ley 99 de 1993'
        }
      ]
    }
  ];

  const medidasProteccion = [
    {
      titulo: 'Medidas Legales',
      descripcion: 'Protección a través del marco jurídico nacional e internacional',
      medidas: [
        'Reconocimiento constitucional',
        'Ratificación del Convenio 169 OIT',
        'Leyes específicas de protección',
        'Decretos reglamentarios'
      ]
    },
    {
      titulo: 'Medidas Administrativas',
      descripcion: 'Protección a través de la administración pública',
      medidas: [
        'Titulación de territorios',
        'Planes de etnodesarrollo',
        'Consultas previas obligatorias',
        'Programas de protección'
      ]
    },
    {
      titulo: 'Medidas Judiciales',
      descripcion: 'Protección a través del sistema judicial',
      medidas: [
        'Acciones de tutela',
        'Acciones populares',
        'Acciones de grupo',
        'Medidas cautelares'
      ]
    },
    {
      titulo: 'Medidas Comunitarias',
      descripcion: 'Protección a través de la organización comunitaria',
      medidas: [
        'Guardia indígena',
        'Sistemas de justicia propia',
        'Planes de vida',
        'Monitoreo territorial'
      ]
    }
  ];

  const amenazasComunes = [
    {
      tipo: 'Económicas',
      descripcion: 'Amenazas relacionadas con actividades económicas',
      ejemplos: [
        'Minería ilegal',
        'Megaproyectos',
        'Agroindustria',
        'Turismo masivo'
      ]
    },
    {
      tipo: 'Ambientales',
      descripcion: 'Amenazas relacionadas con el medio ambiente',
      ejemplos: [
        'Contaminación',
        'Deforestación',
        'Cambio climático',
        'Pérdida de biodiversidad'
      ]
    },
    {
      tipo: 'Sociales',
      descripcion: 'Amenazas relacionadas con la sociedad',
      ejemplos: [
        'Conflicto armado',
        'Desplazamiento forzado',
        'Pérdida de identidad',
        'Discriminación'
      ]
    }
  ];

  const territoriosFiltrados = territoriosEjemplo.filter(territorio =>
    territorio.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    territorio.ubicacion.toLowerCase().includes(filtro.toLowerCase())
  );

  const getColorPorIndice = (indice) => {
    const colores = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
      '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
    ];
    return colores[indice % colores.length];
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
              <MapPin style={{ marginRight: '1rem', display: 'inline' }} />
              Derechos Territoriales Étnicos
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Protección y reconocimiento de los derechos territoriales de las comunidades étnicas
            </p>
          </div>

          <Tabs defaultValue="territorios" style={{ background: 'white', borderRadius: '1rem', padding: '2rem' }}>
            <TabsList style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              padding: '0.5rem',
              borderRadius: '0.5rem'
            }}>
              <TabsTrigger value="territorios" style={{ 
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                <MapPin style={{ marginRight: '0.5rem' }} />
                Territorios
              </TabsTrigger>
              <TabsTrigger value="derechos" style={{ 
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                <Shield style={{ marginRight: '0.5rem' }} />
                Derechos
              </TabsTrigger>
              <TabsTrigger value="proteccion" style={{ 
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                <Lock style={{ marginRight: '0.5rem' }} />
                Protección
              </TabsTrigger>
            </TabsList>

            {/* Tab Territorios */}
            <TabsContent value="territorios">
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Territorios Étnicos Reconocidos
                </h2>

                {/* Filtro de búsqueda */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  marginBottom: '2rem' 
                }}>
                  <Input
                    placeholder="Buscar territorios..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    style={{ 
                      minWidth: '400px',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                {/* Lista de Territorios */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  {territoriosFiltrados.map((territorio, index) => (
                    <Card key={territorio.id} style={{ 
                      padding: '1.5rem', 
                      background: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '2px solid transparent'
                    }}
                    onClick={() => setTerritorioSeleccionado(territorio)}
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '1rem' 
                      }}>
                        <div style={{ 
                          width: '50px', 
                          height: '50px', 
                          borderRadius: '50%', 
                          background: getColorPorIndice(index),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem'
                        }}>
                          <MapPin size={24} color="white" />
                        </div>
                        <div>
                          <h3 style={{ 
                            fontSize: '1.3rem', 
                            fontWeight: 'bold',
                            color: '#1f2937',
                            marginBottom: '0.25rem'
                          }}>
                            {territorio.nombre}
                          </h3>
                          <p style={{ 
                            color: '#6b7280', 
                            fontSize: '0.9rem' 
                          }}>
                            {territorio.ubicacion}
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                        gap: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <p style={{ 
                            fontSize: '0.8rem', 
                            color: '#6b7280',
                            marginBottom: '0.25rem'
                          }}>
                            <strong>Área:</strong> {territorio.area}
                          </p>
                          <p style={{ 
                            fontSize: '0.8rem', 
                            color: '#6b7280',
                            marginBottom: '0.25rem'
                          }}>
                            <strong>Población:</strong> {territorio.poblacion}
                          </p>
                        </div>
                        <div>
                          <p style={{ 
                            fontSize: '0.8rem', 
                            color: '#6b7280',
                            marginBottom: '0.25rem'
                          }}>
                            <strong>Reconocimiento:</strong> {territorio.reconocimiento}
                          </p>
                          <p style={{ 
                            fontSize: '0.8rem', 
                            color: '#6b7280',
                            marginBottom: '0.25rem'
                          }}>
                            <strong>Autoridades:</strong> {territorio.autoridades.length}
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          gap: '0.5rem' 
                        }}>
                          <Badge style={{ 
                            background: '#e0f2fe',
                            color: '#0c4a6e',
                            fontSize: '0.8rem'
                          }}>
                            {territorio.derechos.length} derechos
                          </Badge>
                          <Badge style={{ 
                            background: '#fef3c7',
                            color: '#92400e',
                            fontSize: '0.8rem'
                          }}>
                            {territorio.amenazas.length} amenazas
                          </Badge>
                        </div>
                        <Button
                          style={{ 
                            background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            borderRadius: '0.25rem',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Eye style={{ marginRight: '0.25rem' }} />
                          Ver Detalles
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tab Derechos */}
            <TabsContent value="derechos">
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Categorías de Derechos Territoriales
                </h2>

                <div style={{ 
                  display: 'grid', 
                  gap: '2rem' 
                }}>
                  {categoriasDerechos.map((categoria, index) => (
                    <Card key={index} style={{ 
                      padding: '2rem', 
                      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        marginBottom: '1.5rem',
                        color: '#1f2937'
                      }}>
                        {categoria.categoria}
                      </h3>
                      
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '1.5rem' 
                      }}>
                        {categoria.derechos.map((derecho, derechoIndex) => (
                          <Card key={derechoIndex} style={{ 
                            padding: '1.5rem', 
                            background: 'white',
                            border: '1px solid #e5e7eb'
                          }}>
                            <h4 style={{ 
                              fontSize: '1.2rem', 
                              fontWeight: 'bold', 
                              marginBottom: '0.5rem',
                              color: '#1f2937'
                            }}>
                              {derecho.nombre}
                            </h4>
                            
                            <p style={{ 
                              color: '#374151', 
                              lineHeight: '1.6',
                              marginBottom: '1rem'
                            }}>
                              {derecho.descripcion}
                            </p>
                            
                            <div style={{ 
                              padding: '1rem', 
                              background: '#f0f9ff', 
                              borderRadius: '0.25rem',
                              border: '1px solid #0ea5e9'
                            }}>
                              <p style={{ 
                                fontSize: '0.9rem', 
                                color: '#0c4a6e',
                                marginBottom: '0.25rem'
                              }}>
                                <strong>Fundamento:</strong> {derecho.fundamento}
                              </p>
                              <p style={{ 
                                fontSize: '0.9rem', 
                                color: '#0c4a6e'
                              }}>
                                <strong>Protección:</strong> {derecho.proteccion}
                              </p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tab Protección */}
            <TabsContent value="proteccion">
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Medidas de Protección Territorial
                </h2>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  {medidasProteccion.map((medida, index) => (
                    <Card key={index} style={{ 
                      padding: '1.5rem', 
                      background: 'white',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold', 
                        marginBottom: '0.5rem',
                        color: '#1f2937'
                      }}>
                        {medida.titulo}
                      </h3>
                      
                      <p style={{ 
                        color: '#374151', 
                        lineHeight: '1.6',
                        marginBottom: '1rem'
                      }}>
                        {medida.descripcion}
                      </p>
                      
                      <ul style={{ 
                        color: '#374151', 
                        lineHeight: '1.6',
                        paddingLeft: '1.5rem'
                      }}>
                        {medida.medidas.map((medidaItem, medidaIndex) => (
                          <li key={medidaIndex} style={{ marginBottom: '0.25rem' }}>
                            {medidaItem}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>

                <Card style={{ 
                  padding: '2rem', 
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                  border: '1px solid #fecaca'
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1.5rem',
                    color: '#991b1b'
                  }}>
                    Amenazas Comunes
                  </h3>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '1.5rem' 
                  }}>
                    {amenazasComunes.map((amenaza, index) => (
                      <div key={index} style={{ 
                        padding: '1rem', 
                        background: 'white', 
                        borderRadius: '0.25rem',
                        border: '1px solid #fecaca'
                      }}>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          fontWeight: 'bold', 
                          marginBottom: '0.5rem',
                          color: '#991b1b'
                        }}>
                          {amenaza.tipo}
                        </h4>
                        
                        <p style={{ 
                          color: '#374151', 
                          fontSize: '0.9rem',
                          marginBottom: '0.5rem'
                        }}>
                          {amenaza.descripcion}
                        </p>
                        
                        <ul style={{ 
                          color: '#374151', 
                          fontSize: '0.8rem',
                          lineHeight: '1.5',
                          paddingLeft: '1rem'
                        }}>
                          {amenaza.ejemplos.map((ejemplo, ejemploIndex) => (
                            <li key={ejemploIndex} style={{ marginBottom: '0.25rem' }}>
                              • {ejemplo}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Modal de Detalles del Territorio */}
          {territorioSeleccionado && (
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
                maxWidth: '800px',
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
                    fontSize: '1.8rem', 
                    fontWeight: 'bold',
                    color: '#1f2937'
                  }}>
                    {territorioSeleccionado.nombre}
                  </h2>
                  <Button
                    onClick={() => setTerritorioSeleccionado(null)}
                    style={{ 
                      background: '#ef4444',
                      border: 'none',
                      padding: '0.5rem',
                      borderRadius: '0.25rem',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </Button>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '2rem' 
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#374151'
                    }}>
                      Información General
                    </h3>
                    <div style={{ 
                      display: 'grid', 
                      gap: '0.5rem' 
                    }}>
                      <p style={{ color: '#6b7280' }}>
                        <strong>Ubicación:</strong> {territorioSeleccionado.ubicacion}
                      </p>
                      <p style={{ color: '#6b7280' }}>
                        <strong>Área:</strong> {territorioSeleccionado.area}
                      </p>
                      <p style={{ color: '#6b7280' }}>
                        <strong>Población:</strong> {territorioSeleccionado.poblacion}
                      </p>
                      <p style={{ color: '#6b7280' }}>
                        <strong>Reconocimiento:</strong> {territorioSeleccionado.reconocimiento}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#374151'
                    }}>
                      Autoridades
                    </h3>
                    <ul style={{ 
                      color: '#374151', 
                      lineHeight: '1.6',
                      paddingLeft: '1.5rem'
                    }}>
                      {territorioSeleccionado.autoridades.map((autoridad, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>
                          {autoridad}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '2rem',
                  marginTop: '2rem'
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#374151'
                    }}>
                      Derechos Reconocidos
                    </h3>
                    <ul style={{ 
                      color: '#374151', 
                      lineHeight: '1.6',
                      paddingLeft: '1.5rem'
                    }}>
                      {territorioSeleccionado.derechos.map((derecho, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>
                          {derecho}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#374151'
                    }}>
                      Amenazas Identificadas
                    </h3>
                    <ul style={{ 
                      color: '#374151', 
                      lineHeight: '1.6',
                      paddingLeft: '1.5rem'
                    }}>
                      {territorioSeleccionado.amenazas.map((amenaza, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>
                          {amenaza}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div style={{ 
                  marginTop: '2rem',
                  padding: '1.5rem', 
                  background: '#f0f9ff', 
                  borderRadius: '0.5rem',
                  border: '1px solid #0ea5e9'
                }}>
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1rem',
                    color: '#0c4a6e'
                  }}>
                    Documentos de Protección
                  </h3>
                  <ul style={{ 
                    color: '#374151', 
                    lineHeight: '1.6',
                    paddingLeft: '1.5rem'
                  }}>
                    {territorioSeleccionado.documentos.map((documento, index) => (
                      <li key={index} style={{ marginBottom: '0.25rem' }}>
                        {documento}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'center',
                  marginTop: '2rem'
                }}>
                  <Button
                    onClick={() => setTerritorioSeleccionado(null)}
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
                    Cerrar
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

export default DerechosTerritoriales;
