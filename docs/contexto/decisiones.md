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

