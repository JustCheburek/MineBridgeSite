import { Punishment } from '@/types/punishment'
import { Template } from '@email/template'
import { User } from 'lucia'

export const NewRatingEmail = async ({
  name,
  rating,
  punishment,
}: {
  name: User['name']
  rating: User['rating']
  punishment: Punishment
}) => (
  <Template name={name}>
    <p>
      Твои звёзды были изменены! {punishment.author} {punishment.rating > 0 ? 'добавил' : 'забрал'}{' '}
      <strong>{Math.abs(punishment.rating)} звёзд</strong> по причине "{punishment.reason}"
    </p>
    <p>
      Теперь у тебя <strong>{rating} звёзд</strong>
    </p>
    <p>
      Как поднять звёзды? Можете прочитать в{' '}
      <strong>
        <a href='https://m-br.ru/rules'>правилах сервера</a>
      </strong>
    </p>
  </Template>
)
