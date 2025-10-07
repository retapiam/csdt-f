import { useState } from 'react';
import { Leaf, TrendingUp, CheckCircle } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';

const ProyectosAmbientales = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-lime-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-lime-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Proyectos Ambientales</h1>
              <p className="text-gray-600 mt-1">Gestión y seguimiento de proyectos</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Nuevo Proyecto Ambiental</h3>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Nombre del proyecto" className="px-4 py-2 border rounded-lg" />
                <select className="px-4 py-2 border rounded-lg">
                  <option>Conservación</option>
                  <option>Restauración</option>
                  <option>Mitigación</option>
                </select>
                <input type="date" className="px-4 py-2 border rounded-lg" />
                <input placeholder="Ubicación" className="px-4 py-2 border rounded-lg" />
              </div>
              <Button className="w-full mt-4">Crear Proyecto</Button>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2].map(i => (
                <Card key={i} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold">Proyecto Ambiental {i}</h4>
                      <p className="text-sm text-gray-600 mt-1">Restauración ecológica</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Activo</Badge>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm">Avance: 75%</span>
                  </div>
                  <Button size="sm" className="w-full mt-4">Ver Indicadores</Button>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProyectosAmbientales;

