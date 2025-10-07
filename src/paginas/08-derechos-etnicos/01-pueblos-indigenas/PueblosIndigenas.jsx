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
  Globe, 
  Eye, 
  BookOpen,
  Shield,
  Brain,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

const PueblosIndigenas = () => {
  const [pueblos, setPueblos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [puebloSeleccionado, setPuebloSeleccionado] = useState(null);
  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargandoAnalisis, setCargandoAnalisis] = useState(false);
  const [estadisticas, setEstadisticas] = useState({
    totalPueblos: 0,
    totalTerritorios: 0,
    totalIdiomas: 0,
    sistemasJusticia: 0
  });

  useEffect(() => {
    cargarPueblosIndigenas();
  }, []);

  const cargarPueblosIndigenas = async () => {
    setLoading(true);
    
    try {
      const response = await etnicoService.obtenerPueblosIndigenas();
      const data = response.success && response.data ? 
        (Array.isArray(response.data) ? response.data : response.data.data || []) : 
        [];
      
      // Mapear datos del backend al formato del frontend
      const pueblosMapeados = data.map(p => {
        const metadata = typeof p.metadata === 'string' ? JSON.parse(p.metadata) : p.metadata || {};
        return {
          id: p.id,
          nombre: p.pueblo || p.nombre,
          territorio: p.departamento,
          idioma: p.idioma || 'No especificado',
          poblacion: p.poblacion || 0,
          resguardo: p.resguardo || 'No especificado',
          sistemaJusticia: metadata.sistema_justicia || false,
          descripcion: metadata.descripcion || '',
          caracteristicas: metadata.caracteristicas || [],
          derechos: metadata.derechos || []
        };
      });
      
      setPueblos(pueblosMapeados);
      
      // Calcular estadísticas
      const stats = {
        totalPueblos: pueblosMapeados.length,
        totalTerritorios: [...new Set(pueblosMapeados.map(p => p.territorio))].length,
        totalIdiomas: [...new Set(pueblosMapeados.map(p => p.idioma))].length,
        sistemasJusticia: pueblosMapeados.filter(p => p.sistemaJusticia).length
      };
      setEstadisticas(stats);
    } catch (error) {
      console.error('Error cargando pueblos indígenas:', error);
      setPueblos([]);
      setEstadisticas({
        totalPueblos: 0,
        totalTerritorios: 0,
        totalIdiomas: 0,
        sistemasJusticia: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const pueblosFiltrados = pueblos.filter(pueblo =>
    pueblo.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    pueblo.territorio.toLowerCase().includes(filtro.toLowerCase()) ||
    pueblo.idioma.toLowerCase().includes(filtro.toLowerCase())
  );

  const analizarPuebloConIA = async (pueblo) => {
    setCargandoAnalisis(true);
    setAnalisisIA(null);
    
    try {
      const datosAnalisis = {
        narracion: `Análisis del pueblo ${pueblo.nombre} en ${pueblo.territorio}. 
        Población: ${pueblo.poblacion} habitantes. 
        Idioma: ${pueblo.idioma}. 
        ${pueblo.sistemaJusticia ? 'Cuenta con sistema de justicia propio.' : ''}
        Descripción: ${pueblo.descripcion}`,
        grupoEtnico: pueblo.nombre,
        ubicacion: pueblo.territorio,
        tipoCaso: 'Análisis Étnico Cultural Indígena',
        archivos: []
      };

      const resultado = await advancedAIService.analizarCasoEtnico(datosAnalisis);
      
      // Convertir resultado al formato esperado por el frontend
      setAnalisisIA({
        exito: true,
        tipo_etnico: {
          nombre: pueblo.nombre,
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
      'from-blue-500 to-indigo-500',
      'from-green-500 to-emerald-500',
      'from-amber-500 to-orange-500',
      'from-red-500 to-pink-500',
      'from-purple-500 to-violet-500',
      'from-cyan-500 to-blue-500',
      'from-lime-500 to-green-500',
      'from-orange-500 to-red-500',
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-purple-500'
    ];
    return colores[indice % colores.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
        <div className="text-center text-white">
          <div className="inline-block animate-spin text-5xl mb-4">
            <Clock />
          </div>
          <p className="text-xl">Cargando pueblos indígenas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 text-white">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg flex items-center justify-center gap-4">
              <Users className="w-12 h-12" />
              Pueblos Indígenas de Colombia
            </h1>
            <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Conoce los pueblos indígenas reconocidos en Colombia y sus características culturales
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{estadisticas.totalPueblos}</div>
              <div className="text-sm opacity-80">Pueblos Indígenas</div>
            </Card>
            
            <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{estadisticas.totalTerritorios}</div>
              <div className="text-sm opacity-80">Territorios</div>
            </Card>
            
            <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <Globe className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{estadisticas.totalIdiomas}</div>
              <div className="text-sm opacity-80">Idiomas</div>
            </Card>
            
            <Card className="p-6 text-center bg-white/10 backdrop-blur-md border border-white/20 text-white">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{estadisticas.sistemasJusticia}</div>
              <div className="text-sm opacity-80">Sistemas de Justicia</div>
            </Card>
          </div>

          {/* Filtro de búsqueda */}
          <div className="flex justify-center mb-8">
            <Input
              placeholder="Buscar por nombre, territorio o idioma..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full max-w-2xl px-4 py-3 rounded-lg border-2 border-white/30 bg-white/90 text-gray-800 text-base"
            />
          </div>

          {/* Lista de Pueblos */}
          {pueblosFiltrados.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-white text-xl">
                {filtro ? (
                  <>
                    <p className="mb-4">No se encontraron pueblos indígenas que coincidan con "{filtro}"</p>
                    <Button 
                      onClick={() => setFiltro('')}
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                    >
                      Limpiar filtro
                    </Button>
                  </>
                ) : (
                  <p>No hay pueblos indígenas registrados en el sistema</p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pueblosFiltrados.map((pueblo, index) => (
              <Card 
                key={pueblo.id} 
                className="p-6 bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => setPuebloSeleccionado(pueblo)}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getColorPorIndice(index)} flex items-center justify-center mr-4`}>
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {pueblo.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {pueblo.territorio} • {pueblo.idioma}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {pueblo.descripcion}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    {pueblo.poblacion.toLocaleString()} habitantes
                  </Badge>
                  {pueblo.sistemaJusticia && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Justicia Propia
                    </Badge>
                  )}
                </div>
                
                <div className="text-xs text-gray-600 mb-4">
                  {pueblo.resguardo}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPuebloSeleccionado(pueblo);
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      analizarPuebloConIA(pueblo);
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
            isOpen={!!puebloSeleccionado}
            onClose={() => setPuebloSeleccionado(null)}
            title={puebloSeleccionado?.nombre}
            size="xl"
          >
            {puebloSeleccionado && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Información General
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <strong>Territorio:</strong> {puebloSeleccionado.territorio}
                      </p>
                      <p className="text-gray-600">
                        <strong>Idioma:</strong> {puebloSeleccionado.idioma}
                      </p>
                      <p className="text-gray-600">
                        <strong>Población:</strong> {puebloSeleccionado.poblacion.toLocaleString()} habitantes
                      </p>
                      <p className="text-gray-600">
                        <strong>Resguardo:</strong> {puebloSeleccionado.resguardo}
                      </p>
                      <p className="text-gray-600">
                        <strong>Sistema de Justicia:</strong> {puebloSeleccionado.sistemaJusticia ? 'Sí' : 'No'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Descripción
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {puebloSeleccionado.descripcion}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-gray-800">
                      🎭 Características Culturales
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                      {puebloSeleccionado.caracteristicas.map((caracteristica, index) => (
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
                      {puebloSeleccionado.derechos.map((derecho, index) => (
                        <li key={index} className="text-sm">
                          {derecho}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PueblosIndigenas;
