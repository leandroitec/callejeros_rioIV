'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

/**
 * Molécula AccordionItem - Callejeros Río IV
 * Componente desplegable accesible con microinteracción suave en la rotación del Chevron (duration-300 ease-in-out)
 * y despliegue animado del contenido.
 */
export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `accordion-content-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-all duration-300 ease-in-out">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/80 text-left font-heading font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-offset-slate-900 min-h-[52px]"
      >
        <span>{title}</span>
        <div
          className={`w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center transition-transform duration-300 ease-in-out shadow-xs ${
            isOpen ? 'rotate-180 text-orange-600 dark:text-orange-400' : 'text-slate-500'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {isOpen && (
        <div
          id={contentId}
          role="region"
          aria-label={title}
          className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 animate-in fade-in slide-in-from-top-1 duration-300 ease-out"
        >
          {children}
        </div>
      )}
    </div>
  );
}
