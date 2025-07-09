import { Template } from '@email/template'
import { User } from 'lucia'

export const RatingEmail = async ({
  name,
  rating,
  oldRating,
}: {
  name: User['name']
  rating: User['rating']
  oldRating: User['rating']
}) => (
  <Template name={name}>
    <p>
      Твои звёзды были пересмотрены! Теперь у тебя <strong>{rating} звёзд</strong> (было{' '}
      <strong>{oldRating} звёзд</strong>)
    </p>
    <p>
      Как поднять звёзды? Можете прочитать в{' '}
      <strong>
        <a href='https://m-br.ru/rules'>правилах сервера</a>
      </strong>
    </p>
  </Template>
)
