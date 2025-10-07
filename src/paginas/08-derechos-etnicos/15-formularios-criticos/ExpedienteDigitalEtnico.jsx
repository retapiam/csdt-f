import { useState } from 'react';
import { FolderOpen, FileText, Upload, Download, Clock, Users, MapPin, Tag } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import toast from 'react-hot-toast';

const ExpedienteDigitalEtnico = () => {
  const [tabActivo, setTabActivo] = useState('informacion');

  const expediente = {
    id: 'EXP-2024-001',
    titulo: 'Vulneración Derechos Territoriales - Resguardo Emberá',
    estado: 'activo',
    fechaCreacion: '2024-01-15',
    ultimaActualizacion: '2024-01-20',
    responsable: 'Dr. Carlos Méndez',
    comunidad: 'Resguardo Emberá Chamí de Risaralda',
    tipologia: 'Derechos Territoriales',
    documentos: [
      { nombre: 'Denuncia Inicial.pdf', tipo: 'denuncia', fecha: '2024-01-15', tamaño: '2.3 MB' },
      { nombre: 'Certificado Territorial.pdf', tipo: 'certificado', fecha: '2024-01-16', tamaño: '1.8 MB' },
      { nombre: 'Acta Asamblea Comunitaria.pdf', tipo: 'acta', fecha: '2024-01-17', tamaño: '3.1 MB' },
      { nombre: 'Evidencias Fotográficas.zip', tipo: 'evidencia', fecha: '2024-01-18', tamaño: '15.2 MB' }
    ],
    lineaTiempo: [
      { fecha: '2024-01-15', evento: 'Radicación de denuncia', responsable: 'Sistema' },
      { fecha: '2024-01-16', evento: 'Solicitud de certificados', responsable: 'Dr. Méndez' },
      { fecha: '2024-01-17', evento: 'Asamblea comunitaria realizada', responsable: 'Comunidad' },
      { fecha: '2024-01-18', evento: 'Carga de evidencias', responsable: 'Dr. Méndez' },
      { fecha: '2024-01-20', evento: 'Análisis jurídico inicial', responsable: 'Dra. González' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
                <FolderOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{expediente.titulo}</h1>
                <p className="text-gray-600 mt-1">Expediente Digital Étnico #{expediente.id}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <Badge className="bg-green-100 text-green-800">{expediente.estado}</Badge>
                  <span className="text-sm text-gray-500">Creado: {expediente.fechaCreacion}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información General */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <Users className="w-8 h-8 text-indigo-600 mb-2" />
            <p className="text-sm text-gray-600">Comunidad</p>
            <p className="font-semibold text-gray-900">{expediente.comunidad}</p>
          </Card>
          <Card className="p-6">
            <Tag className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Tipología</p>
            <p className="font-semibold text-gray-900">{expediente.tipologia}</p>
          </Card>
          <Card className="p-6">
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600">Documentos</p>
            <p className="font-semibold text-gray-900">{expediente.documentos.length}</p>
          </Card>
          <Card className="p-6">
            <Clock className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-sm text-gray-600">Última Actualización</p>
            <p className="font-semibold text-gray-900">{expediente.ultimaActualizacion}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tabActivo} onValueChange={setTabActivo} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="informacion">Información</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
            <TabsTrigger value="linea-tiempo">Línea de Tiempo</TabsTrigger>
            <TabsTrigger value="acciones">Acciones</TabsTrigger>
          </TabsList>

          <TabsContent value="informacion">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Información del Expediente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700">ID Expediente</label>
                  <p className="text-gray-900">{expediente.id}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Responsable</label>
                  <p className="text-gray-900">{expediente.responsable}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Comunidad Afectada</label>
                  <p className="text-gray-900">{expediente.comunidad}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Estado Actual</label>
                  <Badge className="bg-green-100 text-green-800">{expediente.estado}</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documentos">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Documentos del Expediente</h3>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Documento
                </Button>
              </div>
              <div className="space-y-3">
                {expediente.documentos.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-indigo-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{doc.nombre}</p>
                        <p className="text-sm text-gray-600">{doc.tamaño} - {doc.fecha}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="outline">{doc.tipo}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="linea-tiempo">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Línea de Tiempo</h3>
              <div className="space-y-4">
                {expediente.lineaTiempo.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.evento}</p>
                      <p className="text-sm text-gray-600">{item.responsable} - {item.fecha}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="acciones">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Acciones Disponibles</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button className="w-full">Actualizar Estado</Button>
                <Button variant="outline" className="w-full">Agregar Anotación</Button>
                <Button variant="outline" className="w-full">Generar Reporte</Button>
                <Button variant="outline" className="w-full">Compartir Expediente</Button>
                <Button variant="outline" className="w-full">Archivar</Button>
                <Button variant="outline" className="w-full">Imprimir</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExpedienteDigitalEtnico;

