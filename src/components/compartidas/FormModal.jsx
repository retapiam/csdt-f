import React, { useState, useEffect } from 'react';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

/**
 * Componente de modal de formulario genérico
 * Proporciona funcionalidades completas de formularios con validación
 */
const FormModal = ({
    isOpen = false,
    onClose = () => {},
    onSubmit = () => {},
    title = 'Formulario',
    data = null,
    loading = false,
    error = null,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnOverlayClick = true,
    className = ''
}) => {
    const [formData, setFormData] = useState(data || {});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // ========================================
    // EFECTOS
    // ========================================

    useEffect(() => {
        if (isOpen) {
            setFormData(data || {});
            setErrors({});
            setTouched({});
        }
    }, [isOpen, data]);

    // ========================================
    // FUNCIONES DE UTILIDAD
    // ========================================

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleBlur = (name) => {
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const validateField = (name, value, rules = {}) => {
        const fieldErrors = [];

        if (rules.required && (!value || value.toString().trim() === '')) {
            fieldErrors.push(`${rules.label || name} es requerido`);
        }

        if (rules.minLength && value && value.length < rules.minLength) {
            fieldErrors.push(`${rules.label || name} debe tener al menos ${rules.minLength} caracteres`);
        }

        if (rules.maxLength && value && value.length > rules.maxLength) {
            fieldErrors.push(`${rules.label || name} no puede tener más de ${rules.maxLength} caracteres`);
        }

        if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            fieldErrors.push(`${rules.label || name} debe ser un email válido`);
        }

        if (rules.numeric && value && isNaN(value)) {
            fieldErrors.push(`${rules.label || name} debe ser un número válido`);
        }

        if (rules.min && value && Number(value) < rules.min) {
            fieldErrors.push(`${rules.label || name} debe ser mayor o igual a ${rules.min}`);
        }

        if (rules.max && value && Number(value) > rules.max) {
            fieldErrors.push(`${rules.label || name} debe ser menor o igual a ${rules.max}`);
        }

        if (rules.pattern && value && !rules.pattern.test(value)) {
            fieldErrors.push(`${rules.label || name} no tiene el formato correcto`);
        }

        if (rules.custom && value) {
            const customError = rules.custom(value, formData);
            if (customError) {
                fieldErrors.push(customError);
            }
        }

        return fieldErrors.length > 0 ? fieldErrors[0] : null;
    };

    const validateForm = (fields = []) => {
        const newErrors = {};
        let isValid = true;

        fields.forEach(field => {
            const value = formData[field.name];
            const error = validateField(field.name, value, field.rules || {});
            
            if (error) {
                newErrors[field.name] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData, { validateForm, setErrors });
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            handleClose();
        }
    };

    // ========================================
    // RENDERIZADO
    // ========================================

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        '2xl': 'max-w-6xl'
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Overlay */}
                <div 
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    onClick={handleOverlayClick}
                />

                {/* Modal */}
                <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full ${sizeClasses[size]} ${className}`}>
                    {/* Header */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {title}
                            </h3>
                            {showCloseButton && (
                                <button
                                    onClick={handleClose}
                                    disabled={loading}
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Error general */}
                    {error && (
                        <div className="px-4 sm:px-6">
                            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                <div className="flex">
                                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            Error
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            {error}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Formulario */}
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 py-5 sm:p-6">
                            {React.Children.map(children, child => {
                                if (React.isValidElement(child)) {
                                    return React.cloneElement(child, {
                                        formData,
                                        errors,
                                        touched,
                                        onChange: handleInputChange,
                                        onBlur: handleBlur,
                                        validateField
                                    });
                                }
                                return child;
                            })}
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Procesando...
                                    </>
                                ) : (
                                    'Guardar'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={loading}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// ========================================
// COMPONENTES DE CAMPOS
// ========================================

export const FormField = ({ 
    name, 
    label, 
    type = 'text', 
    placeholder = '', 
    required = false, 
    rules = {},
    formData = {},
    errors = {},
    touched = {},
    onChange = () => {},
    onBlur = () => {},
    validateField = () => {},
    options = [],
    className = '',
    ...props 
}) => {
    const value = formData[name] || '';
    const error = errors[name];
    const isTouched = touched[name];
    const showError = isTouched && error;

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(name, newValue);
    };

    const handleBlur = () => {
        onBlur(name);
        if (rules && Object.keys(rules).length > 0) {
            const fieldError = validateField(name, value, rules);
            if (fieldError) {
                // El error se maneja en el componente padre
            }
        }
    };

    const renderInput = () => {
        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                            showError ? 'border-red-300' : ''
                        }`}
                        rows={3}
                        {...props}
                    />
                );

            case 'select':
                return (
                    <select
                        id={name}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                            showError ? 'border-red-300' : ''
                        }`}
                        {...props}
                    >
                        <option value="">Seleccionar...</option>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <div className="flex items-center">
                        <input
                            id={name}
                            name={name}
                            type="checkbox"
                            checked={value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                                showError ? 'border-red-300' : ''
                            }`}
                            {...props}
                        />
                        <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
                            {label}
                        </label>
                    </div>
                );

            case 'radio':
                return (
                    <div className="space-y-2">
                        {options.map(option => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    id={`${name}-${option.value}`}
                                    name={name}
                                    type="radio"
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ${
                                        showError ? 'border-red-300' : ''
                                    }`}
                                />
                                <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-900">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );

            default:
                return (
                    <input
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                            showError ? 'border-red-300' : ''
                        }`}
                        {...props}
                    />
                );
        }
    };

    if (type === 'checkbox') {
        return (
            <div className={className}>
                {renderInput()}
                {showError && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }

    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderInput()}
            {showError && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export const FormGroup = ({ children, className = '' }) => (
    <div className={`space-y-4 ${className}`}>
        {children}
    </div>
);

export const FormRow = ({ children, className = '' }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
        {children}
    </div>
);

export default FormModal;
