import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
      <Image
        src="/images/banner-bag-chic.png"
        alt="Bag Chic - As suas bolsas favoritas estão de cara nova"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
