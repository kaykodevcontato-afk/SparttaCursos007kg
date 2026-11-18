'use strict';

const INSTAGRAM_URL = 'https://www.instagram.com/sparttacursoscaruaru/?hl=pt-br';
const WHATSAPP_NUMBER = '558187094694';

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  });
});

const courseSelect = document.getElementById('course');
document.querySelectorAll('[data-course]').forEach((link) => {
  link.addEventListener('click', () => {
    courseSelect.value = link.dataset.course;
  });
});

const signupForm = document.getElementById('signupForm');
signupForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!signupForm.reportValidity()) return;

  const name = document.getElementById('name').value.trim();
  const course = courseSelect.value;
  const note = document.getElementById('message').value.trim();
  const message = [
    'Olá, equipe Spartta Cursos!',
    `Meu nome é ${name}.`,
    `Tenho interesse no curso: ${course}.`,
    'Gostaria de informações sobre próximas turmas, valores e matrícula.',
    ...(note ? [`Minha mensagem: ${note}`] : []),
  ].join('\n');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.getElementById('year').textContent = new Date().getFullYear();

// Evita que o botão flutuante cubra qualquer conteúdo do rodapé.
const footer = document.querySelector('footer');
const floatingWhatsApp = document.querySelector('.floating-wa');
if (footer && floatingWhatsApp && 'IntersectionObserver' in window) {
  const footerObserver = new IntersectionObserver((entries) => {
    const footerIsVisible = entries.some((entry) => entry.isIntersecting);
    floatingWhatsApp.classList.toggle('is-hidden', footerIsVisible);
    floatingWhatsApp.setAttribute('aria-hidden', String(footerIsVisible));
    floatingWhatsApp.tabIndex = footerIsVisible ? -1 : 0;
  }, { threshold: 0 });
  footerObserver.observe(footer);
}


// Galeria/lightbox da seção Preparação em Foco.
const lightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
let lastFocusedTrigger = null;

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedTrigger) lastFocusedTrigger.focus();
};

const openLightbox = (trigger) => {
  if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) return;
  const imageSrc = trigger.dataset.lightboxImage;
  const imageTitle = trigger.dataset.lightboxTitle || 'Imagem ampliada';
  const imageDescription = trigger.dataset.lightboxDescription || 'Visualização ampliada da imagem selecionada.';
  const imageAlt = trigger.querySelector('img')?.alt || imageTitle;

  lightboxImage.src = imageSrc;
  lightboxImage.alt = imageAlt;
  lightboxTitle.textContent = imageTitle;
  lightboxDescription.textContent = imageDescription;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lastFocusedTrigger = trigger;
  lightboxClose?.focus();
};

lightboxTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => openLightbox(trigger));
});

lightbox?.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-lightbox-close') || event.target === lightbox) {
    closeLightbox();
  }
});

lightboxClose?.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) {
    closeLightbox();
  }
});
