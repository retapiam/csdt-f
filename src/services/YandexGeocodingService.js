import axios from 'axios';

const YANDEX_API_KEY = import.meta.env.VITE_YANDEX_API_KEY || '';

class YandexGeocodingService {
  constructor(apiKey = YANDEX_API_KEY) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://geocode-maps.yandex.ru/1.x/';
  }

  async geocodeForward(query, options = {}) {
    if (!this.apiKey) throw new Error('Yandex API key no configurado');
    const params = {
      apikey: this.apiKey,
      geocode: query,
      format: 'json',
      lang: options.language ?? 'es_ES'
    };
    const { data } = await axios.get(this.baseUrl, { params });
    return data;
  }

  async geocodeReverse({ longitude, latitude }, options = {}) {
    if (!this.apiKey) throw new Error('Yandex API key no configurado');
    const params = {
      apikey: this.apiKey,
      geocode: `${longitude},${latitude}`,
      format: 'json',
      lang: options.language ?? 'es_ES'
    };
    const { data } = await axios.get(this.baseUrl, { params });
    return data;
  }
}

export default new YandexGeocodingService();
export { YandexGeocodingService };


