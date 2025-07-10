import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export function BookRecommendations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* National Literature Promo */}
      <div className="bg-zinc-100 rounded-lg p-6 flex items-center">
        <div className="space-y-3">
          <h3 className="text-zinc-500 text-sm">Confira os livros de</h3>
          <h2 className="text-xl font-bold">
            literatura nacional<span className="text-teal-500">.com</span>
          </h2>
          <div className="text-3xl font-bold text-teal-500">15% OFF</div>
          <p className="text-sm text-zinc-500">CUPOM: LITERATURABRASILEIRA</p>
          <Button variant="outline" className="rounded-full text-sm bg-transparent">
            Vem ver!
          </Button>
        </div>
        <div className="hidden md:block ml-4">
          <Image
            src="/images/book-covers.png"
            alt="Livros de Literatura Nacional"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-medium mb-3">Confira os livros indicados no vídeo e outras histórias:</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          <BookCard
            image="/placeholder.svg?key=eey1t"
            title="O Labirinto das Ruas"
            author="Maria Silva"
            price={35.9}
            rating={4.5}
          />
          <BookCard
            image="/placeholder.svg?key=pdg77"
            title="Cores que Falam"
            author="João Santos"
            price={42.5}
            rating={4.2}
          />
          <BookCard
            image="/placeholder.svg?key=p8ala"
            title="Eu Chamo de Amor"
            author="Carolina Reis"
            price={29.9}
            rating={4.8}
            isNew
          />
          <BookCard
            image="/placeholder.svg?key=odgvn"
            title="Linhas do Tempo"
            author="Ricardo Mendes"
            price={38.9}
            rating={4.3}
          />
          <BookCard
            image="/placeholder.svg?key=6l88b"
            title="Laços Invisíveis"
            author="Fernanda Costa"
            price={45.9}
            rating={4.7}
          />
        </div>
      </div>
    </div>
  )
}

interface BookCardProps {
  image: string
  title: string
  author: string
  price: number
  rating: number
  isNew?: boolean
}

function BookCard({ image, title, author, price, rating, isNew }: BookCardProps) {
  return (
    <Link href="#" className="group">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={100}
          height={150}
          className="w-full h-auto rounded-sm object-cover"
        />
        {isNew && <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 rounded-sm">Novo</div>}
      </div>
      <div className="mt-2">
        <h4 className="text-xs font-medium line-clamp-2 group-hover:text-primary">{title}</h4>
        <p className="text-xs text-zinc-500">{author}</p>
        <div className="flex items-center mt-1">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-zinc-300"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
        </div>
        <p className="text-xs font-medium mt-1">
          A partir de <br />
          <span className="text-sm font-bold">R$ {price.toFixed(2).replace(".", ",")}</span>
        </p>
      </div>
    </Link>
  )
}
