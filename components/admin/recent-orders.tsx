import Link from "next/link"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function RecentOrders() {
  const orders = [
    {
      id: "12345",
      customer: "Maria Silva",
      date: "2023-05-15T14:30:00",
      status: "delivered",
      total: 459.9,
    },
    {
      id: "12346",
      customer: "João Santos",
      date: "2023-05-16T09:15:00",
      status: "shipped",
      total: 1250.5,
    },
    {
      id: "12347",
      customer: "Ana Oliveira",
      date: "2023-05-16T16:45:00",
      status: "pending",
      total: 325.8,
    },
    {
      id: "12348",
      customer: "Carlos Mendes",
      date: "2023-05-17T11:20:00",
      status: "processing",
      total: 789.99,
    },
    {
      id: "12349",
      customer: "Fernanda Lima",
      date: "2023-05-18T08:30:00",
      status: "paid",
      total: 159.9,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Entregue
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Enviado
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Aguardando pagamento
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Em separação
          </Badge>
        )
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Pagamento aprovado
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelado
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="pb-3">Pedido</th>
                <th className="pb-3">Cliente</th>
                <th className="pb-3">Data</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t text-sm">
                  <td className="py-3">
                    <Link href={`/admin/pedidos/${order.id}`} className="text-primary hover:underline">
                      #{order.id}
                    </Link>
                  </td>
                  <td className="py-3">{order.customer}</td>
                  <td className="py-3">{formatDate(new Date(order.date))}</td>
                  <td className="py-3">{getStatusBadge(order.status)}</td>
                  <td className="py-3 text-right font-medium">{formatCurrency(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center">
        <Link href="/admin/pedidos" className="text-sm text-primary hover:underline">
          Ver todos os pedidos
        </Link>
      </div>
    </div>
  )
}
