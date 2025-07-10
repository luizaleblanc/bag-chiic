import { ProductCard } from "@/components/product/product-card"
import { getRelatedProducts } from "@/lib/products"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const products = getRelatedProducts(categoryId, currentProductId, 5)

  if (products.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhum produto relacionado encontrado.</div>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
