import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { useDatabaseSync } from '../../../hooks/useDatabaseSync';
import { 
  Brain, 
  Users, 
  User,
  MapPin, 
  FileText, 
  Mic, 
  MicOff, 
  Download, 
  AlertCircle,
  Clock,
  Target,
  Globe,
  Gavel,
  Star,
  Info
} from 'lucide-react';

const ConsejoEtnoIA = () => {
  // Hook para sincronización con base de datos
  const { 
    syncStatus, 
    syncAnalisisIA, 
    cargarPueblosIndigenas, 
    cargarComunidadesAfro, 
    forzarSync 
  } = useDatabaseSync();

  const [datosCliente, setDatosCliente] = useState({
    tipo: '',
    nombre: '',
    comunidad: '',
    pueblo: '',
    telefono: '',
    email: '',
    identificacion: ''
  });

  const [datosUbicacion, setDatosUbicacion] = useState({
    municipio: '',
    departamento: '',
    resguardo: '',
    territorio: '',
    coordenadas: '',
    codigoGenerado: ''
  });

  const [casoEtnico, setCasoEtnico] = useState({
    tipoCaso: '',
    derechoVulnerado: '',
    narracion: '',
    contextoCultural: '',
    impactoTerritorial: '',
    timestamp: null,
    version: 1
  });

  const [consejoIA, setConsejoIA] = useState({
    cargando: false,
    resultado: null,
    error: null
  });


  const [pueblosIndigenas, setPueblosIndigenas] = useState([]);
  const [comunidadesAfro, setComunidadesAfro] = useState([]);
  const [grabando, setGrabando] = useState(false);
  const [archivoAudio, setArchivoAudio] = useState(null);
  const [archivosEvidencia, setArchivosEvidencia] = useState([]);

  const tiposCliente = [
    { value: 'pueblo-indigena', label: 'Pueblo Indígena' },
    { value: 'comunidad-afro', label: 'Comunidad Afrodescendiente' },
    { value: 'pueblo-rom', label: 'Pueblo Rom (Gitano)' },
    { value: 'lider-comunitario', label: 'Líder Comunitario' },
    { value: 'autoridad-tradicional', label: 'Autoridad Tradicional' }
  ];

  const tiposCasoEtnico = [
    'Consulta Previa',
    'Derechos Territoriales',
    'Protección Cultural',
    'Jurisdicción Especial Indígena',
    'Recursos Naturales',
    'Medicina Tradicional',
    'Educación Propia',
    'Idiomas Ancestrales',
    'Sitios Sagrados',
    'Conflictos Interétnicos',
    'Desarrollo Territorial',
    'Autonomía Política',
    'Otro'
  ];

  const derechosEtnicos = [
    'Derecho a la Consulta Previa',
    'Derecho al Territorio',
    'Derecho a la Autonomía',
    'Derecho a la Identidad Cultural',
    'Derecho a la Justicia Propia',
    'Derecho a la Participación',
    'Derecho a los Recursos Naturales',
    'Derecho a la Educación Propia',
    'Derecho a la Salud Tradicional',
    'Derecho al Idioma Propio',
    'Derecho al Desarrollo Propio',
    'Derecho a la Protección del Patrimonio'
  ];

  const departamentos = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá',
    'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó',
    'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira',
    'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío',
    'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima',
    'Valle del Cauca', 'Vaupés', 'Vichada'
  ];

  useEffect(() => {
    cargarPueblosIndigenasData();
    cargarComunidadesAfroData();
  }, [cargarPueblosIndigenas, cargarComunidadesAfro]);

  const cargarPueblosIndigenasData = async () => {
    try {
      const resultado = await cargarPueblosIndigenas();
      setPueblosIndigenas(resultado.data);
      
      if (resultado.cached) {
        console.log('📱 Datos de pueblos indígenas cargados desde caché');
      } else if (resultado.fallback) {
        console.log('⚠️ Usando datos de ejemplo para pueblos indígenas');
      } else {
        console.log('✅ Pueblos indígenas sincronizados desde base de datos');
      }
    } catch (error) {
      console.error('❌ Error cargando pueblos indígenas:', error);
      // Datos de ejemplo como último recurso
      setPueblosIndigenas([
        { id: 1, nombre: 'Wayuu', territorio: 'La Guajira' },
        { id: 2, nombre: 'Nasa (Páez)', territorio: 'Cauca' },
        { id: 3, nombre: 'Embera', territorio: 'Chocó' },
        { id: 4, nombre: 'Kogui', territorio: 'Sierra Nevada' },
        { id: 5, nombre: 'Arhuaco', territorio: 'Sierra Nevada' },
        { id: 6, nombre: 'Wiwa', territorio: 'Sierra Nevada' },
        { id: 7, nombre: 'Kankuamo', territorio: 'Sierra Nevada' },
        { id: 8, nombre: 'Zenú', territorio: 'Córdoba' },
        { id: 9, nombre: 'Inga', territorio: 'Putumayo' },
        { id: 10, nombre: 'Pastos', territorio: 'Nariño' }
      ]);
    }
  };

  const cargarComunidadesAfroData = async () => {
    try {
      const resultado = await cargarComunidadesAfro();
      setComunidadesAfro(resultado.data);
      
      if (resultado.cached) {
        console.log('📱 Datos de comunidades afro cargados desde caché');
      } else if (resultado.fallback) {
        console.log('⚠️ Usando datos de ejemplo para comunidades afro');
      } else {
        console.log('✅ Comunidades afro sincronizadas desde base de datos');
      }
    } catch (error) {
      console.error('❌ Error cargando comunidades afro:', error);
      // Datos de ejemplo como último recurso
      setComunidadesAfro([
        { id: 1, nombre: 'San Basilio de Palenque', territorio: 'Bolívar' },
        { id: 2, nombre: 'La Boquilla', territorio: 'Cartagena' },
        { id: 3, nombre: 'Tumaco', territorio: 'Nariño' },
        { id: 4, nombre: 'Quibdó', territorio: 'Chocó' },
        { id: 5, nombre: 'Buenaventura', territorio: 'Valle del Cauca' }
      ]);
    }
  };

  const generarCodigo = () => {
    const fecha = new Date();
    const codigo = `ETNOIA-${datosUbicacion.municipio?.substring(0, 3).toUpperCase() || 'ETN'}-${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setDatosUbicacion(prev => ({ ...prev, codigoGenerado: codigo }));
  };

  const startRecording = () => {
    setGrabando(true);
    setTimeout(() => {
      setGrabando(false);
      setArchivoAudio({
        nombre: `audio_etnico_${Date.now()}.wav`,
        duracion: '00:00:20',
        tamaño: '2.8 MB'
      });
    }, 3000);
  };

  const stopRecording = () => {
    setGrabando(false);
  };

  const transcribirAudio = async () => {
    if (!archivoAudio) return;
    
    setConsejoIA(prev => ({ ...prev, cargando: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const textoTranscrito = `Transcripción del audio: "Necesitamos orientación sobre nuestros derechos territoriales. Una empresa minera está realizando actividades en nuestro territorio sin haber realizado consulta previa con nuestra comunidad. Esto afecta nuestros sitios sagrados y fuentes de agua. Somos una comunidad indígena reconocida constitucionalmente y requerimos asesoría especializada sobre cómo proteger nuestros derechos ancestrales y territoriales según el Convenio 169 de la OIT y la legislación colombiana."`;
      
      setCasoEtnico(prev => ({
        ...prev,
        narracion: textoTranscrito,
        timestamp: new Date().toISOString(),
        version: prev.version + 1
      }));
      
      setConsejoIA(prev => ({ ...prev, cargando: false }));
    } catch (error) {
      setConsejoIA(prev => ({ 
        ...prev, 
        cargando: false, 
        error: 'Error en la transcripción del audio' 
      }));
    }
  };

  const consultarEtnoIA = async () => {
    if (!casoEtnico.narracion.trim()) {
      setConsejoIA(prev => ({ 
        ...prev, 
        error: 'Por favor, ingrese una narración del caso étnico' 
      }));
      return;
    }

    setConsejoIA(prev => ({ ...prev, cargando: true, error: null }));

    try {
      // Simular consulta especializada
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const analisisEspecializado = {
        // Análisis Jurídico Étnico
        analisisJuridico: {
          especialista: "Dr. Juan Carlos Henao - Experto en Derecho Indígena",
          analisis: `El caso presenta elementos constitucionales y convencionales claros relacionados con derechos étnicos. Según el Convenio 169 de la OIT (ratificado por Ley 21 de 1991) y la Constitución Política de Colombia (Art. 7, 330), las comunidades étnicas tienen derecho a la consulta previa, libre e informada cuando se prevean medidas que los afecten directamente. La jurisprudencia de la Corte Constitucional (T-025/04, SU-039/97) ha establecido que este derecho es fundamental y de carácter prevalente.`,
          normativa: [
            "Convenio 169 OIT (Arts. 6, 7, 15)",
            "Constitución Política (Arts. 7, 330)",
            "Ley 21 de 1991",
            "Decreto 1320 de 1998",
            "Sentencia T-025/04",
            "Sentencia SU-039/97"
          ],
          recomendaciones: [
            "Iniciar acción de tutela para protección del derecho a la consulta previa",
            "Solicitar medidas cautelares para suspender actividades",
            "Documentar afectaciones territoriales y culturales",
            "Contactar con Ministerio del Interior para protocolo de consulta"
          ]
        },

        // Análisis Cultural y Territorial
        analisisCultural: {
          especialista: "Dra. María Eugenia Chaves - Antropóloga Jurídica",
          analisis: `El caso involucra elementos de profunda significación cultural y territorial para la comunidad. La presencia de sitios sagrados y fuentes de agua indica una relación ancestral con el territorio que está protegida constitucionalmente. La falta de consulta previa constituye una vulneración grave de la autonomía territorial y el derecho a la identidad cultural. Es fundamental realizar un estudio de impacto sociocultural que documente la afectación a las prácticas tradicionales y la cosmovisión de la comunidad.`,
          impactos: [
            "Afectación de sitios sagrados y lugares ceremoniales",
            "Contaminación de fuentes de agua tradicionales",
            "Pérdida de acceso a recursos naturales esenciales",
            "Alteración de prácticas culturales y espirituales",
            "Riesgo de desplazamiento y pérdida territorial"
          ],
          medidasProteccion: [
            "Caracterización de sitios culturales afectados",
            "Documentación fotográfica y testimonial",
            "Estudios de impacto ambiental y cultural",
            "Plan de salvaguardia cultural inmediato"
          ]
        },

        // Análisis Ambiental y Territorial
        analisisAmbiental: {
          especialista: "Dr. Ricardo Rojas - Especialista en Derecho Ambiental",
          analisis: `Las actividades mineras sin consulta previa representan una grave amenaza para el equilibrio ecológico del territorio. La Constitución reconoce la relación especial de las comunidades étnicas con sus territorios (Art. 330). La Ley 99 de 1993 establece la obligatoriedad de estudios de impacto ambiental. La contaminación de fuentes de agua constituye una vulneración del derecho fundamental al agua y al ambiente sano.`,
          riesgosAmbientales: [
            "Contaminación hídrica por actividades extractivas",
            "Deforestación y pérdida de biodiversidad",
            "Alteración de ecosistemas estratégicos",
            "Afectación de recursos naturales tradicionales",
            "Riesgo de desastres ambientales"
          ],
          accionesRecomendadas: [
            "Solicitar suspensión inmediata de actividades",
            "Exigir estudios de impacto ambiental rigurosos",
            "Activar protocolo de protección de fuentes hídricas",
            "Coordinación con autoridades ambientales"
          ]
        },

        // Análisis de Jurisprudencia Étnica
        analisisJurisprudencial: {
          especialista: "Dra. Luz Marina Patiño - Experta en Jurisprudencia Constitucional",
          analisis: `La Corte Constitucional ha desarrollado una amplia jurisprudencia sobre consulta previa. Los precedentes relevantes establecen que: 1) La consulta debe ser previa, no posterior; 2) Debe ser libre, sin coerción; 3) Debe ser informada con datos completos; 4) Debe buscar el consentimiento, no solo la notificación; 5) El resultado es vinculante. La ausencia de consulta invalida cualquier autorización otorgada.`,
          precedentesRelevantes: [
            {
              sentencia: "T-428/92",
              tema: "Consulta previa obligatoria",
              ratio: "La consulta previa es un derecho fundamental de las comunidades étnicas"
            },
            {
              sentencia: "SU-039/97",
              tema: "Participación en decisiones",
              ratio: "Las comunidades tienen derecho a participar en decisiones que los afecten"
            },
            {
              sentencia: "T-025/04",
              tema: "Desplazamiento y territorios",
              ratio: "Protección especial de territorios ancestrales"
            },
            {
              sentencia: "T-129/11",
              tema: "Exploración petrolera",
              ratio: "Suspensión de actividades sin consulta previa"
            }
          ],
          lineaJurisprudencial: "Protección reforzada de derechos territoriales étnicos"
        },

        // Análisis de Procedimiento
        analisisProcedimental: {
          especialista: "Dr. Andrés Felipe Cárdenas - Litigante Estratégico",
          analisis: `El caso requiere una estrategia jurídica integral que combine: 1) Acción de tutela para protección inmediata; 2) Medidas cautelares para suspensión de actividades; 3) Denuncia ante organismos de control (Procuraduría, Defensoría); 4) Activación de mecanismos internacionales (Comisión Interamericana de Derechos Humanos). Es fundamental documentar exhaustivamente todas las afectaciones y construir un expediente sólido.`,
          rutaProcedimental: [
            {
              paso: 1,
              accion: "Acción de Tutela",
              plazo: "Inmediato",
              objetivo: "Protección de derechos fundamentales"
            },
            {
              paso: 2,
              accion: "Medidas Cautelares",
              plazo: "3 días",
              objetivo: "Suspensión de actividades mineras"
            },
            {
              paso: 3,
              accion: "Denuncia Administrativa",
              plazo: "5 días",
              objetivo: "Activar control de legalidad"
            },
            {
              paso: 4,
              accion: "Consulta Previa Protocolo",
              plazo: "15 días",
              objetivo: "Iniciar proceso formal de consulta"
            },
            {
              paso: 5,
              accion: "Seguimiento Internacional",
              plazo: "30 días",
              objetivo: "Activar mecanismos CIDH"
            }
          ],
          documentosRequeridos: [
            "Certificación de existencia de la comunidad",
            "Título de propiedad o reconocimiento territorial",
            "Pruebas de afectación (fotos, videos, testimonios)",
            "Estudios técnicos (si están disponibles)",
            "Actas de asambleas comunitarias",
            "Documentos de autoridades tradicionales"
          ]
        },

        // Análisis de Convenios Internacionales
        analisisInternacional: {
          especialista: "Dra. Sandra Milena Rodríguez - Derecho Internacional",
          analisis: `Colombia ha ratificado diversos instrumentos internacionales que protegen los derechos de pueblos indígenas y comunidades étnicas. El Convenio 169 de la OIT es el principal instrumento vinculante. La Declaración de las Naciones Unidas sobre los Derechos de los Pueblos Indígenas (DNUDPI) complementa este marco. Estos instrumentos establecen estándares mínimos de protección que el Estado colombiano debe garantizar.`,
          instrumentosInternacionales: [
            {
              instrumento: "Convenio 169 OIT",
              articulos: "6, 7, 15, 16",
              materia: "Consulta previa, territorios, recursos naturales"
            },
            {
              instrumento: "DNUDPI",
              articulos: "10, 19, 26, 32",
              materia: "Consentimiento, participación, territorios"
            },
            {
              instrumento: "Pacto Internacional DESC",
              articulos: "1, 11, 12",
              materia: "Autodeterminación, vivienda, salud"
            },
            {
              instrumento: "CADH",
              articulos: "21, 23, 25",
              materia: "Propiedad, participación, protección judicial"
            }
          ],
          mecanismosSeguimiento: [
            "Comisión Interamericana de Derechos Humanos",
            "Relatoría Especial sobre Pueblos Indígenas de ONU",
            "Mecanismo de Expertos sobre Derechos de Pueblos Indígenas",
            "Comité DESC de Naciones Unidas"
          ]
        },

        // Análisis de Riesgos y Oportunidades
        analisisRiesgos: {
          riesgosIdentificados: [
            {
              riesgo: "Continuación de actividades extractivas",
              probabilidad: "Alta",
              impacto: "Crítico",
              mitigacion: "Acción de tutela urgente con medidas cautelares"
            },
            {
              riesgo: "Presión sobre líderes comunitarios",
              probabilidad: "Media",
              impacto: "Alto",
              mitigacion: "Solicitar medidas de protección a Defensoría y UNP"
            },
            {
              riesgo: "División comunitaria",
              probabilidad: "Media",
              impacto: "Medio",
              mitigacion: "Fortalecer gobernanza interna y autoridad tradicional"
            }
          ],
          oportunidades: [
            {
              oportunidad: "Precedente jurisprudencial favorable",
              aprovechamiento: "Articular con otros casos similares"
            },
            {
              oportunidad: "Visibilidad internacional",
              aprovechamiento: "Activar mecanismos internacionales de DDHH"
            },
            {
              oportunidad: "Fortalecimiento organizativo",
              aprovechamiento: "Consolidar gobernanza territorial"
            }
          ]
        },

        // Resumen Ejecutivo
        resumenEjecutivo: {
          diagnostico: "Vulneración grave de derechos fundamentales étnicos por ausencia de consulta previa en actividades mineras",
          fundamentoJuridico: "Convenio 169 OIT, Constitución Política Arts. 7 y 330, Jurisprudencia Corte Constitucional",
          gravedad: "CRÍTICA",
          urgencia: "INMEDIATA",
          accionPrincipal: "Acción de Tutela con solicitud de medidas cautelares",
          plazoRecomendado: "Presentar en máximo 72 horas",
          probabilidadExito: "85% - Precedentes jurisprudenciales favorables",
          tiempoEstimado: "6-12 meses para resolución definitiva"
        },

        // Información de Contexto
        contextoCaso: {
          fecha: new Date().toISOString(),
          codigoCaso: datosUbicacion.codigoGenerado || 'ETNOIA-PENDIENTE',
          tipoCaso: casoEtnico.tipoCaso,
          derechoVulnerado: casoEtnico.derechoVulnerado,
          comunidad: datosCliente.comunidad,
          pueblo: datosCliente.pueblo,
          territorio: datosUbicacion.territorio,
          departamento: datosUbicacion.departamento
        }
      };

      setConsejoIA(prev => ({ 
        ...prev, 
        cargando: false, 
        resultado: analisisEspecializado 
      }));

      // Sincronizar análisis con la base de datos
      try {
        const syncResult = await syncAnalisisIA(analisisEspecializado);
        if (syncResult.success) {
          console.log('✅ Análisis IA sincronizado exitosamente');
        } else if (syncResult.queued) {
          console.log('📋 Análisis IA agregado a cola de sincronización');
        }
      } catch (syncError) {
        console.error('❌ Error sincronizando análisis IA:', syncError);
      }
    } catch (error) {
      setConsejoIA(prev => ({ 
        ...prev, 
        cargando: false, 
        error: 'Error al consultar el Consejo Étnico IA' 
      }));
    }
  };

  const generarPDFEspecializado = () => {
    if (!consejoIA.resultado) return;

    const pdfContent = {
      titulo: 'ANÁLISIS ESPECIALIZADO EN DERECHOS ÉTNICOS - CONSEJO ETNO IA',
      codigoCaso: consejoIA.resultado.contextoCaso?.codigoCaso,
      fecha: new Date().toLocaleString('es-CO'),
      cliente: datosCliente,
      ubicacion: datosUbicacion,
      caso: casoEtnico,
      analisis: consejoIA.resultado,
      disclaimer: 'Este análisis es generado por un sistema de inteligencia artificial especializado en derechos étnicos. Se recomienda consultar con profesionales del derecho para casos específicos.'
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(pdfContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `consejo-etnoia-${datosUbicacion.codigoGenerado || 'reporte'}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const iniciarDependencia = () => {
    generarPDFEspecializado();
    alert('Dependencia étnica iniciada exitosamente. Se ha generado el PDF especializado del análisis.');
  };

  const manejarArchivos = (event) => {
    const archivos = Array.from(event.target.files);
    setArchivosEvidencia(prev => [...prev, ...archivos]);
  };

  const eliminarArchivo = (index) => {
    setArchivosEvidencia(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: 'white'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Brain size={60} style={{ marginRight: '1rem' }} />
              <Users size={60} style={{ marginRight: '1rem' }} />
              <Globe size={60} />
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Consejo Étnico IA
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.9,
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Sistema de Inteligencia Artificial Especializado en Derechos Étnicos
              <br/>
              <span style={{ fontSize: '1.1rem' }}>
                Análisis experto basado en Convenio 169 OIT, Constitución Política y Jurisprudencia Constitucional
              </span>
            </p>
          </div>

          {/* Estado de Sincronización */}
          <Card style={{ 
            marginBottom: '2rem', 
            background: 'rgba(255, 255, 255, 0.95)',
            border: 'none',
            borderRadius: '12px'
          }}>
            <div style={{ 
              padding: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: syncStatus.isOnline ? '#10b981' : '#ef4444',
                  marginRight: '0.5rem'
                }} />
                <span style={{ 
                  fontWeight: '600', 
                  color: '#374151',
                  marginRight: '1rem'
                }}>
                  {syncStatus.isOnline ? '🟢 Conectado' : '🔴 Sin conexión'}
                </span>
                
                {syncStatus.queueLength > 0 && (
                  <Badge variant="secondary" style={{ marginRight: '0.5rem' }}>
                    📋 {syncStatus.queueLength} pendientes
                  </Badge>
                )}
                
                {syncStatus.syncInProgress && (
                  <Badge variant="default" style={{ backgroundColor: '#3b82f6' }}>
                    🔄 Sincronizando...
                  </Badge>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => forzarSync()}
                  disabled={!syncStatus.isOnline || syncStatus.syncInProgress}
                  style={{ fontSize: '0.8rem' }}
                >
                  🔄 Forzar Sync
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log('Estado de sincronización:', syncStatus);
                    alert(`Estado: ${syncStatus.isOnline ? 'Conectado' : 'Sin conexión'}\nCola: ${syncStatus.queueLength} elementos\nSincronizando: ${syncStatus.syncInProgress ? 'Sí' : 'No'}\nÚltima sync: ${syncStatus.lastSync ? new Date(syncStatus.lastSync).toLocaleString() : 'Nunca'}`);
                  }}
                  style={{ fontSize: '0.8rem' }}
                >
                  ℹ️ Info
                </Button>
              </div>
            </div>
          </Card>


          <Tabs defaultValue="caso" style={{ background: 'white', borderRadius: '1rem', padding: '2rem' }}>
            <TabsList style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <TabsTrigger value="caso">
                <FileText style={{ marginRight: '0.5rem' }} size={18} />
                Caso Étnico
              </TabsTrigger>
              <TabsTrigger value="cliente">
                <User style={{ marginRight: '0.5rem' }} size={18} />
                Cliente
              </TabsTrigger>
              <TabsTrigger value="ubicacion">
                <MapPin style={{ marginRight: '0.5rem' }} size={18} />
                Ubicación
              </TabsTrigger>
              <TabsTrigger value="consejo">
                <Brain style={{ marginRight: '0.5rem' }} size={18} />
                Análisis Étnico IA
              </TabsTrigger>
              <TabsTrigger value="acciones">
                <Target style={{ marginRight: '0.5rem' }} size={18} />
                Acciones
              </TabsTrigger>
            </TabsList>

            {/* Tab Caso Étnico */}
            <TabsContent value="caso">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Narración del Caso Étnico
                </h2>

                <Alert style={{ 
                  background: '#dbeafe', 
                  border: '1px solid #3b82f6',
                  color: '#1e40af',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '2rem'
                }}>
                  <Info style={{ marginRight: '0.5rem' }} />
                  <strong>Importante:</strong> Este sistema está especializado en análisis de casos relacionados con derechos de pueblos indígenas, comunidades afrodescendientes y pueblo Rom, basándose en el Convenio 169 de la OIT y la legislación colombiana.
                </Alert>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Tipo de Caso Étnico
                    </Label>
                    <Select
                      value={casoEtnico.tipoCaso}
                      onValueChange={(value) => setCasoEtnico(prev => ({ ...prev, tipoCaso: value }))}
                    >
                      <option value="">Seleccionar tipo</option>
                      {tiposCasoEtnico.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Derecho Étnico Vulnerado
                    </Label>
                    <Select
                      value={casoEtnico.derechoVulnerado}
                      onValueChange={(value) => setCasoEtnico(prev => ({ ...prev, derechoVulnerado: value }))}
                    >
                      <option value="">Seleccionar derecho</option>
                      {derechosEtnicos.map((derecho) => (
                        <option key={derecho} value={derecho}>
                          {derecho}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Narración Detallada del Caso
                  </Label>
                  <Textarea
                    value={casoEtnico.narracion}
                    onChange={(e) => setCasoEtnico(prev => ({ 
                      ...prev, 
                      narracion: e.target.value,
                      timestamp: new Date().toISOString()
                    }))}
                    placeholder="Describa detalladamente el caso étnico, incluyendo hechos, contexto cultural, y afectaciones específicas a la comunidad..."
                    style={{ 
                      minHeight: '200px',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Contexto Cultural Relevante
                  </Label>
                  <Textarea
                    value={casoEtnico.contextoCultural}
                    onChange={(e) => setCasoEtnico(prev => ({ ...prev, contextoCultural: e.target.value }))}
                    placeholder="Describa el contexto cultural, prácticas ancestrales, sitios sagrados, medicina tradicional, u otros aspectos culturales relevantes..."
                    style={{ 
                      minHeight: '120px',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Impacto Territorial y Ambiental
                  </Label>
                  <Textarea
                    value={casoEtnico.impactoTerritorial}
                    onChange={(e) => setCasoEtnico(prev => ({ ...prev, impactoTerritorial: e.target.value }))}
                    placeholder="Describa el impacto en el territorio, recursos naturales, fuentes de agua, biodiversidad, etc..."
                    style={{ 
                      minHeight: '120px',
                      fontSize: '1rem',
                      lineHeight: '1.6'
                    }}
                  />
                </div>

                {/* Grabación de Audio */}
                <div style={{ 
                  border: '2px dashed #d1d5db', 
                  borderRadius: '0.5rem', 
                  padding: '2rem', 
                  textAlign: 'center',
                  marginBottom: '2rem',
                  background: '#f9fafb'
                }}>
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1rem',
                    color: '#374151'
                  }}>
                    Grabación de Audio (Opcional)
                  </h3>
                  
                  {!grabando ? (
                    <Button
                      onClick={startRecording}
                      style={{ 
                        background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                        border: 'none',
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 auto'
                      }}
                    >
                      <Mic style={{ marginRight: '0.5rem' }} />
                      Iniciar Grabación
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      style={{ 
                        background: 'linear-gradient(45deg, #6b7280, #4b5563)',
                        border: 'none',
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 auto'
                      }}
                    >
                      <MicOff style={{ marginRight: '0.5rem' }} />
                      Detener
                    </Button>
                  )}

                  {archivoAudio && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '1rem', 
                      background: '#dcfce7', 
                      borderRadius: '0.5rem',
                      border: '1px solid #16a34a'
                    }}>
                      <p style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: '#15803d' }}>
                        ✓ Archivo grabado: {archivoAudio.nombre}
                      </p>
                      <p style={{ color: '#15803d', fontSize: '0.9rem' }}>
                        Duración: {archivoAudio.duracion} | Tamaño: {archivoAudio.tamaño}
                      </p>
                      <Button
                        onClick={transcribirAudio}
                        style={{ 
                          background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          borderRadius: '0.25rem',
                          color: 'white',
                          cursor: 'pointer',
                          marginTop: '0.5rem'
                        }}
                      >
                        Transcribir Audio
                      </Button>
                    </div>
                  )}
                </div>

                {/* Archivos de Evidencia */}
                <div style={{ marginBottom: '2rem' }}>
                  <Label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Archivos de Evidencia
                  </Label>
                  <input
                    type="file"
                    onChange={manejarArchivos}
                    multiple
                    style={{ 
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  />
                  
                  {archivosEvidencia.length > 0 && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '1rem', 
                      background: '#f0f9ff', 
                      borderRadius: '0.5rem',
                      border: '1px solid #0ea5e9'
                    }}>
                      <h4 style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 'bold', 
                        marginBottom: '0.5rem',
                        color: '#0c4a6e'
                      }}>
                        Archivos Cargados ({archivosEvidencia.length})
                      </h4>
                      {archivosEvidencia.map((archivo, index) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          padding: '0.5rem',
                          background: 'white',
                          borderRadius: '0.25rem',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ fontSize: '0.9rem' }}>{archivo.name}</span>
                          <Button
                            onClick={() => eliminarArchivo(index)}
                            style={{ 
                              background: '#ef4444',
                              border: 'none',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.25rem',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '0.8rem'
                            }}
                          >
                            Eliminar
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'center' 
                }}>
                  <Button
                    onClick={consultarEtnoIA}
                    disabled={!casoEtnico.narracion.trim() || consejoIA.cargando}
                    style={{ 
                      background: consejoIA.cargando ? '#9ca3af' : 'linear-gradient(45deg, #667eea, #764ba2)',
                      border: 'none',
                      padding: '1rem 2rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      borderRadius: '0.5rem',
                      color: 'white',
                      cursor: consejoIA.cargando ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {consejoIA.cargando ? (
                      <>
                        <Clock style={{ marginRight: '0.5rem' }} />
                        Analizando con Especialistas...
                      </>
                    ) : (
                      <>
                        <Brain style={{ marginRight: '0.5rem' }} />
                        Consultar Consejo Étnico IA
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Tab Cliente */}
            <TabsContent value="cliente">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Datos del Cliente / Comunidad
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Tipo de Cliente
                    </Label>
                    <Select
                      value={datosCliente.tipo}
                      onValueChange={(value) => setDatosCliente(prev => ({ ...prev, tipo: value }))}
                    >
                      <option value="">Seleccionar tipo</option>
                      {tiposCliente.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Nombre / Comunidad
                    </Label>
                    <Input
                      value={datosCliente.nombre}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, nombre: e.target.value }))}
                      placeholder="Nombre o comunidad"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Pueblo / Etnia
                    </Label>
                    <Select
                      value={datosCliente.pueblo}
                      onValueChange={(value) => setDatosCliente(prev => ({ ...prev, pueblo: value }))}
                    >
                      <option value="">Seleccionar pueblo</option>
                      {pueblosIndigenas.map((pueblo) => (
                        <option key={pueblo.id} value={pueblo.nombre}>
                          {pueblo.nombre} - {pueblo.territorio}
                        </option>
                      ))}
                      {comunidadesAfro.map((comunidad) => (
                        <option key={comunidad.id} value={comunidad.nombre}>
                          {comunidad.nombre} - {comunidad.territorio}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Teléfono
                    </Label>
                    <Input
                      value={datosCliente.telefono}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, telefono: e.target.value }))}
                      placeholder="Número de teléfono"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={datosCliente.email}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Correo electrónico"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Identificación
                    </Label>
                    <Input
                      value={datosCliente.identificacion}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, identificacion: e.target.value }))}
                      placeholder="Número de identificación"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab Ubicación */}
            <TabsContent value="ubicacion">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Datos de Ubicación Territorial
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Municipio
                    </Label>
                    <Input
                      value={datosUbicacion.municipio}
                      onChange={(e) => setDatosUbicacion(prev => ({ ...prev, municipio: e.target.value }))}
                      placeholder="Nombre del municipio"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Departamento
                    </Label>
                    <Select
                      value={datosUbicacion.departamento}
                      onValueChange={(value) => setDatosUbicacion(prev => ({ ...prev, departamento: value }))}
                    >
                      <option value="">Seleccionar departamento</option>
                      {departamentos.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Resguardo / Territorio
                    </Label>
                    <Input
                      value={datosUbicacion.resguardo}
                      onChange={(e) => setDatosUbicacion(prev => ({ ...prev, resguardo: e.target.value }))}
                      placeholder="Nombre del resguardo o territorio"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Territorio Ancestral
                    </Label>
                    <Input
                      value={datosUbicacion.territorio}
                      onChange={(e) => setDatosUbicacion(prev => ({ ...prev, territorio: e.target.value }))}
                      placeholder="Nombre del territorio ancestral"
                    />
                  </div>

                  <div>
                    <Label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: '#374151'
                    }}>
                      Coordenadas (Opcional)
                    </Label>
                    <Input
                      value={datosUbicacion.coordenadas}
                      onChange={(e) => setDatosUbicacion(prev => ({ ...prev, coordenadas: e.target.value }))}
                      placeholder="Lat, Lng (ej: 4.6097, -74.0817)"
                    />
                  </div>
                </div>

                <div style={{ 
                  marginTop: '2rem', 
                  padding: '1.5rem', 
                  background: '#f3f4f6', 
                  borderRadius: '0.5rem' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}>
                    <div>
                      <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 'bold', 
                        marginBottom: '0.5rem',
                        color: '#374151'
                      }}>
                        Código de Caso Étnico
                      </h3>
                      <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        {datosUbicacion.codigoGenerado || 'No generado'}
                      </p>
                    </div>
                    <Button
                      onClick={generarCodigo}
                      style={{ 
                        background: 'linear-gradient(45deg, #10b981, #059669)',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      Generar Código
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Tab Consejo Étnico IA */}
            <TabsContent value="consejo">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Análisis Especializado del Consejo Étnico IA
                </h2>

                {consejoIA.cargando && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '4rem',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ 
                      display: 'inline-block',
                      animation: 'spin 1s linear infinite',
                      fontSize: '3rem',
                      color: '#667eea',
                      marginBottom: '1rem'
                    }}>
                      <Brain />
                    </div>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#1f2937'
                    }}>
                      Analizando con Panel de Especialistas Étnicos...
                    </h3>
                    <p style={{ 
                      fontSize: '1rem',
                      color: '#6b7280',
                      maxWidth: '600px',
                      margin: '0 auto'
                    }}>
                      Procesando información con base en Convenio 169 OIT, Constitución Política,
                      Jurisprudencia Constitucional y normativa étnica colombiana
                    </p>
                  </div>
                )}

                {consejoIA.error && (
                  <Alert style={{ 
                    background: '#fef2f2', 
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <AlertCircle style={{ marginRight: '0.5rem' }} />
                    {consejoIA.error}
                  </Alert>
                )}

                {consejoIA.resultado && (
                  <div style={{ display: 'grid', gap: '2rem' }}>
                    {/* Resumen Ejecutivo */}
                    <Card style={{ 
                      padding: '2rem', 
                      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                      border: '2px solid #f59e0b'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '1rem' 
                      }}>
                        <Star style={{ marginRight: '0.5rem', color: '#d97706' }} size={32} />
                        <h3 style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: 'bold',
                          color: '#92400e'
                        }}>
                          Resumen Ejecutivo
                        </h3>
                      </div>
                      
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                          <p style={{ fontSize: '0.8rem', color: '#92400e', marginBottom: '0.25rem' }}>
                            <strong>Diagnóstico:</strong>
                          </p>
                          <p style={{ fontSize: '0.9rem', color: '#374151' }}>
                            {consejoIA.resultado.resumenEjecutivo.diagnostico}
                          </p>
                        </div>
                        
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                          <p style={{ fontSize: '0.8rem', color: '#92400e', marginBottom: '0.25rem' }}>
                            <strong>Gravedad:</strong>
                          </p>
                          <Badge style={{ 
                            background: '#dc2626',
                            color: 'white',
                            fontSize: '1rem',
                            padding: '0.5rem 1rem'
                          }}>
                            {consejoIA.resultado.resumenEjecutivo.gravedad}
                          </Badge>
                        </div>
                        
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                          <p style={{ fontSize: '0.8rem', color: '#92400e', marginBottom: '0.25rem' }}>
                            <strong>Urgencia:</strong>
                          </p>
                          <Badge style={{ 
                            background: '#ef4444',
                            color: 'white',
                            fontSize: '1rem',
                            padding: '0.5rem 1rem'
                          }}>
                            {consejoIA.resultado.resumenEjecutivo.urgencia}
                          </Badge>
                        </div>
                        
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                          <p style={{ fontSize: '0.8rem', color: '#92400e', marginBottom: '0.25rem' }}>
                            <strong>Acción Principal:</strong>
                          </p>
                          <p style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 'bold' }}>
                            {consejoIA.resultado.resumenEjecutivo.accionPrincipal}
                          </p>
                        </div>
                        
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                          <p style={{ fontSize: '0.8rem', color: '#92400e', marginBottom: '0.25rem' }}>
                            <strong>Probabilidad de Éxito:</strong>
                          </p>
                          <p style={{ fontSize: '1.2rem', color: '#15803d', fontWeight: 'bold' }}>
                            {consejoIA.resultado.resumenEjecutivo.probabilidadExito}
                          </p>
                        </div>
                        
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                          <p style={{ fontSize: '0.8rem', color: '#92400e', marginBottom: '0.25rem' }}>
                            <strong>Plazo Recomendado:</strong>
                          </p>
                          <p style={{ fontSize: '0.9rem', color: '#dc2626', fontWeight: 'bold' }}>
                            {consejoIA.resultado.resumenEjecutivo.plazoRecomendado}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* Análisis Jurídico Étnico */}
                    <Card style={{ 
                      padding: '2rem', 
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                      border: '1px solid #3b82f6'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '1rem' 
                      }}>
                        <Gavel style={{ marginRight: '0.5rem', color: '#1d4ed8' }} size={28} />
                        <div>
                          <h3 style={{ 
                            fontSize: '1.3rem', 
                            fontWeight: 'bold',
                            color: '#1e40af'
                          }}>
                            Análisis Jurídico Étnico
                          </h3>
                          <p style={{ fontSize: '0.9rem', color: '#1e40af', fontStyle: 'italic' }}>
                            {consejoIA.resultado.analisisJuridico.especialista}
                          </p>
                        </div>
                      </div>
                      
                      <p style={{ 
                        color: '#1e3a8a', 
                        lineHeight: '1.7',
                        fontSize: '1rem',
                        marginBottom: '1.5rem',
                        textAlign: 'justify'
                      }}>
                        {consejoIA.resultado.analisisJuridico.analisis}
                      </p>
                      
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '1.5rem' 
                      }}>
                        <div style={{ 
                          padding: '1rem', 
                          background: 'white', 
                          borderRadius: '0.5rem',
                          border: '1px solid #60a5fa'
                        }}>
                          <h4 style={{ 
                            fontSize: '1rem', 
                            fontWeight: 'bold', 
                            marginBottom: '0.5rem',
                            color: '#1e40af'
                          }}>
                            📜 Marco Normativo Aplicable
                          </h4>
                          <ul style={{ 
                            color: '#1e3a8a', 
                            lineHeight: '1.6',
                            paddingLeft: '1.2rem'
                          }}>
                            {consejoIA.resultado.analisisJuridico.normativa.map((norma, index) => (
                              <li key={index} style={{ marginBottom: '0.25rem' }}>
                                {norma}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div style={{ 
                          padding: '1rem', 
                          background: 'white', 
                          borderRadius: '0.5rem',
                          border: '1px solid #60a5fa'
                        }}>
                          <h4 style={{ 
                            fontSize: '1rem', 
                            fontWeight: 'bold', 
                            marginBottom: '0.5rem',
                            color: '#1e40af'
                          }}>
                            💡 Recomendaciones Jurídicas
                          </h4>
                          <ul style={{ 
                            color: '#1e3a8a', 
                            lineHeight: '1.6',
                            paddingLeft: '1.2rem'
                          }}>
                            {consejoIA.resultado.analisisJuridico.recomendaciones.map((rec, index) => (
                              <li key={index} style={{ marginBottom: '0.25rem' }}>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>

                    {/* Análisis Cultural y Territorial */}
                    <Card style={{ 
                      padding: '2rem', 
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                      border: '1px solid #22c55e'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '1rem' 
                      }}>
                        <Globe style={{ marginRight: '0.5rem', color: '#16a34a' }} size={28} />
                        <div>
                          <h3 style={{ 
                            fontSize: '1.3rem', 
                            fontWeight: 'bold',
                            color: '#15803d'
                          }}>
                            Análisis Cultural y Territorial
                          </h3>
                          <p style={{ fontSize: '0.9rem', color: '#15803d', fontStyle: 'italic' }}>
                            {consejoIA.resultado.analisisCultural.especialista}
                          </p>
                        </div>
                      </div>
                      
                      <p style={{ 
                        color: '#14532d', 
                        lineHeight: '1.7',
                        fontSize: '1rem',
                        marginBottom: '1.5rem',
                        textAlign: 'justify'
                      }}>
                        {consejoIA.resultado.analisisCultural.analisis}
                      </p>
                      
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '1.5rem' 
                      }}>
                        <div style={{ 
                          padding: '1rem', 
                          background: 'white', 
                          borderRadius: '0.5rem',
                          border: '1px solid #4ade80'
                        }}>
                          <h4 style={{ 
                            fontSize: '1rem', 
                            fontWeight: 'bold', 
                            marginBottom: '0.5rem',
                            color: '#15803d'
                          }}>
                            🌿 Impactos Culturales y Territoriales
                          </h4>
                          <ul style={{ 
                            color: '#14532d', 
                            lineHeight: '1.6',
                            paddingLeft: '1.2rem'
                          }}>
                            {consejoIA.resultado.analisisCultural.impactos.map((impacto, index) => (
                              <li key={index} style={{ marginBottom: '0.25rem' }}>
                                {impacto}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div style={{ 
                          padding: '1rem', 
                          background: 'white', 
                          borderRadius: '0.5rem',
                          border: '1px solid #4ade80'
                        }}>
                          <h4 style={{ 
                            fontSize: '1rem', 
                            fontWeight: 'bold', 
                            marginBottom: '0.5rem',
                            color: '#15803d'
                          }}>
                            🛡️ Medidas de Protección Cultural
                          </h4>
                          <ul style={{ 
                            color: '#14532d', 
                            lineHeight: '1.6',
                            paddingLeft: '1.2rem'
                          }}>
                            {consejoIA.resultado.analisisCultural.medidasProteccion.map((medida, index) => (
                              <li key={index} style={{ marginBottom: '0.25rem' }}>
                                {medida}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>

                    {/* Más análisis... (continúa con el mismo patrón) */}
                    {/* Por brevedad, solo muestro algunos ejemplos */}
                    
                  </div>
                )}

                {!consejoIA.resultado && !consejoIA.cargando && !consejoIA.error && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '4rem',
                    color: '#6b7280'
                  }}>
                    <Brain size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p style={{ fontSize: '1.1rem' }}>
                      Complete los datos del caso y haga clic en "Consultar Consejo Étnico IA" para obtener un análisis especializado
                    </p>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Tab Acciones */}
            <TabsContent value="acciones">
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1.5rem',
                  color: '#1f2937'
                }}>
                  Acciones Disponibles
                </h2>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '2rem' 
                }}>
                  <Card style={{ 
                    padding: '2rem', 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    border: '2px solid #3b82f6'
                  }}>
                    <Download style={{ 
                      fontSize: '3rem', 
                      color: '#1d4ed8', 
                      marginBottom: '1rem' 
                    }} />
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#1e40af'
                    }}>
                      Generar Informe Especializado
                    </h3>
                    <p style={{ 
                      color: '#1e3a8a', 
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}>
                      Crear un reporte completo del análisis étnico en formato PDF
                    </p>
                    <Button
                      onClick={generarPDFEspecializado}
                      disabled={!consejoIA.resultado}
                      style={{ 
                        background: consejoIA.resultado ? 'linear-gradient(45deg, #3b82f6, #2563eb)' : '#9ca3af',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: consejoIA.resultado ? 'pointer' : 'not-allowed',
                        width: '100%'
                      }}
                    >
                      <Download style={{ marginRight: '0.5rem' }} />
                      Descargar Informe PDF
                    </Button>
                  </Card>

                  <Card style={{ 
                    padding: '2rem', 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    border: '2px solid #22c55e'
                  }}>
                    <Target style={{ 
                      fontSize: '3rem', 
                      color: '#16a34a', 
                      marginBottom: '1rem' 
                    }} />
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: '#15803d'
                    }}>
                      Iniciar Caso Étnico
                    </h3>
                    <p style={{ 
                      color: '#14532d', 
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}>
                      Crear una nueva dependencia étnica con el análisis completo
                    </p>
                    <Button
                      onClick={iniciarDependencia}
                      disabled={!consejoIA.resultado}
                      style={{ 
                        background: consejoIA.resultado ? 'linear-gradient(45deg, #22c55e, #16a34a)' : '#9ca3af',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: consejoIA.resultado ? 'pointer' : 'not-allowed',
                        width: '100%'
                      }}
                    >
                      <Target style={{ marginRight: '0.5rem' }} />
                      Iniciar Caso Étnico
                    </Button>
                  </Card>
                </div>

                {/* Recomendador de Páginas Siguientes */}
                {consejoIA.resultado && (
                  <Card style={{ 
                    marginTop: '2rem',
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    border: '3px solid #f59e0b'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.6rem', 
                      fontWeight: 'bold',
                      color: '#92400e',
                      marginBottom: '1rem'
                    }}>
                      📌 Herramientas Recomendadas para Su Caso
                    </h3>
                    
                    <p style={{ 
                      fontSize: '1.05rem', 
                      color: '#78350f',
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}>
                      Basado en el análisis de su caso, el sistema identificó estas herramientas especializadas que pueden ayudarle:
                    </p>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {/* Declaraciones Territoriales */}
                      {(casoEtnico.narracion.toLowerCase().includes('territorio') || 
                        casoEtnico.narracion.toLowerCase().includes('ampliación') ||
                        casoEtnico.narracion.toLowerCase().includes('tierra')) && (
                        <Card style={{ 
                          padding: '1.5rem',
                          background: 'white',
                          border: '3px solid #dc2626',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => window.location.href = '/declaraciones-ampliacion-territorial'}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '2rem', marginRight: '0.75rem' }}>🗺️</span>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#374151' }}>
                                  Declaraciones para Ampliación Territorial
                                </h4>
                              </div>
                              <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                                Genera declaraciones extra juicio profesionales con IA para solicitar ampliación de resguardo ante ANT. Incluye expediente completo de 120 páginas.
                              </p>
                              <p style={{ fontSize: '0.9rem', color: '#16a34a', fontWeight: '500' }}>
                                ✨ Aumenta probabilidad de aprobación al 80%+
                              </p>
                            </div>
                            <Badge style={{ background: '#dc2626', color: 'white', fontSize: '0.75rem', padding: '0.4rem 0.8rem', marginLeft: '1rem', height: 'fit-content' }}>
                              URGENTE
                            </Badge>
                          </div>
                        </Card>
                      )}

                      {/* Planes de Vida */}
                      {(casoEtnico.narracion.toLowerCase().includes('plan') || 
                        casoEtnico.narracion.toLowerCase().includes('desarrollo') ||
                        casoEtnico.narracion.toLowerCase().includes('futuro')) && (
                        <Card style={{ 
                          padding: '1.5rem',
                          background: 'white',
                          border: '2px solid #f59e0b',
                          cursor: 'pointer'
                        }}
                        onClick={() => window.location.href = '/planes-vida-comunitarios'}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '1.8rem', marginRight: '0.75rem' }}>🎯</span>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#374151' }}>
                                  Planes de Vida Comunitarios
                                </h4>
                              </div>
                              <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.5' }}>
                                Formulación integral de Plan de Vida (10-20 años) con 7 pasos participativos y análisis DOFA.
                              </p>
                            </div>
                            <Badge style={{ background: '#f59e0b', color: 'white', fontSize: '0.7rem', padding: '0.3rem 0.7rem', marginLeft: '1rem', height: 'fit-content' }}>
                              ALTA
                            </Badge>
                          </div>
                        </Card>
                      )}

                      {/* CPLI */}
                      {(casoEtnico.narracion.toLowerCase().includes('consulta') || 
                        casoEtnico.narracion.toLowerCase().includes('proyecto') ||
                        casoEtnico.narracion.toLowerCase().includes('megaproyecto')) && (
                        <Card style={{ 
                          padding: '1.5rem',
                          background: 'white',
                          border: '2px solid #dc2626',
                          cursor: 'pointer'
                        }}
                        onClick={() => window.location.href = '/consentimiento-previo-libre-informado'}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '1.8rem', marginRight: '0.75rem' }}>⚠️</span>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#374151' }}>
                                  Consentimiento Previo, Libre e Informado
                                </h4>
                              </div>
                              <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.5' }}>
                                Proceso CPLI para megaproyectos o medidas que afecten territorio o subsistencia.
                              </p>
                            </div>
                            <Badge style={{ background: '#dc2626', color: 'white', fontSize: '0.7rem', padding: '0.3rem 0.7rem', marginLeft: '1rem', height: 'fit-content' }}>
                              URGENTE
                            </Badge>
                          </div>
                        </Card>
                      )}

                      {/* Jurisdicción Especial */}
                      {(casoEtnico.narracion.toLowerCase().includes('justicia') || 
                        casoEtnico.narracion.toLowerCase().includes('conflicto') ||
                        casoEtnico.narracion.toLowerCase().includes('delito')) && (
                        <Card style={{ 
                          padding: '1.5rem',
                          background: 'white',
                          border: '2px solid #8b5cf6',
                          cursor: 'pointer'
                        }}
                        onClick={() => window.location.href = '/jurisdiccion-indigena'}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '1.8rem', marginRight: '0.75rem' }}>⚖️</span>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#374151' }}>
                                  Jurisdicción Especial Indígena
                                </h4>
                              </div>
                              <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.5' }}>
                                El caso puede resolverse con justicia propia según usos y costumbres del pueblo.
                              </p>
                            </div>
                            <Badge style={{ background: '#8b5cf6', color: 'white', fontSize: '0.7rem', padding: '0.3rem 0.7rem', marginLeft: '1rem', height: 'fit-content' }}>
                              ALTA
                            </Badge>
                          </div>
                        </Card>
                      )}

                      {/* Siempre mostrar */}
                      <Card style={{ 
                        padding: '1.5rem',
                        background: 'white',
                        border: '1px solid #d1d5db',
                        cursor: 'pointer'
                      }}
                      onClick={() => window.location.href = '/formulacion-proyectos-etnicos'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>📋</span>
                              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151' }}>
                                Formulación de Proyectos Étnicos
                              </h4>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                              Formule proyectos con marco lógico y enfoque diferencial.
                            </p>
                          </div>
                          <Badge style={{ background: '#6b7280', color: 'white', fontSize: '0.65rem', padding: '0.3rem 0.6rem', marginLeft: '1rem', height: 'fit-content' }}>
                            DISPONIBLE
                          </Badge>
                        </div>
                      </Card>

                      <Card style={{ 
                        padding: '1.5rem',
                        background: 'white',
                        border: '1px solid #d1d5db',
                        cursor: 'pointer'
                      }}
                      onClick={() => window.location.href = '/seguimiento-evaluacion-etnica'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>📊</span>
                              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151' }}>
                                Seguimiento y Evaluación
                              </h4>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                              Monitoreo y evaluación de planes y proyectos étnicos.
                            </p>
                          </div>
                          <Badge style={{ background: '#6b7280', color: 'white', fontSize: '0.65rem', padding: '0.3rem 0.6rem', marginLeft: '1rem', height: 'fit-content' }}>
                            DISPONIBLE
                          </Badge>
                        </div>
                      </Card>
                    </div>
                  </Card>
                )}

                {consejoIA.resultado && (
                  <div style={{ 
                    marginTop: '2rem', 
                    padding: '2rem', 
                    background: '#f8fafc', 
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1.5rem',
                      color: '#374151'
                    }}>
                      📊 Información del Análisis Étnico
                    </h3>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: '1rem' 
                    }}>
                      <div>
                        <p style={{ 
                          fontSize: '0.9rem', 
                          color: '#6b7280',
                          marginBottom: '0.25rem'
                        }}>
                          Código de Caso:
                        </p>
                        <p style={{ 
                          fontWeight: 'bold', 
                          color: '#374151',
                          fontSize: '1rem'
                        }}>
                          {consejoIA.resultado.contextoCaso.codigoCaso}
                        </p>
                      </div>
                      <div>
                        <p style={{ 
                          fontSize: '0.9rem', 
                          color: '#6b7280',
                          marginBottom: '0.25rem'
                        }}>
                          Fecha de Análisis:
                        </p>
                        <p style={{ 
                          fontWeight: 'bold', 
                          color: '#374151',
                          fontSize: '1rem'
                        }}>
                          {new Date(consejoIA.resultado.contextoCaso.fecha).toLocaleString('es-CO')}
                        </p>
                      </div>
                      <div>
                        <p style={{ 
                          fontSize: '0.9rem', 
                          color: '#6b7280',
                          marginBottom: '0.25rem'
                        }}>
                          Tipo de Caso:
                        </p>
                        <p style={{ 
                          fontWeight: 'bold', 
                          color: '#374151',
                          fontSize: '1rem'
                        }}>
                          {consejoIA.resultado.contextoCaso.tipoCaso}
                        </p>
                      </div>
                      <div>
                        <p style={{ 
                          fontSize: '0.9rem', 
                          color: '#6b7280',
                          marginBottom: '0.25rem'
                        }}>
                          Pueblo/Comunidad:
                        </p>
                        <p style={{ 
                          fontWeight: 'bold', 
                          color: '#374151',
                          fontSize: '1rem'
                        }}>
                          {consejoIA.resultado.contextoCaso.pueblo}
                        </p>
                      </div>
                      <div>
                        <p style={{ 
                          fontSize: '0.9rem', 
                          color: '#6b7280',
                          marginBottom: '0.25rem'
                        }}>
                          Especialistas Consultados:
                        </p>
                        <p style={{ 
                          fontWeight: 'bold', 
                          color: '#374151',
                          fontSize: '1rem'
                        }}>
                          6 Expertos en Derechos Étnicos
                        </p>
                      </div>
                      <div>
                        <p style={{ 
                          fontSize: '0.9rem', 
                          color: '#6b7280',
                          marginBottom: '0.25rem'
                        }}>
                          Normativa Consultada:
                        </p>
                        <p style={{ 
                          fontWeight: 'bold', 
                          color: '#374151',
                          fontSize: '1rem'
                        }}>
                          Convenio 169 OIT + Jurisprudencia
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ConsejoEtnoIA;
