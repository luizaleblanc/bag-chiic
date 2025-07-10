"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CartSheet } from "@/components/cart/cart-sheet"
import { useCart } from "@/components/cart/use-cart"
import { Logo } from "@/components/ui/Logo"

export default function Header() {
  const pathname = usePathname()
  const { items } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false)

  const isAdminPage = pathname?.startsWith("/admin")

  const onOpenChange = (open) => {
    setIsCartOpen(open)
  }

  if (isAdminPage) {
    return <AdminHeader />
  }

  return (
    <header className="w-full bg-primary shadow-sm">
      <div className="container py-6">
        <div className="flex items-center justify-between">
          {/* Left side - Search */}
          <div className="flex items-center">
            <div className="relative flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-sm text-black hover:text-black"
                onClick={() => setIsSearchInputVisible(!isSearchInputVisible)} // Toggle visibility on click
              >
                <Search className="h-4 w-4" />
                <span className="hidden md:inline">Buscar</span> {/* Show text on medium screens and up */}
              </Button>
              {isSearchInputVisible && (
                <div className="absolute left-0 top-full mt-2 w-full md:relative md:top-auto md:mt-0 md:w-80">
                  <Input
                    type="search"
                    placeholder="O que você procura?"
                    className="w-full bg-secondary text-white placeholder:text-gray-300 border-0 rounded-lg shadow-sm focus:ring-1 focus:ring-offset-0 focus:ring-primary"
                    autoFocus={isSearchInputVisible}
                    onBlur={() => setIsSearchInputVisible(false)} // Hide when focus is lost
                  />
                </div>
              )}
            </div>
          </div>

          {/* Center - Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Right side - User and Cart */}
          <div className="flex items-center space-x-4">
            {/* User link */}
            <div className="group relative">
              <Link href="/cadastro">
                {" "}
                {/* Changed from /login to /cadastro */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 text-sm text-black hover:text-black"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden group-hover:inline">Entrar</span>
                </Button>
              </Link>
            </div>

            {/* Cart with hover */}
            <div className="group relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center space-x-1 text-sm relative text-black hover:text-black"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden group-hover:inline">Carrinho</span>
                {items.length > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {items.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CartSheet open={isCartOpen} onOpenChange={onOpenChange} />
    </header>
  )
}

function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <Logo width={140} height={32} />
          <span className="font-bold">Admin</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/admin/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/admin/produtos" className="text-sm font-medium transition-colors hover:text-primary">
            Produtos
          </Link>
          <Link href="/admin/pedidos" className="text-sm font-medium transition-colors hover:text-primary">
            Pedidos
          </Link>
          <Link href="/admin/clientes" className="text-sm font-medium transition-colors hover:text-primary">
            Clientes
          </Link>
          <Link href="/admin/configuracoes" className="text-sm font-medium transition-colors hover:text-primary">
            Configurações
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm">
              Ver Loja
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Perfil</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
