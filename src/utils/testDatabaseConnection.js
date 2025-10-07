/**
 * Utilidad para probar la conexión con la base de datos
 */

import api from '../services/api';
import csdtApiService from '../services/csdtApiService';

class DatabaseConnectionTester {
  constructor() {
    this.results = {
      apiConnection: null,
      endpoints: {},
      errors: []
    };
  }

  /**
   * Probar conexión básica con la API
   */
  async testAPIConnection() {
    try {
      console.log('🔍 Probando conexión con la API...');
      
      // Probar endpoint de salud
      const response = await api.get('/health');
      
      this.results.apiConnection = {
        status: 'success',
        data: response.data,
        timestamp: new Date().toISOString()
      };
      
      console.log('✅ Conexión con API exitosa:', response.data);
      return true;
      
    } catch (error) {
      this.results.apiConnection = {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      };
      
      console.error('❌ Error conectando con API:', error.message);
      this.results.errors.push({
        type: 'api_connection',
        message: error.message,
        timestamp: new Date().toISOString()
      });
      
      return false;
    }
  }

  /**
   * Probar endpoints específicos
   */
  async testEndpoints() {
    const endpoints = [
      {
        name: 'auth_me',
        test: () => csdtApiService.auth.me(),
        required: false
      },
      {
        name: 'etnicos_pueblos',
        test: () => csdtApiService.etnicos.obtenerPueblosIndigenas(),
        required: true
      },
      {
        name: 'etnicos_comunidades',
        test: () => csdtApiService.etnicos.obtenerComunidadesAfro(),
        required: true
      },
      {
        name: 'ia_especialistas',
        test: () => csdtApiService.ia.especialistas.listar(),
        required: false
      },
      {
        name: 'estadisticas_generales',
        test: () => csdtApiService.estadisticas.generales(),
        required: false
      }
    ];

    console.log('🔍 Probando endpoints específicos...');

    for (const endpoint of endpoints) {
      try {
        console.log(`📡 Probando endpoint: ${endpoint.name}`);
        
        const startTime = Date.now();
        const response = await endpoint.test();
        const duration = Date.now() - startTime;
        
        this.results.endpoints[endpoint.name] = {
          status: 'success',
          duration: duration,
          dataLength: response.data ? (Array.isArray(response.data) ? response.data.length : Object.keys(response.data).length) : 0,
          timestamp: new Date().toISOString()
        };
        
        console.log(`✅ ${endpoint.name}: ${duration}ms`);
        
      } catch (error) {
        this.results.endpoints[endpoint.name] = {
          status: 'error',
          error: error.message,
          timestamp: new Date().toISOString()
        };
        
        console.error(`❌ ${endpoint.name}:`, error.message);
        
        if (endpoint.required) {
          this.results.errors.push({
            type: 'endpoint_required',
            endpoint: endpoint.name,
            message: error.message,
            timestamp: new Date().toISOString()
          });
        }
      }
    }
  }

  /**
   * Probar operaciones CRUD
   */
  async testCRUDOperations() {
    console.log('🔍 Probando operaciones CRUD...');
    
    try {
      // Probar creación de datos de prueba
      const testData = {
        tipo: 'test',
        nombre: 'Prueba de Conexión',
        comunidad: 'Test Community',
        pueblo: 'Test Pueblo',
        telefono: '1234567890',
        email: 'test@example.com',
        identificacion: 'TEST123'
      };

      console.log('📝 Probando creación de datos...');
      const createResponse = await csdtApiService.etnicos.crear(testData);
      
      this.results.endpoints['crud_create'] = {
        status: 'success',
        data: createResponse.data,
        timestamp: new Date().toISOString()
      };
      
      console.log('✅ Creación exitosa');
      
      // Si se creó exitosamente, probar lectura
      if (createResponse.data && createResponse.data.id) {
        console.log('📖 Probando lectura de datos...');
        const readResponse = await csdtApiService.etnicos.obtener(createResponse.data.id);
        
        this.results.endpoints['crud_read'] = {
          status: 'success',
          data: readResponse.data,
          timestamp: new Date().toISOString()
        };
        
        console.log('✅ Lectura exitosa');
        
        // Probar eliminación
        console.log('🗑️ Probando eliminación de datos...');
        await csdtApiService.etnicos.eliminar(createResponse.data.id);
        
        this.results.endpoints['crud_delete'] = {
          status: 'success',
          timestamp: new Date().toISOString()
        };
        
        console.log('✅ Eliminación exitosa');
      }
      
    } catch (error) {
      console.error('❌ Error en operaciones CRUD:', error.message);
      
      this.results.endpoints['crud_operations'] = {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      };
      
      this.results.errors.push({
        type: 'crud_operations',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Probar sincronización
   */
  async testSynchronization() {
    console.log('🔍 Probando sincronización...');
    
    try {
      // Importar dinámicamente para evitar problemas de dependencias
      const { default: databaseSyncService } = await import('../services/DatabaseSyncService');
      
      // Probar carga de pueblos indígenas
      console.log('🔄 Probando sincronización de pueblos indígenas...');
      const pueblosResult = await databaseSyncService.syncPueblosIndigenas();
      
      this.results.endpoints['sync_pueblos'] = {
        status: pueblosResult.success ? 'success' : 'warning',
        data: pueblosResult.data,
        cached: pueblosResult.cached,
        fallback: pueblosResult.fallback,
        timestamp: new Date().toISOString()
      };
      
      console.log(`✅ Sincronización pueblos indígenas: ${pueblosResult.success ? 'Exitoso' : 'Con fallback'}`);
      
      // Probar carga de comunidades afro
      console.log('🔄 Probando sincronización de comunidades afro...');
      const comunidadesResult = await databaseSyncService.syncComunidadesAfro();
      
      this.results.endpoints['sync_comunidades'] = {
        status: comunidadesResult.success ? 'success' : 'warning',
        data: comunidadesResult.data,
        cached: comunidadesResult.cached,
        fallback: comunidadesResult.fallback,
        timestamp: new Date().toISOString()
      };
      
      console.log(`✅ Sincronización comunidades afro: ${comunidadesResult.success ? 'Exitoso' : 'Con fallback'}`);
      
    } catch (error) {
      console.error('❌ Error en sincronización:', error.message);
      
      this.results.endpoints['synchronization'] = {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      };
      
      this.results.errors.push({
        type: 'synchronization',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Ejecutar todas las pruebas
   */
  async runAllTests() {
    console.log('🚀 Iniciando pruebas de conexión con base de datos...');
    
    const startTime = Date.now();
    
    // Probar conexión básica
    const apiConnected = await this.testAPIConnection();
    
    if (apiConnected) {
      // Probar endpoints específicos
      await this.testEndpoints();
      
      // Probar operaciones CRUD
      await this.testCRUDOperations();
      
      // Probar sincronización
      await this.testSynchronization();
    }
    
    const totalDuration = Date.now() - startTime;
    
    // Generar reporte final
    this.generateReport(totalDuration);
    
    return this.results;
  }

  /**
   * Generar reporte de pruebas
   */
  generateReport(duration) {
    console.log('\n📊 REPORTE DE PRUEBAS DE CONEXIÓN');
    console.log('=====================================');
    console.log(`⏱️  Duración total: ${duration}ms`);
    
    // Estado de conexión API
    if (this.results.apiConnection) {
      console.log(`🔌 API Connection: ${this.results.apiConnection.status === 'success' ? '✅' : '❌'}`);
    }
    
    // Estado de endpoints
    const endpointCount = Object.keys(this.results.endpoints).length;
    const successCount = Object.values(this.results.endpoints).filter(e => e.status === 'success').length;
    const errorCount = Object.values(this.results.endpoints).filter(e => e.status === 'error').length;
    const warningCount = Object.values(this.results.endpoints).filter(e => e.status === 'warning').length;
    
    console.log(`📡 Endpoints probados: ${endpointCount}`);
    console.log(`✅ Exitosos: ${successCount}`);
    console.log(`⚠️  Con advertencias: ${warningCount}`);
    console.log(`❌ Con errores: ${errorCount}`);
    
    // Errores críticos
    if (this.results.errors.length > 0) {
      console.log('\n🚨 ERRORES CRÍTICOS:');
      this.results.errors.forEach((error, index) => {
        console.log(`${index + 1}. [${error.type}] ${error.message}`);
      });
    }
    
    // Recomendaciones
    console.log('\n💡 RECOMENDACIONES:');
    
    if (this.results.apiConnection?.status !== 'success') {
      console.log('• Verificar que el servidor backend esté ejecutándose');
      console.log('• Revisar la configuración de URL en api.js');
      console.log('• Verificar conectividad de red');
    }
    
    if (errorCount > 0) {
      console.log('• Revisar endpoints con errores');
      console.log('• Verificar permisos de base de datos');
      console.log('• Consultar logs del servidor backend');
    }
    
    if (warningCount > 0) {
      console.log('• Algunos endpoints están usando datos de fallback');
      console.log('• Verificar conectividad para sincronización completa');
    }
    
    console.log('\n🎯 Estado general:', 
      errorCount === 0 ? '✅ SISTEMA FUNCIONAL' : 
      errorCount <= 2 ? '⚠️  SISTEMA PARCIALMENTE FUNCIONAL' : 
      '❌ SISTEMA CON PROBLEMAS CRÍTICOS'
    );
  }

  /**
   * Obtener resultados en formato JSON
   */
  getResults() {
    return this.results;
  }

  /**
   * Exportar resultados a archivo
   */
  exportResults() {
    const dataStr = JSON.stringify(this.results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const element = document.createElement('a');
    element.href = URL.createObjectURL(dataBlob);
    element.download = `database-test-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

// Función de conveniencia para ejecutar pruebas
export const testDatabaseConnection = async () => {
  const tester = new DatabaseConnectionTester();
  return await tester.runAllTests();
};

// Función para pruebas rápidas
export const quickDatabaseTest = async () => {
  console.log('⚡ Prueba rápida de conexión...');
  
  try {
    const response = await api.get('/health');
    console.log('✅ Conexión básica exitosa');
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Error en conexión básica:', error.message);
    return { success: false, error: error.message };
  }
};

export default DatabaseConnectionTester;
