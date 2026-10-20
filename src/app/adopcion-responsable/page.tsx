'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, Home, Calendar, Stethoscope, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdopcionResponsablePage() {
  const steps = [
    {
      icon: <Home className="w-6 h-6 text-orange-500" />,
      title: '1. Evaluación del Espacio Familiar',
      description: 'Verificar que la vivienda (casa o departamento) cuente con cerramientos seguros, balcones con red y acuerdo de todos los convivientes.',
    },
    {
      icon: <Calendar className="w-6 h-6 text-cyan-500" />,
      title: '2. Compromiso de 12 a 15 Años',
      description: 'Una mascota es un miembro de la familia para toda su vida, incluyendo mudanzas, vacaciones y etapas geriátricas.',
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-emerald-500" />,
      title: '3. Salud y Castración Obligatoria',
      description: 'Garantizar el calendario de vacunación anual, desparasitación cada 3 meses y castración como política contra la sobrepoblación.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      title: '4. Seguimiento y Adaptación',
      description: 'El equipo voluntario de Río Cuarto realiza un acompañamiento afectivo durante las primeras semanas para facilitar la integración.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300"
          aria-label="Volver al inicio"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Guía Comunitaria
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Adopción Responsable
          </h1>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-neutral-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
          Adoptar no es solo rescatar: es transformar una vida
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          En Río Cuarto miles de animales esperan una familia. Adoptar un animal callejero implica darle la oportunidad de conocer el afecto, la seguridad y la dignidad después de haber sufrido abandono o maltrato.
        </p>
      </div>

      {/* Requisitos y Pautas Clave */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white px-2">
          Puntos Fundamentales del Compromiso
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-neutral-200 dark:border-slate-700 shadow-sm space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                {step.icon}
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {step.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div className="text-center pt-4">
        <Link
          href="/adopciones"
          className="btn-primary min-h-[52px] text-base font-heading font-bold px-8 shadow-lg shadow-orange-600/20"
        >
          <span>Ver Animales Listos para Adoptar</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
}
