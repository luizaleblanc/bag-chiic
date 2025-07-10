"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { formatCurrency } from "@/lib/utils" // Import formatCurrency

interface CreditCardFormProps {
  amount: number // Add amount prop
}

export function CreditCardForm({ amount }: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
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
    if (value.length <= 3) {
      setCvv(value)
    }
  }

  // Calculate installments dynamically
  const installments = Array.from({ length: 10 }, (_, i) => {
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
        <Label htmlFor="card-number">Número do Cartão</Label>
        <div className="relative">
          <Input
            id="card-number"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
          <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="card-name">Nome no Cartão</Label>
        <Input
          id="card-name"
          placeholder="Nome como aparece no cartão"
          value={cardName}
          onChange={(e) => setCardName(e.target.value.toUpperCase())}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Data de Validade</Label>
          <div className="flex gap-2">
            <Select value={expiryMonth} onValueChange={setExpiryMonth}>
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

            <Select value={expiryYear} onValueChange={setExpiryYear}>
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
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" value={cvv} onChange={handleCvvChange} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Parcelamento</Label>
        <Select defaultValue="1">
          <SelectTrigger>
            <SelectValue placeholder="Selecione o número de parcelas" />
          </SelectTrigger>
          <SelectContent>
            {installments.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="save-card" checked={saveCard} onCheckedChange={(checked) => setSaveCard(!!checked)} />
        <Label htmlFor="save-card" className="text-sm font-normal">
          Salvar cartão para compras futuras
        </Label>
      </div>
    </div>
  )
}
