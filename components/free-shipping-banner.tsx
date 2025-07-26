import Image from "next/image"

export function FreeShippingBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Altura ajustada para mobile e desktop */}
      {/* object-cover para remover espaçamentos brancos */}
      {/* object-[70%_center] para mobile para focar na direita (bolsa) e tentar manter o texto "frete grátis" */}
      {/* md:object-center para desktop para centralizar a imagem como antes */}
      <div className="relative h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] w-full">
        <Image
          src="/images/banner-promocao-frete-gratis-moderno-em-pink-e-branco-new.png"
          alt="Banner de Frete Grátis e 10% de desconto na primeira compra"
          fill
          className="object-cover object-[70%_center] md:object-center"
          priority
        />
      </div>
    </section>
  )
}
