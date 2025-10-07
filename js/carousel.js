let currentSlide = 0;
let slideInterval;

// Iniciar carrossel do banner
function startCarousel() {
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDots = document.querySelectorAll('.banner-dot');
    
    // Definir intervalo para trocar slides automaticamente
    slideInterval = setInterval(nextSlide, 5000); // Troca a cada 5 segundos
    
    // Adicionar event listeners para os dots
    bannerDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
}

// Próximo slide
function nextSlide() {
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDots = document.querySelectorAll('.banner-dot');
    
    currentSlide = (currentSlide + 1) % bannerSlides.length;
    updateCarousel();
}

// Ir para slide específico
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

// Atualizar carrossel
function updateCarousel() {
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDots = document.querySelectorAll('.banner-dot');
    
    // Remover classe active de todos os slides e dots
    bannerSlides.forEach(slide => slide.classList.remove('active'));
    bannerDots.forEach(dot => dot.classList.remove('active'));
    
    // Adicionar classe active ao slide e dot atual
    bannerSlides[currentSlide].classList.add('active');
    bannerDots[currentSlide].classList.add('active');
}