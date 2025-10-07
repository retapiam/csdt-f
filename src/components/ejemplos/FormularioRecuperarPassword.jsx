import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import csdtApiService from '../../services/csdtApiService';

/**
 * Componente para recuperar contraseña
 * Compatible con el backend Laravel
 * Usa email y documento para verificar identidad
 */
const FormularioRecuperarPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    documento: ''
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

  // Validar email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones del frontend
    const nuevosErrores = {};

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

    // Si hay errores, mostrarlos y detener
    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      toast.error('Por favor completa todos los campos correctamente');
      return;
    }

    setLoading(true);

    try {
      const response = await csdtApiService.post('/auth/recuperar-contrasena', {
        email: formData.email.toLowerCase().trim(),
        documento: formData.documento.trim()
      });
      
      if (response.data.success) {
        setSuccess(true);
        toast.success(response.data.message || '¡Contraseña recuperada exitosamente!');
        
        // Mostrar información adicional
        toast.success('Tu nueva contraseña es tu número de cédula. Te recomendamos cambiarla después de iniciar sesión.', {
          duration: 8000
        });

        // Redirigir al login después de unos segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        // Manejar errores del backend
        if (response.data.errors) {
          setErrors(response.data.errors);
        }
        toast.error(response.data.message || 'No se pudo recuperar la contraseña');
      }
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.errors) {
          setErrors(errorData.errors);
        }
        
        toast.error(errorData.message || 'Error al recuperar la contraseña');
      } else if (error.message?.includes('Network')) {
        toast.error('Error de conexión. Verifica tu internet e intenta nuevamente.');
      } else {
        toast.error('Error al recuperar la contraseña. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="mb-4 text-6xl">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">¡Contraseña Recuperada!</h2>
          <p className="text-gray-700 mb-4">
            Tu contraseña ha sido restablecida exitosamente.
          </p>
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <p className="text-sm text-blue-800 font-medium mb-2">
              Tu nueva contraseña es tu número de documento (cédula)
            </p>
            <p className="text-xs text-blue-700">
              Por seguridad, te recomendamos cambiar tu contraseña después de iniciar sesión
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Ir a Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Recuperar Contraseña</h2>
      <p className="text-sm text-gray-600 mb-6">
        Ingresa tu correo electrónico y número de documento para recuperar tu contraseña
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {Array.isArray(errors.email) ? errors.email[0] : errors.email}
            </p>
          )}
        </div>

        {/* Documento */}
        <div>
          <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-1">
            Número de Documento <span className="text-red-500">*</span>
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
          {errors.documento && (
            <p className="mt-1 text-sm text-red-600">
              {Array.isArray(errors.documento) ? errors.documento[0] : errors.documento}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Ingresa el número de documento con el que te registraste
          </p>
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
          {loading ? 'Recuperando contraseña...' : 'Recuperar Contraseña'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <a href="/login" className="text-sm text-blue-600 hover:underline">
          Volver al inicio de sesión
        </a>
      </div>

      {/* Información de ayuda */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-md">
        <p className="text-sm font-medium text-yellow-800 mb-2">Información importante:</p>
        <ul className="text-xs text-yellow-700 space-y-1">
          <li>• El correo y documento deben coincidir con tu registro</li>
          <li>• Tu nueva contraseña será tu número de documento</li>
          <li>• Después de recuperarla, cámbiala por una más segura</li>
          <li>• Si no recuerdas tu documento, contacta al administrador</li>
        </ul>
      </div>
    </div>
  );
};

export default FormularioRecuperarPassword;

