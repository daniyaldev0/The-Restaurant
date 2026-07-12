# 07_RESERVATION.md

## Objective

Design and implement a premium Reservation section for our luxury restaurant website.

This section should feel comparable to the online reservation experience of a Michelin-star restaurant—not a generic booking form.

The goal is to communicate elegance, exclusivity, and confidence through thoughtful layout, refined typography, generous whitespace, and subtle motion.

Follow every attached project document.

Do not modify any existing section.

Generate only the additions required for:

* `index.html`
* `style.css`
* `script.js`

---

# Design Direction

The Reservation section should evoke the feeling of booking an unforgettable dining experience.

Think:

* Apple
* Aman Hotels
* Nobu
* Four Seasons
* Framer-quality interactions

The interface should feel:

* Premium
* Editorial
* Calm
* Sophisticated
* Luxurious
* Minimal
* Timeless

Avoid anything that feels:

* Corporate
* Template-based
* Busy
* Over-designed
* Flashy

Luxury should come from restraint.

---

# Section Layout

Create a spacious, full-width section with excellent visual rhythm.

Recommended structure:

Small section label

↓

Editorial headline

↓

Short supporting paragraph

↓

Reservation card

↓

Supplementary reservation information

The composition should naturally guide the user's eye downward.

---

# Reservation Card

The reservation form should be the visual centerpiece.

The card should feel handcrafted with:

* Soft border
* Large border radius
* Elegant shadow
* Spacious internal padding
* Balanced proportions

The card should stand out through composition rather than excessive decoration.

---

# Reservation Form

Include:

* Full Name
* Email Address
* Phone Number
* Number of Guests
* Preferred Date
* Preferred Time
* Special Requests
* Reserve Table button

Use semantic HTML.

Associate every input with a proper label.

Provide meaningful placeholder text.

Optimize keyboard navigation.

---

# User Experience

The booking process should feel effortless.

Every interaction should provide subtle visual feedback.

Examples include:

* Smooth focus transitions
* Elegant hover states
* Gentle card depth changes
* Refined button interactions
* Calm validation feedback

The interface should always feel responsive without being distracting.

---

# Premium Details

Add one or two understated luxury touches.

Examples:

* Opening hours
* Dress code
* Private dining availability
* Telephone reservations for large parties
* Reservation confirmation note

Keep these subtle.

Do not clutter the interface.

---

# Validation

Implement client-side validation using Vanilla JavaScript.

Validate:

* Required fields
* Email format
* Guest count
* Date cannot be in the past
* Time selected

Display elegant inline validation messages.

Do not use browser alerts.

Validation should integrate naturally into the design.

---

# Success State

After successful validation:

* Prevent page refresh
* Display a refined confirmation message
* Animate the confirmation smoothly
* Reset the form

The confirmation should feel reassuring and premium.

---

# Animations

Reuse the project's existing animation system.

Reveal the section using the existing IntersectionObserver implementation.

Animate:

* Heading
* Supporting text
* Reservation card
* Information block

Use staggered timing.

Animate only:

* opacity
* transform

Motion should feel smooth, natural, and premium.

Every interaction should maintain approximately 60 FPS.

Transitions should reinforce quality without drawing unnecessary attention.

---

# Responsiveness

The section must feel intentionally designed on every screen size.

Desktop:

Comfortable spacing with a balanced composition.

Tablet:

Preserve hierarchy while reducing spacing.

Mobile:

Single-column layout.

Large touch targets.

Comfortable form spacing.

No horizontal scrolling.

No layout shifts.

---

# Performance

Reuse existing CSS variables.

Reuse helper functions.

Avoid duplicate logic.

Cache DOM references.

Avoid unnecessary event listeners.

Keep JavaScript modular and maintainable.

---

# Code Quality

Produce production-ready code.

Do not include placeholder code.

Do not leave TODO comments.

Maintain clean organization.

Keep HTML semantic.

Keep CSS organized.

Keep JavaScript modular.

Only generate code directly related to this Reservation section.

Do not regenerate or modify previous sections.
