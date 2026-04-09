/* ===================================
   HARMONIE SIGNATURE — MAIN JS
   =================================== */

// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hide');
      setTimeout(() => loader.remove(), 500);
    }
    // Animate hero image
    const heroImg = document.querySelector('.hero-bg img');
    if (heroImg) heroImg.classList.add('loaded');
  }, 2200);
});

// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
if (cursor && window.innerWidth > 768) {
  let cx = 0, cy = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  const moveCursor = () => {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(moveCursor);
  };
  moveCursor();
  document.querySelectorAll('a, button, .univers-card, .card, .menu-add-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
  });
}

// HAMBURGER / MOBILE MENU
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

// AUTO REVEAL ALL SECTIONS
document.querySelectorAll('section, .activite-block, .card, .spa-card, .menu-item, .univers-card, .chiffre-item, .galerie-img, footer .footer-col').forEach(el => {
  if (!el.classList.contains('reveal')) {
    el.classList.add('reveal');
    observer.observe(el);
  }
});

// TABS (restauration page)
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(target);
    if (panel) panel.classList.add('active');
  });
});

// WHATSAPP FORM — RESERVATION
const resaForm = document.getElementById('resaForm');
if (resaForm) {
  resaForm.addEventListener('submit', e => {
    e.preventDefault();
    const activite = resaForm.querySelector('[name="activite"]').value;
    const date = resaForm.querySelector('[name="date"]').value;
    const heure = resaForm.querySelector('[name="heure"]').value;
    const personnes = resaForm.querySelector('[name="personnes"]').value;
    const nom = resaForm.querySelector('[name="nom"]').value;
    const tel = resaForm.querySelector('[name="tel"]').value;
    const message = resaForm.querySelector('[name="message"]').value;
    const txt = `🗓 Demande de réservation — Harmonie Signature\nActivité : ${activite}\nDate : ${date} à ${heure}\nPersonnes : ${personnes}\nNom : ${nom}\nTel : ${tel}\nMessage : ${message || 'Aucun'}`;
    window.open(`https://wa.me/22892921889?text=${encodeURIComponent(txt)}`, '_blank');
  });
}

// WHATSAPP FORM — SPA
const spaForm = document.getElementById('spaForm');
if (spaForm) {
  spaForm.addEventListener('submit', e => {
    e.preventDefault();
    const soin = spaForm.querySelector('[name="soin"]').value;
    const nom = spaForm.querySelector('[name="nom"]').value;
    const tel = spaForm.querySelector('[name="tel"]').value;
    const date = spaForm.querySelector('[name="date"]').value;
    const heure = spaForm.querySelector('[name="heure"]').value;
    const message = spaForm.querySelector('[name="message"]').value;
    const txt = `🌿 Prise de rendez-vous Spa — Harmonie Signature\nSoin : ${soin}\nNom : ${nom}\nTel : ${tel}\nDate : ${date} à ${heure}\nMessage : ${message || 'Aucun'}`;
    window.open(`https://wa.me/22892921889?text=${encodeURIComponent(txt)}`, '_blank');
  });
}

// PANIER WHATSAPP (restauration)
let panier = [];
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartWABtn = document.getElementById('cartWABtn');
const cartName = document.getElementById('cartName');
const cartTime = document.getElementById('cartTime');

document.querySelectorAll('.menu-add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.menu-item');
    const name = item.querySelector('.menu-item-name').textContent;
    const price = item.querySelector('.menu-price').textContent;
    const existing = panier.find(p => p.name === name);
    if (existing) existing.qty++;
    else panier.push({ name, price, qty: 1 });
    updatePanier();
    if (cartBtn) cartBtn.style.display = 'inline-flex';
    btn.textContent = '✓';
    btn.style.background = 'var(--gold)';
    btn.style.color = '#000';
    setTimeout(() => {
      btn.textContent = '+';
      btn.style.background = '';
      btn.style.color = '';
    }, 800);
  });
});

function updatePanier() {
  const total = panier.reduce((a, b) => a + b.qty, 0);
  if (cartCount) cartCount.textContent = total;
  if (cartBtn) cartBtn.style.display = total > 0 ? 'inline-flex' : 'none';

  if (!cartItems) return;
  if (total === 0) {
    cartItems.innerHTML = `<div class="cart-empty">Votre panier est vide.</div>`;
    return;
  }

  cartItems.innerHTML = panier.map(p => `
    <div class="cart-item-row" data-cart-item="${escapeHtml(p.name)}">
      <div>
        <div class="cart-item-name">${escapeHtml(p.name)}</div>
        <div class="cart-item-price">${escapeHtml(p.price)}</div>
      </div>
      <div class="cart-item-qty">
        <button class="cart-qty-btn" type="button" data-cart-dec aria-label="Retirer">−</button>
        <span class="cart-qty-val" aria-label="Quantité">${p.qty}</span>
        <button class="cart-qty-btn" type="button" data-cart-inc aria-label="Ajouter">+</button>
      </div>
    </div>
  `).join('');
}

function openCart() {
  if (!cartModal) return;
  cartModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  if (!cartModal) return;
  cartModal.style.display = 'none';
  document.body.style.overflow = '';
}

if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    if (!panier.length) return;
    updatePanier();
    openCart();
  });
}

if (cartModal) {
  cartModal.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.hasAttribute && target.hasAttribute('data-cart-close')) {
      closeCart();
      return;
    }
    const row = target && target.closest ? target.closest('[data-cart-item]') : null;
    if (!row) return;
    const name = row.getAttribute('data-cart-item');
    const item = panier.find(p => p.name === name);
    if (!item) return;
    if (target.hasAttribute('data-cart-inc')) {
      item.qty++;
      updatePanier();
    } else if (target.hasAttribute('data-cart-dec')) {
      item.qty--;
      if (item.qty <= 0) panier = panier.filter(p => p.name !== name);
      updatePanier();
      if (!panier.length) closeCart();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal.style.display !== 'none') closeCart();
  });
}

if (cartWABtn) {
  cartWABtn.addEventListener('click', () => {
    if (!panier.length) return;
    const lines = panier.map(p => `- ${p.name} ×${p.qty}`).join('\n');
    const nom = (cartName && cartName.value || '').trim() || 'Client';
    const heure = (cartTime && cartTime.value || '').trim() || 'À définir';
    const txt = `Bonjour Harmonie Signature 👋\nJe souhaite commander :\n${lines}\nNom : ${nom}\nHeure souhaitée : ${heure}`;
    window.open(`https://wa.me/22892921889?text=${encodeURIComponent(txt)}`, '_blank');
  });
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
