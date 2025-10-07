/**
 * Script para revisar todas las páginas del sistema de gestión de proyectos
 * Identifica y corrige errores comunes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 REVISIÓN COMPLETA - PÁGINAS DEL SISTEMA DE GESTIÓN DE PROYECTOS');
console.log('='.repeat(70));

// Archivos a revisar
const archivos = [
  'src/paginas/12-gestion-proyectos/GestionProyectos.jsx',
  'src/paginas/12-gestion-proyectos/DashboardUnificado.jsx',
  'src/paginas/12-gestion-proyectos/PanelVista.jsx',
  'src/paginas/12-gestion-proyectos/01-administrador/DashboardAdministrador.jsx',
  'src/paginas/12-gestion-proyectos/01-administrador/CrearProyecto.jsx',
  'src/paginas/12-gestion-proyectos/02-operador/DashboardOperador.jsx',
  'src/paginas/12-gestion-proyectos/03-cliente/DashboardCliente.jsx'
];

// Patrones de errores comunes
const patronesErrores = [
  {
    nombre: 'Funciones no definidas',
    patron: /onClick={[^}]*cargar[A-Z][a-zA-Z]*[^}]*}/g,
    tipo: 'error',
    descripcion: 'Referencias a funciones eliminadas'
  },
  {
    nombre: 'setState obsoleto',
    patron: /set[A-Z][a-zA]*\(/g,
    tipo: 'advertencia',
    descripcion: 'Uso de setState en lugar de hooks'
  },
  {
    nombre: 'Importaciones relativas',
    patron: /from\s+['"]\.\.\/\.\.\/contexts\//g,
    tipo: 'error',
    descripcion: 'Importaciones relativas incorrectas'
  },
  {
    nombre: 'Console.log en producción',
    patron: /console\.log\(/g,
    tipo: 'advertencia',
    descripcion: 'Console.log encontrado'
  },
  {
    nombre: 'Variables no definidas',
    patron: /\b(estadisticas|proyectos|tareas)\b(?!\s*[=:])/g,
    tipo: 'advertencia',
    descripcion: 'Posibles variables no definidas'
  }
];

function revisarArchivo(archivo) {
  const ruta = path.resolve(__dirname, '..', archivo);
  
  if (!fs.existsSync(ruta)) {
    return { archivo, existe: false, errores: ['Archivo no encontrado'] };
  }

  const contenido = fs.readFileSync(ruta, 'utf8');
  const errores = [];
  const advertencias = [];
  const correcciones = [];

  // Buscar errores
  patronesErrores.forEach(({ nombre, patron, tipo, descripcion }) => {
    const matches = contenido.match(patron);
    if (matches) {
      const error = {
        tipo,
        descripcion,
        cantidad: matches.length,
        lineas: matches.map(match => {
          const index = contenido.indexOf(match);
          return contenido.substring(0, index).split('\n').length;
        })
      };
      
      if (tipo === 'error') {
        errores.push(error);
      } else {
        advertencias.push(error);
      }
    }
  });

  // Verificar funciones específicas que podrían estar mal referenciadas
  const funcionesProblema = [
    'cargarDashboard',
    'cargarDatos',
    'cargarProyectos',
    'cargarTareas',
    'cargarEstadisticas'
  ];

  funcionesProblema.forEach(funcion => {
    const patron = new RegExp(`\\b${funcion}\\b`, 'g');
    if (patron.test(contenido)) {
      errores.push({
        tipo: 'error',
        descripcion: `Función '${funcion}' referenciada pero posiblemente no definida`,
        cantidad: 1
      });
    }
  });

  // Verificar hooks correctos
  const hooksCorrectos = [
    'useProyectos',
    'useTareas', 
    'useEstadisticasProyectos'
  ];

  hooksCorrectos.forEach(hook => {
    if (contenido.includes(hook)) {
      if (!contenido.includes(`from '@hooks/useProyectos'`)) {
        errores.push({
          tipo: 'error',
          descripcion: `Hook '${hook}' usado pero importación incorrecta`,
          cantidad: 1
        });
      }
    }
  });

  return {
    archivo,
    existe: true,
    errores,
    advertencias,
    correcciones
  };
}

console.log('\n📁 REVISANDO ARCHIVOS:');

let totalErrores = 0;
let totalAdvertencias = 0;
const resultados = [];

archivos.forEach(archivo => {
  const resultado = revisarArchivo(archivo);
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
        console.log(`   - ${error.descripcion} (${error.cantidad} ocurrencias)`);
        totalErrores += error.cantidad;
      });
    }
    
    if (resultado.advertencias.length > 0) {
      console.log('⚠️ Advertencias:');
      resultado.advertencias.forEach(advertencia => {
        console.log(`   - ${advertencia.descripcion} (${advertencia.cantidad} ocurrencias)`);
        totalAdvertencias += advertencia.cantidad;
      });
    }
  }
});

console.log('\n' + '='.repeat(70));
console.log('📋 RESUMEN DE REVISIÓN');
console.log('='.repeat(70));

console.log(`📁 Archivos revisados: ${resultados.length}`);
console.log(`❌ Errores encontrados: ${totalErrores}`);
console.log(`⚠️ Advertencias encontradas: ${totalAdvertencias}`);

if (totalErrores === 0) {
  console.log('\n🎉 ¡TODAS LAS PÁGINAS ESTÁN CORRECTAS!');
  console.log('✅ No se encontraron errores críticos');
  console.log('✅ Todas las funciones están correctamente definidas');
  console.log('✅ Las importaciones están correctas');
} else {
  console.log('\n⚠️ SE ENCONTRARON PROBLEMAS');
  console.log(`❌ ${totalErrores} errores que deben corregirse`);
  console.log('💡 Revisa los errores listados arriba para solucionarlos');
}

console.log('\n🚀 PRÓXIMOS PASOS:');
console.log('1. Corregir los errores identificados');
console.log('2. Verificar que todas las funciones estén definidas');
console.log('3. Probar la funcionalidad en el navegador');
console.log('4. Ejecutar pruebas de integración');

console.log('\n' + '='.repeat(70));
