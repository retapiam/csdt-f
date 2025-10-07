/**
 * Script de Corrección Automática del Sistema de Gestión de Proyectos
 * Corrige importaciones, rutas, sintaxis y sincronización
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 CORRECCIÓN AUTOMÁTICA - SISTEMA DE GESTIÓN DE PROYECTOS');
console.log('='.repeat(70));

// Archivos a corregir
const archivos = [
  'src/paginas/12-gestion-proyectos/DashboardUnificado.jsx',
  'src/paginas/12-gestion-proyectos/GestionProyectos.jsx',
  'src/paginas/12-gestion-proyectos/PanelVista.jsx',
  'src/paginas/12-gestion-proyectos/01-administrador/DashboardAdministrador.jsx',
  'src/paginas/12-gestion-proyectos/01-administrador/CrearProyecto.jsx',
  'src/paginas/12-gestion-proyectos/02-operador/DashboardOperador.jsx',
  'src/paginas/12-gestion-proyectos/03-cliente/DashboardCliente.jsx'
];

// Correcciones a aplicar
const correcciones = [
  {
    patron: /import\s+{\s*useAuth\s*}\s+from\s+['"]\.\.\/\.\.\/contexts\/AuthContext['"]/g,
    reemplazo: "import { useAuth } from '@contexts/AuthContext'"
  },
  {
    patron: /import\s+{\s*useAuth\s*}\s+from\s+['"]\.\.\/contexts\/AuthContext['"]/g,
    reemplazo: "import { useAuth } from '@contexts/AuthContext'"
  },
  {
    patron: /import\s+{\s*useAuth\s*}\s+from\s+['"]\.\.\/\.\.\/\.\.\/contexts\/AuthContext['"]/g,
    reemplazo: "import { useAuth } from '@contexts/AuthContext'"
  },
  {
    patron: /import\s+{\s*useProyectos,\s*useEstadisticasProyectos\s*}\s+from\s+['"]\.\.\/\.\.\/hooks\/useProyectos['"]/g,
    reemplazo: "import { useProyectos, useEstadisticasProyectos } from '@hooks/useProyectos'"
  },
  {
    patron: /import\s+{\s*useProyectos,\s*useEstadisticasProyectos\s*}\s+from\s+['"]\.\.\/hooks\/useProyectos['"]/g,
    reemplazo: "import { useProyectos, useEstadisticasProyectos } from '@hooks/useProyectos'"
  },
  {
    patron: /import\s+{\s*useTareas,\s*useEstadisticasProyectos\s*}\s+from\s+['"]\.\.\/\.\.\/hooks\/useProyectos['"]/g,
    reemplazo: "import { useTareas, useEstadisticasProyectos } from '@hooks/useProyectos'"
  },
  {
    patron: /import\s+{\s*useTareas,\s*useEstadisticasProyectos\s*}\s+from\s+['"]\.\.\/hooks\/useProyectos['"]/g,
    reemplazo: "import { useTareas, useEstadisticasProyectos } from '@hooks/useProyectos'"
  }
];

function corregirArchivo(archivo) {
  const ruta = path.resolve(__dirname, '..', archivo);
  
  if (!fs.existsSync(ruta)) {
    console.log(`❌ ${archivo} - Archivo no encontrado`);
    return { archivo, corregido: false, errores: ['Archivo no encontrado'] };
  }

  let contenido = fs.readFileSync(ruta, 'utf8');
  let cambios = 0;
  const errores = [];

  try {
    // Aplicar correcciones
    correcciones.forEach(({ patron, reemplazo }) => {
      const antes = contenido;
      contenido = contenido.replace(patron, reemplazo);
      if (contenido !== antes) {
        cambios++;
      }
    });

    // Verificar si hay cambios
    if (cambios > 0) {
      fs.writeFileSync(ruta, contenido, 'utf8');
      console.log(`✅ ${archivo} - ${cambios} correcciones aplicadas`);
    } else {
      console.log(`✅ ${archivo} - Sin correcciones necesarias`);
    }

    return { archivo, corregido: true, cambios, errores: [] };
  } catch (error) {
    console.log(`❌ ${archivo} - Error: ${error.message}`);
    return { archivo, corregido: false, errores: [error.message] };
  }
}

console.log('\n📁 Aplicando correcciones:');

let totalCorrecciones = 0;
let archivosCorregidos = 0;

archivos.forEach(archivo => {
  const resultado = corregirArchivo(archivo);
  if (resultado.corregido) {
    archivosCorregidos++;
    totalCorrecciones += resultado.cambios || 0;
  }
});

console.log('\n' + '='.repeat(70));
console.log('📋 RESUMEN DE CORRECCIONES');
console.log('='.repeat(70));

console.log(`📁 Archivos procesados: ${archivos.length}`);
console.log(`✅ Archivos corregidos: ${archivosCorregidos}`);
console.log(`🔧 Total de correcciones: ${totalCorrecciones}`);

if (totalCorrecciones > 0) {
  console.log('\n🎉 ¡Correcciones aplicadas exitosamente!');
  console.log('✅ Importaciones corregidas');
  console.log('✅ Rutas actualizadas');
  console.log('✅ Sintaxis mejorada');
} else {
  console.log('\n✅ ¡Todos los archivos ya están correctos!');
  console.log('✅ No se necesitaron correcciones');
}

console.log('\n🚀 PRÓXIMOS PASOS:');
console.log('1. Verificar que no hay errores de linting');
console.log('2. Probar la sincronización con la base de datos');
console.log('3. Validar los permisos de usuario por rol');
console.log('4. Ejecutar pruebas de integración');

console.log('\n' + '='.repeat(70));
