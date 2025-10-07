import { useState } from 'react';
import { Map, Users, MapPin, Heart } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const ReconocimientoSocial = () => {
  const [tabActivo, setTabActivo] = useState('cartografia');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-green-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Reconocimiento Social</h1>
              <p className="text-gray-600 mt-1">Cartografía social participativa</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="cartografia">Cartografía Social</TabsTrigger>
              <TabsTrigger value="talleres">Talleres</TabsTrigger>
              <TabsTrigger value="sitios">Sitios Sagrados</TabsTrigger>
              <TabsTrigger value="memoria">Memoria</TabsTrigger>
            </TabsList>

            <TabsContent value="cartografia">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Mapa Comunitario</h3>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                <Button>Iniciar Mapeo Participativo</Button>
              </Card>
            </TabsContent>

            <TabsContent value="talleres">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Talleres Comunitarios</h3>
                <Button>Programar Taller</Button>
              </Card>
            </TabsContent>

            <TabsContent value="sitios">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Sitios Sagrados y Especiales</h3>
                <div className="space-y-2">
                  {['Sitios sagrados', 'Rutas ancestrales', 'Áreas de uso tradicional'].map((s, i) => (
                    <div key={i} className="p-4 bg-green-50 rounded-lg flex items-center">
                      <Heart className="w-5 h-5 text-green-600 mr-3" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="memoria">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Memoria Territorial</h3>
                <p className="text-gray-600">Historias y memorias del territorio</p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ReconocimientoSocial;

