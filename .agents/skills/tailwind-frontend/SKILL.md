---
name: tailwind-frontend
description: Guía de maquetado y diseño con Tailwind CSS para Next.js App Router en Callejeros Río IV. Enfoque mobile-first, paleta semántica dual (Light/Dark), tipografía modular y prevención de desborde horizontal (overflow-x).
---

# Skill: Tailwind Frontend & Sistema de Diseño

Esta skill proporciona las directivas prácticas para construir interfaces en Callejeros Río IV utilizando **Tailwind CSS** en **Next.js**.

---

## 1. Principios Mobile-First

1. **Diseño Inicial en `< 640px`**:
   - Toda clase base aplica a pantallas pequeñas (móviles).
   - Utilizar prefijos (`sm:`, `md:`, `lg:`, `xl:`) únicamente para añadir complejidad o columnas adicionales a medida que el viewport crece.
2. **Distribución de Columnas de Grilla**:
   ```tsx
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     {pets.map((pet) => (
       <PetCard key={pet.id} pet={pet} />
     ))}
   </div>
   ```
3. **Área Táctil Mínima (48px)**:
   - Todo botón, enlace o elemento interactivo debe incluir `min-h-[48px] min-w-[48px]` para cumplir con usabilidad táctil en móviles.

---

## 2. Paleta Semántica & Modo Oscuro (Dark/Light)

- **Fondo General**: `bg-neutral-50 dark:bg-slate-900`
- **Superficie / Tarjetas**: `bg-white dark:bg-slate-800 border border-neutral-200 dark:border-slate-700`
- **Texto Principal**: `text-slate-800 dark:text-slate-100`
- **Texto Secundario**: `text-slate-600 dark:text-slate-400`
- **Botón Primario**: `bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-sm`
- **Botón Secundario**: `bg-cyan-600 hover:bg-cyan-700 text-white font-semibold`
- **Badge Urgente**: `bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800`
- **Badge En Adopción**: `bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800`

---

## 3. Prevención Obligatoria de Desborde Horizontal (`overflow-x`)

- No usar anchos absolutos mayores a `320px` (ej. `w-[380px]`).
- En el layout o contenedor principal, asegurar:
  ```tsx
  <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
  ```
- No abusar de `w-screen`; utilizar `w-full`.
