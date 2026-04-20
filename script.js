
  /* ===========================
     CUSTOM CURSOR
  =========================== */
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    cursorDot.style.left = cx + 'px';
    cursorDot.style.top = cy + 'px';
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
  });

  document.querySelectorAll('a, button, .dot, .product-card, .client-card, .metric-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  /* ===========================
     HERO CAROUSEL — TEXT + SVG ONLY
     Video stays continuous; slides only swap text & silhouettes
  =========================== */
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.dot');
  const progress = document.getElementById('heroProgress');
  const counterNum = document.getElementById('heroCounterNum');
  const INTERVAL = 6000;
  let current = 0, timer, progTimer, progStart;

  function pad(n) { return String(n).padStart(2,'0'); }

  function goTo(idx) {
    // Deactivate current
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (idx + slides.length) % slides.length;

    // Activate next
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    // Update counter
    if (counterNum) counterNum.textContent = `${pad(current+1)} / ${pad(slides.length)}`;

    // Reset progress bar
    resetProgress();
  }

  /* Animated progress bar */
  function resetProgress() {
    if (progress) {
      progress.style.transition = 'none';
      progress.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progress.style.transition = `width ${INTERVAL}ms linear`;
          progress.style.width = '100%';
        });
      });
    }
  }

  function next() { goTo(current + 1); }

  function startTimer() { timer = setInterval(next, INTERVAL); }
  function resetTimer() { clearInterval(timer); startTimer(); }

  // Init
  resetProgress();
  startTimer();

  dots.forEach(d => d.addEventListener('click', () => {
    goTo(+d.dataset.idx);
    resetTimer();
  }));

  /* ===========================
     HAMBURGER
  =========================== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ===========================
     COUNT-UP ANIMATION
  =========================== */
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCount(el, target, duration = 1800) {
    const suffix = '+';
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const val = Math.floor(easeOutQuart(progress) * target);
      el.textContent = val.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(step);
  }

  const metricNums = document.querySelectorAll('.metric-num');
  const metricObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        animateCount(el, target);
        metricObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  metricNums.forEach(el => metricObserver.observe(el));

  /* ===========================
     CLIENTS GRID BUILD + ANIMATE
  =========================== */
  const clients = [
    { name: "Rajasthan Spinning & Weaving Mills", abbr: "RS", color: "#1B5BC0" },
    { name: "Arvind Limited", abbr: "AL", color: "#0F3D8A" },
    { name: "Surat Textile Mills", abbr: "ST", color: "#2D6FD4" },
    { name: "Raymond Group", abbr: "RG", color: "#1B5BC0" },
    { name: "Bhilwara Spinners", abbr: "BS", color: "#0F3D8A" },
    { name: "Vardhman Textiles", abbr: "VT", color: "#2D6FD4" },
    { name: "Welspun India", abbr: "WI", color: "#1B5BC0" },
    { name: "Nahar Industrial", abbr: "NI", color: "#0F3D8A" },
    { name: "S. Kumars Nationwide", abbr: "SK", color: "#2D6FD4" },
    { name: "Indo Count Industries", abbr: "IC", color: "#1B5BC0" },
    { name: "Trident Limited", abbr: "TL", color: "#0F3D8A" },
    { name: "Alok Industries", abbr: "AI", color: "#2D6FD4" },
    { name: "Himatsingka Seide", abbr: "HS", color: "#1B5BC0" },
    { name: "Grasim Industries", abbr: "GI", color: "#0F3D8A" },
    { name: "JBF Industries", abbr: "JB", color: "#2D6FD4" },
    { name: "Bombay Dyeing", abbr: "BD", color: "#1B5BC0" },
    { name: "Garden Silk Mills", abbr: "GS", color: "#0F3D8A" },
    { name: "RSWM Limited", abbr: "RS", color: "#2D6FD4" },
    { name: "OCM India", abbr: "OC", color: "#1B5BC0" },
    { name: "Loyal Textiles", abbr: "LT", color: "#0F3D8A" },
  ];

  const grid = document.getElementById('clientsGrid');
  clients.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'client-card';
    card.style.transitionDelay = `${i * 40}ms`;
    card.innerHTML = `
      <div class="client-inner">
        <div class="client-abbr" style="background:${c.color}15;color:${c.color}">${c.abbr}</div>
        <div class="client-name">${c.name}</div>
      </div>`;
    grid.appendChild(card);
  });

  const clientObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.client-card').forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 50);
        });
        clientObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  clientObserver.observe(grid);

  /* ===========================
     NAVBAR SCROLL EFFECT
  =========================== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(8,12,22,0.95)';
    } else {
      navbar.style.background = 'rgba(15,20,32,0.72)';
    }
  });
  