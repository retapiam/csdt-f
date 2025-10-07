/**
 * Servicio de sincronización simplificado - devuelve datos vacíos
 */
class DatabaseSyncService {
  async sync() {
    return { success: true };
  }
  
  async checkStatus() {
    return { synced: true };
  }
}

export const databaseSyncService = new DatabaseSyncService();
export default databaseSyncService;

