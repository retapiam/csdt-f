import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Plus, AlertTriangle } from 'lucide-react';
import unifiedAIService from '../../../services/ia/UnifiedAIService';
import api from '../../../services/api';
import toast from 'react-hot-toast';
import CaeService from '../../../services/CaeService';

const CAE = () => {
  const [tab, setTab] = useState('comites');
  const [comites, setComites] = useState([]);
  const [actas, setActas] = useState([]);
  const [seguimientos, setSeguimientos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formComite, setFormComite] = useState({ institucion_id: '', nombre: '' });
  const [formActa, setFormActa] = useState({ comite_id: '', fecha: '' });
  const [formSeg, setFormSeg] = useState({ comite_id: '', fecha: '' });
  const [generando, setGenerando] = useState(false);

  const cargar = async () => {
    try {
      setLoading(true);
      setError('');
      const [cs, as, ss] = await Promise.all([
        CaeService.listComites(),
        CaeService.listActas(),
        CaeService.listSeguimientos()
      ]);
      setComites(Array.isArray(cs?.data) ? cs.data : (Array.isArray(cs) ? cs : []));
      setActas(Array.isArray(as?.data) ? as.data : (Array.isArray(as) ? as : []));
      setSeguimientos(Array.isArray(ss?.data) ? ss.data : (Array.isArray(ss) ? ss : []));
    } catch (e) {
      setError('Error cargando datos CAE');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const crearComite = async (e) => {
    e.preventDefault();
    try {
      await CaeService.createComite(formComite);
      setFormComite({ institucion_id: '', nombre: '' });
      cargar();
    } catch (_) {}
  };
  const crearActa = async (e) => {
    e.preventDefault();
    try {
      await CaeService.createActa(formActa);
      setFormActa({ comite_id: '', fecha: '' });
      cargar();
    } catch (_) {}
  };
  const crearSeguimiento = async (e) => {
    e.preventDefault();
    try {
      await CaeService.createSeguimiento(formSeg);
      setFormSeg({ comite_id: '', fecha: '' });
      cargar();
    } catch (_) {}
  };

  const descargarPdf = async (ruta, nombre) => {
    try {
      setGenerando(true);
      const response = await api.get(ruta, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = nombre;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('PDF generado');
    } catch (_) {
      toast.error('Error generando PDF');
    } finally {
      setGenerando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">CAE - Comité de Alimentación Escolar</h1>
          <p className="text-gray-600">Comités, Actas y Seguimientos</p>
        </div>

        {error && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comites">Comités</TabsTrigger>
            <TabsTrigger value="actas">Actas</TabsTrigger>
            <TabsTrigger value="seguimientos">Seguimientos</TabsTrigger>
          </TabsList>

          <TabsContent value="comites" className="mt-4">
            <Card className="mb-4">
              <CardHeader><CardTitle>Nuevo Comité</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={crearComite} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input className="p-2 border rounded" placeholder="Institución ID" value={formComite.institucion_id} onChange={e=>setFormComite({...formComite,institucion_id:e.target.value})} required />
                  <input className="p-2 border rounded" placeholder="Nombre" value={formComite.nombre} onChange={e=>setFormComite({...formComite,nombre:e.target.value})} required />
                  <div></div>
                  <Button type="submit"><Plus className="h-4 w-4 mr-2" />Crear</Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-2">
              {loading ? 'Cargando...' : (comites || []).map(c => (
                <Card key={c.id}><CardContent className="p-4"><div className="flex justify-between"><div><div className="font-medium">{c.nombre}</div><div className="text-sm text-gray-600">Inst {c.institucion_id}</div></div></div></CardContent></Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="actas" className="mt-4">
            <Card className="mb-4">
              <CardHeader><CardTitle>Nueva Acta</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={crearActa} className="grid grid-cols-1 md-grid-cols-4 gap-3">
                  <input className="p-2 border rounded" placeholder="Comité ID" value={formActa.comite_id} onChange={e=>setFormActa({...formActa,comite_id:e.target.value})} required />
                  <input className="p-2 border rounded" type="date" value={formActa.fecha} onChange={e=>setFormActa({...formActa,fecha:e.target.value})} required />
                  <div></div>
                  <Button type="submit"><Plus className="h-4 w-4 mr-2" />Crear</Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-2">
              {loading ? 'Cargando...' : (actas || []).map(a => (
                <Card key={a.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{a.fecha}</div>
                        <div className="text-sm text-gray-600">Comité {a.comite_id}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={async ()=>{
                          try {
                            const resumen = window.prompt('Resumen del acta para IA (opcional):');
                            if (!resumen) return;
                            const ia = await unifiedAIService.quickAnalyze({ text: resumen, legal_area: 'Veeduría/PAE', jurisdiction: 'colombia' });
                            toast.success('IA lista');
                            console.log('IA Acta CAE', ia);
                          } catch { toast.error('IA falló'); }
                        }}>🤖 IA</Button>
                        <Button variant="outline" disabled={generando} onClick={()=>descargarPdf(`/pdf/acta-cae/${a.id}`, `acta_cae_${a.id}.pdf`)}>📄 PDF Acta</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="seguimientos" className="mt-4">
            <Card className="mb-4">
              <CardHeader><CardTitle>Nuevo Seguimiento</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={crearSeguimiento} className="grid grid-cols-1 md-grid-cols-4 gap-3">
                  <input className="p-2 border rounded" placeholder="Comité ID" value={formSeg.comite_id} onChange={e=>setFormSeg({...formSeg,comite_id:e.target.value})} required />
                  <input className="p-2 border rounded" type="date" value={formSeg.fecha} onChange={e=>setFormSeg({...formSeg,fecha:e.target.value})} required />
                  <div></div>
                  <Button type="submit"><Plus className="h-4 w-4 mr-2" />Crear</Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-2">
              {loading ? 'Cargando...' : (seguimientos || []).map(s => (
                <Card key={s.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{s.fecha}</div>
                        <div className="text-sm text-gray-600">Comité {s.comite_id}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={async ()=>{
                          try {
                            const texto = window.prompt('Notas de seguimiento para IA:');
                            if (!texto) return;
                            const ia = await unifiedAIService.quickAnalyze({ text: texto, legal_area: 'Veeduría/PAE', jurisdiction: 'colombia' });
                            toast.success('IA lista');
                            console.log('IA Seguimiento CAE', ia);
                          } catch { toast.error('IA falló'); }
                        }}>🤖 IA</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CAE;


