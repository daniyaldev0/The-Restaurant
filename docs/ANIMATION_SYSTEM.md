# ANIMATION_SYSTEM.md

Version: 1.0

---

# Philosophy

Animations should enhance usability.

Not distract from it.

Every movement must feel:

Natural

Elegant

Purposeful

Refined

Invisible until noticed.

Inspired by

Apple

Framer

Stripe

Aman Hotels

---

# Performance

Target

60 FPS

Animate only

transform

opacity

Never animate

top

left

width

height

margin

padding

Avoid layout shifts.

---

# Timing

Small Animation

200–300ms

Standard

500–700ms

Large

800–1200ms

Never exceed

1500ms

unless creating cinematic hero moments.

---

# Easing

Default

cubic-bezier(0.22,1,0.36,1)

Use consistently.

---

# Hover Animations

Buttons

Lift slightly

Increase shadow

Soft color transition

Cards

Lift

Image zoom

Shadow

Links

Underline slide

Opacity

Navigation

Smooth active indicator

Premium hover

---

# Hero Animation

Page load

Navbar

↓

Fade Down

Hero Heading

↓

Fade Up

Paragraph

↓

Fade Up

Buttons

↓

Fade Up

Background

↓

Slow Scale

Scroll Indicator

↓

Fade In

Sequence should feel cinematic.

---

# Scroll Reveal

Use

IntersectionObserver

Each section

Fade Up

Stagger children.

Replay naturally when re-entering viewport.

Never animate once only.

---

# Stagger

Delay

60–100ms

Maximum

300ms

Avoid long delays.

---

# Gallery

Images

Fade

Scale

Reveal

Hover

Zoom 1.03

Overlay fade

Caption fade

---

# Menu

Category changes

Crossfade

Small translateY

Maintain layout stability.

---

# Forms

Focus

Border transition

Shadow transition

Placeholder animation

Success

Apple-style checkmark

Loading spinner

No page reload.

---

# Modals

Fade

Scale

Blur background

ESC closes

Outside click closes

Focus trapping.

---

# Navigation

Glass effect

Smooth transition

Hide/reveal on scroll (optional)

Animated active indicator.

---

# Buttons

Transition

300ms

Hover

Lift

Shadow

Color

Focus

Visible outline.

---

# Cards

Hover

Lift

Scale

Shadow

Never rotate.

Never bounce.

---

# Images

Lazy-load

Fade when loaded

Maintain aspect ratio.

---

# Accessibility

Respect

prefers-reduced-motion

Provide reduced or no animation.

Never block interaction with animations.

---

# JavaScript

Use

IntersectionObserver

requestAnimationFrame only when required.

Passive event listeners.

Throttle expensive events.

Avoid unnecessary timers.

---

# Microinteractions

Every interaction should acknowledge the user.

Examples

Hover

Focus

Click

Success

Error

Loading

Completion

Nothing should feel static.

---

# Animation Checklist

✓ Smooth

✓ Responsive

✓ Accessible

✓ Performant

✓ Consistent

✓ Purposeful

✓ Elegant

✓ Hardware Accelerated

If an animation does not improve the experience, remove it.