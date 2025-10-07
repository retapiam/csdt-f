import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { useDependencia } from '../../../hooks/useDependencia';
import { Globe, User, FileText, Upload, Download, CheckCircle, Brain, Clock, Target, ArrowRight, ArrowLeft, Home, MapPin } from 'lucide-react';

const DeclaracionesAmpliacionTerritorial = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    nombreComunidad: '', puebloEtnico: '', autoridad: '', telefono: '', email: '', territorioActual: '', areaActual: '', territorioSolicitado: '', areaSolicitada: '', fundamentacion: '', usoTradicional: '', evidencias: [], analisisIA: null, codigoSolicitud: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const pueblosEtnicos = ['Pueblo Indígena', 'Comunidad Afrodescendiente', 'Pueblo Rom', 'Comunidad Raizal', 'Comunidad Palenquera'];
  const pasos = [{ numero: 1, titulo: 'Comunidad', icono: User }, { numero: 2, titulo: 'Territorio', icono: MapPin }, { numero: 3, titulo: 'Fundamentación', icono: FileText }, { numero: 4, titulo: 'Evidencias', icono: Upload }, { numero: 5, titulo: 'Análisis IA', icono: Brain }, { numero: 6, titulo: 'Revisión', icono: CheckCircle }];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };
  const generarCodigo = () => { const codigo = `AT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; setFormulario(prev => ({ ...prev, codigoSolicitud: codigo })); return codigo; };
  const handleCargarEvidencia = (event) => { setFormulario(prev => ({ ...prev, evidencias: [...prev.evidencias, ...Array.from(event.target.files)] })); };

  const analisisConIA = async () => { setCargandoIA(true); try { await new Promise(resolve => setTimeout(resolve, 3000)); setFormulario(prev => ({ ...prev, analisisIA: { especialistas: [{ nombre: "Dra. Esther Sánchez Botero", especialidad: "Derechos Étnicos y Territoriales", analisis: `La solicitud de ampliación territorial para ${formulario.nombreComunidad} del pueblo ${formulario.puebloEtnico} es procedente conforme al Convenio 169 de la OIT y la Constitución. El uso tradicional documentado fundamenta el derecho territorial ancestral.` }], conclusion: `La ampliación territorial es PROCEDENTE. Se debe presentar ante Ministerio del Interior y ANT con estudios sociojurídicos y cartografía.`, recomendaciones: ["Elaborar estudio sociojurídico", "Levantar cartografía del territorio", "Documentar uso tradicional", "Consultar con autoridades étnicas"], plazos: { estudio: "6 meses", resolucion: "12-24 meses", implementacion: "Variable" } }})); } finally { setCargandoIA(false); } };
  const generarPDF = () => { const element = document.createElement('a'); const file = new Blob([JSON.stringify(formulario, null, 2)], { type: 'application/json' }); element.href = URL.createObjectURL(file); element.download = `ampliacion-territorial-${formulario.codigoSolicitud}.json`; document.body.appendChild(element); element.click(); document.body.removeChild(element); return `pdfs/ampliacion-territorial-${formulario.codigoSolicitud}.pdf`; };
  const iniciarDependencia = async () => { try { if (!formulario.analisisIA) { alert('Analiza primero.'); return; } const codigo = formulario.codigoSolicitud || generarCodigo(); await generarDependencia({ modulo: 'Ampliación Territorial', titulo: `Ampliación - ${formulario.nombreComunidad}`, descripcion: formulario.fundamentacion, tipo: 'ampliacion_territorial', datosCliente: { nombre: formulario.nombreComunidad, tipo: 'comunidad_etnica', email: formulario.email }, datosUbicacion: { municipio: formulario.territorioActual, departamento: 'Colombia', pais: 'Colombia' }, resultado: formulario.analisisIA, codigoCaso: codigo, pdfsAdicionales: [{ ruta: generarPDF(), tipo: 'ampliacion_territorial', nombre: `Ampliación-${codigo}.pdf` }] }); } catch (error) { console.error('Error:', error); } };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}><Globe style={{ display: 'inline', marginRight: '1rem' }} />Ampliación Territorial</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Declaraciones y Ampliación de Territorios Ancestrales</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map(paso => (<div key={paso.numero} onClick={() => setPasoActual(paso.numero)} style={{ padding: '0.75rem 1rem', borderRadius: '2rem', background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: 'white', cursor: 'pointer' }}><paso.icono size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />{paso.numero}. {paso.titulo}</div>))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {pasoActual === 1 && (<div><h2>Comunidad</h2><div style={{ display: 'grid', gap: '1.5rem' }}><div><Label>Nombre Comunidad *</Label><Input value={formulario.nombreComunidad} onChange={(e) => handleInputChange('nombreComunidad', e.target.value)} /></div><div><Label>Pueblo Étnico *</Label><Select value={formulario.puebloEtnico} onValueChange={(v) => handleInputChange('puebloEtnico', v)}><option value="">Seleccionar</option>{pueblosEtnicos.map(p => <option key={p} value={p}>{p}</option>)}</Select></div><div><Label>Autoridad Tradicional *</Label><Input value={formulario.autoridad} onChange={(e) => handleInputChange('autoridad', e.target.value)} /></div></div></div>)}
            {pasoActual === 2 && (<div><h2>Territorio</h2><div style={{ marginBottom: '1.5rem' }}><Label>Territorio Actual *</Label><Input value={formulario.territorioActual} onChange={(e) => handleInputChange('territorioActual', e.target.value)} placeholder="Resguardo, territorio colectivo actual" /></div><div style={{ marginBottom: '1.5rem' }}><Label>Área Actual (hectáreas)</Label><Input value={formulario.areaActual} onChange={(e) => handleInputChange('areaActual', e.target.value)} placeholder="Hectáreas" /></div><div style={{ marginBottom: '1.5rem' }}><Label>Territorio Solicitado *</Label><Textarea value={formulario.territorioSolicitado} onChange={(e) => handleInputChange('territorioSolicitado', e.target.value)} rows={4} placeholder="Describa límites del territorio solicitado" /></div><div><Label>Área Solicitada (hectáreas)</Label><Input value={formulario.areaSolicitada} onChange={(e) => handleInputChange('areaSolicitada', e.target.value)} /></div></div>)}
            {pasoActual === 3 && (<div><h2>Fundamentación</h2><div style={{ marginBottom: '1.5rem' }}><Label>Fundamentación Jurídica *</Label><Textarea value={formulario.fundamentacion} onChange={(e) => handleInputChange('fundamentacion', e.target.value)} rows={10} placeholder="Fundamente la solicitud con base en uso tradicional, ancestralidad, necesidad" /></div><div><Label>Uso Tradicional *</Label><Textarea value={formulario.usoTradicional} onChange={(e) => handleInputChange('usoTradicional', e.target.value)} rows={6} placeholder="Describa el uso tradicional del territorio" /></div></div>)}
            {pasoActual === 4 && (<div><h2>Evidencias</h2><div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem' }}><input type="file" multiple onChange={handleCargarEvidencia} style={{ display: 'none' }} id="evidencias-upload" /><label htmlFor="evidencias-upload" style={{ display: 'block', padding: '1rem', background: '#14b8a6', color: 'white', textAlign: 'center', borderRadius: '0.5rem', cursor: 'pointer' }}>Seleccionar Archivos</label></div></div>)}
            {pasoActual === 5 && (<div><h2>Análisis IA</h2>{!formulario.analisisIA ? (<div style={{ textAlign: 'center', padding: '3rem' }}><Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : '#14b8a6', padding: '1rem 2rem', fontWeight: 'bold', color: 'white' }}>{cargandoIA ? 'Analizando...' : 'Analizar'}</Button></div>) : (<div><p style={{ padding: '1.5rem', background: '#f0fdfa', borderRadius: '0.5rem' }}>{formulario.analisisIA.conclusion}</p></div>)}</div>)}
            {pasoActual === 6 && (<div><h2>Revisión</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}><Card style={{ padding: '2rem', textAlign: 'center', background: '#dbeafe' }}><Button onClick={() => { generarCodigo(); generarPDF(); }} style={{ background: '#3b82f6', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>Descargar PDF</Button></Card><Card style={{ padding: '2rem', textAlign: 'center', background: '#dcfce7' }}><Button onClick={iniciarDependencia} disabled={generandoDependencia} style={{ background: generandoDependencia ? '#9ca3af' : '#22c55e', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>Generar Dependencia</Button>{actividadCreada && <p style={{ marginTop: '1rem' }}>✅ Creada</p>}</Card></div><div style={{ marginTop: '2rem', padding: '2rem', background: '#e0f2fe', borderRadius: '1rem', textAlign: 'center' }}><Button onClick={() => navigate('/')} style={{ background: '#0ea5e9', padding: '1rem 2.5rem', fontWeight: 'bold', color: 'white' }}><Home style={{ marginRight: '0.75rem' }} />Finalizar</Button></div></div>)}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button onClick={pasoAnterior} disabled={pasoActual === 1} style={{ background: pasoActual === 1 ? '#9ca3af' : '#6b7280', padding: '0.75rem 1.5rem', color: 'white' }}><ArrowLeft style={{ marginRight: '0.5rem' }} />Anterior</Button>
              {pasoActual < pasos.length && (<Button onClick={siguientePaso} style={{ background: '#14b8a6', padding: '0.75rem 1.5rem', color: 'white' }}>Siguiente<ArrowRight style={{ marginLeft: '0.5rem' }} /></Button>)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeclaracionesAmpliacionTerritorial;
