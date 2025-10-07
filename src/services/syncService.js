/**
 * Servicio de sincronización simplificado - devuelve datos vacíos
 */
class SyncService {
  async syncData() {
    return { success: true };
  }
  
  async checkSyncStatus() {
    return { isSynced: true, pendingChanges: 0 };
  }
}

export const syncService = new SyncService();
export default syncService;

