import { useState } from 'react';
import { FileText, Database, Search } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';

const CatastroIndirecto = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-violet-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Catastro Indirecto</h1>
              <p className="text-gray-600 mt-1">Análisis documental catastral</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Certificados Catastrales</h3>
              <div className="flex space-x-3">
                <input placeholder="Número catastral" className="flex-1 px-4 py-2 border rounded-lg" />
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Cruce de Información</h3>
              <p className="text-gray-600">Cruces con bases de datos oficiales (IGAC, SNR, ANT)</p>
              <Button className="mt-4">Iniciar Cruce</Button>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CatastroIndirecto;

