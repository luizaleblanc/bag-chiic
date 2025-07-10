"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/use-cart"
import { ProductQuantityInline } from "@/components/product/product-quantity-inline"
import { formatCurrency } from "@/lib/utils"

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateItemQuantity, clearCart, cartTotal } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateItemQuantity(productId, quantity)
  }

  const handleRemoveItem = (productId: string) => {
    removeItem(productId)
  }

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true)
    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false)
      // Show toast or feedback
    }, 1000)
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-6">
            Parece que você ainda não adicionou nenhum produto ao seu carrinho.
          </p>
          <Button asChild>
            <Link href="/produtos">Continuar Comprando</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 border-b hidden md:block">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Produto</div>
                <div className="col-span-2 text-center">Preço</div>
                <div className="col-span-2 text-center">Quantidade</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>
            </div>
            <div className="p-4 border-b md:hidden">
              <h2 className="text-lg font-bold">Itens do Carrinho</h2>
            </div>

            {items.map((item) => (
              <div key={item.id} className="p-4 border-b">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-full md:col-span-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden border">
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
                      <div>
                        <h3 className="font-medium">
                          <Link href={`/produtos/${item.slug}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h3>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-sm text-red-500 flex items-center mt-1"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full flex justify-between md:col-span-2 md:block text-center">
                    <span className="md:hidden text-muted-foreground">Preço:</span>
                    {formatCurrency(item.price)}
                  </div>
                  <div className="col-span-full flex justify-between md:col-span-2 md:justify-center">
                    <span className="md:hidden text-muted-foreground">Quantidade:</span>
                    <ProductQuantityInline
                      quantity={item.quantity}
                      onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                      max={10}
                    />
                  </div>
                  <div className="col-span-full flex justify-between md:col-span-2 md:block text-right font-medium">
                    <span className="md:hidden text-muted-foreground">Subtotal:</span>{" "}
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            ))}

            <div className="p-4 flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/produtos">Continuar Comprando</Link>
              </Button>
              <Button variant="ghost" onClick={clearCart}>
                Limpar
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border shadow-sm p-4 space-y-4">
            <h2 className="font-bold text-lg">Resumo do Pedido</h2>
            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span>Calculado no checkout</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>

            <div className="pt-2">
              <Button onClick={handleCheckout} className="w-full" size="lg">
                Finalizar Compra
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <Separator />

            <div>
              <label htmlFor="coupon" className="text-sm font-medium">
                Cupom de Desconto
              </label>
              <div className="flex mt-1">
                <Input
                  id="coupon"
                  placeholder="Digite seu cupom"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="rounded-r-none"
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode || isApplyingCoupon}
                  className="rounded-l-none"
                >
                  Aplicar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
