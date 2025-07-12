import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    console.log("Webhook recebido:", payload)

    // Aqui você pode adicionar a lógica para processar o payload do webhook.
    // Por exemplo, atualizar um status de pedido, enviar uma notificação, etc.

    return NextResponse.json({ message: "Webhook recebido com sucesso!" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao processar o webhook:", error)
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 })
  }
}

// Opcional: Você pode adicionar outros métodos HTTP se necessário, como GET para testar.
export async function GET() {
  return NextResponse.json(
    { message: "Este é o endpoint do webhook. Por favor, use POST para enviar dados." },
    { status: 200 },
  )
}
