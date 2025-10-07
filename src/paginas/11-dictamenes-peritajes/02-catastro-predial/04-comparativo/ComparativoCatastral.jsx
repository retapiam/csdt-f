import { useState } from 'react';
import { BarChart3, GitCompare, AlertCircle } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';

const ComparativoCatastral = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-rose-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl">
              <GitCompare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Comparativo Catastral</h1>
              <p className="text-gray-600 mt-1">Análisis de diferencias y superposiciones</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-rose-600" />
                Comparación de Registros
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Catastro A</label>
                  <select className="w-full px-4 py-2 border rounded-lg mt-1">
                    <option>Catastro Comunitario</option>
                    <option>Catastro IGAC</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold">Catastro B</label>
                  <select className="w-full px-4 py-2 border rounded-lg mt-1">
                    <option>Catastro IGAC</option>
                    <option>Catastro ANT</option>
                  </select>
                </div>
              </div>
              <Button className="w-full mt-4">Comparar</Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-rose-600" />
                Inconsistencias Detectadas
              </h3>
              <p className="text-gray-600">Diferencias y superposiciones identificadas</p>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComparativoCatastral;

