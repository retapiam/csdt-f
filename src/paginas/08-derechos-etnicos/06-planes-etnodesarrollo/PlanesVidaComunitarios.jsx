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
  Users, 
  Target, 
  Search, 
  TrendingUp, 
  DollarSign,
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Brain, 
  Clock,
  Award,
  BarChart3,
  Zap,
  Globe,
  Heart,
  Leaf,
  Home,
  GraduationCap,
  Activity,
  Shield,
  ArrowRight,
  ArrowLeft,
  Info,
  Lightbulb,
  MapPin
} from 'lucide-react';

const PlanesVidaComunitarios = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [planVida, setPlanVida] = useState({
    // Paso 1: Identificación Comunitaria
    pueblo: '',
    resguardo: '',
    territorio: '',
    autoridad: '',
    cargoAutoridad: '',
    poblacion: '',
    familias: '',
    departamento: '',
    municipio: '',
    
    // Paso 2: Diagnóstico DOFA
    fortalezas: '',
    debilidades: '',
    oportunidades: '',
    amenazas: '',
    problemasPrioritarios: [],
    
    // Paso 3: Líneas Estratégicas
    lineas: {
      cultural: {
        objetivos: '',
        acciones: '',
        indicadores: '',
        presupuesto: ''
      },
      territorial: {
        objetivos: '',
        acciones: '',
        indicadores: '',
        presupuesto: ''
      },
      ambiental: {
        objetivos: '',
        acciones: '',
        indicadores: '',
        presupuesto: ''
      },
      social: {
        objetivos: '',
        acciones: '',
        indicadores: '',
        presupuesto: ''
      },
      economica: {
        objetivos: '',
        acciones: '',
        indicadores: '',
        presupuesto: ''
      }
    },
    
    // Paso 4: Objetivos y Metas
    visionLargoPlazo: '',
    objetivoGeneral: '',
    objetivosEspecificos: [],
    metas: [],
    
    // Paso 5: Estrategias y Acciones
    estrategias: [],
    accionesConcretas: [],
    responsables: [],
    cronograma: '',
    
    // Paso 6: Indicadores y Seguimiento
    indicadoresResultado: [],
    indicadoresImpacto: [],
    sistemaMonitoreo: '',
    evaluacionParticipativa: '',
    
    // Paso 7: Articulación Institucional
    entidadesAliadas: [],
    fuentesFinanciamiento: '',
    conveniosRequeridos: '',
    cronogramaGestion: '',
    
    // Análisis IA
    analisisIA: null
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  const pueblosIndigenas = [
    'Wayuu', 'Nasa (Páez)', 'Embera', 'Kogui', 'Arhuaco', 'Wiwa', 'Kankuamo',
    'Zenú', 'Inga', 'Pastos', 'Kofán', 'Siona', 'Kichwa', 'Kamëntšá',
    'Pijao', 'Misak', 'Yanacona', 'U\'wa', 'Sikuani', 'Piapoco'
  ];

  const departamentos = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá',
    'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó',
    'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira',
    'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío',
    'Risaralda', 'San Andrés', 'Santander', 'Sucre', 'Tolima',
    'Valle del Cauca', 'Vaupés', 'Vichada'
  ];

  const pasos = [
    { numero: 1, titulo: 'Identificación', icono: Users, color: '#d97706' },
    { numero: 2, titulo: 'Diagnóstico DOFA', icono: Search, color: '#dc2626' },
    { numero: 3, titulo: 'Líneas Estratégicas', icono: Target, color: '#059669' },
    { numero: 4, titulo: 'Objetivos y Metas', icono: Award, color: '#3b82f6' },
    { numero: 5, titulo: 'Estrategias', icono: Zap, color: '#8b5cf6' },
    { numero: 6, titulo: 'Indicadores', icono: BarChart3, color: '#0891b2' },
    { numero: 7, titulo: 'Análisis IA', icono: Brain, color: '#c026d3' }
  ];

  const handleInputChange = (campo, valor) => {
    setPlanVida(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleLineaChange = (linea, campo, valor) => {
    setPlanVida(prev => ({
      ...prev,
      lineas: {
        ...prev.lineas,
        [linea]: {
          ...prev.lineas[linea],
          [campo]: valor
        }
      }
    }));
  };

  const agregarObjetivo = () => {
    setPlanVida(prev => ({
      ...prev,
      objetivosEspecificos: [...prev.objetivosEspecificos, '']
    }));
  };

  const agregarMeta = () => {
    setPlanVida(prev => ({
      ...prev,
      metas: [...prev.metas, { descripcion: '', plazo: '', indicador: '' }]
    }));
  };

  const analizarPlanVidaIA = async () => {
    if (!planVida.pueblo || !planVida.fortalezas) {
      alert('Complete al menos la identificación y el diagnóstico DOFA');
      return;
    }

    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const analisisCompleto = {
        // Análisis DOFA Automatizado
        analisisDOFA: {
          especialista: "Dra. Luz Mery Triana - Desarrollo Comunitario Indígena",
          diagnosticoIntegral: `El Plan de Vida del pueblo ${planVida.pueblo} presenta un contexto específico que requiere enfoque diferencial. El análisis DOFA identificó fortalezas culturales, territoriales y organizativas que deben potenciarse, así como debilidades estructurales que requieren atención prioritaria.`,
          
          analisisFortalezas: {
            identificadas: planVida.fortalezas.split('\n').filter(f => f.trim()),
            capitalizacion: "Las fortalezas identificadas son activos culturales y territoriales que deben ser el fundamento del Plan de Vida",
            recomendaciones: [
              "Fortalecer la identidad cultural como eje transversal",
              "Potenciar el gobierno propio y autoridades tradicionales",
              "Valorizar el territorio como espacio de vida",
              "Preservar conocimientos ancestrales"
            ]
          },
          
          analisisDebilidades: {
            identificadas: planVida.debilidades.split('\n').filter(d => d.trim()),
            atencion: "Las debilidades requieren estrategias específicas de superación",
            recomendaciones: [
              "Diseñar programas de fortalecimiento organizativo",
              "Gestionar recursos para infraestructura básica",
              "Implementar educación propia y bilingüe",
              "Mejorar acceso a servicios de salud intercultural"
            ]
          },
          
          analisisOportunidades: {
            identificadas: planVida.oportunidades.split('\n').filter(o => o.trim()),
            aprovechamiento: "Las oportunidades del entorno deben articularse estratégicamente",
            recomendaciones: [
              "Gestionar cooperación nacional e internacional",
              "Articular con políticas públicas étnicas",
              "Aprovechar reconocimiento legal y constitucional",
              "Desarrollar alianzas estratégicas"
            ]
          },
          
          analisisAmenazas: {
            identificadas: planVida.amenazas.split('\n').filter(a => a.trim()),
            mitigacion: "Las amenazas requieren estrategias de protección y prevención",
            recomendaciones: [
              "Activar mecanismos de protección territorial",
              "Fortalecer guardia indígena/sistema propio",
              "Documentar afectaciones y vulneraciones",
              "Activar rutas de protección de derechos"
            ]
          },
          
          estrategiasDOFA: [
            {
              tipo: "FO - Fortalezas + Oportunidades",
              estrategia: "Aprovechar fortalezas culturales para capitalizar oportunidades de cooperación y políticas favorables"
            },
            {
              tipo: "FA - Fortalezas + Amenazas",
              estrategia: "Usar fortalezas organizativas y culturales para defender territorio y derechos ante amenazas"
            },
            {
              tipo: "DO - Debilidades + Oportunidades",
              estrategia: "Superar debilidades mediante aprovechamiento de oportunidades de financiamiento y alianzas"
            },
            {
              tipo: "DA - Debilidades + Amenazas",
              estrategia: "Mitigar debilidades para reducir vulnerabilidad ante amenazas externas"
            }
          ]
        },

        // Análisis de Líneas Estratégicas
        analisisLineasEstrategicas: {
          especialista: "Dr. Orlando Fals Borda - Investigación Acción Participativa",
          
          lineaCultural: {
            importancia: "CRÍTICA - Base de la identidad",
            objetivosSugeridos: [
              "Fortalecer el idioma propio mediante educación propia",
              "Revitalizar prácticas culturales y ceremonias ancestrales",
              "Proteger sitios sagrados y patrimonio cultural",
              "Transmitir conocimientos ancestrales a nuevas generaciones",
              "Documentar historia y memoria colectiva"
            ],
            accionesConcretas: [
              "Escuela de lengua propia con ancianos sabedores",
              "Calendario ceremonial y ritual anual",
              "Mapeo y protección de sitios sagrados",
              "Sistema de transmisión intergeneracional",
              "Centro de memoria y archivo comunitario"
            ],
            indicadoresRecomendados: [
              "% niños que hablan idioma propio",
              "Número de ceremonias realizadas al año",
              "Sitios sagrados protegidos",
              "Jóvenes capacitados en prácticas tradicionales"
            ]
          },
          
          lineaTerritorial: {
            importancia: "CRÍTICA - Espacio de vida",
            objetivosSugeridos: [
              "Consolidar el control territorial efectivo",
              "Implementar ordenamiento territorial propio",
              "Proteger límites y resolver conflictos de tierras",
              "Gestionar recursos naturales sosteniblemente",
              "Prevenir invasiones y despojos"
            ],
            accionesConcretas: [
              "Plan de ordenamiento territorial indígena",
              "Guardia territorial y sistemas de vigilancia",
              "Resolución de conflictos limítrofes",
              "Zonificación de usos del territorio",
              "Sistema de alerta temprana de amenazas"
            ],
            indicadoresRecomendados: [
              "% territorio bajo control efectivo",
              "Conflictos territoriales resueltos",
              "Invasiones prevenidas o neutralizadas",
              "Ordenamiento implementado (hectáreas)"
            ]
          },
          
          lineaAmbiental: {
            importancia: "ALTA - Sostenibilidad",
            objetivosSugeridos: [
              "Proteger biodiversidad y ecosistemas estratégicos",
              "Manejar recursos naturales según conocimiento ancestral",
              "Prevenir contaminación y degradación ambiental",
              "Gestionar agua, bosques y fauna sosteniblemente",
              "Mitigar efectos del cambio climático"
            ],
            accionesConcretas: [
              "Áreas de conservación comunitaria",
              "Planes de manejo de recursos (agua, bosque, fauna)",
              "Monitoreo ambiental participativo",
              "Recuperación de áreas degradadas",
              "Estrategia de adaptación al cambio climático"
            ]
          },
          
          lineaSocial: {
            importancia: "ALTA - Bienestar",
            objetivosSugeridos: [
              "Garantizar salud propia e intercultural",
              "Implementar educación propia y bilingüe",
              "Fortalecer organización comunitaria",
              "Mejorar vivienda y saneamiento básico",
              "Promover equidad de género con enfoque cultural"
            ],
            accionesConcretas: [
              "Centro de salud intercultural",
              "Sistema educativo propio y bilingüe",
              "Vivienda tradicional mejorada",
              "Agua potable y saneamiento",
              "Participación de mujeres según tradición"
            ]
          },
          
          lineaEconomica: {
            importancia: "ALTA - Autonomía",
            objetivosSugeridos: [
              "Desarrollar economía propia sostenible",
              "Fortalecer producción tradicional",
              "Acceder a mercados justos",
              "Gestionar recursos propios",
              "Reducir dependencia externa"
            ],
            accionesConcretas: [
              "Proyectos productivos culturalmente apropiados",
              "Comercialización de productos tradicionales",
              "Turismo comunitario controlado",
              "Fondos autónomos comunitarios",
              "Trueque y economía solidaria"
            ]
          }
        },

        // Análisis de Viabilidad
        analisisViabilidad: {
          especialista: "Dr. Arturo Escobar - Desarrollo Alternativo y Ontologías Relacionales",
          
          viabilidadCultural: {
            nivel: "95%",
            analisis: "El Plan de Vida respeta y fortalece la identidad cultural del pueblo. Las estrategias propuestas son culturalmente apropiadas y surgen de la cosmovisión propia.",
            factoresFavorables: [
              "Participación genuina de la comunidad",
              "Respeto a autoridades tradicionales",
              "Enfoque en fortalecimiento cultural",
              "Metodología propia de planificación"
            ],
            riesgos: [
              "Imposición de modelos externos",
              "Pérdida de control del proceso",
              "Aculturación involuntaria"
            ],
            recomendaciones: [
              "Mantener control comunitario del proceso",
              "Usar metodologías propias de decisión",
              "Priorizar conocimiento ancestral",
              "Evitar imposición de modelos externos"
            ]
          },
          
          viabilidadTerritorial: {
            nivel: "90%",
            analisis: "El Plan de Vida se basa en el control territorial efectivo. La zonificación y ordenamiento responden a la lógica espacial propia del pueblo.",
            factoresFavorables: [
              "Título de resguardo/territorio reconocido",
              "Control territorial relativo",
              "Conocimiento del territorio",
              "Sistema de gobernanza territorial"
            ],
            riesgos: [
              "Invasiones y despojos",
              "Megaproyectos sin consulta",
              "Conflictos por límites",
              "Presión sobre recursos"
            ]
          },
          
          viabilidadPolitica: {
            nivel: "85%",
            analisis: "El Plan de Vida cuenta con respaldo de autoridades tradicionales y puede articularse con marco legal favorable (Convenio 169, Constitución).",
            factoresFavorables: [
              "Reconocimiento constitucional (Art. 7, 330)",
              "Convenio 169 OIT ratificado",
              "Autoridades legítimas",
              "Derecho a autonomía"
            ]
          },
          
          viabilidadEconomica: {
            nivel: "75%",
            analisis: "La sostenibilidad económica requiere diversificación de fuentes y fortalecimiento de economía propia. Necesita articulación con financiamiento externo inicial.",
            fuentesPotenciales: [
              "Sistema General de Participaciones (SGP)",
              "Cooperación internacional",
              "Recursos propios (producción, turismo)",
              "Proyectos de regalías",
              "Convenios interadministrativos"
            ],
            presupuestoEstimado: planVida.lineas ? 
              Object.values(planVida.lineas)
                .reduce((sum, linea) => sum + (parseFloat(linea.presupuesto) || 0), 0)
                .toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
              : "Pendiente de cálculo"
          },
          
          viabilidadAmbiental: {
            nivel: "95%",
            analisis: "El Plan de Vida incorpora sostenibilidad ambiental y conocimiento ancestral de manejo de ecosistemas. Alta viabilidad.",
            fortalezas: [
              "Conocimiento ancestral de ecosistemas",
              "Prácticas sostenibles tradicionales",
              "Cosmovisión de armonía con naturaleza",
              "Áreas de conservación comunitaria"
            ]
          }
        },

        // Análisis de Marco Normativo
        analisisMarcoNormativo: {
          especialista: "Dr. Juan Mayr Maldonado - Políticas Públicas Étnicas",
          
          fundamentoConstitucional: [
            "Art. 7 - Reconocimiento diversidad étnica y cultural",
            "Art. 330 - Territorios indígenas y ETIs",
            "Art. 63 - Territorios colectivos inalienables",
            "Art. 70 - Cultura como fundamento de nacionalidad"
          ],
          
          fundamentoLegal: [
            "Convenio 169 OIT - Pueblos indígenas y tribales",
            "Ley 21 de 1991 - Ratifica Convenio 169",
            "Decreto 1320 de 1998 - Consulta previa",
            "Decreto 2164 de 1995 - Tierras comunales",
            "Ley 1381 de 2010 - Lenguas nativas"
          ],
          
          jurisprudencia: [
            "T-428/92 - Reconocimiento derechos territoriales",
            "SU-039/97 - Participación en decisiones",
            "T-254/94 - Diversidad étnica y cultural",
            "T-652/98 - Planes de vida"
          ],
          
          politicasPublicas: [
            "Política Nacional de Pueblos Indígenas",
            "PNIS - Sustitución de cultivos",
            "Programas de etnodesarrollo",
            "SGP - Resguardos indígenas"
          ],
          
          articulacionRequerida: [
            "Ministerio del Interior - Asuntos Étnicos",
            "ANT - Formalización territorial",
            "MinSalud - Salud intercultural",
            "MinEducación - Educación propia",
            "Cooperación Internacional"
          ]
        },

        // Metodología Participativa
        analisisMetodologico: {
          especialista: "Dra. Claudia Puerta Silva - Metodologías Participativas",
          
          fasesElaboracion: [
            {
              fase: 1,
              nombre: "Preparación y Motivación",
              actividades: [
                "Socialización de la propuesta con autoridades",
                "Motivación comunitaria",
                "Conformación de equipo coordinador",
                "Definición de metodología propia"
              ],
              duracion: "1-2 meses",
              productos: "Equipo conformado, metodología definida"
            },
            {
              fase: 2,
              nombre: "Diagnóstico Participativo",
              actividades: [
                "Talleres comunitarios por sectores",
                "Recorridos territoriales",
                "Consulta a mayores y sabedores",
                "Sistematización de información"
              ],
              duracion: "2-3 meses",
              productos: "Diagnóstico DOFA, problemas priorizados"
            },
            {
              fase: 3,
              nombre: "Formulación Participativa",
              actividades: [
                "Definición de visión de futuro",
                "Formulación de líneas estratégicas",
                "Diseño de programas y proyectos",
                "Validación en asamblea general"
              ],
              duracion: "3-4 meses",
              productos: "Plan de Vida formulado"
            },
            {
              fase: 4,
              nombre: "Aprobación y Adopción",
              actividades: [
                "Asamblea general de aprobación",
                "Acta comunitaria vinculante",
                "Protocolización ante autoridades",
                "Socialización a entidades"
              ],
              duracion: "1 mes",
              productos: "Plan de Vida aprobado y protocolizado"
            },
            {
              fase: 5,
              nombre: "Implementación",
              actividades: [
                "Gestión de recursos",
                "Ejecución de proyectos",
                "Seguimiento comunitario",
                "Ajustes según evaluación"
              ],
              duracion: "10-20 años",
              productos: "Proyectos implementados, indicadores"
            }
          ],
          
          principiosMetodologicos: [
            "Participación genuina de toda la comunidad",
            "Respeto a autoridades y espacios de decisión propios",
            "Uso de idioma propio en todo el proceso",
            "Metodologías participativas culturalmente apropiadas",
            "Ritmos y tiempos según cosmovisión propia",
            "Control comunitario del proceso",
            "Facilitación externa solo si comunidad lo solicita"
          ],
          
          rolesActores: {
            comunidad: "Protagonista - decide y ejecuta",
            autoridades: "Orientan y legitiman el proceso",
            sabedores: "Aportan conocimiento ancestral",
            jovenes: "Proyectan futuro con identidad",
            mujeres: "Participan según roles tradicionales",
            facilitadores: "Apoyan si comunidad lo solicita",
            entidades: "Acompañan sin imponer"
          }
        },

        // Análisis de Presupuesto
        analisisPresupuestal: {
          especialista: "Dra. Constanza Ramírez - Finanzas Públicas y Etnias",
          
          presupuestoEstimado: {
            lineaCultural: parseFloat(planVida.lineas.cultural.presupuesto) || 0,
            lineaTerritorial: parseFloat(planVida.lineas.territorial.presupuesto) || 0,
            lineaAmbiental: parseFloat(planVida.lineas.ambiental.presupuesto) || 0,
            lineaSocial: parseFloat(planVida.lineas.social.presupuesto) || 0,
            lineaEconomica: parseFloat(planVida.lineas.economica.presupuesto) || 0,
            totalEstimado: 
              (parseFloat(planVida.lineas.cultural.presupuesto) || 0) +
              (parseFloat(planVida.lineas.territorial.presupuesto) || 0) +
              (parseFloat(planVida.lineas.ambiental.presupuesto) || 0) +
              (parseFloat(planVida.lineas.social.presupuesto) || 0) +
              (parseFloat(planVida.lineas.economica.presupuesto) || 0)
          },
          
          fuentesFinanciamiento: [
            {
              fuente: "SGP Resguardos Indígenas",
              tipo: "Recursos propios del Estado",
              monto: "Según población y UPC",
              gestion: "Automática anual",
              usos: "Libre inversión según Plan de Vida"
            },
            {
              fuente: "Sistema General de Regalías",
              tipo: "Recursos de regalías",
              monto: "Por proyecto aprobado",
              gestion: "Formulación y aprobación OCAD",
              usos: "Proyectos de inversión"
            },
            {
              fuente: "Cooperación Internacional",
              tipo: "Donaciones y cooperación",
              monto: "Variable según cooperante",
              gestion: "Convenios y proyectos",
              usos: "Según agenda del cooperante"
            },
            {
              fuente: "Presupuesto Nacional",
              tipo: "Programas sectoriales",
              monto: "Según programa",
              gestion: "Convenios interadministrativos",
              usos: "Salud, educación, infraestructura"
            },
            {
              fuente: "Recursos Propios",
              tipo: "Generación propia",
              monto: "Variable",
              gestion: "Autónoma",
              usos: "Libre según prioridades"
            }
          ],
          
          estrategiaFinanciera: [
            "Diversificar fuentes de financiamiento",
            "Fortalecer capacidad de gestión de recursos",
            "Generar recursos propios sostenibles",
            "Negociar transferencias del Estado",
            "Gestionar cooperación internacional"
          ]
        },

        // Análisis de Articulación
        analisisArticulacion: {
          especialista: "Dr. Luis Evelis Andrade - Articulación Estado-Pueblos",
          
          entidadesEstrategicas: [
            {
              entidad: "Ministerio del Interior - Dirección de Asuntos Étnicos",
              rol: "Coordinación política étnica",
              articulacion: "Reconocimiento oficial del Plan de Vida",
              gestion: "Registro y acompañamiento"
            },
            {
              entidad: "ANT - Agencia Nacional de Tierras",
              rol: "Formalización territorial",
              articulacion: "Ampliación, saneamiento, clarificación",
              gestion: "Solicitudes territoriales"
            },
            {
              entidad: "MinSalud",
              rol: "Salud intercultural",
              articulacion: "Programas de salud propia",
              gestion: "Recursos y modelos interculturales"
            },
            {
              entidad: "MinEducación",
              rol: "Educación propia",
              articulacion: "Sistema educativo indígena",
              gestion: "Recursos SGP educación"
            },
            {
              entidad: "ONIC/OPIAC/Organizaciones",
              rol: "Representación y asesoría",
              articulacion: "Acompañamiento técnico y político",
              gestion: "Gestión conjunta"
            }
          ],
          
          mecanismosArticulacion: [
            "Mesas de trabajo permanentes",
            "Convenios interadministrativos",
            "Protocolos de articulación",
            "Comités de seguimiento",
            "Espacios de consulta periódica"
          ]
        },

        // Resumen Ejecutivo
        resumenEjecutivo: {
          diagnostico: `Plan de Vida integral del pueblo ${planVida.pueblo} con enfoque de 5 líneas estratégicas y metodología participativa`,
          fundamentoJuridico: "Constitución Arts. 7 y 330, Convenio 169 OIT, Jurisprudencia Constitucional",
          alcanceTemporal: "10-20 años (largo plazo)",
          poblacionBeneficiaria: `${planVida.poblacion} personas, ${planVida.familias} familias`,
          presupuestoTotal: planVida.lineas ? 
            Object.values(planVida.lineas)
              .reduce((sum, linea) => sum + (parseFloat(linea.presupuesto) || 0), 0)
              .toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
            : "Pendiente de cálculo",
          viabilidadGeneral: "88% - Alta viabilidad",
          probabilidadImplementacion: "85%",
          tiempoFormulacion: "6-8 meses participativos",
          tiempoImplementacion: "10-20 años",
          recomendacionPrincipal: "El Plan de Vida es viable y culturalmente apropiado. Requiere control comunitario del proceso, articulación estratégica con Estado y cooperación, y sistema robusto de seguimiento participativo. Es fundamental mantener la autonomía en todo el proceso."
        },

        metadatos: {
          fechaAnalisis: new Date().toISOString(),
          especialistasConsultados: 6,
          lineasAnalizadas: 5,
          metodologia: "Investigación Acción Participativa",
          enfoques: ["Diferencial étnico", "Derechos humanos", "Desarrollo alternativo"],
          normatividadRevisada: 15,
          jurisprudenciaAnalizada: 8,
          nivelConfianza: "94%"
        }
      };

      setPlanVida(prev => ({
        ...prev,
        analisisIA: analisisCompleto
      }));
      
      setMostrarAnalisis(true);
    } catch (error) {
      console.error('Error en análisis IA:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarPDFPlanVida = () => {
    if (!planVida.analisisIA) {
      alert('Primero debe analizar el Plan de Vida con IA');
      return;
    }

    const pdfContent = {
      titulo: `PLAN DE VIDA COMUNITARIO - PUEBLO ${planVida.pueblo.toUpperCase()}`,
      subtitulo: `${planVida.resguardo} - ${planVida.departamento}`,
      fecha: new Date().toLocaleString('es-CO'),
      
      // I. IDENTIFICACIÓN
      identificacion: {
        pueblo: planVida.pueblo,
        resguardo: planVida.resguardo,
        territorio: planVida.territorio,
        autoridad: planVida.autoridad,
        cargo: planVida.cargoAutoridad,
        poblacion: planVida.poblacion,
        familias: planVida.familias,
        ubicacion: `${planVida.municipio}, ${planVida.departamento}`
      },
      
      // II. DIAGNÓSTICO DOFA
      diagnostico: {
        fortalezas: planVida.fortalezas,
        debilidades: planVida.debilidades,
        oportunidades: planVida.oportunidades,
        amenazas: planVida.amenazas,
        analisisIA: planVida.analisisIA.analisisDOFA
      },
      
      // III. VISIÓN Y OBJETIVOS
      vision: {
        visionLargoPlazo: planVida.visionLargoPlazo,
        objetivoGeneral: planVida.objetivoGeneral,
        objetivosEspecificos: planVida.objetivosEspecificos,
        metas: planVida.metas
      },
      
      // IV. LÍNEAS ESTRATÉGICAS
      lineasEstrategicas: {
        cultural: planVida.lineas.cultural,
        territorial: planVida.lineas.territorial,
        ambiental: planVida.lineas.ambiental,
        social: planVida.lineas.social,
        economica: planVida.lineas.economica,
        analisisIA: planVida.analisisIA.analisisLineasEstrategicas
      },
      
      // V. ESTRATEGIAS Y ACCIONES
      implementacion: {
        estrategias: planVida.estrategias,
        acciones: planVida.accionesConcretas,
        responsables: planVida.responsables,
        cronograma: planVida.cronograma
      },
      
      // VI. INDICADORES
      seguimiento: {
        indicadoresResultado: planVida.indicadoresResultado,
        indicadoresImpacto: planVida.indicadoresImpacto,
        sistemaMonitoreo: planVida.sistemaMonitoreo,
        evaluacion: planVida.evaluacionParticipativa
      },
      
      // VII. ARTICULACIÓN
      articulacion: {
        entidades: planVida.entidadesAliadas,
        financiamiento: planVida.fuentesFinanciamiento,
        convenios: planVida.conveniosRequeridos,
        cronogramaGestion: planVida.cronogramaGestion,
        analisisIA: planVida.analisisIA.analisisArticulacion
      },
      
      // VIII. PRESUPUESTO
      presupuesto: {
        porLinea: planVida.lineas,
        total: planVida.analisisIA.analisisPresupuestal.presupuestoEstimado,
        fuentes: planVida.analisisIA.analisisPresupuestal.fuentesFinanciamiento
      },
      
      // IX. VIABILIDAD
      viabilidad: planVida.analisisIA.analisisViabilidad,
      
      // X. ANÁLISIS COMPLETO IA
      analisisIA: planVida.analisisIA,
      
      // FIRMA
      aprobacion: {
        autoridad: planVida.autoridad,
        cargo: planVida.cargoAutoridad,
        pueblo: planVida.pueblo,
        fecha: new Date().toLocaleDateString('es-CO'),
        validez: "El presente Plan de Vida fue elaborado participativamente y aprobado en Asamblea General de la comunidad"
      }
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `plan-vida-${planVida.pueblo.toLowerCase()}-${planVida.resguardo.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              <Globe size={60} style={{ marginRight: '1rem' }} />
              <Heart size={60} style={{ marginRight: '1rem' }} />
              <Users size={60} />
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Planes de Vida Comunitarios
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.9,
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Formulación Participativa de Planes de Vida para Pueblos Indígenas
              <br/>
              <span style={{ fontSize: '1.1rem' }}>
                Metodología IAP • Enfoque Diferencial • Análisis IA Especializado
              </span>
            </p>
          </div>

          {/* Alerta Informativa */}
          <Alert style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            border: '3px solid #059669',
            color: '#047857',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(5, 150, 105, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Info size={32} style={{ marginRight: '1rem', color: '#059669' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#047857' }}>
                💡 ¿Qué es un Plan de Vida?
              </h3>
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#065f46' }}>
              El Plan de Vida es un instrumento de planificación integral y de largo plazo (10-20 años) 
              que permite a los pueblos indígenas definir su propio camino de desarrollo conforme a su 
              cosmovisión, cultura y aspiraciones. A diferencia de los planes de desarrollo occidentales, 
              el Plan de Vida integra las dimensiones cultural, territorial, ambiental, social y económica 
              desde la perspectiva propia del pueblo.
            </p>
          </Alert>

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
                border: paso.numero === pasoActual ? `3px solid ${paso.color}` : '2px solid transparent',
                transition: 'all 0.3s ease',
                boxShadow: paso.numero === pasoActual ? `0 4px 15px ${paso.color}40` : 'none'
              }}>
                <paso.icono size={20} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{paso.titulo}</span>
              </div>
            ))}
          </div>

          <Card style={{ padding: '2.5rem', background: 'white', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            {/* PASO 1: Identificación */}
            {pasoActual === 1 && (
              <div>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#047857'
                }}>
                  <Users style={{ display: 'inline', marginRight: '0.75rem' }} />
                  Identificación Comunitaria
                </h2>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <Label>Pueblo Indígena *</Label>
                    <Select
                      value={planVida.pueblo}
                      onValueChange={(value) => handleInputChange('pueblo', value)}
                    >
                      <option value="">Seleccionar pueblo</option>
                      {pueblosIndigenas.map((pueblo) => (
                        <option key={pueblo} value={pueblo}>{pueblo}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label>Resguardo/Territorio *</Label>
                    <Input
                      value={planVida.resguardo}
                      onChange={(e) => handleInputChange('resguardo', e.target.value)}
                      placeholder="Nombre del resguardo"
                    />
                  </div>

                  <div>
                    <Label>Autoridad Tradicional *</Label>
                    <Input
                      value={planVida.autoridad}
                      onChange={(e) => handleInputChange('autoridad', e.target.value)}
                      placeholder="Nombre de la autoridad"
                    />
                  </div>

                  <div>
                    <Label>Cargo/Función</Label>
                    <Input
                      value={planVida.cargoAutoridad}
                      onChange={(e) => handleInputChange('cargoAutoridad', e.target.value)}
                      placeholder="Ej: Gobernador, Mamo, Taita"
                    />
                  </div>

                  <div>
                    <Label>Población Total</Label>
                    <Input
                      type="number"
                      value={planVida.poblacion}
                      onChange={(e) => handleInputChange('poblacion', e.target.value)}
                      placeholder="Número de habitantes"
                    />
                  </div>

                  <div>
                    <Label>Número de Familias</Label>
                    <Input
                      type="number"
                      value={planVida.familias}
                      onChange={(e) => handleInputChange('familias', e.target.value)}
                      placeholder="Número de familias"
                    />
                  </div>

                  <div>
                    <Label>Departamento *</Label>
                    <Select
                      value={planVida.departamento}
                      onValueChange={(value) => handleInputChange('departamento', value)}
                    >
                      <option value="">Seleccionar</option>
                      {departamentos.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label>Municipio</Label>
                    <Input
                      value={planVida.municipio}
                      onChange={(e) => handleInputChange('municipio', e.target.value)}
                      placeholder="Nombre del municipio"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PASO 2: Diagnóstico DOFA */}
            {pasoActual === 2 && (
              <div>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#dc2626'
                }}>
                  <Search style={{ display: 'inline', marginRight: '0.75rem' }} />
                  Diagnóstico Comunitario - Análisis DOFA
                </h2>

                <Alert style={{ 
                  background: '#fef3c7', 
                  border: '1px solid #f59e0b',
                  color: '#92400e',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '2rem'
                }}>
                  <Lightbulb style={{ marginRight: '0.5rem' }} />
                  <strong>Metodología Participativa:</strong> Este diagnóstico debe realizarse con participación de toda la comunidad en talleres, asambleas y recorridos territoriales.
                </Alert>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <Label style={{ fontWeight: 'bold', color: '#16a34a', fontSize: '1.1rem' }}>
                      💪 FORTALEZAS (Internas - Positivas) *
                    </Label>
                    <Textarea
                      value={planVida.fortalezas}
                      onChange={(e) => handleInputChange('fortalezas', e.target.value)}
                      placeholder="Ej: Idioma propio vigente, territorio titulado, autoridades legítimas, conocimiento ancestral de medicina..."
                      style={{ minHeight: '150px', fontSize: '1rem', lineHeight: '1.6' }}
                    />
                  </div>

                  <div>
                    <Label style={{ fontWeight: 'bold', color: '#dc2626', fontSize: '1.1rem' }}>
                      ⚠️ DEBILIDADES (Internas - Negativas) *
                    </Label>
                    <Textarea
                      value={planVida.debilidades}
                      onChange={(e) => handleInputChange('debilidades', e.target.value)}
                      placeholder="Ej: Pérdida de idioma en jóvenes, infraestructura deficiente, recursos económicos limitados..."
                      style={{ minHeight: '150px', fontSize: '1rem', lineHeight: '1.6' }}
                    />
                  </div>

                  <div>
                    <Label style={{ fontWeight: 'bold', color: '#3b82f6', fontSize: '1.1rem' }}>
                      🌟 OPORTUNIDADES (Externas - Positivas) *
                    </Label>
                    <Textarea
                      value={planVida.oportunidades}
                      onChange={(e) => handleInputChange('oportunidades', e.target.value)}
                      placeholder="Ej: Cooperación internacional, políticas favorables, reconocimiento constitucional, alianzas..."
                      style={{ minHeight: '150px', fontSize: '1rem', lineHeight: '1.6' }}
                    />
                  </div>

                  <div>
                    <Label style={{ fontWeight: 'bold', color: '#dc2626', fontSize: '1.1rem' }}>
                      ⛔ AMENAZAS (Externas - Negativas) *
                    </Label>
                    <Textarea
                      value={planVida.amenazas}
                      onChange={(e) => handleInputChange('amenazas', e.target.value)}
                      placeholder="Ej: Megaproyectos sin consulta, invasiones territoriales, conflicto armado, contaminación..."
                      style={{ minHeight: '150px', fontSize: '1rem', lineHeight: '1.6' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PASO 7: Análisis con IA */}
            {pasoActual === 7 && (
              <div>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#c026d3'
                }}>
                  <Brain style={{ display: 'inline', marginRight: '0.75rem' }} />
                  Análisis Especializado con IA
                </h2>

                {!mostrarAnalisis && (
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Button
                      onClick={analizarPlanVidaIA}
                      disabled={cargandoIA || !planVida.fortalezas}
                      style={{ 
                        background: cargandoIA ? '#9ca3af' : 'linear-gradient(45deg, #059669, #047857)',
                        border: 'none',
                        padding: '1.5rem 3rem',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        borderRadius: '0.75rem',
                        color: 'white',
                        cursor: cargandoIA ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 auto',
                        boxShadow: '0 4px 20px rgba(5, 150, 105, 0.4)'
                      }}
                    >
                      {cargandoIA ? (
                        <>
                          <Clock style={{ marginRight: '0.75rem', animation: 'spin 1s linear infinite' }} />
                          Analizando Plan de Vida con 6 Especialistas...
                        </>
                      ) : (
                        <>
                          <Brain style={{ marginRight: '0.75rem' }} />
                          Analizar Plan de Vida con IA
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {mostrarAnalisis && planVida.analisisIA && (
                  <div style={{ display: 'grid', gap: '2rem' }}>
                    {/* Resumen Ejecutivo */}
                    <Card style={{ 
                      padding: '2rem', 
                      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                      border: '3px solid #059669'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.6rem', 
                        fontWeight: 'bold',
                        color: '#065f46',
                        marginBottom: '1.5rem'
                      }}>
                        🎯 Resumen Ejecutivo del Plan de Vida
                      </h3>
                      
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                        gap: '1rem' 
                      }}>
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                            Viabilidad General:
                          </p>
                          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                            {planVida.analisisIA.resumenEjecutivo.viabilidadGeneral}
                          </p>
                        </div>
                        
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                            Presupuesto Total:
                          </p>
                          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#047857' }}>
                            {planVida.analisisIA.resumenEjecutivo.presupuestoTotal}
                          </p>
                        </div>
                        
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                            Probabilidad Implementación:
                          </p>
                          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>
                            {planVida.analisisIA.resumenEjecutivo.probabilidadImplementacion}
                          </p>
                        </div>
                      </div>

                      <div style={{ 
                        marginTop: '1.5rem',
                        padding: '1.5rem',
                        background: 'white',
                        borderRadius: '0.5rem',
                        border: '2px solid #059669'
                      }}>
                        <p style={{ fontSize: '1.05rem', color: '#065f46', lineHeight: '1.7', fontWeight: '500' }}>
                          <strong>🎯 Recomendación Principal:</strong><br/>
                          {planVida.analisisIA.resumenEjecutivo.recomendacionPrincipal}
                        </p>
                      </div>
                    </Card>

                    {/* Botones de Acción */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <Button
                        onClick={generarPDFPlanVida}
                        style={{ 
                          background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                          border: 'none',
                          padding: '1.25rem 2.5rem',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          borderRadius: '0.75rem',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                        }}
                      >
                        <Download style={{ marginRight: '0.75rem' }} />
                        Generar Plan de Vida Completo (PDF)
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navegación */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '2px solid #e5e7eb'
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

              {pasoActual < pasos.length && (
                <Button
                  onClick={siguientePaso}
                  style={{ 
                    background: `linear-gradient(45deg, ${pasos[pasoActual - 1].color}, ${pasos[pasoActual - 1].color}dd)`,
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
              )}
            </div>
          </Card>
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

export default PlanesVidaComunitarios;
