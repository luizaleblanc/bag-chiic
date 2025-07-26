import { Suspense } from "react"
import { Truck, CreditCard, Clock, Shield } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { FeaturedProducts } from "@/components/product/featured-products"
import { HeroCarousel } from "@/components/hero-carousel"

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Features */}
      <section className="border-t border-b py-4 bg-white">
        {" "}
        {/* Reduzido de py-6 para py-4 */}
        <div className="container">
          {/* Layout responsivo melhorado */}
          <div className="flex overflow-x-auto gap-4 pb-2 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
            <div className="flex flex-col items-center text-center p-4 min-w-[200px] md:min-w-0">
              <Truck className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium whitespace-nowrap">Frete Grátis</h3>
              <p className="text-sm text-muted-foreground text-center">Para compras acima de R$299</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 min-w-[200px] md:min-w-0">
              <CreditCard className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium whitespace-nowrap">Pagamento Seguro</h3>
              <p className="text-sm text-muted-foreground text-center">Cartão, boleto e Pix</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 min-w-[200px] md:min-w-0">
              <Clock className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium whitespace-nowrap">Entrega</h3>
              <p className="text-sm text-muted-foreground text-center">A confecção das bolsas demoram até 5 dias</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 min-w-[200px] md:min-w-0">
              <Shield className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium whitespace-nowrap">Compra Protegida</h3>
              <p className="text-sm text-muted-foreground text-center">7 dias para devolução</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Shipping Banner - Full Width */}
      <section className="py-6 bg-zinc-50">
        <div className="container">
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "0",
              paddingTop: "29.1667%",
              paddingBottom: "0",
              boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
              marginTop: "1.6em",
              marginBottom: "0.9em",
              overflow: "hidden",
              borderRadius: "8px",
              willChange: "transform",
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
                border: "none",
                padding: "0",
                margin: "0",
              }}
              src="https://www.canva.com/design/DAGsogwNsAw/x_AxYjaTgz7DmO2p5J8EcQ/view?embed"
              allowFullScreen={true}
              allow="fullscreen"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-6 bg-zinc-50">
        {" "}
        {/* Reduzido de py-8 para py-6 */}
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
