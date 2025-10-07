import React, { useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import SistemaAuth from './SistemaAuth';
import { obtenerNombreCompleto } from '@/utils/userMapper';

const PruebaAuth = () => {
  const { user, loading } = useAuth();
  const [mensaje, setMensaje] = useState('');

  const handleAuthSuccess = (resultado) => {
    setMensaje(`¡${resultado.success ? 'Éxito' : 'Error'}! ${resultado.message || 'Operación completada'}`);
    setTimeout(() => setMensaje(''), 5000);
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Sistema de Autenticación CSDT
      </h1>

      {/* Estado de carga */}
      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            border: '2px solid #3b82f6',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: '10px'
          }}></div>
          Cargando...
        </div>
      )}

      {/* Mensaje de estado */}
      {mensaje && (
        <div style={{
          padding: '15px',
          backgroundColor: mensaje.includes('Éxito') ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${mensaje.includes('Éxito') ? '#bbf7d0' : '#fecaca'}`,
          color: mensaje.includes('Éxito') ? '#166534' : '#dc2626',
          borderRadius: '8px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {mensaje}
        </div>
      )}

      {/* Información del usuario */}
      {user ? (
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          marginBottom: '30px'
        }}>
          <h2 style={{
            color: '#1f2937',
            marginBottom: '15px',
            fontSize: '20px'
          }}>
            Usuario Autenticado
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div>
              <strong>Nombre:</strong> {obtenerNombreCompleto(user)}
            </div>
            <div>
              <strong>Email:</strong> {user.correo || user.email || user.cor}
            </div>
            <div>
              <strong>Rol:</strong> {
                user.rol === 'cli' ? 'Cliente' : 
                user.rol === 'ope' ? 'Operador' : 
                user.rol === 'adm' ? 'Administrador' : 
                user.rol === 'adm_gen' ? 'Administrador General' : 'Usuario'
              }
            </div>
            <div>
              <strong>Estado:</strong> {
                user.est === 'act' ? 'Activo' : 
                user.est === 'ina' ? 'Inactivo' : 
                user.est === 'pen' ? 'Pendiente' : 
                user.est === 'sus' ? 'Suspendido' : 'Desconocido'
              }
            </div>
            <div>
              <strong>Documento:</strong> {user.numeroDocumento || user.documento || user.doc}
            </div>
            <div>
              <strong>Teléfono:</strong> {user.telefono || user.tel || 'No especificado'}
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => {
                // Aquí podrías abrir un modal de perfil
                setMensaje('Funcionalidad de perfil en desarrollo');
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Ver Perfil
            </button>
            
            <button
              onClick={() => {
                // Aquí podrías abrir un modal de cambio de contraseña
                setMensaje('Funcionalidad de cambio de contraseña en desarrollo');
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#fef3c7',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #fbbf24',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#92400e',
            marginBottom: '10px'
          }}>
            No hay usuario autenticado
          </h3>
          <p style={{
            color: '#92400e',
            margin: 0
          }}>
            Inicia sesión o regístrate para acceder a todas las funcionalidades
          </p>
        </div>
      )}

      {/* Sistema de autenticación */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          color: '#1f2937',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {user ? 'Gestión de Sesión' : 'Autenticación'}
        </h2>
        
        <SistemaAuth onSuccess={handleAuthSuccess} />
      </div>

      {/* Información adicional */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          color: '#374151',
          marginBottom: '15px'
        }}>
          Información del Sistema
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <div>
            <strong>Estado de conexión:</strong> {user ? 'Conectado' : 'Desconectado'}
          </div>
          <div>
            <strong>Token:</strong> {user ? 'Presente' : 'No disponible'}
          </div>
          <div>
            <strong>Última actualización:</strong> {new Date().toLocaleString()}
          </div>
          <div>
            <strong>Versión:</strong> 2.0.0
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PruebaAuth;
