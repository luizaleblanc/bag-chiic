"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function NewsletterSignup() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")

      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você receberá nossas novidades e ofertas exclusivas.",
      })
    }, 1000)
  }

  return (
    <div className="rounded-lg bg-primary p-8 text-white">
      <div className="mx-auto max-w-2xl text-center">
        <Mail className="mx-auto h-10 w-10 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Inscreva-se em nossa newsletter</h3>
        <p className="mb-6">Receba ofertas exclusivas, novidades e dicas diretamente em seu e-mail.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-zinc-800"
          />
          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            className="bg-white text-primary hover:bg-zinc-100"
          >
            {isSubmitting ? "Inscrevendo..." : "Inscrever-se"}
          </Button>
        </form>
      </div>
    </div>
  )
}
