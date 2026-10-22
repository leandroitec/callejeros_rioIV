'use client';

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Componente Button Canónico - Callejeros Río IV
 * Cumple estrictamente con la anatomía viva de los 5 estados de interacción:
 * 1. Default: Color base según semántica (bg-orange-500 para primary, bg-teal-500 para secondary)
 * 2. Hover: Indicador claro de interactividad (hover:bg-orange-600 / hover:bg-teal-600)
 * 3. Active: Sensación háptica de hundimiento físico (active:scale-95)
 * 4. Focus: Anillo accesible de alto contraste (focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none)
 * 5. Disabled: Estado inactivo para formularios incompletos (disabled:opacity-50 disabled:cursor-not-allowed)
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    // 1. Estilos base comunes a todos los botones
    const baseStyles =
      'inline-flex items-center justify-center font-heading font-bold rounded-2xl transition-all duration-200 select-none cursor-pointer ' +
      'active:scale-95 ' + // 3. Estado Active
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ' + // 4. Estado Focus
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100'; // 5. Estado Disabled

    // 2. Variantes según psicología del color y semántica
    const variantStyles: Record<ButtonVariant, string> = {
      // Primario (Naranja): Energía y urgencia moderada del rescate animal
      primary:
        'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 hover:shadow-lg focus-visible:ring-orange-400',
      // Secundario (Verde Agua / Teal): Acentos visuales y acciones complementarias
      secondary:
        'bg-teal-500 hover:bg-teal-600 text-white shadow-md shadow-teal-500/20 hover:shadow-lg focus-visible:ring-teal-400',
      // Contorno (Outline): Acciones secundarias neutrales
      outline:
        'bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 focus-visible:ring-orange-400',
      // Fantasma (Ghost): Acciones terciarias o de descarte sin peso visual
      ghost:
        'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white focus-visible:ring-slate-400',
      // Peligro (Danger): Validaciones críticas o cancelaciones irreversibles
      danger:
        'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 hover:shadow-lg focus-visible:ring-red-400',
    };

    // 3. Escala de tamaños con tap target móvil accesible (mínimo 44px para md/lg)
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'min-h-[40px] px-3.5 py-2 text-xs gap-1.5',
      md: 'min-h-[48px] px-6 py-3 text-sm gap-2',
      lg: 'min-h-[52px] px-7 py-3.5 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
              aria-hidden="true"
            />
            <span>Cargando...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
