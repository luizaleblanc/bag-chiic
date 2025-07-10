"use client"

import Image from "next/image"
import { Copy, Check, Printer } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

interface BoletoPaymentProps {
  amount: number
}

export function BoletoPayment({ amount }: BoletoPaymentProps) {
  const [copied, setCopied] = useState(false)
  const boletoCode = "34191.79001 01043.510047 91020.150008 9 87770026000"
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 3)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(boletoCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Total a pagar:</p>
            <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Data de vencimento:</p>
            <p className="text-lg font-bold">
              {dueDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Código do boleto:</p>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <div className="overflow-hidden rounded-md border bg-muted px-3 py-2">
              <p className="truncate text-sm font-mono">{boletoCode}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopyCode}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="ml-2">{copied ? "Copiado" : "Copiar"}</span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/generic-barcode.png" alt="Código de barras" width={120} height={40} className="h-10" />
            <div>
              <p className="text-sm font-medium">Boleto Bancário</p>
              <p className="text-xs text-muted-foreground">Vencimento em 3 dias úteis</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Beneficiário:</span>
            <span>BrazilMart Comércio Eletrônico LTDA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">CNPJ:</span>
            <span>12.345.678/0001-90</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Valor:</span>
            <span>{formatCurrency(amount)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h4 className="font-medium">Instruções:</h4>
        <ol className="ml-4 mt-2 space-y-2 text-sm">
          <li>O boleto vence em 3 dias úteis</li>
          <li>Após o pagamento, a compensação pode levar até 3 dias úteis</li>
          <li>O pedido será processado após a confirmação do pagamento</li>
          <li>Você receberá um e-mail quando o pagamento for confirmado</li>
          <li>Não pague após a data de vencimento. Gere um novo boleto</li>
        </ol>
      </div>
    </div>
  )
}
