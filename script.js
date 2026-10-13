if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Safety net: if nothing revealed after 1.5s, something's wrong with
  // IntersectionObserver in this environment, so show everything rather
  // than leave content permanently invisible.
  setTimeout(() => {
    if (!document.querySelector('.reveal.is-visible')) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    }
  }, 1500);
}