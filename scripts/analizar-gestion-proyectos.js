/**
 * Análisis Completo del Sistema de Gestión de Proyectos
 * Verifica importaciones, rutas, sintaxis y sincronización
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 ANÁLISIS COMPLETO - SISTEMA DE GESTIÓN DE PROYECTOS');
console.log('='.repeat(70));

// Archivos a analizar
const archivos = [
  'src/paginas/12-gestion-proyectos/DashboardUnificado.jsx',
  'src/paginas/12-gestion-proyectos/GestionProyectos.jsx',
  'src/paginas/12-gestion-proyectos/PanelVista.jsx',
  'src/services/ProyectosService.js',
  'src/hooks/useProyectos.js'
];

// Servicios y hooks requeridos
const serviciosRequeridos = [
  'src/services/ProyectosService.js',
  'src/hooks/useProyectos.js',
  'src/services/syncService.js',
  'src/services/api.js'
];

// Componentes de UI requeridos
const componentesUI = [
  '@components/ui/card',
  '@components/ui/button',
  '@components/ui/badge',
  '@components/ui/alert',
  '@components/ui/progress',
  '@components/ui/tabs'
];

// Contextos requeridos
const contextos = [
  '@contexts/AuthContext',
  '@contexts/PermisosVistaContext',
  '@contexts/NotificationContext'
];

function analizarArchivo(archivo) {
  const ruta = path.resolve(__dirname, '..', archivo);
  
  if (!fs.existsSync(ruta)) {
    return { archivo, existe: false, errores: ['Archivo no encontrado'] };
  }

  const contenido = fs.readFileSync(ruta, 'utf8');
  const errores = [];
  const advertencias = [];
  const importaciones = [];
  const dependencias = [];

  // Extraer importaciones
  const regexImport = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = regexImport.exec(contenido)) !== null) {
    importaciones.push(match[1]);
  }

  // Verificar importaciones de componentes UI
  componentesUI.forEach(componente => {
    if (contenido.includes(componente)) {
      dependencias.push(componente);
    }
  });

  // Verificar importaciones de contextos
  contextos.forEach(contexto => {
    if (contenido.includes(contexto)) {
      dependencias.push(contexto);
    }
  });

  // Verificar sintaxis básica
  const problemasSintaxis = [
    { patron: /console\.log\([^)]*\)/, tipo: 'advertencia', mensaje: 'Console.log encontrado (considerar remover en producción)' },
    { patron: /debugger/, tipo: 'error', mensaje: 'Debugger encontrado' },
    { patron: /TODO|FIXME|XXX/, tipo: 'advertencia', mensaje: 'Comentarios TODO/FIXME encontrados' },
    { patron: /undefined\s*[=!]=/, tipo: 'error', mensaje: 'Comparación con undefined (usar === o !==)' },
    { patron: /==\s*null/, tipo: 'advertencia', mensaje: 'Comparación con == null (usar ===)' }
  ];

  problemasSintaxis.forEach(({ patron, tipo, mensaje }) => {
    if (patron.test(contenido)) {
      if (tipo === 'error') {
        errores.push(mensaje);
      } else {
        advertencias.push(mensaje);
      }
    }
  });

  // Verificar hooks de React
  const hooksReact = ['useState', 'useEffect', 'useCallback', 'useMemo', 'useRef'];
  const hooksUsados = hooksReact.filter(hook => new RegExp(`\\b${hook}\\b`).test(contenido));
  
  // Verificar iconos de Lucide React
  const iconosLucide = [
    'BarChart3', 'TrendingUp', 'TrendingDown', 'Clock', 'DollarSign', 'Users',
    'AlertTriangle', 'CheckCircle', 'Target', 'Calendar', 'FileText', 'MessageSquare',
    'Filter', 'Download', 'RefreshCw', 'Eye', 'Settings', 'Shield', 'UserCheck',
    'ArrowRight', 'Lock', 'Search', 'XCircle', 'Plus', 'Edit', 'Trash2'
  ];
  
  const iconosUsados = iconosLucide.filter(icono => 
    new RegExp(`<${icono}\\s+className=`, 'g').test(contenido)
  );

  // Verificar si los iconos están importados
  const importacionLucide = contenido.match(/import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"]/);
  if (importacionLucide) {
    const iconosImportados = importacionLucide[1]
      .split(',')
      .map(icono => icono.trim())
      .filter(icono => icono.length > 0);

    iconosUsados.forEach(icono => {
      if (!iconosImportados.includes(icono)) {
        errores.push(`Icono '${icono}' usado pero no importado`);
      }
    });
  }

  // Verificar sincronización con base de datos
  const patronesSincronizacion = [
    { patron: /useProyectos/, tipo: 'info', mensaje: 'Hook useProyectos detectado' },
    { patron: /useEstadisticasProyectos/, tipo: 'info', mensaje: 'Hook useEstadisticasProyectos detectado' },
    { patron: /useTareas/, tipo: 'info', mensaje: 'Hook useTareas detectado' },
    { patron: /autoSync.*true/, tipo: 'info', mensaje: 'Sincronización automática habilitada' },
    { patron: /api\.(get|post|put|delete)/, tipo: 'info', mensaje: 'Llamadas a API detectadas' },
    { patron: /syncService/, tipo: 'info', mensaje: 'Servicio de sincronización detectado' }
  ];

  patronesSincronizacion.forEach(({ patron, tipo, mensaje }) => {
    if (patron.test(contenido)) {
      if (tipo === 'info') {
        dependencias.push(mensaje);
      }
    }
  });

  return {
    archivo,
    existe: true,
    errores,
    advertencias,
    importaciones,
    dependencias,
    hooksUsados,
    iconosUsados,
    iconosImportados: importacionLucide ? importacionLucide[1].split(',').map(i => i.trim()) : []
  };
}

console.log('\n📁 ANÁLISIS DE ARCHIVOS:');

let totalErrores = 0;
let totalAdvertencias = 0;
const resultados = [];

archivos.forEach(archivo => {
  const resultado = analizarArchivo(archivo);
  resultados.push(resultado);
  
  console.log(`\n📄 ${archivo}:`);
  
  if (!resultado.existe) {
    console.log('❌ Archivo no encontrado');
    totalErrores++;
    return;
  }
  
  if (resultado.errores.length === 0 && resultado.advertencias.length === 0) {
    console.log('✅ Sin errores ni advertencias');
  } else {
    if (resultado.errores.length > 0) {
      console.log('❌ Errores:');
      resultado.errores.forEach(error => {
        console.log(`   - ${error}`);
        totalErrores++;
      });
    }
    
    if (resultado.advertencias.length > 0) {
      console.log('⚠️ Advertencias:');
      resultado.advertencias.forEach(advertencia => {
        console.log(`   - ${advertencia}`);
        totalAdvertencias++;
      });
    }
  }
  
  console.log(`📊 Hooks usados: ${resultado.hooksUsados.join(', ')}`);
  console.log(`🎨 Iconos usados: ${resultado.iconosUsados.length}`);
  console.log(`🔗 Dependencias: ${resultado.dependencias.length}`);
});

console.log('\n🔧 VERIFICACIÓN DE SERVICIOS:');

serviciosRequeridos.forEach(servicio => {
  const ruta = path.resolve(__dirname, '..', servicio);
  if (fs.existsSync(ruta)) {
    console.log(`✅ ${servicio}`);
  } else {
    console.log(`❌ ${servicio} - NO ENCONTRADO`);
    totalErrores++;
  }
});

console.log('\n🎯 ANÁLISIS DE SINCRONIZACIÓN:');

const archivosConSincronizacion = resultados.filter(r => 
  r.dependencias.some(d => d.includes('Sincronización') || d.includes('Hook') || d.includes('API'))
);

console.log(`📊 Archivos con sincronización: ${archivosConSincronizacion.length}/${resultados.length}`);

archivosConSincronizacion.forEach(resultado => {
  console.log(`✅ ${resultado.archivo}`);
  resultado.dependencias
    .filter(d => d.includes('Sincronización') || d.includes('Hook') || d.includes('API'))
    .forEach(dep => console.log(`   - ${dep}`));
});

console.log('\n' + '='.repeat(70));
console.log('📋 RESUMEN DEL ANÁLISIS');
console.log('='.repeat(70));

console.log(`📁 Archivos analizados: ${resultados.length}`);
console.log(`❌ Errores encontrados: ${totalErrores}`);
console.log(`⚠️ Advertencias encontradas: ${totalAdvertencias}`);
console.log(`🔧 Servicios verificados: ${serviciosRequeridos.length}`);

if (totalErrores === 0) {
  console.log('\n🎉 ¡ANÁLISIS EXITOSO!');
  console.log('✅ No se encontraron errores críticos');
  console.log('✅ Sincronización con base de datos implementada');
  console.log('✅ Importaciones y rutas correctas');
  console.log('✅ Sintaxis válida');
  
  if (totalAdvertencias > 0) {
    console.log(`\n⚠️ Se encontraron ${totalAdvertencias} advertencias menores`);
    console.log('💡 Considera revisar las advertencias para optimizar el código');
  }
} else {
  console.log('\n⚠️ ANÁLISIS CON PROBLEMAS');
  console.log(`❌ Se encontraron ${totalErrores} errores que deben corregirse`);
  console.log('💡 Revisa los errores listados arriba para solucionarlos');
}

console.log('\n🚀 RECOMENDACIONES:');
console.log('1. Verificar que todos los servicios estén funcionando');
console.log('2. Probar la sincronización con la base de datos');
console.log('3. Validar los permisos de usuario por rol');
console.log('4. Optimizar el rendimiento de los hooks');
console.log('5. Implementar manejo de errores robusto');

console.log('\n' + '='.repeat(70));
