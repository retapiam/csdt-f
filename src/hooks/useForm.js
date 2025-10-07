import { useState, useCallback } from 'react';

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  const validateForm = useCallback((validationRules = {}) => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field];
      const value = values[field];
      
      if (rule.required && (!value || value.toString().trim() === '')) {
        newErrors[field] = rule.message || `${field} es requerido`;
      } else if (rule.pattern && value && !rule.pattern.test(value)) {
        newErrors[field] = rule.message || `${field} tiene un formato inválido`;
      } else if (rule.minLength && value && value.length < rule.minLength) {
        newErrors[field] = rule.message || `${field} debe tener al menos ${rule.minLength} caracteres`;
      } else if (rule.maxLength && value && value.length > rule.maxLength) {
        newErrors[field] = rule.message || `${field} no puede tener más de ${rule.maxLength} caracteres`;
      } else if (rule.custom && value) {
        const customError = rule.custom(value, values);
        if (customError) {
          newErrors[field] = customError;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const resetField = useCallback((name) => {
    setValues(prev => ({
      ...prev,
      [name]: initialValues[name]
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
    setTouched(prev => ({
      ...prev,
      [name]: false
    }));
  }, [initialValues]);

  const isFieldTouched = useCallback((name) => {
    return touched[name] || false;
  }, [touched]);

  const isFieldValid = useCallback((name) => {
    return !errors[name];
  }, [errors]);

  const isFormValid = useCallback(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    setValues,
    validateForm,
    reset,
    resetField,
    isFieldTouched,
    isFieldValid,
    isFormValid
  };
};

export default useForm;