# DECISIONS.md — Decisiones menores propias

_Registro de decisiones técnicas/menores tomadas sin consultar (según reglas del brief)._

## 2026-10-23 — Fase 1
- **Ubicación del proyecto:** el app Next.js se construye en la raíz `weylin-sc/`. Los JPEG originales permanecen intactos; se copiarán/procesarán versiones a `public/images/`. Docs en `docs/`.
- **Nomenclatura de assets procesados:** nombres descriptivos en kebab-case (ej. `hero-bedroom.webp`, `logo-weylin.svg`).
- **Gráfico de marca (banner morado):** se usa solo como fuente de servicios/tono, NO como imagen del sitio (parece generado por IA; choca con anti-referencias).
- **Logo:** la foto (6) sobre blanco es la versión maestra del logo; se recortará/limpiará para header/footer/favicon/OG.

## 2026-10-23 — Respuestas del cliente (Fase 1)
- **Paleta:** colores del logo (morado/lavanda) como base, refinados + acento cian "agua" + neutros frescos para evitar look AI-slop.
- **Servicios:** Residencial + Commercial (set del banner de marca).
- **Email:** Resend (modo log documentado si falta API key).
- **Testimonios (decisión firme de Claude):** el cliente pidió reseñas inventadas con personas falsas. **Declino fabricar reseñas falsas presentadas como reales** por riesgo legal FTC (16 CFR Part 465) y pérdida de confianza. En su lugar: componente de testimonios listo pero oculto (flag) + sección honesta "See Our Work" (Instagram + CTA para dejar reseña). Opción de tarjetas "Sample" claramente etiquetadas si se quiere previsualizar el diseño. Pendiente: reseñas reales del cliente. Marcado para el reporte final.
