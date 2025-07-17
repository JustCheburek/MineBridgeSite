import { Button } from '@components/button'
import type { User } from 'lucia'
import { Img } from '@components/img'
import { ImgBox } from '@components/img'
import { Box } from '@components/shop'
import { Text } from '@components/shop'
import { Price } from '@components/shop'

export function PreSeason({ author }: { author: User | null }) {
  return (
    <ImgBox type='post' className='rounded-base'>
      <Img
        src='/shop/preseason.jpg'
        alt='Проходка на межсезонье'
        className='max-md:brightness-40'
      />
      <Box className='absolute bottom-0 right-0 z-20 max-md:static max-md:min-w-[50%]'>
        <Text className='bg-background/80 rounded-tl-base rounded-none max-md:border-0 max-md:bg-transparent md:backdrop-blur-md'>
          <h3 className='text-center'>Межсезонье</h3>
          <Price>100</Price>
          <BuyButton author={author} />
        </Text>
      </Box>
    </ImgBox>
  )
}

function BuyButton({ author }: { author: User | null }) {
  if (!author) {
    return <Button className='my-2.5'>Войти</Button>
  }

  return (
    <Button className='my-2.5' disabled>
      Распроданы
    </Button>
  )
}
