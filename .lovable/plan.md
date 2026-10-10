# SmartMoves Abusaki Group Limited — Corporate Website

Rebuild the current project into a complete, production-ready corporate website per the uploaded master brief, using the supplied configuration (domain smartmovesabusaki.co.ke, smda.official@outlook.com, +254 798761036, Nairobi, Kenya).

## Design system
- Semantic tokens in index.css + tailwind.config: navy #0B2347 (primary/headings/footer), forest green #0B5D3B (actions/accents), gold #C9A23F (sparingly, highlights), white + off-white #F7F8F5 backgrounds, charcoal #202938 text, slate #667085 secondary, #E4E7EC borders.
- Manrope (headings) + Inter (body) via Google Fonts; consistent type scale, spacing, radii, subtle shadows.
- Clean SVG logo concept (interlocking S+M, upward bars, gold arc, wordmark) in header, footer, favicon — easy to swap for the final file later.
- No gradients/glassmorphism excess, no autoplay video, no fake stats/testimonials.

## Pages (React Router)
1. **Home `/`** — sticky accessible header (logo, nav, "Work With Us"), hero with supplied copy + original SVG network visual, company intro, four business-division cards, "Our Brands & Business Activities" (SMDA + SmartMoves Books, data-driven), four approach principles, who-we-work-with, collaboration CTA, full footer.
2. **About `/about`** — who we are, vision, mission, core values, business philosophy, accurate group-structure explanation.
3. **Businesses `/businesses`** — four divisions with services, audiences, CTAs, status fields (Active/Developing/Planned), plus reusable service-detail sections.
4. **SmartMoves Books `/smartmoves-books`** — publishing intro, resource categories, enquiry CTAs, future-ready catalogue structure (no invented titles/prices).
5. **Workshops `/workshops`** — themes, audiences, formats, training-enquiry form, honest "no scheduled sessions yet" message.
6. **Contact `/contact`** — categorized enquiry form (name, email, optional phone/org, category, subject, message, privacy consent) with client validation, clear success/error states, duplicate-submit protection.
7. **Privacy Policy `/privacy-policy`** and **Terms of Use `/terms`** — plain-language, Kenya ODPC-referenced, no false compliance claims.

## Backend (Lovable Cloud)
- Enable Lovable Cloud for the contact + workshop enquiry forms: edge function validates, rate-limits, sanitizes, stores enquiries in a database table, and sends email via SMTP/Resend secrets when configured — otherwise returns an honest "not configured" state. Never fake success.

## Content architecture
- Single typed config (`src/config/site.ts`): company details, navigation, divisions, brands, contact info, SEO defaults, feature flags — owner-editable without restructuring.

## SEO & technical
- Unique titles/descriptions per page, canonical URLs on smartmovesabusaki.co.ke, Open Graph + twitter card, Organization schema with verified details only, sitemap.xml, robots.txt, favicon, correct heading hierarchy, descriptive alt text.
- Accessibility: semantic HTML, keyboard-accessible menus, focus states, labeled forms, reduced-motion support.
- Performance: lightweight, lazy-loaded, mobile-first for Kenyan mobile data users.
- index.html title/meta replaced with real app-specific values.

## Documentation & deliverables
- README with setup, build, and Contabo VPS deployment guidance (Nginx reverse proxy, SPA fallback, HTTPS via Certbot, DNS steps).
- `.env.example` with placeholders only; `.gitignore` covering env/build outputs.
- A launch checklist of items the owner must supply (final logo file, social URLs, SMDA/Books website URLs, SMTP credentials).

## Verification
- Production build passes, all routes/CTAs tested with Playwright (desktop + mobile), form validation and honest unconfigured state verified, no dead links or console errors.
