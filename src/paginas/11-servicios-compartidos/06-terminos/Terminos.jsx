import React from 'react';
import { Card } from '../../../components/ui/card';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const Terminos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📜 Términos y Condiciones</h1>
          <p className="text-gray-600">Términos de uso del servicio</p>
        </div>

        <Card className="p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <DocumentTextIcon className="w-7 h-7 mr-2 text-blue-600" />
              Términos de Uso
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <section>
                <h3 className="text-xl font-semibold mb-2">1. Aceptación de Términos</h3>
                <p>Al acceder y utilizar este sistema, usted acepta cumplir con estos términos y condiciones.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">2. Uso del Servicio</h3>
                <p>El servicio está destinado únicamente para fines legales y autorizados conforme a la normativa vigente.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">3. Privacidad</h3>
                <p>Nos comprometemos a proteger su información personal conforme a las leyes de protección de datos.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">4. Responsabilidades</h3>
                <p>Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">5. Modificaciones</h3>
                <p>Nos reservamos el derecho de modificar estos términos en cualquier momento.</p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Última actualización: 1 de Octubre de 2024
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Terminos;

