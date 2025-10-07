import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * Componente mejorado para registrar un cliente
 * Compatible con el backend Laravel
 * Incluye validaciones completas y mapeo correcto de datos
 */
const FormularioRegistroCliente = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    confirmar_password: '',
    telefono: '',
    documento: '',
    tipo_documento: 'CC',
    rol: 'cliente' // Cliente por defecto
  });

  // Limpiar error cuando el usuario empieza a escribir
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo actual
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validar email en tiempo real
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validar contraseña
  const validarPassword = (password) => {
    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'La contraseña debe contener al menos una letra minúscula';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'La contraseña debe contener al menos una letra mayúscula';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'La contraseña debe contener al menos un número';
    }
    return null;
  };

  // Validar nombres (solo letras y espacios)
  const validarNombre = (nombre) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones completas del frontend
    const nuevosErrores = {};

    // Validar nombres
    if (!formData.nombres.trim()) {
      nuevosErrores.nombres = 'El nombre es obligatorio';
    } else if (!validarNombre(formData.nombres)) {
      nuevosErrores.nombres = 'El nombre solo puede contener letras y espacios';
    }

    // Validar apellidos
    if (!formData.apellidos.trim()) {
      nuevosErrores.apellidos = 'Los apellidos son obligatorios';
    } else if (!validarNombre(formData.apellidos)) {
      nuevosErrores.apellidos = 'Los apellidos solo pueden contener letras y espacios';
    }

    // Validar email
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio';
    } else if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'El correo electrónico no es válido';
    }

    // Validar documento
    if (!formData.documento.trim()) {
      nuevosErrores.documento = 'El número de documento es obligatorio';
    }

    // Validar contraseña
    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es obligatoria';
    } else {
      const errorPassword = validarPassword(formData.password);
      if (errorPassword) {
        nuevosErrores.password = errorPassword;
      }
    }

    // Validar confirmación de contraseña
    if (!formData.confirmar_password) {
      nuevosErrores.confirmar_password = 'Debe confirmar la contraseña';
    } else if (formData.password !== formData.confirmar_password) {
      nuevosErrores.confirmar_password = 'Las contraseñas no coinciden';
    }

    // Validar teléfono si está presente
    if (formData.telefono && !/^[0-9+\-\s()]+$/.test(formData.telefono)) {
      nuevosErrores.telefono = 'El teléfono solo puede contener números y caracteres válidos';
    }

    // Si hay errores, mostrarlos y detener
    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      toast.error('Por favor corrige los errores en el formulario');
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para el backend (mapeo correcto)
      const datosRegistro = {
        name: `${formData.nombres.trim()} ${formData.apellidos.trim()}`,
        nombres: formData.nombres.trim(),
        apellidos: formData.apellidos.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        password_confirmation: formData.confirmar_password,
        telefono: formData.telefono.trim(),
        documento: formData.documento.trim(),
        tipo_documento: formData.tipo_documento,
        rol: formData.rol
      };

      const result = await register(datosRegistro);
      
      if (result.success) {
        toast.success(result.message || '¡Registro exitoso! Bienvenido');
        
        // Redirigir al dashboard según el rol
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        // Manejar errores del backend
        if (result.errors) {
          setErrors(result.errors);
        }
        toast.error(result.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      
      // Manejar errores de red o del servidor
      if (error.message?.includes('Network')) {
        toast.error('Error de conexión. Verifica tu internet e intenta nuevamente.');
      } else {
        toast.error(error.message || 'Error al registrar usuario');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Cliente</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombres */}
        <div>
          <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">
            Nombres <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.nombres 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Juan Carlos"
            required
          />
          {errors.nombres && (
            <p className="mt-1 text-sm text-red-600">{errors.nombres}</p>
          )}
        </div>

        {/* Apellidos */}
        <div>
          <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-1">
            Apellidos <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.apellidos 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Pérez García"
            required
          />
          {errors.apellidos && (
            <p className="mt-1 text-sm text-red-600">{errors.apellidos}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="correo@ejemplo.com"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {Array.isArray(errors.email) ? errors.email[0] : errors.email}
            </p>
          )}
        </div>

        {/* Tipo de Documento y Número */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="tipo_documento" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo Doc. <span className="text-red-500">*</span>
            </label>
            <select
              id="tipo_documento"
              name="tipo_documento"
              value={formData.tipo_documento}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="TI">TI</option>
              <option value="NIT">NIT</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          <div>
            <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-1">
              No. Documento <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="documento"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.documento 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="1234567890"
              required
            />
          </div>
        </div>
        {errors.documento && (
          <p className="mt-1 text-sm text-red-600">
            {Array.isArray(errors.documento) ? errors.documento[0] : errors.documento}
          </p>
        )}

        {/* Teléfono */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono (Opcional)
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.telefono 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="3001234567"
          />
          {errors.telefono && (
            <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
            required
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número
          </p>
        </div>

        {/* Confirmar Contraseña */}
        <div>
          <label htmlFor="confirmar_password" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Contraseña <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmar_password"
            name="confirmar_password"
            value={formData.confirmar_password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.confirmar_password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Repite tu contraseña"
            required
          />
          {errors.confirmar_password && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmar_password}</p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {loading ? 'Registrando...' : 'Registrar Cliente'}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        ¿Ya tienes cuenta?{' '}
        <a href="/login" className="text-blue-600 hover:underline font-medium">
          Inicia sesión aquí
        </a>
      </p>
    </div>
  );
};

export default FormularioRegistroCliente;

