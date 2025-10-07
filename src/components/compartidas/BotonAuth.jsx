import React, { useState } from 'react';
import LoginSimple from './LoginSimple';
import RegistroSimple from './RegistroSimple';

const BotonAuth = ({ 
  texto = "Iniciar Sesión", 
  tipo = "login", // "login" o "register"
  estilo = {}, 
  onSuccess = null
}) => {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const handleClick = () => {
    if (tipo === 'login') {
      setMostrarLogin(true);
    } else {
      setMostrarRegistro(true);
    }
  };

  const handleSuccess = (resultado) => {
    if (tipo === 'login') {
      setMostrarLogin(false);
    } else {
      setMostrarRegistro(false);
    }
    
    if (onSuccess) {
      onSuccess(resultado);
    }
  };

  const handleSwitchToRegister = () => {
    setMostrarLogin(false);
    setMostrarRegistro(true);
  };

  const handleSwitchToLogin = () => {
    setMostrarRegistro(false);
    setMostrarLogin(true);
  };

  const estiloDefault = {
    flex: '1 1 0%',
    padding: '12px 18px',
    border: 'medium',
    borderRadius: '10px',
    background: tipo === 'login' 
      ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
      : 'linear-gradient(135deg, rgb(39, 174, 96) 0%, rgb(46, 204, 113) 100%)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: tipo === 'login' 
      ? 'rgba(59, 130, 246, 0.3) 0px 4px 15px'
      : 'rgba(39, 174, 96, 0.3) 0px 4px 15px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    ...estilo
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        style={estiloDefault}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = tipo === 'login' 
            ? 'rgba(59, 130, 246, 0.4) 0px 6px 20px'
            : 'rgba(39, 174, 96, 0.4) 0px 6px 20px';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = tipo === 'login' 
            ? 'rgba(59, 130, 246, 0.3) 0px 4px 15px'
            : 'rgba(39, 174, 96, 0.3) 0px 4px 15px';
        }}
      >
        {texto}
      </button>

      {mostrarLogin && (
        <LoginSimple 
          onClose={() => setMostrarLogin(false)}
          onSuccess={handleSuccess}
        />
      )}

      {mostrarRegistro && (
        <RegistroSimple 
          onClose={() => setMostrarRegistro(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default BotonAuth;
