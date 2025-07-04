import { HeaderClient } from '@components/headerClient'
import { validate } from '@services/user/validate'

export async function Header() {
  const { user } = await validate()

  return <HeaderClient user={user} />
}
