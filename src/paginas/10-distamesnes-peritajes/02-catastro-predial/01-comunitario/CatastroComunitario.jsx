import { useState } from 'react';
import { Home, MapPin, FileText, Users } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const CatastroComunitario = () => {
  const [tabActivo, setTabActivo] = useState('fichas');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-amber-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl">
              <Home className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Catastro Comunitario</h1>
              <p className="text-gray-600 mt-1">Levantamiento predial comunitario</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="fichas">Fichas Prediales</TabsTrigger>
              <TabsTrigger value="planos">Planos</TabsTrigger>
              <TabsTrigger value="validacion">Validación</TabsTrigger>
            </TabsList>

            <TabsContent value="fichas">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Registro de Predios</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input placeholder="Número de predio" className="px-4 py-2 border rounded-lg" />
                  <input placeholder="Propietario/Poseedor" className="px-4 py-2 border rounded-lg" />
                  <input placeholder="Área (m²)" className="px-4 py-2 border rounded-lg" />
                  <input placeholder="Uso del suelo" className="px-4 py-2 border rounded-lg" />
                </div>
                <Button>Registrar Predio</Button>
              </Card>
            </TabsContent>

            <TabsContent value="planos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Planos Prediales</h3>
                <div className="aspect-video bg-gray-200 rounded-lg"></div>
              </Card>
            </TabsContent>

            <TabsContent value="validacion">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Validación IGAC</h3>
                <p className="text-gray-600">Validación técnica con el IGAC</p>
                <Button className="mt-4">Solicitar Validación</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default CatastroComunitario;

