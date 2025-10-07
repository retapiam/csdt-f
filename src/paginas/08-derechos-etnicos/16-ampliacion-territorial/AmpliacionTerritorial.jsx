import { useState } from 'react';
import { Map, FileText, Users, MapPin, Upload, Send, Download } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import toast from 'react-hot-toast';

const AmpliacionTerritorial = () => {
  const [tabActivo, setTabActivo] = useState('solicitud');
  const [formData, setFormData] = useState({
    tipoSolicitud: '',
    comunidad: '',
    pueblo: '',
    territorioActual: '',
    hectareasActuales: '',
    hectareasSolicitadas: '',
    justificacion: '',
    fundamentoJuridico: '',
    estudios: []
  });

  const tiposSolicitud = [
    'Ampliación de Resguardo Indígena',
    'Saneamiento Territorial',
    'Constitución de Nuevo Resguardo',
    'Ampliación de Territorio Colectivo',
    'Otro'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Solicitud de ampliación territorial radicada exitosamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-green-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
                <Map className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Ampliación y Saneamiento Territorial
                </h1>
                <p className="text-gray-600 mt-1">
                  Sistema de gestión de procesos de ampliación territorial
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">PROCESO TERRITORIAL</Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={tabActivo} onValueChange={setTabActivo} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="solicitud">Solicitud</TabsTrigger>
            <TabsTrigger value="documentacion">Documentación</TabsTrigger>
            <TabsTrigger value="cartografia">Cartografía</TabsTrigger>
            <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
          </TabsList>

          {/* Tab: Solicitud */}
          <TabsContent value="solicitud">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Solicitud de Ampliación Territorial</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tipo de Solicitud */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Solicitud *
                  </label>
                  <select
                    required
                    value={formData.tipoSolicitud}
                    onChange={(e) => setFormData({...formData, tipoSolicitud: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                  >
                    <option value="">Seleccione el tipo de solicitud</option>
                    {tiposSolicitud.map((tipo) => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                {/* Datos de la Comunidad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Comunidad o Resguardo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.comunidad}
                      onChange={(e) => setFormData({...formData, comunidad: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                      placeholder="Nombre de la comunidad"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pueblo Étnico *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pueblo}
                      onChange={(e) => setFormData({...formData, pueblo: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                      placeholder="Pueblo étnico"
                    />
                  </div>
                </div>

                {/* Territorio Actual */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Territorio Actual *
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.territorioActual}
                    onChange={(e) => setFormData({...formData, territorioActual: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                    placeholder="Describa el territorio actual (ubicación, límites, hectáreas)..."
                  />
                </div>

                {/* Hectáreas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hectáreas Actuales *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.hectareasActuales}
                      onChange={(e) => setFormData({...formData, hectareasActuales: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                      placeholder="Hectáreas actuales"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hectáreas Solicitadas *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.hectareasSolicitadas}
                      onChange={(e) => setFormData({...formData, hectareasSolicitadas: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                      placeholder="Hectáreas a ampliar"
                    />
                  </div>
                </div>

                {/* Justificación */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Justificación de la Solicitud *
                  </label>
                  <textarea
                    required
                    rows="6"
                    value={formData.justificacion}
                    onChange={(e) => setFormData({...formData, justificacion: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                    placeholder="Explique las razones de la solicitud (crecimiento poblacional, insuficiencia territorial, usos tradicionales, etc.)..."
                  />
                </div>

                {/* Fundamento Jurídico */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fundamento Jurídico
                  </label>
                  <textarea
                    rows="4"
                    value={formData.fundamentoJuridico}
                    onChange={(e) => setFormData({...formData, fundamentoJuridico: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                    placeholder="Cite las normas y jurisprudencia aplicables (Convenio 169 OIT, Art. 330 CP, Decreto 2164/95, etc.)..."
                  />
                </div>

                {/* Botones */}
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Radicar Solicitud
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => toast.info('Guardando borrador...')}
                  >
                    Guardar Borrador
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          {/* Tab: Documentación */}
          <TabsContent value="documentacion">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Documentos Requeridos</h3>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Documentos Obligatorios:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Solicitud firmada por autoridad tradicional</li>
                    <li>Acta de asamblea comunitaria</li>
                    <li>Censo poblacional actualizado</li>
                    <li>Estudio socioeconómico</li>
                    <li>Certificado de tradición de territorios aledaños</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Documentos Técnicos:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Levantamiento topográfico</li>
                    <li>Cartografía social</li>
                    <li>Estudio de tenencia de tierras</li>
                    <li>Plan de etnodesarrollo</li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Haga clic o arrastre archivos aquí para cargar documentación
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Formatos aceptados: PDF, DOC, XLS (Máx. 50MB por archivo)
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Cartografía */}
          <TabsContent value="cartografia">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cartografía Social y Técnica</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Cartografía Social Participativa</h4>
                  <p className="text-gray-700 mb-4">
                    Mapa elaborado por la comunidad identificando sitios sagrados, rutas ancestrales, áreas de uso tradicional, etc.
                  </p>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Cargar Mapa Social
                  </Button>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Cartografía Técnica</h4>
                  <p className="text-gray-700 mb-4">
                    Levantamiento topográfico profesional con coordenadas GPS y linderos definidos.
                  </p>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Cargar Planos Técnicos
                  </Button>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Análisis de Superposiciones</h4>
                  <p className="text-gray-700 mb-4">
                    Verificación de superposiciones con áreas protegidas, títulos mineros, otros territorios, etc.
                  </p>
                  <Button>
                    Solicitar Análisis con IA
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Seguimiento */}
          <TabsContent value="seguimiento">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Seguimiento del Proceso</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Radicación de Solicitud</p>
                    <p className="text-sm text-gray-600">Completado - 15/01/2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completado</Badge>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Verificación Documental</p>
                    <p className="text-sm text-gray-600">En proceso</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">En Proceso</Badge>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Estudio Técnico</p>
                    <p className="text-sm text-gray-600">Pendiente</p>
                  </div>
                  <Badge variant="outline">Pendiente</Badge>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Concepto ANT/MinInterior</p>
                    <p className="text-sm text-gray-600">Pendiente</p>
                  </div>
                  <Badge variant="outline">Pendiente</Badge>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">5</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Resolución Final</p>
                    <p className="text-sm text-gray-600">Pendiente</p>
                  </div>
                  <Badge variant="outline">Pendiente</Badge>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Próximo paso:</strong> Completar verificación documental. Se requieren 3 documentos adicionales.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="p-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ampliación y Saneamiento Territorial con IA
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Sistema inteligente para gestionar procesos de ampliación territorial con análisis automatizado y seguimiento.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Map className="mr-2 h-5 w-5" />
                Nueva Solicitud
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
                <Download className="mr-2 h-5 w-5" />
                Guía Completa
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AmpliacionTerritorial;

