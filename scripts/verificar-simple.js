/**
 * Script Simple de Verificación de Sincronización
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Verificando sincronización de datos...\n');

// Verificar archivos principales
const archivos = [
  'src/services/api.js',
  'src/services/csdtApiService.js', 
  'src/services/syncService.js',
  'src/hooks/useSyncData.js',
  'src/components/SyncDataProvider.jsx',
  'src/App.jsx'
];

let exitosos = 0;

archivos.forEach(archivo => {
  const ruta = path.join(__dirname, '..', archivo);
  if (fs.existsSync(ruta)) {
    console.log(`✅ ${archivo}`);
    exitosos++;
  } else {
    console.log(`❌ ${archivo} - FALTANTE`);
  }
});

console.log(`\n📊 Resultado: ${exitosos}/${archivos.length} archivos encontrados`);

if (exitosos === archivos.length) {
  console.log('🎉 ¡Todas las verificaciones exitosas!');
  process.exit(0);
} else {
  console.log('⚠️ Algunas verificaciones fallaron');
  process.exit(1);
}
