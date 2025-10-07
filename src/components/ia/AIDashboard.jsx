/**
 * DASHBOARD DE IA - CSDT
 * Componente para monitorear el rendimiento y estadísticas de IA
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Zap,
  BarChart3,
  Activity,
  RefreshCw,
  Download,
  Settings,
  Eye,
  Target
} from 'lucide-react';
import { advancedAIService } from '../../services/ia/AdvancedAIService';

const AIDashboard = () => {
  const [estadisticas, setEstadisticas] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    averageResponseTime: 0,
    errorRate: 0,
    providerUsage: {},
    pageUsage: {}
  });

  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({
    fechaDesde: '',
    fechaHasta: '',
    tipoPagina: '',
    limite: 20
  });

  useEffect(() => {
    cargarEstadisticas();
    cargarHistorial();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const stats = advancedAIService.obtenerEstadisticas();
      setEstadisticas(stats);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  const cargarHistorial = async () => {
    try {
      const hist = advancedAIService.obtenerHistorial(filtros);
      setHistorial(hist);
    } catch (error) {
      console.error('Error cargando historial:', error);
    } finally {
      setCargando(false);
    }
  };

  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
    cargarHistorial();
  };

  const exportarEstadisticas = () => {
    const datos = {
      estadisticas,
      historial,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const tasaExito = estadisticas.totalRequests > 0 ? 
    (estadisticas.successfulRequests / estadisticas.totalRequests) * 100 : 0;

  const renderMetricas = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Análisis</p>
            <p className="text-2xl font-bold text-blue-600">{estadisticas.totalRequests}</p>
          </div>
          <Brain className="h-8 w-8 text-blue-600" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Tasa de Éxito</p>
            <p className="text-2xl font-bold text-green-600">{tasaExito.toFixed(1)}%</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
            <p className="text-2xl font-bold text-purple-600">
              {(estadisticas.averageResponseTime / 1000).toFixed(1)}s
            </p>
          </div>
          <Clock className="h-8 w-8 text-purple-600" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Tasa de Error</p>
            <p className="text-2xl font-bold text-red-600">
              {(estadisticas.errorRate * 100).toFixed(1)}%
            </p>
          </div>
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
      </Card>
    </div>
  );

  const renderUsoProveedores = () => (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
        Uso de Proveedores de IA
      </h3>
      <div className="space-y-3">
        {Object.entries(estadisticas.providerUsage).map(([proveedor, uso]) => (
          <div key={proveedor} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3" />
              <span className="font-medium">{proveedor}</span>
            </div>
            <Badge variant="outline">{uso} análisis</Badge>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderUsoPaginas = () => (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Activity className="h-5 w-5 text-green-600 mr-2" />
        Uso por Páginas
      </h3>
      <div className="space-y-3">
        {Object.entries(estadisticas.pageUsage).map(([pagina, uso]) => (
          <div key={pagina} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3" />
              <span className="font-medium">{pagina}</span>
            </div>
            <Badge variant="outline">{uso} análisis</Badge>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderHistorial = () => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Eye className="h-5 w-5 text-purple-600 mr-2" />
          Historial de Análisis
        </h3>
        <div className="flex space-x-2">
          <Button
            onClick={cargarHistorial}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
          <Button
            onClick={exportarEstadisticas}
            variant="outline"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Desde
          </label>
          <input
            type="date"
            value={filtros.fechaDesde}
            onChange={(e) => actualizarFiltros({ fechaDesde: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha Hasta
          </label>
          <input
            type="date"
            value={filtros.fechaHasta}
            onChange={(e) => actualizarFiltros({ fechaHasta: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Página
          </label>
          <select
            value={filtros.tipoPagina}
            onChange={(e) => actualizarFiltros({ tipoPagina: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Todas</option>
            <option value="consejo_ia">Consejo IA</option>
            <option value="veeduria">Veeduría</option>
            <option value="etnico">Étnico</option>
            <option value="constitucional">Constitucional</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Límite
          </label>
          <select
            value={filtros.limite}
            onChange={(e) => actualizarFiltros({ limite: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Tabla de historial */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiempo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confianza
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cargando ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
                </td>
              </tr>
            ) : historial.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No hay análisis recientes
                </td>
              </tr>
            ) : (
              historial.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.timestamp).toLocaleString('es-CO')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.tipoPagina || 'General'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.metadatos?.tiempoProcesamiento ? 
                      `${(item.metadatos.tiempoProcesamiento / 1000).toFixed(1)}s` : 
                      'N/A'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant="outline" 
                      className={
                        item.exito ? 'border-green-500 text-green-700' : 
                        'border-red-500 text-red-700'
                      }
                    >
                      {item.exito ? 'Exitoso' : 'Error'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.metadatos?.confianzaPromedio ? 
                      `${(item.metadatos.confianzaPromedio * 100).toFixed(1)}%` : 
                      'N/A'
                    }
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Brain className="h-8 w-8 text-blue-600 mr-3" />
          Dashboard de IA
        </h1>
        <p className="text-gray-600 mt-2">
          Monitoreo y estadísticas del sistema de inteligencia artificial
        </p>
      </div>

      {renderMetricas()}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderUsoProveedores()}
        {renderUsoPaginas()}
      </div>

      {renderHistorial()}
    </div>
  );
};

export default AIDashboard;
