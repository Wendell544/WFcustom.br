// Variáveis do carrinho
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Atualizar contador do carrinho
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

// Salvar carrinho no localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Adicionar produto ao carrinho - FUNÇÃO COMPLETAMENTE CORRIGIDA
function addToCart(product, color, size, position, price) {
    console.log('🛒 Adicionando ao carrinho:', product.name);
    
    // Verificar se o produto já existe para evitar duplicatas
    const existingItemIndex = cartItems.findIndex(item => 
        item.product.id === product.id && 
        item.color === color && 
        item.size === size && 
        item.position === position
    );
    
    if (existingItemIndex !== -1) {
        // Se já existe, atualiza a quantidade (se necessário) ou mantém
        console.log('Produto já existe no carrinho, mantendo original');
    } else {
        const cartItem = {
            id: Date.now() + Math.random(), // ID mais único
            product: product,
            color: color,
            size: size,
            position: position,
            price: price
        };
        
        cartItems.push(cartItem);
        console.log('✅ Produto adicionado:', cartItem);
    }
    
    saveCartToLocalStorage();
    updateCartCount();
    
    // ATUALIZAÇÃO IMEDIATA E CONFIÁVEL DO CARRINHO
    setTimeout(() => {
        if (document.getElementById('cart-page') && document.getElementById('cart-page').classList.contains('active')) {
            console.log('🔄 Carrinho visível - renderizando imediatamente');
            renderCart();
        }
    }, 100);
    
    // Mostrar notificação
    showCartNotification(product.name);
    
    console.log('📊 Carrinho atualizado:', cartItems.length, 'itens');
}

// Remover item do carrinho - FUNÇÃO CORRIGIDA
function removeFromCart(cartId) {
    console.log('🗑️ Removendo item:', cartId);
    
    // Converter para número para comparação correta
    cartId = parseInt(cartId);
    cartItems = cartItems.filter(item => item.id !== cartId);
    
    updateCartCount();
    saveCartToLocalStorage();
    
    // Renderização IMEDIATA e CONFIÁVEL
    setTimeout(() => {
        renderCart();
    }, 50);
    
    console.log('✅ Item removido. Carrinho agora tem:', cartItems.length, 'itens');
}

// Mostrar notificação de produto adicionado
function showCartNotification(productName) {
    // Remover notificações existentes
    const existingNotifications = document.querySelectorAll('.cart-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${productName} adicionado ao carrinho!</span>
        </div>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: Arial, sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Renderizar carrinho - FUNÇÃO COMPLETAMENTE REESCRITA
function renderCart() {
    console.log('🎨 Renderizando carrinho...');
    
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartItemsContainer) {
        console.error('❌ Container do carrinho não encontrado!');
        return;
    }
    
    // Limpar container
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        console.log('🛒 Carrinho vazio');
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-premium" style="text-align: center; padding: 40px 20px; color: #666;">
                <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 20px; color: #ccc;"></i>
                <h3 style="margin-bottom: 10px; color: #333;">Seu carrinho está vazio</h3>
                <p style="color: #888;">Adicione alguns produtos para continuar</p>
            </div>
        `;
        
        if (cartSummary) cartSummary.innerHTML = '';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }
    
    console.log(`📦 Renderizando ${cartItems.length} itens`);
    
    // Atualizar estatísticas do header
    updateCartStats();
    
    // Renderizar itens do carrinho
    cartItems.forEach(item => {
        try {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item-ultra-premium';
            cartItemElement.setAttribute('data-cart-id', item.id);
            
            // Verificar se o produto e variant existem
            if (!item.product || !item.product.variants || !item.product.variants[item.color]) {
                console.error('❌ Produto ou variante inválido:', item);
                return;
            }
            
            // Converter posição para texto amigável
            let positionText = '';
            if (item.position && item.product.category !== 'canecas') {
                switch(item.position) {
                    case 'frente': positionText = 'Frente'; break;
                    case 'atras': positionText = 'Atrás'; break;
                    case 'ambos': positionText = 'Ambos'; break;
                    default: positionText = item.position;
                }
            }
            
            cartItemElement.innerHTML = `
                <img src="${item.product.variants[item.color].image}" alt="${item.product.name}" 
                     class="cart-item-image-ultra" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                <div class="cart-item-details-ultra" style="flex: 1; margin-left: 15px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #333;">${item.product.name}</h3>
                    <div class="cart-item-specs" style="display: flex; flex-direction: column; gap: 4px;">
                        <span class="cart-item-spec" style="font-size: 14px; color: #666;">Cor: ${item.color}</span>
                        <span class="cart-item-spec" style="font-size: 14px; color: #666;">Tamanho: ${item.size}</span>
                        ${item.position && item.product.category !== 'canecas' ? 
                            `<span class="cart-item-spec" style="font-size: 14px; color: #666;">Estampa: ${positionText}</span>` : ''}
                    </div>
                    <div class="cart-item-price-ultra" style="font-weight: bold; color: #2c5aa0; margin-top: 8px;">
                        R$ ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
                    </div>
                </div>
                <div class="cart-item-actions-ultra" style="margin-left: 15px;">
                    <button class="remove-item-ultra" data-cart-id="${item.id}" 
                            style="background: #dc3545; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        } catch (error) {
            console.error('❌ Erro ao renderizar item:', item, error);
        }
    });
    
    // Adicionar event listeners para remover itens - CORRIGIDO
    setTimeout(() => {
        document.querySelectorAll('.remove-item-ultra').forEach(button => {
            button.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const cartId = e.currentTarget.getAttribute('data-cart-id');
                console.log('🔘 Clicou em remover:', cartId);
                removeFromCart(cartId);
            };
        });
    }, 100);
    
    // Renderizar resumo do carrinho
    renderCartSummary();
    
    if (checkoutBtn) checkoutBtn.disabled = false;
    
    console.log('✅ Carrinho renderizado com sucesso');
}

// Atualizar estatísticas do header do carrinho
function updateCartStats() {
    const cartStatItems = document.querySelector('.cart-stats-premium .cart-stat:nth-child(1) .cart-stat-value');
    const cartStatShirts = document.querySelector('.cart-stats-premium .cart-stat:nth-child(2) .cart-stat-value');
    const cartStatSavings = document.querySelector('.cart-stats-premium .cart-stat:nth-child(3) .cart-stat-value');
    
    if (cartStatItems) cartStatItems.textContent = cartItems.length;
    
    // Calcular quantidade de camisetas
    const tShirtCount = cartItems.filter(item => 
        item.product && (item.product.category === 'masculino' || item.product.category === 'unissexo')
    ).length;
    
    if (cartStatShirts) cartStatShirts.textContent = tShirtCount;
    
    // Calcular economia total
    const subtotal = cartItems.reduce((total, item) => total + (item.price || 0), 0);
    let quantityDiscount = 0;
    
    if (tShirtCount >= 3) {
        quantityDiscount = subtotal * 0.10;
    } else if (tShirtCount >= 2) {
        quantityDiscount = subtotal * 0.05;
    }
    
    if (cartStatSavings) cartStatSavings.textContent = `R$ ${quantityDiscount.toFixed(2)}`;
}

// Renderizar resumo do carrinho - COMPLETAMENTE CORRIGIDO
function renderCartSummary() {
    console.log('💰 Renderizando resumo do carrinho...');
    
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartDiscount = document.getElementById('cart-discount');
    const cartTotal = document.getElementById('cart-total');
    const totalSavings = document.getElementById('total-savings');
    const freeShippingMessage = document.getElementById('free-shipping-message');
    
    if (!cartSubtotal) {
        console.error('❌ Elementos do resumo do carrinho não encontrados!');
        return;
    }

    // Calcular totais com validação
    const subtotal = cartItems.reduce((total, item) => {
        return total + (typeof item.price === 'number' ? item.price : 0);
    }, 0);
    
    console.log('📊 Subtotal calculado:', subtotal);
    
    // Calcular quantidade de camisetas para desconto progressivo
    const tShirtCount = cartItems.filter(item => 
        item.product && (item.product.category === 'masculino' || item.product.category === 'unissexo')
    ).length;

    // Calcular desconto progressivo
    let quantityDiscount = 0;
    if (tShirtCount >= 3) {
        quantityDiscount = subtotal * 0.10;
    } else if (tShirtCount >= 2) {
        quantityDiscount = subtotal * 0.05;
    }

    // Calcular total
    const total = Math.max(0, subtotal - quantityDiscount);
    
    console.log('🎯 Desconto:', quantityDiscount, 'Total:', total);
    
    // ATUALIZAR ELEMENTOS DO CARRINHO - COM FALLBACKS
    if (cartSubtotal) {
        cartSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
        cartSubtotal.style.display = 'block';
    }
    
    if (cartDiscount) {
        if (quantityDiscount > 0) {
            cartDiscount.textContent = `- R$ ${quantityDiscount.toFixed(2)}`;
            cartDiscount.style.display = 'block';
        } else {
            cartDiscount.style.display = 'none';
        }
    }
    
    if (cartTotal) {
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
        cartTotal.style.display = 'block';
    }
    
    if (totalSavings) {
        totalSavings.textContent = `R$ ${quantityDiscount.toFixed(2)}`;
    }
    
    // Mostrar mensagem de frete grátis se subtotal for >= 100
    if (freeShippingMessage) {
        if (subtotal >= 100) {
            freeShippingMessage.style.display = 'block';
        } else {
            freeShippingMessage.style.display = 'none';
        }
    }
    
    // Garantir que o resumo seja visível
    const cartSummaryElement = document.getElementById('cart-summary');
    if (cartSummaryElement) {
        cartSummaryElement.style.display = 'block';
    }
    
    console.log('✅ Resumo do carrinho renderizado com sucesso');
}

// Calcular frete (apenas para a página de localização)
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
    
    // Aplicar frete grátis se subtotal for >= 100
    const subtotal = cartItems.reduce((total, item) => total + (item.price || 0), 0);
    if (subtotal >= 100) {
        shippingCost = 0;
    }
    
    const shippingPrice = document.getElementById('shipping-price');
    const shippingPriceContainer = document.querySelector('.shipping-price-premium');
    
    if (shippingPrice) shippingPrice.textContent = shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`;
    if (shippingPriceContainer) shippingPriceContainer.style.display = 'block';
    
    // Salvar informações de entrega no localStorage
    localStorage.setItem('userCity', cityValue);
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked');
    if (deliveryMethod) {
        localStorage.setItem('deliveryMethod', deliveryMethod.value);
    }
}

// Finalizar pedido - FUNÇÃO CORRIGIDA
function finalizeOrder() {
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const phoneNumber = '5583999667578';
    const city = document.getElementById('city');
    const neighborhood = document.getElementById('neighborhood');
    const street = document.getElementById('street');
    const address = document.getElementById('address');
    
    if (!city || !neighborhood || !street || !address) {
        alert('Por favor, preencha todos os campos do endereço.');
        return;
    }
    
    const cityValue = city.value;
    const neighborhoodValue = neighborhood.value;
    const streetValue = street.value;
    const addressValue = address.value;
    
    if (!cityValue || !neighborhoodValue || !streetValue || !addressValue) {
        alert('Por favor, preencha todos os campos do endereço.');
        return;
    }
    
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked');
    const deliveryType = deliveryMethod ? deliveryMethod.value : 'delivery';
    
    const subtotal = cartItems.reduce((total, item) => total + (item.price || 0), 0);
    const tShirtCount = cartItems.filter(item => 
        item.product && (item.product.category === 'masculino' || item.product.category === 'unissexo')
    ).length;

    let quantityDiscount = 0;
    if (tShirtCount >= 3) {
        quantityDiscount = subtotal * 0.10;
    } else if (tShirtCount >= 2) {
        quantityDiscount = subtotal * 0.05;
    }

    let shippingCost = 9.99;
    if (cityValue.toLowerCase().includes('são bento') || cityValue.toLowerCase().includes('sao bento')) {
        shippingCost = deliveryType === 'pickup' ? 0 : 4.00;
    }
    
    // Aplicar frete grátis se subtotal for >= 100
    if (subtotal >= 100) {
        shippingCost = 0;
    }
    
    const totalPrice = Math.max(0, subtotal - quantityDiscount + shippingCost);
    
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
        message += `   • Preço: R$ ${(item.price || 0).toFixed(2)}%0A%0A`;
    });
    
    message += `*Resumo do Pedido:*%0A`;
    message += `Subtotal: R$ ${subtotal.toFixed(2)}%0A`;
    if (quantityDiscount > 0) {
        message += `Desconto Progressivo: -R$ ${quantityDiscount.toFixed(2)}%0A`;
    }
    message += `Frete: ${shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}%0A`;
    message += `*Total: R$ ${totalPrice.toFixed(2)}*%0A%0A`;
    
    message += `*Dados de Entrega:*%0A`;
    message += `Cidade: ${cityValue}%0A`;
    message += `Bairro: ${neighborhoodValue}%0A`;
    message += `Rua: ${streetValue}%0A`;
    message += `Número/Complemento: ${addressValue}%0A`;
    message += `Entrega: ${deliveryType === 'delivery' ? 'Entregar no endereço' : 'Retirar no local'}%0A%0A`;
    
    message += `_Pedido gerado automaticamente pelo site_`;
    
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
    
    // Limpar carrinho APÓS envio bem-sucedido
    cartItems = [];
    updateCartCount();
    saveCartToLocalStorage();
    
    const confirmationModal = document.getElementById('confirmation-modal');
    if (confirmationModal) confirmationModal.style.display = 'flex';
    
    showHome();
}

// Função para mostrar a página inicial
function showHome() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const homePage = document.getElementById('home-page');
    if (homePage) homePage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializar carrinho quando a página carregar
function initializeCart() {
    console.log('🔄 Inicializando carrinho...');
    
    // Carregar itens do localStorage
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
        try {
            cartItems = JSON.parse(savedCartItems);
            console.log('📦 Carrinho carregado:', cartItems.length, 'itens');
        } catch (error) {
            console.error('❌ Erro ao carregar carrinho:', error);
            cartItems = [];
        }
    }
    
    updateCartCount();
    
    // Renderizar carrinho se estiver na página do carrinho
    setTimeout(() => {
        if (document.getElementById('cart-page') && document.getElementById('cart-page').classList.contains('active')) {
            renderCart();
        }
    }, 500);
}

// Expor funções globalmente
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
window.removeFromCart = removeFromCart;
window.renderCart = renderCart;
window.calculateShipping = calculateShipping;
window.finalizeOrder = finalizeOrder;
window.initializeCart = initializeCart;

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Carregado - Inicializando carrinho...');
    initializeCart();
});