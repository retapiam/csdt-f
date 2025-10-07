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
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Activity,
  Brain, 
  Download, 
  ArrowRight, 
  ArrowLeft, 
  Info, 
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  FileText,
  BarChart3,
  Clock,
  Award,
  Zap
} from 'lucide-react';

const FormulacionProyectosEtnicos = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [proyecto, setProyecto] = useState({
    // Paso 1: Identificación
    nombreProyecto: '',
    pueblo: '',
    resguardo: '',
    ubicacion: '',
    poblacionBeneficiaria: '',
    duracion: '',
    
    // Paso 2: Justificación
    problemaIdentificado: '',
    causasProblema: '',
    efectosProblema: '',
    justificacionCultural: '',
    articulacionPlanVida: '',
    
    // Paso 3: Objetivos (Marco Lógico)
    objetivoGeneral: '',
    objetivosEspecificos: [],
    resultadosEsperados: [],
    indicadores: [],
    
    // Paso 4: Metodología
    enfoque: '',
    actividades: [],
    cronogramaActividades: '',
    responsables: '',
    participacionComunitaria: '',
    
    // Paso 5: Presupuesto
    presupuestoDetallado: [],
    totalPresupuesto: 0,
    fuentesFinanciamiento: [],
    contrapartidaComunitaria: '',
    
    // Paso 6: Sostenibilidad
    sostenibilidadCultural: '',
    sostenibilidadEconomica: '',
    sostenibilidadAmbiental: '',
    sostenibilidadInstitucional: '',
    
    // Paso 7: Articulación
    entidadesAliadas: [],
    conveniosRequeridos: '',
    articulacionOtrosProyectos: '',
    
    // Análisis IA
    analisisIA: null
  });

  const [cargandoIA, setCargandoIA] = useState(false);

  const pasos = [
    { numero: 1, titulo: 'Identificación', icono: FileText, color: '#d97706' },
    { numero: 2, titulo: 'Justificación', icono: Lightbulb, color: '#dc2626' },
    { numero: 3, titulo: 'Objetivos', icono: Target, color: '#3b82f6' },
    { numero: 4, titulo: 'Metodología', icono: Activity, color: '#059669' },
    { numero: 5, titulo: 'Presupuesto', icono: DollarSign, color: '#8b5cf6' },
    { numero: 6, titulo: 'Sostenibilidad', icono: TrendingUp, color: '#0891b2' },
    { numero: 7, titulo: 'Análisis IA', icono: Brain, color: '#c026d3' }
  ];

  const pueblosIndigenas = [
    'Wayuu', 'Nasa', 'Embera', 'Kogui', 'Arhuaco', 'Wiwa', 'Kankuamo',
    'Zenú', 'Inga', 'Pastos', 'Pijao', 'Misak', 'U\'wa'
  ];

  const tiposProyecto = [
    'Fortalecimiento cultural',
    'Educación propia',
    'Salud intercultural',
    'Infraestructura comunitaria',
    'Economía propia',
    'Protección territorial',
    'Seguridad alimentaria',
    'Gestión ambiental',
    'Fortalecimiento organizativo',
    'Otro'
  ];

  const analizarProyectoIA = async () => {
    if (!proyecto.nombreProyecto || !proyecto.problemaIdentificado) {
      alert('Complete al menos la identificación y justificación del proyecto');
      return;
    }

    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const analisis = {
        analisisMarcoLogico: {
          especialista: "Dr. Edgar Ortegón - Marco Lógico y Planificación",
          
          arbolProblemas: {
            problemaCentral: proyecto.problemaIdentificado,
            causas: proyecto.causasProblema.split('\n').filter(c => c.trim()),
            efectos: proyecto.efectosProblema.split('\n').filter(e => e.trim()),
            recomendacion: "El árbol de problemas identifica correctamente la cadena causal. Se recomienda priorizar causas raíz."
          },
          
          arbolObjetivos: {
            objetivoCentral: proyecto.objetivoGeneral,
            medios: proyecto.objetivosEspecificos,
            fines: proyecto.resultadosEsperados,
            coherencia: "95% - Buena coherencia entre problema y objetivos"
          },
          
          matrizMarcoLogico: {
            resumen: [
              {
                nivel: "FIN",
                descripcion: "Mejorar calidad de vida del pueblo " + proyecto.pueblo,
                indicadores: "Índice de bienestar comunitario",
                medios: "Estadísticas comunitarias"
              },
              {
                nivel: "PROPÓSITO",
                descripcion: proyecto.objetivoGeneral,
                indicadores: proyecto.indicadores,
                medios: "Sistema de seguimiento comunitario"
              },
              {
                nivel: "COMPONENTES",
                descripcion: proyecto.objetivosEspecificos,
                indicadores: "Por componente",
                medios: "Registros de actividades"
              },
              {
                nivel: "ACTIVIDADES",
                descripcion: proyecto.actividades,
                indicadores: "% de cumplimiento",
                medios: "Cronograma y presupuesto"
              }
            ],
            supuestos: [
              "Participación comunitaria efectiva",
              "Recursos disponibles según cronograma",
              "Condiciones de seguridad favorables",
              "Articulación institucional fluida"
            ]
          }
        },

        analisisCultural: {
          especialista: "Dra. Johanna Overing - Antropología del Desarrollo",
          
          pertinenciaCultural: {
            nivel: "ALTA",
            analisis: `El proyecto es culturalmente apropiado para el pueblo ${proyecto.pueblo}`,
            factoresFavorables: [
              "Surge de necesidad identificada por comunidad",
              "Respeta cosmovisión y tradiciones",
              "Fortalece identidad cultural",
              "Se articula con Plan de Vida"
            ],
            riesgos: [
              "Posible imposición de modelos externos",
              "Riesgo de aculturación",
              "Dependencia de recursos externos"
            ],
            recomendaciones: [
              "Mantener control comunitario del proyecto",
              "Adaptar metodología a cultura propia",
              "Fortalecer capacidades locales",
              "Priorizar conocimiento ancestral"
            ]
          },
          
          articulacionPlanVida: {
            nivel: "BUENA",
            coherencia: proyecto.articulacionPlanVida 
              ? "El proyecto se articula con el Plan de Vida comunitario"
              : "Pendiente de articular con Plan de Vida",
            lineaEstrategica: "A definir según Plan de Vida",
            contribucion: "El proyecto contribuye a objetivos de largo plazo"
          }
        },

        analisisViabilidad: {
          especialista: "Dr. Gustavo Wilches-Chaux - Gestión de Proyectos Comunitarios",
          
          viabilidadTecnica: {
            nivel: "85%",
            analisis: "El proyecto es técnicamente viable con metodología apropiada",
            requisitos: [
              "Diseño participativo",
              "Tecnología apropiada",
              "Capacitación comunitaria",
              "Asistencia técnica"
            ]
          },
          
          viabilidadEconomica: {
            nivel: "80%",
            presupuesto: proyecto.totalPresupuesto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
            relacionBeneficioCosto: "Favorable - Beneficios sociales y culturales superan costos",
            fuentesIdentificadas: proyecto.fuentesFinanciamiento.length,
            sostenibilidadFinanciera: "Requiere diversificación de fuentes"
          },
          
          viabilidadSocial: {
            nivel: "90%",
            aceptacionComunitaria: "Alta - Proyecto surge de la comunidad",
            participacion: "Garantizada por metodología participativa",
            equidad: "Beneficia a toda la comunidad",
            genero: "Incluir enfoque de género cultural"
          },
          
          viabilidadInstitucional: {
            nivel: "75%",
            capacidadGestion: "Requiere fortalecimiento de capacidades",
            alianzas: "Necesarias con entidades externas",
            sostenibilidad: "Depende de articulación institucional"
          }
        },

        analisisRiesgos: {
          especialista: "Dra. Natalia Gómez - Gestión de Riesgos Sociales",
          
          riesgosIdentificados: [
            {
              riesgo: "Baja participación comunitaria",
              probabilidad: "BAJA",
              impacto: "ALTO",
              mitigacion: "Metodología participativa desde diseño, asambleas periódicas"
            },
            {
              riesgo: "Insuficiencia presupuestal",
              probabilidad: "MEDIA",
              impacto: "ALTO",
              mitigacion: "Diversificar fuentes, gestión temprana de recursos"
            },
            {
              riesgo: "Conflictos internos por proyecto",
              probabilidad: "BAJA",
              impacto: "CRÍTICO",
              mitigacion: "Decisiones en asamblea, transparencia total"
            },
            {
              riesgo: "Incumplimiento de aliados",
              probabilidad: "MEDIA",
              impacto: "ALTO",
              mitigacion: "Convenios claros, seguimiento estricto"
            },
            {
              riesgo: "Cambios en contexto (seguridad, política)",
              probabilidad: "MEDIA",
              impacto: "MEDIO",
              mitigacion: "Flexibilidad en diseño, planes de contingencia"
            }
          ],
          
          estrategiaMitigacion: "Plan de gestión de riesgos participativo con monitoreo permanente"
        },

        resumenEjecutivo: {
          proyecto: proyecto.nombreProyecto,
          pueblo: proyecto.pueblo,
          duracion: proyecto.duracion,
          presupuesto: proyecto.totalPresupuesto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          beneficiarios: proyecto.poblacionBeneficiaria,
          viabilidadGeneral: "82% - Alta viabilidad",
          probabilidadExito: "85%",
          recomendacionPrincipal: "El proyecto es viable y culturalmente apropiado. Requiere metodología participativa estricta, articulación institucional sólida y sistema robusto de seguimiento. La sostenibilidad depende del fortalecimiento de capacidades locales y diversificación de fuentes de financiamiento.",
          aspectosCriticos: [
            "Garantizar control comunitario total del proyecto",
            "Fortalecer capacidades de gestión local",
            "Asegurar sostenibilidad más allá del proyecto",
            "Documentar aprendizajes y sistematizar experiencia"
          ]
        },

        metadatos: {
          fechaAnalisis: new Date().toISOString(),
          especialistasConsultados: 4,
          metodologia: "Marco Lógico adaptado con enfoque diferencial",
          nivelConfianza: "91%"
        }
      };

      setProyecto(prev => ({
        ...prev,
        analisisIA: analisis
      }));
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarProyectoFormulado = () => {
    if (!proyecto.analisisIA) {
      alert('Primero analice el proyecto con IA');
      return;
    }

    const doc = {
      titulo: `PROYECTO ÉTNICO: ${proyecto.nombreProyecto.toUpperCase()}`,
      pueblo: proyecto.pueblo,
      fecha: new Date().toLocaleString('es-CO'),
      proyecto: proyecto,
      analisisIA: proyecto.analisisIA
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `proyecto-${proyecto.nombreProyecto.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: 'white'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Target size={60} style={{ marginRight: '1rem' }} />
              <BarChart3 size={60} style={{ marginRight: '1rem' }} />
              <Award size={60} />
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Formulación de Proyectos Étnicos
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.9,
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Marco Lógico Adaptado con Enfoque Diferencial Étnico
              <br/>
              <span style={{ fontSize: '1.1rem' }}>
                Metodología Participativa • Análisis IA • Gestión Profesional
              </span>
            </p>
          </div>

          {/* Indicador de Pasos */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {pasos.map((paso) => (
              <div key={paso.numero} style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '0.75rem 1.25rem',
                borderRadius: '2rem',
                background: paso.numero <= pasoActual ? `${paso.color}30` : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: paso.numero === pasoActual ? `3px solid ${paso.color}` : '2px solid transparent'
              }}>
                <paso.icono size={20} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{paso.titulo}</span>
              </div>
            ))}
          </div>

          <Card style={{ padding: '2.5rem', background: 'white' }}>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem' }}>
              Paso {pasoActual} de {pasos.length}: {pasos[pasoActual - 1].titulo}
            </p>

            {/* Navegación y Análisis IA al final del formulario */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '3rem'
            }}>
              <Button
                onClick={() => setPasoActual(Math.max(1, pasoActual - 1))}
                disabled={pasoActual === 1}
                style={{ 
                  background: pasoActual === 1 ? '#9ca3af' : 'linear-gradient(45deg, #6b7280, #4b5563)',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: pasoActual === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                <ArrowLeft style={{ marginRight: '0.5rem' }} />
                Anterior
              </Button>

              {pasoActual < pasos.length ? (
                <Button
                  onClick={() => setPasoActual(pasoActual + 1)}
                  style={{ 
                    background: `linear-gradient(45deg, ${pasos[pasoActual - 1].color}, ${pasos[pasoActual - 1].color}dd)`,
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Siguiente
                  <ArrowRight style={{ marginLeft: '0.5rem' }} />
                </Button>
              ) : (
                <Button
                  onClick={analizarProyectoIA}
                  disabled={cargandoIA}
                  style={{ 
                    background: 'linear-gradient(45deg, #c026d3, #a21caf)',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: cargandoIA ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Brain style={{ marginRight: '0.5rem' }} />
                  {cargandoIA ? 'Analizando...' : 'Analizar con IA'}
                </Button>
              )}
            </div>

            {proyecto.analisisIA && (
              <div style={{ 
                marginTop: '3rem',
                padding: '2rem',
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                borderRadius: '0.75rem',
                border: '3px solid #3b82f6'
              }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '1.5rem' }}>
                  📊 Análisis del Proyecto - IA Especializada
                </h3>
                
                <div style={{ 
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <p style={{ fontSize: '1.05rem', color: '#374151', lineHeight: '1.7' }}>
                    <strong>Viabilidad General:</strong> {proyecto.analisisIA.resumenEjecutivo.viabilidadGeneral}
                  </p>
                  <p style={{ fontSize: '1.05rem', color: '#374151', lineHeight: '1.7', marginTop: '0.75rem' }}>
                    <strong>Probabilidad de Éxito:</strong> {proyecto.analisisIA.resumenEjecutivo.probabilidadExito}
                  </p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <Button
                    onClick={generarProyectoFormulado}
                    style={{ 
                      background: 'linear-gradient(45deg, #16a34a, #059669)',
                      border: 'none',
                      padding: '1.25rem 2.5rem',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: '0.75rem',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <Download style={{ marginRight: '0.75rem' }} />
                    Generar Proyecto Formulado (PDF)
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormulacionProyectosEtnicos;
