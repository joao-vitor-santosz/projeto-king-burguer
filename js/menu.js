// ============================================
// Menu Scroll Shrink
// ============================================

const initMenuShrink = () => {
  const header = document.querySelector('.header-container');
  const navbar = document.querySelector('.navbar');

  if (!header || !navbar) return;

  const SCROLL_THRESHOLD = 60;
  const shrinkClass = 'is-shrunk';
  let ticking = false;

  const handleScroll = () => {
    const isBeyond = window.scrollY > SCROLL_THRESHOLD;
    header.classList.toggle(shrinkClass, isBeyond);

    // Permite transição suave de invocação
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(() => {
        header.classList.toggle(shrinkClass, window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Expor globalmente para chamadas de teste/inspeção
window.initMenuShrink = initMenuShrink;
