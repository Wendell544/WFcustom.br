// Variáveis globais
const phoneNumber = '5583999667578';
let currentProduct = null;
let currentColor = 'branco';
let currentSize = 'P';
let currentPosition = 'frente';
let currentSection = 'home';
let currentCategory = 'masculino';

// Configurações do carrossel de banners
let currentBannerIndex = 0;
const bannerInterval = 5000;
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

// SISTEMA DE ANÚNCIOS COMPACTO
class CompactAnnouncementSystem {
    constructor() {
        this.currentAnnouncement = 0;
        this.announcements = [
            "🚚 Frete Grátis em compras acima de R$ 100 • 🎯 5% de desconto em 2 camisas • 10% em 3+ • 🎨 Personalização Grátis"
        ];
        this.interval = null;
        this.init();
    }

    init() {
        this.createAnnouncementBar();
        this.setupEventListeners();
    }

    createAnnouncementBar() {
        if (document.querySelector('.announcement-bar-compact')) {
            return;
        }

        const announcementBar = document.createElement('div');
        announcementBar.className = 'announcement-bar-compact';
        announcementBar.innerHTML = `
            <div class="announcement-track-compact" id="announcement-track-compact">
                <div class="announcement-slide-compact active">
                    ${this.announcements[0]}
                </div>
            </div>
            <button class="announcement-close-compact" id="announcement-close-compact">
                <i class="fas fa-times"></i>
            </button>
        `;

        const bannerCarousel = document.querySelector('.banner-carousel');
        if (bannerCarousel) {
            bannerCarousel.parentNode.insertBefore(announcementBar, bannerCarousel.nextSibling);
        } else {
            const header = document.querySelector('header');
            if (header) {
                header.parentNode.insertBefore(announcementBar, header.nextSibling);
            }
        }
    }

    setupEventListeners() {
        const closeBtn = document.getElementById('announcement-close-compact');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                const announcementBar = document.querySelector('.announcement-bar-compact');
                if (announcementBar) {
                    announcementBar.style.display = 'none';
                    if (this.interval) {
                        clearInterval(this.interval);
                    }
                }
            });
        }
    }
}

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
    console.log('=== INICIANDO SISTEMA ===');
    initializeDOMElements();
    setupEventListeners();
    initBannerCarousel();
    updateCartCount();
    updateFavoriteCount();
    
    new CompactAnnouncementSystem();
    
    filterProductsByCategory('masculino');
    
    // Garantir que as grades sejam populadas
    setTimeout(() => {
        console.log('Inicializando grades via main.js...');
        if (typeof populateAllGrades === 'function') {
            populateAllGrades();
        } else {
            console.error('populateAllGrades não encontrada!');
            // Tentar recarregar as grades após um delay
            setTimeout(() => {
                if (typeof populateAllGrades === 'function') {
                    populateAllGrades();
                }
            }, 500);
        }
    }, 200);
}

// Inicializar elementos DOM
function initializeDOMElements() {
    console.log('Inicializando elementos DOM...');
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
    
    bannerTrack = document.querySelector('.banner-track');
    bannerSlides = document.querySelectorAll('.banner-slide');
    
    console.log('Elementos DOM inicializados:', {
        homePage: !!homePage,
        productPage: !!productPage,
        cartPage: !!cartPage,
        categoryFilters: categoryFilters.length
    });
}

// Inicializar carrossel de banners
function initBannerCarousel() {
    if (!bannerTrack || bannerSlides.length === 0) return;
    
    showBanner(0);
    startBannerAutoplay();
    
    bannerTrack.addEventListener('mouseenter', pauseBannerAutoplay);
    bannerTrack.addEventListener('mouseleave', startBannerAutoplay);
    bannerTrack.addEventListener('touchstart', pauseBannerAutoplay);
}

// Mostrar banner específico
function showBanner(index) {
    if (index < 0) index = bannerSlides.length - 1;
    if (index >= bannerSlides.length) index = 0;
    
    currentBannerIndex = index;
    
    bannerSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
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
    console.log('Configurando event listeners...');
    
    // Event delegation para cards de produto - CORREÇÃO CRÍTICA
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.grade-card');
        if (card) {
            const productId = card.getAttribute('data-product-id');
            console.log('Card clicado, produto ID:', productId);
            showProductDetail(productId);
        }
        
        const packageBtn = e.target.closest('.package-btn');
        if (packageBtn) {
            e.preventDefault();
            const packageType = packageBtn.getAttribute('data-package');
            handlePackageSelection(packageType);
        }
    });

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

// Mostrar favoritos
function showFavorites() {
    console.log('Abrindo favoritos...');
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (favoritesPage) {
        favoritesPage.classList.add('active');
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
    console.log('Filtrando categoria:', category);
    currentCategory = category;
    
    categoryFilters.forEach(filter => {
        filter.classList.remove('active');
    });
    
    const activeFilter = document.querySelector(`[data-category="${category}"]`);
    if (activeFilter) activeFilter.classList.add('active');
    
    const allGrades = document.querySelectorAll('.grade-produtos');
    allGrades.forEach(grade => {
        grade.style.display = 'none';
    });
    
    const targetGrade = document.getElementById(`grade-produtos-${category}`);
    if (targetGrade) {
        targetGrade.style.display = 'block';
        console.log(`Mostrando grade: grade-produtos-${category}`);
        
        // Garantir que os produtos estão carregados
        const containerId = `grade-container-${category}`;
        const container = document.getElementById(containerId);
        if (container && container.children.length === 0) {
            console.log(`Container vazio, repopulando: ${containerId}`);
            if (products[category] && typeof populateGrade === 'function') {
                populateGrade(containerId, products[category]);
            }
        }
    } else {
        console.error(`Grade não encontrada: grade-produtos-${category}`);
    }
}

// Mostrar detalhes do produto - FUNÇÃO CORRIGIDA
function showProductDetail(productId) {
    console.log('Mostrando detalhes do produto:', productId);
    
    let product;
    if (typeof findProductById === 'function') {
        product = findProductById(productId);
    } else {
        console.error('findProductById não encontrada!');
        return;
    }
    
    if (!product) {
        console.error('Produto não encontrado:', productId);
        return;
    }
    
    currentProduct = product;
    currentColor = Object.keys(product.variants)[0];
    currentSize = product.variants[currentColor].sizes[0];
    currentPosition = product.positions.length > 0 ? product.positions[0] : '';
    
    if (detailTitle) detailTitle.textContent = product.name;
    if (detailDescription) detailDescription.textContent = product.description;
    
    updateProductDetailView();
    
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
    
    if (detailImage) {
        detailImage.src = variant.image;
        detailImage.alt = currentProduct.name;
    }
    
    const basePrice = variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    if (detailPrice) detailPrice.textContent = finalPrice.toFixed(2);
    
    updateColorOptions();
    updateSizeOptions();
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
            
            positionOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            updateProductDetailView();
        });
    });
}

// Adicionar ao carrinho da página de detalhes
function addToCartFromDetail() {
    if (!currentProduct) return;
    
    const variant = currentProduct.variants[currentColor];
    const basePrice = variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    
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
    
    const variant = currentProduct.variants[currentColor];
    const basePrice = variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    
    showCart();
}

// Manipular seleção de pacotes
function handlePackageSelection(packageType) {
    let message = '';
    let totalPrice = '';
    
    switch(packageType) {
        case '12-camisetas':
            message = 'Olá! Gostaria de solicitar um orçamento para o *Pacote 12 Camisetas Personalizadas* no valor de *R$ 423,00* (original R$ 512,00).';
            totalPrice = '423,00';
            break;
        case '10-canecas':
            message = 'Olá! Gostaria de solicitar um orçamento para o *Pacote 10 Canecas Personalizadas* no valor de *R$ 329,00* (original R$ 430,20).';
            totalPrice = '329,00';
            break;
    }
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Inicializar o site quando carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM CARREGADO - INICIANDO MAIN.JS ===');
    init();
});

// Funções globais para outros scripts
window.showProductDetail = showProductDetail;
window.filterProductsByCategory = filterProductsByCategory;