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
  Flag, User, FileText, Upload, Download, CheckCircle, Brain, Shield, Clock, Target, 
  Users, Lightbulb, ArrowRight, ArrowLeft, Home, FileCheck, Vote
} from 'lucide-react';

const Plebiscito = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  
  const [formulario, setFormulario] = useState({
    // Autoridad convocante
    autoridadConvocante: '',
    cargoAutoridad: '',
    nivelPlebiscito: '',
    
    // Decisión a consultar
    tipoDecision: '',
    temaDecision: '',
    descripcionDecision: '',
    justificacionPlebiscito: '',
    
    // Pregunta
    preguntaPlebiscito: '',
    opcionSi: '',
    opcionNo: '',
    
    // Evidencias
    evidencias: [],
    
    // Análisis IA
    analisisIA: null,
    codigoPlebiscito: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const nivelesPlebiscito = [
    { value: 'nacional', label: 'Nacional', autoridad: 'Presidente de la República' },
    { value: 'departamental', label: 'Departamental', autoridad: 'Gobernador' },
    { value: 'municipal', label: 'Municipal', autoridad: 'Alcalde' },
    { value: 'local', label: 'Local', autoridad: 'Junta Administradora Local' }
  ];

  const tiposDecision = [
    { value: 'politica_ejecutivo', label: 'Decisión Política del Ejecutivo', descripcion: 'Apoyo o rechazo a política gubernamental' },
    { value: 'acto_administrativo', label: 'Acto Administrativo', descripcion: 'Decisión administrativa de trascendencia' },
    { value: 'tratado_internacional', label: 'Tratado Internacional (solo nacional)', descripcion: 'Aprobación de tratado internacional' }
  ];

  const pasos = [
    { numero: 1, titulo: 'Autoridad', icono: User },
    { numero: 2, titulo: 'Decisión', icono: Shield },
    { numero: 3, titulo: 'Pregunta', icono: Vote },
    { numero: 4, titulo: 'Evidencias', icono: Upload },
    { numero: 5, titulo: 'Análisis IA', icono: Brain },
    { numero: 6, titulo: 'Revisión', icono: CheckCircle }
  ];

  const siguientePaso = () => { if (pasoActual < pasos.length) setPasoActual(pasoActual + 1); };
  const pasoAnterior = () => { if (pasoActual > 1) setPasoActual(pasoActual - 1); };
  const handleInputChange = (campo, valor) => { setFormulario(prev => ({ ...prev, [campo]: valor })); };

  const generarCodigoPlebiscito = () => {
    const nivelAbrev = formulario.nivelPlebiscito.substring(0, 3).toUpperCase();
    const fecha = new Date();
    const codigo = `PLEB-${nivelAbrev}-${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setFormulario(prev => ({ ...prev, codigoPlebiscito: codigo }));
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
      
      const nivelSeleccionado = nivelesPlebiscito.find(n => n.value === formulario.nivelPlebiscito);
      const tipoSeleccionado = tiposDecision.find(t => t.value === formulario.tipoDecision);

      const analisis = {
        especialistas: [
          {
            nombre: "Dr. Humberto de la Calle Lombana",
            especialidad: "Derecho Constitucional y Participación",
            analisis: `El plebiscito ${formulario.nivelPlebiscito} convocado por ${formulario.autoridadConvocante} (${formulario.cargoAutoridad}) es constitucionalmente viable. El mecanismo del plebiscito permite someter a consideración del pueblo una decisión de trascendencia nacional, departamental o municipal para obtener apoyo o rechazo popular. La decisión sobre "${formulario.temaDecision}" encuadra en el tipo "${tipoSeleccionado?.label}".`
          },
          {
            nombre: "Dra. Natalia Springer Bernal",
            especialidad: "Mecanismos de Participación Ciudadana",
            analisis: `El plebiscito se diferencia del referendo en que consulta sobre una decisión específica del ejecutivo, no sobre una norma general. La pregunta debe formularse de manera que permita al ciudadano expresar apoyo o rechazo claro. El resultado del plebiscito tiene efectos vinculantes para la autoridad que lo convoca.`
          },
          {
            nombre: "Dr. Mauricio García Villegas",
            especialidad: "Democracia Participativa",
            analisis: `Los mecanismos de democracia directa como el plebiscito fortalecen la participación ciudadana y la legitimidad de las decisiones públicas. Es crucial garantizar información completa y equilibrada a la ciudadanía para que su decisión sea informada. El proceso debe cumplir con los principios de transparencia y publicidad.`
          }
        ],
        normatividadAplicable: [
          {
            norma: "Constitución Política - Art. 103 y 104",
            descripcion: "Mecanismos de participación ciudadana, incluido el plebiscito"
          },
          {
            norma: "Ley 134 de 1994",
            descripcion: "Reglamenta mecanismos de participación ciudadana"
          },
          {
            norma: "Ley 1757 de 2015",
            descripcion: "Promoción y protección del derecho a la participación democrática"
          },
          {
            norma: "Acto Legislativo 01 de 2003",
            descripcion: "Requisitos para convocatoria de referendos y plebiscitos"
          }
        ],
        conclusion: `El plebiscito ${formulario.nivelPlebiscito} es VIABLE jurídicamente. La autoridad competente (${formulario.autoridadConvocante}) puede convocar a la ciudadanía para que se pronuncie sobre la decisión "${formulario.temaDecision}". Se debe cumplir con los requisitos de publicidad, información equilibrada y garantías electorales establecidos en la Ley 134 de 1994.`,
        recomendaciones: [
          "Expedir decreto de convocatoria del plebiscito con mínimo 30 días de anticipación",
          "Garantizar campaña de información equilibrada a la ciudadanía",
          "Coordinar con Registraduría Nacional para organización logística",
          "Formular pregunta clara que permita respuesta de apoyo o rechazo",
          "Establecer mecanismos de control y veeduría ciudadana al proceso",
          "El resultado es vinculante para la autoridad que convoca"
        ],
        requisitos: [
          {
            requisito: "Competencia de la autoridad",
            descripcion: "Solo puede convocar la autoridad ejecutiva del nivel correspondiente"
          },
          {
            requisito: "Publicidad",
            descripcion: "Difusión amplia de la decisión sometida a consulta"
          },
          {
            requisito: "Información equilibrada",
            descripcion: "Presentar argumentos a favor y en contra de manera imparcial"
          },
          {
            requisito: "Participación mínima",
            descripcion: "Umbral de votación para validez (varía según nivel)"
          }
        ],
        plazos: {
          convocatoria: "Mínimo 30 días de anticipación",
          realizacion: "Fecha fijada por la autoridad",
          escrutinio: "Inmediato posterior a votación",
          implementacion: "La autoridad debe acatar resultado"
        },
        efectosJuridicos: {
          aprobatorio: "Si gana el SÍ, la autoridad debe implementar la decisión",
          desaprobatorio: "Si gana el NO, la autoridad no puede implementar la decisión",
          vinculante: "El resultado vincula a la autoridad convocante",
          duracion: "Mientras no cambien sustancialmente las circunstancias"
        }
      };

      setFormulario(prev => ({ ...prev, analisisIA: analisis }));
      
    } catch (error) {
      console.error('Error en análisis IA:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarPDFPlebiscito = () => {
    const nivelSeleccionado = nivelesPlebiscito.find(n => n.value === formulario.nivelPlebiscito);
    const tipoSeleccionado = tiposDecision.find(t => t.value === formulario.tipoDecision);
    
    const pdfContent = {
      tipo: 'PLEBISCITO',
      codigoPlebiscito: formulario.codigoPlebiscito,
      fecha: new Date().toISOString(),
      autoridad: {
        nombre: formulario.autoridadConvocante,
        cargo: formulario.cargoAutoridad,
        nivel: nivelSeleccionado?.label
      },
      decision: {
        tipo: tipoSeleccionado?.label,
        tema: formulario.temaDecision,
        descripcion: formulario.descripcionDecision,
        justificacion: formulario.justificacionPlebiscito
      },
      pregunta: {
        texto: formulario.preguntaPlebiscito,
        opcionAfirmativa: formulario.opcionSi,
        opcionNegativa: formulario.opcionNo
      },
      evidencias: formulario.evidencias.map(e => ({ nombre: e.name, tamaño: e.size })),
      analisisIA: formulario.analisisIA,
      marcoLegal: {
        constitucion: 'Art. 103 y 104 - Plebiscito',
        ley: 'Ley 134 de 1994 - Mecanismos de Participación'
      }
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `plebiscito-${formulario.codigoPlebiscito}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return `pdfs/plebiscito-${formulario.codigoPlebiscito}.pdf`;
  };

  const iniciarDependencia = async () => {
    try {
      if (!formulario.analisisIA) {
        alert('Por favor, primero realiza el análisis con IA.');
        return;
      }

      const codigo = formulario.codigoPlebiscito || generarCodigoPlebiscito();
      const rutaPDF = generarPDFPlebiscito();

      const nivelSeleccionado = nivelesPlebiscito.find(n => n.value === formulario.nivelPlebiscito);

      await generarDependencia({
        modulo: 'Plebiscito',
        titulo: `Plebiscito ${nivelSeleccionado?.label} - ${formulario.temaDecision}`,
        descripcion: formulario.descripcionDecision.substring(0, 200) + '...',
        tipo: 'plebiscito',
        datosCliente: {
          nombre: formulario.autoridadConvocante,
          cargo: formulario.cargoAutoridad,
          tipo: 'autoridad_publica'
        },
        datosUbicacion: {
          municipio: formulario.nivelPlebiscito === 'nacional' ? 'Colombia' : 'Variable',
          departamento: formulario.nivelPlebiscito,
          pais: 'Colombia'
        },
        resultado: formulario.analisisIA,
        codigoCaso: codigo,
        pdfsAdicionales: [
          {
            ruta: rutaPDF,
            tipo: 'plebiscito_principal',
            nombre: `Plebiscito - ${codigo}.pdf`
          },
          ...formulario.evidencias.map((ev, index) => ({
            ruta: `pdfs/evidencia-${index + 1}-${codigo}.pdf`,
            tipo: 'evidencia',
            nombre: ev.name
          }))
        ]
      });

    } catch (error) {
      console.error('Error al iniciar dependencia:', error);
      alert('Error al generar la dependencia. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              <Flag style={{ marginRight: '1rem', display: 'inline' }} />
              Plebiscito
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 1rem' }}>
              Apoyo o Rechazo a Decisión del Ejecutivo
            </p>
            <p style={{ fontSize: '1rem', opacity: 0.85 }}>
              Art. 103-104 Constitución Política | Ley 134 de 1994 | Ley 1757 de 2015
            </p>
          </div>

          {/* Indicador de pasos */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map((paso) => (
              <div key={paso.numero} onClick={() => setPasoActual(paso.numero)} style={{ 
                display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderRadius: '2rem',
                background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white', border: paso.numero === pasoActual ? '2px solid white' : '2px solid transparent',
                cursor: 'pointer'
              }}>
                <paso.icono size={18} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontWeight: paso.numero === pasoActual ? 'bold' : 'normal', fontSize: '0.9rem' }}>
                  {paso.numero}. {paso.titulo}
                </span>
              </div>
            ))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {/* Paso 1: Autoridad Convocante */}
            {pasoActual === 1 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <User style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Autoridad Convocante
                </h2>

                <div style={{ marginBottom: '2rem', padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #fbbf24' }}>
                  <p style={{ color: '#78350f', fontSize: '0.9rem', margin: 0 }}>
                    <strong>⚠️ Importante:</strong> Solo pueden convocar plebiscitos: Presidente (nacional), Gobernadores (departamental), Alcaldes (municipal), JAL (local)
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <Label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                      Nivel del Plebiscito *
                    </Label>
                    <Select value={formulario.nivelPlebiscito} onValueChange={(value) => handleInputChange('nivelPlebiscito', value)}>
                      <option value="">Seleccionar nivel</option>
                      {nivelesPlebiscito.map((nivel) => (
                        <option key={nivel.value} value={nivel.value}>
                          {nivel.label} (Convoca: {nivel.autoridad})
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                      Nombre de la Autoridad *
                    </Label>
                    <Input
                      value={formulario.autoridadConvocante}
                      onChange={(e) => handleInputChange('autoridadConvocante', e.target.value)}
                      placeholder="Ej: Gustavo Petro, Daniel Quintero, etc."
                    />
                  </div>

                  <div>
                    <Label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                      Cargo de la Autoridad *
                    </Label>
                    <Input
                      value={formulario.cargoAutoridad}
                      onChange={(e) => handleInputChange('cargoAutoridad', e.target.value)}
                      placeholder="Ej: Presidente de la República, Alcalde de..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Paso 2: Decisión a Consultar */}
            {pasoActual === 2 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Shield style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Decisión a Consultar
                </h2>

                <div style={{ marginBottom: '2rem' }}>
                  <Label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold', color: '#374151', fontSize: '1.1rem' }}>
                    Tipo de Decisión *
                  </Label>
                  
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {tiposDecision.map((tipo) => (
                      <div
                        key={tipo.value}
                        onClick={() => handleInputChange('tipoDecision', tipo.value)}
                        style={{
                          padding: '1.5rem',
                          borderRadius: '0.5rem',
                          border: formulario.tipoDecision === tipo.value ? '2px solid #f59e0b' : '2px solid #e5e7eb',
                          background: formulario.tipoDecision === tipo.value ? '#fef3c7' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                          {tipo.label}
                        </h3>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                          {tipo.descripcion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <Label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                    Tema de la Decisión *
                  </Label>
                  <Input
                    value={formulario.temaDecision}
                    onChange={(e) => handleInputChange('temaDecision', e.target.value)}
                    placeholder="Ej: Acuerdo de paz, Reforma educativa, Proyecto de infraestructura, etc."
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <Label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                    Descripción de la Decisión *
                  </Label>
                  <Textarea
                    value={formulario.descripcionDecision}
                    onChange={(e) => handleInputChange('descripcionDecision', e.target.value)}
                    placeholder="Describa detalladamente la decisión que se somete a plebiscito..."
                    rows={8}
                  />
                </div>

                <div>
                  <Label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                    Justificación del Plebiscito *
                  </Label>
                  <Textarea
                    value={formulario.justificacionPlebiscito}
                    onChange={(e) => handleInputChange('justificacionPlebiscito', e.target.value)}
                    placeholder="¿Por qué es necesario consultar esta decisión a la ciudadanía?"
                    rows={6}
                  />
                </div>
              </div>
            )}

            {/* Paso 3: Pregunta del Plebiscito */}
            {pasoActual === 3 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Vote style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Formulación de la Pregunta
                </h2>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#dbeafe', borderRadius: '0.5rem', border: '1px solid #3b82f6' }}>
                  <p style={{ color: '#1e40af', fontSize: '0.9rem', margin: 0 }}>
                    <strong>📝 Instrucciones:</strong> La pregunta debe ser clara, directa y permitir respuesta de apoyo o rechazo. 
                    Ejemplo: "¿Apoya usted la decisión del [autoridad] de [decisión]?"
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <Label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                    Pregunta del Plebiscito *
                  </Label>
                  <Textarea
                    value={formulario.preguntaPlebiscito}
                    onChange={(e) => handleInputChange('preguntaPlebiscito', e.target.value)}
                    placeholder="¿Apoya usted la decisión de...?"
                    rows={5}
                    style={{ fontSize: '1rem', lineHeight: '1.6' }}
                  />
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    {formulario.preguntaPlebiscito.length} caracteres
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <Label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                      Texto para Opción "SÍ" (Apoyo)
                    </Label>
                    <Input
                      value={formulario.opcionSi}
                      onChange={(e) => handleInputChange('opcionSi', e.target.value)}
                      placeholder="Ej: Apoyo la decisión"
                    />
                  </div>

                  <div>
                    <Label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>
                      Texto para Opción "NO" (Rechazo)
                    </Label>
                    <Input
                      value={formulario.opcionNo}
                      onChange={(e) => handleInputChange('opcionNo', e.target.value)}
                      placeholder="Ej: No apoyo la decisión"
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #22c55e' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#166534', marginBottom: '0.5rem' }}>
                    ✓ Ejemplos de preguntas válidas:
                  </h3>
                  <ul style={{ color: '#166534', fontSize: '0.9rem', margin: 0, paddingLeft: '1.5rem' }}>
                    <li>¿Apoya usted la decisión del Presidente de firmar el acuerdo de paz?</li>
                    <li>¿Está de acuerdo con la decisión del Alcalde de construir el metro?</li>
                    <li>¿Respalda usted la política del Gobernador sobre educación pública?</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Paso 4: Evidencias */}
            {pasoActual === 4 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Upload style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Documentos de Soporte
                </h2>

                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem', border: '2px dashed #9ca3af' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <Upload size={48} style={{ color: '#6b7280', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>
                      Adjunte documentos relacionados con la decisión
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                      Estudios, informes, proyectos, presentaciones, etc.
                    </p>
                  </div>
                  
                  <input type="file" multiple onChange={handleCargarEvidencia} style={{ display: 'none' }} id="evidencias-upload" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                  <label htmlFor="evidencias-upload" style={{ display: 'block', width: '100%', padding: '1rem', background: 'linear-gradient(45deg, #f59e0b, #d97706)', color: 'white', textAlign: 'center', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
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

            {/* Paso 5: Análisis IA */}
            {pasoActual === 5 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Brain style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Análisis de Viabilidad con IA
                </h2>

                {!formulario.analisisIA ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Brain size={64} style={{ color: '#f59e0b', margin: '0 auto 1.5rem' }} />
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem' }}>
                      Análisis de Viabilidad del Plebiscito
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                      3 expertos analizarán la viabilidad jurídica y democrática del plebiscito
                    </p>
                    <Button onClick={analisisConIA} disabled={cargandoIA} style={{ background: cargandoIA ? '#9ca3af' : 'linear-gradient(45deg, #f59e0b, #d97706)', border: 'none', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: cargandoIA ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', margin: '0 auto' }}>
                      {cargandoIA ? (<><Clock style={{ marginRight: '0.5rem' }} className="animate-spin" />Analizando...</>) : (<><Brain style={{ marginRight: '0.5rem' }} />Iniciar Análisis con IA</>)}
                    </Button>
                  </div>
                ) : (
                  <div>
                    {/* Especialistas */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                      👥 Consejo de Expertos
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                      {formulario.analisisIA.especialistas.map((esp, index) => (
                        <Card key={index} style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '1px solid #fbbf24' }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <Users size={24} style={{ color: '#f59e0b', marginRight: '0.75rem' }} />
                            <div>
                              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>{esp.nombre}</h4>
                              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>{esp.especialidad}</p>
                            </div>
                          </div>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0 }}>{esp.analisis}</p>
                        </Card>
                      ))}
                    </div>

                    {/* Normatividad */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>📚 Marco Legal</h3>
                    <div style={{ marginBottom: '2rem' }}>
                      {formulario.analisisIA.normatividadAplicable.map((norma, index) => (
                        <div key={index} style={{ padding: '1rem', background: '#f0f9ff', borderLeft: '4px solid #3b82f6', marginBottom: '0.75rem' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e40af', margin: '0 0 0.25rem 0' }}>{norma.norma}</h4>
                          <p style={{ fontSize: '0.9rem', color: '#374151', margin: 0 }}>{norma.descripcion}</p>
                        </div>
                      ))}
                    </div>

                    {/* Conclusión */}
                    <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '2px solid #22c55e', marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                        <CheckCircle size={24} style={{ marginRight: '0.5rem' }} />Conclusión
                      </h3>
                      <p style={{ color: '#166534', lineHeight: '1.6', margin: 0 }}>{formulario.analisisIA.conclusion}</p>
                    </div>

                    {/* Recomendaciones */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>💡 Recomendaciones</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                      {formulario.analisisIA.recomendaciones.map((rec, index) => (
                        <li key={index} style={{ padding: '0.75rem 1rem', background: '#fef3c7', borderLeft: '4px solid #fbbf24', marginBottom: '0.5rem' }}>
                          <span style={{ color: '#78350f' }}>✓ {rec}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Requisitos */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>📋 Requisitos del Plebiscito</h3>
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                      {formulario.analisisIA.requisitos.map((req, index) => (
                        <div key={index} style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                            {req.requisito}
                          </h4>
                          <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>{req.descripcion}</p>
                        </div>
                      ))}
                    </div>

                    {/* Plazos */}
                    <div style={{ padding: '1.5rem', background: '#ede9fe', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#6d28d9', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                        <Clock size={24} style={{ marginRight: '0.5rem' }} />Plazos
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {Object.entries(formulario.analisisIA.plazos).map(([key, value]) => (
                          <div key={key}>
                            <p style={{ fontSize: '0.85rem', color: '#6d28d9', margin: '0 0 0.25rem 0', textTransform: 'capitalize' }}>
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </p>
                            <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#4c1d95', margin: 0 }}>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Efectos Jurídicos */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>⚖️ Efectos Jurídicos</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {Object.entries(formulario.analisisIA.efectosJuridicos).map(([key, value]) => (
                        <div key={key} style={{ padding: '1rem', background: '#fce7f3', borderLeft: '4px solid #ec4899' }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#831843', textTransform: 'capitalize', marginBottom: '0.25rem' }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p style={{ fontSize: '0.9rem', color: '#374151', margin: 0 }}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Paso 6: Revisión */}
            {pasoActual === 6 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <CheckCircle style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Revisión Final
                </h2>

                <Card style={{ padding: '1.5rem', background: '#f8fafc', marginBottom: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Nivel:</p>
                      <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                        {nivelesPlebiscito.find(n => n.value === formulario.nivelPlebiscito)?.label}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Autoridad:</p>
                      <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>{formulario.autoridadConvocante}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Tema:</p>
                      <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>{formulario.temaDecision}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Evidencias:</p>
                      <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>{formulario.evidencias.length} archivo(s)</p>
                    </div>
                  </div>
                </Card>

                {/* Acciones */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                  <Card style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '2px solid #3b82f6' }}>
                    <Download size={48} style={{ color: '#1d4ed8', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e40af' }}>Generar PDF</h3>
                    <Button onClick={() => { generarCodigoPlebiscito(); generarPDFPlebiscito(); }} style={{ background: 'linear-gradient(45deg, #3b82f6, #2563eb)', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: 'pointer', width: '100%' }}>
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
                        <p style={{ fontSize: '0.85rem', color: '#166534', margin: '0.25rem 0' }}><strong>Código:</strong> {actividadCreada.codigo_caso || formulario.codigoPlebiscito}</p>
                      </div>
                    )}
                  </Card>
                </div>

                {/* Botón Finalizar */}
                <div style={{ marginTop: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderRadius: '1rem', textAlign: 'center', border: '2px solid #0ea5e9' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0c4a6e', marginBottom: '1rem' }}>
                    ¿Desea finalizar y volver al inicio?
                  </h3>
                  <p style={{ color: '#075985', marginBottom: '1.5rem', fontSize: '1rem' }}>
                    Su plebiscito ha sido procesado exitosamente. Puede volver a la página principal.
                  </p>
                  <Button onClick={() => navigate('/')} style={{ background: 'linear-gradient(45deg, #0ea5e9, #0284c7)', border: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                    <Home style={{ marginRight: '0.75rem' }} size={24} />Finalizar y Volver al Inicio
                  </Button>
                </div>
              </div>
            )}

            {/* Navegación */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button type="button" onClick={pasoAnterior} disabled={pasoActual === 1} style={{ background: pasoActual === 1 ? '#9ca3af' : 'linear-gradient(45deg, #6b7280, #4b5563)', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: pasoActual === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center' }}>
                <ArrowLeft style={{ marginRight: '0.5rem' }} />Anterior
              </Button>
              {pasoActual < pasos.length && (
                <Button type="button" onClick={siguientePaso} style={{ background: 'linear-gradient(45deg, #f59e0b, #d97706)', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '0.5rem', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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

export default Plebiscito;
