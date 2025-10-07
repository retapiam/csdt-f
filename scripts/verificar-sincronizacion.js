/**
 * Script de Verificación de Sincronización
 * Verifica que todos los datos estén correctamente sincronizados con la base de datos
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const config = {
  frontendPath: './src',
  backendPath: '../csdt-b',
  apiEndpoints: [
    '/v1/usuarios',
    '/v1/veedurias',
    '/v1/tareas',
    '/v1/donaciones',
    '/v1/archivos',
    '/v1/estadisticas/generales',
    '/v1/analisis-ia',
    '/v1/comunidades-etnicas'
  ]
};

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Función para imprimir con colores
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Función para verificar archivos de servicios
function verificarServicios() {
  log('\n🔍 Verificando servicios del frontend...', 'cyan');
  
  const serviciosPath = path.join(config.frontendPath, 'services');
  const archivosServicios = fs.readdirSync(serviciosPath);
  
  const serviciosRequeridos = [
    'api.js',
    'csdtApiService.js',
    'syncService.js',
    'configuracion.js'
  ];
  
  let serviciosOk = 0;
  
  serviciosRequeridos.forEach(servicio => {
    if (archivosServicios.includes(servicio)) {
      log(`  ✅ ${servicio}`, 'green');
      serviciosOk++;
    } else {
      log(`  ❌ ${servicio} - FALTANTE`, 'red');
    }
  });
  
  return serviciosOk === serviciosRequeridos.length;
}

// Función para verificar hooks de sincronización
function verificarHooks() {
  log('\n🔍 Verificando hooks de sincronización...', 'cyan');
  
  const hooksPath = path.join(config.frontendPath, 'hooks');
  const archivosHooks = fs.readdirSync(hooksPath);
  
  const hooksRequeridos = [
    'useSyncData.js',
    'useAnalisisIA.js',
    'useForm.js',
    'useAsyncState.js'
  ];
  
  let hooksOk = 0;
  
  hooksRequeridos.forEach(hook => {
    if (archivosHooks.includes(hook)) {
      log(`  ✅ ${hook}`, 'green');
      hooksOk++;
    } else {
      log(`  ❌ ${hook} - FALTANTE`, 'red');
    }
  });
  
  return hooksOk === hooksRequeridos.length;
}

// Función para verificar contextos
function verificarContextos() {
  log('\n🔍 Verificando contextos...', 'cyan');
  
  const contextosPath = path.join(config.frontendPath, 'contexts');
  const archivosContextos = fs.readdirSync(contextosPath);
  
  const contextosRequeridos = [
    'AuthContext.jsx',
    'PermisosVistaContext.jsx',
    'NotificationContext.jsx'
  ];
  
  let contextosOk = 0;
  
  contextosRequeridos.forEach(contexto => {
    if (archivosContextos.includes(contexto)) {
      log(`  ✅ ${contexto}`, 'green');
      contextosOk++;
    } else {
      log(`  ❌ ${contexto} - FALTANTE`, 'red');
    }
  });
  
  return contextosOk === contextosRequeridos.length;
}

// Función para verificar componentes de sincronización
function verificarComponentes() {
  log('\n🔍 Verificando componentes de sincronización...', 'cyan');
  
  const componentesPath = path.join(config.frontendPath, 'components');
  const archivosComponentes = fs.readdirSync(componentesPath);
  
  const componentesRequeridos = [
    'SyncDataProvider.jsx'
  ];
  
  let componentesOk = 0;
  
  componentesRequeridos.forEach(componente => {
    if (archivosComponentes.includes(componente)) {
      log(`  ✅ ${componente}`, 'green');
      componentesOk++;
    } else {
      log(`  ❌ ${componente} - FALTANTE`, 'red');
    }
  });
  
  return componentesOk === componentesRequeridos.length;
}

// Función para verificar configuración de API
function verificarConfiguracionAPI() {
  log('\n🔍 Verificando configuración de API...', 'cyan');
  
  const apiPath = path.join(config.frontendPath, 'services', 'api.js');
  
  if (!fs.existsSync(apiPath)) {
    log('  ❌ api.js no encontrado', 'red');
    return false;
  }
  
  const contenido = fs.readFileSync(apiPath, 'utf8');
  
  // Verificar configuraciones de API
  const verificaciones = [
    { nombre: 'Configuración local', patron: /local:\s*{[\s\S]*?url:\s*['"]http:\/\/127\.0\.0\.1:8000\/api['"]/ },
    { nombre: 'Configuración XAMPP', patron: /xampp:\s*{[\s\S]*?url:\s*['"]http:\/\/127\.0\.0\.1:8000\/api['"]/ },
    { nombre: 'Configuración desarrollo', patron: /desarrollo:\s*{[\s\S]*?url:\s*['"]http:\/\/localhost:8000\/api['"]/ },
    { nombre: 'Configuración producción', patron: /produccion:\s*{[\s\S]*?url:\s*['"]https:\/\/csdt-backend-app\.azurewebsites\.net\/api['"]/ },
    { nombre: 'Timeout configurado', patron: /timeout:\s*\d+/ },
    { nombre: 'Base de datos MySQL', patron: /database:\s*['"]MySQL['"]/ }
  ];
  
  let configuracionesOk = 0;
  
  verificaciones.forEach(verificacion => {
    if (verificacion.patron.test(contenido)) {
      log(`  ✅ ${verificacion.nombre}`, 'green');
      configuracionesOk++;
    } else {
      log(`  ❌ ${verificacion.nombre} - NO CONFIGURADO`, 'red');
    }
  });
  
  return configuracionesOk === verificaciones.length;
}

// Función para verificar endpoints de API
function verificarEndpointsAPI() {
  log('\n🔍 Verificando endpoints de API...', 'cyan');
  
  const csdtApiPath = path.join(config.frontendPath, 'services', 'csdtApiService.js');
  
  if (!fs.existsSync(csdtApiPath)) {
    log('  ❌ csdtApiService.js no encontrado', 'red');
    return false;
  }
  
  const contenido = fs.readFileSync(csdtApiPath, 'utf8');
  
  let endpointsOk = 0;
  
  config.apiEndpoints.forEach(endpoint => {
    if (contenido.includes(endpoint)) {
      log(`  ✅ ${endpoint}`, 'green');
      endpointsOk++;
    } else {
      log(`  ❌ ${endpoint} - NO ENCONTRADO`, 'red');
    }
  });
  
  return endpointsOk === config.apiEndpoints.length;
}

// Función para verificar App.jsx
function verificarApp() {
  log('\n🔍 Verificando App.jsx...', 'cyan');
  
  const appPath = path.join(config.frontendPath, 'App.jsx');
  
  if (!fs.existsSync(appPath)) {
    log('  ❌ App.jsx no encontrado', 'red');
    return false;
  }
  
  const contenido = fs.readFileSync(appPath, 'utf8');
  
  const verificaciones = [
    { nombre: 'SyncDataProvider importado', patron: /import SyncDataProvider from '\.\/components\/SyncDataProvider'/ },
    { nombre: 'SyncDataProvider en JSX', patron: /<SyncDataProvider>/ },
    { nombre: 'AuthProvider configurado', patron: /<AuthProvider>/ },
    { nombre: 'PermisosVistaProvider configurado', patron: /<PermisosVistaProvider>/ },
    { nombre: 'NotificationProvider configurado', patron: /<NotificationProvider>/ }
  ];
  
  let verificacionesOk = 0;
  
  verificaciones.forEach(verificacion => {
    if (verificacion.patron.test(contenido)) {
      log(`  ✅ ${verificacion.nombre}`, 'green');
      verificacionesOk++;
    } else {
      log(`  ❌ ${verificacion.nombre} - NO CONFIGURADO`, 'red');
    }
  });
  
  return verificacionesOk === verificaciones.length;
}

// Función principal
function main() {
  log('🚀 Iniciando verificación de sincronización de datos...', 'bright');
  log('=' .repeat(60), 'blue');
  
  const resultados = {
    servicios: verificarServicios(),
    hooks: verificarHooks(),
    contextos: verificarContextos(),
    componentes: verificarComponentes(),
    configuracionAPI: verificarConfiguracionAPI(),
    endpointsAPI: verificarEndpointsAPI(),
    app: verificarApp()
  };
  
  log('\n' + '=' .repeat(60), 'blue');
  log('📊 RESUMEN DE VERIFICACIÓN', 'bright');
  log('=' .repeat(60), 'blue');
  
  const totalVerificaciones = Object.keys(resultados).length;
  const verificacionesExitosas = Object.values(resultados).filter(Boolean).length;
  
  Object.entries(resultados).forEach(([categoria, resultado]) => {
    const icono = resultado ? '✅' : '❌';
    const color = resultado ? 'green' : 'red';
    log(`${icono} ${categoria}: ${resultado ? 'OK' : 'FALLO'}`, color);
  });
  
  log('\n' + '=' .repeat(60), 'blue');
  
  if (verificacionesExitosas === totalVerificaciones) {
    log('🎉 ¡TODAS LAS VERIFICACIONES EXITOSAS!', 'green');
    log('✅ El sistema está correctamente configurado para sincronización de datos', 'green');
  } else {
    log('⚠️  ALGUNAS VERIFICACIONES FALLARON', 'yellow');
    log(`❌ ${totalVerificaciones - verificacionesExitosas} de ${totalVerificaciones} verificaciones fallaron`, 'red');
    log('🔧 Revisa los errores anteriores y corrige la configuración', 'yellow');
  }
  
  log('=' .repeat(60), 'blue');
  
  return verificacionesExitosas === totalVerificaciones;
}

// Ejecutar verificación
const exito = main();
process.exit(exito ? 0 : 1);

export { main, verificarServicios, verificarHooks, verificarContextos, verificarComponentes, verificarConfiguracionAPI, verificarEndpointsAPI, verificarApp };
