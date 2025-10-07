import { useState, useCallback } from 'react';

// Función temporal para manejar errores
const getErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'Ha ocurrido un error inesperado';
};

export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = useCallback((error) => {
    // console.error('Error capturado:', error);
    const message = getErrorMessage(error);
    setError(message);
    return message;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeAsync = useCallback(async (asyncFunction) => {
    setLoading(true);
    clearError();
    
    try {
      const result = await asyncFunction();
      return result;
    } catch (error) {
      const message = handleError(error);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [handleError, clearError]);

  return {
    error,
    loading,
    handleError,
    clearError,
    executeAsync
  };
};
