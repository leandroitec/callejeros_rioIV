# Errores Conocidos, Gotchas y Soluciones - Callejeros Río IV

Este documento reúne las trampas frecuentes de desarrollo, maquetado y colaboración en Git que el equipo de 4 personas debe conocer y prevenir activamente.

---

## 1. ⚠️ GOTCHA-001: Conflictos Binarios en Git por Archivos de Base de Datos SQLite

- **Síntoma / Problema**:
  Conflictos de merge irresolubles en GitHub, corrupción de la base de datos local o sobreescritura accidental de datos entre los 4 compañeros de equipo al hacer `git pull` o `git merge`.
- **Causa Raíz**:
  SQLite almacena toda la información relacional en archivos binarios locales en el disco (`dev.db`, `dev.db-journal`, `prisma/*.db`). Cuando estos archivos se suben a Git, este no puede fusionar diferencias línea por línea como en texto plano, provocando colisiones binarias bloqueantes.
- **Solución y Prevención Obligatoria**:
  1. Configurar de inmediato en el `.gitignore` del proyecto las siguientes reglas de exclusión:
     ```gitignore
     # SQLite local databases
     *.db
     *.db-journal
     *.sqlite
     *.sqlite3
     prisma/*.db
     prisma/*.db-journal
     ```
  2. Sincronizar los cambios de base de datos **únicamente a través de las migraciones de Prisma** (`prisma/migrations/`) que sí son texto plano estructurado.
  3. Cada desarrollador reconstruye y puebla su base de datos local en su propia máquina corriendo:
     ```bash
     npx prisma migrate dev
     npx prisma db seed
     ```

---

## 2. ⚠️ GOTCHA-002: Omisión del Atributo `alt` Descriptivo en `Next/Image`

- **Síntoma / Problema**:
  Advertencias de compilación en Next.js, penalizaciones en auditorías de accesibilidad (Lighthouse Accessibility < 100) y, fundamentalmente, exclusión de personas no videntes o con disminución visual que utilizan lectores de pantalla (NVDA, VoiceOver).
- **Causa Raíz**:
  El componente `<Image />` de Next.js exige la propiedad `alt`. Usar textos genéricos como `alt="imagen"`, `alt="foto"` o dejarlo vacío (`alt=""`) en imágenes de contenido incumple la pauta WCAG 1.1.1 (Non-text Content).
- **Solución y Prevención Obligatoria**:
  1. Escribir siempre un texto alternativo dinámico, contextual y descriptivo:
     ```tsx
     // Correcto para fichas de mascotas:
     <Image
       src={pet.imageUrl}
       alt={`Fotografía de ${pet.name}, ${pet.species.toLowerCase()} de tamaño ${pet.size.toLowerCase()} en adopción responsable`}
       width={400}
       height={400}
       className="aspect-square object-cover rounded-t-xl"
     />
     ```
  2. En imágenes puramente decorativas (fondos ornamentales, huellas decorativas), se debe declarar explícitamente:
     ```tsx
     <Image src="/icons/paw-deco.svg" alt="" aria-hidden="true" width={24} height={24} />
     ```

---

## 3. ⚠️ GOTCHA-003: Desborde Horizontal (`overflow-x`) en Dispositivos Móviles con Tailwind

- **Síntoma / Problema**:
  La página web se desplaza lateralmente en teléfonos celulares, rompiendo la experiencia de usuario y generando franjas blancas o vacías a la derecha de la pantalla.
- **Causa Raíz**:
  - Declaración de elementos con anchos absolutos rígidos mayores a `320px` (ej. `w-[360px]` o `w-[400px]`).
  - Uso indebido de la clase `w-screen`, que calcula el ancho de pantalla incluyendo el área de la barra de scroll vertical, agregando entre 12px y 17px de desborde.
  - Márgenes negativos (`-mx-4` o `-mx-6`) aplicados en contenedores sin un contenedor padre con `overflow-hidden`.
- **Solución y Prevención Obligatoria**:
  1. En el contenedor raíz de `layout.tsx` o en los bloques principales de sección, blindar el layout con:
     ```tsx
     <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
       <Navbar />
       <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {children}
       </main>
       <Footer />
     </div>
     ```
  2. Reemplazar cualquier instancia de `w-screen` por `w-full`.
  3. Comprobar siempre el maquetado en DevTools simulando pantallas de `320px` (iPhone SE).

---

## 4. ⚠️ GOTCHA-004: Errores de Hidratación (Hydration Mismatch Servidor / Cliente)

- **Síntoma / Problema**:
  Error en consola del navegador durante el renderizado inicial: *"Hydration failed because the initial UI does not match what was rendered on the server"*.
- **Causa Raíz**:
  Discrepancias entre el HTML generado en el servidor por SSR y el renderizado inicial de React en el navegador cliente (típico al renderizar fechas locales con `Date.now()` o `new Date().toLocaleDateString()` sin zona horaria fija, o al alternar entre Dark y Light Mode leyendo `localStorage` antes del montaje).
- **Solución y Prevención Obligatoria**:
  - Utilizar `suppressHydrationWarning` en la etiqueta `<html>` si se utiliza un ThemeProvider (ej. `next-themes`).
  - Para valores dependientes del cliente o del navegador, encapsularlos en un componente cliente que confirme su montaje (`const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), []);`).

---

## 5. ⚠️ GOTCHA-005: Host de Imágenes Remotas No Configurado en `Next/Image` (`next-image-unconfigured-host`)

- **Síntoma / Problema**:
  Unhandled Runtime Error en tiempo de ejecución:
  `Error: Invalid src prop (...) on next/image, hostname "images.unsplash.com" is not configured under images in your next.config.js`.
- **Causa Raíz**:
  Por motivos de seguridad y optimización automática de imágenes (evitar abusos de ancho de banda y ataques de redirección maliciosa), Next.js bloquea por defecto cualquier dominio externo en el componente `<Image />` que no haya sido declarado explícitamente en el archivo de configuración.
- **Solución y Prevención Obligatoria**:
  1. Configurar los dominios permitidos en `next.config.mjs` bajo `images.remotePatterns`:
     ```javascript
     /** @type {import('next').NextConfig} */
     const nextConfig = {
       images: {
         remotePatterns: [
           {
             protocol: 'https',
             hostname: 'images.unsplash.com',
             pathname: '/**',
           },
         ],
       },
     };

     export default nextConfig;
     ```
  2. Si el servidor de desarrollo (`next dev`) ya estaba corriendo, reiniciarlo para que cargue la nueva configuración de `next.config.mjs`.

