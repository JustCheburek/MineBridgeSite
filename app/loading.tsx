import { MaxSize } from '@components/maxSize'
import { LoadingSvg } from '@ui/SVGS'

export default function Loading() {
  return (
    <MaxSize className='grid place-items-center'>
      <LoadingSvg className='size-[40vh]' />
    </MaxSize>
  )
}
