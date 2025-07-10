import Link from "next/link"
import { Facebook, Instagram, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/ui/Logo"

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "rgba(76, 75, 75, 0.4)" }} className="border-t">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <Link href="/">
              <Logo width={120} height={40} />
            </Link>
            <p className="text-sm" style={{ color: "#4c4b4b" }}>
              Sua loja de bolsas feitas a mão.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Minha Conta</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/conta" style={{ color: "#4c4b4b" }} className="hover:text-foreground">
                  Minha Conta
                </Link>
              </li>
              <li>
                <Link href="/pedidos" style={{ color: "#4c4b4b" }} className="hover:text-foreground">
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link href="/carrinho" style={{ color: "#4c4b4b" }} className="hover:text-foreground">
                  Carrinho
                </Link>
              </li>
              <li>
                <Link href="/rastreamento" style={{ color: "#4c4b4b" }} className="hover:text-foreground">
                  Rastrear Pedido
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 mt-0.5" style={{ color: "#4c4b4b" }} />
                <span style={{ color: "#4c4b4b" }}>Sobradinho, Distrito Federal</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4" style={{ color: "#4c4b4b" }} />
                <span style={{ color: "#4c4b4b" }}>(61) 99224-0535</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator />
    </footer>
  )
}
