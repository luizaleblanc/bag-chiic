"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, FileText, Printer, Ban, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

interface OrderActionsProps {
  id: string
}

export function OrderActions({ id }: OrderActionsProps) {
  const { toast } = useToast()
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancel = async () => {
    setIsCancelling(true)

    // Simulate API call
    setTimeout(() => {
      setIsCancelling(false)
      setShowCancelDialog(false)

      toast({
        title: "Pedido cancelado",
        description: "O pedido foi cancelado com sucesso.",
      })
    }, 1000)
  }

  const handleShip = () => {
    toast({
      title: "Pedido enviado",
      description: "O status do pedido foi atualizado para 'Enviado'.",
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/admin/pedidos/${id}`}>
              <Pencil className="mr-2 h-4 w-4" />
              Detalhes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/pedidos/${id}/nota-fiscal`}>
              <FileText className="mr-2 h-4 w-4" />
              Nota Fiscal
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShip}>
            <Truck className="mr-2 h-4 w-4" />
            Marcar como enviado
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/pedidos/${id}/imprimir`} target="_blank">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowCancelDialog(true)} className="text-red-600">
            <Ban className="mr-2 h-4 w-4" />
            Cancelar pedido
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar este pedido? Esta ação enviará uma notificação ao cliente e reembolsará o
              valor pago.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} disabled={isCancelling} className="bg-red-600 hover:bg-red-700">
              {isCancelling ? "Cancelando..." : "Confirmar cancelamento"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
