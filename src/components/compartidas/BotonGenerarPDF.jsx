import React from 'react';
import { FileDown } from 'lucide-react';
import { Button } from '../ui/button';

/**
 * Botón para generar PDF
 * Componente reutilizable en cualquier página
 */
export const BotonGenerarPDF = ({ 
  onClick, 
  loading = false, 
  disabled = false,
  texto = 'Generar PDF',
  variante = 'default',
  className = ''
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      variant={variante}
      className={`flex items-center gap-2 ${className}`}
    >
      <FileDown className="w-4 h-4" />
      {loading ? 'Generando...' : texto}
    </Button>
  );
};

export default BotonGenerarPDF;

