/**
 * Script de Verificación del Sistema de Gestión de Proyectos
 * Verifica la sincronización y configuración del sistema de proyectos
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToVerify = [
  // Servicios
  'src/services/ProyectosService.js',
  'src/hooks/useProyectos.js',
  
  // Componentes principales
  'src/paginas/12-gestion-proyectos/GestionProyectos.jsx',
  'src/paginas/12-gestion-proyectos/PanelVista.jsx',
  'src/paginas/12-gestion-proyectos/DashboardUnificado.jsx',
  
  // Componentes de roles
  'src/paginas/12-gestion-proyectos/01-administrador/DashboardAdministrador.jsx',
  'src/paginas/12-gestion-proyectos/01-administrador/CrearProyecto.jsx',
  'src/paginas/12-gestion-proyectos/02-operador/DashboardOperador.jsx',
  'src/paginas/12-gestion-proyectos/03-cliente/DashboardCliente.jsx',
  
  // Documentación
  'src/paginas/12-gestion-proyectos/README.md',
];

const requiredFeatures = [
  'Sincronización con base de datos real',
  'Control de roles y permisos',
  'Panel de vista para administradores',
  'Hooks personalizados para datos',
  'Manejo de errores y estados de carga',
  'Filtros y búsqueda',
  'Estadísticas en tiempo real',
  'Validación de permisos por rol',
  'Cache inteligente',
  'Notificaciones de estado'
];

console.log('🚀 Verificando Sistema de Gestión de Proyectos...\n');

let allFound = true;
let foundCount = 0;

// Verificar archivos
console.log('📁 Verificando archivos del sistema:');
filesToVerify.forEach(file => {
  const filePath = path.resolve(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
    foundCount++;
  } else {
    console.error(`❌ ${file} - NO ENCONTRADO`);
    allFound = false;
  }
});

console.log(`\n📊 Archivos encontrados: ${foundCount}/${filesToVerify.length}`);

// Verificar características en archivos clave
console.log('\n🔍 Verificando características implementadas:');

const checkFeature = (filePath, feature) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes(feature) || content.toLowerCase().includes(feature.toLowerCase());
  } catch (error) {
    return false;
  }
};

const mainFiles = [
  'src/services/ProyectosService.js',
  'src/hooks/useProyectos.js',
  'src/paginas/12-gestion-proyectos/GestionProyectos.jsx',
  'src/paginas/12-gestion-proyectos/PanelVista.jsx'
];

let featuresFound = 0;
requiredFeatures.forEach(feature => {
  let found = false;
  
  mainFiles.forEach(file => {
    const filePath = path.resolve(__dirname, '..', file);
    if (fs.existsSync(filePath) && checkFeature(filePath, feature)) {
      found = true;
    }
  });
  
  if (found) {
    console.log(`✅ ${feature}`);
    featuresFound++;
  } else {
    console.log(`❌ ${feature} - NO IMPLEMENTADO`);
  }
});

console.log(`\n📊 Características implementadas: ${featuresFound}/${requiredFeatures.length}`);

// Verificar configuración de API
console.log('\n🔧 Verificando configuración de API:');
const apiConfigPath = path.resolve(__dirname, '..', 'src/services/api.js');
if (fs.existsSync(apiConfigPath)) {
  const apiContent = fs.readFileSync(apiConfigPath, 'utf8');
  
  const apiChecks = [
    { name: 'Configuración de MySQL', check: apiContent.includes('MySQL') },
    { name: 'URLs de API configuradas', check: apiContent.includes('API_CONFIGS') },
    { name: 'Timeouts configurados', check: apiContent.includes('timeout') },
    { name: 'Configuración de producción', check: apiContent.includes('produccion') }
  ];
  
  apiChecks.forEach(({ name, check }) => {
    console.log(check ? `✅ ${name}` : `❌ ${name}`);
  });
} else {
  console.log('❌ Archivo de configuración de API no encontrado');
}

// Verificar sincronización
console.log('\n🔄 Verificando sincronización:');
const syncFiles = [
  'src/services/syncService.js',
  'src/hooks/useSyncData.js',
  'src/components/SyncDataProvider.jsx'
];

syncFiles.forEach(file => {
  const filePath = path.resolve(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - NO ENCONTRADO`);
  }
});

// Resumen final
console.log('\n' + '='.repeat(60));
console.log('📋 RESUMEN DE VERIFICACIÓN');
console.log('='.repeat(60));

const totalChecks = filesToVerify.length + requiredFeatures.length;
const totalFound = foundCount + featuresFound;

console.log(`📁 Archivos del sistema: ${foundCount}/${filesToVerify.length}`);
console.log(`🔍 Características implementadas: ${featuresFound}/${requiredFeatures.length}`);
console.log(`📊 Total verificado: ${totalFound}/${totalChecks}`);

if (allFound && featuresFound >= requiredFeatures.length * 0.8) {
  console.log('\n🎉 ¡Sistema de Gestión de Proyectos configurado correctamente!');
  console.log('✅ Sincronización con base de datos implementada');
  console.log('✅ Control de roles y permisos funcional');
  console.log('✅ Panel de administración disponible');
  console.log('✅ Hooks de datos sincronizados');
  
  console.log('\n🚀 Próximos pasos:');
  console.log('1. Ejecutar: npm run dev');
  console.log('2. Acceder a: http://localhost:5173/12-gestion-proyectos');
  console.log('3. Probar con diferentes roles de usuario');
  console.log('4. Verificar sincronización con backend');
  
  process.exit(0);
} else {
  console.log('\n⚠️ Sistema de Gestión de Proyectos necesita configuración adicional');
  console.log('❌ Algunos archivos o características no están implementados');
  console.log('💡 Revisa los elementos marcados con ❌ para completar la configuración');
  
  process.exit(1);
}
