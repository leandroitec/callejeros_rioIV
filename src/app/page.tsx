'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PawPrint,
  AlertTriangle,
  Heart,
  ChevronRight,
  Sparkles,
  MapPin,
  ShieldCheck,
  CreditCard,
  Users,
} from 'lucide-react';
import { INITIAL_PETS } from '@/data/mockPets';
import { PetCard } from '@/components/cards/PetCard';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItems = [
    {
      title: '¡Cada Callejerito Merece un Hogar!',
      subtitle: 'Más de 120 rescates activos en los barrios de Río Cuarto.',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
      badge: 'Campaña Primavera',
      ctaText: 'Ver Mascotas',
      ctaLink: '/adopciones',
    },
    {
      title: 'Alerta de Extravíos en Parque Sarmiento',
      subtitle: 'Si viste o perdiste a tu mascota, publicá el aviso en segundos sin costo.',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80',
      badge: 'Comunidad Activa',
      ctaText: 'Reportar Extravío',
      ctaLink: '/reportar-extravio',
    },
    {
      title: 'Apadriná un Tratamiento Veterinario',
      subtitle: 'Ayudá a costear medicamentos y alimento para casos críticos.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80',
      badge: 'Solidaridad Río IV',
      ctaText: 'Ser Padrino',
      ctaLink: '/padrinos',
    },
  ];

  const urgentPets = INITIAL_PETS.slice(0, 4);

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-16">
      {/* 1. CARRUSEL DE IMÁGENES (Figma Wireframe 1: Carrousel de imágenes) */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative h-[340px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-neutral-200 dark:border-slate-800">
          <Image
            src={carouselItems[activeSlide].image}
            alt={carouselItems[activeSlide].title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="object-cover transition-all duration-700 brightness-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="inline-block bg-orange-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-3">
              {carouselItems[activeSlide].badge}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl max-w-2xl leading-tight mb-2">
              {carouselItems[activeSlide].title}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 max-w-xl mb-6">
              {carouselItems[activeSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={carouselItems[activeSlide].ctaLink}
                className="btn-primary min-h-[48px]"
              >
                <span>{carouselItems[activeSlide].ctaText}</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Dots de navegación del carrusel */}
          <div className="absolute bottom-4 right-6 flex gap-2 z-10">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? 'w-8 bg-orange-500' : 'w-2.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Ver diapositiva ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. ADOPCIONES HERO (Figma Wireframe 1: Adopciones Hero) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <PawPrint className="w-4 h-4" />
              <span>Adopción Responsable</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight">
              Encontrá a tu próximo compañero de vida
            </h2>
            <p className="text-sm sm:text-base text-orange-50 leading-relaxed">
              Rescatados del Parque Sarmiento, Plaza Roca y avenidas de Río Cuarto. Vacunados, castrados y listos para llenar tu casa de alegría.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/adopciones"
                className="inline-flex items-center justify-center font-heading font-bold text-sm bg-white text-orange-700 hover:bg-neutral-100 active:scale-95 px-6 py-3.5 rounded-2xl shadow-md transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-orange-600"
              >
                <span>Explorar Mascotas</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/reportar-extravio"
                className="inline-flex items-center justify-center font-heading font-bold text-sm bg-black/25 hover:bg-black/35 active:scale-95 text-white border-2 border-white/60 px-6 py-3.5 rounded-2xl transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-orange-600"
              >
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-300" />
                <span>Reportar Mascota Perdida</span>
              </Link>
            </div>
          </div>

          {/* Patrón de huellas decorativo */}
          <div className="absolute right-4 -bottom-10 opacity-15 text-white pointer-events-none select-none">
            <PawPrint className="w-72 h-72" />
          </div>
        </div>
      </section>

      {/* 3. GRILLA DE MASCOTAS DESTACADAS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Casos Prioritarios
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              Esperando una oportunidad en Río Cuarto
            </h2>
          </div>
          <Link
            href="/adopciones"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline min-h-[44px]"
          >
            <span>Ver todas las adopciones</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {urgentPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </section>

      {/* 4. QUIÉNES SOMOS HERO (Figma Wireframe 1: Quienes somos Hero) */}
      <section id="quienes-somos" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Nuestra Misión
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
              Una red vecinal comprometida con la fauna urbana
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              En Callejeros Río IV conectamos rescatistas independientes, hogares de tránsito y familias adoptantes. Trabajamos para descomprimir los refugios municipales y brindar atención veterinaria oportuna a animales desprotegidos.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40">
                <span className="block font-heading font-extrabold text-2xl text-orange-600 dark:text-orange-400">
                  +120
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  Adopciones concretadas
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/40">
                <span className="block font-heading font-extrabold text-2xl text-cyan-600 dark:text-cyan-400">
                  100%
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  Castraciones y vacunas
                </span>
              </div>
            </div>
          </div>

          <div className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-slate-700">
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"
              alt="Voluntarios de Río Cuarto cuidando a perros rescatados"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN DONACIONES Y APADRINAMIENTO (Figma: Donaciones Scroll) */}
      <section id="donaciones" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-700">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <CreditCard className="w-4 h-4" />
              <span>Colaboración Directa</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl">
              ¿No podés adoptar? ¡Apadriná un tratamiento!
            </h3>
            <p className="text-sm text-slate-300">
              Muchos de nuestros rescatados tienen tratamientos prolongados (como Cthulhu o Galactus). Tu aporte mensual o compra en la tienda solidaria financia su recuperación.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/padrinos"
              className="btn-secondary min-h-[48px]"
            >
              <span>Ser Padrino / Madrina</span>
            </Link>
            <Link
              href="/tienda"
              className="btn-outline text-white border-slate-600 hover:bg-slate-800 min-h-[48px]"
            >
              <span>Tienda Solidaria</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. BOTÓN FLOTANTE "Donaciones (Scroll)" (Figma Wireframe 1: Home) */}
      <a
        href="#donaciones"
        aria-label="Ir a la sección de Donaciones"
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-3 rounded-full bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-xl hover:shadow-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 border-2 border-white/80 dark:border-slate-800 group"
      >
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <Heart className="w-4 h-4 text-white fill-white group-hover:scale-110 transition-transform" />
        </div>
        <span className="font-heading font-bold text-xs sm:text-sm tracking-wide pr-1">
          Donaciones (Scroll)
        </span>
      </a>
    </div>
  );
}

