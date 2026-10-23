'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/atoms/Input';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
}

/**
 * Molécula SearchBar - Callejeros Río IV
 * Combina el átomo Input con iconografía de búsqueda y botón de limpieza rápida.
 * Consume el átomo Input y garantiza microinteracciones suaves.
 */
export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Buscar por nombre, barrio o raza...',
  label,
  id,
  className = '',
}: SearchBarProps) {
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Input
        id={id}
        label={label}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label || placeholder}
        leftIcon={<Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />}
        rightIcon={
          value ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          ) : undefined
        }
      />
    </div>
  );
}
