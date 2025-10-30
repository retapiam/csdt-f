/**
 * Componente de Protección de Rutas por Roles y Permisos
 * Controla el acceso a componentes según el rol del usuario
 * 
 * Jerarquía de Roles:
 * - adm_gen (Nivel 4): Control total del sistema
 * - adm (Nivel 3): Gestión y permisos
 * - ope (Nivel 2): Solo operador y cliente
 * - cli (Nivel 1): Solo cliente
 */

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Lock, Shield, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProteccionRol = ({ 
  children, 
  rolesPermitidos = [], 
  requiereAutenticacion = true,
  modoSoloLectura = false,
  permisoEspecifico = null,
  mostrarMensaje = true,
  onAccesoDenegado = null,
  ubicacion = ''
}) => {
  const { user, isAuthenticated, hasPermission } = useAuth();

  // Acceso total para Administrador General (Nivel 4)
  if (user && user.rol === 'adm_gen') {
    return children;
  }

  // Verificar autenticación
  if (requiereAutenticacion && !isAuthenticated()) {
    if (!mostrarMensaje) return null;
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Acceso Restringido
            </h2>
            <p className="text-gray-600 mb-6">
              Debes iniciar sesión para acceder a este módulo del sistema.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Ir al Inicio de Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verificar roles permitidos
  if (rolesPermitidos.length > 0 && user && !rolesPermitidos.includes(user.rol)) {
    if (onAccesoDenegado) {
      onAccesoDenegado();
      return null;
    }

    if (!mostrarMensaje) return null;

    const mensajesRol = {
      'adm_gen': 'Administrador General (Control Total)',
      'adm': 'Administrador',
      'ope': 'Operador',
      'cli': 'Cliente'
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Acceso Denegado
            </h2>
            <p className="text-gray-600 mb-4">
              No tienes permisos suficientes para acceder a este módulo.
            </p>
            
            <Alert className="mb-6 text-left">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p><strong>Tu rol actual:</strong> {mensajesRol[user.rol] || user.rol}</p>
                  <p><strong>Roles permitidos:</strong></p>
                  <ul className="list-disc list-inside ml-2">
                    {rolesPermitidos.map(rol => (
                      <li key={rol}>{mensajesRol[rol] || rol}</li>
                    ))}
                  </ul>
                  {ubicacion && (
                    <p className="text-xs text-gray-500 mt-2">
                      Ubicación: {ubicacion}
                    </p>
                  )}
                </div>
              </AlertDescription>
            </Alert>

            <p className="text-sm text-gray-500 mb-6">
              Contacta al administrador del sistema para solicitar acceso.
            </p>
            
            <div className="flex space-x-2">
              <Button 
                onClick={() => window.history.back()}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                className="flex-1"
              >
                Ir al Inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verificar permiso específico
  if (permisoEspecifico && user && !hasPermission(permisoEspecifico)) {
    if (!mostrarMensaje) return null;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Lock className="h-16 w-16 text-orange-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Permiso Insuficiente
            </h2>
            <p className="text-gray-600 mb-6">
              No tienes el permiso específico requerido para acceder a este módulo.
            </p>
            <Alert className="mb-6 text-left">
              <AlertDescription>
                <p><strong>Permiso requerido:</strong> {permisoEspecifico}</p>
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Si está en modo solo lectura, pasar esa prop a los children
  if (modoSoloLectura) {
    return React.cloneElement(children, { modoSoloLectura: true });
  }

  // Acceso permitido
  return children;
};

export default ProteccionRol;
