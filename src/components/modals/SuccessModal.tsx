'use client';

import React, { useEffect, useRef } from 'react';
import { CheckCircle2, HeartHandshake, X } from 'lucide-react';
import Link from 'next/link';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  actionText?: string;
  actionHref?: string;
  variant?: 'emerald' | 'orange';
}

export function SuccessModal({
  isOpen,
  onClose,
  title = '¡Acción realizada con éxito!',
  message = 'Reporte publicado con éxito. ¡Gracias por ayudar a los callejeritos de Río Cuarto!',
  actionText = 'Ver en Adopciones',
  actionHref = '/adopciones',
  variant = 'emerald',
}: SuccessModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Escuchar tecla Escape para cerrar el modal accesiblemente
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus Trap accesible para usuarios de teclado (Tab / Shift+Tab)
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus en el primer elemento interactivo al abrir
    const timer = setTimeout(() => {
      const primaryBtn = modalRef.current?.querySelector<HTMLElement>('a, button');
      primaryBtn?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isOrange = variant === 'orange';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-desc"
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-2 transition-all animate-in zoom-in-95 duration-200 ${
          isOrange
            ? 'border-orange-500 dark:border-orange-600'
            : 'border-green-500 dark:border-green-600'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Cerrar ventana de confirmación"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icono de Confirmación y Confianza Emocional (Color Semántico Verde Éxito: bg-green-100 text-green-600) */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ${
            isOrange
              ? 'bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 ring-orange-50 dark:ring-orange-950/30'
              : 'bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 ring-green-50 dark:ring-green-950/30'
          }`}
        >
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h3 id="success-modal-title" className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-2">
          {title}
        </h3>

        <p id="success-modal-desc" className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {message}
        </p>

        {/* Botón Principal (Todo el peso visual) y Botón Secundario (Ghost neutro con separación) */}
        <div className="space-y-3">
          <Link
            href={actionHref}
            onClick={onClose}
            className={`w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-2xl font-heading font-bold text-sm text-white shadow-md active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isOrange
                ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/25 focus-visible:ring-orange-400 dark:focus-visible:ring-offset-slate-900'
                : 'bg-green-600 hover:bg-green-700 shadow-green-600/25 focus-visible:ring-green-500 dark:focus-visible:ring-offset-slate-900'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>{actionText}</span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 dark:focus-visible:ring-offset-slate-900"
          >
            Cerrar ventana
          </button>
        </div>
      </div>
    </div>
  );
}
