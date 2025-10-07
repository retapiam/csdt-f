import React from 'react';
import { Card } from '../../../components/ui/card';
import { MegaphoneIcon, ClockIcon } from '@heroicons/react/24/outline';

const ConvocatoriasPublicas = () => {
  const convocatorias = [
    { titulo: 'Convocatoria para proyectos comunitarios', estado: 'Abierta', fechaCierre: '31 Oct 2024', color: 'green' },
    { titulo: 'Selección de veedores territoriales', estado: 'Abierta', fechaCierre: '15 Oct 2024', color: 'green' },
    { titulo: 'Programa de capacitación', estado: 'Próximamente', fechaCierre: '5 Nov 2024', color: 'yellow' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📢 Convocatorias Públicas</h1>
          <p className="text-gray-600">Consulta las convocatorias y oportunidades disponibles</p>
        </div>

        <div className="space-y-6">
          {convocatorias.map((conv, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <MegaphoneIcon className={`w-10 h-10 text-${conv.color}-600 flex-shrink-0`} />
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{conv.titulo}</h3>
                    <p className="text-gray-600 flex items-center">
                      <ClockIcon className="w-5 h-5 mr-2" />
                      Fecha de cierre: <span className="font-semibold ml-1">{conv.fechaCierre}</span>
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 bg-${conv.color}-100 text-${conv.color}-800 font-semibold rounded-full`}>
                  {conv.estado}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConvocatoriasPublicas;

