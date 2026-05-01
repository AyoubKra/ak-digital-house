# AK Digital House — Paid Ads & Lead Generation Page Audit
**File audited:** `src/pages/services/paid-ads-lead-generation.astro` (1,260 lines)
**Live URL target:** `https://akdigitalhouse.com/services/paid-ads-lead-generation/`

---

## EXECUTIVE SUMMARY

This page is meaningfully stronger than the web-design page was at its first audit. The biggest strategic lessons from the prior audit have already been absorbed and applied here:

- H1 hierarchy is correct (no badge-as-H1 inversion).
- Canonical points to the live `akdigitalhouse.com` (no `example.com` leak).
- Pricing is visible on the page with three real tiers — the single biggest CRO fix from the previous round.
- The comparison table picks an enemy ("typical agency").
- The founder's Fiverr origin is reframed transparently ("50+ projects, five-star rated").
- FAQ depth and quality are above market — six categories, real objection handling, no fluff.
- Calendly inline + form dual path replaces the contact-form-only weakness.
- JSON-LD areaServed lists all nine Triangle suburbs.

The page is already a conversion asset. The remaining problems fall into three buckets: **two outright bugs that block conversion right now**, **one major strategic gap** (no founder visibility, no proof of any kind, no demonstration), and **one credibility risk** (the comparison table is borderline strawman against your actual named Triangle competitors).

The work below is roughly half cleanup, half strategic upgrade. Total effort: 4–6 hours of execution + one founder photo session.

---

## 1. DESIGN & UX

### What's working

- **Visual hierarchy in the hero is clean.** Eyebrow → H1 → sub-copy → CTAs → trust badges, in that order. The eye lands on the H1 first, which is how it should work on a sales page.
- **The two-column hero on desktop, single-column with image-between-desc-and-buttons on mobile, is the correct mobile pattern.** Mobile users see the visual after the value statement and before they have to commit to scrolling further.
- **Comparison table layout is a smart visual choice.** The three-column grid with a centered icon between each pair is more scannable than two stacked lists.
- **Pricing card hover lift (`translateY(-6px)` + shadow) and "Most Popular" red border on the middle tier** are textbook conversion design. Eye flows to the recommended option naturally.
- **Process timeline with the S-curve SVG connector on desktop** is a creative touch. Most agency pages use a flat horizontal line or a numbered grid — this is more visually distinct.
- **FAQ tab navigation that collapses to mobile accordion via a runtime script** is a real UX upgrade. Most agencies dump 30 questions in a single open list.

### What's broken

1. **CRITICAL — Buttons use pill shape (`border-radius: 1000px` / `9999px`), violating your own brand standard.** The INSTRUCTIONS.txt file explicitly says: *"All buttons must use rounded-lg, NEVER rounded-full."* The page violates this on `.btn-primary` (line 854), `.btn-secondary` (856), `.pricing-cta` (980), `.form-submit-btn` (1186), `.howwe-offer-btn` (uses `border-radius: 8px` — correct, an outlier), `.proc-num-badge` (939), `.hero-label`, `.ai-eyebrow`, `.faq-navitem`, `.pricing-popular-pill`. This is the **same brand-rule violation flagged on the web-design page**. Whatever default button class is being used across the codebase is wrong. Fix once, fix everywhere.

2. **CRITICAL — `<picture>` element is missing; both hero images load on every device.** Lines 55–57 (mobile image) and 79–81 (desktop image) both render `<img>` tags pointing to the same `/PPC.webp`. CSS `display: none` does NOT prevent the browser from downloading either one. Worse, **both have `fetchpriority="high"`**, so the browser races to download both before anything else on the page. Mobile users download the image twice. Desktop users do too. Fix: collapse to a single `<picture>` element with `<source media="(max-width: 768px)">` and `<img>` fallback, or render a single `<img>` and rely on responsive `width` only.

3. **Form is non-functional.** Line 721: `<form action="https://formspree.io/f/REPLACE_WITH_FORM_ID" method="POST">`. The placeholder was never replaced. Submissions go nowhere. **This is the highest-priority fix on the entire page** — every form lead since deployment has been lost.

### Mobile experience friction

- **Hero badges stack vertically on mobile** (line 1218: `flex-direction: column`) — fine, but they take significant vertical space before the CTAs. On a 375px viewport, the user has to scroll past 3 stacked badges to reach the secondary CTA. Consider keeping badges in a horizontal scroll row or compressing to a single line on mobile.
- **Comparison table at 480px is going to be tight.** Three columns with `grid-template-columns: 1fr 32px 1fr` and `font-size: 0.72rem` on the row text. Acceptable but borderline. Sanity-check on a real iPhone SE that the row text isn't wrapping awkwardly.
- **Process step cards on mobile reverse to row layout with the icon column on the right** (`flex-direction: row-reverse`, line 945). Visually unusual — most readers expect icon-left. Test if this hurts comprehension. Standard pattern would be `flex-direction: row` with icon left.
- **Calendly inline widget at 580px height on mobile is heavy.** Below it, the form panel renders at `min-height: 580px`. On a phone, the user has to scroll past nearly two full screens of the Calendly widget before they even see the form alternative. Consider showing only the Calendly widget on mobile by default and a "prefer to write?" tap-to-expand for the form.

### Smaller UI issues

- **Image `alt` text is generic.** Both hero images use `alt="Paid Ads & Lead Generation illustration"` (lines 56, 80). Not a description, not searchable, not helpful for screen readers. Replace with an actual description of what the illustration depicts (e.g., "Flat illustration of a marketer reviewing a Google Ads campaign dashboard").
- **Comparison table is built as a div grid, not a semantic `<table>`.** Screen readers see it as 18 unrelated cells with no row/column relationship. Ironically, the visual layout is exactly a table. Use a real `<table>` with `scope="col"` and `scope="row"`, or add `role="table"` / `role="row"` / `role="cell"` ARIA to the grid.
- **The `proc-wave-svg` at `position: absolute; top: 0`** sits at the same vertical position as the circle row (which has its own background and shadow). On desktop the wave is meant to thread between circles but visually inspect at multiple widths — there's a real risk the wave gets occluded by the circle shadow at 1024–1100px viewports.
- **`background:linear-gradient(135deg,#fff 0%,rgba(217,30,69,0.06) 50%,#fff 100%)`** appears on both the hero (line 860) AND the contact section (line 680) AND the pricing section (line 958). Three separate sections using identical gradients reduces visual rhythm. Pick one to use the gradient and let the others be flat #fff or #f8f8f8.

---

## 2. CONTENT QUALITY & MESSAGING

### What's working

- **H1 is strong.** *"Stop Paying for Clicks. Start Paying for Customers."* This is exactly the kind of fight-picking headline the prior audit critique was demanding. It names the problem, names the win, and is memorable. Keep it.
- **Hero sub-copy "live in 7 business days, with the first leads landing in your inbox before most agencies have finished the kickoff call"** is the best single line on the page. Specific, visceral, and the implicit competitor swipe lands without being mean.
- **"Most agencies sell you clicks. You need customers."** (line 90) — clean, declarative, no jargon.
- **The Friday-report-in-plain-English refrain** repeats five times across the page. That's deliberate, and it works — it becomes the texture of the offer.
- **FAQ panel 6, question 1 ("You're a newer agency. Why should I trust you?")** is exactly the right answer: owns the Fiverr origin, frames it as 50+ delivered campaigns, and reframes AKDH as the same execution with guarantees and local accountability. **This is the strongest piece of copy on the page.** Don't change a word.
- **"Can you guarantee a specific number of leads per month? — No, and any agency that does is lying to you"** (line 577) is high-credibility honesty. A reader who's been burned by an agency will read that and trust everything else more.
- **The flat-fee vs. percentage-of-ad-spend explanation** (FAQ panel 2, "Why do you charge a flat fee...") is one of the smartest positioning moves on the page. It frames a competitor's pricing model as a conflict of interest. Steal it for sales calls.
- **"You own your ad accounts from day one"** is repeated 4+ times across the page (comparison table, form trust badges, FAQ). That's correctly weighted — it's a real, verifiable, costly-to-fake differentiator.

### What's weak

1. **"30 Days Free Ads Included" hero badge is ambiguous and risks misreading.** A small business owner reads this as "they give me $X of ad spend on us." That's not what it means — the FAQ clarifies (panel 2, line 565) that the 30 days free is *management fee*, not ad budget. Ad spend always goes directly to Google/Meta. Fix the badge copy: **"30 Days Free Management"** or **"First Month Management Free"**. Misreading this kills trust if the prospect realizes the gap on the call.

2. **The hero sub-copy says "Raleigh small businesses lose thousands every month to ads that produce traffic but no leads"** — this is good but vague. The Sonnet audit on the web-design page liked the specific "waited 6 seconds for it to load, and left." The same pattern would land harder here: "*Raleigh small businesses spend $1,500 a month on Google Ads, get 80 clicks, and one phone call. The other 79 went somewhere else.*" Concrete numbers > "thousands."

3. **The comparison table risks reading as strawman against your real competitors.** The five rows describe:
   - "$5,000 setup fee" — TheeDigital, TriMark, Brasco, Walk West, Hive Digital don't list setup fees on their public pages.
   - "Locked into a 12-month contract" — TheeDigital's primary differentiator is *"No long-term contracts."* Hive and Walk West also don't push 12-month contracts publicly.
   - "90-day onboarding before a single ad runs" — overstated for the named Triangle competitors.
   - "They own your ad accounts — you leave with nothing" — not the standard practice at the named competitors.
   The comparison is largely accurate for *cheap freelancers and predatory low-tier agencies*, but a sophisticated buyer who has already talked to TheeDigital will read it as misrepresentation. **Fix:** rename the left column from "TYPICAL AGENCY" to **"TYPICAL FREELANCER OR LOW-TIER AGENCY"**, or to **"WHAT MOST RALEIGH SMBs HAVE EXPERIENCED"** — frame it as the buyer's prior bad experience, not as a description of every other agency on Earth. The rows then become honest.

4. **"Live in 7 business days — or we work for free" is the costly guarantee, but it's hidden.** It appears once, in row 1 of the comparison table cell (line 114). It's the strongest promise on the page and it deserves to be a hero badge, a section header, and a footer trust line — not a single buried sentence. Also: the wording is slightly soft. "We work for free" implies you'll keep working. "We refund your first month's management fee" is a sharper, more measurable consequence.

5. **"What we actually do before spending your budget"** (line 171) is followed by four short boxes (Market, Buyer intent, Conversion tracking, Weekly optimization) that read as generic. Every paid ads agency claims to do these. The opportunity to differentiate is wasted. Replace generic noun phrases with specific, costly-to-fake claims:
   - "Your market" → "*48-hour competitor audit before launch*"
   - "Buyer intent" → "*Negative keyword list of 200+ terms day-one*"
   - "Conversion tracking" → "*Server-side GA4 + call tracking before launch — not after*"
   - "Weekly optimization" → "*Monday cuts, Friday report — every week, no exceptions*"

6. **"Talk About Scale →"** (line 457, the third pricing tier CTA) is weaker than the other two CTAs ("Start with Launchpad", "Choose Growth"). Replace with a verb-action: **"Get a Custom Quote →"** or **"Plan My Scale →"**.

7. **The "Start risk-free" offer card** (line 256) packs two distinct offers (Web+Ads bundle vs. Ads-Only) into one card with a single CTA. A reader has to parse which offer applies to them. Split into two visually distinct cards or add a clear "Choose your path:" framing.

8. **"What's your biggest goal right now?"** (form, line 763) is a good open question, but the placeholder copy ("more leads, lower cost-per-lead, a specific campaign...") gives away the easy answers and discourages the prospect from writing something specific. Consider: "*Tell us what you're trying to achieve — and what's been holding you back.*"

9. **Hero accent color choice.** *"Stop Paying for Clicks.* **Start Paying for Customers.**" — the second half is in `#d91e45`. The instinct is right (emphasize the win), but in your prior audit the lesson was that the *problem* phrase often hits harder when emphasized, because it's what the visitor identifies with. Test reversing: keep "Start Paying for Customers" in dark text and accent "Stop Paying for Clicks" in red. The negative is more memorable.

10. **No mention of the brand colors anywhere as a "we're not WordPress" hook.** The web-design page positions hard against WordPress. This page barely touches the post-WordPress story. The connection is real — fast landing pages built on Astro = lower CPC because Quality Score rewards speed. Consider one paragraph in the "How We Do It" section: "*Every campaign landing page we build runs on the same Astro stack as our websites — 95+ Lighthouse, sub-2-second load. That isn't a vanity metric. It's why your cost-per-click drops in week three.*"

### Headline rewrites

| Section | Current | Stronger |
|---|---|---|
| Hero H1 | Stop Paying for Clicks. Start Paying for Customers. | Keep — it's working |
| Pain section H2 | Most agencies sell you clicks. You need customers. | Keep |
| How We Do It H2 | Everything Your Campaign Needs. Nothing It Doesn't. | Keep |
| Process H2 | Live in 7 Business Days. Here's How. | Keep |
| Pricing H2 | Real Prices. On the Page. | Stronger: **The Pricing Page Most Agencies Won't Show You.** |
| FAQ H2 | Everything You Need to Know Before We Start | Stronger: **Real Questions. Honest Answers. No Sales Talk.** |
| Final CTA H2 | Ready to Stop Paying for Clicks? | Stronger: **Your First Lead Could Land Within Two Weeks.** (Specific outcome, not a question.) |

---

## 3. PAGE STRUCTURE (CONVERSION FLOW)

### Current section order

1. Hero
2. Pain Framing — Comparison table + 4 process boxes
3. "How We Do It" — 6 capability cards + offer card
4. AdsCampaignTypes (component, not visible in this file)
5. How It Works — 5-step timeline
6. Pricing — 3 tiers + 2 offers + safety net
7. FAQ — 6 categories
8. Contact — Calendly + Form

### What works in this order

The page **does** follow a Problem → Solution → Process → Price → Objection-handling → CTA flow, which is correct. Most agency pages skip pricing or bury it after FAQ. Putting price *before* FAQ is the right call: the FAQ then handles the objections that pricing surfaces.

### What's missing or misordered

1. **No social proof anywhere on the page.** Not testimonials, not case study results, not Google review badge, not even a "100+ campaigns delivered" number from your Fiverr/Upwork work. The ONLY trust signal is the Fiverr reframe in FAQ panel 6 — and to read that, the visitor has to (a) reach the FAQ section, (b) click the "Trust & Credibility" tab, and (c) expand the first question. **You've buried your strongest credibility move three clicks deep.** The Fiverr origin should be visible on the homepage flow without the visitor having to dig.

2. **Founder block is missing entirely.** Ayoub Kra is named once, in FAQ panel 5 ("Who will actually be running my campaigns?"). The reader is asked to commit $750–$2,500/month to a service without ever seeing the founder's face, LinkedIn, or background. This is a **critical trust gap on a small-agency page**. The Opus critique on the web-design page said this explicitly: small agencies win by being unmistakably human. Add a founder block between the Process section and Pricing — photo, 2-line bio, LinkedIn link, one-line credibility statement.

3. **"Why not AI?" / "Why not just run ads myself?" objection is unaddressed.** It's 2026. Your prospect is being pitched Google's Performance Max as "set it and forget it AI." Meta now generates ad creative automatically. The sophisticated buyer is *already asking themselves* "why pay AKDH $1,200/month when Google's algorithm runs the campaign for me?" Add a section between the Pain framing and How We Do It that addresses this directly. The FAQ panel 4 question on Performance Max touches it, but a section-level answer is needed.

4. **No "This isn't for you if..." disqualifier section.** Same critique as the Opus audit on the web-design page. The page tries to appeal to all paid ads buyers. Add 3–4 lines that actively repel wrong-fit clients. Examples: "*This isn't for you if you want guaranteed leads (no agency can deliver that). If you're spending under $500/month — your market is too thin. If you don't have a working website — start with our web design service first.*"

5. **No demonstration of the deliverable.** The page promises a "live Looker Studio dashboard" (FAQ panel 3, line 585) but doesn't show one. A single annotated screenshot of a real (anonymized) dashboard would do more for trust than five testimonials. Same for the "Friday report in plain English" — show one. Visual demonstration > textual claim.

6. **The AdsCampaignTypes component is rendered between "How We Do It" and "How It Works"** — I can't see what's in this component, but structurally this is the right place for "Google vs. Meta vs. LinkedIn vs. TikTok" cards. Audit that component separately.

7. **Section 2 ("Pain Framing") is doing two jobs at once.** It opens with the comparison table (a vs. b critique of agencies) AND ends with four boxes describing what AKDH does ("Your market", "Buyer intent", etc.). These are two different conceptual moves. Split into two sections, or commit to one. Right now the second half feels like an apologetic add-on after the table.

### Recommended section order (final)

1. Hero (no change)
2. **Founder block (NEW)** — Ayoub photo + 60-word bio + 1-line credibility + LinkedIn
3. Pain Framing — Comparison table only (move the 4 boxes to the next section)
4. **"Why not just use AI / run ads myself?" (NEW)** — addresses the 2026 objection
5. How We Do It (capability cards) — keep, plus the 4 boxes from the old Section 2
6. AdsCampaignTypes — keep
7. How It Works — keep
8. **Social proof / Demonstration block (NEW)** — anonymized dashboard screenshot + 1 case study + Fiverr origin reframe pulled forward + future testimonial slots
9. Pricing — keep
10. **"This isn't for you if..." (NEW)** — disqualifier
11. FAQ — keep
12. Contact — keep

That's 4 new sections. None require new design — they're all simple text-and-image blocks that match existing styles.

---

## 4. LOCAL SEO OPTIMIZATION

### What's done well

- **JSON-LD schema is correct and rich.** `LocalBusiness` provider, `addressLocality: "Raleigh"`, `addressRegion: "NC"`, and `areaServed` lists all nine target suburbs. This is better than what most Triangle competitors have. Walk West and Brasco have weaker schema than this page does.
- **Meta description includes "Raleigh small businesses"** and the price anchor. Strong both for SERP CTR and local relevance.
- **Title tag** includes "Raleigh Digital Marketing Agency."
- **Canonical is correct** (live URL, no `example.com` leak — same bug the web-design audit caught and you've already fixed here).

### Local SEO gaps

1. **No suburb names appear in the body copy or in any H2/H3.** The schema says you serve Cary, Durham, Apex, Wake Forest, Morrisville, Chapel Hill, Holly Springs, and Fuquay-Varina — but Google's local algorithm reads body content too, not just structured data. **Not a single H2 mentions a suburb by name.** The footer city marquee (if it exists like the web-design page) helps, but isn't enough. Add at least:
   - One H2 or H3 with a suburb: "*Why Cary and Apex Service Businesses Need a Different Google Ads Strategy*"
   - One paragraph in the hero or pain section that names 2–3 suburbs naturally
   - One FAQ explicitly answering "*Do you work with businesses in [Durham / Cary / Chapel Hill]?*"

2. **No keyword-bearing internal anchor text.** The links to other service pages (likely in the footer or nav) don't appear in the body copy. Google rewards contextual internal linking with descriptive anchor text. Add at least 2 in-body links: one to the web-design page (e.g., "*sending paid traffic to a slow site burns money — read our [web design page] →*") and one to a future SEO page.

3. **Primary keyword targeting is implicit, not explicit.** Search a Raleigh small business owner would actually type:
   - "Google Ads management Raleigh NC"
   - "Facebook Ads agency Cary"
   - "PPC management Durham"
   - "Lead generation agency Triangle NC"
   - "small business marketing agency Raleigh"
   None of these phrases appear in any heading. The H1 ("Stop Paying for Clicks") is a great hook but contains zero local SEO keywords. **Add a sub-heading or subtitle that includes the geo-modified keyword:** *"Google Ads & Meta Ads Management for Raleigh Small Businesses"* — placed below the H1 as an `<p class="hero-subtitle">` or `<h2>`.

4. **Page slug.** `paid-ads-lead-generation` is fine as a service slug, but `paid-ads-lead-generation-raleigh` would rank better for the geo-modified search. If it's not too late to change without breaking links, consider it.

5. **Image alt text is missing local relevance.** Both hero images use `alt="Paid Ads & Lead Generation illustration"`. Replace with `alt="Google Ads and Meta Ads management for Raleigh small businesses — AK Digital House"` to capture image-search local traffic.

6. **No suburb-specific landing pages linked from this page.** The competitive analysis you wrote identified suburb-level pages as a moat. Eventually, this page should link to "Paid Ads in Cary," "Google Ads in Durham," etc. — even if those pages don't exist yet, plan the URL structure now.

7. **No FAQ schema markup.** You have ~30 FAQ items. Wrap them in `FAQPage` JSON-LD schema. Google often surfaces FAQ-rich pages with expanded results in SERPs — bigger SERP real estate, higher CTR. This is a 30-minute win for measurable rank lift.

8. **No `BreadcrumbList` schema.** Add it: Home → Services → Paid Ads & Lead Generation. Helps Google understand site hierarchy and increases SERP real estate.

9. **Open Graph image is referenced in `og:title` and `og:description` only — no `og:image`.** When this page is shared on LinkedIn, Twitter, or in a text message, no preview image will render. This is likely set globally in `BaseHead.astro`, but verify. Without it, the page is invisible in social feeds.

---

## 5. MISSING SECTIONS

In priority order — what to add and what each one buys you.

### High priority (add this month)

**1. Founder block.** Photo, 60-word bio, LinkedIn link, one-line credibility statement.
*Why:* On a $750–$2,500/month decision from a small business owner, putting a face on the agency is the single biggest trust lift you can do for free. Right now Ayoub's name appears once in FAQ panel 5. Move him to a dedicated section between Process and Pricing.
*Example copy:*
> **Ayoub Kra. Founder, AK Digital House.**
> 50+ paid campaigns delivered. Five-star rated on Fiverr and Upwork before launching AKDH in Raleigh. Every campaign you run with us, I personally manage. No junior account managers. No offshore teams. You text me, I answer.
> *[LinkedIn link]*

**2. Social proof block — even if minimal.**
*Why:* The page has zero proof beyond the Fiverr reframe in FAQ. A single block with: (a) one anonymized case study with real numbers, (b) one annotated dashboard screenshot, (c) the Fiverr "50+ campaigns" stat as a counter, (d) Google review embed if you have one. You don't need 20 testimonials. You need one credible, specific result.
*Minimum viable:* "*Local plumber in Cary. $750/month ad spend. Week 4: 23 phone calls, 7 booked jobs, $4,100 in revenue. Cost per lead: $32.*" Anonymize but don't fake.

**3. "Why not just use AI?" / "Why not run ads myself?" section.**
*Why:* It's 2026. Google's Performance Max is sold as auto-pilot. Meta has Advantage+ campaigns. Your prospect is being told they don't need an agency. **Address it head-on.** A 200-word block addressing the three things AI/DIY can't do (strategic budget allocation, conversion tracking architecture, weekly judgment calls about which audience to cut). The FAQ panel 4 question on Performance Max touches this — promote it to a section.

**4. "This isn't for you if..." disqualifier.**
*Why:* Filters out wrong-fit leads, magnetizes right-fit ones. Reader self-identifies as the right buyer. Costs you nothing.
*Example copy:*
> **This isn't for you if:**
> — You're spending under $500/month on ads. Your market is too thin to optimize.
> — You want guaranteed lead numbers. Any agency that promises a number is lying.
> — You don't have a working website yet. Talk to us about web design first.
> — You want to switch agencies every 90 days. We work better as long-term partners.

### Medium priority (next quarter)

**5. Anonymized live dashboard screenshot.**
*Why:* Show what the Looker Studio dashboard actually looks like. One annotated image converts better than the entire FAQ section.

**6. Industry-specific blocks.**
*Why:* TriMark and TheeDigital both have dedicated pages for verticals (Home Services, Legal, Healthcare). Add 3 short cards on this page: "*Service businesses (HVAC, plumbing, contractors)*" / "*Local healthcare and dental*" / "*E-commerce stores*" — each with one sentence on what's different about running ads for that vertical. Captures long-tail searches for "Google Ads for HVAC Raleigh" etc.

**7. Pricing comparison block.**
*Why:* You have three tiers. Add a side-by-side comparison row showing what's in each ("Number of platforms," "Conversion tracking," "Weekly calls," etc.). Right now each tier card lists features independently, which makes comparison work for the reader. Do the work for them.

**8. Lead magnet / audit offer.**
*Why:* TheeDigital's free audit tools are likely their highest-converting asset on the entire site. Add: "*Free 15-minute Google Ads audit. We'll show you exactly what's wasting money in your account before you sign anything.*" This is a lower-friction conversion than booking a 30-minute strategy call. Some prospects will only convert at the lower commitment level, then upgrade.

**9. FAQ schema markup.**
*Why:* 30-minute fix. Wrap all FAQ items in FAQPage JSON-LD. Often gets you expanded SERP results. Pure SEO win.

### Low priority / nice-to-have

**10. Recent campaign launches section.**
*Why:* "*This month we launched campaigns for: a Cary chiropractor, a Durham SaaS startup, a Raleigh residential cleaner.*" Even one-line mentions create the impression of momentum and local proof. Update monthly.

**11. Comparison vs. specific competitors.**
*Why:* High-risk, high-reward. A page like "*AKDH vs. TheeDigital: how we're different*" is aggressive but converts well for buyers who are actively comparing. Don't add this on the main service page — make it a separate landing page.

---

## 6. PRIORITY FIX LIST — TOP 10 ACTIONS

Ordered by impact-to-effort ratio. Do them in this order.

| # | Fix | Effort | Impact |
|---|---|---|---|
| 1 | **Replace `REPLACE_WITH_FORM_ID` with the real Formspree ID.** Form is currently dead — submissions go nowhere. | 2 minutes | Critical |
| 2 | **Fix all pill-shaped buttons.** Change `border-radius: 1000px` / `9999px` to `border-radius: 8px` (rounded-lg) on `.btn-primary`, `.btn-secondary`, `.pricing-cta`, `.form-submit-btn`, `.proc-num-badge`, `.hero-label`, `.ai-eyebrow`, `.faq-navitem`, `.pricing-popular-pill`. Same brand-rule violation as the web-design page. | 15 minutes | High |
| 3 | **Collapse the dual hero `<img>` elements into a single `<picture>` element.** Both currently load on every device with `fetchpriority="high"`, doubling image bandwidth. | 10 minutes | High |
| 4 | **Add a founder block** between Process and Pricing — photo, 60-word bio, LinkedIn link. | 1–2 hours (incl. photo) | High |
| 5 | **Rename "TYPICAL AGENCY" comparison column to "TYPICAL FREELANCER OR LOW-TIER AGENCY"** or "WHAT MOST RALEIGH SMBs HAVE EXPERIENCED." Removes strawman risk against actual Triangle competitors. | 2 minutes | Medium-High |
| 6 | **Fix the "30 Days Free Ads Included" hero badge** to "30 Days Free Management" — current copy implies free ad spend, which it isn't. | 2 minutes | Medium-High |
| 7 | **Add FAQ schema markup** (`FAQPage` JSON-LD) wrapping all 30 FAQ items. Gets you expanded SERP results. | 30 minutes | Medium-High (SEO) |
| 8 | **Add a "This isn't for you if..." disqualifier block** before the FAQ. 4 lines of copy, no design work needed. | 15 minutes | Medium |
| 9 | **Promote the 7-day guarantee from a single comparison-table cell to a prominent section header or hero badge.** Currently the strongest promise on the page is buried. Sharpen the consequence: "We work for free" → "We refund your first month's management fee." | 30 minutes | Medium |
| 10 | **Add at least one suburb-bearing H2 or H3** in the body. JSON-LD has all 9 suburbs but body copy mentions zero. The H1 has no local keyword. | 30 minutes | Medium (SEO) |

---

## 7. RESTRUCTURED WIREFRAME (RECOMMENDED FINAL ORDER)

```
┌─────────────────────────────────────────────────────────────┐
│ NAVIGATION                                                  │
├─────────────────────────────────────────────────────────────┤
│ HERO                                                        │
│ • Eyebrow: "Paid Ads & Lead Generation"                     │
│ • H1: "Stop Paying for Clicks. Start Paying for Customers." │
│ • Sub-headline: "Google Ads & Meta Ads Management for       │
│   Raleigh Small Businesses" (NEW — local SEO H2)            │
│ • Description (concrete numbers, not "thousands")           │
│ • Primary CTA: "Book a Free Strategy Call"                  │
│ • Secondary CTA: "See Our Pricing ↓"                        │
│ • 3 trust badges (with corrected "30 Days Free Management") │
├─────────────────────────────────────────────────────────────┤
│ FOUNDER BLOCK (NEW)                                         │
│ • Photo of Ayoub                                            │
│ • 60-word bio                                               │
│ • LinkedIn link + Fiverr "50+ campaigns" stat               │
├─────────────────────────────────────────────────────────────┤
│ PAIN FRAMING — comparison table only                        │
│ • Renamed: "TYPICAL FREELANCER" vs. "AK DIGITAL HOUSE"      │
│ • 5 rows (current rows are good)                            │
├─────────────────────────────────────────────────────────────┤
│ "WHY NOT AI / DIY?" SECTION (NEW)                           │
│ • H2: "Why not just use Performance Max yourself?"          │
│ • 200 words on what AI can't do                             │
├─────────────────────────────────────────────────────────────┤
│ HOW WE DO IT — capability cards + 4 process boxes           │
│ • Replace generic box copy with specific claims             │
├─────────────────────────────────────────────────────────────┤
│ ADS CAMPAIGN TYPES (existing component)                     │
│ • Add 3 vertical-specific cards (Service biz / Healthcare / │
│   E-com) for long-tail SEO                                  │
├─────────────────────────────────────────────────────────────┤
│ HOW IT WORKS — 5-step timeline (no change)                  │
├─────────────────────────────────────────────────────────────┤
│ SOCIAL PROOF / DEMONSTRATION (NEW)                          │
│ • One anonymized case study with real numbers               │
│ • Annotated Looker Studio dashboard screenshot              │
│ • Pull Fiverr origin reframe forward from FAQ panel 6       │
├─────────────────────────────────────────────────────────────┤
│ PRICING — 3 tiers (no structural change)                    │
│ • Stronger H2 + "Talk About Scale" CTA fix                  │
│ • Add comparison row showing what's in each tier            │
├─────────────────────────────────────────────────────────────┤
│ "THIS ISN'T FOR YOU IF..." DISQUALIFIER (NEW)               │
│ • 4 lines, no design work                                   │
├─────────────────────────────────────────────────────────────┤
│ FAQ — 6 categories (no change to content)                   │
│ • Add FAQPage JSON-LD schema                                │
├─────────────────────────────────────────────────────────────┤
│ FINAL CTA — Calendly + Form                                 │
│ • Fix Formspree ID                                          │
│ • Fix pill buttons                                          │
│ • Stronger H2: "Your First Lead Could Land Within Two       │
│   Weeks."                                                   │
├─────────────────────────────────────────────────────────────┤
│ FOOTER (existing)                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## CLOSING NOTE

The bones are good. This is not a page that needs rebuilding — it's a page that needs four small additions and three bug fixes. Most agency service pages would kill for what's already here: real pricing, a costly guarantee, an honest founder origin, plain-language reporting promises, no contracts, owned ad accounts, and a 6-category FAQ that handles real objections.

The two highest-leverage moves are:
1. **The founder block.** Putting Ayoub's face above pricing transforms the credibility math for every visitor making a $750+/month decision.
2. **One real, anonymized case study with numbers.** "Local plumber in Cary, $750/month ad spend, 23 phone calls in week 4, $32 cost per lead" beats every Fiverr testimonial you'd ever pull.

Both can be done in a weekend. The Formspree fix takes two minutes and you're losing leads every day until it ships.
