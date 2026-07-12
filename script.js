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

  /* ----------------------------------------------------------
     9. Gallery — scroll-triggered reveal
     Header (label + heading + intro) reveals as one unit;
     each masonry cell reveals independently with a CSS-driven
     stagger (nth-child transition-delay), reusing the same
     createScrollReveal helper as About / Signature Dishes so
     entrances replay naturally on re-scroll.
  ---------------------------------------------------------- */
  const galleryHeader = document.getElementById("galleryHeader");
  const galleryCells = Array.from(document.querySelectorAll(".gallery__cell"));

  createScrollReveal([galleryHeader]);
  createScrollReveal(galleryCells, { threshold: 0.15 });

  /* ----------------------------------------------------------
     Experience — scroll-triggered reveal
     Header reveals as one unit; the editorial story column and
     the image column reveal together (image slides in from the
     right, mirroring the Chef section's opposite direction);
     the highlight list staggers in via CSS nth-child delays;
     the closing CTA reveals last — reusing the same
     createScrollReveal helper as every previous section.
  ---------------------------------------------------------- */
  const experienceHeader = document.getElementById("experienceHeader");
  const experienceContent = document.getElementById("experienceContent");
  const experienceVisual = document.getElementById("experienceVisual");
  const experienceHighlights = document.getElementById("experienceHighlights");
  const experienceCta = document.getElementById("experienceCta");

  createScrollReveal([experienceHeader]);
  createScrollReveal([experienceContent, experienceVisual]);
  createScrollReveal([experienceHighlights], { threshold: 0.15 });
  createScrollReveal([experienceCta]);

  /* ----------------------------------------------------------
     11. Executive Chef — scroll-triggered reveal
     Header (label + heading + intro) reveals as one unit;
     portrait and story content reveal independently — the
     portrait slides in from the left while the bio, staggered
     achievements, quote, and CTA fade up in sequence within
     the content column (handled via CSS transition-delay).
  ---------------------------------------------------------- */
  const chefHeader = document.getElementById("chefHeader");
  const chefVisual = document.getElementById("chefVisual");
  const chefContent = document.getElementById("chefContent");

  createScrollReveal([chefHeader]);
  createScrollReveal([chefVisual, chefContent]);

  /* ----------------------------------------------------------
     12. Reservation — scroll-triggered reveal, validation,
     and submission
     Header reveals as one unit; the reservation card and the
     supplementary info strip reveal together as the next beat
     (card fades/slides up immediately, info items stagger in
     via CSS nth-child delays), reusing the same
     createScrollReveal helper as every previous section.
  ---------------------------------------------------------- */
  const reservationHeader = document.getElementById("reservationHeader");
  const reservationCard = document.getElementById("reservationCard");
  const reservationInfo = document.getElementById("reservationInfo");

  createScrollReveal([reservationHeader]);
  createScrollReveal([reservationCard, reservationInfo]);

  const reservationForm = document.getElementById("reservationForm");

  if (reservationForm) {
    const reservationSubmit = document.getElementById("reservationSubmit");
    const reservationSuccess = document.getElementById("reservationSuccess");
    const reservationSuccessHeading = document.getElementById(
      "reservationSuccessHeading"
    );
    const reservationReset = document.getElementById("reservationReset");
    const dateInput = document.getElementById("resDate");

    // Prevent selecting a date in the past — browser-native date
    // picker, no custom calendar widget required.
    const today = new Date();
    const isoToday = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    dateInput.min = isoToday;

    // Field -> validator map. Each validator returns an error
    // message string, or an empty string when the value is valid.
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/;

    const validators = {
      name(value) {
        if (!value.trim()) return "Please enter your full name.";
        return "";
      },
      email(value) {
        if (!value.trim()) return "Please enter your email address.";
        if (!EMAIL_PATTERN.test(value.trim())) {
          return "Please enter a valid email address.";
        }
        return "";
      },
      phone(value) {
        if (!value.trim()) return "Please enter a phone number.";
        if (!PHONE_PATTERN.test(value.trim())) {
          return "Please enter a valid phone number.";
        }
        return "";
      },
      guests(value) {
        if (!value) return "Please select the number of guests.";
        return "";
      },
      date(value) {
        if (!value) return "Please choose a preferred date.";
        if (value < isoToday) return "Please choose a date from today onward.";
        return "";
      },
      time(value) {
        if (!value) return "Please choose a preferred time.";
        return "";
      },
    };

    // Cache each field's input + error span together so validation
    // and error rendering share a single lookup.
    const fields = Array.from(
      reservationForm.querySelectorAll("[name]")
    ).reduce((map, input) => {
      if (!validators[input.name]) return map; // e.g. optional "requests"
      map[input.name] = {
        input,
        errorEl: document.getElementById(`${input.id}Error`),
      };
      return map;
    }, {});

    function validateField(name) {
      const field = fields[name];
      if (!field) return true;
      const message = validators[name](field.input.value);
      field.errorEl.textContent = message;
      field.input.setAttribute("aria-invalid", message ? "true" : "false");
      return !message;
    }

    function validateAll() {
      let firstInvalidInput = null;

      Object.keys(fields).forEach((name) => {
        const fieldIsValid = validateField(name);
        if (!fieldIsValid && !firstInvalidInput) {
          firstInvalidInput = fields[name].input;
        }
      });

      return { isValid: !firstInvalidInput, firstInvalidInput };
    }

    // Validate on blur so feedback appears once a person has
    // actually finished with a field, not on every keystroke.
    Object.values(fields).forEach(({ input }) => {
      input.addEventListener("blur", () => validateField(input.name));
    });

    function setLoading(isLoading) {
      reservationSubmit.classList.toggle("is-loading", isLoading);
      reservationSubmit.disabled = isLoading;
    }

    function showSuccess() {
      reservationForm.hidden = true;
      reservationSuccess.hidden = false;

      // Force layout before adding the visible class so the
      // fade/scale/checkmark-draw transitions actually run.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          reservationSuccess.classList.add("is-visible");
        });
      });

      reservationSuccessHeading.focus();
      reservationForm.reset();
      setLoading(false);
    }

    function resetToForm() {
      reservationSuccess.classList.remove("is-visible");
      reservationSuccess.hidden = true;
      reservationForm.hidden = false;
      Object.values(fields).forEach(({ input, errorEl }) => {
        input.setAttribute("aria-invalid", "false");
        errorEl.textContent = "";
      });
      fields.name?.input.focus();
    }

    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const { isValid, firstInvalidInput } = validateAll();
      if (!isValid) {
        firstInvalidInput?.focus();
        return;
      }

      setLoading(true);

      // No booking API is wired up yet — this simulates the round
      // trip a real `fetch()` call to a reservations endpoint would
      // make, so the loading/success states can be built and tested
      // now and swapped for a real request later without touching
      // the surrounding UI logic.
      window.setTimeout(showSuccess, 900);
    });

    reservationReset?.addEventListener("click", resetToForm);
  }


  /* ----------------------------------------------------------
     13. Testimonials — scroll-triggered reveal
     Header reveals as one unit; each editorial testimonial
     card reveals independently with a gentle DOM-order stagger
     (CSS nth-child transition-delay), and the trust strip below
     reveals as a group with its own internal stagger — the same
     createScrollReveal helper used by every previous section,
     so entrances replay naturally on re-scroll.
  ---------------------------------------------------------- */
  const testimonialsHeader = document.getElementById("testimonialsHeader");
  const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
  const testimonialsTrust = document.getElementById("testimonialsTrust");

  createScrollReveal([testimonialsHeader]);
  createScrollReveal(testimonialCards, { threshold: 0.15 });
  createScrollReveal([testimonialsTrust]);

  /* ----------------------------------------------------------
     10. Gallery — premium fullscreen lightbox
     Fade + scale entrance, prev/next navigation, ESC + outside
     click to close, full keyboard support, and lazy-loaded
     larger images (the full-res src is only ever assigned to
     the lightbox <img> at the moment a slide is opened/shown).
  ---------------------------------------------------------- */
  const galleryItems = Array.from(document.querySelectorAll(".gallery__item"));

  if (galleryItems.length) {
    const lightbox = document.getElementById("lightbox");
    const lightboxBackdrop = document.getElementById("lightboxBackdrop");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxCounter = document.getElementById("lightboxCounter");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    // Build the slide list from the DOM — single source of truth,
    // no duplicated data between HTML and JS.
    const slides = galleryItems.map((btn) => ({
      full: btn.getAttribute("data-full"),
      alt: btn.querySelector("img")?.getAttribute("alt") ?? "",
      caption: btn.querySelector(".gallery__item-title")?.textContent ?? "",
    }));

    const focusableSelector = ".lightbox__close, .lightbox__nav";
    let currentIndex = 0;
    let triggerEl = null;
    let isOpen = false;

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function renderSlide(index) {
      const slide = slides[index];
      if (!slide) return;
      // Larger image is only requested here — at the moment the
      // slide is actually displayed — never preloaded up front.
      lightboxImage.src = slide.full;
      lightboxImage.alt = slide.alt;
      lightboxCaption.textContent = slide.caption;
      lightboxCounter.textContent = `${pad(index + 1)} / ${pad(slides.length)}`;
    }

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      renderSlide(currentIndex);
    }

    function openLightbox(index, sourceEl) {
      triggerEl = sourceEl ?? null;
      isOpen = true;
      showSlide(index);

      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");

      // Force layout before adding the class so the fade/scale
      // transition actually runs (matches the reduced-motion-safe
      // pattern used by the hero entrance above).
      if (prefersReducedMotion) {
        lightbox.classList.add("is-open");
      } else {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => lightbox.classList.add("is-open"));
        });
      }

      lightboxClose.focus();
      document.addEventListener("keydown", handleKeydown);
    }

    function closeLightbox() {
      if (!isOpen) return;
      isOpen = false;
      lightbox.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
      document.removeEventListener("keydown", handleKeydown);

      const finish = () => {
        lightbox.hidden = true;
        lightboxImage.src = "";
        triggerEl?.focus();
      };

      if (prefersReducedMotion) {
        finish();
      } else {
        lightboxBackdrop.addEventListener("transitionend", finish, { once: true });
        // Safety net in case transitionend doesn't fire
        setTimeout(finish, 700);
      }
    }

    function next() {
      showSlide(currentIndex + 1);
    }

    function prev() {
      showSlide(currentIndex - 1);
    }

    function trapFocus(e) {
      const focusables = Array.from(
        lightbox.querySelectorAll(focusableSelector)
      );
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    function handleKeydown(e) {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowRight":
          next();
          break;
        case "ArrowLeft":
          prev();
          break;
        case "Tab":
          trapFocus(e);
          break;
      }
    }

    galleryItems.forEach((btn, index) => {
      btn.addEventListener("click", () => openLightbox(index, btn));
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxBackdrop.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", next);
    lightboxPrev.addEventListener("click", prev);
  }

  /* ----------------------------------------------------------
     14. Location -- scroll-triggered reveal
     Same createScrollReveal helper as every previous section:
     the header reveals as one unit, the information column
     reveals with its own internal stagger (address, hours,
     contact, parking, note, CTA), and the map slides in from
     the opposite side -- the same split-layout reveal language
     used by the Chef and Experience sections.
  ---------------------------------------------------------- */
  const locationHeader = document.getElementById("locationHeader");
  const locationInfo = document.getElementById("locationInfo");
  const locationMap = document.getElementById("locationMap");

  createScrollReveal([locationHeader]);
  createScrollReveal([locationInfo]);
  createScrollReveal([locationMap]);
})();
