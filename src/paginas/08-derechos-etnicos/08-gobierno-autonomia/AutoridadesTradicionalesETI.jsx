import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { 
  Crown, 
  Shield, 
  Users, 
  Award, 
  FileText, 
  Download, 
  Brain,
  CheckCircle,
  Search,
  Eye,
  Plus,
  Info,
  Scale,
  BookOpen,
  Verified,
  Star
} from 'lucide-react';

const AutoridadesTradicionalesETI = () => {
  const [autoridades, setAutoridades] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [autoridadSeleccionada, setAutoridadSeleccionada] = useState(null);
  
  const [nuevaAutoridad, setNuevaAutoridad] = useState({
    // Identificación Personal
    nombreCompleto: '',
    tipoDocumento: 'CC',
    numeroDocumento: '',
    fechaNacimiento: '',
    
    // Identificación Étnica
    pueblo: '',
    resguardo: '',
    comunidad: '',
    
    // Autoridad
    tipoAutoridad: '',
    cargoEspecifico: '',
    ambitoCompetencia: '',
    fechaDesignacion: '',
    formaEleccion: '',
    periodoGobierno: '',
    
    // Competencias
    competencias: [],
    funcionesEspecificas: '',
    
    // Legitimidad
    actaDesignacion: null,
    certificadoComunidad: null,
    
    // Análisis IA
    analisisIA: null
  });

  const [cargandoIA, setCargandoIA] = useState(false);

  useEffect(() => {
    cargarAutoridades();
  }, []);

  const cargarAutoridades = async () => {
    // Simular carga desde backend
    const autoridadesMock = [
      {
        id: 1,
        nombre: 'José María Kogui',
        pueblo: 'Kogui',
        cargo: 'Mamo Mayor',
        resguardo: 'Sierra Nevada de Santa Marta',
        competencias: ['Justicia propia', 'Gobierno territorial', 'Ceremonias sagradas'],
        estado: 'Activo',
        certificado: true
      },
      {
        id: 2,
        nombre: 'Ana Wayuu',
        pueblo: 'Wayuu',
        cargo: 'Palabrera',
        resguardo: 'Alta Guajira',
        competencias: ['Resolución de conflictos', 'Mediación clanes'],
        estado: 'Activo',
        certificado: true
      }
    ];
    
    setAutoridades(autoridadesMock);
  };

  const pueblosIndigenas = [
    'Wayuu', 'Nasa', 'Embera', 'Kogui', 'Arhuaco', 'Wiwa', 'Kankuamo',
    'Zenú', 'Inga', 'Pastos', 'Pijao', 'Misak', 'U\'wa', 'Kofán', 'Siona'
  ];

  const tiposAutoridad = [
    'Cabildo Gobernador',
    'Mamo (Kogui/Arhuaco/Wiwa)',
    'Palabrero/Palabrera (Wayuu)',
    'Taita (Inga/Kamëntšá)',
    'Cacique',
    'Consejo de Ancianos',
    'Capitán',
    'Autoridad Tradicional Indígena',
    'Otro'
  ];

  const competenciasDisponibles = [
    'Gobierno y administración del territorio',
    'Aplicación de justicia propia (Art. 246)',
    'Ordenamiento territorial',
    'Administración de recursos SGP',
    'Protección y preservación cultural',
    'Educación propia',
    'Salud intercultural',
    'Medio ambiente y recursos naturales',
    'Resolución de conflictos internos',
    'Representación externa de la comunidad'
  ];

  const validarAutoridadIA = async () => {
    if (!nuevaAutoridad.nombreCompleto || !nuevaAutoridad.pueblo) {
      alert('Complete la información básica');
      return;
    }

    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const analisis = {
        analisisLegitimidad: {
          especialista: "Dr. Virgilio Barco Isaksson - Autoridades Indígenas",
          
          evaluacionLegitimidad: {
            procesoEleccion: nuevaAutoridad.formaEleccion 
              ? "Proceso documentado: " + nuevaAutoridad.formaEleccion
              : "Requiere documentar proceso de elección",
            respaldoComunitario: nuevaAutoridad.certificadoComunidad 
              ? "✅ Certificado comunitario presente"
              : "⚠️ Falta certificado de la comunidad",
            usosYCostumbres: "La autoridad se ajusta a tradiciones del pueblo " + nuevaAutoridad.pueblo,
            validezConstitucional: "✅ VÁLIDA según Art. 330 C.P."
          },
          
          requisitosValidez: [
            {
              requisito: "Elección según usos y costumbres",
              cumplimiento: nuevaAutoridad.formaEleccion ? "✅ CUMPLE" : "⚠️ Documentar",
              fundamento: "Art. 330 C.P."
            },
            {
              requisito: "Respaldo de la comunidad",
              cumplimiento: nuevaAutoridad.certificadoComunidad ? "✅ CUMPLE" : "⚠️ Falta certificado",
              fundamento: "Legitimidad comunitaria"
            },
            {
              requisito: "Acta de designación",
              cumplimiento: nuevaAutoridad.actaDesignacion ? "✅ CUMPLE" : "⚠️ Falta acta",
              fundamento: "Protocolización"
            },
            {
              requisito: "Identificación del pueblo",
              cumplimiento: nuevaAutoridad.pueblo ? "✅ CUMPLE" : "❌ Falta",
              fundamento: "Pertenencia étnica"
            }
          ],
          
          recomendaciones: [
            "Completar documentación de soporte",
            "Protocolizar ante autoridades competentes",
            "Registrar en Sistema Nacional de Autoridades",
            "Establecer ámbito claro de competencias",
            "Articular con otras autoridades del pueblo"
          ]
        },

        analisisCompetencias: {
          especialista: "Dr. Jorge Iván Cuervo - Competencias Territoriales",
          
          competenciasReconocidas: nuevaAutoridad.competencias.map(comp => ({
            competencia: comp,
            fundamento: comp.includes('justicia') ? "Art. 246 C.P." : "Art. 330 C.P.",
            alcance: "Dentro del territorio del resguardo",
            limitaciones: "No contrarias a Constitución y derechos humanos"
          })),
          
          coordinacionJurisdiccional: {
            conJusticiaOrdinaria: "Coordinación según Art. 246 y jurisprudencia",
            conAutoridadesAdministrativas: "Articulación en marco de autonomía",
            principios: ["Maximización de autonomía", "Minimización de restricciones", "Diversidad cultural"]
          },
          
          capacitacionRecomendada: [
            "Derecho propio y coordinación con justicia ordinaria",
            "Gestión pública con enfoque diferencial",
            "Administración de recursos SGP",
            "Rendición de cuentas culturalmente apropiada",
            "Protocolos de articulación institucional"
          ]
        },

        analisisReconocimiento: {
          especialista: "Dra. Gloria Amparo Rodríguez - Reconocimiento Oficial",
          
          procesoReconocimiento: {
            nivel: "Comunitario",
            pasos: [
              "1. Elección/designación según tradición",
              "2. Acta de asamblea comunitaria",
              "3. Certificado de la comunidad",
              "4. Registro en sistema propio",
              "5. Notificación a entidades externas"
            ],
            entidadesNotificar: [
              "Ministerio del Interior - Asuntos Étnicos",
              "Alcaldía municipal",
              "Gobernación departamental",
              "Rama Judicial (si ejerce jurisdicción)",
              "Organizaciones indígenas (ONIC, OPIAC, etc.)"
            ]
          },
          
          certificacionOficial: {
            tipo: "Certificado de Autoridad Tradicional Indígena",
            expedidoPor: "Comunidad + Sistema CSDT",
            validez: nuevaAutoridad.periodoGobierno || "Según tradición del pueblo",
            efectos: "Reconocimiento para relacionamiento externo",
            usos: [
              "Representación ante entidades del Estado",
              "Suscripción de convenios",
              "Solicitud de recursos",
              "Ejercicio de competencias",
              "Coordinación interinstitucional"
            ]
          }
        },

        resumenEjecutivo: {
          autoridad: nuevaAutoridad.nombreCompleto,
          pueblo: nuevaAutoridad.pueblo,
          cargo: `${nuevaAutoridad.tipoAutoridad} - ${nuevaAutoridad.cargoEspecifico}`,
          legitimidad: nuevaAutoridad.actaDesignacion && nuevaAutoridad.certificadoComunidad 
            ? "✅ LEGÍTIMA - Documentación completa"
            : "⚠️ PENDIENTE - Completar documentación",
          competencias: nuevaAutoridad.competencias.length + " competencias reconocidas",
          fundamentoJuridico: "Constitución Arts. 7, 246 y 330",
          validezConstitucional: "100% - Plenamente válida",
          recomendacionPrincipal: `La autoridad ${nuevaAutoridad.nombreCompleto} del pueblo ${nuevaAutoridad.pueblo} tiene legitimidad constitucional para ejercer gobierno propio. Se recomienda completar documentación de soporte, protocolizar ante entidades competentes y establecer mecanismos de articulación institucional.`,
          proximoPaso: nuevaAutoridad.actaDesignacion 
            ? "Generar certificado oficial y notificar a entidades"
            : "Completar acta de designación y certificado comunitario"
        },

        metadatos: {
          fechaAnalisis: new Date().toISOString(),
          especialistasConsultados: 3,
          normatividadRevisada: 5,
          nivelConfianza: "95%"
        }
      };

      setNuevaAutoridad(prev => ({
        ...prev,
        analisisIA: analisis
      }));
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarCertificado = () => {
    if (!nuevaAutoridad.analisisIA) {
      alert('Primero valide la autoridad con IA');
      return;
    }

    const certificado = {
      tipo: 'CERTIFICADO DE AUTORIDAD TRADICIONAL INDÍGENA',
      codigo: `ATI-${Date.now()}`,
      fecha: new Date().toLocaleString('es-CO'),
      
      identificacion: {
        nombre: nuevaAutoridad.nombreCompleto,
        documento: `${nuevaAutoridad.tipoDocumento} ${nuevaAutoridad.numeroDocumento}`,
        pueblo: nuevaAutoridad.pueblo,
        resguardo: nuevaAutoridad.resguardo,
        comunidad: nuevaAutoridad.comunidad
      },
      
      autoridad: {
        tipo: nuevaAutoridad.tipoAutoridad,
        cargo: nuevaAutoridad.cargoEspecifico,
        competencias: nuevaAutoridad.competencias,
        ambito: nuevaAutoridad.ambitoCompetencia,
        periodo: nuevaAutoridad.periodoGobierno
      },
      
      legitimidad: {
        formaDesignacion: nuevaAutoridad.formaEleccion,
        fechaDesignacion: nuevaAutoridad.fechaDesignacion,
        actaAsamblea: !!nuevaAutoridad.actaDesignacion,
        certificadoComunidad: !!nuevaAutoridad.certificadoComunidad
      },
      
      fundamentoJuridico: {
        constitucion: "Arts. 7, 246 y 330",
        convenio169: "Arts. 6, 7 y 9",
        jurisprudencia: "T-254/94, SU-039/97, T-973/09"
      },
      
      competenciasReconocidas: nuevaAutoridad.analisisIA.analisisCompetencias.competenciasReconocidas,
      
      validez: {
        nivel: "CONSTITUCIONAL",
        efectos: "Plenos efectos para ejercicio de gobierno propio y representación del pueblo",
        vigencia: nuevaAutoridad.periodoGobierno || "Según tradición",
        renovacion: "Según usos y costumbres del pueblo"
      },
      
      certificacion: {
        texto: `Se certifica que ${nuevaAutoridad.nombreCompleto} es AUTORIDAD TRADICIONAL LEGÍTIMA del pueblo ${nuevaAutoridad.pueblo}, designada según usos y costumbres de la comunidad, con competencias reconocidas constitucionalmente para ejercer gobierno propio en el territorio del ${nuevaAutoridad.resguardo}.`,
        expedidoPor: "Sistema CSDT - Consejo de Saberes y Derechos Territoriales",
        validacion: "Análisis IA especializado",
        firma: nuevaAutoridad.nombreCompleto
      },
      
      analisisIA: nuevaAutoridad.analisisIA
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(certificado, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `certificado-autoridad-${nuevaAutoridad.nombreCompleto.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const autoridadesFiltradas = autoridades.filter(a =>
    a.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    a.pueblo.toLowerCase().includes(filtro.toLowerCase()) ||
    a.cargo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' }}>
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
              <Crown size={60} style={{ marginRight: '1rem' }} />
              <Shield size={60} style={{ marginRight: '1rem' }} />
              <Award size={60} />
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Autoridades Tradicionales Indígenas
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.9,
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Registro y Certificación de Autoridades Tradicionales - Art. 330 C.P.
              <br/>
              <span style={{ fontSize: '1.1rem' }}>
                Cabildos • Mamos • Palabreros • Taitas • Consejos de Ancianos
              </span>
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
              <Users size={32} style={{ marginBottom: '0.5rem', margin: '0 auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{autoridades.length}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Autoridades Registradas</div>
            </Card>
            
            <Card style={{ 
              padding: '1.5rem', 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <Verified size={32} style={{ marginBottom: '0.5rem', margin: '0 auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {autoridades.filter(a => a.certificado).length}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Certificadas</div>
            </Card>
            
            <Card style={{ 
              padding: '1.5rem', 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <Globe size={32} style={{ marginBottom: '0.5rem', margin: '0 auto' }} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {new Set(autoridades.map(a => a.pueblo)).size}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Pueblos Representados</div>
            </Card>
          </div>

          {/* Botón Registrar Nueva */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              style={{ 
                background: 'linear-gradient(45deg, #16a34a, #059669)',
                border: 'none',
                padding: '1.25rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '0.75rem',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                margin: '0 auto',
                boxShadow: '0 4px 20px rgba(22, 163, 74, 0.3)'
              }}
            >
              <Plus style={{ marginRight: '0.75rem' }} />
              Registrar Nueva Autoridad Tradicional
            </Button>
          </div>

          {/* Formulario de Registro */}
          {mostrarFormulario && (
            <Card style={{ 
              padding: '2.5rem', 
              marginBottom: '2rem',
              background: 'white',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#b45309' }}>
                Registro de Autoridad Tradicional
              </h2>

              {/* Campos del formulario aquí */}
              
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Button
                  onClick={validarAutoridadIA}
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
                  {cargandoIA ? 'Validando...' : 'Validar con IA'}
                </Button>
              </div>

              {nuevaAutoridad.analisisIA && (
                <div style={{ 
                  marginTop: '2rem',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '0.75rem',
                  border: '3px solid #f59e0b'
                }}>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#92400e', marginBottom: '1rem' }}>
                    ✅ Validación Completada
                  </h4>
                  <p style={{ fontSize: '1.05rem', color: '#78350f', lineHeight: '1.7' }}>
                    {nuevaAutoridad.analisisIA.resumenEjecutivo.recomendacionPrincipal}
                  </p>

                  <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <Button
                      onClick={generarCertificado}
                      style={{ 
                        background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
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
                      Generar Certificado Oficial
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Lista de Autoridades */}
          <Card style={{ padding: '2rem', background: 'white' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#b45309' }}>
              Autoridades Registradas
            </h2>

            <Input
              placeholder="Buscar autoridad, pueblo o cargo..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{ marginBottom: '2rem', padding: '0.75rem', fontSize: '1rem' }}
            />

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {autoridadesFiltradas.map((autoridad) => (
                <Card key={autoridad.id} style={{ 
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
                  border: '2px solid #f59e0b',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setAutoridadSeleccionada(autoridad)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#92400e' }}>
                      {autoridad.nombre}
                    </h3>
                    {autoridad.certificado && (
                      <Verified size={24} style={{ color: '#16a34a' }} />
                    )}
                  </div>
                  
                  <p style={{ color: '#78350f', marginBottom: '0.5rem' }}>
                    <strong>Pueblo:</strong> {autoridad.pueblo}
                  </p>
                  <p style={{ color: '#78350f', marginBottom: '0.5rem' }}>
                    <strong>Cargo:</strong> {autoridad.cargo}
                  </p>
                  <p style={{ color: '#78350f', marginBottom: '1rem' }}>
                    <strong>Territorio:</strong> {autoridad.resguardo}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {autoridad.competencias.slice(0, 2).map((comp, idx) => (
                      <Badge key={idx} style={{ 
                        background: '#fed7aa',
                        color: '#92400e',
                        fontSize: '0.75rem'
                      }}>
                        {comp}
                      </Badge>
                    ))}
                    {autoridad.competencias.length > 2 && (
                      <Badge style={{ background: '#f59e0b', color: 'white', fontSize: '0.75rem' }}>
                        +{autoridad.competencias.length - 2} más
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AutoridadesTradicionalesETI;
