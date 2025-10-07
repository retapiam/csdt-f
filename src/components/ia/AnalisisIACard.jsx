/**
 * COMPONENTE REUTILIZABLE PARA ANÁLISIS DE IA
 * Card que muestra resultados de análisis de IA de manera consistente
 */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Brain, 
  Download,
  RefreshCw,
  Info
} from 'lucide-react';

const AnalisisIACard = ({ 
  analisis, 
  cargando, 
  error, 
  onGenerarPDF, 
  onLimpiar,
  onReanalizar,
  tipoAnalisis = 'general'
}) => {
  if (cargando) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Analizando con IA...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-pulse" />
              <p className="text-gray-600">Procesando información con Inteligencia Artificial</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
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
            <Button onClick={onReanalizar} className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reintentar Análisis
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!analisis) {
    return (
      <Card>
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

  const renderAnalisisEtnico = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tipo Étnico Identificado</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Nombre:</strong> {analisis.analisis_especifico?.tipo_etnico?.nombre}</p>
            <p><strong>Tipo:</strong> {analisis.analisis_especifico?.tipo_etnico?.tipo}</p>
            <p><strong>Confianza:</strong> 
              <Badge variant="secondary" className="ml-2">
                {(analisis.analisis_especifico?.tipo_etnico?.confianza * 100).toFixed(1)}%
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Consulta Previa</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Requiere:</strong> 
              <Badge variant={analisis.analisis_especifico?.consulta_previa?.requiere_consulta ? 'destructive' : 'secondary'} className="ml-2">
                {analisis.analisis_especifico?.consulta_previa?.requiere_consulta ? 'Sí' : 'No'}
              </Badge>
            </p>
            <p><strong>Urgencia:</strong> {analisis.analisis_especifico?.consulta_previa?.nivel_urgencia}</p>
            <p><strong>Justificación:</strong> {analisis.analisis_especifico?.consulta_previa?.justificacion?.join(', ')}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Análisis Narrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
            {analisis.analisis_especifico?.analisis_narrativo}
          </pre>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalisisAdministrativo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vía Administrativa Recomendada</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Nombre:</strong> {analisis.analisis_especifico?.via_recomendada?.nombre}</p>
            <p><strong>Instancia:</strong> {analisis.analisis_especifico?.via_recomendada?.instancia}</p>
            <p><strong>Plazo:</strong> {analisis.analisis_especifico?.via_recomendada?.plazo}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Plazos</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Días:</strong> {analisis.analisis_especifico?.plazos?.plazo_dias}</p>
            <p><strong>Vencimiento:</strong> {analisis.analisis_especifico?.plazos?.fecha_vencimiento}</p>
            <p><strong>Días restantes:</strong> 
              <Badge variant={analisis.analisis_especifico?.plazos?.urgente ? 'destructive' : 'secondary'} className="ml-2">
                {analisis.analisis_especifico?.plazos?.dias_restantes}
              </Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Análisis Narrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
            {analisis.analisis_especifico?.analisis_narrativo}
          </pre>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalisisJudicial = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acción Judicial Recomendada</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Nombre:</strong> {analisis.analisis_especifico?.accion_recomendada?.nombre}</p>
            <p><strong>Competencia:</strong> {analisis.analisis_especifico?.accion_recomendada?.competencia}</p>
            <p><strong>Plazo:</strong> {analisis.analisis_especifico?.accion_recomendada?.plazo}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Viabilidad</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Nivel:</strong> 
              <Badge variant={
                analisis.analisis_especifico?.viabilidad?.nivel === 'alta' ? 'default' :
                analisis.analisis_especifico?.viabilidad?.nivel === 'media' ? 'secondary' : 'destructive'
              } className="ml-2">
                {analisis.analisis_especifico?.viabilidad?.nivel}
              </Badge>
            </p>
            <p><strong>Puntuación:</strong> {analisis.analisis_especifico?.viabilidad?.puntuacion}/10</p>
            <p><strong>Recomendación:</strong> {analisis.analisis_especifico?.viabilidad?.recomendacion}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Análisis Narrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
            {analisis.analisis_especifico?.analisis_narrativo}
          </pre>
        </CardContent>
      </Card>
    </div>
  );

  const renderRecomendaciones = () => {
    if (!analisis.recomendaciones) return null;

    return (
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

        {analisis.recomendaciones.alertas?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alertas</CardTitle>
            </CardHeader>
            <CardContent>
              {analisis.recomendaciones.alertas.map((alerta, index) => (
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
    );
  };

  return (
    <div className="space-y-6">
      {/* Header con información del análisis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Análisis Completado
            </CardTitle>
            <div className="flex gap-2">
              {onGenerarPDF && (
                <Button onClick={onGenerarPDF} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Generar PDF
                </Button>
              )}
              {onLimpiar && (
                <Button onClick={onLimpiar} variant="outline" size="sm">
                  Limpiar
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {analisis.tiempo_analisis}ms
            </div>
            <Badge variant="outline">
              {analisis.tipo_caso}
            </Badge>
            {analisis.calidad && (
              <Badge variant="secondary">
                Calidad: {Math.round(analisis.calidad * 100)}%
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contenido específico según tipo de análisis */}
      {analisis.tipo_caso === 'etnico' && renderAnalisisEtnico()}
      {analisis.tipo_caso === 'administrativo' && renderAnalisisAdministrativo()}
      {analisis.tipo_caso === 'judicial' && renderAnalisisJudicial()}

      {/* Recomendaciones */}
      {renderRecomendaciones()}
    </div>
  );
};

export default AnalisisIACard;
