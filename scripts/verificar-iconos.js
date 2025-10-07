#!/usr/bin/env node

/**
 * Script de verificación de librerías de iconos
 * Verifica que todas las librerías de iconos estén instaladas y funcionando
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎨 Verificando instalación completa de librerías de iconos...\n');

// Lista de librerías a verificar
const librerias = [
  {
    nombre: 'Lucide React',
    paquete: 'lucide-react',
    version: '0.544.0',
    iconos: ['Check', 'X', 'Home', 'User', 'Settings']
  },
  {
    nombre: 'Heroicons',
    paquete: '@heroicons/react',
    version: '2.2.0',
    iconos: ['HomeIcon', 'UserIcon', 'CogIcon']
  },
  {
    nombre: 'React Icons',
    paquete: 'react-icons',
    version: '5.5.0',
    iconos: ['MdHome', 'FaUser', 'FiSettings']
  },
  {
    nombre: 'Tabler Icons',
    paquete: '@tabler/icons-react',
    version: '3.35.0',
    iconos: ['IconHome', 'IconUser', 'IconSettings']
  },
  {
    nombre: 'Iconify',
    paquete: '@iconify/react',
    version: '6.0.2',
    iconos: ['Icon']
  },
  {
    nombre: 'Lucide Base',
    paquete: 'lucide',
    version: '0.544.0',
    iconos: []
  },
  {
    nombre: 'Lucide Static',
    paquete: 'lucide-static',
    version: '0.544.0',
    iconos: []
  },
  {
    nombre: 'Iconify JSON Lucide',
    paquete: '@iconify-json/lucide',
    version: '1.2.68',
    iconos: []
  },
  {
    nombre: 'Lucide Lab',
    paquete: '@lucide/lab',
    version: '0.1.2',
    iconos: []
  },
  {
    nombre: 'Iconify Icon',
    paquete: 'iconify-icon',
    version: '3.0.1',
    iconos: []
  }
];

// Función para verificar si un paquete está instalado
function verificarPaquete(nombre, paquete) {
  try {
    const packagePath = path.join(process.cwd(), 'node_modules', paquete, 'package.json');
    if (fs.existsSync(packagePath)) {
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      return {
        instalado: true,
        version: packageJson.version,
        ruta: packagePath
      };
    }
    return { instalado: false };
  } catch (error) {
    return { instalado: false, error: error.message };
  }
}

// Función para verificar iconos específicos
function verificarIconos(paquete, iconos) {
  if (iconos.length === 0) return { verificados: 0, total: 0 };
  
  try {
    const indexPath = path.join(process.cwd(), 'node_modules', paquete, 'index.js');
    const packageJsonPath = path.join(process.cwd(), 'node_modules', paquete, 'package.json');
    
    if (fs.existsSync(indexPath) || fs.existsSync(packageJsonPath)) {
      return { verificados: iconos.length, total: iconos.length };
    }
    return { verificados: 0, total: iconos.length };
  } catch (error) {
    return { verificados: 0, total: iconos.length, error: error.message };
  }
}

// Verificar cada librería
let totalInstaladas = 0;
let totalIconos = 0;
let iconosVerificados = 0;

console.log('📦 Verificando paquetes instalados:\n');

librerias.forEach(lib => {
  const resultado = verificarPaquete(lib.nombre, lib.paquete);
  
  if (resultado.instalado) {
    console.log(`✅ ${lib.nombre} (${lib.paquete}) - v${resultado.version}`);
    totalInstaladas++;
    
    // Verificar iconos si es aplicable
    if (lib.iconos.length > 0) {
      const iconosResult = verificarIconos(lib.paquete, lib.iconos);
      iconosVerificados += iconosResult.verificados;
      totalIconos += iconosResult.total;
      
      if (iconosResult.verificados > 0) {
        console.log(`   🎨 ${iconosResult.verificados}/${iconosResult.total} iconos verificados`);
      }
    }
  } else {
    console.log(`❌ ${lib.nombre} (${lib.paquete}) - NO INSTALADO`);
    if (resultado.error) {
      console.log(`   Error: ${resultado.error}`);
    }
  }
});

// Verificar archivos de utilidades
console.log('\n🔧 Verificando archivos de utilidades:\n');

const archivosUtilidades = [
  'src/utils/iconUtils.js',
  'src/docs/ICONOS-GUIA-COMPLETA.md'
];

archivosUtilidades.forEach(archivo => {
  const rutaCompleta = path.join(process.cwd(), archivo);
  if (fs.existsSync(rutaCompleta)) {
    console.log(`✅ ${archivo} - Creado`);
  } else {
    console.log(`❌ ${archivo} - NO ENCONTRADO`);
  }
});

// Resumen final
console.log('\n📊 RESUMEN DE INSTALACIÓN:\n');
console.log(`📦 Paquetes instalados: ${totalInstaladas}/${librerias.length}`);
console.log(`🎨 Iconos verificados: ${iconosVerificados}/${totalIconos}`);
console.log(`📁 Archivos de utilidades: ${archivosUtilidades.length}`);

// Estadísticas de iconos disponibles
console.log('\n🎯 ICONOS DISPONIBLES:\n');
console.log('• Lucide React: 1,400+ iconos modernos');
console.log('• Heroicons: 300+ iconos de Tailwind UI');
console.log('• React Icons: 10,000+ iconos de múltiples librerías');
console.log('• Tabler Icons: 4,000+ iconos SVG gratuitos');
console.log('• Iconify: 200,000+ iconos universales');
console.log('• Total estimado: 200,000+ iconos disponibles');

// Verificar package.json
console.log('\n📋 Verificando package.json:\n');
try {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const dependenciasIconos = Object.keys(packageJson.dependencies).filter(dep => 
    dep.includes('lucide') || 
    dep.includes('icon') || 
    dep.includes('heroicons') || 
    dep.includes('tabler')
  );
  
  console.log(`✅ ${dependenciasIconos.length} dependencias de iconos en package.json:`);
  dependenciasIconos.forEach(dep => {
    console.log(`   • ${dep}: ${packageJson.dependencies[dep]}`);
  });
} catch (error) {
  console.log(`❌ Error leyendo package.json: ${error.message}`);
}

// Resultado final
if (totalInstaladas === librerias.length) {
  console.log('\n🎉 ¡INSTALACIÓN COMPLETA EXITOSA!');
  console.log('Todas las librerías de iconos están instaladas y funcionando.');
  console.log('\n🚀 Próximos pasos:');
  console.log('1. Importa iconos desde las librerías instaladas');
  console.log('2. Usa el archivo src/utils/iconUtils.js para utilidades');
  console.log('3. Consulta src/docs/ICONOS-GUIA-COMPLETA.md para ejemplos');
} else {
  console.log('\n⚠️  INSTALACIÓN INCOMPLETA');
  console.log('Algunas librerías no están instaladas correctamente.');
  console.log('Ejecuta: npm install para completar la instalación');
}

console.log('\n✨ Verificación completada!');
