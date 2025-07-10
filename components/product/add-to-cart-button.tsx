"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart/use-cart"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  slug: string
  images: string[] // Changed from image?: string
}

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
}

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        slug: product.slug,
        image: product.images?.[0] || "/placeholder.svg", // Use the first image or fallback to placeholder
      })

      setIsAdding(false)

      toast({
        title: "Produto adicionado",
        description: `${product.name} foi adicionado ao seu carrinho.`,
      })
    }, 500)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={cn(className, "px-10 py-4 md:py-3 rounded-full")}
      size="lg"
    >
      {isAdding ? (
        "Adicionando..."
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Adicionar ao Carrinho
        </>
      )}
    </Button>
  )
}
