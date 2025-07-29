"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    image: "/images/banner-bag-chic.png",
    alt: "Bag Chic - As suas bolsas favoritas estão de cara nova",
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
            {/* Ajustado a altura para telas muito pequenas (xs) para mostrar mais das laterais */}
            <div className="relative h-[180px] sm:h-[250px] md:h-[400px] lg:h-[500px] w-full">
              <Image src={slide.image || "/placeholder.svg"} alt={slide.alt} fill className="object-cover" priority />
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
