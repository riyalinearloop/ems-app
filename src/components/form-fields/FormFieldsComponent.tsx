'use client';

import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  className?: string;
  autoCapitalize?: string;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  showError?: boolean;
  defaultValue?: string;
}

// Input field with label and error handling
export const InputField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  id,
  className = '',
  autoCapitalize,
  autoComplete,
  minLength,
  maxLength,
  min,
  max,
  disabled,
  showError = true,
  defaultValue,
}: InputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as any}
      render={({ field, fieldState: { error, isTouched } }) => (
        <div className="space-y-2">
          {label && <Label htmlFor={id || name}>{label}</Label>}
          <Input
            {...field}
            value={field.value ?? ''}
            id={id || name}
            type={type}
            placeholder={placeholder}
            className={cn(
              isTouched && error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              isTouched && !error && 'border-green-500',
              className
            )}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            minLength={minLength}
            maxLength={maxLength}
            min={min}
            max={max}
            disabled={disabled}
            aria-invalid={!!error}
          />
          {showError && error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

// Input field without label (matching svastha's InputFieldOnly)
export const InputFieldOnly = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  id,
  className = '',
  autoCapitalize,
  autoComplete,
  minLength,
  maxLength,
  min,
  max,
  disabled,
  showError = true,
  defaultValue,
}: InputFieldProps<T>) => {
  return (
    <InputField
      name={name}
      control={control}
      label={label}
      placeholder={placeholder}
      type={type}
      id={id}
      className={className}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      minLength={minLength}
      maxLength={maxLength}
      min={min}
      max={max}
      disabled={disabled}
      showError={showError}
      defaultValue={defaultValue}
    />
  );
};

// Password field with show/hide toggle
export interface PasswordFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  autoComplete?: string;
  showError?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export const PasswordField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  id,
  className = '',
  autoComplete = 'current-password',
  showError = true,
  showPassword = false,
  onTogglePassword,
}: PasswordFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <div className="space-y-2">
          {label && <Label htmlFor={id || name}>{label}</Label>}
          <div className="relative">
            <Input
              {...field}
              value={field.value ?? ''}
              id={id || name}
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              className={cn(
                isTouched && error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
                isTouched && !error && 'border-green-500',
                className,
                'pr-12'
              )}
              autoComplete={autoComplete}
              aria-invalid={!!error}
            />
            {onTogglePassword && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={onTogglePassword}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
          {showError && error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

