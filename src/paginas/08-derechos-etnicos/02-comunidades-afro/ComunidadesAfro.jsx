import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import Modal from '../../../components/Modal';
import etnicoService from '../../../services/EtnicoService';
import { advancedAIService } from '../../../services/ia/AdvancedAIService';
import { 
  Users, 
  MapPin, 
  Heart, 
  Shield,
  Eye,
  Brain,
  AlertCircle,
  Clock,
  Award,
  BookOpen,
  CheckCircle
} from 'lucide-react';

const ComunidadesAfro = () => {
  const [comunidades, setComunidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [comunidadSeleccionada, setComunidadSeleccionada] = useState(null);
  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargandoAnalisis, setCargandoAnalisis] = useState(false);
  const [estadisticas, setEstadisticas] = useState({
    totalComunidades: 0,
    totalTerritorios: 0,
    totalConsejos: 0,
    poblacionTotal: 0
  });

  useEffect(() => {
    cargarComunidadesAfro();
  }, []);

  const cargarComunidadesAfro = async () => {
    setLoading(true);
    
    try {
      const response = await etnicoService.obtenerComunidadesAfro();
      const data = response.success && response.data ? 
        (Array.isArray(response.data) ? response.data : response.data.data || []) : 
        [];
      
      // Mapear datos del backend al formato del frontend
      const comunidadesMapeadas = data.map(c => {
        const metadata = typeof c.metadata === 'string' ? JSON.parse(c.metadata) : c.metadata || {};
        return {
          id: c.id,
          nombre: c.nombre,
          departamento: c.departamento,
          municipio: c.municipio,
          poblacion: c.poblacion || 0,
          territorioColectivo: c.territorio_colectivo ? true : false,
          consejoComunitario: c.representante_legal || 'No especificado',
          reconocimiento: metadata.reconocimiento || 'No especificado',
          descripcion: metadata.descripcion || '',
          caracteristicas: metadata.caracteristicas || [],
          derechos: metadata.derechos || [],
          patrimonioUNESCO: metadata.patrimonio_unesco || false
        };
      });
      
      setComunidades(comunidadesMapeadas);
      
      const stats = {
        totalComunidades: comunidadesMapeadas.length,
        totalTerritorios: comunidadesMapeadas.filter(c => c.territorioColectivo).length,
        totalConsejos: comunidadesMapeadas.length,
        poblacionTotal: comunidadesMapeadas.reduce((sum, c) => sum + c.poblacion, 0)
      };
      setEstadisticas(stats);
    } catch (error) {
      console.error('Error cargando comunidades afro:', error);
      setComunidades([]);
      setEstadisticas({
        totalComunidades: 0,
        totalTerritorios: 0,
        totalConsejos: 0,
        poblacionTotal: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const comunidadesFiltradas = comunidades.filter(comunidad =>
    comunidad.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    comunidad.departamento.toLowerCase().includes(filtro.toLowerCase()) ||
    comunidad.municipio.toLowerCase().includes(filtro.toLowerCase())
  );

  const analizarComunidadConIA = async (comunidad) => {
    setCargandoAnalisis(true);
    setAnalisisIA(null);
    
    try {
      const datosAnalisis = {
        narracion: `Análisis de la comunidad ${comunidad.nombre} en ${comunidad.municipio}, ${comunidad.departamento}. 
        Población: ${comunidad.poblacion} habitantes. 
        ${comunidad.territorioColectivo ? 'Cuenta con territorio colectivo titulado.' : ''}
        ${comunidad.patrimonioUNESCO ? 'Reconocida como Patrimonio Inmaterial de la Humanidad por UNESCO.' : ''}
        Descripción: ${comunidad.descripcion}`,
        grupoEtnico: comunidad.nombre,
        ubicacion: `${comunidad.municipio}, ${comunidad.departamento}`,
        tipoCaso: 'Análisis Étnico Cultural Afrodescendiente',
        archivos: []
      };

      const resultado = await advancedAIService.analizarCasoEtnico(datosAnalisis);
      
      // Convertir resultado al formato esperado por el frontend
      setAnalisisIA({
        exito: true,
        tipo_etnico: {
          nombre: comunidad.nombre,
          confianza: resultado.metadatos?.confianzaPromedio || 0.9
        },
        derechos_afectados: resultado.normativaAplicable?.map((norma, idx) => ({
          titulo: norma,
          nivel_afectacion: 0
        })) || [],
        consulta_previa: {
          requiere_consulta: false,
          nivel_urgencia: 'Bajo'
        },
        impacto_etnico: {
          nivel_general: 0,
          impactos_especificos: []
        },
        analisis_narrativo: resultado.analisis?.resumen || resultado.analisis?.detalle || 'Análisis completado'
      });
    } catch (error) {
      console.error('Error en análisis IA:', error);
      setAnalisisIA({
        exito: false,
        error: 'Error al realizar el análisis con IA'
      });
    } finally {
      setCargandoAnalisis(false);
    }
  };

  const getColorPorIndice = (indice) => {
    const colores = [
      'from-pink-500 to-rose-500',
      'from-amber-500 to-orange-500',
      'from-emerald-500 to-teal-500',
      'from-blue-500 to-indigo-500',
      'from-purple-500 to-violet-500',
      'from-red-500 to-pink-500',
      'from-cyan-500 to-blue-500',
      'from-orange-500 to-amber-500',
      'from-indigo-500 to-purple-500',
      'from-lime-500 to-green-500'
    ];
    return colores[indice % colores.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="text-center text-white">
          <div className="inline-block animate-spin text-5xl mb-4">
            <Clock />
          </div>
          <p className="text-xl">Cargando comunidades afrodescendientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 to-amber-600">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 text-white">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg flex items-center justify-center gap-4">
              <Heart className="w-12 h-12" />
              Comunidades Afrodescendientes
            </h1>
            <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Comunidades Negras, Afrocolombianas, Raizales y Palenqueras de Colombia
              <br/>
              <span className="text-lg">
                Ley 70 de 1993 • Decreto 1745 de 1995 • Ley 21 de 1991
              </span>
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{estadisticas.totalComunidades}</div>
              <div className="text-sm opacity-80">Comunidades</div>
            </Card>
            
            <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{estadisticas.totalTerritorios}</div>
              <div className="text-sm opacity-80">Territorios Colectivos</div>
            </Card>
            
            <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{estadisticas.totalConsejos}</div>
              <div className="text-sm opacity-80">Consejos Comunitarios</div>
            </Card>
            
            <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <Heart className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{(estadisticas.poblacionTotal / 1000).toFixed(0)}K</div>
              <div className="text-sm opacity-80">Habitantes</div>
            </Card>
          </div>

          {/* Filtro de búsqueda */}
          <div className="flex justify-center mb-8">
            <Input
              placeholder="Buscar por nombre, departamento o municipio..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full max-w-2xl px-4 py-3 rounded-lg border-2 border-white/30 bg-white/90 text-gray-800 text-base"
            />
          </div>

          {/* Lista de Comunidades */}
          {comunidadesFiltradas.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-white text-xl">
                {filtro ? (
                  <>
                    <p className="mb-4">No se encontraron comunidades que coincidan con "{filtro}"</p>
                    <Button 
                      onClick={() => setFiltro('')}
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                    >
                      Limpiar filtro
                    </Button>
                  </>
                ) : (
                  <p>No hay comunidades afrodescendientes registradas en el sistema</p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comunidadesFiltradas.map((comunidad, index) => (
              <Card 
                key={comunidad.id} 
                className="p-6 bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => setComunidadSeleccionada(comunidad)}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getColorPorIndice(index)} flex items-center justify-center mr-4`}>
                    {comunidad.patrimonioUNESCO ? (
                      <Award className="w-8 h-8 text-white" />
                    ) : (
                      <Heart className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {comunidad.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {comunidad.municipio}, {comunidad.departamento}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {comunidad.descripcion}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    {comunidad.poblacion.toLocaleString()} habitantes
                  </Badge>
                  {comunidad.territorioColectivo && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Territorio Colectivo
                    </Badge>
                  )}
                  {comunidad.patrimonioUNESCO && (
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      UNESCO
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setComunidadSeleccionada(comunidad);
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      analizarComunidadConIA(comunidad);
                    }}
                    disabled={cargandoAnalisis}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white disabled:opacity-50"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    {cargandoAnalisis ? 'Analizando...' : 'IA'}
                  </Button>
                </div>
              </Card>
            ))}
            </div>
          )}

          {/* Análisis de IA */}
          {analisisIA && (
            <div className="mt-8 p-8 bg-white rounded-2xl shadow-2xl border-2 border-green-500">
              <div className="flex items-center mb-6">
                <Brain className="w-6 h-6 mr-3 text-green-600" />
                <h2 className="text-2xl font-bold text-green-800">
                  Análisis de IA Especializado
                </h2>
              </div>

              {analisisIA.exito ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Tipo Étnico */}
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                    <h3 className="text-lg font-bold mb-3 text-blue-900">
                      Tipo Étnico Identificado
                    </h3>
                    <p className="font-bold text-gray-800 mb-2">
                      {analisisIA.tipo_etnico.nombre}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Confianza: {(analisisIA.tipo_etnico.confianza * 100).toFixed(1)}%
                    </p>
                  </Card>

                  {/* Derechos Afectados */}
                  <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
                    <h3 className="text-lg font-bold mb-3 text-green-900">
                      Derechos Afectados
                    </h3>
                    {analisisIA.derechos_afectados.slice(0, 3).map((derecho, index) => (
                      <div key={index} className="mb-2">
                        <p className="font-bold text-gray-800 text-sm">
                          {derecho.titulo}
                        </p>
                        <p className="text-gray-600 text-xs">
                          Nivel: {derecho.nivel_afectacion}/5
                        </p>
                      </div>
                    ))}
                  </Card>

                  {/* Consulta Previa */}
                  <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
                    <h3 className="text-lg font-bold mb-3 text-yellow-900">
                      Consulta Previa
                    </h3>
                    <p className="font-bold text-gray-800 mb-2">
                      {analisisIA.consulta_previa.requiere_consulta ? 'Requerida' : 'No requerida'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Urgencia: {analisisIA.consulta_previa.nivel_urgencia}
                    </p>
                  </Card>

                  {/* Impacto Étnico */}
                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                    <h3 className="text-lg font-bold mb-3 text-purple-900">
                      Impacto Étnico
                    </h3>
                    <p className="font-bold text-gray-800 mb-2">
                      Nivel General: {analisisIA.impacto_etnico.nivel_general}/5
                    </p>
                    <div className="text-xs text-gray-600">
                      {analisisIA.impacto_etnico.impactos_especificos.slice(0, 2).map((impacto, index) => (
                        <p key={index}>
                          {impacto.indicador}: {impacto.nivel}/5
                        </p>
                      ))}
                    </div>
                  </Card>

                  {/* Análisis Narrativo */}
                  <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 col-span-full">
                    <h3 className="text-lg font-bold mb-3 text-gray-800">
                      Análisis Integral
                    </h3>
                    <pre className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap font-sans">
                      {analisisIA.analisis_narrativo}
                    </pre>
                  </Card>
                </div>
              ) : (
                <Alert className="bg-red-50 border border-red-200 text-red-700">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Error en el análisis: {analisisIA.error}
                </Alert>
              )}

              <div className="flex justify-center gap-4 mt-6">
                <Button
                  onClick={() => setAnalisisIA(null)}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3"
                >
                  Cerrar Análisis
                </Button>
              </div>
            </div>
          )}

          {/* Modal de Detalles */}
          <Modal
            isOpen={!!comunidadSeleccionada}
            onClose={() => setComunidadSeleccionada(null)}
            title={comunidadSeleccionada?.nombre}
            size="xl"
          >
            {comunidadSeleccionada && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Información General
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <strong>Departamento:</strong> {comunidadSeleccionada.departamento}
                      </p>
                      <p className="text-gray-600">
                        <strong>Municipio:</strong> {comunidadSeleccionada.municipio}
                      </p>
                      <p className="text-gray-600">
                        <strong>Población:</strong> {comunidadSeleccionada.poblacion.toLocaleString()} habitantes
                      </p>
                      <p className="text-gray-600">
                        <strong>Reconocimiento:</strong> {comunidadSeleccionada.reconocimiento}
                      </p>
                      <p className="text-gray-600">
                        <strong>Territorio Colectivo:</strong> {comunidadSeleccionada.territorioColectivo ? 'Sí' : 'No'}
                      </p>
                      <p className="text-gray-600">
                        <strong>Consejo Comunitario:</strong> {comunidadSeleccionada.consejoComunitario}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Descripción
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {comunidadSeleccionada.descripcion}
                    </p>
                    {comunidadSeleccionada.patrimonioUNESCO && (
                      <Badge className="bg-yellow-100 text-yellow-800 text-base px-4 py-2">
                        <Award className="w-4 h-4 mr-2" />
                        Patrimonio Inmaterial UNESCO
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-800">
                      🎭 Características Culturales
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                      {comunidadSeleccionada.caracteristicas.map((caracteristica, index) => (
                        <li key={index} className="text-sm">
                          {caracteristica}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-800">
                      ⚖️ Derechos Reconocidos
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                      {comunidadSeleccionada.derechos.map((derecho, index) => (
                        <li key={index} className="text-sm">
                          {derecho}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-bold mb-4 text-green-800 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Marco Legal
                  </h3>
                  <ul className="list-disc list-inside text-green-900 leading-relaxed space-y-1 text-sm">
                    <li>Ley 70 de 1993 - Comunidades Negras</li>
                    <li>Decreto 1745 de 1995 - Territorios Colectivos</li>
                    <li>Ley 21 de 1991 - Convenio 169 OIT</li>
                    <li>Constitución Política - Art. 7 (Diversidad étnica)</li>
                    <li>Ley 649 de 2001 - Día de la Afrocolombianidad</li>
                  </ul>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ComunidadesAfro;
