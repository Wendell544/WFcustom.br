// Sistema de Ofertas Especiais
const specialOffers = {
    limitedTime: [
        {
            id: 'offer-1',
            productId: 1,
            name: 'Camisa Masculina 1 - Oferta Especial',
            description: 'Camiseta masculina premium com desconto por tempo limitado',
            image: 'https://i.postimg.cc/8k2J4p7L/1.png',
            originalPrice: 49.90,
            discountPrice: 38.90,
            discount: 22,
            endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
            stock: 15,
            totalStock: 50,
            badge: '🔥 Oferta Especial'
        },
        {
            id: 'offer-2',
            productId: 34,
            name: 'Camisa Unissexo 1 - Promoção Relâmpago',
            description: 'Camiseta unissexo com design exclusivo em promoção',
            image: 'https://i.postimg.cc/fLgjhNp0/1.png',
            originalPrice: 44.90,
            discountPrice: 38.90,
            discount: 13,
            endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 horas
            stock: 8,
            totalStock: 30,
            badge: '⚡ Promoção Relâmpago'
        },
        {
            id: 'offer-3',
            productId: 67,
            name: 'Caneca 1 - Oferta Imperdível',
            description: 'Caneca personalizada com desconto especial',
            image: 'https://i.postimg.cc/J0tn8vvD/070bee7b-00d5-46ac-ad24-aca5b61ace35.png',
            originalPrice: 39.90,
            discountPrice: 32.90,
            discount: 18,
            endTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 horas
            stock: 20,
            totalStock: 100,
            badge: '🎯 Oferta Imperdível'
        }
    ]
};

// Timer de ofertas
let offerTimer = null;

// Inicializar sistema de ofertas
function initOffers() {
    renderOffers();
    startOfferTimer();
    updateOfferTimer();
}

// Renderizar ofertas
function renderOffers() {
    const offersGrid = document.getElementById('offers-grid');
    if (!offersGrid) return;

    offersGrid.innerHTML = '';

    specialOffers.limitedTime.forEach(offer => {
        const stockPercentage = (offer.stock / offer.totalStock) * 100;
        const timeLeft = offer.endTime - new Date();
        const hoursLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60)));
        
        const offerCard = document.createElement('div');
        offerCard.className = 'offer-card-premium';
        offerCard.innerHTML = `
            <div class="offer-badge">${offer.badge}</div>
            <img src="${offer.image}" alt="${offer.name}" class="offer-image" loading="lazy" width="280" height="200">
            <div class="offer-content">
                <h3>${offer.name}</h3>
                <p>${offer.description}</p>
                <div class="offer-price">
                    <span class="original-price">R$ ${offer.originalPrice.toFixed(2)}</span>
                    <span class="discount-price">R$ ${offer.discountPrice.toFixed(2)}</span>
                </div>
                <div class="stock-indicator">
                    <div class="stock-text">
                        ${offer.stock < 10 ? '⏳ ' : ''}Apenas ${offer.stock} unidades!
                        ${hoursLeft < 6 ? '🕒 ' : ''}${hoursLeft}h restantes
                    </div>
                    <div class="stock-bar">
                        <div class="stock-progress" style="width: ${stockPercentage}%"></div>
                    </div>
                </div>
                <div class="action-buttons-premium" style="margin-top: 1rem;">
                    <button class="btn btn-primary-premium" onclick="buyOffer(${offer.productId})" 
                            ${offer.stock === 0 ? 'disabled' : ''}>
                        ${offer.stock === 0 ? 'Esgotado' : 'Comprar Agora'}
                    </button>
                </div>
            </div>
        `;

        offersGrid.appendChild(offerCard);
    });
}

// Comprar oferta
function buyOffer(productId) {
    const product = findProductById(productId);
    if (product) {
        showProductPage(product);
    }
}

// Atualizar timer de ofertas
function updateOfferTimer() {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    
    const timeDiff = nextMidnight - now;
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    const hoursElement = document.getElementById('timer-hours');
    const minutesElement = document.getElementById('timer-minutes');
    const secondsElement = document.getElementById('timer-seconds');
    
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Atualizar estoque dinamicamente (simulação)
    updateOfferStocks();
}

// Iniciar timer
function startOfferTimer() {
    if (offerTimer) clearInterval(offerTimer);
    offerTimer = setInterval(updateOfferTimer, 1000);
}

// Atualizar estoques das ofertas (simulação)
function updateOfferStocks() {
    const now = new Date();
    
    specialOffers.limitedTime.forEach(offer => {
        if (offer.stock > 0) {
            // Simular diminuição gradual do estoque baseado no tempo
            const timePassed = (offer.endTime - now) / (1000 * 60 * 60); // horas restantes
            const initialStock = offer.totalStock;
            const expectedStock = Math.max(1, Math.floor((timePassed / 24) * initialStock));
            
            if (offer.stock > expectedStock) {
                offer.stock = expectedStock;
            }
        }
    });
    
    // Re-renderizar ofertas se estiver na página
    if (document.getElementById('special-offers').offsetParent !== null) {
        renderOffers();
    }
}

// Verificar e atualizar ofertas expiradas
function checkExpiredOffers() {
    const now = new Date();
    specialOffers.limitedTime = specialOffers.limitedTime.filter(offer => offer.endTime > now);
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initOffers);