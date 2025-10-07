import { useState } from 'react';
import { Award, Download, FileText, CheckCircle } from 'lucide-react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';

const CertificadosEtnicos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-8 border-t-4 border-indigo-500">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Certificados Étnicos</h1>
              <p className="text-gray-600 mt-1">Certificación de presencia de comunidades</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Solicitar Certificado</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Tipo de Certificado</label>
                  <select className="w-full px-4 py-2 border rounded-lg mt-1">
                    <option>Certificación de Presencia</option>
                    <option>Certificado de No Presencia</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold">Departamento</label>
                    <input className="w-full px-4 py-2 border rounded-lg mt-1" placeholder="Departamento" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Municipio</label>
                    <input className="w-full px-4 py-2 border rounded-lg mt-1" placeholder="Municipio" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold">Área del Proyecto</label>
                  <textarea className="w-full px-4 py-2 border rounded-lg mt-1" rows="3" placeholder="Describa el área..."></textarea>
                </div>
                <Button className="w-full">Solicitar a MinInterior</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Historial de Certificaciones</h3>
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold">Certificado #{i}</p>
                        <p className="text-sm text-gray-600">Presencia confirmada - 2024-01-{20-i}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CertificadosEtnicos;

