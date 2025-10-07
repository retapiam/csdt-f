import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Search, X, Filter } from 'lucide-react'

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  filters = {},
  onFilterChange,
  onClearFilters,
  filterOptions = {},
  hasActiveFilters,
  placeholder = "Buscar..."
}) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtros */}
      {Object.keys(filterOptions).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(filterOptions).map(([field, options]) => (
            <div key={field} className="space-y-2">
              <label className="text-sm font-medium text-gray-700 capitalize">
                {field.replace(/_/g, ' ')}
              </label>
              <Select
                value={filters[field] || ''}
                onValueChange={(value) => onFilterChange(field, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Filtrar por ${field.replace(/_/g, ' ')}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}

      {/* Botones de acción */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-600">
              Filtros activos
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  )
}

export default SearchAndFilter
