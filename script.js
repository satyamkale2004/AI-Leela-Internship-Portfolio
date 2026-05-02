document.addEventListener("DOMContentLoaded", function () {
  // 1. INITIALIZATION
  gsap.registerPlugin(ScrollTrigger);
  const isMobile = window.innerWidth <= 768;

  /* ============================================================
     2. NAVIGATION & UI COMPONENTS
  ============================================================ */

  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle logic
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeBtn");
  const mobileLinks = mobileMenu.querySelectorAll(".mobile-nav-links li");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("active");

    // Stagger animation for links when menu opens
    gsap.from(mobileLinks, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
      clearProps: "all",
    });
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  // Smooth Scroll for all navigation links
  document
    .querySelectorAll('.nav-links a[href^="#"], .mobile-nav-links a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");

        // Close menu if open
        if (mobileMenu.classList.contains("active")) {
          setTimeout(() => mobileMenu.classList.remove("active"), 100);
        }

        // Delay scroll slightly if on mobile to allow menu to close
        setTimeout(() => {
          document.querySelector(targetId).scrollIntoView({
            behavior: "smooth",
          });
        }, mobileMenu.classList.contains("active") ? 500 : 0);
      });
    });

  // Handle CV Download links
  document.querySelectorAll("a.download-cv").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const fileUrl = this.getAttribute("href");
      window.open(fileUrl, "_blank");
    });
  });

  /* ============================================================
     3. TYPING ANIMATION (Tagline)
  ============================================================ */
  const textElement = document.getElementById("typingText");
  const text = "Cloud & DevOps Enthusiast.";
  const typingSpeed = 90;
  const deletingSpeed = 60;
  const pauseTime = 600;
  let index = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!isDeleting) {
      textElement.textContent = text.substring(0, index + 1);
      index++;
      if (index === text.length) {
        setTimeout(() => (isDeleting = true), pauseTime);
      }
    } else {
      textElement.textContent = text.substring(0, index - 1);
      index--;
      if (index === 0) {
        isDeleting = false;
      }
    }
    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
  }
  typeEffect();

  /* ============================================================
     4. HERO SECTION ANIMATIONS
  ============================================================ */
  gsap.set(".hero-text-anim", { opacity: 0 });
  gsap.set(".hero-img-anim", { opacity: 0 });

  function playHeroEntry() {
    if (isMobile) {
      gsap.fromTo(".hero-text-anim",
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
      );
      gsap.fromTo(".hero-img-anim",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
      );
    } else {
      gsap.fromTo(".hero-img-anim",
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "power3.out" }
      );
      gsap.fromTo(".hero-text-anim",
        { x: -120, y: -70, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1.3, ease: "power3.out" }
      );
    }
  }

  function playHeroExit() {
    if (isMobile) {
      gsap.to(".hero-text-anim", { x: -80, opacity: 0, duration: 0.9, ease: "power2.in" });
      gsap.to(".hero-img-anim", { x: 100, opacity: 0, duration: 0.9, ease: "power2.in" });
    } else {
      gsap.to(".hero-img-anim", { y: 120, opacity: 0, duration: 0.9, ease: "power2.in" });
      gsap.to(".hero-text-anim", { x: -120, y: -70, opacity: 0, duration: 0.9, ease: "power2.in" });
    }
  }

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top 80%",
    end: "bottom 10%",
    onEnter: playHeroEntry,
    onLeave: playHeroExit,
    onEnterBack: playHeroEntry,
    onLeaveBack: playHeroExit
  });

  /* ============================================================
     5. ABOUT SECTION ANIMATIONS
  ============================================================ */
  gsap.set(".about-anim-img", { opacity: 0, x: 120 });
  gsap.set(".about-anim-text", { opacity: 0, x: -120 });

  function aboutEntry() {
    gsap.to(".about-anim-img", { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
    gsap.to(".about-anim-text", { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.1 });
  }

  function aboutExit() {
    gsap.to(".about-anim-img", { x: 120, opacity: 0, duration: 0.9, ease: "power2.in" });
    gsap.to(".about-anim-text", { x: -120, opacity: 0, duration: 0.9, ease: "power2.in" });
  }

  ScrollTrigger.create({
    trigger: "#about",
    start: "top 85%",
    end: "bottom 20%",
    onEnter: aboutEntry,
    onLeave: aboutExit,
    onEnterBack: aboutEntry,
    onLeaveBack: aboutExit
  });

  /* ============================================================
   6. SKILLS SECTION ANIMATIONS (Now on Desktop + Mobile)
============================================================ */

const skills = document.querySelectorAll(".skill-anim");

// Initial hidden state
gsap.set(skills, { opacity: 0, scale: 0.4, y: 20 });

// Show animation (fast snap)
const showSkills = () => {
  gsap.to(skills, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.15,
    ease: "power1.out",
    stagger: 0.03
  });
};

// Hide animation (snap back)
const hideSkills = () => {
  gsap.to(skills, {
    opacity: 0,
    scale: 0.4,
    y: 20,
    duration: 0.15,
    ease: "power1.in",
    stagger: 0.02
  });
};

// Scroll trigger active on ALL devices now
ScrollTrigger.create({
  trigger: ".skills",
  start: "top 90%",
  end: "bottom 5%",
  onEnter: showSkills,
  onEnterBack: showSkills,
  onLeave: hideSkills,
  onLeaveBack: hideSkills
});

/* ============================================================
   PROJECT SECTION ANIMATION — AUTO-DETECT + FULLY WORKING
============================================================ */

const projectCards = document.querySelectorAll("#projectsSlider .project-card");

if (projectCards.length >= 3) {
  const p1 = projectCards[0]; // left side
  const p2 = projectCards[1]; // bottom
  const p3 = projectCards[2]; // right side

  // Initial hidden state
  gsap.set(p1, { opacity: 0, x: -70 });
  gsap.set(p2, { opacity: 0, y: 70 });
  gsap.set(p3, { opacity: 0, x: 70 });

  function animateProjects() {
    gsap.to(p1, {
      x: 0,
      opacity: 1,
      duration: 0.35,
      ease: "power2.out"
    });

    gsap.to(p2, {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
      delay: 0.05
    });

    gsap.to(p3, {
      x: 0,
      opacity: 1,
      duration: 0.35,
      ease: "power2.out"
    });
  }

  function resetProjects() {
    gsap.set(p1, { opacity: 0, x: -70 });
    gsap.set(p2, { opacity: 0, y: 70 });
    gsap.set(p3, { opacity: 0, x: 70 });
  }

  ScrollTrigger.create({
    trigger: "#projects",
    start: "top 85%",
    end: "bottom 10%",
    onEnter: animateProjects,
    onEnterBack: animateProjects,
    onLeave: resetProjects,
    onLeaveBack: resetProjects
  });
}


  /* ============================================================
     8. CERTIFICATE & EDUCATION ANIMATIONS
  ============================================================ */
  // Certificate Card Reveal
  gsap.utils.toArray(".certificate-card").forEach((card) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  });
/* ================================================================
   EDUCATION — STACK → EXPAND → STACK (Works UP + DOWN)
================================================================ */

const eduCards = document.querySelectorAll(".edu-anim");

// Reset to stacked state
function stack() {
  gsap.set(eduCards, {
    opacity: 0,
    scale: 0.2,
    x: 0,
    y: 0,
    left: "50%",
    translateX: "-50%"
  });
}

// Expand outward to actual grid layout
function expand() {
  gsap.to(eduCards, {
    opacity: 1,
    scale: 1,
    left: "0%",
    translateX: "0%",
    x: 0,
    y: 0,
    duration: 0.45,
    ease: "power3.out",
    stagger: 0.1
  });
}

// ScrollTrigger controller
ScrollTrigger.create({
  trigger: "#education",
  start: "top 85%",
  end: "bottom 15%",

  onEnter: () => { stack(); expand(); },        // scroll DOWN → expand
  onEnterBack: () => { stack(); expand(); },    // scroll UP → expand again

  onLeave: () => stack(),                       // scroll past → collapse
  onLeaveBack: () => stack()                    // scroll above → collapse
});

// Initial state
stack();



  /* ============================================================
     9. SLIDER LOGIC (Projects & Certificates)
  ============================================================ */
  function setupSlider(sliderId, indicatorId, cardClass) {
    const slider = document.getElementById(sliderId);
    const indicator = document.getElementById(indicatorId);
    if (window.innerWidth > 1024 || !slider || !indicator) {
      if (indicator) indicator.innerHTML = "";
      return;
    }

    indicator.innerHTML = "";
    const cards = slider.querySelectorAll(cardClass);
    if (cards.length === 0) return;

    // Create dot indicators
    cards.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.setAttribute("tabindex", "0");
      dot.addEventListener("click", () => {
        const cardOffset = cards[index].offsetLeft;
        const sliderPadding = parseFloat(getComputedStyle(slider).paddingLeft) || 0;
        slider.scrollTo({ left: cardOffset - sliderPadding, behavior: "smooth" });
      });
      indicator.appendChild(dot);
    });

    // Update active dot on scroll
    let scrollTimeout;
    const updateDots = () => {
      const scrollPosition = slider.scrollLeft;
      let activeIndex = 0;
      let closestDistance = Infinity;
      const viewportCenter = scrollPosition + slider.clientWidth / 2;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          activeIndex = index;
        }
      });

      indicator.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
      });
    };

    slider.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateDots, 50);
    });
    updateDots();
  }

  function setupAllSliders() {
    setupSlider("projectsSlider", "dotIndicators", ".project-card");
    setupSlider("certificatesSlider", "certificateDotIndicators", ".certificate-card");
  }

  window.addEventListener("resize", setupAllSliders);
  setupAllSliders();

  /* ============================================================
     10. CONTACT FORM SUBMISSION (Google Sheets)
  ============================================================ */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = {
        name: contactForm.querySelector('input[name="name"]').value,
        email: contactForm.querySelector('input[name="email"]').value,
        message: contactForm.querySelector('textarea[name="message"]').value,
      };

      const scriptURL = "https://script.google.com/macros/s/AKfycbyrs4C1NZymddZB6XBFekkRzrsKnGY11_OLJsHIe7TPhsDQ6Kp6GFSudtWqZanAEr93/exec";

      try {
        await fetch(scriptURL, {
          method: "POST",
          body: JSON.stringify(formData),
          mode: "no-cors",
        });
        alert("✅ Your message has been sent successfully!");
        contactForm.reset();
      } catch (error) {
        console.error("Error!", error);
        alert("❌ Something went wrong. Please try again.");
      }
    });
  }
});