/* ──────────────────────────────────────
     CUSTOM CURSOR
  ────────────────────────────────────── */
const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursor-dot");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
});
document
  .querySelectorAll(
    "a, button, .dot, .product-card, .client-card, .metric-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });

/* ──────────────────────────────────────
     SMART NAVBAR — hide on scroll-down, show on scroll-up
  ────────────────────────────────────── */
const navbar = document.getElementById("navbar");
let lastScrollY = 0,
  navTicking = false;
window.addEventListener("scroll", () => {
  if (!navTicking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 120) {
        navbar.classList.add("nav-hidden");
      } else {
        navbar.classList.remove("nav-hidden");
      }
      navbar.classList.toggle("nav-scrolled", y > 60);
      lastScrollY = y;
      navTicking = false;
    });
    navTicking = true;
  }
});

/* ──────────────────────────────────────
     HERO CAROUSEL (text-only; video continuous)
  ────────────────────────────────────── */
// const slides = document.querySelectorAll(".hero-slide");
// const dots = document.querySelectorAll(".dot");
// const progressEl = document.getElementById("heroProgress");
// const counterEl = document.getElementById("heroCounterNum");
// const INTERVAL = 6000;
// let current = 0,
//   carouselTimer;

// function pad(n) {
//   return String(n).padStart(2, "0");
// }

// function goTo(idx) {
//   slides[current].classList.remove("active");
//   dots[current].classList.remove("active");
//   dots[current].setAttribute("aria-selected", "false");

//   current = (idx + slides.length) % slides.length;

//   /* 110ms reset window — lets CSS transitions snap children back to start */
//   setTimeout(() => {
//     slides[current].classList.add("active");
//     dots[current].classList.add("active");
//     dots[current].setAttribute("aria-selected", "true");
//     if (counterEl)
//       counterEl.textContent = `${pad(current + 1)} / ${pad(slides.length)}`;
//   }, 110);

//   resetProgress();
// }

// function resetProgress() {
//   if (!progressEl) return;
//   progressEl.style.transition = "none";
//   progressEl.style.width = "0%";
//   requestAnimationFrame(() =>
//     requestAnimationFrame(() => {
//       progressEl.style.transition = `width ${INTERVAL}ms linear`;
//       progressEl.style.width = "100%";
//     }),
//   );
// }

// function startCarousel() {
//   carouselTimer = setInterval(() => goTo(current + 1), INTERVAL);
// }
// function resetCarousel() {
//   clearInterval(carouselTimer);
//   startCarousel();
// }

// resetProgress();
// startCarousel();

// dots.forEach((d) => {
//   d.addEventListener("click", () => {
//     goTo(+d.dataset.idx);
//     resetCarousel();
//   });
//   d.addEventListener("keydown", (e) => {
//     if (e.key === "Enter" || e.key === " ") {
//       goTo(+d.dataset.idx);
//       resetCarousel();
//     }
//   });
// });

/* ──────────────────────────────────────
     HAMBURGER MENU
  ────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", open);
});
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }),
);

/* ──────────────────────────────────────
     SCROLL REVEAL + COUNT-UP
     One IntersectionObserver handles both
  ────────────────────────────────────── */
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function countUp(el, target, duration = 4000) {
  let start = null;
  (function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent =
      Math.floor(easeOutQuart(p) * target).toLocaleString() + "+";
    p < 1
      ? requestAnimationFrame(step)
      : (el.textContent = target.toLocaleString() + "+");
  })(performance.now());
}

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains("reveal")) el.classList.add("revealed");
      if (el.classList.contains("metric-num")) countUp(el, +el.dataset.count);
      obs.unobserve(el);
    });
  },
  { threshold: 0.18 },
);

document
  .querySelectorAll(".reveal, .metric-num")
  .forEach((el) => revealObserver.observe(el));

/* ──────────────────────────────────────
     CLIENTS GRID — build + staggered reveal
  ────────────────────────────────────── */
const clientData = [
  { name: "", logo: "client-logo/Premier.png", color: "#1B5BC0" },
  { name: "", logo: "client-logo/Pratibha.png", color: "#0F3D8A" },
  { name: "", logo: "client-logo/Mafatlal.png", color: "#2D6FD4" },
  { name: "", logo: "client-logo/lakshmi.png", color: "#1B5BC0" },
  { name: "", logo: "client-logo/Kriplon.png", color: "#0F3D8A" },
  { name: "", logo: "client-logo/khosla.png", color: "#2D6FD4" },
  { name: "", logo: "client-logo/kg_denim.png", color: "#1B5BC0" },
  { name: "", logo: "client-logo/Banswara.png", color: "#0F3D8A" },
  { name: "", logo: "client-logo/Donear.png", color: "#2D6FD4" },
  { name: "", logo: "client-logo/Linen.png", color: "#1B5BC0" },
  { name: "", logo: "client-logo/S._Kumars.png", color: "#0F3D8A" },
  { name: "", logo: "client-logo/Grasim.png", color: "#2D6FD4" },
  { name: "", logo: "client-logo/Creative.png", color: "#1B5BC0" },
  { name: "", logo: "client-logo/Chiripal.png", color: "#0F3D8A" },
  { name: "", logo: "client-logo/Bhaskar_Denim.png", color: "#2D6FD4" },
  { name: "", logo: "client-logo/ANV.png", color: "#1B5BC0" },
  { name: "", logo: "client-logo/VTX.png", color: "#0F3D8A" },
  { name: "", logo: "client-logo/Supreme.png", color: "#2D6FD4" },
  { name: "", logo: "client-logo/Sutlej.png", color: "#1B5BC0" },
  { name: "", logo: "client-logo/Sangam.png", color: "#0F3D8A" },
];

const grid = document.getElementById("clientsGrid");

if (grid) {
  function createCard(c, isDuplicate) {
    const card = document.createElement("div");
    card.className = "client-card" + (isDuplicate ? " duplicate" : "");
    card.innerHTML = `
      <div class="client-inner">
          <div class="client-logo-wrapper">
              <img src="${c.logo}" alt="${c.name}" class="client-logo-img">
          </div>
          <div class="client-name">${c.name}</div>
      </div>
  `;
    grid.appendChild(card);
  }

  // Original set for desktop grid and first half of mobile marquee
  clientData.forEach((c) => createCard(c, false));
  // Duplicate set for seamless looping mobile marquee
  clientData.forEach((c) => createCard(c, true));

  new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target
          .querySelectorAll(".client-card")
          .forEach((card, i) =>
            setTimeout(() => card.classList.add("revealed"), i * 45),
          );
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  ).observe(grid);
}


// animation for parallax window

// const heroVideo = document.getElementById('hero-video');

// window.addEventListener('scroll', () => {
//     // If the user scrolls more than 50px down, mute the video
//     if (window.scrollY > 100) {
//         heroVideo.muted = true;
//     } 
//     // Optional: Unmute when they scroll back to the very top
//     else {
//        heroVideo.muted = false;
//     }
// });

/* ──────────────────────────────────────
     DYNAMIC TAB TITLE (Come Back effect)
   ────────────────────────────────────── */
let originalTitle = document.title;
window.addEventListener("blur", () => {
  originalTitle = document.title;
  document.title = "Come Back! | Gayatri Industrial Engineers";
});
window.addEventListener("focus", () => {
  document.title = originalTitle;
});

/* ──────────────────────────────────────
     GLOBAL COPYRIGHT PROTECTION FOR IMAGES
   ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Prevent standard keyboard copying (Ctrl+C / Cmd+C) specifically on image elements
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 'c') || (e.metaKey && e.key === 'c')) {
      // If they are targeting an image element, wipe clipboard data
      if (document.activeElement.tagName === 'IMG') {
        navigator.clipboard.writeText('');
      }
    }
  });

  // 2. Clear clipboard if they attempt the native PrintScreen key string combo
  window.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
      navigator.clipboard.writeText('');
    }
  });

  // 3. Hero Image Slideshow
  const slides = document.querySelectorAll('.hero-slider .slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 4000); // Changes image every 4 seconds
  }

  // 4. Products Carousel Smooth Scroll
  const productsRow = document.querySelector('.products-row');
  const prevBtn = document.querySelector('.carousel-nav-btn.prev-btn');
  const nextBtn = document.querySelector('.carousel-nav-btn.next-btn');

  if (productsRow && prevBtn && nextBtn) {
    const getScrollAmount = () => {
      const card = productsRow.querySelector('.product-card');
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        const gap = parseInt(window.getComputedStyle(productsRow).gap) || 24;
        return cardWidth + gap;
      }
      return 300;
    };

    prevBtn.addEventListener('click', () => {
      productsRow.scrollBy({
        left: -getScrollAmount(),
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      productsRow.scrollBy({
        left: getScrollAmount(),
        behavior: 'smooth'
      });
    });

    const updateButtons = () => {
      const scrollLeft = Math.round(productsRow.scrollLeft);
      const maxScroll = productsRow.scrollWidth - productsRow.clientWidth;
      
      if (scrollLeft <= 5) {
        prevBtn.classList.add('disabled');
        prevBtn.setAttribute('disabled', 'true');
      } else {
        prevBtn.classList.remove('disabled');
        prevBtn.removeAttribute('disabled');
      }
      
      if (scrollLeft >= maxScroll - 5) {
        nextBtn.classList.add('disabled');
        nextBtn.setAttribute('disabled', 'true');
      } else {
        nextBtn.classList.remove('disabled');
        nextBtn.removeAttribute('disabled');
      }
    };

    productsRow.addEventListener('scroll', updateButtons);
    // Initial check
    updateButtons();
    // Re-check on window resize
    window.addEventListener('resize', updateButtons);
  }
});