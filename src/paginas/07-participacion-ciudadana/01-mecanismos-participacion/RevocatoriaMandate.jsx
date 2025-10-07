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
import { UserX, User, FileText, Upload, Download, CheckCircle, Brain, Clock, Target, ArrowRight, ArrowLeft, Home, FileCheck, AlertTriangle } from 'lucide-react';

const RevocatoriaMandate = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  
  const [formulario, setFormulario] = useState({
    // Promotores
    nombrePromotor: '', identificacion: '', telefono: '', email: '', organizacion: '',
    
    // Mandatario a revocar
    nombreMandatario: '', cargoMandatario: '', enteTerritorial: '', fechaEleccion: '', motivosRevocatoria: '',
    
    // Causales
    causalesRevocatoria: [], otraCausal: '',
    
    // Fundamentación
    hechosRevocatoria: '', solicitudRevocatoria: '',
    
    // Firmas
    firmasObtenidas: '', porcentajeRequerido: '',
    
    // Evidencias
    evidencias: [],
    
    // Análisis IA
    analisisIA: null,
    codigoRevocatoria: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const cargosRevocables = [
    { value: 'gobernador', label: 'Gobernador', requisito: '40% votación', tiempo: 'Después de 1 año' },
    { value: 'alcalde', label: 'Alcalde', requisito: '40% votación', tiempo: 'Después de 1 año' },
    { value: 'diputado', label: 'Diputado', requisito: '40% votación', tiempo: 'Después de 1 año' },
    { value: 'concejal', label: 'Concejal', requisito: '40% votación', tiempo: 'Después de 1 año' },
    { value: 'edil', label: 'Edil (JAL)', requisito: '40% votación', tiempo: 'Después de 1 año' }
  ];

  const causalesRevocatoria = [
    { value: 'insatisfaccion', label: 'Insatisfacción general por gestión' },
    { value: 'incumplimiento', label: 'Incumplimiento del programa de gobierno' },
    { value: 'corrupcion', label: 'Actos de corrupción' },
    { value: 'negligencia', label: 'Negligencia administrativa' },
    { value: 'violacion_derechos', label: 'Violación de derechos fundamentales' },
    { value: 'otra', label: 'Otra causal (especificar)' }
  ];

  const pasos = [
    { numero: 1, titulo: 'Promotores', icono: User },
    { numero: 2, titulo: 'Mandatario', icono: UserX },
    { numero: 3, titulo: 'Causales', icono: AlertTriangle },
    { numero: 4, titulo: 'Hechos', icono: FileText },
    { numero: 5, titulo: 'Evidencias', icono: Upload },
    { numero: 6, titulo: 'Análisis IA', icono: Brain },
    { numero: 7, titulo: 'Revisión', icono: CheckCircle }
  ];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };
  
  const toggleCausal = (causal) => {
    setFormulario(prev => ({
      ...prev,
      causalesRevocatoria: prev.causalesRevocatoria.includes(causal)
        ? prev.causalesRevocatoria.filter(c => c !== causal)
        : [...prev.causalesRevocatoria, causal]
    }));
  };

  const generarCodigo = () => { 
    const codigo = `REV-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; 
    setFormulario(prev => ({ ...prev, codigoRevocatoria: codigo })); 
    return codigo; 
  };

  const handleCargarEvidencia = (event) => { 
    setFormulario(prev => ({ ...prev, evidencias: [...prev.evidencias, ...Array.from(event.target.files)] })); 
  };

  const eliminarEvidencia = (index) => { 
    setFormulario(prev => ({ ...prev, evidencias: prev.evidencias.filter((_, i) => i !== index) })); 
  };

  const analisisConIA = async () => {
    setCargandoIA(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const cargoSeleccionado = cargosRevocables.find(c => c.value === formulario.cargoMandatario);
      const causalesSeleccionadas = formulario.causalesRevocatoria
        .map(c => causalesRevocatoria.find(cr => cr.value === c)?.label)
        .filter(Boolean);
      
      setFormulario(prev => ({ ...prev, analisisIA: {
        especialistas: [
          { nombre: "Dr. Jaime Araujo Rentería", especialidad: "Derecho Constitucional y Electoral", analisis: `La revocatoria del mandato del ${cargoSeleccionado?.label} de ${formulario.enteTerritorial} es constitucionalmente procedente. Las causales invocadas (${causalesSeleccionadas.join(', ')}) fundamentan jurídicamente la solicitud. Se requiere recolectar firmas equivalentes al ${cargoSeleccionado?.requisito} de la votación que eligió al mandatario.` },
          { nombre: "Dra. Myriam Ávila Roldán", especialidad: "Participación Ciudadana", analisis: `La revocatoria es un mecanismo de control político que permite a los ciudadanos destituir a sus mandatarios electos cuando no cumplen adecuadamente. Para proceder, el mandatario debe haber cumplido al menos 1 año en el cargo y se requiere votación equivalente al ${cargoSeleccionado?.requisito} de quienes lo eligieron.` }
        ],
        normatividadAplicable: [
          { norma: "Constitución - Art. 40 numeral 5 y Art. 103", descripcion: "Revocatoria del mandato como derecho político" },
          { norma: "Ley 134 de 1994 - Art. 6-8", descripcion: "Reglamenta revocatoria del mandato" },
          { norma: "Ley 131 de 1994", descripcion: "Voto programático y revocatoria" }
        ],
        conclusion: `La revocatoria del mandato del ${cargoSeleccionado?.label} ${formulario.nombreMandatario} es PROCEDENTE. Se debe: 1) Verificar que haya pasado 1 año desde la posesión, 2) Recolectar ${cargoSeleccionado?.requisito} de firmas válidas, 3) Presentar ante Registraduría, 4) Realizar votación con participación mínima del 55% de quienes eligieron al mandatario, 5) Obtener mayoría para que proceda la revocatoria.`,
        recomendaciones: [
          "Verificar que el mandatario lleve mínimo 1 año en el cargo",
          "Conformar comité promotor de la revocatoria",
          `Recolectar firmas equivalentes al ${cargoSeleccionado?.requisito} de la votación que lo eligió`,
          "Presentar solicitud ante Registraduría Nacional con formularios E-14",
          "La votación requiere participación mínima del 55% de quienes eligieron al mandatario",
          "Si gana el SÍ con mayoría, el mandatario queda revocado",
          "Si no se alcanza participación mínima o gana el NO, el mandatario continúa"
        ],
        requisitos: [
          { requisito: "Tiempo mínimo en el cargo", descripcion: "El mandatario debe llevar mínimo 1 año ejerciendo" },
          { requisito: "Firmas de respaldo", descripcion: cargoSeleccionado?.requisito + " de la votación que lo eligió" },
          { requisito: "Participación mínima", descripcion: "55% de quienes lo eligieron deben votar" },
          { requisito: "Mayoría para revocar", descripcion: "Más del 50% debe votar SÍ a la revocatoria" }
        ],
        plazos: {
          solicitud: "Después de 1 año de posesión",
          recoleccionFirmas: "6 meses",
          verificacion: "2 meses",
          votacion: "Dentro del año calendario",
          efectos: "Inmediato si procede revocatoria"
        },
        efectosRevocatoria: {
          siProcede: "El mandatario queda destituido inmediatamente",
          reemplazo: "Asume quien corresponda según constitución y ley (vicegobernador, etc.)",
          inhabilitacion: "El revocado no puede ser reelegido para el mismo cargo",
          programa: "El reemplazo debe continuar con el programa de gobierno original"
        }
      }}));
    } finally { setCargandoIA(false); }
  };

  const generarPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify({ tipo: 'REVOCATORIA_MANDATO', codigo: formulario.codigoRevocatoria, formulario }, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `revocatoria-mandato-${formulario.codigoRevocatoria}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return `pdfs/revocatoria-mandato-${formulario.codigoRevocatoria}.pdf`;
  };

  const iniciarDependencia = async () => {
    try {
      if (!formulario.analisisIA) { alert('Primero analiza con IA.'); return; }
      const codigo = formulario.codigoRevocatoria || generarCodigo();
      await generarDependencia({
        modulo: 'Revocatoria de Mandato',
        titulo: `Revocatoria - ${formulario.cargoMandatario} ${formulario.nombreMandatario}`,
        descripcion: formulario.motivosRevocatoria,
        tipo: 'revocatoria_mandato',
        datosCliente: { nombre: formulario.nombrePromotor, email: formulario.email },
        datosUbicacion: { municipio: formulario.enteTerritorial, departamento: 'Colombia', pais: 'Colombia' },
        resultado: formulario.analisisIA,
        codigoCaso: codigo,
        pdfsAdicionales: [{ ruta: generarPDF(), tipo: 'revocatoria_mandato', nombre: `Revocatoria-${codigo}.pdf` }]
      });
    } catch (error) { console.error('Error:', error); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}><UserX style={{ display: 'inline', marginRight: '1rem' }} />Revocatoria de Mandato</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Destitución Ciudadana de Mandatarios Electos</p>
            <p style={{ fontSize: '1rem', opacity: 0.85 }}>Art. 40 y 103 CP | Ley 134 y 131 de 1994</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map(paso => (<div key={paso.numero} onClick={() => setPasoActual(paso.numero)} style={{ padding: '0.75rem 1rem', borderRadius: '2rem', background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: 'white', border: paso.numero === pasoActual ? '2px solid white' : 'transparent', cursor: 'pointer' }}><paso.icono size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />{paso.numero}. {paso.titulo}</div>))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {pasoActual === 1 && (<div><h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Promotores</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}><div><Label>Nombre Promotor Principal *</Label><Input value={formulario.nombrePromotor} onChange={(e) => handleInputChange('nombrePromotor', e.target.value)} /></div><div><Label>ID *</Label><Input value={formulario.identificacion} onChange={(e) => handleInputChange('identificacion', e.target.value)} /></div><div><Label>Teléfono</Label><Input value={formulario.telefono} onChange={(e) => handleInputChange('telefono', e.target.value)} /></div><div><Label>Email</Label><Input value={formulario.email} onChange={(e) => handleInputChange('email', e.target.value)} /></div></div></div>)}
            
            {pasoActual === 2 && (<div><h2>Mandatario a Revocar</h2><div style={{ marginBottom: '1.5rem' }}><Label>Cargo del Mandatario *</Label><Select value={formulario.cargoMandatario} onValueChange={(v) => handleInputChange('cargoMandatario', v)}><option value="">Seleccionar</option>{cargosRevocables.map(c => (<option key={c.value} value={c.value}>{c.label} (Requisito: {c.requisito})</option>))}</Select></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}><div><Label>Nombre del Mandatario *</Label><Input value={formulario.nombreMandatario} onChange={(e) => handleInputChange('nombreMandatario', e.target.value)} /></div><div><Label>Ente Territorial *</Label><Input value={formulario.enteTerritorial} onChange={(e) => handleInputChange('enteTerritorial', e.target.value)} placeholder="Departamento, Municipio, etc." /></div><div><Label>Fecha de Elección *</Label><Input type="date" value={formulario.fechaEleccion} onChange={(e) => handleInputChange('fechaEleccion', e.target.value)} /></div></div></div>)}
            
            {pasoActual === 3 && (<div><h2>Causales de Revocatoria</h2><div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fef2f2', borderRadius: '0.5rem', border: '1px solid #fca5a5' }}><p style={{ color: '#7f1d1d', fontSize: '0.9rem' }}><strong>⚠️ Importante:</strong> Seleccione las causales que fundamentan la solicitud de revocatoria</p></div><div style={{ display: 'grid', gap: '1rem' }}>{causalesRevocatoria.map(causal => (<div key={causal.value} onClick={() => toggleCausal(causal.value)} style={{ padding: '1rem', borderRadius: '0.5rem', border: formulario.causalesRevocatoria.includes(causal.value) ? '2px solid #ef4444' : '2px solid #e5e7eb', background: formulario.causalesRevocatoria.includes(causal.value) ? '#fee2e2' : 'white', cursor: 'pointer' }}><CheckCircle size={20} style={{ color: formulario.causalesRevocatoria.includes(causal.value) ? '#ef4444' : '#9ca3af', display: 'inline', marginRight: '0.5rem' }} /><span style={{ fontWeight: 'bold' }}>{causal.label}</span></div>))}</div>{formulario.causalesRevocatoria.includes('otra') && (<div style={{ marginTop: '1.5rem' }}><Label>Especifique otra causal *</Label><Input value={formulario.otraCausal} onChange={(e) => handleInputChange('otraCausal', e.target.value)} /></div>)}</div>)}
            
            {pasoActual === 4 && (<div><h2>Fundamentación</h2><div style={{ marginBottom: '1.5rem' }}><Label>Motivos de la Revocatoria *</Label><Textarea value={formulario.motivosRevocatoria} onChange={(e) => handleInputChange('motivosRevocatoria', e.target.value)} rows={8} placeholder="Explique por qué solicita la revocatoria" /></div><div style={{ marginBottom: '1.5rem' }}><Label>Hechos Concretos *</Label><Textarea value={formulario.hechosRevocatoria} onChange={(e) => handleInputChange('hechosRevocatoria', e.target.value)} rows={10} placeholder="Narre hechos específicos que fundamentan la revocatoria" /></div><div><Label>Solicitud *</Label><Textarea value={formulario.solicitudRevocatoria} onChange={(e) => handleInputChange('solicitudRevocatoria', e.target.value)} rows={5} placeholder="Solicito la revocatoria del mandato del..." /></div></div>)}
            
            {pasoActual === 5 && (<div><h2>Evidencias</h2><div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem' }}><input type="file" multiple onChange={handleCargarEvidencia} style={{ display: 'none' }} id="evidencias-upload" /><label htmlFor="evidencias-upload" style={{ display: 'block', padding: '1rem', background: '#ef4444', color: 'white', textAlign: 'center', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>Seleccionar Archivos</label></div>{formulario.evidencias.map((archivo, index) => (<div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', marginTop: '0.5rem' }}><div><FileCheck size={24} style={{ color: '#10b981', display: 'inline', marginRight: '0.75rem' }} />{archivo.name}</div><Button onClick={() => eliminarEvidencia(index)} style={{ background: '#ef4444', padding: '0.5rem 1rem', color: 'white' }}>Eliminar</Button></div>))}</div>)}
            
            {pasoActual === 6 && (<div><h2>Análisis IA</h2>{!formulario.analisisIA ? (<div style={{ textAlign: 'center', padding: '3rem' }}><Brain size={64} style={{ color: '#ef4444', margin: '0 auto 1.5rem' }} /><Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : '#ef4444', padding: '1rem 2rem', fontWeight: 'bold', color: 'white' }}>{cargandoIA ? 'Analizando...' : 'Analizar'}</Button></div>) : (<div>{formulario.analisisIA.especialistas.map((esp, i) => (<Card key={i} style={{ padding: '1.5rem', marginBottom: '1rem', background: '#fef2f2', border: '1px solid #fca5a5' }}><h4 style={{ fontWeight: 'bold' }}>{esp.nombre}</h4><p style={{ lineHeight: '1.6', marginTop: '0.5rem' }}>{esp.analisis}</p></Card>))}<div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.5rem', marginTop: '1rem' }}><h3 style={{ fontWeight: 'bold' }}>Conclusión</h3><p style={{ lineHeight: '1.6' }}>{formulario.analisisIA.conclusion}</p></div></div>)}</div>)}
            
            {pasoActual === 7 && (<div><h2>Revisión</h2><Card style={{ padding: '1.5rem', background: '#f8fafc', marginBottom: '2rem' }}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}><div><p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Cargo:</p><p style={{ fontWeight: 'bold' }}>{cargosRevocables.find(c => c.value === formulario.cargoMandatario)?.label}</p></div><div><p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Mandatario:</p><p style={{ fontWeight: 'bold' }}>{formulario.nombreMandatario}</p></div><div><p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Ente:</p><p style={{ fontWeight: 'bold' }}>{formulario.enteTerritorial}</p></div></div></Card><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}><Card style={{ padding: '2rem', textAlign: 'center', background: '#dbeafe' }}><Download size={48} style={{ margin: '0 auto 1rem' }} /><Button onClick={() => { generarCodigo(); generarPDF(); }} style={{ background: '#3b82f6', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>Descargar PDF</Button></Card><Card style={{ padding: '2rem', textAlign: 'center', background: '#dcfce7' }}><Target size={48} style={{ margin: '0 auto 1rem' }} /><Button onClick={iniciarDependencia} disabled={generandoDependencia} style={{ background: generandoDependencia ? '#9ca3af' : '#22c55e', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>{generandoDependencia ? 'Generando...' : 'Generar Dependencia'}</Button>{actividadCreada && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>✅ Creada</p>}</Card></div><div style={{ marginTop: '2rem', padding: '2rem', background: '#e0f2fe', borderRadius: '1rem', textAlign: 'center' }}><h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>¿Finalizar?</h3><Button onClick={() => navigate('/')} style={{ background: '#0ea5e9', padding: '1rem 2.5rem', fontWeight: 'bold', color: 'white' }}><Home style={{ marginRight: '0.75rem' }} />Finalizar</Button></div></div>)}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button onClick={pasoAnterior} disabled={pasoActual === 1} style={{ background: pasoActual === 1 ? '#9ca3af' : '#6b7280', padding: '0.75rem 1.5rem', color: 'white' }}><ArrowLeft style={{ marginRight: '0.5rem' }} />Anterior</Button>
              {pasoActual < pasos.length && (<Button onClick={siguientePaso} style={{ background: '#ef4444', padding: '0.75rem 1.5rem', color: 'white' }}>Siguiente<ArrowRight style={{ marginLeft: '0.5rem' }} /></Button>)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RevocatoriaMandate;
