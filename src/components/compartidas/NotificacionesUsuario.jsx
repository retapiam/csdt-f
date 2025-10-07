import React, { useState, useEffect } from 'react';
import { useAuth } from '@contexts/AuthContext';

const NotificacionesUsuario = () => {
  const { user } = useAuth();
  const [notificaciones, setNotificaciones] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [notificacionSeleccionada, setNotificacionSeleccionada] = useState(null);

  useEffect(() => {
    if (user) {
      cargarNotificaciones();
    }
  }, [user]);

  const cargarNotificaciones = () => {
    try {
      const notificacionesData = JSON.parse(localStorage.getItem('notificacionesUsuarios') || '{}');
      const notificacionesUsuario = notificacionesData[user.id] || [];
      
      // Ordenar por fecha (más recientes primero)
      const notificacionesOrdenadas = notificacionesUsuario.sort((a, b) => 
        new Date(b.fecha) - new Date(a.fecha)
      );
      
      setNotificaciones(notificacionesOrdenadas);
      
      // Mostrar modal si hay notificaciones no leídas
      const noLeidas = notificacionesOrdenadas.filter(n => !n.leida);
      if (noLeidas.length > 0) {
        setMostrarModal(true);
      }
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    }
  };

  const marcarComoLeida = (notificacionId) => {
    try {
      const notificacionesData = JSON.parse(localStorage.getItem('notificacionesUsuarios') || '{}');
      const notificacionesUsuario = notificacionesData[user.id] || [];
      
      const notificacionesActualizadas = notificacionesUsuario.map(n => 
        n.id === notificacionId ? { ...n, leida: true } : n
      );
      
      notificacionesData[user.id] = notificacionesActualizadas;
      localStorage.setItem('notificacionesUsuarios', JSON.stringify(notificacionesData));
      
      setNotificaciones(notificacionesActualizadas);
    } catch (error) {
      console.error('Error marcando notificación como leída:', error);
    }
  };

  const marcarTodasComoLeidas = () => {
    try {
      const notificacionesData = JSON.parse(localStorage.getItem('notificacionesUsuarios') || '{}');
      const notificacionesUsuario = notificacionesData[user.id] || [];
      
      const notificacionesActualizadas = notificacionesUsuario.map(n => ({ ...n, leida: true }));
      
      notificacionesData[user.id] = notificacionesActualizadas;
      localStorage.setItem('notificacionesUsuarios', JSON.stringify(notificacionesData));
      
      setNotificaciones(notificacionesActualizadas);
    } catch (error) {
      console.error('Error marcando todas las notificaciones como leídas:', error);
    }
  };

  const eliminarNotificacion = (notificacionId) => {
    try {
      const notificacionesData = JSON.parse(localStorage.getItem('notificacionesUsuarios') || '{}');
      const notificacionesUsuario = notificacionesData[user.id] || [];
      
      const notificacionesActualizadas = notificacionesUsuario.filter(n => n.id !== notificacionId);
      
      notificacionesData[user.id] = notificacionesActualizadas;
      localStorage.setItem('notificacionesUsuarios', JSON.stringify(notificacionesData));
      
      setNotificaciones(notificacionesActualizadas);
    } catch (error) {
      console.error('Error eliminando notificación:', error);
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getTipoIcono = (tipo) => {
    switch (tipo) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const notificacionesNoLeidas = notificaciones.filter(n => !n.leida);

  if (!user) return null;

  return (
    <>
      {/* Botón de Notificaciones */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setMostrarModal(true)}
          style={{
            padding: '8px 12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🔔 Notificaciones
          {notificacionesNoLeidas.length > 0 && (
            <span style={{
              backgroundColor: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {notificacionesNoLeidas.length}
            </span>
          )}
        </button>
      </div>

      {/* Modal de Notificaciones */}
      {mostrarModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0, color: '#1f2937', fontSize: '20px', fontWeight: 'bold' }}>
                🔔 Notificaciones
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {notificacionesNoLeidas.length > 0 && (
                  <button
                    onClick={marcarTodasComoLeidas}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Marcar Todas como Leídas
                  </button>
                )}
                <button
                  onClick={() => setMostrarModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {notificaciones.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                <p>No tienes notificaciones</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {notificaciones.map(notificacion => (
                  <div
                    key={notificacion.id}
                    style={{
                      padding: '16px',
                      border: `2px solid ${getTipoColor(notificacion.tipo)}`,
                      borderRadius: '8px',
                      backgroundColor: notificacion.leida ? '#f9fafb' : getTipoColor(notificacion.tipo) + '10',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => {
                      setNotificacionSeleccionada(notificacion);
                      if (!notificacion.leida) {
                        marcarComoLeida(notificacion.id);
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '20px' }}>{getTipoIcono(notificacion.tipo)}</span>
                          <h4 style={{ 
                            margin: 0, 
                            color: '#1f2937', 
                            fontSize: '16px', 
                            fontWeight: 'bold' 
                          }}>
                            {notificacion.titulo}
                          </h4>
                          {!notificacion.leida && (
                            <span style={{
                              backgroundColor: '#ef4444',
                              color: 'white',
                              borderRadius: '50%',
                              width: '8px',
                              height: '8px'
                            }}></span>
                          )}
                        </div>
                        <p style={{ 
                          margin: 0, 
                          color: '#4b5563', 
                          fontSize: '14px',
                          lineHeight: '1.5'
                        }}>
                          {notificacion.mensaje}
                        </p>
                        <div style={{ 
                          marginTop: '8px', 
                          fontSize: '12px', 
                          color: '#6b7280' 
                        }}>
                          {new Date(notificacion.fecha).toLocaleString('es-CO')} • 
                          Enviado por: {notificacion.enviadaPor}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarNotificacion(notificacion.id);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '16px',
                          cursor: 'pointer',
                          color: '#6b7280',
                          padding: '4px'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificacionesUsuario;
