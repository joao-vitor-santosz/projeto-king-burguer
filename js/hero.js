// ============================================
// Hero Animations (Entrance, Pulsing and Bounce)
// ============================================

const initHeroAnimations = () => {
  const heroSection = document.querySelector('.hero-section');
  const heroContent = heroSection?.querySelector('.hero-content');
  const heroImageWrapper = heroSection?.querySelector('.hero-image-wrapper');
  const heroBadge = heroSection?.querySelector('.hero-badge');
  const heroScrollIndicator = heroSection?.querySelector('.hero-scroll-indicator');

  if (!heroSection || !heroContent || !heroImageWrapper || !heroBadge || !heroScrollIndicator) {
    return;
  }

  const reveal = () => {
    // Entradas em cascata para melhor presença visual
    heroBadge.classList.add('is-visible');

    window.setTimeout(() => {
      heroContent.classList.add('is-visible');
    }, 120);

    window.setTimeout(() => {
      heroImageWrapper.classList.add('is-visible');
    }, 180);

    window.setTimeout(() => {
      heroScrollIndicator.classList.add('is-visible');
    }, 300);

    // Não precisa observar mais após o primeiro disparo
    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleItem = entries.find((entry) => entry.isIntersecting);
      if (visibleItem) {
        reveal();
      }
    },
    {
      root: null,
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px',
    }
  );

  observer.observe(heroSection);
};

// ============================================
// Kings Bacon Section Scroll Reveal
// ============================================

const initKingsBaconAnimations = () => {
  const section = document.getElementById('the-kings-bacon');
  if (!section) return;

  const title = section.querySelector('#kings-bacon-title');
  const subtitle = section.querySelector('.kings-bacon-subtitle');
  const cards = section.querySelectorAll('.kb-card');

  if (!title || !subtitle || !cards.length) return;

  cards.forEach((card, index) => {
    if (index === 0) card.classList.add('kb-card-enter-left');
    if (index === 1) card.classList.add('kb-card-fade');
    if (index === 2) card.classList.add('kb-card-enter-right');
  });

  const showAnimation = () => {
    title.classList.add('is-visible');

    window.setTimeout(() => {
      subtitle.classList.add('is-visible');
    }, 110);

    cards.forEach((card, index) => {
      const delay = [0, 100, 200][index] || 0;
      window.setTimeout(() => {
        card.classList.add('is-visible');
      }, 220 + delay);
    });

    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const hasVisible = entries.some((entry) => entry.isIntersecting);
      if (hasVisible) showAnimation();
    },
    {
      root: null,
      threshold: 0.2,
      rootMargin: '0px 0px -120px 0px',
    }
  );

  observer.observe(section);
};

// King em Dobro — Entrada e contadores
const animateCounter = (element, from, to, duration) => {
  let startTime = null;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = from + (to - from) * progress;
    element.textContent = Math.round(value);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

const initKingDobroAnimations = () => {
  const section = document.getElementById('promocoes');
  if (!section) return;

  const offer = section.querySelector('.king-dobro-offer');
  const card = section.querySelector('.king-selection-card');
  const numberEl = section.querySelector('.king-dobro-highlights .number');
  const amountEl = section.querySelector('.king-dobro-price .amount');
  const centsEl = section.querySelector('.king-dobro-price .cents');

  if (!offer || !card || !numberEl || !amountEl || !centsEl) return;

  numberEl.textContent = '0';
  amountEl.textContent = '0';
  centsEl.textContent = ',0';

  const showAnimation = () => {
    offer.classList.add('is-visible');
    card.classList.add('is-visible');

    animateCounter(numberEl, 0, 2, 900);
    animateCounter(amountEl, 0, 25, 1200);

    let centsStart = 0;
    const centsDuration = 1200;
    const centsStep = (timestamp) => {
      if (!centsStart) centsStart = timestamp;
      const progress = Math.min((timestamp - centsStart) / centsDuration, 1);
      const value = Math.round(0 + (90 - 0) * progress);
      centsEl.textContent = `,${value}`;

      if (progress < 1) {
        window.requestAnimationFrame(centsStep);
      }
    };

    window.requestAnimationFrame(centsStep);

    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible) showAnimation();
    },
    {
      root: null,
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px',
    }
  );

  observer.observe(section);
};

// ============================================
// Ingredientes Premium — Entrada com fade + bounce
// ============================================
const initIngredientesPremiumAnimations = () => {
  const section = document.getElementById('ingredientes-premium');
  if (!section) return;

  const title = section.querySelector('#ingredientes-premium-title');
  const subtitle = section.querySelector('.ingredientes-premium-subtitle');
  const cards = section.querySelectorAll('.ingrediente-card');

  if (!title || !subtitle || !cards.length) return;

  const showAnimation = () => {
    title.classList.add('is-visible');

    window.setTimeout(() => {
      subtitle.classList.add('is-visible');
    }, 120);

    cards.forEach((card, index) => {
      window.setTimeout(() => {
        card.classList.add('is-visible');
      }, 250 + index * 120);
    });

    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible) showAnimation();
    },
    {
      root: null,
      threshold: 0.2,
      rootMargin: '0px 0px -130px 0px',
    }
  );

  observer.observe(section);
};

const initHmmmmAnimations = () => {
  const section = document.getElementById('hmmmm');
  if (!section) return;

  const title = section.querySelector('.hmmmm-header h2');
  const subtitle = section.querySelector('.hmmmm-header p');
  const imageWrapper = section.querySelector('.hmmmm-image-wrapper');
  const content = section.querySelector('.hmmmm-content');

  if (!title || !subtitle || !imageWrapper || !content) return;

  const showAnimation = () => {
    title.classList.add('is-visible');
    subtitle.classList.add('is-visible');
    imageWrapper.classList.add('is-visible');
    content.classList.add('is-visible');
    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible) showAnimation();
    },
    { root: null, threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
  );

  observer.observe(section);
};

// ============================================
// Our Menu — Entrada animada
// ============================================

const initOurMenuAnimations = () => {
  const section = document.getElementById('nosso-menu');
  if (!section) return;

  const title = section.querySelector('.our-menu-header h2');
  const subtitle = section.querySelector('.our-menu-subtitle');
  const grid = section.querySelector('.our-menu-grid');

  if (!title || !subtitle || !grid) return;

  const showAnimation = () => {
    title.classList.add('is-visible');
    subtitle.classList.add('is-visible');
    grid.classList.add('is-visible');
    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible) showAnimation();
    },
    { root: null, threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
  );

  observer.observe(section);
};

// ===========================================
// app download - Entrada animada
// ===========================================

const initDownloadAppAnimations = () => {
  const content = document.querySelector('.download-app-content');
  if (!content) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible) {
        content.classList.add('is-visible');
        observer.disconnect();
      }
    },
    { root: null, threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
  );

  observer.observe(content);

  const buttons = content.querySelectorAll('.download-app-button');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width  = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left   = `${x}px`;
      ripple.style.top    = `${y}px`;

      button.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });
};

// ============================================
// Footer — Entrada animada em cascata
// ============================================

const initFooterAnimations = () => {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  const logo = footer.querySelector('.footer-logo-group');
  const navLinks = footer.querySelectorAll('.footer-nav-link');
  const socialLinks = footer.querySelectorAll('.footer-social-link');
  const legal = footer.querySelector('.footer-legal');

  if (!logo || !navLinks.length || !socialLinks.length || !legal) return;

  const showAnimation = () => {
    logo.classList.add('is-visible');

    navLinks.forEach((link, index) => {
      window.setTimeout(() => {
        link.classList.add('is-visible');
      }, 100 + index * 80);
    });

    socialLinks.forEach((icon, index) => {
      window.setTimeout(() => {
        icon.classList.add('is-visible');
      }, 250 + index * 80);
    });

    window.setTimeout(() => {
      legal.classList.add('is-visible');
    }, 400);

    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible) showAnimation();
    },
    { root: null, threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
  );

  observer.observe(footer);
};

// Expor para testes e inspeções emergentes
window.initHeroAnimations = initHeroAnimations;
window.initKingsBaconAnimations = initKingsBaconAnimations;
window.initKingDobroAnimations = initKingDobroAnimations;
window.initIngredientesPremiumAnimations = initIngredientesPremiumAnimations;
window.initHmmmmAnimations = initHmmmmAnimations;
window.initOurMenuAnimations = initOurMenuAnimations;
window.initDownloadAppAnimations = initDownloadAppAnimations;
window.initFooterAnimations = initFooterAnimations;