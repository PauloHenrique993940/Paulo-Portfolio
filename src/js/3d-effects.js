// Efeitos 3D - Batman Portfolio

document.addEventListener('DOMContentLoaded', () => {
    init3DBackground();
    init3DCards();
});

function init3DCards() {
    // Efeito 3D para os Cards de Missões (Projetos)
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,          // Rotação máxima em graus
        speed: 400,       // Velocidade do efeito
        glare: true,      // Adiciona reflexo de luz
        "max-glare": 0.2, // Opacidade do reflexo
        scale: 1.05,      // Leve zoom ao passar o mouse
        perspective: 1000 // Perspectiva 3D
    });

    // Efeito 3D para os Cards de Arsenal (Skills)
    VanillaTilt.init(document.querySelectorAll(".skill-card"), {
        max: 20,
        speed: 300,
        glare: true,
        "max-glare": 0.15,
        scale: 1.1,
        perspective: 1000
    });
}

function init3DBackground() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // 1. Configuração da Cena, Câmera e Renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, // Fundo transparente para mostrar o CSS atrás
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 2. Criando as Partículas (Poeira/Chuva de Gotham)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        // Espalhando as partículas no espaço 3D (coordenadas x, y, z)
        posArray[i] = (Math.random() - 0.5) * 200;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material das partículas (Amarelo Batman)
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.3,
        color: 0xf5c518, // Amarelo do tema
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending // Faz brilhar quando se sobrepõem
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // --- NOVO: CUBOS DEV ESTRATÉGICOS ---
    const cubes = [];
    const createCube = (size, x, y, z, color) => {
        const geometry = new THREE.BoxGeometry(size, size, size);
        // Material de wireframe para parecer tecnologia HUD
        const material = new THREE.MeshBasicMaterial({ 
            color: color, 
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        scene.add(cube);
        cubes.push(cube);
        return cube;
    };

    // Cubo Principal (Perto do Hero)
    const heroCube = createCube(15, 40, 10, -10, 0xf5c518);
    
    // Cubos menores espalhados estrategicamente
    createCube(5, -45, -20, 10, 0x00f0ff); // Cubo Azul Tech
    createCube(8, 50, -40, 5, 0xf5c518);  // Cubo Amarelo
    createCube(4, -30, 30, -5, 0xffffff); // Cubo Branco Neutral

    // 3. Interação com o Mouse (Efeito Parallax)
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    // 4. Loop de Animação
    const animate = () => {
        requestAnimationFrame(animate);

        // Animação das Partículas
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Animação dos Cubos
        cubes.forEach((cube, index) => {
            cube.rotation.x += 0.01 * (index + 1) * 0.5;
            cube.rotation.y += 0.01;
            
            // Flutuação suave (Up and Down)
            cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.05;

            // Reação ao Mouse
            cube.position.x += (mouseX * 10 - cube.position.x) * 0.01;
        });

        // Movimento extra baseado no mouse (Parallax 3D)
        particlesMesh.rotation.y += (mouseX * 0.5 - particlesMesh.rotation.y) * 0.05;
        particlesMesh.rotation.x += (mouseY * 0.5 - particlesMesh.rotation.x) * 0.05;

        renderer.render(scene, camera);
    };

    animate();

    // 5. Responsividade (Redimensionar a tela)
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
