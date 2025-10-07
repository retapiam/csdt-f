import { useState } from 'react';
import { Users, Calendar, CheckSquare, FileText } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const ParticipacionSocial = () => {
  const [tabActivo, setTabActivo] = useState('procesos');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-cyan-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Participación Social</h1>
              <p className="text-gray-600 mt-1">Procesos participativos y decisiones colectivas</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="procesos">Procesos</TabsTrigger>
              <TabsTrigger value="talleres">Talleres</TabsTrigger>
              <TabsTrigger value="asambleas">Asambleas</TabsTrigger>
              <TabsTrigger value="decisiones">Decisiones</TabsTrigger>
            </TabsList>

            <TabsContent value="procesos">
              <div className="space-y-4">
                {['Proceso Participativo - Plan de Vida', 'Construcción Protocolo Propio'].map((proc, i) => (
                  <Card key={i} className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{proc}</h3>
                        <p className="text-sm text-gray-600 mt-1">Comunidad Nasa</p>
                      </div>
                      <Badge className="bg-cyan-100 text-cyan-800">En Curso</Badge>
                    </div>
                    <div className="flex items-center mt-4">
                      <Calendar className="w-4 h-4 text-cyan-600 mr-2" />
                      <span className="text-sm">Próximo taller: 2024-02-05</span>
                    </div>
                    <Button size="sm" className="mt-4">Ver Cronograma</Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="talleres">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Talleres Comunitarios</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Tema del Taller</label>
                    <input className="w-full px-4 py-2 border rounded-lg mt-1" placeholder="Tema..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold">Fecha</label>
                      <input type="date" className="w-full px-4 py-2 border rounded-lg mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">Participantes</label>
                      <input type="number" className="w-full px-4 py-2 border rounded-lg mt-1" placeholder="Cantidad" />
                    </div>
                  </div>
                  <Button className="w-full">Programar Taller</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="asambleas">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Asambleas Comunitarias</h3>
                <p className="text-gray-600 mb-4">Registro de asambleas y acuerdos comunitarios</p>
                <Button>Nueva Asamblea</Button>
              </Card>
            </TabsContent>

            <TabsContent value="decisiones">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <CheckSquare className="w-6 h-6 mr-2 text-cyan-600" />
                  Decisiones Colectivas
                </h3>
                <p className="text-gray-600 mb-4">Registro de decisiones tomadas colectivamente</p>
                <div className="space-y-3">
                  {['Aprobación Plan de Vida', 'Construcción Casa Comunal'].map((dec, i) => (
                    <div key={i} className="p-4 bg-cyan-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckSquare className="w-5 h-5 text-cyan-600" />
                        <div>
                          <p className="font-semibold">{dec}</p>
                          <p className="text-sm text-gray-600">Asamblea 2024-01-{15+i}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Ver Acta</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ParticipacionSocial;

