import Link from "next/link"
import Image from "next/image"

export function FeaturedAuthors() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Escritores nacionais que não podem faltar na sua estante:</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-4">
        <AuthorCard image="/placeholder.svg?key=soe86" name="Graciliano Ramos" href="/autor/graciliano-ramos" />
        <AuthorCard image="/placeholder.svg?key=rsr7o" name="Machado de Assis" href="/autor/machado-de-assis" />
        <AuthorCard image="/placeholder.svg?key=qp19k" name="Ariano Suassuna" href="/autor/ariano-suassuna" />
        <AuthorCard image="/placeholder.svg?key=05otv" name="Rodrigo França" href="/autor/rodrigo-franca" />
        <AuthorCard image="/placeholder.svg?key=bvg5c" name="Thalita Rebouças" href="/autor/thalita-reboucas" />
        <AuthorCard image="/placeholder.svg?key=34uuw" name="Igor Pires" href="/autor/igor-pires" />
        <AuthorCard image="/placeholder.svg?key=m7nt2" name="Clarice Lispector" href="/autor/clarice-lispector" />
        <AuthorCard image="/placeholder.svg?key=p9kl4" name="José Saramago" href="/autor/jose-saramago" />
        <AuthorCard image="/placeholder.svg?key=r2jf8" name="Conceição Evaristo" href="/autor/conceicao-evaristo" />
        <AuthorCard image="/placeholder.svg?key=t5gh3" name="Carlos Drummond" href="/autor/carlos-drummond" />
        <AuthorCard image="/placeholder.svg?key=v8kp1" name="Lygia Fagundes" href="/autor/lygia-fagundes" />
        <AuthorCard image="/placeholder.svg?key=z3xc9" name="Guimarães Rosa" href="/autor/guimaraes-rosa" />
      </div>
    </div>
  )
}

interface AuthorCardProps {
  image: string
  name: string
  href: string
}

function AuthorCard({ image, name, href }: AuthorCardProps) {
  return (
    <Link href={href} className="flex flex-col items-center group">
      <div className="mb-2">
        <Image src={image || "/placeholder.svg"} alt={name} width={80} height={80} className="rounded-full" />
      </div>
      <h3 className="text-sm font-medium text-center group-hover:text-primary">{name}</h3>
    </Link>
  )
}
