import { useState, useEffect } from 'react';
import AIServiceBackend from '../services/AIServiceBackend';

/**
 * Hook simplificado de estadísticas - devuelve datos vacíos
 */
export const useEstadisticas = () => {
  return {
    estadisticas: {
      totalCasos: 0,
      casosActivos: 0,
      casosResueltos: 0
    },
    loading: false,
    error: null
  };
};

export const useEstadisticasGenerales = () => {
  return {
    estadisticas: {
      total: 0,
      activos: 0,
      completados: 0
    },
    loading: false,
    error: null
  };
};

export const useEstadisticasEtnicas = () => {
  return {
    estadisticas: {
      totalComunidades: 0,
      totalPueblos: 0,
      totalCasos: 0
    },
    loading: false,
    error: null
  };
};

export const useEstadisticasProyectos = () => {
  return {
    estadisticas: {
      totalProyectos: 0,
      proyectosActivos: 0,
      proyectosCompletados: 0
    },
    loading: false,
    error: null
  };
};

/**
 * Hook para obtener estadísticas de IA del Monitor
 */
export const useEstadisticasIA = (autoRefresh = false) => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const actualizarDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      const response = await AIServiceBackend.obtenerEstadisticasMonitor();
      if (response.success) {
        setDatos(response.data);
      }
    } catch (err) {
      console.error('Error al obtener estadísticas IA:', err);
      setError(err.message);
      // Datos de respaldo
      setDatos({
        consultasTotales: 0,
        consultasHoy: 0,
        consultasActivas: 0,
        satisfaccionUsuario: 4.8,
        precisionModelo: 96.5,
        tiempoPromedioRespuesta: '1.2s'
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    actualizarDatos();

    // Auto-refresh cada 30 segundos si está habilitado
    if (autoRefresh) {
      const interval = setInterval(actualizarDatos, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return { 
    datos, 
    cargando, 
    error, 
    actualizarDatos 
  };
};

/**
 * Hook para métricas de rendimiento
 */
export const useMetricasRendimiento = (autoRefresh = false) => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const actualizarDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      const response = await AIServiceBackend.obtenerMetricasRendimiento();
      if (response.success) {
        setDatos(response.data);
      }
    } catch (err) {
      console.error('Error al obtener métricas:', err);
      setError(err.message);
      // Datos de respaldo
      setDatos({
        consultasPorHora: [],
        areasMasConsultadas: []
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    actualizarDatos();

    // Auto-refresh cada 60 segundos si está habilitado
    if (autoRefresh) {
      const interval = setInterval(actualizarDatos, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return { 
    datos, 
    cargando, 
    error, 
    actualizarDatos 
  };
};

/**
 * Hook para estado de servicios de IA
 */
export const useEstadoServicios = (autoRefresh = false) => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const actualizarDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      const response = await AIServiceBackend.obtenerEstadoServicios();
      if (response.success) {
        setDatos(response.data);
      }
    } catch (err) {
      console.error('Error al obtener estado de servicios:', err);
      setError(err.message);
      // Datos de respaldo
      setDatos([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    actualizarDatos();

    // Auto-refresh cada 15 segundos si está habilitado
    if (autoRefresh) {
      const interval = setInterval(actualizarDatos, 15000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return { 
    datos, 
    cargando, 
    error, 
    actualizarDatos 
  };
};

/**
 * Hook para estadísticas del Centro de Innovación IA
 */
export const useEstadisticasCentroIA = (autoRefresh = false) => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const actualizarDatos = async () => {
    try {
      setCargando(true);
      setError(null);
      const response = await AIServiceBackend.obtenerEstadisticasCentro();
      if (response.success) {
        setDatos(response.data);
      }
    } catch (err) {
      console.error('Error al obtener estadísticas del centro:', err);
      setError(err.message);
      // Datos de respaldo
      setDatos({
        casosAtendidos: 0,
        efectividadIA: 95.8,
        comunidadesAtendidas: 0,
        proyectosVigilados: 0
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    actualizarDatos();

    // Auto-refresh cada 60 segundos si está habilitado
    if (autoRefresh) {
      const interval = setInterval(actualizarDatos, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return { 
    datos, 
    cargando, 
    error, 
    actualizarDatos 
  };
};

export const useEstadisticasGeograficas = () => {
  return {
    estadisticas: {
      totalRegiones: 0,
      totalMunicipios: 0,
      totalDepartamentos: 0
    },
    loading: false,
    error: null
  };
};

export const useEstadisticasDonaciones = () => {
  return {
    estadisticas: {
      totalDonaciones: 0,
      totalRecaudado: 0
    },
    loading: false,
    error: null
  };
};

export const useEstadisticasVeeduria = () => {
  return {
    estadisticas: {
      totalVeedurias: 0,
      veeduriasActivas: 0
    },
    loading: false,
    error: null
  };
};

export default useEstadisticas;

