import { useState } from 'react';
import { FileText, Archive, Users, BookOpen } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import toast from 'react-hot-toast';

const ReconocimientoIndirecto = () => {
  const [tabActivo, setTabActivo] = useState('documentos');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-purple-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
              <Archive className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Reconocimiento Territorial Indirecto</h1>
              <p className="text-gray-600 mt-1">Análisis documental, cartográfico e histórico</p>
            </div>
          </div>

          <Tabs value={tabActivo} onValueChange={setTabActivo}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="documentos">Análisis Documental</TabsTrigger>
              <TabsTrigger value="cartografia">Cartografía</TabsTrigger>
              <TabsTrigger value="testimonios">Testimonios</TabsTrigger>
              <TabsTrigger value="archivos">Archivos</TabsTrigger>
            </TabsList>

            <TabsContent value="documentos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Documentos Históricos</h3>
                <div className="space-y-3">
                  {['Títulos coloniales', 'Cédulas reales', 'Actas de posesión', 'Documentos notariales'].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span>{doc}</span>
                      </div>
                      <Button size="sm">Analizar</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="cartografia">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Cartografía Histórica</h3>
                <p className="text-gray-600">Análisis de mapas y planos históricos del territorio</p>
                <div className="mt-4 aspect-video bg-gray-200 rounded-lg"></div>
              </Card>
            </TabsContent>

            <TabsContent value="testimonios">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Testimonios Comunitarios</h3>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Registrar Testimonio
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="archivos">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Archivo Documental</h3>
                <p className="text-gray-600">Repositorio de documentos históricos y registros</p>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ReconocimientoIndirecto;

