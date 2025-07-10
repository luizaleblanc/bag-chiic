import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from "@/components/product/product-card"
import { getProducts } from "@/lib/products"

export default function ProductsPage() {
  const allProducts = getProducts()

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
