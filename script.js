document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.createElement('div');
    loadingScreen.classList.add('loading-screen');
    loadingScreen.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loadingScreen);

    // Remover loading screen após carregar
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            setTimeout(function() {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });

    // Navegação Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navegação Suave (Smooth Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de Digitação para Tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        setTimeout(typeWriter, 1000);
    }

    // Animação ao Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-card, .portfolio-card, .timeline-item, .sobre-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez no carregamento

    // Animação das barras de progresso
    const animateProgressBars = function() {
        const progressBars = document.querySelectorAll('.progress');
        
        progressBars.forEach(bar => {
            const elementTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            }
        });
    };

    window.addEventListener('scroll', animateProgressBars);
    setTimeout(animateProgressBars, 1500); // Executar após o carregamento inicial

    // Modal para Certificados
    const createCertificatesModal = function() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.id = 'certificates-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-close">
                    <i class="fas fa-times"></i>
                </div>
                <h2 class="section-title">Certificados</h2>
                <div class="certificates-grid">
                    <div class="certificate-card">
                        <div class="certificate-img">
                            <img src="https://via.placeholder.com/400x300" alt="Certificado 1">
                        </div>
                        <div class="certificate-info">
                            <h3>Análise de Dados com Python</h3>
                            <p>Coursera - 2022</p>
                        </div>
                    </div>
                    <div class="certificate-card">
                        <div class="certificate-img">
                            <img src="https://via.placeholder.com/400x300" alt="Certificado 2">
                        </div>
                        <div class="certificate-info">
                            <h3>Power BI Avançado</h3>
                            <p>Microsoft - 2021</p>
                        </div>
                    </div>
                    <div class="certificate-card">
                        <div class="certificate-img">
                            <img src="https://via.placeholder.com/400x300" alt="Certificado 3">
                        </div>
                        <div class="certificate-info">
                            <h3>SQL para Análise de Dados</h3>
                            <p>Udemy - 2021</p>
                        </div>
                    </div>
                    <div class="certificate-card">
                        <div class="certificate-img">
                            <img src="https://via.placeholder.com/400x300" alt="Certificado 4">
                        </div>
                        <div class="certificate-info">
                            <h3>Excel Avançado</h3>
                            <p>LinkedIn Learning - 2020</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Abrir modal
        const modalButton = document.querySelector('a[href="#"].btn.primary-btn.btn-large');
        if (modalButton) {
            modalButton.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        // Fechar modal
        modal.querySelector('.modal-close').addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Fechar modal ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    };
    
    createCertificatesModal();

    // Visualizar Currículo - navegar para a seção
    const curriculoButton = document.querySelector('a[href="#"].btn.secondary-btn.btn-large');
    if (curriculoButton) {
        curriculoButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Navegar para a seção de currículo
            const curriculoSection = document.querySelector('#curriculo');
            if (curriculoSection) {
                curriculoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Validação de Formulário
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            let isValid = true;
            
            // Validação simples
            if (nome.trim() === '') {
                alert('Por favor, preencha o campo Nome.');
                isValid = false;
            } else if (email.trim() === '' || !email.includes('@')) {
                alert('Por favor, insira um e-mail válido.');
                isValid = false;
            } else if (mensagem.trim() === '') {
                alert('Por favor, escreva uma mensagem.');
                isValid = false;
            }
            
            if (isValid) {
                // Simulação de envio (em produção, substituir por envio real)
                alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
                contactForm.reset();
                
                // Em um site real, você enviaria os dados para um backend
            }
        });
    }

    // Alternância de Tema (Claro/Escuro)
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Verificar preferência salva ou usar preferência do sistema
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
    }
    
    themeToggle.addEventListener('click', function() {
        let theme;
        
        if (document.body.getAttribute('data-theme') === 'light') {
            theme = 'dark';
        } else {
            theme = 'light';
        }
        
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Adicionar elementos futuristas
    const addFuturisticElements = function() {
        // Adicionar linhas diagonais decorativas
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            if (index % 2 === 0) {
                const line = document.createElement('div');
                line.classList.add('diagonal-line');
                line.style.top = Math.random() * 80 + '%';
                line.style.left = Math.random() * 80 + '%';
                section.appendChild(line);
            }
        });
        
        // Adicionar pattern geométrico sutil no background
        const patterns = document.querySelectorAll('.hero, .cta');
        
        patterns.forEach(section => {
            const pattern = document.createElement('div');
            pattern.classList.add('pattern');
            section.appendChild(pattern);
        });
    };
    
    addFuturisticElements();

    // Efeitos sonoros opcionais em interações (desativados por padrão)
    const enableSoundEffects = false; // Alterar para true para ativar
    
    if (enableSoundEffects) {
        const createAudio = function(src) {
            const audio = new Audio(src);
            audio.volume = 0.2;
            return audio;
        };
        
        const clickSound = createAudio('https://assets.mixkit.co/sfx/preview/mixkit-simple-click-tone-1112.mp3');
        const hoverSound = createAudio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
        
        document.querySelectorAll('.btn, .nav-link').forEach(element => {
            element.addEventListener('click', function() {
                clickSound.currentTime = 0;
                clickSound.play();
            });
            
            element.addEventListener('mouseenter', function() {
                hoverSound.currentTime = 0;
                hoverSound.play();
            });
        });
    }

    // Atualizar ano do copyright automaticamente
    const yearElement = document.querySelector('.footer-copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }

    // Destacar link de navegação ativo ao rolar
    const updateActiveNavLink = function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Criar favicon se não existir
    const createFavicon = function() {
        if (!document.querySelector('link[rel="icon"]')) {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            
            // Fundo
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, 64, 64);
            
            // Texto
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 40px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('HV', 32, 32);
            
            // Criar link para favicon
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/png';
            link.href = canvas.toDataURL('image/png');
            document.head.appendChild(link);
        }
    };
    
    createFavicon();
});