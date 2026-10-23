# Registro de Decisiones de Arquitectura (ADRs) - Callejeros Río IV

Este documento registra cronológicamente todas las decisiones arquitectónicas, tecnológicas y de diseño tomadas para el proyecto. Cada registro sigue el formato formal `[ADR-XXX] · [YYYY-MM-DD HH:mm]`.

> [!CAUTION]
> ### 🛑 PROTOCOLO MANDATORIO: GUARD DE APROBACIÓN PREVIA
> Si en el transcurso del desarrollo se requiere realizar cualquier cambio importante, adición o modificación estructural a futuro (alteración de modelos de datos fundamentales, cambios de arquitectura, reglas de negocio o incorporación de dependencias mayores), **se DEBE solicitar y obtener la autorización previa y explícita del usuario antes de ejecutar cualquier cambio en el código o en la configuración**.

---

## [ADR-001] · [2026-10-19 18:30] Uso de Base de Datos Local SQLite con Prisma ORM para Trabajo en Equipo vía GitHub

- **Estado**: Aceptado
- **Contexto**:
  El proyecto es desarrollado por un equipo de 4 integrantes que trabajan de forma colaborativa y distribuida utilizando Git y GitHub. El uso de servicios de base de datos en la nube (como Firebase o Supabase) generaría dependencias de conexión a internet constante, complejidad en la gestión de credenciales compartidas, costos y riesgos de divergencia de esquemas entre entornos locales de desarrollo.
- **Decisión**:
  Se adopta de forma exclusiva **SQLite** gestionado a través de **Prisma ORM**. Queda **terminantemente prohibido** el uso de bases de datos remotas en la nube.
- **Consecuencias**:
  - Cada uno de los 4 integrantes puede clonar el repositorio, ejecutar `npx prisma migrate dev` y contar con su entorno local 100% operativo sin dependencias externas.
  - Para evitar colisiones y conflictos de merge insalvables en Git, los archivos binarios de SQLite (`*.db`, `*.db-journal`, `*.sqlite`) deben excluirse obligatoriamente en el `.gitignore`.
  - Los cambios de estructura de datos se propagan exclusivamente mediante las migraciones versionadas en la carpeta `prisma/migrations/`.

---

## [ADR-002] · [2026-10-19 18:45] Adopción de Next.js (App Router) y Tailwind CSS como Stack Base

- **Estado**: Aceptado
- **Contexto**:
  Se requiere un entorno de desarrollo moderno que permita una entrega rápida de valor (speed-to-market), renderizado híbrido de alta performance para catálogo de mascotas (SEO y carga inicial instantánea) e interfaces táctiles reactivas.
- **Decisión**:
  Utilizar **Next.js con App Router** y **Tailwind CSS**. Los componentes son React Server Components (RSC) por defecto, reservando `'use client'` únicamente para los límites interactivos del DOM (filtros, modales, toasts y menús).
- **Consecuencias**:
  - Código full-stack unificado en TypeScript bajo una única estructura de proyecto.
  - Maquetado ágil con clases de utilidad y prevención de desbordes mobile-first.

---

## [ADR-003] · [2026-10-19 19:00] Prohibición de Redux y Adopción de Estado React Local + Server Actions

- **Estado**: Aceptado
- **Contexto**:
  En proyectos de catálogo y formularios comunitarios, introducir gestores de estado global complejos como Redux Toolkit, MobX o Zustand añade sobrecarga cognitiva, archivos innecesarios y riesgo de desincronización con el servidor.
- **Decisión**:
  Se prohíbe el uso de Redux y librerías similares de estado global. La reactividad se maneja con estado local de React (`useState`, `useContext`) para la UI inmediata y Server Actions de Next.js combinadas con `revalidatePath` para la persistencia y revalidación de datos.
- **Consecuencias**:
  - Reducción drástica del bundle de JavaScript enviado al cliente.
  - Código más simple, legible y mantenible para los 4 integrantes del equipo.

---

## [ADR-004] · [2026-10-19 19:15] Sistema de Diseño Semántico Dual (Light/Dark) con Contraste Estricto WCAG AA

- **Estado**: Aceptado
- **Contexto**:
  La plataforma será utilizada en situaciones cotidianas diversas: usuarios en la vía pública bajo luz solar directa reportando una mascota, y usuarios en sus hogares navegando el catálogo de noche. Se requiere garantizar legibilidad y accesibilidad universal.
- **Decisión**:
  Implementar una paleta semántica con Naranja Cálido (`#EA580C` / `#FB923C`) como color primario y Verde Agua/Cian (`#0891B2` / `#22D3EE`) como secundario. Todos los pares texto/fondo deben superar un ratio de contraste mínimo de **4.5:1** (WCAG AA).
- **Consecuencias**:
  - Interfaces altamente legibles para personas con baja agudeza visual.
  - Soporte fluido para modo claro y modo oscuro respetando la preferencia del usuario o del sistema.

---

## [ADR-005] · [2026-10-19 19:30] Mapeo Fiel de Componentes a partir de los Frames de Figma

- **Estado**: Aceptado
- **Contexto**:
  El equipo cuenta con un prototipo definido en Figma compuesto por secciones clave: Navbar, Hero, Grilla con filtros, Padrinazgo/Tienda, Footer y Modales interactivos.
- **Decisión**:
  Cada frame del prototipo de Figma se traduce en un componente modular y reutilizable con nombres idénticos o directamente mapeados a su función en el diseño (`Navbar`, `HeroSection`, `PetGrid`, `PetCard`, `ReportModal`, `Footer`).
- **Consecuencias**:
  - Trazabilidad total entre diseño UI y código fuente.
  - Agilidad al revisar entregas parciales y verificar fidelidad visual en la evaluación final.

---

## [ADR-006] · [2026-10-19 21:00] Centralización de la Experiencia de Inicio (Home) en la Ruta Raíz `/`

- **Estado**: Aceptado
- **Contexto**:
  La pantalla principal de portada (Home en Wireframe 1 de Figma) debe ser accesible sin fricción desde cualquier punto del flujo de usuario, tanto en escritorio como en la vista móvil (Drawer). Anteriormente, los flujos posteriores al Login/Registro redirigían hacia el catálogo `/adopciones`, y el menú lateral carecía de un acceso explícito a la raíz `/`.
- **Decisión**:
  1. La ruta raíz `/` (`src/app/page.tsx`) es formalmente la única Home del sitio, albergando el Carrusel de Campañas, el Hero de Adopciones, el Hero de Quiénes Somos y el botón flotante "Donaciones (Scroll)" mapeado 1:1 con Figma.
  2. En la navegación móvil (Drawer) y de escritorio (Navbar) se incluye de forma prioritaria el enlace `"Inicio"` hacia `/`.
  3. Los flujos de autenticación (Login y Registro) retornan de forma predeterminada al Home `/`.
- **Consecuencias**:
  - Experiencia de navegación consistente y mobile-first sin ambigüedades de punto de entrada.
  - Coherencia total con los wireframes de Figma y el mapa mental de navegación.

---

## [ADR-007] · [2026-10-22 19:45] Optimización UX/UI Basada en "El Mindset del Desarrollador UX"

- **Estado**: Aceptado
- **Contexto**:
  Para eliminar fricciones cognitivas, reducir la incertidumbre post-envío de formularios y potenciar la empatía visual del proyecto con adoptantes y rescatistas, se auditaron y rediseñaron los puntos de interacción clave.
- **Decisión**:
  1. **Optimización de Formularios (Login, Registro, Reporte)**:
     - Todos los inputs cuentan con padding táctil de al menos 48px (`min-h-[48px]`), etiquetas explícitas y atributos de autocompletado nativo.
     - Botones principales de envío con color primario naranja vibrante (`bg-orange-600`), feedback inmediato de carga (spinner animado) y modales de confirmación interactivos (`SuccessModal`) para erradicar la incertidumbre del usuario.
  2. **Detector de Frustraciones**:
     - Separación espacial mínima (`gap-4` a `gap-6`) entre acciones opuestas (ej. "Ver Resultados" vs. "Limpiar Filtros" en `FilterModal`, o "Publicar" vs. "Cancelar y volver" en `ReportarExtravioPage`).
     - Jerarquía visual estricta: los botones secundarios o de descarte adoptan estilo "ghost" neutro para evitar toques destructivos accidentales.
  3. **Confianza y Emoción**:
     - Estandarización de bordes redondeados orgánicos (`rounded-2xl` y `rounded-3xl`) en tarjetas (`PetCard`), modales y botones, transmitiendo cercanía y calidez para una comunidad de rescate animal.
  4. **Desempeño Web**:
     - Integración sistemática del componente nativo `<Image />` de Next.js con atributo `priority` en el Hero Carousel y tamaños responsivos optimizados (`sizes`) para maximizar el LCP (Largest Contentful Paint).
- **Consecuencias**:
  - Mayor tasa de conversión en reportes de extravío y adopciones.
  - Reducción drástica de frustraciones y errores de usuario en interfaces móviles.

---

## [ADR-008] · [2026-10-22 20:00] Cumplimiento de Usabilidad y Accesibilidad Web (WCAG AA)

- **Estado**: Aceptado
- **Contexto**:
  La plataforma "Callejeros Río IV" debe ser operable por todas las personas, independientemente de sus capacidades físicas, visuales o cognitivas, y en cualquier condición de iluminación. Además, se requiere agilizar el uso en móviles de adoptantes y rescatistas que interactúan en la vía pública mediante teclado físico, lectores de pantalla o navegación táctil.
- **Decisión**:
  1. **Accesibilidad Operable (Navegación por Teclado)**:
     - Estandarización del estado `:focus-visible` con anillos de alto contraste (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600 dark:focus-visible:ring-offset-slate-900`) en todos los elementos interactivos (botones, enlaces, selectores y campos de entrada).
     - Trampa de foco nativa (`focus trap`) en modales superpuestos (`SuccessModal`, `FilterModal`), asegurando que la tecla `Tab` / `Shift+Tab` no escape del modal mientras esté activo.
     - Cierre inmediato de ventanas modales y menú drawer móvil mediante la tecla `Escape`.
  2. **Accesibilidad Perceptible (Contraste y Etiquetas ARIA)**:
     - Auditoría y cumplimiento del ratio de contraste mínimo de **4.5:1** (WCAG AA) para texto estándar en fondos claros y oscuros.
     - Asignación obligatoria de `aria-label` descriptivos en todos los controles basados exclusivamente en íconos (menú hamburguesa, selector de tema claro/oscuro, campana de notificaciones, botón cerrar 'X', flechas de retorno y botones de favoritos).
  3. **Relación Esfuerzo-Beneficio (Formularios y Validaciones)**:
     - Validaciones en tiempo real disparadas al desenfocar (`onBlur`) y al escribir (`onChange`) en `LoginPage`, `RegisterPage` y `ReportarExtravioPage`.
     - Mensajes de error legibles en rojo (`text-red-600 dark:text-red-400`) ubicados inmediatamente debajo del campo con atributos de accesibilidad `role="alert"`, `aria-invalid` y `aria-describedby`.
     - Atributos nativos de HTML5 `autoComplete` (`email`, `name`, `tel`, `current-password`, `new-password`) para facilitar el llenado predictivo y reducir la sobrecarga cognitiva.
  4. **Robustez y Semántica Estructural**:
     - Estructura semántica formal con etiquetas HTML (`<header>`, `<main>`, `<nav>`, `<aside>`, `<section>`, `<article>`) garantizando un árbol de accesibilidad claro para lectores de pantalla.
     - Atributos dinámicos `aria-expanded`, `aria-controls` y `role="region"` en acordeones y controles colapsables.
- **Consecuencias**:
  - Cumplimiento pleno con las pautas WCAG 2.1 nivel AA.
  - Experiencia accesible tanto para navegación por teclado como para tecnologías asistivas (screen readers).
  - Reducción sustancial del tiempo de carga de datos en formularios y prevención de envíos erróneos.

---

## [ADR-009] · [2026-10-22 20:15] Implementación de Modelos Mentales, Affordance Visual y Mapeo Natural (Clase 3)

- **Estado**: Aceptado
- **Contexto**:
  Para consolidar una experiencia intuitiva y reducir la fricción cognitiva en "Callejeros Río IV", es necesario alinear la interfaz con los modelos mentales preexistentes de los usuarios (adoptantes, rescatistas y vecinos), proporcionando pistas visuales físicas (affordances) que indiquen qué elementos son interactivos y asegurando una correspondencia espacial directa (mapeo natural) entre los controles y sus efectos en la pantalla.
- **Decisión**:
  1. **Affordance Visual (Interactividad Evidente)**:
     - Incorporación de elevación y profundidad física en botones de acción principal y tarjetas (`PetCard`, tarjetas de productos en la tienda y botones de envío) utilizando sombras profundas y micro-interacciones de traslación vertical en Tailwind (`shadow-md`, `hover:shadow-xl`, `hover:-translate-y-1` o `hover:-translate-y-0.5`, `active:translate-y-0`, `active:scale-[0.98]`).
     - Estandarización de clases globales `.btn-primary`, `.btn-secondary` y `.btn-outline` en `globals.css` para garantizar consistencia táctil en toda la plataforma.
  2. **Modelos Mentales (Iconografía Universal y Etiquetada)**:
     - Erradicación de íconos aislados y ambiguos. Cada acción de navegación o estado está acompañada de texto explícito y legible.
     - En el menú lateral (Drawer) y Navbar: la campana de notificaciones se rotula explícitamente como "Alertas", el estado de autenticación se presenta como "Mi Perfil (Invitado)" o nombre del usuario autenticado, y cada enlace cuenta con su ícono representativo universal y etiqueta semántica directa (Adopciones, Publicar Mascota, Reportar Extravío, Eventos, Quiénes Somos, Donaciones, Padrinos y Tienda Solidaria).
     - En la tienda solidaria (`/tienda`), el indicador de carrito se rotula de forma unívoca ("Carrito: X artículos") junto al ícono de bolsa de compras.
  3. **Mapeo Natural (Filtros y Previsualizaciones Directas)**:
     - En `ToggleSwitch` (modal de filtros), distribución espacial `justify-between w-full` con el interruptor fijado al extremo derecho de la etiqueta que controla, reforzando la relación de causa y efecto.
     - En el formulario de reporte de extravío (`/reportar-extravio`), reemplazo espacial 1:1 del recuadro de subida de fotos (`h-64 sm:h-72 rounded-3xl`) por la previsualización a pantalla completa de la imagen real cargada, acompañada de controles sobreimpresos accesibles ("Cambiar Foto" y "Quitar"), evitando saltos de maquetación (CLS) y confirmando inmediatamente al rescatista la foto que la comunidad visualizará.
- **Consecuencias**:
  - Los usuarios comprenden al instante la interactividad sin recurrir a instrucciones de uso.
  - Eliminación de ambigüedades cognitivas en la navegación móvil.
  - Correspondencia espacial natural y visualización transparente del contenido subido.

---

## [ADR-010] · [2026-10-22 20:35] Leyes de Gestalt, Jerarquía Visual y Patrones de Lectura (Clase 4)

- **Estado**: Aceptado
- **Contexto**:
  Para transformar la experiencia de "Callejeros Río IV" en un sistema visualmente ordenado y de rápida asimilación cognitiva, se requería aplicar rigurosamente los principios de la **Clase 4: El Orden del Caos (Gestalt y Jerarquía Visual)**. Esto incluye principios de agrupamiento perceptual (Proximidad y Continuidad), jerarquía visual estricta (el Nombre como protagonista supremo), espacio negativo generoso (aire entre bloques) y patrones de escaneabilidad natural (patrón Z en portada y patrón F en guías informativas).
- **Decisión**:
  1. **Leyes de Gestalt (Proximidad y Continuidad)**:
     - **Proximidad en Formularios**: En `LoginPage`, `RegisterPage` y `ReportarExtravioPage`, las etiquetas `<label>` quedan íntimamente unidas a sus respectivos campos de entrada (`mb-1`), mientras que se aplican márgenes amplios (`space-y-6`) entre bloques de campos dispares, permitiendo al cerebro procesarlos como entidades independientes.
     - **Proximidad en Tarjetas**: En `PetCard`, el agrupamiento interno de datos (Nombre, Edad, Castración, Barrio y botón "Adoptar") se consolida mediante padding `p-4`, formando una unidad visual indivisible claramente diferenciada de las tarjetas vecinas.
     - **Continuidad en Carrusel**: En la sección de casos prioritarios del Home, se implementó en pantallas móviles un contenedor horizontal con `overflow-x-auto snap-x snap-mandatory pr-8` y tarjetas de ancho proporcional (`w-[76vw] max-w-[285px]`). La última tarjeta visible queda intencionalmente cortada a la mitad, activando la Ley de Continuidad y sugiriendo el gesto de deslizamiento horizontal (swipe tipo streaming/Netflix).
  2. **Jerarquía Visual (Tamaño, Contraste y Espacio Negativo)**:
     - **Escala Tipográfica (Tamaño)**: En la ficha de detalle de la mascota (`/adopciones/[id]`), el Nombre se entroniza como el rey visual (`text-3xl sm:text-4xl font-extrabold font-heading`), mientras que los atributos técnicos secundarios (tamaño, vacunación, edad, sexo) se sitúan en escala subordinada (`text-sm text-slate-500`).
     - **Contraste de Botones (Semejanza)**: Los botones principales de conversión adoptan un fondo naranja vibrante (`bg-orange-600 text-white`), mientras que las acciones secundarias o de descarte se estandarizan con estilo neutro/ghost (fondo sutil o transparente) para no competir visualmente ni dividir la atención.
     - **Espacio Negativo (Aire / Breathing Room)**: Se amplió la separación estructural del Home (`space-y-16 sm:space-y-24`, rellenos de sección de `py-10` a `py-14`), otorgando respiro entre el Hero, Carruseles, Grilla y Footer para erradicar la sensación de abarrotamiento.
  3. **Patrones de Lectura (Escaneabilidad Z y F)**:
     - **Patrón Z en Portada**: La cabecera y el Hero guían deliberadamente la mirada del usuario en trayectoria de Z: Logo en la esquina superior izquierda ➔ Botón Login/Perfil en la esquina superior derecha ➔ Diagonal a través del titular e imágenes del Hero ➔ Cierre en los botones de acción principal ("Explorar Mascotas" y "Reportar Mascota Perdida") en la base del bloque.
     - **Patrón F en Guías Informativas**: En `/adopcion-responsable` y la sección de misión vecinal, los requisitos se maquetaron con títulos fuertes alineados a la izquierda y viñetas que inician con palabras clave resaltadas en negrita (`<strong>`), permitiendo al usuario escanear los 4 pilares en segundos sin tropezar con bloques de texto denso.
- **Consecuencias**:
  - Eliminación de la sobrecarga cognitiva y mayor velocidad de asimilación de la información.
  - Navegación móvil natural e intuitiva impulsada por la Ley de Continuidad.
  - Jerarquía tipográfica indiscutible donde el animal rescatado es siempre el centro de atención.

---

## [ADR-011] · [2026-10-22 20:45] Estética Funcional: Lógica de Color, Escala Tipográfica y 5 Estados de Componentes (Clase 5)

- **Estado**: Aceptado
- **Contexto**:
  Siguiendo las directrices de la **Clase 5: Estética Funcional (Color, Tipografía y Componentes UI)**, la plataforma "Callejeros Río IV" requería consolidar un sistema de diseño estricto y cohesivo para eliminar discrepancias visuales, garantizar predictibilidad interactiva y transmitir los valores de rescate, urgencia moderada y empatía comunitaria.
- **Decisión**:
  1. **Lógica de Color y Psicología Semántica**:
     - **Primario (Naranja)**: Se estandariza `bg-orange-500` (`hover:bg-orange-600`) para las acciones principales de conversión (ej. "Adoptar a...", "Publicar Reporte de Extravío"), canalizando calidez, dinamismo y urgencia moderada de rescate.
     - **Secundario (Cian / Verde Agua)**: Se define `bg-teal-500` (`hover:bg-teal-600`) para acciones secundarias o de colaboración económica y voluntaria (ej. planes de padrinazgo, filtros secundarios).
     - **Semánticos (Feedback Visual Inmediato)**: Verde (`text-green-600`, `bg-green-100`, `ring-green-50`) para Modales y Toasts de éxito (`SuccessModal`), y Rojo (`text-red-600`, `bg-red-50`, `border-red-500`) para validaciones y errores de formulario (Danger).
  2. **Escala Tipográfica Estricta y Legibilidad**:
     - Tipografía Sans-serif dual configurada en `layout.tsx` (`Inter` para lectura y componentes de interfaz; `Poppins` para títulos e impacto visual).
     - Jerarquía modular estandarizada en `globals.css` y páginas:
       - **Título Principal (`h1`)**: `text-3xl font-bold font-heading` (~32px).
       - **Subtítulos (`h2`)**: `text-2xl font-semibold font-heading` (~24px).
       - **Cuerpo de Texto (Body)**: `text-base` (16px) con `leading-relaxed text-slate-700`.
       - **Texto Secundario (Caption)**: `text-xs text-slate-500` (12px) para metadatos, barrios y fechas.
  3. **Anatomía Viva de Componentes UI (5 Estados Obligatorios)**:
     - Se creó el componente canónico `src/components/ui/Button.tsx` y se sincronizaron las clases utilitarias globales (`.btn-primary`, `.btn-secondary`, `.btn-outline` en `globals.css`):
       1. **Default**: Fondo base semántico (`bg-orange-500 text-white`).
       2. **Hover**: Transición suave a tono más oscuro (`hover:bg-orange-600`).
       3. **Active**: Hundimiento táctil físico (`active:scale-95`).
       4. **Focus**: Anillo de accesibilidad contrastante (`focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none focus-visible:ring-offset-2`).
       5. **Disabled**: Bloqueo visual transparente (`disabled:opacity-50 disabled:cursor-not-allowed`).
     - Soporte completo para estados de carga (`isLoading` con spinner accesible y `aria-busy="true"`), íconos contextuales (`leftIcon`, `rightIcon`) y variantes semánticas (`primary`, `secondary`, `outline`, `ghost`, `danger`).
- **Consecuencias**:
  - Consistencia visual absoluta en todas las vistas de la aplicación.
  - Feedback táctil y visual inmediato en cada interacción del usuario, erradicando incertidumbres.
  - Accesibilidad WCAG AA garantizada tanto en contraste cromático como en navegación por teclado.

---

## [ADR-012] · [2026-10-22 20:55] Diseño Centrado en el Usuario (DCU): Arquetipos, Contexto Extremo y Prevención de Envíos Duplicados (Clase 6)

- **Estado**: Aceptado
- **Contexto**:
  Bajo los fundamentos de la **Clase 6: Diseñar para Humanos**, se requería diseñar para el contexto y los puntos de dolor de nuestras Personas, especialmente el **Rescatista Ocasional**, quien encuentra un animal en la vía pública, opera el dispositivo con una sola mano bajo luz solar directa (reflejos) y con posibles fluctuaciones de conectividad móvil en Río Cuarto. Asimismo, en la **Fase de Evaluación DCU**, se debía prevenir el "Problema del Alien" (usuarios impacientes presionando botones múltiples veces generando registros duplicados en SQLite).
- **Decisión**:
  1. **Contexto de Uso (El Rescatista Ocasional en Exteriores)**:
     - Touch targets gigantes de al menos `h-14` / `min-h-[56px]` en todos los campos de entrada, botones de acción y selectores de situación en formularios críticos.
     - Contraste reforzado en bordes (`border-2 border-slate-400 dark:border-slate-500`) y fondos puros (`bg-white dark:bg-slate-900`) para garantizar legibilidad inmediata bajo reflejos solares directos.
     - Tipografía de inputs fijada en `text-base` (16px) para evitar el zoom intrusivo automático de los navegadores móviles (iOS Safari / Android Chrome).
  2. **Puntos de Dolor y Esfuerzo (Foco Nuclear en la Fotografía)**:
     - En `/reportar-extravio`, el botón de subida de fotos se convirtió en el elemento visualmente más grande del formulario (`min-h-[290px] sm:min-h-[330px] border-3 border-dashed border-orange-400`), eliminando fricciones al ser el dato más crucial.
     - Apertura directa de la cámara trasera móvil mediante el atributo `capture="environment"`.
     - Previsualización 1:1 con controles táctiles gigantes (`min-h-[52px]`) para cambiar o remover la foto sin saltos de maquetación (CLS).
  3. **Fase de Evaluación DCU (Prevención de Errores - Problema del Alien)**:
     - Guard de idempotencia en todos los handlers de envío (`if (isSubmitting) return;`).
     - Estandarización del estado `isLoading` en el componente canónico `Button.tsx`: transición a `disabled`, atenuación visual `opacity-70 cursor-wait`, y cambio a indicador dinámico con spinner SVG animado y texto contextual explícito ("Publicando reporte...", "Iniciando sesión...", "Creando cuenta...").
- **Consecuencias**:
  - Operatividad ergonómica con una sola mano en la calle bajo cualquier condición lumínica.
  - Erradicación de registros huérfanos o duplicados en SQLite generados por ansiedad o mala señal.
  - Empatía técnica y confirmación visual inmediata del estado del sistema.

---

## [ADR-013] · [2026-10-22 21:05] Arquitectura de Información: Rotulado Empático (Labeling), Migas de Pan (Breadcrumbs) y Organización del Menú por Card Sorting (Clase 7)

- **Estado**: Aceptado
- **Contexto**:
  Bajo los fundamentos de la **Clase 7: Arquitectura de Información y Card Sorting**, la navegación y el contenido de "Callejeros Río IV" requerían sistematizar su taxonomía, eliminar etiquetas mecánicas o técnicas, dotar al usuario de orientación espacial permanente (breadcrumbs) y estructurar los enlaces del menú mediante una agrupación lógica resultante de Card Sorting simulado.
- **Decisión**:
  1. **Rotulado Orientado al Usuario (Labeling Empático)**:
     - Erradicación de terminología robótica o despersonalizada en toda la aplicación.
     - En el modal y controles de adopción, "Filtros de búsqueda" se transformó en "Encontrá a tu compañero".
     - En botones de envío, se emplean verbos cálidos orientados a la acción comunitaria ("Publicar Reporte de Extravío", "Publicar en Adopción", "Adoptar a [Nombre]") en vez de "Enviar Formulario".
     - En la barra de búsqueda de mascotas, se fijó el placeholder guiado: `placeholder="Buscar por nombre, barrio o raza..."`.
  2. **Sistemas de Navegación (Migas de Pan / Breadcrumbs)**:
     - Creación del componente canónico accesible `src/components/ui/Breadcrumbs.tsx` con marcado semántico `<nav aria-label="Migas de pan">`, lista ordenada `<ol>`, items `<li>` y `aria-current="page"`.
     - Integración en Detalle de Mascota (`/adopciones/[id]`: `Inicio > Adopciones > Perros/Gatos > [Nombre]`), en Tienda Solidaria (`/tienda`: `Inicio > Cómo Ayudar > Tienda Solidaria`), en Padrinos y en Guía de Adopción Responsable, permitiendo retroceder jerárquicamente con un solo tap sin recurrir al botón de atrás del navegador.
  3. **Organización del Menú (Card Sorting Simulado)**:
     - Reestructuración de los enlaces del Drawer lateral en 3 bloques lógicos cohesivos con encabezados, subtítulos explicativos y bordes separadores:
       - **Bloque 1: Acciones Principales** (Mascotas en Adopción, Publicar en Adopción, Reportar Extravío).
       - **Bloque 2: Cómo Ayudar** (Tienda Solidaria, Padrinos y Madrinas, Donaciones Económicas).
       - **Bloque 3: Nosotros y Comunidad** (Guía de Adopción Responsable, Quiénes Somos, Eventos Benéficos y Noticias).
       - **Bloque 4: Mi Perfil** (Crear Cuenta / Ingresar).
- **Consecuencias**:
  - Eliminación de la sobrecarga cognitiva al reducir un listado plano de 9 ítems a 3 categorías semánticas evidentes.
  - Claridad de ubicación ("¿dónde estoy y cómo vuelvo?") gracias a las migas de pan.
  - Lenguaje empático y humano que genera cercanía afectiva con adoptantes y donantes.

---

## [ADR-014] · [2026-10-22 22:10] Sistemas de Diseño: Diseño Atómico (Atomic Design) y Microinteracciones Fluidas con Smart Animate (Clase 9)

- **Estado**: Aceptado
- **Contexto**:
  Bajo los conceptos de la **Clase 9: Sistemas de Diseño, Diseño Atómico y Microinteracciones**, se requería estructurar y escalar el sistema de componentes de "Callejeros Río IV" aplicando la metodología de Diseño Atómico de Brad Frost y dotar a la interfaz de feedback visual inmediato y microinteracciones de alta fidelidad similares a Smart Animate de Figma.
- **Decisión**:
  1. **Reestructuración con Diseño Atómico**:
     - **`/atoms` (Átomos)**: Elementos indivisibles que encapsulan estilos base y tokens: `Button` (5 estados interactivos), `Input` (touch target gigante y alto contraste), `Label` (accesible), `Badge` (estados semánticos de mascotas), `ToggleSwitch` (Smart Animate) y `Breadcrumbs` (migas de pan).
     - **`/molecules` (Moléculas)**: Combinaciones funcionales de átomos: `PetCard` (consume `Badge` y `Button` con elevación física), `SearchBar` (consume `Input` con botón de limpieza y lupa), `AccordionItem` (consume rotación fluida y revelación).
     - **`/organisms` (Organismos)**: Estructuras complejas de interfaz: `Navbar` (consume `Button`, Drawer deslizante), `Footer` (enlaces y contacto comunitario), `PetGrid` (consume `PetCard` y gestiona Empty States), `FilterModal` (consume `SearchBar`, `ToggleSwitch` y `Button`), `SuccessModal` (confirmación emocional).
     - **Regla de Consumo Unidireccional**: Los organismos consumen moléculas y átomos; las moléculas consumen átomos; garantizando desacoplamiento, mantenibilidad y reusabilidad.
  2. **Microinteracciones y Feedback Visual**:
     - **Respuesta háptica y de elevación**: Botones y tarjetas implementan `transition-all duration-300 ease-in-out`, elevación `hover:-translate-y-1 hover:shadow-xl` y compresión táctil `active:scale-95`.
     - **Efecto Dissolve (Fade-in)**: Mensajes flotantes de error y confirmación en formularios de reporte mediante `animate-in fade-in duration-300 ease-out`.
     - **Efecto Slide in/out**: El menú lateral (Drawer) en mobile implementa `transition-transform duration-300 ease-in-out` (`translate-x-full` -> `translate-x-0`), y los modales deslizan suavemente desde los bordes (`slide-in-from-bottom duration-300`).
  3. **Componente ToggleSwitch (Smart Animate Translation)**:
     - Implementado en `src/components/atoms/ToggleSwitch.tsx` replicando con precisión la transición de Figma:
       - Estado Inactivo (Off): fondo gris neutro `bg-slate-300 dark:bg-slate-700`, thumb a la izquierda (`translate-x-0`), sombra interna sutil `shadow-inner`.
       - Estado Activo (On): fondo verde éxito `bg-green-500` (o primario `bg-orange-600`), thumb trasladado a la derecha (`translate-x-5`) con `transition-transform duration-300 ease-in-out`.
       - Cumplimiento WCAG AA: `role="switch"`, `aria-checked`, anillo visible `focus-visible:ring-2`.
- **Consecuencias**:
  - Arquitectura de componentes altamente predecible, escalable y modular.
  - Experiencia de usuario viva, receptiva y placentera sin latencias percibidas.
  - Eliminación de saltos bruscos en el DOM gracias a transiciones estandarizadas a 300ms.

---

## [ADR-015] · [2026-10-22 22:25] Auditoría Integral de UX Writing, Accesibilidad Digital (WCAG 2.1 AA/AAA) y Patrones de Interacción Inclusiva

- **Estado**: Aceptado
- **Contexto**:
  La plataforma requería elevar sus estándares de comunicación y accesibilidad universal:
  1. Erradicar copys mecánicos o robóticos ("Enviar", "Aceptar", "Buscar", "Campo obligatorio") adoptando la voz de marca en voseo argentino empático y orientado a la acción comunitaria.
  2. Cumplir con WCAG 2.1 AA (y criterios selectos AAA) garantizando contraste cromático de al menos 4.5:1 bajo luz solar extrema en smartphones, áreas de toque mínimas de 48px (`min-h-[48px]`), no dependencia exclusiva del color en estados de error/éxito, soporte robusto para lectores de pantalla (`aria-label`, `aria-describedby`, `role="status"`, `aria-live="polite"`) y prevención de auto-zoom en iOS Safari (`text-base`).
- **Decisión**:
  1. **UX Writing y Microcopys Funcionales**:
     - *Botones de Acción*: Reemplazo sistemático de "Enviar" o "Aceptar" por llamadas a la acción directas ("Publicar Alerta Comunitaria Ahora", "Aplicar filtros y ver compañeros", "Ir al Catálogo de Adopciones").
     - *Validación Humanizada*: Mensajes de error que orientan y explican el porqué ("Ingresá un teléfono con código de área para que los vecinos te contacten al instante si lo ven", "Escribí al menos 10 caracteres describiendo su tamaño o pelaje").
     - *Empty States Empáticos*: En el catálogo de adopciones, cuando no hay resultados, se ofrece contención positiva ("No encontramos ningún callejerito con esos filtros") con llamada constructiva ("Probá ajustando la búsqueda o sumate como hogar de tránsito").
     - *Modales Cálidos*: Mensajes de confirmación que agradecen la involucración del vecino ("¡Muchas gracias por involucrarte!").
  2. **Accesibilidad Digital WCAG 2.1 AA**:
     - *Contraste (WCAG 1.4.3)*: Reemplazo de tonos de bajo contraste como `text-slate-400` sobre fondos blancos por `text-slate-600` o `text-slate-700` (>5.5:1), garantizando visibilidad en la calle bajo luz solar.
     - *Target Size (WCAG 2.5.5 / 2.5.8)*: Establecimiento de `min-h-[48px]` o `min-h-[56px]` en todos los botones, selectores y enlaces de navegación móvil.
     - *Uso del Color (WCAG 1.4.1)*: Asociación de iconos semánticos (`AlertCircle`, `CheckCircle2`) a todos los mensajes de validación y estado, evitando comunicar información únicamente por el matiz cromático.
     - *Semántica y Accesibilidad (WCAG 4.1.2)*: Inclusión de `aria-label` descriptivos en botones de sólo icono (tema oscuro/claro, campana de alertas, menú hamburguesa, botón de cerrar modal).
     - *Prevención de Zoom Móvil*: Inputs con `text-base` (16px) como tamaño mínimo para evitar el zoom automático disruptivo de iOS/Android.
- **Consecuencias**:
  - Calidad de producto de grado senior y cumplimiento de normativas internacionales de accesibilidad.
  - Mayor tasa de conversión en reportes de extravío y adopciones gracias a la claridad y calidez del lenguaje.
  - Experiencia optimizada para usuarios con discapacidad visual o motriz, y para rescatistas operando en condiciones adversas en la vía pública.




