"use server"

import { sendConfirmationEmail } from "./email-actions"
import { getSupabaseServer } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

interface RegisterUserResult {
  success: boolean
  message: string
}

interface PasswordResetResult {
  success: boolean
  message: string
}

export async function registerUserServerAction(formData: FormData): Promise<RegisterUserResult> {
  const supabase = getSupabaseServer()
  if (!supabase) {
    return { success: false, message: "Configuração do Supabase ausente. Verifique as variáveis de ambiente." }
  }

  const fullName = formData.get("fullName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const cpf = formData.get("cpf") as string
  const phone = formData.get("phone") as string
  const dateOfBirth = formData.get("dateOfBirth") as string
  const gender = formData.get("gender") as string

  /* validações omitidas … */

  // 1. Cria o usuário no Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  })
  if (authError) {
    const msg = authError.message.includes("already") ? "Este e-mail já está cadastrado." : authError.message
    return { success: false, message: msg }
  }

  // 2. Insere o perfil via service_role
  const admin = getSupabaseAdmin()
  if (admin && authData.user) {
    const { error: profileError } = await admin.from("profiles").upsert({
      id: authData.user.id,
      full_name: fullName,
      email,
      cpf,
      phone,
      date_of_birth: dateOfBirth || null,
      gender: gender || null,
    })

    if (profileError) {
      console.error("Erro ao inserir perfil:", profileError)
      // Mas não falhamos o cadastro → apenas avisamos
    }
  }

  // 3. E-mail de confirmação
  await sendConfirmationEmail(email, fullName)

  return {
    success: true,
    message: "Cadastro concluído! Um e-mail de confirmação foi enviado.",
  }
}

/**
 * Envia e-mail de redefinição de senha via Supabase Auth
 */
export async function requestPasswordReset(
  _prevState: { success: boolean; message: string },
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const supabase = getSupabaseServer()
  if (!supabase) {
    return { success: false, message: "Configuração do Supabase ausente. Verifique as variáveis de ambiente." }
  }

  const email = (formData.get("email") as string)?.trim()
  if (!email) {
    return { success: false, message: "Por favor, insira seu e-mail." }
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    })

    if (error) {
      console.error("Erro Supabase resetPasswordForEmail:", error)
      return { success: false, message: `Erro: ${error.message}` }
    }

    // Mensagem genérica de sucesso para evitar enumeração de e-mails
    return {
      success: true,
      message: "Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.",
    }
  } catch (err) {
    console.error("Erro inesperado no reset password:", err)
    return { success: false, message: "Ocorreu um erro inesperado. Tente novamente." }
  }
}
