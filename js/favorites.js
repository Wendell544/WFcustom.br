// Sistema de Favoritos
let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

// Atualizar contador de favoritos
function updateFavoriteCount() {
    const favoriteCount = document.querySelector('.favorite-count');
    if (favoriteCount) {
        favoriteCount.textContent = favoriteItems.length;
    }
}

// Salvar favoritos no localStorage
function saveFavoritesToLocalStorage() {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
}

// Verificar se um produto é favorito
function isProductFavorite(productId) {
    return favoriteItems.includes(parseInt(productId));
}

// Alternar favorito
function toggleFavorite(productId) {
    const numericId = parseInt(productId);
    const index = favoriteItems.indexOf(numericId);
    if (index === -1) {
        favoriteItems.push(numericId);
    } else {
        favoriteItems.splice(index, 1);
    }
    updateFavoriteCount();
    saveFavoritesToLocalStorage();
    
    // Atualizar a página de favoritos se estiver ativa
    if (document.getElementById('favorites-page').classList.contains('active')) {
        renderFavorites();
    }
}

// Mostrar favoritos
function showFavorites() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    if (favoritesPage) favoritesPage.classList.add('active');
    renderFavorites();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderizar favoritos
function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-items');
    if (!favoritesContainer) return;

    favoritesContainer.innerHTML = '';

    if (favoriteItems.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-favorites-premium">
                <i class="far fa-heart"></i>
                <h3>Nenhum produto favoritado</h3>
                <p>Adicione alguns produtos aos favoritos</p>
                <div class="favorites-back-button-container" style="margin-top: 2rem;">
                    <button class="btn btn-outline-premium favorites-back-btn" id="favorites-back-to-home-btn">
                        <i class="fas fa-arrow-left"></i> Voltar ao Início
                    </button>
                </div>
            </div>
        `;
        
        // Adicionar event listener para o botão de voltar
        const backButton = document.getElementById('favorites-back-to-home-btn');
        if (backButton) {
            backButton.addEventListener('click', showHome);
        }
        return;
    }

    favoriteItems.forEach(productId => {
        const product = findProductById(productId);
        if (!product) return;

        const firstColor = Object.keys(product.variants)[0];
        const firstVariant = product.variants[firstColor];
        const firstImage = firstVariant.image;
        const firstPrice = firstVariant.price;
        const firstPosition = product.positions.length > 0 ? product.positions[0] : '';

        const initialPrice = calculateFinalPrice(firstPrice, firstPosition);

        const card = document.createElement('div');
        card.className = 'favorite-card-premium';
        card.setAttribute('data-product-id', product.id);

        card.innerHTML = `
            <div class="favorite-card-content">
                <div class="favorite-image-container">
                    <img src="${firstImage}" alt="${product.name}" class="favorite-card-image" loading="lazy">
                </div>
                <div class="favorite-card-info">
                    <h3 class="favorite-card-title">${product.name}</h3>
                    <div class="favorite-card-price">R$ ${initialPrice.toFixed(2)}</div>
                    <p class="favorite-card-description">${product.description}</p>
                    <button class="btn btn-danger-premium remove-favorite-btn" data-product-id="${product.id}">
                        <i class="fas fa-trash"></i> Remover dos Favoritos
                    </button>
                </div>
            </div>
        `;

        favoritesContainer.appendChild(card);
    });

    // Adicionar container do botão de voltar
    const backButtonContainer = document.createElement('div');
    backButtonContainer.className = 'favorites-back-button-container';
    backButtonContainer.innerHTML = `
        <button class="btn btn-outline-premium favorites-back-btn" id="favorites-back-to-home-btn">
            <i class="fas fa-arrow-left"></i> Voltar ao Início
        </button>
    `;
    favoritesContainer.appendChild(backButtonContainer);

    // Adicionar event listeners para remover favoritos
    document.querySelectorAll('.remove-favorite-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = e.currentTarget.getAttribute('data-product-id');
            toggleFavorite(productId);
        });
    });

    // Adicionar event listener para o botão de voltar
    const backButton = document.getElementById('favorites-back-to-home-btn');
    if (backButton) {
        backButton.addEventListener('click', showHome);
    }
}

// Inicializar favoritos
updateFavoriteCount();