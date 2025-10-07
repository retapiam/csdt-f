import React from 'react';
import { Card } from '../../../components/ui/card';
import { QuestionMarkCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const Ayuda = () => {
  const faqs = [
    { pregunta: '¿Cómo registro un proyecto?', respuesta: 'Dirígete al módulo de Proyectos y haz clic en "Nuevo Proyecto"' },
    { pregunta: '¿Cómo contacto con soporte?', respuesta: 'Usa el formulario de contacto o llama al +57 (1) 234-5678' },
    { pregunta: '¿Dónde consulto documentos?', respuesta: 'Ve a la sección de Documentos en el menú principal' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">❓ Centro de Ayuda</h1>
          <p className="text-gray-600">Encuentra respuestas a tus preguntas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <QuestionMarkCircleIcon className="w-7 h-7 mr-2 text-blue-600" />
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">{faq.pregunta}</h3>
                  <p className="text-gray-600 text-sm">{faq.respuesta}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <ChatBubbleLeftRightIcon className="w-7 h-7 mr-2" />
              Soporte Directo
            </h3>
            <p className="mb-4">¿No encontraste lo que buscabas?</p>
            <p className="text-lg font-bold">Contáctanos al:</p>
            <p className="text-2xl font-bold mt-2">+57 (1) 234-5678</p>
            <p className="mt-4">O escríbenos a:</p>
            <p className="font-semibold">soporte@csdt.gov.co</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Ayuda;

