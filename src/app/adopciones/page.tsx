'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, Search, RefreshCw, PawPrint, Sparkles, ChevronLeft } from 'lucide-react';
import { INITIAL_PETS, PetData } from '@/data/mockPets';
import { PetGrid } from '@/components/organisms/PetGrid';
import { FilterModal, FilterState } from '@/components/organisms/FilterModal';
import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';

export default function AdopcionesPage() {
  const [selectedSpecies, setSelectedSpecies] = useState<'TODOS' | 'PERRO' | 'GATO'>('PERRO');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    age0to1: false,
    age1to3: false,
    ageOver3: false,
    onlyFavorites: false,
    sociable: false,
    castrated: false,
    sex: 'TODOS',
  });

  // Filtrado reactivo en cliente (sin recargas de página)
  const filteredPets = useMemo(() => {
    return INITIAL_PETS.filter((pet) => {
      // Filtro por especie (Figma: ¿Qué preferís adoptar? Perro / Gato)
      if (selectedSpecies !== 'TODOS' && pet.species !== selectedSpecies) {
        return false;
      }

      // Filtro por texto de búsqueda
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = pet.name.toLowerCase().includes(query);
        const matchesLocation = pet.location.toLowerCase().includes(query);
        const matchesDesc = pet.description.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesDesc) return false;
      }

      // Filtro por edad
      if (filters.age0to1 || filters.age1to3 || filters.ageOver3) {
        const isMatch0to1 = filters.age0to1 && pet.ageCategory === 'CACHORRO';
        const isMatch1to3 = filters.age1to3 && pet.ageCategory === 'JOVEN';
        const isMatchOver3 = filters.ageOver3 && (pet.ageCategory === 'ADULTO' || pet.ageCategory === 'SENIOR');
        if (!isMatch0to1 && !isMatch1to3 && !isMatchOver3) return false;
      }

      // Filtro solo favoritos
      if (filters.onlyFavorites && !pet.isFavorite) {
        return false;
      }

      // Filtro sociable
      if (filters.sociable && pet.sociability !== 'Sociable') {
        return false;
      }

      // Filtro castrado
      if (filters.castrated && !pet.isCastrated) {
        return false;
      }

      return true;
    });
  }, [selectedSpecies, filters]);

  const activeFiltersCount =
    (filters.age0to1 ? 1 : 0) +
    (filters.age1to3 ? 1 : 0) +
    (filters.ageOver3 ? 1 : 0) +
    (filters.onlyFavorites ? 1 : 0) +
    (filters.sociable ? 1 : 0) +
    (filters.castrated ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      {/* Migas de Pan (Breadcrumbs - Arquitectura de Información) */}
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Mascotas en Adopción' },
        ]}
      />

      {/* Botón Volver al Inicio (Figma navigation) */}
      <div className="flex items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          aria-label="Volver a la página de Inicio"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>
      </div>

      {/* 1. SELECTOR ¿Qué preferís adoptar? (Figma Wireframe 2: Adopciones) */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-slate-700 shadow-sm text-center max-w-2xl mx-auto space-y-4">
        <h1 className="font-heading font-bold text-3xl text-slate-900 dark:text-white">
          ¿Qué preferís adoptar?
        </h1>

        {/* Botones Toggle Perro / Gato (Figma) */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setSelectedSpecies('PERRO')}
            className={`min-h-[48px] px-8 py-3 rounded-2xl font-heading font-extrabold text-sm sm:text-base transition-all duration-200 shadow-sm flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 ${
              selectedSpecies === 'PERRO'
                ? 'bg-slate-800 dark:bg-orange-600 text-white shadow-md scale-105'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 active:scale-95'
            }`}
            aria-pressed={selectedSpecies === 'PERRO'}
          >
            <span>🐶 Perro</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedSpecies('GATO')}
            className={`min-h-[48px] px-8 py-3 rounded-2xl font-heading font-extrabold text-sm sm:text-base transition-all duration-200 shadow-sm flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-offset-slate-900 ${
              selectedSpecies === 'GATO'
                ? 'bg-slate-800 dark:bg-cyan-600 text-white shadow-md scale-105'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 active:scale-95'
            }`}
            aria-pressed={selectedSpecies === 'GATO'}
          >
            <span>🐱 Gato</span>
          </button>
        </div>

        {/* Barra de Búsqueda Directa con rotulado empático (Clase 7) */}
        <div className="relative max-w-md mx-auto pt-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Buscar por nombre, barrio o raza..."
            aria-label="Buscar mascotas por nombre, barrio o raza"
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[46px]"
          />
        </div>

        {/* Link / Botón Filtros (Rotulado empático: Encontrá a tu compañero) */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline min-h-[44px] px-4 py-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Encontrá a tu compañero (Filtros avanzados)</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-orange-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* 2. TÍTULO DE SECCIÓN Y CONTADOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="font-heading font-semibold text-2xl text-slate-900 dark:text-white">
            Encontrá a tu próximo compañero de vida
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Mostrando {filteredPets.length} mascotas disponibles en Río Cuarto
          </p>
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={() => {
              setFilters({
                search: '',
                age0to1: false,
                age1to3: false,
                ageOver3: false,
                onlyFavorites: false,
                sociable: false,
                castrated: false,
                sex: 'TODOS',
              });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors py-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Quitar filtros aplicados</span>
          </button>
        )}
      </div>

      {/* 3. GRILLA DE MASCOTAS (Organismo PetGrid con Empty State empático) */}
      <PetGrid
        pets={filteredPets}
        onResetFilters={() => {
          setSelectedSpecies('TODOS');
          setFilters({
            search: '',
            age0to1: false,
            age1to3: false,
            ageOver3: false,
            onlyFavorites: false,
            sociable: false,
            castrated: false,
            sex: 'TODOS',
          });
        }}
      />

      {/* MODAL DE FILTROS SUPERPUESTO (Figma Wireframe 3) */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApply={(updated) => setFilters(updated)}
        onReset={() =>
          setFilters({
            search: '',
            age0to1: false,
            age1to3: false,
            ageOver3: false,
            onlyFavorites: false,
            sociable: false,
            castrated: false,
            sex: 'TODOS',
          })
        }
      />
    </div>
  );
}
