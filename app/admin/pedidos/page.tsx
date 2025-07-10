import Link from "next/link"
import { CalendarIcon, Download, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { OrderActions } from "@/components/admin/order-actions"
import { formatCurrency } from "@/lib/utils"

export default function OrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pedidos</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input placeholder="Buscar pedidos..." className="max-w-sm" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Todos</DropdownMenuItem>
              <DropdownMenuItem>Aguardando pagamento</DropdownMenuItem>
              <DropdownMenuItem>Pagamento aprovado</DropdownMenuItem>
              <DropdownMenuItem>Em separação</DropdownMenuItem>
              <DropdownMenuItem>Enviado</DropdownMenuItem>
              <DropdownMenuItem>Entregue</DropdownMenuItem>
              <DropdownMenuItem>Cancelado</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Período
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filtrar por período</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hoje</DropdownMenuItem>
              <DropdownMenuItem>Últimos 7 dias</DropdownMenuItem>
              <DropdownMenuItem>Últimos 30 dias</DropdownMenuItem>
              <DropdownMenuItem>Este mês</DropdownMenuItem>
              <DropdownMenuItem>Mês passado</DropdownMenuItem>
              <DropdownMenuItem>Personalizado</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Método de Pagamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/admin/pedidos/12345" className="text-primary hover:underline">
                  #12345
                </Link>
              </TableCell>
              <TableCell>15/05/2023 14:30</TableCell>
              <TableCell>Maria Silva</TableCell>
              <TableCell>Cartão de Crédito</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Entregue
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(459.9)}</TableCell>
              <TableCell className="text-right">
                <OrderActions id="12345" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/admin/pedidos/12346" className="text-primary hover:underline">
                  #12346
                </Link>
              </TableCell>
              <TableCell>16/05/2023 09:15</TableCell>
              <TableCell>João Santos</TableCell>
              <TableCell>Pix</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Enviado
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(1250.5)}</TableCell>
              <TableCell className="text-right">
                <OrderActions id="12346" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/admin/pedidos/12347" className="text-primary hover:underline">
                  #12347
                </Link>
              </TableCell>
              <TableCell>16/05/2023 16:45</TableCell>
              <TableCell>Ana Oliveira</TableCell>
              <TableCell>Boleto</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Aguardando pagamento
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(325.8)}</TableCell>
              <TableCell className="text-right">
                <OrderActions id="12347" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/admin/pedidos/12348" className="text-primary hover:underline">
                  #12348
                </Link>
              </TableCell>
              <TableCell>17/05/2023 11:20</TableCell>
              <TableCell>Carlos Mendes</TableCell>
              <TableCell>Cartão de Crédito</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Em separação
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(789.99)}</TableCell>
              <TableCell className="text-right">
                <OrderActions id="12348" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/admin/pedidos/12349" className="text-primary hover:underline">
                  #12349
                </Link>
              </TableCell>
              <TableCell>18/05/2023 08:30</TableCell>
              <TableCell>Fernanda Lima</TableCell>
              <TableCell>Pix</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Pagamento aprovado
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(159.9)}</TableCell>
              <TableCell className="text-right">
                <OrderActions id="12349" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <Link href="/admin/pedidos/12350" className="text-primary hover:underline">
                  #12350
                </Link>
              </TableCell>
              <TableCell>18/05/2023 14:10</TableCell>
              <TableCell>Roberto Alves</TableCell>
              <TableCell>Cartão de Crédito</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Cancelado
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(2499.9)}</TableCell>
              <TableCell className="text-right">
                <OrderActions id="12350" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
