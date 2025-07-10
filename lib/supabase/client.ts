// 'use client' porque este arquivo roda no browser
"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Singleton no browser ↓
let _supabase: SupabaseClient | null = null

export function getSupabaseBrowser(): SupabaseClient | null {
  if (_supabase) return _supabase

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn(
      "⚠️  NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não estão definidas. " +
        "O Supabase não será inicializado no navegador.",
    )
    return null
  }

  _supabase = createClient(url, key)
  return _supabase
}
