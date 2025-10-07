import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Code2, 
  ShieldCheck,
  FileText,
  BarChart3,
  Cog,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Lightbulb
} from 'lucide-react';

/**
 * Consejo EticaIA - Página unificada para todas las IAs de ética y gestión de proyectos
 * Nivel Post-Doctorado con enfoque en códigos de ética y conducta profesional
 */
const ConsejoEticaIA = () => {
  const [cargando, setCargando] = useState(false);
  const [analisisActivo, setAnalisisActivo] = useState(null);
  const [resultadosAnalisis, setResultadosAnalisis] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

  // IAs de Ética y Gestión de Proyectos
  const especialidadesIA = [
    // PMP (Project Management Professional)
    {
      id: 'pmp',
      nombre: 'PMP - Project Management Professional',
      descripcion: 'Guía completa de gestión de proyectos profesionales con enfoque ético',
      icono: '📋',
      nivel: 'Post-Doctorado',
      color: 'bg-blue-500',
      categorias: [
        'Guía PMP',
        'Código de Ética PMP',
        'Mejores Prácticas',
        'Metodologías',
        'Gestión de Riesgos',
        'Gestión de Calidad',
        'Gestión de Recursos',
        'Gestión de Stakeholders'
      ]
    },
    // IPMA (International Project Management Association)
    {
      id: 'ipma',
      nombre: 'IPMA - International Project Management Association',
      descripcion: 'Competencias profesionales y códigos de ética internacionales',
      icono: '🌍',
      nivel: 'Post-Doctorado',
      color: 'bg-green-500',
      categorias: [
        'Competencias IPMA',
        'Código de Ética IPMA',
        'Certificación IPMA',
        'Estándares IPMA',
        'Liderazgo Ético'
      ]
    },
    // PMI (Project Management Institute)
    {
      id: 'pmi',
      nombre: 'PMI - Project Management Institute',
      descripcion: 'Códigos de ética y conducta profesional en gestión de proyectos',
      icono: '🏛️',
      nivel: 'Post-Doctorado',
      color: 'bg-purple-500',
      categorias: [
        'Código de Ética PMI',
        'Estándares PMI',
        'Certificaciones PMI',
        'Gobernanza PMI'
      ]
    }
  ];

  // Categorías de análisis ético
  const categoriasEticas = [
    {
      id: 'codigos_etica',
      nombre: 'Códigos de Ética',
      descripcion: 'Análisis de códigos de ética profesionales',
      icono: '📜',
      color: 'bg-red-500'
    },
    {
      id: 'conducta_profesional',
      nombre: 'Conducta Profesional',
      descripcion: 'Estándares de conducta profesional',
      icono: '👔',
      color: 'bg-orange-500'
    },
    {
      id: 'valores_profesionales',
      nombre: 'Valores Profesionales',
      descripcion: 'Valores fundamentales en la profesión',
      icono: '💎',
      color: 'bg-yellow-500'
    },
    {
      id: 'responsabilidades',
      nombre: 'Responsabilidades',
      descripcion: 'Responsabilidades profesionales y sociales',
      icono: '⚖️',
      color: 'bg-green-500'
    },
    {
      id: 'conflictos_interes',
      nombre: 'Conflictos de Interés',
      descripcion: 'Gestión de conflictos de interés',
      icono: '⚡',
      color: 'bg-blue-500'
    },
    {
      id: 'sostenibilidad',
      nombre: 'Sostenibilidad',
      descripcion: 'Ética en sostenibilidad y responsabilidad social',
      icono: '🌱',
      color: 'bg-emerald-500'
    }
  ];

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const response = await fetch('/api/ias-etica/estadisticas-consolidadas', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.exito) {
        setEstadisticas(data.datos);
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  const consultarIA = async (tipo, datos) => {
    setCargando(true);
    setAnalisisActivo(tipo);
    
    try {
      let endpoint = '';
      
      // Determinar el endpoint según el tipo de IA
      switch (tipo) {
        case 'pmp':
          endpoint = '/api/ia-pmp/analisis-integral';
          break;
        case 'ipma':
          endpoint = '/api/ia-ipma/analisis-integral';
          break;
        case 'pmi':
          endpoint = '/api/ia-pmi/analisis-integral';
          break;
        default:
          throw new Error('Tipo de IA no válido');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(datos)
      });

      const resultado = await response.json();
      
      if (resultado.exito || resultado.success) {
        setResultadosAnalisis(prev => [...prev, {
          id: Date.now(),
          tipo,
          datos,
          resultado: resultado.datos?.analisis_consolidado || resultado.analisisCompleto || resultado.analisis,
          timestamp: new Date().toISOString(),
          tokens: resultado.datos?.tokens_usados || resultado.tokens_usados || 0
        }]);
      }
    } catch (error) {
      console.error('Error consultando IA:', error);
    } finally {
      setCargando(false);
      setAnalisisActivo(null);
    }
  };

  const generarManualConducta = async (tipoIA, datos) => {
    setCargando(true);
    
    try {
      const datosCompletos = {
        ...datos,
        tipo_analisis: 'manual_conducta',
        incluir_codigos_etica: true,
        incluir_estandares: true,
        incluir_casos_practicos: true
      };

      await consultarIA(tipoIA, datosCompletos);
    } catch (error) {
      console.error('Error generando manual de conducta:', error);
    } finally {
      setCargando(false);
    }
  };

  const procesarArchivo = async (archivo, tipoIA) => {
    setCargando(true);
    
    try {
      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('tipo_ia', tipoIA);
      formData.append('analisis_etica', true);

      const response = await fetch('/api/ias-etica/procesar-archivo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const resultado = await response.json();
      
      if (resultado.exito) {
        setResultadosAnalisis(prev => [...prev, {
          id: Date.now(),
          tipo: tipoIA,
          datos: { archivo: archivo.name },
          resultado: resultado.datos?.analisis_etica || resultado.analisis,
          timestamp: new Date().toISOString(),
          tokens: resultado.datos?.tokens_usados || 0
        }]);
      }
    } catch (error) {
      console.error('Error procesando archivo:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleArchivoChange = (event, tipoIA) => {
    const archivo = event.target.files[0];
    if (archivo) {
      setArchivoSeleccionado(archivo);
      procesarArchivo(archivo, tipoIA);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <ShieldCheck className="h-16 w-16 text-indigo-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Consejo EticaIA
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Inteligencia Artificial para Ética y Gestión de Proyectos
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Plataforma unificada para análisis ético, códigos de conducta profesional 
            y gestión de proyectos con enfoque en responsabilidad social y sostenibilidad.
          </p>
        </div>

        {/* IAs Especializadas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            IAs de Ética y Gestión de Proyectos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {especialidadesIA.map((ia) => (
              <div key={ia.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className={`${ia.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{ia.nombre}</h3>
                      <p className="text-sm opacity-90 mt-1">{ia.descripcion}</p>
                    </div>
                    <span className="text-4xl">{ia.icono}</span>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                      {ia.nivel}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Categorías de Análisis:</h4>
                  <div className="space-y-2">
                    {ia.categorias.map((categoria, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {categoria}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => consultarIA(ia.id, { 
                        tipo_analisis: 'integral',
                        incluir_etica: true,
                        incluir_conducta: true,
                        incluir_sostenibilidad: true
                      })}
                      disabled={cargando}
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center"
                    >
                      {cargando && analisisActivo === ia.id ? (
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Cog className="h-4 w-4 mr-2" />
                      )}
                      Consultar IA
                    </button>
                    
                    <button
                      onClick={() => generarManualConducta(ia.id, {
                        tipo_manual: 'codigo_conducta',
                        incluir_etica: true,
                        incluir_estandares: true
                      })}
                      disabled={cargando}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generar Manual
                    </button>
                    
                    <label className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 cursor-pointer flex items-center justify-center">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={(e) => handleArchivoChange(e, ia.id)}
                        className="hidden"
                      />
                      <BookOpen className="h-4 w-4 mr-2" />
                      Cargar Archivo
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorías Éticas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Categorías de Análisis Ético
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriasEticas.map((categoria) => (
              <div key={categoria.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <div className={`${categoria.color} p-3 rounded-lg mr-4`}>
                    <span className="text-2xl">{categoria.icono}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {categoria.nombre}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {categoria.descripcion}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => consultarIA('etica', {
                    categoria: categoria.id,
                    tipo_analisis: 'categoria_etica',
                    incluir_casos: true,
                    incluir_recomendaciones: true
                  })}
                  disabled={cargando}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 disabled:opacity-50"
                >
                  Analizar Categoría
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resultados de Análisis */}
        {resultadosAnalisis.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Resultados de Análisis
            </h2>
            <div className="space-y-6">
              {resultadosAnalisis.map((resultado) => (
                <div key={resultado.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Análisis {resultado.tipo.toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(resultado.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {resultado.tokens} tokens
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                      {resultado.resultado}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Consejo EticaIA
          </h3>
          <p className="text-gray-600 mb-4">
            Plataforma de Inteligencia Artificial para análisis ético y gestión de proyectos
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>Nivel Post-Doctorado</span>
            <span>•</span>
            <span>Análisis Ético Avanzado</span>
            <span>•</span>
            <span>Generación de Manuales</span>
            <span>•</span>
            <span>Procesamiento de Archivos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsejoEticaIA;
