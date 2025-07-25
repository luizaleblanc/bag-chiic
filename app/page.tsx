import { Suspense } from "react"
import { Truck, CreditCard, Clock, Shield } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { FeaturedProducts } from "@/components/product/featured-products"
import { HeroCarousel } from "@/components/hero-carousel"
import { FreeShippingBanner } from "@/components/free-shipping-banner"

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Features */}
      <section className="border-t border-b py-6 bg-white">
        <div className="container">
          {/* Alterado para flexbox com rolagem horizontal para mobile */}
          <div className="flex overflow-x-auto whitespace-nowrap py-2 -mx-4 px-4 md:grid md:grid-cols-4 md:gap-6 md:mx-0 md:px-0">
            <div className="flex flex-col items-center text-center p-4 flex-shrink-0 w-1/2 md:w-auto">
              <Truck className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Frete Grátis</h3>
              <p className="text-sm text-muted-foreground">Para compras acima de R$299</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 flex-shrink-0 w-1/2 md:w-auto">
              <CreditCard className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Pagamento Seguro</h3>
              <p className="text-sm text-muted-foreground">Cartão, boleto e Pix</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 flex-shrink-0 w-1/2 md:w-auto">
              <Clock className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Entrega</h3>
              <p className="text-sm text-muted-foreground">A confecção das bolsas demoram até 5 dias</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 flex-shrink-0 w-1/2 md:w-auto">
              <Shield className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Compra Protegida</h3>
              <p className="text-sm text-muted-foreground">7 dias para devolução</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Shipping Banner - Full Width */}
      <FreeShippingBanner />

      {/* Products */}
      <section className="py-8 bg-zinc-50">
        <div className="container">
          <Suspense fallback={<ProductsLoadingSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>
    </main>
  )
}

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
    </div>
  )
}
