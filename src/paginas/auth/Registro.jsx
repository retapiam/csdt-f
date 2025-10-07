import React from 'react';
import FormularioRegistroCliente from '../../components/ejemplos/FormularioRegistroCliente';

/**
 * Página de Registro
 * Página pública para que los usuarios se registren
 */
const Registro = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
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
            Crea tu cuenta para acceder a todos nuestros servicios
          </p>
        </div>

        {/* Formulario de Registro */}
        <FormularioRegistroCliente />
      </div>
    </div>
  );
};

export default Registro;

