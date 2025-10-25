// Variáveis globais
const phoneNumber = '5583999667578';
let currentProduct = null;
let currentColor = 'branco';
let currentSize = 'P';
let currentPosition = 'frente';
let currentCategory = 'masculino';
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Configurações do carrossel de banners
let currentBannerIndex = 0;
const bannerInterval = 5000; // 5 segundos
let bannerTimer = null;

// Sistema de anúncios
let adInterval;
let isShowingAd = false;
const adMessages = [
    "🎉 Frete Grátis acima de R$ 100!",
    "🔥 Até 50% OFF em Camisetas!",
    "🚚 Entrega Rápida para São Bento!",
    "⭐ Ofertas Exclusivas no WhatsApp!"
];

// Elementos DOM
let homePage, productPage, cartPage, favoritesPage, locationPage, detailImage, detailTitle, detailDescription;
let detailPrice, modalColorOptions, detailSizeOptions, stampPositionGroup, addToCartDetailButton;
let buyNowDetailButton, locationForm, shippingPrice, shippingInfo;
let shippingPriceContainer, finalizeOrderButton, confirmationModal, closeModal, closeConfirmation;
let cartItemsContainer, cartSummary, continueShoppingBtn, checkoutBtn, cartCount, favoriteCount;
let categoryFilters, deliveryOptions;

// ===== CORREÇÃO DOS CLIQUES - Event Delegation Global =====
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Clique em cards de produto
    const productCard = target.closest('.grade-card');
    if (productCard) {
        e.preventDefault();
        const productId = productCard.getAttribute('data-product-id');
        if (productId) {
            showProductDetail(productId);
            return;
        }
    }
    
    // Clique em botões de favorito
    const favoriteBtn = target.closest('.favorite-btn');
    if (favoriteBtn) {
        e.preventDefault();
        e.stopPropagation();
        const productId = favoriteBtn.getAttribute('data-product-id') || 
                         favoriteBtn.closest('.grade-card')?.getAttribute('data-product-id');
        if (productId) {
            toggleFavorite(productId);
            return;
        }
    }
    
    // Clique em botões "Ver Detalhes"
    const detailsBtn = target.closest('.btn-outline-premium');
    if (detailsBtn && detailsBtn.textContent.includes('Ver Detalhes')) {
        e.preventDefault();
        const productCard = detailsBtn.closest('.grade-card');
        if (productCard) {
            const productId = productCard.getAttribute('data-product-id');
            if (productId) {
                showProductDetail(productId);
                return;
            }
        }
    }
    
    // Clique no ícone do carrinho
    if (target.closest('#cart-icon')) {
        e.preventDefault();
        showCart();
        return;
    }
    
    // Clique no ícone de favoritos
    if (target.closest('#favorite-icon')) {
        e.preventDefault();
        showFavorites();
        return;
    }
    
    // Clique em filtros de categoria
    const categoryFilter = target.closest('.category-filter-premium');
    if (categoryFilter) {
        e.preventDefault();
        const category = categoryFilter.getAttribute('data-category');
        filterProductsByCategory(category);
        return;
    }
    
    // Clique em botões de adicionar ao carrinho (detalhes do produto)
    if (target.closest('#add-to-cart-detail')) {
        e.preventDefault();
        addToCartFromDetail();
        return;
    }
    
    // Clique em botões de comprar agora (detalhes do produto)
    if (target.closest('#buy-now-detail')) {
        e.preventDefault();
        buyNowFromDetail();
        return;
    }
    
    // Clique em botões de remover do carrinho
    const removeBtn = target.closest('.remove-item-premium');
    if (removeBtn) {
        e.preventDefault();
        const index = removeBtn.getAttribute('data-index');
        if (index) {
            removeFromCart(parseInt(index));
            return;
        }
    }
    
    // Clique em botões de voltar
    if (target.closest('.back-button')) {
        e.preventDefault();
        showHome();
        return;
    }
    
    // Clique em continuar comprando
    if (target.closest('#continue-shopping')) {
        e.preventDefault();
        showHome();
        return;
    }
    
    // Clique em finalizar compra
    if (target.closest('#checkout-btn')) {
        e.preventDefault();
        showLocation();
        return;
    }
    
    // Clique em finalizar pedido
    if (target.closest('#finalize-order')) {
        e.preventDefault();
        finalizeOrder();
        return;
    }
    
    // Clique em opções de cor
    const colorOption = target.closest('.color-option-premium');
    if (colorOption) {
        e.preventDefault();
        const color = colorOption.getAttribute('data-color');
        if (color) {
            currentColor = color;
            updateProductDetailView();
            return;
        }
    }
    
    // Clique em opções de tamanho
    const sizeOption = target.closest('.size-option-premium');
    if (sizeOption) {
        e.preventDefault();
        const size = sizeOption.getAttribute('data-size');
        if (size) {
            currentSize = size;
            document.querySelectorAll('.size-option-premium').forEach(option => {
                option.classList.remove('active');
            });
            sizeOption.classList.add('active');
            return;
        }
    }
    
    // Clique em opções de posição
    const positionOption = target.closest('.position-option-premium');
    if (positionOption) {
        e.preventDefault();
        const position = positionOption.getAttribute('data-position');
        if (position) {
            currentPosition = position;
            document.querySelectorAll('.position-option-premium').forEach(option => {
                option.classList.remove('active');
            });
            positionOption.classList.add('active');
            updateProductDetailView();
            return;
        }
    }
});

// ===== SISTEMA DE ANÚNCIOS =====
function initAdSystem() {
    const logo = document.getElementById('main-logo');
    const adSpace = document.getElementById('ad-space');
    
    if (!logo || !adSpace) return;
    
    // Alternar entre logo e anúncio a cada 4 segundos
    adInterval = setInterval(() => {
        if (isShowingAd) {
            // Mostrar logo
            logo.style.display = 'block';
            adSpace.style.display = 'none';
        } else {
            // Mostrar anúncio
            logo.style.display = 'none';
            adSpace.style.display = 'block';
            
            // Atualizar texto do anúncio aleatoriamente
            const adText = adSpace.querySelector('.ad-text');
            if (adText) {
                const randomAd = adMessages[Math.floor(Math.random() * adMessages.length)];
                adText.textContent = randomAd;
            }
        }
        isShowingAd = !isShowingAd;
    }, 4000);
}

// ===== SISTEMA DE OFERTAS PREMIUM =====
function initOffersTimer() {
    const offerEndDate = new Date();
    offerEndDate.setDate(offerEndDate.getDate() + 3);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = offerEndDate - now;
        
        if (distance < 0) {
            offerEndDate.setDate(offerEndDate.getDate() + 3);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateTimer, 1000);
    updateTimer();
}

function populateOffersProducts() {
    const container = document.getElementById('offers-products-container');
    if (!container) return;
    
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
        
        const detailsBtn = card.querySelector('.offer-details-btn');
        detailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showOfferDetails(product, discount, discountedPrice);
        });
        
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.offer-details-btn')) {
                showProductDetail(product.id);
            }
        });
    });
}

function showOfferDetails(product, discount, discountedPrice) {
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
        const variant = product.variants[Object.keys(product.variants)[0]];
        addToCart(product, Object.keys(product.variants)[0], variant.sizes[0], 
                 product.positions.length > 0 ? product.positions[0] : '', discountedPrice);
        
        modal.style.display = 'none';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
        
        showOfferNotification(product, { discountMessages: [
            { message: `🎉 ${discount}% OFF aplicado no ${product.name}!` }
        ] });
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

function initOffersSystem() {
    initOffersTimer();
    populateOffersProducts();
    setupFlashSalesButton();
    
    document.querySelectorAll('.offer-card-premium').forEach(card => {
        card.addEventListener('click', function() {
            const offerType = this.getAttribute('data-offer');
            showOfferTypeDetails(offerType);
        });
    });
}

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

function showProductsSection() {
    showHome();
    setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

function showOfferNotification(product, offers) {
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function showHome() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('home-page').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCart() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('cart-page').classList.add('active');
    renderCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showFavorites() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('favorites-page').classList.add('active');
    renderFavorites();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLocation() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('location-page').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showProductDetail(productId) {
    const product = findProductById(productId);
    if (!product) return;
    
    currentProduct = product;
    currentColor = Object.keys(product.variants)[0];
    currentSize = product.variants[currentColor].sizes[0];
    currentPosition = product.positions.length > 0 ? product.positions[0] : '';
    
    document.getElementById('detail-title').textContent = product.name;
    document.getElementById('detail-description').textContent = product.description;
    
    updateProductDetailView();
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('product-page').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== FUNÇÕES DE PRODUTO =====
function updateProductDetailView() {
    if (!currentProduct) return;
    
    const variant = currentProduct.variants[currentColor];
    const basePrice = currentProduct.discount ? 
        variant.price * (1 - currentProduct.discount / 100) : 
        variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    document.getElementById('detail-image').src = variant.image;
    document.getElementById('detail-price').textContent = finalPrice.toFixed(2);
    
    updateColorOptions();
    updateSizeOptions();
    updatePositionOptions();
}

function calculateFinalPrice(basePrice, position) {
    let finalPrice = basePrice;
    if (position === 'ambos') {
        finalPrice += 2.00;
    }
    return finalPrice;
}

function updateColorOptions() {
    const modalColorOptions = document.getElementById('modal-color-options');
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
        modalColorOptions.appendChild(colorOption);
    });
}

function updateSizeOptions() {
    const detailSizeOptions = document.getElementById('detail-size-options');
    if (!detailSizeOptions || !currentProduct) return;
    
    detailSizeOptions.innerHTML = '';
    
    const variant = currentProduct.variants[currentColor];
    variant.sizes.forEach(size => {
        const sizeOption = document.createElement('div');
        sizeOption.className = `size-option-premium ${size === currentSize ? 'active' : ''}`;
        sizeOption.setAttribute('data-size', size);
        sizeOption.textContent = size;
        detailSizeOptions.appendChild(sizeOption);
    });
}

function updatePositionOptions() {
    const stampPositionGroup = document.getElementById('stamp-position-group');
    if (!stampPositionGroup || !currentProduct) return;
    
    if (currentProduct.category === 'canecas') {
        stampPositionGroup.style.display = 'none';
        return;
    }
    
    stampPositionGroup.style.display = 'block';
}

function addToCartFromDetail() {
    if (!currentProduct) return;
    
    const variant = currentProduct.variants[currentColor];
    const basePrice = currentProduct.discount ? 
        variant.price * (1 - currentProduct.discount / 100) : 
        variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    
    const addToCartBtn = document.getElementById('add-to-cart-detail');
    if (addToCartBtn) {
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = '✓ Adicionado!';
        addToCartBtn.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.style.background = '';
        }, 2000);
    }
}

function buyNowFromDetail() {
    if (!currentProduct) return;
    
    const variant = currentProduct.variants[currentColor];
    const basePrice = currentProduct.discount ? 
        variant.price * (1 - currentProduct.discount / 100) : 
        variant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    showCart();
}

// ===== FUNÇÕES DE CARRINHO =====
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

function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCartToLocalStorage();
    renderCart();
    updateCartCount();
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

function updateCartCount() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
        if (cartSummary) cartSummary.innerHTML = '';
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
                <button class="remove-btn remove-item-premium" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    updateCartSummary();
}

function updateCartSummary() {
    if (!cartSummary) return;
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 15.00;
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

// ===== FUNÇÕES DE FAVORITOS =====
function getFavorites() {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateFavoriteCount() {
    const favorites = getFavorites();
    if (favoriteCount) {
        favoriteCount.textContent = favorites.length;
        favoriteCount.style.display = favorites.length > 0 ? 'flex' : 'none';
    }
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
    
    const favoriteBtns = document.querySelectorAll(`[data-product-id="${productId}"]`);
    favoriteBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = existingIndex > -1 ? 'far fa-heart' : 'fas fa-heart';
            icon.style.color = existingIndex > -1 ? '' : '#ff4757';
        }
    });
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

// ===== FUNÇÕES DE PRODUTOS =====
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
                <button class="favorite-btn" data-product-id="${product.id}">
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

function filterProductsByCategory(category) {
    currentCategory = category;
    
    document.querySelectorAll('.category-filter-premium').forEach(filter => {
        filter.classList.remove('active');
    });
    
    const activeFilter = document.querySelector(`[data-category="${category}"]`);
    if (activeFilter) activeFilter.classList.add('active');
    
    document.querySelectorAll('.grade-produtos').forEach(grade => {
        grade.style.display = 'none';
    });
    
    const targetGrade = document.getElementById(`grade-produtos-${category}`);
    if (targetGrade) {
        targetGrade.style.display = 'block';
    }
}

// ===== FUNÇÕES DE PEDIDO E FRETE =====
function calculateShipping() {
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
    
    if (!address.name || !address.phone || !address.city) {
        alert('Por favor, preencha pelo menos nome, telefone e cidade.');
        return;
    }
    
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
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    cartItems = [];
    saveCartToLocalStorage();
    updateCartCount();
    
    if (confirmationModal) {
        confirmationModal.style.display = 'flex';
    }
}

function calculateAutomaticDiscounts(items) {
    const discountMessages = [];
    
    const shirtCount = items.filter(item => 
        item.product.category === 'masculino' || 
        item.product.category === 'feminino' || 
        item.product.category === 'unissexo'
    ).reduce((sum, item) => sum + item.quantity, 0);
    
    const mugCount = items.filter(item => 
        item.product.category === 'canecas'
    ).reduce((sum, item) => sum + item.quantity, 0);
    
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
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

// ===== INICIALIZAÇÃO =====
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
    cartItemsContainer = document.getElementById('cart-items');
    cartSummary = document.getElementById('cart-summary');
    continueShoppingBtn = document.getElementById('continue-shopping');
    checkoutBtn = document.getElementById('checkout-btn');
    cartCount = document.querySelector('.cart-count');
    favoriteCount = document.querySelector('.favorite-count');
    categoryFilters = document.querySelectorAll('.category-filter-premium');
    deliveryOptions = document.getElementById('delivery-options');
}

function initBannerCarousel() {
    const bannerTrack = document.querySelector('.banner-track');
    const bannerSlides = document.querySelectorAll('.banner-slide');
    
    if (!bannerTrack || bannerSlides.length === 0) return;
    
    function showBanner(index) {
        if (index < 0) index = bannerSlides.length - 1;
        if (index >= bannerSlides.length) index = 0;
        
        currentBannerIndex = index;
        
        bannerSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        bannerSlides[currentBannerIndex].classList.add('active');
    }
    
    function nextBanner() {
        showBanner(currentBannerIndex + 1);
    }
    
    function startBannerAutoplay() {
        if (bannerTimer) clearInterval(bannerTimer);
        bannerTimer = setInterval(nextBanner, bannerInterval);
    }
    
    showBanner(0);
    startBannerAutoplay();
    
    bannerTrack.addEventListener('mouseenter', () => {
        if (bannerTimer) clearInterval(bannerTimer);
    });
    
    bannerTrack.addEventListener('mouseleave', startBannerAutoplay);
}

function init() {
    initializeDOMElements();
    updateCartCount();
    updateFavoriteCount();
    initAdSystem();
    initBannerCarousel();
    initOffersSystem();
    
    filterProductsByCategory('masculino');
    
    setTimeout(() => {
        populateAllGrades();
    }, 100);
}

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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalImages);
} else {
    preloadCriticalImages();
}