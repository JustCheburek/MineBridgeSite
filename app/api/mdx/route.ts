import { NextResponse } from 'next/server'
import { compileMDX } from '@/services/mdx/compile'

export async function POST(request: Request) {
  try {
    // Получаем MDX контент из запроса
    const { source } = await request.json()
    
    if (!source) {
      return NextResponse.json({ error: 'No MDX source provided' }, { status: 400 })
    }
    
    // Компилируем MDX
    const { code, error } = await compileMDX(source)
    
    if (error) {
      return NextResponse.json({ error: 'Failed to compile MDX' }, { status: 500 })
    }
    
    // Возвращаем скомпилированный код
    return NextResponse.json({ code })
  } catch (error) {
    console.error('Error in MDX API route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 