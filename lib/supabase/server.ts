// Arquivo usado em Server Components / Server Actions
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

/**
 * Cria um cliente Supabase no contexto do servidor.
 * Se as variáveis não existirem, retorna `null` em vez de lançar erro.
 */
export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    // Tente usar a service_role em Server Actions; senão, use a anon key
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn(
      "⚠️  Variáveis Supabase ausentes (NEXT_PUBLIC_SUPABASE_URL / ..._KEY). " +
        "O Supabase não será inicializado do lado do servidor.",
    )
    return null
  }

  // Retorna o cliente Supabase configurado para uso em Server Components/Actions
  return createServerClient(url, key, { cookies })
}
