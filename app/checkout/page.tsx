"use client"

import { useState, useEffect } from "react"
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
// REMOVE: import { AddressForm } from "@/components/checkout/address-form"
// REMOVE: import { sendOrderMessage } from "@/app/message-actions"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, cartTotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingMethod, setShippingMethod] = useState("standard")
  // REMOVE: State for customer information
  // REMOVE: const [customerName, setCustomerName] = useState("")
  // REMOVE: const [customerEmail, setCustomerEmail] = useState("")
  // REMOVE: const [customerCpf, setCustomerCpf] = useState("")
  // REMOVE: const [customerPhone, setCustomerPhone] = useState("")

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

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/carrinho")
    }
  }, [items.length, router])

  const handleFinalizeOrder = async () => {
    setIsProcessing(true)

    // Simulate a brief processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    let redirectUrl = ""

    // Check if there's exactly one item in the cart and if it's a specific bag
    if (items.length === 1 && items[0].quantity === 1 && yampiLinks[items[0].slug]) {
      redirectUrl = yampiLinks[items[0].slug]
      toast({
        title: "Redirecionando para o pagamento específico da bolsa!",
        description: `Você será levado para a página de pagamento da ${items[0].name}.`,
      })
    } else {
      // Fallback to Mercado Pago for multiple items, non-bag items, or free gifts
      const finalAmount = totalWithShipping
      const formattedAmount = finalAmount.toFixed(2)
      redirectUrl = `https://link.mercadopago.com.br/bagchiice?amount=${formattedAmount}`
      toast({
        title: "Redirecionando para o pagamento!",
        description: "Você será levado para a página de pagamento do Mercado Pago.",
      })
    }

    clearCart() // Clear cart after successful order simulation
    router.push(redirectUrl)
  }

  // REMOVE: handlePagbankPaymentSuccess and handlePagbankPaymentError are no longer needed
  // REMOVE: const handlePagbankPaymentSuccess = (transactionId: string) => {
  // REMOVE:   toast({
  // REMOVE:     title: "Pagamento PagBank Aprovado!",
  // REMOVE:     description: `Transação ID: ${transactionId}. Seu pedido será processado.`,
  // REMOVE:     variant: "default",
  // REMOVE:   })
  // REMOVE:   clearCart()
  // REMOVE:   router.push("/confirmacao-pedido") // Redirect to a confirmation page
  // REMOVE: }

  // REMOVE: const handlePagbankPaymentError = (message: string) => {
  // REMOVE:   toast({
  // REMOVE:     title: "Erro no Pagamento PagBank",
  // REMOVE:     description: message,
  // REMOVE:     variant: "destructive",
  // REMOVE:   })
  // REMOVE: }

  // Render null or loading state while checking cart
  if (items.length === 0) {
    return null
  }

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
          {/* REMOVE: Customer Information */}
          {/* REMOVE: <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Informações Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={customerCpf}
                  onChange={(e) => setCustomerCpf(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>
          </div> */}

          {/* REMOVE: Shipping Address */}
          {/* REMOVE: <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Endereço de Entrega</h2>
            <AddressForm />
          </div> */}

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

            {/* The main "Finalizar Pedido" button is now only for Mercado Pago or if no specific payment method handles it */}
            <Button onClick={handleFinalizeOrder} className="w-full" size="lg" disabled={isProcessing}>
              {isProcessing ? "Processando..." : "Finalizar Pedido"}
            </Button>

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
