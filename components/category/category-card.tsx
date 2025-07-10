import Link from "next/link"
import Image from "next/image"

interface CategoryCardProps {
  name: string
  slug: string
  image: string
  count: number
}

export function CategoryCard({ name, slug, image, count }: CategoryCardProps) {
  return (
    <Link href={`/categorias/${slug}`} className="group block">
      <div className="overflow-hidden rounded-lg border bg-background transition-colors group-hover:border-primary">
        <div className="relative aspect-square">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-3 text-center">
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{count} produtos</p>
        </div>
      </div>
    </Link>
  )
}
