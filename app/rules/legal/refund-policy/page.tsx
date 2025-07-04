import { H1 } from '@components/h1'
import type { Metadata } from 'next'
import { LASTREFUNDPOLICYUPDATE } from '@/const'
import { LastUpdate } from '@components/lastUpdate'
import { List, Rule, RulesBox } from '@components/rules'
import { OnThisPage, OnThisPageLink } from '@components/sideNav'
import { Number } from '@components/number'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Политика возврата средств',
  description: 'Политика отказа от услуг и возврата средств.',
}

export default function RefundPolicy() {
  return (
    <>
      <div className='refund_content'>
        <H1
          up
          paths={[
            { name: 'rules', displayname: 'Правила' },
            { name: 'legal', displayname: 'Legal' },
            { name: 'refund-policy', displayname: 'Политика возврата средств' },
          ]}
        >
          Возврат
        </H1>
        <LastUpdate time={LASTREFUNDPOLICYUPDATE} />
        <br />
        <p>Политика отказа от услуг и возврата средств компании «MineBridge (Майнбридж)»</p>
        <RulesBox name='terms' heading='Термины' number={0}>
          <p>
            Термины используются в том же значении, что и в{' '}
            <Link href='/rules/legal/terms-of-use' className='text-unic font-medium'>
              пользовательском соглашении
            </Link>
            .
          </p>
        </RulesBox>
        <RulesBox name='properly' heading='Надлежащее качество' number={1}>
          <Rule number={1.1}>
            Отказ от услуги, которая удовлетворяет качеству, соответствует заявленным
            характеристикам, но от нее пользователь может отказаться по субъективным причинам.
          </Rule>
          <Rule number={1.2}>
            <h3>Баланс</h3>
            <p>
              Пользователь может запросить возврат в течение 24 часов после пополнения, если баланс
              не менялся после пополнения.
            </p>
          </Rule>
          <Rule number={1.3}>
            <h3>Услуги декорации</h3>
            <small>Питомцы, частицы и другие украшения, отображаемые на игровом сервере</small>
            <p>Возврат не осуществляется.</p>
          </Rule>
          <Rule number={1.4}>
            <h3>Другие услуги</h3>
            <p>Возврат за другие услуги рассматривается в индивидуальном порядке.</p>
          </Rule>
        </RulesBox>
        <RulesBox name='improperly' heading='Ненадлежащее качество' number={2}>
          <p>
            Отказ от услуги, не оказанной в течение 48 часов или отказ от услуги, не способной
            обеспечить в полной мере свои функциональные качества из-за существенного недостатка{' '}
            <small>
              (например: полная недоступность серверов длительное время по причинам, зависящих от
              администрации и компании)
            </small>
          </p>
          <br />
          <p>
            В данном случае мы возвращаем полную стоимость услуги или соразмерно уменьшаем
            установленную стоимость, если пользователь будет согласен, а способ оплаты позволяет
            осуществлять частичный возврат.
          </p>
        </RulesBox>
        <RulesBox name='refund' heading='Возврат средств' number={3}>
          <p>
            Для запроса денежных средств, Пользователь может обратиться по электронной почте{' '}
            <Link
              href={`mailto:refund@${process.env.NEXT_PUBLIC_EN_DOMAIN}`}
              className='text-unic font-medium'
            >
              refund@{process.env.NEXT_PUBLIC_EN_DOMAIN}
            </Link>
            .
          </p>
          <br />
          <p>При отправке запроса на возврат, обязательно укажите:</p>
          <List>
            <li>Данные для идентификации аккаунта (никнейм Minecraft, указанный в профиле)</li>
            <li>Услуга, за которую необходимо осуществить возврат</li>
            <li>Причина возврата</li>
          </List>
        </RulesBox>
        <RulesBox name='methods' heading='Способы возврата' number={4}>
          <p>
            Возврат осуществляется только на тот способ оплаты, с которого производилась оплата.
            Срок возврата зависит от способа оплаты.
          </p>
        </RulesBox>
        <RulesBox name='violation' heading='Нарушение политик' number={5}>
          <p>Возврат не осуществляется пользователям, нарушивших любую из политик сервисов.</p>
        </RulesBox>
      </div>
      <OnThisPage>
        <OnThisPageLink href='#terms'>
          <Number>0</Number>
          Термины
        </OnThisPageLink>
        <OnThisPageLink href='#properly'>
          <Number>1</Number>
          Надлежащее
        </OnThisPageLink>
        <OnThisPageLink href='#improperly'>
          <Number>2</Number>
          Ненадлежащее
        </OnThisPageLink>
        <OnThisPageLink href='#refund'>
          <Number>3</Number>
          Возврат
        </OnThisPageLink>
        <OnThisPageLink href='#methods'>
          <Number>4</Number>
          Способы
        </OnThisPageLink>
        <OnThisPageLink href='#violation'>
          <Number>5</Number>
          Нарушение
        </OnThisPageLink>
      </OnThisPage>
    </>
  )
}
