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

## 2. Escala Tipográfica Modular y Estricta (Clase 5: Estética Funcional)

La combinación tipográfica equilibra cercanía afectiva con máxima legibilidad técnica:

- **h1 (Nombres de pantallas y encabezados mayores)**:
  - Clase: **`text-3xl font-bold`** (`32px` / `2rem`), fuente `Poppins` (`var(--font-poppins)`).
  - Tono cálido, optimista y contundente para titulares principales de cada ruta.
- **h2 (Subtítulos de secciones y módulos funcionales)**:
  - Clase: **`text-2xl font-semibold`** (`24px` / `1.5rem`), fuente `Poppins` (`var(--font-poppins)`).
- **Body (Cuerpo de texto descriptivo de mascotas y párrafos)**:
  - Clase: **`text-base`** (`16px` / `1rem`), fuente `Inter` (`var(--font-inter)`).
  - Estándar estricto para lectura cómoda y para evitar zoom involuntario en navegadores móviles (iOS Safari / Android Chrome).
- **Caption (Fechas, validaciones de formularios y letra chica)**:
  - Clase: **`text-xs text-slate-500 dark:text-slate-400`** (`12px` / `0.75rem`).

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

Todo botón, enlace de acción, input o tarjeta clickable debe implementar obligatoriamente los **5 estados vivos de interacción**:

1. **Default**: Color base según semántica (`bg-orange-500` para primario, `bg-teal-500` para secundario) con tipografía legible y contraste WCAG AA.
2. **Hover**: Retroalimentación visual al pasar el cursor; incremento deliberado de luminosidad y sombra (`hover:bg-orange-600 hover:shadow-lg`).
3. **Active**: Sensación táctil de hundimiento físico inmediato (`active:scale-95`).
4. **Focus (Teclado / A11y)**: Anillo visible de alto contraste activado mediante tecla `Tab` (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900`).
5. **Disabled**: Estado inactivo cuando faltan datos obligatorios o se procesa un envío (`disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`).

### Ejemplo Canónico de Botón Primario en Tailwind (`src/components/ui/Button.tsx`):
```tsx
<button
  type="button"
  className="
    /* 1. DEFAULT */
    inline-flex items-center justify-center font-heading font-bold text-white bg-orange-500
    rounded-2xl min-h-[48px] px-6 py-3 shadow-md shadow-orange-500/20 transition-all duration-200
    /* 2. HOVER */
    hover:bg-orange-600 hover:shadow-lg
    /* 3. ACTIVE */
    active:scale-95
    /* 4. FOCUS (Accesibilidad con teclado) */
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
    /* 5. DISABLED */
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  "
>
  Adoptar Mascota
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

---

## 6. Estándares DCU: Arquetipos en Exteriores y Prevención de Errores (Clase 6)

1. **Touch Targets Gigantes para Uso Móvil con Una Sola Mano**:
   - En flujos críticos de rescate callejero (como `/reportar-extravio`), los campos de entrada (`<input>`, `<select>`) y botones principales deben tener una altura mínima de `min-h-[56px] h-14` para permitir la pulsación precisa con el pulgar.
2. **Contraste Reforzado contra Reflejos Solares**:
   - Bordes de inputs estandarizados en `border-2 border-slate-400 dark:border-slate-500` con fondos puros (`bg-white dark:bg-slate-900`), garantizando legibilidad en plena vía pública bajo luz solar directa.
   - Tipografía de inputs fijada en `text-base` (16px) para prevenir el zoom automático no deseado de navegadores móviles.
3. **Foco Nuclear en Datos Críticos (Subida de Imagen)**:
   - En reportes de extravío, el área de carga de imágenes debe ser el componente visualmente más grande del formulario (`min-h-[290px] border-3 border-dashed border-orange-400`), con soporte de captura directa de cámara móvil (`capture="environment"`).
4. **Prevención de Envíos Duplicados ("El Problema del Alien")**:
   - Todo formulario interactivo debe implementar:
     - Guard de idempotencia en el handler: `if (isSubmitting) return;`.
     - Botón de envío deshabilitado: `disabled={isSubmitting}` con clase `opacity-70 cursor-wait`.
     - Retroalimentación dinámica: SVG spinner animado + cambio de texto a gerundio informativo (`loadingText="Publicando...", "Iniciando sesión..."`).

---

## 7. Arquitectura de Información, Labeling y Migas de Pan (Clase 7)

1. **Rotulado Orientado al Usuario (Labeling Empático)**:
   - Toda acción debe expresarse en lenguaje empático, humano y directo centrado en la misión comunitaria.
   - Prohibido el uso de términos técnicos o mecánicos como "Enviar Formulario" o "Filtros de Búsqueda". Se utilizan rótulos cálidos: "Publicar Reporte de Extravío", "Adoptar a [Nombre]", "Encontrá a tu compañero".
   - En barras de búsqueda, los placeholders deben guiar explícitamente: `placeholder="Buscar por nombre, barrio o raza..."`.
2. **Sistemas de Navegación por Migas de Pan (Breadcrumbs)**:
   - Obligatorio en vistas de detalle y segundo nivel (`/adopciones/[id]`, `/tienda`, `/padrinos`, `/adopcion-responsable`).
   - Implementado a través del componente canónico accesible `src/components/ui/Breadcrumbs.tsx` (`<nav aria-label="Migas de pan">`, `<ol>`, `<li>`, `aria-current="page"`).
   - Tipografía estandarizada en `text-xs sm:text-sm text-slate-500` con enlaces clicables de alto contraste.
3. **Organización del Menú por Card Sorting**:
   - El Drawer lateral organiza los enlaces en 3 bloques temáticos con separadores visuales y subtítulos:
     - **Acciones Principales**: Adopción activa y reporte de extravíos.
     - **Cómo Ayudar**: Sostén solidario (Tienda, Padrinos y Donaciones).
     - **Nosotros y Comunidad**: Educación, identidad del refugio y eventos.


