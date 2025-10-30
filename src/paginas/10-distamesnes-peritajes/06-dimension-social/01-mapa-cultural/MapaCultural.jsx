import { useState } from 'react';
import { Map, Heart, MapPin, Camera } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const MapaCultural = () => {
  const [tabActivo, setTabActivo] = useState('sitios');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-pink-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl">
              <Map className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mapa Cultural</h1>
              <p className="text-gray-600 mt-1">Cartografía cultural y patrimonio comunitario</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="sitios">Sitios Sagrados</TabsTrigger>
              <TabsTrigger value="patrimonio">Patrimonio</TabsTrigger>
              <TabsTrigger value="rutas">Rutas Culturales</TabsTrigger>
              <TabsTrigger value="mapa">Mapa</TabsTrigger>
            </TabsList>

            <TabsContent value="sitios">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['Sitio ceremonial', 'Lugar sagrado', 'Cementerio ancestral'].map((sitio, i) => (
                  <Card key={i} className="p-6">
                    <div className="flex items-start space-x-3">
                      <Heart className="w-6 h-6 text-pink-600 mt-1" />
                      <div>
                        <h3 className="font-bold">{sitio}</h3>
                        <p className="text-sm text-gray-600 mt-1">Comunidad Nasa</p>
                        <div className="flex items-center mt-2">
                          <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-500">Cauca, Colombia</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-4">Ver en Mapa</Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="patrimonio">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Patrimonio Cultural</h3>
                <p className="text-gray-600">Registro de patrimonio material e inmaterial</p>
                <Button className="mt-4">Registrar Patrimonio</Button>
              </Card>
            </TabsContent>

            <TabsContent value="rutas">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Rutas Culturales</h3>
                <p className="text-gray-600">Caminos ancestrales y rutas tradicionales</p>
              </Card>
            </TabsContent>

            <TabsContent value="mapa">
              <Card className="p-6">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <Map className="w-16 h-16 text-gray-400" />
                </div>
                <Button className="w-full">Generar Mapa Cultural</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default MapaCultural;

