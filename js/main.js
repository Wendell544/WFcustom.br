// Variáveis globais
const phoneNumber = '5583999667578';
let currentProduct = null;
let currentColor = 'branco';
let currentSize = 'P';
let currentPosition = 'frente';
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let currentSection = 'masculino';
let currentCategory = 'todos';

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
const deliveryOptions = document.getElementById('delivery-options');

// Funções de inicialização
function init() {
    setupEventListeners();
    updateCartCount();
    
    // Popular grades
    populateGrade(1, products.masculino.estampadas);
    populateGrade(2, products.masculino.esportivas);
    populateGrade(3, products.unissexo.personagens);
    populateGrade(4, products.unissexo.coloridas);
    
    // Popular coleções Premium e Frases
    populateColecaoPremium();
    populateColecaoFrases();
    
    // Aplicar classe para categoria "todos"
    updateGridForCategory();
    
    // Iniciar carrossel
    startCarousel();
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

    // Event listener do ícone do carrinho
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
    const grades = document.querySelectorAll('.grade-produtos, .colecao-premium, .colecao-frases');
    
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
    
    addToCart(currentProduct, currentColor, currentSize, currentPosition);
    
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
    addToCart(currentProduct, currentColor, currentSize, currentPosition);
    
    // Ir para a página de localização
    showLocation();
}

// Personalizar camisa
function customizeShirt() {
    const message = `Olá! Gostaria de personalizar uma camiseta. Pode me ajudar?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Calcular frete
function calculateShipping() {
    const city = document.getElementById('city').value.toLowerCase();
    let shippingCost = 9.99; // Valor padrão para outras cidades
    
    if (city.includes('são bento') || city.includes('sao bento')) {
        shippingCost = 4.00;
        deliveryOptions.style.display = 'block';
        
        // Verificar se a opção de retirada está selecionada
        const pickupOption = document.getElementById('pickup');
        if (pickupOption.checked) {
            shippingCost = 0;
        }
    } else {
        deliveryOptions.style.display = 'none';
    }
    
    shippingPrice.textContent = `R$ ${shippingCost.toFixed(2)}`;
    shippingPriceContainer.style.display = 'block';
    
    // Atualizar frete no carrinho se estiver visível
    if (cartPage.classList.contains('active')) {
        const cartShipping = document.getElementById('cart-shipping');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartShipping && cartTotal) {
            const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
            const total = subtotal + shippingCost;
            
            cartShipping.textContent = `R$ ${shippingCost.toFixed(2)}`;
            cartTotal.textContent = `R$ ${total.toFixed(2)}`;
        }
    }
}

// Finalizar pedido
function finalizeOrder() {
    if (cartItems.length === 0) return;
    
    const city = document.getElementById('city').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const street = document.getElementById('street').value;
    const address = document.getElementById('address').value;
    
    // Verificar método de entrega
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked');
    const deliveryType = deliveryMethod ? deliveryMethod.value : 'delivery';
    
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const shippingCost = parseFloat(shippingPrice.textContent.replace('R$ ', ''));
    const totalPrice = subtotal + shippingCost;
    
    let message = `Olá! Gostaria de finalizar meu pedido:%0A%0A`;
    
    // Adicionar itens do pedido
    cartItems.forEach((item, index) => {
        message += `*Item ${index + 1}:* ${item.product.name}%0A`;
        message += `- Cor: ${item.color}%0A`;
        message += `- Tamanho: ${item.size}%0A`;
        message += `- Posição da estampa: ${item.position}%0A`;
        message += `- Preço: R$ ${item.price}%0A%0A`;
    });
    
    message += `*Subtotal:* R$ ${subtotal.toFixed(2)}%0A`;
    message += `*Frete:* R$ ${shippingCost.toFixed(2)}%0A`;
    message += `*Total:* R$ ${totalPrice.toFixed(2)}%0A%0A`;
    message += `*Endereço de entrega:*%0A`;
    message += `- Cidade: ${city}%0A`;
    message += `- Bairro: ${neighborhood}%0A`;
    message += `- Rua: ${street}%0A`;
    message += `- Número/Complemento: ${address}%0A`;
    message += `- Método de entrega: ${deliveryType === 'delivery' ? 'Entrega' : 'Retirada no Local'}%0A%0A`;
    message += `Por favor, confirme meu pedido!`;
    
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
    
    // Limpar carrinho
    cartItems = [];
    updateCartCount();
    saveCartToLocalStorage();
    
    // Mostrar modal de confirmação
    confirmationModal.style.display = 'flex';
    
    // Fechar página de localização
    showHome();
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
    
    // Procurar em premium
    const premiumProduct = products.premium.find(p => p.id == id);
    if (premiumProduct) return premiumProduct;
    
    return null;
}

// Inicializar o site quando carregado
document.addEventListener('DOMContentLoaded', init);