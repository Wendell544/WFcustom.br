// Variáveis globais
const phoneNumber = '5583999667578';
let currentProduct = null;
let currentColor = 'branco';
let currentSize = 'P';
let currentPosition = 'frente';
let currentSection = 'home';
let currentCategory = 'masculino'; // Alterado para masculino como padrão

// Configurações do carrossel de banners
let currentBannerIndex = 0;
const bannerInterval = 5000; // 5 segundos
let bannerTimer = null;

// Elementos DOM
let homePage, productPage, cartPage, favoritesPage, locationPage, detailImage, detailTitle, detailDescription;
let detailPrice, modalColorOptions, detailSizeOptions, stampPositionGroup, addToCartDetailButton;
let buyNowDetailButton, locationForm, shippingPrice, shippingInfo;
let shippingPriceContainer, finalizeOrderButton, confirmationModal, closeModal, closeConfirmation;
let navLinks, navLinksItems, footerNavLinks, cartIcon, favoriteIcon, cartItemsContainer;
let cartSummary, continueShoppingBtn, checkoutBtn, cartCount, favoriteCount, backFromProduct, backFromCart;
let backFromFavorites, backFromLocation, categoryFilters, backToHomeFromProduct, deliveryOptions;
let favoritesBackToHome;

// Elementos do carrossel de banners
let bannerTrack, bannerSlides;

// Função auxiliar para calcular preço final
function calculateFinalPrice(basePrice, position) {
    let finalPrice = basePrice;
    if (position === 'ambos') {
        finalPrice += 2.00;
    }
    return finalPrice;
}

// Funções de inicialização
function init() {
    initializeDOMElements();
    setupEventListeners();
    initBannerCarousel();
    updateCartCount();
    updateFavoriteCount();
    
    // Aplicar categoria padrão "masculino"
    filterProductsByCategory('masculino');
    
    // Popular grades APÓS garantir que o DOM está pronto
    setTimeout(() => {
        console.log('Inicializando grades...');
        populateAllGrades();
        
        // Forçar redesenho se ainda não aparecer
        setTimeout(() => {
            if (document.querySelectorAll('.grade-card').length === 0) {
                console.log('Nenhum card encontrado, recarregando...');
                // Tenta novamente
                populateAllGrades();
            }
        }, 500);
    }, 100);
}

// Inicializar elementos DOM
function initializeDOMElements() {
    homePage = document.getElementById('home-page');
    productPage = document.getElementById('product-page');
    cartPage = document.getElementById('cart-page');
    favoritesPage = document.getElementById('favorites-page');
    locationPage = document.getElementById('location-page');
    detailImage = document.getElementById('detail-image');
    detailTitle = document.getElementById('detail-title');
    detailDescription = document.getElementById('detail-description');
    detailPrice = document.getElementById('detail-price');
    modalColorOptions = document.getElementById('modal-color-options');
    detailSizeOptions = document.getElementById('detail-size-options');
    stampPositionGroup = document.getElementById('stamp-position-group');
    addToCartDetailButton = document.getElementById('add-to-cart-detail');
    buyNowDetailButton = document.getElementById('buy-now-detail');
    locationForm = document.getElementById('location-form');
    shippingPrice = document.getElementById('shipping-price');
    shippingInfo = document.getElementById('shipping-info');
    shippingPriceContainer = document.querySelector('.shipping-price-premium');
    finalizeOrderButton = document.getElementById('finalize-order');
    confirmationModal = document.getElementById('confirmation-modal');
    closeModal = document.querySelector('.close-modal-premium');
    closeConfirmation = document.getElementById('close-confirmation');
    navLinks = document.querySelector('.nav-links');
    navLinksItems = document.querySelectorAll('.nav-link');
    footerNavLinks = document.querySelectorAll('.footer-nav-link');
    cartIcon = document.getElementById('cart-icon');
    favoriteIcon = document.getElementById('favorite-icon');
    cartItemsContainer = document.getElementById('cart-items');
    cartSummary = document.getElementById('cart-summary');
    continueShoppingBtn = document.getElementById('continue-shopping');
    checkoutBtn = document.getElementById('checkout-btn');
    cartCount = document.querySelector('.cart-count');
    favoriteCount = document.querySelector('.favorite-count');
    backFromProduct = document.getElementById('back-from-product');
    backFromCart = document.getElementById('back-from-cart');
    backFromFavorites = document.getElementById('back-from-favorites');
    backFromLocation = document.getElementById('back-from-location');
    categoryFilters = document.querySelectorAll('.category-filter-premium');
    backToHomeFromProduct = document.getElementById('back-to-home-from-product');
    deliveryOptions = document.getElementById('delivery-options');
    favoritesBackToHome = document.getElementById('favorites-back-to-home');
    
    // Elementos do carrossel de banners
    bannerTrack = document.querySelector('.banner-track');
    bannerSlides = document.querySelectorAll('.banner-slide');
}

// Inicializar carrossel de banners
function initBannerCarousel() {
    if (!bannerTrack || bannerSlides.length === 0) return;
    
    // Mostrar primeiro banner
    showBanner(0);
    
    // Iniciar autoplay
    startBannerAutoplay();
    
    // Pausar autoplay ao interagir
    bannerTrack.addEventListener('mouseenter', pauseBannerAutoplay);
    bannerTrack.addEventListener('mouseleave', startBannerAutoplay);
    bannerTrack.addEventListener('touchstart', pauseBannerAutoplay);
}

// Mostrar banner específico
function showBanner(index) {
    // Validar índice
    if (index < 0) index = bannerSlides.length - 1;
    if (index >= bannerSlides.length) index = 0;
    
    // Atualizar índice atual
    currentBannerIndex = index;
    
    // Ocultar todos os banners
    bannerSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Mostrar banner atual
    bannerSlides[currentBannerIndex].classList.add('active');
}

// Próximo banner
function nextBanner() {
    showBanner(currentBannerIndex + 1);
}

// Controle de autoplay dos banners
function startBannerAutoplay() {
    if (bannerTimer) clearInterval(bannerTimer);
    bannerTimer = setInterval(nextBanner, bannerInterval);
}

function pauseBannerAutoplay() {
    if (bannerTimer) clearInterval(bannerTimer);
}

// Configurar event listeners
function setupEventListeners() {
    // Navegação principal
    if (navLinksItems) {
        navLinksItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.getAttribute('data-section');
                showSection(section);
            });
        });
    }
    
    if (footerNavLinks) {
        footerNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.getAttribute('data-section');
                showSection(section);
            });
        });
    }
    
    // Navegação entre páginas
    if (cartIcon) {
        cartIcon.addEventListener('click', showCart);
    }
    
    if (favoriteIcon) {
        favoriteIcon.addEventListener('click', showFavorites);
    }
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', showHome);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', showLocation);
    }
    
    if (backFromProduct) {
        backFromProduct.addEventListener('click', showHome);
    }
    
    if (backFromCart) {
        backFromCart.addEventListener('click', showHome);
    }
    
    if (backFromFavorites) {
        backFromFavorites.addEventListener('click', showHome);
    }
    
    if (backFromLocation) {
        backFromLocation.addEventListener('click', showCart);
    }
    
    if (backToHomeFromProduct) {
        backToHomeFromProduct.addEventListener('click', showHome);
    }

    // Botão de voltar dos favoritos
    if (favoritesBackToHome) {
        favoritesBackToHome.addEventListener('click', showHome);
    }
    
    // Filtros de categoria
    if (categoryFilters) {
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                const category = e.currentTarget.getAttribute('data-category');
                filterProductsByCategory(category);
            });
        });
    }
    
    // Página do produto
    if (addToCartDetailButton) {
        addToCartDetailButton.addEventListener('click', addToCartFromDetail);
    }
    
    if (buyNowDetailButton) {
        buyNowDetailButton.addEventListener('click', buyNowFromDetail);
    }
    
    // Formulário de localização
    if (locationForm) {
        locationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            finalizeOrder();
        });
    }
    
    // Campos de endereço para calcular frete
    const cityInput = document.getElementById('city');
    if (cityInput) {
        cityInput.addEventListener('input', calculateShipping);
    }
    
    const deliveryMethodInputs = document.querySelectorAll('input[name="delivery-method"]');
    if (deliveryMethodInputs) {
        deliveryMethodInputs.forEach(input => {
            input.addEventListener('change', calculateShipping);
        });
    }
    
    // Modal de confirmação
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            confirmationModal.style.display = 'none';
        });
    }
    
    if (closeConfirmation) {
        closeConfirmation.addEventListener('click', () => {
            confirmationModal.style.display = 'none';
        });
    }
    
    // Fechar modal clicando fora
    window.addEventListener('click', (e) => {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
    
    // Event delegation para cards de produto
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.grade-card');
        if (card) {
            const productId = card.getAttribute('data-product-id');
            showProductDetail(productId);
        }
        
        // Event delegation para pacotes
        const packageBtn = e.target.closest('.package-btn');
        if (packageBtn) {
            e.preventDefault();
            const packageType = packageBtn.getAttribute('data-package');
            handlePackageSelection(packageType);
        }
        
        // Botão de adicionar rápido
        const quickAddBtn = e.target.closest('.quick-add-btn');
        if (quickAddBtn) {
            e.preventDefault();
            e.stopPropagation();
            const productId = quickAddBtn.getAttribute('data-product-id');
            const product = findProductById(productId);
            if (product) {
                // Adicionar ao carrinho com configurações padrão
                const firstColor = Object.keys(product.variants)[0];
                const firstVariant = product.variants[firstColor];
                const firstSize = firstVariant.sizes[0];
                const firstPosition = product.positions.length > 0 ? product.positions[0] : '';
                
                const finalPrice = calculateFinalPrice(firstVariant.price, firstPosition);
                
                addToCart(product, firstColor, firstSize, firstPosition, finalPrice);
                
                // Feedback visual
                quickAddBtn.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
                quickAddBtn.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    quickAddBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Adicionar ao Carrinho';
                    quickAddBtn.style.background = '';
                }, 2000);
            }
        }
    });
}

// Mostrar seção
function showSection(section) {
    currentSection = section;
    
    // Ocultar todas as seções
    document.querySelectorAll('.nav-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Scroll para topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar página inicial
function showHome() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (homePage) homePage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar carrinho
function showCart() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (cartPage) cartPage.classList.add('active');
    renderCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar favoritos - FUNÇÃO CORRIGIDA
function showFavorites() {
    console.log('Abrindo favoritos...');
    
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar página de favoritos
    if (favoritesPage) {
        favoritesPage.classList.add('active');
        // Renderizar DEPOIS de mostrar a página
        setTimeout(() => {
            renderFavorites();
        }, 50);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar página de localização
function showLocation() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (locationPage) locationPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Filtrar produtos por categoria
function filterProductsByCategory(category) {
    currentCategory = category;
    
    // Atualizar filtros ativos
    categoryFilters.forEach(filter => {
        filter.classList.remove('active');
    });
    
    const activeFilter = document.querySelector(`[data-category="${category}"]`);
    if (activeFilter) activeFilter.classList.add('active');
    
    // Ocultar todas as grades
    const allGrades = document.querySelectorAll('.grade-produtos');
    allGrades.forEach(grade => {
        grade.style.display = 'none';
    });
    
    // Mostrar apenas a grade da categoria selecionada
    const targetGrade = document.getElementById(`grade-produtos-${category}`);
    if (targetGrade) {
        targetGrade.style.display = 'block';
    }
}

// Mostrar detalhes do produto
function showProductDetail(productId) {
    const product = findProductById(productId);
    if (!product) return;
    
    currentProduct = product;
    currentColor = Object.keys(product.variants)[0];
    currentSize = product.variants[currentColor].sizes[0];
    currentPosition = product.positions.length > 0 ? product.positions[0] : '';
    
    // Atualizar elementos DOM
    if (detailTitle) detailTitle.textContent = product.name;
    if (detailDescription) detailDescription.textContent = product.description;
    
    updateProductDetailView();
    
    // Mostrar página do produto
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (productPage) productPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Atualizar visualização do produto
function updateProductDetailView() {
    if (!currentProduct) return;
    
    const variant = currentProduct.variants[currentColor];
    
    // Atualizar imagem
    if (detailImage) {
        detailImage.src = variant.image;
        detailImage.alt = currentProduct.name;
    }
    
    // Atualizar preço
    const basePrice = currentProduct.discount ? 
        variant.price * (1 - currentProduct.discount / 100) : 
        variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    if (detailPrice) detailPrice.textContent = finalPrice.toFixed(2);
    
    // Atualizar opções de cor
    updateColorOptions();
    
    // Atualizar opções de tamanho
    updateSizeOptions();
    
    // Atualizar opções de posição (se aplicável)
    updatePositionOptions();
}

// Atualizar opções de cor
function updateColorOptions() {
    if (!modalColorOptions || !currentProduct) return;
    
    modalColorOptions.innerHTML = '';
    
    Object.keys(currentProduct.variants).forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = `color-option-premium ${color === currentColor ? 'active' : ''}`;
        colorOption.setAttribute('data-color', color);
        
        let bgColor;
        switch(color) {
            case 'branco': bgColor = 'white'; break;
            case 'rosa claro': bgColor = '#FFB6C1'; break;
            case 'azul claro': bgColor = '#87CEEB'; break;
            default: bgColor = color;
        }
        
        colorOption.style.backgroundColor = bgColor;
        
        colorOption.addEventListener('click', () => {
            currentColor = color;
            updateProductDetailView();
        });
        
        modalColorOptions.appendChild(colorOption);
    });
}

// Atualizar opções de tamanho
function updateSizeOptions() {
    if (!detailSizeOptions || !currentProduct) return;
    
    detailSizeOptions.innerHTML = '';
    
    const variant = currentProduct.variants[currentColor];
    variant.sizes.forEach(size => {
        const sizeOption = document.createElement('div');
        sizeOption.className = `size-option-premium ${size === currentSize ? 'active' : ''}`;
        sizeOption.setAttribute('data-size', size);
        sizeOption.textContent = size;
        
        sizeOption.addEventListener('click', () => {
            currentSize = size;
            
            // Atualizar estado ativo
            detailSizeOptions.querySelectorAll('.size-option-premium').forEach(option => {
                option.classList.remove('active');
            });
            sizeOption.classList.add('active');
        });
        
        detailSizeOptions.appendChild(sizeOption);
    });
}

// Atualizar opções de posição
function updatePositionOptions() {
    if (!stampPositionGroup || !currentProduct) return;
    
    // Esconder seção de posição para canecas
    if (currentProduct.category === 'canecas') {
        stampPositionGroup.style.display = 'none';
        return;
    }
    
    stampPositionGroup.style.display = 'block';
    
    const positionOptions = stampPositionGroup.querySelectorAll('.position-option-premium');
    positionOptions.forEach(option => {
        const position = option.getAttribute('data-position');
        option.classList.toggle('active', position === currentPosition);
        
        option.addEventListener('click', () => {
            currentPosition = position;
            
            // Atualizar estado ativo
            positionOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Atualizar preço
            updateProductDetailView();
        });
    });
}

// Adicionar ao carrinho da página de detalhes
function addToCartFromDetail() {
    if (!currentProduct) return;
    
    const variant = currentProduct.variants[currentColor];
    const basePrice = currentProduct.discount ? 
        variant.price * (1 - currentProduct.discount / 100) : 
        variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    
    // Feedback visual
    if (addToCartDetailButton) {
        const originalText = addToCartDetailButton.textContent;
        addToCartDetailButton.textContent = '✓ Adicionado!';
        addToCartDetailButton.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            addToCartDetailButton.textContent = originalText;
            addToCartDetailButton.style.background = '';
        }, 2000);
    }
}

// Comprar agora da página de detalhes
function buyNowFromDetail() {
    if (!currentProduct) return;
    
    // Adicionar ao carrinho primeiro
    const variant = currentProduct.variants[currentColor];
    const basePrice = currentProduct.discount ? 
        variant.price * (1 - currentProduct.discount / 100) : 
        variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    
    // Ir para carrinho
    showCart();
}

// Manipular seleção de pacotes
function handlePackageSelection(packageType) {
    let message = '';
    let totalPrice = '';
    
    switch(packageType) {
        case '12-camisetas':
            message = 'Olá! Gostaria de solicitar um orçamento para o *Pacote 12 Camisetas Personalizadas* no valor de *R$ 156,00*.';            totalPrice = '156,00';
            break;
        case '6-camisetas-6-canecas':
            message = 'Olá! Gostaria de solicitar um orçamento para o *Pacote 6 Camisetas + 6 Canecas Personalizadas* no valor de *R$ 215,00*.';
            totalPrice = '215,00';
            break;
    }
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Inicializar o site quando carregado
document.addEventListener('DOMContentLoaded', function() {
    init();
});

// Otimizações de performance
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Recalcular layouts se necessário
    }, 250);
});

// Preload de imagens críticas
function preloadCriticalImages() {
    const criticalImages = [
        'https://i.postimg.cc/J074cQQ6/Banner-nova-cole-o-moda-feminina-e-commerce-amarelo.png',
        'https://i.postimg.cc/cHBLnzf4/Banner-nova-cole-o-moda-feminina-e-commerce-amarelo-1.png',
        'https://i.postimg.cc/7LXMwqLr/Sua-imagina-o-merece-destaque.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Iniciar preload quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalImages);
} else {
    preloadCriticalImages();
}