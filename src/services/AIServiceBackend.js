import api from './api';

/**
 * Servicio para análisis con Inteligencia Artificial
 */
export const AIServiceBackend = {
  /**
   * Análisis jurídico con IA
   * @param {Object} data - Datos del caso jurídico
   * @returns {Promise<Object>} Análisis jurídico
   */
  analizarJuridico: async (data) => {
    try {
      const response = await api.post('/ia/analizar-juridico', data);
      return response.data;
    } catch (error) {
      console.error('Error al analizar caso jurídico:', error);
      throw error;
    }
  },

  /**
   * Análisis étnico con IA
   * @param {Object} data - Datos del caso étnico
   * @returns {Promise<Object>} Análisis étnico
   */
  analizarEtnico: async (data) => {
    try {
      const response = await api.post('/ia/analizar-etnico', data);
      return response.data;
    } catch (error) {
      console.error('Error al analizar caso étnico:', error);
      throw error;
    }
  },

  /**
   * Análisis de veeduría con IA
   * @param {Object} data - Datos de la veeduría
   * @returns {Promise<Object>} Análisis de veeduría
   */
  analizarVeeduria: async (data) => {
    try {
      const response = await api.post('/ia/analizar-veeduria', data);
      return response.data;
    } catch (error) {
      console.error('Error al analizar veeduría:', error);
      throw error;
    }
  },

  /**
   * Listar todas las consultas de IA
   * @param {Object} filters - Filtros opcionales
   * @returns {Promise<Object>} Lista de consultas
   */
  listarConsultas: async (filters = {}) => {
    try {
      const response = await api.get('/ia/consultas', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error al listar consultas de IA:', error);
      throw error;
    }
  },

  /**
   * Obtener una consulta de IA por ID
   * @param {number} id - ID de la consulta
   * @returns {Promise<Object>} Datos de la consulta
   */
  obtenerConsulta: async (id) => {
    try {
      const response = await api.get(`/ia/consultas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener consulta ${id}:`, error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas del Centro de Innovación IA
   * @returns {Promise<Object>} Estadísticas del centro
   */
  obtenerEstadisticasCentro: async () => {
    try {
      const response = await api.get('/ia/estadisticas-centro');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas del centro:', error);
      throw error;
    }
  },

  /**
   * Obtener estadísticas para el Monitor IA
   * @returns {Promise<Object>} Estadísticas del monitor
   */
  obtenerEstadisticasMonitor: async () => {
    try {
      const response = await api.get('/ia/estadisticas-monitor');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas del monitor:', error);
      throw error;
    }
  },

  /**
   * Obtener métricas de rendimiento
   * @returns {Promise<Object>} Métricas de rendimiento
   */
  obtenerMetricasRendimiento: async () => {
    try {
      const response = await api.get('/ia/metricas-rendimiento');
      return response.data;
    } catch (error) {
      console.error('Error al obtener métricas de rendimiento:', error);
      throw error;
    }
  },

  /**
   * Obtener estado de servicios de IA
   * @returns {Promise<Object>} Estado de servicios
   */
  obtenerEstadoServicios: async () => {
    try {
      const response = await api.get('/ia/servicios-estado');
      return response.data;
    } catch (error) {
      console.error('Error al obtener estado de servicios:', error);
      throw error;
    }
  }
};

export default AIServiceBackend;

