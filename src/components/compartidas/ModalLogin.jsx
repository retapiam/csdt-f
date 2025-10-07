import React, { useState } from 'react';
import authService from '@services/authService';
import ModalRecuperarContrasena from './ModalRecuperarContrasena';

const ModalLogin = ({ onClose, onSuccess, onCambiarRegistro, onRecuperarContrasena }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errores, setErrores] = useState({});
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar errores del campo
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (error) {
      setError('');
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'El correo no es válido';
    }
    
    if (!formData.password.trim()) {
      nuevosErrores.password = 'La contraseña es requerida';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrores({});

    if (!validarFormulario()) {
      setError('Por favor, completa todos los campos correctamente');
      return;
    }

    setLoading(true);

    try {
      const resultado = await authService.login(formData.email, formData.password);

      if (resultado.success) {
        // Mostrar mensaje de éxito
        console.log('Login exitoso:', resultado);
        
        if (onSuccess) {
          onSuccess(resultado);
        }
        if (onClose) {
          setTimeout(() => onClose(), 1500);
        }
      } else {
        // Manejar errores específicos
        if (resultado.message.includes('Credenciales') || resultado.message.includes('incorrectos')) {
          setError('Email o contraseña incorrectos. Por favor, verifica tus datos.');
          setErrores({
            email: 'Verifica tus credenciales',
            password: 'Verifica tus credenciales'
          });
        } else if (resultado.message.includes('inactivo') || resultado.message.includes('suspendido')) {
          setError('Tu cuenta está inactiva o suspendida. Contacta al administrador.');
        } else if (resultado.message.includes('conectar') || resultado.message.includes('servidor')) {
          setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
        } else {
          setError(resultado.message || 'Error al iniciar sesión');
        }
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error inesperado. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecuperarContrasena = () => {
    setMostrarRecuperar(true);
  };

  const handleVolverAlLogin = () => {
    setMostrarRecuperar(false);
  };

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            margin: 0,
            color: '#2c3e50',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            Iniciar Sesión
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          {/* Email */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: errores.email ? '2px solid #e74c3c' : '2px solid #bdc3c7',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#f8f9fa',
                boxSizing: 'border-box'
              }}
              placeholder="Ingresa tu email"
            />
            {errores.email && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                {errores.email}
              </span>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Contraseña *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: errores.password ? '2px solid #e74c3c' : '2px solid #bdc3c7',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#f8f9fa',
                boxSizing: 'border-box'
              }}
              placeholder="Ingresa tu contraseña"
            />
            {errores.password && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                {errores.password}
              </span>
            )}
          </div>

          {/* Link Recuperar Contraseña */}
          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              onClick={handleRecuperarContrasena}
              style={{
                background: 'none',
                border: 'none',
                color: '#3498db',
                cursor: 'pointer',
                fontSize: '13px',
                textDecoration: 'underline',
                padding: 0
              }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '10px',
              borderRadius: '6px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Botones */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px 18px',
                border: '2px solid #bdc3c7',
                borderRadius: '10px',
                background: 'white',
                color: '#2c3e50',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 18px',
                border: 'none',
                borderRadius: '10px',
                background: loading 
                  ? 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)'
                  : 'linear-gradient(135deg, rgb(52, 152, 219) 0%, rgb(41, 128, 185) 100%)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                boxShadow: 'rgba(52, 152, 219, 0.3) 0px 4px 15px',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = 'rgba(52, 152, 219, 0.4) 0px 6px 20px';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'rgba(52, 152, 219, 0.3) 0px 4px 15px';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{ marginRight: '8px' }}>⏳</span>
                  Iniciando...
                </>
              ) : (
                <>
                  <span style={{ marginRight: '8px' }}>🔐</span>
                  Iniciar Sesión
                </>
              )}
            </button>
          </div>

          {/* Link a Registro */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>¿No tienes cuenta? </span>
            <button
              type="button"
              onClick={onCambiarRegistro}
              style={{
                background: 'none',
                border: 'none',
                color: '#3498db',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                textDecoration: 'underline'
              }}
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>

      {/* Modal de Recuperar Contraseña */}
      {mostrarRecuperar && (
        <ModalRecuperarContrasena 
          onClose={() => setMostrarRecuperar(false)}
          onVolver={handleVolverAlLogin}
        />
      )}
    </div>
  );
};

export default ModalLogin;

