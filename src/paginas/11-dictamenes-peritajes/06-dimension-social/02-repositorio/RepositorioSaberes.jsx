import { useState } from 'react';
import { BookOpen, FileText, Video, Music } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

const RepositorioSaberes = () => {
  const [tabActivo, setTabActivo] = useState('documentos');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-amber-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Repositorio de Saberes</h1>
              <p className="text-gray-600 mt-1">Preservación digital del conocimiento tradicional</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="audiovisual">Audiovisual</TabsTrigger>
              <TabsTrigger value="oral">Tradición Oral</TabsTrigger>
              <TabsTrigger value="practicas">Prácticas</TabsTrigger>
            </TabsList>

            <TabsContent value="documentos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Documentos de Saberes</h3>
                <div className="space-y-3">
                  {['Medicina tradicional', 'Sistemas de cultivo', 'Técnicas artesanales'].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-amber-600" />
                        <span>{doc}</span>
                      </div>
                      <Button size="sm">Abrir</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="audiovisual">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Material Audiovisual</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50 rounded-lg flex items-center">
                    <Video className="w-5 h-5 text-amber-600 mr-3" />
                    <span>Videos</span>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg flex items-center">
                    <Music className="w-5 h-5 text-amber-600 mr-3" />
                    <span>Audios</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="oral">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Tradición Oral</h3>
                <p className="text-gray-600">Mitos, leyendas y relatos tradicionales</p>
                <Button className="mt-4">Registrar Relato</Button>
              </Card>
            </TabsContent>

            <TabsContent value="practicas">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Prácticas Tradicionales</h3>
                <p className="text-gray-600">Documentación de prácticas y rituales</p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default RepositorioSaberes;

