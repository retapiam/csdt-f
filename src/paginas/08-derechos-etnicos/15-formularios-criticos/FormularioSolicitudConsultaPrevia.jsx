import { useState } from 'react';
import { Users, FileText, MapPin, Building, Send } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import toast from 'react-hot-toast';

const FormularioSolicitudConsultaPrevia = () => {
  const [formData, setFormData] = useState({
    tipoProyecto: '',
    nombreProyecto: '',
    entidadSolicitante: '',
    comunidadesConsultar: '',
    departamento: '',
    municipio: '',
    areaInfluencia: '',
    impactosEsperados: '',
    cronograma: '',
    metodologia: ''
  });

  const tiposProyecto = [
    'Minero',
    'Hidroeléctrica',
    'Infraestructura Vial',
    'Petrolero',
    'Forestal',
    'Agroindustrial',
    'Turístico',
    'Otro'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Solicitud de Consulta Previa radicada exitosamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-purple-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Solicitud de Consulta Previa
              </h1>
              <p className="text-gray-600 mt-1">
                Formulario para procesos de consulta previa, libre e informada
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos del Proyecto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Proyecto *
                </label>
                <select
                  required
                  value={formData.tipoProyecto}
                  onChange={(e) => setFormData({...formData, tipoProyecto: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Seleccione tipo de proyecto</option>
                  {tiposProyecto.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Proyecto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombreProyecto}
                  onChange={(e) => setFormData({...formData, nombreProyecto: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Nombre del proyecto"
                />
              </div>
            </div>

            {/* Entidad Solicitante */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Entidad o Empresa Solicitante *
              </label>
              <input
                type="text"
                required
                value={formData.entidadSolicitante}
                onChange={(e) => setFormData({...formData, entidadSolicitante: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Nombre de la entidad o empresa"
              />
            </div>

            {/* Comunidades a Consultar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Comunidades a Consultar *
              </label>
              <textarea
                required
                rows="3"
                value={formData.comunidadesConsultar}
                onChange={(e) => setFormData({...formData, comunidadesConsultar: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Liste las comunidades, resguardos o consejos comunitarios a consultar..."
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Municipio"
                />
              </div>
            </div>

            {/* Área de Influencia */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción del Área de Influencia *
              </label>
              <textarea
                required
                rows="4"
                value={formData.areaInfluencia}
                onChange={(e) => setFormData({...formData, areaInfluencia: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Describa el área geográfica de influencia del proyecto, incluyendo coordenadas si las tiene..."
              />
            </div>

            {/* Impactos Esperados */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Impactos Esperados (Ambientales, Sociales, Culturales) *
              </label>
              <textarea
                required
                rows="5"
                value={formData.impactosEsperados}
                onChange={(e) => setFormData({...formData, impactosEsperados: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Describa los impactos esperados del proyecto sobre las comunidades y el territorio..."
              />
            </div>

            {/* Cronograma Propuesto */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cronograma Propuesto para la Consulta *
              </label>
              <textarea
                required
                rows="3"
                value={formData.cronograma}
                onChange={(e) => setFormData({...formData, cronograma: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Proponga fechas y fases del proceso de consulta previa..."
              />
            </div>

            {/* Metodología */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Metodología Propuesta
              </label>
              <textarea
                rows="4"
                value={formData.metodologia}
                onChange={(e) => setFormData({...formData, metodologia: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Describa la metodología que propone para el proceso de consulta..."
              />
            </div>

            {/* Botones */}
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3"
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

          {/* Información Legal */}
          <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Marco Legal:</strong> La consulta previa es un derecho fundamental establecido en el Convenio 169 de la OIT y la Constitución Política. Este proceso debe ser libre, previo, informado y buscar el consentimiento de las comunidades étnicas afectadas.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FormularioSolicitudConsultaPrevia;

