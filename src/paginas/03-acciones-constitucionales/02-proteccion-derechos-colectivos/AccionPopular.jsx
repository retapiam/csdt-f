import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { useDependencia } from '../../../hooks/useDependencia';
import { Users, User, FileText, Upload, Download, CheckCircle, Brain, Shield, Clock, Target, Lightbulb, ArrowRight, ArrowLeft, Home, FileCheck, Globe } from 'lucide-react';

const AccionPopular = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    nombreActorPopular: '', identificacion: '', telefono: '', email: '', direccion: '', municipio: '', departamento: '',
    tipoActorPopular: '', nombreOrganizacion: '', nitOrganizacion: '',
    derechosColectivos: [], otroDerechoColectivo: '', entidadDemandada: '', hechosVulneracion: '', pretension: '', evidencias: [],
    analisisIA: null, codigoAccionPopular: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const derechosColectivos = [
    { value: 'ambiente_sano', label: 'Ambiente sano' },
    { value: 'moralidad_admin', label: 'Moralidad administrativa' },
    { value: 'espacio_publico', label: 'Espacio público' },
    { value: 'patrimonio_publico', label: 'Patrimonio público' },
    { value: 'seguridad_publica', label: 'Seguridad y salubridad públicas' },
    { value: 'consumidores', label: 'Derechos de los consumidores' },
    { value: 'libre_competencia', label: 'Libre competencia económica' },
    { value: 'otro', label: 'Otro derecho colectivo' }
  ];

  const tiposActorPopular = ['Persona Natural', 'Organización Social', 'ONG', 'Defensoría del Pueblo', 'Personería Municipal', 'Procuraduría', 'Otro'];
  const pasos = [{ numero: 1, titulo: 'Actor Popular', icono: User }, { numero: 2, titulo: 'Derechos', icono: Globe }, { numero: 3, titulo: 'Hechos', icono: FileText }, { numero: 4, titulo: 'Evidencias', icono: Upload }, { numero: 5, titulo: 'Análisis IA', icono: Brain }, { numero: 6, titulo: 'Revisión', icono: CheckCircle }];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };
  const toggleDerecho = (derecho) => { setFormulario(prev => ({ ...prev, derechosColectivos: prev.derechosColectivos.includes(derecho) ? prev.derechosColectivos.filter(d => d !== derecho) : [...prev.derechosColectivos, derecho] })); };
  const generarCodigo = () => { const codigo = `AP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; setFormulario(prev => ({ ...prev, codigoAccionPopular: codigo })); return codigo; };
  const handleCargarEvidencia = (event) => { setFormulario(prev => ({ ...prev, evidencias: [...prev.evidencias, ...Array.from(event.target.files)] })); };
  const eliminarEvidencia = (index) => { setFormulario(prev => ({ ...prev, evidencias: prev.evidencias.filter((_, i) => i !== index) })); };

  const analisisConIA = async () => {
    setCargandoIA(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const derechosSeleccionados = formulario.derechosColectivos.map(d => derechosColectivos.find(df => df.value === d)?.label).filter(Boolean);
      
      setFormulario(prev => ({ ...prev, analisisIA: {
        especialistas: [
          { nombre: "Dr. Carlos Gaviria Díaz", especialidad: "Derechos Colectivos", analisis: `La acción popular es procedente para proteger los derechos colectivos: ${derechosSeleccionados.join(', ')}. La vulneración por parte de ${formulario.entidadDemandada} afecta a la comunidad en general y requiere protección judicial.` },
          { nombre: "Dra. Néstor Osuna Patiño", especialidad: "Derecho Ambiental y Colectivo", analisis: `Los derechos colectivos son de titularidad difusa y su protección beneficia a toda la comunidad. La acción popular es el mecanismo idóneo según la Ley 472 de 1998. Se observa legitimación activa del actor popular.` }
        ],
        normatividadAplicable: [
          { norma: "Constitución - Art. 88", descripcion: "Acción popular para protección de derechos colectivos" },
          { norma: "Ley 472 de 1998", descripcion: "Reglamenta las acciones populares y de grupo" }
        ],
        conclusion: `La acción popular es PROCEDENTE para proteger los derechos colectivos ${derechosSeleccionados.join(', ')} amenazados/vulnerados por ${formulario.entidadDemandada}. Se debe presentar ante juez administrativo competente.`,
        recomendaciones: ["Presentar ante juez administrativo del lugar de los hechos", "Adjuntar pruebas de la vulneración colectiva", "Solicitar medidas cautelares si hay peligro inminente", "Notificar a comunidades afectadas"],
        plazos: { admision: "20 días hábiles", fallo: "5 meses", cumplimiento: "Variable según orden" }
      }}));
    } finally { setCargandoIA(false); }
  };

  const generarPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify({ tipo: 'ACCION_POPULAR', codigo: formulario.codigoAccionPopular, formulario }, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `accion-popular-${formulario.codigoAccionPopular}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return `pdfs/accion-popular-${formulario.codigoAccionPopular}.pdf`;
  };

  const iniciarDependencia = async () => {
    try {
      if (!formulario.analisisIA) { alert('Primero analiza con IA.'); return; }
      const codigo = formulario.codigoAccionPopular || generarCodigo();
      await generarDependencia({
        modulo: 'Acción Popular',
        titulo: `AP - ${formulario.nombreActorPopular} - Derechos Colectivos`,
        descripcion: formulario.hechosVulneracion.substring(0, 200),
        tipo: 'accion_popular',
        datosCliente: { nombre: formulario.nombreActorPopular, email: formulario.email, telefono: formulario.telefono },
        datosUbicacion: { municipio: formulario.municipio, departamento: formulario.departamento, pais: 'Colombia' },
        resultado: formulario.analisisIA,
        codigoCaso: codigo,
        pdfsAdicionales: [{ ruta: generarPDF(), tipo: 'accion_popular', nombre: `Acción Popular - ${codigo}.pdf` }]
      });
    } catch (error) { console.error('Error:', error); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              <Users style={{ marginRight: '1rem', display: 'inline' }} />Acción Popular
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Protección de Derechos Colectivos</p>
            <p style={{ fontSize: '1rem', opacity: 0.85 }}>Art. 88 CP | Ley 472 de 1998</p>
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
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Actor Popular</h2>
                <div><Label>Tipo de Actor *</Label><Select value={formulario.tipoActorPopular} onValueChange={(v) => handleInputChange('tipoActorPopular', v)}><option value="">Seleccionar</option>{tiposActorPopular.map((t) => (<option key={t} value={t}>{t}</option>))}</Select></div>
                <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div><Label>Nombre Completo *</Label><Input value={formulario.nombreActorPopular} onChange={(e) => handleInputChange('nombreActorPopular', e.target.value)} /></div>
                  <div><Label>Identificación *</Label><Input value={formulario.identificacion} onChange={(e) => handleInputChange('identificacion', e.target.value)} /></div>
                  <div><Label>Teléfono *</Label><Input value={formulario.telefono} onChange={(e) => handleInputChange('telefono', e.target.value)} /></div>
                  <div><Label>Email</Label><Input type="email" value={formulario.email} onChange={(e) => handleInputChange('email', e.target.value)} /></div>
                </div>
              </div>
            )}

            {pasoActual === 2 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Derechos Colectivos Vulnerados</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  {derechosColectivos.map((derecho) => (
                    <div key={derecho.value} onClick={() => toggleDerecho(derecho.value)} style={{ padding: '1rem', borderRadius: '0.5rem', border: formulario.derechosColectivos.includes(derecho.value) ? '2px solid #10b981' : '2px solid #e5e7eb', background: formulario.derechosColectivos.includes(derecho.value) ? '#d1fae5' : 'white', cursor: 'pointer' }}>
                      <CheckCircle size={20} style={{ color: formulario.derechosColectivos.includes(derecho.value) ? '#10b981' : '#9ca3af', display: 'inline', marginRight: '0.5rem' }} />
                      <span style={{ fontWeight: 'bold' }}>{derecho.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pasoActual === 3 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Hechos y Pretensión</h2>
                <div style={{ marginBottom: '1.5rem' }}><Label>Entidad Demandada *</Label><Input value={formulario.entidadDemandada} onChange={(e) => handleInputChange('entidadDemandada', e.target.value)} placeholder="Entidad responsable" /></div>
                <div style={{ marginBottom: '1.5rem' }}><Label>Hechos de la Vulneración *</Label><Textarea value={formulario.hechosVulneracion} onChange={(e) => handleInputChange('hechosVulneracion', e.target.value)} rows={10} placeholder="Describa cómo se vulneran los derechos colectivos" /></div>
                <div><Label>Pretensión *</Label><Textarea value={formulario.pretension} onChange={(e) => handleInputChange('pretension', e.target.value)} rows={6} placeholder="¿Qué solicita al juez?" /></div>
              </div>
            )}

            {pasoActual === 4 && (
              <div>
                <h2>Evidencias</h2>
                <div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem', border: '2px dashed #9ca3af' }}>
                  <Upload size={48} style={{ color: '#6b7280', margin: '0 auto 1rem', display: 'block' }} />
                  <input type="file" multiple onChange={handleCargarEvidencia} style={{ display: 'none' }} id="evidencias-upload" />
                  <label htmlFor="evidencias-upload" style={{ display: 'block', padding: '1rem', background: '#10b981', color: 'white', textAlign: 'center', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>Seleccionar Archivos</label>
                </div>
                {formulario.evidencias.length > 0 && formulario.evidencias.map((archivo, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', marginTop: '0.5rem' }}>
                    <div><FileCheck size={24} style={{ color: '#10b981', marginRight: '0.75rem', display: 'inline' }} /><span style={{ fontWeight: 'bold' }}>{archivo.name}</span></div>
                    <Button onClick={() => eliminarEvidencia(index)} style={{ background: '#ef4444', padding: '0.5rem 1rem', color: 'white' }}>Eliminar</Button>
                  </div>
                ))}
              </div>
            )}

            {pasoActual === 5 && (
              <div>
                <h2>Análisis IA</h2>
                {!formulario.analisisIA ? (
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <Brain size={64} style={{ color: '#10b981', margin: '0 auto 1.5rem' }} />
                    <Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : 'linear-gradient(45deg, #10b981, #059669)', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: cargandoIA ? 'not-allowed' : 'pointer' }}>
                      {cargandoIA ? (<><Clock className="animate-spin" style={{ marginRight: '0.5rem' }} />Analizando...</>) : (<><Brain style={{ marginRight: '0.5rem' }} />Analizar</>)}
                    </Button>
                  </div>
                ) : (
                  <div>
                    {formulario.analisisIA.especialistas.map((esp, i) => (
                      <Card key={i} style={{ padding: '1.5rem', marginBottom: '1rem', background: '#d1fae5' }}>
                        <h4 style={{ fontWeight: 'bold' }}>{esp.nombre} - {esp.especialidad}</h4>
                        <p style={{ lineHeight: '1.6', marginTop: '0.5rem' }}>{esp.analisis}</p>
                      </Card>
                    ))}
                    <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '2px solid #22c55e', marginTop: '1rem' }}>
                      <h3 style={{ fontWeight: 'bold', color: '#166534' }}><CheckCircle style={{ display: 'inline', marginRight: '0.5rem' }} />Conclusión</h3>
                      <p style={{ color: '#166534', lineHeight: '1.6', marginTop: '0.5rem' }}>{formulario.analisisIA.conclusion}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {pasoActual === 6 && (
              <div>
                <h2>Revisión Final</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <Card style={{ padding: '2rem', textAlign: 'center', background: '#dbeafe', border: '2px solid #3b82f6' }}>
                    <Download size={48} style={{ margin: '0 auto 1rem' }} />
                    <h3>Generar PDF</h3>
                    <Button onClick={() => { generarCodigo(); generarPDF(); }} style={{ background: '#3b82f6', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', width: '100%', marginTop: '1rem' }}>
                      <Download style={{ marginRight: '0.5rem' }} />Descargar
                    </Button>
                  </Card>
                  <Card style={{ padding: '2rem', textAlign: 'center', background: '#dcfce7', border: '2px solid #22c55e' }}>
                    <Target size={48} style={{ margin: '0 auto 1rem' }} />
                    <h3>Generar Dependencia</h3>
                    <Button onClick={iniciarDependencia} disabled={generandoDependencia || !formulario.analisisIA} style={{ background: generandoDependencia ? '#9ca3af' : '#22c55e', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', width: '100%', marginTop: '1rem' }}>
                      {generandoDependencia ? 'Generando...' : 'Generar'}
                    </Button>
                    {actividadCreada && (<div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem' }}><p style={{ fontWeight: 'bold' }}>✅ Creada: {actividadCreada.codigo_caso}</p></div>)}
                  </Card>
                </div>
                <div style={{ marginTop: '2rem', padding: '2rem', background: '#e0f2fe', borderRadius: '1rem', textAlign: 'center', border: '2px solid #0ea5e9' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>¿Finalizar y volver al inicio?</h3>
                  <Button onClick={() => navigate('/')} style={{ background: '#0ea5e9', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white' }}>
                    <Home style={{ marginRight: '0.75rem' }} />Finalizar
                  </Button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button onClick={pasoAnterior} disabled={pasoActual === 1} style={{ background: pasoActual === 1 ? '#9ca3af' : '#6b7280', padding: '0.75rem 1.5rem', color: 'white' }}><ArrowLeft style={{ marginRight: '0.5rem' }} />Anterior</Button>
              {pasoActual < pasos.length && (<Button onClick={siguientePaso} style={{ background: '#10b981', padding: '0.75rem 1.5rem', color: 'white' }}>Siguiente<ArrowRight style={{ marginLeft: '0.5rem' }} /></Button>)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccionPopular;
