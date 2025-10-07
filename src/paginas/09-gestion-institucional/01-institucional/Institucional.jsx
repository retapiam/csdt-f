import React from 'react';
import { Card } from '../../../components/ui/card';
import { 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  DocumentTextIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const Institucional = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏛️ Información Institucional
          </h1>
          <p className="text-gray-600 text-lg">
            Consejo Social de Desarrollo Territorial - CSDT
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Acerca de Nosotros */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <BuildingOfficeIcon className="w-7 h-7 mr-2 text-blue-600" />
              Acerca de Nosotros
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                El <strong>Consejo Social de Desarrollo Territorial (CSDT)</strong> es una organización dedicada 
                a promover el desarrollo sostenible y la participación ciudadana en la gestión territorial.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-800 mb-2">🎯 Misión</h3>
                <p>
                  Facilitar procesos de desarrollo territorial integral, promoviendo la participación 
                  activa de las comunidades y el fortalecimiento institucional.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-green-800 mb-2">🌟 Visión</h3>
                <p>
                  Ser reconocidos como líderes en gestión territorial participativa y desarrollo 
                  comunitario sostenible en el país.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-purple-800 mb-2">💡 Valores</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Participación ciudadana</li>
                  <li>Transparencia</li>
                  <li>Desarrollo sostenible</li>
                  <li>Inclusión social</li>
                  <li>Responsabilidad territorial</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Información de Contacto */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <DocumentTextIcon className="w-6 h-6 mr-2 text-purple-600" />
              Información de Contacto
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Dirección</p>
                  <p className="text-gray-600">Calle Principal #123<br/>Bogotá, Colombia</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <PhoneIcon className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Teléfono</p>
                  <p className="text-gray-600">+57 (1) 234-5678<br/>+57 300 123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <EnvelopeIcon className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-600">contacto@csdt.gov.co<br/>info@csdt.gov.co</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <UserGroupIcon className="w-5 h-5 mr-2 text-orange-600" />
                  Áreas de Trabajo
                </h4>
                <div className="space-y-2">
                  {[
                    'Desarrollo Territorial',
                    'Participación Ciudadana',
                    'Derechos Étnicos',
                    'Control Social',
                    'Gestión Ambiental'
                  ].map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-gray-700">{area}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sección de Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Años de Experiencia', valor: '15+', icono: '📅' },
            { label: 'Proyectos Completados', valor: '350+', icono: '✅' },
            { label: 'Comunidades Beneficiadas', valor: '120+', icono: '🏘️' },
            { label: 'Aliados Estratégicos', valor: '45+', icono: '🤝' }
          ].map((stat, index) => (
            <Card key={index} className="p-4 text-center hover:shadow-lg transition">
              <div className="text-3xl mb-2">{stat.icono}</div>
              <p className="text-2xl font-bold text-blue-600">{stat.valor}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Institucional;

