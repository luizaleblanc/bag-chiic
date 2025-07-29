"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/components/cart/use-cart"
import { ProductQuantityInline } from "@/components/product/product-quantity-inline"
import { formatCurrency } from "@/lib/utils"

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeItem, updateItemQuantity, cartTotal } = useCart()
  const router = useRouter()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Carrinho
            <span className="ml-auto">{items.length > 0 && `(${items.length})`}</span>
          </SheetTitle>
        </SheetHeader>
        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/produtos/${item.slug}`}
                          className="line-clamp-1 font-medium hover:underline"
                          onClick={() => onOpenChange(false)}
                        >
                          {item.name}
                        </Link>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Remover</span>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <ProductQuantityInline
                          quantity={item.quantity}
                          onQuantityChange={(quantity) => updateItemQuantity(item.id, quantity)}
                          max={10}
                          size="sm"
                        />
                        <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{formatCurrency(cartTotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Frete calculado no checkout</p>
              </div>
              <SheetFooter className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => onOpenChange(false)}
                >
                  Continuar Comprando
                </Button>
                <Button size="sm" className="w-full" asChild onClick={() => onOpenChange(false)}>
                  <Link href="/carrinho">Finalizar Compra</Link>
                </Button>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">Seu carrinho está vazio</h3>
              <p className="text-sm text-muted-foreground">
                Parece que você ainda não adicionou nenhum produto ao seu carrinho.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-6 bg-transparent"
              onClick={() => {
                onOpenChange(false)
                router.push("/produtos")
              }}
            >
              Ver Produtos
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
