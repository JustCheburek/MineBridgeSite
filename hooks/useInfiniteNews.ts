'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '@/axios'

// Функция для фактического получения данных, вынесенная отдельно от хука
// для предотвращения проблем с суспендом
async function fetchNews(limit: number, offset: number) {
  try {
    const response = await api.get('/', {
      params: { limit, offset },
    })

    return response.data
  } catch (error) {
    console.error('Ошибка при запросе к API:', error)
    throw error
  }
}

export function useInfiniteNews(limit: number = 5) {
  return useInfiniteQuery({
    queryKey: ['news', limit],
    queryFn: async ({ pageParam }) => {
      return fetchNews(limit, pageParam * limit)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // Если получено меньше элементов, чем limit, значит это последняя страница
      if (!lastPage || !Array.isArray(lastPage) || lastPage.length < limit) {
        return undefined
      }
      // Иначе возвращаем следующий номер страницы
      return allPages.length
    },
    // Отключаем автоматический рефетч при монтировании
    refetchOnMount: false,
    // Отключаем автоматический рефетч при фокусе окна
    refetchOnWindowFocus: false,
    // Увеличиваем кол-во попыток
    retry: 3,
    retryDelay: 1000,
  })
}
