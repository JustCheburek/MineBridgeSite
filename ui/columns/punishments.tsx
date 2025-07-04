'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Punishment } from '@/types/punishment'

export const columns: ColumnDef<Punishment>[] = [
  {
    accessorKey: 'reason',
    header: 'Причина',
  },
  {
    accessorKey: 'rating',
    header: 'Рейтинг',
    meta: {
      type: 'number',
    },
  },
  {
    accessorKey: 'author',
    header: 'Автор',
    meta: {
      className: 'text-center',
    },
  },
]
