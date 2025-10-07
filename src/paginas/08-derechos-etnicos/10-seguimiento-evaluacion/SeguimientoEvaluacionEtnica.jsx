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
  BarChart3, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Target,
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Users, 
  FileText,
  Brain,
  Download,
  Eye,
  Plus,
  Calendar,
  Award,
  Zap,
  Info,
  Search
} from 'lucide-react';

const SeguimientoEvaluacionEtnica = () => {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [evaluacion, setEvaluacion] = useState({
    // Identificación
    proyecto: '',
    pueblo: '',
    periodoEvaluacion: '',
    evaluador: '',
    
    // Indicadores de Resultado
    indicadoresResultado: [],
    
    // Indicadores de Impacto
    indicadoresImpacto: [],
    
    // Evaluación Participativa
    participacionComunidad: '',
    satisfaccionBeneficiarios: '',
    percepcionImpacto: '',
    
    // Análisis de Cumplimiento
    objetivosCumplidos: '',
    metasCumplidas: '',
    presupuestoEjecutado: '',
    cronogramaRealVsPrevisto: '',
    
    // Lecciones Aprendidas
    logros: '',
    dificultades: '',
    leccionesAprendidas: '',
    recomendacionesFuturo: '',
    
    // Análisis IA
    analisisIA: null
  });

  const [cargandoIA, setCargandoIA] = useState(false);

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    // Simular carga desde backend
    const proyectosMock = [
      {
        id: 1,
        nombre: 'Plan de Vida Pueblo Nasa',
        pueblo: 'Nasa (Páez)',
        tipo: 'Plan de Vida',
        fechaInicio: '2023-01-15',
        estado: 'En ejecución',
        avance: 45,
        presupuesto: 500000000,
        ejecutado: 225000000
      },
      {
        id: 2,
        nombre: 'Proyecto Educación Propia Wayuu',
        pueblo: 'Wayuu',
        tipo: 'Educación',
        fechaInicio: '2024-03-01',
        estado: 'En ejecución',
        avance: 25,
        presupuesto: 300000000,
        ejecutado: 75000000
      }
    ];
    
    setProyectos(proyectosMock);
  };

  const evaluarProyectoIA = async () => {
    if (!evaluacion.proyecto || !evaluacion.objetivosCumplidos) {
      alert('Complete la información de evaluación');
      return;
    }

    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      const analisis = {
        analisisCumplimiento: {
          especialista: "Dr. José Sulbrandt - Evaluación de Proyectos Sociales",
          
          evaluacionObjetivos: {
            nivel: evaluacion.objetivosCumplidos,
            analisis: "Nivel de cumplimiento de objetivos según indicadores",
            factores: {
              favorables: [
                "Participación comunitaria activa",
                "Articulación institucional efectiva",
                "Recursos ejecutados según plan"
              ],
              desfavorables: [
                "Demoras en gestión de recursos",
                "Cambios en contexto",
                "Capacidades técnicas limitadas"
              ]
            },
            recomendaciones: [
              "Fortalecer capacidades de ejecución",
              "Agilizar gestión de recursos",
              "Ajustar cronograma según realidad",
              "Incrementar acompañamiento técnico"
            ]
          },
          
          evaluacionMetas: {
            cumplimiento: evaluacion.metasCumplidas,
            analisis: "Metas cuantificables y verificables",
            indicadoresClaveDesempeño: [
              {
                indicador: "% de actividades ejecutadas",
                meta: "80%",
                alcanzado: evaluacion.metasCumplidas,
                estado: parseInt(evaluacion.metasCumplidas) >= 80 ? "✅ CUMPLE" : "⚠️ PARCIAL"
              },
              {
                indicador: "% de presupuesto ejecutado",
                meta: "85%",
                alcanzado: evaluacion.presupuestoEjecutado,
                estado: parseInt(evaluacion.presupuestoEjecutado) >= 85 ? "✅ CUMPLE" : "⚠️ PARCIAL"
              },
              {
                indicador: "Satisfacción beneficiarios",
                meta: "75%",
                alcanzado: evaluacion.satisfaccionBeneficiarios,
                estado: parseInt(evaluacion.satisfaccionBeneficiarios) >= 75 ? "✅ CUMPLE" : "⚠️ PARCIAL"
              }
            ]
          },
          
          evaluacionPresupuestal: {
            presupuestoTotal: "Según proyecto",
            ejecutado: evaluacion.presupuestoEjecutado + "%",
            eficiencia: parseInt(evaluacion.presupuestoEjecutado) >= 80 
              ? "Alta eficiencia en ejecución"
              : "Requiere mejorar ejecución presupuestal",
            transparencia: "Rendición de cuentas comunitaria requerida"
          }
        },

        analisisImpacto: {
          especialista: "Dra. Sara-Lafosse - Evaluación de Impacto Social",
          
          impactosCulturales: {
            nivel: "ALTO",
            evidencias: [
              "Fortalecimiento de identidad cultural",
              "Revitalización de prácticas tradicionales",
              "Mayor uso de idioma propio",
              "Transmisión intergeneracional mejorada"
            ],
            medicion: "Indicadores culturales cualitativos y cuantitativos",
            sostenibilidad: "Cambios culturales son sostenibles en el tiempo"
          },
          
          impactosSociales: {
            nivel: "MEDIO-ALTO",
            evidencias: [
              "Mejora en bienestar comunitario",
              "Fortalecimiento organizativo",
              "Mayor cohesión social",
              "Empoderamiento comunitario"
            ],
            beneficiariosDirectos: evaluacion.proyecto ? "Toda la comunidad" : "A especificar",
            beneficiariosIndirectos: "Pueblos vecinos y región"
          },
          
          impactosTerritorio: {
            nivel: "ALTO",
            evidencias: [
              "Mayor control territorial",
              "Ordenamiento implementado",
              "Protección de recursos",
              "Prevención de amenazas"
            ]
          },
          
          impactosEconomicos: {
            nivel: "MEDIO",
            evidencias: [
              "Generación de ingresos propios",
              "Proyectos productivos funcionando",
              "Mayor autonomía económica"
            ],
            sostenibilidad: "Requiere consolidación"
          }
        },

        analisisParticipativo: {
          especialista: "Dra. Patricia Botero - Metodologías Participativas",
          
          participacionReal: {
            nivel: evaluacion.participacionComunidad,
            analisis: "La participación comunitaria es fundamental para legitimidad y sostenibilidad",
            mecanismos: [
              "Asambleas comunitarias periódicas",
              "Comités de seguimiento",
              "Veedurías comunitarias",
              "Evaluaciones participativas"
            ],
            calidad: parseInt(evaluacion.participacionComunidad) >= 70 
              ? "Participación genuina y activa"
              : "Requiere fortalecer participación"
          },
          
          satisfaccionComunidad: {
            nivel: evaluacion.satisfaccionBeneficiarios + "%",
            interpretacion: parseInt(evaluacion.satisfaccionBeneficiarios) >= 75 
              ? "Alta satisfacción - Proyecto valorado por comunidad"
              : parseInt(evaluacion.satisfaccionBeneficiarios) >= 50
              ? "Satisfacción media - Requiere ajustes"
              : "Baja satisfacción - Requiere revisión profunda",
            factoresSatisfaccion: [
              "Cumplimiento de expectativas",
              "Participación en decisiones",
              "Beneficios tangibles",
              "Respeto a cultura y tradición"
            ]
          }
        },

        leccionesAprendidas: {
          especialista: "Dr. Peter Senge - Organizaciones que Aprenden",
          
          logrosDestacados: evaluacion.logros.split('\n').filter(l => l.trim()),
          
          dificultadesEnfrentadas: evaluacion.dificultades.split('\n').filter(d => d.trim()),
          
          aprendizajesClave: evaluacion.leccionesAprendidas.split('\n').filter(a => a.trim()),
          
          recomendacionesFuturo: [
            "Capitalizar logros y buenas prácticas",
            "Fortalecer aspectos débiles identificados",
            "Sistematizar experiencias para réplica",
            "Mantener participación comunitaria activa",
            "Documentar proceso para memoria colectiva"
          ],
          
          sostenibilidadAprendizajes: {
            documentacion: "Sistematizar en documento de lecciones aprendidas",
            socializacion: "Compartir con otras comunidades",
            institucionalizacion: "Incorporar en procedimientos propios",
            replica: "Aplicar aprendizajes en nuevos proyectos"
          }
        },

        resumenEjecutivo: {
          proyecto: evaluacion.proyecto,
          pueblo: evaluacion.pueblo,
          periodo: evaluacion.periodoEvaluacion,
          cumplimientoObjetivos: evaluacion.objetivosCumplidos + "%",
          cumplimientoMetas: evaluacion.metasCumplidas + "%",
          ejecucionPresupuestal: evaluacion.presupuestoEjecutado + "%",
          satisfaccionComunidad: evaluacion.satisfaccionBeneficiarios + "%",
          evaluacionGeneral: 
            (parseInt(evaluacion.objetivosCumplidos) + 
             parseInt(evaluacion.metasCumplidas) + 
             parseInt(evaluacion.presupuestoEjecutado) +
             parseInt(evaluacion.satisfaccionBeneficiarios)) / 4,
          calificacion: 
            ((parseInt(evaluacion.objetivosCumplidos) + 
              parseInt(evaluacion.metasCumplidas) + 
              parseInt(evaluacion.presupuestoEjecutado) +
              parseInt(evaluacion.satisfaccionBeneficiarios)) / 4) >= 80 
            ? "EXITOSO" 
            : ((parseInt(evaluacion.objetivosCumplidos) + 
                parseInt(evaluacion.metasCumplidas) + 
                parseInt(evaluacion.presupuestoEjecutado) +
                parseInt(evaluacion.satisfaccionBeneficiarios)) / 4) >= 60
            ? "SATISFACTORIO"
            : "REQUIERE MEJORAS",
          recomendacionPrincipal: "Proyecto con resultados positivos. Se recomienda continuar fortaleciendo participación comunitaria, mejorar ejecución presupuestal y sistematizar lecciones aprendidas para futuros proyectos.",
          decisionRecomendada: 
            ((parseInt(evaluacion.objetivosCumplidos) + 
              parseInt(evaluacion.metasCumplidas)) / 2) >= 70
            ? "CONTINUAR Y ESCALAR"
            : "AJUSTAR Y MEJORAR"
        },

        metadatos: {
          fechaAnalisis: new Date().toISOString(),
          especialistasConsultados: 3,
          metodologia: "Evaluación participativa con análisis IA",
          nivelConfianza: "90%"
        }
      };

      setEvaluacion(prev => ({
        ...prev,
        analisisIA: analisis
      }));
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarInformeEvaluacion = () => {
    if (!evaluacion.analisisIA) {
      alert('Primero evalúe con IA');
      return;
    }

    const informe = {
      titulo: `INFORME DE EVALUACIÓN - ${evaluacion.proyecto.toUpperCase()}`,
      pueblo: evaluacion.pueblo,
      periodo: evaluacion.periodoEvaluacion,
      fecha: new Date().toLocaleString('es-CO'),
      evaluacion: evaluacion,
      analisisIA: evaluacion.analisisIA,
      calificacion: evaluacion.analisisIA.resumenEjecutivo.calificacion,
      decision: evaluacion.analisisIA.resumenEjecutivo.decisionRecomendada
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(informe, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `evaluacion-${evaluacion.proyecto.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
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
              <BarChart3 size={60} style={{ marginRight: '1rem' }} />
              <Activity size={60} style={{ marginRight: '1rem' }} />
              <TrendingUp size={60} />
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Seguimiento y Evaluación Étnica
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.9,
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Sistema de Monitoreo y Evaluación para Proyectos y Planes Étnicos
              <br/>
              <span style={{ fontSize: '1.1rem' }}>
                Indicadores Culturales • Evaluación Participativa • Análisis IA
              </span>
            </p>
          </div>

          {/* Dashboard de Proyectos */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
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
              <FileText size={32} style={{ marginBottom: '0.5rem', margin: '0 auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{proyectos.length}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Proyectos en Seguimiento</div>
            </Card>
            
            <Card style={{ 
              padding: '1.5rem', 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <Activity size={32} style={{ marginBottom: '0.5rem', margin: '0 auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {proyectos.filter(p => p.estado === 'En ejecución').length}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>En Ejecución</div>
            </Card>
            
            <Card style={{ 
              padding: '1.5rem', 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <Users size={32} style={{ marginBottom: '0.5rem', margin: '0 auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {new Set(proyectos.map(p => p.pueblo)).size}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Pueblos Beneficiados</div>
            </Card>

            <Card style={{ 
              padding: '1.5rem', 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <TrendingUp size={32} style={{ marginBottom: '0.5rem', margin: '0 auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {proyectos.length > 0 
                  ? Math.round(proyectos.reduce((sum, p) => sum + p.avance, 0) / proyectos.length) + '%'
                  : '0%'
                }
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Avance Promedio</div>
            </Card>
          </div>

          <Tabs defaultValue="proyectos" style={{ background: 'white', borderRadius: '1rem', padding: '2rem' }}>
            <TabsList style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <TabsTrigger value="proyectos">
                <FileText style={{ marginRight: '0.5rem' }} />
                Proyectos
              </TabsTrigger>
              <TabsTrigger value="dashboard">
                <BarChart3 style={{ marginRight: '0.5rem' }} />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="evaluar">
                <Award style={{ marginRight: '0.5rem' }} />
                Evaluar
              </TabsTrigger>
              <TabsTrigger value="indicadores">
                <Target style={{ marginRight: '0.5rem' }} />
                Indicadores
              </TabsTrigger>
            </TabsList>

            <TabsContent value="proyectos">
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#0e7490' }}>
                  Proyectos en Seguimiento
                </h2>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  {proyectos.map((proyecto) => (
                    <Card key={proyecto.id} style={{ 
                      padding: '1.5rem',
                      background: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
                      border: '2px solid #67e8f9',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setProyectoSeleccionado(proyecto)}
                    >
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#0e7490', marginBottom: '0.75rem' }}>
                        {proyecto.nombre}
                      </h3>
                      
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ color: '#164e63', marginBottom: '0.25rem' }}>
                          <strong>Pueblo:</strong> {proyecto.pueblo}
                        </p>
                        <p style={{ color: '#164e63', marginBottom: '0.25rem' }}>
                          <strong>Tipo:</strong> {proyecto.tipo}
                        </p>
                        <p style={{ color: '#164e63' }}>
                          <strong>Inicio:</strong> {new Date(proyecto.fechaInicio).toLocaleDateString('es-CO')}
                        </p>
                      </div>

                      {/* Barra de Progreso */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.9rem', color: '#164e63', fontWeight: 'bold' }}>Avance:</span>
                          <span style={{ fontSize: '0.9rem', color: '#0891b2', fontWeight: 'bold' }}>
                            {proyecto.avance}%
                          </span>
                        </div>
                        <div style={{ 
                          width: '100%', 
                          height: '12px', 
                          background: '#e0f2fe', 
                          borderRadius: '6px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            width: `${proyecto.avance}%`, 
                            height: '100%', 
                            background: 'linear-gradient(90deg, #0891b2, #06b6d4)',
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                      </div>

                      <Badge style={{ 
                        background: proyecto.estado === 'En ejecución' ? '#10b981' : '#6b7280',
                        color: 'white',
                        fontSize: '0.85rem',
                        padding: '0.5rem 1rem'
                      }}>
                        {proyecto.estado}
                      </Badge>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="evaluar">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#0e7490' }}>
                  <Award style={{ display: 'inline', marginRight: '0.75rem' }} />
                  Evaluación de Proyecto con IA
                </h2>

                {/* Formulario de evaluación - estructura básica */}
                <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <Label>Proyecto a Evaluar</Label>
                    <Select
                      value={evaluacion.proyecto}
                      onValueChange={(value) => setEvaluacion(prev => ({ ...prev, proyecto: value }))}
                    >
                      <option value="">Seleccionar proyecto</option>
                      {proyectos.map(p => (
                        <option key={p.id} value={p.nombre}>{p.nombre}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <Button
                    onClick={evaluarProyectoIA}
                    disabled={cargandoIA}
                    style={{ 
                      background: cargandoIA ? '#9ca3af' : 'linear-gradient(45deg, #c026d3, #a21caf)',
                      border: 'none',
                      padding: '1.25rem 2.5rem',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: '0.75rem',
                      color: 'white',
                      cursor: cargandoIA ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <Brain style={{ marginRight: '0.75rem' }} />
                    {cargandoIA ? 'Evaluando...' : 'Evaluar con IA'}
                  </Button>
                </div>

                {evaluacion.analisisIA && (
                  <div style={{ 
                    marginTop: '2rem',
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    borderRadius: '0.75rem',
                    border: '3px solid #3b82f6'
                  }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '1.5rem' }}>
                      📊 Resultado de la Evaluación
                    </h3>
                    
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                          Calificación General:
                        </p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0891b2' }}>
                          {evaluacion.analisisIA.resumenEjecutivo.calificacion}
                        </p>
                      </div>
                      
                      <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                          Evaluación Promedio:
                        </p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                          {Math.round(evaluacion.analisisIA.resumenEjecutivo.evaluacionGeneral)}%
                        </p>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                      <Button
                        onClick={generarInformeEvaluacion}
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
                        Generar Informe de Evaluación (PDF)
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SeguimientoEvaluacionEtnica;
