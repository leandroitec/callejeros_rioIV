'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronRight, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { ToggleSwitch } from '@/components/atoms/ToggleSwitch';
import { Button } from '@/components/atoms/Button';
import { SearchBar } from '@/components/molecules/SearchBar';

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

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
}

/**
 * Organismo FilterModal - Callejeros Río IV
 * Modal interactivo que consume:
 * - Molécula SearchBar
 * - Átomo ToggleSwitch (con Smart Animate de Figma)
 * - Átomo Button (con los 5 estados de interacción)
 * Aplica microinteracción Slide-in / Slide-out suave desde abajo (duration-300 ease-out).
 */
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

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    if (!isOpen) return;

    // Escuchar tecla Escape para accesibilidad
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

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-neutral-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom duration-300 ease-out"
      >
        {/* Header Modal con Buscador */}
        <div className="p-4 border-b border-neutral-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-orange-600 dark:text-orange-400" aria-hidden="true" />
              <h2 id="filter-title" className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                Encontrá a tu compañero
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-offset-slate-900 min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-95"
              aria-label="Cerrar ventana de filtros de búsqueda"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Molécula SearchBar */}
          <SearchBar
            value={localFilters.search}
            onChange={(val) => setLocalFilters({ ...localFilters, search: val })}
            placeholder="Buscá por nombre, barrio de Río Cuarto o raza..."
          />
        </div>

        {/* Contenido de Filtros Desplegables con ToggleSwitch Átomos */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Sección 1: Edad */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('edad')}
              aria-expanded={expandedSection === 'edad'}
              aria-controls="filter-section-edad"
              className="w-full flex items-center justify-between p-3.5 bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-offset-slate-900 min-h-[48px] transition-colors duration-200"
            >
              <span>Edad aproximada</span>
              {expandedSection === 'edad' ? (
                <ChevronDown className="w-4 h-4 transition-transform duration-300" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-4 h-4 transition-transform duration-300" aria-hidden="true" />
              )}
            </button>
            {expandedSection === 'edad' && (
              <div id="filter-section-edad" className="p-3 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in duration-300 ease-out">
                <ToggleSwitch
                  label="Cachorros (hasta 1 año)"
                  description="Enérgicos, requieren tiempo de adaptación"
                  checked={localFilters.age0to1}
                  onChange={(val) => setLocalFilters({ ...localFilters, age0to1: val })}
                />
                <ToggleSwitch
                  label="Jóvenes activos (1 a 3 años)"
                  description="Vitales y cariñosos, ideales para paseos"
                  checked={localFilters.age1to3}
                  onChange={(val) => setLocalFilters({ ...localFilters, age1to3: val })}
                />
                <ToggleSwitch
                  label="Adultos y seniors tranquilos (más de 3 años)"
                  description="Compañeros equilibrados y muy leales"
                  checked={localFilters.ageOver3}
                  onChange={(val) => setLocalFilters({ ...localFilters, ageOver3: val })}
                />
              </div>
            )}
          </div>

          {/* Sección 2: Sociabilidad */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('sociabilidad')}
              aria-expanded={expandedSection === 'sociabilidad'}
              aria-controls="filter-section-sociabilidad"
              className="w-full flex items-center justify-between p-3.5 bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-offset-slate-900 min-h-[48px] transition-colors duration-200"
            >
              <span>Sociabilidad y convivencia</span>
              {expandedSection === 'sociabilidad' ? (
                <ChevronDown className="w-4 h-4 transition-transform duration-300" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-4 h-4 transition-transform duration-300" aria-hidden="true" />
              )}
            </button>
            {expandedSection === 'sociabilidad' && (
              <div id="filter-section-sociabilidad" className="p-3 bg-white dark:bg-slate-900 animate-in fade-in duration-300 ease-out">
                <ToggleSwitch
                  label="Aptos para convivir con niños y otros animales"
                  description="Carácter amigable y evaluado en tránsito"
                  checked={localFilters.sociable}
                  onChange={(val) => setLocalFilters({ ...localFilters, sociable: val })}
                />
              </div>
            )}
          </div>

          {/* Sección 3: Castración */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              type="button"
              onClick={() => toggleSection('castracion')}
              aria-expanded={expandedSection === 'castracion'}
              aria-controls="filter-section-castracion"
              className="w-full flex items-center justify-between p-3.5 bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-offset-slate-900 min-h-[48px] transition-colors duration-200"
            >
              <span>Estado de salud y castración</span>
              {expandedSection === 'castracion' ? (
                <ChevronDown className="w-4 h-4 transition-transform duration-300" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-4 h-4 transition-transform duration-300" aria-hidden="true" />
              )}
            </button>
            {expandedSection === 'castracion' && (
              <div id="filter-section-castracion" className="p-3 bg-white dark:bg-slate-900 animate-in fade-in duration-300 ease-out">
                <ToggleSwitch
                  label="Animales ya castrados (vacunas al día)"
                  description="Compromiso veterinario garantizado"
                  checked={localFilters.castrated}
                  onChange={(val) => setLocalFilters({ ...localFilters, castrated: val })}
                />
              </div>
            )}
          </div>

          {/* Sección 4: Favoritos */}
          <div className="p-3 bg-slate-100/80 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-800">
            <ToggleSwitch
              label="Mis favoritos guardados ❤️"
              description="Ver solo los animalitos que marcaste con corazón"
              checked={localFilters.onlyFavorites}
              onChange={(val) => setLocalFilters({ ...localFilters, onlyFavorites: val })}
            />
          </div>
        </div>

        {/* Footer Modal con Átomos Button */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-4 sm:gap-6">
          <Button
            variant="primary"
            size="md"
            onClick={handleApply}
            className="flex-1 uppercase tracking-wider min-h-[48px]"
          >
            Aplicar filtros y ver compañeros
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />}
            className="min-h-[48px] text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
