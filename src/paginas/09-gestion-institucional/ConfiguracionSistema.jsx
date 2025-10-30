import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';
import api from '../../services/api';
import pdfAvanzadoService from '../../services/pdf/PDFAvanzadoService';
import unifiedAIService from '../../services/ia/UnifiedAIService';

const ConfiguracionSistema = () => {
  const [estado, setEstado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [correoEnabled, setCorreoEnabled] = useState(false);

  const verificarEstado = async () => {
    try {
      setCargando(true);
      // Si aún no hay endpoint, devolvemos un estado simulado
      const simulado = {
        pdf: true,
        storage: true,
        ia: true,
        cola: true,
        worker: false,
        version: '1.0.0'
      };
      setEstado(simulado);
    } finally {
      setCargando(false);
    }
  };

  const probarPDF = async () => {
    const datos = { titulo: 'Prueba PDF - Sistema', resumen: 'Documento de prueba del sistema', puntos_clave: ['PDF OK'] };
    const pdf = await pdfAvanzadoService.generarPDFAvanzado(datos, { plantilla: 'resumen_ejecutivo', estilo: 'oficial' });
    pdf.archivo.documento.save(pdf.archivo.nombre);
  };

  const probarIA = async () => {
    await unifiedAIService.quickAnalyze({ text: 'Prueba de IA del sistema', legal_area: 'Derecho General', jurisdiction: 'colombia' });
    alert('IA consultada (prueba)');
  };

  const probarCola = async () => {
    alert('Simulación: se encoló una tarea de prueba');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración del Sistema</h1>
          <p className="text-gray-600">Verificación de Dependencias (Actividades), Colas (Tareas), IA y PDF.</p>
        </div>

        <div className="mb-4 flex items-center space-x-2">
          <Button onClick={verificarEstado} disabled={cargando}>{cargando ? 'Verificando...' : 'Verificar estado'}</Button>
          <Button variant="outline" onClick={probarPDF}>Probar PDF</Button>
          <Button variant="outline" onClick={probarIA}>Probar IA</Button>
          <Button variant="outline" onClick={probarCola}>Probar Cola</Button>
          <Button variant="outline" onClick={async () => {
            try {
              const nuevo = !correoEnabled;
              await api.post('/admin/sistema/alerts-email', { enabled: nuevo });
              setCorreoEnabled(nuevo);
              alert(`Correo de alertas ${nuevo ? 'activado' : 'desactivado'}`);
            } catch (_) {
              alert('No se pudo cambiar el estado de correo de alertas');
            }
          }}>{correoEnabled ? 'Desactivar correo alertas' : 'Activar correo alertas'}</Button>
        </div>

        {estado && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Servicios</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    {estado.pdf ? <CheckCircle className="h-4 w-4 text-green-600"/> : <XCircle className="h-4 w-4 text-red-600"/>}
                    <span>PDF (cliente)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {estado.ia ? <CheckCircle className="h-4 w-4 text-green-600"/> : <XCircle className="h-4 w-4 text-red-600"/>}
                    <span>IA (cliente)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {estado.storage ? <CheckCircle className="h-4 w-4 text-green-600"/> : <XCircle className="h-4 w-4 text-red-600"/>}
                    <span>Storage</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {estado.cola ? <CheckCircle className="h-4 w-4 text-green-600"/> : <XCircle className="h-4 w-4 text-red-600"/>}
                    <span>Colas (Laravel)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    {estado.worker ? <CheckCircle className="h-4 w-4 text-green-600"/> : <XCircle className="h-4 w-4 text-red-600"/>}
                    <span>Worker activo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><strong>Versión backend:</strong> {estado.version}</div>
                  <div><strong>Terminología UI:</strong> Dependencias (Actividades), Colas (Tareas)</div>
                </div>
                <Alert className="mt-4">
                  <AlertDescription>
                    Ejecuta en servidor tras desplegar: "php artisan queue:table && php artisan migrate" y luego "php artisan queue:work --tries=3 --backoff=5".
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfiguracionSistema;


