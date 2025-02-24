import { Loader2 } from "lucide-react"

import { Button, ButtonProps } from "@/components/ui/button"


export default function ButtonLoading({variant, className, ...props}:ButtonProps) {
  return (
    <Button variant={variant} className={className} {...props} disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  )
}
