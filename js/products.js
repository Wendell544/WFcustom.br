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
    canecas: [
        { 
            id: 25, 
            name: 'Caneca Personalizada Branca', 
            price: 25, 
            category: 'canecas', 
            subcategory: 'canecas', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg'
            },
            description: 'Caneca personalizada de alta qualidade.' 
        },
        { 
            id: 26, 
            name: 'Caneca com Estampa Exclusiva', 
            price: 28, 
            category: 'canecas', 
            subcategory: 'canecas', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg'
            },
            description: 'Caneca com estampa exclusiva e duradoura.' 
        },
        { 
            id: 57, 
            name: 'Caneca Frase Motivacional', 
            price: 22, 
            category: 'canecas', 
            subcategory: 'canecas', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg'
            },
            description: 'Caneca com frase motivacional.' 
        },
        { 
            id: 58, 
            name: 'Caneca Temática', 
            price: 30, 
            category: 'canecas', 
            subcategory: 'canecas', 
            variants: {
                'branco': 'https://i.postimg.cc/8PfDKrrG/download.jpg'
            },
            description: 'Caneca temática com design exclusivo.' 
        }
    ]
};