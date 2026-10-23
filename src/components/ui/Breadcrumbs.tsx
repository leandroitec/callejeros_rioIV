'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Componente Breadcrumbs (Migas de Pan) - Callejeros Río IV
 * Cumple con el estándar de Arquitectura de Información (Clase 7) y WCAG AA:
 * - Marcador semántico <nav aria-label="Migas de pan">
 * - Lista ordenada <ol> y elementos <li>
 * - Atributo aria-current="page" en el último elemento (página actual)
 * - Separadores visuales con aria-hidden="true"
 * - Texto legible text-sm text-slate-500 con alto contraste
 */
export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Migas de pan" className={`w-full py-1 ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0"
                  aria-hidden="true"
                />
              )}
              {isLast || !item.href ? (
                <span
                  className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-xs"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-orange-600 dark:hover:text-orange-400 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-0.5"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
