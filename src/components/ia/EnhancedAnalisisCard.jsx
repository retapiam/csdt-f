/**
 * COMPONENTE MEJORADO PARA ANÁLISIS DE IA
 * Card avanzado que muestra resultados de análisis de IA con mejoras visuales y funcionalidad
 */

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Brain, 
  Download,
  RefreshCw,
  Info,
  TrendingUp,
  Shield,
  Target,
  Users,
  FileText,
  BarChart3,
  Lightbulb,
  ArrowRight,
  Copy,
  ExternalLink
} from 'lucide-react';

const EnhancedAnalisisCard = ({ 
  analisis, 
  cargando, 
  error, 
  onGenerarPDF, 
  onLimpiar,
  onReanalizar,
  tipoAnalisis = 'general',
  mostrarDetalles = true,
  compacto = false
}) => {
  const [tabActivo, setTabActivo] = useState('resumen');
  const [copiado, setCopiado] = useState(false);

  if (cargando) {
    return (
      <Card className="border-2 border-dashed border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Analizando con IA Avanzada...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="relative">
                <Brain className="w-16 h-16 mx-auto mb-4 text-blue-500 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Procesando con Inteligencia Artificial
              </h3>
              <p className="text-gray-600 max-w-md">
                Analizando el caso con múltiples sistemas especializados y generando recomendaciones estratégicas...
              </p>
              <div className="mt-4 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Error en el Análisis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          {onReanalizar && (
            <div className="mt-4 flex gap-2">
              <Button onClick={onReanalizar} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar Análisis
              </Button>
              <Button onClick={onLimpiar} variant="ghost">
                Limpiar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!analisis) {
    return (
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Análisis con Inteligencia Artificial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Realice el análisis con IA desde el formulario para ver los resultados aquí.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const copiarTexto = (texto) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const renderResumen = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Resumen Ejecutivo
        </h3>
        <p className="text-blue-800 text-sm leading-relaxed">
          {analisis.resumen || analisis.analisis?.resumen || 'Resumen no disponible'}
        </p>
      </div>

      {analisis.confianza && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Confianza del Análisis:</span>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${analisis.confianza * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {(analisis.confianza * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const renderClasificaciones = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        Clasificaciones Legales
      </h3>
      
      {analisis.clasificaciones?.map((clasificacion, index) => (
        <Card key={index} className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900">{clasificacion.categoria}</h4>
              <Badge variant="secondary">
                {(clasificacion.confianza * 100).toFixed(0)}%
              </Badge>
            </div>
            
            {clasificacion.fundamentos && (
              <div className="text-sm text-gray-600 mb-2">
                <strong>Fundamentos:</strong> {clasificacion.fundamentos.join(', ')}
              </div>
            )}
            
            {clasificacion.proveedores && (
              <div className="text-xs text-gray-500">
                <strong>Proveedores:</strong> {clasificacion.proveedores.join(', ')}
              </div>
            )}
          </CardContent>
        </Card>
      )) || (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            No se encontraron clasificaciones específicas para este análisis.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const renderRecomendaciones = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Lightbulb className="w-4 h-4" />
        Recomendaciones Estratégicas
      </h3>
      
      {analisis.recomendaciones ? (
        <div className="space-y-3">
          {Object.entries(analisis.recomendaciones).map(([categoria, items]) => (
            <Card key={categoria} className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-2 capitalize">
                  {categoria.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <ul className="space-y-1">
                  {Array.isArray(items) ? items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <ArrowRight className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  )) : (
                    <li className="text-sm text-gray-700">{items}</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            No se generaron recomendaciones específicas para este análisis.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const renderRiesgos = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Evaluación de Riesgos
      </h3>
      
      {analisis.evaluacionRiesgos ? (
        <div className="space-y-3">
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Nivel de Riesgo</h4>
                <Badge 
                  variant={
                    analisis.evaluacionRiesgos.nivel === 'alto' ? 'destructive' :
                    analisis.evaluacionRiesgos.nivel === 'medio' ? 'secondary' : 'default'
                  }
                >
                  {analisis.evaluacionRiesgos.nivel?.toUpperCase()}
                </Badge>
              </div>
              
              {analisis.evaluacionRiesgos.factores && (
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Factores de Riesgo:</strong>
                  <ul className="mt-1 space-y-1">
                    {analisis.evaluacionRiesgos.factores.map((factor, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {analisis.evaluacionRiesgos.recomendaciones && (
                <div className="text-sm text-gray-600">
                  <strong>Recomendaciones:</strong>
                  <ul className="mt-1 space-y-1">
                    {analisis.evaluacionRiesgos.recomendaciones.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            No se realizó evaluación de riesgos para este análisis.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const renderMetadatos = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Info className="w-4 h-4" />
        Información del Análisis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analisis.metadatos?.tiempoProcesamiento && (
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-700">Tiempo de Procesamiento</div>
              <div className="text-sm text-gray-600">{analisis.metadatos.tiempoProcesamiento}ms</div>
            </div>
          </div>
        )}
        
        {analisis.metadatos?.proveedoresUtilizados && (
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Brain className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-700">Proveedores Utilizados</div>
              <div className="text-sm text-gray-600">{analisis.metadatos.proveedoresUtilizados.length}</div>
            </div>
          </div>
        )}
        
        {analisis.metadatos?.confianzaPromedio && (
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-700">Confianza Promedio</div>
              <div className="text-sm text-gray-600">{(analisis.metadatos.confianzaPromedio * 100).toFixed(1)}%</div>
            </div>
          </div>
        )}
        
        {analisis.metadatos?.version && (
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Target className="w-4 h-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-700">Versión del Sistema</div>
              <div className="text-sm text-gray-600">v{analisis.metadatos.version}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (compacto) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Análisis Completado
            </CardTitle>
            <div className="flex gap-2">
              {onGenerarPDF && (
                <Button onClick={onGenerarPDF} size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-sm text-gray-600 mb-3">
            {analisis.resumen || analisis.analisis?.resumen || 'Análisis completado exitosamente'}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Confianza: {(analisis.confianza * 100).toFixed(1)}%</span>
            <span>{analisis.metadatos?.proveedoresUtilizados?.length || 0} proveedores</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con información del análisis */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              Análisis Completado Exitosamente
            </CardTitle>
            <div className="flex gap-2">
              {onGenerarPDF && (
                <Button onClick={onGenerarPDF} size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Generar PDF
                </Button>
              )}
              {onLimpiar && (
                <Button onClick={onLimpiar} size="sm" variant="ghost">
                  Limpiar
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-green-700">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {analisis.metadatos?.tiempoProcesamiento || 'N/A'}ms
            </div>
            <Badge variant="outline" className="text-green-700 border-green-300">
              {tipoAnalisis}
            </Badge>
            {analisis.confianza && (
              <Badge variant="secondary" className="text-green-700">
                Calidad: {Math.round(analisis.confianza * 100)}%
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pestañas de contenido */}
      {mostrarDetalles && (
        <Tabs value={tabActivo} onValueChange={setTabActivo}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="clasificaciones">Clasificaciones</TabsTrigger>
            <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
            <TabsTrigger value="riesgos">Riesgos</TabsTrigger>
            <TabsTrigger value="metadatos">Detalles</TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="mt-4">
            {renderResumen()}
          </TabsContent>

          <TabsContent value="clasificaciones" className="mt-4">
            {renderClasificaciones()}
          </TabsContent>

          <TabsContent value="recomendaciones" className="mt-4">
            {renderRecomendaciones()}
          </TabsContent>

          <TabsContent value="riesgos" className="mt-4">
            {renderRiesgos()}
          </TabsContent>

          <TabsContent value="metadatos" className="mt-4">
            {renderMetadatos()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EnhancedAnalisisCard;
