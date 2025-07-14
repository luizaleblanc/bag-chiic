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
      "Sofisticação e versatilidade em cada detalhe. A Bolsa Tiracolo Black é a escolha perfeita para quem busca elegância e praticidade no dia a dia. Seu design minimalista e atemporal combina com qualquer look, do casual ao sofisticado. Um item indispensável para mulheres que valorizam funcionalidade sem abrir mão da classe. OBS.: Produto feito a base de cola, contraindicado utilizar em superfícies molhadas.",
    price: 105.0,
    images: ["/images/tiracolo-black-2.jpeg", "/images/tiracolo-black.jpeg"],
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
      "Design moderno, formato curvo e aquele toque de estilo que transforma qualquer look. A Bolsa Meia-Lua é prática, elegante e cabe tudo o que você precisa — sem perder a leveza e o charme. Ela é perfeita para te acompanhar do café da manhã ao happy hour. É a peça que faltava no seu guarda-roupa. OBS.: Produto feito a base de cola, contraindicado utilizar em superfícies molhadas.",
    price: 185.0,
    images: ["/images/bolsa-meia-lua.jpeg", "/images/meia-lua.jpeg"],
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
      "Com um design sofisticado e presença marcante, a Bolsa Safira é o acessório ideal para quem busca elegância atemporal. Seu formato estruturado e acabamento refinado valorizam qualquer produção — do look de trabalho ao evento especial. Confeccionada em material de alta qualidade, ela oferece versatilidade no uso e muita personalidade. Possui compartimento espaçoso, forro interno em tecido e fechamento seguro magnético, garantindo praticidade com muito estilo. OBS.: Produto feito a base de cola, contraindicado utilizar em superfícies molhadas.",
    price: 205.0,
    images: ["/images/bolsa-safira.jpeg", "/images/safira.jpeg"],
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
      "Elegância que se impõe. A Bolsa Baú é um verdadeiro clássico: acabamento impecável e um design que une sofisticação e funcionalidade. Seu formato firme transmite presença e estilo, enquanto o espaço interno amplo acomoda tudo o que você precisa com praticidade. Ideal para te acompanhar da rotina a eventos especiais. OBS.: Produto feito a base de cola, contraindicado utilizar em superfícies molhadas.",
    price: 210.0,
    images: ["/images/bolsa-bau-new.jpeg", "/images/baú.jpeg"],
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
  {
    id: "5",
    name: "Clutch Black", // Nome atualizado
    slug: "clutch-black", // Slug atualizado
    description:
      "Uma clutch sofisticada e versátil, perfeita para eventos especiais ou para adicionar um toque de elegância ao seu dia a dia. Com design minimalista e fecho moderno. OBS.: Produto feito a base de cola, contraindicado utilizar em superfícies molhadas.",
    price: 205.0,
    images: ["/images/clutch black.jpeg", "/images/clutch black 2.jpeg"],
    category: "Bolsas",
    rating: 4.7,
    isNew: true,
    stock: 35,
    sku: "CLT-ELEG-001",
    weight: 0.3,
    dimensions: {
      width: 20.0,
      height: 15.0,
      length: 5.0,
    },
    features: ["Fecho magnético", "Design compacto", "Material premium"],
    tags: ["bolsa", "clutch", "elegante", "azul"],
    specs: {
      Dimensões: "14.5cm comprimento x 14.5cm altura x 7cm largura",
      "Revestimento Externo": "Couvim Flex Dune Preto",
      "Revestimento Interno": "Tecido preto liso",
      Ferragens: "Alça de argola dourada",
      Fecho: "Dourado",
    },
  },
  {
    id: "6",
    name: "Carteira AnimalPrint", // Nome atualizado
    slug: "carteira-animalprint", // Slug atualizado
    description:
      "A Carteira AnimalPrint é a união perfeita entre praticidade e ousadia. Com design compacto e sofisticado, ela traz a clássica estampa com acabamento de alta qualidade, ideal para quem deseja um toque de personalidade no look. Pode ser usada tanto na mão quanto dentro da bolsa principal. Um acessório versátil que combina com produções do dia a dia ou ocasiões especiais. OBS.: Produto feito a base de cola, contraindicado utilizar em superfícies molhadas.",
    price: 95.0,
    images: ["/images/bolsa-carteira-animalprint.jpeg", "/images/carteira animalprint 2.jpeg"],
    category: "Bolsas",
    rating: 4.3,
    isNew: true,
    stock: 25,
    sku: "CRT-ANML-001",
    weight: 0.2,
    dimensions: {
      width: 22.0,
      height: 12.0,
      length: 3.0,
    },
    features: ["Estampa animal print", "Fecho dourado", "Compartimentos internos para cartões"],
    tags: ["bolsa", "carteira", "animal print", "oncinha"],
    specs: {
      Dimensões: "30cm comprimento x 15cm altura x 5cm largura",
      Revestimento: "Externo: Material sintético animal print",
      Forro: "Tecido marrom",
      Fecho: "Em tons dourados",
    },
  },
  {
    id: "7",
    name: "Baú VM Cores",
    slug: "bau-vm-cores",
    description:
      "A Bolsa Baú VM Cores é sinônimo de charme e funcionalidade. Com design estruturado no estilo baú e acabamento multicolorido vibrante, ela traz um visual marcante e sofisticado. Seu espaço interno é amplo, ideal para acompanhar sua rotina com praticidade sem abrir mão do estilo. Um acessório versátil que se destaca em qualquer ocasião. OBS.: Produto feito a base de cola, contraindicado utilizar em superfícies molhadas.",
    price: 150.0,
    images: ["/images/bolsa-bau-vm-cores.jpeg", "/images/baú vm cores 2.jpeg"],
    category: "Bolsas",
    rating: 4.6,
    isNew: true,
    stock: 40,
    sku: "BAU-VMC-001",
    weight: 0.6,
    dimensions: {
      width: 25.0,
      height: 20.0,
      length: 10.0,
    },
    features: ["Design estruturado", "Acabamento multicolorido", "Alça argola"],
    tags: ["bolsa", "baú", "colorida", "vermelha"],
    specs: {
      "Material Utilizado": "Papelão Couro",
      "Revestimento Externo": "Sintético Corino Vermelho",
      "Revestimento Interno": "Forro em tecido Vermelho",
      Tampa: "Em tecido Waterblock",
      Alça: "Argola (12cm)",
    },
  },
  {
    id: "8",
    name: "Meia-Lua Red",
    slug: "meia-lua-red",
    description:
      "Com um design moderno e formato curvo, a Bolsa Meia-Lua Red é a peça que faltava para adicionar um toque de cor e estilo ao seu visual. Prática e elegante, ela é perfeita para te acompanhar do dia a dia a eventos especiais, carregando o essencial com muito charme. OBS.: Produto feito a base de cola, contraindicado utilizar em superfícies molhadas.",
    price: 185.0,
    images: ["/images/meia-lua-red.jpeg", "/images/meia-lua red 2 (2).jpeg"],
    category: "Bolsas",
    rating: 4.4,
    isNew: true,
    stock: 25,
    sku: "ML-RED-001",
    weight: 0.5,
    dimensions: {
      width: 21.0,
      height: 15.0,
      length: 7.0,
    },
    features: ["Design curvo", "Cor vibrante", "Fecho magnético", "Alça de mão"],
    tags: ["bolsa", "meia-lua", "vermelha", "elegante"],
    specs: {
      Dimensões: "21cm comprimento x 15cm altura x 7cm largura",
      "Revestimento Externo": "Sintético Courvim Pérola",
      "Revestimento Interno": "Forro em tecido claro",
      Fecho: "Prata",
    },
  },
  {
    id: "9",
    name: "Clutch Listrada",
    slug: "clutch-listrada",
    description:
      "A Clutch Listrada é a combinação perfeita de estilo e modernidade. Com um design arrojado em listras pretas e brancas e uma alça de mão integrada, ela é ideal para quem busca um acessório que se destaque. Perfeita para eventos noturnos ou para dar um toque fashion ao seu look diário. OBS.: Produto feito a base de cola, contraindicado utilizar em superfícies molhadas.",
    price: 95.0,
    images: ["/images/clutch-listrada.jpeg", "/images/clutch-listrada-2.jpeg"],
    category: "Bolsas",
    rating: 4.6,
    isNew: true,
    stock: 30,
    sku: "CLT-LST-001",
    weight: 0.4,
    dimensions: {
      width: 28.0,
      height: 18.0,
      length: 6.0,
    },
    features: ["Design listrado", "Alça de mão integrada", "Fecho magnético", "Compartimento interno"],
    tags: ["bolsa", "clutch", "listrada", "preto e branco", "moderna"],
    specs: {
      "Revestimento Externo": "Sintético off white",
      "Revestimento Interno": "Forro em tecido poá",
      Fechamento: "Botão imã",
      Medidas: "30cm largura x 22.5cm altura (sem costura)",
    },
  },
  {
    id: "10",
    name: "Porta-Cartões",
    slug: "porta-cartao-essencial",
    description:
      "Um porta-cartão compacto e elegante, ideal para organizar seus cartões e documentos. Perfeito para o dia a dia ou para complementar sua bolsa.",
    price: 0.0, // This will be the free gift
    images: [],
    category: "Acessórios",
    rating: 4.9,
    isNew: true,
    stock: 100,
    sku: "PC-001",
    weight: 0.05,
    dimensions: {
      width: 10.0,
      height: 7.0,
      length: 1.0,
    },
    features: ["Design slim", "Compartimentos para múltiplos cartões", "Material durável"],
    tags: ["acessório", "carteira", "porta-cartão"],
    specs: {
      Dimensões: "10cm comprimento x 7cm altura x 1cm largura",
      Material: "Couro sintético",
      Cores: "Variadas",
    },
  },
]

export function getProducts(limit?: number) {
  if (limit) {
    return products.filter((product) => product.id !== "10").slice(0, limit)
  }
  return products.filter((product) => product.id !== "10")
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
