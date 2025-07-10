"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ProductImageUpload } from "@/components/admin/product-image-upload"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleAddImage = (url: string) => {
    setImages((prev) => [...prev, url])
  }

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to create product
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: "Produto criado com sucesso!",
        description: "O produto foi adicionado ao catálogo.",
      })

      router.push("/admin/produtos")
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold tracking-tight">Novo Produto</h2>
          </div>
          <p className="text-muted-foreground">Adicione um novo produto ao catálogo da loja.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Produto"}
          </Button>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
              <TabsTrigger value="pricing">Preços</TabsTrigger>
              <TabsTrigger value="inventory">Estoque</TabsTrigger>
              <TabsTrigger value="shipping">Envio</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input id="name" placeholder="Nome do produto" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Código único do produto" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Descrição detalhada do produto" className="min-h-32" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moda">Moda</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                      <SelectItem value="papelaria">Papelaria</SelectItem>
                      <SelectItem value="infantil">Infantil</SelectItem>
                      <SelectItem value="esporte-bem-estar">Esporte e Bem-Estar</SelectItem>
                      <SelectItem value="diversao">Diversão</SelectItem>
                      <SelectItem value="presentes">Presentes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input id="brand" placeholder="Marca do produto" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="images" className="space-y-4">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label>Imagens do Produto</Label>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md border bg-muted">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Produto ${index + 1}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-6 w-6"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    <ProductImageUpload onUpload={handleAddImage} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Adicione até 8 imagens. A primeira imagem será a imagem principal do produto.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="pricing" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compare-price">Preço Comparativo (R$)</Label>
                  <Input id="compare-price" type="number" step="0.01" placeholder="0,00" />
                  <p className="text-sm text-muted-foreground">Exibido como preço riscado para mostrar desconto</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cost">Custo (R$)</Label>
                  <Input id="cost" type="number" step="0.01" placeholder="0,00" />
                  <p className="text-sm text-muted-foreground">Para cálculo de margem (não exibido ao cliente)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-class">Classe de Imposto</Label>
                  <Select>
                    <SelectTrigger id="tax-class">
                      <SelectValue placeholder="Selecione uma classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Padrão (18%)</SelectItem>
                      <SelectItem value="reduced">Reduzido (12%)</SelectItem>
                      <SelectItem value="exempt">Isento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="inventory" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stock">Quantidade em Estoque</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-stock">Alerta de Baixo Estoque</Label>
                  <Input id="low-stock" type="number" placeholder="5" />
                  <p className="text-sm text-muted-foreground">Notificar quando o estoque estiver abaixo deste valor</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sku-location">Localização no Estoque</Label>
                  <Input id="sku-location" placeholder="Ex: Prateleira A3, Galpão 2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barcode">Código de Barras (EAN/UPC)</Label>
                  <Input id="barcode" placeholder="Ex: 7891234567890" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input id="weight" type="number" step="0.01" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Largura (cm)</Label>
                  <Input id="width" type="number" step="0.1" placeholder="0,0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input id="height" type="number" step="0.1" placeholder="0,0" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="length">Comprimento (cm)</Label>
                  <Input id="length" type="number" step="0.1" placeholder="0,0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipping-class">Classe de Envio</Label>
                  <Select>
                    <SelectTrigger id="shipping-class">
                      <SelectValue placeholder="Selecione uma classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Padrão</SelectItem>
                      <SelectItem value="oversized">Grande Porte</SelectItem>
                      <SelectItem value="fragile">Frágil</SelectItem>
                      <SelectItem value="digital">Digital (sem envio)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="seo" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Título Meta (SEO)</Label>
                <Input id="meta-title" placeholder="Título para SEO" />
                <p className="text-sm text-muted-foreground">Recomendado: 50-60 caracteres</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Descrição Meta (SEO)</Label>
                <Textarea id="meta-description" placeholder="Descrição para SEO" className="min-h-20" />
                <p className="text-sm text-muted-foreground">Recomendado: 150-160 caracteres</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Amigável</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">mimoskorea.com.br/produtos/</span>
                  <Input id="slug" placeholder="nome-do-produto" className="flex-1" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg border shadow-sm">
            <div className="p-4 font-medium">Status do Produto</div>
            <Separator />
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="archived">Arquivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibilidade</Label>
                <Select>
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Selecione a visibilidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visible">Visível</SelectItem>
                    <SelectItem value="hidden">Oculto</SelectItem>
                    <SelectItem value="featured">Destaque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publish-date">Data de Publicação</Label>
                <Input id="publish-date" type="datetime-local" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border shadow-sm">
            <div className="p-4 font-medium">Organização</div>
            <Separator />
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Separe as tags por vírgula" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collections">Coleções</Label>
                <Select>
                  <SelectTrigger id="collections">
                    <SelectValue placeholder="Selecione uma coleção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summer">Verão 2023</SelectItem>
                    <SelectItem value="winter">Inverno 2023</SelectItem>
                    <SelectItem value="sale">Promoções</SelectItem>
                    <SelectItem value="new">Novidades</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
