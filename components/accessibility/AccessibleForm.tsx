/**
 * Accessible Form Component
 * Enhanced form with comprehensive accessibility features
 */

'use client';

import React, { createContext, useContext, useState, ReactNode, FormHTMLAttributes } from 'react';
import { useAccessibilityContext } from './AccessibilityProvider';

interface FormFieldError {
  field: string;
  message: string;
}

interface FormContextType {
  errors: FormFieldError[];
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;
  hasError: (field: string) => boolean;
  getError: (field: string) => string | undefined;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface AccessibleFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: ReactNode;
  onSubmit?: (data: FormData) => void | Promise<void>;
  validateOnSubmit?: boolean;
  announceErrors?: boolean;
}

export function AccessibleForm({
  children,
  onSubmit,
  validateOnSubmit = true,
  announceErrors = true,
  className = '',
  ...props
}: AccessibleFormProps) {
  const [errors, setErrors] = useState<FormFieldError[]>([]);
  const { announce } = useAccessibilityContext();

  const setError = (field: string, message: string) => {
    setErrors(prev => {
      const filtered = prev.filter(error => error.field !== field);
      return [...filtered, { field, message }];
    });
  };

  const clearError = (field: string) => {
    setErrors(prev => prev.filter(error => error.field !== field));
  };

  const clearAllErrors = () => {
    setErrors([]);
  };

  const hasError = (field: string) => {
    return errors.some(error => error.field === field);
  };

  const getError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (validateOnSubmit) {
      const formData = new FormData(event.currentTarget);
      const formErrors: FormFieldError[] = [];

      // Basic validation
      const requiredFields = event.currentTarget.querySelectorAll('[required]');
      requiredFields.forEach((field) => {
        const input = field as HTMLInputElement;
        if (!input.value.trim()) {
          formErrors.push({
            field: input.name || input.id,
            message: `${input.getAttribute('aria-label') || input.name || 'This field'} is required`,
          });
        }
      });

      // Email validation
      const emailFields = event.currentTarget.querySelectorAll('input[type="email"]');
      emailFields.forEach((field) => {
        const input = field as HTMLInputElement;
        if (input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          formErrors.push({
            field: input.name || input.id,
            message: 'Please enter a valid email address',
          });
        }
      });

      setErrors(formErrors);

      if (formErrors.length > 0) {
        if (announceErrors) {
          announce(`Form has ${formErrors.length} error${formErrors.length > 1 ? 's' : ''}`, 'assertive');
        }
        return;
      }
    }

    if (onSubmit) {
      const formData = new FormData(event.currentTarget);
      await onSubmit(formData);
    }
  };

  const contextValue: FormContextType = {
    errors,
    setError,
    clearError,
    clearAllErrors,
    hasError,
    getError,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form
        className={`space-y-4 ${className}`}
        onSubmit={handleSubmit}
        noValidate
        {...props}
      >
        {children}
        
        {/* Error summary for screen readers */}
        {errors.length > 0 && (
          <div
            role="alert"
            aria-live="assertive"
            className="sr-only"
          >
            Form has {errors.length} error{errors.length > 1 ? 's' : ''}: {errors.map(e => e.message).join(', ')}
          </div>
        )}
      </form>
    </FormContext.Provider>
  );
}

export function useFormContext(): FormContextType {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within an AccessibleForm');
  }
  return context;
}

interface AccessibleFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'textarea';
  required?: boolean;
  placeholder?: string;
  description?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  rows?: number;
  children?: ReactNode;
}

export function AccessibleField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  description,
  error,
  className = '',
  inputClassName = '',
  labelClassName = '',
  rows = 3,
  children,
}: AccessibleFieldProps) {
  const { hasError, getError } = useFormContext();
  const fieldError = error || getError(name);
  const isInvalid = hasError(name) || !!fieldError;

  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const descriptionId = `${fieldId}-description`;

  const baseInputClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  const inputClasses = isInvalid
    ? `${baseInputClasses} border-red-300 focus:ring-red-500 focus:border-red-500`
    : `${baseInputClasses} border-gray-300 focus:ring-blue-500 focus:border-blue-500`;

  const labelClasses = `block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`;

  return (
    <div className={`space-y-1 ${className}`}>
      <label
        htmlFor={fieldId}
        className={labelClasses}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {description && (
        <p id={descriptionId} className="text-sm text-gray-600">
          {description}
        </p>
      )}

      {type === 'textarea' ? (
        <textarea
          id={fieldId}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          aria-invalid={isInvalid}
          aria-describedby={`${description ? descriptionId + ' ' : ''}${isInvalid ? errorId : ''}`}
          className={`${inputClasses} ${inputClassName}`}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          aria-invalid={isInvalid}
          aria-describedby={`${description ? descriptionId + ' ' : ''}${isInvalid ? errorId : ''}`}
          className={`${inputClasses} ${inputClassName}`}
        />
      )}

      {children}

      {isInvalid && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-sm text-red-600"
        >
          {fieldError}
        </div>
      )}
    </div>
  );
}
