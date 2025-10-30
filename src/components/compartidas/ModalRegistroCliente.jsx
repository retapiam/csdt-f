import React, { useState, useEffect } from 'react';
import authService from '@services/authService';

const ModalRegistroCliente = ({ onClose, onSuccess, onCambiarLogin }) => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    tipoDocumento: 'cc',
    numeroDocumento: '',
    password: '',
    confirmarPassword: '',
    rol: 'cli'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errores, setErrores] = useState({});

  const tiposDocumento = [
    { value: 'cc', label: 'Cédula de Ciudadanía' },
    { value: 'ce', label: 'Cédula de Extranjería' },
    { value: 'ti', label: 'Tarjeta de Identidad' },
    { value: 'pasaporte', label: 'Pasaporte' },
    { value: 'nit', label: 'NIT' }
  ];

  const roles = [
    { value: 'cli', label: 'Cliente', icon: '👑' },
    { value: 'ope', label: 'Operador', icon: '⚙️' },
    { value: 'adm', label: 'Administrador', icon: '🔧' }
  ];

  // Sin verificación en tiempo real para agilizar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar errores del campo al escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    // Validar nombre
    if (!formData.nombreCompleto.trim()) {
      nuevosErrores.nombreCompleto = 'El nombre completo es requerido';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombreCompleto)) {
      nuevosErrores.nombreCompleto = 'El nombre solo puede contener letras y espacios';
    }
    
    // Validar email
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'El correo no es válido';
    }
    
    // Validar documento
    if (!formData.numeroDocumento.trim()) {
      nuevosErrores.numeroDocumento = 'El número de documento es requerido';
    }
    
    // Validar contraseña con requisitos más fuertes
    if (!formData.password.trim()) {
      nuevosErrores.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      nuevosErrores.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(formData.password)) {
      nuevosErrores.password = 'Debe contener al menos una mayúscula, una minúscula y un número';
    }
    
    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmarPassword) {
      nuevosErrores.confirmarPassword = 'Las contraseñas no coinciden';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validarFormulario()) {
      setError('Por favor, corrija los errores en el formulario. Verifica que la contraseña tenga al menos 8 caracteres, una mayúscula, una minúscula y un número.');
      return;
    }

    // Verificar si hay errores de disponibilidad antes de enviar
    if (errores.email || errores.numeroDocumento) {
      setError('Por favor, use un email y documento que no estén registrados');
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para enviar al backend
      const datosRegistro = {
        name: formData.nombreCompleto,
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        password_confirmation: formData.confirmarPassword,
        documento: formData.numeroDocumento.trim(),
        tipo_documento: formData.tipoDocumento,
        rol: formData.rol
      };

      const resultado = await authService.register(datosRegistro);

      if (resultado.success) {
        // Mostrar mensaje de éxito con información adicional
        let mensajeExito = resultado.message || '¡Registro exitoso! Redirigiendo...';
        
        if (resultado.registro_info) {
          mensajeExito = `${resultado.message} Registrado el ${resultado.registro_info.fecha_registro}. Estado: ${resultado.registro_info.estado}. Conexión DB: ${resultado.registro_info.conexion_db}.`;
        }
        
        setSuccess(mensajeExito);
        
        if (onSuccess) {
          onSuccess(resultado);
        }
        
        // Cerrar modal después de un breve delay
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 2000);
      } else {
        // Mostrar mensaje de error específico del backend
        setError(resultado.message || 'Error al registrar usuario');
        
        // Mostrar información adicional si está disponible
        if (resultado.usuario_existente) {
          const info = resultado.usuario_existente;
          if (info.tipo_registro === 'email') {
            setError(`${resultado.message} El usuario fue registrado el ${info.fecha_registro}.`);
          } else if (info.tipo_registro === 'documento') {
            setError(`${resultado.message} Documento ${info.tipo_documento}: ${info.documento}, registrado el ${info.fecha_registro}.`);
          }
        }
        
        // Mostrar estado de conexión a la base de datos
        if (resultado.conexion_db === 'desconectado') {
          setError('Error de conexión con la base de datos. El servidor no puede procesar el registro en este momento.');
        }
        
        // Manejar errores del backend
        if (resultado.errors) {
          const nuevosErrores = {};
          Object.keys(resultado.errors).forEach(key => {
            if (key === 'email') {
              nuevosErrores.email = Array.isArray(resultado.errors[key]) 
                ? resultado.errors[key][0] 
                : resultado.errors[key];
            } else if (key === 'documento') {
              nuevosErrores.numeroDocumento = Array.isArray(resultado.errors[key]) 
                ? resultado.errors[key][0] 
                : resultado.errors[key];
            } else if (key === 'name') {
              nuevosErrores.nombreCompleto = Array.isArray(resultado.errors[key]) 
                ? resultado.errors[key][0] 
                : resultado.errors[key];
            } else if (key === 'password') {
              nuevosErrores.password = Array.isArray(resultado.errors[key]) 
                ? resultado.errors[key][0] 
                : resultado.errors[key];
            }
          });
          setErrores(nuevosErrores);
        }
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setError('Error de conexión. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarRol = (nuevoRol) => {
    setFormData(prev => ({
      ...prev,
      rol: nuevoRol
    }));
  };

  const rolActual = roles.find(r => r.value === formData.rol);

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
            Registrarse como {rolActual?.label}
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
          {/* Selector de Rol */}
          <div style={{
            padding: '12px 15px',
            backgroundColor: formData.rol === 'cli' ? '#f3e5f5' : 
                           formData.rol === 'ope' ? '#e3f2fd' : '#fce4ec',
            border: `2px solid ${formData.rol === 'cli' ? '#8e44ad' : 
                                 formData.rol === 'ope' ? '#2196f3' : '#e91e63'}`,
            borderRadius: '10px',
            fontSize: '14px',
            color: '#2c3e50',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ marginRight: '10px' }}>{rolActual?.icon}</span>
              Registrándose como: {rolActual?.label}
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              {roles.map(rol => (
                <button
                  key={rol.value}
                  type="button"
                  onClick={() => handleCambiarRol(rol.value)}
                  style={{
                    background: formData.rol === rol.value ? '#3498db' : 'transparent',
                    border: 'none',
                    color: formData.rol === rol.value ? 'white' : '#3498db',
                    cursor: 'pointer',
                    fontSize: '12px',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    textDecoration: formData.rol === rol.value ? 'none' : 'underline'
                  }}
                >
                  {rol.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nombre Completo */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Nombre Completo *
            </label>
            <input
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: errores.nombreCompleto ? '2px solid #e74c3c' : '2px solid #bdc3c7',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#f8f9fa',
                boxSizing: 'border-box'
              }}
              placeholder="Ingresa tu nombre completo"
            />
            {errores.nombreCompleto && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                {errores.nombreCompleto}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Email * {verificando.email && <span style={{ color: '#3498db', fontSize: '12px' }}>🔍 Verificando...</span>}
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
                ❌ {errores.email}
              </span>
            )}
            {!errores.email && formData.email && /\S+@\S+\.\S+/.test(formData.email) && !verificando.email && (
              <span style={{ color: '#27ae60', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                ✅ Email disponible
              </span>
            )}
          </div>

          {/* Tipo y Número de Documento */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px' }}>
            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Tipo Doc. *
              </label>
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #bdc3c7',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#f8f9fa',
                  boxSizing: 'border-box'
                }}
              >
                {tiposDocumento.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                Número Doc. * {verificando.documento && <span style={{ color: '#3498db', fontSize: '12px' }}>🔍 Verificando...</span>}
              </label>
              <input
                type="text"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: errores.numeroDocumento ? '2px solid #e74c3c' : '2px solid #bdc3c7',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#f8f9fa',
                  boxSizing: 'border-box'
                }}
                placeholder="Número de documento"
              />
              {errores.numeroDocumento && (
                <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  ❌ {errores.numeroDocumento}
                </span>
              )}
              {!errores.numeroDocumento && formData.numeroDocumento && formData.numeroDocumento.length >= 5 && !verificando.documento && (
                <span style={{ color: '#27ae60', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  ✅ Documento disponible
                </span>
              )}
            </div>
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
            {!errores.password && formData.password && (
              <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
                <div>Requisitos: Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número</div>
              </div>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: 'bold',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Confirmar Contraseña *
            </label>
            <input
              type="password"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 15px',
                border: errores.confirmarPassword ? '2px solid #e74c3c' : '2px solid #bdc3c7',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: '#f8f9fa',
                boxSizing: 'border-box'
              }}
              placeholder="Confirma tu contraseña"
            />
            {errores.confirmarPassword && (
              <span style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                {errores.confirmarPassword}
              </span>
            )}
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

          {/* Mensaje de Éxito */}
          {success && (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #86efac',
              color: '#166534',
              padding: '10px',
              borderRadius: '6px',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>✅</span>
              <span>{success}</span>
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
                  : 'linear-gradient(135deg, rgb(39, 174, 96) 0%, rgb(46, 204, 113) 100%)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                boxShadow: 'rgba(39, 174, 96, 0.3) 0px 4px 15px'
              }}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>

          {/* Link a Login */}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>¿Ya tienes cuenta? </span>
            <button
              type="button"
              onClick={onCambiarLogin}
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
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistroCliente;

