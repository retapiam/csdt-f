import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { FolderIcon, PlusIcon, ClockIcon } from '@heroicons/react/24/outline';

const Proyectos = () => {
  const [proyectos] = useState([
    { id: 1, nombre: 'Desarrollo Comunitario', estado: 'En progreso', progreso: 75, color: 'blue' },
    { id: 2, nombre: 'Fortalecimiento Institucional', estado: 'En progreso', progreso: 60, color: 'green' },
    { id: 3, nombre: 'Participación Ciudadana', estado: 'Planificación', progreso: 30, color: 'yellow' },
    { id: 4, nombre: 'Control Territorial', estado: 'Completado', progreso: 100, color: 'purple' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">📁 Proyectos</h1>
            <p className="text-gray-600">Gestión y seguimiento de proyectos institucionales</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <PlusIcon className="w-5 h-5" />
            <span>Nuevo Proyecto</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proyectos.map((proyecto) => (
            <Card key={proyecto.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FolderIcon className={`w-8 h-8 text-${proyecto.color}-600`} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{proyecto.nombre}</h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {proyecto.estado}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progreso</span>
                  <span>{proyecto.progreso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${proyecto.color}-600 h-2 rounded-full`}
                    style={{ width: `${proyecto.progreso}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proyectos;

