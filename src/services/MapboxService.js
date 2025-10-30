import axios from 'axios';
import { MAP_CONFIG } from '../config/config';

class MapboxService {
  constructor(token = MAP_CONFIG.MAPBOX_TOKEN) {
    this.token = token;
    this.baseGeocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  }

  async geocodeForward(query, options = {}) {
    if (!this.token) throw new Error('Mapbox token no configurado');
    const params = {
      access_token: this.token,
      limit: options.limit ?? 5,
      language: options.language ?? 'es'
    };
    if (options.proximity) params.proximity = options.proximity; // "lon,lat"
    if (options.country) params.country = options.country; // ej: "co"

    const url = `${this.baseGeocodingUrl}/${encodeURIComponent(query)}.json`;
    const { data } = await axios.get(url, { params });
    return data;
  }

  async geocodeReverse({ longitude, latitude }, options = {}) {
    if (!this.token) throw new Error('Mapbox token no configurado');
    const params = {
      access_token: this.token,
      limit: options.limit ?? 1,
      language: options.language ?? 'es'
    };
    const url = `${this.baseGeocodingUrl}/${longitude},${latitude}.json`;
    const { data } = await axios.get(url, { params });
    return data;
  }
}

export default new MapboxService();
export { MapboxService };


