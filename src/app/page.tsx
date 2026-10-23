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
import { PetCard } from '@/components/molecules/PetCard';

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
    <div className="w-full space-y-16 sm:space-y-24 pb-20">
      {/* 1. CARRUSEL DE IMÁGENES (Figma Wireframe 1: Carrousel de imágenes - Patrón Z Diagonal) */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative h-[340px] sm:h-[440px] rounded-3xl overflow-hidden shadow-xl border border-neutral-200 dark:border-slate-800">
          <Image
            src={carouselItems[activeSlide].image}
            alt={carouselItems[activeSlide].title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="object-cover transition-all duration-700 brightness-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
            <span className="inline-block bg-orange-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full w-fit mb-3 shadow-md">
              {carouselItems[activeSlide].badge}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl max-w-2xl leading-tight mb-2 tracking-tight">
              {carouselItems[activeSlide].title}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 max-w-xl mb-6 leading-relaxed">
              {carouselItems[activeSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={carouselItems[activeSlide].ctaLink}
                className="btn-primary min-h-[48px] px-6 text-sm sm:text-base font-bold shadow-lg shadow-orange-600/30"
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

      {/* 2. ADOPCIONES HERO (Figma Wireframe 1: Adopciones Hero - Cierre del Patrón Z con CTAs) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 p-8 sm:p-14 text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <PawPrint className="w-4 h-4" />
              <span>Adopción Responsable en Río Cuarto</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Encontrá a tu próximo compañero de vida
            </h2>
            <p className="text-sm sm:text-base text-orange-50 leading-relaxed font-sans">
              Animales rescatados en <strong>Parque Sarmiento</strong>, <strong>Plaza Roca</strong> y avenidas de Río Cuarto. Vacunados, castrados y listos para llenar tu hogar de afecto y lealtad.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Botón Principal (Rey visual: Naranja / Blanco contrastante) */}
              <Link
                href="/adopciones"
                className="inline-flex items-center justify-center font-heading font-extrabold text-sm sm:text-base bg-white text-orange-700 hover:bg-orange-50 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 active:translate-y-0 px-7 py-3.5 rounded-2xl shadow-lg transition-all min-h-[50px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-orange-600"
              >
                <span>Explorar Mascotas</span>
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Link>
              {/* Botón Secundario (Discreto: Fondo sutil para no competir visualmente) */}
              <Link
                href="/reportar-extravio"
                className="inline-flex items-center justify-center font-heading font-semibold text-xs sm:text-sm bg-black/20 hover:bg-black/35 hover:-translate-y-0.5 active:scale-95 text-white border border-white/40 px-5 py-3 rounded-2xl transition-all min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-orange-600"
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

      {/* 3. GRILLA / CARRUSEL DE MASCOTAS DESTACADAS (Ley de Gestalt: Continuidad horizontal en móvil) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Casos Prioritarios
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1 tracking-tight">
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

        {/* Contenedor con Continuidad: en móviles (<640px) la última tarjeta queda intencionalmente cortada a la mitad (w-[76vw] + pr-8) invitando al swipe al estilo Netflix */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 pr-8 sm:pr-0 scroll-smooth">
          {urgentPets.map((pet) => (
            <div
              key={pet.id}
              className="w-[76vw] max-w-[285px] sm:w-auto sm:max-w-none shrink-0 sm:shrink snap-start"
            >
              <PetCard pet={pet} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. QUIÉNES SOMOS HERO (Patrón F: Títulos fuertes a la izquierda y palabras clave en negrita) */}
      <section id="quienes-somos" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 p-8 sm:p-14 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Nuestra Misión
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-tight tracking-tight text-left">
              Una red vecinal comprometida con la fauna urbana
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans text-left">
              En <strong>Callejeros Río IV</strong> articulamos una red solidaria entre <strong>rescatistas independientes</strong>, <strong>hogares de tránsito</strong> y <strong>familias adoptantes</strong>. Nuestro objetivo es descomprimir los refugios municipales y garantizar <strong>atención veterinaria oportuna</strong> a perros y gatos desamparados.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40">
                <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-orange-600 dark:text-orange-400">
                  +120
                </span>
                <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block mt-0.5">
                  Adopciones concretadas
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/40">
                <span className="block font-heading font-extrabold text-2xl sm:text-3xl text-cyan-600 dark:text-cyan-400">
                  100%
                </span>
                <span className="text-xs text-slate-700 dark:text-slate-300 font-bold block mt-0.5">
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

      {/* 5. SECCIÓN DONACIONES Y APADRINAMIENTO (Jerarquía de Botones Primario vs Secundario) */}
      <section id="donaciones" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 sm:p-14 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-700">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <CreditCard className="w-4 h-4" />
              <span>Colaboración Directa</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
              ¿No podés adoptar? ¡Apadriná un tratamiento!
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Muchos de nuestros rescatados tienen tratamientos prolongados (como Cthulhu o Galactus). Tu aporte mensual o compra en la tienda solidaria financia su recuperación integral.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            {/* Botón Principal Destacado */}
            <Link
              href="/padrinos"
              className="btn-primary min-h-[48px] px-6 shadow-lg shadow-orange-600/30"
            >
              <span>Ser Padrino / Madrina</span>
            </Link>
            {/* Botón Secundario Discreto */}
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center font-heading font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl px-5 py-3 transition-colors min-h-[48px]"
            >
              <span>Tienda Solidaria</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. MAPA Y ZONAS ACTIVAS DE RÍO CUARTO (Resuelve ancla /#mapa de Footer) */}
      <section id="mapa" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Red Territorial de Río Cuarto
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1 tracking-tight">
              Zonas y Barrios de Monitoreo Comunitario
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
            Identificá los puntos de mayor actividad vecinal para reportar avistamientos o sumar tu hogar de tránsito.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Banda Norte
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Parque Ecológico, Av. Marcelo T. de Alvear y vecinales aledañas. +35 hogares de tránsito activos.
              </p>
            </div>
            <Link
              href="/reportar-extravio"
              className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 pt-2"
            >
              <span>Reportar en esta zona</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Centro / Plaza Roca
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Punto neurálgico de avistamientos diurnos y carpas de colecta solidaria de alimento y mantas.
              </p>
            </div>
            <Link
              href="/reportar-extravio"
              className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 pt-2"
            >
              <span>Reportar en esta zona</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Alberdi / Sabattini
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Zona de fuerte articulación barrial, rescate de cachorros y jornadas de castración municipal.
              </p>
            </div>
            <Link
              href="/reportar-extravio"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 pt-2"
            >
              <span>Reportar en esta zona</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Parque Sarmiento
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ribera del Río Cuarto y predios abiertos donde se realizan los paseos de socialización y búsqueda.
              </p>
            </div>
            <Link
              href="/reportar-extravio"
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 pt-2"
            >
              <span>Reportar en esta zona</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. EVENTOS BENÉFICOS Y JORNADAS (Resuelve ancla /#eventos de Navbar y Footer) */}
      <section id="eventos" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Agenda Solidaria Río Cuarto
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1 tracking-tight">
              Próximos Eventos y Jornadas Comunitarias
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
            Sumate con tu familia o colaborá como voluntario en nuestras actividades en la ciudad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="inline-block bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
                Sábado 15 de Noviembre
              </span>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Jornada de Castración Gratuita
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                En la Vecinal de Barrio Alberdi. Vacunación séxtuple y antirrábica gratuita por orden de llegada con turno previo.
              </p>
            </div>
            <Link
              href="/adopcion-responsable"
              className="inline-flex items-center justify-center font-heading font-bold text-xs py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white transition-all min-h-[44px]"
            >
              Requisitos y Turnos
            </Link>
          </article>

          <article className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-orange-500/40 dark:border-orange-500/30 shadow-md flex flex-col justify-between space-y-4 relative">
            <div className="space-y-3">
              <span className="inline-block bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
                Domingo 23 de Noviembre
              </span>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Gran Colecta de Alimento y Abrigos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Estaremos en Plaza Roca de 16:00 a 20:00 hs recibiendo balanceado para cachorros, mantas y pipetas para rescates urgentes.
              </p>
            </div>
            <Link
              href="/padrinos"
              className="inline-flex items-center justify-center font-heading font-bold text-xs py-3 px-4 rounded-xl btn-primary min-h-[44px]"
            >
              Cómo Ayudar
            </Link>
          </article>

          <article className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="inline-block bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold px-3 py-1 rounded-full">
                Sábado 29 de Noviembre
              </span>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Tarde de Paseo y Socialización
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                En el Parque Sarmiento. Vení a pasear con nuestros perritos en adopción, compartir una tarde al aire libre y conocerlos en persona.
              </p>
            </div>
            <Link
              href="/adopciones"
              className="inline-flex items-center justify-center font-heading font-bold text-xs py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-cyan-600 hover:text-white transition-all min-h-[44px]"
            >
              Conocer Mascotas
            </Link>
          </article>
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

