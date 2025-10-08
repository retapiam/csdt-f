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
          fontSize: '1.35rem', 
          marginBottom: '2rem',
          opacity: 0.95,
          maxWidth: '1000px',
          margin: '0 auto 2rem',
          fontWeight: '500'
        }}>
          Plataforma tecnológica integral con Inteligencia Artificial para la protección de derechos de víctimas, 
          lucha contra la corrupción, análisis territorial, desarrollo comunitario y control social efectivo
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
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
            🏛️ Sobre el Sistema CSDT - Consejo de Soluciones y Desarrollo Territorial
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#fbbf24' }}>
              📋 ¿Qué es el Sistema CSDT?
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.9', opacity: 0.95 }}>
              El <strong>Sistema CSDT (Consejo de Soluciones y Desarrollo Territorial)</strong> es una plataforma tecnológica 
              integral de última generación diseñada para <strong>fortalecer la democracia, garantizar el acceso efectivo a la justicia, 
              proteger a las víctimas</strong> y promover el desarrollo territorial sostenible en Colombia. Integra <strong>11 módulos 
              especializados con 77 páginas funcionales completamente operativas</strong> que abarcan desde la protección de derechos 
              fundamentales hasta el análisis territorial inteligente con IA avanzada.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#4ade80' }}>
              🛡️ Protección de Víctimas y Derechos Fundamentales
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.9', opacity: 0.95 }}>
              El sistema está diseñado especialmente para <strong>proteger a víctimas de vulneración de derechos</strong>, ofreciendo:
            </p>
            <ul style={{ fontSize: '1.05rem', lineHeight: '1.8', opacity: 0.95, marginLeft: '2rem', marginTop: '0.5rem' }}>
              <li>✅ <strong>Acciones de tutela automatizadas</strong> para protección inmediata de derechos fundamentales</li>
              <li>✅ <strong>Asesoría legal gratuita con IA</strong> especializada en casos de víctimas</li>
              <li>✅ <strong>Protección de identidad</strong> mediante sistemas de anonimización inteligente</li>
              <li>✅ <strong>Acompañamiento integral</strong> desde la denuncia hasta la reparación</li>
              <li>✅ <strong>Acceso a justicia especializada</strong> (JEP, jurisdicción indígena, justicia ordinaria)</li>
              <li>✅ <strong>Seguimiento de casos</strong> con análisis geográfico y temporal</li>
              <li>✅ <strong>Generación automática de documentos legales</strong> en formatos oficiales</li>
            </ul>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#f87171' }}>
              🚫 Lucha Contra la Corrupción
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.9', opacity: 0.95 }}>
              El sistema cuenta con <strong>herramientas avanzadas para detectar, prevenir y denunciar la corrupción</strong>:
            </p>
            <ul style={{ fontSize: '1.05rem', lineHeight: '1.8', opacity: 0.95, marginLeft: '2rem', marginTop: '0.5rem' }}>
              <li>✅ <strong>5 tipos de veeduría ciudadana especializada</strong>: gestión pública, contratación, derechos ambientales, rendición de cuentas y participación</li>
              <li>✅ <strong>Análisis inteligente de contratación pública</strong> con detección de irregularidades</li>
              <li>✅ <strong>Control presupuestal automatizado</strong> con alertas de desviaciones</li>
              <li>✅ <strong>Seguimiento de cronogramas</strong> y cumplimiento de metas</li>
              <li>✅ <strong>Auditoría forense digital</strong> con trazabilidad blockchain</li>
              <li>✅ <strong>Análisis de transparencia</strong> y acceso a información pública</li>
              <li>✅ <strong>Sistema PQRSFD</strong> para denuncias ciudadanas con seguimiento en tiempo real</li>
              <li>✅ <strong>Conexión con órganos de control</strong>: Procuraduría, Contraloría, Fiscalía y Defensoría</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#60a5fa' }}>
              🚀 Tecnologías de Vanguardia
            </h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.9', opacity: 0.95 }}>
              Con tecnologías de última generación como <strong>Inteligencia Artificial especializada (5 sistemas de IA), 
              análisis geográfico avanzado con mapas interactivos, blockchain para trazabilidad inmutable</strong>, sistemas de 
              <strong>anonimización inteligente para protección de víctimas</strong>, y <strong>generación automática de documentos 
              legales en PDF</strong>, el sistema facilita la participación ciudadana efectiva, el control social riguroso, 
              la veeduría ciudadana profesional y la protección integral de derechos étnicos y territoriales.
            </p>
          </div>
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
                El Consejo IA te <strong>guía paso a paso</strong> en casos legales diversos con <strong>análisis multidisciplinario</strong>:
              </p>
              <ul style={{ color: '#4b5563', lineHeight: '1.8', marginLeft: '1.5rem' }}>
                <li>✅ <strong>Análisis jurídico especializado</strong> en derecho constitucional, penal, civil y administrativo</li>
                <li>✅ <strong>Identificación automática de normativa aplicable</strong>: leyes, decretos, sentencias</li>
                <li>✅ <strong>Precedentes jurisprudenciales relevantes</strong> de la Corte Constitucional y Consejo de Estado</li>
                <li>✅ <strong>Recomendaciones estratégicas personalizadas</strong> según tu situación específica</li>
                <li>✅ <strong>Rutas de acción detalladas</strong> con cronogramas y pasos a seguir</li>
                <li>✅ <strong>Generación de documentos legales</strong> listos para presentar ante autoridades</li>
                <li>✅ <strong>Identificación de víctimas y protección especial</strong> para casos sensibles</li>
                <li>✅ <strong>Análisis de probabilidad de éxito</strong> basado en casos similares</li>
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
                💡 <strong>5 sistemas de IA especializados funcionan en paralelo</strong>: Análisis Jurídico, IAs Profesionales, 
                IA Mejorada, ChatGPT Optimizado y Sistema IA Profesional. Cada uno analiza tu caso desde diferentes perspectivas 
                jurídicas, sociales y éticas para ofrecerte <strong>la guía más completa y precisa posible</strong>.
              </p>
              <p style={{ 
                marginTop: '1rem', 
                padding: '1rem',
                background: '#fef3c7',
                borderRadius: '0.5rem',
                fontSize: '0.95rem',
                color: '#b45309',
                fontWeight: '600'
              }}>
                ⚡ <strong>Ventaja Única:</strong> A diferencia de consultas individuales con IA, nuestro sistema 
                <strong> consulta 5 IAs simultáneamente</strong> y genera un <strong>análisis unificado consensuado</strong> 
                con mayor precisión y confiabilidad. Además, genera <strong>PDFs profesionales</strong> con todo el análisis 
                que puedes presentar ante autoridades judiciales.
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
                Sistema especializado que te <strong>guía en la vigilancia profesional</strong> de la gestión pública con <strong>herramientas anticorrupción</strong>:
              </p>
              <ul style={{ color: '#4b5563', lineHeight: '1.8', marginLeft: '1.5rem' }}>
                <li>✅ <strong>Análisis de transparencia</strong> con verificación de cumplimiento de normativa</li>
                <li>✅ <strong>Seguimiento de contratación pública</strong> con detección de irregularidades</li>
                <li>✅ <strong>Control presupuestal inteligente</strong> con alertas de desviaciones y sobrecostos</li>
                <li>✅ <strong>Gestión de cronogramas</strong> comparando avance físico vs. financiero</li>
                <li>✅ <strong>Participación ciudadana efectiva</strong> con metodologías certificadas</li>
                <li>✅ <strong>Evaluación de calidad</strong> de obras y servicios públicos</li>
                <li>✅ <strong>Generación de informes de hallazgos</strong> con evidencias documentadas</li>
                <li>✅ <strong>Conexión directa con órganos de control</strong> para reportar irregularidades</li>
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
                💡 El sistema analiza <strong>5 aspectos críticos en paralelo</strong>: Transparencia, Contratación, 
                Presupuesto, Cronograma y Participación. Te proporciona <strong>plantillas profesionales, formatos oficiales, 
                metodologías certificadas y listas de verificación</strong> para ejercer control social efectivo y detectar 
                posibles casos de corrupción en proyectos públicos.
              </p>
              <p style={{ 
                marginTop: '1rem', 
                padding: '1rem',
                background: '#fef2f2',
                borderRadius: '0.5rem',
                fontSize: '0.95rem',
                color: '#dc2626',
                fontWeight: '600'
              }}>
                🚨 <strong>Función Anticorrupción:</strong> El sistema <strong>compara automáticamente</strong> los datos del 
                proyecto con estándares legales, promedios de mercado y bases de datos de proyectos similares para 
                <strong> identificar sobrecostos, demoras injustificadas y posibles irregularidades</strong>. Los hallazgos se 
                documentan con evidencias y se pueden reportar directamente a Contraloría, Procuraduría o Fiscalía.
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
                lineHeight: '1.8', 
                color: '#4b5563' 
              }}>
                Ser la <strong>plataforma tecnológica líder en Colombia y Latinoamérica</strong> para la protección 
                integral de derechos fundamentales, la defensa de víctimas, la lucha efectiva contra la corrupción, 
                el análisis territorial inteligente y el desarrollo comunitario sostenible, convirtiéndonos en el 
                <strong>referente nacional en el uso de Inteligencia Artificial para la justicia social</strong> y 
                el control ciudadano, garantizando <strong>acceso gratuito y universal a la justicia</strong> mediante 
                tecnologías de vanguardia que democraticen el conocimiento jurídico y fortalezcan la participación 
                ciudadana en la vigilancia de lo público.
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
                lineHeight: '1.8', 
                color: '#4b5563' 
              }}>
                <strong>Facilitar el acceso gratuito, efectivo y universal a la justicia</strong> para todos los ciudadanos, 
                especialmente para <strong>víctimas de vulneración de derechos y comunidades vulnerables</strong>, mediante 
                herramientas tecnológicas innovadoras que incluyen <strong>Inteligencia Artificial especializada, análisis 
                geográfico avanzado y sistemas anticorrupción</strong>. Promover activamente la <strong>transparencia en la 
                gestión pública, el control social efectivo, la participación ciudadana informada</strong> y el <strong>desarrollo 
                territorial sostenible con enfoque étnico y de género</strong>. Proporcionar <strong>capacitación, asesoría 
                y acompañamiento integral</strong> a ciudadanos, comunidades y organizaciones sociales en la defensa de sus 
                derechos y en el ejercicio de la <strong>veeduría ciudadana profesional como mecanismo de lucha contra la 
                corrupción</strong>.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Objetivos Generales y Específicos */}
      <div style={{ 
        padding: '4rem 2rem', 
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: '#1f2937'
          }}>
            🎯 Objetivos del Proyecto CSDT
          </h2>

          {/* Objetivo General */}
          <Card style={{ 
            padding: '2.5rem', 
            marginBottom: '3rem',
            background: 'white',
            border: '3px solid #3b82f6'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1.5rem' 
            }}>
              <Target style={{ marginRight: '1rem', color: '#3b82f6' }} size={40} />
              <h3 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#1e40af' 
              }}>
                Objetivo General
              </h3>
            </div>
            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: '1.9', 
              color: '#374151',
              textAlign: 'justify'
            }}>
              Desarrollar e implementar una <strong>plataforma tecnológica integral basada en Inteligencia Artificial</strong> 
              que facilite el <strong>acceso gratuito a la justicia, la protección de víctimas de vulneración de derechos</strong>, 
              el <strong>fortalecimiento del control social y la lucha efectiva contra la corrupción</strong> en Colombia, mediante 
              la integración de <strong>11 módulos especializados con 77 páginas funcionales</strong> que cubren los ámbitos 
              judicial, ejecutivo, legislativo, de control, participación ciudadana, derechos étnicos y gestión territorial, 
              promoviendo la <strong>transparencia, equidad, participación ciudadana informada</strong> y el <strong>desarrollo 
              sostenible con enfoque diferencial étnico, de género y territorial</strong>.
            </p>
          </Card>

          {/* Objetivos Específicos */}
          <h3 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '2rem',
            color: '#1f2937'
          }}>
            📌 Objetivos Específicos
          </h3>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            {/* Objetivo Específico 1 */}
            <Card style={{ padding: '2rem', background: 'white' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: '#3b82f6',
                  color: 'white',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginRight: '1rem',
                  flexShrink: 0
                }}>
                  1
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold', 
                    color: '#1e40af',
                    marginBottom: '0.75rem'
                  }}>
                    Protección Integral de Víctimas
                  </h4>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#4b5563' 
                  }}>
                    Implementar <strong>herramientas de IA especializadas</strong> para la identificación, protección y 
                    acompañamiento de <strong>víctimas de vulneración de derechos fundamentales</strong>, garantizando 
                    <strong>atención inmediata, anonimización de datos sensibles</strong> y <strong>generación automática 
                    de acciones de tutela y habeas corpus</strong> para protección urgente.
                  </p>
                </div>
              </div>
            </Card>

            {/* Objetivo Específico 2 */}
            <Card style={{ padding: '2rem', background: 'white' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginRight: '1rem',
                  flexShrink: 0
                }}>
                  2
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold', 
                    color: '#dc2626',
                    marginBottom: '0.75rem'
                  }}>
                    Combate Efectivo a la Corrupción
                  </h4>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#4b5563' 
                  }}>
                    Desarrollar <strong>5 tipos de veeduría ciudadana especializada</strong> con <strong>sistemas de IA 
                    para detección automática de irregularidades</strong> en contratación pública, gestión presupuestal 
                    y ejecución de proyectos, conectando directamente con <strong>órganos de control</strong> para 
                    reportes con evidencias documentadas.
                  </p>
                </div>
              </div>
            </Card>

            {/* Objetivo Específico 3 */}
            <Card style={{ padding: '2rem', background: 'white' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginRight: '1rem',
                  flexShrink: 0
                }}>
                  3
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold', 
                    color: '#059669',
                    marginBottom: '0.75rem'
                  }}>
                    Democratización del Acceso a Justicia
                  </h4>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#4b5563' 
                  }}>
                    Facilitar <strong>acceso gratuito y universal a asesoría jurídica especializada</strong> mediante 
                    el <strong>Consejo IA con 5 sistemas de inteligencia artificial en paralelo</strong>, eliminando 
                    barreras económicas, geográficas y de conocimiento para el acceso a la justicia.
                  </p>
                </div>
              </div>
            </Card>

            {/* Objetivo Específico 4 */}
            <Card style={{ padding: '2rem', background: 'white' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: '#f59e0b',
                  color: 'white',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginRight: '1rem',
                  flexShrink: 0
                }}>
                  4
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold', 
                    color: '#d97706',
                    marginBottom: '0.75rem'
                  }}>
                    Protección de Derechos Étnicos y Territoriales
                  </h4>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#4b5563' 
                  }}>
                    Garantizar la protección de <strong>derechos de pueblos indígenas, comunidades afrodescendientes 
                    y pueblo rom</strong>, implementando herramientas para <strong>consulta previa, planes de etnodesarrollo, 
                    protección de territorios ancestrales</strong> y <strong>análisis étnico con IA especializada</strong>.
                  </p>
                </div>
              </div>
            </Card>

            {/* Objetivo Específico 5 */}
            <Card style={{ padding: '2rem', background: 'white' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: '#8b5cf6',
                  color: 'white',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginRight: '1rem',
                  flexShrink: 0
                }}>
                  5
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold', 
                    color: '#7c3aed',
                    marginBottom: '0.75rem'
                  }}>
                    Participación Ciudadana Informada
                  </h4>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#4b5563' 
                  }}>
                    Fortalecer los <strong>mecanismos de participación ciudadana</strong> (consulta popular, referendo, 
                    plebiscito, cabildo abierto, revocatoria de mandato e iniciativa popular) mediante <strong>plataformas 
                    digitales</strong> que faciliten la <strong>participación informada, documentada y efectiva</strong>.
                  </p>
                </div>
              </div>
            </Card>

            {/* Objetivo Específico 6 */}
            <Card style={{ padding: '2rem', background: 'white' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: '#06b6d4',
                  color: 'white',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginRight: '1rem',
                  flexShrink: 0
                }}>
                  6
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold', 
                    color: '#0891b2',
                    marginBottom: '0.75rem'
                  }}>
                    Análisis Territorial Inteligente
                  </h4>
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#4b5563' 
                  }}>
                    Implementar <strong>sistemas de análisis geográfico avanzado</strong> con <strong>mapas interactivos, 
                    visualización de datos territoriales</strong> y <strong>análisis espacial con IA</strong> para 
                    identificar patrones, vulnerabilidades y oportunidades de desarrollo territorial sostenible.
                  </p>
                </div>
              </div>
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
            🎯 Beneficios y Alcances del Proyecto
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

      {/* Estructura de Trabajo y Procesos Recomendados */}
      <div style={{ 
        padding: '4rem 2rem', 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            🔄 Estructura de Trabajo y Procesos Recomendados
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            textAlign: 'center', 
            marginBottom: '3rem',
            opacity: 0.95,
            maxWidth: '900px',
            margin: '0 auto 3rem'
          }}>
            El Sistema CSDT está diseñado con una <strong>estructura modular y flujos de trabajo optimizados</strong> 
            para facilitar el acceso a la justicia y el control social efectivo
          </p>

          {/* Proceso 1: Para Víctimas */}
          <Card style={{ 
            padding: '2rem', 
            marginBottom: '2rem',
            background: 'rgba(255, 255, 255, 0.95)'
          }}>
            <h3 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              color: '#1e40af',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Shield style={{ marginRight: '1rem' }} size={32} />
              Proceso Recomendado para Víctimas de Vulneración de Derechos
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1.5rem',
              color: '#374151'
            }}>
              <div style={{ 
                padding: '1.5rem', 
                background: '#eff6ff', 
                borderRadius: '0.75rem',
                borderLeft: '4px solid #3b82f6'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#3b82f6',
                  marginBottom: '0.5rem'
                }}>
                  1️⃣
                </div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e40af' }}>
                  Acceso al Consejo IA
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Ingresa al <strong>Consejo IA</strong> y narra los hechos por escrito o grabación de voz. 
                  El sistema transcribe automáticamente.
                </p>
              </div>

              <div style={{ 
                padding: '1.5rem', 
                background: '#f0fdf4', 
                borderRadius: '0.75rem',
                borderLeft: '4px solid #10b981'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#10b981',
                  marginBottom: '0.5rem'
                }}>
                  2️⃣
                </div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#059669' }}>
                  Análisis Inteligente
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <strong>5 sistemas de IA analizan tu caso</strong> en paralelo, identificando derechos vulnerados, 
                  normativa aplicable y precedentes relevantes.
                </p>
              </div>

              <div style={{ 
                padding: '1.5rem', 
                background: '#fef3c7', 
                borderRadius: '0.75rem',
                borderLeft: '4px solid #f59e0b'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#f59e0b',
                  marginBottom: '0.5rem'
                }}>
                  3️⃣
                </div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#d97706' }}>
                  Recomendaciones
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Recibes <strong>guías específicas, rutas de acción</strong> y el sistema genera automáticamente 
                  <strong>acciones de tutela o habeas corpus</strong> si aplica.
                </p>
              </div>

              <div style={{ 
                padding: '1.5rem', 
                background: '#fce7f3', 
                borderRadius: '0.75rem',
                borderLeft: '4px solid #ec4899'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#ec4899',
                  marginBottom: '0.5rem'
                }}>
                  4️⃣
                </div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#be185d' }}>
                  Documentación
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Descarga <strong>reportes en PDF profesionales</strong> con todo el análisis para presentar 
                  ante autoridades judiciales.
                </p>
              </div>

              <div style={{ 
                padding: '1.5rem', 
                background: '#f3e8ff', 
                borderRadius: '0.75rem',
                borderLeft: '4px solid #a855f7'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#a855f7',
                  marginBottom: '0.5rem'
                }}>
                  5️⃣
                </div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#7c3aed' }}>
                  Seguimiento
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  El sistema crea una <strong>dependencia de seguimiento</strong> con código único para 
                  monitorear el avance de tu caso.
                </p>
              </div>
            </div>
          </Card>

          {/* Proceso 2: Para Veedores Ciudadanos */}
          <Card style={{ 
            padding: '2rem', 
            marginBottom: '2rem',
            background: 'rgba(255, 255, 255, 0.95)'
          }}>
            <h3 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              color: '#dc2626',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Eye style={{ marginRight: '1rem' }} size={32} />
              Proceso Recomendado para Veeduría Ciudadana y Control de Corrupción
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1.5rem',
              color: '#374151'
            }}>
              <div style={{ 
                padding: '1.5rem', 
                background: '#eff6ff', 
                borderRadius: '0.75rem',
                borderLeft: '4px solid #3b82f6'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#3b82f6',
                  marginBottom: '0.5rem'
                }}>
                  1️⃣
                </div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e40af' }}>
                  Seleccionar Tipo de Veeduría
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Accede al <strong>Consejo IA - Control Social & Veeduría</strong> y describe el proyecto 
                  público que deseas vigilar.
                </p>
              </div>

              <div style={{ 
                padding: '1.5rem', 
                background: '#f0fdf4', 
                borderRadius: '0.75rem',
                borderLeft: '4px solid #10b981'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#10b981',
                  marginBottom: '0.5rem'
                }}>
                  2️⃣
                </div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#059669' }}>
                  Análisis en 5 Dimensiones
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  El sistema analiza: <strong>Transparencia, Contratación, Presupuesto, Cronograma y Participación</strong> 
                  con detección de irregularidades.
                </p>
              </div>

              <div style={{ 
                padding: '1.5rem', 
                background: '#fef3c7', 
                borderRadius: '0.75rem',
                borderLeft: '4px solid #f59e0b'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#f59e0b',
                  marginBottom: '0.5rem'
                }}>
                  3️⃣
                </div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#d97706' }}>
                  Identificación de Hallazgos
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Recibes <strong>informes detallados</strong> con comparación vs. estándares legales, 
                  identificando <strong>sobrecostos, demoras e irregularidades</strong>.
                </p>
              </div>

              <div style={{ 
                padding: '1.5rem', 
                background: '#fef2f2', 
                borderRadius: '0.75rem',
                borderLeft: '4px solid #ef4444'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#ef4444',
                  marginBottom: '0.5rem'
                }}>
                  4️⃣
                </div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#dc2626' }}>
                  Documentación con Evidencias
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Genera <strong>informes de hallazgos con evidencias</strong> documentadas en formato oficial 
                  para órganos de control.
                </p>
              </div>

              <div style={{ 
                padding: '1.5rem', 
                background: '#f3e8ff', 
                borderRadius: '0.75rem',
                borderLeft: '4px solid #a855f7'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: '#a855f7',
                  marginBottom: '0.5rem'
                }}>
                  5️⃣
                </div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#7c3aed' }}>
                  Reporte a Órganos de Control
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Conecta directamente con <strong>Contraloría, Procuraduría o Fiscalía</strong> para 
                  reportar hallazgos con evidencias.
                </p>
              </div>
            </div>
          </Card>

          {/* Arquitectura del Sistema */}
          <Card style={{ 
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.95)'
          }}>
            <h3 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              color: '#059669',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Network style={{ marginRight: '1rem' }} size={32} />
              Arquitectura y Estructura del Sistema
            </h3>
            <div style={{ color: '#374151' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                El sistema está construido con una <strong>arquitectura moderna y escalable</strong>:
              </p>
              <ul style={{ fontSize: '1.05rem', lineHeight: '1.8', marginLeft: '2rem', marginBottom: '1rem' }}>
                <li>✅ <strong>Backend Laravel 11</strong> con API RESTful, arquitectura MVC y 28 tablas de base de datos</li>
                <li>✅ <strong>Frontend React 18</strong> con Vite, Tailwind CSS y 77 páginas completamente funcionales</li>
                <li>✅ <strong>11 Módulos Especializados</strong>: Innovación IA, Rama Judicial, Acciones Constitucionales, Rama Ejecutiva, 
                Rama Legislativa, Órganos de Control, Participación Ciudadana, Derechos Étnicos, Gestión Institucional, Servicios Compartidos 
                y Gestión de Proyectos</li>
                <li>✅ <strong>Sistema de Autenticación</strong> con roles y permisos granulares</li>
                <li>✅ <strong>5 Servicios de IA</strong> funcionando en paralelo para análisis multidimensional</li>
                <li>✅ <strong>Generación de PDFs profesionales</strong> con jsPDF para documentos legales oficiales</li>
                <li>✅ <strong>Mapas interactivos</strong> con Leaflet para análisis geográfico territorial</li>
                <li>✅ <strong>Sistema de dependencias y seguimiento</strong> de casos con códigos únicos</li>
                <li>✅ <strong>Auditoría forense digital</strong> con trazabilidad blockchain</li>
                <li>✅ <strong>Anonimización inteligente</strong> para protección de víctimas</li>
              </ul>
              <p style={{ 
                fontSize: '1.05rem', 
                lineHeight: '1.8',
                padding: '1rem',
                background: '#f0fdf4',
                borderRadius: '0.5rem',
                marginTop: '1rem',
                fontWeight: '600',
                color: '#065f46'
              }}>
                💡 <strong>Recomendación:</strong> Para aprovechar al máximo el sistema, comienza por el <strong>Consejo IA</strong> 
                para recibir guías especializadas. Luego explora los módulos específicos según tu necesidad. Todos los módulos 
                están interconectados y comparten información para ofrecerte una experiencia integral y fluida.
              </p>
            </div>
          </Card>
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
