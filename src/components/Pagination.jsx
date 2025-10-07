import React from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPrevPage,
  onFirstPage,
  onLastPage,
  hasNextPage,
  hasPrevPage,
  startIndex,
  endIndex,
  totalItems,
  getPageNumbers
}) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex items-center justify-between flex-1 sm:hidden">
        <Button
          variant="outline"
          onClick={onPrevPage}
          disabled={!hasPrevPage}
          size="sm"
        >
          Anterior
        </Button>
        <span className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={onNextPage}
          disabled={!hasNextPage}
          size="sm"
        >
          Siguiente
        </Button>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-between sm:flex-1">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{startIndex}</span> a{' '}
            <span className="font-medium">{endIndex}</span> de{' '}
            <span className="font-medium">{totalItems}</span> resultados
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onFirstPage}
            disabled={!hasPrevPage}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevPage}
            disabled={!hasPrevPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className={currentPage === page ? "bg-blue-600 text-white" : ""}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={!hasNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onLastPage}
            disabled={!hasNextPage}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
