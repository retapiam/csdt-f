import { useState } from 'react';
import { AlertTriangle, Users, FileText, CheckCircle } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const GestionConflictos = () => {
  const [tabActivo, setTabActivo] = useState('activos');

  const conflictos = [
    { id: 1, tipo: 'Superposición', partes: 'Resguardo A vs Comunidad B', estado: 'Mediación', nivel: 'Alto' },
    { id: 2, tipo: 'Límites', partes: 'Cabildo X vs Consejo Y', estado: 'Negociación', nivel: 'Medio' },
    { id: 3, tipo: 'Recursos', partes: 'Comunidad C vs Comunidad D', estado: 'Resuelto', nivel: 'Bajo' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-orange-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Gestión de Conflictos Territoriales</h1>
              <p className="text-gray-600 mt-1">Mediación y resolución de conflictos</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="activos">Activos</TabsTrigger>
              <TabsTrigger value="mediacion">Mediación</TabsTrigger>
              <TabsTrigger value="resueltos">Resueltos</TabsTrigger>
            </TabsList>

            <TabsContent value="activos">
              <div className="space-y-4">
                {conflictos.map((conf) => (
                  <Card key={conf.id} className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{conf.tipo}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Users className="w-4 h-4 mr-2" />
                          {conf.partes}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`mb-2 ${
                          conf.nivel === 'Alto' ? 'bg-red-100 text-red-800' :
                          conf.nivel === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {conf.nivel}
                        </Badge>
                        <div>
                          <span className="text-sm text-gray-600">{conf.estado}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">Ver Detalles</Button>
                      <Button size="sm" variant="outline">Mediar</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mediacion">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Herramientas de Mediación</h3>
                <p className="text-gray-600">Técnicas y protocolos para mediación de conflictos territoriales</p>
                <Button className="mt-4">Iniciar Proceso de Mediación</Button>
              </Card>
            </TabsContent>

            <TabsContent value="resueltos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Conflictos Resueltos
                </h3>
                <p className="text-gray-600">Historial de conflictos resueltos satisfactoriamente</p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default GestionConflictos;

