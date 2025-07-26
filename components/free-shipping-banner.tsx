import Image from "next/image"

export function FreeShippingBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* No mobile, a imagem será 'object-contain' para ser inteiramente visível. */}
      {/* No desktop (md:), ela voltará a ser 'object-cover' e 'object-center'. */}
      {/* A altura é ajustada para acomodar a imagem inteira no mobile e preencher no desktop. */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] w-full">
        <Image
          src="/images/banner-promocao-frete-gratis-moderno-em-pink-e-branco-new.png"
          alt="Banner de Frete Grátis e 10% de desconto na primeira compra"
          fill
          className="object-contain md:object-cover md:object-center"
          priority
        />
      </div>
    </section>
  )
}
