'use client';

import React from 'react';

export interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  name?: string;
  description?: string;
  disabled?: boolean;
  variant?: 'green' | 'primary';
  className?: string;
}

/**
 * Átomo ToggleSwitch - Callejeros Río IV
 * Implementa la lógica de Smart Animate de Figma:
 * - Inactivo (Off): fondo gris neutro (bg-slate-300 / dark:bg-slate-700), thumb a la izquierda, sombra interna (shadow-inner).
 * - Activo (On): fondo verde éxito (bg-green-500) o primario (bg-orange-600), thumb trasladado a la derecha (translate-x-5) con animación fluida (transition-transform duration-300 ease-in-out).
 * - Accesibilidad WCAG AA: role="switch", aria-checked, focus-visible con anillo de alto contraste.
 */
export function ToggleSwitch({
  label,
  checked,
  onChange,
  id,
  name,
  description,
  disabled = false,
  variant = 'green',
  className = '',
}: ToggleSwitchProps) {
  const switchId = id ?? `toggle-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  const activeBg = variant === 'green' ? 'bg-green-500 dark:bg-green-600' : 'bg-orange-600 dark:bg-orange-500';
  const focusRing = variant === 'green' ? 'focus-visible:ring-green-500' : 'focus-visible:ring-orange-500';

  return (
    <div
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
      className={`flex items-center justify-between w-full py-2.5 px-3 rounded-2xl transition-colors duration-300 ease-in-out cursor-pointer group select-none hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
        disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
      } ${className}`}
    >
      <div className="flex-1 pr-4">
        <label
          htmlFor={switchId}
          className="text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer select-none block"
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 select-none">
            {description}
          </p>
        )}
      </div>

      {/* Switch Track con Smart Animate */}
      <button
        type="button"
        id={switchId}
        name={name}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onChange(!checked);
        }}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${focusRing} dark:focus-visible:ring-offset-slate-900 shadow-inner ${
          checked ? activeBg : 'bg-slate-300 dark:bg-slate-700'
        }`}
      >
        {/* Switch Thumb (Círculo con Smart Animate Translation) */}
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-300 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
