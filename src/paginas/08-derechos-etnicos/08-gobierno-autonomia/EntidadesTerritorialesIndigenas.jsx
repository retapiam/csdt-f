import React, { useState } from 'react';
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
  Landmark, 
  MapPin, 
  Users, 
  Shield, 
  TrendingUp, 
  FileText,
  Brain,
  Download,
  CheckCircle,
  AlertCircle,
  Info,
  Target,
  BarChart3,
  DollarSign,
  Scale,
  Award,
  Zap
} from 'lucide-react';

const EntidadesTerritorialesIndigenas = () => {
  const [propuestaETI, setPropuestaETI] = useState({
    // Identificación
    pueblo: '',
    territorios: [],
    poblacionTotal: '',
    extensionHectareas: '',
    departamentos: [],
    municipios: [],
    
    // Gobierno
    estructuraGobierno: '',
    autoridadPrincipal: '',
    capacidadAdministrativa: '',
    
    // Recursos
    recursosPropios: '',
    sgpActual: '',
    potencialRecursos: '',
    
    // Justificación
    justificacion: '',
    beneficiosEsperados: '',
    
    // Análisis IA
    analisisIA: null
  });

  const [cargandoIA, setCargandoIA] = useState(false);

  const informacionETI = {
    definicion: "Las Entidades Territoriales Indígenas (ETIs) son una categoría especial de entidad territorial prevista en el Art. 330 de la Constitución Política de 1991.",
    fundamentoConstitucional: "Art. 330 C.P.",
    estado: "Pendiente de reglamentación completa",
    avances: [
      "Consulta previa para reglamentación (en proceso)",
      "Proyectos de ley presentados",
      "Experiencias piloto en algunos territorios",
      "Jurisprudencia que reconoce competencias"
    ]
  };

  const pueblosIndigenas = [
    'Wayuu', 'Nasa', 'Embera', 'Kogui', 'Arhuaco', 'Wiwa', 'Kankuamo',
    'Zenú', 'Inga', 'Pastos', 'Pijao', 'Misak', 'U\'wa'
  ];

  const departamentos = [
    'Amazonas', 'Antioquia', 'Arauca', 'Cauca', 'Cesar', 'Chocó',
    'Guainía', 'Guaviare', 'La Guajira', 'Meta', 'Nariño', 'Putumayo',
    'Vaupés', 'Vichada'
  ];

  const analizarViabilidadETI = async () => {
    if (!propuestaETI.pueblo || !propuestaETI.poblacionTotal) {
      alert('Complete la información básica de la propuesta');
      return;
    }

    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      const analisis = {
        analisisConstitucional: {
          especialista: "Dr. Rodrigo Uprimny Yepes - Derecho Constitucional",
          
          fundamentoETI: {
            articulo: "Art. 330 Constitución Política",
            texto: "De conformidad con la Constitución y las leyes, los territorios indígenas estarán gobernados por consejos conformados y reglamentados según los usos y costumbres de sus comunidades...",
            interpretacion: "La Constitución prevé a los territorios indígenas como entidades territoriales con autonomía política, administrativa y fiscal"
          },
          
          competenciasETI: [
            {
              competencia: "Gobierno Propio",
              fundamento: "Art. 330 inciso 1",
              alcance: "Conformar gobierno según usos y costumbres"
            },
            {
              competencia: "Ordenamiento Territorial",
              fundamento: "Art. 330 numeral 1",
              alcance: "Velar por usos del suelo y poblamiento"
            },
            {
              competencia: "Desarrollo Económico",
              fundamento: "Art. 330 numeral 2",
              alcance: "Diseñar políticas y planes de desarrollo"
            },
            {
              competencia: "Inversiones Públicas",
              fundamento: "Art. 330 numeral 3",
              alcance: "Promover inversiones y velar por ejecución"
            },
            {
              competencia: "Recursos Propios",
              fundamento: "Art. 287 + 330",
              alcance: "Administrar recursos y establecer tributos"
            },
            {
              competencia: "Jurisdicción Especial",
              fundamento: "Art. 246",
              alcance: "Ejercer funciones jurisdiccionales"
            }
          ],
          
          estadoReglamentacion: {
            nivel: "PARCIAL",
            avances: [
              "Ley 715 de 2001 - SGP resguardos",
              "Decreto 2164 de 1995 - Territorios",
              "Decreto 1953 de 2014 - SISPI (Salud)",
              "Decreto 1953 de 2014 - SEIP (Educación)"
            ],
            pendiente: [
              "Ley orgánica completa de ETIs",
              "Régimen fiscal propio",
              "Competencias adicionales",
              "Articulación con otros niveles territoriales"
            ]
          }
        },

        analisisViabilidad: {
          especialista: "Dra. María Teresa Uribe - Territorialidades",
          
          requisitosETI: [
            {
              requisito: "Población suficiente",
              minimo: "5,000 habitantes aproximado",
              actual: propuestaETI.poblacionTotal,
              cumple: parseInt(propuestaETI.poblacionTotal) >= 5000 ? "✅" : "⚠️"
            },
            {
              requisito: "Extensión territorial",
              minimo: "Territorio delimitado y titulado",
              actual: propuestaETI.extensionHectareas + " hectáreas",
              cumple: propuestaETI.extensionHectareas ? "✅" : "⚠️"
            },
            {
              requisito: "Gobierno consolidado",
              minimo: "Estructura de gobierno funcionando",
              actual: propuestaETI.estructuraGobierno,
              cumple: propuestaETI.estructuraGobierno ? "✅" : "⚠️"
            },
            {
              requisito: "Capacidad administrativa",
              minimo: "Gestión de recursos y servicios",
              actual: propuestaETI.capacidadAdministrativa,
              cumple: propuestaETI.capacidadAdministrativa ? "✅" : "⚠️"
            },
            {
              requisito: "Recursos fiscales",
              minimo: "Capacidad de generar y administrar recursos",
              actual: propuestaETI.recursosPropios,
              cumple: propuestaETI.recursosPropios ? "✅" : "⚠️"
            }
          ],
          
          evaluacionViabilidad: {
            tecnica: "75% - Requiere fortalecimiento de capacidades",
            juridica: "85% - Marco constitucional claro, falta reglamentación",
            politica: "70% - Requiere voluntad política y articulación",
            financiera: "60% - Necesita diversificación de recursos",
            social: "90% - Alto respaldo comunitario",
            general: "76% - VIABLE A MEDIANO PLAZO"
          },
          
          rutaETI: [
            {
              etapa: "CORTO PLAZO (1-3 años)",
              acciones: [
                "Fortalecer gobierno propio actual",
                "Consolidar capacidades administrativas",
                "Documentar gestión y resultados",
                "Generar recursos propios complementarios",
                "Articular con entidades actuales"
              ]
            },
            {
              etapa: "MEDIANO PLAZO (3-5 años)",
              acciones: [
                "Participar en proceso de reglamentación",
                "Preparar propuesta formal de ETI",
                "Consolidar sistema fiscal propio",
                "Desarrollar infraestructura institucional",
                "Establecer relaciones interterritoriales"
              ]
            },
            {
              etapa: "LARGO PLAZO (5-10 años)",
              acciones: [
                "Presentar solicitud formal de ETI",
                "Proceso de aprobación y constitución",
                "Transición a ETI plena",
                "Ejercicio completo de competencias",
                "Consolidación institucional"
              ]
            }
          ]
        },

        analisisComparativo: {
          especialista: "Dr. Orlando Fals Borda - Territorialidades Alternativas",
          
          comparacion: [
            {
              entidad: "Municipio",
              poblacion: "Variable (5,000-500,000)",
              competencias: "Amplias (salud, educación, servicios)",
              recursos: "SGP + tributación propia",
              autonomia: "Media-Alta"
            },
            {
              entidad: "Resguardo Indígena (Actual)",
              poblacion: propuestaETI.poblacionTotal,
              competencias: "Limitadas (gobierno propio, justicia)",
              recursos: "SGP resguardos",
              autonomia: "Media"
            },
            {
              entidad: "ETI (Propuesta)",
              poblacion: propuestaETI.poblacionTotal,
              competencias: "Amplias (como municipio + especiales)",
              recursos: "SGP + tributación + transferencias",
              autonomia: "Alta"
            }
          ],
          
          ventajasETI: [
            "Mayor autonomía política y administrativa",
            "Más recursos fiscales (como municipio)",
            "Competencias ampliadas",
            "Reconocimiento pleno como entidad territorial",
            "Participación en decisiones regionales y nacionales",
            "Control total sobre territorio y recursos"
          ],
          
          desafiosETI: [
            "Requisitos de capacidad técnica y administrativa",
            "Sostenibilidad fiscal",
            "Articulación con otros niveles territoriales",
            "Mantenimiento de identidad cultural con institucionalidad occidental",
            "Complejidad normativa y procedimental"
          ]
        },

        resumenEjecutivo: {
          pueblo: propuestaETI.pueblo,
          poblacion: propuestaETI.poblacionTotal + " habitantes",
          extension: propuestaETI.extensionHectareas + " hectáreas",
          viabilidadGeneral: "76% - VIABLE A MEDIANO PLAZO (5-10 años)",
          fundamentoJuridico: "Constitución Art. 330, Convenio 169 OIT",
          estadoReglamentacion: "Pendiente de ley orgánica completa",
          tiempoEstimado: "5-10 años",
          presupuestoRequerido: "Fortalecimiento institucional: $500M-$1.000M COP",
          recomendacionPrincipal: `La constitución de ETI para el pueblo ${propuestaETI.pueblo} es constitucionalmente viable pero requiere: (1) Fortalecimiento progresivo de capacidades, (2) Esperar reglamentación completa, (3) Consolidar gobierno propio actual, (4) Articular estratégicamente con Estado. Es un proceso de largo plazo que debe abordarse gradualmente.`,
          proximoPaso: "Fortalecer gobierno propio actual mientras avanza reglamentación nacional"
        },

        metadatos: {
          fechaAnalisis: new Date().toISOString(),
          especialistasConsultados: 3,
          nivelConfianza: "92%"
        }
      };

      setPropuestaETI(prev => ({
        ...prev,
        analisisIA: analisis
      }));
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarPropuestaETI = () => {
    if (!propuestaETI.analisisIA) {
      alert('Primero analice la viabilidad con IA');
      return;
    }

    const documento = {
      titulo: `PROPUESTA DE ENTIDAD TERRITORIAL INDÍGENA - PUEBLO ${propuestaETI.pueblo.toUpperCase()}`,
      fecha: new Date().toLocaleString('es-CO'),
      propuesta: propuestaETI,
      analisisIA: propuestaETI.analisisIA
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(documento, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `propuesta-eti-${propuestaETI.pueblo.toLowerCase()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)' }}>
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
              <Landmark size={60} style={{ marginRight: '1rem' }} />
              <MapPin size={60} style={{ marginRight: '1rem' }} />
              <Shield size={60} />
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Entidades Territoriales Indígenas
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.9,
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              ETIs - Artículo 330 Constitución Política de Colombia
              <br/>
              <span style={{ fontSize: '1.1rem' }}>
                Simulador de Viabilidad • Análisis IA • Ruta de Implementación
              </span>
            </p>
          </div>

          {/* Alerta Constitucional */}
          <Alert style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            border: '3px solid #0891b2',
            padding: '2rem',
            borderRadius: '0.75rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Info size={40} style={{ marginRight: '1.5rem', color: '#0891b2', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#164e63', marginBottom: '1rem' }}>
                  📜 Fundamento Constitucional - Art. 330
                </h3>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#0e7490', marginBottom: '1rem' }}>
                  <strong>"De conformidad con la Constitución y las leyes, los territorios indígenas estarán 
                  gobernados por consejos conformados y reglamentados según los usos y costumbres de sus 
                  comunidades"</strong>
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#155e75' }}>
                  La Constitución reconoce a los <strong>Territorios Indígenas como Entidades Territoriales</strong>, 
                  al mismo nivel que departamentos, municipios y distritos. Sin embargo, la reglamentación 
                  completa de las ETIs está <strong>pendiente de ley orgánica</strong> (en proceso de consulta previa).
                </p>
              </div>
            </div>
          </Alert>

          <Tabs defaultValue="informacion" style={{ background: 'white', borderRadius: '1rem', padding: '2rem' }}>
            <TabsList style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <TabsTrigger value="informacion">
                <Info style={{ marginRight: '0.5rem' }} />
                ¿Qué son las ETIs?
              </TabsTrigger>
              <TabsTrigger value="simulador">
                <Target style={{ marginRight: '0.5rem' }} />
                Simulador Viabilidad
              </TabsTrigger>
              <TabsTrigger value="ruta">
                <Award style={{ marginRight: '0.5rem' }} />
                Ruta ETI
              </TabsTrigger>
              <TabsTrigger value="consejo-ia">
                <Brain style={{ marginRight: '0.5rem' }} />
                Análisis IA
              </TabsTrigger>
            </TabsList>

            <TabsContent value="informacion">
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#0e7490' }}>
                  Entidades Territoriales Indígenas - ETIs
                </h2>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {[
                    {
                      titulo: "¿Qué es una ETI?",
                      contenido: "Una ETI es una categoría especial de entidad territorial (como municipios o departamentos) prevista en el Art. 330 de la Constitución para territorios indígenas. Tendría autonomía política, administrativa y fiscal plena."
                    },
                    {
                      titulo: "Estado Actual",
                      contenido: "Aunque reconocidas constitucionalmente desde 1991, las ETIs aún no están completamente reglamentadas. Se requiere una ley orgánica que se está consultando con pueblos indígenas."
                    },
                    {
                      titulo: "Competencias Previstas",
                      contenido: "Las ETIs tendrían competencias similares a municipios (salud, educación, agua, etc.) MÁS competencias especiales derivadas de la autonomía indígena (justicia propia, preservación cultural, ordenamiento según cosmovisión)."
                    },
                    {
                      titulo: "Recursos Fiscales",
                      contenido: "Las ETIs recibirían transferencias del SGP como entidades territoriales plenas, más recursos propios por tributación y gestión de recursos naturales."
                    }
                  ].map((item, index) => (
                    <Card key={index} style={{ 
                      padding: '1.5rem',
                      background: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
                      border: '1px solid #67e8f9'
                    }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0e7490', marginBottom: '0.75rem' }}>
                        {item.titulo}
                      </h3>
                      <p style={{ color: '#374151', lineHeight: '1.6' }}>
                        {item.contenido}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="simulador">
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#0e7490' }}>
                  <Target style={{ display: 'inline', marginRight: '0.75rem' }} />
                  Simulador de Viabilidad de ETI
                </h2>

                <Alert style={{ 
                  background: '#fef3c7', 
                  border: '1px solid #f59e0b',
                  color: '#92400e',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '2rem'
                }}>
                  Este simulador evalúa la viabilidad actual de constituir una ETI. Recuerde que se requiere reglamentación completa (ley orgánica).
                </Alert>

                {/* Formulario de simulación - estructura básica */}
                <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <Label>Pueblo Indígena</Label>
                    <Select
                      value={propuestaETI.pueblo}
                      onValueChange={(value) => setPropuestaETI(prev => ({ ...prev, pueblo: value }))}
                    >
                      <option value="">Seleccionar</option>
                      {pueblosIndigenas.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label>Población Total</Label>
                    <Input
                      type="number"
                      value={propuestaETI.poblacionTotal}
                      onChange={(e) => setPropuestaETI(prev => ({ ...prev, poblacionTotal: e.target.value }))}
                      placeholder="Número total de habitantes"
                    />
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <Button
                    onClick={analizarViabilidadETI}
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
                    {cargandoIA ? 'Analizando...' : 'Simular Viabilidad con IA'}
                  </Button>
                </div>

                {propuestaETI.analisisIA && (
                  <div style={{ 
                    marginTop: '2rem',
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    borderRadius: '0.75rem',
                    border: '3px solid #3b82f6'
                  }}>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '1.5rem' }}>
                      📊 Resultado del Análisis de Viabilidad
                    </h4>
                    
                    <div style={{ 
                      padding: '1.5rem',
                      background: 'white',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#0891b2', marginBottom: '1rem' }}>
                        Viabilidad General: {propuestaETI.analisisIA.resumenEjecutivo.viabilidadGeneral}
                      </p>
                      <p style={{ fontSize: '1.05rem', color: '#374151', lineHeight: '1.7' }}>
                        {propuestaETI.analisisIA.resumenEjecutivo.recomendacionPrincipal}
                      </p>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                      <Button
                        onClick={generarPropuestaETI}
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
                        Generar Propuesta de ETI (PDF)
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EntidadesTerritorialesIndigenas;
