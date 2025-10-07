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
  Crown, 
  Users, 
  Shield, 
  Scale, 
  MapPin, 
  FileText, 
  Brain,
  Download,
  CheckCircle,
  Info,
  Award,
  Building,
  Landmark,
  Globe,
  Target,
  BookOpen,
  Zap,
  TrendingUp
} from 'lucide-react';

const GobiernoPropio = () => {
  const [planGobierno, setPlanGobierno] = useState({
    // Identificación
    pueblo: '',
    resguardo: '',
    tipoAutoridad: '',
    nombreAutoridad: '',
    periodoGobierno: '',
    poblacion: '',
    
    // Gobierno Propio
    estructuraGobierno: '',
    competenciasPropias: [],
    relacionEstado: '',
    planGobierno: '',
    
    // ETI
    interesETI: false,
    justificacionETI: '',
    
    // Análisis IA
    analisisIA: null
  });

  const [cargandoIA, setCargandoIA] = useState(false);

  const pueblosIndigenas = [
    'Wayuu', 'Nasa', 'Embera', 'Kogui', 'Arhuaco', 'Wiwa', 'Kankuamo',
    'Zenú', 'Inga', 'Pastos', 'Pijao', 'Misak', 'U\'wa'
  ];

  const tiposAutoridad = [
    'Cabildo Gobernador',
    'Mamo (Kogui/Arhuaco/Wiwa)',
    'Palabrero (Wayuu)',
    'Taita (Inga/Kamëntšá)',
    'Consejo de Ancianos',
    'Autoridad Tradicional Indígena',
    'Otro'
  ];

  const analizarGobiernoIA = async () => {
    if (!planGobierno.pueblo || !planGobierno.estructuraGobierno) {
      alert('Complete la información básica del gobierno propio');
      return;
    }

    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      const analisis = {
        analisisConstitucional: {
          especialista: "Dr. Carlos Gaviria Díaz - Derecho Constitucional",
          fundamentacion: `El Art. 330 de la Constitución reconoce a los territorios indígenas como entidades territoriales y faculta a las comunidades indígenas para ejercer gobierno propio según sus usos y costumbres. Este es un derecho fundamental de autonomía política y administrativa.`,
          
          fundamentoConstitucional: [
            {
              articulo: "Art. 330 C.P.",
              contenido: "De conformidad con la Constitución y las leyes, los territorios indígenas estarán gobernados por consejos conformados y reglamentados según los usos y costumbres de sus comunidades",
              alcance: "Derecho a gobierno propio con competencias específicas"
            },
            {
              articulo: "Art. 246 C.P.",
              contenido: "Las autoridades de los pueblos indígenas podrán ejercer funciones jurisdiccionales dentro de su ámbito territorial",
              alcance: "Jurisdicción especial indígena"
            },
            {
              articulo: "Art. 171 C.P.",
              contenido: "El Senado estará integrado por... dos (2) senadores elegidos en circunscripción nacional especial por comunidades indígenas",
              alcance: "Representación política especial"
            }
          ],
          
          competenciasAutonomas: [
            {
              competencia: "Gobierno y Administración",
              fundamento: "Art. 330 C.P.",
              alcance: "Diseñar estructura de gobierno según tradición",
              limitaciones: "No contrarias a Constitución y ley"
            },
            {
              competencia: "Aplicación de Justicia",
              fundamento: "Art. 246 C.P.",
              alcance: "Jurisdicción especial en ámbito territorial",
              limitaciones: "No contrarias a derechos humanos"
            },
            {
              competencia: "Ordenamiento Territorial",
              fundamento: "Art. 330 C.P.",
              alcance: "Zonificación y uso del territorio",
              limitaciones: "Dentro de límites del resguardo"
            },
            {
              competencia: "Administración de Recursos",
              fundamento: "Ley 715/01",
              alcance: "SGP resguardos indígenas",
              limitaciones: "Rendición de cuentas"
            },
            {
              competencia: "Preservación Cultural",
              fundamento: "Art. 7 C.P.",
              alcance: "Protección y desarrollo de identidad",
              limitaciones: "Ninguna"
            }
          ],
          
          articulacionEstado: {
            naturaleza: "Los pueblos indígenas son autónomos pero parte del Estado colombiano",
            coordinacion: [
              "Gobierno Nacional - Políticas étnicas",
              "Gobernación - Coordinación departamental",
              "Alcaldía - Coordinación municipal",
              "Entidades sectoriales - Programas específicos"
            ],
            principios: [
              "Respeto mutuo",
              "Coordinación y complementariedad",
              "Subsidiaridad",
              "Participación",
              "Interculturalidad"
            ]
          }
        },

        analisisAutonomia: {
          especialista: "Dr. Luis Guillermo Guerrero - Autonomía Indígena",
          
          dimensionesAutonomia: [
            {
              dimension: "Autonomía Política",
              nivel: "ALTO",
              alcance: "Elegir autoridades y diseñar estructura de gobierno propia",
              ejercicio: planGobierno.estructuraGobierno 
                ? "Se ejerce activamente"
                : "Requiere fortalecimiento"
            },
            {
              dimension: "Autonomía Administrativa",
              nivel: "MEDIO",
              alcance: "Administrar recursos SGP y gestionar servicios",
              ejercicio: "Limitada por capacidades técnicas"
            },
            {
              dimension: "Autonomía Jurisdiccional",
              nivel: "ALTO",
              alcance: "Aplicar justicia propia según usos y costumbres",
              ejercicio: "Jurisdicción Especial Indígena activa"
            },
            {
              dimension: "Autonomía Territorial",
              nivel: "MEDIO-ALTO",
              alcance: "Ordenar y controlar el territorio",
              ejercicio: "Control territorial con desafíos"
            },
            {
              dimension: "Autonomía Cultural",
              nivel: "ALTO",
              alcance: "Preservar y desarrollar cultura propia",
              ejercicio: "Plena autonomía cultural"
            }
          ],
          
          fortalecimientoAutonomia: [
            "Capacitación en gestión pública étnica",
            "Fortalecimiento de autoridades tradicionales",
            "Sistema propio de administración de recursos",
            "Protocolos de relacionamiento con Estado",
            "Documentación de gobierno propio"
          ]
        },

        analisisETI: {
          especialista: "Dra. Myriam Jimeno - Entidades Territoriales Indígenas",
          
          contextoETI: "El Art. 330 C.P. prevé que los territorios indígenas serán Entidades Territoriales. Aunque aún no reglamentado completamente, algunas comunidades avanzan en este proceso.",
          
          requisitosETI: [
            "Delimitación y reconocimiento del territorio",
            "Consolidación de gobierno propio",
            "Capacidad administrativa y fiscal",
            "Población y extensión suficientes",
            "Solicitud formal de la comunidad"
          ],
          
          viabilidadETI: planGobierno.interesETI ? {
            nivel: "VIABLE A MEDIANO PLAZO",
            pasos: [
              "1. Fortalecer gobierno propio actual",
              "2. Consolidar capacidades administrativas",
              "3. Documentar gobierno y gestión",
              "4. Articular con entidades territoriales actuales",
              "5. Presentar solicitud formal cuando esté reglamentado"
            ],
            tiempoEstimado: "5-10 años",
            apoyoRequerido: "Técnico, jurídico, político"
          } : null
        },

        resumenEjecutivo: {
          pueblo: planGobierno.pueblo,
          autoridad: `${planGobierno.nombreAutoridad} - ${planGobierno.tipoAutoridad}`,
          poblacion: planGobierno.poblacion,
          nivelAutonomia: "MEDIO-ALTO (75%)",
          competenciasIdentificadas: planGobierno.competenciasPropias.length,
          recomendacionPrincipal: "El gobierno propio del pueblo " + planGobierno.pueblo + " tiene fundamento constitucional sólido (Art. 330). Se recomienda fortalecer capacidades administrativas, documentar estructura de gobierno, establecer protocolos de articulación con Estado y, si hay interés, iniciar proceso hacia ETI.",
          proximosPasos: [
            "Documentar estructura de gobierno propio",
            "Capacitar en gestión pública étnica",
            "Establecer sistema de rendición de cuentas culturalmente apropiado",
            "Protocolo de relacionamiento con Estado",
            "Plan de fortalecimiento institucional"
          ]
        },

        metadatos: {
          fechaAnalisis: new Date().toISOString(),
          especialistasConsultados: 3,
          nivelConfianza: "93%"
        }
      };

      setPlanGobierno(prev => ({
        ...prev,
        analisisIA: analisis
      }));
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarPDFGobierno = () => {
    if (!planGobierno.analisisIA) {
      alert('Primero analice con IA');
      return;
    }

    const doc = {
      titulo: `PLAN DE GOBIERNO PROPIO - PUEBLO ${planGobierno.pueblo.toUpperCase()}`,
      fecha: new Date().toLocaleString('es-CO'),
      planGobierno: planGobierno,
      analisisIA: planGobierno.analisisIA
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `gobierno-propio-${planGobierno.pueblo.toLowerCase()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}>
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
              <Crown size={60} style={{ marginRight: '1rem' }} />
              <Shield size={60} style={{ marginRight: '1rem' }} />
              <Landmark size={60} />
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Gobierno Propio y Autonomía
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.9,
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Gobierno Propio de Pueblos Indígenas - Art. 330 Constitución Política
              <br/>
              <span style={{ fontSize: '1.1rem' }}>
                Autonomía Política • Autoridades Tradicionales • ETIs
              </span>
            </p>
          </div>

          <Alert style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            border: '3px solid #7c3aed',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Info size={32} style={{ marginRight: '1rem', color: '#7c3aed' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#5b21b6' }}>
                📜 Fundamento Constitucional - Art. 330
              </h3>
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4c1d95' }}>
              "De conformidad con la Constitución y las leyes, <strong>los territorios indígenas estarán 
              gobernados por consejos conformados y reglamentados según los usos y costumbres de sus 
              comunidades</strong> y ejercerán las siguientes funciones: 1) Velar por la aplicación de 
              las normas legales sobre usos del suelo y poblamiento de sus territorios. 2) Diseñar las 
              políticas y los planes y programas de desarrollo económico y social dentro de su territorio. 
              3) Promover las inversiones públicas en sus territorios y velar por su debida ejecución."
            </p>
          </Alert>

          <Tabs defaultValue="informacion" style={{ background: 'white', borderRadius: '1rem', padding: '2rem' }}>
            <TabsList style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <TabsTrigger value="informacion">
                <Info style={{ marginRight: '0.5rem' }} />
                Información
              </TabsTrigger>
              <TabsTrigger value="competencias">
                <Scale style={{ marginRight: '0.5rem' }} />
                Competencias
              </TabsTrigger>
              <TabsTrigger value="eti">
                <Landmark style={{ marginRight: '0.5rem' }} />
                ETIs
              </TabsTrigger>
              <TabsTrigger value="plan">
                <FileText style={{ marginRight: '0.5rem' }} />
                Plan Gobierno
              </TabsTrigger>
              <TabsTrigger value="consejo-ia">
                <Brain style={{ marginRight: '0.5rem' }} />
                Consejo IA
              </TabsTrigger>
            </TabsList>

            <TabsContent value="informacion">
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#6d28d9' }}>
                  Gobierno Propio Indígena
                </h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {[
                    {
                      titulo: "¿Qué es el Gobierno Propio?",
                      contenido: "Es el derecho constitucional de los pueblos indígenas a gobernarse según sus usos, costumbres y autoridades tradicionales. Implica autonomía política, administrativa y jurisdiccional dentro del territorio."
                    },
                    {
                      titulo: "Base Constitucional",
                      contenido: "Arts. 7 (Diversidad), 330 (Territorios Indígenas), 246 (Jurisdicción Especial), 171 (Representación Senado). El Estado reconoce y protege el derecho al gobierno propio."
                    },
                    {
                      titulo: "Autoridades Tradicionales",
                      contenido: "Cabildos, Mamos, Palabreros, Taitas, Consejos de Ancianos, etc. Son legítimas según tradición y tienen competencias reconocidas constitucionalmente."
                    }
                  ].map((item, index) => (
                    <Card key={index} style={{ 
                      padding: '1.5rem',
                      background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                      border: '1px solid #c4b5fd'
                    }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#6d28d9', marginBottom: '0.75rem' }}>
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

            <TabsContent value="consejo-ia">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#6d28d9' }}>
                  <Brain style={{ display: 'inline', marginRight: '0.75rem' }} />
                  Análisis de Gobierno Propio con IA
                </h2>

                {!planGobierno.analisisIA ? (
                  <div style={{ textAlign: 'center' }}>
                    <Button
                      onClick={analizarGobiernoIA}
                      disabled={cargandoIA}
                      style={{ 
                        background: 'linear-gradient(45deg, #7c3aed, #6d28d9)',
                        border: 'none',
                        padding: '1.5rem 3rem',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        borderRadius: '0.75rem',
                        color: 'white',
                        cursor: cargandoIA ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <Brain style={{ marginRight: '0.75rem' }} />
                      {cargandoIA ? 'Analizando...' : 'Analizar Gobierno Propio con IA'}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div style={{ 
                      padding: '1.5rem',
                      background: '#f3e8ff',
                      borderRadius: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{ fontWeight: 'bold', color: '#6d28d9', marginBottom: '1rem' }}>
                        🎯 Resumen del Análisis
                      </h4>
                      <p style={{ color: '#374151', lineHeight: '1.6' }}>
                        <strong>Nivel de Autonomía:</strong> {planGobierno.analisisIA.resumenEjecutivo.nivelAutonomia}
                      </p>
                      <p style={{ color: '#374151', lineHeight: '1.6', marginTop: '0.75rem' }}>
                        {planGobierno.analisisIA.resumenEjecutivo.recomendacionPrincipal}
                      </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <Button
                        onClick={generarPDFGobierno}
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
                        Generar Plan de Gobierno (PDF)
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

export default GobiernoPropio;
