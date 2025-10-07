import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { useDependencia } from '../../../hooks/useDependencia';
import { 
  FileText, 
  User, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Brain, 
  Shield, 
  Eye, 
  EyeOff,
  Clock,
  Target,
  Zap,
  Users,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Building,
  FileCheck,
  Home
} from 'lucide-react';

const PQRSFD = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    // Datos personales
    nombre: '',
    identificacion: '',
    telefono: '',
    email: '',
    direccion: '',
    municipio: '',
    departamento: '',
    anonimo: false,
    
    // Detalles del PQRSFD
    tipo: '',
    entidad: '',
    dependenciaEntidad: '',
    hechos: '',
    solicitud: '',
    
    // Evidencias
    archivoConsejoIA: null,
    evidencias: [],
    
    // Análisis IA
    analisisIA: null,
    analisisUnificado: null,
    codigoPQRSFD: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  // Hook para gestión de dependencias
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const tiposPQRSFD = [
    { 
      value: 'peticion', 
      label: 'Petición', 
      descripcion: 'Solicitud de información, documentos o actuación de la entidad',
      plazo: '15 días hábiles',
      icono: FileText,
      color: '#3b82f6'
    },
    { 
      value: 'queja', 
      label: 'Queja', 
      descripcion: 'Manifestación de insatisfacción por mala prestación de servicios',
      plazo: '15 días hábiles',
      icono: AlertCircle,
      color: '#f59e0b'
    },
    { 
      value: 'reclamo', 
      label: 'Reclamo', 
      descripcion: 'Solicitud de solución a un problema específico',
      plazo: '15 días hábiles',
      icono: Shield,
      color: '#ef4444'
    },
    { 
      value: 'sugerencia', 
      label: 'Sugerencia', 
      descripcion: 'Propuesta de mejora en procesos o servicios',
      plazo: '15 días hábiles',
      icono: Lightbulb,
      color: '#8b5cf6'
    },
    { 
      value: 'felicitacion', 
      label: 'Felicitación', 
      descripcion: 'Reconocimiento por buen servicio o gestión',
      plazo: 'Sin plazo',
      icono: CheckCircle,
      color: '#10b981'
    },
    { 
      value: 'denuncia', 
      label: 'Denuncia', 
      descripcion: 'Reporte de irregularidades, corrupción o mal uso de recursos',
      plazo: '15 días hábiles',
      icono: Eye,
      color: '#dc2626'
    }
  ];

  const entidadesComunes = [
    { categoria: 'Alcaldías y Gobernaciones', entidades: [
      'Alcaldía Municipal',
      'Gobernación Departamental'
    ]},
    { categoria: 'Ministerios', entidades: [
      'Ministerio de Salud y Protección Social',
      'Ministerio de Educación Nacional',
      'Ministerio del Trabajo',
      'Ministerio de Vivienda',
      'Ministerio de Transporte',
      'Ministerio del Interior'
    ]},
    { categoria: 'Seguridad Social', entidades: [
      'EPS (Entidad Promotora de Salud)',
      'ARL (Administradora de Riesgos Laborales)',
      'AFP (Administradora de Fondos de Pensiones)',
      'Colpensiones',
      'Fondo Nacional del Ahorro'
    ]},
    { categoria: 'Servicios Públicos', entidades: [
      'Superintendencia de Servicios Públicos',
      'Empresa de Acueducto y Alcantarillado',
      'Empresa de Energía',
      'Empresa de Gas',
      'Empresa de Telecomunicaciones'
    ]},
    { categoria: 'Educación y Formación', entidades: [
      'ICBF (Instituto Colombiano de Bienestar Familiar)',
      'SENA (Servicio Nacional de Aprendizaje)',
      'ICETEX (Instituto Colombiano de Crédito Educativo)'
    ]},
    { categoria: 'Financiero', entidades: [
      'Banco de la República',
      'Superintendencia Financiera',
      'Superintendencia de Sociedades'
    ]}
  ];

  const departamentos = [
    'Antioquia', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas',
    'Caquetá', 'Cauca', 'Cesar', 'Córdoba', 'Cundinamarca', 'Chocó',
    'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander',
    'Quindío', 'Risaralda', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
    'Arauca', 'Casanare', 'Putumayo', 'San Andrés', 'Amazonas', 'Guainía', 
    'Guaviare', 'Vaupés', 'Vichada'
  ];

  const pasos = [
    { numero: 1, titulo: 'Datos Personales', icono: User },
    { numero: 2, titulo: 'Tipo PQRSFD', icono: FileText },
    { numero: 3, titulo: 'Hechos', icono: Shield },
    { numero: 4, titulo: 'Solicitud', icono: Target },
    { numero: 5, titulo: 'Evidencias', icono: Upload },
    { numero: 6, titulo: 'Análisis IA', icono: Brain },
    { numero: 7, titulo: 'Revisión', icono: CheckCircle }
  ];

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

  const handleInputChange = (campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleAnonimatoChange = (anonimo) => {
    setFormulario(prev => ({
      ...prev,
      anonimo,
      ...(anonimo && {
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        direccion: ''
      })
    }));
  };

  const generarCodigoPQRSFD = () => {
    const tipoAbrev = formulario.tipo.substring(0, 3).toUpperCase();
    const fecha = new Date();
    const codigo = `PQRSFD-${tipoAbrev}-${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setFormulario(prev => ({ ...prev, codigoPQRSFD: codigo }));
    return codigo;
  };

  const handleCargarEvidencia = (event) => {
    const archivos = Array.from(event.target.files);
    setFormulario(prev => ({
      ...prev,
      evidencias: [...prev.evidencias, ...archivos]
    }));
  };

  const eliminarEvidencia = (index) => {
    setFormulario(prev => ({
      ...prev,
      evidencias: prev.evidencias.filter((_, i) => i !== index)
    }));
  };

  const analisisUnificadoIA = async () => {
    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const tipoSeleccionado = tiposPQRSFD.find(t => t.value === formulario.tipo);
      
      const analisisUnificado = {
        tipoAnalisis: formulario.tipo,
        especialistas: [
          {
            nombre: "Dr. Carlos Eduardo Vargas",
            especialidad: "Derecho Administrativo",
            analisis: `El caso de tipo "${tipoSeleccionado?.label}" presenta elementos administrativos claros que justifican su procesamiento como PQRSFD. La entidad ${formulario.entidad} tiene la obligación legal de responder dentro del plazo de ${tipoSeleccionado?.plazo}. Se observa fundamentación jurídica suficiente basada en el artículo 23 de la Constitución Política y la Ley 1755 de 2015 (Código de Procedimiento Administrativo).`
          },
          {
            nombre: "Dra. Ana María Rodríguez",
            especialidad: "Derecho de Petición",
            analisis: `Desde la perspectiva del derecho fundamental de petición, el caso cumple con los requisitos establecidos en la jurisprudencia constitucional. La solicitud es clara, respetuosa y se dirige a la entidad competente. La narración de hechos proporciona contexto suficiente para que la entidad pueda emitir una respuesta de fondo.`
          },
          {
            nombre: "Dr. Luis Fernando García",
            especialidad: "Derecho Procesal Administrativo",
            analisis: `El procedimiento de PQRSFD es el mecanismo idóneo para resolver este asunto. Se cumplen todos los requisitos procesales establecidos en la Ley 1755 de 2015. La entidad debe garantizar respuesta oportuna, completa y de fondo. En caso de silencio administrativo, procederían las acciones constitucionales pertinentes.`
          },
          {
            nombre: "Dra. Patricia Alejandra Herrera",
            especialidad: "Derechos Fundamentales",
            analisis: `El caso involucra potencialmente derechos fundamentales que requieren protección efectiva. La actuación de la entidad debe estar guiada por los principios de eficacia, economía, celeridad e imparcialidad. Se recomienda hacer seguimiento riguroso al cumplimiento de los plazos legales.`
          }
        ],
        normatividadAplicable: [
          {
            norma: "Constitución Política - Art. 23",
            descripcion: "Toda persona tiene derecho a presentar peticiones respetuosas a las autoridades y a obtener pronta resolución"
          },
          {
            norma: "Ley 1755 de 2015",
            descripcion: "Por medio de la cual se regula el Derecho Fundamental de Petición"
          },
          {
            norma: "Ley 1437 de 2011 (CPACA)",
            descripcion: "Código de Procedimiento Administrativo y de lo Contencioso Administrativo"
          },
          {
            norma: "Jurisprudencia T-760/2008",
            descripcion: "Sentencia de tutela sobre derecho de petición en salud"
          }
        ],
        conclusion: `El consejo de especialistas unánimemente recomienda proceder con el PQRSFD de tipo "${tipoSeleccionado?.label}". El caso presenta elementos suficientes y la solicitud es procedente según el marco jurídico colombiano. La entidad ${formulario.entidad} debe responder dentro del plazo de ${tipoSeleccionado?.plazo}.`,
        recomendaciones: [
          "Radicar el PQRSFD de manera formal ante la entidad competente",
          "Incluir toda la evidencia documental que respalde los hechos narrados",
          "Hacer seguimiento riguroso al cumplimiento del plazo legal de respuesta",
          "Guardar copia del radicado con fecha y hora de presentación",
          "En caso de no obtener respuesta oportuna, considerar acción de tutela por violación al derecho de petición",
          "Mantener comunicación escrita con la entidad para efectos probatorios"
        ],
        plazosLegales: {
          respuesta: tipoSeleccionado?.plazo || '15 días hábiles',
          silencioAdministrativo: '30 días hábiles',
          accionTutela: '10 días hábiles desde la falta de respuesta'
        },
        siguientesPasos: [
          {
            paso: 1,
            descripcion: "Presentar el PQRSFD ante la entidad",
            plazo: "Inmediato"
          },
          {
            paso: 2,
            descripcion: "Obtener constancia de radicación",
            plazo: "Mismo día de presentación"
          },
          {
            paso: 3,
            descripcion: "Esperar respuesta de la entidad",
            plazo: tipoSeleccionado?.plazo
          },
          {
            paso: 4,
            descripcion: "Evaluar respuesta recibida",
            plazo: "3 días después de recibir respuesta"
          },
          {
            paso: 5,
            descripcion: "Si no hay respuesta, interponer tutela",
            plazo: "Después de vencido el plazo legal"
          }
        ]
      };

      setFormulario(prev => ({
        ...prev,
        analisisUnificado: analisisUnificado
      }));
      
      setMostrarAnalisis(true);
    } catch (error) {
      console.error('Error en análisis unificado:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarPDFProfesional = () => {
    const tipoSeleccionado = tiposPQRSFD.find(t => t.value === formulario.tipo);
    
    const pdfContent = {
      tipo: 'PQRSFD',
      codigoPQRSFD: formulario.codigoPQRSFD,
      fecha: new Date().toISOString(),
      tipoPQRSFD: tipoSeleccionado?.label,
      datosPersonales: formulario.anonimo ? {
        tipo: 'Anónimo',
        nota: 'Petición presentada de manera anónima conforme al derecho'
      } : {
        nombre: formulario.nombre,
        identificacion: formulario.identificacion,
        telefono: formulario.telefono,
        email: formulario.email,
        direccion: formulario.direccion,
        municipio: formulario.municipio,
        departamento: formulario.departamento
      },
      destinatario: {
        entidad: formulario.entidad,
        dependencia: formulario.dependenciaEntidad,
        asunto: `${tipoSeleccionado?.label} - ${formulario.codigoPQRSFD}`
      },
      contenido: {
        hechos: formulario.hechos,
        solicitud: formulario.solicitud
      },
      evidencias: formulario.evidencias.map(archivo => ({
        nombre: archivo.name,
        tipo: archivo.type,
        tamaño: (archivo.size / 1024).toFixed(2) + ' KB'
      })),
      analisisIA: formulario.analisisUnificado,
      marcoLegal: {
        constitucion: 'Artículo 23 - Derecho de Petición',
        ley: 'Ley 1755 de 2015 - Derecho Fundamental de Petición',
        plazoRespuesta: tipoSeleccionado?.plazo
      }
    };

    // Simular descarga del PDF
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `pqrsfd-${formulario.codigoPQRSFD}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // Retornar ruta simulada del PDF
    return `pdfs/pqrsfd-${formulario.codigoPQRSFD}.pdf`;
  };

  const iniciarDependencia = async () => {
    try {
      if (!formulario.analisisUnificado) {
        alert('Por favor, primero realiza el análisis con IA.');
        return;
      }

      // Generar código si no existe
      const codigo = formulario.codigoPQRSFD || generarCodigoPQRSFD();

      // Generar PDF
      const rutaPDF = generarPDFProfesional();

      const tipoSeleccionado = tiposPQRSFD.find(t => t.value === formulario.tipo);

      // Preparar datos para la dependencia
      const datosDependencia = {
        modulo: 'PQRSFD',
        titulo: `${tipoSeleccionado?.label} - ${formulario.entidad}`,
        descripcion: formulario.hechos.substring(0, 200) + '...',
        tipo: formulario.tipo,
        datosCliente: formulario.anonimo ? {
          nombre: 'Anónimo',
          tipo: 'anonimo'
        } : {
          nombre: formulario.nombre,
          email: formulario.email,
          telefono: formulario.telefono,
          identificacion: formulario.identificacion,
          direccion: formulario.direccion
        },
        datosUbicacion: {
          municipio: formulario.municipio,
          departamento: formulario.departamento,
          pais: 'Colombia'
        },
        resultado: formulario.analisisUnificado,
        codigoCaso: codigo,
        pdfsAdicionales: [
          {
            ruta: rutaPDF,
            tipo: 'pqrsfd_principal',
            nombre: `PQRSFD ${tipoSeleccionado?.label} - ${codigo}.pdf`
          },
          ...formulario.evidencias.map((ev, index) => ({
            ruta: `pdfs/evidencia-${index + 1}-${codigo}.pdf`,
            tipo: 'evidencia',
            nombre: ev.name
          }))
        ]
      };

      // Generar dependencia
      await generarDependencia(datosDependencia);

    } catch (error) {
      console.error('Error al iniciar dependencia:', error);
      alert('Error al generar la dependencia. Por favor, intenta de nuevo.');
    }
  };

  const tipoSeleccionado = tiposPQRSFD.find(t => t.value === formulario.tipo);
  const IconoTipo = tipoSeleccionado?.icono || FileText;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
              <FileText style={{ marginRight: '1rem', display: 'inline' }} />
              PQRSFD
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto 1rem'
            }}>
              Peticiones, Quejas, Reclamos, Sugerencias, Felicitaciones y Denuncias
            </p>
            <p style={{ fontSize: '1rem', opacity: 0.85 }}>
              Sistema de Control Social - Derecho Fundamental de Petición (Art. 23 CP)
            </p>
          </div>

          {/* Indicador de pasos */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            {pasos.map((paso) => (
              <div key={paso.numero} style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '0.75rem 1rem',
                borderRadius: '2rem',
                background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: paso.numero === pasoActual ? '2px solid white' : '2px solid transparent',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => setPasoActual(paso.numero)}
              >
                <paso.icono size={20} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontWeight: paso.numero === pasoActual ? 'bold' : 'normal' }}>
                  {paso.numero}. {paso.titulo}
                </span>
              </div>
            ))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {/* Paso 1: Datos Personales */}
            {pasoActual === 1 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  <User style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Datos Personales
                </h2>

                <div style={{ 
                  marginBottom: '2rem', 
                  padding: '1.5rem', 
                  background: '#f0f9ff', 
                  borderRadius: '0.5rem',
                  border: '1px solid #0ea5e9'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '1rem' 
                  }}>
                    <input
                      type="checkbox"
                      id="anonimo"
                      checked={formulario.anonimo}
                      onChange={(e) => handleAnonimatoChange(e.target.checked)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <Label htmlFor="anonimo" style={{ 
                      fontWeight: 'bold',
                      color: '#0c4a6e',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {formulario.anonimo ? <EyeOff size={20} style={{ marginRight: '0.5rem' }} /> : <Eye size={20} style={{ marginRight: '0.5rem' }} />}
                      Presentar de forma anónima
                    </Label>
                  </div>
                  <p style={{ 
                    color: '#075985', 
                    fontSize: '0.9rem',
                    marginLeft: '1.5rem'
                  }}>
                    ✓ Al marcar esta opción, sus datos personales no aparecerán en el documento<br />
                    ✓ La ley protege el derecho a presentar peticiones anónimas<br />
                    ✓ La entidad debe tramitar la petición sin exigir identificación
                  </p>
                </div>

                {!formulario.anonimo && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '1.5rem' 
                  }}>
                    <div>
                      <Label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#374151'
                      }}>
                        Nombre Completo *
                      </Label>
                      <Input
                        value={formulario.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        placeholder="Ingrese su nombre completo"
                      />
                    </div>

                    <div>
                      <Label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#374151'
                      }}>
                        Número de Identificación *
                      </Label>
                      <Input
                        value={formulario.identificacion}
                        onChange={(e) => handleInputChange('identificacion', e.target.value)}
                        placeholder="Cédula de ciudadanía"
                      />
                    </div>

                    <div>
                      <Label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#374151'
                      }}>
                        Teléfono
                      </Label>
                      <Input
                        value={formulario.telefono}
                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                        placeholder="Número de teléfono"
                      />
                    </div>

                    <div>
                      <Label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#374151'
                      }}>
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={formulario.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Correo electrónico para respuesta"
                      />
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                      <Label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#374151'
                      }}>
                        Dirección
                      </Label>
                      <Input
                        value={formulario.direccion}
                        onChange={(e) => handleInputChange('direccion', e.target.value)}
                        placeholder="Dirección de residencia o notificación"
                      />
                    </div>

                    <div>
                      <Label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#374151'
                      }}>
                        Municipio *
                      </Label>
                      <Input
                        value={formulario.municipio}
                        onChange={(e) => handleInputChange('municipio', e.target.value)}
                        placeholder="Municipio"
                      />
                    </div>

                    <div>
                      <Label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: '#374151'
                      }}>
                        Departamento *
                      </Label>
                      <Select
                        value={formulario.departamento}
                        onValueChange={(value) => handleInputChange('departamento', value)}
                      >
                        <option value="">Seleccionar departamento</option>
                        {departamentos.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Paso 2: Tipo PQRSFD */}
            {pasoActual === 2 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  <FileText style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Tipo de PQRSFD
                </h2>

                <div style={{ marginBottom: '2rem' }}>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '1rem',
                    fontWeight: 'bold',
                    color: '#374151',
                    fontSize: '1.1rem'
                  }}>
                    Seleccione el tipo de PQRSFD *
                  </Label>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '1rem' 
                  }}>
                    {tiposPQRSFD.map((tipo) => (
                      <div
                        key={tipo.value}
                        onClick={() => handleInputChange('tipo', tipo.value)}
                        style={{
                          padding: '1.5rem',
                          borderRadius: '0.5rem',
                          border: formulario.tipo === tipo.value ? `2px solid ${tipo.color}` : '2px solid #e5e7eb',
                          background: formulario.tipo === tipo.value ? `${tipo.color}10` : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <tipo.icono size={24} style={{ color: tipo.color, marginRight: '0.75rem' }} />
                          <h3 style={{ 
                            fontSize: '1.2rem', 
                            fontWeight: 'bold',
                            color: '#1f2937',
                            margin: 0
                          }}>
                            {tipo.label}
                          </h3>
                        </div>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                          {tipo.descripcion}
                        </p>
                        <Badge style={{ 
                          background: tipo.color, 
                          color: 'white',
                          fontSize: '0.75rem'
                        }}>
                          Plazo: {tipo.plazo}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Entidad a la que se dirige *
                  </Label>
                  <Select
                    value={formulario.entidad}
                    onValueChange={(value) => handleInputChange('entidad', value)}
                  >
                    <option value="">Seleccionar entidad</option>
                    {entidadesComunes.map((categoria) => (
                      <optgroup key={categoria.categoria} label={categoria.categoria}>
                        {categoria.entidades.map((entidad) => (
                          <option key={entidad} value={entidad}>{entidad}</option>
                        ))}
                      </optgroup>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Dependencia específica (Opcional)
                  </Label>
                  <Input
                    value={formulario.dependenciaEntidad}
                    onChange={(e) => handleInputChange('dependenciaEntidad', e.target.value)}
                    placeholder="Ej: Oficina de Atención al Usuario, Departamento de Salud, etc."
                  />
                </div>
              </div>
            )}

            {/* Paso 3: Narración de Hechos */}
            {pasoActual === 3 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  <Shield style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Narración de Hechos
                </h2>

                <div style={{ 
                  marginBottom: '1.5rem', 
                  padding: '1rem', 
                  background: '#fef3c7', 
                  borderRadius: '0.5rem',
                  border: '1px solid #fbbf24'
                }}>
                  <p style={{ color: '#78350f', fontSize: '0.9rem', margin: 0 }}>
                    <strong>📝 Instrucciones:</strong> Narre de manera clara y cronológica los hechos que motivan su PQRSFD.
                    Sea específico con fechas, lugares y personas involucradas.
                  </p>
                </div>

                <div>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Descripción detallada de los hechos *
                  </Label>
                  <Textarea
                    value={formulario.hechos}
                    onChange={(e) => handleInputChange('hechos', e.target.value)}
                    placeholder="Describa de manera clara y detallada los hechos que fundamentan su PQRSFD..."
                    rows={10}
                    style={{ fontSize: '1rem', lineHeight: '1.6' }}
                  />
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: '#6b7280',
                    marginTop: '0.5rem'
                  }}>
                    {formulario.hechos.length} caracteres
                  </p>
                </div>
              </div>
            )}

            {/* Paso 4: Solicitud */}
            {pasoActual === 4 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  <Target style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Solicitud
                </h2>

                <div style={{ 
                  marginBottom: '1.5rem', 
                  padding: '1rem', 
                  background: '#dbeafe', 
                  borderRadius: '0.5rem',
                  border: '1px solid #3b82f6'
                }}>
                  <p style={{ color: '#1e40af', fontSize: '0.9rem', margin: 0 }}>
                    <strong>🎯 Instrucciones:</strong> Indique claramente qué solicita a la entidad. 
                    Sea específico y concrete en su petición.
                  </p>
                </div>

                <div>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    ¿Qué solicita específicamente? *
                  </Label>
                  <Textarea
                    value={formulario.solicitud}
                    onChange={(e) => handleInputChange('solicitud', e.target.value)}
                    placeholder="Especifique claramente qué solicita a la entidad..."
                    rows={8}
                    style={{ fontSize: '1rem', lineHeight: '1.6' }}
                  />
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: '#6b7280',
                    marginTop: '0.5rem'
                  }}>
                    {formulario.solicitud.length} caracteres
                  </p>
                </div>

                <div style={{ 
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: '#f0fdf4',
                  borderRadius: '0.5rem',
                  border: '1px solid #22c55e'
                }}>
                  <h3 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    color: '#166534',
                    marginBottom: '0.5rem'
                  }}>
                    ✓ Ejemplos de solicitudes claras:
                  </h3>
                  <ul style={{ color: '#166534', fontSize: '0.9rem', margin: 0 }}>
                    <li>Solicito copia de los documentos X, Y, Z</li>
                    <li>Solicito información sobre el estado del trámite #123</li>
                    <li>Solicito que se corrija el error en mi factura del mes de octubre</li>
                    <li>Solicito se agende cita médica con especialista</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Paso 5: Evidencias */}
            {pasoActual === 5 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  <Upload style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Evidencias y Documentos
                </h2>

                <div style={{ 
                  marginBottom: '2rem', 
                  padding: '1.5rem', 
                  background: '#f3f4f6', 
                  borderRadius: '0.5rem',
                  border: '2px dashed #9ca3af'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <Upload size={48} style={{ color: '#6b7280', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>
                      Adjunte documentos de soporte
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                      Puede adjuntar documentos, imágenes, PDFs, etc. que respalden su solicitud
                    </p>
                  </div>
                  
                  <input
                    type="file"
                    multiple
                    onChange={handleCargarEvidencia}
                    style={{ display: 'none' }}
                    id="evidencias-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label 
                    htmlFor="evidencias-upload"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '1rem',
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Seleccionar Archivos
                  </label>
                </div>

                {/* Lista de evidencias */}
                {formulario.evidencias.length > 0 && (
                  <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#374151'
                    }}>
                      Archivos adjuntos ({formulario.evidencias.length})
                    </h3>
                    
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {formulario.evidencias.map((archivo, index) => (
                        <div 
                          key={index}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            background: '#f8fafc',
                            borderRadius: '0.5rem',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <FileCheck size={24} style={{ color: '#10b981', marginRight: '0.75rem' }} />
                            <div>
                              <p style={{ 
                                fontWeight: 'bold', 
                                color: '#374151',
                                margin: 0,
                                fontSize: '0.95rem'
                              }}>
                                {archivo.name}
                              </p>
                              <p style={{ 
                                fontSize: '0.8rem', 
                                color: '#6b7280',
                                margin: 0
                              }}>
                                {(archivo.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={() => eliminarEvidencia(index)}
                            style={{
                              background: '#ef4444',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              color: 'white',
                              fontSize: '0.875rem',
                              cursor: 'pointer'
                            }}
                          >
                            Eliminar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Paso 6: Análisis IA */}
            {pasoActual === 6 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  <Brain style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Análisis con Inteligencia Artificial
                </h2>

                {!mostrarAnalisis ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Brain size={64} style={{ color: '#667eea', margin: '0 auto 1.5rem' }} />
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem' }}>
                      Análisis Jurídico con IA
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                      El Consejo de Especialistas analizará su PQRSFD y proporcionará:
                    </p>
                    
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '2rem',
                      maxWidth: '800px',
                      margin: '0 auto 2rem'
                    }}>
                      {[
                        { icon: Shield, text: 'Análisis jurídico' },
                        { icon: FileText, text: 'Normatividad aplicable' },
                        { icon: Lightbulb, text: 'Recomendaciones' },
                        { icon: Clock, text: 'Plazos legales' }
                      ].map((item, index) => (
                        <div key={index} style={{ textAlign: 'center', padding: '1rem' }}>
                          <item.icon size={32} style={{ color: '#667eea', margin: '0 auto 0.5rem' }} />
                          <p style={{ color: '#374151', fontSize: '0.9rem', margin: 0 }}>
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={analisisUnificadoIA}
                      disabled={cargandoIA}
                      style={{
                        background: cargandoIA ? '#9ca3af' : 'linear-gradient(45deg, #667eea, #764ba2)',
                        border: 'none',
                        padding: '1rem 2rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: cargandoIA ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 auto'
                      }}
                    >
                      {cargandoIA ? (
                        <>
                          <Clock style={{ marginRight: '0.5rem' }} className="animate-spin" />
                          Analizando...
                        </>
                      ) : (
                        <>
                          <Brain style={{ marginRight: '0.5rem' }} />
                          Iniciar Análisis con IA
                        </>
                      )}
                    </Button>
                  </div>
                ) : formulario.analisisUnificado && (
                  <div>
                    {/* Especialistas */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                      👥 Consejo de Especialistas
                    </h3>
                    
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                      {formulario.analisisUnificado.especialistas.map((esp, index) => (
                        <Card key={index} style={{ 
                          padding: '1.5rem',
                          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                          border: '1px solid #cbd5e1'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <Users size={24} style={{ color: '#667eea', marginRight: '0.75rem' }} />
                            <div>
                              <h4 style={{ 
                                fontSize: '1.1rem', 
                                fontWeight: 'bold', 
                                color: '#1f2937',
                                margin: 0
                              }}>
                                {esp.nombre}
                              </h4>
                              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                                {esp.especialidad}
                              </p>
                            </div>
                          </div>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0 }}>
                            {esp.analisis}
                          </p>
                        </Card>
                      ))}
                    </div>

                    {/* Normatividad */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                      📚 Normatividad Aplicable
                    </h3>
                    
                    <div style={{ marginBottom: '2rem' }}>
                      {formulario.analisisUnificado.normatividadAplicable.map((norma, index) => (
                        <div 
                          key={index}
                          style={{
                            padding: '1rem',
                            background: '#f0f9ff',
                            borderLeft: '4px solid #3b82f6',
                            marginBottom: '0.75rem'
                          }}
                        >
                          <h4 style={{ 
                            fontSize: '1rem', 
                            fontWeight: 'bold', 
                            color: '#1e40af',
                            margin: '0 0 0.25rem 0'
                          }}>
                            {norma.norma}
                          </h4>
                          <p style={{ fontSize: '0.9rem', color: '#374151', margin: 0 }}>
                            {norma.descripcion}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Conclusión */}
                    <div style={{
                      padding: '1.5rem',
                      background: '#f0fdf4',
                      borderRadius: '0.5rem',
                      border: '2px solid #22c55e',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold', 
                        color: '#166534',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <CheckCircle size={24} style={{ marginRight: '0.5rem' }} />
                        Conclusión del Consejo
                      </h3>
                      <p style={{ color: '#166534', lineHeight: '1.6', margin: 0 }}>
                        {formulario.analisisUnificado.conclusion}
                      </p>
                    </div>

                    {/* Recomendaciones */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                      💡 Recomendaciones
                    </h3>
                    
                    <ul style={{ 
                      listStyle: 'none', 
                      padding: 0,
                      marginBottom: '2rem'
                    }}>
                      {formulario.analisisUnificado.recomendaciones.map((rec, index) => (
                        <li 
                          key={index}
                          style={{
                            padding: '0.75rem 1rem',
                            background: '#fef3c7',
                            borderLeft: '4px solid #fbbf24',
                            marginBottom: '0.5rem'
                          }}
                        >
                          <span style={{ color: '#78350f' }}>
                            ✓ {rec}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Plazos Legales */}
                    <div style={{
                      padding: '1.5rem',
                      background: '#ede9fe',
                      borderRadius: '0.5rem',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold', 
                        color: '#6d28d9',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Clock size={24} style={{ marginRight: '0.5rem' }} />
                        Plazos Legales
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                          <p style={{ fontSize: '0.85rem', color: '#6d28d9', margin: '0 0 0.25rem 0' }}>
                            Plazo de respuesta:
                          </p>
                          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4c1d95', margin: 0 }}>
                            {formulario.analisisUnificado.plazosLegales.respuesta}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.85rem', color: '#6d28d9', margin: '0 0 0.25rem 0' }}>
                            Silencio administrativo:
                          </p>
                          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4c1d95', margin: 0 }}>
                            {formulario.analisisUnificado.plazosLegales.silencioAdministrativo}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.85rem', color: '#6d28d9', margin: '0 0 0.25rem 0' }}>
                            Acción de tutela:
                          </p>
                          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4c1d95', margin: 0 }}>
                            {formulario.analisisUnificado.plazosLegales.accionTutela}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Siguientes Pasos */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                      📋 Siguientes Pasos
                    </h3>
                    
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {formulario.analisisUnificado.siguientesPasos.map((paso, index) => (
                        <div 
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'start',
                            padding: '1rem',
                            background: index === 0 ? '#dbeafe' : '#f8fafc',
                            borderRadius: '0.5rem',
                            border: index === 0 ? '2px solid #3b82f6' : '1px solid #e2e8f0'
                          }}
                        >
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: index === 0 ? '#3b82f6' : '#9ca3af',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            marginRight: '1rem',
                            flexShrink: 0
                          }}>
                            {paso.paso}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ 
                              fontWeight: 'bold', 
                              color: '#374151',
                              margin: '0 0 0.25rem 0'
                            }}>
                              {paso.descripcion}
                            </p>
                            <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                              Plazo: {paso.plazo}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Paso 7: Revisión y Generación */}
            {pasoActual === 7 && (
              <div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  <CheckCircle style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Revisión Final
                </h2>

                {/* Resumen del PQRSFD */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                    📋 Resumen del PQRSFD
                  </h3>

                  <Card style={{ padding: '1.5rem', background: '#f8fafc', marginBottom: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Tipo:</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <IconoTipo size={20} style={{ color: tipoSeleccionado?.color, marginRight: '0.5rem' }} />
                          <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                            {tipoSeleccionado?.label}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Entidad:</p>
                        <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                          {formulario.entidad}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Plazo respuesta:</p>
                        <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                          {tipoSeleccionado?.plazo}
                        </p>
                      </div>
                      {!formulario.anonimo && (
                        <div>
                          <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Solicitante:</p>
                          <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                            {formulario.nombre}
                          </p>
                        </div>
                      )}
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Ubicación:</p>
                        <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                          {formulario.municipio}, {formulario.departamento}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Evidencias:</p>
                        <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                          {formulario.evidencias.length} archivo(s)
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Acciones */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '1.5rem',
                    marginTop: '2rem'
                  }}>
                    {/* Botón Generar PDF */}
                    <Card style={{ 
                      padding: '2rem', 
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                      border: '2px solid #3b82f6'
                    }}>
                      <Download style={{ 
                        fontSize: '3rem', 
                        color: '#1d4ed8', 
                        marginBottom: '1rem',
                        display: 'block',
                        margin: '0 auto 1rem'
                      }} size={48} />
                      <h3 style={{ 
                        fontSize: '1.3rem', 
                        fontWeight: 'bold', 
                        marginBottom: '1rem',
                        color: '#1e40af'
                      }}>
                        Generar PDF
                      </h3>
                      <p style={{ 
                        color: '#374151', 
                        marginBottom: '1.5rem',
                        lineHeight: '1.6'
                      }}>
                        Descargar PQRSFD en formato PDF profesional
                      </p>
                      <Button
                        onClick={() => {
                          generarCodigoPQRSFD();
                          generarPDFProfesional();
                        }}
                        style={{ 
                          background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          borderRadius: '0.5rem',
                          color: 'white',
                          cursor: 'pointer',
                          width: '100%'
                        }}
                      >
                        <Download style={{ marginRight: '0.5rem' }} />
                        Descargar PDF
                      </Button>
                    </Card>

                    {/* Botón Generar Dependencia */}
                    <Card style={{ 
                      padding: '2rem', 
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      border: '2px solid #22c55e'
                    }}>
                      <Target style={{ 
                        fontSize: '3rem', 
                        color: '#16a34a', 
                        marginBottom: '1rem',
                        display: 'block',
                        margin: '0 auto 1rem'
                      }} size={48} />
                      <h3 style={{ 
                        fontSize: '1.3rem', 
                        fontWeight: 'bold', 
                        marginBottom: '1rem',
                        color: '#15803d'
                      }}>
                        Generar Dependencia
                      </h3>
                      <p style={{ 
                        color: '#374151', 
                        marginBottom: '1.5rem',
                        lineHeight: '1.6'
                      }}>
                        Crear actividad en el sistema con todos los documentos
                      </p>
                      <Button
                        onClick={iniciarDependencia}
                        disabled={generandoDependencia || !formulario.analisisUnificado}
                        style={{ 
                          background: generandoDependencia ? '#9ca3af' : 'linear-gradient(45deg, #22c55e, #16a34a)',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          borderRadius: '0.5rem',
                          color: 'white',
                          cursor: generandoDependencia ? 'not-allowed' : 'pointer',
                          width: '100%',
                          opacity: !formulario.analisisUnificado ? 0.5 : 1
                        }}
                      >
                        {generandoDependencia ? (
                          <>
                            <Clock style={{ marginRight: '0.5rem' }} className="animate-spin" />
                            Generando...
                          </>
                        ) : (
                          <>
                            <Target style={{ marginRight: '0.5rem' }} />
                            Generar Dependencia
                          </>
                        )}
                      </Button>

                      {/* Mostrar actividad creada */}
                      {actividadCreada && (
                        <div style={{
                          marginTop: '1rem',
                          padding: '1rem',
                          background: '#f0fdf4',
                          borderRadius: '0.5rem',
                          border: '1px solid #86efac'
                        }}>
                          <p style={{ 
                            color: '#15803d',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            marginBottom: '0.5rem'
                          }}>
                            ✅ Dependencia Creada
                          </p>
                          <p style={{ fontSize: '0.85rem', color: '#166534', margin: '0.25rem 0' }}>
                            <strong>Código:</strong> {actividadCreada.codigo_caso || formulario.codigoPQRSFD}
                          </p>
                          <p style={{ fontSize: '0.85rem', color: '#166534', margin: '0.25rem 0' }}>
                            <strong>ID:</strong> {actividadCreada.id}
                          </p>
                        </div>
                      )}
                    </Card>
                  </div>
                </div>

                {/* Botón Finalizar - Volver al Inicio */}
                <div style={{
                  marginTop: '2rem',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderRadius: '1rem',
                  textAlign: 'center',
                  border: '2px solid #0ea5e9'
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#0c4a6e',
                    marginBottom: '1rem'
                  }}>
                    ¿Desea finalizar y volver al inicio?
                  </h3>
                  <p style={{ 
                    color: '#075985', 
                    marginBottom: '1.5rem',
                    fontSize: '1rem'
                  }}>
                    Su PQRSFD ha sido procesado exitosamente. Puede volver a la página principal.
                  </p>
                  <Button
                    onClick={() => navigate('/')}
                    style={{
                      background: 'linear-gradient(45deg, #0ea5e9, #0284c7)',
                      border: 'none',
                      padding: '1rem 2.5rem',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: '0.5rem',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                  >
                    <Home style={{ marginRight: '0.75rem' }} size={24} />
                    Finalizar y Volver al Inicio
                  </Button>
                </div>
              </div>
            )}

            {/* Navegación */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <Button
                type="button"
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
                  type="button"
                  onClick={siguientePaso}
                  style={{ 
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
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
    </div>
  );
};

export default PQRSFD;
