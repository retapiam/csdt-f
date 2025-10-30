import { useState } from 'react';
import { Clipboard, BarChart3, AlertTriangle } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const DiagnosticoAmbiental = () => {
  const [tabActivo, setTabActivo] = useState('linea-base');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-teal-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl">
              <Clipboard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Diagnóstico Ambiental</h1>
              <p className="text-gray-600 mt-1">Línea base e identificación de impactos</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="linea-base">Línea Base</TabsTrigger>
              <TabsTrigger value="impactos">Impactos</TabsTrigger>
              <TabsTrigger value="riesgos">Riesgos</TabsTrigger>
            </TabsList>

            <TabsContent value="linea-base">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Línea Base Ambiental</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Componente Biótico</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg mt-1" rows="3" placeholder="Descripción de flora y fauna..."></textarea>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Componente Hídrico</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg mt-1" rows="3" placeholder="Cuerpos de agua, calidad..."></textarea>
                  </div>
                  <Button>Guardar Línea Base</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="impactos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
                  Identificación de Impactos
                </h3>
                <div className="space-y-3">
                  {['Deforestación', 'Contaminación hídrica', 'Pérdida de biodiversidad'].map((imp, i) => (
                    <div key={i} className="p-4 bg-orange-50 rounded-lg">
                      <p className="font-semibold text-orange-900">{imp}</p>
                      <p className="text-sm text-orange-700 mt-1">Nivel: Alto</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="riesgos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Análisis de Riesgos</h3>
                <p className="text-gray-600">Matriz de riesgos ambientales</p>
                <Button className="mt-4">Generar Matriz</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default DiagnosticoAmbiental;

