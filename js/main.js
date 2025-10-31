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
    console.log('Inicializando aplicação...');
    initializeDOMElements();
    setupEventListeners();
    initBannerCarousel();
    updateCartCount();
    updateFavoriteCount();
    
    // Aplicar categoria padrão "masculino"
    filterProductsByCategory('masculino');
    
    // Popular grades com timeout otimizado
    setTimeout(() => {
        console.log('Inicializando grades...');
        if (window.populateAllGrades) {
            window.populateAllGrades();
        } else {
            setTimeout(() => {
                if (window.populateAllGrades) {
                    window.populateAllGrades();
                }
            }, 500);
        }
    }, 100);
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
    
    // Página do produto (APENAS ADICIONAR AO CARRINHO - REMOVIDO BOTÃO FINALIZAR)
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
    
    document.querySelectorAll('.nav-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
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

// Mostrar carrinho - AGORA COM RENDERIZAÇÃO IMEDIATA
function showCart() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (cartPage) cartPage.classList.add('active');
    
    // Renderizar carrinho IMEDIATAMENTE
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
        
        setTimeout(() => {
            targetGrade.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Mostrar detalhes do produto
function showProductDetail(productId) {
    const product = window.findProductById ? window.findProductById(productId) : null;
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
    
    const basePrice = currentProduct.discount ? 
        variant.price * (1 - currentProduct.discount / 100) : 
        variant.price;
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

// Adicionar ao carrinho da página de detalhes - AGORA COM ATUALIZAÇÃO IMEDIATA
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

// Adicionar produto ao carrinho - AGORA COM ATUALIZAÇÃO IMEDIATA
function addToCart(product, color, size, position, price) {
    const cartItem = {
        id: Date.now(),
        product: product,
        color: color,
        size: size,
        position: position,
        price: price
    };
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    updateCartCount();
    showCartNotification(product.name);
    
    // Se o carrinho estiver aberto, atualizar IMEDIATAMENTE
    if (cartPage && cartPage.classList.contains('active')) {
        renderCart();
    }
}

// Atualizar contador do carrinho
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

// Mostrar notificação de produto adicionado
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${productName} adicionado ao carrinho!</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
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
            <div class="empty-favorites">
                <i class="far fa-heart"></i>
                <h3>Nenhum produto favoritado</h3>
                <p>Adicione produtos aos favoritos clicando no coração</p>
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
            favoriteItem.innerHTML = `
                <img src="${firstVariant.image}" alt="${product.name}">
                <div class="favorite-item-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="favorite-item-price">R$ ${firstVariant.price.toFixed(2)}</div>
                </div>
                <div class="favorite-item-actions">
                    <button class="btn btn-primary-premium" onclick="showProductDetail(${product.id})">Ver Detalhes</button>
                    <button class="btn btn-outline-premium remove-favorite" data-product-id="${product.id}">
                        <i class="fas fa-trash"></i> Remover
                    </button>
                </div>
            `;
            
            favoritesItems.appendChild(favoriteItem);
        }
    });
    
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

// Calcular frete
function calculateShipping() {
    const city = document.getElementById('city');
    if (!city) return;
    
    const cityValue = city.value.toLowerCase();
    let shippingCost = 9.99;
    
    if (cityValue.includes('são bento') || cityValue.includes('sao bento')) {
        shippingCost = 4.00;
        const deliveryOptions = document.getElementById('delivery-options');
        if (deliveryOptions) deliveryOptions.style.display = 'block';
        
        const pickupOption = document.getElementById('pickup');
        if (pickupOption && pickupOption.checked) {
            shippingCost = 0;
        }
    } else {
        const deliveryOptions = document.getElementById('delivery-options');
        if (deliveryOptions) deliveryOptions.style.display = 'none';
    }
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    if (subtotal >= 100) {
        shippingCost = 0;
    }
    
    const shippingPrice = document.getElementById('shipping-price');
    const shippingPriceContainer = document.querySelector('.shipping-price-premium');
    
    if (shippingPrice) shippingPrice.textContent = shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`;
    if (shippingPriceContainer) shippingPriceContainer.style.display = 'block';
}

// Finalizar pedido
function finalizeOrder() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) return;
    
    const city = document.getElementById('city').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const street = document.getElementById('street').value;
    const address = document.getElementById('address').value;
    
    if (!city || !neighborhood || !street || !address) {
        alert('Por favor, preencha todos os campos do endereço.');
        return;
    }
    
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked');
    const deliveryType = deliveryMethod ? deliveryMethod.value : 'delivery';
    
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    
    const tShirtCount = cartItems.filter(item => 
        item.product.category === 'masculino' || item.product.category === 'unissexo'
    ).length;

    let quantityDiscount = 0;
    if (tShirtCount >= 3) {
        quantityDiscount = subtotal * 0.10;
    } else if (tShirtCount >= 2) {
        quantityDiscount = subtotal * 0.05;
    }

    let shippingCost = 9.99;
    if (city.toLowerCase().includes('são bento') || city.toLowerCase().includes('sao bento')) {
        shippingCost = deliveryType === 'pickup' ? 0 : 4.00;
    }
    
    if (subtotal >= 100) {
        shippingCost = 0;
    }
    
    const totalPrice = subtotal - quantityDiscount + shippingCost;
    
    let message = `*🛒 NOVO PEDIDO - WFCUSTOM*%0A%0A`;
    message += `*Itens do Pedido:*%0A%0A`;
    
    cartItems.forEach((item, index) => {
        message += `*${index + 1}. ${item.product.name}*%0A`;
        message += `   • Cor: ${item.color}%0A`;
        message += `   • Tamanho: ${item.size}%0A`;
        if (item.position && item.product.category !== 'canecas') {
            let positionText = '';
            switch(item.position) {
                case 'frente': positionText = 'Frente'; break;
                case 'atras': positionText = 'Atrás'; break;
                case 'ambos': positionText = 'Ambos'; break;
                default: positionText = item.position;
            }
            message += `   • Estampa: ${positionText}%0A`;
        }
        message += `   • Preço: R$ ${item.price.toFixed(2)}%0A%0A`;
    });
    
    message += `*Resumo do Pedido:*%0A`;
    message += `Subtotal: R$ ${subtotal.toFixed(2)}%0A`;
    if (quantityDiscount > 0) {
        message += `Desconto Progressivo: -R$ ${quantityDiscount.toFixed(2)}%0A`;
    }
    message += `Frete: ${shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}%0A`;
    message += `*Total: R$ ${totalPrice.toFixed(2)}*%0A%0A`;
    
    message += `*Dados de Entrega:*%0A`;
    message += `Cidade: ${city}%0A`;
    message += `Bairro: ${neighborhood}%0A`;
    message += `Rua: ${street}%0A`;
    message += `Número/Complemento: ${address}%0A`;
    message += `Entrega: ${deliveryType === 'delivery' ? 'Entregar no endereço' : 'Retirar no local'}%0A%0A`;
    
    message += `_Pedido gerado automaticamente pelo site_`;
    
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
    
    localStorage.removeItem('cartItems');
    updateCartCount();
    
    const confirmationModal = document.getElementById('confirmation-modal');
    if (confirmationModal) {
        confirmationModal.style.display = 'flex';
    }
    
    setTimeout(() => {
        showHome();
        if (confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    }, 3000);
}

// Inicializar o site quando carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente carregado e analisado');
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalImages);
} else {
    preloadCriticalImages();
}