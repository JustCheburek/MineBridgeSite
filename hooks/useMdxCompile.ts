'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface UseMdxCompileResult {
  compiledCode: string | null
  isLoading: boolean
  error: Error | null
}

// Функция для предварительной обработки текста MDX
function preprocessMdxText(source: string): string {
  if (!source) return ''

  // Заменяем строковые представления \n на реальные переносы строк
  return source.replace(/\\n/g, '\n')
}

/**
 * Хук для компиляции MDX контента через API
 *
 * @param source MDX строка для компиляции
 * @returns Объект с результатами компиляции
 */
export function useMdxCompile(source: string): UseMdxCompileResult {
  const [compiledCode, setCompiledCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!source) {
      setCompiledCode(null)
      return
    }

    const compileMdx = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Предварительно обрабатываем текст перед отправкой на сервер
        const processedSource = preprocessMdxText(source)

        const response = await axios.post('/api/mdx', { source: processedSource })
        setCompiledCode(response.data.code)
      } catch (err) {
        console.error('Error compiling MDX:', err)
        setError(err instanceof Error ? err : new Error('Failed to compile MDX'))
      } finally {
        setIsLoading(false)
      }
    }

    compileMdx()
  }, [source])

  return { compiledCode, isLoading, error }
}
