import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { useDependencia } from '../../../hooks/useDependencia';
import { Users, User, FileText, Upload, Download, CheckCircle, Brain, Clock, Target, ArrowRight, ArrowLeft, Home } from 'lucide-react';

const ConsultaPopular = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({ autoridad: '', nivelConsulta: '', asuntoImportancia: '', pregunta: '', justificacion: '', fechaPropuesta: '', evidencias: [], analisisIA: null, codigoConsulta: '' });
  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const niveles = ['Nacional', 'Departamental', 'Municipal', 'Local'];
  const pasos = [{ numero: 1, titulo: 'Autoridad', icono: User }, { numero: 2, titulo: 'Asunto', icono: FileText }, { numero: 3, titulo: 'Pregunta', icono: Users }, { numero: 4, titulo: 'Análisis IA', icono: Brain }, { numero: 5, titulo: 'Revisión', icono: CheckCircle }];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };
  const generarCodigo = () => { const codigo = `CP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; setFormulario(prev => ({ ...prev, codigoConsulta: codigo })); return codigo; };

  const analisisConIA = async () => { setCargandoIA(true); try { await new Promise(resolve => setTimeout(resolve, 3000)); setFormulario(prev => ({ ...prev, analisisIA: { conclusion: `La consulta popular a nivel ${formulario.nivelConsulta} es viable. Debe ser convocada por ${formulario.autoridad} sobre asunto de importancia nacional/departamental/municipal.`, recomendaciones: ["Convocar mediante acto administrativo", "Garantizar publicidad", "Fijar fecha con mínimo 30 días de anticipación"], plazos: { convocatoria: "30 días antes", realizacion: "Dentro de 6 meses" } }})); } finally { setCargandoIA(false); } };
  const generarPDF = () => { const element = document.createElement('a'); const file = new Blob([JSON.stringify(formulario, null, 2)], { type: 'application/json' }); element.href = URL.createObjectURL(file); element.download = `consulta-popular-${formulario.codigoConsulta}.json`; document.body.appendChild(element); element.click(); document.body.removeChild(element); return `pdfs/consulta-popular-${formulario.codigoConsulta}.pdf`; };
  const iniciarDependencia = async () => { try { if (!formulario.analisisIA) { alert('Analiza primero.'); return; } const codigo = formulario.codigoConsulta || generarCodigo(); await generarDependencia({ modulo: 'Consulta Popular', titulo: `CP ${formulario.nivelConsulta}`, descripcion: formulario.asuntoImportancia, tipo: 'consulta_popular', datosCliente: { nombre: formulario.autoridad }, datosUbicacion: { municipio: 'Nacional', departamento: 'Colombia', pais: 'Colombia' }, resultado: formulario.analisisIA, codigoCaso: codigo, pdfsAdicionales: [{ ruta: generarPDF(), tipo: 'consulta_popular', nombre: `CP-${codigo}.pdf` }] }); } catch (error) { console.error('Error:', error); } };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}><Users style={{ display: 'inline', marginRight: '1rem' }} />Consulta Popular</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Decisiones de Importancia Nacional/Territorial</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map(paso => (<div key={paso.numero} onClick={() => setPasoActual(paso.numero)} style={{ padding: '0.75rem 1rem', borderRadius: '2rem', background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: 'white', cursor: 'pointer' }}><paso.icono size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />{paso.numero}. {paso.titulo}</div>))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {pasoActual === 1 && (<div><h2>Autoridad Convocante</h2><div><Label>Autoridad *</Label><Input value={formulario.autoridad} onChange={(e) => handleInputChange('autoridad', e.target.value)} placeholder="Presidente, Gobernador, Alcalde" /></div><div style={{ marginTop: '1.5rem' }}><Label>Nivel *</Label><Select value={formulario.nivelConsulta} onValueChange={(v) => handleInputChange('nivelConsulta', v)}><option value="">Seleccionar</option>{niveles.map(n => <option key={n} value={n}>{n}</option>)}</Select></div></div>)}
            {pasoActual === 2 && (<div><h2>Asunto</h2><div><Label>Asunto de Importancia *</Label><Textarea value={formulario.asuntoImportancia} onChange={(e) => handleInputChange('asuntoImportancia', e.target.value)} rows={10} placeholder="Describa el asunto sobre el cual se consultará a la ciudadanía" /></div></div>)}
            {pasoActual === 3 && (<div><h2>Pregunta</h2><div><Label>Pregunta para la Ciudadanía *</Label><Textarea value={formulario.pregunta} onChange={(e) => handleInputChange('pregunta', e.target.value)} rows={5} placeholder="Formule pregunta clara de sí/no" /></div><div style={{ marginTop: '1.5rem' }}><Label>Justificación *</Label><Textarea value={formulario.justificacion} onChange={(e) => handleInputChange('justificacion', e.target.value)} rows={8} /></div></div>)}
            {pasoActual === 4 && (<div><h2>Análisis IA</h2>{!formulario.analisisIA ? (<div style={{ textAlign: 'center', padding: '3rem' }}><Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : '#ec4899', padding: '1rem 2rem', fontWeight: 'bold', color: 'white' }}>{cargandoIA ? 'Analizando...' : 'Analizar'}</Button></div>) : (<div><p style={{ padding: '1.5rem', background: '#fce7f3', borderRadius: '0.5rem' }}>{formulario.analisisIA.conclusion}</p></div>)}</div>)}
            {pasoActual === 5 && (<div><h2>Revisión</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}><Card style={{ padding: '2rem', textAlign: 'center', background: '#dbeafe' }}><Button onClick={() => { generarCodigo(); generarPDF(); }} style={{ background: '#3b82f6', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>Descargar PDF</Button></Card><Card style={{ padding: '2rem', textAlign: 'center', background: '#dcfce7' }}><Button onClick={iniciarDependencia} disabled={generandoDependencia} style={{ background: generandoDependencia ? '#9ca3af' : '#22c55e', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>Generar Dependencia</Button></Card></div><div style={{ marginTop: '2rem', padding: '2rem', background: '#e0f2fe', borderRadius: '1rem', textAlign: 'center' }}><Button onClick={() => navigate('/')} style={{ background: '#0ea5e9', padding: '1rem 2.5rem', fontWeight: 'bold', color: 'white' }}><Home style={{ marginRight: '0.75rem' }} />Finalizar</Button></div></div>)}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button onClick={pasoAnterior} disabled={pasoActual === 1} style={{ background: pasoActual === 1 ? '#9ca3af' : '#6b7280', padding: '0.75rem 1.5rem', color: 'white' }}><ArrowLeft style={{ marginRight: '0.5rem' }} />Anterior</Button>
              {pasoActual < pasos.length && (<Button onClick={siguientePaso} style={{ background: '#ec4899', padding: '0.75rem 1.5rem', color: 'white' }}>Siguiente<ArrowRight style={{ marginLeft: '0.5rem' }} /></Button>)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConsultaPopular;
