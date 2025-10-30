/**
 * 🤖 Configuración del Sistema de IA para Testing
 * 
 * Soporta múltiples proveedores de IA:
 * - OpenAI (GPT-4, GPT-3.5) - Pago por uso
 * - Claude (Anthropic) - Pago por uso
 * - Ollama (Local) - GRATIS - Requiere instalación local
 */

export const AI_CONFIG = {
  // Proveedor de IA a usar: 'openai', 'claude', 'ollama'
  provider: process.env.AI_PROVIDER || 'ollama', // Por defecto usa Ollama (gratis)
  
  // Configuración OpenAI
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o-mini', // Más económico pero potente
    maxTokens: 4000,
    temperature: 0.3, // Baja para respuestas más consistentes
  },
  
  // Configuración Claude
  claude: {
    apiKey: process.env.CLAUDE_API_KEY || '',
    model: 'claude-3-5-sonnet-20241022',
    maxTokens: 4000,
    temperature: 0.3,
  },
  
  // Configuración Ollama (Local - GRATIS)
  ollama: {
    baseUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
    model: 'qwen2.5-coder:7b', // Modelo especializado en código
    temperature: 0.3,
  },
};

// Configuración de Playwright
export const PLAYWRIGHT_CONFIG = {
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:5173',
  testDir: './tests/e2e',
  timeout: 30000,
  retries: 2,
};

// Configuración de análisis de código
export const ANALYSIS_CONFIG = {
  // Extensiones de archivo a analizar
  extensions: {
    frontend: ['.jsx', '.js', '.tsx', '.ts'],
    backend: ['.php'],
  },
  
  // Directorios a excluir del análisis
  exclude: [
    'node_modules',
    'vendor',
    'dist',
    'build',
    '.git',
    'tests',
    'testsprite_tests',
  ],
  
  // Límite de archivos a analizar por solicitud
  maxFilesPerAnalysis: 10,
};

// Prompts para la IA
export const AI_PROMPTS = {
  analyzeComponent: `Analiza el siguiente componente React y genera tests E2E con Playwright.

REQUISITOS:
1. Tests que cubran funcionalidad principal
2. Tests para casos edge
3. Tests de interacciones de usuario
4. Tests de validaciones
5. Usar sintaxis de Playwright moderna
6. Incluir expect() apropiados
7. Usar selectores estables (data-testid preferiblemente)

Componente:
{code}

Genera solo el código de test, sin explicaciones adicionales.`,

  analyzePage: `Analiza la siguiente página React y genera un plan de tests completo.

REQUISITOS:
1. Identificar todos los elementos interactivos
2. Identificar flujos de usuario principales
3. Identificar validaciones y casos edge
4. Generar tests E2E con Playwright
5. Incluir tests de accesibilidad básicos

Código de la página:
{code}

Genera el código de test completo con Playwright.`,

  analyzeAPI: `Analiza el siguiente controlador Laravel y genera tests.

REQUISITOS:
1. Tests para cada endpoint
2. Tests de validación
3. Tests de autenticación/autorización
4. Tests de casos edge
5. Usar PHPUnit

Controlador:
{code}

Genera los tests de PHPUnit completos.`,

  fixFailingTest: `El siguiente test está fallando. Analiza el error y sugiere una corrección.

TEST FALLIDO:
{testCode}

ERROR:
{error}

CÓDIGO DE LA APLICACIÓN:
{appCode}

Genera el test corregido y explica brevemente qué cambió.`,

  generateTestData: `Genera datos de prueba realistas para el siguiente caso de uso:

{description}

Estructura:
{schema}

Genera un objeto JavaScript con datos de prueba realistas.`,
};

// Configuración de reportes
export const REPORT_CONFIG = {
  outputDir: './ai-testing/reports',
  format: 'markdown', // 'markdown', 'json', 'html'
  includeTimestamp: true,
};


