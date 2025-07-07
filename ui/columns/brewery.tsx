'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { RecipeProps } from '@/types/recipe'

const woods = ['любое', 'берёза', 'дуб', '?', 'ель', 'акация', 'тёмный дуб']

export const columns: ColumnDef<RecipeProps>[] = [
  {
    accessorFn: row => {
      const names: string[] = row.name.split('/')
      const nameIndex = names.length >= 3 ? 1 : 0
      return names[nameIndex]
    },
    header: 'Рецепт',
  },
  {
    accessorFn: row => {
      return row.ingredients?.map(ingredient => ingredient?.split('/')?.reverse()?.join(' '))
    },
    header: 'Ингредиенты',
    cell: ({ getValue }: { getValue: Function }) => {
      const ingredients: string[] = getValue()

      return (
        <ul>
          {ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      )
    },
  },
  {
    accessorFn: row => {
      if (!row.cookingtime) return
      return row.cookingtime
    },
    header: 'Котёл (мин)',
    meta: {
      type: 'number',
    },
  },
  {
    accessorFn: row => {
      if (!row.distillruns) return
      return row.distillruns
    },
    header: 'Светопыль',
    meta: {
      type: 'number',
    },
  },
  {
    accessorFn: row => {
      if (!row.age) return
      return row.age
    },
    header: 'Бочка',
    meta: {
      type: 'number',
    },
  },
  {
    accessorFn: row => {
      return woods[Number(row.wood)]
    },
    header: 'Дерево',
    meta: {
      className: 'text-center',
    },
  },
]
