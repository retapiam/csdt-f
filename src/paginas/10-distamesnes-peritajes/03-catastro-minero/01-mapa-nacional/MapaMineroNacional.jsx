import { useState } from 'react';
import { Mountain, Map, Search, Filter } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const MapaMineroNacional = () => {
  const [tabActivo, setTabActivo] = useState('mapa');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-stone-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-stone-500 to-amber-600 rounded-2xl">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mapa Minero Nacional</h1>
              <p className="text-gray-600 mt-1">Catastro minero y concesiones activas</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="mapa">Mapa Interactivo</TabsTrigger>
              <TabsTrigger value="concesiones">Concesiones</TabsTrigger>
              <TabsTrigger value="solicitudes">Solicitudes</TabsTrigger>
              <TabsTrigger value="restringidas">Áreas Restringidas</TabsTrigger>
            </TabsList>

            <TabsContent value="mapa">
              <Card className="p-6">
                <div className="flex space-x-3 mb-4">
                  <input placeholder="Buscar por código minero..." className="flex-1 px-4 py-2 border rounded-lg" />
                  <Button>
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button variant="outline">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <Map className="w-12 h-12 text-gray-400" />
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="concesiones">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Concesiones Activas</h3>
                <p className="text-gray-600">Listado de títulos mineros activos</p>
              </Card>
            </TabsContent>

            <TabsContent value="solicitudes">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Solicitudes Mineras</h3>
                <p className="text-gray-600">Solicitudes en trámite</p>
              </Card>
            </TabsContent>

            <TabsContent value="restringidas">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Áreas Restringidas</h3>
                <p className="text-gray-600">Zonas excluidas de la minería</p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default MapaMineroNacional;

