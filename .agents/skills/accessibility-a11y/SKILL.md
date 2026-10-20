---
name: accessibility-a11y
description: Guía de auditoría y cumplimiento de accesibilidad web (WCAG AA). Verificación de ratios de contraste (4.5:1 texto normal, 3:1 componentes UI), navegación completa por teclado (Tab, focus-visible) y buenas prácticas en Next/Image.
---

# Skill: Accesibilidad Web (WCAG AA & A11y)

Esta skill garantiza que todo componente y vista de Callejeros Río IV cumpla con los estándares internacionales de accesibilidad.

---

## 1. Ratios de Contraste WCAG AA

- **Texto Estándar (< 18pt o < 14pt bold)**: Mínimo **4.5:1** contra su fondo directo.
- **Texto Grande (≥ 18pt o ≥ 14pt bold)**: Mínimo **3:1**.
- **Elementos Gráficos Esenciales y Bordes de Control**: Mínimo **3:1**.
- **Modo Oscuro**: Verificar que el texto secundario mantenga contraste suficiente (ej. `slate-400` sobre `slate-900` cumple > 5.5:1).

---

## 2. Navegación Completa por Teclado (Tab & Focus Rings)

1. Todo elemento interactivo debe ser alcanzable mediante la tecla `Tab`.
2. El foco visual nunca debe ocultarse (`outline: none` sin reemplazo está prohibido).
3. Utilizar siempre `focus-visible`:
   ```tsx
   className="focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 dark:focus-visible:ring-orange-800"
   ```
4. El orden de navegación en el DOM debe coincidir exactamente con el orden visual.

---

## 3. Imágenes Accesibles con `next/image`

- Toda imagen renderizada con `<Image />` debe poseer un atributo `alt` contextualizado y descriptivo.
  ```tsx
  // Ejemplo correcto para fichas de mascotas:
  <Image
    src={pet.imageUrl}
    alt={`Foto de ${pet.name}, perro de tamaño ${pet.size.toLowerCase()} en adopción`}
    width={400}
    height={400}
    className="aspect-square object-cover"
  />
  ```
- Si una imagen es meramente decorativa, declarar explícitamente:
  ```tsx
  <Image src="/decorations/paw.svg" alt="" aria-hidden="true" width={24} height={24} />
  ```
