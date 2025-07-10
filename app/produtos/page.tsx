import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from "@/components/product/product-card"
import { getProducts } from "@/lib/products"

export default function ProductsPage() {
  const existingProducts = getProducts()

  // Mock data for the 4 new empty cards
  const newEmptyProducts = [
    {
      id: "5",
      name: "Bolsa 5",
      slug: "bolsa-5",
      description: "Uma nova bolsa elegante.",
      price: 120.0,
      images: ["/placeholder.svg?height=400&width=400&text=Bolsa+5"],
      category: "Bolsas",
      rating: 0,
      stock: 10,
      sku: "B-005",
      weight: 0.5,
      dimensions: { width: 20, height: 15, length: 7 },
      features: [],
      tags: [],
    },
    {
      id: "6",
      name: "Bolsa 6",
      slug: "bolsa-6",
      description: "Uma nova bolsa moderna.",
      price: 130.0,
      images: ["/placeholder.svg?height=400&width=400&text=Bolsa+6"],
      category: "Bolsas",
      rating: 0,
      stock: 10,
      sku: "B-006",
      weight: 0.5,
      dimensions: { width: 20, height: 15, length: 7 },
      features: [],
      tags: [],
    },
    {
      id: "7",
      name: "Bolsa 7",
      slug: "bolsa-7",
      description: "Uma nova bolsa estilosa.",
      price: 140.0,
      images: ["/placeholder.svg?height=400&width=400&text=Bolsa+7"],
      category: "Bolsas",
      rating: 0,
      stock: 10,
      sku: "B-007",
      weight: 0.5,
      dimensions: { width: 20, height: 15, length: 7 },
      features: [],
      tags: [],
    },
    {
      id: "8",
      name: "Bolsa 8",
      slug: "bolsa-8",
      description: "Uma nova bolsa versátil.",
      price: 150.0,
      images: ["/placeholder.svg?height=400&width=400&text=Bolsa+8"],
      category: "Bolsas",
      rating: 0,
      stock: 10,
      sku: "B-008",
      weight: 0.5,
      dimensions: { width: 20, height: 15, length: 7 },
      features: [],
      tags: [],
    },
  ]

  const allProducts = [...existingProducts, ...newEmptyProducts]

  return (
    <main className="flex-1">
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Todos os Produtos</h1>
        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Suspense>
      </div>
    </main>
  )
}

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array(8) // 4 existing + 4 new
        .fill(null)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
    </div>
  )
}
