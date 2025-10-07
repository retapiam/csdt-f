import { useState } from 'react';
import { AlertTriangle, Users, MapPin, Calendar, FileText, Upload, Send } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import toast from 'react-hot-toast';

const FormularioDenunciaVulneracion = () => {
  const [formData, setFormData] = useState({
    tipoDenuncia: '',
    denunciante: '',
    comunidad: '',
    pueblo: '',
    departamento: '',
    municipio: '',
    fechaHechos: '',
    descripcion: '',
    afectados: '',
    evidencias: []
  });

  const tiposDenuncia = [
    'Vulneración Derechos Territoriales',
    'Proyectos Extractivos sin Consulta',
    'Desplazamiento Forzado',
    'Discriminación Étnica',
    'Violencia contra Líderes',
    'Afectación Ambiental',
    'Otro'
  ];

  const pueblos = ['Indígena', 'Afrocolombiano', 'Raizal', 'Palenquero', 'Rrom'];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Denuncia radicada exitosamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-red-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Formulario de Denuncia de Vulneración
              </h1>
              <p className="text-gray-600 mt-1">
                Reporte de vulneraciones a derechos étnicos
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Denuncia */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Vulneración *
              </label>
              <select
                required
                value={formData.tipoDenuncia}
                onChange={(e) => setFormData({...formData, tipoDenuncia: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
              >
                <option value="">Seleccione el tipo de vulneración</option>
                {tiposDenuncia.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            {/* Datos del Denunciante */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Denunciante *
                </label>
                <input
                  type="text"
                  required
                  value={formData.denunciante}
                  onChange={(e) => setFormData({...formData, denunciante: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                  placeholder="Nombre completo o autoridad tradicional"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pueblo Étnico *
                </label>
                <select
                  required
                  value={formData.pueblo}
                  onChange={(e) => setFormData({...formData, pueblo: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                >
                  <option value="">Seleccione pueblo étnico</option>
                  {pueblos.map((pueblo) => (
                    <option key={pueblo} value={pueblo}>{pueblo}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comunidad Afectada */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Comunidad o Resguardo Afectado *
              </label>
              <input
                type="text"
                required
                value={formData.comunidad}
                onChange={(e) => setFormData({...formData, comunidad: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                placeholder="Nombre del resguardo, consejo comunitario o comunidad"
              />
            </div>

            {/* Ubicación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Departamento *
                </label>
                <input
                  type="text"
                  required
                  value={formData.departamento}
                  onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                  placeholder="Departamento"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Municipio *
                </label>
                <input
                  type="text"
                  required
                  value={formData.municipio}
                  onChange={(e) => setFormData({...formData, municipio: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                  placeholder="Municipio"
                />
              </div>
            </div>

            {/* Fecha y Afectados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha de los Hechos *
                </label>
                <input
                  type="date"
                  required
                  value={formData.fechaHechos}
                  onChange={(e) => setFormData({...formData, fechaHechos: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Número de Personas Afectadas
                </label>
                <input
                  type="number"
                  value={formData.afectados}
                  onChange={(e) => setFormData({...formData, afectados: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                  placeholder="Cantidad aproximada"
                />
              </div>
            </div>

            {/* Descripción de Hechos */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción Detallada de los Hechos *
              </label>
              <textarea
                required
                rows="6"
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none resize-none"
                placeholder="Describa detalladamente los hechos de vulneración, incluyendo actores involucrados, circunstancias y consecuencias..."
              />
            </div>

            {/* Evidencias */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Evidencias (Documentos, Fotos, Videos)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Haga clic o arrastre archivos aquí para cargar evidencias
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Formatos aceptados: PDF, JPG, PNG, MP4 (Máx. 50MB)
                </p>
              </div>
            </div>

            {/* Botones */}
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-600 text-white py-3"
              >
                <Send className="w-5 h-5 mr-2" />
                Radicar Denuncia
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

          {/* Información Legal */}
          <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Importante:</strong> Esta denuncia será tratada con estricta confidencialidad y será tramitada de acuerdo a la normativa aplicable en derechos étnicos. Los datos personales serán protegidos conforme a la Ley de Protección de Datos.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FormularioDenunciaVulneracion;

