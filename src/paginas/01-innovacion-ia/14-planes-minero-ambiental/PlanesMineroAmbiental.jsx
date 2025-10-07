import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Mountain, 
  Leaf, 
  Network, 
  Download, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Globe,
  Users,
  Zap,
  BookOpen,
  Target,
  BarChart3,
  Calendar,
  Shield,
  Sparkles
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

const PlanesMineroAmbiental = () => {
  const [activeTab, setActiveTab] = useState('generar');
  const [tipoPlan, setTipoPlan] = useState('integrado');
  const [planes, setPlanes] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  // Estado del formulario
  const [formulario, setFormulario] = useState({
    nombre_proyecto: '',
    tipo_mineria: 'oro',
    tipo_ecosistema: 'bosque',
    ubicacion: '',
    duracion: '12 meses',
    descripcion: '',
    area_hectareas: '',
    inversion_estimada: '',
    comunidad_etnica: 'No',
    tipo_comunidad: ''
  });

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarPlanes();
    cargarEstadisticas();
  }, []);

  // Cargar planes del usuario
  const cargarPlanes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/planes-trabajo`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlanes(response.data.planes.data || []);
    } catch (error) {
      console.error('Error al cargar planes:', error);
    }
  };

  // Cargar estadísticas
  const cargarEstadisticas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/planes-trabajo/estadisticas/resumen`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEstadisticas(response.data.estadisticas);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  // Generar plan de trabajo
  const generarPlan = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading('🚀 Generando plan de trabajo de nivel POST-DOCTORADO...');

    try {
      const token = localStorage.getItem('token');
      const endpoint = tipoPlan === 'minero' ? '/planes-trabajo/minero' :
                       tipoPlan === 'ambiental' ? '/planes-trabajo/ambiental' :
                       '/planes-trabajo/integrado';

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        formulario,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('✅ ¡Plan generado exitosamente!', { id: toastId });
      
      // Mostrar el plan generado
      setPlanSeleccionado(response.data.plan);
      setActiveTab('resultados');
      
      // Actualizar lista de planes
      cargarPlanes();
      cargarEstadisticas();
      
      // Limpiar formulario
      setFormulario({
        nombre_proyecto: '',
        tipo_mineria: 'oro',
        tipo_ecosistema: 'bosque',
        ubicacion: '',
        duracion: '12 meses',
        descripcion: '',
        area_hectareas: '',
        inversion_estimada: '',
        comunidad_etnica: 'No',
        tipo_comunidad: ''
      });

    } catch (error) {
      console.error('Error al generar plan:', error);
      toast.error('❌ Error al generar plan. Intente nuevamente.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Descargar plan como PDF
  const descargarPlanPDF = (plan) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 7;
    let yPosition = 20;

    // Título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(plan.nombre_proyecto, margin, yPosition);
    yPosition += 10;

    // Subtítulo
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tipo: ${plan.tipo_plan.toUpperCase()} | Estado: ${plan.estado}`, margin, yPosition);
    yPosition += 10;

    // Separador
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Contenido del plan
    doc.setFontSize(10);
    const contenido = plan.plan_generado?.contenido || 'No hay contenido disponible';
    const splitText = doc.splitTextToSize(contenido, pageWidth - 2 * margin);
    
    splitText.forEach((line) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    // Pie de página
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Página ${i} de ${totalPages} | Generado: ${new Date().toLocaleDateString()}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    doc.save(`${plan.nombre_proyecto.replace(/\s+/g, '_')}.pdf`);
    toast.success('📄 Plan descargado exitosamente');
  };

  // Eliminar plan
  const eliminarPlan = async (id) => {
    if (!confirm('¿Está seguro de eliminar este plan?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/planes-trabajo/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('✅ Plan eliminado exitosamente');
      cargarPlanes();
      cargarEstadisticas();
    } catch (error) {
      console.error('Error al eliminar plan:', error);
      toast.error('❌ Error al eliminar plan');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Planes de Trabajo Minero y Ambiental
                </h1>
                <p className="text-gray-600 mt-1">
                  Sistema de IA Nivel POST-DOCTORADO para Generación de Planes Especializados
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full">
                <BookOpen className="w-5 h-5 text-amber-700 mr-2" />
                <span className="text-sm font-semibold text-amber-700">POST-DOCTORADO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="flex space-x-2">
            {[
              { id: 'generar', label: 'Generar Plan', icon: FileText },
              { id: 'planes', label: 'Mis Planes', icon: Mountain },
              { id: 'resultados', label: 'Resultados', icon: Target },
              { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab: Generar Plan */}
        {activeTab === 'generar' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-emerald-500" />
              Generar Nuevo Plan de Trabajo
            </h2>

            {/* Selector de Tipo de Plan */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { id: 'minero', label: 'Plan Minero', icon: Mountain, color: 'from-orange-500 to-red-600' },
                { id: 'ambiental', label: 'Plan Ambiental', icon: Leaf, color: 'from-green-500 to-emerald-600' },
                { id: 'integrado', label: 'Plan Integrado', icon: Network, color: 'from-blue-500 to-purple-600' }
              ].map(tipo => (
                <button
                  key={tipo.id}
                  onClick={() => setTipoPlan(tipo.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    tipoPlan === tipo.id
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${tipo.color} rounded-full flex items-center justify-center mb-3 mx-auto`}>
                    <tipo.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800">{tipo.label}</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {tipo.id === 'minero' && 'Enfoque en aspectos mineros'}
                    {tipo.id === 'ambiental' && 'Enfoque en conservación'}
                    {tipo.id === 'integrado' && 'Minería sostenible'}
                  </p>
                </button>
              ))}
            </div>

            {/* Formulario */}
            <form onSubmit={generarPlan} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                
                {/* Nombre del Proyecto */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre del Proyecto *
                  </label>
                  <input
                    type="text"
                    name="nombre_proyecto"
                    value={formulario.nombre_proyecto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Ej: Proyecto de Explotación de Oro Aluvial en La Guajira"
                  />
                </div>

                {/* Tipo de Minería */}
                {(tipoPlan === 'minero' || tipoPlan === 'integrado') && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Minería *
                    </label>
                    <select
                      name="tipo_mineria"
                      value={formulario.tipo_mineria}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    >
                      <option value="oro">Oro</option>
                      <option value="carbon">Carbón</option>
                      <option value="esmeraldas">Esmeraldas</option>
                      <option value="petroleo">Petróleo</option>
                      <option value="gas">Gas</option>
                      <option value="cobre">Cobre</option>
                      <option value="niquel">Níquel</option>
                      <option value="hierro">Hierro</option>
                      <option value="caliza">Caliza</option>
                      <option value="arcilla">Arcilla</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                )}

                {/* Tipo de Ecosistema */}
                {(tipoPlan === 'ambiental' || tipoPlan === 'integrado') && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Ecosistema *
                    </label>
                    <select
                      name="tipo_ecosistema"
                      value={formulario.tipo_ecosistema}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    >
                      <option value="bosque">Bosque</option>
                      <option value="paramo">Páramo</option>
                      <option value="humedal">Humedal</option>
                      <option value="manglar">Manglar</option>
                      <option value="marino">Marino-Costero</option>
                      <option value="amazonico">Amazónico</option>
                      <option value="andino">Andino</option>
                      <option value="caribe">Caribe</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                )}

                {/* Ubicación */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={formulario.ubicacion}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Ej: Municipio de Marmato, Caldas"
                  />
                </div>

                {/* Duración */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duración del Proyecto *
                  </label>
                  <input
                    type="text"
                    name="duracion"
                    value={formulario.duracion}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Ej: 24 meses, 2 años"
                  />
                </div>

                {/* Área en Hectáreas */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Área (Hectáreas)
                  </label>
                  <input
                    type="number"
                    name="area_hectareas"
                    value={formulario.area_hectareas}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Ej: 150"
                  />
                </div>

                {/* Inversión Estimada */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Inversión Estimada (USD)
                  </label>
                  <input
                    type="number"
                    name="inversion_estimada"
                    value={formulario.inversion_estimada}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Ej: 5000000"
                  />
                </div>

                {/* Comunidad Étnica */}
                {tipoPlan === 'integrado' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ¿Afecta Comunidad Étnica? *
                    </label>
                    <select
                      name="comunidad_etnica"
                      value={formulario.comunidad_etnica}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    >
                      <option value="No">No</option>
                      <option value="Sí">Sí</option>
                    </select>
                  </div>
                )}

                {/* Tipo de Comunidad */}
                {tipoPlan === 'integrado' && formulario.comunidad_etnica === 'Sí' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Comunidad
                    </label>
                    <select
                      name="tipo_comunidad"
                      value={formulario.tipo_comunidad}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                    >
                      <option value="">Seleccione...</option>
                      <option value="indigena">Indígena</option>
                      <option value="afrodescendiente">Afrodescendiente</option>
                      <option value="raizal">Raizal</option>
                      <option value="palenquero">Palenquero</option>
                      <option value="rom">ROM</option>
                    </select>
                  </div>
                )}

                {/* Descripción */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descripción del Proyecto *
                  </label>
                  <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                    placeholder="Describa detalladamente el proyecto, objetivos, alcances, y cualquier información relevante..."
                  />
                </div>
              </div>

              {/* Botón de Envío */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-3 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Generando Plan POST-DOCTORADO...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6" />
                      <span>Generar Plan de Trabajo Profesional</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab: Mis Planes */}
        {activeTab === 'planes' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Mountain className="w-7 h-7 mr-3 text-emerald-500" />
              Mis Planes de Trabajo
            </h2>

            {planes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No hay planes generados aún</p>
                <button
                  onClick={() => setActiveTab('generar')}
                  className="mt-4 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Generar Mi Primer Plan
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {planes.map(plan => (
                  <div key={plan.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            plan.tipo_plan === 'minero' ? 'bg-orange-100 text-orange-700' :
                            plan.tipo_plan === 'ambiental' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {plan.tipo_plan.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            plan.estado === 'generado' ? 'bg-gray-100 text-gray-700' :
                            plan.estado === 'aprobado' ? 'bg-emerald-100 text-emerald-700' :
                            plan.estado === 'en_ejecucion' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {plan.estado.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.nombre_proyecto}</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-2 text-emerald-500" />
                            {plan.ubicacion}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            {plan.duracion}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-purple-500" />
                            {new Date(plan.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => {
                            setPlanSeleccionado(plan);
                            setActiveTab('resultados');
                          }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Ver Plan"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => descargarPlanPDF(plan)}
                          className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                          title="Descargar PDF"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => eliminarPlan(plan.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Resultados */}
        {activeTab === 'resultados' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Target className="w-7 h-7 mr-3 text-emerald-500" />
              Resultados del Plan
            </h2>

            {planSeleccionado ? (
              <div className="space-y-6">
                {/* Información del Plan */}
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border-l-4 border-emerald-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{planSeleccionado.nombre_proyecto}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Tipo de Plan</p>
                      <p className="font-bold text-gray-800">{planSeleccionado.tipo_plan.toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ubicación</p>
                      <p className="font-bold text-gray-800">{planSeleccionado.ubicacion}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duración</p>
                      <p className="font-bold text-gray-800">{planSeleccionado.duracion}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estado</p>
                      <p className="font-bold text-emerald-600">{planSeleccionado.estado.toUpperCase()}</p>
                    </div>
                  </div>
                </div>

                {/* Contenido del Plan */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-800 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-amber-500" />
                      Plan de Trabajo Completo - Nivel POST-DOCTORADO
                    </h4>
                    <button
                      onClick={() => descargarPlanPDF(planSeleccionado)}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar PDF</span>
                    </button>
                  </div>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                      {planSeleccionado.plan_generado?.contenido || 'No hay contenido disponible'}
                    </pre>
                  </div>
                </div>

                {/* Metadata */}
                {planSeleccionado.plan_generado?.metadata && (
                  <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-blue-500" />
                      Información Técnica del Análisis
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Nivel</p>
                        <p className="font-bold text-amber-700">{planSeleccionado.plan_generado.nivel}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Modelo IA</p>
                        <p className="font-bold text-gray-800">{planSeleccionado.plan_generado.modelo}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tokens Usados</p>
                        <p className="font-bold text-gray-800">{planSeleccionado.plan_generado.tokens_usados}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fecha</p>
                        <p className="font-bold text-gray-800">
                          {new Date(planSeleccionado.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Seleccione un plan para ver los resultados</p>
              </div>
            )}
          </div>
        )}

        {/* Tab: Estadísticas */}
        {activeTab === 'estadisticas' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="w-7 h-7 mr-3 text-emerald-500" />
              Estadísticas de Planes
            </h2>

            {estadisticas ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
                  <p className="text-sm text-blue-700 font-semibold mb-2">Total de Planes</p>
                  <p className="text-3xl font-bold text-blue-900">{estadisticas.total_planes}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-500">
                  <p className="text-sm text-orange-700 font-semibold mb-2">Planes Mineros</p>
                  <p className="text-3xl font-bold text-orange-900">{estadisticas.planes_mineros}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-sm text-green-700 font-semibold mb-2">Planes Ambientales</p>
                  <p className="text-3xl font-bold text-green-900">{estadisticas.planes_ambientales}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500">
                  <p className="text-sm text-purple-700 font-semibold mb-2">Planes Integrados</p>
                  <p className="text-3xl font-bold text-purple-900">{estadisticas.planes_integrados}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Cargando estadísticas...</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default PlanesMineroAmbiental;

