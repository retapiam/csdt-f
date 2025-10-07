// Configuración del sistema CSDT - Desarrollo Local
const config = {
  // URL del backend - Configuración local
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  // ConfiguraciÃ³n de la aplicaciÃ³n
  appName: 'CONSEJO SOCIAL DE VEEDURÃA Y DESARROLLO TERRITORIAL',
  environment: 'development',
  
  // URLs de la aplicación - Desarrollo Local
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  frontendUrl: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  
  // ConfiguraciÃ³n de timeout para requests
  requestTimeout: 30000,
  
  // ConfiguraciÃ³n de paginaciÃ³n
  defaultPageSize: 10,
  
  // ConfiguraciÃ³n de archivos
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
};

export default config;
