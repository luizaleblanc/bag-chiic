"use client"

import { useState } from "react"
import { Upload } from "lucide-react"

interface ProductImageUploadProps {
  onUpload: (url: string) => void
}

export function ProductImageUpload({ onUpload }: ProductImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = () => {
    setIsUploading(true)

    // Simulate image upload
    setTimeout(() => {
      // Generate a random placeholder image
      const randomId = Math.random().toString(36).substring(2, 8)
      const placeholderUrl = `/placeholder.svg?key=${randomId}`

      onUpload(placeholderUrl)
      setIsUploading(false)
    }, 1500)
  }

  return (
    <div
      className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-muted/50 hover:bg-muted"
      onClick={handleUpload}
    >
      <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
      <p className="text-xs text-muted-foreground">{isUploading ? "Enviando..." : "Adicionar imagem"}</p>
    </div>
  )
}
