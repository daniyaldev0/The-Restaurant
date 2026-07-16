# CODE_STANDARDS.md

# AL MADINA TRADERS — Code Standards

Version: 3.0

---

# Purpose

This document defines the engineering and coding standards for the **AL MADINA TRADERS** website.

Every implementation must follow these standards to ensure the website remains consistent, maintainable, accessible, scalable, secure, and production-ready.

These rules apply to every HTML, CSS, and JavaScript file in the project.

---

# Engineering Philosophy

Write code like a senior frontend engineer building a premium commercial website.

Every line of code should be:

• Intentional

• Readable

• Maintainable

• Performant

• Accessible

• Production-ready

Always prefer quality over speed.

Never sacrifice maintainability for cleverness.

---

# Core Principles

Always write production-quality code.

Prioritize:

• Readability

• Maintainability

• Accessibility

• Performance

• Scalability

• Security

When implementing new sections:

• Extend the existing architecture.

• Never rewrite completed components unless explicitly instructed.

• Avoid duplicate code.

• Prefer reusable solutions.

• Reuse existing variables, helper functions and utility classes.

---

# HTML Standards

## Semantic Structure

Always use semantic HTML.

Preferred elements:

header

nav

main

section

article

aside

figure

picture

footer

address

form

button

Avoid unnecessary wrapper divs.

Every section should have a meaningful heading.

Only one H1 may exist.

Maintain logical heading hierarchy.

---

## Accessibility

Every interactive element must:

• Be keyboard accessible

• Have visible focus styles

• Include accessible labels

• Support screen readers

Use ARIA only when semantic HTML is insufficient.

Images

Informative images require descriptive alt text.

Decorative images must use:

alt=""

---

## Forms

Every form must include:

Proper labels

Correct input types

Autocomplete attributes

Required validation

Accessible error messages

Example input types:

text

email

tel

textarea

---

## Naming Convention

Use BEM methodology.

Example

hero

hero__content

hero__title

hero__buttons

products

products__grid

products__card

products__image

products__title

Avoid names such as:

box

container2

wrapper

item

temp

section1

---

# CSS Standards

## Organization

Organize CSS in this order:

1. Variables

2. Reset

3. Base

4. Typography

5. Layout

6. Components

7. Utilities

8. Animations

9. Media Queries

---

## CSS Variables

Never hardcode repeated values.

Always use CSS Custom Properties.

Variables should include:

Colors

Spacing

Typography

Shadows

Border Radius

Transitions

Animation Durations

Container Widths

Z-index Layers

Every visual decision should follow DESIGN_SYSTEM.md.

---

## Layout

Use:

Flexbox

CSS Grid

Avoid layout hacks.

Never use floats for layouts.

Keep spacing consistent.

Prefer intrinsic layouts.

---

## Responsive Design

Desktop-first architecture.

Support:

Desktop

Laptop

Tablet

Mobile

Large Displays

Avoid excessive media queries.

Build components that naturally adapt.

---

## Typography

Never hardcode font families.

Always use the typography defined in DESIGN_SYSTEM.md.

Maintain consistent spacing between:

Headings

Paragraphs

Lists

Buttons

Cards

---

## Animations

Animate only:

opacity

transform

filter (when appropriate)

Never animate:

width

height

left

top

margin

padding

Animation duration:

200ms–700ms

Preferred easing:

cubic-bezier(0.22,1,0.36,1)

Support:

prefers-reduced-motion

Animations should communicate quality—not decoration.

---

## Shadows

Use layered shadows.

Avoid harsh black shadows.

Maintain consistent elevation levels.

---

## Border Radius

Use only approved radius values from DESIGN_SYSTEM.md.

Never introduce inconsistent radii.

---

# JavaScript Standards

Use modern ES6+.

Prefer:

const

let

Arrow Functions

Template Literals

Destructuring

Optional Chaining

Nullish Coalescing

Early Returns

Async patterns where appropriate.

---

## Structure

Organize JavaScript into:

DOM Selection

Utility Functions

Components

Event Listeners

Initialization

Each function should perform one responsibility.

Avoid monolithic functions.

---

## DOM Queries

Cache selectors whenever possible.

Avoid repeatedly querying the DOM.

Use event delegation when beneficial.

---

## Events

Never create duplicate event listeners.

Use passive listeners for:

scroll

touch

wheel

Debounce expensive operations.

Throttle animations where necessary.

---

## Global Scope

Never pollute the global namespace.

Encapsulate functionality.

Use modules when applicable.

---

# Performance Standards

Target Lighthouse Scores

Performance

95+

Accessibility

100

Best Practices

100

SEO

100

---

## Images

Preferred formats:

WebP

AVIF

Requirements:

Responsive sizing

Width and height attributes

Lazy loading

Compressed assets

Meaningful filenames

Proper alt text

---

## Fonts

Load only required weights.

Use:

font-display: swap

Preconnect required font providers.

Avoid unnecessary font files.

---

## JavaScript Performance

Load scripts using:

defer

Avoid unnecessary third-party libraries.

Minimize DOM updates.

Batch layout reads and writes.

Avoid layout thrashing.

Use requestAnimationFrame for animation logic.

---

# SEO Standards

Every page must include:

Unique Title

Meta Description

Open Graph Tags

Twitter Cards

Canonical URL

Structured Schema

Proper Heading Hierarchy

Meaningful Alt Text

Semantic HTML

Only one H1.

Readable URLs.

Fast loading pages.

---

# Security Standards

Never expose:

API Keys

Secrets

Tokens

Passwords

Avoid:

innerHTML

unless the content is fully trusted.

Prefer:

textContent

Validate every form field.

Sanitize dynamic content.

Never use inline JavaScript.

---

# Accessibility Standards

Meet WCAG AA guidelines.

Support:

Keyboard navigation

Screen readers

High color contrast

Visible focus indicators

Logical tab order

Touch-friendly controls

Meaningful button labels

Interactive elements must remain usable without a mouse.

---

# Code Comments

Comment only when necessary.

Explain:

WHY something exists.

Avoid commenting obvious code.

Comments should improve maintainability—not increase noise.

---

# File Organization

Maintain consistent project structure.

Required files:

index.html

style.css

script.js

Assets:

assets/

images/

icons/

fonts/

backgrounds/

products/

Keep filenames lowercase.

Use hyphens.

Example:

hero-steel.webp

wire-rods.webp

warehouse.webp

Never create duplicate assets.

---

# Component Rules

Every section should be modular.

Avoid tightly coupled components.

New implementations must never break previous sections.

Always extend before replacing.

Components should be reusable whenever practical.

---

# Browser Support

Ensure compatibility with:

Chrome

Edge

Firefox

Safari

Latest stable versions.

Progressive enhancement should be preferred.

---

# Premium UI Standards

Every interface should feel:

Premium

Industrial

Modern

Editorial

Reliable

Minimal

Professional

Trustworthy

Avoid:

Template layouts

Heavy gradients

Over-animation

Bright colors

Crowded interfaces

Large decorative elements

Whitespace is intentional.

Restraint creates premium design.

---

# Motion Performance

Maintain smooth interactions.

Target:

60 FPS

Use:

IntersectionObserver

requestAnimationFrame

CSS transforms

GPU-accelerated animations

Avoid expensive repaint operations.

---

# Code Review Checklist

Before completing any task verify:

✓ No console errors

✓ No broken links

✓ No duplicate code

✓ No unused CSS

✓ No unused JavaScript

✓ Fully responsive

✓ Keyboard accessible

✓ Lighthouse ready

✓ Forms validated

✓ Images optimized

✓ Animations smooth

✓ Semantic HTML

✓ SEO compliant

✓ Structured Schema preserved

✓ Existing architecture maintained

✓ DESIGN_SYSTEM.md followed

✓ PROJECT_RULES.md followed

✓ Production-ready quality

---

# Claude Workflow

For every implementation:

1. Read PROJECT_RULES.md.
2. Read DESIGN_SYSTEM.md.
3. Read PROJECT_PROGRESS.md.
4. Understand the requested section.
5. Reuse existing components whenever possible.
6. Preserve responsiveness.
7. Preserve accessibility.
8. Preserve animations.
9. Preserve performance.
10. Self-review before returning code.

---

# Final Engineering Standard

Assume every line of code will be reviewed by a senior frontend architect.

The code should feel handcrafted, elegant, scalable, and easy to maintain.

If multiple implementation approaches exist, always choose the solution that is:

• More readable

• More performant

• More reusable

• More maintainable

• More accessible

• More future-proof

The finished website should meet the standards of a premium international B2B industrial company and be suitable for production deployment without requiring structural refactoring.
