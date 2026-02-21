// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Intro Loader Logic
const closeBtn = document.getElementById('close-intro');
const loader = document.getElementById('intro-loader');

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        gsap.to(loader, {
            y: "-100%",
            duration: 1,
            ease: "expo.inOut",
            onComplete: () => {
                loader.style.display = "none";
                startHeroAnimations();
            }
        });
    });
} else {
    // Se não houver loader, inicia animações imediatamente
    window.addEventListener('load', startHeroAnimations);
}

// Custom Cursor Logic (Somente Desktop)
if (window.innerWidth > 1024) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, { scale: 1.5, borderColor: "#fff", duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, { scale: 1, borderColor: "#f5c518", duration: 0.3 });
        });
    });
}

// Particles System (Canvas) - Otimizado para Mobile
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesArray = [];
        const count = Math.min((canvas.width * canvas.height) / 15000, 100);
        for (let i = 0; i < count; i++) {
            particlesArray.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        particlesArray.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
            if (p.y > canvas.height) p.y = 0;
            if (p.y < 0) p.y = canvas.height;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
    window.addEventListener('resize', initParticles);
}

// Hero Entrance
function startHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".navbar", { y: -80, opacity: 0, duration: 1 })
      .from("h1", { y: 60, opacity: 0, duration: 1, stagger: 0.2 }, "-=0.6")
      .from(".hero-desc", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-image-container", { scale: 0.9, opacity: 0, duration: 1 }, "-=0.6")
      .from(".cta-group .btn-primary, .cta-group .btn-secondary", { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.4");
}

// Scroll Triggered Animations
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.querySelector('.section-header'), {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        x: -40,
        opacity: 0,
        duration: 1
    });

    const gridItems = section.querySelectorAll('.project-card, .skill-card, .about-image, .about-text-content');
    if (gridItems.length > 0) {
        gsap.from(gridItems, {
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1
        });
    }
});
