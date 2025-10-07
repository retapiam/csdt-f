import { useState } from 'react';
import { Mountain, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const ProyectosExtractivos = () => {
  const [tabActivo, setTabActivo] = useState('activos');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-gray-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-gray-500 to-stone-600 rounded-2xl">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Proyectos Extractivos</h1>
              <p className="text-gray-600 mt-1">Base de datos de proyectos mineros y evaluación</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="activos">Proyectos Activos</TabsTrigger>
              <TabsTrigger value="evaluacion">Evaluación</TabsTrigger>
              <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
            </TabsList>

            <TabsContent value="activos">
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <Card key={i} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">Proyecto Minero {i}</h3>
                        <p className="text-sm text-gray-600 mt-1">Tipo: Oro aluvial</p>
                        <Badge className="mt-2 bg-yellow-100 text-yellow-800">En Operación</Badge>
                      </div>
                      <Button size="sm">Ver Detalles</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="evaluacion">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-gray-600" />
                  Evaluación de Impactos
                </h3>
                <p className="text-gray-600">Herramientas para evaluar impactos de proyectos extractivos</p>
                <Button className="mt-4">Iniciar Evaluación</Button>
              </Card>
            </TabsContent>

            <TabsContent value="seguimiento">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-gray-600" />
                  Seguimiento de Proyectos
                </h3>
                <p className="text-gray-600">Monitoreo continuo de actividades extractivas</p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProyectosExtractivos;

