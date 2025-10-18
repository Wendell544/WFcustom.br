// main.js - Código principal atualizado com novas funcionalidades

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
let homePage, productPage, cartPage, locationPage, favoritesPage;
let detailImage, detailTitle, detailDescription, detailPrice;
let modalColorOptions, detailSizeOptions, stampPositionGroup;
let addToCartDetailButton, buyNowDetailButton, customizeShirtButton;
let locationForm, shippingPrice, shippingInfo, shippingPriceContainer;
let finalizeOrderButton, confirmationModal, closeModal, closeConfirmation;
let mobileMenuBtn, navLinks, navLinksItems, footerNavLinks;
let cartIcon, favoritesIcon, cartItemsContainer, cartSummary;
let continueShoppingBtn, checkoutBtn, cartCount;
let backFromProduct, backFromCart, backFromLocation, backFromFavorites;
let categoryFilters, backToHomeFromProduct, deliveryOptions;
let addToFavoritesDetailButton;

// Elementos do carrossel de banners
let bannerTrack, bannerSlides;

// Performance - Intersection Observer para lazy loading
let imageObserver;

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
    initImageLazyLoading();
    updateCartCount();
    updateFavoritesCount();
    
    // Aplicar classe para categoria "todos"
    updateGridForCategory();
    
    // Popular grades APÓS garantir que o DOM está pronto
    setTimeout(() => {
        populateAllGrades();
    }, 100);
}

// Inicializar elementos DOM
function initializeDOMElements() {
    homePage = document.getElementById('home-page');
    productPage = document.getElementById('product-page');
    cartPage = document.getElementById('cart-page');
    locationPage = document.getElementById('location-page');
    favoritesPage = document.getElementById('favorites-page');
    
    detailImage = document.getElementById('detail-image');
    detailTitle = document.getElementById('detail-title');
    detailDescription = document.getElementById('detail-description');
    detailPrice = document.getElementById('detail-price');
    modalColorOptions = document.getElementById('modal-color-options');
    detailSizeOptions = document.getElementById('detail-size-options');
    stampPositionGroup = document.getElementById('stamp-position-group');
    
    addToCartDetailButton = document.getElementById('add-to-cart-detail');
    buyNowDetailButton = document.getElementById('buy-now-detail');
    customizeShirtButton = document.getElementById('customize-shirt');
    addToFavoritesDetailButton = document.getElementById('add-to-favorites-detail');
    
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
    
    backFromProduct = document.getElementById('back-from-product');
    backFromCart = document.getElementById('back-from-cart');
    backFromLocation = document.getElementById('back-from-location');
    backFromFavorites = document.getElementById('back-from-favorites');
    
    categoryFilters = document.querySelectorAll('.category-filter-premium');
    backToHomeFromProduct = document.getElementById('back-to-home-from-product');
    deliveryOptions = document.getElementById('delivery-options');
    
    // Elementos do carrossel de banners
    bannerTrack = document.querySelector('.banner-track');
    bannerSlides = document.querySelectorAll('.banner-slide');
}

// Inicializar lazy loading de imagens
function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // Observar todas as imagens com classe 'lazy'
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Inicializar carrossel de banners
function initBannerCarousel() {
    if (!bannerTrack || bannerSlides.length === 0) return;
    
    // Mostrar primeiro banner
    showBanner(0);
    
    // Pré-carregar imagens
    preloadBannerImages();
    
    // Iniciar autoplay
    startBannerAutoplay();
    
    // Pausar autoplay ao interagir
    bannerTrack.addEventListener('mouseenter', pauseBannerAutoplay);
    bannerTrack.addEventListener('mouseleave', startBannerAutoplay);
    bannerTrack.addEventListener('touchstart', pauseBannerAutoplay);
}

// Pré-carregar imagens do carrossel
function preloadBannerImages() {
    bannerSlides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img) {
            const newImage = new Image();
            newImage.src = img.src;
        }
    });
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

    // Botão de favoritos na página de produto
    if (addToFavoritesDetailButton) {
        addToFavoritesDetailButton.addEventListener('click', toggleFavoriteFromDetail);
    }

    // Botão de personalizar produto
    if (customizeShirtButton) {
        customizeShirtButton.addEventListener('click', customizeProduct);
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
            const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !expanded);
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

    // Botão finalizar compra no carrinho
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartItems.length === 0) {
                showNotification('Seu carrinho está vazio!', 'info');
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
        if (productElement && !e.target.closest('.favorite-btn')) {
            const productId = productElement.getAttribute('data-product-id');
            const product = findProductById(productId);
            if (product) {
                showProductPage(product);
            }
        }
    });

    // Clique em botões de favorito nos cards
    document.addEventListener('click', (e) => {
        if (e.target.closest('.favorite-btn')) {
            e.preventDefault();
            e.stopPropagation();
            
            const favoriteBtn = e.target.closest('.favorite-btn');
            const productId = favoriteBtn.getAttribute('data-product-id');
            const product = findProductById(productId);
            
            if (product) {
                toggleFavorite(product);
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

    if (backFromLocation) {
        backFromLocation.addEventListener('click', () => {
            showCart();
        });
    }

    if (backFromFavorites) {
        backFromFavorites.addEventListener('click', () => {
            showHome();
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

    // Links do footer
    footerNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            
            if (section === 'favorites') {
                showFavorites();
            } else {
                showCategory(section);
            }
        });
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
    
    // Ativar filtro da categoria
    categoryFilters.forEach(filter => {
        if (filter.getAttribute('data-category') === category) {
            filter.click();
        }
    });
    
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mostrar página do produto
function showProductPage(product) {
    showLoading(true);
    
    setTimeout(() => {
        currentProduct = product;
        const firstColor = Object.keys(product.variants)[0];
        const firstVariant = product.variants[firstColor];
        
        if (detailImage) detailImage.src = firstVariant.image;
        if (detailImage) detailImage.alt = product.name;
        if (detailTitle) detailTitle.textContent = product.name;
        if (detailDescription) detailDescription.textContent = product.description;
        
        // Resetar seleções
        currentColor = firstColor;
        currentSize = firstVariant.sizes[0];
        currentPosition = product.positions.length > 0 ? product.positions[0] : '';
        
        // Atualizar meta tags dinâmicas
        updateProductMetaTags(product);
        
        // Configurar opções de cor
        if (modalColorOptions) {
            modalColorOptions.innerHTML = '';
            
            Object.keys(product.variants).forEach(color => {
                const colorOption = document.createElement('div');
                colorOption.className = `color-option-premium ${color === currentColor ? 'active' : ''}`;
                colorOption.setAttribute('data-color', color);
                colorOption.setAttribute('role', 'radio');
                colorOption.setAttribute('aria-checked', color === currentColor ? 'true' : 'false');
                colorOption.setAttribute('aria-label', `Cor ${color}`);
                
                let bgColor;
                switch(color) {
                    case 'branco': bgColor = 'white'; break;
                    case 'rosa claro': bgColor = '#FFB6C1'; break;
                    case 'azul claro': bgColor = '#87CEEB'; break;
                    default: bgColor = color;
                }
                
                colorOption.style.backgroundColor = bgColor;
                
                colorOption.addEventListener('click', () => {
                    document.querySelectorAll('.color-option-premium').forEach(opt => {
                        opt.classList.remove('active');
                        opt.setAttribute('aria-checked', 'false');
                    });
                    colorOption.classList.add('active');
                    colorOption.setAttribute('aria-checked', 'true');
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
                        
                        // Atualizar preço
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
        positionOptions.forEach(option => {
            option.classList.remove('active');
            option.setAttribute('aria-checked', 'false');
        });
        
        // Mostrar/ocultar seção de posição da estampa
        if (stampPositionGroup) {
            if (product.positions.length > 0) {
                stampPositionGroup.style.display = 'block';
                
                // Ativar a primeira opção
                const firstPositionOption = document.querySelector(`.position-option-premium[data-position="${currentPosition}"]`);
                if (firstPositionOption) {
                    firstPositionOption.classList.add('active');
                    firstPositionOption.setAttribute('aria-checked', 'true');
                }
                
                // Adicionar event listeners para posições
                positionOptions.forEach(option => {
                    option.addEventListener('click', () => {
                        positionOptions.forEach(opt => {
                            opt.classList.remove('active');
                            opt.setAttribute('aria-checked', 'false');
                        });
                        option.classList.add('active');
                        option.setAttribute('aria-checked', 'true');
                        currentPosition = option.getAttribute('data-position');
                        
                        // Atualizar preço baseado na posição
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
        
        // Atualizar botão de favoritos
        updateFavoriteButton(product.id);
        
        // Ocultar todas as páginas
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Mostrar página do produto
        if (productPage) productPage.classList.add('active');
        
        // Rolar para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        showLoading(false);
    }, 300);
}

// Atualizar meta tags para produtos
function updateProductMetaTags(product) {
    // Atualizar meta tags dinâmicas
    const metaTitle = document.querySelector('title');
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    
    if (metaTitle) metaTitle.textContent = `${product.name} - WFcustom`;
    if (metaDescription) metaDescription.setAttribute('content', product.description);
    if (ogTitle) ogTitle.setAttribute('content', `${product.name} - WFcustom`);
    if (ogDescription) ogDescription.setAttribute('content', product.description);
    
    const firstVariant = product.variants[Object.keys(product.variants)[0]];
    if (ogImage && firstVariant) {
        ogImage.setAttribute('content', firstVariant.image);
    }
    
    // Adicionar schema markup para produto específico
    addProductSchemaMarkup(product);
}

// Adicionar schema markup para produto
function addProductSchemaMarkup(product) {
    // Remover schema anterior se existir
    const existingSchema = document.getElementById('product-schema');
    if (existingSchema) {
        existingSchema.remove();
    }
    
    const firstVariant = product.variants[Object.keys(product.variants)[0]];
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": Object.values(product.variants).map(v => v.image),
        "sku": `WF-${product.id}`,
        "brand": {
            "@type": "Brand",
            "name": "WFcustom"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "BRL",
            "price": firstVariant.price,
            "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "WFcustom"
            }
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
        sizeOption.setAttribute('role', 'radio');
        sizeOption.setAttribute('aria-checked', size === currentSize ? 'true' : 'false');
        sizeOption.setAttribute('aria-label', `Tamanho ${size}`);
        sizeOption.textContent = size;
        
        sizeOption.addEventListener('click', () => {
            document.querySelectorAll('.size-option-premium').forEach(opt => {
                opt.classList.remove('active');
                opt.setAttribute('aria-checked', 'false');
            });
            sizeOption.classList.add('active');
            sizeOption.setAttribute('aria-checked', 'true');
            currentSize = size;
        });
        
        detailSizeOptions.appendChild(sizeOption);
    });
    
    // Resetar para o primeiro tamanho
    if (sizes.length > 0) {
        currentSize = sizes[0];
    }
}

// Atualizar preço do produto na página de detalhes
function updateProductPrice(basePrice, position) {
    if (!currentProduct || !detailPrice) return;
    
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
    
    showNotification('Produto adicionado ao carrinho!', 'success');
}

// Comprar agora da página de detalhes
function buyNowFromDetail() {
    if (!currentProduct) return;
    
    cartItems = [];
    const selectedVariant = currentProduct.variants[currentColor];
    const finalPrice = calculateFinalPrice(selectedVariant.price, currentPosition);
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition, finalPrice);
    showLocation();
}

// Alternar favorito da página de detalhes
function toggleFavoriteFromDetail() {
    if (!currentProduct) return;
    toggleFavorite(currentProduct);
}

// Atualizar botão de favorito na página de detalhes
function updateFavoriteButton(productId) {
    if (!addToFavoritesDetailButton) return;
    
    const icon = addToFavoritesDetailButton.querySelector('i');
    if (isProductInFavorites(productId)) {
        addToFavoritesDetailButton.classList.add('active');
        icon.classList.remove('far');
        icon.classList.add('fas');
        addToFavoritesDetailButton.innerHTML = '<i class="fas fa-heart"></i> Favoritado';
    } else {
        addToFavoritesDetailButton.classList.remove('active');
        icon.classList.remove('fas');
        icon.classList.add('far');
        addToFavoritesDetailButton.innerHTML = '<i class="far fa-heart"></i> Favoritar';
    }
}

// Personalizar produto
function customizeProduct() {
    const message = `Olá! Gostaria de personalizar um produto. Pode me ajudar?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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

// Mostrar localização
function showLocation() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (locationPage) locationPage.classList.add('active');
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

// Mostrar/ocultar loading
function showLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.display = show ? 'flex' : 'none';
    }
}

// Inicializar o site quando carregado
document.addEventListener('DOMContentLoaded', function() {
    init();
});

// Otimização de performance - carregamento crítico
window.addEventListener('load', function() {
    // Marcar como carregado para métricas de performance
    window.setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}