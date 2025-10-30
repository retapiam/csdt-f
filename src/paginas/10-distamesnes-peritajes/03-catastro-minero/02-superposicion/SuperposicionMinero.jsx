import { useState } from 'react';
import { Layers, AlertTriangle, Map } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';

const SuperposicionMinero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-red-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Superposición Minero-Territorial</h1>
              <p className="text-gray-600 mt-1">Análisis de conflictos minero-territoriales</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Análisis de Superposiciones</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Título Minero</label>
                  <input placeholder="Código del título" className="w-full px-4 py-2 border rounded-lg mt-1" />
                </div>
                <div>
                  <label className="text-sm font-semibold">Territorio Étnico</label>
                  <input placeholder="Nombre del territorio" className="w-full px-4 py-2 border rounded-lg mt-1" />
                </div>
              </div>
              <Button className="w-full mt-4">Analizar Superposición</Button>
            </Card>

            <Card className="p-6 bg-orange-50 border-l-4 border-orange-500">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-bold text-orange-900">Conflictos Identificados</h4>
                  <p className="text-sm text-orange-800 mt-1">Se han detectado 3 superposiciones activas</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Zonas de Riesgo</h3>
              <div className="aspect-video bg-gray-200 rounded-lg"></div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SuperposicionMinero;

