export interface TradeMC {
	shop_id: number
	buyer: string
	items: Item[]
	hash: string
}

export interface Item {
	id: string
	cost: string
	result: boolean
	partners: Partner[]
	surcharge: boolean
	coupon: string
	game_currency: string
}

export interface Partner {
	id: string
	sum: string
}