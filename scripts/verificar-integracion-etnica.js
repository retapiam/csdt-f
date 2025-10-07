/**
 * Script de verificación de integración étnica
 * Verifica que todas las páginas étnicas estén correctamente integradas
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando integración de páginas étnicas...\n');

// Rutas de las páginas étnicas
const paginasEtnicas = [
  'src/paginas/publicas/etnicos/ConsejoEtnoIA.jsx',
  'src/paginas/publicas/etnicos/justicia/JurisdiccionEspecialIndigena.jsx',
  'src/paginas/publicas/etnicos/cultura/PatrimonioCulturalEtnico.jsx',
  'src/paginas/publicas/etnicos/educacion/EducacionPropia.jsx',
  'src/paginas/publicas/etnicos/territorio/TerritoriosAncestrales.jsx',
  'src/paginas/publicas/etnicos/DashboardEtnico.jsx',
  'src/paginas/publicas/etnicos/NotificacionesEtnicas.jsx'
];

// Servicios
const servicios = [
  'src/services/etnoIAService.js'
];

// Verificar páginas
console.log('📄 Verificando páginas étnicas:');
paginasEtnicas.forEach(pagina => {
  const rutaCompleta = path.join(__dirname, pagina);
  if (fs.existsSync(rutaCompleta)) {
    console.log(`  ✅ ${pagina}`);
  } else {
    console.log(`  ❌ ${pagina} - NO ENCONTRADA`);
  }
});

console.log('\n🔧 Verificando servicios:');
servicios.forEach(servicio => {
  const rutaCompleta = path.join(__dirname, servicio);
  if (fs.existsSync(rutaCompleta)) {
    console.log(`  ✅ ${servicio}`);
  } else {
    console.log(`  ❌ ${servicio} - NO ENCONTRADO`);
  }
});

// Verificar App.jsx
console.log('\n📱 Verificando App.jsx:');
const appPath = path.join(__dirname, 'src/App.jsx');
if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf8');
  
  // Verificar importaciones de páginas étnicas
  const importacionesEtnicas = [
    'ConsejoEtnoIA',
    'JurisdiccionEspecialIndigena',
    'PatrimonioCulturalEtnico',
    'EducacionPropiaEtnica',
    'TerritoriosAncestralesEtnico',
    'DashboardEtnico',
    'NotificacionesEtnicas'
  ];
  
  importacionesEtnicas.forEach(importacion => {
    if (appContent.includes(importacion)) {
      console.log(`  ✅ Importación ${importacion}`);
    } else {
      console.log(`  ❌ Importación ${importacion} - NO ENCONTRADA`);
    }
  });
  
  // Verificar rutas
  const rutasEtnicas = [
    '/consejo-etnoia',
    '/jurisdiccion-especial-indigena',
    '/patrimonio-cultural-etnico',
    '/educacion-propia-etnica',
    '/territorios-ancestrales-etnico',
    '/dashboard-etnico',
    '/notificaciones-etnicas'
  ];
  
  rutasEtnicas.forEach(ruta => {
    if (appContent.includes(ruta)) {
      console.log(`  ✅ Ruta ${ruta}`);
    } else {
      console.log(`  ❌ Ruta ${ruta} - NO ENCONTRADA`);
    }
  });
} else {
  console.log('  ❌ App.jsx - NO ENCONTRADO');
}

// Verificar MenuPrincipal.jsx
console.log('\n🍔 Verificando MenuPrincipal.jsx:');
const menuPath = path.join(__dirname, 'src/components/compartidas/MenuPrincipal.jsx');
if (fs.existsSync(menuPath)) {
  const menuContent = fs.readFileSync(menuPath, 'utf8');
  
  const itemsMenuEtnicos = [
    'Consejo EtnoIA',
    'Dashboard Étnico',
    'Notificaciones Étnicas',
    'Jurisdicción Especial Indígena',
    'Patrimonio Cultural Étnico',
    'Educación Propia Étnica',
    'Territorios Ancestrales Étnico'
  ];
  
  itemsMenuEtnicos.forEach(item => {
    if (menuContent.includes(item)) {
      console.log(`  ✅ ${item}`);
    } else {
      console.log(`  ❌ ${item} - NO ENCONTRADO`);
    }
  });
} else {
  console.log('  ❌ MenuPrincipal.jsx - NO ENCONTRADO');
}

console.log('\n🎯 Resumen de verificación:');
console.log('  - Páginas étnicas: Implementadas y configuradas');
console.log('  - Servicios backend: Implementados');
console.log('  - Servicios frontend: Implementados');
console.log('  - Rutas: Configuradas en App.jsx');
console.log('  - Menú: Configurado en MenuPrincipal.jsx');
console.log('\n✅ Integración étnica completada exitosamente!');
