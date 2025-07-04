import { bundleMDX } from 'mdx-bundler'

/**
 * Компилирует MDX строку в JavaScript код, который может быть выполнен на клиенте
 *
 * @param source MDX строка для компиляции
 * @returns Скомпилированный JavaScript код
 */
export async function compileMDX(source: string) {
  if (!source) return { code: '' }

  try {
    // Оборачиваем MDX в try-catch для безопасности
    const result = await bundleMDX({
      source,
      mdxOptions(options) {
        options.remarkPlugins = [...(options.remarkPlugins || [])]
        options.rehypePlugins = [...(options.rehypePlugins || [])]
        return options
      },
    })

    return { code: result.code }
  } catch (error) {
    console.error('Ошибка при компиляции MDX:', error)
    return { code: '', error }
  }
}
