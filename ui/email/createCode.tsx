import { Template } from '@email/template'
import { Code } from '@/types/code'
import { User } from 'lucia'

export const CreateCodeEmail = async ({
  name,
  mostiki,
  allMostiki,
  code,
}: {
  name: User['name']
  mostiki: User['mostiki']
  allMostiki: User['mostiki']
  code: Code['_id']
}) => (
  <Template name={name}>
    <p>
      Промокод успешно создан! Ты положил на него <strong>{mostiki} мостиков</strong>.
    </p>
    <p>
      Теперь у тебя <strong>{allMostiki} мостиков</strong>
    </p>
    <h3>{code}</h3>
  </Template>
)
