import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Textarea } from '../../../../components/ui/textarea';
import { Select } from '../../../../components/ui/select';
import { useDependencia } from '../../../../hooks/useDependencia';
import { Scale, User, FileText, Upload, Download, CheckCircle, Brain, Clock, Target, ArrowRight, ArrowLeft, Home, FileCheck, DollarSign } from 'lucide-react';

const JusticiaCivil = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    nombreDemandante: '', identificacionDemandante: '', telefonoDemandante: '', emailDemandante: '', direccionDemandante: '',
    nombreDemandado: '', identificacionDemandado: '', direccionDemandado: '',
    tipoProceso: '', cuantia: '', pretensiones: '', hechos: '', evidencias: [], analisisIA: null, codigoProceso: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const tiposProceso = ['Proceso Declarativo', 'Proceso Ejecutivo', 'Proceso Verbal', 'Proceso Verbal Sumario', 'Proceso de Sucesión', 'Proceso de División de Bienes', 'Otro'];
  const pasos = [{ numero: 1, titulo: 'Demandante', icono: User }, { numero: 2, titulo: 'Demandado', icono: User }, { numero: 3, titulo: 'Pretensiones', icono: FileText }, { numero: 4, titulo: 'Evidencias', icono: Upload }, { numero: 5, titulo: 'Análisis IA', icono: Brain }, { numero: 6, titulo: 'Revisión', icono: CheckCircle }];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };
  const generarCodigo = () => { const codigo = `CIV-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; setFormulario(prev => ({ ...prev, codigoProceso: codigo })); return codigo; };
  const handleCargarEvidencia = (event) => { setFormulario(prev => ({ ...prev, evidencias: [...prev.evidencias, ...Array.from(event.target.files)] })); };
  const eliminarEvidencia = (index) => { setFormulario(prev => ({ ...prev, evidencias: prev.evidencias.filter((_, i) => i !== index) })); };

  const analisisConIA = async () => {
    setCargandoIA(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setFormulario(prev => ({ ...prev, analisisIA: {
        especialistas: [
          { nombre: "Dr. Hernán Fabio López Blanco", especialidad: "Derecho Procesal Civil", analisis: `El proceso civil de tipo "${formulario.tipoProceso}" es el mecanismo adecuado para resolver la controversia planteada. La cuantía de ${formulario.cuantia} determina la competencia del juez civil municipal o del circuito según corresponda.` },
          { nombre: "Dra. Mabel Isabel Londoño", especialidad: "Derecho Civil", analisis: `Las pretensiones formuladas son procedentes conforme al Código General del Proceso. Se observa legitimación activa y pasiva en las partes. Los hechos narrados fundamentan jurídicamente la demanda.` }
        ],
        normatividadAplicable: [{ norma: "Código General del Proceso - Ley 1564 de 2012", descripcion: "Regula procesos civiles en Colombia" }, { norma: "Código Civil", descripcion: "Marco sustantivo de derechos civiles" }],
        conclusion: `El proceso es PROCEDENTE. Debe presentarse ante juez civil competente según cuantía. Procedimiento: ${formulario.tipoProceso}.`,
        recomendaciones: ["Presentar demanda con firma de abogado", "Adjuntar todas las pruebas", "Pagar derechos de registro", "Solicitar medidas cautelares si es necesario"],
        plazos: { contestacion: "20-30 días", primeraInstancia: "6-12 meses", segundaInstancia: "6 meses" }
      }}));
    } finally { setCargandoIA(false); }
  };

  const generarPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify({ tipo: 'DEMANDA_CIVIL', codigo: formulario.codigoProceso, formulario }, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `demanda-civil-${formulario.codigoProceso}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return `pdfs/demanda-civil-${formulario.codigoProceso}.pdf`;
  };

  const iniciarDependencia = async () => {
    try {
      if (!formulario.analisisIA) { alert('Primero analiza con IA.'); return; }
      const codigo = formulario.codigoProceso || generarCodigo();
      await generarDependencia({
        modulo: 'Justicia Civil',
        titulo: `${formulario.tipoProceso} - ${formulario.nombreDemandante} vs ${formulario.nombreDemandado}`,
        descripcion: formulario.hechos.substring(0, 200),
        tipo: 'justicia_civil',
        datosCliente: { nombre: formulario.nombreDemandante, email: formulario.emailDemandante, telefono: formulario.telefonoDemandante },
        datosUbicacion: { municipio: 'Colombia', departamento: 'Nacional', pais: 'Colombia' },
        resultado: formulario.analisisIA,
        codigoCaso: codigo,
        pdfsAdicionales: [{ ruta: generarPDF(), tipo: 'demanda_civil', nombre: `Demanda Civil - ${codigo}.pdf` }]
      });
    } catch (error) { console.error('Error:', error); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              <Scale style={{ marginRight: '1rem', display: 'inline' }} />Justicia Civil
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Procesos Civiles y Comerciales</p>
            <p style={{ fontSize: '1rem', opacity: 0.85 }}>Código General del Proceso - Ley 1564 de 2012</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map((paso) => (
              <div key={paso.numero} onClick={() => setPasoActual(paso.numero)} style={{ padding: '0.75rem 1rem', borderRadius: '2rem', background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: 'white', border: paso.numero === pasoActual ? '2px solid white' : '2px solid transparent', cursor: 'pointer' }}>
                <paso.icono size={18} style={{ marginRight: '0.5rem', display: 'inline' }} />
                <span style={{ fontWeight: paso.numero === pasoActual ? 'bold' : 'normal', fontSize: '0.9rem' }}>{paso.numero}. {paso.titulo}</span>
              </div>
            ))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {pasoActual === 1 && (<div><h2>Demandante</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}><div><Label>Nombre *</Label><Input value={formulario.nombreDemandante} onChange={(e) => handleInputChange('nombreDemandante', e.target.value)} /></div><div><Label>ID *</Label><Input value={formulario.identificacionDemandante} onChange={(e) => handleInputChange('identificacionDemandante', e.target.value)} /></div><div><Label>Teléfono</Label><Input value={formulario.telefonoDemandante} onChange={(e) => handleInputChange('telefonoDemandante', e.target.value)} /></div><div><Label>Email</Label><Input value={formulario.emailDemandante} onChange={(e) => handleInputChange('emailDemandante', e.target.value)} /></div></div></div>)}
            {pasoActual === 2 && (<div><h2>Demandado</h2><div style={{ display: 'grid', gap: '1.5rem' }}><div><Label>Nombre *</Label><Input value={formulario.nombreDemandado} onChange={(e) => handleInputChange('nombreDemandado', e.target.value)} /></div><div><Label>ID</Label><Input value={formulario.identificacionDemandado} onChange={(e) => handleInputChange('identificacionDemandado', e.target.value)} /></div><div><Label>Dirección *</Label><Input value={formulario.direccionDemandado} onChange={(e) => handleInputChange('direccionDemandado', e.target.value)} /></div></div></div>)}
            {pasoActual === 3 && (<div><h2>Pretensiones</h2><div style={{ marginBottom: '1.5rem' }}><Label>Tipo de Proceso *</Label><Select value={formulario.tipoProceso} onValueChange={(v) => handleInputChange('tipoProceso', v)}><option value="">Seleccionar</option>{tiposProceso.map((t) => (<option key={t} value={t}>{t}</option>))}</Select></div><div style={{ marginBottom: '1.5rem' }}><Label>Cuantía *</Label><Input value={formulario.cuantia} onChange={(e) => handleInputChange('cuantia', e.target.value)} placeholder="Valor en pesos" /></div><div style={{ marginBottom: '1.5rem' }}><Label>Hechos *</Label><Textarea value={formulario.hechos} onChange={(e) => handleInputChange('hechos', e.target.value)} rows={10} /></div><div><Label>Pretensiones *</Label><Textarea value={formulario.pretensiones} onChange={(e) => handleInputChange('pretensiones', e.target.value)} rows={6} /></div></div>)}
            {pasoActual === 4 && (<div><h2>Evidencias</h2><div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem', border: '2px dashed #9ca3af' }}><input type="file" multiple onChange={handleCargarEvidencia} style={{ display: 'none' }} id="evidencias-upload" /><label htmlFor="evidencias-upload" style={{ display: 'block', padding: '1rem', background: '#8b5cf6', color: 'white', textAlign: 'center', borderRadius: '0.5rem', cursor: 'pointer' }}>Seleccionar</label></div>{formulario.evidencias.map((archivo, index) => (<div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', marginTop: '0.5rem' }}><span>{archivo.name}</span><Button onClick={() => eliminarEvidencia(index)} style={{ background: '#ef4444', padding: '0.5rem 1rem', color: 'white' }}>Eliminar</Button></div>))}</div>)}
            {pasoActual === 5 && (<div><h2>Análisis IA</h2>{!formulario.analisisIA ? (<div style={{ textAlign: 'center', padding: '3rem' }}><Brain size={64} style={{ margin: '0 auto 1.5rem' }} /><Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : '#8b5cf6', padding: '1rem 2rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white' }}>{cargandoIA ? 'Analizando...' : 'Analizar'}</Button></div>) : (<div>{formulario.analisisIA.especialistas.map((esp, i) => (<Card key={i} style={{ padding: '1.5rem', marginBottom: '1rem', background: '#f3e8ff' }}><h4 style={{ fontWeight: 'bold' }}>{esp.nombre}</h4><p>{esp.analisis}</p></Card>))}<div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.5rem', marginTop: '1rem' }}><h3 style={{ fontWeight: 'bold' }}>Conclusión</h3><p>{formulario.analisisIA.conclusion}</p></div></div>)}</div>)}
            {pasoActual === 6 && (<div><h2>Revisión</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}><Card style={{ padding: '2rem', textAlign: 'center', background: '#dbeafe' }}><Download size={48} style={{ margin: '0 auto 1rem' }} /><Button onClick={() => { generarCodigo(); const element = document.createElement('a'); const file = new Blob([JSON.stringify(formulario, null, 2)], { type: 'application/json' }); element.href = URL.createObjectURL(file); element.download = `demanda-civil-${formulario.codigoProceso}.json`; document.body.appendChild(element); element.click(); document.body.removeChild(element); }} style={{ background: '#3b82f6', padding: '0.75rem 1.5rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', width: '100%' }}>Descargar PDF</Button></Card><Card style={{ padding: '2rem', textAlign: 'center', background: '#dcfce7' }}><Target size={48} style={{ margin: '0 auto 1rem' }} /><Button onClick={iniciarDependencia} disabled={generandoDependencia || !formulario.analisisIA} style={{ background: generandoDependencia ? '#9ca3af' : '#22c55e', padding: '0.75rem 1.5rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', width: '100%' }}>{generandoDependencia ? 'Generando...' : 'Generar Dependencia'}</Button>{actividadCreada && (<div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem' }}><p style={{ fontWeight: 'bold' }}>✅ Creada: {actividadCreada.codigo_caso}</p></div>)}</Card></div><div style={{ padding: '2rem', background: '#e0f2fe', borderRadius: '1rem', textAlign: 'center', border: '2px solid #0ea5e9' }}><h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>¿Finalizar?</h3><Button onClick={() => navigate('/')} style={{ background: '#0ea5e9', padding: '1rem 2.5rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white' }}><Home style={{ marginRight: '0.75rem' }} />Finalizar</Button></div></div>)}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button onClick={pasoAnterior} disabled={pasoActual === 1} style={{ background: pasoActual === 1 ? '#9ca3af' : '#6b7280', padding: '0.75rem 1.5rem', color: 'white' }}><ArrowLeft style={{ marginRight: '0.5rem' }} />Anterior</Button>
              {pasoActual < pasos.length && (<Button onClick={siguientePaso} style={{ background: '#8b5cf6', padding: '0.75rem 1.5rem', color: 'white' }}>Siguiente<ArrowRight style={{ marginLeft: '0.5rem' }} /></Button>)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JusticiaCivil;
