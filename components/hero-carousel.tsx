"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    title: "Ofertas Imperdíveis",
    description: "Até 50% de desconto em produtos selecionados",
    image: "/placeholder.svg?key=004nj",
    cta: "Comprar Agora",
    url: "/ofertas",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Nova Coleção de Verão",
    description: "Descubra as últimas tendências para a estação",
    image: "/placeholder.svg?key=5twnc",
    cta: "Ver Coleção",
    url: "/categorias/moda",
    color: "from-orange-500 to-pink-500",
  },
  {
    id: 3,
    title: "Tecnologia em Promoção",
    description: "Os melhores gadgets com preços especiais",
    image: "/placeholder.svg?key=4uwjg",
    cta: "Explorar",
    url: "/categorias/eletronicos",
    color: "from-emerald-500 to-teal-500",
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1))
  const next = () => setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1))

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative min-w-full">
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
              <div className={cn("absolute inset-0 bg-gradient-to-r opacity-70", slide.color)} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{slide.title}</h2>
                <p className="text-sm md:text-lg mb-4 md:mb-6 max-w-md">{slide.description}</p>
                <Button asChild size="lg" variant="secondary">
                  <Link href={slide.url}>{slide.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 text-foreground"
        onClick={prev}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Slide anterior</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 text-foreground"
        onClick={next}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Próximo slide</span>
      </Button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn("h-2 w-2 rounded-full bg-white/50 transition-colors", current === index && "bg-white")}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
