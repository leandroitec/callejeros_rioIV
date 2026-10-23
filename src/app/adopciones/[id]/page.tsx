'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import {
  ChevronLeft,
  Heart,
  MapPin,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ShieldAlert,
  Share2,
  Calendar,
  Check,
} from 'lucide-react';
import { INITIAL_PETS } from '@/data/mockPets';
import { AccordionItem } from '@/components/molecules/Accordion';
import { SuccessModal } from '@/components/organisms/SuccessModal';
import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';

export default function PetDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const pet = INITIAL_PETS.find((p) => p.id === id);

  if (!pet) {
    notFound();
  }

  const [isFavorite, setIsFavorite] = useState(pet.isFavorite ?? false);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Adoptá a ${pet.name} en Callejeros Río IV`,
        text: pet.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-28">
      {/* Migas de Pan (Breadcrumbs - Arquitectura de Información) */}
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Adopciones', href: '/adopciones' },
          { label: pet.species === 'GATO' ? 'Gatos' : 'Perros', href: '/adopciones' },
          { label: pet.name },
        ]}
      />

      {/* 1. BARRA SUPERIOR DE DETALLE (Figma: Header con back < y favorito) */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/adopciones"
          className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900"
          aria-label="Volver al catálogo de adopciones"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>

        <div className="flex-1 text-center truncate">
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-tight truncate">
            {pet.name}
          </h1>
          <div className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3 h-3 text-orange-500" />
            <span>{pet.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900"
            aria-label="Compartir ficha de mascota"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-12 h-12 rounded-2xl border shadow-sm flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 ${
              isFavorite
                ? 'bg-red-500 border-red-600 text-white scale-105'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-red-500 active:scale-95'
            }`}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {showShareToast && (
        <div className="p-3 bg-emerald-600 text-white text-xs font-semibold rounded-xl text-center shadow-lg animate-in fade-in duration-200">
          ¡Enlace copiado al portapapeles para compartir!
        </div>
      )}

      {/* 2. IMAGEN PRINCIPAL (Figma: Cuadro destacado 1:1) */}
      <div className="relative aspect-square sm:aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 shadow-md">
        <Image
          src={pet.imageUrl}
          alt={`Foto detallada de ${pet.name}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />

        {pet.status === 'URGENTE' && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Caso Urgente</span>
          </div>
        )}
      </div>

      {/* 3. PRESENTACIÓN PRINCIPAL (Jerarquía Visual: Nombre es el Rey con text-3xl sm:text-4xl) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-slate-700 shadow-sm space-y-5">
        <div className="border-b border-slate-100 dark:border-slate-700/60 pb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">
              {pet.species} en Adopción
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Barrio {pet.location}, Río Cuarto</span>
            </div>
          </div>
          {/* El Nombre es el Rey Indiscutible */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white uppercase tracking-tight">
            {pet.name}
          </h1>
          {/* Datos secundarios en texto menor (text-sm text-slate-500) */}
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {pet.ageApprox} • Tamaño {pet.size} • {pet.sex} • {pet.isVaccinated ? 'Vacunación al día' : 'Plan de vacunación'}
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            Historia de {pet.name}
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
            {pet.description}
          </p>
        </div>

        {/* 4. SISTEMA DE BADGES (Figma: Sistema de Badges) */}
        <div className="pt-2">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Características Principales
          </span>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
              <Calendar className="w-3.5 h-3.5" />
              <span>Edad: {pet.ageApprox}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
              <span>Tamaño: {pet.size}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              <span>Sexo: {pet.sex}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Check className="w-3.5 h-3.5" />
              <span>{pet.isCastrated ? 'Castrado' : 'Pendiente Castración'}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sociabilidad: {pet.sociability}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 5. ACORDEONES INFO DESPLEGABLE (Figma Wireframe 2: Info Desplegable) */}
      <section className="space-y-3" aria-label="Ficha médica y datos técnicos">
        {/* Acordeón 1: Descripción */}
        <AccordionItem title="Descripción y Convivencia" defaultOpen={true}>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Edad Estimada</span>
              <span className="font-semibold">{pet.ageApprox} ({pet.ageCategory})</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Sexo</span>
              <span className="font-semibold">{pet.sex}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Genitales / Castración</span>
              <span className="font-semibold">{pet.isCastrated ? 'Castrado / Esterilizado' : 'En plan de castración'}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Sociabilidad</span>
              <span className="font-semibold">{pet.sociability}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Convive con Niños</span>
              <span className="font-semibold">{pet.goodWithKids ? 'Sí, comprobado' : 'Requiere supervisión'}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Convive con Mascotas</span>
              <span className="font-semibold">{pet.goodWithPets ? 'Sí, sociable' : 'Preferencia hijo único'}</span>
            </div>
          </div>
        </AccordionItem>

        {/* Acordeón 2: Estado De Salud (Figma) */}
        <AccordionItem title="Estado de Salud y Vacunación">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Diagnóstico General: {pet.healthState}</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 pl-1">
              <li>Vacunación séxtuple y antirrábica: {pet.isVaccinated ? 'Al Día' : 'En proceso'}</li>
              <li>Desparasitación interna y externa: Completada</li>
              <li>Control de garrapatas y pulgas: Negativo / Al día</li>
            </ul>
          </div>
        </AccordionItem>

        {/* Acordeón 3: Notas y Cuidados Especiales (Figma) */}
        <AccordionItem title="Notas y Cuidados Especiales">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl text-sm text-amber-900 dark:text-amber-200 space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Recomendación Veterinaria:</span>
            </div>
            <p className="text-xs sm:text-sm pl-6">{pet.notes}</p>
          </div>
        </AccordionItem>
      </section>

      {/* 6. BOTÓN FIJO INFERIOR ¡ADOPTAME! (Figma Wireframe 2: Botón ¡Adoptame! y Donaciones) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-slate-800 p-4 shadow-2xl">
        <div className="max-w-md mx-auto space-y-2 text-center">
          <button
            type="button"
            onClick={() => setIsAdoptModalOpen(true)}
            className="w-full btn-primary min-h-[52px] text-base font-extrabold uppercase tracking-wide shadow-lg shadow-orange-600/25"
          >
            ¡Adoptame!
          </button>
          <div>
            <Link
              href="/padrinos"
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 underline underline-offset-4 inline-block py-1"
            >
              Donaciones y Apadrinamiento de {pet.name.split(' ')[0]}
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL DE ÉXITO DE SOLICITUD DE ADOPCIÓN */}
      <SuccessModal
        isOpen={isAdoptModalOpen}
        onClose={() => setIsAdoptModalOpen(false)}
        title="¡Solicitud de Adopción Recibida!"
        message={`Muchas gracias por tu amor e interés en adoptar a ${pet.name}. El equipo voluntario y hogar de tránsito de Río Cuarto se pondrá en contacto por WhatsApp en menos de 24 horas.`}
        actionText="Seguir viendo mascotas"
        actionHref="/adopciones"
      />
    </div>
  );
}
