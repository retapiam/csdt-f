import React, { useEffect, useMemo, useState } from 'react';
import { MapProvidersRegistry } from '../../../services/MapProvidersRegistry';
import { useAuth } from '../../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { CheckCircle, XCircle, Globe, Satellite, Link as LinkIcon, Shield, Settings } from 'lucide-react';

const ServiciosMapasAdmin = () => {
  const { user, isAdmin, isAdminGeneral } = useAuth();
  const [providers, setProviders] = useState([]);
  const [testingId, setTestingId] = useState(null);
  const [form, setForm] = useState({ name: '', type: 'xyz', url: '', layers: '', attribution: '' });

  const canAccess = useMemo(() => isAdmin() || isAdminGeneral(), [user]);

  useEffect(() => {
    setProviders(MapProvidersRegistry.getAll());
  }, []);

  const handleAdd = () => {
    if (!form.url || !form.name) return;
    const created = MapProvidersRegistry.add(form);
    setProviders(prev => [...prev, created]);
    setForm({ name: '', type: 'xyz', url: '', layers: '', attribution: '' });
  };

  const handleToggle = (id) => {
    const updated = MapProvidersRegistry.toggleEnabled(id);
    setProviders(prev => prev.map(p => p.id === id ? updated : p));
  };

  const handleRemove = (id) => {
    MapProvidersRegistry.remove(id);
    setProviders(prev => prev.filter(p => p.id !== id));
  };

  const handleTest = async (prov) => {
    setTestingId(prov.id);
    const ok = await MapProvidersRegistry.test(prov);
    setTestingId(null);
    alert(ok ? '✅ Servicio accesible' : '❌ No fue posible acceder al servicio');
  };

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Acceso Denegado</h2>
            <p className="text-gray-600">Solo Administradores (niveles 3 y 4)</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Settings className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Servicios de Mapas</p>
                <p className="text-sm text-gray-500">WMS / WMTS / ArcGIS / XYZ</p>
              </div>
            </div>
            <Button onClick={() => {
              const el = document.getElementById('agregar-servicio');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>Configurar</Button>
          </div>
        </div>

        <Card id="agregar-servicio" className="mb-6">
          <CardHeader>
            <CardTitle>Agregar Servicio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="md:col-span-2">
                <Input placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <select className="w-full p-2 border rounded" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="xyz">XYZ (Tiles)</option>
                  <option value="wms">WMS</option>
                  <option value="wmts">WMTS</option>
                  <option value="arcgis">ArcGIS</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Input placeholder="URL" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
              </div>
              {['wms', 'wmts', 'arcgis'].includes(form.type) && (
                <div className="md:col-span-2">
                  <Input placeholder="Layers (opcional)" value={form.layers} onChange={e => setForm({ ...form, layers: e.target.value })} />
                </div>
              )}
              <div className="md:col-span-2">
                <Input placeholder="Atribución (opcional)" value={form.attribution} onChange={e => setForm({ ...form, attribution: e.target.value })} />
              </div>
              <div>
                <Button onClick={handleAdd}>Agregar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servicios Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            {providers.length === 0 ? (
              <Alert>
                <AlertDescription>No hay servicios registrados aún.</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                {providers.map(prov => (
                  <div key={prov.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      {prov.type === 'xyz' ? <Globe className="h-5 w-5 text-blue-600" /> : <Satellite className="h-5 w-5 text-green-600" />}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{prov.name}</span>
                          <Badge variant={prov.enabled ? 'default' : 'secondary'}>
                            {prov.enabled ? 'Habilitado' : 'Deshabilitado'}
                          </Badge>
                          <Badge variant="outline">{prov.type.toUpperCase()}</Badge>
                        </div>
                        <div className="text-xs text-gray-600 truncate max-w-xl">{prov.url}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" onClick={() => handleTest(prov)} disabled={testingId === prov.id}>
                        <LinkIcon className="h-4 w-4 mr-1" />
                        {testingId === prov.id ? 'Probando...' : 'Probar'}
                      </Button>
                      <Button variant="outline" onClick={() => handleToggle(prov.id)}>
                        {prov.enabled ? <XCircle className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                        {prov.enabled ? 'Deshabilitar' : 'Habilitar'}
                      </Button>
                      <Button variant="destructive" onClick={() => handleRemove(prov.id)}>Eliminar</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiciosMapasAdmin;


