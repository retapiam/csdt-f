import React, { useState, useEffect } from 'react';
import { switchAPIConfig, getAvailableAPIConfigs, getCurrentAPIConfig } from '@services/api';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Settings, Server, Wifi, WifiOff } from 'lucide-react';

const ConfiguracionAPI = () => {
  const [configuraciones, setConfiguraciones] = useState([]);
  const [configuracionActual, setConfiguracionActual] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarConfiguraciones();
  }, []);

  const cargarConfiguraciones = () => {
    const configs = getAvailableAPIConfigs();
    const actual = getCurrentAPIConfig();
    setConfiguraciones(configs);
    setConfiguracionActual(actual);
  };

  const cambiarConfiguracion = async (configName) => {
    setCargando(true);
    try {
      switchAPIConfig(configName);
      // La página se recargará automáticamente
    } catch (error) {
      console.error('Error al cambiar configuración:', error);
    } finally {
      setCargando(false);
    }
  };


  const getEstadoConexion = (config) => {
    if (config.key === configuracionActual?.key) {
      return 'activa';
    }
    return 'disponible';
  };

  const getColorEstado = (estado) => {
    switch (estado) {
      case 'activa':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'disponible':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configuración de API
        </CardTitle>
        <CardDescription>
          Gestiona las conexiones con diferentes servidores del sistema CSDT
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Configuración Actual */}
        {configuracionActual && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Wifi className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">Configuración Activa</span>
            </div>
            <div className="text-sm text-green-700">
              <p><strong>Servidor:</strong> {configuracionActual.name}</p>
              <p><strong>URL:</strong> {configuracionActual.url}</p>
              <p><strong>Descripción:</strong> {configuracionActual.description}</p>
            </div>
          </div>
        )}

        {/* Lista de Configuraciones */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {configuraciones.map((config) => {
            const estado = getEstadoConexion(config);
            const esActiva = estado === 'activa';
            
            return (
              <Card key={config.key} className={`relative ${esActiva ? 'ring-2 ring-green-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{config.name}</CardTitle>
                    <Badge className={getColorEstado(estado)}>
                      {estado}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {config.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600">
                      <p><strong>URL:</strong> {config.url}</p>
                      <p><strong>Timeout:</strong> {config.timeout}ms</p>
                    </div>
                    
                    {!esActiva && (
                      <Button
                        onClick={() => cambiarConfiguracion(config.key)}
                        disabled={cargando}
                        className="w-full"
                        size="sm"
                      >
                        {cargando ? 'Cambiando...' : 'Activar'}
                      </Button>
                    )}
                    
                    {esActiva && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <Wifi className="h-4 w-4" />
                        <span>Conectado</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Información Adicional */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Información Importante</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Local (SQLite):</strong> Para desarrollo rápido en tu máquina local</li>
            <li>• <strong>XAMPP (MySQL):</strong> Para desarrollo con base de datos completa</li>
            <li>• <strong>Servidor:</strong> Para pruebas en el servidor DigitalOcean</li>
            <li>• <strong>Producción:</strong> Para el entorno de producción final</li>
            <li>• La configuración se guarda en el navegador y persiste entre sesiones</li>
          </ul>
        </div>

        {/* Comandos de Desarrollo */}
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Comandos de Desarrollo</h4>
          <div className="text-sm text-green-700 space-y-2">
            <div>
              <strong>Iniciar desarrollo local:</strong>
              <code className="block bg-green-100 p-2 rounded mt-1">.\iniciar-desarrollo-local.ps1</code>
            </div>
            <div>
              <strong>Configurar XAMPP:</strong>
              <code className="block bg-green-100 p-2 rounded mt-1">.\configurar-xampp.ps1</code>
            </div>
            <div>
              <strong>Sincronizar servidor:</strong>
              <code className="block bg-green-100 p-2 rounded mt-1">.\sincronizar-servidor.ps1</code>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfiguracionAPI;
