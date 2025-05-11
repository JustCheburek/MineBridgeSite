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
    custom_fields: CustomField[]
    image: string
}

export interface CustomField {
    name: string
    type: string
    description: string
    value: string
}

