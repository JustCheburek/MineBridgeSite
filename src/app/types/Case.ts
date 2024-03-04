export interface RarityTranslateProps {
	common: string
	uncommon: string
	rare: string
	epic: string
	mythic: string
	legendary: string
}

export interface TypeTranslateProps {
	all: string
	particleeffects: string
	deatheffects: string
	suffix: string
	pets: string
}

type Rarities = keyof RarityTranslateProps
type Types = keyof TypeTranslateProps 

interface ChanceProps<Name> {
	name: Name
	chance: number
}

interface NameProps {
	name: string
	displayname: string
}

export interface CaseTypeProps extends NameProps {
	rarity: ChanceProps<Rarities>[]
	drop: ChanceProps<Types>[]
	price: number
}

export interface DropProps extends NameProps {
	noImg?: boolean
}

export interface DropTypeProps extends NameProps {
	description: string
	price: number
	defaultRarity?: Rarities
	common?: DropProps[]
	uncommon?: DropProps[]
	rare?: DropProps[]
	epic?: DropProps[]
	mythic?: DropProps[]
	legendary?: DropProps[]
	drop?: DropProps[]
}