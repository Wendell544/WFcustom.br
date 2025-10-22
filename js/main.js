// Variáveis globais
const phoneNumber = '5583999667578';
let currentProduct = null;
let currentColor = 'branco';
let currentSize = 'P';
let currentPosition = 'frente';
let currentSection = 'home';
let currentCategory = 'masculino'; // Alterado para masculino como padrão
let cartItems = [];

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
let cartSummary, continueShoppingBtn, checkoutBtn, cartCount, favoriteCount, backFromProduct;
let backFromCart, backFromFavorites, backFromLocation, categoryFilters, backToHomeFromProduct;
let deliveryOptions, favoritesBackToHome;

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

// ===== SISTEMA DE OFERTAS PREMIUM - TOTALMENTE REFORMULADO =====

// Timer de ofertas
function initOffersTimer() {
    const offerEndDate = new Date();
    offerEndDate.setDate(offerEndDate.getDate() + 3); // Ofertas por 3 dias
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = offerEndDate - now;
        
        if (distance < 0) {
            // Reset timer se acabou
            offerEndDate.setDate(offerEndDate.getDate() + 3);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Atualizar elementos DOM
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Atualizar timer a cada segundo
    setInterval(updateTimer, 1000);
    updateTimer(); // Inicializar imediatamente
}

// Popular produtos em oferta
function populateOffersProducts() {
    const container = document.getElementById('offers-products-container');
    if (!container) return;
    
    // Selecionar alguns produtos para exibir como ofertas
    const offerProducts = [
        ...products.masculino.slice(0, 2),
        ...products.unissexo.slice(0, 2),
        ...products.canecas.slice(0, 2)
    ];
    
    container.innerHTML = '';
    
    offerProducts.forEach((product, index) => {
        const firstColor = Object.keys(product.variants)[0];
        const firstVariant = product.variants[firstColor];
        const firstPrice = firstVariant.price;
        
        // Aplicar desconto especial para produtos em oferta
        const discount = index % 3 === 0 ? 15 : (index % 3 === 1 ? 10 : 5);
        const discountedPrice = firstPrice * (1 - discount / 100);
        
        const card = document.createElement('div');
        card.className = 'offer-product-card';
        card.setAttribute('data-product-id', product.id);
        
        card.innerHTML = `
            <div class="offer-product-badge">${discount}% OFF</div>
            ${index === 0 ? '<div class="offer-product-ribbon">MAIS VENDIDO</div>' : ''}
            
            <div class="image-container">
                <img src="${firstVariant.image}" alt="${product.name}" class="grade-card-image" loading="lazy">
            </div>
            
            <div class="grade-card-info">
                <h3 class="grade-card-title">${product.name}</h3>
                
                <div class="grade-card-pricing">
                    <div class="original-price">De: R$ ${firstPrice.toFixed(2)}</div>
                    <div class="grade-card-price">Por: R$ ${discountedPrice.toFixed(2)}</div>
                </div>
                
                <div class="offer-progress-container">
                    <div class="offer-progress-text">
                        <span>Vendas: ${Math.floor(Math.random() * 50) + 10}/100</span>
                        <span>${discount}% OFF</span>
                    </div>
                    <div class="offer-progress-bar">
                        <div class="offer-progress-fill" style="width: ${Math.floor(Math.random() * 50) + 50}%"></div>
                    </div>
                </div>
                
                <button class="btn btn-primary-premium btn-block offer-details-btn">
                    <i class="fas fa-gift"></i> Ver Detalhes da Oferta
                </button>
            </div>
        `;
        
        container.appendChild(card);
        
        // Adicionar event listener para o botão de detalhes
        const detailsBtn = card.querySelector('.offer-details-btn');
        detailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showOfferDetails(product, discount, discountedPrice);
        });
        
        // Manter a funcionalidade de clique normal no card
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.offer-details-btn')) {
                showProductDetail(product.id);
            }
        });
    });
}

// Modal de detalhes da oferta
function showOfferDetails(product, discount, discountedPrice) {
    // Criar modal dinamicamente
    const modal = document.createElement('div');
    modal.className = 'offer-details-modal';
    modal.id = 'offer-details-modal';
    
    modal.innerHTML = `
        <div class="offer-modal-content">
            <div class="offer-modal-header">
                <div class="offer-modal-icon">🎁</div>
                <h3 class="offer-modal-title">Oferta Especial!</h3>
                <p class="offer-modal-description">${product.name} com ${discount}% de desconto</p>
            </div>
            
            <div class="product-info">
                <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;">
                    <img src="${product.variants[Object.keys(product.variants)[0]].image}" 
                         alt="${product.name}" 
                         style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--border-radius);">
                    <div>
                        <h4 style="margin: 0; color: var(--premium-black);">${product.name}</h4>
                        <p style="margin: 0.3rem 0; color: var(--text-light); font-size: 0.9rem;">${product.description}</p>
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <span style="text-decoration: line-through; color: var(--text-light); font-size: 0.9rem;">
                                R$ ${product.variants[Object.keys(product.variants)[0]].price.toFixed(2)}
                            </span>
                            <span style="font-size: 1.3rem; font-weight: 800; color: var(--ofertas-primary);">
                                R$ ${discountedPrice.toFixed(2)}
                            </span>
                            <span style="background: var(--ofertas-primary); color: white; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem; font-weight: 700;">
                                -${discount}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="offer-conditions">
                <h4>📋 Condições da Oferta:</h4>
                <ul>
                    <li>Desconto aplicado automaticamente no carrinho</li>
                    <li>Frete grátis para compras acima de R$ 100</li>
                    <li>Entrega para todo Brasil</li>
                    <li>Produto de alta qualidade</li>
                </ul>
            </div>
            
            <div class="action-buttons-premium">
                <button class="btn btn-outline-premium" id="close-offer-modal">
                    <i class="fas fa-times"></i> Fechar
                </button>
                <button class="btn btn-primary-premium" id="add-offer-to-cart">
                    <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Event listeners para o modal
    const closeBtn = modal.querySelector('#close-offer-modal');
    const addToCartBtn = modal.querySelector('#add-offer-to-cart');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    addToCartBtn.addEventListener('click', () => {
        // Adicionar produto com preço promocional
        const variant = product.variants[Object.keys(product.variants)[0]];
        addToCart(product, Object.keys(product.variants)[0], variant.sizes[0], 
                 product.positions.length > 0 ? product.positions[0] : '', discountedPrice);
        
        // Fechar modal
        modal.style.display = 'none';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
        
        // Mostrar feedback
        showOfferNotification(product, { discountMessages: [
            { message: `🎉 ${discount}% OFF aplicado no ${product.name}!` }
        ] });
    });
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    });
}

// Botão de ofertas relâmpago no WhatsApp
function setupFlashSalesButton() {
    const flashSalesBtn = document.getElementById('flash-sales-btn');
    if (flashSalesBtn) {
        flashSalesBtn.addEventListener('click', () => {
            const message = `Olá! Gostaria de conhecer as *OFERTAS RELÂMPAGO* disponíveis! 🎊\n\nPoderia me enviar a lista de produtos em promoção?`;
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }
}

// Inicializar sistema de ofertas
function initOffersSystem() {
    initOffersTimer();
    populateOffersProducts();
    setupFlashSalesButton();
    
    // Adicionar event listeners para cards de oferta
    document.querySelectorAll('.offer-card-premium').forEach(card => {
        card.addEventListener('click', function() {
            const offerType = this.getAttribute('data-offer');
            showOfferTypeDetails(offerType);
        });
    });
}

// Modal para tipos de oferta
function showOfferTypeDetails(offerType) {
    const offerDetails = {
        'frete_gratis': {
            icon: '🚚',
            title: 'Frete Grátis',
            description: 'Entrega gratuita para compras acima de R$ 100',
            conditions: [
                'Válido para todo território nacional',
                'Compra mínima de R$ 100,00',
                'Entrega em até 7 dias úteis',
                'Cupom aplicado automaticamente'
            ]
        },
        'desconto_camisetas': {
            icon: '👕', 
            title: 'Combo Camisetas',
            description: 'Descontos progressivos na compra de camisetas',
            conditions: [
                '5% de desconto na compra de 2 camisetas',
                '10% de desconto na compra de 3+ camisetas',
                'Desconto aplicado automaticamente',
                'Válido para todas as estampas'
            ]
        },
        'desconto_canecas': {
            icon: '☕',
            title: 'Kit Canecas',
            description: 'Desconto especial para compra em quantidade',
            conditions: [
                '5% de desconto na compra de 3+ canecas',
                'Produtos de alta qualidade',
                'Personalização disponível',
                'Entrega rápida'
            ]
        }
    };
    
    const offer = offerDetails[offerType];
    if (!offer) return;
    
    // Criar modal (similar ao showOfferDetails)
    const modal = document.createElement('div');
    modal.className = 'offer-details-modal';
    
    modal.innerHTML = `
        <div class="offer-modal-content">
            <div class="offer-modal-header">
                <div class="offer-modal-icon">${offer.icon}</div>
                <h3 class="offer-modal-title">${offer.title}</h3>
                <p class="offer-modal-description">${offer.description}</p>
            </div>
            
            <div class="offer-conditions">
                <h4>📋 Condições da Oferta:</h4>
                <ul>
                    ${offer.conditions.map(condition => `<li>${condition}</li>`).join('')}
                </ul>
            </div>
            
            <div class="action-buttons-premium">
                <button class="btn btn-outline-premium" id="close-offer-type-modal">
                    <i class="fas fa-times"></i> Fechar
                </button>
                <button class="btn btn-primary-premium" onclick="showProductsSection()">
                    <i class="fas fa-shopping-bag"></i> Ver Produtos
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Fechar modal
    const closeBtn = modal.querySelector('#close-offer-type-modal');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    });
}

// Função para mostrar seção de produtos
function showProductsSection() {
    showHome();
    // Scroll para produtos
    setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// Função para mostrar ofertas ao adicionar ao carrinho
function showOfferNotification(product, offers) {
    // Criar notificação flutuante
    const notification = document.createElement('div');
    notification.className = 'offer-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.5s ease-out;
    `;
    
    let message = `✅ <strong>${product.name}</strong> adicionado!<br>`;
    
    if (offers.discountMessages.length > 0) {
        message += `<br>🎊 <strong>Ofertas ativas:</strong><br>`;
        offers.discountMessages.forEach(offer => {
            message += `• ${offer.message}<br>`;
        });
    }
    
    notification.innerHTML = message;
    document.body.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Funções de inicialização
function init() {
    initializeDOMElements();
    setupEventListeners();
    initBannerCarousel();
    updateCartCount();
    updateFavoriteCount();
    
    // Inicializar sistema de ofertas
    initOffersSystem();
    
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

// Adicionar ao carrinho da página de detalhes - FUNÇÃO MODIFICADA
function addToCartFromDetail() {
    if (!currentProduct) return;
    
    const variant = currentProduct.variants[currentColor];
    const basePrice = currentProduct.discount ? 
        variant.price * (1 - currentProduct.discount / 100) : 
        variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    
    // Calcular ofertas atuais
    const offers = calculateAutomaticDiscounts(cartItems);
    
    // Mostrar notificação de ofertas
    showOfferNotification(currentProduct, offers);
    
    // Feedback visual no botão
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
    
    // Calcular ofertas atuais
    const offers = calculateAutomaticDiscounts(cartItems);
    
    // Mostrar notificação de ofertas
    showOfferNotification(currentProduct, offers);
    
    // Ir para carrinho
    showCart();
}

// Manipular seleção de pacotes
function handlePackageSelection(packageType) {
    let message = '';
    let totalPrice = '';
    
    switch(packageType) {
        case '12-camisetas':
            message = 'Olá! Gostaria de solicitar um orçamento para o *Pacote 12 Camisetas Personalizadas* no valor de *R$ 156,00*.';
            totalPrice = '156,00';
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

// ===== FUNÇÕES DE CARRINHO E FAVORITOS (EXISTENTES) =====

function addToCart(product, color, size, position, price) {
    const cartItem = {
        id: Date.now(),
        product: product,
        color: color,
        size: size,
        position: position,
        price: price,
        quantity: 1
    };
    
    cartItems.push(cartItem);
    updateCartCount();
    saveCartToLocalStorage();
}

function updateCartCount() {
    if (cartCount) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function updateFavoriteCount() {
    const favorites = getFavorites();
    if (favoriteCount) {
        favoriteCount.textContent = favorites.length;
        favoriteCount.style.display = favorites.length > 0 ? 'flex' : 'none';
    }
}

function renderCart() {
    if (!cartItemsContainer) return;
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione alguns produtos incríveis!</p>
                <button class="btn btn-primary-premium" onclick="showHome()">Continuar Comprando</button>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.product.variants[item.color].image}" alt="${item.product.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.product.name}</h4>
                <div class="cart-item-options">
                    <span>Cor: ${item.color}</span>
                    <span>Tamanho: ${item.size}</span>
                    ${item.position ? `<span>Posição: ${item.position}</span>` : ''}
                </div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    updateCartSummary();
}

function updateQuantity(index, change) {
    const newQuantity = cartItems[index].quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(index);
        return;
    }
    
    cartItems[index].quantity = newQuantity;
    saveCartToLocalStorage();
    renderCart();
    updateCartCount();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCartToLocalStorage();
    renderCart();
    updateCartCount();
}

function updateCartSummary() {
    if (!cartSummary) return;
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 15.00; // Valor fixo por enquanto
    const total = subtotal + shipping;
    
    cartSummary.innerHTML = `
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>R$ ${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Frete:</span>
            <span>R$ ${shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total:</span>
            <span>R$ ${total.toFixed(2)}</span>
        </div>
    `;
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
        cartItems = JSON.parse(saved);
    }
}

function getFavorites() {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    if (!favoritesContainer) return;
    
    const favorites = getFavorites();
    
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-favorites">
                <i class="fas fa-heart"></i>
                <h3>Seus favoritos estão vazios</h3>
                <p>Adicione produtos aos favoritos para vê-los aqui!</p>
                <button class="btn btn-primary-premium" onclick="showHome()">Explorar Produtos</button>
            </div>
        `;
        return;
    }
    
    favoritesContainer.innerHTML = '';
    
    favorites.forEach(product => {
        const firstColor = Object.keys(product.variants)[0];
        const firstVariant = product.variants[firstColor];
        
        const card = document.createElement('div');
        card.className = 'favorite-card';
        card.innerHTML = `
            <div class="favorite-card-image">
                <img src="${firstVariant.image}" alt="${product.name}">
                <button class="remove-favorite-btn" onclick="removeFromFavorites('${product.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="favorite-card-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="favorite-card-price">R$ ${firstVariant.price.toFixed(2)}</div>
                <button class="btn btn-primary-premium btn-block" onclick="showProductDetail('${product.id}')">
                    Ver Detalhes
                </button>
            </div>
        `;
        favoritesContainer.appendChild(card);
    });
}

function removeFromFavorites(productId) {
    let favorites = getFavorites();
    favorites = favorites.filter(product => product.id !== productId);
    saveFavorites(favorites);
    renderFavorites();
    updateFavoriteCount();
}

// ===== FUNÇÕES DE PRODUTOS (EXISTENTES) =====

function findProductById(productId) {
    for (const category in products) {
        const product = products[category].find(p => p.id === productId);
        if (product) return product;
    }
    return null;
}

function populateAllGrades() {
    for (const category in products) {
        populateGrade(category);
    }
}

function populateGrade(category) {
    const container = document.getElementById(`grade-produtos-${category}`);
    if (!container) return;
    
    container.innerHTML = '';
    
    products[category].forEach(product => {
        const firstColor = Object.keys(product.variants)[0];
        const firstVariant = product.variants[firstColor];
        
        const card = document.createElement('div');
        card.className = 'grade-card';
        card.setAttribute('data-product-id', product.id);
        
        card.innerHTML = `
            <div class="grade-card-image-container">
                <img src="${firstVariant.image}" alt="${product.name}" class="grade-card-image" loading="lazy">
                ${product.discount ? `<div class="discount-badge">-${product.discount}%</div>` : ''}
                <button class="favorite-btn" onclick="event.stopPropagation(); toggleFavorite('${product.id}')">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="grade-card-info">
                <h3 class="grade-card-title">${product.name}</h3>
                <p class="grade-card-description">${product.description}</p>
                <div class="grade-card-price">
                    R$ ${firstVariant.price.toFixed(2)}
                    ${product.discount ? `<span class="original-price">R$ ${(firstVariant.price * (1 + product.discount/100)).toFixed(2)}</span>` : ''}
                </div>
                <button class="btn btn-outline-premium btn-block">Ver Detalhes</button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function toggleFavorite(productId) {
    const product = findProductById(productId);
    if (!product) return;
    
    let favorites = getFavorites();
    const existingIndex = favorites.findIndex(p => p.id === productId);
    
    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
    } else {
        favorites.push(product);
    }
    
    saveFavorites(favorites);
    updateFavoriteCount();
    
    // Feedback visual
    const favoriteBtns = document.querySelectorAll(`[onclick*="${productId}"]`);
    favoriteBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = existingIndex > -1 ? 'far fa-heart' : 'fas fa-heart';
            icon.style.color = existingIndex > -1 ? '' : 'var(--accent-color)';
        }
    });
}

// ===== FUNÇÕES DE FRETE E PEDIDO (EXISTENTES) =====

function calculateShipping() {
    // Simulação de cálculo de frete
    const cityInput = document.getElementById('city');
    const selectedMethod = document.querySelector('input[name="delivery-method"]:checked');
    
    if (cityInput && cityInput.value.length > 2 && selectedMethod) {
        const shippingPrice = selectedMethod.value === 'express' ? 25.00 : 15.00;
        
        if (shippingPriceContainer) {
            shippingPriceContainer.innerHTML = `
                <div class="shipping-price-display">
                    <span>Frete: R$ ${shippingPrice.toFixed(2)}</span>
                    <small>${selectedMethod.value === 'express' ? 'Entrega Expressa (2-3 dias)' : 'Entrega Padrão (5-7 dias)'}</small>
                </div>
            `;
        }
    }
}

function finalizeOrder() {
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const formData = new FormData(locationForm);
    const address = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        city: formData.get('city'),
        neighborhood: formData.get('neighborhood'),
        street: formData.get('street'),
        number: formData.get('number'),
        complement: formData.get('complement')
    };
    
    // Validar endereço
    if (!address.name || !address.phone || !address.city) {
        alert('Por favor, preencha pelo menos nome, telefone e cidade.');
        return;
    }
    
    // Construir mensagem do WhatsApp
    let message = `*NOVO PEDIDO - ${new Date().toLocaleDateString()}*\n\n`;
    message += `*Dados do Cliente:*\n`;
    message += `Nome: ${address.name}\n`;
    message += `Telefone: ${address.phone}\n`;
    message += `Cidade: ${address.city}\n`;
    message += `Bairro: ${address.neighborhood || 'Não informado'}\n`;
    message += `Endereço: ${address.street || 'Não informado'}, ${address.number || 'S/N'}\n`;
    message += `Complemento: ${address.complement || 'Não informado'}\n\n`;
    
    message += `*Itens do Pedido:*\n`;
    let total = 0;
    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${index + 1}. ${item.product.name} (${item.color}, ${item.size}`;
        if (item.position) message += `, ${item.position}`;
        message += `) - ${item.quantity} x R$ ${item.price.toFixed(2)} = R$ ${itemTotal.toFixed(2)}\n`;
    });
    
    message += `\n*Total: R$ ${total.toFixed(2)}*\n\n`;
    message += `Método de Entrega: ${formData.get('delivery-method') === 'express' ? 'Expressa' : 'Padrão'}\n`;
    message += `Observações: ${formData.get('observations') || 'Nenhuma'}`;
    
    // Abrir WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // Limpar carrinho
    cartItems = [];
    saveCartToLocalStorage();
    updateCartCount();
    
    // Mostrar confirmação
    if (confirmationModal) {
        confirmationModal.style.display = 'flex';
    }
}

function calculateAutomaticDiscounts(items) {
    const discountMessages = [];
    
    // Contar itens por categoria
    const shirtCount = items.filter(item => 
        item.product.category === 'masculino' || 
        item.product.category === 'feminino' || 
        item.product.category === 'unissexo'
    ).reduce((sum, item) => sum + item.quantity, 0);
    
    const mugCount = items.filter(item => 
        item.product.category === 'canecas'
    ).reduce((sum, item) => sum + item.quantity, 0);
    
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Aplicar regras de desconto
    if (shirtCount >= 3) {
        discountMessages.push({ message: '🎉 10% OFF em camisetas (3+ unidades)' });
    } else if (shirtCount >= 2) {
        discountMessages.push({ message: '🎉 5% OFF em camisetas (2 unidades)' });
    }
    
    if (mugCount >= 3) {
        discountMessages.push({ message: '🎉 5% OFF em canecas (3+ unidades)' });
    }
    
    if (totalValue >= 100) {
        discountMessages.push({ message: '🚚 FRETE GRÁTIS para compras acima de R$ 100' });
    }
    
    return { discountMessages };
}

// Carregar carrinho ao inicializar
loadCartFromLocalStorage();