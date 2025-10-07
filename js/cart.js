// Adicionar produto ao carrinho
function addToCart(product, color, size, position) {
    const cartItem = {
        id: Date.now(), // ID único para o item no carrinho
        product: product,
        color: color,
        size: size,
        position: position,
        price: product.price
    };
    
    cartItems.push(cartItem);
    updateCartCount();
    saveCartToLocalStorage();
}

// Salvar carrinho no localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Atualizar contador do carrinho
function updateCartCount() {
    cartCount.textContent = cartItems.length;
}

// Mostrar carrinho
function showCart() {
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar carrinho
    cartPage.classList.add('active');
    
    // Atualizar conteúdo do carrinho
    renderCart();
    
    // Rolar para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderizar carrinho
function renderCart() {
    // Limpar carrinho
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione alguns produtos para continuar</p>
            </div>
        `;
        
        cartSummary.innerHTML = '';
        checkoutBtn.disabled = true;
        return;
    }
    
    // Renderizar itens do carrinho
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.setAttribute('data-cart-id', item.id);
        
        cartItemElement.innerHTML = `
            <img src="${item.product.variants[item.color]}" alt="${item.product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.product.name}</h3>
                <p>Cor: ${item.color} | Tamanho: ${item.size} | Posição: ${item.position}</p>
                <div class="cart-item-price">R$ ${item.price}</div>
            </div>
            <button class="remove-item" data-cart-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Adicionar event listeners para remover itens
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartId = e.currentTarget.getAttribute('data-cart-id');
            removeFromCart(cartId);
        });
    });
    
    // Renderizar resumo do carrinho
    renderCartSummary();
    
    checkoutBtn.disabled = false;
}

// Remover item do carrinho
function removeFromCart(cartId) {
    cartItems = cartItems.filter(item => item.id != cartId);
    updateCartCount();
    saveCartToLocalStorage();
    renderCart();
}

// Renderizar resumo do carrinho
function renderCartSummary() {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    
    cartSummary.innerHTML = `
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>R$ ${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Frete:</span>
            <span id="cart-shipping">A calcular</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total:</span>
            <span id="cart-total">R$ ${subtotal.toFixed(2)}</span>
        </div>
    `;
}