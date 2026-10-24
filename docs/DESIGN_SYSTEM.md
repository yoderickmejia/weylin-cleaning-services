# Design System — Weylin Cleaning Services LLC

Derived from the brand logo (violet ~`#8060C0` sampled directly) and refined into a
premium, "fresh/clean" system: sophisticated violet + a water-cyan accent + soft
lavender-tinted neutrals. Deliberately avoids the cliché purple→blue gradient and
"AI-slop" look. Tokens live in `src/app/globals.css` (Tailwind v4 `@theme` + CSS vars)
and are consumed via shadcn-style semantic tokens.

## Color palette

### Brand violet (anchored on the logo)
| Token | HEX | Use |
|---|---|---|
| brand-50 | `#f6f3fc` | Soft icon chips, hovers |
| brand-100 | `#ece6f9` | Rings, subtle borders |
| brand-200 | `#d7cbf2` | Accents on dark |
| brand-300 | `#bba6e7` | — |
| brand-400 | `#9e80d9` | Focus ring |
| brand-500 | `#845fc9` | Brand (≈ logo) |
| **brand-600** | `#6e45b5` | **Primary actions** (AA on white) |
| brand-700 | `#5a3896` | Hover / links / headings accent |
| brand-800 | `#4a2f7a` | — |
| brand-900 | `#3d2862` | Footer / dark sections |
| brand-950 | `#271842` | Deepest ink/overlays |

### Water / cyan accent (freshness)
`water-100 #e2f7fb · 200 #bfeef5 · 300 #8fe0ee · 400 #52c7de · 500 #22abc6 · 600 #15889f · 700 #166b7e`
Used for small accents, checkmarks, "most popular" badge, decorative glows. Not used for body text.

### Neutrals (subtle violet tint)
`surface #ffffff · surface-soft #faf8fe · surface-muted #f3f0fa · ink #221b33 · ink-soft #5e566e · line #e7e1f2 · line-strong #d6cee8`

**Contrast:** body `#221b33` on white ≈ 15:1; primary button `#6e45b5` + white text passes WCAG AA. Verified Accessibility = 100 (home) / 96 (contact) in Lighthouse.

## Typography
- **Display / headings:** **Fraunces** (variable, optical size axis) — warm, premium soft-serif. `--font-display`.
- **Body / UI:** **Hanken Grotesk** (400–700) — clean, humanist grotesque. `--font-sans`.
- Loaded via `next/font/google` (self-hosted, `display: swap`, no layout shift → CLS 0).
- Headings use `-0.015em` tracking, weight 500; fluid sizes via Tailwind responsive steps.

## Radius / shape
`--radius: 0.9rem` base → `sm/md/lg/xl/2xl` scale. Cards use `rounded-2xl`/`rounded-3xl`; buttons & chips are fully rounded (`rounded-full`).

## Elevation (shadows)
Violet-tinted, soft: `--shadow-xs/sm/md/lg` built on `hsl(262 40% 30%)` for a cohesive tint instead of neutral grey.

## Signature utilities
- `.bg-aurora` — soft radial lavender+cyan wash for hero/page headers.
- `.bg-brand-wash` — deep violet gradient + cyan glow for footer, CTA band, featured cards.
- `[data-reveal]` / reveal system — progressive-enhancement scroll reveals (GSAP), with `prefers-reduced-motion` fallback that forces content visible.

## Components (shadcn-style, hand-built on Radix)
Button (6 variants), Input, Textarea, Label, Select, Checkbox, Accordion, Sheet (mobile menu), Section/Container/Eyebrow/SectionHeading, Field (form), ConsentCheckbox.

## Motion language
Smooth scroll (Lenis) · hero SplitText word-wave (LCP-safe, transform-only) · scroll reveals with gentle stagger · sequenced "How It Works" with animated progress line · service-areas marquee · hover micro-interactions. No bounce/elastic; only `transform`/`opacity`; honors reduced-motion.
