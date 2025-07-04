import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

type Skeleton = ComponentPropsWithoutRef<'div'>

export function Skeleton({ className, ...props }: Skeleton) {
  return (
    <div className={cn('rounded-base bg-black motion-safe:animate-pulse', className)} {...props} />
  )
}
