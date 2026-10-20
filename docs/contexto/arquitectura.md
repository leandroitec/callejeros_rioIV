# Arquitectura del Sistema - Callejeros Río IV

---

## 1. Visión General y Propósito del Sistema
**Callejeros Río IV** es una solución web full-stack diseñada como red comunitaria de adopción responsable y alerta temprana de mascotas perdidas, geolocalizada en los barrios de la ciudad de Río Cuarto (Córdoba, Argentina).

### Problema que resuelve:
- Sobrepoblación y vulnerabilidad de animales en situación de calle en áreas críticas de Río Cuarto (Parque Sarmiento, plazas céntricas, ribera del río).
- Saturación crítica de los refugios locales y ausencia de una plataforma centralizada y actualizada en tiempo real.
- Falta de un canal rápido para que vecinos reporten mascotas perdidas o avistamientos desde su celular en la vía pública.

---

## 2. Tech Stack Mandatorio

- **Framework**: **Next.js (App Router)** en modo TypeScript estricto.
  - **React Server Components (RSC)**: Carga inicial de datos, renderizado de catálogo de mascotas y optimización SEO por defecto.
  - **Client Components (`'use client'`)**: Aislados estrictamente en hojas interactivas del árbol DOM (filtros facetados, modales de confirmación, toasts y formularios reactivos).
- **Estilos**: **Tailwind CSS**.
  - Enfoque *mobile-first* nativo.
  - Paleta semántica calibrada para Light y Dark Mode con contraste accesible WCAG AA.
- **Base de Datos & ORM**: **SQLite local** administrado mediante **Prisma ORM**.
  - Migraciones declarativas versionadas en código.
  - Cliente Prisma fuertemente tipado para operaciones seguras.

---

## 3. Relación con los Frames del Prototipo en Figma

La arquitectura del sistema mapea de manera directa y fidedigna las pantallas y componentes definidos en el prototipo de Figma:

| Frame de Figma | Componente / Ruta Next.js | Responsabilidad Arquitectónica | Modo de Render |
| :--- | :--- | :--- | :--- |
| **Frame 1: Barra de Navegación** | `components/layout/Navbar.tsx` | Barra fija superior con logo, enlaces principales, selector de tema y acceso a Login/Registro. Menú hamburguesa accesible en móvil. | Client Component (`'use client'`) |
| **Frame 2: Portada (Hero)** | `app/page.tsx` (`HeroSection.tsx`) | Presentación del propósito comunitario con dos Call-to-Actions (CTAs) de alto impacto: *"Reportar Mascota"* y *"Ver Adopciones"*. | Server Component (RSC) |
| **Frame 3: Grilla de Mascotas y Filtros** | `app/adopciones/page.tsx` + `PetGrid.tsx` | Catálogo de animales (*En Adopción*, *Extravíos*, *Urgentes*) con barra de filtros facetados (especie, tamaño, edad, convivencia con niños). | Híbrido: RSC para fetch inicial + Client para filtrado |
| **Frame 4: Tarjeta de Mascota (`PetCard`)** | `components/cards/PetCard.tsx` | Tarjeta modular con foto cuadrada 1:1, badge de estado flotante, datos rápidos y botón accesible *"Conocer a [Nombre]"*. | Server Component con botón interactivo |
| **Frame 5: Módulo Padrinos y Tienda** | `app/padrinos/page.tsx` + `app/tienda/page.tsx` | Catálogo solidario y suscripción de padrinazgo para colaborar sin adoptar físicamente. | Server Component (RSC) |
| **Frame 6: Formulario de Reporte & Modales** | `app/reportar-extravio/page.tsx` + `ReportModal.tsx` | Formulario ágil para móvil con subida de imagen y confirmación asíncrona mediante Modal o Toast verde sin recarga de página. | Client Component (`'use client'`) |
| **Frame 7: Pie de Página (Footer)** | `components/layout/Footer.tsx` | Enlaces a preguntas frecuentes (FAQs), canales de contacto directo y redes comunitarias. | Server Component (RSC) |

---

## 4. Estructura de Directorios del Proyecto

```text
CallejerosRioIV/
├── .agents/
│   ├── rules/
│   │   └── antigravity_rules.md      # Reglas mandatorias always_on (Gentle-AI)
│   └── skills/                       # Skills podadas: tailwind, a11y, dom, sdd
├── docs/
│   └── contexto/                     # Master Context: 6 documentos vivos
│       ├── arquitectura.md
│       ├── convenciones.md
│       ├── decisiones.md
│       ├── glosario.md
│       ├── flujo-de-trabajo.md
│       └── errores-conocidos.md
├── prisma/
│   ├── schema.prisma                 # Definición de modelos Pet y Report
│   ├── seed.ts                       # Fixtures con datos de muestra
│   └── dev.db                        # Base SQLite local (EXCLUIDA de Git)
├── public/
│   └── images/                       # Recursos gráficos estáticos y avatares
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Layout raíz con Navbar, Footer y Providers
│   │   ├── page.tsx                  # Home: Hero + Mascotas destacadas
│   │   ├── adopciones/
│   │   │   ├── page.tsx              # Catálogo completo con filtros
│   │   │   └── [id]/page.tsx         # Ficha individual de la mascota
│   │   ├── reportar-extravio/
│   │   │   └── page.tsx              # Formulario mobile-first de reporte
│   │   ├── padrinos/
│   │   │   └── page.tsx              # Módulo de colaboradores y donaciones
│   │   ├── tienda/
│   │   │   └── page.tsx              # Tienda solidaria
│   │   └── api/                      # Route handlers o Server Actions
│   ├── components/
│   │   ├── ui/                       # Button, Badge, Modal, Toast, Input
│   │   ├── layout/                   # Navbar, Footer, MobileNav
│   │   └── cards/                    # PetCard, ProductCard
│   ├── lib/
│   │   └── prisma.ts                 # Cliente Prisma (Singleton)
│   └── types/                        # Tipado e interfaces TypeScript estrictas
```

---

## 5. Esquema de Datos Relacional (Prisma / SQLite)

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Pet {
  id           String      @id @default(uuid())
  name         String
  status       String      // "EN_ADOPCION" | "PERDIDO" | "URGENTE" | "ADOPTADO"
  species      String      // "PERRO" | "GATO"
  ageCategory  String      // "CACHORRO" | "JOVEN" | "ADULTO" | "SENIOR"
  ageApprox    String?     // Ej: "2 años", "4 meses"
  size         String      // "PEQUEÑO" | "MEDIANO" | "GRANDE"
  goodWithKids Boolean     @default(true)
  goodWithPets Boolean     @default(true)
  location     String      // Barrio de Río Cuarto (ej: "Parque Sarmiento")
  description  String
  imageUrl     String
  isCastrated  Boolean     @default(false)
  isVaccinated Boolean     @default(false)
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
  reports      Report[]
}

model Report {
  id           String      @id @default(uuid())
  petId        String?
  pet          Pet?        @relation(fields: [petId], references: [id])
  type         String      // "EXTRAVIO" | "AVISTAMIENTO"
  contactName  String
  contactPhone String
  neighborhood String      // Barrio de Río Cuarto
  description  String
  imageUrl     String?
  resolved     Boolean     @default(false)
  createdAt    DateTime    @default(now())
}
```

---

## 6. LÍMITES ARQUITECTÓNICOS EXPLÍCITOS (QUÉ NO EXISTE)

Para asegurar el éxito, la simplicidad (KISS) y el foco de entrega del equipo de 4 personas, se definen taxativamente las siguientes prohibiciones técnicas:

1. ⛔ **NO USAR BASES DE DATOS EN LA NUBE (Firebase, Supabase, AWS DynamoDB, MongoDB Atlas)**:
   - Todo opera localmente en SQLite mediante Prisma. Prohibida cualquier dependencia de red externa, credenciales en la nube o facturación remota para la persistencia de datos.
2. ⛔ **NO USAR GESTORES DE ESTADO COMPLEJOS (Redux, Redux Toolkit, MobX, Zustand)**:
   - Toda la reactividad de la aplicación se resuelve mediante estado local de React (`useState`, `useReducer`, `useContext`) y las capacidades nativas de caché y revalidación de Next.js (`Server Actions` y `revalidatePath`).
3. ⛔ **NO REALIZAR RECARGAS DE PÁGINA COMPLETAS EN FORMULARIOS**:
   - Todo formulario (reportes, filtros, suscripciones) procesa su lógica de forma asíncrona en el cliente, proveyendo retroalimentación visual inmediata (Modal / Toast).
4. ⛔ **NO DISPERSAR DOCUMENTACIÓN FUERA DE `docs/contexto/`**:
   - Toda regla de negocio, modelo y decisión reside exclusivamente en esta carpeta centralizada.
