// Dados dois produtos
const products = {
    masculino: [
        {
            id: 1,
            name: "Camisa Masculina 1",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/8k2J4p7L/1.png",
                    price: 39.50,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/HxJn0RH0/2.png",
                    price: 43.42,
                    sizes: ['P', 'M'}
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina de alta qualidade com design exclusivo"
        },
        {
            id: 2,
            name: "Camisa Masculina 2",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/kg4mt87T/1.png",
                    price: 41.20,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/26xcwcwF/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/mk4NyfJX/Sem-tempo-pra-cozinhar.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina com estampa moderna e confortável"
        },
        {
            id: 3,
            name: "Camisa Masculina 3",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/2jMvtdKn/03.png",
                    price: 40.80,
                    sizes: ['P', 'M', 'G']
                },
                'preto': {
                    image: "https://i.postimg.cc/pXpyc1vQ/Sem-tempo-pra-cozinhar-1.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina premium para o dia a dia"
        },
        {
            id: 4,
            name: "Camisa Masculina 4",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/2jZ7F8zF/04.png",
                    price: 39.90,
                    sizes: ['P', 'M', 'G']
                },
                'preto': {
                    image: "https://i.postimg.cc/XNZpQz4Q/Sem-tempo-pra-cozinhar-2.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina estilo casual"
        },
        {
            id: 5,
            name: "Camisa Masculina 5",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/RCf3hWdx/1.png",
                    price: 41.75,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/rscqKwy8/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina confortável e durável"
        },
        {
            id: 6,
            name: "Camisa Masculina 6",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/VkSPsC9r/1.png",
                    price: 40.25,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/Y9MPFGFg/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/9fnc9c4N/Sem-tempo-pra-cozinhar-3.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina para momentos especiais"
        },
        {
            id: 7,
            name: "Camisa Masculina 7",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/PNsYLZpt/1.png",
                    price: 39.60,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/DfbCzPR2/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/KvfSLmwT/Sem-tempo-pra-cozinhar-4.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina com design inovador"
        },
        {
            id: 8,
            name: "Camisa Masculina 8",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/brTSvMhS/08.png",
                    price: 41.90,
                    sizes: ['P', 'M', 'G']
                 },
                 'preto': {
                    image: "https://i.postimg.cc/BnPp3gTS/Sem-tempo-pra-cozinhar-5.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina estilo urbano"
        },
        {
            id: 9,
            name: "Camisa Masculina 9",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/KYBzzV7b/09.png",
                    price: 40.45,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina premium"
        },
        {
            id: 10,
            name: "Camisa Masculina 10",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/YqTMWRCb/1.png",
                    price: 39.80,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/SKk06vF7/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina casual"
        },
        {
            id: 11,
            name: "Camisa Masculina 11",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/259DC7Mf/1.png",
                    price: 41.30,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/YS95Dm00/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/hGrdRz5d/Sem-tempo-pra-cozinhar-6.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina esportiva"
        },
        {
            id: 12,
            name: "Camisa Masculina 12",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/1t0rpvSN/12.png",
                    price: 40.15,
                    sizes: ['P', 'M', 'G']
                },
                'preto': {
                    image: "https://i.postimg.cc/xCZq9Ky1/Sem-tempo-pra-cozinhar-7.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina básica"
        },
        {
            id: 13,
            name: "Camisa Masculina 13",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/PJrY1hKK/1.png",
                    price: 41.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/SsVzS3qs/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina estilosa"
        },
        {
            id: 14,
            name: "Camisa Masculina 14",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/L53RFFp4/1.png",
                    price: 39.95,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/FHqMqHLR/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina moderna"
        },
        {
            id: 15,
            name: "Camisa Masculina 15",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/HkG0hGL1/15.png",
                    price: 40.50,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina clássica"
        },
        {
            id: 16,
            name: "Camisa Masculina 16",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/7YzQBrkj/1.png",
                    price: 41.10,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/qgHtjTxD/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/tTsWdRB3/Sem-tempo-pra-cozinhar-8.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina descontraída"
        },
        {
            id: 17,
            name: "Camisa Masculina 17",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/6515hRBC/1.png",
                    price: 39.70,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/02ZJ1bPJ/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/2y4qT1hC/Sem-tempo-pra-cozinhar-9.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina versátil"
        },
        {
            id: 18,
            name: "Camisa Masculina 18",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/tTmmcX7b/1.png",
                    price: 41.40,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/k4hhHnDm/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/pTjyXm0Y/Sem-tempo-pra-cozinhar-10.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina elegante"
        },
        {
            id: 19,
            name: "Camisa Masculina 19",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/dtFSSSVM/19.png",
                    price: 40.20,
                    sizes: ['P', 'M', 'G']
                 },
                'preto': {
                    image: "https://i.postimg.cc/J0m7rPHL/Sem-tempo-pra-cozinhar-11.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina prática"
        },
        {
            id: 20,
            name: "Camisa Masculina 20",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/jdRZhwMs/1.png",
                    price: 41.80,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/fyf5NDR3/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/Twvf0C9S/Sem-tempo-pra-cozinhar-12.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina jovem"
        },
        {
            id: 21,
            name: "Camisa Masculina 21",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/fR9tt5Yc/1.png",
                    price: 39.85,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/13qnnMDf/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina estampada"
        },
        {
            id: 22,
            name: "Camisa Masculina 22",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/5NPTYSf0/1.png",
                    price: 40.75,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/025hyBRF/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina personalizada"
        },
        {
            id: 23,
            name: "Camisa Masculina 23",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/Dzhr7RRw/1.png",
                    price: 41.55,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/Dzhr7RRw/1.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/0y1n8ScZ/Sem-tempo-pra-cozinhar-13.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina exclusiva"
        },
        {
            id: 24,
            name: "Camisa Masculina 24",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/jjv7t2zN/1.png",
                    price: 40.05,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/Z58NsV0C/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/SRzL4Q9T/Sem-tempo-pra-cozinhar-14.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina especial"
        },
        {
            id: 25,
            name: "Camisa Masculina 25",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/Zqqr96YX/1.png",
                    price: 41.25,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/4xP6NWGV/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina premium plus"
        },
        {
            id: 26,
            name: "Camisa Masculina 26",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/3xxy9YM2/1.png",
                    price: 39.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/x11kgnrK/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina comfort"
        },
        {
            id: 27,
            name: "Camisa Masculina 27",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/SNNNbdgD/1.png",
                    price: 40.95,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/j2vxJnjq/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/kGxc8X5z/Sem-tempo-pra-cozinhar-15.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina style"
        },
        {
            id: 28,
            name: "Camisa Masculina 28",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/Hxd14WRT/1.png",
                    price: 41.70,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/cH0GM120/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/6pHhCPBF/Sem-tempo-pra-cozinhar-16.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina fashion"
        },
        {
            id: 29,
            name: "Camisa Masculina 29",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/gjLsx8D1/1.png",
                    price: 40.35,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/FRBGFDjP/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina trend"
        },
        {
            id: 30,
            name: "Camisa Masculina 30",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/JzxFV3d2/1.png",
                    price: 39.55,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/JzMF2YKk/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina cool"
        },
        {
            id: 31,
            name: "Camisa Masculina 31",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/P554Dg2M/1.png",
                    price: 41.15,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/L8QV3xWR/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina unique"
        },
        {
            id: 32,
            name: "Camisa Masculina 32",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/4xYcssW0/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/vHH92Wfb/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina elite"
        },
        {
            id: 33,
            name: "Camisa Masculina 33",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/8C87GWJY/1.png",
                    price: 41.85,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/0yKzhZQD/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/6pR9vkVQ/Sem-tempo-pra-cozinhar-17.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina final"
        },
        {
            id: 34,
            name: "Camisa Masculina 34",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/BQxFMbCS/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/WbMZXz7Z/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/mr8KzjnG/Sem-tempo-pra-cozinhar-18.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina premium edition"
        },
        {
            id: 35,
            name: "Camisa Masculina 35",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/GmfbDJs2/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/jS1RfQJK/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/8CXNQTNZ/Sem-tempo-pra-cozinhar-19.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina street style"
        },
        {
            id: 36,
            name: "Camisa Masculina 36",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/NFXdNtdd/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/PJDS6HS6/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/D0q9ZhkN/Sem-tempo-pra-cozinhar-20.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina urban vibe"
        },
        {
            id: 37,
            name: "Camisa Masculina 37",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/9fN1C0Kz/1.png",
                    price: 40.85,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/PqFKTJ9C/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/76Ss1Nsn/Sem-tempo-pra-cozinhar-21.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina modern classic"
        },
        {
            id: 38,
            name: "Camisa Masculina 38",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/fyQcR9KN/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/hjd8nrVy/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/fb9BZKhr/Sem-tempo-pra-cozinhar-22.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina essential"
        },
        {
            id: 39,
            name: "Camisa Masculina 39",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/282ZPJP6/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/5NnCZGDh/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/3Rp8gPQ2/Sem-tempo-pra-cozinhar-23.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina signature"
        },
        {
            id: 40,
            name: "Camisa Masculina 40",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/rwDK7p1f/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/QdFHvMQk/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina limited edition"
        },
        {
            id: 41,
            name: "Camisa Masculina 41",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/VLVN9cxc/1.png",
                    price: 41.35,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/m25r3G00/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina collector's item"
        },
        {
            id: 42,
            name: "Camisa Masculina 42",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/0yS9pKGJ/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/CLXFBs8q/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/BvT7Hgw1/Sem-tempo-pra-cozinhar-24.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina urban collection"
        },
        {
            id: 43,
            name: "Camisa Masculina 43",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/ZqZzp75q/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/rpc2xnwc/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/KYfrmsHw/Sem-tempo-pra-cozinhar-25.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina premium fit"
        },
        {
            id: 44,
            name: "Camisa Masculina 44",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/dVPbcHdL/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/htWkRyx0/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina comfort plus"
        },
        {
            id: 45,
            name: "Camisa Masculina 45",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/90wnvZfX/1.png",
                    price: 40.95,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/QCKyR1MZ/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/pT2x3k90/Sem-tempo-pra-cozinhar-26.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina ultimate"
        },
        {
            id: 46,
            name: "Camisa Masculina 46",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/DZRTJ2JV/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/fL1Ntw3v/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina core collection"
        },
        {
            id: 47,
            name: "Camisa Masculina 47",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/xCNdFpMs/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'preto': {
                    image: "https://i.postimg.cc/YC15kYBf/Sem-tempo-pra-cozinhar-27.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina essential wear"
        },
        {
            id: 48,
            name: "Camisa Masculina 48",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/s2t651cT/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/GpZ7v9QP/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/8P8DS1rV/Sem-tempo-pra-cozinhar-28.png",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina daily basic"
        },
        {
            id: 49,
            name: "Camisa Masculina 49",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/ZK7LrCYK/1.png",
                    price: 41.50,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/Nff491tG/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina urban essential"
        },
        {
            id: 50,
            name: "Camisa Masculina 50",
            category: "masculino",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/RVDcWyGd/1.png",
                    price: 40.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/sDNpMqKY/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'preto': {
                    image: "https://i.postimg.cc/Gpt6DNsf/Sem-tempo-pra-cozinhar.jpg",
                    price: 43.42,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta masculina final edition"
        }
    ],
    unissexo: [
        {
            id: 51,
            name: "Camisa Unissexo 1",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/fLgjhNp0/1.png",
                    price: 39.90,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo versátil e confortável"
        },
        {
            id: 52,
            name: "Camisa Unissexo 2",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/g0zvXjP2/1.png",
                    price: 41.15,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/0ydYymhz/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/zfznbv1X/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo para todos os estilos"
        },
        {
            id: 53,
            name: "Camisa Unissexo 3",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/13c0dNQN/1.png",
                    price: 40.45,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/x1yGZb2Y/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/GmJPfsC8/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo moderna"
        },
        {
            id: 54,
            name: "Camisa Unissexo 4",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/GhvvBs9s/1.png",
                    price: 39.75,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/RCkcVTCw/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/pVwDXBVC/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo casual"
        },
        {
            id: 55,
            name: "Camisa Unissexo 5",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/cLstr9py/1.png",
                    price: 41.30,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/TYjW2M4X/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/3xK0dSsM/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo confortável"
        },
        {
            id: 56,
            name: "Camisa Unissexo 6",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/0jRbxcG2/1.png",
                    price: 40.20,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/kG3B9fQh/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/WzLhjXmp/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo prática"
        },
        {
            id: 57,
            name: "Camisa Unissexo 7",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/Fz4sw1mc/1.png",
                    price: 39.55,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/hvBPNhgc/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/1XQ5b4Pq/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo estilosa"
        },
        {
            id: 58,
            name: "Camisa Unissexo 8",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/jSLKgyNN/1.png",
                    price: 41.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/VL7mWKSS/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/Vkd1GXMt/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo fashion"
        },
        {
            id: 59,
            name: "Camisa Unissexo 9",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/rFpLs5hw/1.png",
                    price: 40.85,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/wTbYm3PT/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/9FNH7zSQ/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo trend"
        },
        {
            id: 60,
            name: "Camisa Unissexo 10",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/tR2LKY9f/1.png",
                    price: 39.80,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/KcJd6RmB/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/jqZGpLR1/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo cool"
        },
        {
            id: 61,
            name: "Camisa Unissexo 11",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/44LS8q11/1.png",
                    price: 41.40,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/L4CbywVw/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/gcSTMQK1/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo básica"
        },
        {
            id: 62,
            name: "Camisa Unissexo 12",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/0Q5Vn0Km/1.png",
                    price: 40.50,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/Y9XbsLQN/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/xCst4NL3/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo urbana"
        },
        {
            id: 63,
            name: "Camisa Unissexo 13",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/prwQwfr8/1.png",
                    price: 39.65,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/L5ckct5P/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/8c2d2Rc7/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo esportiva"
        },
        {
            id: 64,
            name: "Camisa Unissexo 14",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/QN9yySnB/1.png",
                    price: 41.25,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/7PGWWXQg/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo descontraída"
        },
        {
            id: 65,
            name: "Camisa Unissexo 15",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/CKxvH4fW/1.png",
                    price: 40.70,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/k5gjFybm/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/fbRHjv9h/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo elegante"
        },
        {
            id: 66,
            name: "Camisa Unissexo 16",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/tCG2mb69/1.png",
                    price: 39.95,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/4NRBFGcG/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/SNbDt4M6/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo premium"
        },
        {
            id: 67,
            name: "Camisa Unissexo 17",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/pVzBjS6s/1.png",
                    price: 41.55,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/jqPhf1FZ/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/zDKkhQcS/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo comfort"
        },
        {
            id: 68,
            name: "Camisa Unissexo 18",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/9XdG07DG/1.png",
                    price: 40.35,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/PfWmJwCF/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/J7Nb0ksY/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo style"
        },
        {
            id: 69,
            name: "Camisa Unissexo 19",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/GpTDC80D/1.png",
                    price: 39.70,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/6Q4ZX2sh/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/BvPF0LWB/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo exclusiva"
        },
        {
            id: 70,
            name: "Camisa Unissexo 20",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/BQhPPc4L/1.png",
                    price: 41.10,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/kXMt5h3S/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/FsPkkgNf/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo personalizada"
        },
        {
            id: 71,
            name: "Camisa Unissexo 21",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/285VYbh4/1.png",
                    price: 40.60,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/GhpHR8GL/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/xTdcQJMM/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo única"
        },
        {
            id: 72,
            name: "Camisa Unissexo 22",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/CxqMMj1y/22.png",
                    price: 39.85,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo especial"
        },
        {
            id: 73,
            name: "Camisa Unissexo 23",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/RCpvcPJS/1.png",
                    price: 41.45,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/gj7dmJb4/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/7PtqgBJx/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo premium plus"
        },
        {
            id: 74,
            name: "Camisa Unissexo 24",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/tRcH1Y8d/1.png",
                    price: 40.15,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/Y2Pw4hTf/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/MZL8cvgX/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo comfort plus"
        },
        {
            id: 75,
            name: "Camisa Unissexo 25",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/0ys5QzJ0/1.png",
                    price: 39.60,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/Qx5xhQVV/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/3xTrRkDj/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo urban style"
        },
        {
            id: 76,
            name: "Camisa Unissexo 26",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/gkPbyfkw/1.png",
                    price: 41.20,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/RCtzHMmy/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/ZKhzP1K0/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo modern fit"
        },
        {
            id: 77,
            name: "Camisa Unissexo 27",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/Ss8tJx96/1.png",
                    price: 40.40,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/C1D6zx86/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/Hngv510w/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo casual comfort"
        },
        {
            id: 78,
            name: "Camisa Unissexo 28",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/nr3KLy3M/1.png",
                    price: 39.75,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/XqsKvRsL/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/Rhg10kgR/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo everyday"
        },
        {
            id: 79,
            name: "Camisa Unissexo 29",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/15LnKRVy/1.png",
                    price: 41.35,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/NfW9xG2Y/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/X7ZBFBqb/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo street style"
        },
        {
            id: 80,
            name: "Camisa Unissexo 30",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/rwXsrh7r/1.png",
                    price: 40.55,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/WbJttRYh/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/9Q507xsw/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo urban comfort"
        },
        {
            id: 81,
            name: "Camisa Unissexo 31",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/9QhThFm8/1.png",
                    price: 39.95,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/dVYdYts5/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/nc77gQJT/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo basic style"
        },
        {
            id: 82,
            name: "Camisa Unissexo 32",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/9Qb4HdNm/1.png",
                    price: 41.50,
                    sizes: ['P', 'M', 'G']
                },
                'rosa claro': {
                    image: "https://i.postimg.cc/Bnp8fTwP/2.png",
                    price: 43.42,
                    sizes: ['P', 'M']
                },
                'azul claro': {
                    image: "https://i.postimg.cc/P5yLnWFw/3.png",
                    price: 43.42,
                    sizes: ['M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo final touch"
        },
        {
            id: 83,
            name: "Camisa Unissexo 33",
            category: "unissexo",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/4xfdPKNK/33.png",
                    price: 40.25,
                    sizes: ['P', 'M', 'G']
                }
            },
            positions: ['frente', 'atras', 'ambos'],
            description: "Camiseta unissexo última edição"
        }
    ],
    canecas: [
        {
            id: 84,
            name: "Caneca 1",
            category: "canecas",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/J0tn8vvD/070bee7b-00d5-46ac-ad24-aca5b61ace35.png",
                    price: 32.90,
                    sizes: ['Único']
                }
            },
            positions: [],
            description: "Caneca personalizada de alta qualidade para seu dia a dia"
        },
        {
            id: 85,
            name: "Caneca 2",
            category: "canecas",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/J0tn8vvD/070bee7b-00d5-46ac-ad24-aca5b61ace35.png",
                    price: 32.90,
                    sizes: ['Único']
                }
            },
            positions: [],
            description: "Caneca premium com design exclusivo"
        },
        {
            id: 86,
            name: "Caneca 3",
            category: "canecas",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/J0tn8vvD/070bee7b-00d5-46ac-ad24-aca5b61ace35.png",
                    price: 32.90,
                    sizes: ['Único']
                }
            },
            positions: [],
            description: "Caneca especial para momentos únicos"
        },
        {
            id: 87,
            name: "Caneca 4",
            category: "canecas",
            variants: {
                'branco': {
                    image: "https://i.postimg.cc/J0tn8vvD/070bee7b-00d5-46ac-ad24-aca5b61ace35.png",
                    price: 32.90,
                    sizes: ['Único']
                }
            },
            positions: [],
            description: "Caneca final da coleção premium"

            }
    ]
};


// Aplicar descontos em 100% dos produtos - CORRIGIDO
function applyStrategicDiscounts() {
    console.log('Aplicando descontos estratégicos em 100% dos produtos...');
    
    const allProducts = [
        ...products.masculino, 
        ...products.unissexo, 
        ...products.canecas
    ];
    
    // Aplicar desconto em TODOS os produtos (100%)
    console.log(`Aplicando descontos em ${allProducts.length} produtos`);
    
    allProducts.forEach(product => {
        // Gerar preço original fictício entre R$45 e R$62
        const originalPrice = parseFloat((Math.random() * (62 - 45) + 45).toFixed(2));
        
        // Calcular desconto entre 15% e 35%
        const discountPercentage = Math.floor(Math.random() * 20) + 15; // 15% a 35%
        
        // Calcular preço de venda mantendo o preço real
        const currentPrice = product.variants[Object.keys(product.variants)[0]].price;
        
        // Armazenar dados do desconto
        product.originalPriceFicticio = originalPrice;
        product.discountPercentageFicticio = discountPercentage;
        product.hasFictionalDiscount = true;
        
        console.log(`Produto ${product.id}: De R$ ${originalPrice} por R$ ${currentPrice} (${discountPercentage}% OFF)`);
    });
}

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

// Função auxiliar para favoritos
function isProductFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(productId);
}

// Função auxiliar para toggle favoritos
function toggleFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(productId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
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

// Criar card de produto para a grade - VERSÃO OTIMIZADA
function createGradeCard(product) {
    const card = document.createElement('div');
    card.className = 'grade-card';
    card.setAttribute('data-product-id', product.id);

    const firstColor = Object.keys(product.variants)[0];
    const firstVariant = product.variants[firstColor];
    const firstImage = firstVariant.image;
    const firstPrice = firstVariant.price;

    // Calcular preço inicial
    const initialPrice = firstPrice;

    // Badges do produto
    const badges = [];
    if (product.discount) badges.push(`<span class="badge badge-discount">-${product.discount}% OFF</span>`);

    // Desconto fictício (agora 100% dos produtos têm)
    const hasFictionalDiscount = product.hasFictionalDiscount;
    const originalPriceFicticio = product.originalPriceFicticio;
    const discountPercentage = product.discountPercentageFicticio;

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

    // Preços com desconto (100% dos produtos agora têm desconto)
    let finalPrice = initialPrice;
    let priceHTML = '';

    // SEMPRE mostrar preço com desconto (agora 100% dos produtos têm)
    if (hasFictionalDiscount && originalPriceFicticio) {
        priceHTML = `
            <div class="grade-card-pricing-premium">
                <div class="original-price-ficticio">
                    De R$ ${originalPriceFicticio.toFixed(2)}
                </div>
                <div class="current-price-with-discount">
                    <span class="price-por">Por</span> 
                    R$ ${finalPrice.toFixed(2)}
                </div>
                <div class="promo-savings">
                    Economize ${discountPercentage}%
                </div>
            </div>
        `;
    } else {
        // Fallback caso algum produto não tenha desconto (não deveria acontecer)
        priceHTML = `
            <div class="grade-card-price-simple">
                R$ ${finalPrice.toFixed(2)}
            </div>
        `;
    }

    // Ícone de favoritos
    const isFav = isProductFavorite(product.id);
    const favIconClass = isFav ? 'fas fa-heart' : 'far fa-heart';
    const favActiveClass = isFav ? 'active' : '';

    card.innerHTML = `
        <div class="image-container">
            <div class="premium-discount-badge">
                <span class="discount-percent">-${discountPercentage}%</span>
                <span class="discount-text">OFF</span>
            </div>
            
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
            
            ${priceHTML}
            
            ${Object.keys(product.variants).length > 1 ? `<div class="grade-card-colors">${colorDots}</div>` : ''}
        </div>
    `;

    // Adicionar event listener para o ícone de favoritos
    const favoriteIcon = card.querySelector('.favorite-icon');
    favoriteIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const productId = this.getAttribute('data-product-id');
        toggleFavorite(productId);
    });

    // Adicionar event listeners para cores
    const colorDotsElements = card.querySelectorAll('.color-dot');
    const cardImage = card.querySelector('.grade-card-image');
    const loadingOverlay = card.querySelector('.image-loading-overlay');
    
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
                cardImage.src = selectedVariant.image;
                cardImage.style.opacity = '1';
                loadingOverlay.style.display = 'none';
            } else {
                // Carregar imagem
                const newImage = new Image();
                newImage.onload = () => {
                    imageCache.set(selectedVariant.image, newImage);
                    cardImage.src = selectedVariant.image;
                    cardImage.style.opacity = '1';
                    loadingOverlay.style.display = 'none';
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

    return card;
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

// Popular todas as grades - VERSÃO CORRIGIDA
function populateAllGrades() {
    console.log('Iniciando população das grades...');
    
    // Aplicar descontos primeiro
    applyStrategicDiscounts();
    
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

// Inicialização correta - SEM setTimeout
function initializeProducts() {
    console.log('Inicializando produtos...');
    
    // Aplicar descontos em 100% dos produtos
    applyStrategicDiscounts();
    
    // Pré-carregar imagens
    preloadProductImages();
    
    // Popular grades imediatamente
    populateAllGrades();
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Carregado - Inicializando produtos...');
    initializeProducts();
});

// Expor funções globalmente para main.js acessar
window.populateAllGrades = populateAllGrades;
window.findProductById = findProductById;
window.initializeProducts = initializeProducts;