"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function MegaMenu() {
  const [open, setOpen] = useState(false)

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => setOpen(!open)} className="text-zinc-700 hover:text-primary">
            Categorias <ChevronDown className="ml-1 h-3 w-3" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-full grid-cols-2 md:grid-cols-4 p-4">
              <CategorySection
                title="Moda"
                items={[
                  { name: "Novidades em moda", href: "/moda/novidades" },
                  { name: "Óculos", href: "/moda/oculos" },
                  { name: "Moda inverno", href: "/moda/inverno" },
                  { name: "Moda verão", href: "/moda/verao" },
                  { name: "Bolsas", href: "/moda/bolsas" },
                  { name: "Mochilas", href: "/moda/mochilas" },
                  { name: "Acessórios", href: "/moda/acessorios" },
                ]}
              />

              <CategorySection
                title="Casa"
                items={[
                  { name: "Novidades para casa", href: "/casa/novidades" },
                  { name: "Cozinha", href: "/casa/cozinha" },
                  { name: "Eletrodomésticos", href: "/casa/eletrodomesticos" },
                  { name: "Decoração", href: "/casa/decoracao" },
                  { name: "Casa aconchegante", href: "/casa/aconchegante" },
                  { name: "Viagem", href: "/casa/viagem" },
                ]}
              />

              <CategorySection
                title="Eletrônicos"
                items={[
                  { name: "Novidades eletrônicos", href: "/eletronicos/novidades" },
                  { name: "Acessórios para celulares", href: "/eletronicos/acessorios-celulares" },
                  { name: "Fones de ouvido", href: "/eletronicos/fones" },
                  { name: "Eletrônicos esportivos", href: "/eletronicos/esportivos" },
                  { name: "Caixas de som", href: "/eletronicos/caixas-som" },
                ]}
              />

              <CategorySection
                title="Papelaria"
                items={[
                  { name: "Post-its", href: "/papelaria/post-its" },
                  { name: "Canetas", href: "/papelaria/canetas" },
                  { name: "Cadernos", href: "/papelaria/cadernos" },
                  { name: "Planejadores", href: "/papelaria/planejadores" },
                  { name: "Marcadores", href: "/papelaria/marcadores" },
                  { name: "Agendas", href: "/papelaria/agendas" },
                ]}
              />

              <CategorySection
                title="Infantil"
                items={[
                  { name: "Novidades infantis", href: "/infantil/novidades" },
                  { name: "Pelúcias e bonecos", href: "/infantil/pelucias" },
                  { name: "Brinquedos", href: "/infantil/brinquedos" },
                  { name: "Coleção infantil para casa", href: "/infantil/casa" },
                ]}
              />

              <CategorySection
                title="Esporte e Bem-Estar"
                items={[
                  { name: "Momento relax", href: "/esporte-bem-estar/relax" },
                  { name: "Massagem", href: "/esporte-bem-estar/massagem" },
                  { name: "Beleza e higiene", href: "/esporte-bem-estar/beleza" },
                  { name: "Esporte", href: "/esporte-bem-estar/esporte" },
                ]}
              />

              <CategorySection
                title="Diversão"
                items={[
                  { name: "Jogos e entretenimento", href: "/diversao/jogos" },
                  { name: "Quebra-cabeças", href: "/diversao/quebra-cabecas" },
                  { name: "Jogos para festas", href: "/diversao/jogos-festas" },
                  { name: "Artigos divertidos", href: "/diversao/artigos" },
                ]}
              />

              <CategorySection
                title="Presentes"
                items={[
                  { name: "Para a mamãe", href: "/presentes/mamae" },
                  { name: "Para o papai", href: "/presentes/papai" },
                  { name: "Para professores", href: "/presentes/professores" },
                  { name: "Para aniversários", href: "/presentes/aniversarios" },
                  { name: "Nossos kits", href: "/presentes/kits" },
                ]}
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface CategorySectionProps {
  title: string
  items: { name: string; href: string }[]
}

function CategorySection({ title, items }: CategorySectionProps) {
  return (
    <div className="p-3">
      <Link href={`/${title.toLowerCase().replace(/\s+/g, "-")}`} className="block font-medium text-primary mb-2">
        {title}
      </Link>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            <NavigationMenuLink asChild>
              <Link href={item.href} className="block text-sm text-muted-foreground hover:text-foreground">
                {item.name}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
