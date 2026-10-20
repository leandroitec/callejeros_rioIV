'use client';

import React from 'react';
import { CheckCircle2, HeartHandshake, X } from 'lucide-react';
import Link from 'next/link';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  actionText?: string;
  actionHref?: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  title = '¡Acción realizada con éxito!',
  message = 'Reporte publicado con éxito. ¡Gracias por ayudar a los callejeritos de Río Cuarto!',
  actionText = 'Ver en Adopciones',
  actionHref = '/adopciones',
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 text-center shadow-2xl border-2 border-emerald-500 dark:border-emerald-600 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-2">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {message}
        </p>

        <div className="space-y-2">
          <Link
            href={actionHref}
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl font-heading font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-600/20 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>{actionText}</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            Cerrar ventana
          </button>
        </div>
      </div>
    </div>
  );
}
