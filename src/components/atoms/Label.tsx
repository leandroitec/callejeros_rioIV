import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/**
 * Átomo Label - Callejeros Río IV
 * Etiqueta accesible para formularios con escala tipográfica modular y alto contraste.
 */
export function Label({ children, required, className = '', ...props }: LabelProps) {
  return (
    <label
      className={`block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 select-none ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
    </label>
  );
}
