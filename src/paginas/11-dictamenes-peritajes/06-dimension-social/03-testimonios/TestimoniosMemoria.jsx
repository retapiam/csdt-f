import { useState } from 'react';
import { Mic, FileText, Video, Users } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const TestimoniosMemoria = () => {
  const [tabActivo, setTabActivo] = useState('testimonios');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-violet-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Testimonios y Memoria</h1>
              <p className="text-gray-600 mt-1">Preservación de memoria oral y testimonios comunitarios</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="testimonios">Testimonios</TabsTrigger>
              <TabsTrigger value="memoria">Memoria Oral</TabsTrigger>
              <TabsTrigger value="archivo">Archivo</TabsTrigger>
            </TabsList>

            <TabsContent value="testimonios">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Registro de Testimonios</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Nombre del Testigo</label>
                    <input className="w-full px-4 py-2 border rounded-lg mt-1" placeholder="Nombre completo" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Tipo de Testimonio</label>
                    <select className="w-full px-4 py-2 border rounded-lg mt-1">
                      <option>Memoria Histórica</option>
                      <option>Testimonio de Caso</option>
                      <option>Relato Ancestral</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Testimonio</label>
                    <textarea className="w-full px-4 py-2 border rounded-lg mt-1" rows="4" placeholder="Registre el testimonio..."></textarea>
                  </div>
                  <div className="flex space-x-3">
                    <Button className="flex-1">
                      <Mic className="w-4 h-4 mr-2" />
                      Grabar Audio
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Video className="w-4 h-4 mr-2" />
                      Grabar Video
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="memoria">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Memoria Oral Comunitaria</h3>
                <div className="space-y-3">
                  {['Memoria del territorio', 'Historia de resistencia', 'Relatos ancestrales'].map((mem, i) => (
                    <div key={i} className="p-4 bg-violet-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-violet-600" />
                          <div>
                            <p className="font-semibold">{mem}</p>
                            <p className="text-sm text-gray-600">Pueblo Nasa</p>
                          </div>
                        </div>
                        <Badge className="bg-violet-100 text-violet-800">Audio</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="archivo">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Archivo Histórico</h3>
                <p className="text-gray-600">Repositorio de testimonios y memoria comunitaria</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-violet-600">45</p>
                    <p className="text-sm text-gray-600">Testimonios</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-violet-600">23</p>
                    <p className="text-sm text-gray-600">Audios</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-violet-600">12</p>
                    <p className="text-sm text-gray-600">Videos</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default TestimoniosMemoria;

