# Módulos de IA (Backend y Frontend)

## Backend (Laravel)
- Servicio: `app/Services/IAService.php`
  - Funciones: analizarJuridico, analizarCasoEtnico, analizarVeeduriaCiudadana
  - Capa de proveedores: OpenAI/Anthropic (según `config/ai.php`)
  - Cache, rate limiting y seguridad: API Keys vía .env, coste por token

## Frontend (React)
- Servicio unificado: `src/services/ia/UnifiedAIService.js`
  - quickAnalyze(text, legal_area, jurisdiction)
  - analyzeWithMultipleProviders([...ids], request)

## Flujos Clave
- Denuncia/Hallazgos (PAE): paso guiado de IA antes de PDF
- Acta CAE: IA opcional para resumen/temas críticos
- Alertas Tempranas: reglas + enriquecimiento IA (job programado)

## Prompts Base
- Jurídico: clasificación de caso, normativa aplicable, recomendaciones
- Étnico: compatibilidad cultural y recomendaciones por comunidad
- Veeduría: riesgos, obligaciones, acciones de control social
