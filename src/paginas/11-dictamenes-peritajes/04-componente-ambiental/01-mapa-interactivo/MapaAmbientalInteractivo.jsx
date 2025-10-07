import { useState } from 'react';
import { Leaf, Map, Layers, Filter } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const MapaAmbientalInteractivo = () => {
  const [tabActivo, setTabActivo] = useState('capas');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-emerald-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl">
              <Map className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mapa Ambiental Interactivo</h1>
              <p className="text-gray-600 mt-1">Visualización de capas ambientales y ecosistemas</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="capas">Capas</TabsTrigger>
              <TabsTrigger value="areas">Áreas Protegidas</TabsTrigger>
              <TabsTrigger value="ecosistemas">Ecosistemas</TabsTrigger>
              <TabsTrigger value="cuencas">Cuencas</TabsTrigger>
            </TabsList>

            <TabsContent value="capas">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Layers className="w-6 h-6 mr-2 text-emerald-600" />
                    Capas Ambientales
                  </h3>
                  <div className="space-y-2">
                    {['Áreas Protegidas', 'Bosques', 'Páramos', 'Humedales', 'Ríos y Quebradas'].map((capa, i) => (
                      <label key={i} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>{capa}</span>
                      </label>
                    ))}
                  </div>
                </Card>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <Map className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="areas">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Áreas Protegidas</h3>
                <p className="text-gray-600">Parques Nacionales, Reservas y Áreas de Manejo Especial</p>
              </Card>
            </TabsContent>

            <TabsContent value="ecosistemas">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Ecosistemas Estratégicos</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Bosque Húmedo', 'Páramo', 'Manglar', 'Sabana'].map((eco, i) => (
                    <div key={i} className="p-3 bg-emerald-50 rounded-lg">
                      <Leaf className="w-5 h-5 text-emerald-600 mb-1" />
                      <p className="font-semibold">{eco}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="cuencas">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Cuencas Hidrográficas</h3>
                <p className="text-gray-600">Cuencas y subcuencas del área de estudio</p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default MapaAmbientalInteractivo;

