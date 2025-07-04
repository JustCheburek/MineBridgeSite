import { Template } from '@email/template'
import { User } from 'lucia'
import { Code } from '@/types/code'

export const UseCodeEmail = async ({
  name,
  mostiki,
  allMostiki,
  code,
  authorName,
}: {
  name: User['name']
  mostiki: User['mostiki']
  allMostiki: User['mostiki']
  code: Code['_id']
  authorName: User['name']
}) => (
  <Template name={name}>
    <p>
      Промокод от {authorName} успешно использован! Ты получил <strong>{mostiki} мостиков</strong>.
    </p>
    <p>
      Теперь у тебя <strong>{allMostiki} мостиков</strong>
    </p>
    <h3>{code}</h3>
  </Template>
)
