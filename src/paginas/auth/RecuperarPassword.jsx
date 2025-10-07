import React from 'react';
import FormularioRecuperarPassword from '../../components/ejemplos/FormularioRecuperarPassword';

/**
 * Página de Recuperar Contraseña
 * Página pública para que los usuarios recuperen su contraseña
 */
const RecuperarPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            CSDT
          </h1>
          <p className="text-lg text-gray-600">
            Centro de Servicios de Derecho Territorial
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Recupera el acceso a tu cuenta de forma segura
          </p>
        </div>

        {/* Formulario de Recuperar Password */}
        <FormularioRecuperarPassword />
      </div>
    </div>
  );
};

export default RecuperarPassword;

