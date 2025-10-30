import { useState } from 'react';
import { Map, FileText, CheckSquare, TrendingUp } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const AmpliacionSaneamiento = () => {
  const [tabActivo, setTabActivo] = useState('procesos');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-green-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl">
              <Map className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Ampliación y Saneamiento</h1>
              <p className="text-gray-600 mt-1">Procesos de ampliación territorial</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="procesos">Procesos</TabsTrigger>
              <TabsTrigger value="estudios">Estudios</TabsTrigger>
              <TabsTrigger value="conceptos">Conceptos</TabsTrigger>
            </TabsList>

            <TabsContent value="procesos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Procesos de Ampliación</h3>
                <div className="space-y-3">
                  {['Ampliación Resguardo A', 'Saneamiento Territorio B'].map((proc, i) => (
                    <div key={i} className="p-4 bg-green-50 rounded-lg">
                      <p className="font-semibold">{proc}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm">Fase: Estudio técnico</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="estudios">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-green-600" />
                  Estudios Técnicos
                </h3>
                <p className="text-gray-600 mb-4">Estudios socioeconómicos y territoriales</p>
                <Button>Ver Estudios</Button>
              </Card>
            </TabsContent>

            <TabsContent value="conceptos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <CheckSquare className="w-6 h-6 mr-2 text-green-600" />
                  Conceptos Técnicos
                </h3>
                <p className="text-gray-600 mb-4">Conceptos ANT y MinInterior</p>
                <Button>Generar Concepto</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AmpliacionSaneamiento;

