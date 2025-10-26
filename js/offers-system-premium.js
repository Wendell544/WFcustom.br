// 🚀 SISTEMA DE OFERTAS ULTRA PREMIUM - WFCUSTOM

class UltraOffersSystem {
    constructor() {
        this.currentAnnouncement = 0;
        this.announcementInterval = null;
        this.init();
    }

    init() {
        this.initPremiumAnnouncements();
        this.initUltraCartSystem();
        this.applySuperDiscounts();
        this.setupPremiumEventListeners();
        
        console.log('🚀 Sistema Ultra Premium Iniciado');
    }

    // === SISTEMA DE ANÚNCIOS PREMIUM ===
    initPremiumAnnouncements() {
        this.announcementSlides = document.querySelectorAll('.announcement-slide-premium');
        this.announcementSystem = document.getElementById('announcement-system');
        this.closeBtn = document.getElementById('announcement-close');

        if (this.announcementSlides.length === 0) return;

        this.startAnnouncementRotation();

        // Fechar anúncio
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.announcementSystem.style.display = 'none';
                this.stopAnnouncementRotation();
                localStorage.setItem('premium_announcement_closed', 'true');
            });
        }

        // Verificar se foi fechado anteriormente
        if (localStorage.getItem('premium_announcement_closed') === 'true') {
            this.announcementSystem.style.display = 'none';
        }
    }

    startAnnouncementRotation() {
        if (this.announcementInterval) clearInterval(this.announcementInterval);
        
        this.announcementInterval = setInterval(() => {
            this.showNextAnnouncement();
        }, 4000);
    }

    stopAnnouncementRotation() {
        if (this.announcementInterval) clearInterval(this.announcementInterval);
    }

    showNextAnnouncement() {
        // Ocultar slide atual
        this.announcementSlides.forEach(slide => slide.classList.remove('active'));
        
        // Avançar para próximo
        this.currentAnnouncement = (this.currentAnnouncement + 1) % this.announcementSlides.length;
        
        // Mostrar novo slide
        this.announcementSlides[this.currentAnnouncement].classList.add('active');
    }

    // === CARRINHO ULTRA PREMIUM ===
    initUltraCartSystem() {
        // Integração com o sistema existente
        this.integrateWithCartSystem();
    }

    integrateWithCartSystem() {
        // Sobrescrever função de atualização do carrinho
        const originalUpdateCart = window.renderCart;
        window.renderCart = () => {
            if (originalUpdateCart) originalUpdateCart();
            this.renderUltraCart();
        };
    }

    renderUltraCart() {
        this.renderUltraBenefits();
        this.renderUltraCartItems();
        this.renderUltraSummary();
    }

    renderUltraBenefits() {
        const benefitsContainer = document.getElementById('cart-benefits');
        if (!benefitsContainer) return;

        const tShirtCount = this.getTShirtCount();
        const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
        const nextBenefit = this.getNextBenefit(tShirtCount, subtotal);

        benefitsContainer.innerHTML = `
            <h3 style="margin-bottom: 20px; color: var(--premium-black); font-weight: 800; font-size: 1.3rem;">
                🎁 Seus Benefícios Exclusivos
            </h3>
            
            <div class="benefits-grid-premium">
                <!-- Frete Grátis -->
                <div class="benefit-card-premium ${subtotal >= 100 ? 'unlocked' : 'locked'}">
                    <span class="benefit-icon-premium">🚚</span>
                    <div class="benefit-title-premium">Frete Grátis</div>
                    <div class="benefit-desc-premium">Em compras acima de R$100</div>
                    <div class="benefit-status-premium ${subtotal >= 100 ? 'unlocked' : 'locked'}">
                        ${subtotal >= 100 ? 'ATIVO' : 'BLOQUEADO'}
                    </div>
                </div>

                <!-- 5% OFF -->
                <div class="benefit-card-premium ${tShirtCount >= 2 ? 'unlocked' : 'locked'}">
                    <span class="benefit-icon-premium">👕</span>
                    <div class="benefit-title-premium">5% de Desconto</div>
                    <div class="benefit-desc-premium">Ao levar 2 camisas</div>
                    <div class="benefit-status-premium ${tShirtCount >= 2 ? 'unlocked' : 'locked'}">
                        ${tShirtCount >= 2 ? 'ATIVO' : 'BLOQUEADO'}
                    </div>
                </div>

                <!-- 10% OFF -->
                <div class="benefit-card-premium ${tShirtCount >= 3 ? 'unlocked' : 'locked'}">
                    <span class="benefit-icon-premium">🔥</span>
                    <div class="benefit-title-premium">10% de Desconto</div>
                    <div class="benefit-desc-premium">Ao levar 3+ camisas</div>
                    <div class="benefit-status-premium ${tShirtCount >= 3 ? 'unlocked' : 'locked'}">
                        ${tShirtCount >= 3 ? 'ATIVO' : 'BLOQUEADO'}
                    </div>
                </div>
            </div>

            ${nextBenefit ? `
            <div class="next-benefit-premium">
                <div class="next-benefit-title-premium">🎯 Seu Próximo Benefício</div>
                <p style="margin: 0; color: var(--text-dark); font-size: 0.9rem;">
                    ${nextBenefit.message}
                </p>
                ${nextBenefit.progress !== null ? `
                <div class="next-benefit-progress-premium">
                    <div class="next-benefit-progress-bar-premium" 
                         style="width: ${nextBenefit.progress}%"></div>
                </div>
                <p style="margin: 0; color: #F59E0B; font-weight: 700; font-size: 0.8rem;">
                    ${nextBenefit.progressText}
                </p>
                ` : ''}
            </div>
            ` : ''}
        `;
    }

    renderUltraCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) return;

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: var(--text-light);">
                    <i class="fas fa-shopping-bag" style="font-size: 4rem; margin-bottom: 20px; opacity: 0.3;"></i>
                    <h3 style="color: var(--text-light); margin-bottom: 10px;">Seu carrinho está vazio</h3>
                    <p>Adicione alguns produtos incríveis para começar!</p>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item-super-premium" data-cart-id="${item.id}">
                <img src="${item.product.variants[item.color].image}" 
                     alt="${item.product.name}" 
                     class="cart-item-image-super-premium">
                <div class="cart-item-details-super-premium">
                    <div class="cart-item-header-premium">
                        <h3 class="cart-item-title-premium">${item.product.name}</h3>
                        <div class="cart-item-price-premium">R$ ${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-specs-premium">
                        <span class="cart-item-spec-premium">Cor: ${item.color}</span>
                        <span class="cart-item-spec-premium">Tamanho: ${item.size}</span>
                        ${item.position && item.product.category !== 'canecas' ? 
                          `<span class="cart-item-spec-premium">Estampa: ${this.getPositionText(item.position)}</span>` : ''}
                    </div>
                    <div class="cart-item-actions-premium">
                        <div class="quantity-controls-premium">
                            <button class="quantity-btn-premium" onclick="ultraOffersSystem.decreaseQuantity(${item.id})">-</button>
                            <span style="font-weight: 700;">1</span>
                            <button class="quantity-btn-premium" onclick="ultraOffersSystem.increaseQuantity(${item.id})">+</button>
                        </div>
                        <button class="remove-item-super-premium" onclick="ultraOffersSystem.removeFromUltraCart(${item.id})">
                            <i class="fas fa-trash"></i> Remover
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderUltraSummary() {
        const summaryContainer = document.getElementById('cart-summary');
        if (!summaryContainer) return;

        const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
        const tShirtCount = this.getTShirtCount();
        const quantityDiscount = this.calculateQuantityDiscount(tShirtCount, subtotal);
        const shippingCost = this.calculateShippingCost();
        const total = subtotal - quantityDiscount + shippingCost;
        const totalSavings = quantityDiscount + (shippingCost === 0 ? 9.99 : 0);

        summaryContainer.innerHTML = `
            <div class="summary-row-premium">
                <span class="summary-label-premium">Subtotal</span>
                <span class="summary-value-premium">R$ ${subtotal.toFixed(2)}</span>
            </div>
            
            ${quantityDiscount > 0 ? `
            <div class="summary-row-premium highlight">
                <span class="summary-label-premium">🎉 Desconto Progressivo</span>
                <span class="summary-value-premium savings">- R$ ${quantityDiscount.toFixed(2)}</span>
            </div>
            ` : ''}
            
            <div class="summary-row-premium">
                <span class="summary-label-premium">Frete</span>
                <span class="summary-value-premium ${shippingCost === 0 ? 'savings' : ''}">
                    ${shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}
                </span>
            </div>
            
            ${totalSavings > 0 ? `
            <div class="summary-row-premium" style="border-bottom: none;">
                <span class="summary-label-premium">💰 Total Economizado</span>
                <span class="summary-value-premium savings">R$ ${totalSavings.toFixed(2)}</span>
            </div>
            ` : ''}
            
            <div class="summary-total-premium">
                <div class="total-label-premium">Total do Pedido</div>
                <div class="total-value-premium">R$ ${total.toFixed(2)}</div>
            </div>
        `;
    }

    // === FUNÇÕES AUXILIARES ULTRA PREMIUM ===
    getTShirtCount() {
        return cartItems.filter(item => 
            item.product.category === 'masculino' || 
            item.product.category === 'unissexo'
        ).length;
    }

    calculateQuantityDiscount(tShirtCount, subtotal) {
        if (tShirtCount >= 3) return subtotal * 0.10;
        if (tShirtCount >= 2) return subtotal * 0.05;
        return 0;
    }

    calculateShippingCost() {
        const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
        return subtotal >= 100 ? 0 : 9.99;
    }

    getNextBenefit(tShirtCount, subtotal) {
        if (tShirtCount < 2) {
            const missing = 2 - tShirtCount;
            return {
                message: `Adicione mais ${missing} camisa(s) para ganhar 5% de desconto!`,
                progress: (tShirtCount / 2) * 100,
                progressText: `${tShirtCount}/2 camisas`
            };
        } else if (tShirtCount < 3) {
            const missing = 3 - tShirtCount;
            return {
                message: `Adicione mais ${missing} camisa(s) para ganhar 10% de desconto!`,
                progress: (tShirtCount / 3) * 100,
                progressText: `${tShirtCount}/3 camisas`
            };
        } else if (subtotal < 100) {
            const missing = 100 - subtotal;
            return {
                message: `Adicione R$ ${missing.toFixed(2)} em produtos para ganhar FRETE GRÁTIS!`,
                progress: (subtotal / 100) * 100,
                progressText: `R$ ${subtotal.toFixed(2)}/R$ 100,00`
            };
        }
        return null;
    }

    getPositionText(position) {
        const positions = {
            'frente': 'Frente',
            'atras': 'Atrás', 
            'ambos': 'Ambos os Lados'
        };
        return positions[position] || position;
    }

    // === AÇÕES DO CARRINHO ===
    removeFromUltraCart(cartId) {
        removeFromCart(cartId);
        this.renderUltraCart();
    }

    increaseQuantity(cartId) {
        // Implementar aumento de quantidade
        console.log('Aumentar quantidade do item:', cartId);
    }

    decreaseQuantity(cartId) {
        // Implementar diminuição de quantidade
        console.log('Diminuir quantidade do item:', cartId);
    }

    // === SISTEMA DE DESCONTOS SUPER PREMIUM ===
    applySuperDiscounts() {
        const categories = ['masculino', 'unissexo', 'canecas'];
        
        categories.forEach(category => {
            if (products[category]) {
                products[category].forEach(product => {
                    // Desconto base aleatório entre 2% e 7%
                    const baseDiscount = (Math.floor(Math.random() * 6) + 2) / 100;
                    
                    // Desconto adicional baseado na popularidade (simulado)
                    const popularityBonus = Math.random() * 0.03;
                    
                    product.discount = baseDiscount + popularityBonus;
                    product.originalPrice = product.variants[Object.keys(product.variants)[0]].price;
                    product.finalPrice = product.originalPrice * (1 - product.discount);
                    
                    // Adicionar badges especiais
                    product.badges = this.generateProductBadges(product);
                    
                    // Atualizar preços nos variants
                    Object.keys(product.variants).forEach(color => {
                        const variant = product.variants[color];
                        variant.originalPrice = variant.price;
                        variant.price = variant.originalPrice * (1 - product.discount);
                    });
                });
            }
        });
        
        console.log('🎯 Descontos Super Premium Aplicados!');
    }

    generateProductBadges(product) {
        const badges = [];
        
        // Badge de desconto principal
        badges.push({
            type: 'discount',
            text: `-${Math.round(product.discount * 100)}% OFF`,
            class: 'discount-badge-premium'
        });

        // Badge progressiva
        badges.push({
            type: 'progressive', 
            text: '👕 Compre 2 → 5% OFF',
            class: 'progressive-badge-premium'
        });

        // Badge de urgência (aleatória)
        if (Math.random() > 0.7) {
            badges.push({
                type: 'urgency',
                text: '🔥 Vendendo Rápido!',
                class: 'urgency-badge-premium'
            });
        }

        return badges;
    }

    // === EVENT LISTENERS PREMIUM ===
    setupPremiumEventListeners() {
        // Integração com sistema existente
        document.addEventListener('cartUpdated', () => {
            this.renderUltraCart();
        });

        document.addEventListener('cartChanged', () => {
            this.renderUltraCart();
        });
    }
}

// Inicializar o sistema ultra premium
document.addEventListener('DOMContentLoaded', function() {
    window.ultraOffersSystem = new UltraOffersSystem();
});