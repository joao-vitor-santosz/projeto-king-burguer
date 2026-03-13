// ============================================
// Menu Mobile Toggle
// ============================================

const initMobileMenu = () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

  if (!hamburger || !mobileMenu || !overlay) return;

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    overlay.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Fecha menu ao clicar em link
  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha menu com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
};

// ============================================
// Nosso Menu — filtros e flip cards
// ============================================

const initOurMenuInteractions = () => {
  const filterButtons = document.querySelectorAll('.our-menu-filter');
  const cards = document.querySelectorAll('.our-menu-card');

  if (!filterButtons.length || !cards.length) return;

  const setActiveFilter = (button) => {
    filterButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive.toString());
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      setActiveFilter(button);

      cards.forEach((card) => {
        const cardCategory = card.dataset.category;
        const isVisible = category === 'all' || cardCategory === category;
        card.style.display = isVisible ? '' : 'none';
      });
    });
  });

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });
};

// ============================================
// Smooth Scroll — links de âncora
// ============================================

const initSmoothScroll = () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      event.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (history.pushState) {
        history.pushState(null, '', `#${targetId}`);
      } else {
        window.location.hash = `#${targetId}`;
      }
    });
  });
};

// ============================================
// Kids Ninja Carousel
// ============================================

const initKidsNinjaCarousel = () => {
  const slides = document.querySelectorAll('.kids-ninja-slide');
  const prevBtn = document.querySelector('.carousel-control--left');
  const nextBtn = document.querySelector('.carousel-control--right');
  const indicators = document.querySelectorAll('.indicator');

  if (!slides.length || !prevBtn || !nextBtn || !indicators.length) return;

  let currentIndex = 0;

  const setSlide = (index, direction) => {
    const prevIndex = currentIndex;
    currentIndex = index;

    const incoming = slides[currentIndex];
    const outgoing = slides[prevIndex];

    if (prevIndex === currentIndex) return;

    const enterFrom = direction === 'next' ? '100%' : '-100%';
    const exitTo   = direction === 'next' ? '-100%' : '100%';

    outgoing.style.transition = 'none';
    outgoing.style.transform  = 'translateX(0)';
    outgoing.style.opacity    = '1';

    incoming.style.transition = 'none';
    incoming.style.transform  = `translateX(${enterFrom})`;
    incoming.style.opacity    = '1';
    incoming.classList.add('is-active');
    incoming.setAttribute('aria-hidden', 'false');
    incoming.setAttribute('tabindex', '0');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        outgoing.style.transition = 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms ease';
        outgoing.style.transform  = `translateX(${exitTo})`;
        outgoing.style.opacity    = '0';

        incoming.style.transition = 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms ease';
        incoming.style.transform  = 'translateX(0)';

        outgoing.addEventListener('transitionend', () => {
          outgoing.classList.remove('is-active');
          outgoing.setAttribute('aria-hidden', 'true');
          outgoing.setAttribute('tabindex', '-1');
          outgoing.style.transform  = '';
          outgoing.style.transition = '';
          outgoing.style.opacity    = '';
        }, { once: true });
      });
    });

    indicators.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === currentIndex);
    });
  };

  prevBtn.addEventListener('click', () => {
    const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    setSlide(nextIndex, 'prev');
  });

  nextBtn.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setSlide(nextIndex, 'next');
  });

  indicators.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      if (Number.isInteger(index)) {
        const direction = index > currentIndex ? 'next' : 'prev';
        setSlide(index, direction);
      }
    });
  });

  setSlide(currentIndex);
};

// ============================================
// Inicialização — DOMContentLoaded
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initMenuShrink();
  initMobileMenu();
  initHeroAnimations();
  initKingsBaconAnimations();
  initKingDobroAnimations();
  initSmoothScroll();
  initOurMenuInteractions();
  initKidsNinjaCarousel();
  initIngredientesPremiumAnimations();
  initHmmmmAnimations();
  initOurMenuAnimations();
  initDownloadAppAnimations();
  initFooterAnimations();
});