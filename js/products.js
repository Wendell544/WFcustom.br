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
        products: [
        {
            id: 1,
            name: 'camisa Unissexo Colorida 1',
            price: 25,
            category: 'unissexo',
            subcategory: 'estampados',
            variants: {
                'branco': 'https://i.postimg.cc/s2RrLhtw/1.png',
                'preto': 'https://i.postimg.cc/PxSnNFNQ/2.png',
                'cinza': 'https://i.postimg.cc/X7p4B3fN/3.png'
            },
            description: 'Camiseta confortável e moderna.'
        },
        {
            id: 2,
            name: 'Camiseta Unissexo Colorida 2',
            price: 26,
            category: 'unissexo',
            subcategory: 'estampados',
            variants: 
            {
                'branco': 'https://i.postimg.cc/vT7qc40N/1.png',
                'cinza': 'https://i.postimg.cc/0NLcnYFr/3.png',
            },
            description: 'Camiseta unissexo colorida.'
        },
        {
            id: 3,
            name: 'Camiseta Unissexo Colorida 3',
            price: 28,
            category: 'unissexo',
            subcategory: 'estampados',
            variants: {
                'branco': 'https://i.postimg.cc/PxQYD1kM/1.png',
                'preto': 'https://i.postimg.cc/05Z72Gnk/2.png',
                'cinza': 'https://i.postimg.cc/LsfzHrQs/3.png'
            },
            description: 'Camiseta unissexo ideal para o dia a dia.'
        },
        {
            id: 4,
            name: 'Camiseta Unissexo Colorida 4',
            price: 27,
            category: 'unissexo',
            subcategory: 'estampados',
            variants: {
                'branco': 'https://i.postimg.cc/HWPjh635/1.png',
                'preto': 'https://i.postimg.cc/652TJCmJ/2.png',
                'cinza': 'https://i.postimg.cc/X7RqVXRB/3.png'
            },
            description: 'Camiseta leve, com tecido respirável e ótimo caimento.'
        },
        {
            id: 5,
            name: 'Camiseta Unissexo Colorida 5',
            price: 29,
            category: 'unissexo',
            subcategory: 'estampados',
            variants: {
                'branco': 'https://i.postimg.cc/KzWFJHFx/1.png',
                'preto': 'https://i.postimg.cc/gcw6m9xQ/2.png',
                'cinza': 'https://i.postimg.cc/Qx19Kpk6/3.png'
            },
            description: 'Modelo clássico com toque macio e cores vibrantes.'
        },
        {
            id: 6,
            name: 'Camiseta Unissexo Colorida 6',
            price: 22,
            category: 'unissexo',
            subcategory: 'estampados',
            variants: {
                'branco': 'https://i.postimg.cc/QM9rVq1Y/1.png',
                'preto': 'https://i.postimg.cc/j5y04dgr/2.png',
                'cinza': 'https://i.postimg.cc/ncFbqxq7/3.png'
            },
            description: 'Camiseta Estampada, leve e confortável para o dia a dia.'
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