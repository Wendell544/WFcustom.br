// Função auxiliar para cores
function getColorHex(colorName) {
    switch(colorName) {
        case 'branco': return 'white';
        case 'rosa claro': return '#FFB6C1';
        case 'preto': return '#000000';
        default: return colorName;
    }
}

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

// Configurações do sistema de anúncios
let currentAnnouncementIndex = 0;
const announcementInterval = 4000;
let announcementTimer = null;

// Elementos DOM
let homePage, productPage, cartPage, favoritesPage, locationPage, detailImage, detailTitle, detailDescription;
let detailPrice, modalColorOptions, detailSizeOptions, stampPositionGroup, addToCartDetailButton;
let locationForm, shippingPrice, shippingInfo;
let shippingPriceContainer, finalizeOrderButton, confirmationModal, closeModal, closeConfirmation;
let navLinks, navLinksItems, footerNavLinks, cartIcon, favoriteIcon, cartItemsContainer;
let cartSummary, continueShoppingBtn, checkoutBtn, cartCount, favoriteCount, backFromProduct, backFromCart;
let backFromFavorites, backFromLocation, categoryFilters, backToHomeFromProduct, deliveryOptions;
let favoritesBackToHome;

// Elementos do carrossel de banners
let bannerTrack, bannerSlides;

// Elementos do sistema de anúncios
let announcementSystem, announcementSlides;

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
    console.log('🚀 Inicializando aplicação...');
    initializeDOMElements();
    setupEventListeners();
    initBannerCarousel();
    initAnnouncementSystem();
    
    // INICIALIZAÇÃO DO CARRINHO - AGORA MAIS ROBUSTA
    setTimeout(() => {
        if (window.initializeCart) {
            window.initializeCart();
        } else {
            console.error('initializeCart não encontrada!');
            // Fallback manual
            updateCartCount();
        }
    }, 300);
    
    updateFavoriteCount();
    
    // Aplicar categoria padrão "masculino" SEM scroll
    filterProductsByCategory('masculino');
    
    // Popular grades APÓS garantir que o DOM está pronto
    setTimeout(() => {
        console.log('📦 Inicializando grades...');
        if (window.populateAllGrades) {
            window.populateAllGrades();
        } else {
            console.error('populateAllGrades não encontrada!');
            setTimeout(() => {
                if (window.populateAllGrades) {
                    window.populateAllGrades();
                }
            }, 1000);
        }
        
        // Forçar redesenho se ainda não aparecer
        setTimeout(() => {
            if (document.querySelectorAll('.grade-card').length === 0) {
                console.log('🔄 Nenhum card encontrado, recarregando...');
                if (window.populateAllGrades) {
                    window.populateAllGrades();
                }
            }
        }, 1000);
    }, 500);
    
    console.log('✅ Aplicação inicializada');
}

// Inicializar elementos DOM
function initializeDOMElements() {
    console.log('🔧 Inicializando elementos DOM...');
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
    
    // Elementos do sistema de anúncios
    announcementSystem = document.getElementById('announcement-system');
    announcementSlides = document.querySelectorAll('.announcement-slide-premium');
    
    console.log('✅ Elementos DOM inicializados:', {
        homePage: !!homePage,
        productPage: !!productPage,
        cartPage: !!cartPage,
        gradeContainers: document.querySelectorAll('.grade-container').length
    });
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

// Inicializar sistema de anúncios
function initAnnouncementSystem() {
    if (!announcementSystem || announcementSlides.length === 0) return;
    
    // Mostrar primeiro anúncio
    showAnnouncement(0);
    
    // Iniciar rotatividade
    startAnnouncementRotation();
    
    // Fechar anúncio
    const closeBtn = document.getElementById('announcement-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            announcementSystem.style.display = 'none';
        });
    }
}

// Mostrar anúncio específico
function showAnnouncement(index) {
    if (announcementSlides.length === 0) return;
    
    // Validar índice
    if (index < 0) index = announcementSlides.length - 1;
    if (index >= announcementSlides.length) index = 0;
    
    // Atualizar índice atual
    currentAnnouncementIndex = index;
    
    // Ocultar todos os anúncios
    announcementSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Mostrar anúncio atual
    announcementSlides[currentAnnouncementIndex].classList.add('active');
}

// Próximo anúncio
function nextAnnouncement() {
    showAnnouncement(currentAnnouncementIndex + 1);
}

// Controle de rotatividade dos anúncios
function startAnnouncementRotation() {
    if (announcementTimer) clearInterval(announcementTimer);
    announcementTimer = setInterval(nextAnnouncement, announcementInterval);
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
    console.log('🔗 Configurando event listeners...');
    
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

    // BOTÃO DE VOLTAR DOS FAVORITOS
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
    });
    
    console.log('✅ Event listeners configurados');
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

// Mostrar carrinho - FUNÇÃO REVISADA
function showCart() {
    console.log('🛒 Abrindo carrinho...');
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (cartPage) {
        cartPage.classList.add('active');
        // AGORA SEMPRE RENDERIZA O CARRINHO AO ABRIR
        setTimeout(() => {
            if (window.renderCart) {
                window.renderCart();
            } else {
                console.error('renderCart não encontrada!');
            }
        }, 50);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar favoritos - FUNÇÃO CORRIGIDA
function showFavorites() {
    console.log('❤️ Abrindo favoritos...');
    
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
    const product = window.findProductById ? window.findProductById(productId) : null;
    if (!product) {
        console.error('❌ Produto não encontrado:', productId);
        return;
    }
    
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

// Atualizar opções de cor - FUNÇÃO CORRIGIDA
function updateColorOptions() {
    if (!modalColorOptions || !currentProduct) return;
    
    modalColorOptions.innerHTML = '';
    
    Object.keys(currentProduct.variants).forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = `color-option-premium ${color === currentColor ? 'active' : ''}`;
        colorOption.setAttribute('data-color', color);
        
        let bgColor;
        switch(color) {
            case 'branco': 
                bgColor = 'white'; 
                break;
            case 'rosa claro': 
                bgColor = '#FFB6C1'; 
                break;
            case 'preto': 
                bgColor = '#000000'; 
                break;
            default: 
                bgColor = color;
        }
        
        colorOption.style.backgroundColor = bgColor;
        
        // Adicionar borda para cor branca para melhor visibilidade
        if (color === 'branco') {
            colorOption.style.border = '1px solid #ccc';
        } else {
            colorOption.style.border = '1px solid transparent';
        }
        
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

// Adicionar ao carrinho da página de detalhes - AGORA USA A FUNÇÃO DO cart.js
function addToCartFromDetail() {
    if (!currentProduct) {
        console.error('❌ Nenhum produto selecionado!');
        return;
    }
    
    const variant = currentProduct.variants[currentColor];
    const basePrice = currentProduct.discount ? 
        variant.price * (1 - currentProduct.discount / 100) : 
        variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    console.log('🛒 Adicionando ao carrinho:', {
        product: currentProduct.name,
        color: currentColor,
        size: currentSize,
        position: currentPosition,
        price: finalPrice
    });
    
    // USAR A FUNÇÃO addToCart DO cart.js (exposta globalmente)
    const success = window.addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    
    if (success) {
        // Feedback visual
        if (addToCartDetailButton) {
            const originalText = addToCartDetailButton.textContent;
            addToCartDetailButton.textContent = '✓ Adicionado!';
            addToCartDetailButton.style.background = '#28a745';
            
            setTimeout(() => {
                addToCartDetailButton.textContent = originalText;
                addToCartDetailButton.style.background = '';
            }, 2000);
        }
    } else {
        console.error('❌ Falha ao adicionar produto ao carrinho');
    }
}

// Manipular seleção de pacotes
function handlePackageSelection(packageType) {
    let message = '';
    let totalPrice = '';
    
    switch(packageType) {
        case '12-camisetas':
            message = 'Olá! Gostaria de solicitar um orçamento para o *Pacote 12 Camisetas Personalizadas* no valor de *R$ 423,00* (economia de R$ 81,00).';
            totalPrice = '423,00';
            break;
        case '6-camisetas-6-canecas':
            message = 'Olá! Gostaria de solicitar um orçamento para o *Pacote 10 Canecas Personalizadas* no valor de *R$ 329,00* (economia de R$ 101,20).';
            totalPrice = '329,00';
            break;
    }
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Atualizar contador de favoritos
function updateFavoriteCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteCount = document.querySelector('.favorite-count');
    if (favoriteCount) {
        favoriteCount.textContent = favorites.length;
    }
}

// Renderizar favoritos
function renderFavorites() {
    const favoritesItems = document.getElementById('favorites-items');
    if (!favoritesItems) return;
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        favoritesItems.innerHTML = `
            <div class="empty-favorites" style="text-align: center; padding: 40px 20px;">
                <i class="far fa-heart" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">Nenhum produto favoritado</h3>
                <p style="color: #999;">Adicione produtos aos favoritos clicando no coração</p>
            </div>
        `;
        return;
    }
    
    favoritesItems.innerHTML = '';
    
    favorites.forEach(productId => {
        const product = window.findProductById ? window.findProductById(productId) : null;
        if (product) {
            const firstColor = Object.keys(product.variants)[0];
            const firstVariant = product.variants[firstColor];
            
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item-premium';
            favoriteItem.style.cssText = `
                display: flex;
                align-items: center;
                padding: 15px;
                border: 1px solid #eee;
                border-radius: 8px;
                margin-bottom: 10px;
                background: white;
            `;
            
            favoriteItem.innerHTML = `
                <img src="${firstVariant.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; margin-right: 15px;">
                <div class="favorite-item-info" style="flex: 1;">
                    <h3 style="margin: 0 0 5px 0; font-size: 16px;">${product.name}</h3>
                    <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">${product.description}</p>
                    <div class="favorite-item-price" style="font-weight: bold; color: #e74c3c;">R$ ${firstVariant.price.toFixed(2)}</div>
                </div>
                <div class="favorite-item-actions" style="display: flex; gap: 10px;">
                    <button class="btn btn-primary-premium" onclick="showProductDetail(${product.id})" style="background: #3498db; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Ver Detalhes</button>
                    <button class="btn btn-outline-premium remove-favorite" data-product-id="${product.id}" style="background: transparent; color: #e74c3c; border: 1px solid #e74c3c; padding: 8px 12px; border-radius: 4px; cursor: pointer;">
                        <i class="fas fa-trash"></i> Remover
                    </button>
                </div>
            `;
            
            favoritesItems.appendChild(favoriteItem);
        }
    });
    
    // Adicionar event listeners para remover favoritos
    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            toggleFavorite(productId);
            renderFavorites();
            updateFavoriteCount();
        });
    });
}

// Toggle favorito
function toggleFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(parseInt(productId));
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(parseInt(productId));
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteCount();
}

// Calcular frete - USA A FUNÇÃO DO cart.js
function calculateShipping() {
    if (window.calculateShipping) {
        window.calculateShipping();
    }
}

// Finalizar pedido - USA A FUNÇÃO DO cart.js
function finalizeOrder() {
    if (window.finalizeOrder) {
        window.finalizeOrder();
    } else {
        console.error('❌ Função finalizeOrder não encontrada!');
    }
}

// Inicializar o site quando carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM completamente carregado e analisado');
    setTimeout(init, 100);
});

// Também inicializar quando a página terminar de carregar completamente
window.addEventListener('load', function() {
    console.log('🖼️ Página completamente carregada');
    setTimeout(init, 200);
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

// Função auxiliar para debug
window.debugCart = function() {
    console.log('🔍 Debug do Carrinho:', {
        cartItems: cartItems,
        localStorage: localStorage.getItem('cartItems'),
        cartCount: document.querySelector('.cart-count')?.textContent
    });
};