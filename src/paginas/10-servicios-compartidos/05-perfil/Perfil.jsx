import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon,
  PencilSquareIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Perfil = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    telefono: '+57 300 123 4567',
    direccion: 'Calle 123 #45-67, Bogotá',
    rol: 'Administrador',
    departamento: 'Gestión Territorial'
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log('Datos guardados:', userData);
    setEditMode(false);
    alert('Perfil actualizado correctamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            👤 Mi Perfil
          </h1>
          <p className="text-gray-600">
            Gestiona tu información personal y configuración
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información del Perfil */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Información Personal
              </h2>
              <Button
                onClick={() => editMode ? handleSave() : setEditMode(true)}
                className={`flex items-center space-x-2 ${
                  editMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-4 py-2 rounded-lg`}
              >
                <PencilSquareIcon className="w-5 h-5" />
                <span>{editMode ? 'Guardar' : 'Editar'}</span>
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <div className="flex items-center space-x-2">
                    <UserCircleIcon className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="nombre"
                      value={userData.nombre}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg ${
                        editMode ? 'bg-white' : 'bg-gray-100'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg ${
                        editMode ? 'bg-white' : 'bg-gray-100'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="telefono"
                      value={userData.telefono}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg ${
                        editMode ? 'bg-white' : 'bg-gray-100'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento
                  </label>
                  <input
                    type="text"
                    name="departamento"
                    value={userData.departamento}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      editMode ? 'bg-white' : 'bg-gray-100'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="direccion"
                    value={userData.direccion}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg ${
                      editMode ? 'bg-white' : 'bg-gray-100'
                    }`}
                  />
                </div>
              </div>

              {editMode && (
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                  >
                    Guardar Cambios
                  </Button>
                  <Button
                    onClick={() => setEditMode(false)}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg"
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Panel Lateral */}
          <div className="space-y-6">
            <Card className="p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">JP</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{userData.nombre}</h3>
              <p className="text-gray-600 text-sm mt-1">{userData.email}</p>
              <div className="mt-4 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <ShieldCheckIcon className="w-4 h-4 mr-1" />
                {userData.rol}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🔒 Seguridad
              </h3>
              <div className="space-y-3">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
                  Cambiar Contraseña
                </Button>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg">
                  Autenticación 2FA
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ✅ Cuenta Verificada
              </h3>
              <p className="text-sm text-gray-600">
                Tu cuenta ha sido verificada y está activa
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;

