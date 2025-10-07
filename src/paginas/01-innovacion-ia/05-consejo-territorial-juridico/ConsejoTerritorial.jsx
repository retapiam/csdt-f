import React, { useState, useEffect } from 'react';
import { 
  Map, 
  Users, 
  FileText, 
  BarChart3,
  Cog,
  ShieldCheck,
  Globe,
  Building,
  Home,
  FileBarChart,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

const ConsejoTerritorial = () => {
  const [analisisActivo, setAnalisisActivo] = useState(null);
  const [resultadosAnalisis, setResultadosAnalisis] = useState([]);
  const [cargando, setCargando] = useState(false);

  const especialidadesIA = [
    {
      id: 'derecho_minero',
      nombre: 'Derecho Minero Internacional',
      descripcion: 'Análisis especializado de derechos mineros, títulos, consulta previa e impacto ambiental',
      icono: '⛏️',
      nivel: 'Post-Doctorado',
      color: 'bg-yellow-500'
    },
    {
      id: 'derecho_ambiental',
      nombre: 'Derecho Ambiental y Sostenibilidad',
      descripcion: 'Análisis de normativa ambiental, licencias, impacto y sostenibilidad',
      icono: '🌱',
      nivel: 'Post-Doctorado',
      color: 'bg-green-500'
    },
    {
      id: 'derecho_etnico',
      nombre: 'Derecho Étnico y Pueblos Originarios',
      descripcion: 'Análisis de derechos étnicos, consulta previa y jurisdicción especial',
      icono: '🏛️',
      nivel: 'Post-Doctorado',
      color: 'bg-purple-500'
    },
    {
      id: 'derecho_catastral',
      nombre: 'Derecho Catastral y Territorial',
      descripcion: 'Análisis de derechos de propiedad, avalúos y ordenamiento territorial',
      icono: '🏘️',
      nivel: 'Post-Doctorado',
      color: 'bg-blue-500'
    },
    {
      id: 'derecho_anticorrupcion',
      nombre: 'Derecho Anti-Corrupción',
      descripcion: 'Análisis de normativa anticorrupción, ética pública y transparencia',
      icono: '🛡️',
      nivel: 'Post-Doctorado',
      color: 'bg-red-500'
    },
    {
      id: 'derecho_medico',
      nombre: 'Derecho Médico y Bioética',
      descripcion: 'Análisis de responsabilidad médica, consentimiento informado y bioética',
      icono: '🏥',
      nivel: 'Post-Doctorado',
      color: 'bg-pink-500'
    },
    {
      id: 'derecho_penal_avanzado',
      nombre: 'Derecho Penal Avanzado',
      descripcion: 'Análisis de teoría del delito, procedimiento penal y criminología',
      icono: '⚖️',
      nivel: 'Post-Doctorado',
      color: 'bg-gray-500'
    },
    {
      id: 'derecho_disciplinario',
      nombre: 'Derecho Disciplinario',
      descripcion: 'Análisis de régimen disciplinario, ética profesional y función pública',
      icono: '📋',
      nivel: 'Post-Doctorado',
      color: 'bg-indigo-500'
    },
    // Nuevas IAs Especializadas Avanzadas
    {
      id: 'veeduria_anticorrupcion',
      nombre: 'Veeduría y Anti-Corrupción',
      descripcion: 'Análisis de control social, transparencia pública y rendición de cuentas',
      icono: '👁️',
      nivel: 'Post-Doctorado',
      color: 'bg-orange-500'
    },
    {
      id: 'derecho_informatico',
      nombre: 'Derecho Informático',
      descripcion: 'Análisis de ciberseguridad, protección de datos y delitos informáticos',
      icono: '💻',
      nivel: 'Post-Doctorado',
      color: 'bg-cyan-500'
    },
    {
      id: 'fiscalizacion',
      nombre: 'Fiscalización',
      descripcion: 'Análisis de control fiscal, auditoría pública y supervisión financiera',
      icono: '🔍',
      nivel: 'Post-Doctorado',
      color: 'bg-emerald-500'
    },
    {
      id: 'investigacion_forense',
      nombre: 'Investigación Forense',
      descripcion: 'Análisis forense digital, evidencia digital y criminología',
      icono: '🔬',
      nivel: 'Post-Doctorado',
      color: 'bg-violet-500'
    }
  ];

  const tiposPlanes = [
    {
      id: 'plan_desarrollo_municipal',
      nombre: 'Plan de Desarrollo Municipal',
      descripcion: 'Análisis de planes de desarrollo municipal con enfoque territorial',
      icono: '🏛️',
      color: 'bg-blue-600'
    },
    {
      id: 'plan_desarrollo_departamental',
      nombre: 'Plan de Desarrollo Departamental',
      descripcion: 'Análisis de planes de desarrollo departamental y coordinación regional',
      icono: '🏢',
      color: 'bg-green-600'
    },
    {
      id: 'plan_ordenamiento_territorial',
      nombre: 'Plan de Ordenamiento Territorial',
      descripcion: 'Análisis de POT, clasificación de suelo y normas urbanísticas',
      icono: '🗺️',
      color: 'bg-purple-600'
    },
    {
      id: 'plan_gobierno_etnico',
      nombre: 'Plan de Gobierno Étnico',
      descripcion: 'Análisis de planes de gobierno étnico y autonomía territorial',
      icono: '🏛️',
      color: 'bg-orange-600'
    },
    {
      id: 'plan_vida_comunitario',
      nombre: 'Plan de Vida Comunitario',
      descripcion: 'Análisis de planes de vida comunitario y desarrollo propio',
      icono: '👥',
      color: 'bg-teal-600'
    },
    {
      id: 'plan_etnodesarrollo',
      nombre: 'Plan de Etnodesarrollo',
      descripcion: 'Análisis de planes de etnodesarrollo y sostenibilidad étnica',
      icono: '🌿',
      color: 'bg-emerald-600'
    },
    {
      id: 'plan_anticorrupcion',
      nombre: 'Plan Anti-Corrupción',
      descripcion: 'Análisis de planes anticorrupción y transparencia institucional',
      icono: '🛡️',
      color: 'bg-red-600'
    },
    {
      id: 'plan_etica_transparencia',
      nombre: 'Plan de Ética y Transparencia',
      descripcion: 'Análisis de planes de ética y transparencia pública',
      icono: '📊',
      color: 'bg-indigo-600'
    }
  ];

  const consultarIA = async (tipo, datos) => {
    setCargando(true);
    setAnalisisActivo(tipo);
    
    try {
      let endpoint = '';
      
      // Determinar el endpoint según el tipo de IA
      if (['veeduria_anticorrupcion', 'derecho_informatico', 'fiscalizacion', 'investigacion_forense'].includes(tipo)) {
        // Nuevas IAs especializadas avanzadas
        const categoria = {
          'veeduria_anticorrupcion': 'veeduria-anticorrupcion',
          'derecho_informatico': 'derecho-informatico',
          'fiscalizacion': 'fiscalizacion',
          'investigacion_forense': 'investigacion-forense'
        }[tipo];
        
        endpoint = `/api/ia-especializadas-avanzadas/${categoria}/analisis-integral`;
      } else {
        // IAs especializadas existentes
        endpoint = `/api/ia-${tipo}`;
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

  const consultarTodasLasIAs = async (datos) => {
    setCargando(true);
    
    try {
      // Consultar todas las especialidades en paralelo
      const promesas = especialidadesIA.map(especialidad => 
        consultarIA(especialidad.id, datos)
      );
      
      await Promise.all(promesas);
    } catch (error) {
      console.error('Error consultando todas las IAs:', error);
    } finally {
      setCargando(false);
    }
  };

  const consultarTodosLosPlanes = async (datos) => {
    setCargando(true);
    
    try {
      // Consultar todos los tipos de planes en paralelo
      const promesas = tiposPlanes.map(plan => 
        consultarIA(plan.id, datos)
      );
      
      await Promise.all(promesas);
    } catch (error) {
      console.error('Error consultando todos los planes:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Consejo Territorial de IA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Centro de análisis jurídico post-doctorado especializado en derechos territoriales, 
            planes de gobierno y desarrollo sostenible
          </p>
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-white rounded-lg shadow mb-12">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Acciones Rápidas</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => consultarTodasLasIAs({ tipo: 'consulta_general' })}
                disabled={cargando}
                className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <Cog className="h-5 w-5 mr-2" />
                Consultar Todas las IAs
              </button>
              
              <button
                onClick={() => consultarTodosLosPlanes({ tipo: 'consulta_general' })}
                disabled={cargando}
                className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                <FileText className="h-5 w-5 mr-2" />
                Consultar Todos los Planes
              </button>
              
              <button
                onClick={() => setResultadosAnalisis([])}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Limpiar Resultados
              </button>
            </div>
          </div>
        </div>

        {/* Especialidades de IA */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Especialidades de IA Post-Doctorado</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {especialidadesIA.map((especialidad) => (
              <div
                key={especialidad.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => consultarIA(especialidad.id, { tipo: 'consulta_especializada' })}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${especialidad.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {especialidad.icono}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{especialidad.nombre}</h3>
                      <p className="text-sm text-gray-500">{especialidad.nivel}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{especialidad.descripcion}</p>
                  {cargando && analisisActivo === especialidad.id && (
                    <div className="flex items-center text-blue-600">
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      <span className="text-sm">Analizando...</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de Planes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipos de Planes de Gobierno</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiposPlanes.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => consultarIA(plan.id, { tipo: 'consulta_plan' })}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {plan.icono}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{plan.nombre}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{plan.descripcion}</p>
                  {cargando && analisisActivo === plan.id && (
                    <div className="flex items-center text-green-600">
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      <span className="text-sm">Analizando...</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resultados de Análisis */}
        {resultadosAnalisis.length > 0 && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Resultados de Análisis</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {resultadosAnalisis.map((resultado) => (
                  <div key={resultado.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {especialidadesIA.find(s => s.id === resultado.tipo)?.nombre || 
                         tiposPlanes.find(p => p.id === resultado.tipo)?.nombre || 
                         resultado.tipo}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {new Date(resultado.timestamp).toLocaleString()}
                        </span>
                        <span className="text-sm text-blue-600">
                          {resultado.tokens} tokens
                        </span>
                      </div>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">{resultado.resultado}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Estado de Carga */}
        {cargando && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4">
              <div className="flex items-center justify-center mb-4">
                <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Procesando Análisis
              </h3>
              <p className="text-gray-600 text-center">
                Las IAs especializadas están analizando la información. 
                Esto puede tomar unos momentos...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsejoTerritorial;
