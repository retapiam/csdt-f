import { useState, useCallback } from 'react';
import { advancedAIService } from '../services/ia/AdvancedAIService';

/**
 * Hook personalizado para integración con servicios de IA
 * Proporciona funcionalidades comunes para análisis jurídico con IA
 */
export const useIntegracionIA = () => {
  const [estadoIA, setEstadoIA] = useState({
    cargando: false,
    respuesta: '',
    error: '',
    mostrarRespuesta: false
  });

  const analizarConIA = useCallback(async (consulta, especialidad = 'derecho_constitucional') => {
    if (!consulta.trim()) {
      setEstadoIA(prev => ({
        ...prev,
        error: 'Por favor, ingrese su consulta'
      }));
      return null;
    }

    setEstadoIA(prev => ({
      ...prev,
      cargando: true,
      error: '',
      mostrarRespuesta: false
    }));

    try {
      // Generar respuesta profesional con IA avanzada
      const resultado = await advancedAIService.analyzeLegal(consulta, {
        specialty: especialidad,
        analysisType: 'professional'
      });
      
      setEstadoIA(prev => ({
        ...prev,
        cargando: false,
        respuesta: resultado.response || resultado.respuesta || 'Análisis completado',
        mostrarRespuesta: true
      }));

      return resultado;
      
    } catch (err) {
      setEstadoIA(prev => ({
        ...prev,
        cargando: false,
        error: 'Error al procesar la consulta. Intente nuevamente.'
      }));
      
      console.error('Error en análisis IA:', err);
      return null;
    }
  }, []);

  const limpiarAnalisis = useCallback(() => {
    setEstadoIA({
      cargando: false,
      respuesta: '',
      error: '',
      mostrarRespuesta: false
    });
  }, []);

  const generarConsultaAutomatica = useCallback((datosFormulario, tipoAccion) => {
    const consultas = {
      accion_grupo: `Acción de Grupo - Grupo vulnerable: ${datosFormulario.gru_vul || 'No especificado'}. Hechos: ${datosFormulario.hec || 'No especificados'}. Solicitud: ${datosFormulario.sol || 'No especificada'}.`,
      
      accion_popular: `Acción Popular - Derecho colectivo: ${datosFormulario.der_col || 'No especificado'}. Hechos: ${datosFormulario.hec || 'No especificados'}. Solicitud: ${datosFormulario.sol || 'No especificada'}.`,
      
      accion_tutela: `Acción de Tutela - Derecho vulnerado: ${datosFormulario.der_vul || 'No especificado'}. Hechos: ${datosFormulario.hec || 'No especificados'}. Solicitud: ${datosFormulario.sol || 'No especificada'}.`,
      
      accion_cumplimiento: `Acción de Cumplimiento - Norma: ${datosFormulario.nor || 'No especificada'}. Hechos: ${datosFormulario.hec || 'No especificados'}. Solicitud: ${datosFormulario.sol || 'No especificada'}.`,
      
      demanda_juridica: `Demanda Jurídica - Tipo: ${datosFormulario.tip_dem || 'No especificado'}. Hechos: ${datosFormulario.hec || 'No especificados'}. Solicitud: ${datosFormulario.sol || 'No especificada'}.`,
      
      pqrsfd: `PQRSFD - Tipo: ${datosFormulario.tip || 'No especificado'}. Descripción: ${datosFormulario.des || 'No especificada'}.`,
      
      territorio_ancestral: `Territorio Ancestral - Nombre: ${datosFormulario.nom || 'No especificado'}. Comunidad: ${datosFormulario.com || 'No especificada'}. Descripción: ${datosFormulario.des || 'No especificada'}.`,
      
      patrimonio_cultural: `Patrimonio Cultural - Nombre: ${datosFormulario.nom || 'No especificado'}. Categoría: ${datosFormulario.cat || 'No especificada'}. Descripción: ${datosFormulario.des || 'No especificada'}.`,
      
      narracion_etnica: `Narración Étnica - Título: ${datosFormulario.tit || 'No especificado'}. Comunidad: ${datosFormulario.com || 'No especificada'}. Contenido: ${datosFormulario.con || 'No especificado'}.`,
      
      mediacion_intercultural: `Mediación Intercultural - Título: ${datosFormulario.tit || 'No especificado'}. Comunidad: ${datosFormulario.com || 'No especificada'}. Tipo: ${datosFormulario.tip || 'No especificado'}.`,
      
      historia_territorio: `Historia del Territorio - Título: ${datosFormulario.tit || 'No especificado'}. Comunidad: ${datosFormulario.com || 'No especificada'}. Período: ${datosFormulario.per || 'No especificado'}.`,
      
      educacion_propia: `Educación Propia - Nombre: ${datosFormulario.nom || 'No especificado'}. Comunidad: ${datosFormulario.com || 'No especificada'}. Nivel: ${datosFormulario.niv || 'No especificado'}.`
    };

    return consultas[tipoAccion] || `Consulta general: ${JSON.stringify(datosFormulario)}`;
  }, []);

  const obtenerEspecialidadRecomendada = useCallback((tipoAccion) => {
    const especialidades = {
      accion_grupo: 'derecho_constitucional',
      accion_popular: 'derecho_constitucional',
      accion_tutela: 'derecho_constitucional',
      accion_cumplimiento: 'derecho_administrativo',
      accion_nulidad: 'derecho_administrativo',
      accion_reparacion_directa: 'derecho_administrativo',
      demanda_juridica: 'derecho_civil',
      pqrsfd: 'derecho_administrativo',
      territorio_ancestral: 'derecho_constitucional',
      patrimonio_cultural: 'derecho_constitucional',
      narracion_etnica: 'derecho_constitucional',
      mediacion_intercultural: 'derecho_constitucional',
      historia_territorio: 'derecho_constitucional',
      educacion_propia: 'derecho_constitucional'
    };

    return especialidades[tipoAccion] || 'derecho_constitucional';
  }, []);

  return {
    estadoIA,
    analizarConIA,
    limpiarAnalisis,
    generarConsultaAutomatica,
    obtenerEspecialidadRecomendada
  };
};

export default useIntegracionIA;
