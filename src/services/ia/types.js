// Tipos comunes para todas las IAs legales
export const legalAreas = [
  'Derecho Constitucional',
  'Derecho Penal',
  'Derecho Civil',
  'Derecho Administrativo',
  'Derecho Laboral',
  'Derecho Ambiental',
  'Derecho Minero',
  'Derecho Urbanístico',
  'Derecho Contractual',
  'Derecho Tributario',
  'Derecho de Familia',
  'Derecho Comercial',
  'Derecho Procesal',
  'Derecho Internacional',
  'Derecho de Veeduría Ciudadana'
];

export const jurisdictions = [
  'colombia',
  'estados_unidos',
  'espana',
  'mexico',
  'internacional',
  'latinoamerica'
];

export const getJurisdictionLabel = (jurisdiction) => {
  const labels = {
    'colombia': 'Colombia',
    'estados_unidos': 'Estados Unidos',
    'espana': 'España',
    'mexico': 'México',
    'internacional': 'Internacional',
    'latinoamerica': 'Latinoamérica'
  };
  return labels[jurisdiction] || jurisdiction;
};

export const getLegalAreaLabel = (area) => {
  const labels = {
    'Derecho Constitucional': 'Derecho Constitucional',
    'Derecho Penal': 'Derecho Penal',
    'Derecho Civil': 'Derecho Civil',
    'Derecho Administrativo': 'Derecho Administrativo',
    'Derecho Laboral': 'Derecho Laboral',
    'Derecho Ambiental': 'Derecho Ambiental',
    'Derecho Minero': 'Derecho Minero',
    'Derecho Urbanístico': 'Derecho Urbanístico',
    'Derecho Contractual': 'Derecho Contractual',
    'Derecho Tributario': 'Derecho Tributario',
    'Derecho de Familia': 'Derecho de Familia',
    'Derecho Comercial': 'Derecho Comercial',
    'Derecho Procesal': 'Derecho Procesal',
    'Derecho Internacional': 'Derecho Internacional',
    'Derecho de Veeduría Ciudadana': 'Derecho de Veeduría Ciudadana'
  };
  return labels[area] || area;
};

export const AI_PROVIDERS = {
  lexisnexis: {
    id: 'lexisnexis',
    name: 'LexisNexis AI',
    description: 'Clasificación inteligente de texto legal con tecnología avanzada de machine learning',
    capabilities: ['classification', 'risk-assessment', 'recommendations', 'multi-jurisdiction'],
    supported_jurisdictions: ['colombia', 'estados_unidos', 'espana', 'mexico', 'internacional'],
    supported_languages: ['es', 'en'],
    is_active: true,
    version: '2.1.0',
    pricing_tier: 'premium',
    icon: '⚖️',
    color: 'blue'
  },
  legal_ai_library: {
    id: 'legal_ai_library',
    name: 'Legal AI Library',
    description: 'Biblioteca especializada en análisis jurídico con modelos de lenguaje avanzados',
    capabilities: ['classification', 'sentiment-analysis', 'contract-review', 'compliance-check'],
    supported_jurisdictions: ['colombia', 'estados_unidos', 'espana', 'internacional'],
    supported_languages: ['es', 'en', 'pt'],
    is_active: true,
    version: '1.8.2',
    pricing_tier: 'basic',
    icon: '📚',
    color: 'green'
  },
  territorial_ai: {
    id: 'territorial_ai',
    name: 'Territorial AI',
    description: 'IA especializada en análisis territorial, minero y de veeduría ciudadana',
    capabilities: ['territorial-analysis', 'mining-rights', 'environmental-impact', 'community-rights'],
    supported_jurisdictions: ['colombia', 'latinoamerica'],
    supported_languages: ['es'],
    is_active: true,
    version: '1.0.0',
    pricing_tier: 'enterprise',
    icon: '🗺️',
    color: 'purple'
  },
  veeduria_ai: {
    id: 'veeduria_ai',
    name: 'Veeduría AI',
    description: 'IA especializada en control social, transparencia y participación ciudadana',
    capabilities: ['social-control', 'transparency', 'citizen-participation', 'public-oversight'],
    supported_jurisdictions: ['colombia', 'latinoamerica'],
    supported_languages: ['es'],
    is_active: true,
    version: '1.0.0',
    pricing_tier: 'enterprise',
    icon: '👁️',
    color: 'orange'
  },
  constitutional_ai: {
    id: 'constitutional_ai',
    name: 'Constitutional AI',
    description: 'IA especializada en derecho constitucional y derechos fundamentales',
    capabilities: ['constitutional-analysis', 'fundamental-rights', 'tutela-analysis', 'constitutional-review'],
    supported_jurisdictions: ['colombia', 'latinoamerica'],
    supported_languages: ['es'],
    is_active: true,
    version: '1.0.0',
    pricing_tier: 'premium',
    icon: '👑',
    color: 'indigo'
  }
};

export const getProviderIcon = (providerId) => {
  return AI_PROVIDERS[providerId]?.icon || '🤖';
};

export const getProviderColor = (providerId) => {
  return AI_PROVIDERS[providerId]?.color || 'gray';
};

export const getProviderTierColor = (tier) => {
  const colors = {
    'free': 'green',
    'basic': 'blue',
    'premium': 'purple',
    'enterprise': 'indigo'
  };
  return colors[tier] || 'gray';
};