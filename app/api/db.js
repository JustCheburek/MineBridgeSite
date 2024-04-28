// Редкости в обычном сундуке
export const RarityTranslate = {
	common: "Обычный",
	uncommon: "Необычный",
	rare: "Редкий",
	epic: "Эпический",
	mythic: "Мифический",
	legendary: "Легендарный"
}

export const TypeTranslate = {
	all: "Весь дроп",
	particleeffects: "Частицы",
	deatheffects: "Эффекты Cмерти",
	suffix: "Суффикс",
	pets: "Питомец"
}

export const RarityCase = [
	{
		name: "common",
		displayname: RarityTranslate.common,
		price: 10,
		rarity: [{
			name: "common", chance: 10
		}, {
			name: "uncommon", chance: 7
		}, {
			name: "rare", chance: 5
		}, {
			name: "epic", chance: 3
		}, {
			name: "mythic", chance: 2
		}, {
			name: "legendary", chance: 1
		}],
		drop: [{
			name: "particleeffects", chance: 6
		}, {
			name: "suffix", chance: 1
		}, {
			name: "deatheffects", chance: 1
		}, {
			name: "pets", chance: 1
		}]
	}, {
		name: "rare",
		price: 20,
		displayname: RarityTranslate.rare,
		rarity: [{
			name: "common", chance: 6
		}, {
			name: "uncommon", chance: 6
		}, {
			name: "rare", chance: 7
		}, {
			name: "epic", chance: 4
		}, {
			name: "mythic", chance: 3
		}, {
			name: "legendary", chance: 2
		}],
		drop: [{
			name: "particleeffects", chance: 5
		}, {
			name: "suffix", chance: 2
		}, {
			name: "deatheffects", chance: 2
		}, {
			name: "pets", chance: 2
		}]
	}, {
		name: "legendary",
		price: 30,
		displayname: RarityTranslate.legendary,
		rarity: [{
			name: "common", chance: 5
		}, {
			name: "uncommon", chance: 5
		}, {
			name: "rare", chance: 5
		}, {
			name: "epic", chance: 6
		}, {
			name: "mythic", chance: 5
		}, {
			name: "legendary", chance: 3
		}],
		drop: [{
			name: "particleeffects", chance: 5
		}, {
			name: "suffix", chance: 4
		}, {
			name: "deatheffects", chance: 4
		}, {
			name: "pets", chance: 3
		}]
	}
]

// Кейсы
export const Case = [
		 /*{
            name: "projectileeffects",
            displayname: "эффект стрельбы",

            // Редкости
            common: null,
            uncommon: null,
            rare: null,
            epic: null,
            mythic: null,
            legendary: null
        },*/
	{
		name: "pets", displayname: TypeTranslate.pets,
		description: "Дружелюбный питомец",
		price: 100,

		// Редкости
		common: [{
			name: "piggy", displayname: "Свинка"
		}, {
			name: "cow", displayname: "Корова"
		}, {
			name: "chick", displayname: "Курица"
		}, {
			name: "snowman", displayname: "Снеговик"
		}, {
			name: "sheep", displayname: "Овца"
		}, {
			name: "cod", displayname: "Треска"
		}, {
			name: "pufferfish", displayname: "Фугу"
		}, {
			name: "salmon", displayname: "Лосось"
		}, {
			name: "tropicalfish", displayname: "Рыбка"
		}, {
			name: "donkey", displayname: "Осёл"
		}], uncommon: [{
			name: "easterbunny", displayname: "Кролик"
		}, {
			name: "dog", displayname: "Собака"
		}, {
			name: "villager", displayname: "Житель"
		}, {
			name: "skeleton", displayname: "Скелет"
		}, {
			name: "zombie", displayname: "Зомби"
		}, {
			name: "cavespider", displayname: "Пещерный Паук"
		}, {
			name: "spider", displayname: "Паук"
		}, {
			name: "magmacube", displayname: "Магма Куб"
		}, {
			name: "tadpole", displayname: "Лягушачья Икра"
		}, {
			name: "piglin", displayname: "Пиглин"
		}, {
			name: "zoglin", displayname: "Зоглин"
		}, {
			name: "zombifiedpiglin", displayname: "Зомби Пиглин"
		}, {
			name: "turtle", displayname: "Черепашка"
		}, {
			name: "drowned", displayname: "Утопленник"
		}, {
			name: "vindicator", displayname: "Поборник"
		}, {
			name: "zombievillager", displayname: "Зомби Житель"
		}], rare: [{
			name: "mooshroom", displayname: "Грибная Корова"
		}, {
			name: "enderman", displayname: "Эндермен"
		}, {
			name: "goat", displayname: "Козёл"
		}, {
			name: "pillager", displayname: "Разбойник"
		}, {
			name: "ravager", displayname: "Громадина"
		}, {
			name: "llama", displayname: "Лама"
		}, {
			name: "husk", displayname: "Кадавр"
		}], epic: [{
			name: "irongolem", displayname: "Железный Голем"
		}, {
			name: "bat", displayname: "Летучая Мышка"
		}, {
			name: "slime", displayname: "Слайм"
		}, {
			name: "silverfish", displayname: "Чешуйница"
		}, {
			name: "creeper", displayname: "Крипер"
		}, {
			name: "hoglin", displayname: "Хоглин"
		}, {
			name: "dolphin", displayname: "Дельфин"
		}, {
			name: "evoker", displayname: "Призыватель"
		}, {
			name: "witherskeleton", displayname: "Визер Скелет"
		}, {
			name: "polarbear", displayname: "Снежный Мишка"
		}], mythic: [{
			name: "witch", displayname: "Ведьма"
		}, {
			name: "axolotl", displayname: "Аксолотль"
		}, {
			name: "strider", displayname: "Лавомерка"
		}, {
			name: "piglinbrute", displayname: "Брутальный Пиглин"
		}, {
			name: "panda", displayname: "Панда"
		}, {
			name: "vex", displayname: "Векс"
		}, {
			name: "mule", displayname: "Мул"
		}, {
			name: "skeletonhorse", displayname: "Лошадь Скелет"
		}, {
			name: "zombiehorse", displayname: "Лошадь Зомби"
		}, {
			name: "stray", displayname: "Зимогор"
		}], legendary: [{
			name: "wither", displayname: "Визер"
		}, {
			name: "blaze", displayname: "Блейз"
		}, {
			name: "endermite", displayname: "Эндермит"
		}, {
			name: "guardian", displayname: "Гвардиан"
		}, {
			name: "sniffer", displayname: "Нюхач"
		}, {
			name: "warden", displayname: "Варден"
		}, {
			name: "allay", displayname: "Эллей"
		}, {
			name: "bee", displayname: "Пчёлка"
		}, {
			name: "fox", displayname: "Лисичка"
		}, {
			name: "kitty", displayname: "Котик"
		}, {
			name: "frog", displayname: "Лягушка"
		}, {
			name: "ocelot", displayname: "Оцелот"
		}, {
			name: "parrot", displayname: "Попугай"
		}, {
			name: "illusioner", displayname: "Иллюзионист"
		}, {
			name: "horse", displayname: "Лошадь"
		}, {
			name: "elderguardian", displayname: "Большой Гвардиан"
		}, {
			name: "shulker", displayname: "Шалкер"
		}, {
			name: "pumpling", displayname: "Тыковка"
		}]
	},
	{
		name: "deatheffects", displayname: TypeTranslate.deatheffects, defaultRarity: "mythic",
		description: "Эффекты смерти",
		price: 70,

		// Дроп
		drop: [{
			name: "explosion", displayname: "Взрыв"
		}, {
			name: "firework", displayname: "Фейерверк"
		}, {
			name: "lightning", displayname: "Молния"
		}]
	},
	{
		name: "suffix", displayname: TypeTranslate.suffix, defaultRarity: "epic",
		description: "Собственный суффикс",
		price: 30,

		// Дроп
		drop: [{
			name: "suffix", displayname: TypeTranslate.suffix, noImg: true
		}]
	}, ]