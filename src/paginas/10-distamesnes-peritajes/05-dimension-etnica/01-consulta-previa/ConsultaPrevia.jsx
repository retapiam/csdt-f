import { useState } from 'react';
import { Users, FileText, Calendar, CheckCircle } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { Badge } from '../../../../components/ui/badge';

const ConsultaPrevia = () => {
  const [tabActivo, setTabActivo] = useState('procesos');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-fuchsia-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-purple-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Consulta Previa</h1>
              <p className="text-gray-600 mt-1">Gestión de procesos de consulta previa</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="procesos">Procesos</TabsTrigger>
              <TabsTrigger value="protocolos">Protocolos</TabsTrigger>
              <TabsTrigger value="actas">Actas</TabsTrigger>
              <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
            </TabsList>

            <TabsContent value="procesos">
              <div className="space-y-4">
                {[1,2].map(i => (
                  <Card key={i} className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">Proceso de Consulta Previa {i}</h3>
                        <p className="text-sm text-gray-600 mt-1">Comunidad: Pueblo Nasa</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">En Proceso</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-sm">Inicio: 2024-01-15</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-sm">3 documentos</span>
                      </div>
                    </div>
                    <Button size="sm" className="mt-4">Ver Detalles</Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="protocolos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Protocolos Propios</h3>
                <p className="text-gray-600 mb-4">Protocolos de consulta previa de las comunidades</p>
                <Button>Ver Protocolos</Button>
              </Card>
            </TabsContent>

            <TabsContent value="actas">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Actas y Acuerdos</h3>
                <p className="text-gray-600">Registro de actas de pre-consulta, consulta y acuerdos</p>
              </Card>
            </TabsContent>

            <TabsContent value="seguimiento">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Seguimiento de Acuerdos
                </h3>
                <p className="text-gray-600">Monitoreo del cumplimiento de acuerdos de consulta</p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ConsultaPrevia;

