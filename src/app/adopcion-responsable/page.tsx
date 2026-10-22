'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Home, Calendar, Stethoscope, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdopcionResponsablePage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900"
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

      {/* Requisitos y Pautas Clave (Patrón de Lectura en F: Títulos fuertes a la izquierda y palabras clave en negrita) */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white text-left tracking-tight">
            Requisitos Fundamentales del Compromiso
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Escaneá los 4 pilares obligatorios antes de iniciar tu solicitud de adopción en Río Cuarto:
          </p>
        </div>

        <div className="space-y-4">
          {/* Pilar 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div className="space-y-2 flex-1 text-left">
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                1. Evaluación del Espacio Familiar
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>Cerramiento perimetral seguro:</strong> Patios cerrados sin huecos y balcones obligatoriamente protegidos con redes de contención.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>Acuerdo familiar unánime:</strong> Consentimiento expreso de todas las personas que conviven en la vivienda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span><strong>Tolerancia y adaptación:</strong> Espacio adecuado para permitir la habituación gradual del animal a su nuevo entorno.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-2 flex-1 text-left">
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                2. Compromiso Vital de 12 a 15 Años
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span><strong>Miembro definitivo:</strong> La adopción se mantiene ante mudanzas, nacimientos, cambios laborales o viajes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span><strong>Cuidado geriátrico:</strong> Asumir la dedicación afectiva y médica requerida cuando el animal llegue a su etapa senior.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">•</span>
                  <span><strong>Tiempo y compañía:</strong> Disposición real para brindarle paseos diarios, actividad física y estimulación afectiva.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="space-y-2 flex-1 text-left">
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                3. Salud y Castración Obligatoria
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Castración sin excepción:</strong> Política innegociable de la red para erradicar la sobrepoblación en Río Cuarto.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Plan de vacunación anual:</strong> Aplicación obligatoria de la vacuna séxtuple/óctuple y la dosis antirrábica municipal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Desparasitación regular:</strong> Control trimestral de parásitos internos y protección contra pulgas y garrapatas.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2 flex-1 text-left">
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                4. Seguimiento y Acompañamiento Afectivo
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span><strong>Contacto fluido por WhatsApp:</strong> Envío periódico de fotos y videos durante los primeros 6 meses de integración.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span><strong>Período de adaptación:</strong> Respeto por los tiempos biológicos del animal sin forzar interacciones durante las primeras semanas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span><strong>Soporte continuo:</strong> Asesoramiento permanente del equipo de voluntarios y educadores caninos de Callejeros Río IV.</span>
                </li>
              </ul>
            </div>
          </div>
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
