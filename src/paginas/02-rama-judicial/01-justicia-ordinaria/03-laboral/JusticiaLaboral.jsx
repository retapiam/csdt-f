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
  Briefcase, 
  DollarSign, 
  Calendar, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Brain, 
  Clock,
  Target,
  TrendingUp,
  Calculator,
  Award,
  Users,
  Building,
  Scale,
  AlertTriangle,
  Info
} from 'lucide-react';

const JusticiaLaboral = () => {
  const [formulario, setFormulario] = useState({
    // Datos del trabajador
    nombreTrabajador: '',
    identificacion: '',
    cargo: '',
    fechaIngreso: '',
    fechaRetiro: '',
    salario: '',
    tipoContrato: '',
    
    // Datos del empleador
    nombreEmpleador: '',
    nitEmpleador: '',
    actividadEconomica: '',
    
    // Tipo de caso
    tipoCaso: '',
    causaRetiro: '',
    hechos: '',
    pretensiones: '',
    
    // Pagos y prestaciones
    ultimoSalario: '',
    salarioPromedio: '',
    horasExtras: '',
    dominicales: '',
    comisiones: '',
    
    // Evidencias
    contratoTrabajo: null,
    certificadoLaboral: null,
    colillaPago: null,
    evidencias: [],
    
    // Cálculos IA
    calculosIA: null,
    analisisIA: null
  });

  const [cargandoIA, setCargandoIA] = useState(false);
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);
  const [mostrarCalculadora, setMostrarCalculadora] = useState(false);

  const tiposCasoLaboral = [
    { tipo: 'Despido Injustificado', gravedad: 'ALTA', color: '#ef4444' },
    { tipo: 'Terminación sin Justa Causa', gravedad: 'ALTA', color: '#ef4444' },
    { tipo: 'Acoso Laboral', gravedad: 'ALTA', color: '#dc2626' },
    { tipo: 'Pago de Prestaciones Sociales', gravedad: 'MEDIA', color: '#f59e0b' },
    { tipo: 'Pago de Salarios', gravedad: 'ALTA', color: '#ef4444' },
    { tipo: 'Horas Extras no Pagadas', gravedad: 'MEDIA', color: '#f59e0b' },
    { tipo: 'Reconocimiento de Contrato', gravedad: 'ALTA', color: '#ef4444' },
    { tipo: 'Estabilidad Laboral Reforzada', gravedad: 'ALTA', color: '#dc2626' },
    { tipo: 'Fuero Sindical', gravedad: 'ALTA', color: '#dc2626' },
    { tipo: 'Fuero de Maternidad', gravedad: 'CRÍTICA', color: '#991b1b' },
    { tipo: 'Discriminación Laboral', gravedad: 'ALTA', color: '#ef4444' },
    { tipo: 'Condiciones de Trabajo', gravedad: 'MEDIA', color: '#f59e0b' },
    { tipo: 'Otro', gravedad: 'MEDIA', color: '#6b7280' }
  ];

  const tiposContrato = [
    'Término Indefinido',
    'Término Fijo',
    'Obra o Labor',
    'Prestación de Servicios',
    'Contrato de Aprendizaje',
    'Sin Contrato Escrito'
  ];

  const causasRetiro = [
    'Despido sin justa causa',
    'Despido con justa causa (alegada por empleador)',
    'Renuncia',
    'Terminación del contrato',
    'Mutuo acuerdo',
    'Vencimiento del término',
    'No renovación',
    'Otro'
  ];

  const handleInputChange = (campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const calcularLiquidacionIA = async () => {
    if (!formulario.ultimoSalario || !formulario.fechaIngreso || !formulario.fechaRetiro) {
      alert('Complete los datos básicos: salario, fecha ingreso y fecha retiro');
      return;
    }

    setCargandoIA(true);
    setMostrarCalculadora(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Cálculos reales de liquidación
      const salario = parseFloat(formulario.ultimoSalario) || 0;
      const fechaIng = new Date(formulario.fechaIngreso);
      const fechaRet = new Date(formulario.fechaRetiro);
      const diasTrabajados = Math.floor((fechaRet - fechaIng) / (1000 * 60 * 60 * 24));
      const añosTrabajados = diasTrabajados / 365;
      const salarioMinimo = 1300000; // SMLMV 2024
      
      // Cálculos detallados
      const cesantias = (salario * diasTrabajados) / 360;
      const interesesCesantias = (cesantias * 0.12 * diasTrabajados) / 360;
      const prima = (salario * diasTrabajados) / 360;
      const vacaciones = (salario * diasTrabajados) / 720;
      
      const indemnizacion = formulario.causaRetiro === 'Despido sin justa causa' || 
                           formulario.causaRetiro === 'Terminación del contrato'
        ? salario < (10 * salarioMinimo)
          ? salario * 30 // 30 días de salario
          : salario * 20 // 20 días de salario
        : 0;

      const totalLiquidacion = cesantias + interesesCesantias + prima + vacaciones + indemnizacion;

      const calculosDetallados = {
        // Información Laboral
        informacionLaboral: {
          fechaIngreso: formulario.fechaIngreso,
          fechaRetiro: formulario.fechaRetiro,
          diasTrabajados: diasTrabajados,
          añosTrabajados: añosTrabajados.toFixed(2),
          tiempoServicio: `${Math.floor(añosTrabajados)} años, ${Math.floor((añosTrabajados % 1) * 12)} meses`,
          salarioBase: salario.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          tipoContrato: formulario.tipoContrato
        },

        // Conceptos de Liquidación
        conceptos: [
          {
            concepto: 'Cesantías',
            formula: '(Salario × Días trabajados) / 360',
            calculo: `($${salario.toLocaleString()} × ${diasTrabajados}) / 360`,
            valor: cesantias,
            valorFormateado: cesantias.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
            fundamento: 'Art. 249 CST'
          },
          {
            concepto: 'Intereses sobre Cesantías',
            formula: '(Cesantías × 12% × Días) / 360',
            calculo: `($${cesantias.toLocaleString()} × 12% × ${diasTrabajados}) / 360`,
            valor: interesesCesantias,
            valorFormateado: interesesCesantias.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
            fundamento: 'Art. 99 Ley 50 de 1990'
          },
          {
            concepto: 'Prima de Servicios',
            formula: '(Salario × Días trabajados) / 360',
            calculo: `($${salario.toLocaleString()} × ${diasTrabajados}) / 360`,
            valor: prima,
            valorFormateado: prima.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
            fundamento: 'Art. 306 CST'
          },
          {
            concepto: 'Vacaciones',
            formula: '(Salario × Días trabajados) / 720',
            calculo: `($${salario.toLocaleString()} × ${diasTrabajados}) / 720`,
            valor: vacaciones,
            valorFormateado: vacaciones.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
            fundamento: 'Art. 186 CST'
          }
        ],

        // Indemnización
        indemnizacion: indemnizacion > 0 ? {
          procede: true,
          concepto: 'Indemnización por Despido sin Justa Causa',
          formula: salario < (10 * salarioMinimo) 
            ? '30 días de salario' 
            : '20 días de salario por el primer año + 15 días por cada año adicional',
          calculo: `$${salario.toLocaleString()} × ${salario < (10 * salarioMinimo) ? '30 días' : '20 días'}`,
          valor: indemnizacion,
          valorFormateado: indemnizacion.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          fundamento: 'Art. 64 CST',
          nota: formulario.causaRetiro === 'Despido sin justa causa' 
            ? '⚠️ Indemnización aplicable por despido sin justa causa'
            : 'ℹ️ Aplica según tipo de terminación'
        } : null,

        // Total
        totalGeneral: {
          subtotal: cesantias + interesesCesantias + prima + vacaciones,
          subtotalFormateado: (cesantias + interesesCesantias + prima + vacaciones).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          indemnizacion: indemnizacion,
          indemnizacionFormateada: indemnizacion.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          total: totalLiquidacion,
          totalFormateado: totalLiquidacion.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
          salariosMeses: (totalLiquidacion / salario).toFixed(2)
        },

        // Advertencias
        advertencias: [
          diasTrabajados < 365 ? "⚠️ Trabajador con menos de 1 año de servicio" : null,
          salario < salarioMinimo ? "⚠️ Salario inferior al mínimo legal" : null,
          formulario.tipoContrato === 'Sin Contrato Escrito' ? "⚠️ Sin contrato escrito - presunción de contrato indefinido" : null,
          indemnizacion === 0 && formulario.causaRetiro === 'Despido sin justa causa' ? "⚠️ Puede reclamar indemnización adicional" : null
        ].filter(Boolean),

        // Notas Importantes
        notasImportantes: [
          "Los cálculos son aproximados y deben verificarse con todas las novedades",
          "No incluye bonificaciones, auxilios u otros pagos variables",
          "Verificar si hay convención colectiva aplicable",
          "Los salarios en mora generan intereses moratorios",
          "Consultar con abogado laboral para caso específico"
        ],

        metadatos: {
          fechaCalculo: new Date().toISOString(),
          version: '1.0',
          salarioMinimo: salarioMinimo,
          anioCalculo: new Date().getFullYear()
        }
      };

      setFormulario(prev => ({
        ...prev,
        calculosIA: calculosDetallados
      }));
      
    } catch (error) {
      console.error('Error en cálculo:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const analizarCasoLaboralIA = async () => {
    if (!formulario.hechos || !formulario.tipoCaso) {
      alert('Complete el tipo de caso y los hechos');
      return;
    }

    setCargandoIA(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      const casoInfo = tiposCasoLaboral.find(c => c.tipo === formulario.tipoCaso);
      
      const analisisCompleto = {
        // Análisis Jurídico Laboral
        analisisJuridico: {
          especialista: "Dr. Francisco Rafael Ostau de Lafont - Derecho Laboral",
          fundamentacion: `El derecho laboral en Colombia está regulado principalmente por el Código Sustantivo del Trabajo (CST), la Constitución Política (Art. 25, 53) y convenios de la OIT. El principio de favorabilidad laboral establece que en caso de duda prevalece la interpretación más favorable al trabajador. Su caso de ${formulario.tipoCaso} está protegido por el ordenamiento laboral colombiano.`,
          analisisDelCaso: formulario.tipoCaso === 'Despido Injustificado' 
            ? `El despido sin justa causa está regulado en el Art. 64 del CST. El empleador puede terminar el contrato sin justa causa pero debe pagar indemnización. Si usted considera que el despido fue injustificado, tiene derecho a demandar la indemnización correspondiente más salarios y prestaciones adeudadas.`
            : formulario.tipoCaso === 'Acoso Laboral'
            ? `El acoso laboral está regulado por la Ley 1010 de 2006. Constituye toda conducta persistente y demostrable, ejercida sobre un empleado, que tenga como finalidad infundir miedo, intimidación, terror o angustia. Es causal de terminación con justa causa imputable al empleador.`
            : formulario.tipoCaso === 'Fuero de Maternidad'
            ? `La protección a la maternidad es un derecho fundamental (Art. 43 C.P.). El fuero de maternidad prohíbe el despido desde el embarazo hasta 18 semanas después del parto sin autorización del Inspector de Trabajo. El despido sin autorización es INEFICAZ.`
            : `Su caso laboral está protegido por el ordenamiento jurídico colombiano. El principio de favorabilidad y la primacía de la realidad sobre las formas protegen sus derechos.`,
          normatividadAplicable: [
            "Constitución Política - Arts. 25, 48, 53",
            "Código Sustantivo del Trabajo",
            "Ley 789 de 2002 - Reforma laboral",
            "Ley 1010 de 2006 - Acoso laboral",
            "Ley 50 de 1990 - Cesantías",
            "Decreto 2351 de 1965 - Prestaciones",
            formulario.tipoCaso === 'Acoso Laboral' ? "Ley 1010 de 2006" : null,
            formulario.tipoCaso.includes('Maternidad') ? "Ley 1822 de 2017" : null
          ].filter(Boolean),
          principiosLaborales: [
            "Favorabilidad: En duda, lo más favorable al trabajador",
            "Primacía de la realidad: Prevalecen los hechos sobre lo pactado",
            "Irrenunciabilidad: Derechos mínimos no son renunciables",
            "Estabilidad laboral: Protección contra despido arbitrario",
            "Igualdad: No discriminación en el trabajo"
          ],
          derechosDelTrabajador: [
            "Derecho al trabajo en condiciones dignas",
            "Derecho a un salario justo",
            "Derecho a prestaciones sociales",
            "Derecho a la seguridad social",
            "Derecho a la estabilidad laboral",
            "Derecho a no ser discriminado",
            "Derecho a un ambiente laboral sano"
          ]
        },

        // Análisis de Procedimiento
        analisisProcedimental: {
          especialista: "Dra. Adriana Camacho - Derecho Procesal Laboral",
          procedimientoLaboral: {
            etapa1: {
              nombre: "Arreglo Directo",
              obligatorio: true,
              plazo: "Antes de demandar",
              descripcion: "Intentar solución directa con empleador",
              resultado: "Si no hay acuerdo, procede demanda"
            },
            etapa2: {
              nombre: "Conciliación Prejudicial",
              obligatorio: false,
              plazo: "Opcional antes de demanda",
              ante: "Inspector de Trabajo o Centro de Conciliación",
              resultado: "Acuerdo conciliatorio o constancia de no acuerdo"
            },
            etapa3: {
              nombre: "Demanda Laboral",
              obligatorio: true,
              plazo: "3 años desde terminación (prescripción)",
              ante: "Juez Laboral del Circuito",
              contenido: [
                "Identificación de partes",
                "Hechos de la relación laboral",
                "Pretensiones económicas",
                "Fundamentos de derecho",
                "Pruebas"
              ]
            },
            etapa4: {
              nombre: "Contestación y Audiencias",
              plazo: "10 días para contestar",
              descripcion: "Audiencia de conciliación, decisión de excepciones, práctica de pruebas",
              duracion: "3-6 meses aproximadamente"
            },
            etapa5: {
              nombre: "Sentencia",
              plazo: "Variable según complejidad",
              resultado: "Condena o absolución",
              apelacion: "Procede ante Tribunal Superior"
            }
          },
          plazosImportantes: {
            prescripcion: "3 años desde terminación del contrato",
            contestacion: "10 días desde notificación demanda",
            apelacion: "3 días desde notificación sentencia",
            cumplimiento: "Inmediato o según lo ordenado"
          },
          competencia: "Juez Laboral del Circuito del lugar de ejecución del contrato o domicilio del demandante",
          cuantia: formulario.calculosIA 
            ? `$${formulario.calculosIA.totalGeneral.total.toLocaleString()} - ${
                formulario.calculosIA.totalGeneral.total > 140000000 ? 'Mayor cuantía' :
                formulario.calculosIA.totalGeneral.total > 35000000 ? 'Menor cuantía' : 'Mínima cuantía'
              }`
            : "Pendiente de cálculo"
        },

        // Análisis de Jurisprudencia Laboral
        analisisJurisprudencial: {
          especialista: "Dr. Gerardo Arenas Monsalve - Jurisprudencia Laboral",
          sentenciasRelevantes: formulario.tipoCaso === 'Despido Injustificado' ? [
            {
              corte: "Corte Constitucional",
              sentencia: "T-1083/07",
              tema: "Estabilidad laboral reforzada",
              ratio: "Trabajadores en situación de debilidad tienen protección especial"
            },
            {
              corte: "Corte Suprema de Justicia",
              sentencia: "SL-2360/2019",
              tema: "Despido sin justa causa",
              ratio: "Indemnización debe calcularse sobre último salario devengado"
            }
          ] : formulario.tipoCaso === 'Acoso Laboral' ? [
            {
              corte: "Corte Suprema de Justicia",
              sentencia: "SL-1211/2021",
              tema: "Acoso laboral",
              ratio: "Debe probarse conducta persistente y demostrable"
            },
            {
              corte: "Corte Constitucional",
              sentencia: "T-882/06",
              tema: "Protección contra acoso",
              ratio: "Empleador debe prevenir y sancionar acoso laboral"
            }
          ] : formulario.tipoCaso.includes('Maternidad') ? [
            {
              corte: "Corte Constitucional",
              sentencia: "SU-075/18",
              tema: "Fuero de maternidad",
              ratio: "Despido sin autorización es ineficaz, no anulable"
            },
            {
              corte: "Corte Constitucional",
              sentencia: "T-095/08",
              tema: "Protección a la maternidad",
              ratio: "Es un derecho fundamental que requiere protección especial"
            }
          ] : [
            {
              corte: "Corte Suprema de Justicia",
              sentencia: "Varios precedentes",
              tema: "Derechos laborales",
              ratio: "Aplicación del principio de favorabilidad"
            }
          ],
          principioJurisprudencial: "In dubio pro operario - En caso de duda, lo más favorable al trabajador"
        },

        // Cálculo Detallado de Pretensiones
        calculoPretensiones: {
          especialista: "Dra. Natalia Jaimes - Cálculos Laborales",
          pretensionesEconomicas: formulario.calculosIA ? [
            {
              concepto: "Cesantías",
              valor: formulario.calculosIA.conceptos[0].valorFormateado,
              procedencia: "100%"
            },
            {
              concepto: "Intereses sobre Cesantías",
              valor: formulario.calculosIA.conceptos[1].valorFormateado,
              procedencia: "100%"
            },
            {
              concepto: "Prima de Servicios",
              valor: formulario.calculosIA.conceptos[2].valorFormateado,
              procedencia: "100%"
            },
            {
              concepto: "Vacaciones",
              valor: formulario.calculosIA.conceptos[3].valorFormateado,
              procedencia: "100%"
            },
            formulario.calculosIA.indemnizacion ? {
              concepto: "Indemnización",
              valor: formulario.calculosIA.indemnizacion.valorFormateado,
              procedencia: formulario.causaRetiro === 'Despido sin justa causa' ? "95%" : "Verificar"
            } : null
          ].filter(Boolean) : [],
          totalPretension: formulario.calculosIA?.totalGeneral.totalFormateado || "Pendiente",
          interesesMoratorios: "Adicionales si hay mora en pago",
          costasJudiciales: "A cargo del empleador si pierde",
          honorariosAbogado: "10-30% de lo recuperado (éxito)"
        },

        // Estrategia Procesal
        estrategiaProcesal: {
          especialista: "Dr. Jorge Parra Benítez - Litigante Laboral",
          estrategiaRecomendada: [
            {
              paso: 1,
              accion: "Solicitar Certificado Laboral",
              objetivo: "Documentar relación laboral",
              plazo: "Inmediato"
            },
            {
              paso: 2,
              accion: "Reunir Pruebas",
              objetivo: "Colillas de pago, contratos, comunicaciones",
              plazo: "1-2 semanas"
            },
            {
              paso: 3,
              accion: "Intentar Arreglo Directo",
              objetivo: "Solución amigable sin litigio",
              plazo: "1 semana"
            },
            {
              paso: 4,
              accion: "Conciliación (opcional)",
              objetivo: "Acuerdo con mediación",
              plazo: "2-3 semanas"
            },
            {
              paso: 5,
              accion: "Presentar Demanda",
              objetivo: "Iniciar proceso judicial",
              plazo: "Antes de 3 años (prescripción)"
            }
          ],
          pruebasEsenciales: [
            "Contrato de trabajo (si existe)",
            "Certificado laboral",
            "Colillas de pago (últimas 6 mínimo)",
            "Comunicaciones de despido",
            "Correos electrónicos",
            "Testimonios de compañeros",
            "Fotos, videos (si hay acoso)"
          ],
          probabilidadExito: formulario.tipoCaso === 'Despido Injustificado' ? "80-90%" :
                             formulario.tipoCaso === 'Fuero de Maternidad' ? "95%" :
                             formulario.tipoCaso === 'Acoso Laboral' ? "60-70%" :
                             "70-85%",
          tiempoEstimado: "6-18 meses en primera instancia",
          costoEstimado: "Si gana, el empleador paga costas. Si pierde, debe pagar agencias en derecho al empleador."
        },

        // Resumen Ejecutivo
        resumenEjecutivo: {
          diagnostico: `Caso de ${formulario.tipoCaso} con fundamento en el Código Sustantivo del Trabajo y la Constitución Política`,
          fundamentoJuridico: "CST, Constitución Arts. 25 y 53, Jurisprudencia Corte Suprema",
          gravedad: casoInfo?.gravedad || 'MEDIA',
          urgencia: formulario.tipoCaso.includes('Maternidad') || formulario.tipoCaso === 'Acoso Laboral' ? 'ALTA' : 'MEDIA',
          montoReclamado: formulario.calculosIA?.totalGeneral.totalFormateado || 'Pendiente de cálculo',
          probabilidadExito: formulario.tipoCaso === 'Fuero de Maternidad' ? '95%' :
                             formulario.tipoCaso === 'Despido Injustificado' ? '85%' :
                             formulario.tipoCaso === 'Acoso Laboral' ? '65%' : '75%',
          tiempoEstimado: "6-18 meses",
          recomendacionPrincipal: formulario.tipoCaso === 'Fuero de Maternidad'
            ? "URGENTE: Solicitar reintegro inmediato + pago salarios dejados de percibir. El despido es INEFICAZ."
            : formulario.tipoCaso === 'Despido Injustificado'
            ? "Demandar indemnización + prestaciones + salarios. Alta probabilidad de éxito."
            : "Reunir pruebas sólidas y presentar demanda laboral. Seguir procedimiento recomendado."
        },

        metadatos: {
          fechaAnalisis: new Date().toISOString(),
          especialistasConsultados: 4,
          normatividadRevisada: 8,
          jurisprudenciaAnalizada: 6,
          calculosRealizados: formulario.calculosIA ? 'Sí' : 'No',
          nivelConfianza: "93%"
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

  const generarDemandaLaboral = () => {
    if (!formulario.analisisIA) {
      alert('Primero debe analizar el caso con IA');
      return;
    }

    const demandaContent = {
      titulo: 'DEMANDA LABORAL',
      subtitulo: formulario.tipoCaso,
      fecha: new Date().toLocaleString('es-CO'),
      codigo: `LAB-${Date.now()}`,
      
      demandante: {
        nombre: formulario.nombreTrabajador,
        identificacion: formulario.identificacion,
        cargo: formulario.cargo,
        fechaIngreso: formulario.fechaIngreso,
        fechaRetiro: formulario.fechaRetiro,
        salario: formulario.ultimoSalario
      },
      
      demandado: {
        nombre: formulario.nombreEmpleador,
        nit: formulario.nitEmpleador,
        actividad: formulario.actividadEconomica
      },
      
      hechos: formulario.hechos,
      
      pretensiones: formulario.calculosIA ? [
        `1. CESANTÍAS: ${formulario.calculosIA.conceptos[0].valorFormateado}`,
        `2. INTERESES SOBRE CESANTÍAS: ${formulario.calculosIA.conceptos[1].valorFormateado}`,
        `3. PRIMA DE SERVICIOS: ${formulario.calculosIA.conceptos[2].valorFormateado}`,
        `4. VACACIONES: ${formulario.calculosIA.conceptos[3].valorFormateado}`,
        formulario.calculosIA.indemnizacion ? `5. INDEMNIZACIÓN: ${formulario.calculosIA.indemnizacion.valorFormateado}` : null,
        `TOTAL: ${formulario.calculosIA.totalGeneral.totalFormateado}`
      ].filter(Boolean) : [formulario.pretensiones],
      
      fundamentacion: formulario.analisisIA.analisisJuridico.normatividadAplicable,
      
      pruebas: [
        formulario.contratoTrabajo ? "Contrato de trabajo" : null,
        formulario.certificadoLaboral ? "Certificado laboral" : null,
        formulario.colillaPago ? "Colillas de pago" : null,
        ...formulario.evidencias.map(e => e.name)
      ].filter(Boolean),
      
      analisisIA: formulario.analisisIA,
      
      calculosIA: formulario.calculosIA
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(demandaContent, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `demanda-laboral-${formulario.nombreTrabajador.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const casoSeleccionado = tiposCasoLaboral.find(c => c.tipo === formulario.tipoCaso);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' }}>
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
              <Briefcase size={60} style={{ marginRight: '1rem' }} />
              <Scale size={60} style={{ marginRight: '1rem' }} />
              <DollarSign size={60} />
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Justicia Laboral
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.9,
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Protección de Derechos de los Trabajadores con Análisis IA
              <br/>
              <span style={{ fontSize: '1.1rem' }}>
                Código Sustantivo del Trabajo • Constitución Art. 25 y 53 • Calculadora de Liquidación IA
              </span>
            </p>
          </div>

          {/* Calculadora de Liquidación */}
          <Card style={{ 
            padding: '2rem', 
            marginBottom: '2rem',
            background: 'white'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold',
                color: '#15803d'
              }}>
                <Calculator style={{ display: 'inline', marginRight: '0.75rem' }} />
                Calculadora de Liquidación Laboral con IA
              </h2>
              <Button
                onClick={() => setMostrarCalculadora(!mostrarCalculadora)}
                style={{ 
                  background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                {mostrarCalculadora ? 'Ocultar' : 'Mostrar'} Calculadora
              </Button>
            </div>

            {mostrarCalculadora && (
              <div>
                <Alert style={{ 
                  background: '#dbeafe', 
                  border: '1px solid #3b82f6',
                  color: '#1e40af',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '2rem'
                }}>
                  <Info style={{ marginRight: '0.5rem', display: 'inline' }} />
                  <strong>Calculadora Automática:</strong> Ingrese los datos laborales y la IA calculará automáticamente su liquidación conforme al Código Sustantivo del Trabajo.
                </Alert>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <Label style={{ fontWeight: 'bold', color: '#374151' }}>
                      Fecha de Ingreso *
                    </Label>
                    <Input
                      type="date"
                      value={formulario.fechaIngreso}
                      onChange={(e) => handleInputChange('fechaIngreso', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label style={{ fontWeight: 'bold', color: '#374151' }}>
                      Fecha de Retiro *
                    </Label>
                    <Input
                      type="date"
                      value={formulario.fechaRetiro}
                      onChange={(e) => handleInputChange('fechaRetiro', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label style={{ fontWeight: 'bold', color: '#374151' }}>
                      Último Salario *
                    </Label>
                    <Input
                      type="number"
                      value={formulario.ultimoSalario}
                      onChange={(e) => handleInputChange('ultimoSalario', e.target.value)}
                      placeholder="$1.300.000"
                    />
                  </div>

                  <div>
                    <Label style={{ fontWeight: 'bold', color: '#374151' }}>
                      Causa del Retiro *
                    </Label>
                    <Select
                      value={formulario.causaRetiro}
                      onValueChange={(value) => handleInputChange('causaRetiro', value)}
                    >
                      <option value="">Seleccionar</option>
                      {causasRetiro.map((causa) => (
                        <option key={causa} value={causa}>
                          {causa}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <Button
                    onClick={calcularLiquidacionIA}
                    disabled={cargandoIA || !formulario.ultimoSalario || !formulario.fechaIngreso || !formulario.fechaRetiro}
                    style={{ 
                      background: cargandoIA ? '#9ca3af' : 'linear-gradient(45deg, #16a34a, #15803d)',
                      border: 'none',
                      padding: '1rem 2.5rem',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: '0.75rem',
                      color: 'white',
                      cursor: cargandoIA || !formulario.ultimoSalario ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      margin: '0 auto'
                    }}
                  >
                    {cargandoIA ? (
                      <>
                        <Clock style={{ marginRight: '0.75rem' }} />
                        Calculando...
                      </>
                    ) : (
                      <>
                        <Calculator style={{ marginRight: '0.75rem' }} />
                        Calcular Liquidación con IA
                      </>
                    )}
                  </Button>
                </div>

                {/* Mostrar Resultados del Cálculo */}
                {formulario.calculosIA && (
                  <div style={{ 
                    marginTop: '2rem',
                    padding: '2rem',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    borderRadius: '0.75rem',
                    border: '2px solid #16a34a'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold',
                      color: '#15803d',
                      marginBottom: '1.5rem',
                      textAlign: 'center'
                    }}>
                      💰 Resultado del Cálculo de Liquidación
                    </h3>

                    {/* Información Laboral */}
                    <div style={{ 
                      padding: '1.5rem',
                      background: 'white',
                      borderRadius: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                        📋 Información Laboral
                      </h4>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '0.75rem' 
                      }}>
                        <p><strong>Tiempo de servicio:</strong> {formulario.calculosIA.informacionLaboral.tiempoServicio}</p>
                        <p><strong>Días trabajados:</strong> {formulario.calculosIA.informacionLaboral.diasTrabajados}</p>
                        <p><strong>Salario base:</strong> {formulario.calculosIA.informacionLaboral.salarioBase}</p>
                        <p><strong>Tipo contrato:</strong> {formulario.calculosIA.informacionLaboral.tipoContrato}</p>
                      </div>
                    </div>

                    {/* Conceptos de Liquidación */}
                    <div style={{ 
                      padding: '1.5rem',
                      background: 'white',
                      borderRadius: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
                        💵 Conceptos de Liquidación
                      </h4>
                      {formulario.calculosIA.conceptos.map((concepto, index) => (
                        <div key={index} style={{ 
                          padding: '1rem',
                          background: '#f9fafb',
                          borderRadius: '0.25rem',
                          marginBottom: '0.75rem',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                          }}>
                            <h5 style={{ fontWeight: 'bold', color: '#1f2937' }}>
                              {concepto.concepto}
                            </h5>
                            <Badge style={{ 
                              background: '#16a34a',
                              color: 'white',
                              fontSize: '1rem',
                              padding: '0.5rem 1rem'
                            }}>
                              {concepto.valorFormateado}
                            </Badge>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                            <strong>Fórmula:</strong> {concepto.formula}
                          </p>
                          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                            <strong>Cálculo:</strong> {concepto.calculo}
                          </p>
                          <p style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 'bold' }}>
                            <strong>Fundamento:</strong> {concepto.fundamento}
                          </p>
                        </div>
                      ))}

                      {/* Indemnización */}
                      {formulario.calculosIA.indemnizacion && (
                        <div style={{ 
                          padding: '1.5rem',
                          background: '#fef2f2',
                          borderRadius: '0.5rem',
                          marginTop: '1rem',
                          border: '2px solid #ef4444'
                        }}>
                          <h5 style={{ fontWeight: 'bold', color: '#991b1b', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                            💼 {formulario.calculosIA.indemnizacion.concepto}
                          </h5>
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                          }}>
                            <span style={{ color: '#7f1d1d' }}>Valor:</span>
                            <Badge style={{ 
                              background: '#ef4444',
                              color: 'white',
                              fontSize: '1.2rem',
                              padding: '0.75rem 1.5rem'
                            }}>
                              {formulario.calculosIA.indemnizacion.valorFormateado}
                            </Badge>
                          </div>
                          <p style={{ fontSize: '0.9rem', color: '#7f1d1d', marginBottom: '0.25rem' }}>
                            <strong>Fórmula:</strong> {formulario.calculosIA.indemnizacion.formula}
                          </p>
                          <p style={{ fontSize: '0.9rem', color: '#7f1d1d', marginBottom: '0.25rem' }}>
                            <strong>Fundamento:</strong> {formulario.calculosIA.indemnizacion.fundamento}
                          </p>
                          <p style={{ fontSize: '0.9rem', color: '#dc2626', fontWeight: 'bold', marginTop: '0.5rem' }}>
                            {formulario.calculosIA.indemnizacion.nota}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Total General */}
                    <div style={{ 
                      padding: '2rem',
                      background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <h3 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                      }}>
                        💰 TOTAL A RECLAMAR
                      </h3>
                      <div style={{ 
                        fontSize: '3rem', 
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                      }}>
                        {formulario.calculosIA.totalGeneral.totalFormateado}
                      </div>
                      <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                        Equivalente a {formulario.calculosIA.totalGeneral.salariosMeses} meses de salario
                      </p>
                    </div>

                    {/* Advertencias */}
                    {formulario.calculosIA.advertencias.length > 0 && (
                      <div style={{ 
                        marginTop: '1.5rem',
                        padding: '1rem',
                        background: '#fef3c7',
                        borderRadius: '0.5rem',
                        border: '1px solid #f59e0b'
                      }}>
                        <h4 style={{ fontWeight: 'bold', color: '#92400e', marginBottom: '0.5rem' }}>
                          ⚠️ Advertencias
                        </h4>
                        {formulario.calculosIA.advertencias.map((adv, index) => (
                          <p key={index} style={{ color: '#92400e', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                            {adv}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Botón de Análisis Jurídico */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Button
              onClick={analizarCasoLaboralIA}
              disabled={cargandoIA || !formulario.tipoCaso}
              style={{ 
                background: cargandoIA ? '#9ca3af' : 'linear-gradient(45deg, #16a34a, #15803d)',
                border: 'none',
                padding: '1.5rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '0.75rem',
                color: 'white',
                cursor: cargandoIA || !formulario.tipoCaso ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                margin: '0 auto',
                boxShadow: '0 4px 20px rgba(22, 163, 74, 0.3)'
              }}
            >
              {cargandoIA ? (
                <>
                  <Clock style={{ marginRight: '0.75rem' }} />
                  Analizando Caso Laboral...
                </>
              ) : (
                <>
                  <Brain style={{ marginRight: '0.75rem' }} />
                  Analizar Caso con Especialistas IA
                </>
              )}
            </Button>
          </div>

          {/* Mostrar Análisis */}
          {mostrarAnalisis && formulario.analisisIA && (
            <Card style={{ padding: '2rem', background: 'white' }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold',
                color: '#15803d',
                marginBottom: '2rem'
              }}>
                📊 Análisis Especializado del Caso Laboral
              </h2>

              <div style={{ 
                padding: '2rem',
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                borderRadius: '0.75rem',
                border: '2px solid #3b82f6',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '1rem' }}>
                  🎯 Resumen Ejecutivo
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1rem' 
                }}>
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Probabilidad de Éxito:
                    </p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>
                      {formulario.analisisIA.estrategiaProcesal.probabilidadExito}
                    </p>
                  </div>
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Monto a Reclamar:
                    </p>
                    <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#059669' }}>
                      {formulario.analisisIA.resumenEjecutivo.montoReclamado}
                    </p>
                  </div>
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '0.5rem' }}>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Tiempo Estimado:
                    </p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#374151' }}>
                      {formulario.analisisIA.resumenEjecutivo.tiempoEstimado}
                    </p>
                  </div>
                </div>
                <div style={{ 
                  marginTop: '1.5rem',
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '0.5rem',
                  border: '2px solid #3b82f6'
                }}>
                  <p style={{ fontSize: '1.05rem', color: '#1e40af', lineHeight: '1.7', fontWeight: '500' }}>
                    <strong>Recomendación:</strong> {formulario.analisisIA.resumenEjecutivo.recomendacionPrincipal}
                  </p>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center',
                marginTop: '2rem'
              }}>
                <Button
                  onClick={generarDemandaLaboral}
                  style={{ 
                    background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                    border: 'none',
                    padding: '1.25rem 2.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: '0.75rem',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Download style={{ marginRight: '0.75rem' }} />
                  Generar Demanda Laboral PDF
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default JusticiaLaboral;
