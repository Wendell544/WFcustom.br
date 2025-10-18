// Sistema de Favoritos
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Atualizar contador de favoritos
function updateFavoritesCount() {
    const favoritesCount = document.querySelector('.favorites-count');
    if (favoritesCount) {
        favoritesCount.textContent = favorites.length;
    }
}

// Salvar favoritos no localStorage
function saveFavoritesToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Adicionar produto aos favoritos
function addToFavorites(product) {
    if (!isProductInFavorites(product.id)) {
        favorites.push({
            id: product.id,
            product: product,
            addedAt: new Date().toISOString()
        });
        updateFavoritesCount();
        saveFavoritesToLocalStorage();
        updateFavoriteButtons(product.id);
        showNotification('Produto adicionado aos favoritos!', 'success');
        return true;
    }
    return false;
}

// Remover produto dos favoritos
function removeFromFavorite(productId) {
    favorites = favorites.filter(item => item.id != productId);
    updateFavoritesCount();
    saveFavoritesToLocalStorage();
    updateFavoriteButtons(productId);
    
    if (document.getElementById('favorites-page').classList.contains('active')) {
        renderFavorites();
    }
    
    showNotification('Produto removido dos favoritos!', 'info');
}

// Verificar se produto está nos favoritos
function isProductInFavorites(productId) {
    return favorites.some(item => item.id == productId);
}

// Alternar favorito
function toggleFavorite(product) {
    if (isProductInFavorites(product.id)) {
        removeFromFavorite(product.id);
    } else {
        addToFavorites(product);
    }
}

// Atualizar estado dos botões de favorito
function updateFavoriteButtons(productId) {
    const favoriteButtons = document.querySelectorAll(`[data-product-id="${productId}"] .favorite-btn, .favorite-btn[data-product-id="${productId}"]`);
    
    favoriteButtons.forEach(button => {
        const icon = button.querySelector('i');
        if (isProductInFavorites(productId)) {
            button.classList.add('active');
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.setAttribute('aria-label', 'Remover dos favoritos');
        } else {
            button.classList.remove('active');
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.setAttribute('aria-label', 'Adicionar aos favoritos');
        }
    });
}

// Renderizar página de favoritos
function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    if (!favoritesContainer) return;

    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-favorites-premium">
                <i class="fas fa-heart"></i>
                <h3>Seus favoritos estão vazios</h3>
                <p>Adicione alguns produtos aos favoritos para vê-los aqui</p>
                <button class="btn btn-primary-premium" onclick="showHome()">Continuar Comprando</button>
            </div>
        `;
        return;
    }

    // Ordenar por data de adição (mais recentes primeiro)
    const sortedFavorites = [...favorites].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

    sortedFavorites.forEach(favItem => {
        const product = favItem.product;
        const firstColor = Object.keys(product.variants)[0];
        const firstVariant = product.variants[firstColor];

        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item-premium';
        favoriteItem.setAttribute('data-product-id', product.id);

        favoriteItem.innerHTML = `
            <img src="${firstVariant.image}" alt="${product.name}" class="favorite-item-image-premium" loading="lazy" width="100" height="100">
            <div class="favorite-item-details-premium">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="favorite-item-price-premium">R$ ${firstVariant.price.toFixed(2)}</div>
                <small>Adicionado em ${new Date(favItem.addedAt).toLocaleDateString('pt-BR')}</small>
            </div>
            <div class="favorite-item-actions-premium">
                <button class="btn btn-primary-premium" onclick="buyFavorite(${product.id})">Comprar Agora</button>
                <button class="remove-favorite-premium" onclick="removeFromFavorite(${product.id})" aria-label="Remover dos favoritos">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
        `;

        favoritesContainer.appendChild(favoriteItem);
    });
}

// Comprar produto dos favoritos
function buyFavorite(productId) {
    const favoriteItem = favorites.find(item => item.id == productId);
    if (favoriteItem) {
        showProductPage(favoriteItem.product);
    }
}

// Mostrar notificação
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification-premium');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification-premium notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Fechar notificação">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);

    // Mostrar notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Fechar notificação automaticamente após 5 segundos
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);

    // Event listener para fechar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Inicializar sistema de favoritos
function initFavorites() {
    updateFavoritesCount();
    
    // Adicionar estilos para notificações
    const notificationStyles = `
        .notification-premium {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-xl);
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10000;
            max-width: 400px;
            border-left: 4px solid var(--accent-color);
        }
        
        .notification-premium.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: var(--success-color);
        }
        
        .notification-info {
            border-left-color: var(--accent-color);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification-success .notification-content i {
            color: var(--success-color);
        }
        
        .notification-info .notification-content i {
            color: var(--accent-color);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: var(--border-radius);
            transition: var(--transition);
        }
        
        .notification-close:hover {
            background: var(--light-gray);
            color: var(--text-dark);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initFavorites);