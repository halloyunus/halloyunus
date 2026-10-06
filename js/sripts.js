(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initYear() {
    var y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function initNav() {
    var nav = $('#navbar'), toggle = $('#mobile-menu'), list = $('#nav-list');
    if (!nav || !toggle || !list) return;
    function setOpen(open) {
      list.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }
    toggle.addEventListener('click', function () { setOpen(!list.classList.contains('open')); });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && list.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
    window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 24); }, { passive: true });
    nav.classList.toggle('scrolled', window.scrollY > 24);

    // active section indicator
    var links = $$('.nav-list a[href^="#"]');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('header[id], section[id]').forEach(function (s) { io.observe(s); });
    }
  }

  function initReveal() {
    var items = $$('.reveal');
    if (reduce || !('IntersectionObserver' in window)) { items.forEach(function (i) { i.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); o.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (i) { io.observe(i); });
  }

  function initTimeline() {
    var buttons = $$('.filter-btn'), items = $$('.timeline-item');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        buttons.forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        var f = b.dataset.filter;
        items.forEach(function (it) { it.classList.toggle('hidden', f !== 'all' && it.dataset.category !== f); });
        updateProgress();
      });
    });
    var tl = $('.timeline-container');
    if (tl) tl.addEventListener('click', function (e) {
      var btn = e.target.closest('.expand-btn');
      if (!btn) return;
      var panel = btn.nextElementSibling;
      var open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.firstChild.textContent = open ? 'Show Less ' : 'View More ';
      updateProgress();
    });
    var bar = $('.timeline-progress'), wrap = $('.timeline'), ticking = false;
    function updateProgress() {
      if (!bar || !wrap) return;
      var r = wrap.getBoundingClientRect();
      var p = Math.min(Math.max(window.innerHeight * 0.6 - r.top, 0), r.height);
      bar.style.height = p + 'px';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
    }, { passive: true });
    updateProgress();
  }

  function initDetails() {
    var dlg = $('#detail');
    if (!dlg || typeof dlg.showModal !== 'function') return;
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.more');
      if (b) {
        $('#detail-title').textContent = b.closest('.card').querySelector('h3').textContent;
        $('#detail-text').textContent = b.dataset.detail;
        dlg.showModal();
      }
      if (e.target.id === 'detail-close' || e.target === dlg) dlg.close();
    });
  }

  function initParticles() {
    if (reduce || typeof window.particlesJS !== 'function' || !$('#particles-js')) return;
    var small = window.innerWidth < 760;
    window.particlesJS('particles-js', {
      particles: {
        number: { value: small ? 18 : 38 },
        color: { value: '#2DD4BF' },
        opacity: { value: 0.35 },
        size: { value: 2 },
        line_linked: { enable: true, distance: 140, color: '#2DD4BF', opacity: 0.12, width: 1 },
        move: { enable: true, speed: 0.6 }
      },
      interactivity: { events: { onhover: { enable: false }, onclick: { enable: false } } },
      retina_detect: false
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initYear(); initNav(); initReveal(); initTimeline(); initDetails();
  });
  window.addEventListener('load', initParticles);
})();

document.addEventListener("DOMContentLoaded", function () {
  const textToType = "Muhamad Yunus";
  const headingElement = document.getElementById("animated-name");
  
  // Kosongkan teks awal di HTML agar mulai dari bersih
  headingElement.textContent = "";
  
  let charIndex = 0;
  const typingSpeed = 120; // Kecepatan mengetik dalam milidetik (semakin kecil semakin cepat)

  function typeWriter() {
    if (charIndex < textToType.length) {
      headingElement.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, typingSpeed);
    }
  }

  // Mulai animasi
  typeWriter();
});
