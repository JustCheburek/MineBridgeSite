import { DiscordUrl, SupportUrl, TelegramUrl, VkUrl } from '@ui/SVGS'
import { cn } from '@/lib/utils'

export function Urls({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        'mx-auto flex w-fit min-w-[180px] items-center justify-between select-none',
        '*:inline-flex *:aspect-square *:items-center *:justify-center',
        className
      )}
    >
      {/* Навигация по ссылкам */}
      <li>
        <TelegramUrl />
      </li>
      <li>
        <DiscordUrl />
      </li>
      <li>
        <VkUrl />
      </li>
      <li>
        <SupportUrl />
      </li>
    </ul>
  )
}
