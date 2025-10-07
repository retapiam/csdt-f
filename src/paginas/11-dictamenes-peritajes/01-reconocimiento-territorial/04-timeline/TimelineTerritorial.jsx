import { useState } from 'react';
import { Clock, Calendar, MapPin, FileText } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';

const TimelineTerritorial = () => {
  const eventos = [
    { año: '1650', titulo: 'Ocupación Ancestral', descripcion: 'Asentamiento originario del pueblo', tipo: 'ocupacion' },
    { año: '1780', titulo: 'Primera Delimitación', descripcion: 'Reconocimiento colonial', tipo: 'delimitacion' },
    { año: '1890', titulo: 'Constitución de Resguardo', descripcion: 'Cédula Real de reconocimiento', tipo: 'constitucion' },
    { año: '1960', titulo: 'Ampliación Territorial', descripcion: 'Expansión del territorio', tipo: 'ampliacion' },
    { año: '2010', titulo: 'Saneamiento', descripcion: 'Proceso de saneamiento actual', tipo: 'saneamiento' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-indigo-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Timeline Territorial</h1>
              <p className="text-gray-600 mt-1">Línea de tiempo histórica del territorio</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200"></div>
            <div className="space-y-8">
              {eventos.map((evento, idx) => (
                <div key={idx} className="relative pl-12">
                  <div className="absolute left-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <Card className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{evento.titulo}</h3>
                      <span className="text-sm font-semibold text-indigo-600">{evento.año}</span>
                    </div>
                    <p className="text-gray-600">{evento.descripcion}</p>
                    <div className="mt-3 inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                      {evento.tipo}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex space-x-3">
            <Button>Agregar Evento</Button>
            <Button variant="outline">Exportar Timeline</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TimelineTerritorial;

