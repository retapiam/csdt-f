import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { DocumentTextIcon, ArrowDownTrayIcon, FolderIcon } from '@heroicons/react/24/outline';

const Documentos = () => {
  const [documentos] = useState([
    { id: 1, nombre: 'Manual de Usuario', tipo: 'PDF', tamano: '2.5 MB', fecha: '2024-09-15' },
    { id: 2, nombre: 'Reglamento Interno', tipo: 'PDF', tamano: '1.8 MB', fecha: '2024-08-20' },
    { id: 3, nombre: 'Acta de Reunión', tipo: 'DOC', tamano: '450 KB', fecha: '2024-09-25' },
    { id: 4, nombre: 'Informe Anual', tipo: 'PDF', tamano: '5.2 MB', fecha: '2024-09-30' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📄 Gestión de Documentos</h1>
          <p className="text-gray-600">Administra y consulta documentos institucionales</p>
        </div>

        <Card className="p-6">
          <div className="space-y-3">
            {documentos.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center space-x-3">
                  <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{doc.nombre}</h3>
                    <p className="text-sm text-gray-500">{doc.tipo} • {doc.tamano} • {doc.fecha}</p>
                  </div>
                </div>
                <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  <ArrowDownTrayIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Documentos;

