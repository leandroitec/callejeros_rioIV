'use client';

import React from 'react';
import { PawPrint, RefreshCw } from 'lucide-react';
import { PetData } from '@/data/mockPets';
import { PetCard } from '@/components/molecules/PetCard';
import { Button } from '@/components/atoms/Button';

export interface PetGridProps {
  pets: PetData[];
  onResetFilters?: () => void;
  className?: string;
}

/**
 * Organismo PetGrid - Callejeros Río IV
 * Grilla adaptable de mascotas que consume la molécula PetCard y el átomo Button.
 * Maneja estado vacío (Empty State) accesible y microinteracciones de entrada.
 */
export function PetGrid({ pets, onResetFilters, className = '' }: PetGridProps) {
  if (pets.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 text-center border border-neutral-200 dark:border-slate-700 max-w-md mx-auto space-y-4 shadow-sm animate-in fade-in duration-300 ease-out"
      >
        <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto ring-8 ring-orange-50 dark:ring-orange-950/30">
          <PawPrint className="w-8 h-8" aria-hidden="true" />
        </div>
        <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
          No encontramos ningún callejerito con esos filtros
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          ¡No te desanimes! Muchos perritos y gatitos de Río Cuarto están esperando una familia. Probá quitando algunos filtros o ampliando la zona de búsqueda para conocerlos.
        </p>
        {onResetFilters && (
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={onResetFilters}
              leftIcon={<RefreshCw className="w-4 h-4" aria-hidden="true" />}
              className="min-h-[48px] px-6 text-sm"
            >
              Ver todos los animales en adopción
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300 ease-out ${className}`}
    >
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
