import { User } from 'lucia'

export interface PaymentPost {
  payment_id: number
  shop_id: number
  customer: string
  email: string | null
  ip: string
  server: ServerInfo
  cost: number
  income: number
  payment_type: string
  created_at: string
  updated_at: string
  products: Product[]
  signature: string
}

export interface Payment {
  id: number
  customer: string
  email: string | null
  shop_id: number
  server_id: number
  status: number
  enrolled: number
  payment_type: string
  send_commands: string[]
  created_at: string
  updated_at: string
  ip: string
  cost: number
  products: Product[]
  server: ServerInfo
}

export interface PaymentWithUser extends Payment {
  user: User
}

export interface ServerInfo {
  id: number
  name: string
  ip: string
  port: string
}

export interface Product {
  id: number
  name: string
  description: string
  count: number
  cost: number
  commands: string[]
  image: string
}
