import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Truck, Clock, Shield } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductQuantity } from "@/components/product/product-quantity"
import { ProductGallery } from "@/components/product/product-gallery"
import { AddToCartButton } from "@/components/product/add-to-cart-button"
import { RelatedProducts } from "@/components/product/related-products"
import { getProductBySlug } from "@/lib/products"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="flex-1">
      <div className="container py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm mb-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Início
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link href="/produtos" className="text-muted-foreground hover:text-foreground">
            Produtos
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link
            href={`/categorias/${product.category.toLowerCase()}`}
            className="text-muted-foreground hover:text-foreground"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="font-medium">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.isNew && (
                <Badge className="mb-2" variant="secondary">
                  Novo
                </Badge>
              )}
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-bold">R$ {product.price.toFixed(2).replace(".", ",")}</div>
              <div className="text-sm text-muted-foreground">
                Em até 10x de R$ {(product.price / 10).toFixed(2).replace(".", ",")} sem juros
              </div>
              <div className="flex flex-col text-sm text-green-600">
                <span className="font-medium">5% de desconto</span>
                <span>no PIX ou Boleto</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Quantidade</h3>
              <ProductQuantity max={10} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <AddToCartButton product={product} className="flex-1" />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Entrega</h4>
                  <p className="text-sm text-muted-foreground">Frete grátis para compras acima de R$ 299,00</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Disponibilidade</h4>
                  <p className="text-sm text-muted-foreground">A confecção das bolsas demora até 5 dias.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Garantia</h4>
                  <p className="text-sm text-muted-foreground">7 dias para devolução e 2 meses de garantia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Descrição
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Especificações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <h3>Características</h3>
              <ul>
                <li>Alta qualidade e durabilidade</li>
                <li>Design moderno e elegante</li>
                <li>Fácil de usar e limpar</li>
                <li>Combina com diversos looks</li>
                <li>Garantia de 2 meses da artesã</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-4">Informações Técnicas</h3>
                <div className="space-y-2">
                  {product.specs &&
                    Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b">
                        <div className="text-muted-foreground">{key}</div>
                        <div>{value}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
          <Suspense fallback={<RelatedProductsSkeleton />}>
            <RelatedProducts categoryId={product.category} currentProductId={product.id} />
          </Suspense>
        </section>
      </div>
    </main>
  )
}

function RelatedProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array(5)
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
