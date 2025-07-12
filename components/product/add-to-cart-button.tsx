"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart/use-cart"
import { cn } from "@/lib/utils"
import { getProductById } from "@/lib/products"

interface Product {
  id: string
  name: string
  price: number
  slug: string
  images: string[] // Changed from image?: string
  category?: string
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

      if (product.category === "Bolsas") {
        const freeWallet = getProductById("10") // ID da "Carteira AnimalPrint"
        if (freeWallet) {
          addItem({
            id: freeWallet.id,
            name: freeWallet.name,
            price: 0, // Preço zero para o brinde
            quantity: 1,
            slug: freeWallet.slug,
            image: freeWallet.images?.[0] || "/placeholder.svg",
          })
          toast({
            title: "Produto adicionado e brinde incluído!",
            description: `${product.name} foi adicionado ao seu carrinho. Você ganhou um ${freeWallet.name} de brinde!`,
          })
        } else {
          toast({
            title: "Produto adicionado",
            description: `${product.name} foi adicionado ao seu carrinho.`,
          })
        }
      } else {
        toast({
          title: "Produto adicionado",
          description: `${product.name} foi adicionado ao seu carrinho.`,
        })
      }

      setIsAdding(false)
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
