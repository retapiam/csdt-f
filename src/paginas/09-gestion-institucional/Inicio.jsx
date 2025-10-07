import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Users, 
  FileText, 
  Brain, 
  MapPin, 
  Shield, 
  Gavel, 
  Globe, 
  Award,
  Zap,
  Lock,
  Database,
  Search,
  CheckCircle,
  Star,
  ArrowRight,
  Activity,
  Target,
  Lightbulb,
  Cpu,
  Network,
  Eye,
  Fingerprint,
  Download
} from 'lucide-react';

const Inicio = () => {
  const [estadisticas, setEstadisticas] = useState({
    casosProcesados: 0,
    usuariosActivos: 0,
    documentosGenerados: 0,
    analisisCompletados: 0
  });
  
  const [, setCargandoEstadisticas] = useState(true);

  const [noticias] = useState([
    {
      id: 1,
      titulo: "Nuevo sistema de IA para análisis jurídico",
      fecha: "2024-01-15",
      resumen: "Implementación de inteligencia artificial avanzada para análisis de casos legales"
    },
    {
      id: 2,
      titulo: "Actualización del dashboard geográfico",
      fecha: "2024-01-10",
      resumen: "Mejoras en la visualización de datos geográficos y análisis territorial"
    },
    {
      id: 3,
      titulo: "Nuevas funcionalidades de auditoría forense",
      fecha: "2024-01-05",
      resumen: "Herramientas avanzadas para análisis forense digital"
    }
  ]);

  // Cargar estadísticas reales desde el backend
  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        setCargandoEstadisticas(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${API_URL}/publico/estadisticas-inicio`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setEstadisticas({
              casosProcesados: data.data.casosProcesados || 0,
              usuariosActivos: data.data.usuariosActivos || 0,
              documentosGenerados: data.data.documentosGenerados || 0,
              analisisCompletados: data.data.analisisCompletados || 0
            });
          }
        }
      } catch (error) {
        // Error al cargar estadísticas - mantener valores por defecto
        // eslint-disable-next-line no-unused-vars
        const errorMsg = error;
      } finally {
        setCargandoEstadisticas(false);
      }
    };

    cargarEstadisticas();
    
    // Actualizar estadísticas cada 30 segundos
    const interval = setInterval(cargarEstadisticas, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const funcionalidades = [
    {
      titulo: "Consejo IA",
      descripcion: "Análisis inteligente de casos con múltiples especialistas",
      icono: Brain,
      ruta: "/consejo-ia",
      color: "bg-blue-500"
    },
    {
      titulo: "Dashboard Geográfico",
      descripcion: "Visualización de datos territoriales y casos",
      icono: MapPin,
      ruta: "/geo-dashboard",
      color: "bg-green-500"
    },
    {
      titulo: "Auditoría Forense",
      descripcion: "Análisis forense digital avanzado",
      icono: Shield,
      ruta: "/auditoria-forense",
      color: "bg-purple-500"
    },
    {
      titulo: "PQRSFD",
      descripcion: "Sistema de peticiones, quejas y reclamos",
      icono: FileText,
      ruta: "/pqrsfd",
      color: "bg-orange-500"
    },
    {
      titulo: "Acción de Tutela",
      descripcion: "Protección de derechos fundamentales",
      icono: Gavel,
      ruta: "/accion-tutela",
      color: "bg-red-500"
    },
    {
      titulo: "Planes Etnodesarrollo",
      descripcion: "Gestión de planes de desarrollo étnico",
      icono: Globe,
      ruta: "/planes-etnodesarrollo",
      color: "bg-indigo-500"
    }
  ];

  const tecnologias = [
    { nombre: "Laravel Backend", descripcion: "API robusta y escalable" },
    { nombre: "React Frontend", descripcion: "Interfaz moderna y responsiva" },
    { nombre: "Inteligencia Artificial", descripcion: "Análisis automático de casos" },
    { nombre: "Análisis Geográfico", descripcion: "Visualización territorial avanzada" },
    { nombre: "Blockchain", descripcion: "Trazabilidad y seguridad" },
    { nombre: "Seguridad Avanzada", descripcion: "Protección de datos sensible" }
  ];

  const aspectosInnovadores = [
    {
      titulo: "Análisis Forense Digital",
      descripcion: "Herramientas avanzadas para análisis de evidencia digital",
      icono: Search
    },
    {
      titulo: "Inteligencia Artificial",
      descripcion: "IA especializada en análisis jurídico y social",
      icono: Brain
    },
    {
      titulo: "Análisis Geográfico",
      descripcion: "Visualización territorial y análisis espacial",
      icono: MapPin
    },
    {
      titulo: "Blockchain",
      descripcion: "Trazabilidad y seguridad de datos",
      icono: Lock
    },
    {
      titulo: "Anonimización Inteligente",
      descripcion: "Protección de datos personales",
      icono: Fingerprint
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Hero Section */}
      <div style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center', 
        color: 'white',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          Consejo de Veeduría y Desarrollo Territorial
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          marginBottom: '2rem',
          opacity: 0.9,
          maxWidth: '900px',
          margin: '0 auto 2rem'
        }}>
          Plataforma integral para la protección de derechos, análisis territorial, desarrollo comunitario y control social
        </p>
        
        {/* Descripción del Proyecto */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto 2rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          textAlign: 'left'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
            🏛️ Sobre el Sistema CSDT
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.95, marginBottom: '1rem' }}>
            El <strong>Sistema CSDT (Consejo de Soluciones y Desarrollo Territorial)</strong> es una plataforma tecnológica 
            integral diseñada para fortalecer la democracia, el acceso a la justicia y el desarrollo territorial sostenible 
            en Colombia. Integra <strong>11 módulos especializados con 77 páginas funcionales</strong> que abarcan desde la 
            protección de derechos fundamentales hasta el análisis territorial con inteligencia artificial.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.95 }}>
            Con tecnologías de vanguardia como <strong>Inteligencia Artificial, análisis geográfico avanzado, blockchain para 
            trazabilidad</strong> y sistemas de <strong>anonimización inteligente</strong>, el sistema facilita la participación 
            ciudadana, el control social, la veeduría ciudadana y la protección de derechos étnicos y territoriales.
          </p>
        </div>
        
        {/* Estadísticas en tiempo real */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem', 
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80' }}>
              {estadisticas.casosProcesados.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Casos Procesados</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#60a5fa' }}>
              {estadisticas.usuariosActivos.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Usuarios Activos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {estadisticas.documentosGenerados.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Documentos Generados</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ec4899' }}>
              {estadisticas.analisisCompletados.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Análisis Completados</div>
          </div>
        </div>

        {/* Botones de acción rápida */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/consejo-ia">
            <Button style={{ 
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}>
              <Brain style={{ marginRight: '0.5rem' }} />
              Consejo IA
            </Button>
          </Link>
          <Link to="/geo-dashboard">
            <Button style={{ 
              background: 'linear-gradient(45deg, #4ade80, #22c55e)',
              border: 'none',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}>
              <MapPin style={{ marginRight: '0.5rem' }} />
              Dashboard Geográfico
            </Button>
          </Link>
        </div>
      </div>

      {/* Sección Destacada: Consejo IA como Sistema de Guías */}
      <div style={{ 
        padding: '4rem 2rem', 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              <Brain style={{ display: 'inline', marginRight: '1rem' }} size={48} />
              Consejo IA: Tu Sistema de Guías Inteligente
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.95,
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              El <strong>Consejo de Inteligencia Artificial</strong> es el corazón del sistema CSDT, 
              funcionando como un <strong>sistema de guías especializado</strong> que te acompaña en cada paso 
              de tus procesos legales, sociales y territoriales.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Guía Legal General */}
            <Card style={{ 
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '2px solid #60a5fa'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
                }}>
                  <Gavel size={40} color="white" />
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '0.5rem'
                }}>
                  🏛️ Asesoría Legal General
                </h3>
              </div>
              <p style={{ 
                color: '#374151', 
                lineHeight: '1.7',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                El Consejo IA te <strong>guía paso a paso</strong> en casos legales diversos:
              </p>
              <ul style={{ color: '#4b5563', lineHeight: '1.8', marginLeft: '1.5rem' }}>
                <li>✅ Análisis jurídico especializado</li>
                <li>✅ Identificación de normativa aplicable</li>
                <li>✅ Precedentes jurisprudenciales</li>
                <li>✅ Recomendaciones estratégicas</li>
                <li>✅ Rutas de acción específicas</li>
              </ul>
              <p style={{ 
                marginTop: '1rem', 
                padding: '1rem',
                background: '#f0f9ff',
                borderRadius: '0.5rem',
                fontSize: '0.95rem',
                color: '#1e40af',
                fontWeight: '600'
              }}>
                💡 <strong>5 sistemas de IA especializados</strong> analizan tu caso desde diferentes perspectivas 
                para darte la guía más completa.
              </p>
            </Card>

            {/* Guía de Control Social */}
            <Card style={{ 
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '2px solid #10b981'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #10b981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
                }}>
                  <Eye size={40} color="white" />
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: '#065f46',
                  marginBottom: '0.5rem'
                }}>
                  👁️ Control Social & Veeduría
                </h3>
              </div>
              <p style={{ 
                color: '#374151', 
                lineHeight: '1.7',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                Sistema especializado que te <strong>guía en la vigilancia</strong> de la gestión pública:
              </p>
              <ul style={{ color: '#4b5563', lineHeight: '1.8', marginLeft: '1.5rem' }}>
                <li>✅ Análisis de transparencia</li>
                <li>✅ Seguimiento de contratación pública</li>
                <li>✅ Control presupuestal</li>
                <li>✅ Gestión de cronogramas</li>
                <li>✅ Participación ciudadana efectiva</li>
              </ul>
              <p style={{ 
                marginTop: '1rem', 
                padding: '1rem',
                background: '#f0fdf4',
                borderRadius: '0.5rem',
                fontSize: '0.95rem',
                color: '#065f46',
                fontWeight: '600'
              }}>
                💡 El sistema te <strong>guía con plantillas, formatos y metodologías</strong> para ejercer 
                control social efectivo sobre proyectos públicos.
              </p>
            </Card>
          </div>

          {/* Características del Sistema de Guías */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '2.5rem',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              🎯 ¿Cómo Funciona el Sistema de Guías?
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem' 
            }}>
              {[
                {
                  icon: FileText,
                  title: '1. Narración de Hechos',
                  description: 'Describe tu caso por escrito o con grabación de audio. El sistema transcribe automáticamente.'
                },
                {
                  icon: Brain,
                  title: '2. Análisis Inteligente',
                  description: 'Múltiples IAs especializadas analizan tu caso desde diferentes perspectivas jurídicas y sociales.'
                },
                {
                  icon: Lightbulb,
                  title: '3. Recomendaciones',
                  description: 'Recibes guías específicas, precedentes aplicables y rutas de acción estratégicas.'
                },
                {
                  icon: Download,
                  title: '4. Documentación',
                  description: 'Genera reportes PDF completos con todo el análisis y recomendaciones para tu caso.'
                }
              ].map((paso, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    border: '2px solid white'
                  }}>
                    <paso.icon size={35} />
                  </div>
                  <h4 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {paso.title}
                  </h4>
                  <p style={{ 
                    fontSize: '0.95rem', 
                    opacity: 0.9,
                    lineHeight: '1.6'
                  }}>
                    {paso.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Llamado a la Acción */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ 
              fontSize: '1.3rem', 
              marginBottom: '2rem',
              fontWeight: '600'
            }}>
              🚀 ¿Listo para recibir guías especializadas con IA?
            </p>
            <Link to="/consejo-ia">
              <Button style={{
                background: 'white',
                color: '#1e40af',
                border: 'none',
                padding: '1.25rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <Brain style={{ marginRight: '0.75rem' }} size={28} />
                Acceder al Consejo IA
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Funcionalidades Principales */}
      <div style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: '#1f2937'
          }}>
            Funcionalidades Implementadas
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {funcionalidades.map((func, index) => (
              <Link key={index} to={func.ruta} style={{ textDecoration: 'none' }}>
                <Card style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #667eea, #764ba2) border-box'
                }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: func.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}>
                    <func.icono size={40} color="white" />
                  </div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1rem',
                    color: '#1f2937'
                  }}>
                    {func.titulo}
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    lineHeight: '1.6',
                    marginBottom: '1rem'
                  }}>
                    {func.descripcion}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#667eea',
                    fontWeight: 'bold'
                  }}>
                    Acceder <ArrowRight style={{ marginLeft: '0.5rem' }} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 11 Módulos del Sistema */}
      <div style={{ 
        padding: '4rem 2rem', 
        background: 'white' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '1.5rem',
            color: '#1f2937'
          }}>
            📦 11 Módulos Especializados - 77 Páginas Funcionales
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            textAlign: 'center', 
            color: '#6b7280',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto 3rem'
          }}>
            El sistema CSDT integra 11 módulos especializados que cubren todos los aspectos de la 
            justicia, participación ciudadana y desarrollo territorial.
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {[
              {
                numero: '01',
                icon: Brain,
                color: '#3b82f6',
                titulo: 'Innovación e IA',
                paginas: '10 páginas',
                descripcion: 'Consejo IA, análisis étnico, auditoría forense, geo-dashboard y más herramientas de IA.'
              },
              {
                numero: '02',
                icon: Gavel,
                color: '#8b5cf6',
                titulo: 'Rama Judicial',
                paginas: '7 páginas',
                descripcion: 'Justicia civil, penal, laboral, familia, administrativa, paz y JEP.'
              },
              {
                numero: '03',
                icon: Shield,
                color: '#ef4444',
                titulo: 'Acciones Constitucionales',
                paginas: '5 páginas',
                descripcion: 'Tutela, habeas corpus, habeas data, acción popular y de cumplimiento.'
              },
              {
                numero: '04',
                icon: Users,
                color: '#f59e0b',
                titulo: 'Rama Ejecutiva',
                paginas: '1 página',
                descripcion: 'Gestión con la Presidencia de la República.'
              },
              {
                numero: '05',
                icon: FileText,
                color: '#10b981',
                titulo: 'Rama Legislativa',
                paginas: '1 página',
                descripcion: 'Interacción con el Congreso de la República.'
              },
              {
                numero: '06',
                icon: Eye,
                color: '#06b6d4',
                titulo: 'Órganos de Control',
                paginas: '10 páginas',
                descripcion: 'Procuraduría, defensoría, contraloría, fiscalía, PQRSFD y 5 tipos de veeduría.'
              },
              {
                numero: '07',
                icon: Users,
                color: '#ec4899',
                titulo: 'Participación Ciudadana',
                paginas: '6 páginas',
                descripcion: 'Consulta popular, referendo, plebiscito, revocatoria, cabildo e iniciativa popular.'
              },
              {
                numero: '08',
                icon: Globe,
                color: '#6366f1',
                titulo: 'Derechos Étnicos',
                paginas: '19 páginas',
                descripcion: 'Pueblos indígenas, afro, rom, territorios, consulta previa, etnodesarrollo y más.'
              },
              {
                numero: '09',
                icon: Database,
                color: '#14b8a6',
                titulo: 'Gestión Institucional',
                paginas: '5 páginas',
                descripcion: 'Inicio, institucional, proyectos, donaciones y dashboard general.'
              },
              {
                numero: '10',
                icon: Network,
                color: '#f97316',
                titulo: 'Servicios Compartidos',
                paginas: '7 páginas',
                descripcion: 'Contacto, ayuda, documentos, noticias, perfil, términos y convocatorias.'
              },
              {
                numero: '11',
                icon: Target,
                color: '#a855f7',
                titulo: 'Gestión de Proyectos',
                paginas: '6 páginas',
                descripcion: 'Dashboards diferenciados para administrador, operador y cliente con gestión MS Project.'
              }
            ].map((modulo, index) => (
              <Card key={index} style={{ 
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: `2px solid ${modulo.color}`,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Número del módulo */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  width: '80px',
                  height: '80px',
                  background: modulo.color,
                  opacity: 0.1,
                  borderRadius: '50%'
                }} />
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: modulo.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `0 4px 15px ${modulo.color}40`
                  }}>
                    <modulo.icon size={30} color="white" />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      color: modulo.color,
                      marginBottom: '0.25rem'
                    }}>
                      MÓDULO {modulo.numero}
                    </div>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: '0.5rem'
                    }}>
                      {modulo.titulo}
                    </h3>
                    <div style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      background: `${modulo.color}15`,
                      color: modulo.color,
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem'
                    }}>
                      {modulo.paginas}
                    </div>
                    <p style={{ 
                      fontSize: '0.95rem',
                      color: '#6b7280',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {modulo.descripcion}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Resumen Total */}
          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '1rem',
            color: 'white',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              ✅ Sistema 100% Completo
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '3rem',
              flexWrap: 'wrap',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              <div>📦 <strong>11 Módulos</strong> Especializados</div>
              <div>📄 <strong>77 Páginas</strong> Funcionales</div>
              <div>🗄️ <strong>28 Tablas</strong> de Base de Datos</div>
              <div>🔗 <strong>13 Servicios</strong> API</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visión y Misión */}
      <div style={{ 
        padding: '4rem 2rem', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '3rem' 
          }}>
            <Card style={{ padding: '2rem', background: 'white' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '1rem' 
              }}>
                <Target style={{ marginRight: '1rem', color: '#667eea' }} size={32} />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>
                  Visión
                </h3>
              </div>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.6', 
                color: '#4b5563' 
              }}>
                Ser la plataforma líder en Colombia para la protección de derechos fundamentales, 
                el análisis territorial inteligente y el desarrollo comunitario sostenible, 
                utilizando tecnología de vanguardia para garantizar la justicia social.
              </p>
            </Card>

            <Card style={{ padding: '2rem', background: 'white' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '1rem' 
              }}>
                <Activity style={{ marginRight: '1rem', color: '#22c55e' }} size={32} />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1f2937' }}>
                  Misión
                </h3>
              </div>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.6', 
                color: '#4b5563' 
              }}>
                Facilitar el acceso a la justicia y la participación ciudadana mediante 
                herramientas tecnológicas innovadoras, promoviendo la transparencia, 
                la equidad y el desarrollo territorial sostenible.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Objetivos del Proyecto */}
      <div style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: '#1f2937'
          }}>
            Objetivos del Proyecto
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            {[
              { titulo: "Protección de Derechos", descripcion: "Garantizar el acceso efectivo a la justicia", icono: Shield },
              { titulo: "Análisis Territorial", descripcion: "Visualización y análisis de datos geográficos", icono: MapPin },
              { titulo: "Participación Ciudadana", descripcion: "Fomentar la participación democrática", icono: Users },
              { titulo: "Transparencia", descripcion: "Promover la transparencia en procesos públicos", icono: Eye },
              { titulo: "Innovación Tecnológica", descripcion: "Implementar soluciones tecnológicas avanzadas", icono: Cpu },
              { titulo: "Desarrollo Sostenible", descripcion: "Apoyar el desarrollo territorial sostenible", icono: Globe }
            ].map((objetivo, index) => (
              <Card key={index} style={{ 
                padding: '1.5rem', 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
              }}>
                <objetivo.icono size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem',
                  color: '#1f2937'
                }}>
                  {objetivo.titulo}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  {objetivo.descripcion}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Aspectos Innovadores */}
      <div style={{ 
        padding: '4rem 2rem', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '3rem'
          }}>
            Aspectos Innovadores
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {aspectosInnovadores.map((aspecto, index) => (
              <Card key={index} style={{ 
                padding: '2rem', 
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <aspecto.icono size={32} style={{ marginRight: '1rem' }} />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                    {aspecto.titulo}
                  </h3>
                </div>
                <p style={{ 
                  lineHeight: '1.6',
                  opacity: 0.9
                }}>
                  {aspecto.descripcion}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Tecnologías Utilizadas */}
      <div style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: '#1f2937'
          }}>
            Tecnologías Utilizadas
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {tecnologias.map((tech, index) => (
              <Card key={index} style={{ 
                padding: '1.5rem', 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                border: '2px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem',
                  color: '#1f2937'
                }}>
                  {tech.nombre}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  {tech.descripcion}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Noticias y Actualizaciones */}
      <div style={{ 
        padding: '4rem 2rem', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: '#1f2937'
          }}>
            Noticias y Actualizaciones
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            {noticias.map((noticia) => (
              <Card key={noticia.id} style={{ 
                padding: '2rem', 
                background: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <Badge style={{ 
                    background: '#667eea', 
                    color: 'white',
                    marginRight: '1rem'
                  }}>
                    {noticia.fecha}
                  </Badge>
                  <Star size={20} color="#fbbf24" />
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1rem',
                  color: '#1f2937'
                }}>
                  {noticia.titulo}
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  lineHeight: '1.6' 
                }}>
                  {noticia.resumen}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        padding: '3rem 2rem', 
        background: '#1f2937', 
        color: 'white',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem' 
        }}>
          Consejo de Veeduría y Desarrollo Territorial
        </h3>
        <p style={{ 
          opacity: 0.8, 
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Plataforma integral para la protección de derechos y el desarrollo territorial sostenible
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle size={20} style={{ marginRight: '0.5rem', color: '#22c55e' }} />
            <span>Seguro y Confiable</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Zap size={20} style={{ marginRight: '0.5rem', color: '#f59e0b' }} />
            <span>Rápido y Eficiente</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Award size={20} style={{ marginRight: '0.5rem', color: '#ec4899' }} />
            <span>Innovador</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
