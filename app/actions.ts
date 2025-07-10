"use server"

import { sendConfirmationEmail } from "./email-actions"
import { getSupabaseServer } from "@/lib/supabase/server" // Importa o cliente Supabase do servidor

interface RegisterUserResult {
  success: boolean
  message: string
}

interface PasswordResetResult {
  success: boolean
  message: string
}

export async function registerUserServerAction(formData: FormData): Promise<RegisterUserResult> {
  // Não é mais necessário simular delay, o Supabase fará a chamada de rede
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

  // Basic server-side validation
  if (!fullName || !email || !password || !confirmPassword || !cpf || !phone || !dateOfBirth) {
    return { success: false, message: "Todos os campos obrigatórios devem ser preenchidos." }
  }

  if (password !== confirmPassword) {
    return { success: false, message: "As senhas não coincidem." }
  }

  // Password complexity validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message:
        "A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.",
    }
  }

  try {
    // 1. Registrar o usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Passa o nome completo para os metadados do usuário
        },
      },
    })

    if (authError) {
      console.error("Erro ao registrar no Supabase Auth:", authError)
      // Mensagens de erro mais amigáveis para o usuário
      if (authError.message.includes("already registered")) {
        return { success: false, message: "Este e-mail já está cadastrado." }
      }
      return { success: false, message: `Erro ao cadastrar: ${authError.message}` }
    }

    // Se o registro de autenticação for bem-sucedido, insere os dados do perfil
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: fullName,
        email: email,
        cpf: cpf,
        phone: phone,
        date_of_birth: dateOfBirth,
        gender: gender || null,
      })

      if (profileError) {
        console.error("Erro ao inserir perfil no Supabase DB:", profileError)
        // Se falhar ao inserir o perfil, você pode querer reverter o registro de autenticação
        // ou apenas logar o erro e permitir que o usuário tente novamente.
        // Por simplicidade, vamos apenas retornar o erro aqui.
        return { success: false, message: `Erro ao salvar perfil: ${profileError.message}` }
      }

      // Enviar e-mail de confirmação após o cadastro bem-sucedido
      const emailResult = await sendConfirmationEmail(email, fullName)
      if (!emailResult.success) {
        console.warn("Falha ao enviar e-mail de confirmação:", emailResult.message)
      }

      return {
        success: true,
        message: `Usuário ${fullName} cadastrado com sucesso! Verifique seu e-mail para confirmar.`,
      }
    } else {
      // Isso pode acontecer se o signUp retornar sucesso mas sem user (ex: email de confirmação enviado)
      return { success: true, message: "Cadastro iniciado! Verifique seu e-mail para confirmar a conta." }
    }
  } catch (error) {
    console.error("Erro inesperado ao cadastrar usuário:", error)
    return { success: false, message: "Ocorreu um erro inesperado ao cadastrar o usuário. Tente novamente." }
  }
}

export async function requestPasswordReset(
  prevState: PasswordResetResult, // useActionState passes previous state
  formData: FormData,
): Promise<PasswordResetResult> {
  // Não é mais necessário simular delay
  const supabase = getSupabaseServer()

  if (!supabase) {
    return { success: false, message: "Configuração do Supabase ausente. Verifique as variáveis de ambiente." }
  }

  const email = formData.get("email") as string

  if (!email) {
    return { success: false, message: "Por favor, insira seu e-mail." }
  }

  try {
    // Supabase envia o e-mail de redefinição de senha
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`, // URL para onde o usuário será redirecionado após clicar no link
    })

    if (error) {
      console.error("Erro ao solicitar redefinição de senha no Supabase:", error)
      return { success: false, message: `Erro: ${error.message}` }
    }

    // Para segurança, sempre retorne uma mensagem genérica de sucesso, mesmo que o e-mail não seja encontrado,
    // para evitar ataques de enumeração de e-mail.
    return {
      success: true,
      message: "Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.",
    }
  } catch (error) {
    console.error("Erro inesperado ao solicitar redefinição de senha:", error)
    return {
      success: false,
      message: "Ocorreu um erro inesperado ao solicitar a redefinição de senha. Tente novamente.",
    }
  }
}
