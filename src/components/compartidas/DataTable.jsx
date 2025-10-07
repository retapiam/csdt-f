import React, { useState, useMemo } from 'react';
import { 
    ChevronLeftIcon, 
    ChevronRightIcon, 
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

/**
 * Componente de tabla de datos genérico
 * Proporciona funcionalidades completas de visualización y gestión de datos
 */
const DataTable = ({
    data = [],
    columns = [],
    loading = false,
    error = null,
    pagination = null,
    searchTerm = '',
    onSearch = () => {},
    onSort = () => {},
    onPageChange = () => {},
    onPageSizeChange = () => {},
    onEdit = null,
    onDelete = null,
    onView = null,
    onExport = null,
    sortBy = '',
    sortDirection = 'asc',
    showSearch = true,
    showFilters = true,
    showPagination = true,
    showActions = true,
    showExport = true,
    className = '',
    emptyMessage = 'No hay datos disponibles',
    searchPlaceholder = 'Buscar...',
    pageSizeOptions = [10, 15, 25, 50, 100]
}) => {
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    // ========================================
    // FUNCIONES DE UTILIDAD
    // ========================================

    const handleSort = (column) => {
        if (column.sortable !== false) {
            const direction = sortBy === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
            onSort(column.key, direction);
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(data.map((_, index) => index));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (index, checked) => {
        if (checked) {
            setSelectedRows(prev => [...prev, index]);
        } else {
            setSelectedRows(prev => prev.filter(i => i !== index));
        }
    };

    const getSortIcon = (column) => {
        if (sortBy !== column.key) return null;
        return sortDirection === 'asc' ? 
            <ArrowUpIcon className="w-4 h-4" /> : 
            <ArrowDownIcon className="w-4 h-4" />;
    };

    const renderCell = (item, column) => {
        const value = column.key.split('.').reduce((obj, key) => obj?.[key], item);
        
        if (column.render) {
            return column.render(value, item);
        }
        
        if (column.type === 'date') {
            return new Date(value).toLocaleDateString('es-ES');
        }
        
        if (column.type === 'datetime') {
            return new Date(value).toLocaleString('es-ES');
        }
        
        if (column.type === 'currency') {
            return new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'COP'
            }).format(value || 0);
        }
        
        if (column.type === 'number') {
            return new Intl.NumberFormat('es-ES').format(value || 0);
        }
        
        if (column.type === 'boolean') {
            return value ? 'Sí' : 'No';
        }
        
        if (column.type === 'status') {
            const statusConfig = column.statusConfig || {};
            const config = statusConfig[value] || { color: 'gray', label: value };
            return (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${config.color}-100 text-${config.color}-800`}>
                    {config.label}
                </span>
            );
        }
        
        return value || '-';
    };

    // ========================================
    // RENDERIZADO
    // ========================================

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                            Error al cargar datos
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                            {error}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white shadow-sm rounded-lg ${className}`}>
            {/* Header con búsqueda y filtros */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {showSearch && (
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder={searchPlaceholder}
                                    value={searchTerm}
                                    onChange={(e) => onSearch(e.target.value)}
                                />
                            </div>
                        )}
                        
                        {showFilters && (
                            <button
                                onClick={() => setShowFilterPanel(!showFilterPanel)}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FunnelIcon className="h-4 w-4 mr-2" />
                                Filtros
                            </button>
                        )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {showExport && onExport && (
                            <button
                                onClick={() => onExport(selectedRows)}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                                Exportar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Panel de filtros */}
            {showFilterPanel && (
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Aquí se pueden agregar filtros específicos */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Filtro de ejemplo
                            </label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option>Todos</option>
                                <option>Activos</option>
                                <option>Inactivos</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {showActions && (
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={selectedRows.length === data.length && data.length > 0}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                        column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleSort(column)}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{column.title}</span>
                                        {column.sortable !== false && getSortIcon(column)}
                                    </div>
                                </th>
                            ))}
                            {showActions && (
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length === 0 ? (
                            <tr>
                                <td 
                                    colSpan={columns.length + (showActions ? 2 : 0)} 
                                    className="px-6 py-12 text-center text-sm text-gray-500"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={item.id || index} className="hover:bg-gray-50">
                                    {showActions && (
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                checked={selectedRows.includes(index)}
                                                onChange={(e) => handleSelectRow(index, e.target.checked)}
                                            />
                                        </td>
                                    )}
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                        >
                                            {renderCell(item, column)}
                                        </td>
                                    ))}
                                    {showActions && (
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                {onView && (
                                                    <button
                                                        onClick={() => onView(item)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                        title="Ver"
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                    </button>
                                                )}
                                                {onEdit && (
                                                    <button
                                                        onClick={() => onEdit(item)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                        title="Editar"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => onDelete(item)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Eliminar"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {showPagination && pagination && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => onPageChange(pagination.current_page - 1)}
                            disabled={pagination.current_page <= 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => onPageChange(pagination.current_page + 1)}
                            disabled={pagination.current_page >= pagination.last_page}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Mostrando{' '}
                                <span className="font-medium">
                                    {((pagination.current_page - 1) * pagination.per_page) + 1}
                                </span>{' '}
                                a{' '}
                                <span className="font-medium">
                                    {Math.min(pagination.current_page * pagination.per_page, pagination.total)}
                                </span>{' '}
                                de{' '}
                                <span className="font-medium">{pagination.total}</span>{' '}
                                resultados
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <label className="text-sm text-gray-700 mr-2">
                                    Por página:
                                </label>
                                <select
                                    value={pagination.per_page}
                                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                                    className="block w-20 pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                >
                                    {pageSizeOptions.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={() => onPageChange(pagination.current_page - 1)}
                                    disabled={pagination.current_page <= 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeftIcon className="h-5 w-5" />
                                </button>
                                
                                {/* Números de página */}
                                {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                                    const page = i + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => onPageChange(page)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                page === pagination.current_page
                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                                
                                <button
                                    onClick={() => onPageChange(pagination.current_page + 1)}
                                    disabled={pagination.current_page >= pagination.last_page}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRightIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
