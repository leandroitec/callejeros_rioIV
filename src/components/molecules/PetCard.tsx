'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Sparkles, ShieldAlert, CheckCircle } from 'lucide-react';
import { PetData } from '@/data/mockPets';
import { Badge, BadgeVariant } from '@/components/atoms/Badge';

export interface PetCardProps {
  pet: PetData;
}

/**
 * Molécula PetCard - Callejeros Río IV
 * Tarjeta interactiva de mascota que consume el átomo Badge y los patrones de microinteracciones:
 * - Elevación física fluida: hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out
 * - Botón de favoritos con microinteracción háptica: active:scale-90 transition-transform duration-300
 * - Proximidad de Gestalt (padding p-4 cohesionado)
 * - Cumplimiento estricto de WCAG AA en contrastes y focus rings
 */
export function PetCard({ pet }: PetCardProps) {
  const [isFavorite, setIsFavorite] = useState(pet.isFavorite ?? false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Mapeo semántico a través del átomo Badge
  const getBadgeConfig = (): { variant: BadgeVariant; icon: React.ReactNode; text: string } => {
    if (pet.status === 'URGENTE') {
      return {
        variant: 'urgent',
        icon: <ShieldAlert className="w-3 h-3" />,
        text: 'Urgente',
      };
    }
    if (pet.sociability === 'Salvaje') {
      return {
        variant: 'warning',
        icon: <Sparkles className="w-3 h-3" />,
        text: 'Requiere Tránsito',
      };
    }
    return {
      variant: 'success',
      icon: <CheckCircle className="w-3 h-3" />,
      text: pet.sociability ?? 'Sociable',
    };
  };

  const badge = getBadgeConfig();

  return (
    <article
      className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-neutral-200 dark:border-slate-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col justify-between"
      aria-labelledby={`pet-name-${pet.id}`}
    >
      {/* Contenedor de Imagen 1:1 con zoom suave al hover */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Image
          src={pet.imageUrl}
          alt={`Fotografía de ${pet.name}, ${pet.species.toLowerCase()} en adopción en barrio ${pet.location}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradiente sutil para legibilidad de badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30 pointer-events-none" />

        {/* Badge de Estado Flotante (Izquierda Superior) consumiendo el átomo Badge */}
        <div className="absolute top-3 left-3 backdrop-blur-xs transition-transform duration-300 group-hover:scale-105">
          <Badge variant={badge.variant} icon={badge.icon}>
            {badge.text}
          </Badge>
        </div>

        {/* Botón Favoritos (Derecha Superior) con microinteracción háptica */}
        <button
          type="button"
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out shadow-md backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-offset-slate-900 ${
            isFavorite
              ? 'bg-red-500 text-white scale-110 shadow-red-500/30'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white hover:text-red-500 active:scale-90'
          }`}
          aria-label={isFavorite ? `Quitar a ${pet.name} de favoritos` : `Guardar a ${pet.name} en favoritos`}
        >
          <Heart className={`w-5 h-5 transition-transform duration-300 ${isFavorite ? 'fill-current scale-105' : ''}`} />
        </button>

        {/* Especie Pill (Inferior Izquierda) */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
          {pet.species}
        </div>
      </div>

      {/* Cuerpo de la Tarjeta (Gestalt: Proximidad cohesionada mediante p-4) */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 sm:gap-3.5">
        <div className="space-y-2">
          {/* Nombre en Tipografía de Encabezado Negrita */}
          <h3
            id={`pet-name-${pet.id}`}
            className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300"
          >
            {pet.name}
          </h3>

          {/* Detalles Rápidos (Edad y Castración en Proximidad Directa) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-md">
              Edad: {pet.ageApprox}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md ${
                pet.isCastrated
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
              }`}
            >
              {pet.isCastrated ? 'Castrado' : 'No Castrado'}
            </span>
          </div>

          {/* Ubicación Barrial */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="truncate">{pet.location}</span>
          </div>
        </div>

        {/* Botón Primario de Acción: Adoptar (Los 5 Estados Vivos + Microinteracción) */}
        <Link
          href={`/adopciones/${pet.id}`}
          className="w-full min-h-[46px] px-4 py-2.5 rounded-2xl font-heading font-bold text-sm text-center text-white bg-orange-600 hover:bg-orange-700 hover:shadow-lg active:scale-95 shadow-md shadow-orange-600/20 transition-all duration-300 ease-in-out flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-offset-slate-900 mt-1"
        >
          <span>Adoptar a {pet.name.split(' ')[0]}</span>
        </Link>
      </div>
    </article>
  );
}
