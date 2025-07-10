"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth/use-auth"
import { registerUserServerAction } from "@/app/actions" // Import the server action
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PasswordRecoveryForm } from "@/components/auth/password-recovery-form"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [cpf, setCpf] = useState("")
  const [phone, setPhone] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [gender, setGender] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { login } = useAuth() // Only need login from useAuth for this page
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login(email, password)
      toast({
        title: "Login realizado com sucesso!",
        description: "Você foi redirecionado para a página inicial.",
      })
      router.push("/") // Redireciona para a home ou página anterior após o login
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false) // Garante que o botão seja reativado
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const result = await registerUserServerAction(formData)

    if (result.success) {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: result.message, // Usa a mensagem retornada pela Server Action
      })
      setActiveTab("login") // Muda para a aba de login após o cadastro bem-sucedido
      // Limpa os campos do formulário
      setEmail("")
      setPassword("")
      setName("")
      setConfirmPassword("")
      setCpf("")
      setPhone("")
      setDateOfBirth("")
      setGender("")
    } else {
      toast({
        title: "Erro ao cadastrar",
        description: result.message,
        variant: "destructive",
      })
    }
    setIsSubmitting(false) // Garante que o botão seja reativado
  }

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-gray-100 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          {/* Removed Logo component from here */}
          <CardTitle className="text-2xl">
            {activeTab === "login"
              ? "Bem-vindo de volta!"
              : activeTab === "register"
                ? "Crie sua conta"
                : "Recuperar Senha"}
          </CardTitle>
          <CardDescription>
            {activeTab === "login"
              ? "Entre para continuar sua compra."
              : activeTab === "register"
                ? "Cadastre-se para uma nova experiência."
                : "Insira seu e-mail para redefinir sua senha."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              {" "}
              {/* Apenas 2 colunas: Entrar e Cadastrar */}
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Cadastrar</TabsTrigger>
              {/* A aba "Recuperar Senha" foi removida daqui */}
            </TabsList>
            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">E-mail</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Esqueceu sua senha?{" "}
                  <Link
                    href="#"
                    onClick={() => setActiveTab("recover-password")} // Este link muda para a aba de recuperação
                    className="underline hover:text-primary"
                  >
                    Recuperar
                  </Link>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register" className="mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero (Opcional)</Label>
                  <Select name="gender" value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                      <SelectItem value="prefer-not-say">Prefiro não informar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="recover-password" className="mt-6">
              {" "}
              {/* Conteúdo da aba de recuperação de senha */}
              <PasswordRecoveryForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
