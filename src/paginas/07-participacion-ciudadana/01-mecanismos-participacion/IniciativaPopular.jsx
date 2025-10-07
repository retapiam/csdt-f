import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { useDependencia } from '../../../hooks/useDependencia';
import { Lightbulb, User, FileText, Upload, Download, CheckCircle, Brain, Clock, Target, ArrowRight, ArrowLeft, Home, FileCheck, Users } from 'lucide-react';

const IniciativaPopular = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({ nombrePromotor: '', identificacion: '', telefono: '', email: '', organizacion: '', tipoIniciativa: '', nivelIniciativa: '', tituloProyecto: '', objetivoProyecto: '', articulado: '', exposicionMotivos: '', firmasRequeridas: '', evidencias: [], analisisIA: null, codigoIniciativa: '' });
  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const tiposIniciativa = [
    { value: 'ley', label: 'Proyecto de Ley (Nacional)', corporacion: 'Congreso de la República', firmas: '5% censo electoral' },
    { value: 'ordenanza', label: 'Proyecto de Ordenanza (Departamental)', corporacion: 'Asamblea Departamental', firmas: '10% censo departamental' },
    { value: 'acuerdo', label: 'Proyecto de Acuerdo (Municipal)', corporacion: 'Concejo Municipal', firmas: '10% censo municipal' },
    { value: 'resolucion_local', label: 'Resolución Local', corporacion: 'JAL', firmas: '10% censo local' }
  ];

  const pasos = [{ numero: 1, titulo: 'Promotor', icono: User }, { numero: 2, titulo: 'Tipo', icono: Lightbulb }, { numero: 3, titulo: 'Proyecto', icono: FileText }, { numero: 4, titulo: 'Evidencias', icono: Upload }, { numero: 5, titulo: 'Análisis IA', icono: Brain }, { numero: 6, titulo: 'Revisión', icono: CheckCircle }];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };
  const generarCodigo = () => { const codigo = `IP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; setFormulario(prev => ({ ...prev, codigoIniciativa: codigo })); return codigo; };
  const handleCargarEvidencia = (event) => { setFormulario(prev => ({ ...prev, evidencias: [...prev.evidencias, ...Array.from(event.target.files)] })); };

  const analisisConIA = async () => { setCargandoIA(true); try { await new Promise(resolve => setTimeout(resolve, 3000)); const tipoSel = tiposIniciativa.find(t => t.value === formulario.tipoIniciativa); setFormulario(prev => ({ ...prev, analisisIA: { especialistas: [{ nombre: "Dr. Jaime Castro Castro", especialidad: "Derecho Legislativo", analisis: `La iniciativa popular legislativa para presentar un ${tipoSel?.label} es constitucionalmente viable. Se requieren firmas equivalentes al ${tipoSel?.firmas} para ser presentado ante ${tipoSel?.corporacion}. El proyecto debe cumplir requisitos formales de técnica legislativa.` }], conclusion: `La iniciativa popular es VIABLE. Se debe recolectar ${tipoSel?.firmas} del censo electoral y presentar ante ${tipoSel?.corporacion} con exposición de motivos y articulado completo.`, recomendaciones: ["Redactar proyecto con técnica legislativa adecuada", "Incluir exposición de motivos clara", "Recolectar firmas válidas del censo electoral", "Presentar ante mesa directiva de la corporación"], plazos: { firmas: "Tiempo razonable para recolección", presentacion: "Después de validar firmas", tramite: "Prioridad en agenda legislativa" } }})); } finally { setCargandoIA(false); } };
  const generarPDF = () => { const element = document.createElement('a'); const file = new Blob([JSON.stringify(formulario, null, 2)], { type: 'application/json' }); element.href = URL.createObjectURL(file); element.download = `iniciativa-popular-${formulario.codigoIniciativa}.json`; document.body.appendChild(element); element.click(); document.body.removeChild(element); return `pdfs/iniciativa-popular-${formulario.codigoIniciativa}.pdf`; };
  const iniciarDependencia = async () => { try { if (!formulario.analisisIA) { alert('Analiza primero.'); return; } const codigo = formulario.codigoIniciativa || generarCodigo(); await generarDependencia({ modulo: 'Iniciativa Popular', titulo: `IP - ${formulario.tituloProyecto}`, descripcion: formulario.objetivoProyecto, tipo: 'iniciativa_popular', datosCliente: { nombre: formulario.nombrePromotor, email: formulario.email }, datosUbicacion: { municipio: 'Colombia', departamento: 'Nacional', pais: 'Colombia' }, resultado: formulario.analisisIA, codigoCaso: codigo, pdfsAdicionales: [{ ruta: generarPDF(), tipo: 'iniciativa_popular', nombre: `IP-${codigo}.pdf` }] }); } catch (error) { console.error('Error:', error); } };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}><Lightbulb style={{ display: 'inline', marginRight: '1rem' }} />Iniciativa Popular Legislativa</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Presentación de Proyectos Normativos por la Ciudadanía</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map(paso => (<div key={paso.numero} onClick={() => setPasoActual(paso.numero)} style={{ padding: '0.75rem 1rem', borderRadius: '2rem', background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: 'white', cursor: 'pointer' }}><paso.icono size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />{paso.numero}. {paso.titulo}</div>))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {pasoActual === 1 && (<div><h2>Promotor</h2><div style={{ display: 'grid', gap: '1.5rem' }}><div><Label>Nombre *</Label><Input value={formulario.nombrePromotor} onChange={(e) => handleInputChange('nombrePromotor', e.target.value)} /></div><div><Label>ID *</Label><Input value={formulario.identificacion} onChange={(e) => handleInputChange('identificacion', e.target.value)} /></div><div><Label>Email</Label><Input value={formulario.email} onChange={(e) => handleInputChange('email', e.target.value)} /></div></div></div>)}
            {pasoActual === 2 && (<div><h2>Tipo de Iniciativa</h2><div style={{ display: 'grid', gap: '1rem' }}>{tiposIniciativa.map(tipo => (<div key={tipo.value} onClick={() => handleInputChange('tipoIniciativa', tipo.value)} style={{ padding: '1.5rem', borderRadius: '0.5rem', border: formulario.tipoIniciativa === tipo.value ? '2px solid #eab308' : '2px solid #e5e7eb', background: formulario.tipoIniciativa === tipo.value ? '#fef3c7' : 'white', cursor: 'pointer' }}><h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{tipo.label}</h3><p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0.5rem 0' }}>Corporación: {tipo.corporacion}</p><p style={{ fontSize: '0.85rem', color: '#78350f' }}>Firmas: {tipo.firmas}</p></div>))}</div></div>)}
            {pasoActual === 3 && (<div><h2>Proyecto Normativo</h2><div style={{ marginBottom: '1.5rem' }}><Label>Título del Proyecto *</Label><Input value={formulario.tituloProyecto} onChange={(e) => handleInputChange('tituloProyecto', e.target.value)} placeholder="Por medio de la cual..." /></div><div style={{ marginBottom: '1.5rem' }}><Label>Objetivo *</Label><Textarea value={formulario.objetivoProyecto} onChange={(e) => handleInputChange('objetivoProyecto', e.target.value)} rows={5} /></div><div style={{ marginBottom: '1.5rem' }}><Label>Articulado *</Label><Textarea value={formulario.articulado} onChange={(e) => handleInputChange('articulado', e.target.value)} rows={12} placeholder="Artículo 1°, Artículo 2°, etc." /></div><div><Label>Exposición de Motivos *</Label><Textarea value={formulario.exposicionMotivos} onChange={(e) => handleInputChange('exposicionMotivos', e.target.value)} rows={10} /></div></div>)}
            {pasoActual === 4 && (<div><h2>Evidencias</h2><div style={{ padding: '1.5rem', background: '#f3f4f6' }}><input type="file" multiple onChange={handleCargarEvidencia} style={{ display: 'none' }} id="evidencias-upload" /><label htmlFor="evidencias-upload" style={{ display: 'block', padding: '1rem', background: '#eab308', color: 'white', textAlign: 'center', borderRadius: '0.5rem', cursor: 'pointer' }}>Seleccionar</label></div></div>)}
            {pasoActual === 5 && (<div><h2>Análisis IA</h2>{!formulario.analisisIA ? (<div style={{ textAlign: 'center', padding: '3rem' }}><Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : '#eab308', padding: '1rem 2rem', fontWeight: 'bold', color: 'white' }}>{cargandoIA ? 'Analizando...' : 'Analizar'}</Button></div>) : (<p style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.5rem' }}>{formulario.analisisIA.conclusion}</p>)}</div>)}
            {pasoActual === 6 && (<div><h2>Revisión</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}><Card style={{ padding: '2rem', textAlign: 'center', background: '#dbeafe' }}><Button onClick={() => { generarCodigo(); generarPDF(); }} style={{ background: '#3b82f6', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>Descargar PDF</Button></Card><Card style={{ padding: '2rem', textAlign: 'center', background: '#dcfce7' }}><Button onClick={iniciarDependencia} disabled={generandoDependencia} style={{ background: generandoDependencia ? '#9ca3af' : '#22c55e', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>Generar Dependencia</Button></Card></div><div style={{ marginTop: '2rem', padding: '2rem', background: '#e0f2fe', borderRadius: '1rem', textAlign: 'center' }}><Button onClick={() => navigate('/')} style={{ background: '#0ea5e9', padding: '1rem 2.5rem', fontWeight: 'bold', color: 'white' }}><Home style={{ marginRight: '0.75rem' }} />Finalizar</Button></div></div>)}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button onClick={pasoAnterior} disabled={pasoActual === 1} style={{ background: pasoActual === 1 ? '#9ca3af' : '#6b7280', padding: '0.75rem 1.5rem', color: 'white' }}><ArrowLeft style={{ marginRight: '0.5rem' }} />Anterior</Button>
              {pasoActual < pasos.length && (<Button onClick={siguientePaso} style={{ background: '#eab308', padding: '0.75rem 1.5rem', color: 'white' }}>Siguiente<ArrowRight style={{ marginLeft: '0.5rem' }} /></Button>)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IniciativaPopular;
