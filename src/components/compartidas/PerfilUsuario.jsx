import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { User, Mail, Phone, FileText, Shield, Settings, Key } from 'lucide-react';
import { useAuth } from '@contexts/AuthContext';
import { obtenerNombreCompleto } from '@/utils/userMapper';

const PerfilUsuario = () => {
  const { user, openChangePasswordModal } = useAuth();

  if (!user) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          No hay información de usuario disponible
        </div>
      </Card>
    );
  }

  const getRoleBadge = (rol) => {
    const roles = {
      'adm': { label: 'Administrador', color: 'bg-red-100 text-red-800' },
      'ope': { label: 'Operador', color: 'bg-blue-100 text-blue-800' },
      'cli': { label: 'Cliente', color: 'bg-green-100 text-green-800' },
      'adm_gen': { label: 'Administrador General', color: 'bg-purple-100 text-purple-800' }
    };
    
    const roleInfo = roles[rol] || { label: 'Usuario', color: 'bg-gray-100 text-gray-800' };
    
    return (
      <Badge className={roleInfo.color}>
        {roleInfo.label}
      </Badge>
    );
  };

  const getStatusBadge = (estado) => {
    const estados = {
      'act': { label: 'Activo', color: 'bg-green-100 text-green-800' },
      'ina': { label: 'Inactivo', color: 'bg-red-100 text-red-800' },
      'sus': { label: 'Suspendido', color: 'bg-yellow-100 text-yellow-800' },
      'pen': { label: 'Pendiente', color: 'bg-blue-100 text-blue-800' }
    };
    
    const estadoInfo = estados[estado] || { label: 'Desconocido', color: 'bg-gray-100 text-gray-800' };
    
    return (
      <Badge className={estadoInfo.color}>
        {estadoInfo.label}
      </Badge>
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Información Principal */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {obtenerNombreCompleto(user)}
              </h2>
              <p className="text-gray-600">{user.correo || user.email || user.cor}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {getRoleBadge(user.rol)}
            {getStatusBadge(user.est)}
          </div>
        </div>

        {/* Información Detallada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Correo electrónico</p>
              <p className="font-medium text-gray-900">{user.correo || user.email || user.cor}</p>
            </div>
          </div>

          {(user.telefono || user.tel) && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium text-gray-900">{user.telefono || user.tel}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Documento</p>
              <p className="font-medium text-gray-900">
                {(user.tipoDocumento || user.tipo_documento || user.tip_doc)?.toUpperCase()} {user.numeroDocumento || user.documento || user.doc}
              </p>
            </div>
          </div>

          {user.ult_acc && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Shield className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Último acceso</p>
                <p className="font-medium text-gray-900">
                  {new Date(user.ult_acc).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Acciones de Usuario */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configuración de Cuenta
        </h3>
        
        <div className="space-y-3">
          <Button 
            onClick={openChangePasswordModal}
            variant="outline" 
            className="w-full justify-start"
          >
            <Key className="h-4 w-4 mr-2" />
            Cambiar Contraseña
          </Button>
          
          <div className="text-sm text-gray-500 p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800 mb-1">Consejos de seguridad:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Usa una contraseña única y segura</li>
              <li>No compartas tus credenciales con nadie</li>
              <li>Cambia tu contraseña regularmente</li>
              <li>Si sospechas actividad sospechosa, cambia tu contraseña inmediatamente</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Información Adicional */}
      {(user.dir || user.ciu || user.dep) && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Información de Contacto
          </h3>
          
          <div className="space-y-3">
            {user.dir && (
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                <p className="font-medium text-gray-900">{user.dir}</p>
              </div>
            )}
            
            {(user.ciu || user.dep) && (
              <div>
                <p className="text-sm text-gray-500">Ubicación</p>
                <p className="font-medium text-gray-900">
                  {[user.ciu, user.dep].filter(Boolean).join(', ')}
                </p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PerfilUsuario;
