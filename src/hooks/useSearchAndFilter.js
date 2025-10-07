import { useState, useCallback, useMemo } from 'react'

const useSearchAndFilter = (data = [], searchFields = [], filterFields = {}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({})
  const [sortField, setSortField] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data]

    // Aplicar búsqueda
    if (searchTerm && searchFields.length > 0) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(item =>
        searchFields.some(field => {
          const value = item[field]
          return value && value.toString().toLowerCase().includes(searchLower)
        })
      )
    }

    // Aplicar filtros
    Object.entries(filters).forEach(([field, value]) => {
      if (value && value !== '') {
        filtered = filtered.filter(item => {
          const itemValue = item[field]
          if (Array.isArray(value)) {
            return value.includes(itemValue)
          }
          return itemValue === value
        })
      }
    })

    // Aplicar ordenamiento
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField]
        const bValue = b[sortField]
        
        if (aValue < bValue) {
          return sortDirection === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [data, searchTerm, searchFields, filters, sortField, sortDirection])

  const handleSearch = useCallback((term) => {
    setSearchTerm(term)
  }, [])

  const handleFilter = useCallback((field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({})
    setSearchTerm('')
  }, [])

  const handleSort = useCallback((field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }, [sortField])

  const getFilterOptions = useCallback((field) => {
    const uniqueValues = [...new Set(data.map(item => item[field]))]
    return uniqueValues
      .filter(value => value !== null && value !== undefined)
      .map(value => ({
        value,
        label: value.toString()
      }))
  }, [data])

  const getActiveFiltersCount = useCallback(() => {
    return Object.values(filters).filter(value => value && value !== '').length
  }, [filters])

  return {
    searchTerm,
    filters,
    sortField,
    sortDirection,
    filteredData: filteredAndSortedData,
    handleSearch,
    handleFilter,
    clearFilters,
    handleSort,
    getFilterOptions,
    getActiveFiltersCount,
    hasActiveFilters: getActiveFiltersCount() > 0 || searchTerm !== ''
  }
}

export default useSearchAndFilter
