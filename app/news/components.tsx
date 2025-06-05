'use client'

import { PropsWithChildren, useEffect, useRef, useMemo } from 'react'
import { useInfiniteNews } from '@/hooks/useInfiniteNews'
import { PBox, PTag, PTags, PText, PTitle } from "@components/post"
import { Img, ImgBox } from "@components/img"
import { CheckLink } from "@components/checkLink"
import styles from './news.module.scss'
import Link from 'next/link'
import type { New } from '@/types/new'
import { Button } from '@/ui/components/button'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMdxCompile } from '@/hooks/useMdxCompile'
import React from 'react'

function P({ children }: PropsWithChildren) {
  return (
    <p className={styles.p}>
      {children}
    </p>
  )
}

function Blockquote({ children }: PropsWithChildren) {
  return (
    <blockquote className={styles.blockquote}>
      {children}
    </blockquote>
  )
}

function A({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href} className="unic_color medium-font">
      {children}
    </Link>
  )
}


const mdxComponents = {
  p: P,
  blockquote: Blockquote,
  a: A
}

// Компонент для рендеринга MDX контента
function MDXContent({ source }: { source: string }) {
  const { compiledCode, isLoading, error } = useMdxCompile(source)

  // Используем useMemo для создания компонента только при изменении compiledCode
  const Component = useMemo(() => {
    if (!compiledCode) {
      const LoadingComponent = () => <p>Загрузка контента...</p>
      LoadingComponent.displayName = 'MDX_LoadingComponent'
      return LoadingComponent
    }

    try {
      return getMDXComponent(compiledCode)
    } catch (err) {
      console.error('Ошибка при компиляции MDX:', err)
      const ErrorComponent = () => <p>Ошибка при отображении контента</p>
      ErrorComponent.displayName = 'MDX_ErrorComponent'
      return ErrorComponent
    }
  }, [compiledCode])

  if (isLoading) {
    return <p>Загрузка контента...</p>
  }

  if (error) {
    return <p>Ошибка при загрузке контента: {error.message}</p>
  }

  return <Component components={mdxComponents} />
}

export function NewsInfiniteList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch
  } = useInfiniteNews(5)

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Настройка IntersectionObserver для бесконечной прокрутки
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        },
        { threshold: 0.5 }
      )

      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  // Логирование для отладки
  useEffect(() => {
    if (isError) {
      console.error('Ошибка при загрузке новостей:', error)
    }
    if (data) {
      console.log('Полученные данные:', data)
    }
  }, [isError, error, data])

  // Функция для повторной попытки загрузки
  const handleRetry = () => {
    console.log('Повторная попытка загрузки...')
    refetch()
  }

  // Возвращаем состояние загрузки
  if (isLoading) {
    return <h3 className="center_text">Загрузка новостей...</h3>
  }

  // Возвращаем состояние ошибки
  if (isError) {
    return (
      <div className="center_text">
        <h3>Ошибка при загрузке новостей</h3>
        <p>
          {error instanceof Error ? error.message : 'Неизвестная ошибка'}
        </p>
        <Button onClick={handleRetry}>
          Повторить попытку
        </Button>
      </div>
    )
  }

  // Если данных нет
  if (!data || !data.pages.length || data.pages[0].length === 0) {
    return <h3 className="center_text">Новости не найдены</h3>
  }

  // Рендерим новости
  return (
    <div>
      {data.pages.map((newsPage, pageIndex) => (
        <div key={pageIndex}>
          {newsPage.map((news: New) => news.text && (
            <PBox key={news.id}>
              {news.photoUrl && (
                <CheckLink href={news.photoUrl}>
                  <ImgBox type="post">
                    <Img src={news.photoUrl} alt={news.heading || 'Новость'} />
                  </ImgBox>
                </CheckLink>
              )}
              <PTitle>
                <h3>
                  {news.heading || 'Без заголовка'}
                </h3>
              </PTitle>
              <PText className={styles.text}>
                <MDXContent source={news.text} />

                {news.tags && <PTags tags={news.tags} >
                  {news.tags.map(tag => (
                    <PTag key={tag}>
                      {tag}
                    </PTag>
                  ))}
                </PTags>}
              </PText>
            </PBox>
          ))}
        </div>
      ))}

      <div ref={loadMoreRef} className={styles.loadMore}>
        <small className="light_gray_color">
          {isFetchingNextPage
            ? 'Загрузка...'
            : hasNextPage
              ? 'Прокрутите для загрузки'
              : 'Больше новостей нет'
          }
        </small>
      </div>
    </div>
  )
}