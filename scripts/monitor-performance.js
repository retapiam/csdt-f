/**
 * Script de Monitoreo de Rendimiento de Sincronización
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://127.0.0.1:8000/api';
const LOG_FILE = path.join(__dirname, '..', 'logs', 'performance.log');

// Crear directorio de logs si no existe
const logsDir = path.dirname(LOG_FILE);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      totalTime: 0,
      avgResponseTime: 0,
      endpoints: {}
    };
  }

  async testEndpoint(endpoint, method = 'GET', data = null) {
    const startTime = Date.now();
    const requestId = ++this.metrics.requests;
    
    try {
      console.log(`🔍 Probando ${method} ${endpoint}...`);
      
      let response;
      if (method === 'GET') {
        response = await axios.get(`${API_URL}${endpoint}`, { timeout: 10000 });
      } else if (method === 'POST') {
        response = await axios.post(`${API_URL}${endpoint}`, data, { timeout: 10000 });
      }
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      this.metrics.totalTime += responseTime;
      this.metrics.avgResponseTime = this.metrics.totalTime / this.metrics.requests;
      
      if (!this.metrics.endpoints[endpoint]) {
        this.metrics.endpoints[endpoint] = {
          requests: 0,
          errors: 0,
          totalTime: 0,
          avgTime: 0
        };
      }
      
      this.metrics.endpoints[endpoint].requests++;
      this.metrics.endpoints[endpoint].totalTime += responseTime;
      this.metrics.endpoints[endpoint].avgTime = this.metrics.endpoints[endpoint].totalTime / this.metrics.endpoints[endpoint].requests;
      
      console.log(`✅ ${endpoint} - ${response.status} - ${responseTime}ms`);
      
      this.logMetric(endpoint, method, responseTime, response.status, 'SUCCESS');
      
      return {
        success: true,
        status: response.status,
        responseTime,
        data: response.data
      };
      
    } catch (error) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      this.metrics.errors++;
      
      if (this.metrics.endpoints[endpoint]) {
        this.metrics.endpoints[endpoint].errors++;
      }
      
      console.log(`❌ ${endpoint} - Error - ${responseTime}ms - ${error.message}`);
      
      this.logMetric(endpoint, method, responseTime, error.response?.status || 'ERROR', 'ERROR', error.message);
      
      return {
        success: false,
        error: error.message,
        responseTime
      };
    }
  }

  logMetric(endpoint, method, responseTime, status, result, error = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      endpoint,
      method,
      responseTime,
      status,
      result,
      error
    };
    
    const logLine = JSON.stringify(logEntry) + '\n';
    fs.appendFileSync(LOG_FILE, logLine);
  }

  async runPerformanceTest() {
    console.log('🚀 Iniciando monitoreo de rendimiento...\n');
    
    const endpoints = [
      { path: '/health', method: 'GET' },
      { path: '/v1/usuarios', method: 'GET' },
      { path: '/v1/veedurias', method: 'GET' },
      { path: '/v1/tareas', method: 'GET' },
      { path: '/v1/donaciones', method: 'GET' },
      { path: '/v1/estadisticas/generales', method: 'GET' },
      { path: '/v1/analisis-ia', method: 'GET' },
      { path: '/etnicos/pueblos-indigenas', method: 'GET' },
      { path: '/etnicos/comunidades-afro', method: 'GET' }
    ];

    const results = [];
    
    for (const endpoint of endpoints) {
      const result = await this.testEndpoint(endpoint.path, endpoint.method);
      results.push({ ...endpoint, ...result });
      
      // Pequeña pausa entre requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.printSummary(results);
    return results;
  }

  printSummary(results) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN DE RENDIMIENTO');
    console.log('='.repeat(60));
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    const avgTime = this.metrics.avgResponseTime.toFixed(2);
    
    console.log(`📈 Total de requests: ${this.metrics.requests}`);
    console.log(`✅ Exitosos: ${successful}`);
    console.log(`❌ Fallidos: ${failed}`);
    console.log(`⏱️  Tiempo promedio: ${avgTime}ms`);
    console.log(`🕐 Tiempo total: ${(this.metrics.totalTime / 1000).toFixed(2)}s`);
    
    console.log('\n📋 Detalles por endpoint:');
    Object.entries(this.metrics.endpoints).forEach(([endpoint, metrics]) => {
      const successRate = ((metrics.requests - metrics.errors) / metrics.requests * 100).toFixed(1);
      console.log(`  ${endpoint}:`);
      console.log(`    Requests: ${metrics.requests}`);
      console.log(`    Errores: ${metrics.errors}`);
      console.log(`    Tiempo promedio: ${metrics.avgTime.toFixed(2)}ms`);
      console.log(`    Tasa de éxito: ${successRate}%`);
    });
    
    console.log('\n🎯 Recomendaciones:');
    
    if (this.metrics.avgResponseTime > 2000) {
      console.log('⚠️  Tiempo de respuesta alto - Considera optimizar el backend');
    }
    
    if (failed > 0) {
      console.log('⚠️  Algunos endpoints fallaron - Revisa la configuración');
    }
    
    if (this.metrics.avgResponseTime < 500) {
      console.log('✅ Excelente rendimiento - Sistema optimizado');
    }
    
    console.log('='.repeat(60));
  }

  async runContinuousMonitoring(intervalMs = 30000) {
    console.log(`🔄 Iniciando monitoreo continuo cada ${intervalMs / 1000} segundos...`);
    console.log('Presiona Ctrl+C para detener\n');
    
    const interval = setInterval(async () => {
      console.log(`\n🕐 ${new Date().toLocaleString()} - Ejecutando monitoreo...`);
      await this.runPerformanceTest();
    }, intervalMs);
    
    // Manejar cierre graceful
    process.on('SIGINT', () => {
      console.log('\n🛑 Deteniendo monitoreo...');
      clearInterval(interval);
      process.exit(0);
    });
  }
}

// Función principal
async function main() {
  const monitor = new PerformanceMonitor();
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'continuous') {
    const interval = parseInt(args[1]) || 30000;
    await monitor.runContinuousMonitoring(interval);
  } else {
    await monitor.runPerformanceTest();
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default PerformanceMonitor;
