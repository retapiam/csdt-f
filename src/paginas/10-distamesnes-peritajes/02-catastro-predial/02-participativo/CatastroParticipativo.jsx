import { useState } from 'react';
import { Users, Map, CheckSquare } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';

const CatastroParticipativo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-teal-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Catastro Participativo</h1>
              <p className="text-gray-600 mt-1">Levantamiento con participación comunitaria</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Map className="w-6 h-6 mr-2 text-teal-600" />
                Talleres de Catastro
              </h3>
              <p className="text-gray-600 mb-4">Talleres participativos para levantamiento catastral</p>
              <Button>Programar Taller</Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <CheckSquare className="w-6 h-6 mr-2 text-teal-600" />
                Validación Colectiva
              </h3>
              <p className="text-gray-600 mb-4">Validación comunitaria de información catastral</p>
              <Button>Iniciar Validación</Button>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CatastroParticipativo;

