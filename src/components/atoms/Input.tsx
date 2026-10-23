import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Átomo Input - Callejeros Río IV
 * Diseñado para alto contraste y ergonomía en exteriores (DCU - Rescatista Ocasional):
 * - Borde de alto contraste (border-2 border-slate-400 dark:border-slate-500)
 * - Touch target táctil de al menos 48px/56px
 * - Microinteracciones fluidas de foco (transition-all duration-300 ease-in-out)
 * - Estados de error semántico con WCAG AA
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;
    const helperId = inputId ? `${inputId}-helper` : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 pointer-events-none text-slate-500 dark:text-slate-400 flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full rounded-2xl bg-white dark:bg-slate-900 border-2 text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-300 ease-in-out min-h-[50px] py-3 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
              leftIcon ? 'pl-12' : 'pl-4'
            } ${rightIcon ? 'pr-12' : 'pr-4'} ${
              error
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20 dark:border-red-500'
                : 'border-slate-400 dark:border-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/25'
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 text-slate-500 dark:text-slate-400 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-semibold text-red-700 dark:text-red-400 mt-1 flex items-center gap-1.5 animate-in fade-in duration-300 ease-in-out"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className="text-xs text-slate-600 dark:text-slate-400 mt-1"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
