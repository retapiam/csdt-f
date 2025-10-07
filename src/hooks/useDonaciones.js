import { useState, useEffect, useCallback } from 'react';
import donacionService from '@services/donacionService';
import { useNotification } from '@contexts/NotificationContext';

export const useDonaciones = (filtrosIniciales = {}) => {
  const { showNotification } = useNotification();
  
  // Estados principales
  const [donaciones, setDonaciones] = useState([]);
  const [donacion, setDonacion] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [filtros, setFiltros] = useState(filtrosIniciales);
  
  // Estados de carga
  const [cargando, setCargando] = useState(false);
  const [cargandoEstadisticas, setCargandoEstadisticas] = useState(false);
  const [enviando, setEnviando] = useState(false);
  
  // Estados de paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalElementos, setTotalElementos] = useState(0);
  const [porPagina] = useState(15);

  // Cargar donaciones con filtros
  const cargarDonaciones = useCallback(async (nuevosFiltros = filtros, pagina = paginaActual) => {
    try {
      setCargando(true);
      
      const params = {
        ...nuevosFiltros,
        por_pagina: porPagina,
        pagina: pagina
      };
      
      const response = await donacionService.obtenerDonaciones(params);
      
      if (response.success) {
        setDonaciones(response.data.data || []);
        setTotalPaginas(response.data.last_page || 1);
        setTotalElementos(response.data.total || 0);
        setPaginaActual(pagina);
      } else {
        showNotification(response.message || 'Error al cargar donaciones', 'error');
        setDonaciones([]);
      }
    } catch (error) {
      console.error('Error cargando donaciones:', error);
      showNotification('Error al cargar donaciones', 'error');
      setDonaciones([]);
    } finally {
      setCargando(false);
    }
  }, [filtros, paginaActual, porPagina, showNotification]);

  // Cargar una donación específica
  const cargarDonacion = useCallback(async (id) => {
    try {
      setCargando(true);
      
      const response = await donacionService.obtenerDonacion(id);
      
      if (response.success) {
        setDonacion(response.data);
        return response.data;
      } else {
        showNotification(response.message || 'Error al cargar donación', 'error');
        return null;
      }
    } catch (error) {
      console.error('Error cargando donación:', error);
      showNotification('Error al cargar donación', 'error');
      return null;
    } finally {
      setCargando(false);
    }
  }, [showNotification]);

  // Cargar estadísticas
  const cargarEstadisticas = useCallback(async (filtrosEstadisticas = {}) => {
    try {
      setCargandoEstadisticas(true);
      
      const response = await donacionService.obtenerEstadisticas(filtrosEstadisticas);
      
      if (response.success) {
        setEstadisticas(response.data);
        return response.data;
      } else {
        showNotification(response.message || 'Error al cargar estadísticas', 'error');
        return null;
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
      showNotification('Error al cargar estadísticas', 'error');
      return null;
    } finally {
      setCargandoEstadisticas(false);
    }
  }, [showNotification]);

  // Crear nueva donación
  const crearDonacion = useCallback(async (datosDonacion) => {
    try {
      setEnviando(true);
      
      const response = await donacionService.crearDonacion(datosDonacion);
      
      if (response.success) {
        showNotification('Donación creada exitosamente', 'success');
        
        // Recargar datos
        cargarDonaciones();
        cargarEstadisticas();
        
        return response.data;
      } else {
        showNotification(response.message || 'Error al crear donación', 'error');
        return null;
      }
    } catch (error) {
      console.error('Error creando donación:', error);
      showNotification('Error al crear donación', 'error');
      return null;
    } finally {
      setEnviando(false);
    }
  }, [showNotification, cargarDonaciones, cargarEstadisticas]);

  // Actualizar donación
  const actualizarDonacion = useCallback(async (id, datosDonacion) => {
    try {
      setEnviando(true);
      
      const response = await donacionService.actualizarDonacion(id, datosDonacion);
      
      if (response.success) {
        showNotification('Donación actualizada exitosamente', 'success');
        
        // Recargar datos
        cargarDonaciones();
        cargarEstadisticas();
        
        return response.data;
      } else {
        showNotification(response.message || 'Error al actualizar donación', 'error');
        return null;
      }
    } catch (error) {
      console.error('Error actualizando donación:', error);
      showNotification('Error al actualizar donación', 'error');
      return null;
    } finally {
      setEnviando(false);
    }
  }, [showNotification, cargarDonaciones, cargarEstadisticas]);

  // Confirmar donación
  const confirmarDonacion = useCallback(async (id) => {
    try {
      setEnviando(true);
      
      const response = await donacionService.confirmarDonacion(id);
      
      if (response.success) {
        showNotification('Donación confirmada exitosamente', 'success');
        
        // Recargar datos
        cargarDonaciones();
        cargarEstadisticas();
        
        return response.data;
      } else {
        showNotification(response.message || 'Error al confirmar donación', 'error');
        return null;
      }
    } catch (error) {
      console.error('Error confirmando donación:', error);
      showNotification('Error al confirmar donación', 'error');
      return null;
    } finally {
      setEnviando(false);
    }
  }, [showNotification, cargarDonaciones, cargarEstadisticas]);

  // Rechazar donación
  const rechazarDonacion = useCallback(async (id) => {
    try {
      setEnviando(true);
      
      const response = await donacionService.rechazarDonacion(id);
      
      if (response.success) {
        showNotification('Donación rechazada exitosamente', 'success');
        
        // Recargar datos
        cargarDonaciones();
        cargarEstadisticas();
        
        return response.data;
      } else {
        showNotification(response.message || 'Error al rechazar donación', 'error');
        return null;
      }
    } catch (error) {
      console.error('Error rechazando donación:', error);
      showNotification('Error al rechazar donación', 'error');
      return null;
    } finally {
      setEnviando(false);
    }
  }, [showNotification, cargarDonaciones, cargarEstadisticas]);

  // Cancelar donación
  const cancelarDonacion = useCallback(async (id) => {
    try {
      setEnviando(true);
      
      const response = await donacionService.cancelarDonacion(id);
      
      if (response.success) {
        showNotification('Donación cancelada exitosamente', 'success');
        
        // Recargar datos
        cargarDonaciones();
        cargarEstadisticas();
        
        return response.data;
      } else {
        showNotification(response.message || 'Error al cancelar donación', 'error');
        return null;
      }
    } catch (error) {
      console.error('Error cancelando donación:', error);
      showNotification('Error al cancelar donación', 'error');
      return null;
    } finally {
      setEnviando(false);
    }
  }, [showNotification, cargarDonaciones, cargarEstadisticas]);

  // Procesar donación
  const procesarDonacion = useCallback(async (id) => {
    try {
      setEnviando(true);
      
      const response = await donacionService.procesarDonacion(id);
      
      if (response.success) {
        showNotification('Donación procesada exitosamente', 'success');
        
        // Recargar datos
        cargarDonaciones();
        cargarEstadisticas();
        
        return response.data;
      } else {
        showNotification(response.message || 'Error al procesar donación', 'error');
        return null;
      }
    } catch (error) {
      console.error('Error procesando donación:', error);
      showNotification('Error al procesar donación', 'error');
      return null;
    } finally {
      setEnviando(false);
    }
  }, [showNotification, cargarDonaciones, cargarEstadisticas]);

  // Eliminar donación
  const eliminarDonacion = useCallback(async (id) => {
    try {
      setEnviando(true);
      
      const response = await donacionService.eliminarDonacion(id);
      
      if (response.success) {
        showNotification('Donación eliminada exitosamente', 'success');
        
        // Recargar datos
        cargarDonaciones();
        cargarEstadisticas();
        
        return true;
      } else {
        showNotification(response.message || 'Error al eliminar donación', 'error');
        return false;
      }
    } catch (error) {
      console.error('Error eliminando donación:', error);
      showNotification('Error al eliminar donación', 'error');
      return false;
    } finally {
      setEnviando(false);
    }
  }, [showNotification, cargarDonaciones, cargarEstadisticas]);

  // Restaurar donación
  const restaurarDonacion = useCallback(async (id) => {
    try {
      setEnviando(true);
      
      const response = await donacionService.restaurarDonacion(id);
      
      if (response.success) {
        showNotification('Donación restaurada exitosamente', 'success');
        
        // Recargar datos
        cargarDonaciones();
        cargarEstadisticas();
        
        return response.data;
      } else {
        showNotification(response.message || 'Error al restaurar donación', 'error');
        return null;
      }
    } catch (error) {
      console.error('Error restaurando donación:', error);
      showNotification('Error al restaurar donación', 'error');
      return null;
    } finally {
      setEnviando(false);
    }
  }, [showNotification, cargarDonaciones, cargarEstadisticas]);

  // Buscar donaciones
  const buscarDonaciones = useCallback(async (termino) => {
    const nuevosFiltros = { ...filtros, buscar: termino };
    setFiltros(nuevosFiltros);
    await cargarDonaciones(nuevosFiltros, 1);
  }, [filtros, cargarDonaciones]);

  // Aplicar filtros
  const aplicarFiltros = useCallback(async (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    await cargarDonaciones(nuevosFiltros, 1);
  }, [cargarDonaciones]);

  // Limpiar filtros
  const limpiarFiltros = useCallback(async () => {
    const filtrosLimpios = {};
    setFiltros(filtrosLimpios);
    await cargarDonaciones(filtrosLimpios, 1);
  }, [cargarDonaciones]);

  // Cambiar página
  const cambiarPagina = useCallback(async (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      await cargarDonaciones(filtros, nuevaPagina);
    }
  }, [filtros, totalPaginas, cargarDonaciones]);

  // Exportar donaciones
  const exportarDonaciones = useCallback(async (filtrosExportacion = filtros) => {
    try {
      const response = await donacionService.exportarDonaciones(filtrosExportacion);
      
      if (response.success && response.data.download_url) {
        // Crear enlace de descarga
        const link = document.createElement('a');
        link.href = response.data.download_url;
        link.download = `donaciones-${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        showNotification('Archivo exportado exitosamente', 'success');
        return true;
      } else {
        showNotification('Error al exportar donaciones', 'error');
        return false;
      }
    } catch (error) {
      console.error('Error exportando donaciones:', error);
      showNotification('Error al exportar donaciones', 'error');
      return false;
    }
  }, [filtros, showNotification]);

  // Cargar datos iniciales
  useEffect(() => {
    cargarDonaciones();
    cargarEstadisticas();
  }, []);

  return {
    // Estados
    donaciones,
    donacion,
    estadisticas,
    filtros,
    cargando,
    cargandoEstadisticas,
    enviando,
    paginaActual,
    totalPaginas,
    totalElementos,
    porPagina,
    
    // Acciones de datos
    cargarDonaciones,
    cargarDonacion,
    cargarEstadisticas,
    crearDonacion,
    actualizarDonacion,
    confirmarDonacion,
    rechazarDonacion,
    cancelarDonacion,
    procesarDonacion,
    eliminarDonacion,
    restaurarDonacion,
    
    // Acciones de filtros y búsqueda
    buscarDonaciones,
    aplicarFiltros,
    limpiarFiltros,
    cambiarPagina,
    
    // Acciones de exportación
    exportarDonaciones,
    
    // Setters
    setFiltros,
    setDonacion,
    setPaginaActual
  };
};

export default useDonaciones;
