import React from 'react';
import { Brain } from 'lucide-react';
import { Button } from '../ui/button';

/**
 * Botón para iniciar análisis con IA
 * Componente reutilizable en cualquier página
 */
export const BotonAnalisisIA = ({ 
  onClick, 
  loading = false, 
  disabled = false,
  texto = 'Analizar con IA',
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
      <Brain className="w-4 h-4" />
      {loading ? 'Analizando...' : texto}
    </Button>
  );
};

export default BotonAnalisisIA;

