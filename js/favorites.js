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
    return favoriteItems.includes(productId);
}

// Alternar favorito
function toggleFavorite(productId) {
    const index = favoriteItems.indexOf(productId);
    if (index === -1) {
        favoriteItems.push(productId);
    } else {
        favoriteItems.splice(index, 1);
    }
    updateFavoriteCount();
    saveFavoritesToLocalStorage();
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
            </div>
        `;
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
        card.className = 'grade-card';
        card.setAttribute('data-product-id', product.id);

        card.innerHTML = `
            <div class="image-container">
                <img src="${firstImage}" alt="${product.name}" class="grade-card-image" loading="lazy">
            </div>
            <div class="grade-card-info">
                <h3 class="grade-card-title">${product.name}</h3>
                <div class="grade-card-price">R$ ${initialPrice.toFixed(2)}</div>
                <button class="btn btn-outline-premium remove-favorite" data-product-id="${product.id}">Remover dos Favoritos</button>
            </div>
        `;

        favoritesContainer.appendChild(card);
    });

    // Adicionar event listeners para remover favoritos
    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Impedir a propagação do evento
            const productId = e.currentTarget.getAttribute('data-product-id');
            toggleFavorite(productId);
            renderFavorites();
        });
    });
}

// Inicializar favoritos
updateFavoriteCount();