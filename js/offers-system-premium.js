// 🚀 SISTEMA DE OFERTAS ULTRA PREMIUM - WFCUSTOM

class PremiumOffersSystem {
    constructor() {
        this.closedAnnouncements = JSON.parse(localStorage.getItem('closedAnnouncements')) || [];
        this.init();
    }

    init() {
        this.initAnnouncements();
        this.initCartEnhancements();
        this.applyPromotionalPricing();
        this.setupEventListeners();
        
        console.log('🎯 Sistema Premium Iniciado');
    }

    // === SISTEMA DE ANÚNCIOS PREMIUM ===
    initAnnouncements() {
        // Esconder anúncios fechados
        this.closedAnnouncements.forEach(announcement => {
            const element = document.querySelector(`[data-announcement="${announcement}"]`);
            if (element) {
                element.closest('.announcement-card-premium').style.display = 'none';
            }
        });

        // Event listeners para fechar anúncios
        document.querySelectorAll('.announcement-close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const announcement = e.currentTarget.getAttribute('data-announcement');
                this.closeAnnouncement(announcement);
            });
        });

        // Atualizar progresso do frete grátis
        this.updateShippingProgress();
    }

    closeAnnouncement(announcement) {
        const announcementElement = document.querySelector(`[data-announcement="${announcement}"]`);
        if (announcementElement) {
            announcementElement.closest('.announcement-card-premium').style.display = 'none';
            this.closedAnnouncements.push(announcement);
            localStorage.setItem('closedAnnouncements', JSON.stringify(this.closedAnnouncements));
        }
    }

    updateShippingProgress() {
        const subtotal = this.getCartSubtotal();
        const threshold = 100;
        const progress = Math.min((subtotal / threshold) * 100, 100);
        const remaining = Math.max(threshold - subtotal, 0);

        const progressBar = document.getElementById('shipping-progress');
        const remainingText = document.getElementById('shipping-remaining');

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        if (remainingText) {
            remainingText.textContent = remaining.toFixed(2);
        }
    }

    // === MELHORIAS NO CARRINHO ===
    initCartEnhancements() {
        this.enhanceCartItems();
        this.addCartBenefits();
        this.updateCartStats();
    }

    enhanceCartItems() {
        // Adicionar efeitos especiais aos itens do carrinho
        document.querySelectorAll('.cart-item-ultra-premium').forEach(item => {
            // Efeito de brilho ao passar o mouse
            item.addEventListener('mouseenter', () => {
                item.style.background = 'linear-gradient(135deg, #ffffff, #f8fafc)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.background = 'rgba(248, 250, 252, 0.8)';
            });
        });
    }

    addCartBenefits() {
        const cartItems = this.getCartItems();
        const tShirtCount = this.getTShirtCount();
        
        if (cartItems.length > 0) {
            this.showBenefitsSection(tShirtCount);
        }
    }

    showBenefitsSection(tShirtCount) {
        const benefitsHTML = `
            <div class="cart-benefits-system">
                <div class="benefits-header-premium">
                    <h3>🎁 Benefícios Exclusivos</h3>
                    <p>Aproveite estas vantagens ao aumentar seu pedido</p>
                </div>
                <div class="benefits-grid-premium">
                    <div class="benefit-card-premium">
                        <div class="benefit-icon-premium">
                            <i class="fas fa-tags"></i>
                        </div>
                        <h4>Desconto Progressivo</h4>
                        <p>${this.getNextDiscountMessage(tShirtCount)}</p>
                    </div>
                    <div class="benefit-card-premium">
                        <div class="benefit-icon-premium">
                            <i class="fas fa-shipping-fast"></i>
                        </div>
                        <h4>Frete Grátis</h4>
                        <p>${this.getShippingMessage()}</p>
                    </div>
                    <div class="benefit-card-premium">
                        <div class="benefit-icon-premium">
                            <i class="fas fa-gift"></i>
                        </div>
                        <h4>Brinde Surpresa</h4>
                        <p>Pedidos acima de R$ 150 ganham um brinde exclusivo!</p>
                    </div>
                </div>
            </div>
        `;

        const cartContainer = document.querySelector('.cart-container-premium');
        if (cartContainer) {
            const existingBenefits = cartContainer.querySelector('.cart-benefits-system');
            if (existingBenefits) {
                existingBenefits.remove();
            }
            
            const cartItems = cartContainer.querySelector('.cart-items-premium');
            if (cartItems) {
                cartItems.insertAdjacentHTML('afterend', benefitsHTML);
            }
        }
    }

    getNextDiscountMessage(tShirtCount) {
        if (tShirtCount === 1) return 'Adicione mais 1 camisa e ganhe 5% de desconto!';
        if (tShirtCount === 2) return 'Adicione mais 1 camisa e ganhe 10% de desconto!';
        return 'Desconto máximo de 10% aplicado! 🎉';
    }

    getShippingMessage() {
        const subtotal = this.getCartSubtotal();
        const remaining = 100 - subtotal;
        
        if (subtotal >= 100) return 'Parabéns! Frete grátis aplicado!';
        return `Faltam R$ ${remaining.toFixed(2)} para frete grátis`;
    }

    updateCartStats() {
        const subtotal = this.getCartSubtotal();
        const tShirtCount = this.getTShirtCount();
        const savings = this.calculateSavings();

        document.querySelectorAll('.cart-stat-value').forEach(stat => {
            const label = stat.nextElementSibling.textContent.toLowerCase();
            if (label.includes('itens')) {
                stat.textContent = this.getCartItems().length;
            } else if (label.includes('camisas')) {
                stat.textContent = tShirtCount;
            } else if (label.includes('economia')) {
                stat.textContent = `R$ ${savings.totalSavings.toFixed(2)}`;
            }
        });
    }

    // === PREÇOS PROMOCIONAIS ===
    applyPromotionalPricing() {
        // Aplicar preços promocionais em todos os produtos
        Object.values(products).forEach(categoryProducts => {
            categoryProducts.forEach(product => {
                // Calcular preço fake (40% acima do original)
                const originalPrice = product.variants[Object.keys(product.variants)[0]].price;
                product.fakePrice = originalPrice * 1.4;
                
                // Calcular economia aparente
                product.apparentSavings = product.fakePrice - originalPrice;
            });
        });

        // Atualizar cards existentes
        this.updateProductCards();
    }

    updateProductCards() {
        document.querySelectorAll('.grade-card').forEach(card => {
            const productId = parseInt(card.getAttribute('data-product-id'));
            const product = findProductById(productId);
            
            if (product && product.fakePrice) {
                this.enhanceCardPricing(card, product);
            }
        });
    }

    enhanceCardPricing(card, product) {
        const pricingContainer = card.querySelector('.grade-card-pricing');
        if (!pricingContainer) return;

        const originalPrice = product.variants[Object.keys(product.variants)[0]].price;
        const fakePrice = product.fakePrice;
        const savings = product.apparentSavings;
        const savingsPercent = Math.round((savings / fakePrice) * 100);

        // Substituir o conteúdo de preço
        pricingContainer.innerHTML = `
            <div class="grade-card-pricing-promo">
                <div class="original-price-fake">De: R$ ${fakePrice.toFixed(2)}</div>
                <div class="promo-price-container">
                    <div class="grade-card-price-promo">Por: R$ ${originalPrice.toFixed(2)}</div>
                    <div class="promo-savings">Economize ${savingsPercent}%</div>
                </div>
                <div class="promo-tag">OFERTA</div>
            </div>
        `;
    }

    // === FUNÇÕES AUXILIARES ===
    getCartSubtotal() {
        return cartItems.reduce((total, item) => total + item.price, 0);
    }

    getCartItems() {
        return cartItems || [];
    }

    getTShirtCount() {
        return cartItems.filter(item => 
            item.product.category === 'masculino' || 
            item.product.category === 'unissexo'
        ).length;
    }

    calculateSavings() {
        const subtotal = this.getCartSubtotal();
        const tShirtCount = this.getTShirtCount();
        
        let quantityDiscount = 0;
        if (tShirtCount >= 3) quantityDiscount = subtotal * 0.10;
        else if (tShirtCount >= 2) quantityDiscount = subtotal * 0.05;
        
        const shippingSavings = subtotal >= 100 ? 9.99 : 0;
        
        return {
            quantityDiscount,
            shippingSavings,
            totalSavings: quantityDiscount + shippingSavings
        };
    }

    // === EVENT LISTENERS ===
    setupEventListeners() {
        // Atualizar quando o carrinho mudar
        document.addEventListener('cartUpdated', () => {
            this.updateShippingProgress();
            this.addCartBenefits();
            this.updateCartStats();
        });

        // Integração com sistema existente
        this.integrateWithExistingSystem();
    }

    integrateWithExistingSystem() {
        // Sobrescrever funções existentes para incluir melhorias
        const originalRenderCart = window.renderCart;
        if (originalRenderCart) {
            window.renderCart = (...args) => {
                originalRenderCart(...args);
                this.initCartEnhancements();
            };
        }
    }
}

// Inicializar sistema premium
document.addEventListener('DOMContentLoaded', function() {
    window.premiumOffers = new PremiumOffersSystem();
});