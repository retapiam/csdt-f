const STORAGE_KEY = 'map_providers_registry';

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error cargando registro de proveedores:', e);
    return [];
  }
}

function saveAll(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error guardando registro de proveedores:', e);
  }
}

function generateId() {
  return `prov_${Math.random().toString(36).slice(2, 10)}`;
}

export const MapProvidersRegistry = {
  getAll() {
    return loadAll();
  },

  add(provider) {
    const list = loadAll();
    const item = {
      id: generateId(),
      name: provider.name?.trim() || 'Proveedor sin nombre',
      type: provider.type || 'xyz', // 'xyz' | 'wms' | 'wmts' | 'arcgis'
      url: provider.url?.trim() || '',
      layers: provider.layers || '',
      attribution: provider.attribution || '',
      enabled: provider.enabled ?? true,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    list.push(item);
    saveAll(list);
    return item;
  },

  update(id, updates) {
    const list = loadAll();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates, updatedAt: Date.now() };
    saveAll(list);
    return list[idx];
  },

  remove(id) {
    const list = loadAll();
    const next = list.filter(p => p.id !== id);
    saveAll(next);
    return true;
  },

  toggleEnabled(id) {
    const list = loadAll();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return null;
    list[idx].enabled = !list[idx].enabled;
    list[idx].updatedAt = Date.now();
    saveAll(list);
    return list[idx];
  },

  async test(provider) {
    try {
      let testUrl = provider.url;
      // Reemplazar placeholders comunes en XYZ
      if (testUrl.includes('{z}')) {
        testUrl = testUrl.replace('{z}', '3').replace('{x}', '1').replace('{y}', '1');
      }
      // Fallback: HEAD/GET simple
      const res = await fetch(testUrl, { method: 'GET' });
      return res.ok;
    } catch (e) {
      console.warn('Error probando proveedor', provider.name, e);
      return false;
    }
  }
};

export default MapProvidersRegistry;


