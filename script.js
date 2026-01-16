const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const delightItems = document.querySelectorAll('[data-delight]');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const runCountUp = (container) => {
  const stats = container.querySelectorAll('.stat[data-count]');
  stats.forEach((stat) => {
    const target = Number.parseInt(stat.dataset.count, 10) || 0;
    const prefix = stat.dataset.prefix || '';
    const suffix = stat.dataset.suffix || '';
    const pad = Number.parseInt(stat.dataset.pad, 10) || 0;
    const duration = 650;

    if (prefersReducedMotion) {
      let text = target.toString();
      if (pad) {
        text = text.padStart(pad, '0');
      }
      stat.textContent = `${prefix}${text}${suffix}`;
      return;
    }
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      let text = value.toString();
      if (pad) {
        text = text.padStart(pad, '0');
      }
      stat.textContent = `${prefix}${text}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  });
};

const delightObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const { delight } = entry.target.dataset;
      if (delight === 'scoreboard') {
        entry.target.classList.add('sweep');
        runCountUp(entry.target);
      }
      if (delight === 'kanban') {
        entry.target.classList.add('progress');
      }

      delightObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.3 }
);

delightItems.forEach((item) => delightObserver.observe(item));

const triggerClickAnim = (element, className, duration) => {
  if (!element) return;
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  window.setTimeout(() => {
    element.classList.remove(className);
  }, duration);
};

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', () => {
    triggerClickAnim(button, 'clicked', 450);
  });
});

const profile = document.querySelector('.profile');
if (profile) {
  profile.addEventListener('click', () => {
    triggerClickAnim(profile, 'stamped', 450);
  });
}
