document.addEventListener('DOMContentLoaded', () => {
    /* =====================
       AOS
    ===================== */
    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
    }

    /* =====================
       SCROLL SUAVE
    ===================== */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* =====================
       FORMULÁRIO
    ===================== */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.textContent;

            btn.textContent = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Obrigado! Sua mensagem foi enviada com sucesso 🚀');
                btn.textContent = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    /* =====================
       THEME TOGGLE
    ===================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // This is the <html> tag

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        htmlElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = htmlElement.getAttribute('data-theme');
        if (theme === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
    });

    /* =====================
       NAVBAR SCROLL
    ===================== */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (!navbar) return;

        navbar.style.padding = window.scrollY > 50 ? '10px 8%' : '20px 8%';

        // Adjust navbar background based on current theme for scroll effect
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            navbar.style.background = window.scrollY > 50 ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.6)';
        } else {
            navbar.style.background = window.scrollY > 50 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)';
        }
    });

    /* =====================
       CODE TYPING EFFECT
    ===================== */
    const codeText = `
const funcionario = {
  nome: "Paulo Henrique",
  cargo: "Front-End Developer",
  salario: 3000,
  bonus: 800,
  beneficios: ["Vale Refeição", "Plano de Saúde", "Home Office"]
};

const bruto = funcionario.salario + funcionario.bonus;
const imposto = bruto * 0.15;
const liquido = bruto - imposto;

document.getElementById("result-output").innerHTML =
  "<h3>💼 " + funcionario.nome + "</h3>" +
  "<p>" + funcionario.cargo + "</p>" +
  "<p>💵 Salário Base: R$ " + funcionario.salario + "</p>" +
  "<p>➕ Bônus: R$ " + funcionario.bonus + "</p>" +
  "<p>📊 Bruto: R$ " + bruto + "</p>" +
  "<p>🏛️ Imposto (15%): R$ " + imposto + "</p>" +
  "<h4>💰 Líquido: R$ " + liquido + "</h4>" +
  "<ul>" +
    funcionario.beneficios.map(b => "<li>" + b + "</li>").join("") +
  "</ul>";

console.log("OK 🚀");
`;

    const codeOutput = document.getElementById('code-output');

    if (codeOutput) {
        let index = 0;

        const typeCode = () => {
            if (index < codeText.length) {
                codeOutput.textContent += codeText.charAt(index);
                index++;
                setTimeout(typeCode, 18);
            } else {
                runCode();
            }
        };

        const runCode = () => {
            try {
                new Function(codeText)();
            } catch (err) {
                const result = document.getElementById('result-output');
                if (result) result.textContent = err;
            }
        };

        typeCode();
    }

    /* =====================
       CHARTS
    ===================== */
    const initCharts = () => {
        if (!window.Chart) return;

        const performanceChart = document.getElementById('performanceChart');
        if (performanceChart) {
            new Chart(performanceChart, {
                type: 'bar',
                data: {
                    labels: ['Antes', 'Depois'],
                    datasets: [
                        {
                            data: [100, 70],
                            backgroundColor: ['#ef4444', '#22c55e'],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                },
            });
        }

        const uxChart = document.getElementById('uxChart');
        if (uxChart) {
            new Chart(uxChart, {
                type: 'doughnut',
                data: {
                    labels: ['Usabilidade', 'Acessibilidade', 'Design'],
                    datasets: [
                        {
                            data: [40, 35, 25],
                            backgroundColor: ['#6366f1', '#22c55e', '#f59e0b'],
                        },
                    ],
                },
                options: { responsive: true },
            });
        }

        const qualityChart = document.getElementById('qualityChart');
        if (qualityChart) {
            new Chart(qualityChart, {
                type: 'radar',
                data: {
                    labels: [
                        'Arquitetura',
                        'Legibilidade',
                        'Manutenção',
                        'Performance',
                        'Escalabilidade',
                    ],
                    datasets: [
                        {
                            data: [90, 85, 88, 92, 87],
                            backgroundColor: 'rgba(99,102,241,0.25)',
                            borderColor: '#6366f1',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        r: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                        },
                    },
                },
            });
        }
    };

    initCharts();
});
