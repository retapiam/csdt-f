import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { HeartIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import donacionService from '../../../services/donacionService';
import { toast } from 'react-hot-toast';

const Donaciones = () => {
  const [monto, setMonto] = useState('');
  const [estadisticas, setEstadisticas] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    donante_nombre: '',
    donante_email: '',
    donante_telefono: '',
    metodo_pago: 'nequi',
    mensaje: ''
  });

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setCargando(true);
      const response = await donacionService.obtenerEstadisticas();
      if (response.success) {
        setEstadisticas(response.data);
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!monto || parseFloat(monto) < 1000) {
      toast.error('El monto mínimo es de $1,000 COP');
      return;
    }

    if (!formData.donante_nombre || !formData.donante_email) {
      toast.error('Por favor completa los campos requeridos');
      return;
    }

    try {
      setEnviando(true);
      const response = await donacionService.crearDonacion({
        ...formData,
        monto: parseFloat(monto),
        moneda: 'COP'
      });

      if (response.success) {
        toast.success('¡Gracias por tu donación! Recibirás un correo con los detalles.');
        // Limpiar formulario
        setMonto('');
        setFormData({
          donante_nombre: '',
          donante_email: '',
          donante_telefono: '',
          metodo_pago: 'nequi',
          mensaje: ''
        });
        cargarEstadisticas();
      }
    } catch (error) {
      console.error('Error creando donación:', error);
      toast.error('Error al procesar la donación. Por favor intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💝 Donaciones</h1>
          <p className="text-gray-600 text-lg">Apoya nuestro trabajo en la comunidad</p>
        </div>

        {/* Estadísticas de Donaciones */}
        {estadisticas && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <p className="text-sm text-gray-600">Total Recaudado</p>
              <p className="text-2xl font-bold text-green-600">
                {formatearMoneda(estadisticas.monto_total || 0)}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-600">Donaciones Este Mes</p>
              <p className="text-2xl font-bold text-blue-600">
                {estadisticas.donaciones_mes_actual || 0}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-600">Total Donaciones</p>
              <p className="text-2xl font-bold text-purple-600">
                {estadisticas.total_donaciones || 0}
              </p>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <HeartIcon className="w-7 h-7 mr-2 text-pink-600" />
              Realizar Donación
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="donante_nombre"
                  value={formData.donante_nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="donante_email"
                  value={formData.donante_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="donante_telefono"
                  value={formData.donante_telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="300 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto (COP) *
                </label>
                <div className="relative">
                  <CurrencyDollarIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Mínimo $1,000"
                    min="1000"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Monto mínimo: $1,000 COP</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de Pago
                </label>
                <select
                  name="metodo_pago"
                  value={formData.metodo_pago}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="nequi">Nequi</option>
                  <option value="daviplata">Daviplata</option>
                  <option value="pse">PSE</option>
                  <option value="transferencia">Transferencia Bancaria</option>
                  <option value="tarjeta_credito">Tarjeta de Crédito</option>
                  <option value="tarjeta_debito">Tarjeta de Débito</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje (Opcional)
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Comparte un mensaje..."
                  rows="3"
                />
              </div>
              <Button 
                type="submit"
                disabled={enviando}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg disabled:opacity-50"
              >
                {enviando ? 'Procesando...' : 'Donar Ahora'}
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <h3 className="text-2xl font-semibold mb-3">🌟 Impacto de tu Donación</h3>
              <ul className="space-y-2">
                <li>✅ Apoyo a comunidades vulnerables</li>
                <li>✅ Proyectos de desarrollo territorial</li>
                <li>✅ Fortalecimiento institucional</li>
                <li>✅ Participación ciudadana</li>
                <li>✅ Defensa de derechos étnicos</li>
                <li>✅ Transparencia y veeduría ciudadana</li>
              </ul>
            </Card>

            {estadisticas?.ultimas_donaciones && estadisticas.ultimas_donaciones.length > 0 && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">💖 Últimas Donaciones</h3>
                <div className="space-y-3">
                  {estadisticas.ultimas_donaciones.slice(0, 5).map((donacion, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium text-gray-800">{donacion.donante_nombre}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(donacion.created_at).toLocaleDateString('es-CO')}
                        </p>
                      </div>
                      <p className="font-bold text-green-600">
                        {formatearMoneda(donacion.monto)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donaciones;

