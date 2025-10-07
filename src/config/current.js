// Configuración para desarrollo local
export const config = {
  // URLs del sistema
  apiUrl: 'http://127.0.0.1:8000/api',
  backendUrl: 'http://127.0.0.1:8000',
  frontendUrl: 'http://localhost:5173',
  
  // Configuración de la aplicación
  appName: 'CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL',
  environment: 'development',
  version: '2.0.0',
  
  // Configuración de base de datos
  database: {
    type: 'SQLite',
    description: 'Base de datos local para desarrollo rápido'
  },
  
  // Configuración de timeout para requests
  requestTimeout: 10000,
  
  // Configuración de paginación
  defaultPageSize: 10,
  
  // Configuración de archivos
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  
  // Configuración de desarrollo
  development: {
    enableHotReload: true,
    enableDebugMode: true,
    enableLogging: true
  }
};

export default config;
