import { useState } from 'react';
import { FileText, CheckSquare, Calendar } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const PlanesManejoAmbiental = () => {
  const [tabActivo, setTabActivo] = useState('creacion');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-sky-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Planes de Manejo Ambiental</h1>
              <p className="text-gray-600 mt-1">Creación y seguimiento de PMA</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="creacion">Creación</TabsTrigger>
              <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
              <TabsTrigger value="evaluacion">Evaluación</TabsTrigger>
            </TabsList>

            <TabsContent value="creacion">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Crear Plan de Manejo</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Nombre del PMA</label>
                    <input className="w-full px-4 py-2 border rounded-lg mt-1" placeholder="Plan de Manejo Ambiental..." />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Medidas de Manejo</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg mt-1" rows="4" placeholder="Describa las medidas de prevención, mitigación, corrección y compensación..."></textarea>
                  </div>
                  <Button className="w-full">Crear PMA</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="seguimiento">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-sky-600" />
                  Seguimiento de Implementación
                </h3>
                <p className="text-gray-600">Cronograma y avance de implementación del PMA</p>
                <div className="mt-4 space-y-2">
                  {['Medida 1: Reforestación', 'Medida 2: Tratamiento de aguas', 'Medida 3: Monitoreo fauna'].map((med, i) => (
                    <div key={i} className="p-3 bg-sky-50 rounded-lg flex items-center justify-between">
                      <span>{med}</span>
                      <CheckSquare className="w-5 h-5 text-sky-600" />
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="evaluacion">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Evaluación de Cumplimiento</h3>
                <p className="text-gray-600">Verificación del cumplimiento de las medidas del PMA</p>
                <Button className="mt-4">Generar Informe de Cumplimiento</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default PlanesManejoAmbiental;

