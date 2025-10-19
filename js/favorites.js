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

// Alternar favorito - FUNÇÃO COMPLETAMENTE CORRIGIDA
function toggleFavorite(productId) {
    const numericId = parseInt(productId);
    console.log('Toggle favorite chamado para:', numericId);
    console.log('Favoritos antes:', favoriteItems);
    
    const index = favoriteItems.indexOf(numericId);
    
    if (index === -1) {
        // Adicionar aos favoritos
        favoriteItems.push(numericId);
        console.log('Adicionado aos favoritos');
    } else {
        // Remover dos favoritos
        favoriteItems.splice(index, 1);
        console.log('Removido dos favoritos');
    }
    
    updateFavoriteCount();
    saveFavoritesToLocalStorage();
    console.log('Favoritos depois:', favoriteItems);
    
    // Atualizar ícones de favorito em TODOS os cards
    updateAllFavoriteIcons();
    
    // Se estiver na página de favoritos, atualizar a lista
    if (document.getElementById('favorites-page') && document.getElementById('favorites-page').classList.contains('active')) {
        console.log('Atualizando página de favoritos...');
        renderFavorites();
    }
}

// Atualizar todos os ícones de favorito na página
function updateAllFavoriteIcons() {
    document.querySelectorAll('.favorite-icon').forEach(icon => {
        const productId = parseInt(icon.getAttribute('data-product-id'));
        const iconElement = icon.querySelector('i');
        
        if (isProductFavorite(productId)) {
            icon.classList.add('active');
            iconElement.className = 'fas fa-heart';
        } else {
            icon.classList.remove('active');
            iconElement.className = 'far fa-heart';
        }
    });
}

// Mostrar favoritos
function showFavorites() {
    console.log('Mostrando favoritos...');
    
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar página de favoritos
    const favoritesPage = document.getElementById('favorites-page');
    if (favoritesPage) {
        favoritesPage.classList.add('active');
        // Pequeno delay para garantir que o DOM está pronto
        setTimeout(() => {
            renderFavorites();
        }, 100);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderizar favoritos - COMPLETAMENTE REFEITA E CORRIGIDA
function renderFavorites() {
    console.log('Renderizando favoritos...');
    const favoritesContainer = document.getElementById('favorites-items');
    if (!favoritesContainer) {
        console.error('Container de favoritos não encontrado!');
        return;
    }

    // LIMPAR completamente o container
    favoritesContainer.innerHTML = '';

    if (favoriteItems.length === 0) {
        console.log('Nenhum favorito encontrado');
        favoritesContainer.innerHTML = `
            <div class="empty-favorites-premium">
                <i class="far fa-heart"></i>
                <h3>Nenhum produto favoritado</h3>
                <p>Adicione alguns produtos aos favoritos</p>
                <div class="favorites-back-button-container">
                    <button class="btn btn-outline-premium favorites-back-btn" id="favorites-back-to-home-btn">
                        <i class="fas fa-arrow-left"></i> Voltar ao Início
                    </button>
                </div>
            </div>
        `;
        
        // Adicionar event listener para o botão de voltar
        setTimeout(() => {
            const backButton = document.getElementById('favorites-back-to-home-btn');
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    showHome();
                });
            }
        }, 100);
        
        return;
    }

    console.log('Renderizando', favoriteItems.length, 'favoritos');

    // Criar uma cópia do array para evitar problemas de referência
    const currentFavorites = [...favoriteItems];
    
    currentFavorites.forEach(productId => {
        const product = findProductById(productId);
        if (!product) {
            console.log('Produto não encontrado:', productId);
            // Remover produto não encontrado da lista
            const index = favoriteItems.indexOf(productId);
            if (index > -1) {
                favoriteItems.splice(index, 1);
            }
            return;
        }

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

        // ADICIONAR EVENT LISTENERS DIRETAMENTE - CORREÇÃO FINAL
        const removeBtn = card.querySelector('.remove-favorite-btn');
        removeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const productId = this.getAttribute('data-product-id');
            console.log('Clicou em remover favorito:', productId);
            toggleFavorite(productId);
        });

        // TORNAR O CARD CLICÁVEL PARA VER DETALHES DO PRODUTO - NOVA FUNCIONALIDADE
        card.addEventListener('click', function(e) {
            // Não abrir detalhes se clicar no botão de remover
            if (e.target.closest('.remove-favorite-btn')) {
                return;
            }
            const productId = this.getAttribute('data-product-id');
            console.log('Clicou no card de favorito:', productId);
            showProductDetail(productId);
        });
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

    // ADICIONAR EVENT LISTENER PARA O BOTÃO VOLTAR
    setTimeout(() => {
        const backButton = document.getElementById('favorites-back-to-home-btn');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Clicou em voltar ao início');
                showHome();
            });
        }
    }, 150);
}

// Inicializar favoritos
updateFavoriteCount();