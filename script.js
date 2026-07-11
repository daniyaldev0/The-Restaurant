/* ============================================================
   VOLTERRA — Navigation + Hero interactions
   Vanilla JS only. transform/opacity animations, 60fps friendly.
   ============================================================ */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ----------------------------------------------------------
     1. Sticky nav — transparent -> glassmorphism on scroll
  ---------------------------------------------------------- */
  const nav = document.getElementById("siteNav");
  const SCROLL_THRESHOLD = 24;
  let lastScrolledState = false;

  function updateNavOnScroll() {
    const shouldBeScrolled = window.scrollY > SCROLL_THRESHOLD;
    if (shouldBeScrolled !== lastScrolledState) {
      nav.classList.toggle("nav--scrolled", shouldBeScrolled);
      lastScrolledState = shouldBeScrolled;
    }
  }

  // Passive listener + rAF throttle for smooth 60fps scroll handling
  let scrollTicking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          updateNavOnScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    },
    { passive: true }
  );

  updateNavOnScroll(); // set initial state

  /* ----------------------------------------------------------
     2. Animated active/hover nav indicator
     A thin gold rule slides beneath whichever link is
     hovered/focused, echoing the hero's signature rule motif.
  ---------------------------------------------------------- */
  const navLinksWrap = document.querySelector(".nav__links");
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const indicator = document.getElementById("navIndicator");

  function moveIndicatorTo(el) {
    if (!el || !navLinksWrap) return;
    const wrapRect = navLinksWrap.getBoundingClientRect();
    const linkRect = el.getBoundingClientRect();
    const left = linkRect.left - wrapRect.left;
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.transform = `translateX(${left}px)`;
    indicator.classList.add("is-active");
  }

  function hideIndicator() {
    indicator.classList.remove("is-active");
  }

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => moveIndicatorTo(link));
    link.addEventListener("focus", () => moveIndicatorTo(link));
  });

  navLinksWrap?.addEventListener("mouseleave", hideIndicator);
  navLinksWrap?.addEventListener("focusout", (e) => {
    // Only hide if focus is leaving the whole nav links group
    if (!navLinksWrap.contains(e.relatedTarget)) hideIndicator();
  });

  // Keep indicator aligned on resize if currently shown on a link
  window.addEventListener("resize", () => {
    const activeLink = document.activeElement;
    if (activeLink && activeLink.classList.contains("nav__link")) {
      moveIndicatorTo(activeLink);
    } else {
      hideIndicator();
    }
  });

  /* ----------------------------------------------------------
     3. Mobile hamburger menu
  ---------------------------------------------------------- */
  const burger = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMobileMenu() {
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    mobileMenu.classList.remove("is-open");
  }

  function openMobileMenu() {
    burger.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
    mobileMenu.classList.add("is-open");
  }

  burger?.addEventListener("click", () => {
    const isOpen = burger.classList.contains("is-open");
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  // Close mobile menu after selecting a link
  document.querySelectorAll(".mobile-menu__link, .mobile-menu__cta").forEach(
    (link) => link.addEventListener("click", closeMobileMenu)
  );

  // Close on Escape for keyboard users
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burger.classList.contains("is-open")) {
      closeMobileMenu();
      burger.focus();
    }
  });

  /* ----------------------------------------------------------
     4. Cinematic hero entrance sequence
     Staggered via CSS animation-delay; JS just triggers the
     classes once (and swaps to a reduced-motion-safe path).
  ---------------------------------------------------------- */
  const heroBg = document.getElementById("heroBg");
  const heroEyebrow = document.getElementById("heroEyebrow");
  const heroHeadline = document.getElementById("heroHeadline");
  const heroSubtext = document.getElementById("heroSubtext");
  const heroActions = document.getElementById("heroActions");
  const heroScroll = document.getElementById("heroScroll");

  function revealHero() {
    if (prefersReducedMotion) {
      // Skip animation, just show everything immediately
      [nav, heroBg, heroEyebrow, heroHeadline, heroSubtext, heroActions, heroScroll].forEach(
        (el) => {
          el.style.animation = "none";
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      );
      heroBg.classList.add("is-visible");
      return;
    }

    nav.classList.add("is-visible");
    heroBg.classList.add("is-visible");
    heroEyebrow.classList.add("is-visible");
    heroHeadline.classList.add("is-visible");
    heroSubtext.classList.add("is-visible");
    heroActions.classList.add("is-visible");
    heroScroll.classList.add("is-visible");
  }

  // Wait for the hero image to load (or fall back after a short delay)
  // so the entrance doesn't fire over a blank/broken background.
  const heroImg = heroBg.querySelector("img");
  let revealed = false;

  function safeReveal() {
    if (revealed) return;
    revealed = true;
    revealHero();
  }

  if (heroImg.complete) {
    safeReveal();
  } else {
    heroImg.addEventListener("load", safeReveal, { once: true });
    heroImg.addEventListener("error", safeReveal, { once: true });
    // Fallback in case load/error never fires promptly
    setTimeout(safeReveal, 1200);
  }

  /* ----------------------------------------------------------
     5. Reusable scroll-reveal helper
     Toggles .is-inview on a set of elements as they cross the
     viewport threshold (rather than a one-shot "seen once"
     flag), so entrance animations replay naturally every time
     a section scrolls out of and back into view. Shared by the
     About section and the Signature Dishes section below.
  ---------------------------------------------------------- */
  function createScrollReveal(elements, options = {}) {
    const targets = elements.filter(Boolean);
    if (!targets.length) return null;

    if (prefersReducedMotion) {
      // Skip motion entirely; show content in its resting state
      targets.forEach((el) => el.classList.add("is-inview"));
      return null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      {
        threshold: options.threshold ?? 0.28,
        rootMargin: options.rootMargin ?? "0px 0px -8% 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));
    return observer;
  }

  /* ----------------------------------------------------------
     6. About section — scroll-triggered reveal
  ---------------------------------------------------------- */
  const aboutVisual = document.getElementById("aboutVisual");
  const aboutContent = document.getElementById("aboutContent");

  createScrollReveal([aboutVisual, aboutContent]);

  /* ----------------------------------------------------------
     7. Signature Dishes — scroll-triggered reveal
     Header (label + heading) reveals as one unit; each dish
     card's image and text content reveal independently so the
     image can slide in while the text fades up in its own
     staggered sequence (handled via CSS transition-delay).
  ---------------------------------------------------------- */
  const dishesHeader = document.getElementById("dishesHeader");
  const dishRevealEls = Array.from(document.querySelectorAll("[data-reveal]"));

  createScrollReveal([dishesHeader]);
  createScrollReveal(dishRevealEls);

  /* ----------------------------------------------------------
     8. Smooth-scroll for in-page nav links (progressive
     enhancement on top of CSS `scroll-behavior: smooth`)
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId.length <= 1) return; // guard against bare "#"
      const target = document.querySelector(targetId);
      if (!target) return; // section not built yet in this incremental build
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });
})();
