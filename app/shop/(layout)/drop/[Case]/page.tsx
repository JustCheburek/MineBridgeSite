import { Box, Price, Section, Text } from '@components/shop'
import { Url } from '@components/button'
import { getCase, getDrops } from '@services/shop'
import { Case } from '@/types/case'
import type { Metadata } from 'next'
import { H1 } from '@components/h1'
import { revalidateTag } from 'next/cache'

type ParamsProp = {
  params: Promise<{
    Case: Case['name']
  }>
}

export const generateMetadata = async ({ params }: ParamsProp): Promise<Metadata> => {
  const { Case: CaseName } = await params
  const Case = await getCase({ name: CaseName })

  return {
    title: `${Case.displayname} кейс`,
    description: `Выберите дроп! ${Case.displayname} кейс.`,
  }
}

export default async function Drops({ params }: ParamsProp) {
  const { Case: CaseName } = await params
  const [Case, Drops] = await Promise.all([getCase({ name: CaseName }), getDrops()])

  return (
    <div>
      <H1
        reload={async () => {
          'use server'
          revalidateTag('all')
        }}
        paths={[
          { displayname: 'Магазин', name: 'shop', hide: true },
          { displayname: 'Дроп', name: 'drop', hide: true },
          { displayname: `${Case.displayname} кейс`, name: Case.name },
        ]}
      >
        Дроп кейса
      </H1>
      <Section>
        {Drops.map((Drop, index) => (
          <Box key={Drop.name} casebox={index === 2}>
            <Text>
              <h3>{Drop.displayname}</h3>
              <Price>{Drop.price}</Price>
              <Url href={`/shop/drop/${CaseName}/${Drop.name}`} className='my-[10px]'>
                Выбрать
              </Url>
            </Text>
          </Box>
        ))}
      </Section>
    </div>
  )
}
