import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { LoaderCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { runAllTests } from '@utils/testFunctionality';

const DiagnosticoAuth = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const runDiagnostic = async () => {
    setLoading(true);
    setResults(null);

    try {
      const testResults = await runAllTests();
      setResults(testResults);
    } catch (error) {
      // console.error('Error en diagnóstico:', error);
      setResults({
        error: error.message,
        overall: false
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status === true) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (status === false) {
      return <XCircle className="h-4 w-4 text-red-600" />;
    } else {
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status) => {
    if (status === true) {
      return <Badge variant="default" className="bg-green-100 text-green-800">Exitoso</Badge>;
    } else if (status === false) {
      return <Badge variant="destructive">Falló</Badge>;
    } else {
      return <Badge variant="secondary">Pendiente</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Diagnóstico de Autenticación</h2>
          <Button 
            onClick={runDiagnostic} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {loading ? 'Ejecutando...' : 'Ejecutar Diagnóstico'}
          </Button>
        </div>

        <p className="text-gray-600 mb-6">
          Esta herramienta prueba la integración entre el frontend y backend para verificar 
          que el sistema de autenticación funcione correctamente.
        </p>

        {results && (
          <div className="space-y-6">
            {/* Resumen General */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                {getStatusIcon(results.overall)}
                Resumen General
              </h3>
              <div className="flex items-center gap-2">
                {getStatusBadge(results.overall)}
                <span className="text-sm text-gray-600">
                  {results.overall ? 'Todas las pruebas pasaron' : 'Algunas pruebas fallaron'}
                </span>
              </div>
            </div>

            {/* Pruebas de Autenticación */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Pruebas de Autenticación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(results.auth?.backendHealth)}
                    Salud del Backend
                  </span>
                  {getStatusBadge(results.auth?.backendHealth)}
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(results.auth?.register)}
                    Registro de Usuario
                  </span>
                  {getStatusBadge(results.auth?.register)}
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(results.auth?.login)}
                    Inicio de Sesión
                  </span>
                  {getStatusBadge(results.auth?.login)}
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(results.auth?.logout)}
                    Cerrar Sesión
                  </span>
                  {getStatusBadge(results.auth?.logout)}
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(results.auth?.passwordRecovery)}
                    Recuperación por Cédula
                  </span>
                  {getStatusBadge(results.auth?.passwordRecovery)}
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(results.auth?.passwordReset)}
                    Reset de Contraseña
                  </span>
                  {getStatusBadge(results.auth?.passwordReset)}
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(results.auth?.passwordChange)}
                    Cambio de Contraseña
                  </span>
                  {getStatusBadge(results.auth?.passwordChange)}
                </div>
              </div>
            </div>

            {/* Pruebas de Endpoints Públicos */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Endpoints Públicos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(results.public?.tiposDocumento)}
                    Tipos de Documento
                  </span>
                  {getStatusBadge(results.public?.tiposDocumento)}
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(results.public?.generos)}
                    Géneros
                  </span>
                  {getStatusBadge(results.public?.generos)}
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(results.public?.tiposVeeduria)}
                    Tipos de Veeduría
                  </span>
                  {getStatusBadge(results.public?.tiposVeeduria)}
                </div>
              </div>
            </div>

            {/* Errores */}
            {(results.auth?.errors?.length > 0 || results.public?.errors?.length > 0) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Errores Encontrados</h3>
                <div className="space-y-2">
                  {results.auth?.errors?.map((error, index) => (
                    <div key={`auth-${index}`} className="text-sm text-red-700">
                      <strong>Autenticación:</strong> {error}
                    </div>
                  ))}
                  {results.public?.errors?.map((error, index) => (
                    <div key={`public-${index}`} className="text-sm text-red-700">
                      <strong>Públicos:</strong> {error}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recomendaciones */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Recomendaciones</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Asegúrate de que el servidor backend esté ejecutándose</li>
                <li>• Verifica que la base de datos esté configurada correctamente</li>
                <li>• Revisa la configuración de CORS en el backend</li>
                <li>• Verifica que las rutas de API estén correctamente definidas</li>
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DiagnosticoAuth;
