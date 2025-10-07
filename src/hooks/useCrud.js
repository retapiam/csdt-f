import { useState, useEffect, useCallback } from 'react';
import apiServiceMejorado from '@services/ApiServiceMejorado';

/**
 * Hook personalizado para operaciones CRUD
 * Proporciona funcionalidades completas de gestión de datos
 */
export const useCrud = (endpoint, options = {}) => {
    const {
        autoLoad = true,
        initialFilters = {},
        pageSize = 15
    } = options;

    // Estados principales
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: pageSize,
        total: 0
    });

    // Estados de filtros y búsqueda
    const [filters, setFilters] = useState(initialFilters);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('created_at');
    const [sortDirection, setSortDirection] = useState('desc');

    // Estados de operaciones
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // ========================================
    // FUNCIONES DE CARGA DE DATOS
    // ========================================

    const loadData = useCallback(async (customFilters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const params = {
                ...filters,
                ...customFilters,
                buscar: searchTerm,
                orden: sortBy,
                direccion: sortDirection,
                por_pagina: pageSize,
                pagina: pagination.current_page
            };

            const response = await apiServiceMejorado.listar(endpoint, params);
            
            if (response.success) {
                setData(response.data.data || response.data);
                setPagination(response.data.meta || {
                    current_page: 1,
                    last_page: 1,
                    per_page: pageSize,
                    total: response.data.length || 0
                });
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err.message || 'Error al cargar datos');
        } finally {
            setLoading(false);
        }
    }, [endpoint, filters, searchTerm, sortBy, sortDirection, pageSize, pagination.current_page]);

    // ========================================
    // FUNCIONES CRUD
    // ========================================

    const create = useCallback(async (newData) => {
        setCreating(true);
        setError(null);

        try {
            const response = await apiServiceMejorado.crear(endpoint, newData);
            
            if (response.success) {
                // Recargar datos después de crear
                await loadData();
                return { success: true, data: response.data, message: response.message };
            } else {
                setError(response.message);
                return { success: false, message: response.message, errors: response.errors };
            }
        } catch (err) {
            const errorMessage = err.message || 'Error al crear registro';
            setError(errorMessage);
            return { success: false, message: errorMessage, errors: err.errors };
        } finally {
            setCreating(false);
        }
    }, [endpoint, loadData]);

    const update = useCallback(async (id, updateData) => {
        setUpdating(true);
        setError(null);

        try {
            const response = await apiServiceMejorado.actualizar(endpoint, id, updateData);
            
            if (response.success) {
                // Actualizar datos localmente
                setData(prevData => 
                    prevData.map(item => 
                        item.id === id ? { ...item, ...response.data } : item
                    )
                );
                return { success: true, data: response.data, message: response.message };
            } else {
                setError(response.message);
                return { success: false, message: response.message, errors: response.errors };
            }
        } catch (err) {
            const errorMessage = err.message || 'Error al actualizar registro';
            setError(errorMessage);
            return { success: false, message: errorMessage, errors: err.errors };
        } finally {
            setUpdating(false);
        }
    }, [endpoint]);

    const remove = useCallback(async (id) => {
        setDeleting(true);
        setError(null);

        try {
            const response = await apiServiceMejorado.eliminar(endpoint, id);
            
            if (response.success) {
                // Remover del estado local
                setData(prevData => prevData.filter(item => item.id !== id));
                return { success: true, message: response.message };
            } else {
                setError(response.message);
                return { success: false, message: response.message };
            }
        } catch (err) {
            const errorMessage = err.message || 'Error al eliminar registro';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setDeleting(false);
        }
    }, [endpoint]);

    const restore = useCallback(async (id) => {
        setError(null);

        try {
            const response = await apiServiceMejorado.request('POST', `${endpoint}/${id}/restaurar`);
            
            if (response.success) {
                await loadData();
                return { success: true, data: response.data, message: response.message };
            } else {
                setError(response.message);
                return { success: false, message: response.message };
            }
        } catch (err) {
            const errorMessage = err.message || 'Error al restaurar registro';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    }, [endpoint, loadData]);

    // ========================================
    // FUNCIONES DE BÚSQUEDA Y FILTROS
    // ========================================

    const search = useCallback(async (term, customFilters = {}) => {
        setSearchTerm(term);
        setError(null);

        try {
            const response = await apiServiceMejorado.buscar(endpoint, term, {
                ...filters,
                ...customFilters
            });
            
            if (response.success) {
                setData(response.data.data || response.data);
                setPagination(response.data.meta || {
                    current_page: 1,
                    last_page: 1,
                    per_page: pageSize,
                    total: response.data.length || 0
                });
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err.message || 'Error en la búsqueda');
        }
    }, [endpoint, filters, pageSize]);

    const applyFilters = useCallback(async (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPagination(prev => ({ ...prev, current_page: 1 }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters(initialFilters);
        setSearchTerm('');
        setSortBy('created_at');
        setSortDirection('desc');
        setPagination(prev => ({ ...prev, current_page: 1 }));
    }, [initialFilters]);

    // ========================================
    // FUNCIONES DE PAGINACIÓN
    // ========================================

    const goToPage = useCallback((page) => {
        setPagination(prev => ({ ...prev, current_page: page }));
    }, []);

    const changePageSize = useCallback((size) => {
        setPagination(prev => ({ ...prev, per_page: size, current_page: 1 }));
    }, []);

    // ========================================
    // FUNCIONES DE ORDENAMIENTO
    // ========================================

    const sort = useCallback((field, direction = 'asc') => {
        setSortBy(field);
        setSortDirection(direction);
    }, []);

    // ========================================
    // FUNCIONES DE VALIDACIÓN
    // ========================================

    const validate = useCallback(async (data) => {
        setError(null);

        try {
            const response = await apiServiceMejorado.validar(endpoint, data);
            return response;
        } catch (err) {
            setError(err.message || 'Error en la validación');
            return { success: false, message: err.message, errors: err.errors };
        }
    }, [endpoint]);

    // ========================================
    // FUNCIONES DE ESTADÍSTICAS
    // ========================================

    const getStatistics = useCallback(async (id = null) => {
        setError(null);

        try {
            const response = await apiServiceMejorado.estadisticas(endpoint, id);
            return response;
        } catch (err) {
            setError(err.message || 'Error al obtener estadísticas');
            return { success: false, message: err.message };
        }
    }, [endpoint]);

    // ========================================
    // FUNCIONES DE EXPORTACIÓN
    // ========================================

    const exportData = useCallback(async (customFilters = {}) => {
        setError(null);

        try {
            const response = await apiServiceMejorado.exportar(endpoint, {
                ...filters,
                ...customFilters
            });
            return response;
        } catch (err) {
            setError(err.message || 'Error al exportar datos');
            return { success: false, message: err.message };
        }
    }, [endpoint, filters]);

    // ========================================
    // EFECTOS
    // ========================================

    // Cargar datos automáticamente
    useEffect(() => {
        if (autoLoad) {
            loadData();
        }
    }, [autoLoad, loadData]);

    // Recargar cuando cambien los filtros o paginación
    useEffect(() => {
        if (autoLoad) {
            loadData();
        }
    }, [filters, pagination.current_page, pagination.per_page, sortBy, sortDirection]);

    // ========================================
    // FUNCIONES DE UTILIDAD
    // ========================================

    const refresh = useCallback(() => {
        loadData();
    }, [loadData]);

    const getById = useCallback(async (id) => {
        setError(null);

        try {
            const response = await apiServiceMejorado.obtener(endpoint, id);
            return response;
        } catch (err) {
            setError(err.message || 'Error al obtener registro');
            return { success: false, message: err.message };
        }
    }, [endpoint]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // ========================================
    // RETORNO DEL HOOK
    // ========================================

    return {
        // Datos
        data,
        loading,
        error,
        pagination,
        
        // Filtros y búsqueda
        filters,
        searchTerm,
        sortBy,
        sortDirection,
        
        // Estados de operaciones
        creating,
        updating,
        deleting,
        
        // Funciones CRUD
        create,
        update,
        remove,
        restore,
        
        // Funciones de búsqueda y filtros
        search,
        applyFilters,
        clearFilters,
        
        // Funciones de paginación
        goToPage,
        changePageSize,
        
        // Funciones de ordenamiento
        sort,
        
        // Funciones de validación
        validate,
        
        // Funciones de estadísticas
        getStatistics,
        
        // Funciones de exportación
        exportData,
        
        // Funciones de utilidad
        refresh,
        getById,
        clearError,
        loadData
    };
};

export default useCrud;
