// Sistema de Favoritos
let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

// Função auxiliar para calcular preço final
function calculateFinalPrice(basePrice, position) {
    let finalPrice = basePrice;
    if (position === 'ambos') {
        finalPrice += 2.00;
    }
    return finalPrice;
}

// Atualizar contador de favoritos
function updateFavoritesCount() {
    const favoritesCount = document.querySelector('.favorites-count');
    if (favoritesCount) {
        favoritesCount.textContent = favoriteItems.length;
    }
}

// Salvar favoritos no localStorage
function saveFavoritesToLocalStorage() {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
}

// Alternar produto nos favoritos
function toggleFavorite(productId) {
    const index = favoriteItems.indexOf(productId);
    if (index > -1) {
        favoriteItems.splice(index, 1);
    } else {
        favoriteItems.push(productId);
    }
    updateFavoritesCount();
    saveFavoritesToLocalStorage();
}

// Verificar se produto está nos favoritos
function isFavorite(productId) {
    return favoriteItems.includes(productId);
}

// Criar card de produto para a grade
function createGradeCard(product) {
    const card = document.createElement('div');
    card.className = 'grade-card';
    card.setAttribute('data-product-id', product.id);

    const firstColor = Object.keys(product.variants)[0];
    const firstVariant = product.variants[firstColor];
    const firstImage = firstVariant.image;
    const firstPrice = firstVariant.price;
    const firstSize = firstVariant.sizes[0];
    const firstPosition = product.positions.length > 0 ? product.positions[0] : '';

    // Calcular preço inicial considerando posição
    const initialPrice = calculateFinalPrice(firstPrice, firstPosition);

    // Badge do produto
    let badgeHTML = '';
    if (product.badge) {
        badgeHTML = `<div class="product-badge badge-${product.badge}">${product.badge === 'sale' ? 'OFERTA' : 'NOVO'}</div>`;
    }

    const colorDots = Object.keys(product.variants).map(color => {
        let bgColor;
        switch(color) {
            case 'branco': bgColor = 'white'; break;
            case 'rosa claro': bgColor = '#FFB6C1'; break;
            case 'azul claro': bgColor = '#87CEEB'; break;
            default: bgColor = color;
        }
        return `<div class="color-dot ${color === firstColor ? 'active' : ''}" data-color="${color}" style="background-color: ${bgColor}; border: 1px solid #ccc;"></div>`;
    }).join('');

    const sizeDots = firstVariant.sizes.map(size => {
        return `<div class="size-dot ${size === firstSize ? 'active' : ''}" data-size="${size}">${size}</div>`;
    }).join('');

    const positionDots = product.positions.map(position => {
        let positionText = '';
        switch(position) {
            case 'frente': positionText = 'Frente'; break;
            case 'atras': positionText = 'Atrás'; break;
            case 'ambos': positionText = 'Ambos'; break;
            default: positionText = position;
        }
        return `<div class="position-dot ${position === firstPosition ? 'active' : ''}" data-position="${position}">${positionText}</div>`;
    }).join('');

    card.innerHTML = `
        <div class="image-container">
            ${badgeHTML}
            <button class="favorite-heart ${isFavorite(product.id) ? 'active' : ''}" data-product-id="${product.id}" aria-label="${isFavorite(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                <i class="${isFavorite(product.id) ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <img src="${firstImage}" alt="${product.name}" class="grade-card-image" data-color="${firstColor}" loading="lazy">
        </div>
        <div class="grade-card-info">
            <h3 class="grade-card-title">${product.name}</h3>
            <div class="grade-card-price">R$ <span class="price-value">${initialPrice.toFixed(2)}</span></div>
            
            ${Object.keys(product.variants).length > 1 ? `<div class="grade-card-colors">${colorDots}</div>` : ''}
            <div class="grade-card-sizes">
                ${sizeDots}
            </div>
            ${product.positions.length > 0 ? `<div class="grade-card-positions">${positionDots}</div>` : ''}
        </div>
    `;

    // Adicionar event listeners para cores
    const colorDotsElements = card.querySelectorAll('.color-dot');
    const cardImage = card.querySelector('.grade-card-image');
    const priceElement = card.querySelector('.price-value');
    const sizeContainer = card.querySelector('.grade-card-sizes');
    
    colorDotsElements.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            colorDotsElements.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            const selectedColor = dot.getAttribute('data-color');
            const selectedVariant = product.variants[selectedColor];
            
            // Adicionar estado de loading
            cardImage.classList.add('loading');
            
            // Pré-carregar a imagem
            const newImage = new Image();
            newImage.src = selectedVariant.image;
            newImage.onload = () => {
                cardImage.src = selectedVariant.image;
                cardImage.classList.remove('loading');
                cardImage.setAttribute('data-color', selectedColor);
                cardImage.alt = `${product.name} - Cor ${selectedColor}`;
                
                // Obter posição atual para calcular preço
                const activePositionDot = card.querySelector('.position-dot.active');
                const currentPosition = activePositionDot ? activePositionDot.getAttribute('data-position') : firstPosition;
                
                // Calcular preço final considerando cor E posição
                const finalPrice = calculateFinalPrice(selectedVariant.price, currentPosition);
                priceElement.textContent = finalPrice.toFixed(2);
                
                // Atualizar tamanhos disponíveis
                updateSizesForColor(sizeContainer, selectedVariant.sizes);
            };
            
            newImage.onerror = () => {
                cardImage.classList.remove('loading');
                console.error('Erro ao carregar imagem:', selectedVariant.image);
            };
        });
    });

    // Adicionar event listeners para tamanhos
    function setupSizeListeners() {
        const sizeDotsElements = card.querySelectorAll('.size-dot');
        sizeDotsElements.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                
                sizeDotsElements.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
    }
    setupSizeListeners();

    // Adicionar event listeners para posições
    const positionDotsElements = card.querySelectorAll('.position-dot');
    positionDotsElements.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            positionDotsElements.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            // Atualizar preço baseado na posição
            const selectedPosition = dot.getAttribute('data-position');
            const currentColor = card.querySelector('.color-dot.active').getAttribute('data-color');
            const selectedVariant = product.variants[currentColor];
            
            // Calcular preço final considerando posição
            const finalPrice = calculateFinalPrice(selectedVariant.price, selectedPosition);
            priceElement.textContent = finalPrice.toFixed(2);
        });
    });

    // Adicionar event listener para favoritos
    const favoriteHeart = card.querySelector('.favorite-heart');
    favoriteHeart.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(product.id);
        
        const icon = favoriteHeart.querySelector('i');
        if (isFavorite(product.id)) {
            favoriteHeart.classList.add('active');
            icon.classList.remove('far');
            icon.classList.add('fas');
            favoriteHeart.setAttribute('aria-label', 'Remover dos favoritos');
        } else {
            favoriteHeart.classList.remove('active');
            icon.classList.remove('fas');
            icon.classList.add('far');
            favoriteHeart.setAttribute('aria-label', 'Adicionar aos favoritos');
        }
    });

    return card;
}

// Atualizar tamanhos disponíveis para uma cor
function updateSizesForColor(sizeContainer, sizes) {
    sizeContainer.innerHTML = '';
    
    sizes.forEach((size, index) => {
        const sizeDot = document.createElement('div');
        sizeDot.className = `size-dot ${index === 0 ? 'active' : ''}`;
        sizeDot.setAttribute('data-size', size);
        sizeDot.textContent = size;
        
        sizeDot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            sizeContainer.querySelectorAll('.size-dot').forEach(d => d.classList.remove('active'));
            sizeDot.classList.add('active');
        });
        
        sizeContainer.appendChild(sizeDot);
    });
}

// Popular uma grade
function populateGrade(containerId, productList) {
    const gradeContainer = document.getElementById(containerId);
    if (!gradeContainer) {
        console.error(`Container não encontrado: ${containerId}`);
        return false;
    }
    
    console.log(`Populando ${containerId} com ${productList.length} produtos`);
    gradeContainer.innerHTML = '';

    productList.forEach(product => {
        const card = createGradeCard(product);
        gradeContainer.appendChild(card);
    });
    
    return true;
}

// Encontrar produto por ID
function findProductById(id) {
    for (const subcategory in products) {
        const product = products[subcategory].find(p => p.id == id);
        if (product) return product;
    }
    
    return null;
}

// Popular todas as grades
function populateAllGrades() {
    console.log('Iniciando população das grades...');
    
    const containers = [
        'grade-container-masculino',
        'grade-container-unissexo', 
        'grade-container-canecas'
    ];
    
    let successCount = 0;
    
    containers.forEach(containerId => {
        const category = containerId.split('-')[2];
        if (populateGrade(containerId, products[category])) {
            successCount++;
        }
    });
    
    console.log(`Grades populadas: ${successCount}/${containers.length}`);
    
    // Se nenhum container foi encontrado, criar dinamicamente
    if (successCount === 0) {
        console.log('Nenhum container encontrado. Criando estrutura dinâmica...');
        createDynamicGradeStructure();
    }
}

// Criar estrutura dinâmica se os containers não existirem
function createDynamicGradeStructure() {
    const productsSection = document.getElementById('products');
    if (!productsSection) {
        console.error('Seção de produtos não encontrada');
        return;
    }
    
    // Criar containers dinamicamente
    const categories = ['masculino', 'unissexo', 'canecas'];
    
    categories.forEach(category => {
        const containerId = `grade-container-${category}`;
        
        // Verificar se já existe
        if (!document.getElementById(containerId)) {
            const gradeSection = document.createElement('div');
            gradeSection.className = 'grade-produtos';
            gradeSection.id = `grade-${category}`;
            gradeSection.setAttribute('data-category', category);
            
            gradeSection.innerHTML = `
                <div class="grade-header">
                    <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                </div>
                <div id="${containerId}" class="grade-container"></div>
            `;
            
            productsSection.appendChild(gradeSection);
            console.log(`Container criado: ${containerId}`);
        }
        
        // Popular o container
        populateGrade(containerId, products[category]);
    });
}

// Debug function para verificar estrutura do DOM
function debugDOMStructure() {
    console.log('=== DEBUG DOM STRUCTURE ===');
    console.log('Products section:', document.getElementById('products'));
    console.log('Masculino container:', document.getElementById('grade-container-masculino'));
    console.log('Unissexo container:', document.getElementById('grade-container-unissexo'));
    console.log('Canecas container:', document.getElementById('grade-container-canecas'));
    console.log('All grade containers:', document.querySelectorAll('.grade-container'));
    console.log('=== END DEBUG ===');
}