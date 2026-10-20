---
name: sdd-workflow
description: Protocolo de Spec-Driven Development (SDD) para Callejeros Río IV. Fases estructuradas para tareas de más de 2 archivos (Explore, Propose, Tasks, Apply, Verify) y estándares de commits atómicos orientados a resultados.
---

# Skill: SDD Workflow & Commits de Unidades de Trabajo

Esta skill rige el ciclo de desarrollo estructurado cuando se abordan funcionalidades o refactors que impactan más de dos archivos en el proyecto.

---

## 1. El Ciclo SDD de 5 Pasos

```text
[ 1. Explore ] ➔ [ 2. Propose ] ➔ [ 3. Tasks ] ➔ [ 4. Apply ] ➔ [ 5. Verify ]
```

1. **`explore`**: Leer e inspeccionar el código existente, dependencias y reglas en `docs/contexto/`. Prohibido modificar código prematuramente en esta fase.
2. **`propose`**: Formular la solución técnica explicando el **Why** (impacto en usuario y producto) antes del **How** (arquitectura y componentes).
3. **`tasks`**: Desglosar la implementación en tareas atómicas, secuenciales y ordenadas por capas (esquema Prisma -> servicios/actions -> componentes UI).
4. **`apply`**: Ejecutar los cambios paso a paso garantizando TypeScript estricto, responsive mobile-first y los 5 estados de interacción.
5. **`verify`**: Validar tipos sin errores, probar contrastes WCAG AA y confirmar que se cumpla la Definition of Done (DoD).

---

## 2. Commits de Unidades de Trabajo (Work-Unit Commits)

Cada commit debe ser atómico, autónomo y describir el resultado funcional o de producto en lugar de listar archivos modificados:

- **Bueno**: `feat(adopciones): implementar PetCard con badge de urgencia y ratio 1:1`
- **Bueno**: `fix(layout): eliminar desborde horizontal en vista móvil en < 375px`
- **Malo**: `wip: cambios varios`
- **Malo**: `update PetCard.tsx and page.tsx`
