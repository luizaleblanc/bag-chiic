"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CadastroPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/") // Redireciona para a página inicial
  }, [router])

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-gray-100 py-12">
      <p className="text-lg text-muted-foreground">Redirecionando...</p>
    </div>
  )
}
