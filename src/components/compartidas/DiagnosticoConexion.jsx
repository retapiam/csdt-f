import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Wifi, Database, Server, Clock } from 'lucide-react';
import csdtApiService from '@services/csdtApiService';
import configuracion from '@services/configuracion';

const DiagnosticoConexion = () => {
  const [estadoConexion, setEstadoConexion] = useState({
    conectado: false,
    estado: 'Verificando...',
    error: null,
    tiempoRespuesta: null,
    ultimaVerificacion: null
  });

  const [diagnosticoCompleto, setDiagnosticoCompleto] = useState({
    configuracion: {
      url: configuracion.api.baseUrl,
      timeout: configuracion.api.timeout,
      retries: configuracion.api.retries
    },
    servicios: {
      api: { estado: 'Verificando...', tiempo: null, error: null },
      baseDatos: { estado: 'Verificando...', tiempo: null, error: null },
      autenticacion: { estado: 'Verificando...', tiempo: null, error: null }
    },
    estadisticas: {
      totalVerificaciones: 0,
      exitosas: 0,
      fallidas: 0,
      tiempoPromedio: 0
    }
  });

  const [cargando, setCargando] = useState(false);

  // Verificación básica de conectividad
  const verificarConexionBasica = async () => {
    setCargando(true);
    const inicio = Date.now();
    
    try {
      const respuesta = await csdtApiService.salud();
      const tiempo = Date.now() - inicio;
      
      setEstadoConexion({
        conectado: true,
        estado: 'Conectado',
        error: null,
        tiempoRespuesta: tiempo,
        ultimaVerificacion: new Date().toLocaleString()
      });

      // Actualizar estadísticas
      setDiagnosticoCompleto(prev => ({
        ...prev,
        estadisticas: {
          ...prev.estadisticas,
          totalVerificaciones: prev.estadisticas.totalVerificaciones + 1,
          exitosas: prev.estadisticas.exitosas + 1,
          tiempoPromedio: (prev.estadisticas.tiempoPromedio + tiempo) / 2
        }
      }));

    } catch (error) {
      const tiempo = Date.now() - inicio;
      
      setEstadoConexion({
        conectado: false,
        estado: 'Desconectado',
        error: error.message || 'Error de conexión',
        tiempoRespuesta: tiempo,
        ultimaVerificacion: new Date().toLocaleString()
      });

      // Actualizar estadísticas
      setDiagnosticoCompleto(prev => ({
        ...prev,
        estadisticas: {
          ...prev.estadisticas,
          totalVerificaciones: prev.estadisticas.totalVerificaciones + 1,
          fallidas: prev.estadisticas.fallidas + 1
        }
      }));
    } finally {
      setCargando(false);
    }
  };

  // Diagnóstico completo del sistema
  const ejecutarDiagnosticoCompleto = async () => {
    setCargando(true);
    
    // Verificar API
    try {
      const inicioApi = Date.now();
      await csdtApiService.salud();
      const tiempoApi = Date.now() - inicioApi;
      
      setDiagnosticoCompleto(prev => ({
        ...prev,
        servicios: {
          ...prev.servicios,
          api: { estado: 'Conectado', tiempo: tiempoApi, error: null }
        }
      }));
    } catch (error) {
      setDiagnosticoCompleto(prev => ({
        ...prev,
        servicios: {
          ...prev.servicios,
          api: { estado: 'Error', tiempo: null, error: error.message }
        }
      }));
    }

    // Verificar base de datos (simulado)
    try {
      const inicioDb = Date.now();
      await csdtApiService.configuracion.obtener();
      const tiempoDb = Date.now() - inicioDb;
      
      setDiagnosticoCompleto(prev => ({
        ...prev,
        servicios: {
          ...prev.servicios,
          baseDatos: { estado: 'Conectado', tiempo: tiempoDb, error: null }
        }
      }));
    } catch (error) {
      setDiagnosticoCompleto(prev => ({
        ...prev,
        servicios: {
          ...prev.servicios,
          baseDatos: { estado: 'Error', tiempo: null, error: error.message }
        }
      }));
    }

    // Verificar autenticación
    try {
      const inicioAuth = Date.now();
      await csdtApiService.auth.verificarToken();
      const tiempoAuth = Date.now() - inicioAuth;
      
      setDiagnosticoCompleto(prev => ({
        ...prev,
        servicios: {
          ...prev.servicios,
          autenticacion: { estado: 'Conectado', tiempo: tiempoAuth, error: null }
        }
      }));
    } catch (error) {
      setDiagnosticoCompleto(prev => ({
        ...prev,
        servicios: {
          ...prev.servicios,
          autenticacion: { estado: 'Error', tiempo: null, error: error.message }
        }
      }));
    }

    setCargando(false);
  };

  // Verificación automática cada 30 segundos
  useEffect(() => {
    verificarConexionBasica();
    
    const intervalo = setInterval(() => {
      verificarConexionBasica();
    }, 30000);

    return () => clearInterval(intervalo);
  }, []);

  const obtenerIconoEstado = (estado) => {
    switch (estado) {
      case 'Conectado':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Verificando...':
        return <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'Conectado':
        return 'bg-green-100 text-green-800';
      case 'Error':
        return 'bg-red-100 text-red-800';
      case 'Verificando...':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Estado de Conexión Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Estado de Conexión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {obtenerIconoEstado(estadoConexion.estado)}
              <div>
                <p className="font-medium">{estadoConexion.estado}</p>
                {estadoConexion.tiempoRespuesta && (
                  <p className="text-sm text-gray-500">
                    Tiempo de respuesta: {estadoConexion.tiempoRespuesta}ms
                  </p>
                )}
                {estadoConexion.ultimaVerificacion && (
                  <p className="text-sm text-gray-500">
                    Última verificación: {estadoConexion.ultimaVerificacion}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={verificarConexionBasica}
                disabled={cargando}
                size="sm"
                variant="outline"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${cargando ? 'animate-spin' : ''}`} />
                Verificar
              </Button>
            </div>
          </div>
          
          {estadoConexion.error && (
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Error:</strong> {estadoConexion.error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Configuración del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Configuración del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">URL del Backend</p>
              <p className="text-sm">{diagnosticoCompleto.configuracion.url}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Timeout</p>
              <p className="text-sm">{diagnosticoCompleto.configuracion.timeout}ms</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Reintentos</p>
              <p className="text-sm">{diagnosticoCompleto.configuracion.retries}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnóstico Completo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Diagnóstico Completo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(diagnosticoCompleto.servicios).map(([servicio, info]) => (
              <div key={servicio} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {obtenerIconoEstado(info.estado)}
                  <div>
                    <p className="font-medium capitalize">{servicio}</p>
                    {info.tiempo && (
                      <p className="text-sm text-gray-500">
                        Tiempo: {info.tiempo}ms
                      </p>
                    )}
                    {info.error && (
                      <p className="text-sm text-red-500">
                        Error: {info.error}
                      </p>
                    )}
                  </div>
                </div>
                <Badge className={obtenerColorEstado(info.estado)}>
                  {info.estado}
                </Badge>
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <Button
                onClick={ejecutarDiagnosticoCompleto}
                disabled={cargando}
                className="w-full"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${cargando ? 'animate-spin' : ''}`} />
                Ejecutar Diagnóstico Completo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Estadísticas de Conexión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {diagnosticoCompleto.estadisticas.totalVerificaciones}
              </p>
              <p className="text-sm text-gray-500">Total Verificaciones</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {diagnosticoCompleto.estadisticas.exitosas}
              </p>
              <p className="text-sm text-gray-500">Exitosas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {diagnosticoCompleto.estadisticas.fallidas}
              </p>
              <p className="text-sm text-gray-500">Fallidas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(diagnosticoCompleto.estadisticas.tiempoPromedio)}ms
              </p>
              <p className="text-sm text-gray-500">Tiempo Promedio</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticoConexion;
