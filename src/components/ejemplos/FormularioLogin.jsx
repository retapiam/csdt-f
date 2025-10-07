import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * Componente mejorado para login
 * Compatible con el backend Laravel
 * Incluye validaciones completas y mejor manejo de errores
 */
const FormularioLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    // Validar contraseña
    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es obligatoria';
    }

    // Si hay errores, mostrarlos y detener
    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      toast.error('Por favor completa todos los campos correctamente');
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email.toLowerCase().trim(), formData.password);
      
      if (result.success) {
        toast.success(result.message || '¡Bienvenido!');
        
        // Redirigir según el rol (usar el rol mapeado)
        const rol = result.user?.rol || result.data?.user?.rol;
        
        // Pequeño delay para que se vea el mensaje de éxito
        setTimeout(() => {
          if (rol === 'adm' || rol === 'adm_gen' || rol === 'administrador' || rol === 'superadmin') {
            navigate('/dashboard');
          } else if (rol === 'ope' || rol === 'operador') {
            navigate('/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 800);
      } else {
        // Manejar errores del backend
        if (result.errors) {
          setErrors(result.errors);
        }
        toast.error(result.message || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      
      // Manejar diferentes tipos de errores
      if (error.message?.includes('Network')) {
        toast.error('Error de conexión. Verifica tu internet e intenta nuevamente.');
      } else if (error.message?.includes('401')) {
        toast.error('Credenciales inválidas. Verifica tu email y contraseña.');
        setErrors({
          email: 'Email o contraseña incorrectos',
          password: 'Email o contraseña incorrectos'
        });
      } else {
        toast.error(error.message || 'Error al iniciar sesión. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Iniciar Sesión</h2>
      
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
            placeholder="Tu contraseña"
            required
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {Array.isArray(errors.password) ? errors.password[0] : errors.password}
            </p>
          )}
        </div>

        {/* Olvidé contraseña */}
        <div className="flex items-center justify-end">
          <a href="/recuperar-password" className="text-sm text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
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
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        ¿No tienes cuenta?{' '}
        <a href="/registro" className="text-blue-600 hover:underline font-medium">
          Regístrate aquí
        </a>
      </p>

      {/* Información de ayuda */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm font-medium text-blue-800 mb-2">Información importante:</p>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Si olvidaste tu contraseña, usa la opción de recuperación</li>
          <li>• El email debe estar registrado en el sistema</li>
          <li>• Después de 3 intentos fallidos, espera unos minutos</li>
        </ul>
      </div>
    </div>
  );
};

export default FormularioLogin;

