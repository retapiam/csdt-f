import { useState } from 'react';
import { MapPin, Camera, Navigation, Target, Download, Upload } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import toast from 'react-hot-toast';

const ReconocimientoDirecto = () => {
  const [tabActivo, setTabActivo] = useState('levantamiento');

  const equipos = [
    { nombre: 'GPS Diferencial', precision: '+/- 2cm', estado: 'Disponible' },
    { nombre: 'Drone/UAV', cobertura: '500 hectáreas/día', estado: 'Disponible' },
    { nombre: 'Cámara Digital', resolucion: '24MP', estado: 'Disponible' },
    { nombre: 'Estación Total', precision: '+/- 5mm', estado: 'En uso' },
    { nombre: 'Nivel Topográfico', tipo: 'Digital', estado: 'Disponible' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-blue-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl">
              <Navigation className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Reconocimiento Territorial Directo</h1>
              <p className="text-gray-600 mt-1">Levantamiento topográfico con tecnología GPS y drones</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="levantamiento">Levantamiento</TabsTrigger>
              <TabsTrigger value="equipos">Equipos</TabsTrigger>
              <TabsTrigger value="datos">Datos GPS</TabsTrigger>
              <TabsTrigger value="registro">Registro Fotográfico</TabsTrigger>
            </TabsList>

            <TabsContent value="levantamiento">
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4">Nuevo Levantamiento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Nombre del proyecto" className="px-4 py-2 border rounded-lg" />
                    <input type="text" placeholder="Comunidad" className="px-4 py-2 border rounded-lg" />
                    <input type="date" className="px-4 py-2 border rounded-lg" />
                    <select className="px-4 py-2 border rounded-lg">
                      <option>Equipo GPS</option>
                      <option>Drone</option>
                      <option>Estación Total</option>
                    </select>
                  </div>
                  <Button className="w-full mt-4">Iniciar Levantamiento</Button>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="equipos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipos.map((eq, idx) => (
                  <Card key={idx} className="p-6">
                    <h4 className="font-bold">{eq.nombre}</h4>
                    <p className="text-sm text-gray-600">{eq.precision || eq.cobertura || eq.resolucion || eq.tipo}</p>
                    <span className={`text-xs px-2 py-1 rounded ${eq.estado === 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {eq.estado}
                    </span>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="datos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Datos GPS Capturados</h3>
                <div className="border-dashed border-2 p-8 text-center rounded-lg">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Cargar archivo GPS (.gpx, .kml, .shp)</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="registro">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Registro Fotográfico</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ReconocimientoDirecto;

