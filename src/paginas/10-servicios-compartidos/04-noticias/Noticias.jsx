import React from 'react';
import { Card } from '../../../components/ui/card';
import { NewspaperIcon, CalendarIcon } from '@heroicons/react/24/outline';

const Noticias = () => {
  const noticias = [
    { titulo: 'Nueva convocatoria abierta', fecha: '1 Oct 2024', categoria: 'Convocatorias' },
    { titulo: 'Taller de capacitación', fecha: '28 Sep 2024', categoria: 'Eventos' },
    { titulo: 'Actualización del sistema', fecha: '25 Sep 2024', categoria: 'Tecnología' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📰 Noticias y Novedades</h1>
          <p className="text-gray-600">Mantente informado sobre las últimas novedades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {noticias.map((noticia, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition">
              <div className="flex items-start space-x-3">
                <NewspaperIcon className="w-8 h-8 text-indigo-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{noticia.titulo}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {noticia.fecha}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                    {noticia.categoria}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Noticias;

