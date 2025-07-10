import Image from "next/image"

export function FreeShippingBanner() {
  return (
    <section className="relative h-[200px] md:h-[250px] lg:h-[300px] w-full overflow-hidden">
      <Image
        src="/images/banner-promocao-frete-gratis-moderno-em-pink-e-branco-new.png"
        alt="Banner de Frete Grátis e 10% de desconto na primeira compra"
        fill
        className="object-cover w-full"
        priority
      />
    </section>
  )
}
