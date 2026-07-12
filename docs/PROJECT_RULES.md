# PROJECT_RULES.md

# Premium Restaurant Website Design System
Version: 1.0

---

# Objective

Build a production-ready, premium restaurant website that feels handcrafted, elegant, and timeless.

The website should resemble the quality of world-class brands such as:

- Apple
- Aman Hotels
- Nobu
- Eleven Madison Park
- Framer
- Stripe
- Awwwards-winning websites

The goal is refinement, not complexity.

Every interaction should feel intentional.

---

# Golden Rule

Treat the uploaded project files as the ONLY source of truth.

Never redesign previous work unless explicitly instructed.

Always extend the existing architecture instead of replacing it.

Preserve:

- Layout
- Typography
- Color palette
- Animation language
- Responsiveness
- Accessibility
- Performance
- Code quality

---

# Tech Stack

Only use:

- HTML5
- CSS3
- Vanilla JavaScript

Never use:

- React
- Vue
- Angular
- Bootstrap
- Tailwind
- jQuery
- GSAP
- Anime.js
- AOS
- External animation libraries

---

# Architecture

Maintain exactly these files.

index.html

style.css

script.js

Future assets belong inside:

assets/

Never create unnecessary files.

---

# Folder Structure

assets/

images/

hero/

gallery/

dishes/

chefs/

logo/

backgrounds/

icons/

videos/

fonts/

---

# Asset Naming

Always use descriptive names.

Good:

hero-main.webp

chef-plating.webp

restaurant-interior.webp

wagyu-steak.webp

cocktail-bar.webp

Bad:

image1.jpg

photo.png

img123.webp

gallery4.jpg

---

# Image Rules

Use:

loading="lazy"

for every non-critical image.

Always include descriptive alt text.

Use WebP placeholders.

Never use base64 images.

Never invent random filenames.

---

# Design Philosophy

The interface should feel:

Premium

Elegant

Minimal

Modern

Editorial

Timeless

Sophisticated

Calm

Never flashy.

Never crowded.

---

# Inspiration

Apple

Nobu

Aman Hotels

Framer

Stripe

Michelin Guide

Awwwards

---

# Color Philosophy

Use color sparingly.

Prioritize whitespace.

Primary colors should remain neutral.

Accent color should only guide attention.

Never create rainbow interfaces.

---

# Typography

Use only:

Elegant serif for headings.

Modern sans-serif for body.

Large headings.

Comfortable line height.

Excellent readability.

Large spacing.

Never use more than two font families.

---

# Spacing System

Use an 8px spacing scale.

8

16

24

32

48

64

96

128

Do not invent arbitrary spacing values.

---

# Border Radius

Allowed:

8px

12px

20px

24px

32px

---

# Shadows

Soft.

Natural.

Never harsh.

Use layered shadows.

Avoid glowing effects.

---

# Buttons

Primary

Secondary

Outline

Buttons should include:

Smooth hover

Slight lift

Soft shadow

Premium easing

No ripple effects.

---

# Cards

Rounded corners.

Soft shadows.

Large whitespace.

Minimal borders.

Consistent padding.

---

# Navigation

Sticky.

Transparent initially.

Glass effect after scrolling.

Smooth active indicator.

Responsive.

Accessible.

Keyboard navigable.

---

# Animation Philosophy

Animations should never attract attention.

They should support usability.

Everything should feel effortless.

Use:

transform

opacity

Never animate:

width

height

left

top

margin

Avoid expensive animations.

---

# Animation Timing

Default duration:

500ms–700ms

Use:

cubic-bezier(0.22,1,0.36,1)

---

# Scroll Animations

Use IntersectionObserver.

Replay naturally when elements re-enter the viewport.

No one-time animations.

No flashing.

No jank.

---

# Hover Animations

Small movement.

Subtle scaling.

Opacity changes.

Soft shadows.

Elegant transitions.

Nothing exaggerated.

---

# Performance

Target 60 FPS.

Hardware acceleration only.

Lazy-load images.

Avoid duplicated CSS.

Avoid duplicated JavaScript.

Reuse components.

Optimize selectors.

---

# Accessibility

Use semantic HTML.

Maintain heading hierarchy.

Keyboard navigation.

Visible focus states.

ARIA labels where appropriate.

Respect prefers-reduced-motion.

Maintain sufficient color contrast.

---

# Responsive Design

Desktop first.

Support:

320px

375px

768px

1024px

1440px

4K

No horizontal scrolling.

Maintain excellent spacing across breakpoints.

---

# JavaScript

Keep modular.

Avoid global variables.

Reuse functions.

Comment complex logic.

Never duplicate event listeners.

---

# CSS

Organize into sections.

Example:

Variables

Reset

Typography

Layout

Components

Utilities

Animations

Responsive

Never repeat styles unnecessarily.

---

# HTML

Use semantic elements.

Avoid unnecessary divs.

Keep markup readable.

Use meaningful class names.

---

# Section Order

1 Navigation

2 Hero

3 About

4 Signature Dishes

5 Menu

6 Gallery

7 Reservation

8 Testimonials

9 Location

10 Footer

Do not change this order unless instructed.

---

# Content Tone

Elegant.

Warm.

Refined.

Story-driven.

Never use generic marketing phrases.

Avoid clichés.

Every paragraph should sound handcrafted.

---

# Microinteractions

Every interactive element should provide subtle feedback.

Buttons.

Cards.

Navigation.

Forms.

Gallery.

Menu.

Never overdo animation.

---

# Forms

Inline validation.

No page refresh.

Loading state.

Success animation.

Apple-style confirmation.

Accessible error messages.

---

# Gallery

Editorial masonry layout.

Elegant lightbox.

Keyboard support.

Smooth transitions.

Lazy-loaded images.

---

# Menu

Animated category navigation.

Smooth transitions.

No page reload.

Maintain scroll position.

---

# SEO

Semantic HTML.

Proper heading hierarchy.

Meta description.

Meaningful alt text.

Descriptive titles.

---

# Code Quality

Production-ready.

Readable.

Modular.

Maintainable.

Well commented.

No dead code.

No duplicated logic.

---

# Before Returning Code

Verify:

✓ Existing functionality still works.

✓ Previous sections remain unchanged.

✓ Responsiveness is preserved.

✓ Accessibility is maintained.

✓ Performance has not regressed.

✓ No duplicate CSS.

✓ No duplicate JavaScript.

✓ Animations remain smooth.

✓ Code is production-ready.

Only then return:

index.html

style.css

script.js

ready to replace the existing project.