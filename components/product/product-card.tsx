import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  category: string
  rating: number
  isNew?: boolean
  isOnSale?: boolean
  salePrice?: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
      <Link href={`/produtos/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {product.isNew && <Badge className="absolute left-2 top-2 bg-green-500 hover:bg-green-600">Novo</Badge>}
        {product.isOnSale && <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600">Oferta</Badge>}
      </Link>
      <div className="p-4">
        <div className="mb-1 text-sm text-muted-foreground">{product.category}</div>
        <Link href={`/produtos/${product.slug}`} className="line-clamp-1 font-medium hover:text-primary">
          {product.name}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div>
            {product.isOnSale && product.salePrice ? (
              <div className="flex items-center gap-1.5">
                <span className="font-medium">{formatCurrency(product.salePrice)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.price)}</span>
              </div>
            ) : (
              <span className="font-medium">{formatCurrency(product.price)}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Adicionar ao carrinho</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
