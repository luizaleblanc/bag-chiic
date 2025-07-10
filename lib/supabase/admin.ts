import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Cliente Supabase com chave service_role.
 * NÃO deve ser usado no browser.
 */
let _admin: SupabaseClient | null = null

export function getSupabaseAdmin() {
  if (_admin) return _admin

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    console.warn("⚠️  SUPABASE_SERVICE_ROLE_KEY ausente – operações admin serão ignoradas.")
    return null
  }

  _admin = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
  return _admin
}
