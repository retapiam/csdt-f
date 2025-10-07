/**
 * SERVICIO DE HEALTH CHECK - CSDT
 * Maneja la verificación del estado del servidor de forma robusta
 */

import api from './api';

class HealthService {
  constructor() {
    this.isOnline = false;
    this.lastCheck = null;
    this.checkInterval = null;
    this.retryCount = 0;
    this.maxRetries = 1; // Solo 1 reintento
    this.checkDelay = 0; // Sin delay entre checks
  }

  /**
   * Verifica el estado del servidor
   */
  async checkHealth() {
    try {
      const response = await api.get('/health', {
        timeout: 0, // Sin timeout para health checks
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (response.status === 200 && response.data === 'OK') {
        this.isOnline = true;
        this.lastCheck = new Date();
        this.retryCount = 0;
        return { success: true, data: { status: 'ok', message: 'Servidor funcionando correctamente' } };
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      this.isOnline = false;
      this.retryCount++;
      
      if (this.retryCount < this.maxRetries) {
        // Reintentar inmediatamente sin delay
        return await this.checkHealth();
      }
      
      return { success: false, error: error.message };
    }
  }

  /**
   * Inicia el monitoreo automático del servidor
   */
  startMonitoring() {
    // Sin monitoreo automático para evitar sobrecarga
    // Solo verificar cuando sea necesario
  }

  /**
   * Detiene el monitoreo automático
   */
  stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  /**
   * Obtiene el estado actual del servidor
   */
  getStatus() {
    return {
      isOnline: this.isOnline,
      lastCheck: this.lastCheck,
      retryCount: this.retryCount,
      maxRetries: this.maxRetries
    };
  }

  /**
   * Fuerza una verificación inmediata
   */
  async forceCheck() {
    this.retryCount = 0;
    return await this.checkHealth();
  }
}

// Crear instancia singleton
const healthService = new HealthService();

export default healthService;
