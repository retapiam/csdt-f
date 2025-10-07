/**
 * Script para probar la conexión con el backend
 */

import axios from 'axios';

const API_URLS = [
  'http://127.0.0.1:8000/api',
  'http://localhost:8000/api',
  'https://csdt-backend-app.azurewebsites.net/api'
];

async function testConnection(url) {
  try {
    console.log(`🔍 Probando conexión a: ${url}`);
    
    const response = await axios.get(`${url}/health`, { 
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`✅ Conexión exitosa: ${url}`);
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(response.data, null, 2)}`);
    return true;
  } catch (error) {
    console.log(`❌ Error de conexión: ${url}`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

async function testEndpoints(url) {
  const endpoints = [
    '/v1/usuarios',
    '/v1/veedurias', 
    '/v1/tareas',
    '/v1/donaciones',
    '/v1/estadisticas/generales'
  ];
  
  console.log(`\n🔍 Probando endpoints en: ${url}`);
  
  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(`${url}${endpoint}`, { 
        timeout: 3000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ ${endpoint} - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${endpoint} - Error: ${error.response?.status || error.message}`);
    }
  }
}

async function main() {
  console.log('🚀 Iniciando pruebas de conexión con backend...\n');
  
  let conexionExitosa = false;
  
  for (const url of API_URLS) {
    const conectado = await testConnection(url);
    if (conectado) {
      conexionExitosa = true;
      await testEndpoints(url);
      break;
    }
  }
  
  if (!conexionExitosa) {
    console.log('\n⚠️ No se pudo conectar a ningún backend');
    console.log('💡 Asegúrate de que el servidor Laravel esté ejecutándose');
    console.log('💡 Verifica las URLs en la configuración de API');
  } else {
    console.log('\n🎉 ¡Conexión con backend exitosa!');
  }
}

main().catch(console.error);
