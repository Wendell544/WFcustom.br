// Dados de exemplo para produtos
const products = {
    masculino: {
        estampadas: [
            { 
                id: 9, 
                name: 'Camiseta Estampada Azul', 
                price: 35, 
                category: 'masculino', 
                subcategory: 'estampadas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta estampada com design exclusivo.' 
            },
            { 
                id: 10, 
                name: 'Camiseta Estampada Verde', 
                price: 35, 
                category: 'masculino', 
                subcategory: 'estampadas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta estampada com design exclusivo.' 
            },
            { 
                id: 11, 
                name: 'Camiseta Estampada Vermelha', 
                price: 35, 
                category: 'masculino', 
                subcategory: 'estampadas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta estampada com design exclusivo.' 
            },
            { 
                id: 12, 
                name: 'Camiseta Estampada Amarela', 
                price: 35, 
                category: 'masculino', 
                subcategory: 'estampadas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta estampada com design exclusivo.' 
            }
        ],
        esportivas: [
            { 
                id: 17, 
                name: 'Camiseta Esportiva Cinza', 
                price: 45, 
                category: 'masculino', 
                subcategory: 'esportivas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta esportiva com tecnologia dry-fit.' 
            },
            { 
                id: 18, 
                name: 'Camiseta Esportiva Preta', 
                price: 45, 
                category: 'masculino', 
                subcategory: 'esportivas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta esportiva com tecnologia dry-fit.' 
            },
            { 
                id: 19, 
                name: 'Camiseta Esportiva Azul', 
                price: 45, 
                category: 'masculino', 
                subcategory: 'esportivas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta esportiva com tecnologia dry-fit.' 
            },
            { 
                id: 20, 
                name: 'Camiseta Esportiva Vermelha', 
                price: 45, 
                category: 'masculino', 
                subcategory: 'esportivas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta esportiva com tecnologia dry-fit.' 
            }
        ]
    },
    unissexo: {
        personagens: [
            { 
                id: 41, 
                name: 'Camiseta Unissexo Super Herói', 
                price: 28, 
                category: 'unissexo', 
                subcategory: 'personagens', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta unissexo com estampa de super herói.' 
            },
            { 
                id: 42, 
                name: 'Camiseta Unissexo Personagem Animado', 
                price: 28, 
                category: 'unissexo', 
                subcategory: 'personagens', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta unissexo com personagem animado.' 
            },
            { 
                id: 43, 
                name: 'Camiseta Unissexo Personagem Disney', 
                price: 28, 
                category: 'unissexo', 
                subcategory: 'personagens', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta unissexo com personagem Disney.' 
            },
            { 
                id: 44, 
                name: 'Camiseta Unissexo Personagem Marvel', 
                price: 28, 
                category: 'unissexo', 
                subcategory: 'personagens', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta unissexo com personagem Marvel.' 
            }
        ],
        coloridas: [
            { 
                id: 49, 
                name: 'Camiseta Unissexo Colorida', 
                price: 26, 
                category: 'unissexo', 
                subcategory: 'coloridas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta unissexo colorida.' 
            },
            { 
                id: 50, 
                name: 'Camiseta Unissexo Arco-Íris', 
                price: 26, 
                category: 'unissexo', 
                subcategory: 'coloridas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta unissexo com estampa arco-íris.' 
            },
            { 
                id: 51, 
                name: 'Camiseta Unissexo Colorida 1', 
                price: 26, 
                category: 'unissexo', 
                subcategory: 'coloridas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta unissexo colorida.' 
            },
            { 
                id: 52, 
                name: 'Camiseta Unissexo Colorida 2', 
                price: 26, 
                category: 'unissexo', 
                subcategory: 'coloridas', 
                variants: {
                    'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
                },
                description: 'Camiseta unissexo colorida.' 
            }
        ]
    },
    frases: [
        { 
            id: 1, 
            name: 'Camiseta Frase Branca', 
            price: 25, 
            category: 'frases', 
            subcategory: 'frases', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
            },
            description: 'Camiseta com frase inspiradora.' 
        },
        { 
            id: 2, 
            name: 'Camiseta Frase Preta', 
            price: 25, 
            category: 'frases', 
            subcategory: 'frases', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
            },
            description: 'Camiseta com frase motivacional.' 
        },
        { 
            id: 59, 
            name: 'Camiseta Frase Unissexo', 
            price: 22, 
            category: 'frases', 
            subcategory: 'frases', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
            },
            description: 'Camiseta unissexo com frase.' 
        },
        { 
            id: 60, 
            name: 'Camiseta Frase Divertida', 
            price: 22, 
            category: 'frases', 
            subcategory: 'frases', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
            },
            description: 'Camiseta com frase divertida.' 
        }
    ],
    premium: [
        { 
            id: 25, 
            name: 'Camiseta Premium Algodão Egípcio', 
            price: 65, 
            category: 'premium', 
            subcategory: 'premium', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
            },
            description: 'Camiseta premium em algodão egípcio de alta qualidade.' 
        },
        { 
            id: 26, 
            name: 'Camiseta Premium Linho', 
            price: 70, 
            category: 'premium', 
            subcategory: 'premium', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
            },
            description: 'Camiseta premium em tecido de linho.' 
        },
        { 
            id: 57, 
            name: 'Camiseta Premium Algodão', 
            price: 45, 
            category: 'premium', 
            subcategory: 'premium', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
            },
            description: 'Camiseta premium em algodão de alta qualidade.' 
        },
        { 
            id: 58, 
            name: 'Camiseta Premium Estampada', 
            price: 48, 
            category: 'premium', 
            subcategory: 'premium', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg',
                    'preto': 'https://i.postimg.cc/kG6rpkGD/download.jpg',
                    'azul': 'https://i.postimg.cc/k4j9ZQy1/download.jpg',
                    'cinza': 'https://i.postimg.cc/HLBfsp7w/download.jpg'
            },
            description: 'Camiseta premium com estampa exclusiva.' 
        }
    ]
};

// Criar card de produto para a grade
function createGradeCard(product) {
    const card = document.createElement('div');
    card.className = 'grade-card';
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('data-variants', JSON.stringify(product.variants));

    // Obter a primeira cor como padrão
    const firstColor = Object.keys(product.variants)[0];
    const firstImage = product.variants[firstColor];

    // Criar as bolinhas de cor
    const colorDots = Object.keys(product.variants).map(color => {
        let bgColor;
        switch(color) {
            case 'branco': bgColor = 'white'; break;
            case 'preto': bgColor = 'black'; break;
            case 'azul': bgColor = '#007bff'; break;
            case 'cinza': bgColor = '#6c757d'; break;
            default: bgColor = color;
        }
        return `<div class="color-dot ${color === firstColor ? 'active' : ''}" data-color="${color}" style="background-color: ${bgColor};"></div>`;
    }).join('');

    card.innerHTML = `
        <div class="image-container">
            <img src="${firstImage}" alt="${product.name}" class="grade-card-image" data-color="${firstColor}" loading="lazy">
        </div>
        <div class="grade-card-info">
            <h3 class="grade-card-title">${product.name}</h3>
            <div class="grade-card-price">R$ ${product.price}</div>
            <div class="grade-card-colors">
                ${colorDots}
            </div>
        </div>
    `;

    // Adicionar event listeners para as bolinhas de cor
    const colorDotsElements = card.querySelectorAll('.color-dot');
    const cardImage = card.querySelector('.grade-card-image');
    
    colorDotsElements.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remover classe active de todas as bolinhas
            colorDotsElements.forEach(d => d.classList.remove('active'));
            
            // Adicionar classe active à bolinha clicada
            dot.classList.add('active');
            
            // Obter a cor selecionada
            const selectedColor = dot.getAttribute('data-color');
            
            // Atualizar a imagem
            const variants = JSON.parse(card.getAttribute('data-variants'));
            cardImage.src = variants[selectedColor];
            cardImage.setAttribute('data-color', selectedColor);
            cardImage.alt = `${product.name} - Cor ${selectedColor}`;
        });
    });

    return card;
}

// Popular uma grade
function populateGrade(gradeId, productList) {
    const gradeContainer = document.getElementById(`grade-container-${gradeId}`);

    // Limpar
    gradeContainer.innerHTML = '';

    // Adicionar produtos à grade (máximo 10)
    productList.slice(0, 10).forEach(product => {
        const card = createGradeCard(product);
        gradeContainer.appendChild(card);
    });
}

// Popular coleção Premium
function populateColecaoPremium() {
    const gradeContainer = document.getElementById('grade-container-premium');

    // Limpar
    gradeContainer.innerHTML = '';

    // Adicionar produtos premium à grade
    products.premium.slice(0, 10).forEach(product => {
        const card = createGradeCard(product);
        gradeContainer.appendChild(card);
    });
}

// Popular coleção Frases
function populateColecaoFrases() {
    const gradeContainer = document.getElementById('grade-container-frases');

    // Limpar
    gradeContainer.innerHTML = '';

    // Adicionar produtos de frases à grade
    products.frases.slice(0, 10).forEach(product => {
        const card = createGradeCard(product);
        gradeContainer.appendChild(card);
    });
}