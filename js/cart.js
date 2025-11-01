// Variáveis do carrinho
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Atualizar contador do carrinho - FUNÇÃO REVISADA
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
        console.log('Contador atualizado:', cartItems.length, 'itens');
    }
}

// Salvar carrinho no localStorage - FUNÇÃO REVISADA
function saveCartToLocalStorage() {
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Carrinho salvo no localStorage:', cartItems.length, 'itens');
    } catch (error) {
        console.error('Erro ao salvar carrinho:', error);
    }
}

// Adicionar produto ao carrinho - FUNÇÃO COMPLETAMENTE REVISADA
function addToCart(product, color, size, position, price) {
    console.log('🛒 Adicionando ao carrinho:', product.name);
    
    // Validar dados do produto
    if (!product || !product.name) {
        console.error('Produto inválido:', product);
        return false;
    }
    
    const cartItem = {
        id: Date.now() + Math.random(), // ID mais único
        product: {
            id: product.id,
            name: product.name,
            category: product.category,
            description: product.description,
            discount: product.discount,
            variants: product.variants
        },
        color: color || 'branco',
        size: size || 'P',
        position: position || 'frente',
        price: price || product.variants[color]?.price || 0
    };
    
    cartItems.push(cartItem);
    saveCartToLocalStorage();
    updateCartCount();
    
    // ATUALIZAÇÃO IMEDIATA DO CARRINHO SE ESTIVER VISÍVEL
    if (document.getElementById('cart-page') && document.getElementById('cart-page').classList.contains('active')) {
        console.log('Carrinho visível - renderizando imediatamente');
        renderCart();
    }
    
    // Mostrar notificação - AGORA FUNCIONANDO
    showCartNotification(product.name);
    
    console.log('✅ Carrinho atualizado:', cartItems.length, 'itens');
    return true;
}

// Remover item do carrinho - FUNÇÃO REVISADA
function removeFromCart(cartId) {
    console.log('🗑️ Removendo item:', cartId);
    const initialLength = cartItems.length;
    cartItems = cartItems.filter(item => item.id != cartId);
    
    if (cartItems.length < initialLength) {
        updateCartCount();
        saveCartToLocalStorage();
        renderCart();
        console.log('✅ Item removido. Itens restantes:', cartItems.length);
    } else {
        console.error('❌ Item não encontrado para remover:', cartId);
    }
}

// Mostrar notificação de produto adicionado - FUNÇÃO REVISADA
function showCartNotification(productName) {
    console.log('🔔 Mostrando notificação para:', productName);
    
    // Remover notificações existentes
    const existingNotifications = document.querySelectorAll('.cart-notification');
    existingNotifications.forEach(notification => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
    
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

// Renderizar carrinho - FUNÇÃO COMPLETAMENTE REVISADA
function renderCart() {
    console.log('🎨 Renderizando carrinho...', cartItems.length, 'itens');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartItemsContainer) {
        console.error('❌ Container do carrinho não encontrado!');
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-premium" style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-shopping-cart" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">Seu carrinho está vazio</h3>
                <p style="color: #999;">Adicione alguns produtos para continuar</p>
            </div>
        `;
        
        if (cartSummary) cartSummary.innerHTML = '';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }
    
    // Atualizar estatísticas do header
    updateCartStats();
    
    // Renderizar itens do carrinho
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item-ultra-premium';
        cartItemElement.setAttribute('data-cart-id', item.id);
        
        // Garantir que o produto existe
        if (!item.product) {
            console.error('❌ Produto inválido no carrinho:', item);
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
        
        // Usar imagem padrão se não disponível
        const imageSrc = item.product.variants && item.product.variants[item.color] && item.product.variants[item.color].image 
            ? item.product.variants[item.color].image 
            : 'https://via.placeholder.com/100x100?text=Produto';
        
        cartItemElement.innerHTML = `
            <img src="${imageSrc}" alt="${item.product.name}" class="cart-item-image-ultra" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
            <div class="cart-item-details-ultra" style="flex: 1; margin-left: 15px;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px;">${item.product.name || 'Produto'}</h3>
                <div class="cart-item-specs" style="display: flex; flex-direction: column; gap: 4px;">
                    <span class="cart-item-spec" style="font-size: 14px; color: #666;">Cor: ${item.color || 'N/A'}</span>
                    <span class="cart-item-spec" style="font-size: 14px; color: #666;">Tamanho: ${item.size || 'N/A'}</span>
                    ${item.position && item.product.category !== 'canecas' ? `<span class="cart-item-spec" style="font-size: 14px; color: #666;">Estampa: ${positionText}</span>` : ''}
                </div>
                <div class="cart-item-price-ultra" style="font-weight: bold; color: #e74c3c; margin-top: 8px;">R$ ${(item.price || 0).toFixed(2)}</div>
            </div>
            <div class="cart-item-actions-ultra">
                <button class="remove-item-ultra" data-cart-id="${item.id}" style="background: #e74c3c; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Adicionar event listeners para remover itens
    document.querySelectorAll('.remove-item-ultra').forEach(button => {
        button.onclick = (e) => {
            e.stopPropagation();
            const cartId = e.currentTarget.getAttribute('data-cart-id');
            removeFromCart(cartId);
        };
    });
    
    // Renderizar resumo do carrinho
    renderCartSummary();
    
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
    }
    
    console.log('✅ Carrinho renderizado com', cartItems.length, 'itens');
}

// Atualizar estatísticas do header do carrinho - FUNÇÃO REVISADA
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

// Renderizar resumo do carrinho - FUNÇÃO COMPLETAMENTE REVISADA
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

    const subtotal = cartItems.reduce((total, item) => total + (item.price || 0), 0);
    
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
    const total = subtotal - quantityDiscount;
    
    console.log('📊 Resumo:', { subtotal, quantityDiscount, total, tShirtCount });
    
    // ATUALIZAR ELEMENTOS DO CARRINHO
    if (cartSubtotal) cartSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (cartDiscount) cartDiscount.textContent = `- R$ ${quantityDiscount.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    if (totalSavings) totalSavings.textContent = `R$ ${quantityDiscount.toFixed(2)}`;
    
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
        cartSummaryElement.style.opacity = '1';
        cartSummaryElement.style.visibility = 'visible';
    }
}

// Calcular frete - FUNÇÃO REVISADA
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

// Finalizar pedido - FUNÇÃO COMPLETAMENTE CORRIGIDA
function finalizeOrder() {
    console.log('🚀 FINALIZAR PEDIDO: Iniciando processo...');
    
    // Verificar se há itens no carrinho
    if (cartItems.length === 0) {
        alert('❌ Seu carrinho está vazio! Adicione produtos antes de finalizar o pedido.');
        return false;
    }
    
    // Capturar elementos do formulário
    const city = document.getElementById('city');
    const neighborhood = document.getElementById('neighborhood');
    const street = document.getElementById('street');
    const address = document.getElementById('address');
    
    if (!city || !neighborhood || !street || !address) {
        alert('❌ Campos de endereço não encontrados!');
        return false;
    }
    
    const cityValue = city.value.trim();
    const neighborhoodValue = neighborhood.value.trim();
    const streetValue = street.value.trim();
    const addressValue = address.value.trim();
    
    // Validar campos obrigatórios
    if (!cityValue || !neighborhoodValue || !streetValue || !addressValue) {
        alert('❌ Por favor, preencha todos os campos do endereço!');
        return false;
    }
    
    console.log('✅ Dados do endereço validados:', {
        cidade: cityValue,
        bairro: neighborhoodValue,
        rua: streetValue,
        endereco: addressValue
    });
    
    // Obter método de entrega
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked');
    const deliveryType = deliveryMethod ? deliveryMethod.value : 'delivery';
    
    console.log('📦 Método de entrega:', deliveryType);
    
    // Calcular totais
    const subtotal = cartItems.reduce((total, item) => total + (item.price || 0), 0);
    
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

    // Calcular frete
    let shippingCost = 9.99;
    if (cityValue.toLowerCase().includes('são bento') || cityValue.toLowerCase().includes('sao bento')) {
        shippingCost = deliveryType === 'pickup' ? 0 : 4.00;
    }
    
    // Aplicar frete grátis se subtotal for >= 100
    if (subtotal >= 100) {
        shippingCost = 0;
    }
    
    const totalPrice = subtotal - quantityDiscount + shippingCost;
    
    console.log('💰 Totais calculados:', {
        subtotal,
        quantityDiscount,
        shippingCost,
        totalPrice
    });
    
    // Construir mensagem para WhatsApp
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
    
    // Abrir WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    console.log('📤 Abrindo WhatsApp com URL:', url);
    window.open(url, '_blank');
    
    // Limpar carrinho após finalizar
    console.log('🗑️ Limpando carrinho...');
    cartItems = [];
    saveCartToLocalStorage();
    updateCartCount();
    
    // Mostrar modal de confirmação
    const confirmationModal = document.getElementById('confirmation-modal');
    if (confirmationModal) {
        confirmationModal.style.display = 'flex';
        console.log('✅ Modal de confirmação exibido');
    }
    
    // Voltar para a home
    setTimeout(() => {
        if (window.showHome) {
            window.showHome();
        }
    }, 2000);
    
    console.log('🎉 Pedido finalizado com sucesso!');
    return true;
}

// Inicializar carrinho quando a página carregar
function initializeCart() {
    console.log('🔄 Inicializando carrinho...');
    
    // Recarregar itens do localStorage
    try {
        const storedItems = localStorage.getItem('cartItems');
        if (storedItems) {
            cartItems = JSON.parse(storedItems);
            console.log('📦 Carrinho carregado do localStorage:', cartItems.length, 'itens');
        }
    } catch (error) {
        console.error('❌ Erro ao carregar carrinho:', error);
        cartItems = [];
    }
    
    // Atualizar contador
    updateCartCount();
    
    // Renderizar carrinho se estiver na página do carrinho
    if (document.getElementById('cart-page') && document.getElementById('cart-page').classList.contains('active')) {
        renderCart();
    }
}

// Expor funções globalmente
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
window.removeFromCart = removeFromCart;
window.renderCart = renderCart;
window.calculateShipping = calculateShipping;
window.finalizeOrder = finalizeOrder;
window.initializeCart = initializeCart;

// Inicializar quando o script carregar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeCart, 100);
});

// Também inicializar quando a página terminar de carregar
window.addEventListener('load', function() {
    setTimeout(initializeCart, 200);
});