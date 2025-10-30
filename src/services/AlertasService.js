import api from './api';

const AlertasService = {
  list: async (params = {}) => {
    const r = await api.get('/alertas', { params });
    return r.data;
  },
  get: async (id) => {
    const r = await api.get(`/alertas/${id}`);
    return r.data;
  },
  update: async (id, data) => {
    const r = await api.put(`/alertas/${id}`, data);
    return r.data;
  },
  generarTempranas: async () => {
    const r = await api.post('/admin/sistema/generar-alertas');
    return r.data;
  },
  toggleEmails: async (enabled) => {
    const r = await api.post('/admin/sistema/alerts-email', { enabled });
    return r.data;
  }
};

export default AlertasService;


