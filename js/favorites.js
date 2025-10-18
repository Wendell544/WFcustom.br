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

// Verificar se produto é favorito
function isProductFavorite(productId) {
    return favoriteItems.includes(productId);
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
                <h3>Seus favoritos estão vazios</h3>
                <p>Adicione alguns produtos aos favoritos</p>
            </div>
        `;
        return;
    }

    favoriteItems.forEach(productId => {
        const product = findProductById(productId);
        if (product) {
            const card = createGradeCard(product);
            favoritesContainer.appendChild(card);
        }
    });
}

// Mostrar página de favoritos
function showFavorites() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const favoritesPage = document.getElementById('favorites-page');
    if (favoritesPage) favoritesPage.classList.add('active');
    renderFavorites();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}