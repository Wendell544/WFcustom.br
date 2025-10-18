// Variáveis globais
const phoneNumber = '5583999667578';
let currentProduct = null;
let currentColor = 'branco';
let currentSize = 'P';
let currentPosition = 'frente';
let currentSection = 'home';
let currentCategory = 'todos';

// Configurações do carrossel de banners
let currentBannerIndex = 0;
const bannerInterval = 5000; // 5 segundos
let bannerTimer = null;

// Elementos DOM
let homePage, productPage, cartPage, favoritesPage, locationPage;
let detailImage, detailTitle, detailDescription, detailPrice;
let modalColorOptions, detailSizeOptions, stampPositionGroup, addToCartDetailButton;
let buyNowDetailButton, locationForm, shippingPrice, shippingInfo;
let shippingPriceContainer, finalizeOrderButton, confirmationModal, closeModal, closeConfirmation;
let mobileMenuBtn, navLinks, navLinksItems, footerNavLinks, cartIcon, favoritesIcon;
let cartItemsContainer, cartSummary, continueShoppingBtn, checkoutBtn, cartCount, favoritesCount;
let backFromProduct, backFromCart, backFromFavorites, backFromLocation, categoryFilters;
let backToHomeFromProduct, deliveryOptions, continueFromFavorites, favoritesItemsContainer;

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
    initSpecialOffers();
    updateCartCount();
    updateFavoritesCount();
    
    // Aplicar classe para categoria "todos"
    updateGridForCategory();
    
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
    mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    navLinks = document.querySelector('.nav-links');
    navLinksItems = document.querySelectorAll('.nav-link');
    footerNavLinks = document.querySelectorAll('.footer-nav-link');
    cartIcon = document.getElementById('cart-icon');
    favoritesIcon = document.getElementById('favorites-icon');
    cartItemsContainer = document.getElementById('cart-items');
    cartSummary = document.getElementById('cart-summary');
    continueShoppingBtn = document.getElementById('continue-shopping');
    checkoutBtn = document.getElementById('checkout-btn');
    cartCount = document.querySelector('.cart-count');
    favoritesCount = document.querySelector('.favorites-count');
    backFromProduct = document.getElementById('back-from-product');
    backFromCart = document.getElementById('back-from-cart');
    backFromFavorites = document.getElementById('back-from-favorites');
    backFromLocation = document.getElementById('back-from-location');
    categoryFilters = document.querySelectorAll('.category-filter-premium');
    backToHomeFromProduct = document.getElementById('back-to-home-from-product');
    continueFromFavorites = document.getElementById('continue-from-favorites');
    favoritesItemsContainer = document.getElementById('favorites-items');
    deliveryOptions = document.getElementById('delivery-options');
    
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
    if (bannerTimer) {
        clearInterval(bannerTimer);
        bannerTimer = null;
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros de categoria
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            categoryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            currentCategory = filter.getAttribute('data-category');
            filterGradesByCategory(currentCategory);
            updateGridForCategory();
            
            // Atualizar cores dos botões baseado na categoria
            updateCategoryButtonColors();
        });
    });

    // Botão de adicionar ao carrinho na página de produto
    if (addToCartDetailButton) {
        addToCartDetailButton.addEventListener('click', addToCartFromDetail);
    }

    // Botão de comprar agora na página de produto
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

    // Modal
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

    if (confirmationModal) {
        window.addEventListener('click', (e) => {
            if (e.target === confirmationModal) {
                confirmationModal.style.display = 'none';
            }
        });
    }

    // Menu mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Event listener do ícone do carrinho
    if (cartIcon) {
        cartIcon.addEventListener('click', showCart);
    }

    // Event listener do ícone de favoritos
    if (favoritesIcon) {
        favoritesIcon.addEventListener('click', showFavorites);
    }

    // Botão continuar comprando
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            showHome();
        });
    }

    // Botão continuar comprando dos favoritos
    if (continueFromFavorites) {
        continueFromFavorites.addEventListener('click', () => {
            showHome();
        });
    }

    // Botão finalizar compra no carrinho
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartItems.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }
            showLocation();
        });
    }

    // Campo de cidade para calcular frete
    const cityInput = document.getElementById('city');
    if (cityInput) {
        cityInput.addEventListener('input', calculateShipping);
    }

    // Clique em produtos para abrir página de produto
    document.addEventListener('click', (e) => {
        const productElement = e.target.closest('[data-product-id]');
        if (productElement) {
            const productId = productElement.getAttribute('data-product-id');
            const product = findProductById(productId);
            if (product) {
                showProductPage(product);
            }
        }
    });

    // Botões de voltar
    if (backFromProduct) {
        backFromProduct.addEventListener('click', () => {
            showHome();
        });
    }

    if (backFromCart) {
        backFromCart.addEventListener('click', () => {
            showHome();
        });
    }

    if (backFromFavorites) {
        backFromFavorites.addEventListener('click', () => {
            showHome();
        });
    }

    if (backFromLocation) {
        backFromLocation.addEventListener('click', () => {
            showCart();
        });
    }

    // Botão Voltar ao Início na página de produto
    if (backToHomeFromProduct) {
        backToHomeFromProduct.addEventListener('click', (e) => {
            e.preventDefault();
            showHome();
        });
    }

    // Event listener para opções de entrega
    const deliveryMethodInputs = document.querySelectorAll('input[name="delivery-method"]');
    deliveryMethodInputs.forEach(input => {
        input.addEventListener('change', calculateShipping);
    });
}

// Atualizar cores dos botões baseado na categoria ativa
function updateCategoryButtonColors() {
    const activeFilter = document.querySelector('.category-filter-premium.active');
    if (!activeFilter) return;
    
    const category = activeFilter.getAttribute('data-category');
    
    // Remover todas as classes de cor
    categoryFilters.forEach(filter => {
        filter.classList.remove('masculino-color', 'unissexo-color', 'canecas-color');
    });
    
    // Adicionar classe de cor baseado na categoria
    switch(category) {
        case 'masculino':
            activeFilter.classList.add('masculino-color');
            break;
        case 'unissexo':
            activeFilter.classList.add('unissexo-color');
            break;
        case 'canecas':
            activeFilter.classList.add('canecas-color');
            break;
    }
}

// Atualizar layout da grade baseado na categoria
function updateGridForCategory() {
    const gradeContainers = document.querySelectorAll('.grade-container');
    
    gradeContainers.forEach(container => {
        if (currentCategory === 'todos') {
            container.classList.add('todos');
        } else {
            container.classList.remove('todos');
        }
    });
}

// Filtrar grades por categoria
function filterGradesByCategory(category) {
    const grades = document.querySelectorAll('.grade-produtos');
    
    grades.forEach(grade => {
        const gradeCategory = grade.getAttribute('data-category');
        
        if (category === 'todos' || gradeCategory === category) {
            grade.style.display = 'block';
        } else {
            grade.style.display = 'none';
        }
    });
}

// Mostrar home
function showHome() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (homePage) homePage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar categoria
function showCategory(category) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (homePage) homePage.classList.add('active');
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mostrar página do produto
function showProductPage(product) {
    currentProduct = product;
    const firstColor = Object.keys(product.variants)[0];
    const firstVariant = product.variants[firstColor];
    
    if (detailImage) detailImage.src = firstVariant.image;
    if (detailImage) detailImage.alt = product.name;
    if (detailTitle) detailTitle.textContent = product.name;
    if (detailDescription) detailDescription.textContent = product.description;
    
    // Atualizar meta tags dinamicamente
    updateProductMetaTags(product);
    
    // Resetar seleções
    currentColor = firstColor;
    currentSize = firstVariant.sizes[0];
    currentPosition = product.positions.length > 0 ? product.positions[0] : '';
    
    // Configurar opções de cor
    if (modalColorOptions) {
        modalColorOptions.innerHTML = '';
        
        Object.keys(product.variants).forEach(color => {
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
                document.querySelectorAll('.color-option-premium').forEach(opt => opt.classList.remove('active'));
                colorOption.classList.add('active');
                currentColor = color;
                const selectedVariant = product.variants[color];
                
                // Adicionar estado de loading
                if (detailImage) detailImage.classList.add('loading');
                
                const newImage = new Image();
                newImage.src = selectedVariant.image;
                newImage.onload = () => {
                    if (detailImage) {
                        detailImage.src = selectedVariant.image;
                        detailImage.classList.remove('loading');
                        detailImage.alt = `${product.name} - Cor ${color}`;
                    }
                    
                    // Atualizar tamanhos disponíveis
                    updateDetailSizes(selectedVariant.sizes);
                    
                    // Atualizar preço IMEDIATAMENTE - CORREÇÃO AQUI
                    updateProductPrice(selectedVariant.price, currentPosition);
                };
                
                newImage.onerror = () => {
                    if (detailImage) detailImage.classList.remove('loading');
                    console.error('Erro ao carregar imagem:', selectedVariant.image);
                };
            });
            
            modalColorOptions.appendChild(colorOption);
        });
    }
    
    // Configurar opções de tamanho
    updateDetailSizes(firstVariant.sizes);
    
    // Configurar opções de posição da estampa
    const positionOptions = document.querySelectorAll('.position-option-premium');
    positionOptions.forEach(option => option.classList.remove('active'));
    
    // Mostrar/ocultar seção de posição da estampa
    if (stampPositionGroup) {
        if (product.positions.length > 0) {
            stampPositionGroup.style.display = 'block';
            
            // Ativar a primeira opção
            const firstPositionOption = document.querySelector(`.position-option-premium[data-position="${currentPosition}"]`);
            if (firstPositionOption) {
                firstPositionOption.classList.add('active');
            }
            
            // Adicionar event listeners para posições
            positionOptions.forEach(option => {
                option.addEventListener('click', () => {
                    positionOptions.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                    currentPosition = option.getAttribute('data-position');
                    
                    // Atualizar preço baseado na posição - CORREÇÃO AQUI
                    const selectedVariant = product.variants[currentColor];
                    updateProductPrice(selectedVariant.price, currentPosition);
                });
            });
        } else {
            stampPositionGroup.style.display = 'none';
        }
    }
    
    // Atualizar preço
    updateProductPrice(firstVariant.price, currentPosition);
    
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar página do produto
    if (productPage) productPage.classList.add('active');
    
    // Rolar para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Atualizar meta tags para produto
function updateProductMetaTags(product) {
    // Atualizar título da página
    document.title = `${product.name} - WFcustom`;
    
    // Atualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = product.description;
    }
    
    // Adicionar schema markup para produto
    addProductSchemaMarkup(product);
}

// Adicionar schema markup para produto
function addProductSchemaMarkup(product) {
    // Remover schema anterior se existir
    const existingSchema = document.getElementById('product-schema');
    if (existingSchema) {
        existingSchema.remove();
    }
    
    const firstColor = Object.keys(product.variants)[0];
    const firstVariant = product.variants[firstColor];
    
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": firstVariant.image,
        "offers": {
            "@type": "Offer",
            "price": firstVariant.price,
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock"
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'product-schema';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

// Atualizar tamanhos na página de detalhes
function updateDetailSizes(sizes) {
    if (!detailSizeOptions) return;
    
    detailSizeOptions.innerHTML = '';
    
    sizes.forEach(size => {
        const sizeOption = document.createElement('div');
        sizeOption.className = `size-option-premium ${size === currentSize ? 'active' : ''}`;
        sizeOption.setAttribute('data-size', size);
        sizeOption.textContent = size;
        
        sizeOption.addEventListener('click', () => {
            document.querySelectorAll('.size-option-premium').forEach(opt => opt.classList.remove('active'));
            sizeOption.classList.add('active');
            currentSize = size;
        });
        
        detailSizeOptions.appendChild(sizeOption);
    });
    
    // Resetar para o primeiro tamanho
    if (sizes.length > 0) {
        currentSize = sizes[0];
    }
}

// Atualizar preço do produto na página de detalhes - FUNÇÃO CORRIGIDA
function updateProductPrice(basePrice, position) {
    if (!currentProduct || !detailPrice) return;
    
    console.log('Atualizando preço:', { basePrice, position, currentColor });
    
    // Calcular preço final considerando posição
    const finalPrice = calculateFinalPrice(basePrice, position);
    
    detailPrice.textContent = finalPrice.toFixed(2);
}

// Adicionar produto ao carrinho da página de detalhes
function addToCartFromDetail() {
    if (!currentProduct) return;
    
    const selectedVariant = currentProduct.variants[currentColor];
    const finalPrice = calculateFinalPrice(selectedVariant.price, currentPosition);
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    
    alert('Produto adicionado ao carrinho!');
    showHome();
}

// Comprar agora da página de detalhes
function buyNowFromDetail() {
    if (!currentProduct) return;
    
    const selectedVariant = currentProduct.variants[currentColor];
    const finalPrice = calculateFinalPrice(selectedVariant.price, currentPosition);
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    
    showCart();
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
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (favoritesPage) favoritesPage.classList.add('active');
    renderFavorites();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar localização
function showLocation() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (locationPage) locationPage.classList.add('active');
    
    // Resetar formulário
    if (locationForm) locationForm.reset();
    if (shippingPriceContainer) shippingPriceContainer.style.display = 'none';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderizar favoritos
function renderFavorites() {
    if (!favoritesItemsContainer) return;
    
    favoritesItemsContainer.innerHTML = '';
    
    if (favoriteItems.length === 0) {
        favoritesItemsContainer.innerHTML = `
            <div class="empty-favorites-premium">
                <i class="far fa-heart"></i>
                <h3>Nenhum produto favoritado</h3>
                <p>Adicione produtos aos favoritos para vê-los aqui</p>
            </div>
        `;
        return;
    }
    
    favoriteItems.forEach(productId => {
        const product = findProductById(productId);
        if (!product) return;
        
        const firstColor = Object.keys(product.variants)[0];
        const firstVariant = product.variants[firstColor];
        
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item-premium';
        favoriteItem.setAttribute('data-product-id', product.id);
        
        favoriteItem.innerHTML = `
            <img src="${firstVariant.image}" alt="${product.name}" class="favorite-item-image-premium">
            <div class="favorite-item-details-premium">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="favorite-item-price-premium">R$ ${firstVariant.price.toFixed(2)}</div>
                <button class="add-from-favorite-premium" data-product-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
            <button class="remove-favorite-premium" data-product-id="${product.id}" aria-label="Remover dos favoritos">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        favoritesItemsContainer.appendChild(favoriteItem);
    });
    
    // Adicionar event listeners
    document.querySelectorAll('.remove-favorite-premium').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = button.getAttribute('data-product-id');
            toggleFavorite(productId);
            renderFavorites();
            updateFavoritesCount();
        });
    });
    
    document.querySelectorAll('.add-from-favorite-premium').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = button.getAttribute('data-product-id');
            const product = findProductById(productId);
            if (product) {
                const firstColor = Object.keys(product.variants)[0];
                const firstVariant = product.variants[firstColor];
                const firstSize = firstVariant.sizes[0];
                const firstPosition = product.positions.length > 0 ? product.positions[0] : '';
                
                addToCart(product, firstColor, firstSize, firstPosition, firstVariant.price);
                alert('Produto adicionado ao carrinho!');
            }
        });
    });
    
    // Permitir clique no item para abrir a página do produto
    document.querySelectorAll('.favorite-item-premium').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                const productId = item.getAttribute('data-product-id');
                const product = findProductById(productId);
                if (product) {
                    showProductPage(product);
                }
            }
        });
    });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando aplicação...');
    init();
});

// Adicionar CSS para cores das categorias
const style = document.createElement('style');
style.textContent = `
    .category-filter-premium.active.masculino-color {
        background: var(--masculino-primary) !important;
        border-color: var(--masculino-primary) !important;
    }
    
    .category-filter-premium.active.unissexo-color {
        background: var(--unissexo-primary) !important;
        border-color: var(--unissexo-primary) !important;
    }
    
    .category-filter-premium.active.canecas-color {
        background: var(--canecas-primary) !important;
        border-color: var(--canecas-primary) !important;
    }
`;
document.head.appendChild(style);