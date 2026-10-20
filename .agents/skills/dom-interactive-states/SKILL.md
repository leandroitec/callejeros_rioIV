---
name: dom-interactive-states
description: Guía de implementación de los 5 estados obligatorios de interacción (Default, Hover, Active, Focus, Disabled) y dinamismo en DOM en Next.js (Client Components interactivos, formularios asíncronos y retroalimentación mediante Toasts y Modales sin recargas de página).
---

# Skill: Dinamismo DOM & Estados de Interacción

Esta skill define cómo manejar la reactividad en el navegador, la interacción táctil/ratón/teclado y el feedback visual en tiempo real.

---

## 1. Los 5 Estados Obligatorios de Componentes Interactivos

Cada botón o control de acción debe definir explícitamente sus 5 estados:

1. **Default**: Aspecto base limpio, legible, con elevación o color reconocible.
2. **Hover**: Transición sutil de luminosidad o sombra al colocar el cursor encima (`hover:bg-orange-700 hover:shadow-md`).
3. **Active**: Microinteracción táctil o de clic que simula presión física (`active:scale-[0.98] active:bg-orange-800`).
4. **Focus**: Anillo de foco de alto contraste para navegación accesible (`focus-visible:ring-4 focus-visible:ring-orange-300`).
5. **Disabled**: Opacidad reducida, cursor de bloqueo y desactivación de eventos para formularios incompletos o en procesamiento (`disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`).

---

## 2. Formularios Asíncronos sin Recarga de Página

En Next.js App Router, los formularios de reporte y adopción deben procesarse de forma asíncrona:

```tsx
'use client';

import { useState } from 'react';

export function ReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const formData = new FormData(e.currentTarget);
      // Procesar vía Server Action o Fetch API
      await submitReportAction(formData);

      // Toast o Modal verde de éxito
      setFeedback({
        type: 'success',
        message: 'Reporte publicado con éxito. ¡Gracias por ayudar!',
      });
      e.currentTarget.reset();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: 'No pudimos publicar el reporte. Por favor revisá tu conexión e intentá de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campos con labels accesibles */}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-[48px] bg-orange-600 hover:bg-orange-700 active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-orange-300 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Publicando...' : 'Reportar Extravío'}
      </button>

      {feedback?.type === 'success' && (
        <div role="alert" className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 rounded-xl text-emerald-800 dark:text-emerald-200">
          {feedback.message}
        </div>
      )}
    </form>
  );
}
```
