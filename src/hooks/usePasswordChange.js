import { useState } from 'react';
import api from '@services/api';

export const usePasswordChange = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const changePassword = async (passwordData) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/cambiar-contrasena', passwordData);

      if (response.data.success) {
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al cambiar contraseña');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al cambiar contraseña';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/resetear-contrasena', {
        token,
        password,
        password_confirmation: password
      });

      if (response.data.success) {
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al resetear contraseña');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al resetear contraseña';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const recoverPassword = async (documento, email) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/recuperar-contrasena', {
        documento,
        email
      });

      if (response.data.success) {
        return { 
          success: true, 
          data: response.data.data,
          message: response.data.message 
        };
      } else {
        setError(response.data.message || 'Error al recuperar contraseña');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al recuperar contraseña';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    changePassword,
    resetPassword,
    recoverPassword,
    clearError: () => setError('')
  };
};
