import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { useDependencia } from '../../../hooks/useDependencia';
import { 
  Gavel, 
  User, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Brain, 
  Shield, 
  Clock,
  Target,
  Users,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Home,
  Building,
  FileCheck,
  Scale
} from 'lucide-react';

const AccionTutela = () => {
  const navigate = useNavigate();
  const [pasoActual, setPasoActual] = useState(1);
  
  const [formulario, setFormulario] = useState({
    // Tutelante (quien presenta)
    nombreTutelante: '',
    identificacionTutelante: '',
    telefonoTutelante: '',
    emailTutelante: '',
    direccionTutelante: '',
    municipioTutelante: '',
    departamentoTutelante: '',
    actuaEnNombrePropio: true,
    
    // Tutelado (si actúa a nombre de otro)
    nombreTutelado: '',
    identificacionTutelado: '',
    relacionConTutelado: '',
    
    // Accionado (entidad demandada)
    entidadAccionada: '',
    representanteLegal: '',
    direccionEntidad: '',
    tipoEntidad: '',
    
    // Derechos fundamentales
    derechosVulnerados: [],
    otrosDerecho: '',
    
    // Hechos y pretensión
    hechos: '',
    pretension: '',
    medidasProvisionalesRequeridas: '',
    
    // Evidencias
    evidencias: [],
    
    // Análisis IA
    analisisIA: null,
    codigoTutela: ''
  });

  const [cargandoIA, setCargandoIA] = useState(false);

  // Hook para gestión de dependencias
  const { generarDependencia, generando: generandoDependencia, actividadCreada } = useDependencia();

  const derechosFundamentales = [
    { value: 'vida', label: 'Derecho a la Vida (Art. 11)' },
    { value: 'igualdad', label: 'Derecho a la Igualdad (Art. 13)' },
    { value: 'libre_desarrollo', label: 'Libre Desarrollo de la Personalidad (Art. 16)' },
    { value: 'salud', label: 'Derecho a la Salud (Art. 49)' },
    { value: 'educacion', label: 'Derecho a la Educación (Art. 67)' },
    { value: 'trabajo', label: 'Derecho al Trabajo (Art. 25)' },
    { value: 'vivienda', label: 'Derecho a la Vivienda Digna (Art. 51)' },
    { value: 'seguridad_social', label: 'Derecho a la Seguridad Social (Art. 48)' },
    { value: 'debido_proceso', label: 'Derecho al Debido Proceso (Art. 29)' },
    { value: 'peticion', label: 'Derecho de Petición (Art. 23)' },
    { value: 'intimidad', label: 'Derecho a la Intimidad (Art. 15)' },
    { value: 'buen_nombre', label: 'Derecho al Buen Nombre (Art. 15)' },
    { value: 'libertad', label: 'Derecho a la Libertad (Art. 28)' },
    { value: 'otro', label: 'Otro (especificar)' }
  ];

  const tiposEntidad = [
    'Entidad Pública',
    'Entidad Privada que presta servicio público',
    'Particular (en casos especiales)',
    'EPS',
    'Alcaldía',
    'Gobernación',
    'Ministerio',
    'Superintendencia',
    'Hospital',
    'Colegio/Universidad',
    'Otro'
  ];

  const departamentos = [
    'Antioquia', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas',
    'Caquetá', 'Cauca', 'Cesar', 'Córdoba', 'Cundinamarca', 'Chocó',
    'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander',
    'Quindío', 'Risaralda', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca'
  ];

  const pasos = [
    { numero: 1, titulo: 'Tutelante', icono: User },
    { numero: 2, titulo: 'Accionado', icono: Building },
    { numero: 3, titulo: 'Derechos', icono: Shield },
    { numero: 4, titulo: 'Hechos', icono: FileText },
    { numero: 5, titulo: 'Pretensión', icono: Target },
    { numero: 6, titulo: 'Evidencias', icono: Upload },
    { numero: 7, titulo: 'Análisis IA', icono: Brain },
    { numero: 8, titulo: 'Revisión', icono: CheckCircle }
  ];

  const siguientePaso = () => {
    if (pasoActual < pasos.length) setPasoActual(pasoActual + 1);
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1);
  };

  const handleInputChange = (campo, valor) => {
    setFormulario(prev => ({ ...prev, [campo]: valor }));
  };

  const toggleDerecho = (derecho) => {
    setFormulario(prev => ({
      ...prev,
      derechosVulnerados: prev.derechosVulnerados.includes(derecho)
        ? prev.derechosVulnerados.filter(d => d !== derecho)
        : [...prev.derechosVulnerados, derecho]
    }));
  };

  const generarCodigoTutela = () => {
    const fecha = new Date();
    const codigo = `TUT-${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setFormulario(prev => ({ ...prev, codigoTutela: codigo }));
    return codigo;
  };

  const handleCargarEvidencia = (event) => {
    const archivos = Array.from(event.target.files);
    setFormulario(prev => ({
      ...prev,
      evidencias: [...prev.evidencias, ...archivos]
    }));
  };

  const eliminarEvidencia = (index) => {
    setFormulario(prev => ({
      ...prev,
      evidencias: prev.evidencias.filter((_, i) => i !== index)
    }));
  };

  const analisisConIA = async () => {
    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const derechosSeleccionados = formulario.derechosVulnerados
        .map(d => derechosFundamentales.find(df => df.value === d)?.label)
        .filter(Boolean);

      const analisis = {
        especialistas: [
          {
            nombre: "Dr. Rodrigo Uprimny Yepes",
            especialidad: "Derecho Constitucional",
            analisis: `La acción de tutela es procedente para la protección de los derechos ${derechosSeleccionados.join(', ')}. Se observa una vulneración directa por parte de ${formulario.entidadAccionada}, entidad que debe garantizar estos derechos fundamentales. El perjuicio es actual e inminente, cumpliendo con los requisitos jurisprudenciales establecidos por la Corte Constitucional.`
          },
          {
            nombre: "Dra. Gloria Amparo Rodríguez",
            especialidad: "Derechos Fundamentales",
            analisis: `Los hechos narrados configuran una amenaza/vulneración a derechos fundamentales que requiere protección inmediata. La jurisprudencia constitucional ha sido clara en casos similares respecto a la procedencia de la tutela cuando no existen otros medios de defensa judicial o cuando existe perjuicio irremediable.`
          },
          {
            nombre: "Dr. Manuel José Cepeda Espinosa",
            especialidad: "Acción de Tutela",
            analisis: `Se cumplen los requisitos de procedibilidad: (1) Vulneración de derecho fundamental, (2) Acción u omisión de autoridad pública o particular, (3) Inexistencia de otro medio de defensa judicial o existencia de perjuicio irremediable, (4) Presentación dentro del plazo razonable. Recomiendo la procedencia de la acción.`
          },
          {
            nombre: "Dra. Catalina Botero Marino",
            especialidad: "Derechos Humanos",
            analisis: `Desde la perspectiva de derechos humanos, el caso amerita protección urgente mediante acción de tutela. Los estándares interamericanos de derechos humanos respaldan la procedencia de mecanismos internos de protección rápida y efectiva como la tutela colombiana.`
          }
        ],
        jurisprudenciaAplicable: [
          {
            sentencia: "T-406/1992",
            descripcion: "Sentencia fundacional sobre alcance y procedencia de la acción de tutela"
          },
          {
            sentencia: "T-760/2008",
            descripcion: "Derecho fundamental a la salud y procedencia de tutela"
          },
          {
            sentencia: "T-025/2004",
            descripcion: "Estado de cosas inconstitucional y protección de derechos"
          }
        ],
        normatividadAplicable: [
          {
            norma: "Constitución Política - Art. 86",
            descripcion: "Toda persona tendrá acción de tutela para reclamar ante los jueces la protección de sus derechos fundamentales"
          },
          {
            norma: "Decreto 2591 de 1991",
            descripcion: "Reglamenta la acción de tutela consagrada en el artículo 86 de la Constitución"
          },
          {
            norma: "Acuerdo 02 de 2015 PCSJA",
            descripcion: "Reparto de acciones de tutela en el sistema judicial"
          }
        ],
        conclusion: `La acción de tutela es PROCEDENTE. Los derechos ${derechosSeleccionados.join(', ')} están siendo vulnerados por ${formulario.entidadAccionada}. Se recomienda interponer la tutela de inmediato ante el juez competente. Plazo de fallo: 10 días. Si la respuesta no es favorable, procede la impugnación.`,
        recomendaciones: [
          "Interponer la tutela ante juez civil municipal o promiscuo municipal del lugar donde ocurrió la vulneración",
          "Adjuntar todas las pruebas documentales disponibles",
          "Solicitar medidas provisionales si existe perjuicio irremediable inminente",
          "Guardar copia del radicado para seguimiento",
          "En caso de fallo desfavorable, impugnar dentro de los 3 días siguientes",
          "Si la tutela es negada en segunda instancia, valorar eventual selección para revisión por Corte Constitucional"
        ],
        medidasProvisionalesViables: formulario.medidasProvisionalesRequeridas ? "Sí, se pueden solicitar medidas provisionales dada la urgencia del caso" : "Evaluar si la situación amerita medidas provisionales",
        plazos: {
          presentacion: "En cualquier momento (preferiblemente de inmediato)",
          fallo: "10 días hábiles",
          impugnacion: "3 días hábiles desde notificación",
          segundaInstancia: "20 días hábiles",
          cumplimiento: "48 horas desde ejecutoria del fallo"
        }
      };

      setFormulario(prev => ({ ...prev, analisisIA: analisis }));
      
    } catch (error) {
      console.error('Error en análisis IA:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarPDFTutela = () => {
    const pdfContent = {
      tipo: 'ACCION_DE_TUTELA',
      codigo: formulario.codigoTutela,
      fecha: new Date().toISOString(),
      tutelante: {
        nombre: formulario.nombreTutelante,
        identificacion: formulario.identificacionTutelante,
        telefono: formulario.telefonoTutelante,
        email: formulario.emailTutelante,
        direccion: formulario.direccionTutelante,
        municipio: formulario.municipioTutelante,
        departamento: formulario.departamentoTutelante
      },
      actuaEnNombrePropio: formulario.actuaEnNombrePropio,
      tutelado: !formulario.actuaEnNombrePropio ? {
        nombre: formulario.nombreTutelado,
        identificacion: formulario.identificacionTutelado,
        relacion: formulario.relacionConTutelado
      } : null,
      accionado: {
        entidad: formulario.entidadAccionada,
        representante: formulario.representanteLegal,
        direccion: formulario.direccionEntidad,
        tipo: formulario.tipoEntidad
      },
      derechosVulnerados: formulario.derechosVulnerados,
      hechos: formulario.hechos,
      pretension: formulario.pretension,
      medidasProvisionales: formulario.medidasProvisionalesRequeridas,
      evidencias: formulario.evidencias.map(e => ({ nombre: e.name, tamaño: e.size })),
      analisisIA: formulario.analisisIA,
      marcoLegal: {
        constitucion: 'Art. 86 - Acción de Tutela',
        decreto: 'Decreto 2591 de 1991',
        plazoFallo: '10 días hábiles'
      }
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `accion-tutela-${formulario.codigoTutela}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return `pdfs/accion-tutela-${formulario.codigoTutela}.pdf`;
  };

  const iniciarDependencia = async () => {
    try {
      if (!formulario.analisisIA) {
        alert('Por favor, primero realiza el análisis con IA.');
        return;
      }

      const codigo = formulario.codigoTutela || generarCodigoTutela();
      const rutaPDF = generarPDFTutela();

      const datosDependencia = {
        modulo: 'Acción de Tutela',
        titulo: `Tutela - ${formulario.nombreTutelante} vs ${formulario.entidadAccionada}`,
        descripcion: formulario.hechos.substring(0, 200) + '...',
        tipo: 'accion_tutela',
        datosCliente: {
          nombre: formulario.nombreTutelante,
          email: formulario.emailTutelante,
          telefono: formulario.telefonoTutelante,
          identificacion: formulario.identificacionTutelante
        },
        datosUbicacion: {
          municipio: formulario.municipioTutelante,
          departamento: formulario.departamentoTutelante,
          pais: 'Colombia'
        },
        resultado: formulario.analisisIA,
        codigoCaso: codigo,
        pdfsAdicionales: [
          {
            ruta: rutaPDF,
            tipo: 'tutela_principal',
            nombre: `Acción de Tutela - ${codigo}.pdf`
          },
          ...formulario.evidencias.map((ev, index) => ({
            ruta: `pdfs/evidencia-${index + 1}-${codigo}.pdf`,
            tipo: 'evidencia',
            nombre: ev.name
          }))
        ]
      };

      await generarDependencia(datosDependencia);

    } catch (error) {
      console.error('Error al iniciar dependencia:', error);
      alert('Error al generar la dependencia. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              <Gavel style={{ marginRight: '1rem', display: 'inline' }} />
              Acción de Tutela
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 1rem' }}>
              Protección de Derechos Fundamentales
            </p>
            <p style={{ fontSize: '1rem', opacity: 0.85 }}>
              Art. 86 Constitución Política | Decreto 2591 de 1991 | Plazo de fallo: 10 días hábiles
            </p>
          </div>

          {/* Indicador de pasos */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            {pasos.map((paso) => (
              <div key={paso.numero} style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '0.75rem 1rem',
                borderRadius: '2rem',
                background: paso.numero <= pasoActual ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: paso.numero === pasoActual ? '2px solid white' : '2px solid transparent',
                cursor: 'pointer'
              }}
              onClick={() => setPasoActual(paso.numero)}
              >
                <paso.icono size={18} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontWeight: paso.numero === pasoActual ? 'bold' : 'normal', fontSize: '0.9rem' }}>
                  {paso.numero}. {paso.titulo}
                </span>
              </div>
            ))}
          </div>

          <Card style={{ padding: '2rem', background: 'white' }}>
            {/* Paso 1: Tutelante */}
            {pasoActual === 1 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <User style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Datos del Tutelante
                </h2>

                <div style={{ marginBottom: '2rem', padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #fbbf24' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <input
                      type="checkbox"
                      id="actuaEnNombrePropio"
                      checked={formulario.actuaEnNombrePropio}
                      onChange={(e) => handleInputChange('actuaEnNombrePropio', e.target.checked)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <Label htmlFor="actuaEnNombrePropio" style={{ fontWeight: 'bold', color: '#78350f', cursor: 'pointer' }}>
                      Actúo en mi propio nombre
                    </Label>
                  </div>
                  {!formulario.actuaEnNombrePropio && (
                    <p style={{ color: '#92400e', fontSize: '0.85rem', marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                      En el siguiente paso deberá proporcionar los datos de la persona a cuyo nombre presenta la tutela
                    </p>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <Label>Nombre Completo *</Label>
                    <Input
                      value={formulario.nombreTutelante}
                      onChange={(e) => handleInputChange('nombreTutelante', e.target.value)}
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <Label>Identificación *</Label>
                    <Input
                      value={formulario.identificacionTutelante}
                      onChange={(e) => handleInputChange('identificacionTutelante', e.target.value)}
                      placeholder="Cédula de ciudadanía"
                    />
                  </div>
                  <div>
                    <Label>Teléfono *</Label>
                    <Input
                      value={formulario.telefonoTutelante}
                      onChange={(e) => handleInputChange('telefonoTutelante', e.target.value)}
                      placeholder="Teléfono de contacto"
                    />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={formulario.emailTutelante}
                      onChange={(e) => handleInputChange('emailTutelante', e.target.value)}
                      placeholder="Correo electrónico"
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label>Dirección *</Label>
                    <Input
                      value={formulario.direccionTutelante}
                      onChange={(e) => handleInputChange('direccionTutelante', e.target.value)}
                      placeholder="Dirección completa"
                    />
                  </div>
                  <div>
                    <Label>Municipio *</Label>
                    <Input
                      value={formulario.municipioTutelante}
                      onChange={(e) => handleInputChange('municipioTutelante', e.target.value)}
                      placeholder="Municipio"
                    />
                  </div>
                  <div>
                    <Label>Departamento *</Label>
                    <Select
                      value={formulario.departamentoTutelante}
                      onValueChange={(value) => handleInputChange('departamentoTutelante', value)}
                    >
                      <option value="">Seleccionar</option>
                      {departamentos.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                {!formulario.actuaEnNombrePropio && (
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #3b82f6' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '1rem' }}>
                      Datos del Tutelado (a cuyo nombre actúa)
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                      <div>
                        <Label>Nombre del Tutelado *</Label>
                        <Input
                          value={formulario.nombreTutelado}
                          onChange={(e) => handleInputChange('nombreTutelado', e.target.value)}
                          placeholder="Nombre completo"
                        />
                      </div>
                      <div>
                        <Label>Identificación *</Label>
                        <Input
                          value={formulario.identificacionTutelado}
                          onChange={(e) => handleInputChange('identificacionTutelado', e.target.value)}
                          placeholder="Cédula o documento"
                        />
                      </div>
                      <div>
                        <Label>Relación con el tutelado *</Label>
                        <Input
                          value={formulario.relacionConTutelado}
                          onChange={(e) => handleInputChange('relacionConTutelado', e.target.value)}
                          placeholder="Ej: Padre, Madre, Hijo, Apoderado, etc."
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Paso 2: Accionado */}
            {pasoActual === 2 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Building style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Entidad Accionada
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <Label>Nombre de la Entidad o Particular *</Label>
                    <Input
                      value={formulario.entidadAccionada}
                      onChange={(e) => handleInputChange('entidadAccionada', e.target.value)}
                      placeholder="Nombre completo de la entidad accionada"
                    />
                  </div>
                  <div>
                    <Label>Tipo de Entidad *</Label>
                    <Select
                      value={formulario.tipoEntidad}
                      onValueChange={(value) => handleInputChange('tipoEntidad', value)}
                    >
                      <option value="">Seleccionar</option>
                      {tiposEntidad.map((tipo) => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                      ))}
                    </Select>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label>Representante Legal (si se conoce)</Label>
                    <Input
                      value={formulario.representanteLegal}
                      onChange={(e) => handleInputChange('representanteLegal', e.target.value)}
                      placeholder="Nombre del representante legal"
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Label>Dirección de la Entidad *</Label>
                    <Input
                      value={formulario.direccionEntidad}
                      onChange={(e) => handleInputChange('direccionEntidad', e.target.value)}
                      placeholder="Dirección completa de notificación"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Paso 3: Derechos Vulnerados */}
            {pasoActual === 3 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Shield style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Derechos Fundamentales Vulnerados
                </h2>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#dbeafe', borderRadius: '0.5rem', border: '1px solid #3b82f6' }}>
                  <p style={{ color: '#1e40af', fontSize: '0.9rem', margin: 0 }}>
                    <strong>📝 Instrucciones:</strong> Seleccione todos los derechos fundamentales que considera vulnerados o amenazados
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  {derechosFundamentales.map((derecho) => (
                    <div
                      key={derecho.value}
                      onClick={() => toggleDerecho(derecho.value)}
                      style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: formulario.derechosVulnerados.includes(derecho.value) ? '2px solid #dc2626' : '2px solid #e5e7eb',
                        background: formulario.derechosVulnerados.includes(derecho.value) ? '#fee2e2' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle 
                          size={20} 
                          style={{ 
                            color: formulario.derechosVulnerados.includes(derecho.value) ? '#dc2626' : '#9ca3af',
                            marginRight: '0.75rem'
                          }} 
                        />
                        <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                          {derecho.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {formulario.derechosVulnerados.includes('otro') && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <Label>Especifique otro derecho fundamental *</Label>
                    <Input
                      value={formulario.otroDerecho}
                      onChange={(e) => handleInputChange('otroDerecho', e.target.value)}
                      placeholder="Describa el derecho fundamental vulnerado"
                    />
                  </div>
                )}

                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #22c55e' }}>
                  <p style={{ color: '#166534', fontWeight: 'bold', margin: 0 }}>
                    ✅ Derechos seleccionados: {formulario.derechosVulnerados.length}
                  </p>
                </div>
              </div>
            )}

            {/* Paso 4: Hechos */}
            {pasoActual === 4 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <FileText style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Narración de los Hechos
                </h2>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #fbbf24' }}>
                  <p style={{ color: '#78350f', fontSize: '0.9rem', margin: 0 }}>
                    <strong>📝 Instrucciones:</strong> Narre de manera clara, cronológica y completa los hechos que dan lugar a la acción de tutela. Sea específico con fechas, lugares y actuaciones.
                  </p>
                </div>

                <div>
                  <Label>Narración de los Hechos *</Label>
                  <Textarea
                    value={formulario.hechos}
                    onChange={(e) => handleInputChange('hechos', e.target.value)}
                    placeholder="Describa de manera clara y cronológica los hechos que fundamentan la acción de tutela..."
                    rows={12}
                    style={{ fontSize: '1rem', lineHeight: '1.6' }}
                  />
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    {formulario.hechos.length} caracteres
                  </p>
                </div>
              </div>
            )}

            {/* Paso 5: Pretensión */}
            {pasoActual === 5 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Target style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Pretensión
                </h2>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#dbeafe', borderRadius: '0.5rem', border: '1px solid #3b82f6' }}>
                  <p style={{ color: '#1e40af', fontSize: '0.9rem', margin: 0 }}>
                    <strong>🎯 Instrucciones:</strong> Indique claramente qué solicita al juez. Sea específico en la protección que requiere.
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <Label>¿Qué solicita al juez de tutela? *</Label>
                  <Textarea
                    value={formulario.pretension}
                    onChange={(e) => handleInputChange('pretension', e.target.value)}
                    placeholder="Solicito al señor juez de tutela que ORDENE a la entidad accionada..."
                    rows={8}
                    style={{ fontSize: '1rem', lineHeight: '1.6' }}
                  />
                </div>

                <div>
                  <Label>Medidas Provisionales (si requiere protección inmediata)</Label>
                  <Textarea
                    value={formulario.medidasProvisionalesRequeridas}
                    onChange={(e) => handleInputChange('medidasProvisionalesRequeridas', e.target.value)}
                    placeholder="Si existe perjuicio irremediable, solicite medidas provisionales urgentes..."
                    rows={5}
                  />
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    Las medidas provisionales se solicitan cuando existe riesgo inminente de daño irreparable
                  </p>
                </div>
              </div>
            )}

            {/* Paso 6: Evidencias */}
            {pasoActual === 6 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Upload style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Evidencias y Pruebas
                </h2>

                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: '#f3f4f6', borderRadius: '0.5rem', border: '2px dashed #9ca3af' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <Upload size={48} style={{ color: '#6b7280', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>
                      Adjunte pruebas que respalden su tutela
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                      Documentos, imágenes, historias clínicas, comunicaciones, etc.
                    </p>
                  </div>
                  
                  <input
                    type="file"
                    multiple
                    onChange={handleCargarEvidencia}
                    style={{ display: 'none' }}
                    id="evidencias-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label 
                    htmlFor="evidencias-upload"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '1rem',
                      background: 'linear-gradient(45deg, #dc2626, #991b1b)',
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
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
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1rem',
                          background: '#f8fafc',
                          borderRadius: '0.5rem',
                          border: '1px solid #e2e8f0'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <FileCheck size={24} style={{ color: '#10b981', marginRight: '0.75rem' }} />
                            <div>
                              <p style={{ fontWeight: 'bold', color: '#374151', margin: 0, fontSize: '0.95rem' }}>
                                {archivo.name}
                              </p>
                              <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>
                                {(archivo.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={() => eliminarEvidencia(index)}
                            style={{
                              background: '#ef4444',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              color: 'white',
                              fontSize: '0.875rem',
                              cursor: 'pointer'
                            }}
                          >
                            Eliminar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Paso 7: Análisis IA */}
            {pasoActual === 7 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <Brain style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Análisis Jurídico con IA
                </h2>

                {!formulario.analisisIA ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <Brain size={64} style={{ color: '#dc2626', margin: '0 auto 1.5rem' }} />
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem' }}>
                      Análisis de Procedencia de Tutela
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                      4 expertos constitucionalistas analizarán su caso y determinarán:
                    </p>
                    
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '2rem',
                      maxWidth: '800px',
                      margin: '0 auto 2rem'
                    }}>
                      {[
                        { icon: Shield, text: 'Procedencia de la tutela' },
                        { icon: Scale, text: 'Jurisprudencia aplicable' },
                        { icon: Lightbulb, text: 'Recomendaciones' },
                        { icon: Clock, text: 'Plazos procesales' }
                      ].map((item, index) => (
                        <div key={index} style={{ textAlign: 'center', padding: '1rem' }}>
                          <item.icon size={32} style={{ color: '#dc2626', margin: '0 auto 0.5rem' }} />
                          <p style={{ color: '#374151', fontSize: '0.9rem', margin: 0 }}>
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={analisisConIA}
                      disabled={cargandoIA}
                      style={{
                        background: cargandoIA ? '#9ca3af' : 'linear-gradient(45deg, #dc2626, #991b1b)',
                        border: 'none',
                        padding: '1rem 2rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: cargandoIA ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 auto'
                      }}
                    >
                      {cargandoIA ? (
                        <>
                          <Clock style={{ marginRight: '0.5rem' }} className="animate-spin" />
                          Analizando...
                        </>
                      ) : (
                        <>
                          <Brain style={{ marginRight: '0.5rem' }} />
                          Iniciar Análisis con IA
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div>
                    {/* Especialistas */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                      👥 Consejo de Constitucionalistas
                    </h3>
                    
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                      {formulario.analisisIA.especialistas.map((esp, index) => (
                        <Card key={index} style={{ 
                          padding: '1.5rem',
                          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                          border: '1px solid #fca5a5'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <Users size={24} style={{ color: '#dc2626', marginRight: '0.75rem' }} />
                            <div>
                              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                                {esp.nombre}
                              </h4>
                              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                                {esp.especialidad}
                              </p>
                            </div>
                          </div>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0 }}>
                            {esp.analisis}
                          </p>
                        </Card>
                      ))}
                    </div>

                    {/* Jurisprudencia */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                      ⚖️ Jurisprudencia Aplicable
                    </h3>
                    
                    <div style={{ marginBottom: '2rem' }}>
                      {formulario.analisisIA.jurisprudenciaAplicable.map((juris, index) => (
                        <div key={index} style={{
                          padding: '1rem',
                          background: '#f0f9ff',
                          borderLeft: '4px solid #3b82f6',
                          marginBottom: '0.75rem'
                        }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e40af', margin: '0 0 0.25rem 0' }}>
                            {juris.sentencia}
                          </h4>
                          <p style={{ fontSize: '0.9rem', color: '#374151', margin: 0 }}>
                            {juris.descripcion}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Normatividad */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                      📚 Marco Legal
                    </h3>
                    
                    <div style={{ marginBottom: '2rem' }}>
                      {formulario.analisisIA.normatividadAplicable.map((norma, index) => (
                        <div key={index} style={{
                          padding: '1rem',
                          background: '#fef3c7',
                          borderLeft: '4px solid #fbbf24',
                          marginBottom: '0.75rem'
                        }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#78350f', margin: '0 0 0.25rem 0' }}>
                            {norma.norma}
                          </h4>
                          <p style={{ fontSize: '0.9rem', color: '#374151', margin: 0 }}>
                            {norma.descripcion}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Conclusión */}
                    <div style={{
                      padding: '1.5rem',
                      background: '#f0fdf4',
                      borderRadius: '0.5rem',
                      border: '2px solid #22c55e',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                        <CheckCircle size={24} style={{ marginRight: '0.5rem' }} />
                        Conclusión
                      </h3>
                      <p style={{ color: '#166534', lineHeight: '1.6', margin: 0 }}>
                        {formulario.analisisIA.conclusion}
                      </p>
                    </div>

                    {/* Recomendaciones */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                      💡 Recomendaciones
                    </h3>
                    
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                      {formulario.analisisIA.recomendaciones.map((rec, index) => (
                        <li key={index} style={{
                          padding: '0.75rem 1rem',
                          background: '#fce7f3',
                          borderLeft: '4px solid #ec4899',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ color: '#831843' }}>✓ {rec}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Plazos */}
                    <div style={{
                      padding: '1.5rem',
                      background: '#ede9fe',
                      borderRadius: '0.5rem',
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#6d28d9', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                        <Clock size={24} style={{ marginRight: '0.5rem' }} />
                        Plazos Procesales
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                        {Object.entries(formulario.analisisIA.plazos).map(([key, value]) => (
                          <div key={key}>
                            <p style={{ fontSize: '0.85rem', color: '#6d28d9', margin: '0 0 0.25rem 0', textTransform: 'capitalize' }}>
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </p>
                            <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#4c1d95', margin: 0 }}>
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Paso 8: Revisión y Generación */}
            {pasoActual === 8 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>
                  <CheckCircle style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Revisión Final
                </h2>

                {/* Resumen */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                    📋 Resumen de la Acción de Tutela
                  </h3>

                  <Card style={{ padding: '1.5rem', background: '#f8fafc', marginBottom: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Tutelante:</p>
                        <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                          {formulario.nombreTutelante}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Accionado:</p>
                        <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                          {formulario.entidadAccionada}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Derechos:</p>
                        <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                          {formulario.derechosVulnerados.length} derecho(s)
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Evidencias:</p>
                        <p style={{ fontWeight: 'bold', color: '#374151', margin: 0 }}>
                          {formulario.evidencias.length} archivo(s)
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Acciones */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                    <Card style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '2px solid #3b82f6' }}>
                      <Download style={{ fontSize: '3rem', color: '#1d4ed8', marginBottom: '1rem', display: 'block', margin: '0 auto 1rem' }} size={48} />
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e40af' }}>
                        Generar PDF
                      </h3>
                      <p style={{ color: '#374151', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        Descargar acción de tutela en formato PDF profesional
                      </p>
                      <Button
                        onClick={() => {
                          generarCodigoTutela();
                          generarPDFTutela();
                        }}
                        style={{ 
                          background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          borderRadius: '0.5rem',
                          color: 'white',
                          cursor: 'pointer',
                          width: '100%'
                        }}
                      >
                        <Download style={{ marginRight: '0.5rem' }} />
                        Descargar PDF
                      </Button>
                    </Card>

                    <Card style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '2px solid #22c55e' }}>
                      <Target style={{ fontSize: '3rem', color: '#16a34a', marginBottom: '1rem', display: 'block', margin: '0 auto 1rem' }} size={48} />
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#15803d' }}>
                        Generar Dependencia
                      </h3>
                      <p style={{ color: '#374151', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        Crear actividad en el sistema con todos los documentos
                      </p>
                      <Button
                        onClick={iniciarDependencia}
                        disabled={generandoDependencia || !formulario.analisisIA}
                        style={{ 
                          background: generandoDependencia ? '#9ca3af' : 'linear-gradient(45deg, #22c55e, #16a34a)',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          borderRadius: '0.5rem',
                          color: 'white',
                          cursor: generandoDependencia ? 'not-allowed' : 'pointer',
                          width: '100%',
                          opacity: !formulario.analisisIA ? 0.5 : 1
                        }}
                      >
                        {generandoDependencia ? (
                          <>
                            <Clock style={{ marginRight: '0.5rem' }} className="animate-spin" />
                            Generando...
                          </>
                        ) : (
                          <>
                            <Target style={{ marginRight: '0.5rem' }} />
                            Generar Dependencia
                          </>
                        )}
                      </Button>

                      {actividadCreada && (
                        <div style={{
                          marginTop: '1rem',
                          padding: '1rem',
                          background: '#f0fdf4',
                          borderRadius: '0.5rem',
                          border: '1px solid #86efac'
                        }}>
                          <p style={{ color: '#15803d', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                            ✅ Dependencia Creada
                          </p>
                          <p style={{ fontSize: '0.85rem', color: '#166534', margin: '0.25rem 0' }}>
                            <strong>Código:</strong> {actividadCreada.codigo_caso || formulario.codigoTutela}
                          </p>
                          <p style={{ fontSize: '0.85rem', color: '#166534', margin: '0.25rem 0' }}>
                            <strong>ID:</strong> {actividadCreada.id}
                          </p>
                        </div>
                      )}
                    </Card>
                  </div>
                </div>

                {/* Botón Finalizar */}
                <div style={{
                  marginTop: '2rem',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderRadius: '1rem',
                  textAlign: 'center',
                  border: '2px solid #0ea5e9'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0c4a6e', marginBottom: '1rem' }}>
                    ¿Desea finalizar y volver al inicio?
                  </h3>
                  <p style={{ color: '#075985', marginBottom: '1.5rem', fontSize: '1rem' }}>
                    Su acción de tutela ha sido procesada exitosamente. Puede volver a la página principal.
                  </p>
                  <Button
                    onClick={() => navigate('/')}
                    style={{
                      background: 'linear-gradient(45deg, #0ea5e9, #0284c7)',
                      border: 'none',
                      padding: '1rem 2.5rem',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: '0.5rem',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                  >
                    <Home style={{ marginRight: '0.75rem' }} size={24} />
                    Finalizar y Volver al Inicio
                  </Button>
                </div>
              </div>
            )}

            {/* Navegación */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <Button
                type="button"
                onClick={pasoAnterior}
                disabled={pasoActual === 1}
                style={{ 
                  background: pasoActual === 1 ? '#9ca3af' : 'linear-gradient(45deg, #6b7280, #4b5563)',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: pasoActual === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ArrowLeft style={{ marginRight: '0.5rem' }} />
                Anterior
              </Button>

              {pasoActual < pasos.length && (
                <Button
                  type="button"
                  onClick={siguientePaso}
                  style={{ 
                    background: 'linear-gradient(45deg, #dc2626, #991b1b)',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  Siguiente
                  <ArrowRight style={{ marginLeft: '0.5rem' }} />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccionTutela;
