// Dados das ofertas especiais
const specialOffers = [
    {
        id: 1,
        name: "Camisa Masculina Especial",
        image: "https://i.postimg.cc/8k2J4p7L/1.png",
        originalPrice: 45.90,
        discountedPrice: 35.90,
        badge: "25% OFF",
        timeLeft: 24 * 60 * 60, // 24 horas em segundos
        productId: 1,
        category: "masculino"
    },
    {
        id: 2,
        name: "Camisa Feminina Promo",
        image: "https://i.postimg.cc/fLgjhNp0/1.png",
        originalPrice: 42.90,
        discountedPrice: 32.90,
        badge: "23% OFF",
        timeLeft: 12 * 60 * 60, // 12 horas em segundos
        productId: 34,
        category: "unissexo"
    },
    {
        id: 3,
        name: "Caneca Personalizada",
        image: "https://i.postimg.cc/J0tn8vvD/070bee7b-00d5-46ac-ad24-aca5b61ace35.png",
        originalPrice: 35.90,
        discountedPrice: 28.90,
        badge: "19% OFF",
        timeLeft: 6 * 60 * 60, // 6 horas em segundos
        productId: 67,
        category: "canecas"
    },
    {
        id: 4,
        name: "Kit 2 Camisetas",
        image: "https://i.postimg.cc/kg4mt87T/1.png",
        originalPrice: 85.90,
        discountedPrice: 69.90,
        badge: "18% OFF",
        timeLeft: 48 * 60 * 60, // 48 horas em segundos
        productId: 2,
        category: "masculino"
    },
    {
        id: 5,
        name: "Camisa Exclusiva",
        image: "https://i.postimg.cc/13c0dNQN/1.png",
        originalPrice: 49.90,
        discountedPrice: 39.90,
        badge: "20% OFF",
        timeLeft: 18 * 60 * 60, // 18 horas em segundos
        productId: 35,
        category: "unissexo"
    },
    {
        id: 6,
        name: "Coleção Verão",
        image: "https://i.postimg.cc/GhvvBs9s/1.png",
        originalPrice: 52.90,
        discountedPrice: 42.90,
        badge: "19% OFF",
        timeLeft: 36 * 60 * 60, // 36 horas em segundos
        productId: 3,
        category: "masculino"
    },
    {
        id: 7,
        name: "Camisa Premium",
        image: "https://i.postimg.cc/cLstr9py/1.png",
        originalPrice: 55.90,
        discountedPrice: 44.90,
        badge: "20% OFF",
        timeLeft: 24 * 60 * 60, // 24 horas em segundos
        productId: 36,
        category: "unissexo"
    },
    {
        id: 8,
        name: "Caneca Exclusiva",
        image: "https://i.postimg.cc/J0tn8vvD/070bee7b-00d5-46ac-ad24-aca5b61ace35.png",
        originalPrice: 38.90,
        discountedPrice: 31.90,
        badge: "18% OFF",
        timeLeft: 12 * 60 * 60, // 12 horas em segundos
        productId: 68,
        category: "canecas"
    }
];

// Timer global para ofertas
let offerTimer = null;

// Inicializar ofertas especiais
function initSpecialOffers() {
    populateOffersGrid();
    startOfferTimer();
    updateOfferTimer(); // Atualizar imediatamente
}

// Popular grid de ofertas
function populateOffersGrid() {
    const offersGrid = document.getElementById('offers-grid');
    if (!offersGrid) {
        console.error('Grid de ofertas não encontrado');
        return;
    }
    
    offersGrid.innerHTML = '';
    
    specialOffers.forEach(offer => {
        const offerCard = createOfferCard(offer);
        offersGrid.appendChild(offerCard);
    });
    
    console.log(`Grid de ofertas populado com ${specialOffers.length} ofertas`);
}

// Criar card de oferta
function createOfferCard(offer) {
    const offerCard = document.createElement('div');
    offerCard.className = 'offer-card';
    offerCard.setAttribute('data-offer-id', offer.id);
    offerCard.setAttribute('aria-label', `Oferta especial: ${offer.name} com ${offer.badge} de desconto`);
    
    const discountPercentage = Math.round(((offer.originalPrice - offer.discountedPrice) / offer.originalPrice) * 100);
    
    offerCard.innerHTML = `
        <img src="${offer.image}" alt="${offer.name}" class="offer-card-image" loading="lazy">
        <h3>${offer.name}</h3>
        <div class="offer-price">
            <span class="original-price">R$ ${offer.originalPrice.toFixed(2)}</span>
            <span class="discounted-price">R$ ${offer.discountedPrice.toFixed(2)}</span>
        </div>
        <div class="offer-badge">${offer.badge}</div>
        <div class="offer-time-left" style="display: none;">
            <small>Tempo restante: <span class="time-left">${formatTime(offer.timeLeft)}</span></small>
        </div>
    `;
    
    // Adicionar evento de clique para redirecionar para o produto
    offerCard.addEventListener('click', () => {
        handleOfferClick(offer);
    });
    
    // Adicionar efeitos de hover
    offerCard.addEventListener('mouseenter', () => {
        offerCard.style.transform = 'translateY(-5px)';
        offerCard.style.boxShadow = 'var(--shadow-lg)';
    });
    
    offerCard.addEventListener('mouseleave', () => {
        offerCard.style.transform = 'translateY(0)';
        offerCard.style.boxShadow = 'var(--shadow-md)';
    });
    
    return offerCard;
}

// Manipular clique na oferta
function handleOfferClick(offer) {
    console.log('Oferta clicada:', offer.name);
    
    // Tentar encontrar o produto correspondente
    const product = findProductById(offer.productId);
    
    if (product) {
        // Se encontrou o produto, mostrar página do produto
        showProductPage(product);
    } else {
        // Se não encontrou, mostrar mensagem e redirecionar para WhatsApp
        const message = `Olá! Gostaria de saber mais sobre a oferta: ${offer.name} - ${offer.badge}`;
        const url = `https://wa.me/5583999667578?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }
}

// Encontrar produto por ID
function findProductById(productId) {
    // Buscar em todas as categorias
    for (const category in products) {
        const product = products[category].find(p => p.id === productId);
        if (product) {
            return product;
        }
    }
    
    // Se não encontrou, buscar por ID aproximado (para compatibilidade)
    for (const category in products) {
        const product = products[category].find(p => p.id == productId);
        if (product) {
            return product;
        }
    }
    
    console.warn(`Produto com ID ${productId} não encontrado`);
    return null;
}

// Iniciar timer de ofertas
function startOfferTimer() {
    if (offerTimer) {
        clearInterval(offerTimer);
    }
    
    offerTimer = setInterval(() => {
        updateOfferTimer();
    }, 1000);
    
    console.log('Timer de ofertas iniciado');
}

// Atualizar timer de ofertas
function updateOfferTimer() {
    const hoursElement = document.getElementById('timer-hours');
    const minutesElement = document.getElementById('timer-minutes');
    const secondsElement = document.getElementById('timer-seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) {
        console.error('Elementos do timer não encontrados');
        return;
    }
    
    // Encontrar o tempo mínimo entre todas as ofertas
    let minTimeLeft = Math.min(...specialOffers.map(offer => offer.timeLeft));
    
    if (minTimeLeft <= 0) {
        // Recarregar ofertas quando o tempo acabar
        console.log('Tempo das ofertas esgotado, recarregando...');
        resetOffers();
        minTimeLeft = Math.min(...specialOffers.map(offer => offer.timeLeft));
    }
    
    // Atualizar tempo de todas as ofertas
    specialOffers.forEach(offer => {
        if (offer.timeLeft > 0) {
            offer.timeLeft--;
        }
    });
    
    // Calcular horas, minutos e segundos
    const hours = Math.floor(minTimeLeft / 3600);
    const minutes = Math.floor((minTimeLeft % 3600) / 60);
    const seconds = minTimeLeft % 60;
    
    // Atualizar elementos do timer
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Atualizar timers individuais nas ofertas
    updateIndividualOfferTimers();
    
    // Adicionar efeito visual quando o tempo estiver acabando
    if (minTimeLeft <= 3600) { // 1 hora ou menos
        hoursElement.style.color = '#EF4444';
        minutesElement.style.color = '#EF4444';
        secondsElement.style.color = '#EF4444';
    } else {
        hoursElement.style.color = '';
        minutesElement.style.color = '';
        secondsElement.style.color = '';
    }
}

// Atualizar timers individuais nas ofertas
function updateIndividualOfferTimers() {
    const offerCards = document.querySelectorAll('.offer-card');
    
    offerCards.forEach(card => {
        const offerId = parseInt(card.getAttribute('data-offer-id'));
        const offer = specialOffers.find(o => o.id === offerId);
        
        if (offer) {
            const timeLeftElement = card.querySelector('.time-left');
            if (timeLeftElement) {
                timeLeftElement.textContent = formatTime(offer.timeLeft);
                
                // Mostrar/ocultar timer baseado no tempo restante
                const timeLeftContainer = card.querySelector('.offer-time-left');
                if (timeLeftContainer) {
                    if (offer.timeLeft <= 3600) { // 1 hora ou menos
                        timeLeftContainer.style.display = 'block';
                        timeLeftContainer.style.color = '#EF4444';
                    } else if (offer.timeLeft <= 7200) { // 2 horas ou menos
                        timeLeftContainer.style.display = 'block';
                        timeLeftContainer.style.color = '#F59E0B';
                    } else {
                        timeLeftContainer.style.display = 'none';
                    }
                }
            }
        }
    });
}

// Formatar tempo para exibição
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Resetar ofertas (simulação)
function resetOffers() {
    console.log('Resetando ofertas especiais...');
    
    specialOffers.forEach(offer => {
        // Reset para um tempo aleatório entre 6 e 48 horas
        offer.timeLeft = Math.floor(Math.random() * (48 * 60 * 60 - 6 * 60 * 60 + 1)) + 6 * 60 * 60;
        
        // Atualizar preços aleatoriamente (simulação de novas ofertas)
        const discountPercentage = Math.floor(Math.random() * 15) + 15; // 15% a 30%
        offer.originalPrice = offer.discountedPrice / (1 - discountPercentage / 100);
        offer.discountedPrice = Math.round(offer.originalPrice * (1 - discountPercentage / 100) * 100) / 100;
        offer.badge = `${discountPercentage}% OFF`;
    });
    
    // Recriar grid de ofertas
    populateOffersGrid();
    
    console.log('Ofertas resetadas com sucesso');
}

// Obter ofertas por categoria
function getOffersByCategory(category) {
    return specialOffers.filter(offer => offer.category === category);
}

// Obter ofertas em destaque (com maior desconto)
function getFeaturedOffers(limit = 3) {
    return specialOffers
        .slice()
        .sort((a, b) => {
            const discountA = ((a.originalPrice - a.discountedPrice) / a.originalPrice) * 100;
            const discountB = ((b.originalPrice - b.discountedPrice) / b.originalPrice) * 100;
            return discountB - discountA;
        })
        .slice(0, limit);
}

// Verificar se há ofertas ativas
function hasActiveOffers() {
    return specialOffers.some(offer => offer.timeLeft > 0);
}

// Obter contagem regressiva para a próxima oferta expirar
function getNextExpiringOffer() {
    const activeOffers = specialOffers.filter(offer => offer.timeLeft > 0);
    if (activeOffers.length === 0) return null;
    
    return activeOffers.reduce((min, offer) => 
        offer.timeLeft < min.timeLeft ? offer : min
    );
}

// Adicionar badge de oferta aos produtos
function addOfferBadgesToProducts() {
    specialOffers.forEach(offer => {
        const product = findProductById(offer.productId);
        if (product) {
            product.badge = 'sale';
            product.offerPrice = offer.discountedPrice;
        }
    });
}

// Atualizar preços com ofertas nos produtos
function updateProductPricesWithOffers() {
    specialOffers.forEach(offer => {
        const product = findProductById(offer.productId);
        if (product) {
            // Marcar produto como em oferta
            product.onSale = true;
            product.originalPrice = offer.originalPrice;
            product.salePrice = offer.discountedPrice;
        }
    });
}

// Inicializar sistema de ofertas quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que tudo esteja carregado
    setTimeout(() => {
        if (document.getElementById('special-offers')) {
            initSpecialOffers();
            addOfferBadgesToProducts();
            updateProductPricesWithOffers();
        }
    }, 100);
});

// Exportar funções para uso global (se necessário)
if (typeof window !== 'undefined') {
    window.specialOffers = specialOffers;
    window.initSpecialOffers = initSpecialOffers;
    window.getOffersByCategory = getOffersByCategory;
    window.getFeaturedOffers = getFeaturedOffers;
}

// Log de inicialização
console.log('✅ Módulo de ofertas especiais carregado');
console.log(`📊 ${specialOffers.length} ofertas disponíveis`);
console.log('🕒 Sistema de timer de ofertas inicializado');

// Adicionar estilos dinâmicos para ofertas
const offerStyles = `
    .offer-card {
        position: relative;
        overflow: hidden;
    }
    
    .offer-card::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 40px 40px 0;
        border-color: transparent #EF4444 transparent transparent;
        z-index: 2;
    }
    
    .offer-card:hover::after {
        content: 'COMPRAR';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(99, 102, 241, 0.9);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.8rem;
        z-index: 3;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .offer-card-image {
        transition: transform 0.3s ease;
    }
    
    .offer-card:hover .offer-card-image {
        transform: scale(1.05);
    }
    
    .offer-badge {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .offer-time-left {
        margin-top: 0.5rem;
        font-weight: 600;
    }
    
    /* Efeito de brilho para ofertas com pouco tempo */
    .offer-card[data-time-critical="true"] {
        animation: glow 1s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from { box-shadow: 0 0 5px #EF4444; }
        to { box-shadow: 0 0 15px #EF4444; }
    }
`;

// Adicionar estilos ao documento
if (document.head) {
    const styleElement = document.createElement('style');
    styleElement.textContent = offerStyles;
    document.head.appendChild(styleElement);
}