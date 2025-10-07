import React from 'react';
import FormularioLogin from '../../components/ejemplos/FormularioLogin';

/**
 * Página de Login
 * Página pública para que los usuarios inicien sesión
 */
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            CSDT
          </h1>
          <p className="text-lg text-gray-600">
            Centro de Servicios de Derecho Territorial
          </p>
        </div>

        {/* Formulario de Login */}
        <FormularioLogin />
      </div>
    </div>
  );
};

export default Login;

