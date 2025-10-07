import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { useDependencia } from '../../../hooks/useDependencia';
import { Vote, User, FileText, Upload, Download, CheckCircle, Brain, Clock, Target, ArrowRight, ArrowLeft, Home, Users, FileCheck } from 'lucide-react';

const Referendo = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    nombrePromotor: '', identificacion: '', telefono: '', email: '', organizacion: '', nivelReferendo: '', tipoReferendo: '', normaObjeto: '', preguntaReferendo: '', justificacion: '', firmasRequeridas: '', evidencias: [], analisisIA: null, codigoReferendo: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const nivelesReferendo = ['Nacional', 'Departamental', 'Municipal', 'Local'];
  const tiposReferendo = ['Aprobatorio (crear norma)', 'Derogatorio (eliminar norma)', 'Constitucional (reforma constitución)'];
  const pasos = [{ numero: 1, titulo: 'Promotor', icono: User }, { numero: 2, titulo: 'Tipo', icono: Vote }, { numero: 3, titulo: 'Pregunta', icono: FileText }, { numero: 4, titulo: 'Evidencias', icono: Upload }, { numero: 5, titulo: 'Análisis IA', icono: Brain }, { numero: 6, titulo: 'Revisión', icono: CheckCircle }];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };
  const generarCodigo = () => { const codigo = `REF-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; setFormulario(prev => ({ ...prev, codigoReferendo: codigo })); return codigo; };
  const handleCargarEvidencia = (event) => { setFormulario(prev => ({ ...prev, evidencias: [...prev.evidencias, ...Array.from(event.target.files)] })); };
  const eliminarEvidencia = (index) => { setFormulario(prev => ({ ...prev, evidencias: prev.evidencias.filter((_, i) => i !== index) })); };

  const analisisConIA = async () => {
    setCargandoIA(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setFormulario(prev => ({ ...prev, analisisIA: {
        especialistas: [{ nombre: "Dr. Humberto de la Calle", especialidad: "Derecho Constitucional", analisis: `El referendo ${formulario.tipoReferendo} a nivel ${formulario.nivelReferendo} es viable jurídicamente. La pregunta debe ser clara, precisa y de respuesta sí/no. Se requieren ${formulario.firmasRequeridas} firmas válidas del censo electoral.` }],
        conclusion: `El referendo es VIABLE. Se debe cumplir con los requisitos de la Ley 134 de 1994 y obtener las firmas requeridas.`,
        recomendaciones: ["Obtener el porcentaje requerido de firmas del censo electoral", "Presentar ante Registraduría Nacional", "Verificar que pregunta sea de sí/no", "Cumplir requisitos de publicidad"],
        plazos: { firmas: "6 meses", verificacion: "1 mes", convocatoria: "Dentro del año calendario" }
      }}));
    } finally { setCargandoIA(false); }
  };

  const generarPDF = () => { const element = document.createElement('a'); const file = new Blob([JSON.stringify(formulario, null, 2)], { type: 'application/json' }); element.href = URL.createObjectURL(file); element.download = `referendo-${formulario.codigoReferendo}.json`; document.body.appendChild(element); element.click(); document.body.removeChild(element); return `pdfs/referendo-${formulario.codigoReferendo}.pdf`; };
  const iniciarDependencia = async () => { try { if (!formulario.analisisIA) { alert('Primero analiza con IA.'); return; } const codigo = formulario.codigoReferendo || generarCodigo(); await generarDependencia({ modulo: 'Referendo', titulo: `Referendo ${formulario.nivelReferendo} - ${formulario.tipoReferendo}`, descripcion: formulario.justificacion.substring(0, 200), tipo: 'referendo', datosCliente: { nombre: formulario.nombrePromotor, email: formulario.email }, datosUbicacion: { municipio: 'Colombia', departamento: 'Nacional', pais: 'Colombia' }, resultado: formulario.analisisIA, codigoCaso: codigo, pdfsAdicionales: [{ ruta: generarPDF(), tipo: 'referendo', nombre: `Referendo - ${codigo}.pdf` }] }); } catch (error) { console.error('Error:', error); } };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}><Vote style={{ marginRight: '1rem', display: 'inline' }} />Referendo</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Mecanismo de Participación Ciudadana</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map((paso) => (<div key={paso.numero} onClick={() => setPasoActual(paso.numero)} style={{ padding: '0.75rem 1rem', borderRadius: '2rem', background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: 'white', border: paso.numero === pasoActual ? '2px solid white' : 'transparent', cursor: 'pointer' }}><paso.icono size={18} style={{ marginRight: '0.5rem', display: 'inline' }} /><span>{paso.numero}. {paso.titulo}</span></div>))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {pasoActual === 1 && (<div><h2>Promotor</h2><div style={{ display: 'grid', gap: '1.5rem' }}><div><Label>Nombre *</Label><Input value={formulario.nombrePromotor} onChange={(e) => handleInputChange('nombrePromotor', e.target.value)} /></div><div><Label>ID *</Label><Input value={formulario.identificacion} onChange={(e) => handleInputChange('identificacion', e.target.value)} /></div><div><Label>Organización</Label><Input value={formulario.organizacion} onChange={(e) => handleInputChange('organizacion', e.target.value)} /></div></div></div>)}
            {pasoActual === 2 && (<div><h2>Tipo de Referendo</h2><div><Label>Nivel *</Label><Select value={formulario.nivelReferendo} onValueChange={(v) => handleInputChange('nivelReferendo', v)}><option value="">Seleccionar</option>{nivelesReferendo.map(n => <option key={n} value={n}>{n}</option>)}</Select></div><div style={{ marginTop: '1.5rem' }}><Label>Tipo *</Label><Select value={formulario.tipoReferendo} onValueChange={(v) => handleInputChange('tipoReferendo', v)}><option value="">Seleccionar</option>{tiposReferendo.map(t => <option key={t} value={t}>{t}</option>)}</Select></div></div>)}
            {pasoActual === 3 && (<div><h2>Pregunta del Referendo</h2><div><Label>Norma Objeto</Label><Input value={formulario.normaObjeto} onChange={(e) => handleInputChange('normaObjeto', e.target.value)} placeholder="Ley, Decreto, Acuerdo a aprobar/derogar" /></div><div style={{ marginTop: '1.5rem' }}><Label>Pregunta *</Label><Textarea value={formulario.preguntaReferendo} onChange={(e) => handleInputChange('preguntaReferendo', e.target.value)} rows={4} placeholder="Debe ser clara, de respuesta sí/no" /></div><div style={{ marginTop: '1.5rem' }}><Label>Justificación *</Label><Textarea value={formulario.justificacion} onChange={(e) => handleInputChange('justificacion', e.target.value)} rows={8} /></div></div>)}
            {pasoActual === 4 && (<div><h2>Evidencias</h2><div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem' }}><input type="file" multiple onChange={handleCargarEvidencia} style={{ display: 'none' }} id="evidencias-upload" /><label htmlFor="evidencias-upload" style={{ display: 'block', padding: '1rem', background: '#f59e0b', color: 'white', textAlign: 'center', borderRadius: '0.5rem', cursor: 'pointer' }}>Seleccionar</label></div></div>)}
            {pasoActual === 5 && (<div><h2>Análisis IA</h2>{!formulario.analisisIA ? (<div style={{ textAlign: 'center', padding: '3rem' }}><Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : '#f59e0b', padding: '1rem 2rem', fontWeight: 'bold', color: 'white' }}>{cargandoIA ? 'Analizando...' : 'Analizar'}</Button></div>) : (<div><p style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.5rem' }}>{formulario.analisisIA.conclusion}</p></div>)}</div>)}
            {pasoActual === 6 && (<div><h2>Revisión</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}><Card style={{ padding: '2rem', textAlign: 'center', background: '#dbeafe' }}><Button onClick={() => { generarCodigo(); generarPDF(); }} style={{ background: '#3b82f6', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>Descargar PDF</Button></Card><Card style={{ padding: '2rem', textAlign: 'center', background: '#dcfce7' }}><Button onClick={iniciarDependencia} disabled={generandoDependencia} style={{ background: generandoDependencia ? '#9ca3af' : '#22c55e', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>Generar Dependencia</Button>{actividadCreada && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>✅ Creada</p>}</Card></div><div style={{ marginTop: '2rem', padding: '2rem', background: '#e0f2fe', borderRadius: '1rem', textAlign: 'center' }}><Button onClick={() => navigate('/')} style={{ background: '#0ea5e9', padding: '1rem 2.5rem', fontWeight: 'bold', color: 'white' }}><Home style={{ marginRight: '0.75rem' }} />Finalizar</Button></div></div>)}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button onClick={pasoAnterior} disabled={pasoActual === 1} style={{ background: pasoActual === 1 ? '#9ca3af' : '#6b7280', padding: '0.75rem 1.5rem', color: 'white' }}><ArrowLeft style={{ marginRight: '0.5rem' }} />Anterior</Button>
              {pasoActual < pasos.length && (<Button onClick={siguientePaso} style={{ background: '#f59e0b', padding: '0.75rem 1.5rem', color: 'white' }}>Siguiente<ArrowRight style={{ marginLeft: '0.5rem' }} /></Button>)}
              </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Referendo;
