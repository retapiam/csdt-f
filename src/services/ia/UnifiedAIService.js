import { AI_PROVIDERS, getProviderIcon, getProviderColor, getProviderTierColor } from './types';

/**
 * Servicio unificado que gestiona todas las IAs legales disponibles
 * Proporciona una interfaz única para interactuar con múltiples proveedores de IA
 */
class UnifiedAIService {
  constructor() {
    this.providers = new Map();
    this.initializeProviders();
  }

  initializeProviders() {
    // Registrar proveedores
    Object.values(AI_PROVIDERS).forEach(provider => {
      this.providers.set(provider.id, provider);
    });
  }

  /**
   * Obtiene todos los proveedores disponibles
   */
  getAvailableProviders() {
    return Array.from(this.providers.values()).filter(provider => provider.is_active);
  }

  /**
   * Obtiene un proveedor específico por ID
   */
  getProvider(providerId) {
    return this.providers.get(providerId);
  }

  /**
   * Analiza texto legal usando un proveedor específico
   */
  async analyzeWithProvider(providerId, request) {
    const provider = this.providers.get(providerId);
    
    if (!provider) {
      throw new Error(`Proveedor de IA no encontrado: ${providerId}`);
    }

    if (!provider.is_active) {
      throw new Error(`Proveedor de IA no disponible: ${providerId}`);
    }

    try {
      // Simular análisis con diferentes proveedores
      return await this.simulateAnalysis(providerId, request);
    } catch (error) {
      console.error(`Error con proveedor ${providerId}:`, error);
      return this.createErrorResult(providerId, request, error.message);
    }
  }

  /**
   * Analiza texto legal usando múltiples proveedores en paralelo
   */
  async analyzeWithMultipleProviders(providerIds, request) {
    const promises = providerIds.map(providerId =>
      this.analyzeWithProvider(providerId, request)
    );

    try {
      const results = await Promise.allSettled(promises);

      return results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          return this.createErrorResult(
            providerIds[index], 
            request, 
            result.reason?.message || 'Error desconocido'
          );
        }
      });
    } catch (error) {
      console.error('Error en análisis múltiple:', error);
      throw error;
    }
  }

  /**
   * Análisis rápido con proveedor recomendado
   */
  async quickAnalyze(request) {
    const recommendation = this.recommendProvider(request);
    return await this.analyzeWithProvider(recommendation.recommendedProvider.id, request);
  }

  /**
   * Recomienda el mejor proveedor basado en el contexto
   */
  recommendProvider(request) {
    const { legal_area, jurisdiction, text } = request;
    
    // Lógica de recomendación basada en el área legal
    let recommendedProvider;
    let reasoning = '';

    if (legal_area === 'Derecho Constitucional' || text.toLowerCase().includes('tutela')) {
      recommendedProvider = this.providers.get('constitutional_ai');
      reasoning = 'Especializado en derecho constitucional y tutelas';
    } else if (legal_area === 'Derecho Minero' || text.toLowerCase().includes('minería')) {
      recommendedProvider = this.providers.get('territorial_ai');
      reasoning = 'Especializado en análisis territorial y minero';
    } else if (text.toLowerCase().includes('veeduría') || text.toLowerCase().includes('control social')) {
      recommendedProvider = this.providers.get('veeduria_ai');
      reasoning = 'Especializado en veeduría ciudadana y control social';
    } else if (jurisdiction === 'colombia') {
      recommendedProvider = this.providers.get('lexisnexis');
      reasoning = 'Proveedor premium con amplia cobertura en Colombia';
    } else {
      recommendedProvider = this.providers.get('legal_ai_library');
      reasoning = 'Proveedor general con buena cobertura internacional';
    }

    return {
      recommendedProvider,
      reasoning,
      confidence: 0.85
    };
  }

  /**
   * Compara resultados de múltiples proveedores
   */
  compareResults(results) {
    const successfulResults = results.filter(r => r.status === 'success');
    
    if (successfulResults.length === 0) {
      return {
        consensus: {
          topCategory: 'Sin consenso',
          confidence: 0,
          providers: []
        },
        recommendations: {
          bestProvider: null,
          reasoning: 'No hay resultados exitosos para comparar'
        },
        differences: []
      };
    }

    // Encontrar categoría más común
    const categoryCounts = {};
    successfulResults.forEach(result => {
      result.classifications.forEach(classification => {
        const category = classification.category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    });

    const topCategory = Object.keys(categoryCounts).reduce((a, b) => 
      categoryCounts[a] > categoryCounts[b] ? a : b
    );

    // Calcular confianza promedio
    const avgConfidence = successfulResults.reduce((sum, result) => 
      sum + result.confidence_score, 0
    ) / successfulResults.length;

    // Encontrar mejor proveedor
    const bestProvider = successfulResults.reduce((best, current) => 
      current.confidence_score > best.confidence_score ? current : best
    );

    return {
      consensus: {
        topCategory,
        confidence: avgConfidence,
        providers: successfulResults.map(r => r.ai_provider)
      },
      recommendations: {
        bestProvider: bestProvider.ai_provider,
        reasoning: `Mejor confianza: ${(bestProvider.confidence_score * 100).toFixed(1)}%`
      },
      differences: successfulResults.map(result => ({
        providerId: result.ai_provider,
        confidence: result.confidence_score,
        uniqueInsights: result.classifications.slice(0, 2).map(c => c.category)
      }))
    };
  }

  /**
   * Simula análisis de IA (en producción se conectaría con APIs reales)
   */
  async simulateAnalysis(providerId, request) {
    const provider = this.providers.get(providerId);
    const processingTime = Math.random() * 2000 + 500; // 0.5-2.5 segundos

    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, processingTime));

    const classifications = this.generateClassifications(providerId, request);
    const summary = this.generateSummary(providerId, request, classifications);
    const recommendations = this.generateRecommendations(providerId, request, classifications);
    const riskAssessment = this.generateRiskAssessment(classifications);

    return {
      ai_provider: providerId,
      classifications,
      summary,
      confidence_score: Math.random() * 0.3 + 0.7, // 0.7-1.0
      processing_time: processingTime,
      recommendations,
      risk_assessment: riskAssessment,
      timestamp: new Date().toISOString(),
      status: 'success'
    };
  }

  /**
   * Genera clasificaciones basadas en el proveedor y texto
   */
  generateClassifications(providerId, request) {
    const { text, legal_area } = request;
    const classifications = [];

    // Clasificaciones específicas por proveedor
    if (providerId === 'constitutional_ai') {
      if (text.toLowerCase().includes('tutela')) {
        classifications.push({
          category: 'Acción de Tutela',
          confidence: 0.95,
          legal_basis: 'Artículo 86 de la Constitución Política',
          description: 'Procedimiento para la protección inmediata de derechos fundamentales',
          subcategories: ['Derecho a la Salud', 'Derecho a la Educación', 'Derecho a la Vida']
        });
      }
      if (text.toLowerCase().includes('derecho fundamental')) {
        classifications.push({
          category: 'Derechos Fundamentales',
          confidence: 0.88,
          legal_basis: 'Título II de la Constitución Política',
          description: 'Derechos inherentes a la persona humana',
          subcategories: ['Derecho a la Vida', 'Derecho a la Igualdad', 'Derecho a la Libertad']
        });
      }
    }

    if (providerId === 'territorial_ai') {
      if (text.toLowerCase().includes('minería') || text.toLowerCase().includes('minero')) {
        classifications.push({
          category: 'Derecho Minero',
          confidence: 0.92,
          legal_basis: 'Código de Minas (Ley 685 de 2001)',
          description: 'Normativa aplicable a la actividad minera',
          subcategories: ['Títulos Mineros', 'Licencias Ambientales', 'Consultas Previas']
        });
      }
      if (text.toLowerCase().includes('territorio') || text.toLowerCase().includes('predio')) {
        classifications.push({
          category: 'Derecho Territorial',
          confidence: 0.85,
          legal_basis: 'Ley 160 de 1994 - Reforma Agraria',
          description: 'Normativa sobre propiedad y uso del suelo',
          subcategories: ['Propiedad Rural', 'Zonas de Reserva', 'Uso del Suelo']
        });
      }
    }

    if (providerId === 'veeduria_ai') {
      if (text.toLowerCase().includes('veeduría') || text.toLowerCase().includes('control social')) {
        classifications.push({
          category: 'Veeduría Ciudadana',
          confidence: 0.90,
          legal_basis: 'Ley 850 de 2003',
          description: 'Mecanismo de control social a la gestión pública',
          subcategories: ['Control Fiscal', 'Control Político', 'Control Social']
        });
      }
      if (text.toLowerCase().includes('transparencia') || text.toLowerCase().includes('acceso a información')) {
        classifications.push({
          category: 'Transparencia y Acceso a la Información',
          confidence: 0.87,
          legal_basis: 'Ley 1712 de 2014',
          description: 'Derecho de acceso a la información pública',
          subcategories: ['Información Pública', 'Transparencia Activa', 'Transparencia Pasiva']
        });
      }
    }

    // Clasificaciones generales
    if (classifications.length === 0) {
      classifications.push({
        category: legal_area || 'Derecho General',
        confidence: 0.75,
        legal_basis: 'Normativa aplicable según el caso',
        description: 'Análisis general del texto legal',
        subcategories: ['Análisis General', 'Recomendaciones', 'Riesgos Legales']
      });
    }

    return classifications;
  }

  /**
   * Genera resumen basado en las clasificaciones
   */
  generateSummary(providerId, request, classifications) {
    const { text } = request;
    const provider = this.providers.get(providerId);
    
    let summary = `Análisis realizado por ${provider.name}: `;
    
    if (classifications.length > 0) {
      const mainCategory = classifications[0].category;
      summary += `Se identificó principalmente ${mainCategory} con una confianza del ${(classifications[0].confidence * 100).toFixed(1)}%. `;
      
      if (classifications.length > 1) {
        summary += `También se detectaron elementos de ${classifications.slice(1).map(c => c.category).join(', ')}. `;
      }
    }

    summary += `El texto presenta características legales que requieren atención especializada y análisis detallado por parte de un profesional del derecho.`;

    return summary;
  }

  /**
   * Genera recomendaciones basadas en el análisis
   */
  generateRecommendations(providerId, request, classifications) {
    const recommendations = [];

    if (providerId === 'constitutional_ai') {
      recommendations.push('Revisar procedibilidad de acción de tutela');
      recommendations.push('Verificar cumplimiento de requisitos constitucionales');
      recommendations.push('Evaluar necesidad de medidas cautelares');
    }

    if (providerId === 'territorial_ai') {
      recommendations.push('Verificar títulos de propiedad y derechos mineros');
      recommendations.push('Realizar consulta previa con comunidades');
      recommendations.push('Obtener licencias ambientales correspondientes');
    }

    if (providerId === 'veeduria_ai') {
      recommendations.push('Activar mecanismos de veeduría ciudadana');
      recommendations.push('Solicitar información pública relevante');
      recommendations.push('Establecer canales de participación ciudadana');
    }

    // Recomendaciones generales
    recommendations.push('Consultar con abogado especializado');
    recommendations.push('Revisar jurisprudencia actualizada');
    recommendations.push('Documentar todos los hechos y pruebas');

    return recommendations;
  }

  /**
   * Genera evaluación de riesgo
   */
  generateRiskAssessment(classifications) {
    const avgConfidence = classifications.reduce((sum, c) => sum + c.confidence, 0) / classifications.length;
    
    let level, score;
    if (avgConfidence >= 0.9) {
      level = 'low';
      score = 0.2;
    } else if (avgConfidence >= 0.7) {
      level = 'medium';
      score = 0.5;
    } else {
      level = 'high';
      score = 0.8;
    }

    return {
      level,
      score,
      factors: [
        'Complejidad del caso legal',
        'Disponibilidad de precedentes',
        'Claridad de la normativa aplicable'
      ],
      recommendations: [
        'Realizar análisis legal detallado',
        'Consultar con especialistas',
        'Preparar estrategia de defensa'
      ]
    };
  }

  /**
   * Crea resultado de error
   */
  createErrorResult(providerId, request, errorMessage) {
    return {
      ai_provider: providerId,
      classifications: [],
      summary: 'Error en el análisis',
      confidence_score: 0,
      processing_time: 0,
      recommendations: [],
      timestamp: new Date().toISOString(),
      status: 'error',
      error_message: errorMessage
    };
  }
}

// Instancia singleton
export const unifiedAIService = new UnifiedAIService();
export default unifiedAIService;