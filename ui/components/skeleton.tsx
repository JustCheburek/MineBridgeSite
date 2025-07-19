import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('rounded-base bg-black/30 motion-safe:animate-pulse', className)}
      {...props}
    />
  )
}

export { Skeleton }
