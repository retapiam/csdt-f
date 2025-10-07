import React, { useState } from 'react';
import authService from '@services/authService';
import { mapUsuarioToBackend } from '@utils/dataMappers';

const RegistroSimple = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    contrasena_confirmacion: '',
    telefono: '',
    documento: '',
    tipo_documento: 'cc',
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
    { value: 'pp', label: 'Pasaporte' },
    { value: 'nit', label: 'NIT' }
  ];

  const roles = [
    { value: 'cli', label: 'Cliente' },
    { value: 'ope', label: 'Operador' },
    { value: 'adm', label: 'Administrador' }
  ];

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
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    // Validar nombres
    if (!formData.nombres.trim()) {
      nuevosErrores.nombres = 'Los nombres son requeridos';
    }
    
    // Validar apellidos
    if (!formData.apellidos.trim()) {
      nuevosErrores.apellidos = 'Los apellidos son requeridos';
    }
    
    // Validar correo
    if (!formData.correo.trim()) {
      nuevosErrores.correo = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      nuevosErrores.correo = 'El correo no es válido';
    }
    
    // Validar contraseña
    if (!formData.contrasena.trim()) {
      nuevosErrores.contrasena = 'La contraseña es requerida';
    } else if (formData.contrasena.length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Validar confirmación de contraseña
    if (formData.contrasena !== formData.contrasena_confirmacion) {
      nuevosErrores.contrasena_confirmacion = 'Las contraseñas no coinciden';
    }
    
    // Validar documento
    if (!formData.documento.trim()) {
      nuevosErrores.documento = 'El documento es requerido';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      // Convertir datos de frontend a backend usando mapper
      const datosBackend = mapUsuarioToBackend(formData);
      const resultado = await authService.register(datosBackend);

      if (resultado.success) {
        setSuccess(resultado.message);
        if (onSuccess) {
          onSuccess(resultado);
        }
        if (onClose) {
          setTimeout(() => onClose(), 2000);
        }
      } else {
        setError(resultado.message);
        if (resultado.errors) {
          setErrores(resultado.errors);
        }
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setError('Error al procesar el registro');
    } finally {
      setLoading(false);
    }
  };

  const renderError = (campo) => {
    if (errores[campo]) {
      return <span className="text-red-500 text-sm mt-1 block">{errores[campo]}</span>;
    }
    return null;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      overflowY: 'auto',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            Registro de Usuario
          </h2>
          <button
            onClick={onClose}
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

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Información Personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombres *
              </label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese sus nombres"
              />
              {renderError('nombres')}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos *
              </label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese sus apellidos"
              />
              {renderError('apellidos')}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico *
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su correo electrónico"
            />
            {renderError('correo')}
          </div>

          {/* Documento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Documento *
              </label>
              <select
                name="tipo_documento"
                value={formData.tipo_documento}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tiposDocumento.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Documento *
              </label>
              <input
                type="text"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su número de documento"
              />
              {renderError('documento')}
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su teléfono"
            />
          </div>

          {/* Contraseñas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña *
              </label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su contraseña"
              />
              {renderError('contrasena')}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                name="contrasena_confirmacion"
                value={formData.contrasena_confirmacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirme su contraseña"
              />
              {renderError('contrasena_confirmacion')}
            </div>
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Usuario *
            </label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map(rol => (
                <option key={rol.value} value={rol.value}>
                  {rol.label}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de Registro */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 18px',
                border: 'medium',
                borderRadius: '10px',
                background: loading 
                  ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                  : 'linear-gradient(135deg, rgb(39, 174, 96) 0%, rgb(46, 204, 113) 100%)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                boxShadow: 'rgba(39, 174, 96, 0.3) 0px 4px 15px',
                width: '100%',
                fontSize: '16px'
              }}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>

        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <p>¿Ya tienes cuenta? <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegistroSimple;