/**
 * SCRIPT PARA APLICAR MEJORAS DE IA A PÁGINAS EXISTENTES
 * Aplica automáticamente las mejoras de IA a las páginas del sistema CSDT
 */

const fs = require('fs');
const path = require('path');

class AplicadorMejorasPaginas {
  constructor() {
    this.rutaPaginas = './src/paginas';
    this.rutaServicios = './src/services';
    this.rutaHooks = './src/hooks';
    this.rutaComponentes = './src/components';
  }

  /**
   * Aplicar mejoras a una página específica
   */
  aplicarMejorasPagina(rutaArchivo, tipoPagina) {
    console.log(`🔄 Aplicando mejoras a: ${rutaArchivo}`);
    
    if (!fs.existsSync(rutaArchivo)) {
      console.log(`❌ Archivo no encontrado: ${rutaArchivo}`);
      return false;
    }

    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    
    // Verificar si ya tiene mejoras
    if (contenido.includes('useAnalisisIA') || contenido.includes('AnalisisIACard')) {
      console.log(`✅ ${rutaArchivo} ya tiene mejoras aplicadas`);
      return true;
    }

    try {
      // Crear backup
      fs.writeFileSync(`${rutaArchivo}.backup`, contenido);
      
      // Aplicar mejoras
      const nuevoContenido = this.transformarContenido(contenido, tipoPagina);
      fs.writeFileSync(rutaArchivo, nuevoContenido);
      
      console.log(`✅ Mejoras aplicadas exitosamente a ${rutaArchivo}`);
      return true;
    } catch (error) {
      console.error(`❌ Error aplicando mejoras a ${rutaArchivo}:`, error.message);
      return false;
    }
  }

  /**
   * Transformar contenido de la página
   */
  transformarContenido(contenido, tipoPagina) {
    let nuevoContenido = contenido;

    // 1. Agregar imports necesarios
    nuevoContenido = this.agregarImports(nuevoContenido);
    
    // 2. Agregar hook de IA
    nuevoContenido = this.agregarHookIA(nuevoContenido);
    
    // 3. Agregar funciones de IA
    nuevoContenido = this.agregarFuncionesIA(nuevoContenido, tipoPagina);
    
    // 4. Agregar botones de IA
    nuevoContenido = this.agregarBotonesIA(nuevoContenido);
    
    // 5. Agregar pestañas de análisis
    nuevoContenido = this.agregarPestanasAnalisis(nuevoContenido, tipoPagina);
    
    return nuevoContenido;
  }

  /**
   * Agregar imports necesarios
   */
  agregarImports(contenido) {
    const importsIA = `
import useAnalisisIA from '@hooks/useAnalisisIA';
import AnalisisIACard from '@components/ia/AnalisisIACard';
import PDFMejoradoService from '@services/PDFMejoradoService';
import { Brain, Download, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
`;

    // Buscar la línea de import de React y agregar después
    const regexImportReact = /import React[^;]+;/;
    if (regexImportReact.test(contenido)) {
      return contenido.replace(regexImportReact, (match) => `${match}\n${importsIA}`);
    }
    
    // Si no encuentra import de React, agregar al inicio
    return `${importsIA}\n${contenido}`;
  }

  /**
   * Agregar hook de IA
   */
  agregarHookIA(contenido) {
    const hookIA = `
  const {
    analisis,
    cargando,
    error,
    ejecutarAnalisis,
    limpiarAnalisis,
    obtenerRecomendaciones
  } = useAnalisisIA();
`;

    // Buscar la función del componente y agregar después de los estados
    const regexFuncion = /const [A-Za-z]+ = \(\) => \{/;
    if (regexFuncion.test(contenido)) {
      return contenido.replace(regexFuncion, (match) => `${match}\n${hookIA}`);
    }
    
    return contenido;
  }

  /**
   * Agregar funciones de IA
   */
  agregarFuncionesIA(contenido, tipoPagina) {
    const funcionesIA = `
  const handleAnalisisIA = async () => {
    if (!datosBasicosCompletos()) {
      toast.error('Complete los campos básicos antes del análisis');
      return;
    }

    try {
      const datos = prepararDatosParaIA();
      await ejecutarAnalisis(datos, '${tipoPagina}');
    } catch (error) {
      console.error('Error en análisis IA:', error);
    }
  };

  const handleGenerarPDF = async () => {
    if (!analisis) {
      toast.error('Realice el análisis con IA primero');
      return;
    }

    try {
      const datosPDF = {
        titulo: 'Análisis de ${tipoPagina}',
        datos: datosFormulario,
        analisis: analisis,
        fecha: new Date().toLocaleString('es-CO')
      };

      const pdf = await PDFMejoradoService.generarPDFMejorado(datosPDF, {
        plantilla: '${tipoPagina}',
        estilo: 'oficial'
      });

      // Descargar PDF
      const blob = new Blob([pdf.archivo.contenido], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '${tipoPagina}_${Date.now()}.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('PDF generado exitosamente');
    } catch (error) {
      console.error('Error generando PDF:', error);
      toast.error('Error generando PDF');
    }
  };

  const handleLimpiar = () => {
    limpiarFormulario();
    limpiarAnalisis();
  };

  const datosBasicosCompletos = () => {
    // Implementar validación según el tipo de página
    return true; // Por ahora siempre true, se puede personalizar
  };

  const prepararDatosParaIA = () => {
    // Implementar preparación de datos según el tipo de página
    return {}; // Por ahora objeto vacío, se puede personalizar
  };

  const limpiarFormulario = () => {
    // Implementar limpieza de formulario según el tipo de página
  };
`;

    // Buscar el final de los estados y agregar antes del return
    const regexReturn = /return \(/;
    if (regexReturn.test(contenido)) {
      return contenido.replace(regexReturn, `${funcionesIA}\n\n  return (`);
    }
    
    return contenido;
  }

  /**
   * Agregar botones de IA
   */
  agregarBotonesIA(contenido) {
    const botonesIA = `
                  <Button type="button" onClick={handleAnalisisIA} disabled={cargando}>
                    <Brain className="w-4 h-4 mr-2" />
                    {cargando ? 'Analizando...' : 'Análisis con IA'}
                  </Button>
                  <Button type="button" onClick={handleGenerarPDF} disabled={!analisis}>
                    <Download className="w-4 h-4 mr-2" />
                    Generar PDF
                  </Button>
                  <Button type="button" onClick={handleLimpiar} variant="outline">
                    Limpiar
                  </Button>`;

    // Buscar botones existentes y agregar después
    const regexBotones = /<Button[^>]*>.*?<\/Button>/;
    if (regexBotones.test(contenido)) {
      return contenido.replace(regexBotones, (match) => `${match}\n${botonesIA}`);
    }
    
    return contenido;
  }

  /**
   * Agregar pestañas de análisis
   */
  agregarPestanasAnalisis(contenido, tipoPagina) {
    const pestanasIA = `
      <Tabs defaultValue="formulario" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="formulario">Formulario</TabsTrigger>
          <TabsTrigger value="analisis">Análisis IA</TabsTrigger>
          <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
          <TabsTrigger value="datos">Datos</TabsTrigger>
        </TabsList>

        <TabsContent value="formulario">
          {/* Contenido del formulario existente */}
          <div className="space-y-4">
            {/* Aquí va el contenido original del formulario */}
          </div>
        </TabsContent>

        <TabsContent value="analisis">
          <AnalisisIACard
            analisis={analisis}
            cargando={cargando}
            error={error}
            onGenerarPDF={handleGenerarPDF}
            onLimpiar={handleLimpiar}
            tipoAnalisis="${tipoPagina}"
          />
        </TabsContent>

        <TabsContent value="recomendaciones">
          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones Inteligentes</CardTitle>
            </CardHeader>
            <CardContent>
              {analisis?.recomendaciones ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Páginas Recomendadas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {analisis.recomendaciones.paginas_recomendadas?.slice(0, 3).map((pagina, index) => (
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
                        {analisis.recomendaciones.procesos_recomendados?.slice(0, 3).map((proceso, index) => (
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
          <div className="space-y-4">
            {/* Aquí va el contenido original de datos */}
          </div>
        </TabsContent>
      </Tabs>`;

    // Buscar el div principal y reemplazar con pestañas
    const regexDivPrincipal = /<div[^>]*style[^>]*>[\s\S]*?<\/div>/;
    if (regexDivPrincipal.test(contenido)) {
      return contenido.replace(regexDivPrincipal, pestanasIA);
    }
    
    return contenido;
  }

  /**
   * Ejecutar aplicación de mejoras
   */
  ejecutar() {
    console.log('🚀 Iniciando aplicación de mejoras de IA a páginas...\n');

    const paginas = [
      // Páginas étnicas
      { ruta: './src/paginas/03-derechos-etnicos-culturales/01-derechos-etnicos/DerechosEtnicos.jsx', tipo: 'etnico' },
      { ruta: './src/paginas/03-derechos-etnicos-culturales/03-consulta-previa-etnica/ConsultaPreviaEtnica.jsx', tipo: 'etnico' },
      { ruta: './src/paginas/03-derechos-etnicos-culturales/03-patrimonio-cultural/PatrimonioCultural.jsx', tipo: 'etnico' },
      { ruta: './src/paginas/03-derechos-etnicos-culturales/05-planes-etnodesarrollo/PlanesEtnodesarrollo.jsx', tipo: 'etnico' },
      { ruta: './src/paginas/03-derechos-etnicos-culturales/08-mediacion-intercultural/MediacionIntercultural.jsx', tipo: 'etnico' },
      { ruta: './src/paginas/03-derechos-etnicos-culturales/07-narraciones-etnicas/NarracionesEtnicas.jsx', tipo: 'etnico' },
      
      // Páginas administrativas
      { ruta: './src/paginas/05-participacion-ciudadana-democracia/05-pqrsfd/PQRSFD.jsx', tipo: 'administrativo' },
      { ruta: './src/paginas/04-sistemas-juridicos-legales/02-vias-administrativas/ViasAdministrativas.jsx', tipo: 'administrativo' },
      { ruta: './src/paginas/06-control-territorial-recursos/01-control-institucional/ControlInstitucional.jsx', tipo: 'administrativo' },
      
      // Páginas judiciales
      { ruta: './src/paginas/02-core-fundamentos/02-acciones-constitucionales/AccionTutela.jsx', tipo: 'judicial' },
      { ruta: './src/paginas/02-core-fundamentos/02-acciones-constitucionales/AccionPopular.jsx', tipo: 'judicial' },
      { ruta: './src/paginas/02-core-fundamentos/02-acciones-constitucionales/AccionCumplimiento.jsx', tipo: 'judicial' },
      { ruta: './src/paginas/02-core-fundamentos/02-acciones-constitucionales/DemandaJuridica.jsx', tipo: 'judicial' }
    ];

    let exitosos = 0;
    let fallidos = 0;

    paginas.forEach(pagina => {
      if (this.aplicarMejorasPagina(pagina.ruta, pagina.tipo)) {
        exitosos++;
      } else {
        fallidos++;
      }
    });

    console.log(`\n📊 Resumen de aplicación:`);
    console.log(`✅ Exitosos: ${exitosos}`);
    console.log(`❌ Fallidos: ${fallidos}`);
    console.log(`📁 Total: ${paginas.length}`);

    if (exitosos > 0) {
      console.log(`\n🎉 ¡Mejoras aplicadas exitosamente a ${exitosos} páginas!`);
      console.log(`\n📝 Próximos pasos:`);
      console.log(`1. Revisar archivos modificados`);
      console.log(`2. Probar funcionalidades de IA`);
      console.log(`3. Ajustar validaciones específicas por página`);
      console.log(`4. Personalizar preparación de datos para IA`);
    }
  }
}

// Ejecutar aplicación
const aplicador = new AplicadorMejorasPaginas();
aplicador.ejecutar();
