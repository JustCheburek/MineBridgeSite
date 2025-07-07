import type { SVGProps } from 'react'
import { DS_URL, SUPPORT_URL, TG_URL, VK_URL } from '@/const'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Svg extends SVGProps<SVGSVGElement> {
  className?: string
}

interface ColorSvg extends Svg {
  colorful?: boolean
}

const flexSvg = 'inline-flex justify-center items-center'
const colorSvg = 'group *:transition-colors *:duration-500'

export const GiftSvg = ({ className = '', ...props }: Svg) => (
  <svg fill='currentcolor' viewBox='0 0 24 24' className={cn('size-[1em]', className)} {...props}>
    <rect width='24' height='24' fill='none' />
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M12 8v13m0-13V6a2 2 0 1 1 2 2zm0 0V5.5A2.5 2.5 0 1 0 9.5 8zm-7 4h14M5 12a2 2 0 1 1 0-4h14a2 2 0 1 1 0 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7'
    />
  </svg>
)

export const UploadSvg = ({ className = '', ...props }: Svg) => (
  <svg viewBox='0 0 24 24' className={cn('size-[1em]', className)} {...props}>
    <path
      fill='currentColor'
      d='M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z'
    />
  </svg>
)

export const StarSvg = ({ className = '', ...props }: Svg) => (
  <svg viewBox='0 0 26 24' className={cn('text-yellow size-[1em]', className)} {...props}>
    <path
      d='M12.9994 20.106L6.69774 23.775C6.41936 23.9462 6.12832 24.0195 5.82463 23.9951C5.52093 23.9706 5.2552 23.8728 5.02743 23.7016C4.79967 23.5304 4.62251 23.3166 4.49597 23.0602C4.36944 22.8039 4.34413 22.5163 4.42005 22.1973L6.09036 15.2629L0.510014 10.6033C0.256937 10.3832 0.0990175 10.1322 0.0362545 9.85046C-0.0265086 9.56868 -0.00778099 9.29376 0.0924374 9.02568C0.192656 8.7576 0.344502 8.53746 0.547976 8.36526C0.751449 8.19306 1.02983 8.083 1.38313 8.03505L8.74766 7.41133L11.5948 0.880554C11.7213 0.587036 11.9177 0.366897 12.1839 0.220138C12.4502 0.0733793 12.722 0 12.9994 0C13.2767 0 13.5485 0.0733793 13.8148 0.220138C14.081 0.366897 14.2774 0.587036 14.4039 0.880554L17.251 7.41133L24.6156 8.03505C24.9699 8.08397 25.2483 8.19404 25.4507 8.36526C25.6532 8.53648 25.805 8.75662 25.9063 9.02568C26.0075 9.29474 26.0267 9.57015 25.964 9.85193C25.9012 10.1337 25.7428 10.3842 25.4887 10.6033L19.9083 15.2629L21.5787 22.1973C21.6546 22.5153 21.6293 22.8029 21.5027 23.0602C21.3762 23.3176 21.199 23.5313 20.9713 23.7016C20.7435 23.8718 20.4778 23.9696 20.1741 23.9951C19.8704 24.0205 19.5794 23.9471 19.301 23.775L12.9994 20.106Z'
      fill='currentColor'
    />
  </svg>
)

export const LinkSvg = ({ className = '', ...props }: Svg) => (
  <svg viewBox='0 0 512 512' stroke="currentColor" className={cn('size-[100%]', className)} {...props}>
    <path
      d='M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='36'
    />
  </svg>
)

export const MostikiSvg = ({ className = '', ...props }: Svg) => (
  <svg viewBox='0 0 95 67' className={cn('text-unic h-[0.85em] w-[1.1em]', className)} {...props}>
    <path d='M95 62.7398V66.9999H74.1854V62.7398H95Z' fill='currentColor' />
    <path d='M95 43.0371V51.0247L0 51.0247L3.49937e-07 43.0371L95 43.0371Z' fill='currentColor' />
    <path d='M30.4213 66.9999V62.7398H3.49937e-07V66.9999H30.4213Z' fill='currentColor' />
    <path d='M95 66.9999V62.7398H74.1854H64.5787V66.9999H74.1854H95Z' fill='currentColor' />
    <path
      d='M94.698 62.8784V67H74.0435V14.6652L50.6031 61.1531H44.2626L20.9182 14.6652V67H0.263727V62.8784H9.58227V0H27.2587L47.5289 42.0787L67.7991 0H85.3795V62.8784H94.698Z'
      fill='currentColor'
    />
  </svg>
)

export const MinebridgeSvg = ({ className = '', ...props }: Svg) => (
  <svg xmlSpace='preserve' viewBox='0 0 192 192' className={cn('size-[1em]', className)} {...props}>
    <path
      fill='#33adb4'
      d='M3.66 100.57h74.97c2.02 0 3.66-1.64 3.66-3.66V76.8c0-2.02-1.64-3.66-3.66-3.66H58.51c-2.02 0-3.66-1.64-3.66-3.66V49.37c0-2.02-1.64-3.66-3.66-3.66h-20.1c-2.02 0-3.66-1.64-3.66-3.66V21.94c0-2.02-1.64-3.66-3.66-3.66H3.66C1.64 18.29 0 19.92 0 21.94v74.97c0 2.02 1.64 3.66 3.66 3.66zM188.34 18.29h-20.11c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02-1.64 3.66-3.66 3.66H140.8c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02-1.64 3.66-3.66 3.66h-20.11c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02 1.64 3.66 3.66 3.66h74.97c2.02 0 3.66-1.64 3.66-3.66V21.94c0-2.02-1.64-3.65-3.66-3.65zM23.77 146.29H3.66c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02 1.64 3.66 3.66 3.66h20.11c2.02 0 3.66-1.64 3.66-3.66v-20.11c0-2.03-1.64-3.66-3.66-3.66zM188.34 109.71H3.66c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02 1.64 3.66 3.66 3.66H188.35c2.02 0 3.66-1.64 3.66-3.66v-20.11a3.677 3.677 0 0 0-3.67-3.66zM188.34 146.29h-20.11c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02 1.64 3.66 3.66 3.66h20.11c2.02 0 3.66-1.64 3.66-3.66v-20.11c0-2.03-1.64-3.66-3.66-3.66z'
    />
  </svg>
)

export const TelegramUrl = () => (
  <Link target='_blank' href={TG_URL} title='Телеграм'>
    <TelegramSvg />
  </Link>
)

export const TelegramSvg = ({ className = '', colorful = false, ...props }: ColorSvg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 48 48'
    className={cn(flexSvg, colorSvg, 'size-[38px] -translate-y-[1px] scale-[0.74]', className)}
    {...props}
  >
    <path
      className={cn(colorful ? 'text-tg' : 'text-text group-hover:text-tg')}
      d='M5.83,23.616c12.568-5.529,28.832-12.27,31.077-13.203c5.889-2.442,7.696-1.974,6.795,3.434 c-0.647,3.887-2.514,16.756-4.002,24.766c-0.883,4.75-2.864,5.313-5.979,3.258c-1.498-0.989-9.059-5.989-10.7-7.163 c-1.498-1.07-3.564-2.357-0.973-4.892c0.922-0.903,6.966-6.674,11.675-11.166c0.617-0.59-0.158-1.559-0.87-1.086 c-6.347,4.209-15.147,10.051-16.267,10.812c-1.692,1.149-3.317,1.676-6.234,0.838c-2.204-0.633-4.357-1.388-5.195-1.676 C1.93,26.43,2.696,24.995,5.83,23.616z'
    />
  </svg>
)

export const DiscordUrl = () => (
  <Link target='_blank' href={DS_URL} title='Дискорд'>
    <DiscordSvg />
  </Link>
)

export const DiscordSvg = ({ className = '', colorful = false, ...props }: ColorSvg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 256 256'
    className={cn('size-[38px]', flexSvg, colorSvg, className)}
    {...props}
  >
    <path
      transform='scale(3.55556, 3.55556)'
      className={cn(colorful ? 'text-ds' : 'text-text group-hover:text-ds')}
      d='M54.657,19.077c0,0 8.343,9.663 8.343,27.069v3.65c0,0 -10.536,6.866 -13.747,6.866l-3.115,-4.529c1.936,-0.867 4.577,-2.372 4.577,-2.372l-0.965,-0.747c0,0 -6.173,2.86 -13.749,2.86c-7.576,0 -13.749,-2.86 -13.749,-2.86l-0.965,0.747c0,0 2.641,1.505 4.577,2.372l-3.115,4.529c-3.213,0 -13.749,-6.866 -13.749,-6.866v-3.65c0,-17.406 8.343,-27.069 8.343,-27.069c0,0 5.707,-2.762 10.977,-3.489l1.635,3.1c0,0 2.599,-0.602 6.045,-0.602c3.446,0 6.045,0.602 6.045,0.602l1.635,-3.1c5.27,0.727 10.977,3.489 10.977,3.489zM27.01,43.603c2.656,0 4.808,-2.418 4.808,-5.401c0,-2.983 -2.153,-5.401 -4.808,-5.401c-2.655,0 -4.808,2.418 -4.808,5.401c0,2.983 2.152,5.401 4.808,5.401zM44.99,43.603c2.656,0 4.808,-2.418 4.808,-5.401c0,-2.983 -2.153,-5.401 -4.808,-5.401c-2.656,0 -4.808,2.418 -4.808,5.401c0,2.983 2.152,5.401 4.808,5.401z'
    />
  </svg>
)

export const VkUrl = () => (
  <Link target='_blank' href={VK_URL} title='ВКонтакте'>
    <VKSvg />
  </Link>
)

export const VKSvg = ({ className = '', colorful = false, ...props }: ColorSvg) => (
  <svg
    className={cn(flexSvg, colorSvg, 'size-[38px] -translate-y-[1.5px] scale-[1.2]', className)}
    fill='currentColor'
    viewBox='0 0 38 38'
    {...props}
  >
    <path
      className={cn(colorful ? 'text-vk' : 'text-text group-hover:text-vk')}
      d='m21.4639,28.8396c-9.0192,0 -14.4928,-6.2576 -14.7056,-16.656l4.568,0c0.1424,7.6384 3.6176,10.88 6.2816,11.5408l0,-11.5408l4.3792,0l0,6.5904c2.5696,-0.2848 5.2576,-3.2832 6.1632,-6.5904l4.3056,0c-0.6896,4.0688 -3.616,7.0672 -5.6864,8.304c2.0704,1 5.4016,3.6176 6.6864,8.352l-4.7344,0c-1,-3.1648 -3.4512,-5.616 -6.7344,-5.9488l0,5.9488l-0.5232,0z'
    />
  </svg>
)

export const SupportUrl = () => (
  <Link target='_blank' href={SUPPORT_URL} title='Поддержка'>
    <SupportSvg />
  </Link>
)

export const SupportSvg = ({ className = '', colorful = false, ...props }: ColorSvg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 16 16'
    className={cn(flexSvg, colorSvg, 'size-[38px] translate-y-[1.5px] scale-[0.74]', className)}
    {...props}
  >
    <path
      className={cn(colorful ? 'text-unic' : 'text-text group-hover:text-unic')}
      d='M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5'
    />
  </svg>
)

export const YouTubeSvg = ({ className = '', colorful = false, ...props }: ColorSvg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 16 16'
    className={cn('size-[100%]', flexSvg, colorSvg, className)}
    {...props}
  >
    <path
      d='M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z'
      fill='currentColor'
      className={cn(colorful ? 'text-yt' : 'text-text group-hover:text-yt')}
    />
    <path
      d='M6.593 10.11l3.644-2.098-3.644-2.11v4.208z'
      fill='currentColor'
      className={cn(colorful ? 'text-text' : 'text-background group-hover:text-text')}
    />
  </svg>
)

export const TwitchSvg = ({ className = '', colorful = false, ...props }: ColorSvg) => (
  <svg viewBox='0 0 16 16' className={cn('size-[100%]', flexSvg, colorSvg, className)} {...props}>
    <path
      d='M13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z'
      fill='currentColor'
      className={cn(colorful ? 'text-text' : 'text-background group-hover:text-text')}
    />
    <path
      d='M4.5 1L2 3.5v9h3V15l2.5-2.5h2L14 8V1H4.5zM13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z'
      fill='currentColor'
      className={cn(colorful ? 'text-twitch' : 'text-text group-hover:text-twitch')}
    />
    <path
      d='M11.5 3.75h-1v3h1v-3zM8.75 3.75h-1v3h1v-3z'
      fill='currentColor'
      className={cn(colorful ? 'text-twitch' : 'text-text group-hover:text-twitch')}
    />
  </svg>
)

export const DonationAlertsSvg = ({ className = '', colorful = false, ...props }: ColorSvg) => (
  <svg className={cn('size-[1em]', flexSvg, colorSvg, className)} {...props}>
    <path
      className={cn(
        colorful ? 'text-donation-alerts' : 'text-text group-hover:text-donation-alerts'
      )}
      fill='currentColor'
      transform='scale(0.5)'
      d='M34.859 46.588h-5.42a1.176 1.176 0 0 1-.83-.326.934.934 0 0 1-.284-.77l.479-4.888c.046-.52.531-.92 1.113-.918h5.42c.316-.001.617.118.83.327.212.209.315.49.283.77l-.478 4.888c-.047.52-.532.919-1.113.917Zm.868-9.568h-5.52c-.61 0-1.105-.476-1.105-1.064l1.502-16.51c.067-.537.542-.94 1.104-.936h5.521c.61 0 1.104.476 1.104 1.063l-1.546 16.522c-.07.516-.519.908-1.06.925Zm32.464-19.254c.587.682.874 1.57.796 2.464L66.83 44.76a3.338 3.338 0 0 1-1.008 2.114L48.174 63.908a3.38 3.38 0 0 1-2.35.942H27.038L10.5 80l1.28-15.16H3.37a3.378 3.378 0 0 1-2.484-1.085 3.334 3.334 0 0 1-.873-2.553L5.145 3.006A3.36 3.36 0 0 1 8.503 0H51.33c.986 0 1.922.428 2.562 1.172L68.19 17.766ZM55.11 40.08l1.372-15.14a3.334 3.334 0 0 0-.867-2.445l-8.067-9.259a3.377 3.377 0 0 0-2.541-1.152H19.596a3.36 3.36 0 0 0-3.358 3.006l-3.025 34.068c-.07.932.251 1.852.887 2.54a3.418 3.418 0 0 0 2.47 1.098H41.56a3.38 3.38 0 0 0 2.33-.922l10.214-9.67a3.338 3.338 0 0 0 1.009-2.124Z'
    />
  </svg>
)

export const GoogleSvg = ({ className = '', colorful = false, ...props }: ColorSvg) => (
  <svg viewBox='0 0 48 48' className={cn('size-[1em]', flexSvg, colorSvg, className)} {...props}>
    <path
      fill='currentColor'
      d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
      className={cn(colorful ? 'text-[#EA4335]' : 'text-text group-hover:text-[#EA4335]')}
    />
    <path
      fill='currentColor'
      d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
      className={cn(colorful ? 'text-[#4285F4]' : 'text-text group-hover:text-[#4285F4]')}
    />
    <path
      fill='currentColor'
      d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
      className={cn(colorful ? 'text-[#FBBC05]' : 'text-text group-hover:text-[#FBBC05]')}
    />
    <path
      fill='currentColor'
      d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
      className={cn(colorful ? 'text-[#34A853]' : 'text-text group-hover:text-[#34A853]')}
    />
    <path fill='none' d='M0 0h48v48H0z' />
  </svg>
)

export const BatSvg = ({ className = '', ...props }: Svg) => (
  <svg
    viewBox='0 0 1280 585'
    fill='currentColor'
    className={cn(`text-red size-[1em]`, className)}
    {...props}
  >
    <path d='M978.5 12.2c-.2.7-2.2 6.8-4.5 13.5-31.3 94.8-94 164.9-182.2 203.7-20.9 9.2-59.8 21.1-61.8 18.9-.4-.4-4.7-20.9-9.6-45.6-4.9-24.6-9.2-44.6-9.6-44.5-.4.2-9.3 8.5-19.7 18.6l-19 18.2-4.8-3c-8.6-5.5-16.7-7.3-30.1-6.7-7.5.3-13.5 1.1-16.6 2.2l-4.9 1.8-17.7-18.4-17.7-18.4-2.6 8.5c-1.4 4.7-8.3 27.6-15.2 51-6.9 23.4-13.1 44-13.6 45.8-1.3 4-1.1 4-21.4-2.5-83.4-27-146.6-78.1-189.4-153.3-11.9-21-27.8-59.9-30.6-75.3-.4-2-1.1-3.7-1.5-3.7-.4 0-2.5 2.1-4.6 4.7-5.9 7.3-19.9 21.9-29.4 30.7-46.3 43.1-105 71.2-170 81.5-15.1 2.4-34.5 4.1-48.3 4.2H43.5l11 2.3c69.4 14.5 114.1 50.1 127 101 1.3 5 2.6 12.6 3 16.9.6 6.3 1 7.7 2.2 7.3 3.7-1.5 18.3-4.8 29-6.7 14.9-2.6 42.7-3.6 54.4-2 41.4 5.9 70.7 27.1 89 64.6 6.7 13.7 11 26.3 13.9 40.3 2.2 11.2 4 24.8 4 30.8v4.2l9.2-5.5c10.6-6.4 19-10.1 31.4-14 8.3-2.5 10.2-2.7 26.4-2.7 16.1 0 18.2.2 26.5 2.7 11.9 3.6 28.8 12 40 19.9 11.1 7.8 34.4 30.8 45.4 44.6 9.7 12.3 24.5 34.4 33.6 50.2 7.7 13.3 23.7 45.7 28.6 57.9l3.4 8.4 1.3-4.9c12.6-47.3 37.4-81.5 79.2-109.3 39.2-26.2 93-44.3 149.9-50.6 8-.8 14.5-1.7 14.6-1.8.1-.1 1.2-5.6 2.4-12.2 13.8-72.4 48.8-121 99.1-137.4 26.7-8.8 59.6-9.2 88.6-1.1 6.4 1.7 6.4 1.7 6.8-.4 3-15.4 9.2-30.1 17.8-42.3 16-22.7 43.4-47.1 79.3-70.5 20-13.1 35.7-22 63.5-36.1 14-7.1 24.7-12.7 23.8-12.3-1 .3-7.1 1.3-13.5 2.3-18.3 2.7-59.9 2.4-79.3-.6-38.3-5.8-70.3-15.9-105.7-33.1-25.2-12.2-47.4-25.5-64.6-38.7-3.9-3-5.9-4-6.2-3.1z' />
  </svg>
)

export const SuccessSvg = ({ className = '', ...props }: Svg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 16 16'
    className={cn('text-green inline-block size-[1.5em]', className)}
    {...props}
  >
    <path d='M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0' />
    <path d='M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293l-2.646-2.647a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z' />
  </svg>
)

export const ErrorSvg = ({ className = '', ...props }: Svg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 16 16'
    className={cn('text-red inline-block size-[1.2em]', className)}
    {...props}
  >
    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
    <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
  </svg>
)

export const EmailSvg = ({ className = '', ...props }: Svg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 16 16'
    className={cn(`text-unic size-[1em]`, className)}
    {...props}
  >
    <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z' />
  </svg>
)

export const SearchSvg = ({ className = '', ...props }: Svg) => (
  <svg fill='currentColor' viewBox='0 0 16 16' className={cn(`size-[1em]`, className)} {...props}>
    <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />
  </svg>
)

export const AnotherSiteSvg = ({ className = '', ...props }: Svg) => (
  <svg fill='currentColor' viewBox='0 0 16 16' className={cn(`size-[1em]`, className)} {...props}>
    <path d='M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5' />
    <path d='M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z' />
  </svg>
)

export const ReloadSvg = ({ className = '', ...props }: Svg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 16 16'
    className={cn(`text-unic size-[1em]`, className)}
    {...props}
  >
    <path fillRule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z' />
    <path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466' />
  </svg>
)

export const LoadingSvg = ({ className = '', ...props }: Svg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 24 24'
    className={cn('text-unic mx-auto size-[1em]', className)}
    {...props}
  >
    <rect className='animate-moveBlock1' width='10' height='10' rx='1' />
    <rect className='animate-moveBlock2' width='10' height='10' rx='1' />
  </svg>
)

export const HorizontalLoadingSvg = ({ className = '', ...props }: Svg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 60 18'
    className={cn('text-unic mx-auto h-[18px] w-[60px]', className)}
    {...props}
  >
    <rect className='block-1 block' x='0' y='4' width='12' height='10' rx='2'>
      <animate
        attributeName='opacity'
        values='.4;.8;.4'
        keyTimes='0;0.5;1'
        dur='1s'
        repeatCount='indefinite'
        begin='0s'
      />
    </rect>
    <rect className='block-2 block' x='16' y='4' width='12' height='10' rx='2'>
      <animate
        attributeName='opacity'
        values='.4;.8;.4'
        keyTimes='0;0.5;1'
        dur='1s'
        repeatCount='indefinite'
        begin='0.2s'
      />
    </rect>
    <rect className='block-3 block' x='32' y='4' width='12' height='10' rx='2'>
      <animate
        attributeName='opacity'
        values='.4;.8;.4'
        keyTimes='0;0.5;1'
        dur='1s'
        repeatCount='indefinite'
        begin='0.4s'
      />
    </rect>
    <rect className='block-4 block' x='48' y='4' width='12' height='10' rx='2'>
      <animate
        attributeName='opacity'
        values='.4;.8;.4'
        keyTimes='0;0.5;1'
        dur='1s'
        repeatCount='indefinite'
        begin='0.6s'
      />
    </rect>
  </svg>
)

export const UpSvg = ({ className = '', ...props }: Svg) => (
  <svg fill='currentColor' viewBox='0 0 16 16' className={cn(`size-[1em]`, className)} {...props}>
    <path d='M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5' />
  </svg>
)

export const ShareSvg = ({ className = '', ...props }: Svg) => (
  <svg fill='currentColor' viewBox='0 0 16 16' className={cn(`size-[1em]`, className)} {...props}>
    <path d='M9.78 2.05a.5.5 0 0 1 .527.055l4.5 3.5a.5.5 0 0 1 .025.769l-4.5 4A.5.5 0 0 1 9.5 10V8.056c-.236.04-.544.11-.904.23c-.873.292-2.054.879-3.242 2.068a.5.5 0 0 1-.852-.4c.143-1.571.601-2.717 1.224-3.543a4.7 4.7 0 0 1 2.095-1.574A5.4 5.4 0 0 1 9.5 4.493V2.5a.5.5 0 0 1 .28-.45M2 5.5A2.5 2.5 0 0 1 4.5 3h2a.5.5 0 0 1 0 1h-2A1.5 1.5 0 0 0 3 5.5v6A1.5 1.5 0 0 0 4.5 13h6a1.5 1.5 0 0 0 1.5-1.5v-1a.5.5 0 0 1 1 0v1a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 2 11.5z' />
  </svg>
)

export const AuthSvg = ({ className = '', ...props }: Svg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 16 16'
    className={cn(`text-unic size-[1em]`, className)}
    {...props}
  >
    <path d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z' />
    <path d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z' />
  </svg>
)

export const AnalyticsSvg = ({ className = '', ...props }: Svg) => (
  <svg
    fill='currentColor'
    viewBox='0 0 36 36'
    className={cn(`text-unic size-[1em]`, className)}
    {...props}
  >
    <path
      fill='currentColor'
      d='M32 5H4a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M4 29V7h28v22Z'
      className='clr-i-outline clr-i-outline-path-1'
    />
    <path
      fill='currentColor'
      d='m15.62 15.222l-6.018 8.746l-4.052-3.584l1.06-1.198l2.698 2.386l6.326-9.192l6.75 10.015l6.754-8.925l1.276.966l-8.106 10.709z'
      className='clr-i-outline clr-i-outline-path-2'
    />
    <path fill='none' d='M0 0h36v36H0z' />
  </svg>
)

export const EditSvg = ({ className = '', ...props }: Svg) => (
  <svg fill='currentColor' viewBox='0 0 24 24' className={cn(`size-[1em]`, className)} {...props}>
    <path d='M13.896 3.03a2 2 0 0 1 2.701-.117l.127.117l4.243 4.243a2 2 0 0 1 .117 2.7l-.117.128l-10.314 10.314a2 2 0 0 1-1.238.578L9.239 21H4.006a1.01 1.01 0 0 1-1.004-.9l-.006-.11v-5.233a2 2 0 0 1 .467-1.284l.12-.13L13.895 3.03ZM12.17 7.584l-7.174 7.174V19H9.24l7.174-7.174l-4.243-4.243Zm3.14-3.14L13.584 6.17l4.243 4.243l1.726-1.726z' />
  </svg>
)

export const DeleteSvg = ({ className = '', ...props }: Svg) => (
  <svg fill='currentColor' viewBox='0 0 24 24' className={cn(`size-[1em]`, className)} {...props}>
    <path d='M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z' />
  </svg>
)

export const AutoSvg = ({ type, ...props }: { type: string } & ColorSvg) => {
  switch (type) {
    case 'discord':
      return <DiscordSvg {...props} />
    case 'telegram':
      return <TelegramSvg {...props} />
    case 't':
      return <TelegramSvg {...props} />
    case 'vk':
      return <VKSvg {...props} />
    case 'twitch':
      return <TwitchSvg {...props} />
    case 'legal':
      return <TwitchSvg {...props} />
    case 'youtube':
      return <YouTubeSvg {...props} />
    case 'donationAlerts':
      return <DonationAlertsSvg {...props} />
    case 'google':
      return <GoogleSvg {...props} />
    case 'email':
      return <EmailSvg {...props} />
  }
}
