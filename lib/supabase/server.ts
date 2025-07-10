// Utilizado em Server Components / Server Actions
import { cookies as nextCookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

/**
 * Cria um cliente Supabase no contexto do servidor.
 * Retorna `null` caso as variáveis de ambiente não estejam definidas.
 */
export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn(
      "⚠️  Variáveis Supabase ausentes (NEXT_PUBLIC_SUPABASE_URL / ..._KEY). " +
        "O Supabase não será inicializado do lado do servidor.",
    )
    return null
  }

  // Adapter: traduz a API do cookies() do Next.js para o formato que o SDK espera
  const cookieStore = nextCookies()

  const cookieAdapter = {
    get: (name: string) => {
      return cookieStore.get(name)?.value
    },
    set: (name: string, value: string, opts?: CookieOptions) => {
      // `opts` pode conter path, maxAge, etc.
      cookieStore.set({ name, value, ...opts })
    },
    remove: (name: string, opts?: CookieOptions) => {
      cookieStore.set({ name, value: "", ...opts })
    },
  }

  return createServerClient(url, key, { cookies: cookieAdapter })
}
