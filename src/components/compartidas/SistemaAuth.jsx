import React, { useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import ModalLogin from './ModalLogin';
import ModalRegistroCliente from './ModalRegistroCliente';
import ModalRecuperarContrasena from './ModalRecuperarContrasena';
import { obtenerNombreCompleto, obtenerNombre } from '@/utils/userMapper';

const SistemaAuth = ({ 
  tipo = 'login', // 'login' o 'register'
  onSuccess = null,
  onClose = null,
  mostrarRegistro = false,
  mostrarLogin = false
}) => {
  const { user, logout } = useAuth();
  const [mostrarLoginModal, setMostrarLoginModal] = useState(mostrarLogin);
  const [mostrarRegistroModal, setMostrarRegistroModal] = useState(mostrarRegistro);
  const [mostrarRecuperarModal, setMostrarRecuperarModal] = useState(false);

  const handleLoginSuccess = (resultado) => {
    setMostrarLoginModal(false);
    if (onSuccess) {
      onSuccess(resultado);
    }
  };

  const handleRegistroSuccess = (resultado) => {
    setMostrarRegistroModal(false);
    if (onSuccess) {
      onSuccess(resultado);
    }
  };

  const handleCerrarLogin = () => {
    setMostrarLoginModal(false);
    if (onClose) {
      onClose();
    }
  };

  const handleCerrarRegistro = () => {
    setMostrarRegistroModal(false);
    if (onClose) {
      onClose();
    }
  };

  const abrirRegistro = () => {
    setMostrarLoginModal(false);
    setMostrarRecuperarModal(false);
    setMostrarRegistroModal(true);
  };

  const abrirLogin = () => {
    setMostrarRegistroModal(false);
    setMostrarRecuperarModal(false);
    setMostrarLoginModal(true);
  };

  const abrirRecuperar = () => {
    setMostrarLoginModal(false);
    setMostrarRegistroModal(false);
    setMostrarRecuperarModal(true);
  };

  const handleCerrarRecuperar = () => {
    setMostrarRecuperarModal(false);
    if (onClose) {
      onClose();
    }
  };

  // Si el usuario ya está autenticado, mostrar información del usuario
  if (user) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '10px 15px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          {obtenerNombre(user) ? obtenerNombre(user).charAt(0).toUpperCase() : 'U'}
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: '600',
            color: '#1f2937',
            fontSize: '14px'
          }}>
            {obtenerNombreCompleto(user)}
          </div>
          <div style={{
            color: '#6b7280',
            fontSize: '12px'
          }}>
            {user.rol === 'cli' ? 'Cliente' : 
             user.rol === 'ope' ? 'Operador' : 
             user.rol === 'adm' ? 'Administrador' : 
             user.rol === 'adm_gen' ? 'Administrador General' : 'Usuario'}
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            padding: '8px 12px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  // Botones de autenticación cuando no hay usuario
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button
        onClick={() => setMostrarLoginModal(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#2563eb';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#3b82f6';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Iniciar Sesión
      </button>

      <button
        onClick={() => setMostrarRegistroModal(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#16a34a',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 2px 4px rgba(22, 163, 74, 0.3)'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#15803d';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#16a34a';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        Registrarse
      </button>

      {/* Modales */}
      {mostrarLoginModal && (
        <ModalLogin
          onClose={handleCerrarLogin}
          onSuccess={handleLoginSuccess}
          onCambiarRegistro={abrirRegistro}
          onRecuperarContrasena={abrirRecuperar}
        />
      )}

      {mostrarRegistroModal && (
        <ModalRegistroCliente
          onClose={handleCerrarRegistro}
          onSuccess={handleRegistroSuccess}
          onCambiarLogin={abrirLogin}
        />
      )}

      {mostrarRecuperarModal && (
        <ModalRecuperarContrasena
          onClose={handleCerrarRecuperar}
          onVolver={abrirLogin}
        />
      )}
    </div>
  );
};

export default SistemaAuth;
