const header = document.getElementById('header');
const glow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

window.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 800 && glow) {
    glow.animate(
      { left: `${e.clientX}px`, top: `${e.clientY}px` },
      { duration: 500, fill: 'forwards' }
    );
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.10;
    const y = (e.clientY - r.top - r.height / 2) * 0.10;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn?.addEventListener('click', () => {
  nav.classList.toggle('mobile-open');
});

// Close mobile menu after navigation
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('mobile-open'));
});

// Small parallax on the hero visual
const visual = document.querySelector('.hero-visual');
window.addEventListener('scroll', () => {
  if (!visual || window.innerWidth < 900) return;
  const y = Math.min(window.scrollY * 0.08, 35);
  visual.style.transform = `translateY(${y}px)`;
});
// ===============================
// ORÇAMENTO PERSONALIZADO → WHATSAPP
// ===============================

const quoteForm = document.getElementById('quoteForm');

quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);

  const nome = formData.get('nome') || '';
  const empresa = formData.get('empresa') || 'Não informado';
  const whatsapp = formData.get('whatsapp') || '';
  const instagram = formData.get('instagram') || 'Não informado';
  const tipo = formData.get('tipo') || 'Não informado';
  const orcamento = formData.get('orcamento') || 'Não informado';
  const projeto = formData.get('projeto') || '';

  const mensagem = `Olá, KOVA! 👋

Gostaria de solicitar um orçamento personalizado.

*Nome:* ${nome}
*Empresa:* ${empresa}
*WhatsApp:* ${whatsapp}
*Instagram / Site:* ${instagram}
*Tipo de projeto:* ${tipo}
*Faixa de investimento:* ${orcamento}

*Sobre o projeto:*
${projeto}`;

  // WhatsApp da KOVA
  const numeroKova = '5562992689942';

  const linkWhatsApp =
    `https://wa.me/${numeroKova}?text=${encodeURIComponent(mensagem)}`;

  window.open(linkWhatsApp, '_blank');
});