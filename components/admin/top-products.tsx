import { ArrowUp, ArrowDown } from "lucide-react"

export function TopProducts() {
  const products = [
    {
      id: "1",
      name: "Smartphone Galaxy A54",
      sales: 42,
      revenue: 79799.58,
      trend: "up",
    },
    {
      id: "3",
      name: "Cafeteira Elétrica Programável",
      sales: 38,
      revenue: 13296.2,
      trend: "up",
    },
    {
      id: "2",
      name: "Tênis Esportivo Runner",
      sales: 35,
      revenue: 10496.5,
      trend: "down",
    },
    {
      id: "5",
      name: "Kit Skincare Facial",
      sales: 30,
      revenue: 5697,
      trend: "up",
    },
    {
      id: "4",
      name: "Vestido Floral Verão",
      sales: 28,
      revenue: 4477.2,
      trend: "down",
    },
  ]

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">{product.name}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{product.sales} vendas</span>
              <span className="mx-2">•</span>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.revenue)}
              </span>
            </div>
          </div>
          <div className={`flex items-center ${product.trend === "up" ? "text-green-500" : "text-red-500"}`}>
            {product.trend === "up" ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
            <span className="text-sm font-medium">
              {product.trend === "up" ? "+" : "-"}
              {Math.floor(Math.random() * 20) + 5}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
