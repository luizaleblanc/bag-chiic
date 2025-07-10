import Link from "next/link"
import Image from "next/image"
import { Plus } from "lucide-react"

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
import { ProductActions } from "@/components/admin/product-actions"
import { formatCurrency } from "@/lib/utils"

export default function ProductsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/admin/produtos/novo">
              <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input placeholder="Buscar produtos..." className="max-w-sm" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Categorias</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por categoria</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Todas</DropdownMenuItem>
              <DropdownMenuItem>Moda</DropdownMenuItem>
              <DropdownMenuItem>Casa</DropdownMenuItem>
              <DropdownMenuItem>Eletrônicos</DropdownMenuItem>
              <DropdownMenuItem>Papelaria</DropdownMenuItem>
              <DropdownMenuItem>Infantil</DropdownMenuItem>
              <DropdownMenuItem>Esporte e Bem-Estar</DropdownMenuItem>
              <DropdownMenuItem>Diversão</DropdownMenuItem>
              <DropdownMenuItem>Presentes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Todos</DropdownMenuItem>
              <DropdownMenuItem>Em estoque</DropdownMenuItem>
              <DropdownMenuItem>Baixo estoque</DropdownMenuItem>
              <DropdownMenuItem>Esgotado</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Image
                  src="/modern-smartphone.png"
                  alt="Smartphone Galaxy A54"
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Smartphone Galaxy A54</TableCell>
              <TableCell>SM-A54-128-BLK</TableCell>
              <TableCell>Eletrônicos</TableCell>
              <TableCell>{formatCurrency(1899.99)}</TableCell>
              <TableCell>45</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Em estoque
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <ProductActions id="1" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  src="/running-shoes-on-track.png"
                  alt="Tênis Esportivo Runner"
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Tênis Esportivo Runner</TableCell>
              <TableCell>TS-RUN-42-BLK</TableCell>
              <TableCell>Esportes</TableCell>
              <TableCell>{formatCurrency(299.9)}</TableCell>
              <TableCell>12</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Baixo estoque
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <ProductActions id="2" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  src="/modern-coffee-maker.png"
                  alt="Cafeteira Elétrica Programável"
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Cafeteira Elétrica Programável</TableCell>
              <TableCell>CF-PRG-220-SLV</TableCell>
              <TableCell>Casa e Decoração</TableCell>
              <TableCell>{formatCurrency(349.9)}</TableCell>
              <TableCell>28</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Em estoque
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <ProductActions id="3" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  src="/floral-dress.png"
                  alt="Vestido Floral Verão"
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Vestido Floral Verão</TableCell>
              <TableCell>VS-FLR-M-MLT</TableCell>
              <TableCell>Moda</TableCell>
              <TableCell>{formatCurrency(159.9)}</TableCell>
              <TableCell>0</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Esgotado
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <ProductActions id="4" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  src="/placeholder.svg?key=emlcf"
                  alt="Kit Skincare Facial"
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">Kit Skincare Facial</TableCell>
              <TableCell>SK-FCL-PRO-KIT</TableCell>
              <TableCell>Beleza</TableCell>
              <TableCell>{formatCurrency(189.9)}</TableCell>
              <TableCell>32</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Em estoque
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <ProductActions id="5" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
