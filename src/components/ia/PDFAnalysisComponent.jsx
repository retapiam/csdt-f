/**
 * COMPONENTE DE ANÁLISIS DE PDF CON IA - CSDT
 * Componente especializado para análisis de documentos PDF con IA avanzada
 */

import React, { useState, useRef } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert } from '../ui/alert';
import { 
  Upload, 
  FileText, 
  Brain, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Zap,
  Target,
  Shield,
  Lightbulb,
  BarChart3,
  TrendingUp,
  FileSearch,
  RefreshCw
} from 'lucide-react';
import { advancedAIService } from '../../services/ia/AdvancedAIService';
import pdfAvanzadoService from '../../services/pdf/PDFAvanzadoService';

const PDFAnalysisComponent = ({ onAnalysisComplete, tipoAnalisis = 'general' }) => {
  const [archivoPDF, setArchivoPDF] = useState(null);
  const [analisis, setAnalisis] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [progreso, setProgreso] = useState(0);
  const [pasoActual, setPasoActual] = useState(1);
  const fileInputRef = useRef(null);

  const pasos = [
    { id: 1, nombre: 'Seleccionar PDF', icono: Upload },
    { id: 2, nombre: 'Análisis IA', icono: Brain },
    { id: 3, nombre: 'Resultados', icono: CheckCircle }
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setArchivoPDF(file);
      setError(null);
      setPasoActual(2);
    } else {
      setError('Por favor selecciona un archivo PDF válido');
    }
  };

  const analizarPDF = async () => {
    if (!archivoPDF) {
      setError('Por favor selecciona un archivo PDF');
      return;
    }

    setCargando(true);
    setError(null);
    setProgreso(0);

    try {
      // Simular progreso
      const interval = setInterval(() => {
        setProgreso(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Análisis con IA avanzada
      const resultado = await advancedAIService.analizarPDFConIA(archivoPDF, {
        tipoAnalisis,
        incluirRecomendaciones: true,
        incluirRiesgos: true,
        incluirPrecedentes: true,
        nivelAnalisis: 'avanzado'
      });

      clearInterval(interval);
      setProgreso(100);

      if (resultado.exito) {
        setAnalisis(resultado);
        setPasoActual(3);
        if (onAnalysisComplete) {
          onAnalysisComplete(resultado);
        }
      } else {
        setError(resultado.error || 'Error en el análisis del PDF');
      }

    } catch (error) {
      console.error('Error analizando PDF:', error);
      setError('Error al analizar el PDF: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  const generarPDFConAnalisis = async () => {
    if (!analisis) return;

    try {
      const pdfGenerado = await pdfAvanzadoService.generarPDFAvanzado({
        titulo: 'Análisis de Documento PDF con IA',
        hechos: analisis.textoExtraido,
        analisis_ia: [analisis.analisisIA.analisis],
        conclusiones: analisis.resumenEjecutivo.resumen,
        recomendaciones: analisis.analisisIA.recomendaciones?.inmediatas || []
      }, {
        plantilla: 'analisis_juridico',
        estilo: 'oficial'
      });

      // Descargar PDF
      const blob = new Blob([pdfGenerado.archivo.documento.output('blob')], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfGenerado.archivo.nombre;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error generando PDF:', error);
      setError('Error al generar PDF con análisis');
    }
  };

  const reiniciarAnalisis = () => {
    setArchivoPDF(null);
    setAnalisis(null);
    setError(null);
    setProgreso(0);
    setPasoActual(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderPaso1 = () => (
    <Card className="p-6">
      <div className="text-center">
        <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Seleccionar Documento PDF</h3>
        <p className="text-gray-600 mb-6">
          Sube un documento PDF para análisis con IA avanzada
        </p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="mb-4"
          >
            <Upload className="h-4 w-4 mr-2" />
            Seleccionar PDF
          </Button>
          <p className="text-sm text-gray-500">
            Formatos soportados: PDF (máx. 10MB)
          </p>
        </div>

        {archivoPDF && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">
                {archivoPDF.name} ({Math.round(archivoPDF.size / 1024)} KB)
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  const renderPaso2 = () => (
    <Card className="p-6">
      <div className="text-center">
        <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Análisis con IA Avanzada</h3>
        <p className="text-gray-600 mb-6">
          Analizando documento con múltiples proveedores de IA especializados
        </p>

        {cargando ? (
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progreso}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Progreso: {progreso}% - Analizando con IA...
            </p>
            <div className="flex justify-center">
              <RefreshCw className="h-6 w-6 text-purple-600 animate-spin" />
            </div>
          </div>
        ) : (
          <Button
            onClick={analizarPDF}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
            size="lg"
          >
            <Zap className="h-5 w-5 mr-2" />
            Iniciar Análisis IA
          </Button>
        )}
      </div>
    </Card>
  );

  const renderPaso3 = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
            Análisis Completado
          </h3>
          <div className="flex space-x-2">
            <Button
              onClick={generarPDFConAnalisis}
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar PDF
            </Button>
            <Button
              onClick={reiniciarAnalisis}
              variant="outline"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Nuevo Análisis
            </Button>
          </div>
        </div>

        {/* Resumen Ejecutivo */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2 flex items-center">
            <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
            Resumen Ejecutivo
          </h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              {analisis?.resumenEjecutivo?.resumen || 'Resumen no disponible'}
            </p>
          </div>
        </div>

        {/* Puntos Clave */}
        {analisis?.resumenEjecutivo?.puntosClave && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2 flex items-center">
              <Target className="h-5 w-5 text-green-600 mr-2" />
              Puntos Clave
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {analisis.resumenEjecutivo.puntosClave.map((punto, index) => (
                <Badge key={index} variant="outline" className="justify-start">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  {punto}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Análisis de IA */}
        {analisis?.analisisIA?.analisis && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2 flex items-center">
              <Brain className="h-5 w-5 text-purple-600 mr-2" />
              Análisis de IA
            </h4>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Confianza: </span>
                  <Badge variant="outline" className="ml-2">
                    {((analisis.analisisIA.analisis.confianza || 0) * 100).toFixed(1)}%
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Proveedores: </span>
                  <span className="text-sm text-gray-600">
                    {analisis.analisisIA.metadatos?.proveedoresUtilizados?.join(', ') || 'IA Avanzada'}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Tiempo: </span>
                  <span className="text-sm text-gray-600">
                    {analisis.analisisIA.metadatos?.tiempoProcesamiento ? 
                      `${(analisis.analisisIA.metadatos.tiempoProcesamiento / 1000).toFixed(1)}s` : 
                      'N/A'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clasificaciones */}
        {analisis?.analisisIA?.analisis?.clasificaciones && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2 flex items-center">
              <Shield className="h-5 w-5 text-orange-600 mr-2" />
              Clasificaciones Legales
            </h4>
            <div className="space-y-2">
              {analisis.analisisIA.analisis.clasificaciones.map((clasificacion, index) => (
                <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{clasificacion.categoria}</span>
                    <Badge variant="outline">
                      {(clasificacion.confianza * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  {clasificacion.fundamentos && (
                    <p className="text-sm text-gray-600 mt-1">
                      {clasificacion.fundamentos[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recomendaciones */}
        {analisis?.analisisIA?.recomendaciones && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2 flex items-center">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              Recomendaciones
            </h4>
            <div className="space-y-2">
              {analisis.analisisIA.recomendaciones.inmediatas?.map((rec, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                    <span className="text-sm">{rec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Evaluación de Riesgos */}
        {analisis?.analisisIA?.evaluacionRiesgos && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              Evaluación de Riesgos
            </h4>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Nivel de Riesgo:</span>
                <Badge 
                  variant="outline" 
                  className={
                    analisis.analisisIA.evaluacionRiesgos.nivel === 'alto' ? 'border-red-500 text-red-700' :
                    analisis.analisisIA.evaluacionRiesgos.nivel === 'medio' ? 'border-yellow-500 text-yellow-700' :
                    'border-green-500 text-green-700'
                  }
                >
                  {analisis.analisisIA.evaluacionRiesgos.nivel?.toUpperCase()}
                </Badge>
              </div>
              {analisis.analisisIA.evaluacionRiesgos.factores && (
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Factores:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {analisis.analisisIA.evaluacionRiesgos.factores.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Barra de Progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {pasos.map((paso, index) => {
            const Icono = paso.icono;
            const activo = pasoActual >= paso.id;
            const completado = pasoActual > paso.id;
            
            return (
              <div key={paso.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2
                  ${completado ? 'bg-green-500 border-green-500 text-white' :
                    activo ? 'bg-blue-500 border-blue-500 text-white' :
                    'bg-gray-200 border-gray-300 text-gray-500'}
                `}>
                  <Icono className="h-5 w-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  activo ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {paso.nombre}
                </span>
                {index < pasos.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    completado ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contenido según paso actual */}
      {pasoActual === 1 && renderPaso1()}
      {pasoActual === 2 && renderPaso2()}
      {pasoActual === 3 && renderPaso3()}

      {/* Error */}
      {error && (
        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </Alert>
      )}
    </div>
  );
};

export default PDFAnalysisComponent;
