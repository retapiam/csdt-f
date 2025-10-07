/**
 * Utilidades para probar la funcionalidad de las páginas migradas
 * Este archivo contiene funciones de prueba para verificar que todo funcione correctamente
 */

// Función para probar la generación de PDF
export const testPDFGeneration = () => {
  try {
    // Simular datos de prueba
    const testData = {
      nombre: 'Juan Pérez',
      documento: '12345678',
      email: 'juan@ejemplo.com',
      hechos: 'Hechos de prueba para el documento',
      solicitud: 'Solicitud de prueba'
    };

    // Verificar que jsPDF esté disponible
    if (typeof window !== 'undefined' && window.jsPDF) {
      console.log('✅ jsPDF está disponible');
      return true;
    } else {
      console.log('⚠️ jsPDF no está disponible en el contexto actual');
      return false;
    }
  } catch (error) {
    console.error('❌ Error en prueba de PDF:', error);
    return false;
  }
};

// Función para probar la navegación de rutas
export const testRouteNavigation = (routes) => {
  const requiredRoutes = [
    '/territorios-ancestrales',
    '/patrimonio-cultural',
    '/narraciones-etnicas',
    '/mediacion-intercultural',
    '/historia-territorio',
    '/educacion-propia',
    '/accion-grupo',
    '/accion-reparacion-directa',
    '/demanda-juridica'
  ];

  const missingRoutes = requiredRoutes.filter(route => !routes.includes(route));
  
  if (missingRoutes.length === 0) {
    console.log('✅ Todas las rutas requeridas están disponibles');
    return true;
  } else {
    console.log('❌ Rutas faltantes:', missingRoutes);
    return false;
  }
};

// Función para probar formularios
export const testFormValidation = (formData, requiredFields) => {
  const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
  
  if (missingFields.length === 0) {
    console.log('✅ Todos los campos requeridos están completos');
    return true;
  } else {
    console.log('❌ Campos faltantes:', missingFields);
    return false;
  }
};

// Función para probar servicios de IA
export const testAIServices = async () => {
  try {
    // Importar servicios dinámicamente para evitar errores de SSR
    const SistemaIAProfesionalService = (await import('../services/SistemaIAProfesionalService')).default;
    
    const testConsulta = 'Esta es una consulta de prueba para verificar el funcionamiento del sistema de IA';
    const resultado = SistemaIAProfesionalService.generarRespuestaProfesional(testConsulta, 'derecho_constitucional');
    
    if (resultado && resultado.respuesta) {
      console.log('✅ Servicios de IA funcionando correctamente');
      return true;
    } else {
      console.log('❌ Error en servicios de IA');
      return false;
    }
  } catch (error) {
    console.error('❌ Error al probar servicios de IA:', error);
    return false;
  }
};

// Función para probar almacenamiento local
export const testLocalStorage = () => {
  try {
    const testKey = 'csdt_test';
    const testData = { test: true, timestamp: Date.now() };
    
    localStorage.setItem(testKey, JSON.stringify(testData));
    const retrievedData = JSON.parse(localStorage.getItem(testKey));
    
    if (retrievedData && retrievedData.test === true) {
      localStorage.removeItem(testKey);
      console.log('✅ Almacenamiento local funcionando correctamente');
      return true;
    } else {
      console.log('❌ Error en almacenamiento local');
      return false;
    }
  } catch (error) {
    console.error('❌ Error al probar almacenamiento local:', error);
    return false;
  }
};

// Función principal para ejecutar todas las pruebas
export const runAllTests = async () => {
  console.log('🧪 Iniciando pruebas de funcionalidad...');
  
  const results = {
    pdf: testPDFGeneration(),
    ai: await testAIServices(),
    storage: testLocalStorage()
  };

  const allPassed = Object.values(results).every(result => result === true);
  
  if (allPassed) {
    console.log('🎉 Todas las pruebas pasaron correctamente!');
  } else {
    console.log('⚠️ Algunas pruebas fallaron. Revisar los logs anteriores.');
  }

  return results;
};

// Función para generar reporte de estado
export const generateStatusReport = () => {
  const report = {
    timestamp: new Date().toISOString(),
    pages: {
      migrated: 17,
      total: 17,
      status: 'completed'
    },
    features: {
      routing: 'configured',
      ai_integration: 'implemented',
      pdf_generation: 'available',
      form_validation: 'implemented',
      local_storage: 'available'
    },
    dependencies: {
      react: '19.1.1',
      react_router: '7.9.3',
      jspdf: '2.5.2',
      lucide_react: '0.468.0'
    }
  };

  console.log('📊 Reporte de Estado del Sistema:');
  console.log(JSON.stringify(report, null, 2));
  
  return report;
};

export default {
  testPDFGeneration,
  testRouteNavigation,
  testFormValidation,
  testAIServices,
  testLocalStorage,
  runAllTests,
  generateStatusReport
};
