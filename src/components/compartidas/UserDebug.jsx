import React from 'react';
import { useAuth } from '@contexts/AuthContext';

/**
 * Componente temporal de debug para verificar los datos del usuario
 * Este componente se puede eliminar después de la prueba
 */
const UserDebug = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(239, 68, 68, 0.9)',
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <strong>❌ NO AUTENTICADO</strong>
        <div style={{ marginTop: '8px', fontSize: '11px' }}>
          No hay usuario logueado en el sistema
        </div>
      </div>
    );
  }

  // Deshabilitado para todos los roles (no visible en producción ni desarrollo)
  return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(34, 197, 94, 0.95)',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '11px',
      zIndex: 9999,
      maxWidth: '320px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      maxHeight: '400px',
      overflowY: 'auto'
    }}>
      <strong style={{ fontSize: '13px' }}>✅ USUARIO AUTENTICADO</strong>
      <div style={{ marginTop: '10px', lineHeight: '1.6' }}>
        <div><strong>ID:</strong> {user.id || 'N/A'}</div>
        <div><strong>Nombre:</strong> {user.name || user.nombreCompleto || user.nombre || 'N/A'}</div>
        <div><strong>Email:</strong> {user.email || user.correo || 'N/A'}</div>
        <div><strong>Rol:</strong> {user.rol || 'N/A'}</div>
        <div><strong>Documento:</strong> {user.documento || user.numeroDocumento || 'N/A'}</div>
        <div><strong>Teléfono:</strong> {user.telefono || user.tel || 'N/A'}</div>
        <hr style={{ margin: '8px 0', opacity: 0.3 }} />
        <details style={{ marginTop: '8px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            Ver objeto completo
          </summary>
          <pre style={{ 
            background: 'rgba(0,0,0,0.2)', 
            padding: '8px', 
            borderRadius: '4px',
            fontSize: '10px',
            overflow: 'auto',
            maxHeight: '200px'
          }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default UserDebug;

