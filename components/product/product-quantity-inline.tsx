"use client"

import type React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProductQuantityInlineProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  min?: number
  max?: number
  size?: "default" | "sm"
}

export function ProductQuantityInline({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = "default",
}: ProductQuantityInlineProps) {
  const increment = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  const decrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value)) {
      const newQuantity = Math.max(min, Math.min(max, value))
      onQuantityChange(newQuantity)
    }
  }

  const buttonSize = size === "sm" ? "h-7 w-7" : "h-9 w-9"
  const inputHeight = size === "sm" ? "h-7" : "h-9"

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className={`${buttonSize} rounded-r-none`}
        onClick={decrement}
        disabled={quantity <= min}
      >
        <Minus className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
        <span className="sr-only">Diminuir quantidade</span>
      </Button>
      <Input
        type="number"
        min={min}
        max={max}
        className={`${inputHeight} w-10 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
        value={quantity}
        onChange={handleChange}
      />
      <Button
        variant="outline"
        size="icon"
        className={`${buttonSize} rounded-l-none`}
        onClick={increment}
        disabled={quantity >= max}
      >
        <Plus className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
        <span className="sr-only">Aumentar quantidade</span>
      </Button>
    </div>
  )
}
