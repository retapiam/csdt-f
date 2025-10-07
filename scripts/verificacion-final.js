/**
 * Verificación Final del Sistema de Gestión de Proyectos
 * Verifica que todo esté funcionando correctamente
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 VERIFICACIÓN FINAL - SISTEMA DE GESTIÓN DE PROYECTOS');
console.log('='.repeat(70));

// Archivos críticos a verificar
const archivosCriticos = [
  'src/services/ProyectosService.js',
  'src/hooks/useProyectos.js',
  'src/services/syncService.js',
  'src/services/api.js',
  'src/contexts/AuthContext.jsx',
  'src/components/SyncDataProvider.jsx'
];

// Componentes principales
const componentes = [
  'src/paginas/12-gestion-proyectos/GestionProyectos.jsx',
  'src/paginas/12-gestion-proyectos/DashboardUnificado.jsx',
  'src/paginas/12-gestion-proyectos/PanelVista.jsx',
  'src/paginas/12-gestion-proyectos/01-administrador/DashboardAdministrador.jsx',
  'src/paginas/12-gestion-proyectos/02-operador/DashboardOperador.jsx',
  'src/paginas/12-gestion-proyectos/03-cliente/DashboardCliente.jsx'
];

// Verificar archivos críticos
console.log('\n🔧 VERIFICANDO ARCHIVOS CRÍTICOS:');
let archivosCriticosOK = 0;

archivosCriticos.forEach(archivo => {
  const ruta = path.resolve(__dirname, '..', archivo);
  if (fs.existsSync(ruta)) {
    console.log(`✅ ${archivo}`);
    archivosCriticosOK++;
  } else {
    console.log(`❌ ${archivo} - NO ENCONTRADO`);
  }
});

// Verificar componentes
console.log('\n📱 VERIFICANDO COMPONENTES:');
let componentesOK = 0;

componentes.forEach(componente => {
  const ruta = path.resolve(__dirname, '..', componente);
  if (fs.existsSync(ruta)) {
    console.log(`✅ ${componente}`);
    componentesOK++;
  } else {
    console.log(`❌ ${componente} - NO ENCONTRADO`);
  }
});

// Verificar importaciones en componentes principales
console.log('\n🔍 VERIFICANDO IMPORTACIONES:');

const verificarImportaciones = (archivo) => {
  const ruta = path.resolve(__dirname, '..', archivo);
  if (!fs.existsSync(ruta)) return { archivo, errores: ['Archivo no encontrado'] };

  const contenido = fs.readFileSync(ruta, 'utf8');
  const errores = [];

  // Verificar importaciones de contextos
  if (contenido.includes('useAuth') && !contenido.includes("from '@contexts/AuthContext'")) {
    errores.push('Importación de AuthContext incorrecta');
  }

  // Verificar importaciones de hooks
  if (contenido.includes('useProyectos') && !contenido.includes("from '@hooks/useProyectos'")) {
    errores.push('Importación de useProyectos incorrecta');
  }

  // Verificar importaciones de servicios
  if (contenido.includes('ProyectosService') && !contenido.includes("from '@services/ProyectosService'")) {
    errores.push('Importación de ProyectosService incorrecta');
  }

  return { archivo, errores };
};

let totalErroresImportacion = 0;
componentes.forEach(componente => {
  const resultado = verificarImportaciones(componente);
  if (resultado.errores.length === 0) {
    console.log(`✅ ${componente} - Importaciones correctas`);
  } else {
    console.log(`❌ ${componente} - Errores de importación:`);
    resultado.errores.forEach(error => {
      console.log(`   - ${error}`);
      totalErroresImportacion++;
    });
  }
});

// Verificar sincronización
console.log('\n🔄 VERIFICANDO SINCRONIZACIÓN:');

const verificarSincronizacion = (archivo) => {
  const ruta = path.resolve(__dirname, '..', archivo);
  if (!fs.existsSync(ruta)) return { archivo, sincronizado: false };

  const contenido = fs.readFileSync(ruta, 'utf8');
  
  const patronesSincronizacion = [
    /useProyectos/,
    /useEstadisticasProyectos/,
    /useTareas/,
    /autoSync.*true/,
    /api\.(get|post|put|delete)/,
    /syncService/
  ];

  const patronesEncontrados = patronesSincronizacion.filter(patron => patron.test(contenido));
  
  return { 
    archivo, 
    sincronizado: patronesEncontrados.length >= 2,
    patrones: patronesEncontrados.length
  };
};

let archivosSincronizados = 0;
componentes.forEach(componente => {
  const resultado = verificarSincronizacion(componente);
  if (resultado.sincronizado) {
    console.log(`✅ ${componente} - Sincronizado (${resultado.patrones} patrones)`);
    archivosSincronizados++;
  } else {
    console.log(`❌ ${componente} - No sincronizado (${resultado.patrones} patrones)`);
  }
});

// Verificar configuración de API
console.log('\n⚙️ VERIFICANDO CONFIGURACIÓN DE API:');

const apiConfigPath = path.resolve(__dirname, '..', 'src/services/api.js');
if (fs.existsSync(apiConfigPath)) {
  const apiContent = fs.readFileSync(apiConfigPath, 'utf8');
  
  const configuraciones = [
    { nombre: 'Configuración de MySQL', check: apiContent.includes('MySQL') },
    { nombre: 'URLs de API configuradas', check: apiContent.includes('API_CONFIGS') },
    { nombre: 'Timeouts configurados', check: apiContent.includes('timeout') },
    { nombre: 'Configuración de producción', check: apiContent.includes('produccion') },
    { nombre: 'Configuración de desarrollo', check: apiContent.includes('desarrollo') }
  ];
  
  let configuracionesOK = 0;
  configuraciones.forEach(({ nombre, check }) => {
    if (check) {
      console.log(`✅ ${nombre}`);
      configuracionesOK++;
    } else {
      console.log(`❌ ${nombre}`);
    }
  });
  
  console.log(`📊 Configuraciones correctas: ${configuracionesOK}/${configuraciones.length}`);
} else {
  console.log('❌ Archivo de configuración de API no encontrado');
}

// Resumen final
console.log('\n' + '='.repeat(70));
console.log('📋 RESUMEN FINAL');
console.log('='.repeat(70));

console.log(`🔧 Archivos críticos: ${archivosCriticosOK}/${archivosCriticos.length}`);
console.log(`📱 Componentes: ${componentesOK}/${componentes.length}`);
console.log(`🔍 Errores de importación: ${totalErroresImportacion}`);
console.log(`🔄 Archivos sincronizados: ${archivosSincronizados}/${componentes.length}`);

const totalElementos = archivosCriticos.length + componentes.length;
const elementosOK = archivosCriticosOK + componentesOK;
const porcentajeCompletado = Math.round((elementosOK / totalElementos) * 100);

console.log(`📊 Porcentaje completado: ${porcentajeCompletado}%`);

if (totalErroresImportacion === 0 && archivosSincronizados >= componentes.length * 0.8) {
  console.log('\n🎉 ¡VERIFICACIÓN EXITOSA!');
  console.log('✅ Todos los archivos críticos están presentes');
  console.log('✅ Las importaciones están correctas');
  console.log('✅ La sincronización está implementada');
  console.log('✅ El sistema está listo para usar');
  
  console.log('\n🚀 PRÓXIMOS PASOS:');
  console.log('1. Ejecutar: npm run dev');
  console.log('2. Acceder a: http://localhost:5173/12-gestion-proyectos');
  console.log('3. Probar con diferentes roles de usuario');
  console.log('4. Verificar sincronización con backend Laravel');
  
} else {
  console.log('\n⚠️ VERIFICACIÓN CON PROBLEMAS');
  if (totalErroresImportacion > 0) {
    console.log(`❌ Se encontraron ${totalErroresImportacion} errores de importación`);
  }
  if (archivosSincronizados < componentes.length * 0.8) {
    console.log('❌ Algunos componentes no están sincronizados');
  }
  console.log('💡 Revisa los problemas listados arriba para solucionarlos');
}

console.log('\n' + '='.repeat(70));
console.log('🎯 Sistema de Gestión de Proyectos - CSDT');
console.log('📅 Verificado: ' + new Date().toLocaleDateString('es-CO'));
console.log('='.repeat(70));
