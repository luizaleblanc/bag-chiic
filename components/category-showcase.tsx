import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface CategoryItem {
  name: string
  slug: string
  image: string
  description: string
}

interface CategoryShowcaseProps {
  title: string
  categories: CategoryItem[]
}

export function CategoryShowcase({ title, categories }: CategoryShowcaseProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <Link href="/categorias" className="text-sm font-medium flex items-center text-primary">
          Ver todas
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/${category.slug}`}
            className="group block bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-square">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium group-hover:text-primary">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
