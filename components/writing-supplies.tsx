import Link from "next/link"
import Image from "next/image"

export function WritingSupplies() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Monte seu caminho de escrita!</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <WritingSupplyCard image="/placeholder.svg?key=0u6lm" title="Cadernos" href="/produtos/cadernos" />
        <WritingSupplyCard image="/modern-desk-lamp.png" title="Luminárias" href="/produtos/luminarias" />
        <WritingSupplyCard
          image="/placeholder.svg?key=j00u5"
          title="Material de Escritório"
          href="/produtos/material-escritorio"
        />
        <WritingSupplyCard
          image="/modern-coffee-machine.png"
          title="Cafeteiras e Cápsulas"
          href="/produtos/cafeteiras"
        />
      </div>
    </div>
  )
}

interface WritingSupplyCardProps {
  image: string
  title: string
  href: string
}

function WritingSupplyCard({ image, title, href }: WritingSupplyCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium group-hover:text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">Produtos para sua escrita</p>
      </div>
    </Link>
  )
}
