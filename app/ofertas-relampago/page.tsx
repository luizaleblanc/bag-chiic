import { Suspense } from "react"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product/product-card"
import { getProducts } from "@/lib/products"

export default function FlashOffersPage() {
  const products = getProducts()

  // Simulate flash offers by adding a countdown and discount
  const flashOffers = products.map((product) => ({
    ...product,
    isOnSale: true,
    salePrice: product.price * 0.7, // 30% discount
    endsIn: Math.floor(Math.random() * 24) + 1, // Random hours between 1-24
  }))

  return (
    <main className="flex-1">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Ofertas Relâmpago</h1>
          <p className="text-lg mb-6">Promoções exclusivas por tempo limitado. Aproveite enquanto durar!</p>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="all">Todas as Ofertas</TabsTrigger>
            <TabsTrigger value="papelaria">Papelaria</TabsTrigger>
            <TabsTrigger value="eletronicos">Eletrônicos</TabsTrigger>
            <TabsTrigger value="casa">Casa</TabsTrigger>
            <TabsTrigger value="moda">Moda</TabsTrigger>
            <TabsTrigger value="brinquedos">Brinquedos</TabsTrigger>
            <TabsTrigger value="esporte">Esporte e Bem-Estar</TabsTrigger>
            <TabsTrigger value="diversao">Diversão</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-100 rounded-lg p-6 flex items-center">
                <div className="space-y-3">
                  <h3 className="text-zinc-500 text-sm">Ofertas por tempo limitado</h3>
                  <h2 className="text-xl font-bold">
                    Até 30% OFF<span className="text-teal-500">!</span>
                  </h2>
                  <div className="flex items-center text-primary">
                    <Clock className="mr-2 h-5 w-5" />
                    <span className="font-medium">Termina em breve</span>
                  </div>
                  <Button className="rounded-full text-sm mt-2">Aproveitar agora</Button>
                </div>
              </div>

              <div className="bg-zinc-900 text-white rounded-lg p-6 flex items-center">
                <div className="space-y-3">
                  <h3 className="text-zinc-300 text-sm">Ofertas exclusivas</h3>
                  <h2 className="text-xl font-bold">
                    Frete Grátis<span className="text-teal-500">!</span>
                  </h2>
                  <p className="text-zinc-300">Em compras acima de R$99</p>
                  <Button variant="secondary" className="rounded-full text-sm mt-2">
                    Ver produtos
                  </Button>
                </div>
              </div>
            </div>

            <Suspense fallback={<ProductsLoadingSkeleton />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {flashOffers.map((product) => (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{product.endsIn}h restantes</span>
                    </div>
                  </div>
                ))}
              </div>
            </Suspense>
          </TabsContent>

          {/* Other tabs would have similar content but filtered by category */}
          <TabsContent value="papelaria">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Carregando ofertas de papelaria...</p>
            </div>
          </TabsContent>

          {/* Placeholder for other tabs */}
        </Tabs>
      </div>
    </main>
  )
}

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array(10)
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
