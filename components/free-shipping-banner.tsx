import Image from "next/image"

export function FreeShippingBanner() {
  // A proporção da imagem banner-correto.png é 1920x400.
  // Calculamos a porcentagem para o padding-top: (altura / largura) * 100 = (400 / 1920) * 100 = 20.8333...%
  // Isso garante que o contêiner sempre terá a proporção correta da imagem.
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px]">
        {/* O padding-top cria um espaço que mantém a proporção da imagem. */}
        {/* A imagem com 'fill' e 'object-cover' preencherá esse espaço, eliminando bordas brancas. */}
        <Image
          src="/images/whatsapp-image-2025-07-25-at-21-53-20.jpeg"
          alt="Banner de Frete Grátis e 10% de desconto na primeira compra"
          fill
          className="object-cover" // Garante que a imagem preencha o contêiner, eliminando todos os espaços brancos
          priority
        />
      </div>
    </section>
  )
}
