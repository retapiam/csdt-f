import React, { useState } from 'react';
import ModalLogin from './ModalLogin';
import ModalRegistroCliente from './ModalRegistroCliente';
import ModalRecuperarContrasena from './ModalRecuperarContrasena';

const SistemaAuthCompleto = ({ 
  tipoInicial = 'login', // 'login', 'register', 'recover'
  onSuccess = null,
  onClose = null,
  estiloBoton = {}
}) => {
  const [modoActual, setModoActual] = useState(tipoInicial);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleAbrirModal = () => {
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    if (onClose) {
      onClose();
    }
  };

  const handleSuccess = (resultado) => {
    console.log('Autenticación exitosa:', resultado);
    setMostrarModal(false);
    if (onSuccess) {
      onSuccess(resultado);
    }
  };

  const handleCambiarModo = (nuevoModo) => {
    setModoActual(nuevoModo);
  };

  const handleRecuperarContrasena = () => {
    setModoActual('recover');
  };

  const handleVolverAlLogin = () => {
    setModoActual('login');
  };

  const handleCambiarARegistro = () => {
    setModoActual('register');
  };

  const estiloDefault = {
    flex: '1 1 0%',
    padding: '12px 18px',
    border: 'medium',
    borderRadius: '10px',
    background: modoActual === 'login' 
      ? 'linear-gradient(135deg, rgb(52, 152, 219) 0%, rgb(41, 128, 185) 100%)'
      : 'linear-gradient(135deg, rgb(39, 174, 96) 0%, rgb(46, 204, 113) 100%)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: modoActual === 'login' 
      ? 'rgba(52, 152, 219, 0.3) 0px 4px 15px'
      : 'rgba(39, 174, 96, 0.3) 0px 4px 15px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    ...estiloBoton
  };

  const getTextoBoton = () => {
    switch (modoActual) {
      case 'login':
        return 'Iniciar Sesión';
      case 'register':
        return 'Registrarse';
      case 'recover':
        return 'Recuperar Contraseña';
      default:
        return 'Iniciar Sesión';
    }
  };

  const getIconoBoton = () => {
    switch (modoActual) {
      case 'login':
        return '🔐';
      case 'register':
        return '📝';
      case 'recover':
        return '🔑';
      default:
        return '🔐';
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAbrirModal}
        style={estiloDefault}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = modoActual === 'login' 
            ? 'rgba(52, 152, 219, 0.4) 0px 6px 20px'
            : 'rgba(39, 174, 96, 0.4) 0px 6px 20px';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = modoActual === 'login' 
            ? 'rgba(52, 152, 219, 0.3) 0px 4px 15px'
            : 'rgba(39, 174, 96, 0.3) 0px 4px 15px';
        }}
      >
        <span style={{ marginRight: '8px' }}>{getIconoBoton()}</span>
        {getTextoBoton()}
      </button>

      {mostrarModal && (
        <>
          {modoActual === 'login' && (
            <ModalLogin
              onClose={handleCerrarModal}
              onSuccess={handleSuccess}
              onCambiarRegistro={() => handleCambiarModo('register')}
              onRecuperarContrasena={handleRecuperarContrasena}
            />
          )}

          {modoActual === 'register' && (
            <ModalRegistroCliente
              onClose={handleCerrarModal}
              onSuccess={handleSuccess}
              onCambiarLogin={() => handleCambiarModo('login')}
            />
          )}

          {modoActual === 'recover' && (
            <ModalRecuperarContrasena
              onClose={handleCerrarModal}
              onVolver={handleVolverAlLogin}
            />
          )}
        </>
      )}
    </>
  );
};

export default SistemaAuthCompleto;
