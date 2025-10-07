import { useState } from 'react';
import { Scale, BookOpen, FileText, Globe, Landmark, Gavel, Search, Download, Eye, Filter, Brain, CheckCircle } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import toast from 'react-hot-toast';

const MarcoJuridicoEtnico = () => {
  const [tabActivo, setTabActivo] = useState('dashboard');
  const [nivelSeleccionado, setNivelSeleccionado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const [estadisticas, setEstadisticas] = useState({
    normasInternacionales: 25,
    normasNacionales: 145,
    sentenciasCC: 89,
    tratadosInternacionales: 12,
    efectividad: 92.3
  });

  const nivelesNormativos = [
    {
      id: 'internacional',
      nombre: 'Internacional',
      des: 'Tratados y convenios internacionales',
      icono: Globe,
      color: 'blue',
      normas: [
        {
          nombre: 'Convenio 169 OIT',
          año: 1989,
          alcance: 'Global',
          estado: 'Vigente',
          articulos: ['6', '7', '13-19', '25-31']
        },
        {
          nombre: 'Declaración ONU Derechos Pueblos Indígenas',
          año: 2007,
          alcance: 'Global',
          estado: 'Vigente',
          articulos: ['Todos']
        },
        {
          nombre: 'Convención Americana Derechos Humanos',
          año: 1969,
          alcance: 'Regional',
          estado: 'Vigente',
          articulos: ['21', '23', '26']
        }
      ]
    },
    {
      id: 'constitucional',
      nombre: 'Constitucional',
      des: 'Artículos de la Constitución Política',
      icono: Landmark,
      color: 'purple',
      normas: [
        {
          nombre: 'Artículo 7',
          descripcion: 'Diversidad étnica y cultural',
          texto: 'El Estado reconoce y protege la diversidad étnica y cultural de la Nación colombiana'
        },
        {
          nombre: 'Artículo 8',
          descripcion: 'Riquezas culturales',
          texto: 'Es obligación del Estado proteger las riquezas culturales de la Nación'
        },
        {
          nombre: 'Artículo 63',
          descripcion: 'Territorios colectivos inalienables',
          texto: 'Las tierras comunales son inalienables, imprescriptibles e inembargables'
        },
        {
          nombre: 'Artículo 246',
          descripcion: 'Jurisdicción especial indígena',
          texto: 'Las autoridades de los pueblos indígenas ejercerán funciones jurisdiccionales'
        },
        {
          nombre: 'Artículo 330',
          descripcion: 'Territorios indígenas',
          texto: 'Conformación de entidades territoriales indígenas'
        }
      ]
    },
    {
      id: 'legal',
      nombre: 'Legal',
      des: 'Leyes nacionales',
      icono: BookOpen,
      color: 'green',
      normas: [
        {
          nombre: 'Ley 21 de 1991',
          objeto: 'Aprueba Convenio 169 OIT',
          estado: 'Vigente',
          importancia: 'Alta'
        },
        {
          nombre: 'Ley 70 de 1993',
          objeto: 'Comunidades Negras',
          estado: 'Vigente',
          importancia: 'Alta'
        },
        {
          nombre: 'Ley 1381 de 2010',
          objeto: 'Lenguas Nativas',
          estado: 'Vigente',
          importancia: 'Media'
        }
      ]
    },
    {
      id: 'reglamentario',
      nombre: 'Reglamentario',
      des: 'Decretos y resoluciones',
      icono: FileText,
      color: 'orange',
      normas: [
        {
          nombre: 'Decreto 2164 de 1995',
          objeto: 'Titulación de tierras',
          estado: 'Vigente'
        },
        {
          nombre: 'Decreto 1320 de 1998',
          objeto: 'Consulta previa',
          estado: 'Vigente'
        },
        {
          nombre: 'Decreto 1953 de 2014',
          objeto: 'Sistema propio de salud indígena',
          estado: 'Vigente'
        }
      ]
    },
    {
      id: 'jurisprudencial',
      nombre: 'Jurisprudencial',
      des: 'Sentencias de la Corte Constitucional',
      icono: Gavel,
      color: 'indigo',
      normas: [
        {
          nombre: 'T-025 de 2004',
          tema: 'Desplazamiento forzado',
          aporte: 'Estado de cosas inconstitucional'
        },
        {
          nombre: 'C-030 de 2008',
          tema: 'Consulta previa legislativa',
          aporte: 'Obligatoriedad consulta previa en leyes'
        },
        {
          nombre: 'T-376 de 2012',
          tema: 'Consentimiento libre, previo e informado',
          aporte: 'Estándar de consentimiento en consulta'
        },
        {
          nombre: 'SU-123 de 2018',
          tema: 'Jurisdicción especial indígena',
          aporte: 'Alcance y límites de la JEI'
        }
      ]
    }
  ];

  const relacionesNormativas = [
    {
      normaBase: 'Convenio 169 OIT',
      relacionadas: ['Ley 21/1991', 'Decreto 1320/1998', 'Sentencia C-030/2008'],
      tipo: 'Implementación'
    },
    {
      normaBase: 'Artículo 330 CP',
      relacionadas: ['Ley 1454/2011', 'Decreto 632/2018'],
      tipo: 'Desarrollo'
    },
    {
      normaBase: 'Ley 70/1993',
      relacionadas: ['Decreto 1745/1995', 'Decreto 3770/2008'],
      tipo: 'Reglamentación'
    }
  ];

  const accionesRapidas = [
    {
      tit: 'Buscar Norma',
      des: 'Búsqueda avanzada',
      icono: Search,
      accion: () => {
        setTabActivo('busqueda');
        toast.success('Activando búsqueda...');
      },
      color: 'blue'
    },
    {
      tit: 'Consulta Jurídica IA',
      des: 'Análisis con IA',
      icono: Brain,
      accion: () => {
        toast.success('Iniciando consulta jurídica...');
      },
      color: 'purple'
    },
    {
      tit: 'Árbol Normativo',
      des: 'Ver relaciones',
      icono: FileText,
      accion: () => {
        setTabActivo('relaciones');
        toast.success('Cargando árbol normativo...');
      },
      color: 'green'
    },
    {
      tit: 'Descargar Compendio',
      des: 'Marco completo',
      icono: Download,
      accion: () => {
        toast.success('Generando compendio normativo...');
      },
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Marco Jurídico Étnico
                </h1>
                <p className="text-gray-600 mt-1">
                  Base de Conocimiento Jurídico Especializado en Derechos Étnicos
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Normativa internacional, constitucional, legal y jurisprudencial
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-full">
                <Gavel className="w-5 h-5 text-blue-700 mr-2" />
                <span className="text-sm font-semibold text-blue-700">MARCO JURÍDICO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{estadisticas.normasInternacionales}</div>
            <div className="text-sm text-gray-600">Normas Internacionales</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">{estadisticas.normasNacionales}</div>
            <div className="text-sm text-gray-600">Normas Nacionales</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{estadisticas.sentenciasCC}</div>
            <div className="text-sm text-gray-600">Sentencias CC</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">{estadisticas.tratadosInternacionales}</div>
            <div className="text-sm text-gray-600">Tratados</div>
          </Card>
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{estadisticas.efectividad}%</div>
            <div className="text-sm text-gray-600">Actualización</div>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {accionesRapidas.map((accion, index) => (
              <Card 
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={accion.accion}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${accion.color}-100 text-${accion.color}-600 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <accion.icono className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{accion.tit}</h3>
                <p className="text-sm text-gray-600">{accion.des}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={tabActivo} onValueChange={setTabActivo} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="niveles">Niveles Normativos</TabsTrigger>
            <TabsTrigger value="busqueda">Búsqueda</TabsTrigger>
            <TabsTrigger value="relaciones">Relaciones</TabsTrigger>
            <TabsTrigger value="jurisprudencia">Jurisprudencia</TabsTrigger>
          </TabsList>

          {/* Tab: Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nivelesNormativos.map((nivel) => (
                <Card key={nivel.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-${nivel.color}-100 rounded-xl flex items-center justify-center`}>
                      <nivel.icono className={`w-6 h-6 text-${nivel.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{nivel.nombre}</h3>
                      <p className="text-sm text-gray-600">{nivel.normas.length} normas</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{nivel.des}</p>
                  <Button 
                    size="sm" 
                    className={`w-full bg-${nivel.color}-500 hover:bg-${nivel.color}-600`}
                    onClick={() => {
                      setNivelSeleccionado(nivel.id);
                      setTabActivo('niveles');
                    }}
                  >
                    Ver Normativa
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Niveles Normativos */}
          <TabsContent value="niveles">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Seleccionar Nivel</label>
              <select
                value={nivelSeleccionado}
                onChange={(e) => setNivelSeleccionado(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="todos">Todos los Niveles</option>
                {nivelesNormativos.map((nivel) => (
                  <option key={nivel.id} value={nivel.id}>{nivel.nombre}</option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              {nivelesNormativos
                .filter(n => nivelSeleccionado === 'todos' || n.id === nivelSeleccionado)
                .map((nivel) => (
                  <Card key={nivel.id} className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-14 h-14 bg-${nivel.color}-100 rounded-2xl flex items-center justify-center`}>
                        <nivel.icono className={`w-7 h-7 text-${nivel.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{nivel.nombre}</h3>
                        <p className="text-gray-600">{nivel.des}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {nivel.normas.map((norma, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-gray-900">{norma.nombre}</h4>
                            {norma.estado && (
                              <Badge className="bg-green-100 text-green-800">{norma.estado}</Badge>
                            )}
                          </div>
                          {norma.descripcion && (
                            <p className="text-sm text-gray-600 mb-2">{norma.descripcion}</p>
                          )}
                          {norma.texto && (
                            <p className="text-sm text-gray-700 italic">{norma.texto}</p>
                          )}
                          {norma.objeto && (
                            <p className="text-sm text-gray-700">Objeto: {norma.objeto}</p>
                          )}
                          {norma.tema && (
                            <p className="text-sm text-gray-700">Tema: {norma.tema}</p>
                          )}
                          <div className="flex space-x-2 mt-3">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Completa
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Descargar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Tab: Búsqueda */}
          <TabsContent value="busqueda">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Search className="w-7 h-7 mr-3 text-blue-500" />
                Búsqueda Avanzada de Normativa
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Buscar en normativa étnica
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="Ej: consulta previa, territorios ancestrales, jurisdicción especial..."
                    />
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      <Search className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nivel Normativo</label>
                    <select className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                      <option>Todos</option>
                      <option>Internacional</option>
                      <option>Constitucional</option>
                      <option>Legal</option>
                      <option>Reglamentario</option>
                      <option>Jurisprudencial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tema</label>
                    <select className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                      <option>Todos</option>
                      <option>Territorios</option>
                      <option>Consulta Previa</option>
                      <option>Autonomía</option>
                      <option>Participación</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                    <select className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none">
                      <option>Todos</option>
                      <option>Vigente</option>
                      <option>Derogado</option>
                      <option>Modificado</option>
                    </select>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg text-center">
                  <p className="text-gray-600">Ingresa un término de búsqueda para encontrar normativa específica</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Relaciones */}
          <TabsContent value="relaciones">
            <div className="space-y-6">
              {relacionesNormativas.map((relacion, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{relacion.normaBase}</h3>
                      <Badge className="bg-blue-100 text-blue-800">{relacion.tipo}</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Normas Relacionadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {relacion.relacionadas.map((norma, i) => (
                        <Badge key={i} variant="outline" className="text-gray-700">
                          {norma}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Jurisprudencia */}
          <TabsContent value="jurisprudencia">
            <div className="space-y-6">
              {nivelesNormativos
                .find(n => n.id === 'jurisprudencial')
                ?.normas.map((sentencia, idx) => (
                  <Card key={idx} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{sentencia.nombre}</h3>
                        <Badge className="bg-indigo-100 text-indigo-800">{sentencia.tema}</Badge>
                      </div>
                      <Gavel className="w-6 h-6 text-indigo-600" />
                    </div>
                    <p className="text-gray-700 mb-4">
                      <strong>Aporte Jurisprudencial:</strong> {sentencia.aporte}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Sentencia
                      </Button>
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Base de Conocimiento Jurídico Completa
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Accede al marco jurídico completo de derechos étnicos actualizado permanentemente.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Scale className="mr-2 h-5 w-5" />
                Consultar Normativa
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Download className="mr-2 h-5 w-5" />
                Descargar Compendio
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarcoJuridicoEtnico;

