"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart/use-cart"
import { formatCurrency } from "@/lib/utils"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, cartTotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingMethod, setShippingMethod] = useState("standard")

  const shippingCost = shippingMethod === "express" ? 25.9 : 15.9
  const totalWithShipping = cartTotal + shippingCost

  // Map of product slugs to Yampi payment links
  const yampiLinks = {
    "bolsa-tiracolo-black": "https://bag-chiic.pay.yampi.com.br/r/C559QAVU4D",
    "bolsa-meia-lua": "https://bag-chiic.pay.yampi.com.br/r/FLQVP9A0R4",
    "bolsa-safira": "https://bag-chiic.pay.yampi.com.br/r/GSW221X77O",
    "bolsa-bau": "https://bag-chiic.pay.yampi.com.br/r/FTHI8JHKYH",
    "clutch-black": "https://bag-chiic.pay.yampi.com.br/r/IMB2L68YBY",
    "carteira-animalprint": "https://bag-chiic.pay.yampi.com.br/r/4W7D270688",
    "bau-vm-cores": "https://bag-chiic.pay.yampi.com.br/r/MV3FUQ7RHI",
    "meia-lua-red": "https://bag-chiic.pay.yampi.com.br/r/FA1634WBXP",
    "clutch-listrada": "https://bag-chiic.pay.yampi.com.br/r/C8D0MXCW0L",
  }

  // REMOVE: Redirect if cart is empty - this was causing the issue
  // useEffect(() => {
  //   if (items.length === 0) {
  //     router.push("/carrinho")
  //   }
  // }, [items.length, router])

  const handleFinalizeOrder = async () => {
    setIsProcessing(true)

    let redirectUrl = ""
    let foundSpecificProduct = false

    // Check if there's any item in the cart that matches our Yampi links
    for (const item of items) {
      if (yampiLinks[item.slug]) {
        redirectUrl = yampiLinks[item.slug]
        foundSpecificProduct = true
        toast({
          title: "Redirecionando para pagamento!",
          description: `Você será levado para a página de pagamento da ${item.name}.`,
        })
        break // Use the first matching product found
      }
    }

    // If no specific product found, use Mercado Pago fallback
    if (!foundSpecificProduct) {
      const finalAmount = totalWithShipping
      const formattedAmount = finalAmount.toFixed(2)
      redirectUrl = `https://link.mercadopago.com.br/bagchiice?amount=${formattedAmount}`
      toast({
        title: "Redirecionando para pagamento!",
        description: "Você será levado para a página de pagamento do Mercado Pago.",
      })
    }

    // Clear cart after determining redirect URL but before redirecting
    clearCart()

    // Use window.location.href for immediate redirection
    window.location.href = redirectUrl
  }

  // Show checkout even if cart is empty (since we're redirecting immediately)
  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/carrinho">
            <ChevronLeft className="mr-1 h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Finalizar Compra</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Method */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Método de Envio</h2>
            <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
              <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="font-normal cursor-pointer">
                    Entrega Padrão (3-5 dias úteis)
                  </Label>
                </div>
                <div className="font-medium">{formatCurrency(15.9)}</div>
              </div>
              <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="font-normal cursor-pointer">
                    Entrega Expressa (1-2 dias úteis)
                  </Label>
                </div>
                <div className="font-medium">{formatCurrency(25.9)}</div>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border shadow-sm p-4 space-y-4 sticky top-4">
            <h2 className="font-bold text-lg">Resumo do Pedido</h2>
            <Separator />

            {items.length > 0 ? (
              <>
                <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex space-x-4">
                      {item.id !== "10" && (
                        <div className="relative h-16 w-16 rounded-md overflow-hidden border flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                        <p className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span>{formatCurrency(shippingCost)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(totalWithShipping)}</span>
                </div>

                <Button onClick={handleFinalizeOrder} className="w-full" size="lg" disabled={isProcessing}>
                  {isProcessing ? "Processando..." : "Finalizar Pedido"}
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
                <Button asChild>
                  <Link href="/produtos">Ver Produtos</Link>
                </Button>
              </div>
            )}

            <p className="text-xs text-center text-muted-foreground">
              Ao finalizar seu pedido, você concorda com nossos{" "}
              <Link href="/termos" className="underline">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link href="/privacidade" className="underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
