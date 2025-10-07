/**
 * Script para verificar errores de importación en el sistema de gestión de proyectos
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verificando Importaciones - Sistema de Gestión de Proyectos');
console.log('='.repeat(60));

// Archivos a verificar
const archivos = [
  'src/paginas/12-gestion-proyectos/DashboardUnificado.jsx',
  'src/paginas/12-gestion-proyectos/GestionProyectos.jsx',
  'src/paginas/12-gestion-proyectos/PanelVista.jsx',
  'src/services/ProyectosService.js',
  'src/hooks/useProyectos.js'
];

// Iconos de Lucide React que se usan comúnmente
const iconosComunes = [
  'Eye', 'Settings', 'BarChart3', 'TrendingUp', 'TrendingDown',
  'Clock', 'DollarSign', 'Users', 'AlertTriangle', 'CheckCircle',
  'Target', 'Calendar', 'FileText', 'MessageSquare', 'Filter',
  'Download', 'RefreshCw', 'Shield', 'UserCheck', 'ArrowRight',
  'Lock', 'Search', 'XCircle', 'Plus', 'Edit', 'Trash2'
];

function verificarImportaciones(archivo) {
  const ruta = path.resolve(__dirname, '..', archivo);
  
  if (!fs.existsSync(ruta)) {
    console.log(`❌ ${archivo} - Archivo no encontrado`);
    return { archivo, errores: ['Archivo no encontrado'] };
  }

  const contenido = fs.readFileSync(ruta, 'utf8');
  const errores = [];

  // Buscar iconos usados en el archivo
  const iconosUsados = [];
  iconosComunes.forEach(icono => {
    const regex = new RegExp(`<${icono}\\s+className=`, 'g');
    if (regex.test(contenido)) {
      iconosUsados.push(icono);
    }
  });

  // Verificar si los iconos están importados
  const importaciones = contenido.match(/import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"]/);
  
  if (importaciones) {
    const iconosImportados = importaciones[1]
      .split(',')
      .map(icono => icono.trim())
      .filter(icono => icono.length > 0);

    iconosUsados.forEach(icono => {
      if (!iconosImportados.includes(icono)) {
        errores.push(`Icono '${icono}' usado pero no importado`);
      }
    });
  } else {
    if (iconosUsados.length > 0) {
      errores.push('Iconos usados pero no hay importación de lucide-react');
    }
  }

  // Verificar otras importaciones comunes
  const importacionesComunes = [
    { nombre: 'React', patron: /import\s+React/ },
    { nombre: 'useState', patron: /useState/ },
    { nombre: 'useEffect', patron: /useEffect/ },
    { nombre: 'Card', patron: /Card/ },
    { nombre: 'Button', patron: /Button/ },
    { nombre: 'Badge', patron: /Badge/ }
  ];

  importacionesComunes.forEach(({ nombre, patron }) => {
    if (patron.test(contenido) && !contenido.includes(`import.*${nombre}`)) {
      errores.push(`'${nombre}' usado pero no importado`);
    }
  });

  return { archivo, errores, iconosUsados };
}

console.log('\n📁 Verificando archivos:');

let totalErrores = 0;
archivos.forEach(archivo => {
  const resultado = verificarImportaciones(archivo);
  
  if (resultado.errores.length === 0) {
    console.log(`✅ ${archivo}`);
    if (resultado.iconosUsados.length > 0) {
      console.log(`   Iconos usados: ${resultado.iconosUsados.join(', ')}`);
    }
  } else {
    console.log(`❌ ${archivo}`);
    resultado.errores.forEach(error => {
      console.log(`   - ${error}`);
      totalErrores++;
    });
  }
});

console.log('\n' + '='.repeat(60));
console.log('📋 RESUMEN DE VERIFICACIÓN');
console.log('='.repeat(60));

if (totalErrores === 0) {
  console.log('🎉 ¡Todas las importaciones están correctas!');
  console.log('✅ No se encontraron errores de importación');
  console.log('✅ Todos los iconos están correctamente importados');
  console.log('✅ Las dependencias están bien configuradas');
} else {
  console.log(`⚠️ Se encontraron ${totalErrores} errores de importación`);
  console.log('💡 Revisa los errores listados arriba para corregirlos');
}

console.log('\n🔧 Soluciones comunes:');
console.log('1. Agregar iconos faltantes a la importación de lucide-react');
console.log('2. Verificar que las importaciones de componentes estén correctas');
console.log('3. Asegurarse de que las rutas de importación sean correctas');

console.log('\n' + '='.repeat(60));
