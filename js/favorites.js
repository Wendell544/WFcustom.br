// Funções para gerenciar favoritos
function toggleFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(parseInt(productId));
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(parseInt(productId));
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteCount();
    
    // Atualizar ícone visualmente
    const favoriteIcons = document.querySelectorAll(`.favorite-icon[data-product-id="${productId}"]`);
    favoriteIcons.forEach(icon => {
        const heartIcon = icon.querySelector('i');
        if (heartIcon.classList.contains('fas')) {
            heartIcon.className = 'far fa-heart';
            icon.classList.remove('active');
        } else {
            heartIcon.className = 'fas fa-heart';
            icon.classList.add('active');
        }
    });
}

function isProductFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(parseInt(productId));
}

function updateFavoriteCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteCount = document.querySelector('.favorite-count');
    if (favoriteCount) {
        favoriteCount.textContent = favorites.length;
    }
}

function renderFavorites() {
    const favoritesItems = document.getElementById('favorites-items');
    if (!favoritesItems) return;
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        favoritesItems.innerHTML = `
            <div class="empty-favorites">
                <i class="far fa-heart"></i>
                <h3>Nenhum produto favoritado</h3>
                <p>Adicione produtos aos favoritos clicando no coração</p>
            </div>
        `;
        return;
    }
    
    favoritesItems.innerHTML = '';
    
    favorites.forEach(productId => {
        const product = window.findProductById ? window.findProductById(productId) : null;
        if (product) {
            const firstColor = Object.keys(product.variants)[0];
            const firstVariant = product.variants[firstColor];
            
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item-premium';
            favoriteItem.innerHTML = `
                <img src="${firstVariant.image}" alt="${product.name}">
                <div class="favorite-item-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="favorite-item-price">R$ ${firstVariant.price.toFixed(2)}</div>
                </div>
                <div class="favorite-item-actions">
                    <button class="btn btn-primary-premium" onclick="showProductDetail(${product.id})">Ver Detalhes</button>
                    <button class="btn btn-outline-premium remove-favorite" data-product-id="${product.id}">
                        <i class="fas fa-trash"></i> Remover
                    </button>
                </div>
            `;
            
            favoritesItems.appendChild(favoriteItem);
        }
    });
    
    // Adicionar event listeners para remover favoritos
    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            toggleFavorite(productId);
            renderFavorites();
            updateFavoriteCount();
        });
    });
}

// Inicializar favoritos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    updateFavoriteCount();
});