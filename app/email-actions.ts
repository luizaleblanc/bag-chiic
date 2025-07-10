"use server"

import { Resend } from "resend"

type SendConfirmationEmailResult = { success: true; message: string } | { success: false; message: string }

// -----------------------------------------------------------------------------
// Utilitário para obter o client Resend sem quebrar a aplicação em preview/dev
// -----------------------------------------------------------------------------
function getResendClient() {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) {
    console.warn("RESEND_API_KEY não definida. O envio será apenas simulado/registrado no console.")
    return null
  }
  return new Resend(key)
}

// -----------------------------------------------------------------------------
// Envia (ou simula) o e-mail de confirmação
// -----------------------------------------------------------------------------
export async function sendConfirmationEmail(email: string, fullName: string): Promise<SendConfirmationEmailResult> {
  const resend = getResendClient()

  // Se não houver chave, apenas registra no console
  if (!resend) {
    console.log(`[SIMULAÇÃO] E-mail de boas-vindas para ${email} (usuário: ${fullName})`)
    return { success: true, message: "E-mail simulado (sem chave Resend)." }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // ou seu domínio verificado
      to: [email],
      subject: "Bem-vindo(a) à Bag Chiic!",
      html: `
        <h2>Olá, ${fullName}!</h2>
        <p>Seu cadastro na <strong>Bag Chiic</strong> foi realizado com sucesso.</p>
        <p>Explore nossa coleção em: <a href="${
          process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
        }">bagchiic.vercel.app</a></p>
        <p>Atenciosamente,<br/>Equipe Bag Chiic</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, message: `Falha: ${error.message}` }
    }

    console.log("E-mail enviado:", data)
    return { success: true, message: "E-mail enviado com sucesso." }
  } catch (err) {
    console.error("Erro inesperado:", err)
    return { success: false, message: "Erro inesperado ao enviar e-mail." }
  }
}
