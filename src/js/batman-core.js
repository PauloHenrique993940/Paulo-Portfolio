/**
 * BATMAN PORTFOLIO SYSTEM - UNIFIED CORE
 */

// 1. CONFIGURAÇÃO INICIAL
document.body.style.overflow = 'hidden';

// Inicializa o Cursor Customizado IMEDIATAMENTE
function initCustomCursor() {
    if (window.innerWidth <= 1024) return;
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;

    // Garante visibilidade inicial
    cursorDot.style.opacity = "1";
    cursorOutline.style.opacity = "1";

    window.addEventListener('mousemove', (e) => {
        // Usa GSAP para suavidade, mas com fallback imediato
        gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.15 });
    });

    // Efeito de hover em elementos clicáveis
    document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, { scale: 1.5, borderColor: "#fff", duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, { scale: 1, borderColor: "#f5c518", duration: 0.2 });
        });
    });
}

// Executa o cursor assim que o script carrega
initCustomCursor();

// 2. LÓGICA DO LOADER
const closeBtn = document.getElementById('close-intro');
const loader = document.getElementById('intro-loader');

function hideLoader() {
    if (loader) {
        gsap.to(loader, {
            y: "-100%",
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: () => {
                loader.style.display = "none";
                document.body.style.overflow = 'auto';
                startHeroAnimations();
            }
        });
    }
}

if (closeBtn) {
    closeBtn.addEventListener('click', hideLoader);
}

// 3. ANIMAÇÕES
function startHeroAnimations() {
    if (typeof gsap === 'undefined') return;
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });
    if (document.querySelector(".navbar")) tl.from(".navbar", { y: -50, opacity: 0 });
    if (document.querySelector("h1")) tl.from("h1", { y: 30, opacity: 0, stagger: 0.1 }, "-=0.5");
}

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('section').forEach(section => {
        const header = section.querySelector('.section-header');
        if (header) {
            gsap.from(header, {
                scrollTrigger: { trigger: section, start: "top 95%" },
                x: -20, opacity: 0, duration: 0.6
            });
        }
    });
}

// 4. UTILITÁRIOS
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('PROTOCOLO TRANSMITIDO COM SUCESSO! 🦇');
        contactForm.reset();
    });
}
