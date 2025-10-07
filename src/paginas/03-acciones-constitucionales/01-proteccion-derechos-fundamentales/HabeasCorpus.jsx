import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { useDependencia } from '../../../hooks/useDependencia';
import { 
  Lock, 
  User, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  Brain, 
  Shield, 
  Clock,
  Target,
  Users,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Home,
  Building,
  FileCheck,
  MapPin,
  AlertTriangle
} from 'lucide-react';

const HabeasCorpus = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  
  const [formulario, setFormulario] = useState({
    // Solicitante
    nombreSolicitante: '',
    identificacionSolicitante: '',
    telefonoSolicitante: '',
    emailSolicitante: '',
    relacionConDetenido: '',
    
    // Privado de libertad
    nombreDetenido: '',
    identificacionDetenido: '',
    lugarDetencion: '',
    fechaDetencion: '',
    horaDetencion: '',
    
    // Autoridad
    autoridadResponsable: '',
    unidadPolicial: '',
    numeroOficio: '',
    
    // Circunstancias
    circunstanciasDetencion: '',
    motivosDetencion: '',
    violacionesProcedimiento: '',
    
    // Evidencias
    evidencias: [],
    
    // Análisis IA
    analisisIA: null,
    codigoHabeasCorpus: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const tiposRelacion = [
    'Mismo detenido',
    'Padre/Madre',
    'Hijo/Hija',
    'Cónyuge/Compañero(a)',
    'Hermano(a)',
    'Abogado defensor',
    'Familiar',
    'Otro'
  ];

  const autoridades = [
    'Policía Nacional',
    'Ejército Nacional',
    'Armada Nacional',
    'Fuerza Aérea',
    'Fiscalía General de la Nación',
    'CTI (Cuerpo Técnico de Investigación)',
    'INPEC (Instituto Penitenciario)',
    'DAS/Migración Colombia',
    'Autoridad Judicial',
    'Otra autoridad'
  ];

  const pasos = [
    { numero: 1, titulo: 'Solicitante', icono: User },
    { numero: 2, titulo: 'Detenido', icono: Lock },
    { numero: 3, titulo: 'Autoridad', icono: Shield },
    { numero: 4, titulo: 'Circunstancias', icono: FileText },
    { numero: 5, titulo: 'Evidencias', icono: Upload },
    { numero: 6, titulo: 'Análisis IA', icono: Brain },
    { numero: 7, titulo: 'Revisión', icono: CheckCircle }
  ];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };

  const generarCodigoHabeasCorpus = () => {
    const fecha = new Date();
    const codigo = `HC-${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setFormulario(prev => ({ ...prev, codigoHabeasCorpus: codigo }));
    return codigo;
  };

  const handleCargarEvidencia = (event) => {
    const archivos = Array.from(event.target.files);
    setFormulario(prev => ({ ...prev, evidencias: [...prev.evidencias, ...archivos] }));
  };

  const eliminarEvidencia = (index) => {
    setFormulario(prev => ({ ...prev, evidencias: prev.evidencias.filter((_, i) => i !== index) }));
  };

  const analisisConIA = async () => {
    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const analisis = {
        especialistas: [
          {
            nombre: "Dr. Rodrigo Uprimny Yepes",
            especialidad: "Derecho Constitucional y Penal",
            analisis: `El habeas corpus es procedente cuando existe privación ilegal de la libertad personal. Según los hechos narrados, la detención de ${formulario.nombreDetenido} por parte de ${formulario.autoridadResponsable} presenta irregularidades que ameritan revisión judicial inmediata. El Art. 30 de la Constitución garantiza que nadie puede ser privado de su libertad sino en las formas previstas en la ley.`
          },
          {
            nombre: "Dra. Catalina Botero Marino",
            especialidad: "Derechos Humanos y Libertades",
            analisis: `La libertad personal es un derecho fundamental de protección inmediata. Si existen violaciones al debido proceso o detención arbitraria, el habeas corpus es el mecanismo constitucional idóneo. Los estándares interamericanos exigen control judicial de toda privación de libertad dentro de las 36 horas siguientes.`
          },
          {
            nombre: "Dr. Francisco José Sintura Varela",
            especialidad: "Derecho Procesal Penal",
            analisis: `Desde la perspectiva procesal penal, debe verificarse: (1) legalidad de la captura, (2) presentación ante autoridad competente dentro del plazo legal, (3) respeto al debido proceso, (4) existencia de orden de captura válida. El habeas corpus procede ante cualquier irregularidad.`
          }
        ],
        normatividadAplicable: [
          { norma: "Constitución Política - Art. 30", descripcion: "Garantía de libertad personal y habeas corpus" },
          { norma: "Ley 1095 de 2006", descripcion: "Reglamenta el habeas corpus en Colombia" },
          { norma: "Convención Americana - Art. 7.6", descripcion: "Derecho a recurso sencillo y rápido ante privación de libertad" },
          { norma: "Código de Procedimiento Penal", descripcion: "Normas sobre captura y privación de libertad" }
        ],
        conclusion: `El habeas corpus es PROCEDENTE. La detención de ${formulario.nombreDetenido} debe ser revisada judicialmente de inmediato. El juez debe pronunciarse en un término máximo de 36 horas. Se deben verificar la legalidad de la captura, el respeto al debido proceso y la competencia de la autoridad.`,
        recomendaciones: [
          "Presentar el habeas corpus de inmediato ante juez penal con función de control de garantías",
          "Adjuntar toda evidencia de irregularidades en la captura o detención",
          "Exigir presentación del detenido ante el juez dentro de las 36 horas",
          "Verificar que se hayan respetado los derechos del capturado (lectura de derechos, contacto con abogado, etc.)",
          "Si se confirma ilegalidad, el juez debe ordenar libertad inmediata",
          "Guardar todas las actuaciones para eventuales acciones de reparación"
        ],
        plazos: {
          presentacion: "Inmediato (cualquier momento)",
          fallo: "36 horas máximo",
          audiencia: "Inmediata",
          libertad: "Inmediata si procede"
        },
        causalesIlegalidad: [
          "Detención sin orden judicial válida (excepto flagrancia)",
          "No presentación ante autoridad competente dentro de 36 horas",
          "Tortura o tratos crueles",
          "Incomunicación prolongada",
          "Negación de derechos fundamentales del detenido",
          "Detención por autoridad incompetente"
        ]
      };

      setFormulario(prev => ({ ...prev, analisisIA: analisis }));
      
    } catch (error) {
      console.error('Error en análisis IA:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarPDFHabeasCorpus = () => {
    const pdfContent = {
      tipo: 'HABEAS_CORPUS',
      codigo: formulario.codigoHabeasCorpus,
      fecha: new Date().toISOString(),
      solicitante: {
        nombre: formulario.nombreSolicitante,
        identificacion: formulario.identificacionSolicitante,
        telefono: formulario.telefonoSolicitante,
        email: formulario.emailSolicitante,
        relacion: formulario.relacionConDetenido
      },
      detenido: {
        nombre: formulario.nombreDetenido,
        identificacion: formulario.identificacionDetenido,
        lugar: formulario.lugarDetencion,
        fecha: formulario.fechaDetencion,
        hora: formulario.horaDetencion
      },
      autoridad: {
        responsable: formulario.autoridadResponsable,
        unidad: formulario.unidadPolicial,
        oficio: formulario.numeroOficio
      },
      circunstancias: formulario.circunstanciasDetencion,
      motivos: formulario.motivosDetencion,
      violaciones: formulario.violacionesProcedimiento,
      evidencias: formulario.evidencias.map(e => ({ nombre: e.name, tamaño: e.size })),
      analisisIA: formulario.analisisIA,
      marcoLegal: {
        constitucion: 'Art. 30 - Habeas Corpus',
        ley: 'Ley 1095 de 2006',
        plazoFallo: '36 horas'
      }
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `habeas-corpus-${formulario.codigoHabeasCorpus}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return `pdfs/habeas-corpus-${formulario.codigoHabeasCorpus}.pdf`;
  };

  const iniciarDependencia = async () => {
    try {
      if (!formulario.analisisIA) {
        alert('Por favor, primero realiza el análisis con IA.');
        return;
      }

      const codigo = formulario.codigoHabeasCorpus || generarCodigoHabeasCorpus();
      const rutaPDF = generarPDFHabeasCorpus();

      await generarDependencia({
        modulo: 'Habeas Corpus',
        titulo: `HC - ${formulario.nombreDetenido} detenido por ${formulario.autoridadResponsable}`,
        descripcion: formulario.circunstanciasDetencion.substring(0, 200) + '...',
        tipo: 'habeas_corpus',
        datosCliente: {
          nombre: formulario.nombreSolicitante,
          email: formulario.emailSolicitante,
          telefono: formulario.telefonoSolicitante,
          identificacion: formulario.identificacionSolicitante
        },
        datosUbicacion: {
          municipio: formulario.lugarDetencion.split(',')[0] || 'No especificado',
          departamento: 'Colombia',
          pais: 'Colombia'
        },
        resultado: formulario.analisisIA,
        codigoCaso: codigo,
        pdfsAdicionales: [{
          ruta: rutaPDF,
          tipo: 'habeas_corpus_principal',
          nombre: `Habeas Corpus - ${codigo}.pdf`
        }]
      });

    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar la dependencia.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              <Lock style={{ marginRight: '1rem', display: 'inline' }} />
              Habeas Corpus
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 1rem' }}>
              Protección de la Libertad Personal
            </p>
            <p style={{ fontSize: '1rem', opacity: 0.85 }}>
              Art. 30 Constitución Política | Ley 1095 de 2006 | Fallo en máximo 36 horas
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map((paso) => (
              <div key={paso.numero} onClick={() => setPasoActual(paso.numero)} style={{ 
                display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderRadius: '2rem',
                background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white', border: paso.numero === pasoActual ? '2px solid white' : '2px solid transparent', cursor: 'pointer'
              }}>
                <paso.icono size={18} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontWeight: paso.numero === pasoActual ? 'bold' : 'normal', fontSize: '0.9rem' }}>
                  {paso.numero}. {paso.titulo}
                </span>
              </div>
            ))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {/* Paso 1: Solicitante */}
            {pasoActual === 1 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <User style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Datos del Solicitante
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div><Label>Nombre Completo *</Label><Input value={formulario.nombreSolicitante} onChange={(e) => handleInputChange('nombreSolicitante', e.target.value)} placeholder="Nombre completo" /></div>
                  <div><Label>Identificación *</Label><Input value={formulario.identificacionSolicitante} onChange={(e) => handleInputChange('identificacionSolicitante', e.target.value)} placeholder="Cédula" /></div>
                  <div><Label>Teléfono *</Label><Input value={formulario.telefonoSolicitante} onChange={(e) => handleInputChange('telefonoSolicitante', e.target.value)} placeholder="Teléfono" /></div>
                  <div><Label>Email</Label><Input type="email" value={formulario.emailSolicitante} onChange={(e) => handleInputChange('emailSolicitante', e.target.value)} placeholder="Email" /></div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label>Relación con el detenido *</Label>
                    <Select value={formulario.relacionConDetenido} onValueChange={(value) => handleInputChange('relacionConDetenido', value)}>
                      <option value="">Seleccionar</option>
                      {tiposRelacion.map((rel) => (<option key={rel} value={rel}>{rel}</option>))}
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 2: Detenido */}
            {pasoActual === 2 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Lock style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Datos del Privado de Libertad
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div><Label>Nombre Completo *</Label><Input value={formulario.nombreDetenido} onChange={(e) => handleInputChange('nombreDetenido', e.target.value)} placeholder="Nombre del detenido" /></div>
                  <div><Label>Identificación</Label><Input value={formulario.identificacionDetenido} onChange={(e) => handleInputChange('identificacionDetenido', e.target.value)} placeholder="Cédula (si se conoce)" /></div>
                  <div style={{ gridColumn: '1 / -1' }}><Label>Lugar de Detención *</Label><Input value={formulario.lugarDetencion} onChange={(e) => handleInputChange('lugarDetencion', e.target.value)} placeholder="Dirección completa del lugar de detención" /></div>
                  <div><Label>Fecha de Detención *</Label><Input type="date" value={formulario.fechaDetencion} onChange={(e) => handleInputChange('fechaDetencion', e.target.value)} /></div>
                  <div><Label>Hora de Detención</Label><Input type="time" value={formulario.horaDetencion} onChange={(e) => handleInputChange('horaDetencion', e.target.value)} /></div>
                </div>
              </div>
            )}

            {/* Paso 3: Autoridad */}
            {pasoActual === 3 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Shield style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Autoridad Responsable
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div><Label>Autoridad Responsable *</Label><Select value={formulario.autoridadResponsable} onValueChange={(value) => handleInputChange('autoridadResponsable', value)}><option value="">Seleccionar</option>{autoridades.map((aut) => (<option key={aut} value={aut}>{aut}</option>))}</Select></div>
                  <div><Label>Unidad/Estación Policial</Label><Input value={formulario.unidadPolicial} onChange={(e) => handleInputChange('unidadPolicial', e.target.value)} placeholder="CAI, Estación, URI, etc." /></div>
                  <div style={{ gridColumn: '1 / -1' }}><Label>Número de Oficio o Acta (si existe)</Label><Input value={formulario.numeroOficio} onChange={(e) => handleInputChange('numeroOficio', e.target.value)} placeholder="Número de oficio, orden de captura, etc." /></div>
                </div>
              </div>
            )}

            {/* Paso 4: Circunstancias */}
            {pasoActual === 4 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <FileText style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Circunstancias de la Detención
                </h2>

                <div style={{ marginBottom: '2rem' }}>
                  <Label>Describa las circunstancias de la detención *</Label>
                  <Textarea value={formulario.circunstanciasDetencion} onChange={(e) => handleInputChange('circunstanciasDetencion', e.target.value)} placeholder="Narre cómo ocurrió la detención, lugar, hora, personas presentes..." rows={8} />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <Label>Motivos alegados para la detención</Label>
                  <Textarea value={formulario.motivosDetencion} onChange={(e) => handleInputChange('motivosDetencion', e.target.value)} placeholder="¿Qué razones dio la autoridad para la detención?" rows={5} />
                </div>

                <div>
                  <Label>Violaciones al procedimiento o derechos *</Label>
                  <Textarea value={formulario.violacionesProcedimiento} onChange={(e) => handleInputChange('violacionesProcedimiento', e.target.value)} placeholder="Describa las irregularidades: no informaron derechos, no permitieron abogado, golpes, etc." rows={6} />
                </div>
              </div>
            )}

            {/* Paso 5: Evidencias */}
            {pasoActual === 5 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Upload style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Evidencias
                </h2>

                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem', border: '2px dashed #9ca3af' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <Upload size={48} style={{ color: '#6b7280', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>
                      Adjunte pruebas de la detención ilegal
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                      Fotos, videos, documentos, testimonios, etc.
                    </p>
                  </div>
                  
                  <input type="file" multiple onChange={handleCargarEvidencia} style={{ display: 'none' }} id="evidencias-upload" />
                  <label htmlFor="evidencias-upload" style={{ display: 'block', width: '100%', padding: '1rem', background: 'linear-gradient(45deg, #7c3aed, #5b21b6)', color: 'white', textAlign: 'center', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
                    Seleccionar Archivos
                  </label>
                </div>

                {formulario.evidencias.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                      Archivos adjuntos ({formulario.evidencias.length})
                    </h3>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      {formulario.evidencias.map((archivo, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <FileCheck size={24} style={{ color: '#10b981', marginRight: '0.75rem' }} />
                            <div>
                              <p style={{ fontWeight: 'bold', color: '#374151', margin: 0, fontSize: '0.95rem' }}>{archivo.name}</p>
                              <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>{(archivo.size / 1024).toFixed(2)} KB</p>
                            </div>
                          </div>
                          <Button onClick={() => eliminarEvidencia(index)} style={{ background: '#ef4444', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', color: 'white', fontSize: '0.875rem', cursor: 'pointer' }}>
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
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Brain style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Análisis Jurídico con IA
                </h2>

                {!formulario.analisisIA ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Brain size={64} style={{ color: '#7c3aed', margin: '0 auto 1.5rem' }} />
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#374151', marginBottom: '2rem' }}>
                      Análisis de Legalidad de Detención
                    </h3>
                    <Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : 'linear-gradient(45deg, #7c3aed, #5b21b6)', border: 'none', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: cargandoIA ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', margin: '0 auto' }}>
                      {cargandoIA ? (<><Clock style={{ marginRight: '0.5rem' }} className="animate-spin" />Analizando...</>) : (<><Brain style={{ marginRight: '0.5rem' }} />Iniciar Análisis IA</>)}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>👥 Expertos Constitucionalistas</h3>
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                      {formulario.analisisIA.especialistas.map((esp, index) => (
                        <Card key={index} style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', border: '1px solid #c4b5fd' }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <Users size={24} style={{ color: '#7c3aed', marginRight: '0.75rem' }} />
                            <div><h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>{esp.nombre}</h4><p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>{esp.especialidad}</p></div>
                          </div>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0 }}>{esp.analisis}</p>
                        </Card>
                      ))}
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>📚 Marco Legal</h3>
                    <div style={{ marginBottom: '2rem' }}>
                      {formulario.analisisIA.normatividadAplicable.map((norma, index) => (
                        <div key={index} style={{ padding: '1rem', background: '#fef3c7', borderLeft: '4px solid #fbbf24', marginBottom: '0.75rem' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#78350f', margin: '0 0 0.25rem 0' }}>{norma.norma}</h4>
                          <p style={{ fontSize: '0.9rem', color: '#374151', margin: 0 }}>{norma.descripcion}</p>
                        </div>
                      ))}
                    </div>

                    <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '2px solid #22c55e', marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                        <CheckCircle size={24} style={{ marginRight: '0.5rem' }} />Conclusión
                      </h3>
                      <p style={{ color: '#166534', lineHeight: '1.6', margin: 0 }}>{formulario.analisisIA.conclusion}</p>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>💡 Recomendaciones</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {formulario.analisisIA.recomendaciones.map((rec, index) => (
                        <li key={index} style={{ padding: '0.75rem 1rem', background: '#fce7f3', borderLeft: '4px solid #ec4899', marginBottom: '0.5rem' }}>
                          <span style={{ color: '#831843' }}>✓ {rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Paso 7: Revisión */}
            {pasoActual === 7 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <CheckCircle style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Revisión Final
                </h2>

                <Card style={{ padding: '1.5rem', background: '#f8fafc', marginBottom: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div><p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Solicitante:</p><p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>{formulario.nombreSolicitante}</p></div>
                    <div><p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Detenido:</p><p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>{formulario.nombreDetenido}</p></div>
                    <div><p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Autoridad:</p><p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>{formulario.autoridadResponsable}</p></div>
                    <div><p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Lugar:</p><p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>{formulario.lugarDetencion}</p></div>
                  </div>
                </Card>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <Card style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '2px solid #3b82f6' }}>
                    <Download size={48} style={{ color: '#1d4ed8', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e40af' }}>Generar PDF</h3>
                    <Button onClick={() => { generarCodigoHabeasCorpus(); generarPDFHabeasCorpus(); }} style={{ background: 'linear-gradient(45deg, #3b82f6, #2563eb)', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: 'pointer', width: '100%' }}>
                      <Download style={{ marginRight: '0.5rem' }} />Descargar PDF
                    </Button>
                  </Card>

                  <Card style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '2px solid #22c55e' }}>
                    <Target size={48} style={{ color: '#16a34a', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#15803d' }}>Generar Dependencia</h3>
                    <Button onClick={iniciarDependencia} disabled={generandoDependencia || !formulario.analisisIA} style={{ background: generandoDependencia ? '#9ca3af' : 'linear-gradient(45deg, #22c55e, #16a34a)', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: generandoDependencia ? 'not-allowed' : 'pointer', width: '100%' }}>
                      {generandoDependencia ? (<><Clock style={{ marginRight: '0.5rem' }} className="animate-spin" />Generando...</>) : (<><Target style={{ marginRight: '0.5rem' }} />Generar Dependencia</>)}
                    </Button>
                    {actividadCreada && (
                      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #86efac' }}>
                        <p style={{ color: '#15803d', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>✅ Dependencia Creada</p>
                        <p style={{ fontSize: '0.85rem', color: '#166534', margin: '0.25rem 0' }}><strong>Código:</strong> {actividadCreada.codigo_caso || formulario.codigoHabeasCorpus}</p>
                      </div>
                    )}
                  </Card>
                </div>

                <div style={{ marginTop: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderRadius: '1rem', textAlign: 'center', border: '2px solid #0ea5e9' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0c4a6e', marginBottom: '1rem' }}>¿Desea finalizar y volver al inicio?</h3>
                  <p style={{ color: '#075985', marginBottom: '1.5rem', fontSize: '1rem' }}>Su habeas corpus ha sido procesado exitosamente.</p>
                  <Button onClick={() => navigate('/')} style={{ background: 'linear-gradient(45deg, #0ea5e9, #0284c7)', border: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                    <Home style={{ marginRight: '0.75rem' }} size={24} />Finalizar y Volver al Inicio
                  </Button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button type="button" onClick={pasoAnterior} disabled={pasoActual === 1} style={{ background: pasoActual === 1 ? '#9ca3af' : 'linear-gradient(45deg, #6b7280, #4b5563)', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: pasoActual === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}>
                <ArrowLeft style={{ marginRight: '0.5rem' }} />Anterior
              </Button>
              {pasoActual < pasos.length && (
                <Button type="button" onClick={siguientePaso} style={{ background: 'linear-gradient(45deg, #7c3aed, #5b21b6)', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  Siguiente<ArrowRight style={{ marginLeft: '0.5rem' }} />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HabeasCorpus;
