import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Cpu, 
  MapPin, 
  Plus, 
  RotateCcw, 
  Play, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Target,
  Users,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';
import { unifiedAIService } from '../../services/ia/UnifiedAIService';
import { legalAreas, jurisdictions, getJurisdictionLabel, getLegalAreaLabel, getProviderIcon, getProviderColor } from '../../services/ia/types';

const MultiLegalAIComponent = ({
  className = '',
  showTitle = true,
  compact = false,
  defaultProviders = ['lexisnexis', 'legal_ai_library'],
  enableGeoAnalysis = true,
  enableTerritorialMonitoring = true,
  onTerritorialAlert
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [selectedProviders, setSelectedProviders] = useState(defaultProviders);
  const [availableProviders, setAvailableProviders] = useState([]);
  const [activeTab, setActiveTab] = useState('single');
  const [recommendedProvider, setRecommendedProvider] = useState(null);

  const [formData, setFormData] = useState({
    text: '',
    jurisdiction: 'colombia',
    legal_area: 'Derecho Constitucional',
    language: 'es',
    document_type: '',
    document_references: '',
    context: 'Análisis CSDT - Control Territorial'
  });

  // Cargar proveedores disponibles al montar el componente
  useEffect(() => {
    const providers = unifiedAIService.getAvailableProviders();
    setAvailableProviders(providers);
  }, []);

  // Actualizar recomendación cuando cambien los parámetros
  useEffect(() => {
    if (formData.jurisdiction || formData.legal_area) {
      if (formData.text.length > 10) {
        const recommendation = unifiedAIService.recommendProvider(formData);
        setRecommendedProvider(recommendation.recommendedProvider);
      }
    }
  }, [formData.jurisdiction, formData.legal_area, formData.text]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.text.trim()) {
      toast.error('Por favor ingrese el texto legal a analizar');
      return;
    }

    setIsLoading(true);
    try {
      let results;

      if (activeTab === 'single' && selectedProviders.length === 1) {
        // Análisis con un solo proveedor usando el hook mejorado
        const result = await aiService.analyzeWithProvider(selectedProviders[0], formData);
        results = [result];
        toast.success(`Análisis completado con ${result.ai_provider}`);
      } else if (activeTab === 'multiple' || (activeTab === 'single' && selectedProviders.length > 1)) {
        // Análisis con múltiples proveedores usando el hook mejorado
        results = await aiService.analyzeWithMultipleProviders(selectedProviders, formData);
        const successCount = results.filter(r => r.status === 'success').length;
        toast.success(`${successCount} de ${results.length} análisis completados`);
      } else {
        // Análisis rápido con proveedor recomendado usando el hook mejorado
        const result = await aiService.quickAnalyze(formData);
        results = [result];
        toast.success(`Análisis completado con ${result.ai_provider} (recomendado)`);
      }

      setAnalysisResults(results);

      // Generar comparación si hay múltiples resultados
      if (results.length > 1) {
        const comparison = unifiedAIService.compareResults(results);
        setComparisonResult(comparison);
        setActiveTab('compare');
      }

    } catch (error) {
      console.error('Error en análisis:', error);
      toast.error('Error al procesar el análisis: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProvider = (providerId) => {
    setSelectedProviders(prev =>
      prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatProcessingTime = (ms) => {
    return `${(ms / 1000).toFixed(2)}s`;
  };

  if (compact) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        {showTitle && (
          <div className="flex items-center mb-4">
            <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-bold text-gray-900">Multi-IA Legal</h3>
          </div>
        )}

        <div className="space-y-4">
          {/* Selector de proveedores */}
          <div className="flex flex-wrap gap-2">
            {availableProviders.slice(0, 3).map(provider => (
              <button
                key={provider.id}
                onClick={() => toggleProvider(provider.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedProviders.includes(provider.id)
                    ? `bg-${getProviderColor(provider.id)}-500 text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getProviderIcon(provider.id)} {provider.name}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea
                value={formData.text}
                onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                rows={3}
                className="w-full resize-none"
                placeholder="Ingrese el texto legal a analizar..."
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !formData.text.trim() || selectedProviders.length === 0}
              className="w-full"
            >
              {isLoading ? 'Analizando...' : `Analizar (${selectedProviders.length} IA${selectedProviders.length > 1 ? 's' : ''})`}
            </Button>
          </form>
        </div>

        {analysisResults.length > 0 && (
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-semibold text-indigo-900 mb-2">Resultados ({analysisResults.length})</h4>
            <div className="space-y-2">
              {analysisResults.map((result, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{result.ai_provider}:</span>
                  <span className={`ml-2 ${result.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {result.status === 'success' ? '✓' : '✗'}
                  </span>
                  {result.status === 'success' && (
                    <span className="ml-2 text-gray-600">
                      {result.classifications[0]?.category || 'Sin clasificación'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 mr-3" />
            <div>
              <h2 className="text-2xl font-bold">Multi-IA Legal</h2>
              <p className="text-indigo-100">Análisis inteligente con múltiples proveedores de IA</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-indigo-100">
            <Users className="h-4 w-4 mr-1" />
            {availableProviders.length} Proveedores Disponibles
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Pestañas de modo de análisis */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="single">Análisis Simple</TabsTrigger>
              <TabsTrigger value="multiple">Multi-Proveedor</TabsTrigger>
              <TabsTrigger value="compare">Comparación</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Selector de proveedores */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Proveedores de IA Disponibles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableProviders.map(provider => (
              <button
                key={provider.id}
                onClick={() => toggleProvider(provider.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedProviders.includes(provider.id)
                    ? `border-${getProviderColor(provider.id)}-500 bg-${getProviderColor(provider.id)}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{getProviderIcon(provider.id)}</div>
                  <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{provider.version}</div>
                  {recommendedProvider?.id === provider.id && (
                    <div className="text-xs text-green-600 font-medium mt-1">⭐ Recomendado</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {recommendedProvider && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Brain className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <span className="text-sm font-medium text-green-900">Recomendación:</span>
                  <span className="text-sm text-green-800 ml-1">
                    {recommendedProvider.name} - Especializado para este tipo de análisis
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Formulario de análisis */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Texto a analizar */}
            <div className="lg:col-span-2">
              <Label htmlFor="text">Texto Legal a Analizar *</Label>
              <Textarea
                id="text"
                value={formData.text}
                onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                rows={8}
                className="w-full resize-none font-mono text-sm"
                placeholder="Pegue aquí el texto legal que desea clasificar. Puede ser un artículo de ley, jurisprudencia, contrato, demanda, etc."
                required
              />
              {formData.text && (
                <p className="mt-1 text-sm text-gray-500">
                  Caracteres: {formData.text.length}
                </p>
              )}
            </div>

            {/* Configuración */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="legal_area">Área Legal</Label>
                <Select 
                  value={formData.legal_area} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, legal_area: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar área" />
                  </SelectTrigger>
                  <SelectContent>
                    {legalAreas.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="jurisdiction">Jurisdicción</Label>
                <Select 
                  value={formData.jurisdiction} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, jurisdiction: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar jurisdicción" />
                  </SelectTrigger>
                  <SelectContent>
                    {jurisdictions.map(jur => (
                      <SelectItem key={jur} value={jur}>{getJurisdictionLabel(jur)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Idioma</Label>
                <Select 
                  value={formData.language} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="document_type">Tipo de Documento</Label>
                <Select 
                  value={formData.document_type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, document_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">General</SelectItem>
                    <SelectItem value="contract">Contrato</SelectItem>
                    <SelectItem value="lawsuit">Demanda Judicial</SelectItem>
                    <SelectItem value="complaint">Queja/PQRS</SelectItem>
                    <SelectItem value="regulation">Normativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Botón de análisis */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isLoading || !formData.text.trim() || selectedProviders.length === 0}
              className="text-lg px-8 py-4 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RotateCcw className="h-5 w-5 mr-3 animate-spin" />
                  Analizando con {selectedProviders.length} IA{selectedProviders.length > 1 ? 's' : ''}...
                </>
              ) : (
                <>
                  <Target className="h-5 w-5 mr-3" />
                  Analizar con {selectedProviders.length} Proveedor{selectedProviders.length > 1 ? 'es' : ''}
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Resultados del análisis */}
        {analysisResults.length > 0 && (
          <div className="mt-8 border-t pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Resultados del Análisis ({analysisResults.length})
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Análisis completado
              </div>
            </div>

            {/* Resultados individuales */}
            <div className="space-y-6">
              {analysisResults.map((result, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getProviderIcon(result.ai_provider)}</span>
                        <div>
                          <CardTitle className="text-lg">
                            {availableProviders.find(p => p.id === result.ai_provider)?.name || result.ai_provider}
                          </CardTitle>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatProcessingTime(result.processing_time)}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Badge className={
                          result.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }>
                          {result.status === 'success' ? 'Completado' : 'Error'}
                        </Badge>
                        {result.status === 'success' && (
                          <div className="text-sm text-gray-600 mt-1">
                            Confianza: {(result.confidence_score * 100).toFixed(1)}%
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {result.status === 'success' ? (
                      <>
                        {/* Resumen */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h5 className="font-semibold text-blue-900 mb-2">Resumen Ejecutivo</h5>
                          <p className="text-blue-800 text-sm">{result.summary}</p>
                        </div>

                        {/* Clasificaciones */}
                        {result.classifications.length > 0 && (
                          <div className="mb-4">
                            <h5 className="font-semibold text-gray-900 mb-2">Clasificaciones Principales</h5>
                            <div className="flex flex-wrap gap-2">
                              {result.classifications.slice(0, 3).map((classification, clsIndex) => (
                                <div key={clsIndex} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                  <span className="font-medium">{classification.category}</span>
                                  <span className={`ml-2 ${getConfidenceColor(classification.confidence)}`}>
                                    {(classification.confidence * 100).toFixed(0)}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recomendaciones */}
                        {result.recommendations.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Recomendaciones</h5>
                            <ul className="space-y-1">
                              {result.recommendations.slice(0, 3).map((rec, recIndex) => (
                                <li key={recIndex} className="flex items-start text-sm text-gray-600">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Evaluación de riesgo */}
                        {result.risk_assessment && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <h6 className="text-sm font-medium text-gray-900 mb-2">Evaluación de Riesgo</h6>
                            <div className="flex items-center gap-2">
                              <Badge className={getRiskColor(result.risk_assessment.level)}>
                                {result.risk_assessment.level === 'low' ? 'Bajo' :
                                 result.risk_assessment.level === 'medium' ? 'Medio' :
                                 result.risk_assessment.level === 'high' ? 'Alto' : 'Crítico'}
                              </Badge>
                              <span className="text-sm text-gray-600">
                                Puntaje: {(result.risk_assessment.score * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                          <span className="text-red-800 font-medium">Error en el análisis</span>
                        </div>
                        {result.error_message && (
                          <p className="text-red-700 text-sm mt-2">{result.error_message}</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparación de resultados (si hay múltiples) */}
            {comparisonResult && analysisResults.length > 1 && (
              <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
                <h4 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
                  <Brain className="h-6 w-6 mr-2" />
                  Comparación de Resultados
                </h4>

                {/* Consenso */}
                <div className="mb-6">
                  <h5 className="font-semibold text-indigo-900 mb-2">Consenso General</h5>
                  <div className="bg-white p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">Categoría Principal:</span>
                        <span className="ml-2 text-indigo-700 font-semibold">{comparisonResult.consensus.topCategory}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Confianza Promedio</div>
                        <div className="text-lg font-bold text-indigo-700">
                          {(comparisonResult.consensus.confidence * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Proveedores que coinciden: {comparisonResult.consensus.providers.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Recomendación del mejor proveedor */}
                <div className="mb-6">
                  <h5 className="font-semibold text-indigo-900 mb-2">Recomendación</h5>
                  <div className="bg-white p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{getProviderIcon(comparisonResult.recommendations.bestProvider)}</span>
                      <div>
                        <span className="font-medium text-gray-900">Mejor Proveedor:</span>
                        <span className="ml-2 text-indigo-700 font-semibold">
                          {availableProviders.find(p => p.id === comparisonResult.recommendations.bestProvider)?.name ||
                           comparisonResult.recommendations.bestProvider}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{comparisonResult.recommendations.reasoning}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Información del servicio */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
          <h4 className="text-lg font-semibold text-indigo-900 mb-4">¿Por qué usar Multi-IA Legal?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-indigo-800">Comparación de resultados entre múltiples proveedores</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-indigo-800">Recomendaciones automáticas del mejor proveedor</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-indigo-800">Perspectivas únicas de cada IA especializada</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-indigo-800">Mayor precisión mediante consenso de resultados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLegalAIComponent;