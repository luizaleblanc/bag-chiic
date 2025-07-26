import Image from "next/image"

export function FreeShippingBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Altura ajustada para mobile para mostrar mais conteúdo */}
      <div className="relative h-[180px] sm:h-[250px] md:h-[350px] lg:h-[400px] w-full">
        <Image
          src="/images/banner-promocao-frete-gratis-moderno-em-pink-e-branco-new.png"
          alt="Banner de Frete Grátis e 10% de desconto na primeira compra"
          fill
          className="object-cover object-right"
          priority
        />
      </div>
    </section>
  )
}
