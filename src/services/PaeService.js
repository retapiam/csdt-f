import api from './api';

const PaeService = {
  // Instituciones
  listInstituciones: async (params = {}) => {
    const r = await api.get('/pae/instituciones', { params });
    return r.data;
  },
  createInstitucion: async (data) => {
    const r = await api.post('/pae/instituciones', data);
    return r.data;
  },

  // Menús
  listMenus: async (params = {}) => {
    const r = await api.get('/pae/menus', { params });
    return r.data;
  },
  createMenu: async (data) => {
    const r = await api.post('/pae/menus', data);
    return r.data;
  },

  // Entregas
  listEntregas: async (params = {}) => {
    const r = await api.get('/pae/entregas', { params });
    return r.data;
  },
  createEntrega: async (data) => {
    const r = await api.post('/pae/entregas', data);
    return r.data;
  },

  // Incidencias
  listIncidencias: async (params = {}) => {
    const r = await api.get('/pae/incidencias', { params });
    return r.data;
  },
  createIncidencia: async (data) => {
    const r = await api.post('/pae/incidencias', data);
    return r.data;
  },
};

export default PaeService;


