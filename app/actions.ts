"use server"

import { getSupabaseServer } from "@/lib/supabase/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { sendConfirmationEmail } from "./email-actions"

/* ------------------------------------------------------------------ */
/*  TYPES                                                             */
/* ------------------------------------------------------------------ */
interface ActionResult {
  success: boolean
  message: string
}

/* ------------------------------------------------------------------ */
/*  REGISTER USER                                                     */
/* ------------------------------------------------------------------ */
export async function registerUserServerAction(formData: FormData): Promise<ActionResult> {
  const supabase = getSupabaseServer()
  const admin = getSupabaseAdmin()

  if (!supabase)
    return { success: false, message: "Configuração do Supabase ausente. Verifique variáveis de ambiente." }

  /* 1. Extrai campos */
  const fullName = (formData.get("fullName") as string)?.trim()
  const email = (formData.get("email") as string)?.trim().toLowerCase()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const cpf = (formData.get("cpf") as string)?.trim()
  const phone = (formData.get("phone") as string)?.trim()
  const dateOfBirth = formData.get("dateOfBirth") as string
  const gender = formData.get("gender") as string

  if (!fullName || !email || !password || !confirmPassword)
    return { success: false, message: "Preencha todos os campos obrigatórios." }
  if (password !== confirmPassword) return { success: false, message: "As senhas não coincidem." }

  try {
    /* 2. Verifica se o e-mail já existe (Admin API se disponível) */
    if (admin) {
      let emailTaken = false

      // getUserByEmail (versões novas) -----------------------------
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof admin.auth.admin.getUserByEmail === "function") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { data } = await admin.auth.admin.getUserByEmail(email)
        emailTaken = !!data?.user
      }
      // listUsers fallback (todas versões) -------------------------
      else if (typeof admin.auth.admin.listUsers === "function") {
        const { data } = await admin.auth.admin.listUsers({ email })
        emailTaken = data?.users?.length > 0
      }

      if (emailTaken) return { success: false, message: "Este e-mail já está cadastrado. Faça login." }
    }

    /* 3. Cria o usuário */
    let userId: string | null = null

    if (admin) {
      const { data, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // e-mail já confirmado → login imediato
        user_metadata: { full_name: fullName },
      })
      if (error) throw error
      userId = data.user?.id ?? null
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      if (error) {
        if (error.message.includes("rate limit"))
          return { success: false, message: "Muitas tentativas. Aguarde alguns minutos e tente de novo." }
        return { success: false, message: error.message }
      }
      userId = data.user?.id ?? null
    }

    /* 4. Insere/atualiza perfil (se houver chave service_role) */
    if (admin && userId) {
      const { error } = await admin.from("profiles").upsert({
        id: userId,
        full_name: fullName,
        email,
        cpf,
        phone,
        date_of_birth: dateOfBirth || null,
        gender: gender || null,
      })
      if (error) console.error("Erro upsert profile:", error)
    }

    /* 5. E-mail de boas-vindas (não bloqueia fluxo) */
    sendConfirmationEmail(email, fullName).catch((err) => console.warn("Falha ao enviar e-mail de boas-vindas:", err))

    return { success: true, message: "Cadastro realizado! Você já pode fazer login." }
  } catch (err) {
    console.error("Erro inesperado no cadastro:", err)
    return { success: false, message: "Ocorreu um erro inesperado. Tente novamente." }
  }
}

/* ------------------------------------------------------------------ */
/*  PASSWORD RESET                                                    */
/* ------------------------------------------------------------------ */
export async function requestPasswordReset(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const supabase = getSupabaseServer()
  if (!supabase)
    return { success: false, message: "Configuração do Supabase ausente. Verifique variáveis de ambiente." }

  const email = (formData.get("email") as string)?.trim()
  if (!email) return { success: false, message: "Por favor, informe seu e-mail." }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    })
    if (error) throw error

    return {
      success: true,
      message: "Se o e-mail estiver cadastrado, você receberá um link para redefinição.",
    }
  } catch (err: any) {
    console.error("resetPasswordForEmail:", err)
    return { success: false, message: `Erro: ${err.message ?? "inesperado"}` }
  }
}
