import { DiscordUrl, SupportUrl, TelegramUrl, VkUrl } from '@ui/SVGS'
import { cn } from '@/lib/utils'

export function Urls({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        'mx-auto flex w-fit min-w-[180px] select-none items-center justify-between',
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
