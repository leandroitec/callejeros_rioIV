import React from 'react';
import Link from 'next/link';
import { PawPrint, Home, Search, Heart } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6 animate-in fade-in duration-300">
        <div className="relative w-24 h-24 mx-auto bg-orange-100 dark:bg-orange-950/60 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 ring-8 ring-orange-50 dark:ring-orange-950/30">
          <PawPrint className="w-12 h-12" aria-hidden="true" />
          <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded-full shadow-md">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            ¡Guau! Esta página se extravió
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            No encontramos el rastro del enlace que buscabas en Río Cuarto. Pero no te preocupes, siempre podés volver a casa o ayudar a un callejerito.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 btn-primary min-h-[48px] text-sm font-heading font-bold shadow-md shadow-orange-600/20"
          >
            <Home className="w-4 h-4 mr-1.5" aria-hidden="true" />
            <span>Volver al Inicio</span>
          </Link>
          <Link
            href="/adopciones"
            className="flex-1 inline-flex items-center justify-center font-heading font-bold text-sm bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-2xl px-4 py-3 transition-colors min-h-[48px]"
          >
            <Search className="w-4 h-4 mr-1.5 text-orange-500" aria-hidden="true" />
            <span>Ver Adopciones</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
