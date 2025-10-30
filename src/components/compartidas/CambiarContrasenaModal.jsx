import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { LoaderCircle, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import api from '@services/api';
import { API_ENDPOINTS } from '../../config/config';

const CambiarContrasenaModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    con_actual: '',
    con_nueva: '',
    con_nueva_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    actual: false,
    nueva: false,
    confirmacion: false
  });
  const [success, setSuccess] = useState(false);
  const [useManual, setUseManual] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error específico del campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!useManual) {
      if (!formData.con_actual) {
        newErrors.con_actual = 'La contraseña actual es obligatoria';
      }
    }
    
    if (!formData.con_nueva) {
      newErrors.con_nueva = 'La nueva contraseña es obligatoria';
    } else if (formData.con_nueva.length < 6) {
      newErrors.con_nueva = 'La contraseña debe tener al menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.con_nueva)) {
      newErrors.con_nueva = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
    }
    
    if (formData.con_nueva !== formData.con_nueva_confirmation) {
      newErrors.con_nueva_confirmation = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setErrors({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      let response;
      if (useManual) {
        // Modo manual: actualizar perfil con nueva contraseña
        response = await api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE || '/auth/profile', {
          password: formData.con_nueva,
          password_confirmation: formData.con_nueva_confirmation
        });
      } else {
        response = await api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD || '/auth/change-password', {
          current_password: formData.con_actual,
          password: formData.con_nueva,
          password_confirmation: formData.con_nueva_confirmation
        });
      }

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess?.();
          handleClose();
        }, 2000);
      } else {
        // Mostrar errores de validación si vienen del backend
        if (response.data.errors) {
          const be = response.data.errors;
          setErrors({
            con_actual: be.current_password?.[0] || '',
            con_nueva: be.password?.[0] || '',
            con_nueva_confirmation: be.password_confirmation?.[0] || ''
          });
        }
        setError(response.data.message || 'Error de validación');
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 404 && !useManual) {
        // Endpoint no existe: intentar modo manual automáticamente
        try {
          const fallback = await api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE || '/auth/profile', {
            password: formData.con_nueva,
            password_confirmation: formData.con_nueva_confirmation
          });
          if (fallback.data?.success) {
            setSuccess(true);
            setTimeout(() => {
              onSuccess?.();
              handleClose();
            }, 2000);
            return;
          }
        } catch (e) {
          // continuar con manejo estándar
        }
      }
      if (status === 422) {
        const be = err.response?.data?.errors || {};
        setErrors({
          con_actual: be.current_password?.[0] || '',
          con_nueva: be.password?.[0] || '',
          con_nueva_confirmation: be.password_confirmation?.[0] || ''
        });
        setError(err.response?.data?.message || 'Error de validación');
      } else if (status === 400 || status === 401) {
        setError(err.response?.data?.message || 'No autorizado o datos inválidos');
      } else {
        setError(err.response?.data?.message || 'Error al cambiar contraseña');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      con_actual: '',
      con_nueva: '',
      con_nueva_confirmation: ''
    });
    setError('');
    setErrors({});
    setSuccess(false);
    setShowPasswords({
      actual: false,
      nueva: false,
      confirmacion: false
    });
    onClose();
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Contraseña actualizada
            </h3>
            <p className="text-gray-600 mb-4">
              Tu contraseña ha sido cambiada exitosamente.
            </p>
            <Button onClick={handleClose} className="w-full">
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Cambiar Contraseña
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <input
              id="use_manual"
              type="checkbox"
              checked={useManual}
              onChange={(e) => setUseManual(e.target.checked)}
            />
            <label htmlFor="use_manual" className="text-sm text-gray-700">
              Cambiar sin validar contraseña actual (modo manual)
            </label>
          </div>

          {!useManual && (
          <div className="space-y-2">
            <Label htmlFor="con_actual" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Contraseña actual
            </Label>
            <div className="relative">
              <Input
                id="con_actual"
                type={showPasswords.actual ? 'text' : 'password'}
                name="con_actual"
                value={formData.con_actual}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña actual"
                required
                className={errors.con_actual ? 'border-red-500' : ''}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('actual')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.actual ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.con_actual && (
              <p className="text-sm text-red-600">{errors.con_actual}</p>
            )}
          </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="con_nueva" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Nueva contraseña
            </Label>
            <div className="relative">
              <Input
                id="con_nueva"
                type={showPasswords.nueva ? 'text' : 'password'}
                name="con_nueva"
                value={formData.con_nueva}
                onChange={handleChange}
                placeholder="Ingresa tu nueva contraseña"
                required
                className={errors.con_nueva ? 'border-red-500' : ''}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('nueva')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.nueva ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.con_nueva && (
              <p className="text-sm text-red-600">{errors.con_nueva}</p>
            )}
            <div className="text-xs text-gray-500">
              Debe tener al menos 6 caracteres, incluyendo mayúsculas, minúsculas y números.
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="con_nueva_confirmation" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Confirmar nueva contraseña
            </Label>
            <div className="relative">
              <Input
                id="con_nueva_confirmation"
                type={showPasswords.confirmacion ? 'text' : 'password'}
                name="con_nueva_confirmation"
                value={formData.con_nueva_confirmation}
                onChange={handleChange}
                placeholder="Confirma tu nueva contraseña"
                required
                className={errors.con_nueva_confirmation ? 'border-red-500' : ''}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmacion')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirmacion ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.con_nueva_confirmation && (
              <p className="text-sm text-red-600">{errors.con_nueva_confirmation}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
              Cambiar Contraseña
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CambiarContrasenaModal;
