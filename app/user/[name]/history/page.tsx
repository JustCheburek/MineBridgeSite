import dynamic from 'next/dynamic'
import { getCaseLocal, getCases, getDropLocal, getDrops, getItem, getItems } from '@services/shop'
import { getUser } from '@services/user'
import { validate } from '@services/user/validate'
import { MultiCaseData } from '@/types/purchase'
import { revalidateTag } from 'next/cache'
import { H1 } from '@components/h1'
import { NameParams } from '@/types/params'
import { Suspense } from 'react'
import { Skeleton } from '@components/skeleton'

const InviteSection = dynamic(() => import('./components/inviteSection'))
const PunishmentSection = dynamic(() => import('./components/punishmentSection'))
const CasesPurchasesSection = dynamic(() => import('./components/casesPurchasesSection'))

export const generateMetadata = async ({ params }: NameParams) => {
  const { name } = await params

  return {
    title: `${name} > Истории действий`,
    description: `История звёзд и всяких покупок ${name}!`,
  }
}

export default async function History({ params }: NameParams) {
  const { name } = await params
  const { user: author, isHelper, isAdmin } = await validate()
  const { user, isMe } = await getUser({
    name,
    authorId: author?._id,
    show: isHelper,
  })
  const [Cases, Drops] = await Promise.all([getCases(), getDrops()])

  const caseDatas = [] as MultiCaseData[]

  if (user.casesPurchases) {
    for (const purchase of user.casesPurchases) {
      try {
        const Case = await getCaseLocal({ _id: purchase.Case }, Cases)
        const Drop = await getDropLocal({ _id: purchase.Drop }, Drops)
        const DropItem = await getDropLocal({ _id: purchase.DropItem }, Drops)

        const Items = await getItems(purchase.rarity, DropItem)
        const Item = await getItem({ _id: purchase.Item }, Items)

        const multiCaseData = caseDatas.find(
          ({ Item: caseDataItem }) => String(caseDataItem?._id) === String(Item?._id)
        )

        if (multiCaseData && multiCaseData.DropItem?.name !== 'suffix') {
          const caseIn = multiCaseData.MultiCase.find(
            ({ Case: caseDataCase }) => caseDataCase?.name === Case?.name
          )
          if (!caseIn) {
            multiCaseData.MultiCase.push({ Case, amount: 1 })
          } else {
            caseIn.amount++
          }
        } else {
          caseDatas.push({
            ...purchase,
            MultiCase: [{ Case, amount: 1 }],
            Drop: Drop,
            DropItem,
            Item,
          })
        }

        caseDatas[caseDatas.length - 1].MultiCase.sort(
          ({ Case: Case1 }, { Case: Case2 }) => (Case1?.price || 0) - (Case2?.price || 0)
        )
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <div className='grid gap-10'>
      <H1
        reload={async () => {
          'use server'
          revalidateTag('all')
        }}
      >
        История
      </H1>

      <Suspense fallback={<Skeleton className='h-[400px] w-[100%]' />}>
        <InviteSection user={user} isMe={isMe} isHelper={isHelper} />
      </Suspense>

      <Suspense fallback={<Skeleton className='h-[400px] w-[100%]' />}>
        <PunishmentSection user={user} name={author?.name} access={isHelper} />
      </Suspense>

      <Suspense fallback={<Skeleton className='h-[400px] w-[100%]' />}>
        <CasesPurchasesSection
          access={isAdmin}
          Cases={Cases}
          user={user}
          Drops={Drops}
          isMe={isMe}
          caseDatas={caseDatas}
        />
      </Suspense>
    </div>
  )
}
