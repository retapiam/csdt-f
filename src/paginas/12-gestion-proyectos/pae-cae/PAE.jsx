import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Plus, AlertTriangle } from 'lucide-react';
import unifiedAIService from '../../../services/ia/UnifiedAIService';
import api from '../../../services/api';
import AlertasService from '../../../services/AlertasService';
import toast from 'react-hot-toast';
import PaeService from '../../../services/PaeService';

const PAE = () => {
  const [tab, setTab] = useState('instituciones');
  const [instituciones, setInstituciones] = useState([]);
  const [menus, setMenus] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formInstitucion, setFormInstitucion] = useState({ nombre: '', municipio: '', departamento: '' });
  const [formMenu, setFormMenu] = useState({ institucion_id: '', nombre: '' });
  const [formEntrega, setFormEntrega] = useState({ institucion_id: '', fecha: '', planificado: 0, entregado: 0 });
  const [formIncidencia, setFormIncidencia] = useState({ institucion_id: '', fecha: '', tipo: '', severidad: 'media' });
  const [generando, setGenerando] = useState(false);

  const cargar = async () => {
    try {
      setLoading(true);
      setError('');
      const [ins, men, ent, inc] = await Promise.all([
        PaeService.listInstituciones(),
        PaeService.listMenus(),
        PaeService.listEntregas(),
        PaeService.listIncidencias()
      ]);
      setInstituciones(Array.isArray(ins?.data) ? ins.data : (Array.isArray(ins) ? ins : []));
      setMenus(Array.isArray(men?.data) ? men.data : (Array.isArray(men) ? men : []));
      setEntregas(Array.isArray(ent?.data) ? ent.data : (Array.isArray(ent) ? ent : []));
      setIncidencias(Array.isArray(inc?.data) ? inc.data : (Array.isArray(inc) ? inc : []));
    } catch (e) {
      setError('Error cargando datos PAE');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const crearInstitucion = async (e) => {
    e.preventDefault();
    try {
      await PaeService.createInstitucion(formInstitucion);
      setFormInstitucion({ nombre: '', municipio: '', departamento: '' });
      cargar();
    } catch (_) {}
  };

  const crearMenu = async (e) => {
    e.preventDefault();
    try {
      await PaeService.createMenu(formMenu);
      setFormMenu({ institucion_id: '', nombre: '' });
      cargar();
    } catch (_) {}
  };

  const crearEntrega = async (e) => {
    e.preventDefault();
    try {
      await PaeService.createEntrega({ ...formEntrega, planificado: Number(formEntrega.planificado||0), entregado: Number(formEntrega.entregado||0) });
      setFormEntrega({ institucion_id: '', fecha: '', planificado: 0, entregado: 0 });
      cargar();
    } catch (_) {}
  };

  const crearIncidencia = async (e) => {
    e.preventDefault();
    try {
      await PaeService.createIncidencia(formIncidencia);
      setFormIncidencia({ institucion_id: '', fecha: '', tipo: '', severidad: 'media' });
      cargar();
    } catch (_) {}
  };

  const consultarIATextoLibre = async () => {
    const texto = window.prompt('Texto a analizar (IA rápida):');
    if (!texto) return;
    try {
      const result = await unifiedAIService.quickAnalyze({ text: texto, legal_area: 'Veeduría/PAE', jurisdiction: 'colombia' });
      toast.success('IA: análisis generado');
      console.log('IA PAE texto libre', result);
    } catch (_) {
      toast.error('Error consultando IA');
    }
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

  const generarAlertasTempranas = async () => {
    try {
      await AlertasService.generarTempranas();
      toast.success('Alertas tempranas generadas');
    } catch (_) {
      toast.error('No fue posible generar alertas');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">PAE - Gestión</h1>
          <p className="text-gray-600">Instituciones, Menús, Entregas e Incidencias</p>
        </div>

        {error && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-2 mb-3">
          <Button variant="outline" onClick={consultarIATextoLibre}>🤖 Consultar IA</Button>
          <Button variant="outline" onClick={generarAlertasTempranas}>⚠️ Generar Alertas</Button>
        </div>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="instituciones">Instituciones</TabsTrigger>
            <TabsTrigger value="menus">Menús</TabsTrigger>
            <TabsTrigger value="entregas">Entregas</TabsTrigger>
            <TabsTrigger value="incidencias">Incidencias</TabsTrigger>
          </TabsList>

          <TabsContent value="instituciones" className="mt-4">
            <Card className="mb-4">
              <CardHeader><CardTitle>Nueva Institución</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={crearInstitucion} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input className="p-2 border rounded" placeholder="Nombre" value={formInstitucion.nombre} onChange={e=>setFormInstitucion({...formInstitucion,nombre:e.target.value})} required />
                  <input className="p-2 border rounded" placeholder="Municipio" value={formInstitucion.municipio} onChange={e=>setFormInstitucion({...formInstitucion,municipio:e.target.value})} />
                  <input className="p-2 border rounded" placeholder="Departamento" value={formInstitucion.departamento} onChange={e=>setFormInstitucion({...formInstitucion,departamento:e.target.value})} />
                  <Button type="submit"><Plus className="h-4 w-4 mr-2" />Crear</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {loading ? 'Cargando...' : (instituciones || []).map(i => (
                <Card key={i.id}><CardContent className="p-4"><div className="flex justify-between"><div><div className="font-medium">{i.nombre}</div><div className="text-sm text-gray-600">{i.municipio} - {i.departamento}</div></div></div></CardContent></Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="menus" className="mt-4">
            <Card className="mb-4">
              <CardHeader><CardTitle>Nuevo Menú</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={crearMenu} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input className="p-2 border rounded" placeholder="Institución ID" value={formMenu.institucion_id} onChange={e=>setFormMenu({...formMenu,institucion_id:e.target.value})} required />
                  <input className="p-2 border rounded" placeholder="Nombre del menú" value={formMenu.nombre} onChange={e=>setFormMenu({...formMenu,nombre:e.target.value})} required />
                  <div></div>
                  <Button type="submit"><Plus className="h-4 w-4 mr-2" />Crear</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {loading ? 'Cargando...' : (menus || []).map(m => (
                <Card key={m.id}><CardContent className="p-4"><div className="flex justify-between"><div><div className="font-medium">{m.nombre}</div><div className="text-sm text-gray-600">Institución: {m.institucion_id}</div></div></div></CardContent></Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="entregas" className="mt-4">
            <Card className="mb-4">
              <CardHeader><CardTitle>Nueva Entrega</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={crearEntrega} className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  <input className="p-2 border rounded" placeholder="Institución ID" value={formEntrega.institucion_id} onChange={e=>setFormEntrega({...formEntrega,institucion_id:e.target.value})} required />
                  <input className="p-2 border rounded" type="date" value={formEntrega.fecha} onChange={e=>setFormEntrega({...formEntrega,fecha:e.target.value})} required />
                  <input className="p-2 border rounded" placeholder="Planificado" value={formEntrega.planificado} onChange={e=>setFormEntrega({...formEntrega,planificado:e.target.value})} />
                  <input className="p-2 border rounded" placeholder="Entregado" value={formEntrega.entregado} onChange={e=>setFormEntrega({...formEntrega,entregado:e.target.value})} />
                  <input className="p-2 border rounded" placeholder="Calidad" value={formEntrega.calidad||''} onChange={e=>setFormEntrega({...formEntrega,calidad:e.target.value})} />
                  <Button type="submit"><Plus className="h-4 w-4 mr-2" />Crear</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {loading ? 'Cargando...' : (entregas || []).map(en => (
                <Card key={en.id}><CardContent className="p-4"><div className="flex justify-between"><div><div className="font-medium">{en.fecha} · Inst {en.institucion_id}</div><div className="text-sm text-gray-600">Planificado {en.planificado} · Entregado {en.entregado}</div></div></div></CardContent></Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="incidencias" className="mt-4">
            <Card className="mb-4">
              <CardHeader><CardTitle>Nueva Incidencia</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={crearIncidencia} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <input className="p-2 border rounded" placeholder="Institución ID" value={formIncidencia.institucion_id} onChange={e=>setFormIncidencia({...formIncidencia,institucion_id:e.target.value})} required />
                  <input className="p-2 border rounded" type="date" value={formIncidencia.fecha} onChange={e=>setFormIncidencia({...formIncidencia,fecha:e.target.value})} required />
                  <input className="p-2 border rounded" placeholder="Tipo" value={formIncidencia.tipo} onChange={e=>setFormIncidencia({...formIncidencia,tipo:e.target.value})} required />
                  <select className="p-2 border rounded" value={formIncidencia.severidad} onChange={e=>setFormIncidencia({...formIncidencia,severidad:e.target.value})}>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="critica">Crítica</option>
                  </select>
                  <Button type="submit"><Plus className="h-4 w-4 mr-2" />Crear</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {loading ? 'Cargando...' : (incidencias || []).map(inc => (
                <Card key={inc.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{inc.fecha} · {inc.tipo}</div>
                        <div className="text-sm text-gray-600">Inst {inc.institucion_id} · {inc.severidad}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={async ()=>{
                          try {
                            const narrativa = window.prompt('Describe brevemente la incidencia para IA:');
                            if (!narrativa) return;
                            const ia = await unifiedAIService.quickAnalyze({ text: narrativa, legal_area: 'Veeduría/PAE', jurisdiction: 'colombia' });
                            toast.success('IA lista');
                            console.log('IA Incidencia', ia);
                          } catch { toast.error('IA falló'); }
                        }}>🤖 IA</Button>
                        <Button variant="outline" disabled={generando} onClick={()=>descargarPdf(`/pdf/denuncia/${inc.id}`, `denuncia_${inc.id}.pdf`)}>📄 Denuncia</Button>
                        <Button variant="outline" disabled={generando} onClick={()=>descargarPdf(`/pdf/hallazgos/${inc.id}`, `hallazgos_${inc.id}.pdf`)}>📄 Hallazgos</Button>
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

export default PAE;


