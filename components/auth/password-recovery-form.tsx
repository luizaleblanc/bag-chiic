"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { requestPasswordReset } from "@/app/actions"

export function PasswordRecoveryForm() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.set("email", email)

    // Chamamos o Server Action diretamente
    const result = await requestPasswordReset({ success: false, message: "" }, formData)

    toast({
      title: result.success ? "Solicitação enviada!" : "Erro ao solicitar recuperação",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    })

    if (result.success) setEmail("")
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="recovery-email">E-mail cadastrado</Label>
        <Input
          id="recovery-email"
          type="email"
          placeholder="email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          "Enviando..."
        ) : (
          <>
            <Mail className="h-4 w-4 mr-2" />
            Enviar link de redefinição
          </>
        )}
      </Button>
    </form>
  )
}
