'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Sparkles, ShieldAlert, CheckCircle } from 'lucide-react';
import { PetData } from '@/data/mockPets';

interface PetCardProps {
  pet: PetData;
}

export function PetCard({ pet }: PetCardProps) {
  const [isFavorite, setIsFavorite] = useState(pet.isFavorite ?? false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Badges semánticos según wireframe de Figma
  const getBadgeStyle = () => {
    if (pet.status === 'URGENTE') {
      return {
        bg: 'bg-red-600 text-white border-red-700',
        icon: <ShieldAlert className="w-3 h-3" />,
        text: 'Urgente',
      };
    }
    if (pet.sociability === 'Salvaje') {
      return {
        bg: 'bg-amber-600 text-white border-amber-700',
        icon: <Sparkles className="w-3 h-3" />,
        text: 'Requiere Tránsito',
      };
    }
    return {
      bg: 'bg-emerald-600 text-white border-emerald-700',
      icon: <CheckCircle className="w-3 h-3" />,
      text: pet.sociability ?? 'Sociable',
    };
  };

  const badge = getBadgeStyle();

  return (
    <article
      className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-neutral-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      aria-labelledby={`pet-name-${pet.id}`}
    >
      {/* Contenedor de Imagen 1:1 (Anatomía Figma) */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Image
          src={pet.imageUrl}
          alt={`Fotografía de ${pet.name}, ${pet.species.toLowerCase()} en adopción en barrio ${pet.location}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradiente sutil para legibilidad de badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* Badge de Estado Flotante (Izquierda Superior) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md border backdrop-blur-sm transition-transform group-hover:scale-105">
          <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full ${badge.bg}`}>
            {badge.icon}
            <span>{badge.text}</span>
          </span>
        </div>

        {/* Botón Favoritos (Derecha Superior) */}
        <button
          type="button"
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 ${
            isFavorite
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-white hover:text-red-500 active:scale-95'
          }`}
          aria-label={isFavorite ? `Quitar a ${pet.name} de favoritos` : `Guardar a ${pet.name} en favoritos`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Especie Pill (Inferior Izquierda) */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
          {pet.species}
        </div>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Nombre en Tipografía de Encabezado Negrita (Figma) */}
          <h3
            id={`pet-name-${pet.id}`}
            className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors"
          >
            {pet.name}
          </h3>

          {/* Detalles Rápidos (Edad y Castración) */}
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-lg">
              Edad: {pet.ageApprox}
            </span>
            <span
              className={`px-2.5 py-1 rounded-lg ${
                pet.isCastrated
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
              }`}
            >
              {pet.isCastrated ? 'Castrado' : 'No Castrado'}
            </span>
          </div>

          {/* Ubicación Barrial */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="truncate">{pet.location}</span>
          </div>
        </div>

        {/* Botón Primario de Acción (Con 5 Estados Declarados y Mínimo 48px) */}
        <Link
          href={`/adopciones/${pet.id}`}
          className="w-full min-h-[48px] px-4 py-3 rounded-2xl font-heading font-bold text-sm text-center text-white bg-slate-900 dark:bg-white dark:text-slate-900 group-hover:bg-orange-600 dark:group-hover:bg-orange-500 dark:group-hover:text-white shadow-sm transition-all duration-200 flex items-center justify-center active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-400"
        >
          <span>Conocer a {pet.name.split(' ')[0]}</span>
        </Link>
      </div>
    </article>
  );
}
