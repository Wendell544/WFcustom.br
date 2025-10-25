// 🚀 SISTEMA DE OFERTAS PREMIUM - WFCUSTOM

class OffersSystem {
    constructor() {
        this.currentSlide = 0;
        this.slideInterval = null;
        this.cartFlyoutVisible = false;
        this.offers = {
            shipping: { threshold: 100, discount: 0, type: 'free_shipping' },
            quantity: [
                { min: 2, discount: 0.05, text: '5% de desconto' },
                { min: 3, discount: 0.10, text: '10% de desconto' }
            ],
            productDiscounts: { min: 0.02, max: 0.07 }
        };
        
        this.init();
    }

    init() {
        this.initAnnouncements();
        this.initCartFlyout();
        this.applyProductDiscounts();
        this.setupEventListeners();
        this.initRewardsSystem();
        
        console.log('🚀 Sistema de Ofertas Premium Iniciado');
    }

    // === SISTEMA DE ANÚNCIOS ===
    initAnnouncements() {
        this.slides = document.querySelectorAll('.announcement-slide-premium');
        this.announcementSystem = document.getElementById('announcement-system');
        this.closeBtn = document.getElementById('announcement-close');

        if (this.slides.length === 0) return;

        this.startSlideRotation();

        // Fechar anúncio
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.announcementSystem.style.display = 'none';
                this.pauseSlideRotation();
                localStorage.setItem('announcement_closed', 'true');
            });
        }

        // Verificar se foi fechado anteriormente
        if (localStorage.getItem('announcement_closed') === 'true') {
            this.announcementSystem.style.display = 'none';
        }

        // Pausar ao interagir
        this.announcementSystem.addEventListener('mouseenter', () => this.pauseSlideRotation());
        this.announcementSystem.addEventListener('mouseleave', () => this.startSlideRotation());
    }

    startSlideRotation() {
        if (this.slideInterval) clearInterval(this.slideInterval);
        
        this.slideInterval = setInterval(() => {
            this.showNextSlide();
        }, 3500);
    }

    pauseSlideRotation() {
        if (this.slideInterval) clearInterval(this.slideInterval);
    }

    showNextSlide() {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    // === SISTEMA DE CARRINHO FLYOUT ===
    initCartFlyout() {
        this.flyout = document.getElementById('mini-cart-flyout');
        this.flyoutContent = document.getElementById('flyout-content');
        this.flyoutClose = document.getElementById('flyout-close');
        this.modalOverlay = document.getElementById('modal-overlay');

        if (this.flyoutClose) {
            this.flyoutClose.addEventListener('click', () => this.hideCartFlyout());
        }

        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', () => this.hideCartFlyout());
        }
    }

    showCartFlyout() {
        if (this.flyout && this.modalOverlay) {
            this.flyout.classList.add('active');
            this.modalOverlay.classList.add('active');
            this.cartFlyoutVisible = true;
            this.updateFlyoutContent();
        }
    }

    hideCartFlyout() {
        if (this.flyout && this.modalOverlay) {
            this.flyout.classList.remove('active');
            this.modalOverlay.classList.remove('active');
            this.cartFlyoutVisible = false;
        }
    }

    updateFlyoutContent() {
        if (!this.flyoutContent) return;

        const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
        const tShirtCount = this.getTShirtCount();
        const shippingCost = this.calculateShippingCost();
        const quantityDiscount = this.calculateQuantityDiscount(tShirtCount, subtotal);
        const finalTotal = subtotal - quantityDiscount + shippingCost;

        this.flyoutContent.innerHTML = `
            <div class="dynamic-offer-premium floating-element">
                <div class="dynamic-offer-header-premium">
                    <div class="dynamic-offer-icon-premium">🎯</div>
                    <div class="dynamic-offer-title-premium">Ofertas Ativas</div>
                    <div class="dynamic-offer-badge-premium">${tShirtCount >= 3 ? 'MÁXIMO' : 'ATIVO'}</div>
                </div>
                <div class="dynamic-offer-progress-premium">
                    <div class="dynamic-offer-progress-bar-premium" style="width: ${Math.min((tShirtCount / 3) * 100, 100)}%"></div>
                </div>
                <div class="dynamic-offer-desc-premium">
                    ${this.getDynamicOfferMessage(subtotal, tShirtCount)}
                </div>
            </div>

            <div class="benefits-indicator-premium">
                <div class="benefits-steps-premium">
                    <div class="benefit-step-premium ${tShirtCount >= 1 ? 'active' : ''}">
                        <div class="benefit-icon-premium">
                            <i class="fas ${tShirtCount >= 1 ? 'fa-check' : 'fa-tshirt'}"></i>
                        </div>
                        <div class="benefit-text-premium">1 Camisa</div>
                        <div class="benefit-discount-premium">-2% a 7%</div>
                    </div>
                    <div class="benefit-step-premium ${tShirtCount >= 2 ? 'active' : ''}">
                        <div class="benefit-icon-premium">
                            <i class="fas ${tShirtCount >= 2 ? 'fa-check' : 'fa-tshirt'}"></i>
                        </div>
                        <div class="benefit-text-premium">2 Camisas</div>
                        <div class="benefit-discount-premium">-5%</div>
                    </div>
                    <div class="benefit-step-premium ${tShirtCount >= 3 ? 'active' : ''}">
                        <div class="benefit-icon-premium">
                            <i class="fas ${tShirtCount >= 3 ? 'fa-check' : 'fa-trophy'}"></i>
                        </div>
                        <div class="benefit-text-premium">3+ Camisas</div>
                        <div class="benefit-discount-premium">-10%</div>
                    </div>
                </div>
                <p style="text-align: center; font-size: 0.8rem; color: var(--text-light); margin: 0;">
                    ${tShirtCount < 3 ? 
                      `Adicione mais ${3 - tShirtCount} camisa(s) para 10% de desconto!` : 
                      '🎉 Desconto máximo aplicado!'}
                </p>
            </div>

            ${this.generateRewardsSection(tShirtCount, subtotal)}

            <div class="cart-summary-premium">
                <div class="summary-row-premium">
                    <span>Subtotal:</span>
                    <span>R$ ${subtotal.toFixed(2)}</span>
                </div>
                ${quantityDiscount > 0 ? `
                <div class="summary-row-premium" style="color: var(--success-color);">
                    <span>Desconto Progressivo:</span>
                    <span>- R$ ${quantityDiscount.toFixed(2)}</span>
                </div>
                ` : ''}
                <div class="summary-row-premium">
                    <span>Frete:</span>
                    <span>${shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}</span>
                </div>
                <div class="summary-row-premium summary-total-premium">
                    <span>Total:</span>
                    <span>R$ ${finalTotal.toFixed(2)}</span>
                </div>
            </div>

            <div class="action-buttons-premium" style="margin-top: 1.5rem;">
                <button class="btn btn-primary-premium btn-block" onclick="offersSystem.proceedToCheckout()">
                    <i class="fas fa-lock"></i> Finalizar Compra
                </button>
                <button class="btn btn-outline-premium btn-block" onclick="offersSystem.continueShopping()">
                    <i class="fas fa-shopping-bag"></i> Continuar Comprando
                </button>
            </div>
        `;
    }

    // === SISTEMA DE RECOMPENSAS ===
    initRewardsSystem() {
        this.rewards = {
            firstOrder: { unlocked: false, discount: 0.05 },
            freeShipping: { unlocked: false, threshold: 100 },
            volumeDiscount: { unlocked: false, minItems: 3 }
        };
    }

    generateRewardsSection(tShirtCount, subtotal) {
        const unlockedRewards = [];
        
        if (tShirtCount >= 2) unlockedRewards.push('5% de desconto em 2 camisas');
        if (tShirtCount >= 3) unlockedRewards.push('10% de desconto em 3+ camisas');
        if (subtotal >= 100) unlockedRewards.push('Frete grátis');

        if (unlockedRewards.length === 0) return '';

        return `
            <div class="rewards-system-premium">
                <div class="rewards-header-premium">
                    <div class="rewards-title-premium">🎁 Suas Recompensas</div>
                    <p style="font-size: 0.8rem; opacity: 0.8; margin: 0;">Benefícios desbloqueados</p>
                </div>
                <div class="rewards-grid-premium">
                    ${unlockedRewards.map(reward => `
                        <div class="reward-item-premium glow-element">
                            <div class="reward-icon-premium">✅</div>
                            <div class="reward-desc-premium">${reward}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // === SISTEMA DE DESCONTOS NOS PRODUTOS ===
    applyProductDiscounts() {
        const categories = ['masculino', 'unissexo', 'canecas'];
        
        categories.forEach(category => {
            if (products[category]) {
                products[category].forEach(product => {
                    const discount = this.generateProductDiscount();
                    product.originalPrice = product.variants[Object.keys(product.variants)[0]].price;
                    product.discount = discount;
                    product.finalPrice = product.originalPrice * (1 - discount);
                    
                    // Atualizar preço nos variants
                    Object.keys(product.variants).forEach(color => {
                        const variant = product.variants[color];
                        variant.originalPrice = variant.price;
                        variant.price = variant.originalPrice * (1 - discount);
                    });
                });
            }
        });
        
        console.log('✅ Descontos aplicados em todos os produtos');
    }

    generateProductDiscount() {
        // Descontos entre 2% e 7%
        return (Math.floor(Math.random() * 6) + 2) / 100;
    }

    // === FUNÇÕES AUXILIARES ===
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
        // Simulação - na implementação real, isso viria do sistema de frete
        const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
        return subtotal >= 100 ? 0 : 9.99;
    }

    getDynamicOfferMessage(subtotal, tShirtCount) {
        if (tShirtCount === 0) {
            return 'Adicione sua primeira camisa e ganhe descontos progressivos!';
        } else if (tShirtCount === 1) {
            const missing = 100 - subtotal;
            if (missing > 0) {
                return `Faltam R$ ${missing.toFixed(2)} para frete grátis! Adicione mais uma camisa e ganhe 5% de desconto.`;
            }
            return 'Adicione mais uma camisa e ganhe 5% de desconto!';
        } else if (tShirtCount === 2) {
            return '🎉 Você ganhou 5% de desconto! Adicione mais uma camisa para 10% de desconto.';
        } else {
            return '🎊 Desconto máximo de 10% aplicado! Frete grátis ativo.';
        }
    }

    // === AÇÕES DO USUÁRIO ===
    proceedToCheckout() {
        this.hideCartFlyout();
        showLocation();
    }

    continueShopping() {
        this.hideCartFlyout();
        showHome();
    }

    // === EVENT LISTENERS ===
    setupEventListeners() {
        // Abrir flyout ao adicionar item
        document.addEventListener('cartUpdated', () => {
            this.showCartFlyout();
            this.updateProductBadges();
        });

        // Atualizar ofertas quando o carrinho mudar
        document.addEventListener('cartChanged', () => {
            this.updateFlyoutContent();
        });

        // Integração com o sistema existente
        this.integrateWithExistingSystem();
    }

    integrateWithExistingSystem() {
        // Sobrescrever função addToCart para incluir nosso sistema
        const originalAddToCart = window.addToCart;
        window.addToCart = (...args) => {
            originalAddToCart(...args);
            document.dispatchEvent(new CustomEvent('cartUpdated'));
        };
    }

    updateProductBadges() {
        // Atualizar badges nos produtos baseado no carrinho
        document.querySelectorAll('.grade-card').forEach(card => {
            const productId = parseInt(card.getAttribute('data-product-id'));
            const product = findProductById(productId);
            
            if (product && product.discount) {
                let badge = card.querySelector('.advanced-discount-badge-premium');
                if (!badge) {
                    badge = document.createElement('div');
                    badge.className = 'advanced-discount-badge-premium';
                    card.querySelector('.image-container').appendChild(badge);
                }
                badge.textContent = `-${Math.round(product.discount * 100)}% OFF`;
            }
        });
    }

    // === API PARA INTEGRAÇÃO ===
    getActiveOffers() {
        const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
        const tShirtCount = this.getTShirtCount();
        
        return {
            quantityDiscount: this.calculateQuantityDiscount(tShirtCount, subtotal),
            freeShipping: subtotal >= 100,
            productDiscounts: this.offers.productDiscounts,
            nextMilestone: tShirtCount < 3 ? 3 - tShirtCount : null
        };
    }

    calculateSavings() {
        const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
        const tShirtCount = this.getTShirtCount();
        const quantityDiscount = this.calculateQuantityDiscount(tShirtCount, subtotal);
        const shippingSavings = subtotal >= 100 ? 9.99 : 0;
        
        return {
            quantityDiscount,
            shippingSavings,
            totalSavings: quantityDiscount + shippingSavings
        };
    }
}

// Inicializar o sistema quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    window.offersSystem = new OffersSystem();
});

// Integração com o sistema existente
if (typeof updateCartCount === 'function') {
    const originalUpdateCartCount = updateCartCount;
    window.updateCartCount = function() {
        originalUpdateCartCount();
        document.dispatchEvent(new CustomEvent('cartChanged'));
    };
}