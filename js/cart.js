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
            <button class="remove-item-premium" data-cart-id="${item.id}" aria-label="Remover item do carrinho">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Adicionar event listeners para remover itens
    document.querySelectorAll('.remove-item-premium').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartId = e.currentTarget.getAttribute('data-cart-id');
            removeFromCart(cartId);
        });
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
    
    cartSummary.innerHTML = `
        <div class="summary-row-premium">
            <span>Subtotal:</span>
            <span>R$ ${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row-premium">
            <span>Frete:</span>
            <span id="cart-shipping">A calcular</span>
        </div>
        <div class="summary-row-premium summary-total-premium">
            <span>Total:</span>
            <span id="cart-total">R$ ${subtotal.toFixed(2)}</span>
        </div>
    `;
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
    
    const shippingPrice = document.getElementById('shipping-price');
    const shippingPriceContainer = document.querySelector('.shipping-price-premium');
    
    if (shippingPrice) shippingPrice.textContent = `R$ ${shippingCost.toFixed(2)}`;
    if (shippingPriceContainer) shippingPriceContainer.style.display = 'block';
    
    if (document.getElementById('cart-page').classList.contains('active')) {
        const cartShipping = document.getElementById('cart-shipping');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartShipping && cartTotal) {
            const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
            const total = subtotal + shippingCost;
            
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
    const shippingCost = parseFloat(document.getElementById('shipping-price').textContent.replace('R$ ', ''));
    const totalPrice = subtotal + shippingCost;
    
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