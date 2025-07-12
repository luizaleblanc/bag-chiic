"use client"

import type React from "react"
import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { processPagbankPayment } from "@/app/pagbank-actions" // Import the server action

interface PagbankCreditCardFormProps {
  amount: number
  customerName: string
  customerEmail: string
  onPaymentSuccess: (transactionId: string) => void
  onPaymentError: (message: string) => void
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
}

export function PagbankCreditCardForm({
  amount,
  customerName,
  customerEmail,
  onPaymentSuccess,
  onPaymentError,
  isProcessing,
  setIsProcessing,
}: PagbankCreditCardFormProps) {
  const { toast } = useToast()
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [installments, setInstallments] = useState("1")
  const [saveCard, setSaveCard] = useState(false)

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const groups = []

    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4))
    }

    return groups.join(" ").trim()
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    if (formattedValue.length <= 19) {
      // 16 digits + 3 spaces
      setCardNumber(formattedValue)
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 4) {
      // CVV can be 3 or 4 digits
      setCvv(value)
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      const result = await processPagbankPayment({
        amount,
        cardNumber: cardNumber.replace(/\s/g, ""), // Remove spaces for API
        cardName,
        expiryMonth,
        expiryYear,
        cvv,
        installments: Number(installments),
        customerName,
        customerEmail,
      })

      if (result.success) {
        onPaymentSuccess(result.transactionId || "N/A")
        toast({
          title: "Pagamento Aprovado!",
          description: result.message,
          variant: "default",
        })
      } else {
        onPaymentError(result.message)
        toast({
          title: "Erro no Pagamento",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao chamar a ação de pagamento PagBank:", error)
      onPaymentError("Ocorreu um erro inesperado ao processar o pagamento.")
      toast({
        title: "Erro Inesperado",
        description: "Não foi possível completar a operação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Calculate installments dynamically
  const installmentOptions = Array.from({ length: 12 }, (_, i) => {
    // Up to 12 installments
    const numInstallments = i + 1
    const installmentValue = amount / numInstallments
    const interestText = numInstallments <= 10 ? "sem juros" : "com juros" // Assuming up to 10x without interest
    return {
      value: numInstallments.toString(),
      label: `${numInstallments}x de ${formatCurrency(installmentValue)} ${interestText}`,
    }
  })

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pagbank-card-number">Número do Cartão</Label>
        <div className="relative">
          <Input
            id="pagbank-card-number"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={handleCardNumberChange}
            disabled={isProcessing}
          />
          <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pagbank-card-name">Nome no Cartão</Label>
        <Input
          id="pagbank-card-name"
          placeholder="Nome como aparece no cartão"
          value={cardName}
          onChange={(e) => setCardName(e.target.value.toUpperCase())}
          disabled={isProcessing}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Data de Validade</Label>
          <div className="flex gap-2">
            <Select value={expiryMonth} onValueChange={setExpiryMonth} disabled={isProcessing}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = i + 1
                  return (
                    <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                      {month.toString().padStart(2, "0")}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>

            <Select value={expiryYear} onValueChange={setExpiryYear} disabled={isProcessing}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i
                  return (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pagbank-cvv">CVV</Label>
          <Input id="pagbank-cvv" placeholder="123" value={cvv} onChange={handleCvvChange} disabled={isProcessing} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Parcelamento</Label>
        <Select value={installments} onValueChange={setInstallments} disabled={isProcessing}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o número de parcelas" />
          </SelectTrigger>
          <SelectContent>
            {installmentOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="pagbank-save-card"
          checked={saveCard}
          onCheckedChange={(checked) => setSaveCard(!!checked)}
          disabled={isProcessing}
        />
        <Label htmlFor="pagbank-save-card" className="text-sm font-normal">
          Salvar cartão para compras futuras
        </Label>
      </div>

      <Button onClick={handlePayment} className="w-full" size="lg" disabled={isProcessing}>
        {isProcessing ? "Processando Pagamento..." : "Pagar com PagBank"}
      </Button>
    </div>
  )
}
