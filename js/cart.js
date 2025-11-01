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

// Adicionar produto ao carrinho - FUNÇÃO CORRIGIDA
function addToCart(product, color, size, position, price) {
    const cartItem = {
        id: Date.now(),
        product: product,
        color: color,
        size: size,
        position: position,
        price: price
    };
    
    cartItems.push(cartItem);
    updateCartCount();
    saveCartToLocalStorage();
    
    // ATUALIZAÇÃO IMEDIATA DO CARRINHO SE ESTIVER VISÍVEL
    if (document.getElementById('cart-page').classList.contains('active')) {
        renderCart();
    }
    
    // Mostrar notificação
    showCartNotification(product.name);
}

// Remover item do carrinho
function removeFromCart(cartId) {
    cartItems = cartItems.filter(item => item.id != cartId);
    updateCartCount();
    saveCartToLocalStorage();
    renderCart();
}

// Mostrar notificação de produto adicionado
function showCartNotification(productName) {
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
        background: var(--success-color);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
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

// Renderizar carrinho - FUNÇÃO OTIMIZADA
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-premium">
                <i class="fas fa-shopping-cart"></i>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione alguns produtos para continuar</p>
            </div>
        `;
        
        if (cartSummary) cartSummary.innerHTML = '';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }
    
    // Atualizar estatísticas do header
    updateCartStats();
    
    // Renderizar itens do carrinho com novo design
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item-ultra-premium';
        cartItemElement.setAttribute('data-cart-id', item.id);
        
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
            <img src="${item.product.variants[item.color].image}" alt="${item.product.name}" class="cart-item-image-ultra">
            <div class="cart-item-details-ultra">
                <h3>${item.product.name}</h3>
                <div class="cart-item-specs">
                    <span class="cart-item-spec">Cor: ${item.color}</span>
                    <span class="cart-item-spec">Tamanho: ${item.size}</span>
                    ${item.position && item.product.category !== 'canecas' ? `<span class="cart-item-spec">Estampa: ${positionText}</span>` : ''}
                </div>
                <div class="cart-item-price-ultra">R$ ${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions-ultra">
                <button class="remove-item-ultra" data-cart-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Adicionar event listeners para remover itens
    document.querySelectorAll('.remove-item-ultra').forEach(button => {
        button.onclick = (e) => {
            const cartId = e.currentTarget.getAttribute('data-cart-id');
            removeFromCart(cartId);
        };
    });
    
    // Renderizar resumo do carrinho
    renderCartSummary();
    
    if (checkoutBtn) checkoutBtn.disabled = false;
}

// Atualizar estatísticas do header do carrinho
function updateCartStats() {
    const cartStatItems = document.querySelector('.cart-stats-premium .cart-stat:nth-child(1) .cart-stat-value');
    const cartStatShirts = document.querySelector('.cart-stats-premium .cart-stat:nth-child(2) .cart-stat-value');
    const cartStatSavings = document.querySelector('.cart-stats-premium .cart-stat:nth-child(3) .cart-stat-value');
    
    if (cartStatItems) cartStatItems.textContent = cartItems.length;
    
    // Calcular quantidade de camisetas
    const tShirtCount = cartItems.filter(item => 
        item.product.category === 'masculino' || item.product.category === 'unissexo'
    ).length;
    
    if (cartStatShirts) cartStatShirts.textContent = tShirtCount;
    
    // Calcular economia total
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    let quantityDiscount = 0;
    
    if (tShirtCount >= 3) {
        quantityDiscount = subtotal * 0.10;
    } else if (tShirtCount >= 2) {
        quantityDiscount = subtotal * 0.05;
    }
    
    if (cartStatSavings) cartStatSavings.textContent = `R$ ${quantityDiscount.toFixed(2)}`;
}

// Renderizar resumo do carrinho - VERSÃO CORRIGIDA SEM FRETE NO RESUMO
function renderCartSummary() {
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartDiscount = document.getElementById('cart-discount');
    const cartTotal = document.getElementById('cart-total');
    const totalSavings = document.getElementById('total-savings');
    const freeShippingMessage = document.getElementById('free-shipping-message');
    
    if (!cartSubtotal) {
        console.error('Elementos do resumo do carrinho não encontrados!');
        return;
    }

    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    
    // Calcular quantidade de camisetas para desconto progressivo
    const tShirtCount = cartItems.filter(item => 
        item.product.category === 'masculino' || item.product.category === 'unissexo'
    ).length;

    // Calcular desconto progressivo CORRETO
    let quantityDiscount = 0;
    if (tShirtCount >= 3) {
        quantityDiscount = subtotal * 0.10; // 10% de desconto
    } else if (tShirtCount >= 2) {
        quantityDiscount = subtotal * 0.05; // 5% de desconto
    }

    // Calcular total (sem mostrar frete no resumo)
    const total = subtotal - quantityDiscount;
    
    // ATUALIZAR ELEMENTOS DO CARRINHO - CORREÇÃO
    if (cartSubtotal) cartSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (cartDiscount) cartDiscount.textContent = `- R$ ${quantityDiscount.toFixed(2)}`;
    if (cartTotal) {
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }
    if (totalSavings) totalSavings.textContent = `R$ ${quantityDiscount.toFixed(2)}`;
    
    // Mostrar mensagem de frete grátis se subtotal for >= 100
    if (freeShippingMessage) {
        if (subtotal >= 100) {
            freeShippingMessage.style.display = 'block';
        } else {
            freeShippingMessage.style.display = 'none';
        }
    }
    
    console.log('Resumo do carrinho atualizado:', {
        subtotal,
        quantityDiscount,
        total,
        items: cartItems.length
    });
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
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
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

// Finalizar pedido
function finalizeOrder() {
    if (cartItems.length === 0) return;
    
    const phoneNumber = '5583999667578';
    const city = document.getElementById('city').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const street = document.getElementById('street').value;
    const address = document.getElementById('address').value;
    
    if (!city || !neighborhood || !street || !address) {
        alert('Por favor, preencha todos os campos do endereço.');
        return;
    }
    
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked');
    const deliveryType = deliveryMethod ? deliveryMethod.value : 'delivery';
    
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const tShirtCount = cartItems.filter(item => 
        item.product.category === 'masculino' || item.product.category === 'unissexo'
    ).length;

    let quantityDiscount = 0;
    if (tShirtCount >= 3) {
        quantityDiscount = subtotal * 0.10;
    } else if (tShirtCount >= 2) {
        quantityDiscount = subtotal * 0.05;
    }

    let shippingCost = 9.99;
    if (city.toLowerCase().includes('são bento') || city.toLowerCase().includes('sao bento')) {
        shippingCost = deliveryType === 'pickup' ? 0 : 4.00;
    }
    
    // Aplicar frete grátis se subtotal for >= 100
    if (subtotal >= 100) {
        shippingCost = 0;
    }
    
    const totalPrice = subtotal - quantityDiscount + shippingCost;
    
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
        message += `   • Preço: R$ ${item.price.toFixed(2)}%0A%0A`;
    });
    
    message += `*Resumo do Pedido:*%0A`;
    message += `Subtotal: R$ ${subtotal.toFixed(2)}%0A`;
    if (quantityDiscount > 0) {
        message += `Desconto Progressivo: -R$ ${quantityDiscount.toFixed(2)}%0A`;
    }
    message += `Frete: ${shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}%0A`;
    message += `*Total: R$ ${totalPrice.toFixed(2)}*%0A%0A`;
    
    message += `*Dados de Entrega:*%0A`;
    message += `Cidade: ${city}%0A`;
    message += `Bairro: ${neighborhood}%0A`;
    message += `Rua: ${street}%0A`;
    message += `Número/Complemento: ${address}%0A`;
    message += `Entrega: ${deliveryType === 'delivery' ? 'Entregar no endereço' : 'Retirar no local'}%0A%0A`;
    
    message += `_Pedido gerado automaticamente pelo site_`;
    
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
    
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

// Expor funções globalmente
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
window.removeFromCart = removeFromCart;
window.renderCart = renderCart;
window.calculateShipping = calculateShipping;
window.finalizeOrder = finalizeOrder;