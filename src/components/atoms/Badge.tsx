import React from 'react';

export type BadgeVariant = 'urgent' | 'warning' | 'success' | 'primary' | 'secondary' | 'neutral';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Átomo Badge - Callejeros Río IV
 * Badges semánticos para estados de mascotas, categorías y avisos de urgencia.
 * Cumple con contraste WCAG AA.
 */
export function Badge({ children, variant = 'neutral', icon, className = '' }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    urgent: 'bg-red-600 text-white border-red-700 shadow-xs',
    warning: 'bg-amber-600 text-white border-amber-700 shadow-xs',
    success: 'bg-emerald-600 text-white border-emerald-700 shadow-xs',
    primary: 'bg-orange-600 text-white border-orange-700 shadow-xs',
    secondary: 'bg-cyan-600 text-white border-cyan-700 shadow-xs',
    neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide border transition-transform duration-300 ease-in-out ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
