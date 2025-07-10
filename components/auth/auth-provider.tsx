"use client"

import type React from "react"
import { createContext, useEffect, useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = getSupabaseBrowser()

  useEffect(() => {
    ;(async () => {
      if (supabase) {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata.full_name ?? "Usuário",
            email: session.user.email ?? "",
            role: "user",
          })
        }
      } else {
        // fallback localStorage (apenas p/ preview sem Supabase)
        const stored = localStorage.getItem("user")
        if (stored) setUser(JSON.parse(stored))
      }
      setIsLoading(false)
    })()
  }, [supabase])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      if (supabase) {
        console.log("Tentando login com Supabase...")
        const { error, data } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
          console.error("Erro no login Supabase:", error)
          throw new Error(error.message)
        }

        if (data.user) {
          console.log("Login bem-sucedido:", data.user.email)
          setUser({
            id: data.user.id,
            name: data.user.user_metadata.full_name ?? "Usuário",
            email: data.user.email ?? "",
            role: "user",
          })
        }
      } else {
        // fallback mock
        console.log("Usando login mock (sem Supabase)")
        const mockUser: User = { id: "mock", name: "Preview", email, role: "user" }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
    } catch (error) {
      console.error("Erro no login:", error)
      throw error // Re-throw para que o componente possa capturar
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      if (supabase) {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        })
        if (error) throw error
        if (data.user) {
          setUser({
            id: data.user.id,
            name,
            email,
            role: "user",
          })
        }
      } else {
        // fallback mock
        const mockUser: User = { id: "mock", name, email, role: "user" }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
