import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Utilidades para formateo de fechas
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return new Intl.DateTimeFormat('es-CO', defaultOptions).format(new Date(date));
};

// Utilidades para formateo de números
export const formatNumber = (number, options = {}) => {
  if (number === null || number === undefined) return '';
  
  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options
  };
  
  return new Intl.NumberFormat('es-CO', defaultOptions).format(number);
};

// Utilidades para formateo de moneda
export const formatCurrency = (amount, currency = 'COP') => {
  if (amount === null || amount === undefined) return '';
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Utilidades para validación de email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utilidades para validación de teléfono
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Utilidades para generar IDs únicos
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Utilidades para debounce
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Utilidades para throttle
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Utilidades para capitalizar texto
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Utilidades para truncar texto
export const truncate = (str, length = 100) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substr(0, length) + '...';
};

// Utilidades para limpiar texto
export const cleanText = (str) => {
  if (!str) return '';
  return str.trim().replace(/\s+/g, ' ');
};

// Utilidades para generar slug
export const generateSlug = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Utilidades para formateo de archivos
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Utilidades para validación de archivos
export const validateFileType = (file, allowedTypes) => {
  if (!file || !allowedTypes) return false;
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file, maxSize) => {
  if (!file || !maxSize) return true;
  return file.size <= maxSize;
};

// Utilidades para manejo de errores
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  return 'Ha ocurrido un error inesperado';
};

// Utilidades para manejo de respuestas de API
export const handleApiResponse = (response) => {
  if (response?.data) {
    return {
      success: true,
      data: response.data,
      message: response.message || 'Operación exitosa'
    };
  }
  
  return {
    success: false,
    data: null,
    message: 'Error en la respuesta del servidor'
  };
};

// Utilidades para manejo de errores de API
export const handleApiError = (error) => {
  const message = error?.response?.data?.message || 
                 error?.message || 
                 'Error de conexión con el servidor';
  
  return {
    success: false,
    data: null,
    message,
    status: error?.response?.status || 500
  };
};