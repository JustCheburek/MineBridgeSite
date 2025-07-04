import { Types } from 'mongoose'
import type { User } from 'lucia'

export type idOrName = {
  _id?: string | Types.ObjectId
  name?: string
}

export type idOrNameUser = {
  name?: User['name']
  _id?: User['_id']
}
