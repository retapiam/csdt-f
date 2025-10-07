import React, { useState } from 'react';
import csdtApiService from '@services/csdtApiService';
import ModalRegistroCliente from './ModalRegistroCliente';

const ModalRecuperarContrasena = ({ onClose, onVolver }) => {
  const [formData, setFormData] = useState({
    email: '',
    documento: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errores, setErrores] = useState({});
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

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
    
    if (!formData.documento.trim()) {
      nuevosErrores.documento = 'El número de cédula es requerido';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validarFormulario()) {
      setError('Por favor, completa todos los campos correctamente');
      return;
    }

    setLoading(true);

    try {
      const response = await csdtApiService.post('/auth/recuperar-contrasena', {
        email: formData.email,
        documento: formData.documento
      });

      if (response.data.success) {
        setSuccess(`✅ ${response.data.message}`);
        // Limpiar formulario
        setFormData({ email: '', documento: '' });
        
        // Cerrar modal después de 3 segundos
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 3000);
      } else {
        setError(response.data.message || 'Error al recuperar contraseña');
      }
    } catch (error) {
      console.error('Error en recuperación:', error);
      
      if (error.response?.status === 404) {
        setError('No se encontró ningún usuario con estos datos. Verifica tu correo y número de cédula.');
        setErrores({
          email: 'Verifica tus datos',
          documento: 'Verifica tus datos'
        });
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message.includes('Network')) {
        setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else {
        setError('Error al procesar la solicitud. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegistroSuccess = (resultado) => {
    console.log('Registro exitoso desde recuperar contraseña:', resultado);
    setMostrarRegistro(false);
    if (onClose) {
      onClose();
    }
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
          maxWidth: '450px',
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
            Recuperar Contraseña
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

        {/* Mensaje informativo */}
        <div style={{
          backgroundColor: '#e3f2fd',
          border: '1px solid #90caf9',
          color: '#1565c0',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '13px'
        }}>
          <strong>🔐 Instrucciones:</strong>
          <br />
          Ingresa tu correo electrónico y número de cédula registrados. Te enviaremos un mensaje con tu nueva contraseña.
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
              placeholder="correo@ejemplo.com"
            />
            {errores.email && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                {errores.email}
              </span>
            )}
          </div>

          {/* Número de Cédula */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Número de Cédula *
            </label>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: errores.documento ? '2px solid #e74c3c' : '2px solid #bdc3c7',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#f8f9fa',
                boxSizing: 'border-box'
              }}
              placeholder="Número de documento registrado"
            />
            {errores.documento && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                {errores.documento}
              </span>
            )}
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '13px'
            }}>
              ❌ {error}
            </div>
          )}

          {/* Mensaje de Éxito */}
          {success && (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 'bold'
            }}>
              {success}
              <br />
              <small style={{ fontWeight: 'normal' }}>
                Tu contraseña se ha recuperado con tu número de cédula.
              </small>
            </div>
          )}

          {/* Botones */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onVolver || onClose}
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
              {onVolver ? 'Volver al Login' : 'Cancelar'}
            </button>
            <button
              type="submit"
              disabled={loading || success}
              style={{
                flex: 1,
                padding: '12px 18px',
                border: 'none',
                borderRadius: '10px',
                background: loading || success
                  ? 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)'
                  : 'linear-gradient(135deg, rgb(230, 126, 34) 0%, rgb(211, 84, 0) 100%)',
                color: 'white',
                cursor: loading || success ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                boxShadow: 'rgba(230, 126, 34, 0.3) 0px 4px 15px'
              }}
            >
              {loading ? 'Procesando...' : success ? 'Enviado ✓' : 'Recuperar'}
            </button>
          </div>

          {/* Enlace a Registro */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ color: 'rgb(107, 114, 128)', fontSize: '14px' }}>¿No tienes cuenta? </span>
            <button 
              type="button" 
              onClick={() => setMostrarRegistro(true)}
              style={{
                background: 'none', 
                border: 'none', 
                color: 'rgb(52, 152, 219)', 
                cursor: 'pointer', 
                fontWeight: 'bold', 
                fontSize: '14px', 
                textDecoration: 'underline'
              }}
            >
              Registrarse
            </button>
          </div>

          {/* Nota adicional */}
          <div style={{
            textAlign: 'center',
            marginTop: '10px',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            💡 Tip: Después de recuperar tu contraseña, podrás cambiarla desde tu perfil.
          </div>
        </form>
      </div>

      {/* Modal de Registro */}
      {mostrarRegistro && (
        <ModalRegistroCliente 
          onClose={() => setMostrarRegistro(false)}
          onSuccess={handleRegistroSuccess}
          onCambiarLogin={() => {
            setMostrarRegistro(false);
            if (onVolver) onVolver();
          }}
        />
      )}
    </div>
  );
};

export default ModalRecuperarContrasena;

