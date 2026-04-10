# AK Digital House - Claude Code Project Guide

## Brand & Design System
- Agency: AK Digital House (akdigitalhouse.com)
- Focus: Web Design, SEO, Digital Marketing Strategy
- Target audience: Small to mid-size B2B/SaaS companies
- Design style: Modern, professional, warm and inviting
- Primary color: #D91E45 (Yellow - main brand color)
- Secondary color: #1A1C1E (Dark - accents)
- Accent color: #0090FF (Blue - alerts/warnings only)
- Font: Plus Jakarta Sans (all typography)
- Dark text color: #242729 (optimal readability)
- Light background: #F9F9F9 (light grey)
- White background: #FFFFFF

## Site Structure
- src/pages/index.astro - Homepage with hero + services overview
- src/pages/services.astro - Detailed services page with 3 service cards
- src/pages/portfolio.astro - Portfolio/work examples (6 sample projects)
- src/pages/about.astro - Company story + values + team
- src/pages/contact.astro - Contact form with contact info

## Component Library (src/components/ui/)
- Button.astro - primary (yellow), secondary (white), ghost (transparent) variants
- Card.astro - for services, portfolio, testimonials (white bg, light grey border)
- Hero.astro - full-width hero sections (yellow gradient or solid backgrounds)
- Navigation.astro - sticky header with logo and menu items
- Footer.astro - dark footer with links, social, copyright

## Design System - Colors
- Primary: #D91E45 (Yellow)
- Secondary: #1A1C1E (Dark)
- Text Dark: #242729
- Text Light: #FFFFFF
- Text Muted: #999999
- Background White: #FFFFFF
- Background Light: #F9F9F9
- Background Dark: #1A1C1E
- Borders: #E0E0E0
- Accent Blue: #0090FF (Alerts only)

## Design System - Typography
- Font: Plus Jakarta Sans
- h1: clamp(1.75rem, 3vw, 2.25rem) [28px → 36px]
- h2: clamp(1.5rem, 2.5vw, 1.75rem) [24px → 28px]
- h3: clamp(1.25rem, 2vw, 1.5rem) [20px → 24px]
- h4: 1.125rem
- h5: 1rem
- h6: 0.875rem
- body: clamp(0.9375rem, 1vw, 1rem) [15px → 16px]
- small: 0.875rem
- xs: 0.75rem
- Line height: tight (1.2), normal (1.6), relaxed (1.8)

## Design System - Spacing
- xs: 8px
- sm: 16px
- md: 24px
- lg: 32px
- xl: 48px

## Design System - Border Radius
- sm: 4px
- md: 8px
- lg: 12px
- full: 9999px

## Design System - Shadows
- subtle: 0 1px 3px rgba(0, 0, 0, 0.08)
- medium: 0 10px 30px rgba(0, 0, 0, 0.08)
- prominent: 0 10px 30px rgba(217, 30, 69, 0.15)

## Design Rules (MUST FOLLOW)
- Colors: ONLY #D91E45 (yellow), #1A1C1E (dark), #242729 (text), #F9F9F9 (light grey)
- Typography: ONLY Plus Jakarta Sans
- Spacing: ONLY 8px, 16px, 24px, 32px, 48px
- All components responsive (mobile-first)
- Cards: 8px radius, #E8E8E8 border
- Buttons: 8px radius, yellow primary
- Images: Use Astro's <Image /> component
- Zero JavaScript by default

## Deployment
- Host: Cloudflare Pages (free)
- Domain: akdigitalhouse.com
- Build: npm run build
- Build output: dist
- Repository: GitHub
- Email: Zoho Mail

## Development Commands
- npm run dev - Start dev server
- npm run build - Build for production
- npm run preview - Preview production build

## When Making Changes
1. Make the change
2. Test at localhost:5173
3. Check mobile responsiveness
4. Build with npm run build
5. Preview with npm run preview
6. Commit with meaningful message
7. Push to GitHub (auto-deploys)

## Contact Information
- Email: contact@akdigitalhouse.com
- Phone: (919) XXX-XXXX
- Location: Raleigh, North Carolina
