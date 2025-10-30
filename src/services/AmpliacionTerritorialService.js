import api from './api';
import { API_ENDPOINTS } from '../config/config';

/**
 * Servicio para enviar "Solicitud de Ampliación Territorial".
 * Envía geometría (GeoJSON) y metadatos al backend.
 */
export const AmpliacionTerritorialService = {
  /**
   * Crear solicitud de ampliación territorial
   * @param {Object} payload
   *  - nombre: string
   *  - comunidad: string (afro/indigena/etc.)
   *  - justificacion: string
   *  - geometry: GeoJSON Feature o FeatureCollection
   *  - metadata: objeto adicional (opcional)
   */
  create: async (payload) => {
    const data = {
      nombre: payload.nombre,
      tipo: payload.comunidad, // compat con controladores existentes
      metadata: {
        ...payload.metadata,
        solicitud_tipo: 'ampliacion_territorial',
        geometry: payload.geometry
      }
    };
    const endpoint = API_ENDPOINTS.TERRITORIAL.AMPLIACION;
    const response = await api.post(endpoint, data);
    return response.data;
  }
};

export default AmpliacionTerritorialService;


