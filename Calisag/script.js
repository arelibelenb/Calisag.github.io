document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // MENÚ MÓVIL Y NAVEGACIÓN
    // =============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle del menú móvil
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        });
    });
    
    // =============================================
    // EFECTO DE SCROLL EN EL HEADER
    // =============================================
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // =============================================
    // SCROLL SUAVE PARA ENLACES DE NAVEGACIÓN
    // =============================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // =============================================
    // EFECTO PARALLAX PARA EL FONDO DEL HERO
    // =============================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.parallax-bg');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translate3d(0, ${speed}px, 0)`;
        }
    });
    
    // =============================================
    // EFECTOS HOVER PARA BOTONES
    // =============================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // =============================================
    // ANIMACIONES AL HACER SCROLL
    // =============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll('.hero-content, .benefit-card, .catalog-item, .team-member');
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // =============================================
    // FONDO DINÁMICO EN LA SECCIÓN .hero
    // =============================================
    function createBackgroundPattern() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.1';
        
        hero.appendChild(canvas);
        
        // Dibujar patrones geométricos animados
        function drawPattern() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#e74c3c';
            ctx.lineWidth = 1;
            
            const columns = Math.max(5, Math.floor(window.innerWidth / 300));
            const rows = Math.max(5, Math.floor(window.innerHeight / 300));
            
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = (canvas.width / columns) * i + Math.sin(Date.now() * 0.001 + i) * 20;
                    const y = (canvas.height / rows) * j + Math.cos(Date.now() * 0.001 + j) * 20;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, 30, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }
            
            requestAnimationFrame(drawPattern);
        }
        
        window.addEventListener('resize', resizeCanvas);
        drawPattern();
    }
    
    // Inicia el fondo animado una vez cargada la página
    window.addEventListener('load', createBackgroundPattern);
    
    // =============================================
    // ANIMACIÓN DE ENTRADA PARA MIEMBROS DEL EQUIPO
    // =============================================
    const animateTeamMembers = () => {
        const members = document.querySelectorAll(".team-member");
        
        // Configuración inicial de la animación
        members.forEach((member, i) => {
            member.style.opacity = "0";
            member.style.transform = "translateY(30px)";
            member.style.transition = `
                opacity 0.6s ease ${(i + 1) * 0.2}s, 
                transform 0.6s ease ${(i + 1) * 0.2}s
            `;
        });
        
        // Observer para activar la animación cuando son visibles
        const teamObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        members.forEach(member => teamObserver.observe(member));
    };
    
    animateTeamMembers();
    
    // =============================================
    // CARRUSEL DE TESTIMONIOS
    // =============================================
    const initTestimonialsSlider = () => {
        const carrusel = document.querySelector('.testimonios-carrusel');
        if (!carrusel) return;
        
        const items = document.querySelectorAll('.testimonio-item');
        const puntos = document.querySelectorAll('.punto');
        const btnPrev = document.querySelector('.carrusel-prev');
        const btnNext = document.querySelector('.carrusel-next');
        
        let currentIndex = 0;
        let intervalo;
        const itemCount = items.length;
        
        // Función para mover el carrusel
        function moverCarrusel(index) {
            currentIndex = index;
            const anchoItem = items[0].offsetWidth;
            carrusel.scrollTo({
                left: anchoItem * index,
                behavior: 'smooth'
            });
            actualizarPuntos();
        }
        
        // Actualizar puntos de navegación
        function actualizarPuntos() {
            puntos.forEach((punto, index) => {
                punto.classList.toggle('activo', index === currentIndex);
            });
        }
        
        // Navegación
        function siguiente() {
            currentIndex = (currentIndex + 1) % itemCount;
            moverCarrusel(currentIndex);
            reiniciarIntervalo();
        }
        
        function anterior() {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            moverCarrusel(currentIndex);
            reiniciarIntervalo();
        }
        
        // Auto-desplazamiento
        function iniciarIntervalo() {
            clearInterval(intervalo);
            intervalo = setInterval(siguiente, 5000);
        }
        
        function reiniciarIntervalo() {
            clearInterval(intervalo);
            iniciarIntervalo();
        }
        
        // Event listeners
        btnNext.addEventListener('click', siguiente);
        btnPrev.addEventListener('click', anterior);
        
        puntos.forEach((punto, index) => {
            punto.addEventListener('click', () => {
                moverCarrusel(index);
                reiniciarIntervalo();
            });
        });
        
        // Pausar al interactuar
        carrusel.addEventListener('mouseenter', () => {
            clearInterval(intervalo);
        });
        
        carrusel.addEventListener('mouseleave', iniciarIntervalo);
        
        // Manejar redimensionamiento
        window.addEventListener('resize', () => {
            moverCarrusel(currentIndex);
        });
        
        // Iniciar
        moverCarrusel(0);
        iniciarIntervalo();
    };
    
    initTestimonialsSlider();
    
    // =============================================
    // ZOOM EN IMÁGENES DEL CATÁLOGO
    // =============================================
    document.querySelectorAll('.catalog-image').forEach(imageContainer => {
        imageContainer.addEventListener('click', () => {
            // Cerrar cualquier otro zoom que esté abierto
            document.querySelectorAll('.catalog-image.zoom').forEach(openZoom => {
                if (openZoom !== imageContainer) {
                    openZoom.classList.remove('zoom');
                }
            });
            
            // Alternar el zoom en la imagen clickeada
            imageContainer.classList.toggle('zoom');
            
            // Si se está cerrando el zoom, mover el scroll para que la imagen sea visible
            if (!imageContainer.classList.contains('zoom')) {
                imageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
    
    // Cerrar zoom al hacer clic fuera de la imagen
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.catalog-image')) {
            document.querySelectorAll('.catalog-image.zoom').forEach(zoom => {
                zoom.classList.remove('zoom');
            });
        }
    });
    
    // Prevenir que el clic en la imagen propague al documento
    document.querySelectorAll('.catalog-image img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});
