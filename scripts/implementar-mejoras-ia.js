/**
 * SCRIPT DE IMPLEMENTACIÓN DE MEJORAS DE IA
 * Automatiza la aplicación de mejoras en páginas del sistema CSDT
 */

const fs = require('fs');
const path = require('path');

class ImplementadorMejorasIA {
  constructor() {
    this.rutaPaginas = './src/paginas';
    this.serviciosIA = [
      'EtnoIAService',
      'AdminIAService', 
      'JudicialIAService',
      'RecomendacionesService'
    ];
    this.plantillasPDF = [
      'territorio_ancestral',
      'consulta_previa_etnica',
      'derechos_etnicos',
      'patrimonio_cultural',
      'planes_etnodesarrollo',
      'mediacion_intercultural',
      'narraciones_etnicas'
    ];
  }

  /**
   * Implementar mejoras en página étnica
   */
  implementarPaginaEtnica(rutaArchivo, tipoPagina) {
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    
    // Verificar si ya tiene mejoras implementadas
    if (contenido.includes('EtnoIAService') || contenido.includes('handleAnalisisIA')) {
      console.log(`✅ ${rutaArchivo} ya tiene mejoras implementadas`);
      return;
    }

    const mejoras = this.generarMejorasEtnica(tipoPagina);
    const nuevoContenido = this.aplicarMejoras(contenido, mejoras);
    
    // Crear backup
    fs.writeFileSync(`${rutaArchivo}.backup`, contenido);
    
    // Aplicar mejoras
    fs.writeFileSync(rutaArchivo, nuevoContenido);
    
    console.log(`✅ Mejoras aplicadas a ${rutaArchivo}`);
  }

  /**
   * Implementar mejoras en página administrativa
   */
  implementarPaginaAdministrativa(rutaArchivo, tipoPagina) {
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    
    if (contenido.includes('AdminIAService') || contenido.includes('handleAnalisisIA')) {
      console.log(`✅ ${rutaArchivo} ya tiene mejoras implementadas`);
      return;
    }

    const mejoras = this.generarMejorasAdministrativa(tipoPagina);
    const nuevoContenido = this.aplicarMejoras(contenido, mejoras);
    
    fs.writeFileSync(`${rutaArchivo}.backup`, contenido);
    fs.writeFileSync(rutaArchivo, nuevoContenido);
    
    console.log(`✅ Mejoras aplicadas a ${rutaArchivo}`);
  }

  /**
   * Implementar mejoras en página judicial
   */
  implementarPaginaJudicial(rutaArchivo, tipoPagina) {
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    
    if (contenido.includes('JudicialIAService') || contenido.includes('handleAnalisisIA')) {
      console.log(`✅ ${rutaArchivo} ya tiene mejoras implementadas`);
      return;
    }

    const mejoras = this.generarMejorasJudicial(tipoPagina);
    const nuevoContenido = this.aplicarMejoras(contenido, mejoras);
    
    fs.writeFileSync(`${rutaArchivo}.backup`, contenido);
    fs.writeFileSync(rutaArchivo, nuevoContenido);
    
    console.log(`✅ Mejoras aplicadas a ${rutaArchivo}`);
  }

  /**
   * Generar mejoras para página étnica
   */
  generarMejorasEtnica(tipoPagina) {
    return {
      imports: `
import EtnoIAService from '@services/EtnoIAService';
import PDFMejoradoService from '@services/PDFMejoradoService';
import RecomendacionesService from '@services/RecomendacionesService';
import toast from 'react-hot-toast';
`,
      estados: `
  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargandoIA, setCargandoIA] = useState(false);
  const [recomendaciones, setRecomendaciones] = useState(null);
`,
      funciones: `
  const handleAnalisisIA = async () => {
    if (!datosBasicosCompletos()) {
      toast.error('Complete los campos básicos antes del análisis');
      return;
    }

    setCargandoIA(true);
    try {
      const datos = prepararDatosParaIA();
      const analisis = await EtnoIAService.analizarCasoEtnico(datos);
      setAnalisisIA(analisis);

      const recs = await RecomendacionesService.generarRecomendaciones({
        tipo_caso: '${tipoPagina}',
        categoria: 'etnico',
        pagina_actual: '${tipoPagina}',
        analisis_ia: analisis
      });
      setRecomendaciones(recs);

      toast.success('Análisis con IA completado');
    } catch (error) {
      console.error('Error en análisis IA:', error);
      toast.error('Error en el análisis con IA');
    } finally {
      setCargandoIA(false);
    }
  };

  const handleGenerarPDF = async () => {
    if (!analisisIA) {
      toast.error('Realice el análisis con IA primero');
      return;
    }

    try {
      const datosPDF = {
        titulo: 'Análisis de ${tipoPagina}',
        datos: datosFormulario,
        analisis: analisisIA,
        recomendaciones: recomendaciones,
        fecha: new Date().toLocaleString('es-CO')
      };

      const pdf = await PDFMejoradoService.generarPDFMejorado(datosPDF, {
        plantilla: '${tipoPagina}',
        estilo: 'oficial'
      });

      descargarPDF(pdf, '${tipoPagina}_${Date.now()}.pdf');
      toast.success('PDF generado exitosamente');
    } catch (error) {
      console.error('Error generando PDF:', error);
      toast.error('Error generando PDF');
    }
  };

  const handleLimpiar = () => {
    limpiarFormulario();
    setAnalisisIA(null);
    setRecomendaciones(null);
    toast.success('Formulario limpiado');
  };
`,
      botones: `
                  <Button type="button" onClick={handleAnalisisIA} disabled={cargandoIA}>
                    <Brain className="w-4 h-4 mr-2" />
                    {cargandoIA ? 'Analizando...' : 'Análisis con IA'}
                  </Button>
                  <Button type="button" onClick={handleGenerarPDF} disabled={!analisisIA}>
                    <Download className="w-4 h-4 mr-2" />
                    Generar PDF
                  </Button>
                  <Button type="button" onClick={handleLimpiar} variant="outline">
                    Limpiar
                  </Button>
`,
      pestañas: `
        <Tabs defaultValue="formulario" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="formulario">Formulario</TabsTrigger>
            <TabsTrigger value="analisis">Análisis IA</TabsTrigger>
            <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
            <TabsTrigger value="datos">Datos</TabsTrigger>
          </TabsList>

          <TabsContent value="formulario">
            {/* Contenido del formulario existente */}
          </TabsContent>

          <TabsContent value="analisis">
            <Card>
              <CardHeader>
                <CardTitle>Análisis con Inteligencia Artificial</CardTitle>
              </CardHeader>
              <CardContent>
                {analisisIA ? (
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Análisis completado exitosamente
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Tipo Étnico Identificado</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p><strong>Nombre:</strong> {analisisIA.tipo_etnico.nombre}</p>
                          <p><strong>Tipo:</strong> {analisisIA.tipo_etnico.tipo}</p>
                          <p><strong>Confianza:</strong> {(analisisIA.tipo_etnico.confianza * 100).toFixed(1)}%</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Consulta Previa</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p><strong>Requiere:</strong> {analisisIA.consulta_previa.requiere_consulta ? 'Sí' : 'No'}</p>
                          <p><strong>Urgencia:</strong> {analisisIA.consulta_previa.nivel_urgencia}</p>
                          <p><strong>Justificación:</strong> {analisisIA.consulta_previa.justificacion.join(', ')}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Análisis Narrativo</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
                          {analisisIA.analisis_narrativo}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Realice el análisis con IA desde el formulario para ver los resultados aquí.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recomendaciones">
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones Inteligentes</CardTitle>
              </CardHeader>
              <CardContent>
                {recomendaciones ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Páginas Recomendadas</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {recomendaciones.paginas_recomendadas.slice(0, 3).map((pagina, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded mb-2">
                              <div>
                                <p className="font-medium">{pagina.nombre}</p>
                                <p className="text-sm text-gray-600">{pagina.razon}</p>
                              </div>
                              <Badge variant="secondary">
                                {Math.round(pagina.relevancia * 100)}%
                              </Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Procesos Sugeridos</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {recomendaciones.procesos_recomendados.slice(0, 3).map((proceso, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded mb-2">
                              <div>
                                <p className="font-medium">{proceso.nombre}</p>
                                <p className="text-sm text-gray-600">{proceso.descripcion}</p>
                              </div>
                              <Badge variant="secondary">
                                {Math.round(proceso.relevancia * 100)}%
                              </Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>

                    {recomendaciones.alertas.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Alertas</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {recomendaciones.alertas.map((alerta, index) => (
                            <Alert key={index} variant={alerta.tipo === 'urgente' ? 'destructive' : 'default'}>
                              <AlertTriangle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>{alerta.mensaje}</strong><br />
                                {alerta.accion}
                              </AlertDescription>
                            </Alert>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Realice el análisis con IA para ver las recomendaciones personalizadas.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="datos">
            {/* Contenido de datos existente */}
          </TabsContent>
        </Tabs>
`
    };
  }

  /**
   * Generar mejoras para página administrativa
   */
  generarMejorasAdministrativa(tipoPagina) {
    return {
      imports: `
import AdminIAService from '@services/AdminIAService';
import PDFMejoradoService from '@services/PDFMejoradoService';
import RecomendacionesService from '@services/RecomendacionesService';
import toast from 'react-hot-toast';
`,
      estados: `
  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargandoIA, setCargandoIA] = useState(false);
  const [recomendaciones, setRecomendaciones] = useState(null);
`,
      funciones: `
  const handleAnalisisIA = async () => {
    if (!datosBasicosCompletos()) {
      toast.error('Complete los campos básicos antes del análisis');
      return;
    }

    setCargandoIA(true);
    try {
      const datos = prepararDatosParaIA();
      const analisis = await AdminIAService.analizarViaAdministrativa(datos);
      setAnalisisIA(analisis);

      const recs = await RecomendacionesService.generarRecomendaciones({
        tipo_caso: '${tipoPagina}',
        categoria: 'administrativo',
        pagina_actual: '${tipoPagina}',
        analisis_ia: analisis
      });
      setRecomendaciones(recs);

      toast.success('Análisis con IA completado');
    } catch (error) {
      console.error('Error en análisis IA:', error);
      toast.error('Error en el análisis con IA');
    } finally {
      setCargandoIA(false);
    }
  };

  const handleGenerarPDF = async () => {
    if (!analisisIA) {
      toast.error('Realice el análisis con IA primero');
      return;
    }

    try {
      const datosPDF = {
        titulo: 'Análisis de ${tipoPagina}',
        datos: datosFormulario,
        analisis: analisisIA,
        recomendaciones: recomendaciones,
        fecha: new Date().toLocaleString('es-CO')
      };

      const pdf = await PDFMejoradoService.generarPDFMejorado(datosPDF, {
        plantilla: '${tipoPagina}',
        estilo: 'oficial'
      });

      descargarPDF(pdf, '${tipoPagina}_${Date.now()}.pdf');
      toast.success('PDF generado exitosamente');
    } catch (error) {
      console.error('Error generando PDF:', error);
      toast.error('Error generando PDF');
    }
  };

  const handleLimpiar = () => {
    limpiarFormulario();
    setAnalisisIA(null);
    setRecomendaciones(null);
    toast.success('Formulario limpiado');
  };
`,
      botones: `
                  <Button type="button" onClick={handleAnalisisIA} disabled={cargandoIA}>
                    <Brain className="w-4 h-4 mr-2" />
                    {cargandoIA ? 'Analizando...' : 'Análisis con IA'}
                  </Button>
                  <Button type="button" onClick={handleGenerarPDF} disabled={!analisisIA}>
                    <Download className="w-4 h-4 mr-2" />
                    Generar PDF
                  </Button>
                  <Button type="button" onClick={handleLimpiar} variant="outline">
                    Limpiar
                  </Button>
`
    };
  }

  /**
   * Generar mejoras para página judicial
   */
  generarMejorasJudicial(tipoPagina) {
    return {
      imports: `
import JudicialIAService from '@services/JudicialIAService';
import PDFMejoradoService from '@services/PDFMejoradoService';
import RecomendacionesService from '@services/RecomendacionesService';
import toast from 'react-hot-toast';
`,
      estados: `
  const [analisisIA, setAnalisisIA] = useState(null);
  const [cargandoIA, setCargandoIA] = useState(false);
  const [recomendaciones, setRecomendaciones] = useState(null);
`,
      funciones: `
  const handleAnalisisIA = async () => {
    if (!datosBasicosCompletos()) {
      toast.error('Complete los campos básicos antes del análisis');
      return;
    }

    setCargandoIA(true);
    try {
      const datos = prepararDatosParaIA();
      const analisis = await JudicialIAService.analizarAccionJudicial(datos);
      setAnalisisIA(analisis);

      const recs = await RecomendacionesService.generarRecomendaciones({
        tipo_caso: '${tipoPagina}',
        categoria: 'judicial',
        pagina_actual: '${tipoPagina}',
        analisis_ia: analisis
      });
      setRecomendaciones(recs);

      toast.success('Análisis con IA completado');
    } catch (error) {
      console.error('Error en análisis IA:', error);
      toast.error('Error en el análisis con IA');
    } finally {
      setCargandoIA(false);
    }
  };

  const handleGenerarPDF = async () => {
    if (!analisisIA) {
      toast.error('Realice el análisis con IA primero');
      return;
    }

    try {
      const datosPDF = {
        titulo: 'Análisis de ${tipoPagina}',
        datos: datosFormulario,
        analisis: analisisIA,
        recomendaciones: recomendaciones,
        fecha: new Date().toLocaleString('es-CO')
      };

      const pdf = await PDFMejoradoService.generarPDFMejorado(datosPDF, {
        plantilla: '${tipoPagina}',
        estilo: 'oficial'
      });

      descargarPDF(pdf, '${tipoPagina}_${Date.now()}.pdf');
      toast.success('PDF generado exitosamente');
    } catch (error) {
      console.error('Error generando PDF:', error);
      toast.error('Error generando PDF');
    }
  };

  const handleLimpiar = () => {
    limpiarFormulario();
    setAnalisisIA(null);
    setRecomendaciones(null);
    toast.success('Formulario limpiado');
  };
`,
      botones: `
                  <Button type="button" onClick={handleAnalisisIA} disabled={cargandoIA}>
                    <Brain className="w-4 h-4 mr-2" />
                    {cargandoIA ? 'Analizando...' : 'Análisis con IA'}
                  </Button>
                  <Button type="button" onClick={handleGenerarPDF} disabled={!analisisIA}>
                    <Download className="w-4 h-4 mr-2" />
                    Generar PDF
                  </Button>
                  <Button type="button" onClick={handleLimpiar} variant="outline">
                    Limpiar
                  </Button>
`
    };
  }

  /**
   * Aplicar mejoras al contenido del archivo
   */
  aplicarMejoras(contenido, mejoras) {
    let nuevoContenido = contenido;

    // Agregar imports
    if (mejoras.imports) {
      nuevoContenido = nuevoContenido.replace(
        /import React from 'react';/,
        `import React from 'react';${mejoras.imports}`
      );
    }

    // Agregar estados
    if (mejoras.estados) {
      nuevoContenido = nuevoContenido.replace(
        /const \[.*?\] = useState\(/,
        `${mejoras.estados}\n  const [`
      );
    }

    // Agregar funciones
    if (mejoras.funciones) {
      nuevoContenido = nuevoContenido.replace(
        /const [A-Za-z]+ = \(\) => {/,
        `const [A-Za-z]+ = () => {${mejoras.funciones}`
      );
    }

    // Agregar botones
    if (mejoras.botones) {
      nuevoContenido = nuevoContenido.replace(
        /<Button[^>]*>.*?<\/Button>/,
        `$&${mejoras.botones}`
      );
    }

    // Agregar pestañas
    if (mejoras.pestañas) {
      nuevoContenido = nuevoContenido.replace(
        /<div[^>]*>.*?<\/div>/s,
        `${mejoras.pestañas}`
      );
    }

    return nuevoContenido;
  }

  /**
   * Ejecutar implementación completa
   */
  ejecutar() {
    console.log('🚀 Iniciando implementación de mejoras de IA...\n');

    // Páginas étnicas
    const paginasEtnicas = [
      { ruta: './src/paginas/03-derechos-etnicos-culturales/01-derechos-etnicos/DerechosEtnicos.jsx', tipo: 'derechos_etnicos' },
      { ruta: './src/paginas/03-derechos-etnicos-culturales/03-consulta-previa-etnica/ConsultaPreviaEtnica.jsx', tipo: 'consulta_previa_etnica' },
      { ruta: './src/paginas/03-derechos-etnicos-culturales/03-patrimonio-cultural/PatrimonioCultural.jsx', tipo: 'patrimonio_cultural' },
      { ruta: './src/paginas/03-derechos-etnicos-culturales/05-planes-etnodesarrollo/PlanesEtnodesarrollo.jsx', tipo: 'planes_etnodesarrollo' },
      { ruta: './src/paginas/03-derechos-etnicos-culturales/08-mediacion-intercultural/MediacionIntercultural.jsx', tipo: 'mediacion_intercultural' },
      { ruta: './src/paginas/03-derechos-etnicos-culturales/07-narraciones-etnicas/NarracionesEtnicas.jsx', tipo: 'narraciones_etnicas' }
    ];

    // Páginas administrativas
    const paginasAdministrativas = [
      { ruta: './src/paginas/05-participacion-ciudadana-democracia/05-pqrsfd/PQRSFD.jsx', tipo: 'pqrsfd' },
      { ruta: './src/paginas/04-sistemas-juridicos-legales/02-vias-administrativas/ViasAdministrativas.jsx', tipo: 'vias_administrativas' },
      { ruta: './src/paginas/06-control-territorial-recursos/01-control-institucional/ControlInstitucional.jsx', tipo: 'control_institucional' }
    ];

    // Páginas judiciales
    const paginasJudiciales = [
      { ruta: './src/paginas/02-core-fundamentos/02-acciones-constitucionales/AccionTutela.jsx', tipo: 'accion_tutela' },
      { ruta: './src/paginas/02-core-fundamentos/02-acciones-constitucionales/AccionPopular.jsx', tipo: 'accion_popular' },
      { ruta: './src/paginas/02-core-fundamentos/02-acciones-constitucionales/AccionCumplimiento.jsx', tipo: 'accion_cumplimiento' },
      { ruta: './src/paginas/02-core-fundamentos/02-acciones-constitucionales/DemandaJuridica.jsx', tipo: 'demanda_juridica' }
    ];

    console.log('📋 Implementando mejoras en páginas étnicas...');
    paginasEtnicas.forEach(pagina => {
      if (fs.existsSync(pagina.ruta)) {
        this.implementarPaginaEtnica(pagina.ruta, pagina.tipo);
      } else {
        console.log(`⚠️  Archivo no encontrado: ${pagina.ruta}`);
      }
    });

    console.log('\n📋 Implementando mejoras en páginas administrativas...');
    paginasAdministrativas.forEach(pagina => {
      if (fs.existsSync(pagina.ruta)) {
        this.implementarPaginaAdministrativa(pagina.ruta, pagina.tipo);
      } else {
        console.log(`⚠️  Archivo no encontrado: ${pagina.ruta}`);
      }
    });

    console.log('\n📋 Implementando mejoras en páginas judiciales...');
    paginasJudiciales.forEach(pagina => {
      if (fs.existsSync(pagina.ruta)) {
        this.implementarPaginaJudicial(pagina.ruta, pagina.tipo);
      } else {
        console.log(`⚠️  Archivo no encontrado: ${pagina.ruta}`);
      }
    });

    console.log('\n✅ Implementación completada!');
    console.log('\n📝 Próximos pasos:');
    console.log('1. Revisar archivos modificados');
    console.log('2. Probar funcionalidades de IA');
    console.log('3. Ajustar plantillas PDF');
    console.log('4. Realizar pruebas exhaustivas');
  }
}

// Ejecutar implementación
const implementador = new ImplementadorMejorasIA();
implementador.ejecutar();
