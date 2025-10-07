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
import { MessageSquare, User, FileText, Upload, Download, CheckCircle, Brain, Clock, Target, Users, ArrowRight, ArrowLeft, Home, FileCheck, MapPin } from 'lucide-react';

const CabildoAbierto = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  
  const [formulario, setFormulario] = useState({
    // Convocantes
    nombreConvocante: '', identificacion: '', telefono: '', email: '', organizacion: '', numeroConvocantes: '',
    
    // Datos del cabildo
    nivelCabildo: '', autoridadDestino: '', temaCabildo: '', problematicat: '', propuestaCiudadana: '', fundamentacion: '',
    
    // Evidencias
    evidencias: [],
    
    // Análisis IA
    analisisIA: null,
    codigoCabildo: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const nivelesCabildo = [
    { value: 'nacional', label: 'Nacional', autoridades: ['Congreso de la República', 'Ministros', 'Directores de Entidades'] },
    { value: 'departamental', label: 'Departamental', autoridades: ['Asamblea Departamental', 'Gobernador', 'Secretarios'] },
    { value: 'municipal', label: 'Municipal', autoridades: ['Concejo Municipal', 'Alcalde', 'Secretarios'] },
    { value: 'local', label: 'Local (Comuna/Corregimiento)', autoridades: ['JAL', 'Ediles'] }
  ];

  const temasCabildo = [
    'Presupuesto participativo',
    'Plan de desarrollo',
    'Servicios públicos',
    'Seguridad y convivencia',
    'Obras públicas',
    'Medio ambiente',
    'Educación',
    'Salud',
    'Otro (especificar)'
  ];

  const pasos = [
    { numero: 1, titulo: 'Convocantes', icono: Users },
    { numero: 2, titulo: 'Autoridad', icono: User },
    { numero: 3, titulo: 'Tema', icono: FileText },
    { numero: 4, titulo: 'Evidencias', icono: Upload },
    { numero: 5, titulo: 'Análisis IA', icono: Brain },
    { numero: 6, titulo: 'Revisión', icono: CheckCircle }
  ];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };
  const generarCodigo = () => { const codigo = `CAB-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; setFormulario(prev => ({ ...prev, codigoCabildo: codigo })); return codigo; };
  const handleCargarEvidencia = (event) => { setFormulario(prev => ({ ...prev, evidencias: [...prev.evidencias, ...Array.from(event.target.files)] })); };
  const eliminarEvidencia = (index) => { setFormulario(prev => ({ ...prev, evidencias: prev.evidencias.filter((_, i) => i !== index) })); };

  const analisisConIA = async () => {
    setCargandoIA(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const nivelSeleccionado = nivelesCabildo.find(n => n.value === formulario.nivelCabildo);
      
      setFormulario(prev => ({ ...prev, analisisIA: {
        especialistas: [
          { nombre: "Dra. Sandra Morelli Rico", especialidad: "Participación Ciudadana", analisis: `El cabildo abierto es un mecanismo efectivo de participación directa. Los ciudadanos del nivel ${nivelSeleccionado?.label} tienen derecho a reunirse con ${formulario.autoridadDestino} para discutir asuntos de interés comunitario sobre "${formulario.temaCabildo}". Se requieren al menos ${formulario.numeroConvocantes || 'un número mínimo de'} convocantes.` },
          { nombre: "Dr. Gustavo Petro Urrego", especialidad: "Democracia Participativa", analisis: `Los cabildos abiertos son espacios de democracia directa donde la ciudadanía ejerce control político. Las autoridades tienen obligación de asistir, escuchar las propuestas y dar respuesta pública. Es fundamental documentar los compromisos adquiridos para posterior seguimiento.` }
        ],
        normatividadAplicable: [
          { norma: "Constitución - Art. 103", descripcion: "Cabildo abierto como mecanismo de participación" },
          { norma: "Ley 134 de 1994 - Art. 9", descripcion: "Reglamenta cabildos abiertos" },
          { norma: "Ley 1757 de 2015", descripcion: "Promoción de participación ciudadana" }
        ],
        conclusion: `El cabildo abierto es PROCEDENTE. Se debe convocar formalmente a ${formulario.autoridadDestino} con mínimo ${nivelSeleccionado?.value === 'nacional' ? '10.000' : nivelSeleccionado?.value === 'departamental' ? '1.000' : '100'} ciudadanos o el 5‰ del censo electoral. La autoridad debe asistir y dar respuesta pública.`,
        recomendaciones: [
          `Reunir el número mínimo de convocantes (varía según nivel: ${nivelSeleccionado?.label})`,
          "Presentar solicitud formal ante la autoridad con 15 días de anticipación",
          "Fijar fecha, hora y lugar accesible para la comunidad",
          "Preparar orden del día con temas específicos",
          "Designar relatores para documentar compromisos",
          "Hacer seguimiento posterior a compromisos adquiridos por autoridades"
        ],
        requisitos: [
          { requisito: "Número de convocantes", descripcion: "Varía según nivel (nacional: 10.000, departamental: 1.000, municipal: 100 o 5‰ censo)" },
          { requisito: "Solicitud formal", descripcion: "Presentar por escrito a la autoridad" },
          { requisito: "Anticipación", descripcion: "Mínimo 15 días antes de la fecha propuesta" },
          { requisito: "Publicidad", descripcion: "Difundir ampliamente convocatoria a la comunidad" }
        ],
        plazos: { solicitud: "15 días de anticipación", realizacion: "Según acuerdo con autoridad", respuesta: "Durante el cabildo (pública)" }
      }}));
    } finally { setCargandoIA(false); }
  };

  const generarPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify({ tipo: 'CABILDO_ABIERTO', codigo: formulario.codigoCabildo, formulario }, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `cabildo-abierto-${formulario.codigoCabildo}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return `pdfs/cabildo-abierto-${formulario.codigoCabildo}.pdf`;
  };

  const iniciarDependencia = async () => {
    try {
      if (!formulario.analisisIA) { alert('Primero analiza con IA.'); return; }
      const codigo = formulario.codigoCabildo || generarCodigo();
      await generarDependencia({
        modulo: 'Cabildo Abierto',
        titulo: `Cabildo - ${formulario.temaCabildo}`,
        descripcion: formulario.problematica,
        tipo: 'cabildo_abierto',
        datosCliente: { nombre: formulario.nombreConvocante, email: formulario.email },
        datosUbicacion: { municipio: 'Variable', departamento: formulario.nivelCabildo, pais: 'Colombia' },
        resultado: formulario.analisisIA,
        codigoCaso: codigo,
        pdfsAdicionales: [{ ruta: generarPDF(), tipo: 'cabildo', nombre: `Cabildo-${codigo}.pdf` }]
      });
    } catch (error) { console.error('Error:', error); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              <MessageSquare style={{ marginRight: '1rem', display: 'inline' }} />Cabildo Abierto
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Participación Directa ante Autoridades</p>
            <p style={{ fontSize: '1rem', opacity: 0.85 }}>Art. 103 CP | Ley 134 de 1994 | Ley 1757 de 2015</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map(paso => (<div key={paso.numero} onClick={() => setPasoActual(paso.numero)} style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderRadius: '2rem', background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)', color: 'white', border: paso.numero === pasoActual ? '2px solid white' : 'transparent', cursor: 'pointer' }}><paso.icono size={18} style={{ marginRight: '0.5rem' }} /><span style={{ fontWeight: paso.numero === pasoActual ? 'bold' : 'normal', fontSize: '0.9rem' }}>{paso.numero}. {paso.titulo}</span></div>))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {pasoActual === 1 && (<div><h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Convocantes del Cabildo</h2><div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem' }}><p style={{ color: '#78350f', fontSize: '0.9rem' }}><strong>📝 Requisito:</strong> Se necesita un número mínimo de ciudadanos convocantes según el nivel del cabildo</p></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}><div><Label>Nombre del Convocante Principal *</Label><Input value={formulario.nombreConvocante} onChange={(e) => handleInputChange('nombreConvocante', e.target.value)} /></div><div><Label>Identificación *</Label><Input value={formulario.identificacion} onChange={(e) => handleInputChange('identificacion', e.target.value)} /></div><div><Label>Teléfono *</Label><Input value={formulario.telefono} onChange={(e) => handleInputChange('telefono', e.target.value)} /></div><div><Label>Email</Label><Input value={formulario.email} onChange={(e) => handleInputChange('email', e.target.value)} /></div><div><Label>Organización (si aplica)</Label><Input value={formulario.organizacion} onChange={(e) => handleInputChange('organizacion', e.target.value)} /></div><div><Label>Número Total de Convocantes *</Label><Input type="number" value={formulario.numeroConvocantes} onChange={(e) => handleInputChange('numeroConvocantes', e.target.value)} placeholder="Mínimo según nivel" /></div></div></div>)}
            
            {pasoActual === 2 && (<div><h2>Autoridad Destinataria</h2><div style={{ marginBottom: '1.5rem' }}><Label>Nivel del Cabildo *</Label><Select value={formulario.nivelCabildo} onValueChange={(v) => handleInputChange('nivelCabildo', v)}><option value="">Seleccionar</option>{nivelesCabildo.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}</Select></div><div><Label>Autoridad a Convocar *</Label><Input value={formulario.autoridadDestino} onChange={(e) => handleInputChange('autoridadDestino', e.target.value)} placeholder="Ej: Alcalde, Concejo, Gobernador, etc." /></div></div>)}
            
            {pasoActual === 3 && (<div><h2>Tema y Problemática</h2><div style={{ marginBottom: '1.5rem' }}><Label>Tema del Cabildo *</Label><Select value={formulario.temaCabildo} onValueChange={(v) => handleInputChange('temaCabildo', v)}><option value="">Seleccionar</option>{temasCabildo.map(t => <option key={t} value={t}>{t}</option>)}</Select></div><div style={{ marginBottom: '1.5rem' }}><Label>Problemática a Discutir *</Label><Textarea value={formulario.problematica} onChange={(e) => handleInputChange('problematica', e.target.value)} rows={10} placeholder="Describa la problemática comunitaria" /></div><div><Label>Propuesta Ciudadana *</Label><Textarea value={formulario.propuestaCiudadana} onChange={(e) => handleInputChange('propuestaCiudadana', e.target.value)} rows={6} placeholder="¿Qué propone la comunidad?" /></div></div>)}
            
            {pasoActual === 4 && (<div><h2>Evidencias</h2><div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem' }}><input type="file" multiple onChange={handleCargarEvidencia} style={{ display: 'none' }} id="evidencias-upload" /><label htmlFor="evidencias-upload" style={{ display: 'block', padding: '1rem', background: '#8b5cf6', color: 'white', textAlign: 'center', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>Seleccionar</label></div>{formulario.evidencias.map((archivo, index) => (<div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', marginTop: '0.5rem' }}><div><FileCheck size={24} style={{ color: '#10b981', marginRight: '0.75rem', display: 'inline' }} />{archivo.name}</div><Button onClick={() => eliminarEvidencia(index)} style={{ background: '#ef4444', padding: '0.5rem 1rem', color: 'white' }}>Eliminar</Button></div>))}</div>)}
            
            {pasoActual === 5 && (<div><h2>Análisis IA</h2>{!formulario.analisisIA ? (<div style={{ textAlign: 'center', padding: '3rem' }}><Brain size={64} style={{ color: '#8b5cf6', margin: '0 auto 1.5rem' }} /><Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : '#8b5cf6', padding: '1rem 2rem', fontWeight: 'bold', color: 'white' }}>{cargandoIA ? 'Analizando...' : 'Analizar'}</Button></div>) : (<div>{formulario.analisisIA.especialistas.map((esp, i) => (<Card key={i} style={{ padding: '1.5rem', marginBottom: '1rem', background: '#f3e8ff' }}><h4 style={{ fontWeight: 'bold' }}>{esp.nombre}</h4><p>{esp.analisis}</p></Card>))}<div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.5rem', marginTop: '1rem' }}><h3 style={{ fontWeight: 'bold' }}>Conclusión</h3><p>{formulario.analisisIA.conclusion}</p></div></div>)}</div>)}
            
            {pasoActual === 6 && (<div><h2>Revisión</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}><Card style={{ padding: '2rem', textAlign: 'center', background: '#dbeafe' }}><Download size={48} style={{ margin: '0 auto 1rem' }} /><Button onClick={() => { generarCodigo(); generarPDF(); }} style={{ background: '#3b82f6', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>Descargar PDF</Button></Card><Card style={{ padding: '2rem', textAlign: 'center', background: '#dcfce7' }}><Target size={48} style={{ margin: '0 auto 1rem' }} /><Button onClick={iniciarDependencia} disabled={generandoDependencia} style={{ background: generandoDependencia ? '#9ca3af' : '#22c55e', padding: '1rem', fontWeight: 'bold', color: 'white', width: '100%' }}>{generandoDependencia ? 'Generando...' : 'Generar Dependencia'}</Button>{actividadCreada && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>✅ Creada</p>}</Card></div><div style={{ padding: '2rem', background: '#e0f2fe', borderRadius: '1rem', textAlign: 'center' }}><h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>¿Finalizar?</h3><Button onClick={() => navigate('/')} style={{ background: '#0ea5e9', padding: '1rem 2.5rem', fontWeight: 'bold', color: 'white' }}><Home style={{ marginRight: '0.75rem' }} />Finalizar</Button></div></div>)}

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

export default CabildoAbierto;
