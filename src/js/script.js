// Efeito de scroll suave para os links da navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      });
    }
  });
});

// Manipulação simples do formulário de contato
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simulação de envio
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.innerText;

    btn.innerText = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      alert('Obrigado! Sua mensagem foi enviada com sucesso.');
      btn.innerText = originalText;
      btn.disabled = false;
      contactForm.reset();
    }, 1500);
  });
}

// Mudar estilo da navbar ao rolar a página
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.padding = '10px 10%';
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  } else {
    navbar.style.padding = '20px 10%';
    navbar.style.background = '#ffffff';
  }
});
