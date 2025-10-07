import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { 
  ChartBarIcon, 
  UsersIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import estadisticasService from '../../../services/EstadisticasService';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [estadisticas, setEstadisticas] = useState({
    usuarios: 0,
    documentos: 0,
    presupuesto: '$ 0',
    proyectos: 0
  });
  const [actividadesRecientes, setActividadesRecientes] = useState([]);
  const [eventosProximos, setEventosProximos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
    cargarDashboardData();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setCargando(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/estadisticas/dashboard`);
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.data) {
          const data = result.data;
          setEstadisticas({
            usuarios: data.total_usuarios || 0,
            documentos: data.total_documentos || 0,
            presupuesto: formatearMoneda(data.total_donaciones || 0),
            proyectos: data.total_proyectos || 0
          });
          
          // Cargar actividades recientes del backend
          if (data.actividades_recientes && data.actividades_recientes.length > 0) {
            setActividadesRecientes(data.actividades_recientes);
          }
          
          // Cargar eventos próximos del backend
          if (data.eventos_proximos && data.eventos_proximos.length > 0) {
            setEventosProximos(data.eventos_proximos);
          }
        }
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
      toast.error('Error al cargar estadísticas');
    } finally {
      setCargando(false);
    }
  };

  const cargarDashboardData = async () => {
    // Esta función ya no es necesaria, todo se carga en cargarEstadisticas
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  const tarjetas = [
    {
      titulo: 'Usuarios Activos',
      valor: estadisticas.usuarios,
      icono: UsersIcon,
      color: 'bg-blue-500'
    },
    {
      titulo: 'Documentos',
      valor: estadisticas.documentos,
      icono: DocumentTextIcon,
      color: 'bg-green-500'
    },
    {
      titulo: 'Presupuesto',
      valor: estadisticas.presupuesto,
      icono: CurrencyDollarIcon,
      color: 'bg-purple-500'
    },
    {
      titulo: 'Proyectos Activos',
      valor: estadisticas.proyectos,
      icono: ChartBarIcon,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📊 Dashboard Administrativo
          </h1>
          <p className="text-gray-600">
            Panel de control con métricas e indicadores clave del sistema
          </p>
        </div>

        {cargando ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Tarjetas de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {tarjetas.map((tarjeta, index) => {
                const Icono = tarjeta.icono;
                return (
                  <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{tarjeta.titulo}</p>
                        <p className="text-3xl font-bold text-gray-800">{tarjeta.valor}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Datos en tiempo real
                        </p>
                      </div>
                      <div className={`${tarjeta.color} p-4 rounded-full`}>
                        <Icono className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Actividad Reciente */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📈 Actividad Reciente
            </h2>
            <div className="space-y-4">
              {actividadesRecientes.length > 0 ? (
                actividadesRecientes.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.tipo === 'success' ? 'bg-green-500' :
                        item.tipo === 'info' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-800">{item.accion}</p>
                        <p className="text-sm text-gray-500">{item.tiempo}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay actividad reciente registrada</p>
                </div>
              )}
            </div>
          </Card>

          {/* Panel Lateral */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <CalendarIcon className="w-6 h-6 mr-2 text-blue-600" />
              Próximos Eventos
            </h3>
            <div className="space-y-3">
              {eventosProximos.length > 0 ? (
                eventosProximos.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{item.evento}</p>
                      <p className="text-sm text-gray-500">{item.fecha}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      item.color === 'red' ? 'bg-red-500' :
                      item.color === 'orange' ? 'bg-orange-500' :
                      item.color === 'blue' ? 'bg-blue-500' :
                      item.color === 'green' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`}></div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay eventos próximos programados</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

