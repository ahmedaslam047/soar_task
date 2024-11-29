import { NextResponse } from 'next/server'
import { expenseCategories } from '@/lib/mockData'

export async function GET() {
  const shuffleArray = (array: number[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  const values = [30, 25, 35, 20]
  shuffleArray(values)

  const rotatedExpenseStats: Record<string, number> = expenseCategories.reduce(
    (acc, key, index) => {
      acc[key] = values[index]
      return acc
    },
    {} as Record<string, number>
  )

  return NextResponse.json(rotatedExpenseStats)
}

