# CODE_STANDARDS.md

## Purpose

This document defines the coding standards for the project. Every contribution should follow these rules to ensure consistency, maintainability, scalability, and production readiness.

---

# General Principles

* Write clean, readable, production-quality code.
* Prioritize maintainability over clever solutions.
* Extend the existing architecture instead of replacing it.
* Avoid duplicate code.
* Keep files organized and predictable.
* Prefer simplicity whenever multiple solutions exist.

---

# HTML Standards

## Semantic Structure

Use semantic HTML whenever possible.

Examples:

* header
* nav
* main
* section
* article
* figure
* picture
* footer
* form

Avoid unnecessary div nesting.

---

## Accessibility

Every interactive element must:

* be keyboard accessible
* have visible focus states
* include descriptive labels
* support screen readers where appropriate

Images must include meaningful alt text.

Decorative images should use empty alt attributes.

---

## Naming

Use consistent class naming.

Example:

reservation

reservation__container

reservation__header

reservation__title

reservation__form

reservation__field

reservation__button

Avoid vague names such as:

container2

box

item

temp

wrapper1

---

# CSS Standards

## Organization

Organize CSS in logical sections.

Example:

Section

Layout

Components

Typography

Buttons

Cards

Forms

Animations

Media Queries

---

## Variables

Always reuse existing CSS variables.

Never hardcode colors already defined.

Never duplicate spacing values.

---

## Responsive Design

Desktop-first unless the existing project uses another approach.

Breakpoints should remain consistent throughout the project.

Avoid unnecessary media queries.

---

## Animations

Animate only:

* transform
* opacity

Never animate:

* width
* height
* top
* left
* margin
* padding

Use GPU-friendly animations.

---

## Transitions

Default easing:

cubic-bezier(0.22,1,0.36,1)

Transition durations should remain consistent.

Avoid excessive motion.

---

# JavaScript Standards

Use modern ES6+ syntax.

Prefer:

const

let

Arrow functions

Template literals

Early returns

---

## Structure

Separate responsibilities.

Example:

DOM selection

Event listeners

Validation

Animation

Utility functions

Initialization

---

## DOM Queries

Cache selectors.

Avoid repeatedly querying the DOM.

---

## Events

Avoid duplicate event listeners.

Delegate events when appropriate.

Remove listeners when no longer needed.

---

## Functions

Functions should perform one responsibility.

Prefer small reusable utilities.

Avoid deeply nested logic.

---

## Global Scope

Do not pollute the global namespace.

Reuse existing modules and helpers.

---

# Performance

Lazy load where appropriate.

Avoid unnecessary reflows.

Minimize layout thrashing.

Avoid expensive loops.

Prefer CSS for simple visual effects.

---

# Accessibility

Support keyboard navigation.

Support reduced motion.

Use semantic markup.

Maintain sufficient color contrast.

Use aria attributes only when necessary.

---

# Comments

Only comment when it improves maintainability.

Do not comment obvious code.

---

# Code Quality

Before considering work complete, verify:

* No duplicate code
* No unused CSS
* No unused JavaScript
* No console errors
* No accessibility regressions
* Responsive across major viewport sizes
* Consistent naming conventions
* Existing architecture preserved
* Production-ready quality
