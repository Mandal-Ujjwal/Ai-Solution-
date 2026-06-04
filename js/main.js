/* =====================================================
   AI-Solutions — Global JavaScript
   Loader, navbar, three.js, particles, typed, AOS,
   GSAP reveals, counters, tilt, gallery, lightbox,
   forms, toasts, chat, back-to-top
   ===================================================== */

// ---------- Loader ----------
window.addEventListener('load', () => {
  const l = document.getElementById('loader');
  if (l) setTimeout(() => l.classList.add('hide'), 500);

  if (window.AOS) AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });
});

// ---------- Navbar scroll ----------
const navbar = document.querySelector('.navbar-ai');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 30);

  const top = document.getElementById('backToTop');
  if (top) top.classList.toggle('show', window.scrollY > 400);
});

// Back to top
const btt = document.getElementById('backToTop');
if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Three.js animated background ----------
function initThreeBackground(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const setSize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  setSize();
  window.addEventListener('resize', setSize);

  // Floating wireframe icosahedron
  const geo = new THREE.IcosahedronGeometry(1.7, 1);
  const mat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.55 });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  // Inner torus
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1.0, 0.05, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true })
  );
  scene.add(torus);

  // Star field
  const starsGeo = new THREE.BufferGeometry();
  const starCount = 600;
  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) positions[i] = (Math.random() - 0.5) * 30;
  starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.03 }));
  scene.add(stars);

  let mx = 0, my = 0;
  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5);
    my = (e.clientY / window.innerHeight - 0.5);
  });

  const animate = () => {
    mesh.rotation.x += 0.003; mesh.rotation.y += 0.004;
    torus.rotation.x += 0.005; torus.rotation.y += 0.006;
    stars.rotation.y += 0.0008;
    camera.position.x += (mx * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (-my * 1.5 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
}

// ---------- Particles ----------
function initParticles() {
  if (typeof particlesJS === 'undefined' || !document.getElementById('particles-js')) return;
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: ['#00e5ff', '#7c3aed', '#ff2bd6'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 140, color: '#7c3aed', opacity: 0.35, width: 1 },
      move: { enable: true, speed: 1.4 }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
      modes: { grab: { distance: 160, line_linked: { opacity: 0.7 } }, push: { particles_nb: 3 } }
    },
    retina_detect: true
  });
}

// ---------- Typed ----------
function initTyped(elId, strings) {
  if (typeof Typed === 'undefined') return;
  const el = document.getElementById(elId);
  if (!el) return;
  new Typed('#' + elId, {
    strings, typeSpeed: 55, backSpeed: 30, backDelay: 1600, loop: true
  });
}

// ---------- Counters ----------
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1800;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / dur, 1);
        el.textContent = Math.floor(p * target).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });
  els.forEach(el => obs.observe(el));
}

// ---------- Tilt ----------
function initTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 8, speed: 400, glare: true, 'max-glare': 0.18
  });
}

// ---------- GSAP reveals ----------
function initGsap() {
  if (typeof gsap === 'undefined') return;
  gsap.utils.toArray('.gsap-reveal').forEach((el, i) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.9, delay: 0.1 + i * 0.05, ease: 'power3.out',
      scrollTrigger: typeof ScrollTrigger !== 'undefined' ? { trigger: el, start: 'top 85%' } : undefined
    });
  });
}

// ---------- Toast ----------
function toast(msg, type = 'success') {
  let stack = document.querySelector('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  const t = document.createElement('div');
  t.className = `ai-toast ${type}`;
  t.innerHTML = `<i class="fa fa-${type === 'success' ? 'circle-check' : 'triangle-exclamation'} me-2"></i>${msg}`;
  stack.appendChild(t);
  setTimeout(() => { t.style.opacity = 0; setTimeout(() => t.remove(), 400); }, 4000);
}

// ---------- AJAX form helper ----------
async function submitForm(form, url, onSuccess) {
  const data = new FormData(form);
  try {
    const res = await fetch(url, { method: 'POST', body: data });
    const json = await res.json();
    if (json.ok) {
      toast(json.message, 'success');
      form.reset();
      if (onSuccess) onSuccess();
    } else {
      toast(json.message || 'Something went wrong', 'error');
    }
  } catch (e) {
    toast('Network error: ' + e.message, 'error');
  }
}

// ---------- Lightbox ----------
function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const img = lb.querySelector('img');
  document.querySelectorAll('.gallery-grid img').forEach(el => {
    el.addEventListener('click', () => {
      img.src = el.src;
      lb.classList.add('show');
    });
  });
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.classList.contains('close-lb')) lb.classList.remove('show');
  });
}

// ---------- Star rating ----------
function initStars() {
  document.querySelectorAll('.star-rating').forEach(group => {
    const input = group.nextElementSibling;
    const stars = group.querySelectorAll('i');
    stars.forEach((s, i) => {
      s.addEventListener('click', () => {
        stars.forEach((st, j) => st.classList.toggle('active', j <= i));
        if (input) input.value = i + 1;
      });
    });
  });
}

// ---------- Chat widget ----------
function initChat() {
  const tgl = document.getElementById('chat-toggle');
  const win = document.getElementById('chat-window');
  if (!tgl || !win) return;
  tgl.addEventListener('click', () => win.classList.toggle('show'));
  const form = win.querySelector('form');
  const log  = win.querySelector('.chat-log');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inp = form.querySelector('input');
    if (!inp.value.trim()) return;
    const u = document.createElement('div');
    u.className = 'chat-msg user';
    u.textContent = inp.value;
    log.appendChild(u);
    const txt = inp.value; inp.value = '';
    setTimeout(() => {
      const b = document.createElement('div');
      b.className = 'chat-msg';
      b.textContent = 'Thanks! Our AI specialist will reply shortly. (demo)';
      log.appendChild(b);
      log.scrollTop = log.scrollHeight;
    }, 700);
  });
}

// ---------- Init on DOM ready ----------
document.addEventListener('DOMContentLoaded', () => {
  initThreeBackground('three-canvas');
  initParticles();
  initTyped('typed', [
    'AI-Powered Digital Innovation',
    'Future of Smart Software Solutions',
    'Engineered for Tomorrow, Built Today'
  ]);
  initCounters();
  initTilt();
  initGsap();
  initLightbox();
  initStars();
  initChat();

  // Active nav link
  const cur = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-ai .nav-link').forEach(a => {
    if (a.getAttribute('href') === cur) a.classList.add('active');
  });

  // Hook AJAX forms
  document.querySelectorAll('form[data-ajax]').forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      submitForm(f, f.getAttribute('action'));
    });
  });

  // Newsletter (front-end only demo)
  const news = document.getElementById('newsletter-form');
  if (news) news.addEventListener('submit', e => {
    e.preventDefault();
    toast('Subscribed! Check your inbox to confirm.', 'success');
    news.reset();
  });

  // Countdown timers
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const target = new Date(el.dataset.countdown).getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) { el.textContent = 'Event Started'; return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    };
    update(); setInterval(update, 1000);
  });

  // Gallery filter + sort
  const galleryGrid = document.querySelector('.gallery-grid');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const galleryFilterButtons = document.querySelectorAll('[data-gallery-filter]');
  const gallerySort = document.getElementById('gallery-sort');
  if (galleryGrid && galleryItems.length) {
    const applyGallery = () => {
      const activeFilter = document.querySelector('.gallery-filter .btn.active')?.dataset.galleryFilter || 'all';
      const sortType = gallerySort?.value || 'default';
      galleryItems.forEach(item => {
        const category = item.dataset.category || 'other';
        item.style.display = activeFilter === 'all' || activeFilter === category ? '' : 'none';
      });

      const sorted = galleryItems.slice();
      const compareByDate = (a, b) => new Date(a.dataset.date).getTime() - new Date(b.dataset.date).getTime();

      if (sortType === 'date-asc') sorted.sort(compareByDate);
      if (sortType === 'date-desc') sorted.sort((a, b) => compareByDate(b, a));
      if (sortType === 'upcoming-first') sorted.sort((a, b) => {
        const aIsUpcoming = a.dataset.category === 'upcoming' ? 0 : 1;
        const bIsUpcoming = b.dataset.category === 'upcoming' ? 0 : 1;
        return aIsUpcoming - bIsUpcoming || compareByDate(a, b);
      });
      if (sortType === 'promotional-first') sorted.sort((a, b) => {
        const aIsPromo = a.dataset.category === 'promotional' ? 0 : 1;
        const bIsPromo = b.dataset.category === 'promotional' ? 0 : 1;
        return aIsPromo - bIsPromo || compareByDate(a, b);
      });

      sorted.forEach(item => galleryGrid.appendChild(item));
    };

    galleryFilterButtons.forEach(button => button.addEventListener('click', () => {
      galleryFilterButtons.forEach(x => x.classList.remove('active'));
      button.classList.add('active');
      applyGallery();
    }));
    gallerySort?.addEventListener('change', applyGallery);
  }

  // Blog search + category filter
  const sIn = document.getElementById('blog-search');
  const cats = document.querySelectorAll('[data-cat-filter]');
  const cards = document.querySelectorAll('.blog-card-wrap');
  let activeCat = 'all';
  const apply = () => {
    const q = (sIn?.value || '').toLowerCase();
    cards.forEach(c => {
      const okCat = activeCat === 'all' || c.dataset.cat === activeCat;
      const okQ = !q || c.textContent.toLowerCase().includes(q);
      c.style.display = okCat && okQ ? '' : 'none';
    });
  };
  if (sIn) sIn.addEventListener('input', apply);
  cats.forEach(b => b.addEventListener('click', () => {
    cats.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    activeCat = b.dataset.catFilter;
    apply();
  }));
});
