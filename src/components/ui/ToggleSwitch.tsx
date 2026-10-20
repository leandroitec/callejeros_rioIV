'use client';

import React from 'react';

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export function ToggleSwitch({ label, checked, onChange, id }: ToggleSwitchProps) {
  const switchId = id ?? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex items-center justify-between py-2">
      <label
        htmlFor={switchId}
        className="text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer select-none"
      >
        {label}
      </label>
      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 ${
          checked ? 'bg-slate-900 dark:bg-orange-500' : 'bg-slate-300 dark:bg-slate-700'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
