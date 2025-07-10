"use client"

import type React from "react"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProductQuantityProps {
  initialQuantity?: number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
}

export function ProductQuantity({ initialQuantity = 1, min = 1, max = 99, onChange }: ProductQuantityProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const increment = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const decrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value)) {
      const newQuantity = Math.max(min, Math.min(max, value))
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-r-none"
        onClick={decrement}
        disabled={quantity <= min}
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Diminuir quantidade</span>
      </Button>
      <Input
        type="number"
        min={min}
        max={max}
        className="h-9 w-14 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={quantity}
        onChange={handleChange}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-l-none"
        onClick={increment}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Aumentar quantidade</span>
      </Button>
    </div>
  )
}
