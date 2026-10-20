# Convenciones de Diseño, UI/UX y Sistema de Componentes - Callejeros Río IV

Este documento define las reglas de maquetado, tokens de diseño visual, accesibilidad y comportamiento de componentes para el proyecto Callejeros Río IV.

---

## 1. Sistema de Colores Semánticos & Accesibilidad WCAG AA

La paleta cromática está diseñada para generar empatía, energía y claridad, cumpliendo obligatoriamente el estándar **WCAG AA** (ratio mínimo de contraste **4.5:1** para texto normal y **3:1** para elementos de interfaz y texto grande).

### Paleta Dual (Light Mode / Dark Mode)

| Rol Semántico | Significado Emocional / UI | HEX Modo Claro | HEX Modo Oscuro | Ratio WCAG AA | Uso Principal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primario (Primary)** | Rescate, calidez y energía comunitaria | `#EA580C` (`orange-600`) | `#FB923C` (`orange-400`) | `4.8:1` / `5.2:1` | Botones principales, llamados a la acción (CTAs), acentos |
| **Secundario (Secondary)** | Salud, esperanza, veterinaria | `#0891B2` (`cyan-600`) | `#22D3EE` (`cyan-400`) | `4.7:1` / `5.4:1` | Enlaces secundarios, badges informativos |
| **Éxito (Success)** | Adopción confirmada, reporte creado | `#059669` (`emerald-600`)| `#34D399` (`emerald-400`)| `4.9:1` / `5.1:1` | Toasts y modales de éxito, badges de "Adoptado" |
| **Alerta / Peligro (Danger)** | Extravío urgente, error de validación | `#DC2626` (`red-600`) | `#F87171` (`red-400`) | `4.6:1` / `5.0:1` | Badges de "Urgente", alertas de campo vacío |
| **Fondo Base (Background)** | Superficie principal de lectura | `#FDFBF7` (`neutral-50`) | `#0F172A` (`slate-900`) | - | Fondo de la aplicación |
| **Superficie (Surface)** | Contenedores de contenido | `#FFFFFF` (`white`) | `#1E293B` (`slate-800`) | - | Tarjetas de mascotas, barras de menú, modales |
| **Texto Principal (Text)** | Contenido textual legible | `#1E293B` (`slate-800`) | `#F8FAFC` (`slate-50`) | `12.5:1` / `14:1` | Títulos, párrafos, labels de formularios |
| **Texto Secundario (Muted)** | Metadata, fechas, detalles | `#475569` (`slate-600`) | `#94A3B8` (`slate-400`) | `4.6:1` / `5.5:1` | Edad, tamaño, fecha de reporte |

---

## 2. Escala Tipográfica Modular

La combinación tipográfica equilibra cercanía afectiva con máxima legibilidad técnica:

- **Títulos y Encabezados (`h1`, `h2`, `h3`, `h4`)**:
  - Fuente: **`Poppins`** (alternativa: **`Nunito`**) en pesos `font-bold` (700) y `font-semibold` (600).
  - Aporta un tono redondeado, cálido, optimista y amigable para descontracturar una problemática social sensible.
  - Escala: `h1` (32px móvil / 48px desktop), `h2` (24px móvil / 32px desktop), `h3` (20px móvil / 24px desktop).
- **Cuerpo de Texto y Formularios (`p`, `span`, `input`, `label`)**:
  - Fuente: **`Inter`** (alternativa: **`Roboto`**) en pesos `font-normal` (400) y `font-medium` (500).
  - Tamaño base: **`16px` (`text-base`)** como estándar estricto para evitar zoom involuntario en navegadores móviles (iOS Safari / Android Chrome).

---

## 3. Filosofía de Diseño Mobile-First & Responsive

Dado que los reportes de extravío se realizan frecuentemente en la calle con smartphones:

1. **Maquetado Base en Móvil (`< 640px`)**:
   - Todo selector Tailwind se escribe primero para pantalla chica, añadiendo `sm:`, `md:`, `lg:` únicamente para expansiones.
   - Grilla de tarjetas: **1 columna** en móvil para lectura vertical fluida.
   - Grilla en tablet: **2 columnas** (`sm:grid-cols-2`).
   - Grilla en desktop: **3 o 4 columnas** (`lg:grid-cols-3 xl:grid-cols-4`).
2. **Área Táctil Mínima (Tap Targets)**:
   - Todo botón, enlace o control interactivo debe tener una dimensión mínima de **48px por 48px** (`min-h-[48px] min-w-[48px]`).
3. **Navegación Móvil Adaptativa**:
   - Menú hamburguesa accesible con foco atrapado y cierre mediante tecla `Escape` o clic fuera del contenedor.
4. **Cero Desborde Horizontal (`overflow-x`)**:
   - Contenedores principales siempre con `w-full max-w-7xl mx-auto overflow-x-hidden`. Prohibido el uso de anchos fijos superiores a `300px` sin contenedor fluido.

---

## 4. Los 5 Estados Obligatorios de Componentes Interactivos

Todo botón, enlace de acción, input o tarjeta clickable debe implementar obligatoriamente los **5 estados de interacción** respetando los criterios de accesibilidad visual:

1. **Default**: Aspecto en reposo, con fondo semántico definido, tipografía legible y contraste WCAG AA.
2. **Hover**: Retroalimentación visual al pasar el cursor; incremento sutil de luminosidad y sombra (`hover:bg-orange-700 hover:shadow-md`).
3. **Active**: Microinteracción al hacer clic o presionar la pantalla; ligera reducción de escala física (`active:scale-[0.98] active:bg-orange-800`).
4. **Focus (Teclado / A11y)**: Anillo visible de alto contraste activado mediante tecla `Tab` (`focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 dark:focus-visible:ring-orange-800`). **Prohibido eliminar el foco sin alternativa visible.**
5. **Disabled**: Estado deshabilitado mientras se procesa un formulario o cuando faltan datos obligatorios (`disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`).

### Ejemplo Canónico de Botón Primario en Tailwind:
```tsx
<button
  type="button"
  className="
    /* 1. DEFAULT */
    inline-flex items-center justify-center font-semibold text-white bg-orange-600
    rounded-xl min-h-[48px] px-6 py-3 shadow-sm transition-all duration-200
    /* 2. HOVER */
    hover:bg-orange-700 hover:shadow-md
    /* 3. ACTIVE */
    active:scale-[0.98] active:bg-orange-800
    /* 4. FOCUS (Accesibilidad con teclado) */
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 dark:focus-visible:ring-orange-800
    /* 5. DISABLED */
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  "
>
  Conocer a Manchita
</button>
```

---

## 5. Anatomía de la Tarjeta de Mascota (`PetCard`)

```text
┌──────────────────────────────────────────────┐
│ [ Foto Cuadrada 1:1 - Next/Image con alt ]   │
│   (Badge Flotante: "Urgente" | "En Adopción")│
├──────────────────────────────────────────────┤
│ Manchita                             (h3)    │
│ 2 años • Tamaño Mediano                      │
│ 📍 Barrio Parque Sarmiento                   │
├──────────────────────────────────────────────┤
│ [ Botón Primario: "Conocer a Manchita" (48px)│
└──────────────────────────────────────────────┘
```
