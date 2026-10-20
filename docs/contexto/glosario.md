# Glosario, Arquetipos y Lenguaje Ubicuo - Callejeros Río IV

Este documento establece el lenguaje de dominio compartido, los perfiles de usuario y las reglas de rotulado (labeling) para mantener coherencia semántica en código, bases de datos y la interfaz de usuario.

---

## 1. Términos Fundamentales del Dominio

- **Mascotas en Adopción**: Animales (perros y gatos) rescatados de la vía pública o acogidos temporalmente que buscan una familia responsable definitiva en la ciudad de Río Cuarto.
- **Extravíos**: Reportes emitidos con urgencia por vecinos sobre mascotas perdidas (con dueño buscando) o avistamientos de animales desorientados en la vía pública (con datos de barrio y foto).
- **Padrinos y Madrinas**: Vecinos y colaboradores que no pueden adoptar físicamente en su hogar (por razones de espacio, tiempo o contrato de alquiler) pero financian tratamientos veterinarios, alimento o castraciones mediante aportes mensuales.
- **Tienda Solidaria**: Módulo de e-commerce comunitario donde se adquieren productos (placas identificatorias, correas, accesorios, merchandising), cuyos fondos netos se destinan 100% a la atención y rescate de animales locales.
- **Eventos Benéficos**: Jornadas públicas de adopción en plazas (como Parque Sarmiento o Plaza Roca), colectas de alimento y campañas de vacunación comunitaria.
- **Hogar de Tránsito**: Domicilio temporal donde una mascota permanece resguardada mientras se procesa su adopción definitiva o el reencuentro con su dueño.

---

## 2. Arquetipos de Usuario ("Personas") y Puntos de Dolor

### 👤 Persona 1: El Rescatista Ocasional
- **Contexto**: Vecino de Río Cuarto que encuentra a un animal lastimado o perdido en la calle (frecuentemente en avenidas transitadas, Parque Sarmiento o zonas periféricas).
- **Punto de Dolor Principal**: Se encuentra en la vía pública, con batería baja o datos móviles inestables. Requiere un formulario de reporte extremadamente simple, rápido y con carga liviana de fotografía. Si la pantalla es lenta o pide demasiados datos, cancela el reporte.
- **Respuesta de Diseño**: Formulario de 4 campos clave, subida optimizada de foto y confirmación visual inmediata mediante Modal/Toast verde sin recarga de página.

### 👤 Persona 2: La Familia Adoptante
- **Contexto**: Familia o persona que desea sumar responsablemente un animal a su hogar.
- **Punto de Dolor Principal**: Los grupos de redes sociales suelen tener publicaciones obsoletas, confusas o desactualizadas (contactan por un animal que ya fue adoptado semanas atrás).
- **Respuesta de Diseño**: Catálogo web centralizado y actualizado en tiempo real, con filtros inmediatos por tamaño (pequeño/mediano/grande), edad y compatibilidad de convivencia con niños y otros animales.

### 👤 Persona 3: El Colaborador / Padrino
- **Contexto**: Persona sensibilizada con la problemática de los perros callejeros que desea ayudar pero no cuenta con espacio físico para adoptar.
- **Punto de Dolor Principal**: Desconfianza o pasos engorrosos en las vías de donación tradicionales.
- **Respuesta de Diseño**: Módulo de Padrinazgo y Tienda Solidaria claro, transparente y de mínima fricción para realizar donaciones o comprar productos solidarios.

---

## 3. Tabla de Rotulado Orientado al Usuario (Labeling Natural vs Dev Jargon)

En la interfaz de usuario queda terminantemente prohibido utilizar jerga técnica de desarrollo o base de datos. Se debe emplear siempre el lenguaje empático y natural:

| Jerga Técnica / Dev Jargon (PROHIBIDO) | Rótulo Oficial de Usuario (MANDATORIO) | Contexto y Justificación UX |
| :--- | :--- | :--- |
| `CRUD Records / Entidades` | **Mascotas en Adopción** | Centrado en el ser vivo y la causa, no en la base de datos |
| `Crear Ticket / Submit Loss Form` | **Reportar Extravío** | Directo, claro y compresible para cualquier vecino |
| `Donantes / Suscriptores Recurrentes` | **Padrinos y Madrinas** | Genera calidez emocional y sentido de pertenencia |
| `E-commerce / Store / Products` | **Tienda Solidaria** | Refuerza el fin benéfico de cada adquisición |
| `Submit / Enviar Formulario` | **Reportar** / **Adoptar** / **Ayudar** | Verbo de acción contextualmente relevante |
| `Post Feed / Noticias` | **Eventos Benéficos** | Enfatiza la participación presencial comunitaria |
| `Item Detail View / Ver Registro` | **Conocer a [Nombre]** | Humaniza a la mascota y fomenta el vínculo afectivo |
| `Add to Cart / Cart Action` | **Añadir al Carrito** | Estándar universal de usabilidad en compras |
| `Error 500 / Network Error` | **"No pudimos enviar tu reporte. Revisá tu conexión e intentá de nuevo."** | Mensaje empático, explicativo y con solución de acción |
| `Success 200 OK` | **"Reporte publicado con éxito. ¡Gracias por ayudar!"** | Gratificación y reconocimiento al esfuerzo del usuario |
