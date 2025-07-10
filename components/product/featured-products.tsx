import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { getFeaturedProducts } from "@/lib/products"

export function FeaturedProducts() {
  const products = getFeaturedProducts(4)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button asChild className="bg-black hover:bg-gray-800 text-white px-8 py-3">
          <Link href="/produtos">VER TODOS OS PRODUTOS</Link>
        </Button>
      </div>
    </div>
  )
}
