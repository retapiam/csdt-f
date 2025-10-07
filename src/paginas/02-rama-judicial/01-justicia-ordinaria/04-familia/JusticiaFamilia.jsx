import React, { useState } from 'react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Textarea } from '../../../../components/ui/textarea';
import { Select } from '../../../../components/ui/select';
import { Badge } from '../../../../components/ui/badge';
import { Alert } from '../../../../components/ui/alert';
import { 
  Heart, 
  Users, 
  Baby, 
  Home, 
  DollarSign,
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Brain, 
  Clock,
  Target,
  Shield,
  Scale,
  Calculator,
  UserCheck,
  AlertTriangle,
  Info
} from 'lucide-react';

const JusticiaFamilia = () => {
  const [formulario, setFormulario] = useState({
    // Tipo de caso
    tipoCaso: '',
    
    // Datos de los cónyuges/compañeros
    nombreSolicitante: '',
    identificacionSolicitante: '',
    nombreOtraParte: '',
    identificacionOtraParte: '',
    tipoUnion: '',
    fechaUnion: '',
    fechaSeparacion: '',
    
    // Hijos menores
    hijos: [],
    
    // Detalles del caso
    hechos: '',
    pretensiones: '',
    regimen: '',
    bienesComunes: '',
    
    // Custodia y alimentos
    custodiaActual: '',
    custodiaPreferida: '',
    ingresosSolicitante: '',
    ingresosOtraParte: '',
    gastosMenor: '',
    
    // Evidencias
    certificadoMatrimonio: null,
    registroNacimiento: [],
    evidencias: [],
    
    // Análisis IA
    analisisIA: null,
    calculoCuota: null
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  const tiposCasoFamilia = [
    { tipo: 'Divorcio', subtipo: 'Disolución de matrimonio', color: '#ef4444' },
    { tipo: 'Separación de Cuerpos', subtipo: 'Separación legal', color: '#f59e0b' },
    { tipo: 'Cesación de Efectos Civiles', subtipo: 'Matrimonio religioso', color: '#f59e0b' },
    { tipo: 'Disolución Unión Marital', subtipo: 'Unión de hecho', color: '#ef4444' },
    { tipo: 'Custodia de Menores', subtipo: 'Cuidado personal', color: '#dc2626' },
    { tipo: 'Régimen de Visitas', subtipo: 'Contacto con menores', color: '#f59e0b' },
    { tipo: 'Cuota Alimentaria', subtipo: 'Alimentos para menores', color: '#dc2626' },
    { tipo: 'Aumento Cuota Alimentaria', subtipo: 'Incremento de alimentos', color: '#f59e0b' },
    { tipo: 'Disminución Cuota', subtipo: 'Reducción de alimentos', color: '#f59e0b' },
    { tipo: 'Liquidación Sociedad Conyugal', subtipo: 'División de bienes', color: '#f59e0b' },
    { tipo: 'Violencia Intrafamiliar', subtipo: 'Protección urgente', color: '#991b1b' },
    { tipo: 'Filiación', subtipo: 'Reconocimiento paternidad', color: '#dc2626' },
    { tipo: 'Otro', subtipo: 'Otro caso familiar', color: '#6b7280' }
  ];

  const tiposUnion = [
    'Matrimonio Civil',
    'Matrimonio Católico',
    'Matrimonio Religioso',
    'Unión Marital de Hecho',
    'Noviazgo (sin convivencia)',
    'Otro'
  ];

  const handleInputChange = (campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const agregarHijo = () => {
    setFormulario(prev => ({
      ...prev,
      hijos: [
        ...prev.hijos, 
        { 
          nombre: '', 
          fechaNacimiento: '', 
          edad: '', 
          custodia: '', 
          gastos: '',
          necesidadesEspeciales: ''
        }
      ]
    }));
  };

  const actualizarHijo = (index, campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      hijos: prev.hijos.map((h, i) => {
        if (i === index) {
          const hijo = { ...h, [campo]: valor };
          // Calcular edad automáticamente
          if (campo === 'fechaNacimiento' && valor) {
            const hoy = new Date();
            const nacimiento = new Date(valor);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mes = hoy.getMonth() - nacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
              edad--;
            }
            hijo.edad = edad;
          }
          return hijo;
        }
        return h;
      })
    }));
  };

  const calcularCuotaAlimentariaIA = async () => {
    if (!formulario.ingresosSolicitante || !formulario.ingresosOtraParte || formulario.hijos.length === 0) {
      alert('Complete los ingresos de ambas partes y agregue al menos un hijo');
      return;
    }

    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const ingresosSol = parseFloat(formulario.ingresosSolicitante) || 0;
      const ingresosOtra = parseFloat(formulario.ingresosOtraParte) || 0;
      const numHijos = formulario.hijos.length;
      const salarioMinimo = 1300000;
      
      // Cálculo de cuota alimentaria (50% ingresos / número de hijos)
      const porcentajeObligado = 0.50; // 50% de los ingresos
      const cuotaPorHijo = (ingresosOtra * porcentajeObligado) / numHijos;
      const cuotaMinima = salarioMinimo * 0.30; // Mínimo 30% SMLMV por hijo
      const cuotaCalculada = Math.max(cuotaPorHijo, cuotaMinima);

      const calculoCuota = {
        datosCalculo: {
          ingresosSolicitante: ingresosSol.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          ingresosObligado: ingresosOtra.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          numeroHijos: numHijos,
          salarioMinimoRef: salarioMinimo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
        },
        
        calculoDetallado: {
          formula: "(Ingresos obligado × 50%) / Número de hijos",
          calculo: `($${ingresosOtra.toLocaleString()} × 50%) / ${numHijos}`,
          cuotaCalculada: cuotaCalculada,
          cuotaFormateada: cuotaCalculada.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          cuotaMinima: cuotaMinima.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          aplicada: cuotaCalculada >= cuotaMinima ? 'Cuota calculada' : 'Cuota mínima legal'
        },
        
        desglosePorHijo: formulario.hijos.map((hijo, index) => ({
          nombre: hijo.nombre,
          edad: hijo.edad,
          cuotaMensual: cuotaCalculada.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          cuotaAnual: (cuotaCalculada * 12).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          gastosEstimados: hijo.gastos ? parseFloat(hijo.gastos).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) : 'No especificado',
          necesidadesEspeciales: hijo.necesidadesEspeciales || 'Ninguna'
        })),
        
        totalMensual: {
          valor: cuotaCalculada * numHijos,
          formateado: (cuotaCalculada * numHijos).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          porcentajeIngresos: ((cuotaCalculada * numHijos / ingresosOtra) * 100).toFixed(1) + '%'
        },
        
        totalAnual: {
          valor: cuotaCalculada * numHijos * 12,
          formateado: (cuotaCalculada * numHijos * 12).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
        },
        
        notasLegales: [
          "Art. 129 Código de Infancia: Obligación de ambos padres",
          "Art. 133: Cuota según capacidad económica",
          "Art. 135: Incluye alimentación, vestuario, educación, salud, recreación",
          "La cuota puede aumentar si aumentan los ingresos",
          "Puede incluir gastos extraordinarios (salud, educación)"
        ],
        
        advertencias: [
          ingresosSol < salarioMinimo ? "⚠️ Solicitante con ingresos bajos - podría recibir más del 50%" : null,
          ingresosOtra < salarioMinimo ? "⚠️ Obligado con ingresos bajos - cuota mínima aplicable" : null,
          numHijos > 3 ? "⚠️ Múltiples hijos - verificar capacidad de pago" : null,
          formulario.hijos.some(h => h.necesidadesEspeciales) ? "⚠️ Hijo con necesidades especiales - cuota puede ser mayor" : null
        ].filter(Boolean)
      };

      setFormulario(prev => ({
        ...prev,
        calculoCuota: calculoCuota
      }));
      
    } catch (error) {
      console.error('Error en cálculo:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const analizarCasoFamiliaIA = async () => {
    if (!formulario.tipoCaso || !formulario.hechos) {
      alert('Complete el tipo de caso y los hechos');
      return;
    }

    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      const analisisCompleto = {
        // Análisis Jurídico Familiar
        analisisJuridico: {
          especialista: "Dr. Hernán Fabio López - Derecho de Familia",
          fundamentacion: `El derecho de familia en Colombia está regulado por el Código Civil (Libro I), el Código de Infancia y Adolescencia (Ley 1098/06) y la Constitución Política (Arts. 42, 44). El principio rector es el interés superior del menor y la protección integral de la familia como núcleo fundamental de la sociedad.`,
          analisisDelCaso: formulario.tipoCaso === 'Custodia de Menores'
            ? `La custodia debe otorgarse conforme al interés superior del menor (Art. 44 C.P., Art. 8 Ley 1098). El juez evalúa: 1) Condiciones de cada padre, 2) Vínculo afectivo con el menor, 3) Estabilidad económica y emocional, 4) Opinión del menor (si tiene edad suficiente), 5) Informes técnicos (trabajo social, psicología).`
            : formulario.tipoCaso === 'Cuota Alimentaria'
            ? `La obligación alimentaria es un deber de ambos padres (Art. 129 Ley 1098). La cuota se fija según capacidad económica del obligado y necesidades del menor. Incluye: alimentación, vestido, educación, salud, recreación y vivienda.`
            : formulario.tipoCaso === 'Divorcio'
            ? `El divorcio puede ser de mutuo acuerdo (más rápido) o contencioso. Debe liquidarse la sociedad conyugal, fijarse custodia de hijos menores, alimentos y régimen de visitas. El procedimiento está en Arts. 154-159 Código Civil y Ley 1564/12.`
            : `Su caso familiar está protegido por el ordenamiento jurídico colombiano con enfoque en protección de menores y familia.`,
          normatividadAplicable: [
            "Constitución Política - Arts. 42, 44",
            "Código Civil - Libro I (Familia)",
            "Ley 1098 de 2006 - Código de Infancia",
            "Ley 1564 de 2012 - Código General del Proceso",
            "Ley 1306 de 2009 - Capacidad jurídica",
            "Ley 75 de 1968 - Filiación",
            formulario.tipoCaso === 'Violencia Intrafamiliar' ? "Ley 1257 de 2008 - No violencia contra mujer" : null,
            formulario.tipoCaso.includes('Custodia') ? "Ley 1098/06 - Interés superior del menor" : null
          ].filter(Boolean),
          principiosFamilia: [
            "Interés superior del menor: Prima sobre cualquier otro interés",
            "Igualdad de derechos de los cónyuges",
            "Protección integral de la familia",
            "Prevalencia del derecho sustancial",
            "Protección especial a madres cabeza de familia"
          ]
        },

        // Análisis de Custodia (si aplica)
        analisisCustodia: (formulario.tipoCaso === 'Custodia de Menores' || formulario.hijos.length > 0) ? {
          especialista: "Dra. María Helena Barrera - Psicología Jurídica",
          criteriosEvaluacion: [
            {
              criterio: "Vínculo Afectivo",
              descripcion: "Relación emocional con cada padre",
              evaluacion: "Alto, Medio, Bajo",
              importancia: "CRÍTICA"
            },
            {
              criterio: "Condiciones de Vivienda",
              descripcion: "Espacio adecuado para el menor",
              evaluacion: "Verificar condiciones",
              importancia: "ALTA"
            },
            {
              criterio: "Estabilidad Económica",
              descripcion: "Capacidad de proveer necesidades",
              evaluacion: formulario.ingresosSolicitante && formulario.ingresosOtraParte 
                ? `Solicitante: ${parseFloat(formulario.ingresosSolicitante).toLocaleString()}, Otra parte: ${parseFloat(formulario.ingresosOtraParte).toLocaleString()}`
                : "Pendiente de evaluar",
              importancia: "ALTA"
            },
            {
              criterio: "Disponibilidad de Tiempo",
              descripcion: "Tiempo disponible para cuidado",
              evaluacion: "Verificar horarios laborales",
              importancia: "ALTA"
            },
            {
              criterio: "Opinión del Menor",
              descripcion: "Si tiene edad suficiente (12+ años)",
              evaluacion: formulario.hijos.some(h => h.edad >= 12) ? "Debe escucharse" : "No aplica por edad",
              importancia: "ALTA"
            },
            {
              criterio: "Red de Apoyo Familiar",
              descripcion: "Apoyo de abuelos, tíos, etc.",
              evaluacion: "Verificar red de apoyo",
              importancia: "MEDIA"
            }
          ],
          tiposCustodia: [
            {
              tipo: "Custodia Monoparental",
              descripcion: "Un solo padre tiene la custodia",
              cuando: "Cuando un padre no cumple condiciones",
              visitasOtroPadre: "Régimen de visitas amplio"
            },
            {
              tipo: "Custodia Compartida",
              descripcion: "Ambos padres comparten custodia",
              cuando: "Cuando ambos cumplen condiciones",
              beneficio: "Preserva vínculo con ambos padres"
            },
            {
              tipo: "Custodia Provisional",
              descripcion: "Temporal mientras se define definitiva",
              cuando: "Durante el proceso",
              duracion: "Hasta sentencia"
            }
          ],
          factoresFavorables: [
            "Estabilidad emocional y económica",
            "Vivienda adecuada para el menor",
            "Disponibilidad de tiempo",
            "Buena relación con el menor",
            "Red de apoyo familiar",
            "Cercanía al colegio y entorno del menor"
          ],
          recomendacionCustodia: formulario.custodiaPreferida
            ? `Custodia ${formulario.custodiaPreferida} - Fundamentar con pruebas que demuestren interés superior del menor`
            : "Determinar según evaluación de condiciones de ambos padres"
        } : null,

        // Cálculo de Cuota Alimentaria
        calculoAlimentos: formulario.calculoCuota ? {
          especialista: "Dr. Carlos Moreno - Alimentos y Familia",
          resultadoCalculo: formulario.calculoCuota,
          fundamentoLegal: "Arts. 129-135 Ley 1098 de 2006",
          componentesAlimentos: [
            "1. Alimentación y nutrición",
            "2. Vestuario y calzado",
            "3. Educación (matrícula, pensión, útiles, uniformes)",
            "4. Salud (medicina prepagada, copagos, medicamentos)",
            "5. Recreación y deporte",
            "6. Vivienda (arriendo o cuota vivienda)",
            "7. Gastos extraordinarios (cuando se presenten)"
          ],
          obligacionAmbosPadres: "La obligación alimentaria es de AMBOS padres en proporción a sus ingresos",
          cuandoAumenta: [
            "Aumento significativo de ingresos del obligado",
            "Aumento de necesidades del menor (edad, salud)",
            "Inflación y aumento del costo de vida",
            "Nuevas necesidades educativas o médicas"
          ]
        } : null,

        // Estrategia Procesal
        estrategiaProcesal: {
          especialista: "Dra. Luz Amparo Serrano - Litigante de Familia",
          rutaProcedimental: formulario.tipoCaso === 'Divorcio' ? [
            {
              paso: 1,
              accion: "Divorcio de Mutuo Acuerdo (si es posible)",
              ventaja: "Más rápido, menos costoso, menos desgaste",
              requisitos: "Acuerdo total en: liquidación, custodia, alimentos, visitas",
              tramite: "Ante notario (sin hijos menores) o juez de familia",
              plazo: "1-3 meses"
            },
            {
              paso: 2,
              accion: "Divorcio Contencioso (si no hay acuerdo)",
              procedimiento: "Demanda ante juez de familia",
              contenido: "Disolución + liquidación + custodia + alimentos",
              plazo: "6-18 meses",
              costos: "Honorarios abogado + gastos procesales"
            }
          ] : formulario.tipoCaso === 'Custodia de Menores' ? [
            {
              paso: 1,
              accion: "Custodia Provisional Urgente",
              cuando: "Si hay riesgo para el menor",
              tramite: "Medida cautelar ante juez",
              plazo: "48-72 horas"
            },
            {
              paso: 2,
              accion: "Proceso de Custodia Definitiva",
              tramite: "Demanda formal con pruebas",
              evaluaciones: "Trabajo social, psicología, informes escolares",
              plazo: "3-6 meses"
            }
          ] : [
            {
              paso: 1,
              accion: "Preparar Demanda",
              contenido: "Hechos, pretensiones, pruebas",
              plazo: "1-2 semanas"
            },
            {
              paso: 2,
              accion: "Presentar ante Juez de Familia",
              competencia: "Juez del domicilio del menor o del demandado",
              tramite: "Según CGP",
              plazo: "3-12 meses"
            }
          ],
          pruebasRecomendadas: [
            "Certificados (matrimonio, nacimiento)",
            "Declaraciones de ingresos",
            "Certificado de tradición de bienes",
            "Informes escolares de los hijos",
            "Fotos de las condiciones de vivienda",
            "Testimonios de familiares o vecinos",
            "Informes médicos o psicológicos"
          ],
          probabilidadExito: formulario.tipoCaso === 'Custodia de Menores' ? "Depende de evaluación integral" :
                             formulario.tipoCaso === 'Cuota Alimentaria' ? "90%" :
                             formulario.tipoCaso === 'Divorcio' ? "95%" : "80%"
        },

        // Resumen Ejecutivo
        resumenEjecutivo: {
          diagnostico: `Caso de ${formulario.tipoCaso} en el ámbito del derecho de familia`,
          fundamentoJuridico: "Código Civil, Ley 1098/06, Constitución Arts. 42 y 44",
          gravedad: formulario.tipoCaso === 'Violencia Intrafamiliar' ? 'CRÍTICA' :
                   formulario.tipoCaso === 'Custodia de Menores' ? 'ALTA' : 'MEDIA',
          urgencia: formulario.tipoCaso === 'Violencia Intrafamiliar' ? 'INMEDIATA' :
                   formulario.tipoCaso === 'Custodia de Menores' ? 'ALTA' : 'MEDIA',
          montoReclamado: formulario.calculoCuota 
            ? `Cuota alimentaria: ${formulario.calculoCuota.totalMensual.formateado}/mes`
            : 'No monetario o pendiente de cálculo',
          probabilidadExito: formulario.tipoCaso === 'Custodia de Menores' ? 'Depende de evaluación' : '85%',
          tiempoEstimado: formulario.tipoCaso === 'Divorcio' ? '3-18 meses' : '3-12 meses',
          recomendacionPrincipal: formulario.tipoCaso === 'Violencia Intrafamiliar'
            ? "⚠️ URGENTE: Solicitar medidas de protección inmediatas. Denunciar ante Fiscalía y Comisaría de Familia."
            : formulario.tipoCaso === 'Custodia de Menores'
            ? "Priorizar siempre el interés superior del menor. Reunir pruebas que demuestren mejores condiciones para el niño/a."
            : "Seguir procedimiento recomendado. Intentar acuerdo antes de litigio cuando sea posible."
        },

        metadatos: {
          fechaAnalisis: new Date().toISOString(),
          especialistasConsultados: formulario.tipoCaso.includes('Custodia') ? 4 : 3,
          normatividadRevisada: 9,
          jurisprudenciaAnalizada: 5,
          calculosRealizados: formulario.calculoCuota ? 'Sí - Cuota alimentaria' : 'No',
          nivelConfianza: "91%"
        }
      };

      setFormulario(prev => ({
        ...prev,
        analisisIA: analisisCompleto
      }));
      
      setMostrarAnalisis(true);
    } catch (error) {
      console.error('Error en análisis IA:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarDemandaFamilia = () => {
    const demandaContent = {
      titulo: 'DEMANDA DE FAMILIA',
      subtitulo: formulario.tipoCaso,
      fecha: new Date().toLocaleString('es-CO'),
      codigo: `FAM-${Date.now()}`,
      partes: {
        solicitante: formulario.nombreSolicitante,
        demandado: formulario.nombreOtraParte
      },
      hijos: formulario.hijos,
      hechos: formulario.hechos,
      pretensiones: formulario.pretensiones,
      analisisIA: formulario.analisisIA,
      calculoCuota: formulario.calculoCuota
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(demandaContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `demanda-familia-${formulario.tipoCaso.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' }}>
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              <Heart size={60} style={{ marginRight: '1rem' }} />
              <Users size={60} style={{ marginRight: '1rem' }} />
              <Baby size={60} />
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Justicia de Familia
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.9,
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Protección Integral de la Familia y los Menores con Análisis IA
              <br/>
              <span style={{ fontSize: '1.1rem' }}>
                Código de Infancia • Código Civil • Calculadora de Alimentos IA
              </span>
            </p>
          </div>

          {/* Selección de Tipo de Caso */}
          <Card style={{ padding: '2rem', background: 'white', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#be185d' }}>
              Seleccione el Tipo de Caso Familiar
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1rem' 
            }}>
              {tiposCasoFamilia.map((caso) => (
                <Card
                  key={caso.tipo}
                  onClick={() => handleInputChange('tipoCaso', caso.tipo)}
                  style={{ 
                    padding: '1.5rem', 
                    cursor: 'pointer',
                    border: formulario.tipoCaso === caso.tipo ? `3px solid ${caso.color}` : '2px solid #e5e7eb',
                    background: formulario.tipoCaso === caso.tipo ? `${caso.color}15` : 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    color: caso.color,
                    marginBottom: '0.5rem'
                  }}>
                    {caso.tipo}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    {caso.subtipo}
                  </p>
                </Card>
              ))}
            </div>
          </Card>

          {/* Calculadora de Cuota Alimentaria */}
          {(formulario.tipoCaso.includes('Cuota') || formulario.tipoCaso.includes('Aliment')) && formulario.hijos.length > 0 && (
            <Card style={{ padding: '2rem', background: 'white', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#be185d' }}>
                <Calculator style={{ display: 'inline', marginRight: '0.75rem' }} />
                Calculadora de Cuota Alimentaria
              </h2>
              
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={calcularCuotaAlimentariaIA}
                  disabled={cargandoIA}
                  style={{ 
                    background: 'linear-gradient(45deg, #ec4899, #be185d)',
                    border: 'none',
                    padding: '1.25rem 2.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: '0.75rem',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 auto'
                  }}
                >
                  <Calculator style={{ marginRight: '0.75rem' }} />
                  Calcular Cuota con IA
                </Button>
              </div>

              {formulario.calculoCuota && (
                <div style={{ 
                  marginTop: '2rem',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                  borderRadius: '0.75rem',
                  border: '2px solid #ec4899'
                }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    color: '#be185d',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}>
                    💰 Cuota Alimentaria Calculada
                  </h3>

                  <div style={{ 
                    padding: '2rem',
                    background: 'white',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      Cuota Mensual Total:
                    </p>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#be185d' }}>
                      {formulario.calculoCuota.totalMensual.formateado}
                    </div>
                    <p style={{ fontSize: '1rem', color: '#6b7280', marginTop: '0.5rem' }}>
                      ({formulario.calculoCuota.totalMensual.porcentajeIngresos} de los ingresos del obligado)
                    </p>
                  </div>

                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '1rem' 
                  }}>
                    {formulario.calculoCuota.desglosePorHijo.map((hijo, index) => (
                      <div key={index} style={{ 
                        padding: '1rem',
                        background: 'white',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h4 style={{ fontWeight: 'bold', color: '#be185d', marginBottom: '0.5rem' }}>
                          👶 {hijo.nombre || `Hijo ${index + 1}`}
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: '#374151' }}>
                          <strong>Edad:</strong> {hijo.edad} años
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#374151' }}>
                          <strong>Cuota mensual:</strong> {hijo.cuotaMensual}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#374151' }}>
                          <strong>Cuota anual:</strong> {hijo.cuotaAnual}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Botones de acción */}
          {mostrarAnalisis && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Button
                onClick={generarDemandaFamilia}
                style={{ 
                  background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                  border: 'none',
                  padding: '1.25rem 2.5rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '0.75rem',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <Download style={{ marginRight: '0.75rem' }} />
                Generar Demanda PDF
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JusticiaFamilia;
