"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, ShoppingCart, User } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CartSheet } from "@/components/cart/cart-sheet"
import { useCart } from "@/components/cart/use-cart"
import { Logo } from "@/components/ui/Logo"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { items } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

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
            <div className="relative flex flex-col items-start">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-sm text-black hover:text-black"
                onMouseEnter={() => setIsSearchInputVisible(true)} // Show on hover for desktop
                onMouseLeave={() => setIsSearchInputVisible(false)} // Hide when mouse leaves for desktop
                onClick={() => setIsSearchInputVisible(!isSearchInputVisible)} // Toggle on click for mobile
              >
                <Search className="h-4 w-4" />
                <span className="hidden md:inline">Buscar</span>
              </Button>
              {isSearchInputVisible && (
                <div className="absolute top-full left-0 mt-2 w-64 md:w-80 z-50">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="O que você procura?"
                      className="w-full bg-secondary text-white placeholder:text-gray-300 border-0 rounded-lg shadow-sm focus:ring-1 focus:ring-offset-0 focus:ring-primary pr-8 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                      autoFocus={isSearchInputVisible}
                      onBlur={() => setIsSearchInputVisible(false)}
                      onMouseEnter={() => setIsSearchInputVisible(true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const searchTerm = e.currentTarget.value.trim();
                          if (searchTerm) {
                            window.location.href = `/produtos?search=${encodeURIComponent(searchTerm)}`;
                          }
                        }
                      }}
                      onChange={(e) => {
                        // Add search functionality here
                        const searchTerm = e.target.value;
                        // You can add product filtering logic here
                      }}
                    />
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                      onClick={() => {
                        setIsSearchInputVisible(false);
                        // Clear search if needed
                      }}
                      type="button"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
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
