import Image from "next/image"

export function FreeShippingBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full bg-[#4a4b4b]" style={{ paddingTop: "31.25%" }}>
        <Image
          src="/images/whatsapp-image-2025-07-25-at-22-02-04.jpeg"
          alt="Banner de Frete Grátis e 10% de desconto na primeira compra com bolsas e flores"
          fill
          className="object-contain"
          priority
        />
      </div>
    </section>
  )
}
