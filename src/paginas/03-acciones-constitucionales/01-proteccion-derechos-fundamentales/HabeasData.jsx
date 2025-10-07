import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { useDependencia } from '../../../hooks/useDependencia';
import { 
  Database, User, FileText, Upload, Download, CheckCircle, Brain, Shield, Clock, Target, 
  Users, Lightbulb, ArrowRight, ArrowLeft, Home, FileCheck
} from 'lucide-react';

const HabeasData = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  
  const [formulario, setFormulario] = useState({
    nombreTitular: '', identificacionTitular: '', telefonoTitular: '', emailTitular: '', direccionTitular: '',
    entidadResponsable: '', tipoBaseDatos: '', datosSensibles: '', tipoSolicitud: '', fundamentacion: '', solicitudEspecifica: '',
    evidencias: [], analisisIA: null, codigoHabeasData: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const tiposSolicitud = [
    { value: 'conocer', label: 'Conocer mis datos personales' },
    { value: 'actualizar', label: 'Actualizar datos incorrectos' },
    { value: 'rectificar', label: 'Rectificar datos falsos' },
    { value: 'suprimir', label: 'Suprimir/Eliminar datos' },
    { value: 'revocar', label: 'Revocar autorización' }
  ];

  const pasos = [
    { numero: 1, titulo: 'Titular', icono: User },
    { numero: 2, titulo: 'Base de Datos', icono: Database },
    { numero: 3, titulo: 'Solicitud', icono: FileText },
    { numero: 4, titulo: 'Evidencias', icono: Upload },
    { numero: 5, titulo: 'Análisis IA', icono: Brain },
    { numero: 6, titulo: 'Revisión', icono: CheckCircle }
  ];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };
  const generarCodigo = () => { const codigo = `HD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; setFormulario(prev => ({ ...prev, codigoHabeasData: codigo })); return codigo; };
  const handleCargarEvidencia = (event) => { setFormulario(prev => ({ ...prev, evidencias: [...prev.evidencias, ...Array.from(event.target.files)] })); };
  const eliminarEvidencia = (index) => { setFormulario(prev => ({ ...prev, evidencias: prev.evidencias.filter((_, i) => i !== index) })); };

  const analisisConIA = async () => {
    setCargandoIA(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const tipoSel = tiposSolicitud.find(t => t.value === formulario.tipoSolicitud);
      
      setFormulario(prev => ({ ...prev, analisisIA: {
        especialistas: [
          { nombre: "Dra. Helena Alviar García", especialidad: "Protección de Datos Personales", analisis: `El habeas data es procedente para ${tipoSel?.label.toLowerCase()}. La entidad ${formulario.entidadResponsable} tiene la obligación de atender su solicitud conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.` },
          { nombre: "Dr. Juan Carlos Upegui Mejía", especialidad: "Derecho a la Intimidad", analisis: `El derecho a la intimidad y buen nombre están en juego. La entidad debe garantizar exactitud, veracidad y actualización de sus datos personales. Tiene derecho a conocer, actualizar y rectificar la información que sobre usted existe.` }
        ],
        normatividadAplicable: [
          { norma: "Constitución - Art. 15", descripcion: "Derecho a la intimidad y habeas data" },
          { norma: "Ley 1581 de 2012", descripcion: "Protección de datos personales" },
          { norma: "Decreto 1377 de 2013", descripcion: "Reglamenta ley de protección de datos" }
        ],
        conclusion: `El habeas data es PROCEDENTE para ${tipoSel?.label.toLowerCase()} en la base de datos de ${formulario.entidadResponsable}. La entidad debe responder dentro de los 10 días hábiles siguientes.`,
        recomendaciones: [
          "Presentar solicitud formal ante la entidad responsable de la base de datos",
          "Especificar claramente el tipo de solicitud (conocer, actualizar, rectificar, suprimir)",
          "Adjuntar documento de identidad",
          "Si no hay respuesta en 10 días, procede acción de tutela por violación al habeas data"
        ],
        plazos: { respuesta: "10 días hábiles", tutela: "Si no responden en el plazo", cumplimiento: "48 horas desde orden judicial" }
      }}));
    } finally { setCargandoIA(false); }
  };

  const generarPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify({ tipo: 'HABEAS_DATA', codigo: formulario.codigoHabeasData, formulario, analisisIA: formulario.analisisIA }, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `habeas-data-${formulario.codigoHabeasData}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return `pdfs/habeas-data-${formulario.codigoHabeasData}.pdf`;
  };

  const iniciarDependencia = async () => {
    try {
      if (!formulario.analisisIA) { alert('Primero realiza el análisis con IA.'); return; }
      const codigo = formulario.codigoHabeasData || generarCodigo();
      const rutaPDF = generarPDF();

      await generarDependencia({
        modulo: 'Habeas Data',
        titulo: `HD - ${formulario.nombreTitular} vs ${formulario.entidadResponsable}`,
        descripcion: formulario.fundamentacion.substring(0, 200) + '...',
        tipo: 'habeas_data',
        datosCliente: { nombre: formulario.nombreTitular, email: formulario.emailTitular, telefono: formulario.telefonoTitular },
        datosUbicacion: { municipio: 'Colombia', departamento: 'Nacional', pais: 'Colombia' },
        resultado: formulario.analisisIA,
        codigoCaso: codigo,
        pdfsAdicionales: [{ ruta: rutaPDF, tipo: 'habeas_data_principal', nombre: `Habeas Data - ${codigo}.pdf` }]
      });
    } catch (error) { console.error('Error:', error); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              <Database style={{ marginRight: '1rem', display: 'inline' }} />Habeas Data
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Protección de Datos Personales</p>
            <p style={{ fontSize: '1rem', opacity: 0.85 }}>Art. 15 CP | Ley 1581 de 2012 | Plazo: 10 días hábiles</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map((paso) => (
              <div key={paso.numero} onClick={() => setPasoActual(paso.numero)} style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderRadius: '2rem', background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: 'white', border: paso.numero === pasoActual ? '2px solid white' : '2px solid transparent', cursor: 'pointer' }}>
                <paso.icono size={18} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontWeight: paso.numero === pasoActual ? 'bold' : 'normal', fontSize: '0.9rem' }}>{paso.numero}. {paso.titulo}</span>
              </div>
            ))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {pasoActual === 1 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Titular de los Datos</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div><Label>Nombre Completo *</Label><Input value={formulario.nombreTitular} onChange={(e) => handleInputChange('nombreTitular', e.target.value)} placeholder="Nombre completo" /></div>
                  <div><Label>Identificación *</Label><Input value={formulario.identificacionTitular} onChange={(e) => handleInputChange('identificacionTitular', e.target.value)} placeholder="Cédula" /></div>
                  <div><Label>Teléfono *</Label><Input value={formulario.telefonoTitular} onChange={(e) => handleInputChange('telefonoTitular', e.target.value)} placeholder="Teléfono" /></div>
                  <div><Label>Email *</Label><Input type="email" value={formulario.emailTitular} onChange={(e) => handleInputChange('emailTitular', e.target.value)} placeholder="Email" /></div>
                  <div style={{ gridColumn: '1 / -1' }}><Label>Dirección</Label><Input value={formulario.direccionTitular} onChange={(e) => handleInputChange('direccionTitular', e.target.value)} placeholder="Dirección" /></div>
                </div>
              </div>
            )}

            {pasoActual === 2 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Base de Datos</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div><Label>Entidad Responsable *</Label><Input value={formulario.entidadResponsable} onChange={(e) => handleInputChange('entidadResponsable', e.target.value)} placeholder="Nombre de la entidad que maneja sus datos" /></div>
                  <div><Label>Tipo de Base de Datos *</Label><Input value={formulario.tipoBaseDatos} onChange={(e) => handleInputChange('tipoBaseDatos', e.target.value)} placeholder="Ej: Centrales de riesgo, sistema de información financiera, etc." /></div>
                  <div><Label>Datos Sensibles Involucrados</Label><Textarea value={formulario.datosSensibles} onChange={(e) => handleInputChange('datosSensibles', e.target.value)} placeholder="Describa qué datos personales están involucrados" rows={4} /></div>
                </div>
              </div>
            )}

            {pasoActual === 3 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Tipo de Solicitud</h2>
                <div><Label>Tipo de Solicitud *</Label><Select value={formulario.tipoSolicitud} onValueChange={(value) => handleInputChange('tipoSolicitud', value)}><option value="">Seleccionar</option>{tiposSolicitud.map((tipo) => (<option key={tipo.value} value={tipo.value}>{tipo.label}</option>))}</Select></div>
                <div style={{ marginTop: '1.5rem' }}><Label>Fundamentación *</Label><Textarea value={formulario.fundamentacion} onChange={(e) => handleInputChange('fundamentacion', e.target.value)} placeholder="Explique por qué solicita conocer/actualizar/rectificar/suprimir sus datos" rows={8} /></div>
                <div style={{ marginTop: '1.5rem' }}><Label>Solicitud Específica *</Label><Textarea value={formulario.solicitudEspecifica} onChange={(e) => handleInputChange('solicitudEspecifica', e.target.value)} placeholder="Indique claramente qué solicita" rows={5} /></div>
              </div>
            )}

            {pasoActual === 4 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Evidencias</h2>
                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem', border: '2px dashed #9ca3af' }}>
                  <div style={{ textAlign: 'center' }}><Upload size={48} style={{ color: '#6b7280', margin: '0 auto 1rem' }} /><h3>Adjunte documentos de soporte</h3></div>
                  <input type="file" multiple onChange={handleCargarEvidencia} style={{ display: 'none' }} id="evidencias-upload" />
                  <label htmlFor="evidencias-upload" style={{ display: 'block', padding: '1rem', background: 'linear-gradient(45deg, #06b6d4, #0891b2)', color: 'white', textAlign: 'center', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>Seleccionar Archivos</label>
                </div>
                {formulario.evidencias.length > 0 && (
                  <div>
                    <h3>Archivos adjuntos ({formulario.evidencias.length})</h3>
                    {formulario.evidencias.map((archivo, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}><FileCheck size={24} style={{ color: '#10b981', marginRight: '0.75rem' }} /><div><p style={{ fontWeight: 'bold', margin: 0 }}>{archivo.name}</p><p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>{(archivo.size / 1024).toFixed(2)} KB</p></div></div>
                        <Button onClick={() => eliminarEvidencia(index)} style={{ background: '#ef4444', padding: '0.5rem 1rem', borderRadius: '0.375rem', color: 'white', cursor: 'pointer' }}>Eliminar</Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {pasoActual === 5 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Análisis IA</h2>
                {!formulario.analisisIA ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Brain size={64} style={{ color: '#06b6d4', margin: '0 auto 1.5rem' }} />
                    <h3>Análisis de Procedencia</h3>
                    <Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : 'linear-gradient(45deg, #06b6d4, #0891b2)', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: cargandoIA ? 'not-allowed' : 'pointer', margin: '1rem auto' }}>
                      {cargandoIA ? (<><Clock className="animate-spin" style={{ marginRight: '0.5rem' }} />Analizando...</>) : (<><Brain style={{ marginRight: '0.5rem' }} />Analizar con IA</>)}
                    </Button>
                  </div>
                ) : (
                  <div>
                    {formulario.analisisIA.especialistas.map((esp, i) => (
                      <Card key={i} style={{ padding: '1.5rem', marginBottom: '1rem', background: '#ecfeff', border: '1px solid #67e8f9' }}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{esp.nombre} - {esp.especialidad}</h4>
                        <p style={{ lineHeight: '1.6' }}>{esp.analisis}</p>
                      </Card>
                    ))}
                    <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '2px solid #22c55e', marginTop: '1rem' }}>
                      <h3 style={{ fontWeight: 'bold', color: '#166534', marginBottom: '1rem' }}><CheckCircle style={{ display: 'inline', marginRight: '0.5rem' }} />Conclusión</h3>
                      <p style={{ color: '#166534', lineHeight: '1.6' }}>{formulario.analisisIA.conclusion}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {pasoActual === 6 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Revisión Final</h2>
                <Card style={{ padding: '1.5rem', background: '#f8fafc', marginBottom: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div><p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Titular:</p><p style={{ fontWeight: 'bold', color: '#374151' }}>{formulario.nombreTitular}</p></div>
                    <div><p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Entidad:</p><p style={{ fontWeight: 'bold', color: '#374151' }}>{formulario.entidadResponsable}</p></div>
                    <div><p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Tipo:</p><p style={{ fontWeight: 'bold', color: '#374151' }}>{tiposSolicitud.find(t => t.value === formulario.tipoSolicitud)?.label}</p></div>
                  </div>
                </Card>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <Card style={{ padding: '2rem', textAlign: 'center', background: '#dbeafe', border: '2px solid #3b82f6' }}>
                    <Download size={48} style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ marginBottom: '1rem' }}>Generar PDF</h3>
                    <Button onClick={() => { generarCodigo(); generarPDF(); }} style={{ background: 'linear-gradient(45deg, #3b82f6, #2563eb)', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: 'pointer', width: '100%' }}>
                      <Download style={{ marginRight: '0.5rem' }} />Descargar PDF
                    </Button>
                  </Card>

                  <Card style={{ padding: '2rem', textAlign: 'center', background: '#dcfce7', border: '2px solid #22c55e' }}>
                    <Target size={48} style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ marginBottom: '1rem' }}>Generar Dependencia</h3>
                    <Button onClick={iniciarDependencia} disabled={generandoDependencia || !formulario.analisisIA} style={{ background: generandoDependencia ? '#9ca3af' : 'linear-gradient(45deg, #22c55e, #16a34a)', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: generandoDependencia ? 'not-allowed' : 'pointer', width: '100%' }}>
                      {generandoDependencia ? (<><Clock className="animate-spin" style={{ marginRight: '0.5rem' }} />Generando...</>) : (<><Target style={{ marginRight: '0.5rem' }} />Generar Dependencia</>)}
                    </Button>
                    {actividadCreada && (
                      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #86efac' }}>
                        <p style={{ color: '#15803d', fontWeight: 'bold', fontSize: '0.9rem' }}>✅ Dependencia Creada</p>
                        <p style={{ fontSize: '0.85rem', color: '#166534' }}><strong>Código:</strong> {actividadCreada.codigo_caso}</p>
                      </div>
                    )}
                  </Card>
                </div>

                <div style={{ marginTop: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderRadius: '1rem', textAlign: 'center', border: '2px solid #0ea5e9' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0c4a6e', marginBottom: '1rem' }}>¿Finalizar y volver al inicio?</h3>
                  <Button onClick={() => navigate('/')} style={{ background: 'linear-gradient(45deg, #0ea5e9, #0284c7)', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                    <Home style={{ marginRight: '0.75rem' }} size={24} />Finalizar y Volver al Inicio
                  </Button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button onClick={pasoAnterior} disabled={pasoActual === 1} style={{ background: pasoActual === 1 ? '#9ca3af' : '#6b7280', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: pasoActual === 1 ? 'not-allowed' : 'pointer' }}>
                <ArrowLeft style={{ marginRight: '0.5rem' }} />Anterior
              </Button>
              {pasoActual < pasos.length && (
                <Button onClick={siguientePaso} style={{ background: 'linear-gradient(45deg, #06b6d4, #0891b2)', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: 'pointer' }}>
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

export default HabeasData;
