const menuData = {
  coffee: [
    { name: 'Moonmilk Latte', note: 'Double espresso, oat milk, honey, cardamom', price: '$6.50' },
    { name: 'House Cappuccino', note: 'Our daily espresso, silky steamed milk', price: '$5.25' },
    { name: 'Maple Oat Cold Brew', note: 'Slow-steeped overnight, a touch of maple', price: '$5.75' },
    { name: 'Something Steeped', note: 'Ask us about today’s loose-leaf tea', price: '$4.50' }
  ],
  bakery: [
    { name: 'Brown Butter Croissant', note: 'Flaky layers, cultured butter, sea salt', price: '$5.00' },
    { name: 'Citrus Morning Bun', note: 'Orange zest, cinnamon sugar, still warm', price: '$5.50' },
    { name: 'Olive Oil Tea Cake', note: 'Lemon, good olive oil, a little afternoon', price: '$5.25' },
    { name: 'Jammy Toast', note: 'Country sourdough, seasonal house jam', price: '$6.00' }
  ]
};

const menuItems = document.querySelector('[data-menu-items]');
function renderMenu(category) {
  menuItems.innerHTML = menuData[category].map(item => `
    <article class="menu-item">
      <div><h3>${item.name}</h3><p>${item.note}</p></div>
      <span class="menu-price">${item.price}</span>
    </article>`).join('');
}
renderMenu('coffee');

document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(item => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    renderMenu(tab.dataset.category);
  });
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !isOpen);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
}));

const form = document.querySelector('.signup-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email');
  document.querySelector('.form-message').textContent = `Thanks for stopping by, ${email.value}. This demo form is ready to connect to your mailing list.`;
  form.reset();
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll('.section-heading, .menu-layout, .story-copy, .special-grid, .space-copy, .quote-section blockquote, .visit-copy, .newsletter').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
