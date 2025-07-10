// This is a mock implementation for demo purposes
// In a real application, this would be replaced with actual database queries

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice?: number
  images: string[]
  category: string
  rating: number
  isNew?: boolean
  isOnSale?: boolean
  salePrice?: number
  stock: number
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    length: number
  }
  features: string[]
  tags: string[]
  specs?: { [key: string]: string }
}

const products: Product[] = [
  {
    id: "1",
    name: "Tiracolo Black",
    slug: "bolsa-tiracolo-black",
    description:
      "Sofisticação e versatilidade em cada detalhe. A Bolsa Tiracolo Black é a escolha perfeita para quem busca elegância e praticidade no dia a dia. Seu design minimalista e atemporal combina com qualquer look, do casual ao sofisticado. Um item indispensável para mulheres que valorizam funcionalidade sem abrir mão da classe.",
    price: 105.0,
    images: ["/images/bolsa-tiracolo-black.jpg"],
    category: "Bolsas",
    rating: 4.5,
    isNew: true,
    stock: 45,
    sku: "BT-BLK-001",
    weight: 0.5,
    dimensions: {
      width: 25.0,
      height: 18.0,
      length: 8.0,
    },
    features: ["Corrente dourada", "Fecho magnético", "Compartimento interno", "Alça ajustável"],
    tags: ["bolsa", "tiracolo", "preta", "dourada"],
    specs: {
      Dimensões: "25cm comprimento x 12cm altura x 5.5cm largura",
      Peso: "170g",
      "Revestimento Externo": "Courvim Flex Dune preto",
      "Revestimento Interno": "Forro em tecido preto",
      Ferragens: "Cor dourada",
    },
  },
  {
    id: "2",
    name: "Bolsa Meia-Lua",
    slug: "bolsa-meia-lua",
    description:
      "Design moderno, formato curvo e aquele toque de estilo que transforma qualquer look. A Bolsa Meia-Lua é prática, elegante e cabe tudo o que você precisa — sem perder a leveza e o charme. Ela é perfeita para te acompanhar do café da manhã ao happy hour. É a peça que faltava no seu guarda-roupa.",
    price: 185.0,
    images: ["/images/bolsa-meia-lua.jpeg"],
    category: "Bolsas",
    rating: 4.2,
    isNew: false,
    stock: 30,
    sku: "BT-BLK-002",
    weight: 0.5,
    dimensions: {
      width: 25.0,
      height: 18.0,
      length: 8.0,
    },
    features: ["Corrente dourada", "Fecho magnético", "Compartimento interno", "Alça ajustável"],
    tags: ["bolsa", "tiracolo", "preta", "dourada"],
    specs: {
      Dimensões: "21cm comprimento x 15cm altura x 7cm largura",
      "Revestimento Externo": "Sintético Courvim Pérola",
      "Revestimento Interno": "Forro em tecido claro",
      Fecho: "Prata",
    },
  },
  {
    id: "3",
    name: "Bolsa Safira",
    slug: "bolsa-safira",
    description:
      "Com um design sofisticado e presença marcante, a Bolsa Safira é o acessório ideal para quem busca elegância atemporal. Seu formato estruturado e acabamento refinado valorizam qualquer produção — do look de trabalho ao evento especial. Confeccionada em material de alta qualidade, ela oferece versatilidade no uso e muita personalidade. Possui compartimento espaçoso, forro interno em tecido e fechamento seguro magnético, garantindo praticidade com muito estilo.",
    price: 205.0,
    images: ["/images/bolsa-safira.jpeg"],
    category: "Bolsas",
    rating: 4.8,
    isNew: true,
    stock: 50,
    sku: "BT-BLK-003",
    weight: 0.5,
    dimensions: {
      width: 25.0,
      height: 18.0,
      length: 8.0,
    },
    features: ["Corrente dourada", "Fecho magnético", "Compartimento interno", "Alça ajustável"],
    tags: ["bolsa", "tiracolo", "preta", "dourada"],
    specs: {
      Medidas: "22cm comprimento x 16cm altura x 7cm largura",
      "Revestimento Externo": "Courvim Flex Dune Safira",
      Forro: "Tecido poá bege claro",
      Fechamento: "Botão magnético",
      Alça: "Em corrente",
    },
  },
  {
    id: "4",
    name: "Bolsa Baú",
    slug: "bolsa-bau",
    description:
      "Elegância que se impõe. A Bolsa Baú é um verdadeiro clássico: acabamento impecável e um design que une sofisticação e funcionalidade. Seu formato firme transmite presença e estilo, enquanto o espaço interno amplo acomoda tudo o que você precisa com praticidade. Ideal para te acompanhar da rotina a eventos especiais.",
    price: 210.0,
    images: ["/images/bolsa-bau-new.jpeg"],
    category: "Bolsas",
    rating: 4.0,
    isNew: false,
    stock: 20,
    sku: "BT-BLK-004",
    weight: 0.5,
    dimensions: {
      width: 25.0,
      height: 18.0,
      length: 8.0,
    },
    features: ["Corrente dourada", "Fecho magnético", "Compartimento interno", "Alça ajustável"],
    tags: ["bolsa", "tiracolo", "preta", "dourada"],
    specs: {
      Dimensões: "Altura: 15cm x Largura: 7.5cm x Comprimento: 14.5cm",
      "Revestimento Externo": "Material sintético animal print",
      "Revestimento Interno": "Tecido claro",
      Detalhes: "Possui duas opções de alças e ferragens em tons dourados",
    },
  },
]

export function getProducts(limit?: number) {
  if (limit) {
    return products.slice(0, limit)
  }
  return products
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string, limit?: number) {
  const filtered = products.filter((product) => product.category.toLowerCase() === category.toLowerCase())

  if (limit) {
    return filtered.slice(0, limit)
  }

  return filtered
}

export function getRelatedProducts(categoryId: string, currentProductId: string, limit = 5) {
  return products
    .filter((product) => product.category === categoryId && product.id !== currentProductId)
    .slice(0, limit)
}

export function searchProducts(query: string) {
  const searchTerms = query.toLowerCase().split(" ")

  return products.filter((product) => {
    const searchableText = `
    ${product.name.toLowerCase()} 
    ${product.description.toLowerCase()} 
    ${product.category.toLowerCase()} 
    ${product.tags.join(" ").toLowerCase()}
  `

    return searchTerms.every((term) => searchableText.includes(term))
  })
}

export function getFeaturedProducts(limit = 4) {
  // Return only 4 products now
  return products.slice(0, limit)
}
