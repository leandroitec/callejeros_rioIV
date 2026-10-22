'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronDown, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';

export interface FilterState {
  search: string;
  age0to1: boolean;
  age1to3: boolean;
  ageOver3: boolean;
  onlyFavorites: boolean;
  sociable: boolean;
  castrated: boolean;
  sex: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
}

export function FilterModal({
  isOpen,
  onClose,
  filters: initialFilters,
  onApply,
  onReset,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(initialFilters);
  const [expandedSection, setExpandedSection] = useState<'edad' | 'sociabilidad' | 'castracion' | 'sexo' | null>('edad');
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Escuchar tecla Escape para cerrar accesiblemente
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap accesible para navegación por teclado (Tab / Shift+Tab)
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus en el campo de búsqueda al abrir
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 60);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (section: 'edad' | 'sociabilidad' | 'castracion' | 'sexo') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const defaultState: FilterState = {
      search: '',
      age0to1: false,
      age1to3: false,
      ageOver3: false,
      onlyFavorites: false,
      sociable: false,
      castrated: false,
      sex: 'TODOS',
    };
    setLocalFilters(defaultState);
    onReset();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-neutral-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom duration-300"
      >
        {/* Header Modal con Buscador */}
        <div className="p-4 border-b border-neutral-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <h2 id="filter-title" className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                Filtros de búsqueda
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Cerrar modal de filtros"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Barra de Búsqueda (Figma) */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={localFilters.search}
              onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
              placeholder="Buscar por nombre, barrio, etc..."
              aria-label="Buscar mascotas por nombre o barrio"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 transition-all min-h-[44px]"
            />
          </div>
        </div>

        {/* Contenido de Filtros Desplegables (Figma Wireframe 3) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Sección 1: Edad */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('edad')}
              aria-expanded={expandedSection === 'edad'}
              className="w-full flex items-center justify-between p-3.5 bg-slate-100/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 min-h-[44px]"
            >
              <span>Edad</span>
              {expandedSection === 'edad' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedSection === 'edad' && (
              <div className="p-3 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
                <ToggleSwitch
                  label="De 0 a 1 Año (Cachorros)"
                  checked={localFilters.age0to1}
                  onChange={(val) => setLocalFilters({ ...localFilters, age0to1: val })}
                />
                <ToggleSwitch
                  label="De 1 a 3 Años (Jóvenes)"
                  checked={localFilters.age1to3}
                  onChange={(val) => setLocalFilters({ ...localFilters, age1to3: val })}
                />
                <ToggleSwitch
                  label="Más de 3 Años (Adultos / Seniors)"
                  checked={localFilters.ageOver3}
                  onChange={(val) => setLocalFilters({ ...localFilters, ageOver3: val })}
                />
              </div>
            )}
          </div>

          {/* Sección 2: Sociabilidad */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('sociabilidad')}
              aria-expanded={expandedSection === 'sociabilidad'}
              className="w-full flex items-center justify-between p-3.5 bg-slate-100/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 min-h-[44px]"
            >
              <span>Sociabilidad</span>
              {expandedSection === 'sociabilidad' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedSection === 'sociabilidad' && (
              <div className="p-3 bg-white dark:bg-slate-900">
                <ToggleSwitch
                  label="Solo sociables con niños y mascotas"
                  checked={localFilters.sociable}
                  onChange={(val) => setLocalFilters({ ...localFilters, sociable: val })}
                />
              </div>
            )}
          </div>

          {/* Sección 3: Castración */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('castracion')}
              aria-expanded={expandedSection === 'castracion'}
              className="w-full flex items-center justify-between p-3.5 bg-slate-100/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 min-h-[44px]"
            >
              <span>Castración</span>
              {expandedSection === 'castracion' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {expandedSection === 'castracion' && (
              <div className="p-3 bg-white dark:bg-slate-900">
                <ToggleSwitch
                  label="Solo animales ya castrados"
                  checked={localFilters.castrated}
                  onChange={(val) => setLocalFilters({ ...localFilters, castrated: val })}
                />
              </div>
            )}
          </div>

          {/* Sección 4: Favoritos (Figma) */}
          <div className="p-3 bg-slate-100/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-800">
            <ToggleSwitch
              label="Ver solo mis Favoritos ❤️"
              checked={localFilters.onlyFavorites}
              onChange={(val) => setLocalFilters({ ...localFilters, onlyFavorites: val })}
            />
          </div>
        </div>

        {/* Footer Modal con Botones: Detector de Frustraciones (Jerarquía y Separación Clara) */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-4 sm:gap-6">
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 min-h-[50px] px-6 py-3.5 rounded-2xl font-heading font-extrabold text-sm uppercase tracking-wider bg-orange-600 hover:bg-orange-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 text-white shadow-lg shadow-orange-600/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 flex items-center justify-center gap-2"
          >
            <span>Ver Resultados</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[44px] px-3.5 py-2.5 rounded-xl font-heading font-semibold text-xs sm:text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 dark:focus-visible:ring-offset-slate-900 flex items-center justify-center shrink-0"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}
