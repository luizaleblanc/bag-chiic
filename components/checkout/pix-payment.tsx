"use client"

import Image from "next/image"
import { Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

interface PixPaymentProps {
  amount: number
}

export function PixPayment({ amount }: PixPaymentProps) {
  const [copied, setCopied] = useState(false)
  const discountedAmount = amount * 0.95
  const pixCode =
    "00020126580014BR.GOV.BCB.PIX0136a629532e-7693-4846-b028-f142082d7b0752040000530398654041.005802BR5913BrazilMart6008Sao Paulo62290525mpqrinter12345abcdef3456789012345630454F8"

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Total com desconto de 5%:</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(discountedAmount)}</p>
            <p className="text-sm text-muted-foreground">
              De {formatCurrency(amount)} por {formatCurrency(discountedAmount)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Você economiza:</p>
            <p className="text-lg font-bold text-green-600">{formatCurrency(amount * 0.05)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-64 w-64 overflow-hidden rounded-lg bg-white p-2">
          <Image
            src="/qr-code.png"
            alt="QR Code PIX"
            width={240}
            height={240}
            className="h-full w-full"
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Escaneie o QR Code com o aplicativo do seu banco</p>
          <p className="text-xs text-muted-foreground">O pagamento será confirmado automaticamente</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Ou copie o código PIX:</p>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <div className="overflow-hidden rounded-md border bg-muted px-3 py-2">
              <p className="truncate text-sm">{pixCode}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopyCode}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="ml-2">{copied ? "Copiado" : "Copiar"}</span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h4 className="font-medium">Instruções:</h4>
        <ol className="ml-4 mt-2 space-y-2 text-sm">
          <li>Abra o aplicativo do seu banco</li>
          <li>Escolha a opção de pagamento via PIX</li>
          <li>Escaneie o QR Code ou cole o código PIX</li>
          <li>Confirme as informações e finalize o pagamento</li>
          <li>O status do seu pedido será atualizado automaticamente após a confirmação</li>
        </ol>
      </div>
    </div>
  )
}
