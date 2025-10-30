import api from './api';

const CaeService = {
  // Comités
  listComites: async (params = {}) => {
    const r = await api.get('/cae/comites', { params });
    return r.data;
  },
  createComite: async (data) => {
    const r = await api.post('/cae/comites', data);
    return r.data;
  },

  // Actas
  listActas: async (params = {}) => {
    const r = await api.get('/cae/actas', { params });
    return r.data;
  },
  createActa: async (data) => {
    const r = await api.post('/cae/actas', data);
    return r.data;
  },

  // Seguimientos
  listSeguimientos: async (params = {}) => {
    const r = await api.get('/cae/seguimientos', { params });
    return r.data;
  },
  createSeguimiento: async (data) => {
    const r = await api.post('/cae/seguimientos', data);
    return r.data;
  },
};

export default CaeService;


