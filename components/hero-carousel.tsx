"use client"

import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/images/banner-bag-chic.png",
    alt: "Bag Chic - As suas bolsas favoritas estão de cara nova",
  },
]

export function HeroCarousel() {
  const firstSlide = slides[0];

  return (
    <div className="relative overflow-hidden">
      <div className="flex">
        <div key={firstSlide.id} className="relative min-w-full">
          <div className="relative h-[180px] sm:h-[250px] md:h-[400px] lg:h-[500px] w-full">
            <Image src={firstSlide.image || "/placeholder.svg"} alt={firstSlide.alt} fill className="object-cover" priority />
          </div>
        </div>
      </div>
    </div>
  )
}
