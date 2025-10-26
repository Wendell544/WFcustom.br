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

// Adicionar produto ao carrinho
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
}

// Remover item do carrinho
function removeFromCart(cartId) {
    cartItems = cartItems.filter(item => item.id != cartId);
    updateCartCount();
    saveCartToLocalStorage();
    renderCart();
}

// Renderizar carrinho
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

// Renderizar resumo do carrinho - VERSÃO CORRIGIDA
function renderCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartSummary) {
        console.error('Elemento cart-summary não encontrado!');
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

    const shippingCost = subtotal >= 100 ? 0 : 9.99;
    const total = subtotal - quantityDiscount + shippingCost;
    
    // ATUALIZAR ELEMENTOS DO CARRINHO - CORREÇÃO
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartDiscount = document.getElementById('cart-discount');
    const cartShipping = document.getElementById('cart-shipping');
    const cartTotal = document.getElementById('cart-total');
    const totalSavings = document.getElementById('total-savings');
    
    if (cartSubtotal) cartSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (cartDiscount) cartDiscount.textContent = `- R$ ${quantityDiscount.toFixed(2)}`;
    if (cartShipping) {
        if (shippingCost === 0) {
            cartShipping.textContent = 'GRÁTIS';
            cartShipping.style.color = 'var(--success-color)';
        } else {
            cartShipping.textContent = `R$ ${shippingCost.toFixed(2)}`;
            cartShipping.style.color = '';
        }
    }
    if (cartTotal) {
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
        cartTotal.style.fontWeight = '900';
        cartTotal.style.color = 'var(--ofertas-primary)';
        cartTotal.style.fontSize = '1.4rem';
    }
    if (totalSavings) totalSavings.textContent = `R$ ${quantityDiscount.toFixed(2)}`;
    
    // RENDERIZAR O RESUMO COMPLETO - CORREÇÃO PRINCIPAL
    cartSummary.innerHTML = '';
    cartSummary.style.display = 'block';
    cartSummary.style.visibility = 'visible';
    cartSummary.style.opacity = '1';
    
    cartSummary.innerHTML = `
        <div class="summary-row-premium">
            <span>Subtotal:</span>
            <span id="cart-subtotal-display">R$ ${subtotal.toFixed(2)}</span>
        </div>
        ${quantityDiscount > 0 ? `
        <div class="summary-row-premium" style="color: var(--success-color);">
            <span>Desconto Progressivo:</span>
            <span>- R$ ${quantityDiscount.toFixed(2)}</span>
        </div>
        ` : ''}
        <div class="summary-row-premium">
            <span>Frete:</span>
            <span id="cart-shipping-display">${shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2)}`}</span>
        </div>
        <div class="summary-row-premium summary-total-premium">
            <span><strong>Total:</strong></span>
            <span><strong id="cart-total-display">R$ ${total.toFixed(2)}</strong></span>
        </div>
        ${quantityDiscount > 0 ? `
        <div class="summary-row-premium" style="color: var(--success-color); font-size: 0.8rem;">
            <span>💰 Você economizou:</span>
            <span>R$ ${quantityDiscount.toFixed(2)}</span>
        </div>
        ` : ''}
    `;
    
    // Garantir que o botão de checkout esteja habilitado quando houver itens
    if (checkoutBtn) {
        checkoutBtn.disabled = cartItems.length === 0;
        if (cartItems.length > 0) {
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.cursor = 'pointer';
        } else {
            checkoutBtn.style.opacity = '0.6';
            checkoutBtn.style.cursor = 'not-allowed';
        }
    }
    
    console.log('Resumo do carrinho renderizado:', {
        subtotal,
        quantityDiscount,
        shippingCost,
        total,
        items: cartItems.length
    });
}

// Calcular frete
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
    
    if (shippingPrice) shippingPrice.textContent = `R$ ${shippingCost.toFixed(2)}`;
    if (shippingPriceContainer) shippingPriceContainer.style.display = 'block';
    
    if (document.getElementById('cart-page').classList.contains('active')) {
        const cartShipping = document.getElementById('cart-shipping');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartShipping && cartTotal) {
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

            const total = subtotal - quantityDiscount + shippingCost;
            
            cartShipping.textContent = `R$ ${shippingCost.toFixed(2)}`;
            cartTotal.textContent = `R$ ${total.toFixed(2)}`;
        }
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

    const shippingCost = parseFloat(document.getElementById('shipping-price').textContent.replace('R$ ', ''));
    const totalPrice = subtotal - quantityDiscount + shippingCost;
    
    let message = `Olá! Gostaria de finalizar meu pedido:%0A%0A`;
    
    cartItems.forEach((item, index) => {
        message += `*Item ${index + 1}:* ${item.product.name}%0A`;
        message += `- Cor: ${item.color}%0A`;
        message += `- Tamanho: ${item.size}%0A`;
        if (item.position && item.product.category !== 'canecas') {
            let positionText = '';
            switch(item.position) {
                case 'frente': positionText = 'Frente'; break;
                case 'atras': positionText = 'Atrás'; break;
                case 'ambos': positionText = 'Ambos'; break;
                default: positionText = item.position;
            }
            message += `- Estampa: ${positionText}%0A`;
        }
        message += `- Preço: R$ ${item.price.toFixed(2)}%0A%0A`;
    });
    
    message += `*Subtotal:* R$ ${subtotal.toFixed(2)}%0A`;
    if (quantityDiscount > 0) {
        message += `*Desconto Progressivo:* - R$ ${quantityDiscount.toFixed(2)}%0A`;
    }
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
    
    if (homePage) homePage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}