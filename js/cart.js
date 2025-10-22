// Variáveis do carrinho
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Sistema de Ofertas Automáticas
function calculateAutomaticDiscounts(cartItems) {
    let totalDiscount = 0;
    let discountMessages = [];
    
    // Contar produtos por categoria
    const camisetasCount = cartItems.filter(item => 
        item.product.category === 'masculino' || item.product.category === 'unissexo'
    ).length;
    
    const canecasCount = cartItems.filter(item => 
        item.product.category === 'canecas'
    ).length;
    
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    
    // OFERTA 1: Frete grátis para compras acima de R$ 100
    if (subtotal >= 100) {
        discountMessages.push({
            type: 'frete_gratis',
            message: '🎉 Parabéns! Você ganhou FRETE GRÁTIS!',
            value: 0
        });
    }
    
    // OFERTA 2: Descontos progressivos para camisetas
    if (camisetasCount >= 2 && camisetasCount < 3) {
        const discount = subtotal * 0.05; // 5% de desconto
        totalDiscount += discount;
        discountMessages.push({
            type: 'desconto_camisetas',
            message: '🔥 Oferta: 5% OFF por levar 2 camisetas!',
            value: discount
        });
    } else if (camisetasCount >= 3) {
        const discount = subtotal * 0.10; // 10% de desconto
        totalDiscount += discount;
        discountMessages.push({
            type: 'desconto_camisetas',
            message: '🎊 Oferta ESPECIAL: 10% OFF por levar 3+ camisetas!',
            value: discount
        });
    }
    
    // OFERTA 3: Desconto para canecas
    if (canecasCount >= 3) {
        const canecasSubtotal = cartItems
            .filter(item => item.product.category === 'canecas')
            .reduce((total, item) => total + item.price, 0);
        
        const discount = canecasSubtotal * 0.05; // 5% de desconto nas canecas
        totalDiscount += discount;
        discountMessages.push({
            type: 'desconto_canecas',
            message: '☕ Oferta: 5% OFF por levar 3+ canecas!',
            value: discount
        });
    }
    
    // OFERTA 4: Brinde para 3+ camisetas
    if (camisetasCount >= 3) {
        discountMessages.push({
            type: 'brinde',
            message: '🎁 PRESENTE: Você ganhou 1 camiseta extra de brinde!',
            value: 0
        });
    }
    
    return {
        totalDiscount: Math.min(totalDiscount, subtotal * 0.10), // Máximo 10% de desconto
        discountMessages,
        freteGratis: subtotal >= 100,
        camisetasCount,
        canecasCount
    };
}

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
    
    // Renderizar itens do carrinho
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item-premium';
        cartItemElement.setAttribute('data-cart-id', item.id);
        
        let positionInfo = '';
        if (item.position && item.product.category !== 'canecas') {
            let positionText = '';
            switch(item.position) {
                case 'frente': positionText = 'Frente'; break;
                case 'atras': positionText = 'Atrás'; break;
                case 'ambos': positionText = 'Ambos'; break;
                default: positionText = item.position;
            }
            positionInfo = ` | Estampa: ${positionText}`;
        }
        
        cartItemElement.innerHTML = `
            <img src="${item.product.variants[item.color].image}" alt="${item.product.name}" class="cart-item-image-premium">
            <div class="cart-item-details-premium">
                <h3>${item.product.name}</h3>
                <p>Cor: ${item.color} | Tamanho: ${item.size}${positionInfo}</p>
                <div class="cart-item-price-premium">R$ ${item.price.toFixed(2)}</div>
            </div>
            <button class="remove-item-premium" data-cart-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Adicionar event listeners para remover itens
    document.querySelectorAll('.remove-item-premium').forEach(button => {
        button.onclick = (e) => {
            const cartId = e.currentTarget.getAttribute('data-cart-id');
            removeFromCart(cartId);
        };
    });
    
    // Renderizar resumo do carrinho
    renderCartSummary();
    
    if (checkoutBtn) checkoutBtn.disabled = false;
}

// Renderizar resumo do carrinho
function renderCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    if (!cartSummary) return;
    
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    
    // Calcular descontos automáticos
    const offers = calculateAutomaticDiscounts(cartItems);
    const totalComDescontos = subtotal - offers.totalDiscount;
    
    // Calcular frete (grátis se oferta ativa)
    let shippingCost = offers.freteGratis ? 0 : 9.99;
    
    // Ajustar frete para São Bento
    const city = document.getElementById('city');
    if (city) {
        const cityValue = city.value.toLowerCase();
        if (cityValue.includes('são bento') || cityValue.includes('sao bento')) {
            shippingCost = offers.freteGratis ? 0 : 4.00;
            const deliveryOptions = document.getElementById('delivery-options');
            if (deliveryOptions) deliveryOptions.style.display = 'block';
            
            const pickupOption = document.getElementById('pickup');
            if (pickupOption && pickupOption.checked) {
                shippingCost = 0;
            }
        }
    }
    
    const total = totalComDescontos + shippingCost;
    
    cartSummary.innerHTML = `
        <div class="summary-row-premium">
            <span>Subtotal:</span>
            <span>R$ ${subtotal.toFixed(2)}</span>
        </div>
        
        ${offers.totalDiscount > 0 ? `
        <div class="summary-row-premium discount-row">
            <span>Descontos Automáticos:</span>
            <span>- R$ ${offers.totalDiscount.toFixed(2)}</span>
        </div>
        ` : ''}
        
        <div class="summary-row-premium">
            <span>Frete:</span>
            <span id="cart-shipping">${offers.freteGratis ? 'GRÁTIS 🎉' : 'A calcular'}</span>
        </div>
        
        <div class="summary-row-premium summary-total-premium">
            <span>Total:</span>
            <span id="cart-total">R$ ${total.toFixed(2)}</span>
        </div>
        
        <!-- Mensagens de Oferta -->
        <div class="offers-container" id="offers-container">
            ${offers.discountMessages.map(offer => `
                <div class="offer-message ${offer.type}">
                    <i class="fas fa-gift"></i>
                    ${offer.message}
                </div>
            `).join('')}
        </div>
        
        <!-- Incentivos para ganhar mais descontos -->
        ${!offers.freteGratis && subtotal < 100 ? `
            <div class="shipping-incentive">
                <i class="fas fa-shipping-fast"></i>
                Faltam R$ ${(100 - subtotal).toFixed(2)} para FRETE GRÁTIS!
            </div>
        ` : ''}
        
        ${offers.camisetasCount === 1 ? `
            <div class="product-incentive">
                <i class="fas fa-tag"></i>
                Leve mais 1 camiseta e ganhe 5% de desconto!
            </div>
        ` : ''}
        
        ${offers.camisetasCount === 2 ? `
            <div class="product-incentive">
                <i class="fas fa-crown"></i>
                Leve mais 1 camiseta e ganhe 10% de desconto + 1 BRINDE!
            </div>
        ` : ''}
        
        ${offers.canecasCount === 2 ? `
            <div class="product-incentive">
                <i class="fas fa-mug-hot"></i>
                Leve mais 1 caneca e ganhe 5% de desconto!
            </div>
        ` : ''}
    `;
    
    // Atualizar também na página de localização se estiver ativa
    if (document.getElementById('cart-page').classList.contains('active')) {
        updateShippingDisplay(offers.freteGratis, shippingCost, totalComDescontos);
    }
}

// Função auxiliar para atualizar display do frete
function updateShippingDisplay(freteGratis, shippingCost, subtotalComDescontos) {
    const cartShipping = document.getElementById('cart-shipping');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartShipping && cartTotal) {
        const total = subtotalComDescontos + shippingCost;
        
        cartShipping.textContent = freteGratis ? 'GRÁTIS 🎉' : `R$ ${shippingCost.toFixed(2)}`;
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }
}

// Calcular frete
function calculateShipping() {
    const city = document.getElementById('city');
    if (!city) return;
    
    const cityValue = city.value.toLowerCase();
    let shippingCost = 9.99;
    
    // Verificar se tem direito a frete grátis por oferta
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const offers = calculateAutomaticDiscounts(cartItems);
    
    if (offers.freteGratis) {
        shippingCost = 0;
    } else if (cityValue.includes('são bento') || cityValue.includes('sao bento')) {
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
    
    const shippingPrice = document.getElementById('shipping-price');
    const shippingPriceContainer = document.querySelector('.shipping-price-premium');
    
    if (shippingPrice) {
        shippingPrice.textContent = offers.freteGratis ? 'GRÁTIS 🎉' : `R$ ${shippingCost.toFixed(2)}`;
    }
    if (shippingPriceContainer) shippingPriceContainer.style.display = 'block';
    
    if (document.getElementById('cart-page').classList.contains('active')) {
        updateShippingDisplay(offers.freteGratis, shippingCost, subtotal - offers.totalDiscount);
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
    const offers = calculateAutomaticDiscounts(cartItems);
    const totalComDescontos = subtotal - offers.totalDiscount;
    
    let shippingCost = offers.freteGratis ? 0 : 9.99;
    
    // Ajuste para São Bento
    const cityInput = document.getElementById('city');
    if (cityInput) {
        const cityValue = cityInput.value.toLowerCase();
        if (cityValue.includes('são bento') || cityValue.includes('sao bento')) {
            shippingCost = offers.freteGratis ? 0 : 4.00;
            if (deliveryType === 'pickup') {
                shippingCost = 0;
            }
        }
    }
    
    const totalPrice = totalComDescontos + shippingCost;
    
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
    
    // Adicionar informações de descontos
    if (offers.totalDiscount > 0) {
        message += `*Descontos Automáticos:* -R$ ${offers.totalDiscount.toFixed(2)}%0A`;
        message += `*Subtotal c/ Desconto:* R$ ${totalComDescontos.toFixed(2)}%0A`;
    }
    
    message += `*Frete:* ${offers.freteGratis ? 'GRÁTIS 🎉' : `R$ ${shippingCost.toFixed(2)}`}%0A`;
    message += `*Total:* R$ ${totalPrice.toFixed(2)}%0A%0A`;
    
    // Adicionar ofertas aplicadas
    if (offers.discountMessages.length > 0) {
        message += `*Ofertas Aplicadas:*%0A`;
        offers.discountMessages.forEach(offer => {
            message += `🎁 ${offer.message}%0A`;
        });
        message += `%0A`;
    }
    
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