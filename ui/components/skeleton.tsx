import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-black/30 motion-safe:animate-pulse rounded-base", className)}
      {...props}
    />
  )
}

export { Skeleton }
