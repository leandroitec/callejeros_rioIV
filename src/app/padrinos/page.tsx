'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, CreditCard, ShieldCheck, CheckCircle2, ChevronLeft, Sparkles } from 'lucide-react';
import { SuccessModal } from '@/components/organisms/SuccessModal';
import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';

export default function PadrinosPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const plans = [
    {
      id: 1,
      name: 'Padrino Amigo',
      price: '$5.000 / mes',
      coverage: 'Cubre antiparasitarios y vacunas mensuales de un cachorro rescatado.',
      popular: false,
    },
    {
      id: 2,
      name: 'Padrino Guardián',
      price: '$12.000 / mes',
      coverage: 'Financia alimento balanceado premium y control veterinario continuo.',
      popular: true,
    },
    {
      id: 3,
      name: 'Padrino Sanador',
      price: '$25.000 / mes',
      coverage: 'Tratamientos complejos, cirugías, castraciones o medicamentos crónicos.',
      popular: false,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Migas de Pan (Breadcrumbs - Arquitectura de Información) */}
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Cómo Ayudar', href: '/#donaciones' },
          { label: 'Padrinos y Madrinas' },
        ]}
      />

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900"
          aria-label="Volver al inicio"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Solidaridad Comunitaria
          </span>
          <h1 className="font-heading font-bold text-3xl text-slate-900 dark:text-white">
            Padrinos y Madrinas
          </h1>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-3">
        <h2 className="font-heading font-semibold text-2xl">
          ¿No podés adoptar físicamente en tu hogar?
        </h2>
        <p className="text-base text-cyan-50 leading-relaxed max-w-2xl">
          Convertite en el ángel guardián de una mascota en tratamiento en Río Cuarto. Tu padrinazgo mensual asegura que ningún animal quede sin asistencia veterinaria ni comida.
        </p>
      </div>

      {/* Planes de Padrinazgo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
              plan.popular
                ? 'bg-white dark:bg-slate-800 border-orange-500 shadow-xl ring-2 ring-orange-500/20'
                : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-sm'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Más Elegido
              </span>
            )}
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                {plan.name}
              </h3>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
                {plan.price}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {plan.coverage}
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => {
                  setSelectedPlan(plan.id);
                  setIsSuccessModalOpen(true);
                }}
                className={`w-full min-h-[48px] py-3 px-4 rounded-2xl font-heading font-bold text-sm shadow-sm transition-all ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                Sumarme como Padrino
              </button>
            </div>
          </div>
        ))}
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="¡Gracias por tu Padrinazgo!"
        message="Registramos tu compromiso solidario. Recibirás en tu correo los reportes mensuales de evolución fotográfica y veterinaria de tu ahijado/a."
        actionText="Ver Mascotas que Ayudás"
        actionHref="/adopciones"
      />
    </div>
  );
}
