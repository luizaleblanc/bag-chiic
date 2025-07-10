"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react" // Removed CreditCard, Landmark, QrCode as they are no longer needed

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
// Removed Tabs, TabsContent, TabsList, TabsTrigger as payment method section is removed
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart/use-cart"
import { formatCurrency } from "@/lib/utils"
import { AddressForm } from "@/components/checkout/address-form"
// Removed CreditCardForm, PixPayment, BoletoPayment as payment method section is removed

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, cartTotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  // Removed paymentMethod state as it's no longer needed
  const [shippingMethod, setShippingMethod] = useState("standard")

  const shippingCost = shippingMethod === "express" ? 25.9 : 15.9
  const totalWithShipping = cartTotal + shippingCost

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/carrinho")
    }
  }, [items.length, router])

  const handleSubmitOrder = async () => {
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate a brief processing time

    setIsProcessing(false)
    clearCart() // Clear cart after successful order simulation

    toast({
      title: "Pedido realizado com sucesso!",
      description: "Você será redirecionado para o pagamento.",
    })

    // The payment method is now implicitly Mercado Pago, no need for conditional logic
    const finalAmount = totalWithShipping
    const formattedAmount = finalAmount.toFixed(2) // Keep two decimal places for currency

    // Redirect to Mercado Pago link with the final amount
    const mercadoPagoLink = `https://link.mercadopago.com.br/bagchiice?amount=${formattedAmount}`
    router.push(mercadoPagoLink)
  }

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
          {/* Customer Information */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Informações Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Seu nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" placeholder="000.000.000-00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(00) 00000-0000" />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Endereço de Entrega</h2>
            <AddressForm />
          </div>

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

          {/* Removed Payment Method section entirely */}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border shadow-sm p-4 space-y-4 sticky top-4">
            <h2 className="font-bold text-lg">Resumo do Pedido</h2>
            <Separator />

            <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden border flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
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
              {/* Removed Pix discount display as payment method section is removed */}
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(totalWithShipping)}</span>
            </div>

            <Button onClick={handleSubmitOrder} className="w-full" size="lg" disabled={isProcessing}>
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
