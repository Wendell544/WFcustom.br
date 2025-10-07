// Variáveis globais
const phoneNumber = '5583999667578';
let currentProduct = null;
let currentColor = 'branco';
let currentSize = 'P';
let currentPosition = 'frente';
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let currentSection = 'masculino';
let currentCategory = 'todos';
let currentSlide = 0;
let slideInterval;

// Elementos DOM
const homePage = document.getElementById('home-page');
const productPage = document.getElementById('product-page');
const cartPage = document.getElementById('cart-page');
const locationPage = document.getElementById('location-page');
const detailImage = document.getElementById('detail-image');
const detailTitle = document.getElementById('detail-title');
const detailDescription = document.getElementById('detail-description');
const detailPrice = document.getElementById('detail-price');
const modalColorOptions = document.getElementById('modal-color-options');
const sizeOptions = document.querySelectorAll('.size-option');
const positionOptions = document.querySelectorAll('.position-option');
const addToCartDetailButton = document.getElementById('add-to-cart-detail');
const buyNowDetailButton = document.getElementById('buy-now-detail');
const customizeShirtButton = document.getElementById('customize-shirt');
const locationForm = document.getElementById('location-form');
const shippingPrice = document.getElementById('shipping-price');
const shippingInfo = document.getElementById('shipping-info');
const shippingPriceContainer = document.querySelector('.shipping-price');
const finalizeOrderButton = document.getElementById('finalize-order');
const confirmationModal = document.getElementById('confirmation-modal');
const closeModal = document.querySelector('.close-modal');
const closeConfirmation = document.getElementById('close-confirmation');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const footerNavLinks = document.querySelectorAll('.footer-nav-link');
const cartIcon = document.getElementById('cart-icon');
const cartItemsContainer = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const continueShoppingBtn = document.getElementById('continue-shopping');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCount = document.querySelector('.cart-count');
const backFromProduct = document.getElementById('back-from-product');
const backFromCart = document.getElementById('back-from-cart');
const backFromLocation = document.getElementById('back-from-location');
const categoryFilters = document.querySelectorAll('.category-filter');
const backToHomeFromProduct = document.getElementById('back-to-home-from-product');
const bannerSlides = document.querySelectorAll('.banner-slide');
const bannerDots = document.querySelectorAll('.banner-dot');
const deliveryOptions = document.getElementById('delivery-options');
const colorOptionsContainer = document.getElementById('color-options-container');
const sizeOptionsContainer = document.getElementById('size-options-container');
const positionOptionsContainer = document.getElementById('position-options-container');

// Funções de inicialização
function init() {
    setupEventListeners();
    updateCartCount();
    
    // Popular grades
    populateGrade(1, products.masculino.estampadas);
    populateGrade(2, products.masculino.esportivas);
    populateGrade(3, products.unissexo.personagens);
    populateGrade(4, products.unissexo.coloridas);
    
    // Popular coleções Canecas e Frases
    populateColecaoCanecas();
    populateColecaoFrases();
    
    // Aplicar classe para categoria "todos"
    updateGridForCategory();
    
    // Iniciar carrossel
    startCarousel();
}

// Iniciar carrossel do banner
function startCarousel() {
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
    // Remover classe active de todos os slides e dots
    bannerSlides.forEach(slide => slide.classList.remove('active'));
    bannerDots.forEach(dot => dot.classList.remove('active'));
    
    // Adicionar classe active ao slide e dot atual
    bannerSlides[currentSlide].classList.add('active');
    bannerDots[currentSlide].classList.add('active');
}

// Criar card de produto para a grade
function createGradeCard(product) {
    const card = document.createElement('div');
    card.className = 'grade-card';
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('data-variants', JSON.stringify(product.variants));

    // Obter a primeira cor como padrão
    const firstColor = Object.keys(product.variants)[0];
    const firstImage = product.variants[firstColor];

    // Criar as bolinhas de cor (apenas se não for caneca)
    const colorDots = product.category !== 'canecas' ? Object.keys(product.variants).map(color => {
        let bgColor;
        switch(color) {
            case 'branco': bgColor = 'white'; break;
            case 'preto': bgColor = 'black'; break;
            case 'azul': bgColor = '#007bff'; break;
            case 'cinza': bgColor = '#6c757d'; break;
            default: bgColor = color;
        }
        return `<div class="color-dot ${color === firstColor ? 'active' : ''}" data-color="${color}" style="background-color: ${bgColor};"></div>`;
    }).join('') : '';

    card.innerHTML = `
        <div class="image-container">
            <img src="${firstImage}" alt="${product.name}" class="grade-card-image" data-color="${firstColor}" loading="lazy">
        </div>
        <div class="grade-card-info">
            <h3 class="grade-card-title">${product.name}</h3>
            <div class="grade-card-price">R$ ${product.price}</div>
            ${product.category !== 'canecas' ? `<div class="grade-card-colors">${colorDots}</div>` : ''}
        </div>
    `;

    // Adicionar event listeners para as bolinhas de cor (apenas se não for caneca)
    if (product.category !== 'canecas') {
        const colorDotsElements = card.querySelectorAll('.color-dot');
        const cardImage = card.querySelector('.grade-card-image');
        
        colorDotsElements.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Remover classe active de todas as bolinhas
                colorDotsElements.forEach(d => d.classList.remove('active'));
                
                // Adicionar classe active à bolinha clicada
                dot.classList.add('active');
                
                // Obter a cor selecionada
                const selectedColor = dot.getAttribute('data-color');
                
                // Atualizar a imagem
                const variants = JSON.parse(card.getAttribute('data-variants'));
                cardImage.src = variants[selectedColor];
                cardImage.setAttribute('data-color', selectedColor);
                cardImage.alt = `${product.name} - Cor ${selectedColor}`;
            });
        });
    }

    return card;
}

// Popular uma grade
function populateGrade(gradeId, productList) {
    const gradeContainer = document.getElementById(`grade-container-${gradeId}`);

    // Limpar
    gradeContainer.innerHTML = '';

    // Adicionar produtos à grade (máximo 10)
    productList.slice(0, 10).forEach(product => {
        const card = createGradeCard(product);
        gradeContainer.appendChild(card);
    });
}

// Popular coleção Canecas
function populateColecaoCanecas() {
    const gradeContainer = document.getElementById('grade-container-canecas');

    // Limpar
    gradeContainer.innerHTML = '';

    // Adicionar produtos canecas à grade
    products.canecas.slice(0, 10).forEach(product => {
        const card = createGradeCard(product);
        gradeContainer.appendChild(card);
    });
}

// Popular coleção Frases
function populateColecaoFrases() {
    const gradeContainer = document.getElementById('grade-container-frases');

    // Limpar
    gradeContainer.innerHTML = '';

    // Adicionar produtos de frases à grade
    products.frases.slice(0, 10).forEach(product => {
        const card = createGradeCard(product);
        gradeContainer.appendChild(card);
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros de categoria
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remover classe active de todos os filtros
            categoryFilters.forEach(f => f.classList.remove('active'));
            
            // Adicionar classe active ao filtro clicado
            filter.classList.add('active');
            
            // Obter a categoria selecionada
            currentCategory = filter.getAttribute('data-category');
            
            // Filtrar grades
            filterGradesByCategory(currentCategory);
            
            // Atualizar layout da grade
            updateGridForCategory();
        });
    });

    // Tamanhos
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            currentSize = option.getAttribute('data-size');
        });
    });

    // Posições da estampa
    positionOptions.forEach(option => {
        option.addEventListener('click', () => {
            positionOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            currentPosition = option.getAttribute('data-position');
        });
    });

    // Botão de adicionar ao carrinho na página de produto
    addToCartDetailButton.addEventListener('click', addToCartFromDetail);

    // Botão de comprar agora na página de produto
    buyNowDetailButton.addEventListener('click', buyNowFromDetail);

    // Botão de personalizar camisa
    customizeShirtButton.addEventListener('click', customizeShirt);

    // Formulário de localização
    locationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        finalizeOrder();
    });

    // Modal
    closeModal.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
    });

    closeConfirmation.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });

    // Menu mobile
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Navegação
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            
            if (section === 'home') {
                showHome();
            } else {
                showCategory(section);
                currentSection = section;
            }
            
            // Atualizar navegação ativa
            navLinksItems.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Navegação do footer
    footerNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            
            if (section === 'home') {
                showHome();
            } else {
                showCategory(section);
                currentSection = section;
            }
            
            // Atualizar navegação ativa no header
            navLinksItems.forEach(item => {
                if (item.getAttribute('data-section') === section) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    });

    // CORREÇÃO: Event listener do ícone do carrinho (já estava funcionando, mas garantindo)
    cartIcon.addEventListener('click', showCart);

    // Botão continuar comprando
    continueShoppingBtn.addEventListener('click', () => {
        showHome();
    });

    // Botão finalizar compra no carrinho
    checkoutBtn.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        showLocation();
    });

    // Campo de cidade para calcular frete
    document.getElementById('city').addEventListener('input', calculateShipping);

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
    backFromProduct.addEventListener('click', () => {
        showHome();
    });

    backFromCart.addEventListener('click', () => {
        showHome();
    });

    backFromLocation.addEventListener('click', () => {
        showCart();
    });

    // Botão Voltar ao Início na página de produto
    backToHomeFromProduct.addEventListener('click', (e) => {
        e.preventDefault();
        showHome();
    });

    // Event listener para opções de entrega
    document.querySelectorAll('input[name="delivery-method"]').forEach(option => {
        option.addEventListener('change', calculateShipping);
    });
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
    const grades = document.querySelectorAll('.grade-produtos, .colecao-canecas, .colecao-frases');
    
    grades.forEach(grade => {
        const gradeCategories = grade.getAttribute('data-category').split(',');
        
        if (category === 'todos' || gradeCategories.includes(category)) {
            grade.style.display = 'block';
        } else {
            grade.style.display = 'none';
        }
    });
}

// Mostrar home
function showHome() {
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar home
    homePage.classList.add('active');
    
    // Rolar para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar categoria
function showCategory(category) {
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar home
    homePage.classList.add('active');
    
    // Rolar até a seção de produtos
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Mostrar página do produto
function showProductPage(product) {
    currentProduct = product;
    const firstColor = Object.keys(product.variants)[0];
    detailImage.src = product.variants[firstColor];
    detailImage.alt = product.name;
    detailTitle.textContent = product.name;
    detailDescription.textContent = product.description;
    
    // Resetar seleções
    currentColor = firstColor;
    currentSize = 'P';
    currentPosition = 'frente';
    
    // Configurar opções de cor
    modalColorOptions.innerHTML = '';
    
    // Mostrar/ocultar opções baseado no tipo de produto
    if (product.category === 'canecas') {
        colorOptionsContainer.style.display = 'none';
        sizeOptionsContainer.style.display = 'none';
        positionOptionsContainer.style.display = 'none';
    } else {
        colorOptionsContainer.style.display = 'block';
        sizeOptionsContainer.style.display = 'block';
        positionOptionsContainer.style.display = 'block';
        
        Object.keys(product.variants).forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = `color-option ${color === currentColor ? 'active' : ''}`;
            colorOption.setAttribute('data-color', color);
            
            // Definir cor de fundo baseada no nome da cor
            let bgColor;
            switch(color) {
                case 'branco': bgColor = 'white'; break;
                case 'preto': bgColor = 'black'; break;
                case 'azul': bgColor = '#007bff'; break;
                case 'cinza': bgColor = '#6c757d'; break;
                default: bgColor = color;
            }
            
            colorOption.style.backgroundColor = bgColor;
            
            colorOption.addEventListener('click', () => {
                document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
                colorOption.classList.add('active');
                currentColor = color;
                detailImage.src = product.variants[color];
                detailImage.alt = `${product.name} - Cor ${color}`;
            });
            
            modalColorOptions.appendChild(colorOption);
        });
        
        // Resetar seleção de tamanho
        sizeOptions.forEach(option => option.classList.remove('active'));
        document.querySelector('.size-option[data-size="P"]').classList.add('active');
        
        // Resetar seleção de posição
        positionOptions.forEach(option => option.classList.remove('active'));
        document.querySelector('.position-option[data-position="frente"]').classList.add('active');
    }
    
    // Atualizar preço
    updateProductPrice();
    
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar página do produto
    productPage.classList.add('active');
    
    // Rolar para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Atualizar preço do produto na página de detalhes
function updateProductPrice() {
    if (!currentProduct) return;
    
    let price = currentProduct.price;
    detailPrice.textContent = price;
}

// Adicionar produto ao carrinho da página de detalhes
function addToCartFromDetail() {
    if (!currentProduct) return;
    
    // Para canecas, usar valores padrão
    const color = currentProduct.category === 'canecas' ? 'branco' : currentColor;
    const size = currentProduct.category === 'canecas' ? 'Único' : currentSize;
    const position = currentProduct.category === 'canecas' ? 'padrão' : currentPosition;
    
    addToCart(currentProduct, color, size, position);
    
    // Mostrar mensagem de confirmação
    alert('Produto adicionado ao carrinho!');
    
    // Voltar para a home
    showHome();
}

// Comprar agora da página de detalhes
function buyNowFromDetail() {
    if (!currentProduct) return;
    
    // Limpar carrinho e adicionar apenas este produto
    cartItems = [];
    
    // Para canecas, usar valores padrão
    const color = currentProduct.category === 'canecas' ? 'branco' : currentColor;
    const size = currentProduct.category === 'canecas' ? 'Único' : currentSize;
    const position = currentProduct.category === 'canecas' ? 'padrão' : currentPosition;
    
    addToCart(currentProduct, color, size, position);
    
    // Ir para a página de localização
    showLocation();
}

// Personalizar camisa
function customizeShirt() {
    const message = `Olá! Gostaria de personalizar uma camiseta. Pode me ajudar?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Mostrar carrinho
function showCart() {
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar carrinho
    cartPage.classList.add('active');
    
    // Atualizar conteúdo do carrinho
    renderCart();
    
    // Rolar para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar localização
function showLocation() {
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar localização
    locationPage.classList.add('active');
    
    // Rolar para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Encontrar produto por ID
function findProductById(id) {
    // Procurar em masculino
    for (const subcategory in products.masculino) {
        const product = products.masculino[subcategory].find(p => p.id == id);
        if (product) return product;
    }
    
    // Procurar em unissexo
    for (const subcategory in products.unissexo) {
        const product = products.unissexo[subcategory].find(p => p.id == id);
        if (product) return product;
    }
    
    // Procurar em frases
    const fraseProduct = products.frases.find(p => p.id == id);
    if (fraseProduct) return fraseProduct;
    
    // Procurar em canecas
    const canecaProduct = products.canecas.find(p => p.id == id);
    if (canecaProduct) return canecaProduct;
    
    return null;
}

// Inicializar o site quando carregado
document.addEventListener('DOMContentLoaded', init);