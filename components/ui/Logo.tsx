import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className, width = 220, height = 70 }: LogoProps) {
  return (
    <div className={cn("relative", className)} style={{ width: width, height: height }}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20sm%20fundo-v0cA6FQf7Om6LWPCVHb51Zu9IOhNFb.png"
        alt="Bag Chiic Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
