// Cache de imagens para carregamento instantâneo
const imageCache = new Map();

// Função para pré-carregar imagens
function preloadProductImages() {
    console.log('Iniciando pré-carregamento de imagens...');
    
    let totalImages = 0;
    let loadedImages = 0;
    
    // Coletar todas as URLs de imagens únicas
    const imageUrls = new Set();
    
    Object.values(products).forEach(categoryProducts => {
        categoryProducts.forEach(product => {
            Object.values(product.variants).forEach(variant => {
                if (variant.image && !imageCache.has(variant.image)) {
                    imageUrls.add(variant.image);
                    totalImages++;
                }
            });
        });
    });
    
    console.log(`Pré-carregando ${totalImages} imagens...`);
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            imageCache.set(url, img);
            console.log(`Imagem carregada: ${loadedImages}/${totalImages}`);
            
            // Atualizar progresso se necessário
            if (loadedImages === totalImages) {
                console.log('Todas as imagens foram pré-carregadas!');
            }
        };
        img.onerror = () => {
            loadedImages++;
            console.warn(`Erro ao carregar imagem: ${url}`);
        };
        img.src = url;
    });
}

// Função auxiliar para calcular preço final
function calculateFinalPrice(basePrice, position) {
    let finalPrice = basePrice;
    if (position === 'ambos') {
        finalPrice += 2.00;
    }
    return finalPrice;
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

    // Badges do produto
    const badges = [];
    if (product.isBestSeller) badges.push('<span class="badge badge-best-seller">🔥 Mais Vendido</span>');
    if (product.discount) badges.push(`<span class="badge badge-discount">-${product.discount}% OFF</span>`);
    if (product.isNew) badges.push('<span class="badge badge-new">🆕 Novidade</span>');
    if (product.isTrending) badges.push('<span class="badge badge-trending">📈 Em Alta</span>');
    if (product.limitedStock) badges.push('<span class="badge badge-limited">⏳ Estoque Limitado</span>');

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

    // Preço com desconto (se aplicável)
    const discountPrice = product.discount ? 
        firstPrice * (1 - product.discount / 100) : 
        firstPrice;
    
    const finalPrice = calculateFinalPrice(discountPrice, firstPosition);

    // Ícone de favoritos - CORREÇÃO FINAL
    const isFav = isProductFavorite(product.id);
    const favIconClass = isFav ? 'fas fa-heart' : 'far fa-heart';
    const favActiveClass = isFav ? 'active' : '';

    card.innerHTML = `
        <div class="image-container">
            ${badges.join('')}
            <div class="favorite-icon ${favActiveClass}" data-product-id="${product.id}">
                <i class="${favIconClass}"></i>
            </div>
            <img src="${firstImage}" alt="${product.name}" class="grade-card-image" data-color="${firstColor}" loading="lazy">
            <div class="image-loading-overlay">
                <div class="loading-spinner"></div>
            </div>
        </div>
        <div class="grade-card-info">
            <h3 class="grade-card-title">${product.name}</h3>
            
            <div class="grade-card-pricing">
                ${product.discount ? `
                    <div class="original-price">R$ ${firstPrice.toFixed(2)}</div>
                    <div class="grade-card-price">R$ <span class="price-value">${finalPrice.toFixed(2)}</span></div>
                    <div class="discount-tag">-${product.discount}%</div>
                ` : `
                    <div class="grade-card-price">R$ <span class="price-value">${finalPrice.toFixed(2)}</span></div>
                `}
            </div>
            
            ${Object.keys(product.variants).length > 1 ? `<div class="grade-card-colors">${colorDots}</div>` : ''}
            <div class="grade-card-sizes">
                ${sizeDots}
            </div>
            ${product.positions.length > 0 ? `<div class="grade-card-positions">${positionDots}</div>` : ''}
            
            ${product.limitedStock ? `
                <div class="stock-indicator">
                    <div class="stock-text">Apenas ${product.stockCount} unidades!</div>
                    <div class="stock-bar">
                        <div class="stock-progress" style="width: ${(product.stockCount / 10) * 100}%"></div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    // Adicionar event listener para o ícone de favoritos - CORREÇÃO FINAL
    const favoriteIcon = card.querySelector('.favorite-icon');
    favoriteIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const productId = this.getAttribute('data-product-id');
        console.log('Clicou no ícone de favorito:', productId);
        toggleFavorite(productId);
    });

    // Adicionar event listeners para cores com carregamento otimizado
    const colorDotsElements = card.querySelectorAll('.color-dot');
    const cardImage = card.querySelector('.grade-card-image');
    const loadingOverlay = card.querySelector('.image-loading-overlay');
    const priceElement = card.querySelector('.price-value');
    const sizeContainer = card.querySelector('.grade-card-sizes');
    
    colorDotsElements.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            colorDotsElements.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            const selectedColor = dot.getAttribute('data-color');
            const selectedVariant = product.variants[selectedColor];
            
            // Mostrar loading overlay
            loadingOverlay.style.display = 'flex';
            cardImage.style.opacity = '0.5';
            
            // Verificar se a imagem já está em cache
            if (imageCache.has(selectedVariant.image)) {
                // Imagem já carregada - mostrar instantaneamente
                const cachedImage = imageCache.get(selectedVariant.image);
                cardImage.src = selectedVariant.image;
                cardImage.style.opacity = '1';
                loadingOverlay.style.display = 'none';
                updateProductDetails(cardImage, selectedVariant, selectedColor, product, card, priceElement, sizeContainer, firstPosition);
            } else {
                // Carregar imagem
                const newImage = new Image();
                newImage.onload = () => {
                    imageCache.set(selectedVariant.image, newImage);
                    cardImage.src = selectedVariant.image;
                    cardImage.style.opacity = '1';
                    loadingOverlay.style.display = 'none';
                    updateProductDetails(cardImage, selectedVariant, selectedColor, product, card, priceElement, sizeContainer, firstPosition);
                };
                
                newImage.onerror = () => {
                    console.error('Erro ao carregar imagem:', selectedVariant.image);
                    cardImage.style.opacity = '1';
                    loadingOverlay.style.display = 'none';
                };
                
                newImage.src = selectedVariant.image;
            }
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
            const basePrice = product.discount ? 
                selectedVariant.price * (1 - product.discount / 100) : 
                selectedVariant.price;
            const finalPrice = calculateFinalPrice(basePrice, selectedPosition);
            priceElement.textContent = finalPrice.toFixed(2);
        });
    });

    return card;
}

// Função auxiliar para atualizar detalhes do produto
function updateProductDetails(cardImage, selectedVariant, selectedColor, product, card, priceElement, sizeContainer, firstPosition) {
    cardImage.setAttribute('data-color', selectedColor);
    cardImage.alt = `${product.name} - Cor ${selectedColor}`;
    
    // Obter posição atual para calcular preço
    const activePositionDot = card.querySelector('.position-dot.active');
    const currentPosition = activePositionDot ? activePositionDot.getAttribute('data-position') : firstPosition;
    
    // Calcular preço final considerando cor E posição
    const basePrice = product.discount ? 
        selectedVariant.price * (1 - product.discount / 100) : 
        selectedVariant.price;
    const finalPrice = calculateFinalPrice(basePrice, currentPosition);
    priceElement.textContent = finalPrice.toFixed(2);
    
    // Atualizar tamanhos disponíveis
    updateSizesForColor(sizeContainer, selectedVariant.sizes);
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
    const numericId = parseInt(id);
    for (const subcategory in products) {
        const product = products[subcategory].find(p => p.id === numericId);
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
        'grade-container-canecas',
        'grade-container-ofertas'
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
    const categories = ['masculino', 'unissexo', 'canecas', 'ofertas'];
    
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
    console.log('Ofertas container:', document.getElementById('grade-container-ofertas'));
    console.log('All grade containers:', document.querySelectorAll('.grade-container'));
    console.log('=== END DEBUG ===');
}

// Inicializar as grades quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Pré-carregar imagens primeiro
        preloadProductImages();
        // Popular grades após um pequeno delay para garantir que o DOM está pronto
        setTimeout(populateAllGrades, 100);
    });
} else {
    preloadProductImages();
    setTimeout(populateAllGrades, 100);
}