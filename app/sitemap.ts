import {MetadataRoute} from 'next'
import {LASTRULESUPDATE} from "@/const";
import {getUsers} from "@/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const users = await getUsers()

	return [
		// Главная
		{
			url: process.env.NEXT_PUBLIC_URL!,
			changeFrequency: 'monthly',
			priority: 1,
		},
		// Магазин
		{
			url: `${process.env.NEXT_PUBLIC_URL}/shop`,
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/shop/case`,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/shop/buy`,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		// Правила
		{
			url: `${process.env.NEXT_PUBLIC_URL}/rules`,
			changeFrequency: 'monthly',
			priority: 0.9,
			lastModified: LASTRULESUPDATE,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/rules/mods`,
			changeFrequency: 'monthly',
			priority: 0.8,
			lastModified: LASTRULESUPDATE,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/rules/blacklist`,
			changeFrequency: 'yearly',
			priority: 0.8,
			lastModified: LASTRULESUPDATE,
		},
		// Новости
		{
			url: `${process.env.NEXT_PUBLIC_URL}/news`,
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/news/events`,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		// Фичи
		{
			url: `${process.env.NEXT_PUBLIC_URL}/features`,
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/features/lor`,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/features/stickers`,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/features/design`,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		// Гайды
		{
			url: `${process.env.NEXT_PUBLIC_URL}/features/guides`,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/features/guides/crafts`,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/features/guides/brewery`,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/features/guides/litematica`,
			changeFrequency: 'monthly',
			priority: 0.8,
		},

		// Профиль
		{
			url: `${process.env.NEXT_PUBLIC_URL}/auth`,
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			url: `${process.env.NEXT_PUBLIC_URL}/users`,
			changeFrequency: 'monthly',
			priority: 0.9,
		},

		// Пользователи
		...users.map(user => ({
			url: `${process.env.NEXT_PUBLIC_URL}/users/${user.name}`,
			priority: 0.6,
			lastModified: new Date(user.updatedAt)
		}))
	]
}