import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📧 Contáctanos
          </h1>
          <p className="text-gray-600 text-lg">
            Estamos aquí para ayudarte. Envíanos tu mensaje
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario de Contacto */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Envíanos un Mensaje
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Asunto de tu mensaje"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                <span>Enviar Mensaje</span>
              </Button>
            </form>
          </Card>

          {/* Información de Contacto */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Dirección</p>
                    <p className="text-gray-600">
                      Calle Principal #123<br/>
                      Bogotá, Colombia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <PhoneIcon className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Teléfono</p>
                    <p className="text-gray-600">
                      +57 (1) 234-5678<br/>
                      +57 300 123 4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <EnvelopeIcon className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">
                      contacto@csdt.gov.co<br/>
                      info@csdt.gov.co
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <h3 className="text-xl font-semibold mb-3">
                ⏰ Horario de Atención
              </h3>
              <div className="space-y-2">
                <p>Lunes a Viernes</p>
                <p className="text-2xl font-bold">8:00 AM - 5:00 PM</p>
                <p className="text-sm opacity-90 mt-4">
                  Sábados, domingos y festivos: Cerrado
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;

