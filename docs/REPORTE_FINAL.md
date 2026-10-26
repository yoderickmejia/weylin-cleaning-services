# Reporte Final — Weylin Cleaning Services LLC

Sitio web completo construido desde cero. Next.js 16 (App Router, TypeScript) · Tailwind v4 · shadcn-style UI sobre Radix · GSAP (ScrollTrigger + SplitText) · Lenis · react-hook-form + zod · Resend · Docker.

---

## 1. Qué tomamos de la referencia (anghelscleanservices.com) y cómo lo superamos
- **Estructura/flujo:** mismo recorrido de conversión (hero → trust → services → recurring → why us → how it works → areas → testimonials → FAQ → CTA → footer) y el mismo set de páginas.
- **Formulario de cotización:** replicamos y ampliamos sus campos (incluyendo UTM ocultos y doble consentimiento SMS).
- **Mejoras claras:** identidad propia basada en el logo (violeta + cian "agua"), tipografía premium (Fraunces + Hanken Grotesk), animaciones refinadas (SplitText, reveals, marquee, pasos secuenciados), micro-interacciones, SEO local por ciudad con JSON-LD, barra flotante móvil de llamada, y rendimiento/accesibilidad medidos. Nada de look "builder" genérico.

## 2. Paleta (HEX) y fuentes
- **Violeta marca:** 50 `#f6f3fc` · 500 `#845fc9` (≈ logo) · **600 `#6e45b5` (acción)** · 900 `#3d2862`.
- **Acento agua:** 400 `#52c7de` · 500 `#22abc6` · 600 `#15889f`.
- **Neutros:** ink `#221b33` · ink-soft `#5e566e` · surface-soft `#faf8fe` · line `#e7e1f2`.
- **Fuentes:** Fraunces (display) + Hanken Grotesk (texto). Detalle en `docs/DESIGN_SYSTEM.md`.

## 3. Páginas y secciones creadas (10 páginas + API)
Home · Services · Recurring Cleaning · Service Areas · About · FAQ · Contact/Get a Quote · Join Our Team · Privacy Policy · Terms of Service · 404 personalizada. Rutas API: `/api/quote`, `/api/join`. Globales: top bar, header sticky + menú móvil (Sheet), footer completo, barra flotante de llamada móvil.

## 4. Textos que escribí yo (para aprobación del cliente)
**Todo el copy del sitio es original** (no había archivo de textos). Revisar especialmente:
- Hero: *"A spotless home, without lifting a finger."* + subtítulo.
- Descripciones y "what's included" de los 7 servicios + tagline de cada uno.
- "Why Weylin" (6 razones), "How It Works" (4 pasos), planes recurrentes (textos), stats.
- About (historia, valores, compromiso local).
- Blurbs SEO por ciudad (13) en Service Areas.
- 8 preguntas/respuestas de FAQ.
- Textos de Contact, Join Our Team (perks) y de consentimiento SMS.
- Plantillas legales (Privacy/Terms) — **requieren revisión de un abogado** (banner visible en cada página).
> Tagline oficial de marca tomada del material: *"Clean Spaces, Happier Lives."*

## 5. Supuestos y datos pendientes
- **Horario:** no se proporcionó → se muestra "By appointment — flexible scheduling 7 days a week". Reemplazar al confirmar.
- **Dominio:** placeholder `www.weylincleaningservices.com` (configurable con `NEXT_PUBLIC_SITE_URL`).
- **Alcance:** residencial **+ commercial** (confirmado).
- **Seguro:** se menciona "licensed NJ business; coverage on request" (confirmar texto exacto).

## 6. Mapeo de fotos por sección
Fuente: 5 fotos reales de la carpeta (procesadas a WebP+AVIF en `public/images/`). No se usó stock.
| Foto original | Procesada | Sección |
|---|---|---|
| (4) dormitorio | `hero-bedroom`, `hero-wide` | Hero (home), Recurring card |
| (2) sala luminosa | `living-room-bright`, `living-wide` | Standard Cleaning, Instagram grid, CTA band |
| (1) sala chimenea | `living-room-fireplace` | Move-In/Out, About (historia), Instagram grid |
| (3) baño | `bathroom` | Deep Cleaning, Instagram grid |
| (5) sala cálida | `living-room-cozy` | corregida (balance de blancos) — reserva/secundaria |
| (6) logo | `logo.png` (fondo transparente), `logo-512`, favicon, apple-icon, `og.png` | Header, footer, favicon, OG |
| **Nuevas (25-oct)** open-plan | `service-postconstruction` | Post-Construction Cleaning |
| **Nuevas (25-oct)** sala tan | `service-airbnb` | Airbnb & Short-Term Rental |
| **Nuevas (25-oct)** seccional | `service-commercial` | Commercial Cleaning |

Con las 3 fotos nuevas, **los 7 servicios ya tienen foto real** (se eliminaron las tarjetas de gradiente en Services). Mapeo sugerido — se puede intercambiar si prefieres otra asignación.

**Secciones que aún se beneficiarían de más fotos reales:** cocina en detalle, equipo trabajando, y **antes/después** (para activar un slider arrastrable).

**Ajustes móviles (25-oct):** el hero oculta su foto en teléfono (solo texto + CTAs, carga más rápida); la página Contact en móvil abre directamente en el formulario.

## 7. Testimonios
**No se fabricaron reseñas reales.** A pedido del cliente ("para aprobar el diseño, luego se cambian por reales") se incluyeron **3 tarjetas claramente marcadas como SAMPLE** con avatares de monograma (iniciales, sin caras inventadas) en `src/lib/testimonials.ts`. Antes de publicar: sustituir por reseñas verificables **o** poner `TESTIMONIALS_ENABLED = false`. Motivo documentado: la FTC (16 CFR Part 465) prohíbe reseñas falsas presentadas como reales.

## 8. Animaciones y dónde
- **Lenis** smooth scroll global + scroll suave en anclas.
- **SplitText** en el H1 del hero (wave por palabra, LCP-safe) + entrada escalonada de subtítulo/CTAs/imagen/cards.
- **Reveals** al scroll con stagger en todas las grids (servicios, why-us, planes, áreas, etc.).
- **How It Works:** pasos secuenciados + línea de progreso animada.
- **Service Areas:** marquee continuo (pausa en hover, respeta reduced-motion).
- **Micro-interacciones:** hover en cards/botones/menú, acordeón FAQ, estados de formulario.
- Solo `transform`/`opacity`; sin bounce/elastic; `prefers-reduced-motion` fuerza contenido visible.

## 9. Fase 5 — Formulario de cotización
- Campos: First*, Last, Phone*, Email*, ZIP*, City (13 + Other)*, Type*, Bedrooms*, Bathrooms*, Sq ft, Frequency, Preferred date, Notes.
- **Dos checkboxes de consentimiento SMS separados y opcionales** (transaccional + promocional), con texto A2P 10DLC/TCPA (STOP/HELP, "consent is not a condition of purchase") + aviso de Privacy/Terms.
- **UTM ocultos** (source/medium/campaign/content/term) + referrer + page, auto-rellenados desde la URL.
- Validación RHF + zod, honeypot anti-spam, estados de carga/éxito/error. Mismo backend para **Join Our Team**.
- **Email:** Resend vía `.env`; sin API key → **modo log** documentado (no se pierde el lead).

## 10. Decisiones propias (resumen de DECISIONS.md)
Proyecto en la raíz (originales intactos); assets procesados a `public/images/` con nombres kebab-case; logo transparente generado por flood-fill de bordes; el banner morado de marca se usó solo como fuente de servicios/tono; `cacheComponents` desactivado para un build estático estable.

## 11. Build, QA y Lighthouse
- `npm run build` ✅ · `npm run lint` ✅ (0 errores) · `tsc --noEmit` ✅.
- **Lighthouse móvil — Home:** Performance **91**, Accessibility **100**, Best Practices **100**, SEO **100**.
- **Lighthouse móvil — Contact:** Performance **99**, Accessibility **96**, Best Practices **96**, SEO **100**.
- Responsive verificado por capturas en 390 / 768 / 1440 px (sin overflow/solapamientos). CLS 0.
- Links `tel:`/`mailto:`/Instagram/anclas verificados.

## 12. Cómo correrlo
**Local (dev):**
```bash
cp .env.example .env.local   # opcional: añade RESEND_API_KEY
npm install --legacy-peer-deps
npm run dev                  # http://localhost:3000
```
**Producción local:** `npm run build && npm run start`

**Docker:**
```bash
cp .env.example .env         # funciona en modo log sin API key
docker compose up --build    # http://localhost:3000
```
Dockerfile multi-stage (node:22-alpine, output standalone, usuario no-root, HEALTHCHECK); compose con `restart: unless-stopped`, `env_file`, healthcheck, puerto 3000.

## 13. Pendientes para el cliente
1. **Proveedor de email:** añadir `RESEND_API_KEY` + verificar dominio en Resend (o cambiar a SMTP).
2. **Revisión legal** de Privacy Policy y Terms of Service (plantillas marcadas).
3. **Horario** real de atención.
4. **Reseñas reales** → reemplazar los SAMPLE (o ocultar).
5. **Dominio** final → `NEXT_PUBLIC_SITE_URL`.
6. (Opcional) Más fotos para las secciones indicadas en el punto 6.
