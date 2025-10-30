import React, { useState, useEffect } from 'react';
import authService from '@services/authService';

const RegistroMejorado = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    password_confirmation: '',
    telefono: '',
    documento: '',
    tipo_documento: 'cc',
    fecha_nacimiento: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    genero: 'n',
    rol: 'cli',
    // Campos de profesión y nivel
    profesion_id: '',
    nivel_id: '',
    años_experiencia: 0,
    numero_matricula: '',
    entidad_matricula: '',
    especializaciones: [],
    certificaciones: [],
    perfil_profesional: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errores, setErrores] = useState({});
  
  // Estados para datos de referencia
  const [profesiones, setProfesiones] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [nivelesFiltrados, setNivelesFiltrados] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const tiposDocumento = [
    { value: 'cc', label: 'Cédula de Ciudadanía' },
    { value: 'ce', label: 'Cédula de Extranjería' },
    { value: 'ti', label: 'Tarjeta de Identidad' },
    { value: 'pasaporte', label: 'Pasaporte' },
    { value: 'nit', label: 'NIT' }
  ];

  const roles = [
    { value: 'cli', label: 'Cliente' },
    { value: 'ope', label: 'Operador' },
    { value: 'adm', label: 'Administrador' }
  ];

  const generos = [
    { value: 'm', label: 'Masculino' },
    { value: 'f', label: 'Femenino' },
    { value: 'o', label: 'Otro' },
    { value: 'n', label: 'No especificar' }
  ];

  // Cargar datos de referencia (desactivado: endpoints no existen en backend actual)
  useEffect(() => {
    setLoadingData(true);
    setProfesiones([]);
    setNiveles([]);
    setNivelesFiltrados([]);
    setLoadingData(false);
  }, []);

  // Filtrar niveles según la profesión seleccionada
  useEffect(() => {
    if (formData.profesion_id) {
      const profesionSeleccionada = profesiones.find(p => p.id === parseInt(formData.profesion_id));
      if (profesionSeleccionada) {
        const nivelesCompatibles = niveles.filter(nivel => 
          nivel.numero_nivel >= profesionSeleccionada.nivel_minimo &&
          nivel.numero_nivel <= profesionSeleccionada.nivel_maximo &&
          nivel.categoria === profesionSeleccionada.categoria
        );
        setNivelesFiltrados(nivelesCompatibles);
        
        // Si el nivel actual no es compatible, limpiarlo
        if (formData.nivel_id && !nivelesCompatibles.find(n => n.id === parseInt(formData.nivel_id))) {
          setFormData(prev => ({ ...prev, nivel_id: '' }));
        }
      }
    } else {
      setNivelesFiltrados(niveles);
    }
  }, [formData.profesion_id, profesiones, niveles]);

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

  const handleArrayChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    // Validaciones básicas
    if (!formData.nombres.trim()) {
      nuevosErrores.nombres = 'Los nombres son requeridos';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombres)) {
      nuevosErrores.nombres = 'Los nombres solo pueden contener letras y espacios';
    }
    
    if (!formData.apellidos.trim()) {
      nuevosErrores.apellidos = 'Los apellidos son requeridos';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellidos)) {
      nuevosErrores.apellidos = 'Los apellidos solo pueden contener letras y espacios';
    }
    
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = 'El correo no es válido';
    }
    
    if (!formData.password.trim()) {
      nuevosErrores.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      nuevosErrores.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (formData.password !== formData.password_confirmation) {
      nuevosErrores.password_confirmation = 'Las contraseñas no coinciden';
    }
    
    if (!formData.documento.trim()) {
      nuevosErrores.documento = 'El documento es requerido';
    }
    
    // Validaciones de profesión y nivel
    if (formData.profesion_id && formData.nivel_id) {
      const profesionSeleccionada = profesiones.find(p => p.id === parseInt(formData.profesion_id));
      const nivelSeleccionado = niveles.find(n => n.id === parseInt(formData.nivel_id));
      
      if (profesionSeleccionada && nivelSeleccionado) {
        if (nivelSeleccionado.numero_nivel < profesionSeleccionada.nivel_minimo ||
            nivelSeleccionado.numero_nivel > profesionSeleccionada.nivel_maximo) {
          nuevosErrores.nivel_id = 'El nivel seleccionado no es compatible con la profesión';
        }
        
        if (nivelSeleccionado.experiencia_requerida > formData.años_experiencia) {
          nuevosErrores.años_experiencia = `Se requieren al menos ${nivelSeleccionado.experiencia_requerida} años de experiencia para este nivel`;
        }
      }
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
      const resultado = await authService.register(formData);

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

  if (loadingData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Cargando datos...</p>
          </div>
        </div>
      </div>
    );
  }

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
        maxWidth: '600px',
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
            Registro Mejorado - CSDT
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese su correo electrónico"
                />
                {renderError('email')}
              </div>

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
                {renderError('telefono')}
              </div>
            </div>
          </div>

          {/* Documento */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Documentación</h3>
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
          </div>

          {/* Profesión y Nivel */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Profesional</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profesión
                </label>
                <select
                  name="profesion_id"
                  value={formData.profesion_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione una profesión</option>
                  {profesiones.map(profesion => (
                    <option key={profesion.id} value={profesion.id}>
                      {profesion.nombre} ({profesion.categoria})
                    </option>
                  ))}
                </select>
                {renderError('profesion_id')}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel Profesional
                </label>
                <select
                  name="nivel_id"
                  value={formData.nivel_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!formData.profesion_id}
                >
                  <option value="">Seleccione un nivel</option>
                  {nivelesFiltrados.map(nivel => (
                    <option key={nivel.id} value={nivel.id}>
                      {nivel.nombre} (Nivel {nivel.numero_nivel})
                    </option>
                  ))}
                </select>
                {renderError('nivel_id')}
                {!formData.profesion_id && (
                  <p className="text-sm text-gray-500 mt-1">Seleccione una profesión primero</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Años de Experiencia
                </label>
                <input
                  type="number"
                  name="años_experiencia"
                  value={formData.años_experiencia}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {renderError('años_experiencia')}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Matrícula
                </label>
                <input
                  type="text"
                  name="numero_matricula"
                  value={formData.numero_matricula}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Si aplica"
                />
                {renderError('numero_matricula')}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Perfil Profesional
              </label>
              <textarea
                name="perfil_profesional"
                value={formData.perfil_profesional}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describa su experiencia y especialización profesional"
              />
              {renderError('perfil_profesional')}
            </div>
          </div>

          {/* Contraseñas */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Seguridad</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mínimo 8 caracteres"
                />
                {renderError('password')}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Contraseña *
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirme su contraseña"
                />
                {renderError('password_confirmation')}
              </div>
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
            {renderError('rol')}
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
              {loading ? 'Registrando...' : 'Registrarse en CSDT'}
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

export default RegistroMejorado;